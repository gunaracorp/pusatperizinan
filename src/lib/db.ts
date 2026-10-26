// ============================================================
// PUSATPERIZINAN.COM — Prisma ORM 8 PostgreSQL runtime
// ============================================================
// All database traffic goes through Prisma ORM 8 and PostgreSQL.
// The compatibility-shaped delegates below preserve the current
// application's established call contract while individual modules
// are migrated. No Prisma ORM 7 runtime/client is imported here.

import { all, and, not, or } from "@prisma/orm-postgres/orm-client";
import { prisma8 as runtime } from "@/prisma/db";

type AnyRecord = Record<string, any>;
type AnyCollection = any;

const MODEL_NAMES = {
  lead: "Lead",
  consultation: "Consultation",
  chatMessage: "ChatMessage",
  licenseCheck: "LicenseCheck",
  subscriber: "Subscriber",
  testimonial: "Testimonial",
  documentCheck: "DocumentCheck",
  roadmapRequest: "RoadmapRequest",
  notificationSetting: "NotificationSetting",
  order: "Order",
  post: "Post",
  followUpLog: "FollowUpLog",
  notificationLog: "NotificationLog",
  editorialSlot: "EditorialSlot",
} as const;

type ModelName = keyof typeof MODEL_NAMES;

function ensureDatabaseConfigured(): void {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL belum diisi. Konfigurasikan koneksi PostgreSQL di environment hosting.");
  }
}

function normalizeInput(value: any): any {
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return value.map(normalizeInput);
  if (value && typeof value === "object") {
    const out: AnyRecord = {};
    for (const [key, child] of Object.entries(value)) {
      if (child !== undefined) out[key] = normalizeInput(child);
    }
    return out;
  }
  return value;
}

const DATETIME_FIELDS = new Set(["createdAt", "updatedAt", "paidAt", "expiresAt"]);

function normalizeOutput<T>(value: T): T {
  if (Array.isArray(value)) return value.map(normalizeOutput) as T;
  if (!value || typeof value !== "object") return value;
  const out: AnyRecord = {};
  for (const [key, child] of Object.entries(value as AnyRecord)) {
    if (DATETIME_FIELDS.has(key) && typeof child === "string") {
      const date = new Date(child);
      out[key] = Number.isNaN(date.getTime()) ? child : date;
    } else if (DATETIME_FIELDS.has(key) && child && typeof (child as any).toString === "function") {
      const date = new Date(String(child));
      out[key] = Number.isNaN(date.getTime()) ? child : date;
    } else {
      out[key] = normalizeOutput(child);
    }
  }
  return out as T;
}

function filterExpression(filter: AnyRecord, fields: AnyRecord): any {
  const clauses: any[] = [];

  for (const [key, rawValue] of Object.entries(filter ?? {})) {
    if (rawValue === undefined) continue;

    if (key === "OR" || key === "AND") {
      const filters = (Array.isArray(rawValue) ? rawValue : [rawValue])
        .filter((item) => item && typeof item === "object")
        .map((item) => filterExpression(item, fields));
      if (filters.length) clauses.push(key === "OR" ? or(...filters) : and(...filters));
      continue;
    }
    if (key === "NOT") {
      const filters = (Array.isArray(rawValue) ? rawValue : [rawValue])
        .filter((item) => item && typeof item === "object")
        .map((item) => not(filterExpression(item, fields)));
      if (filters.length) clauses.push(and(...filters));
      continue;
    }

    const field = fields[key];
    if (!field) continue;

    if (rawValue === null) {
      clauses.push(field.isNull());
      continue;
    }
    if (rawValue instanceof Date) {
      clauses.push(field.eq(rawValue.toISOString()));
      continue;
    }
    if (Array.isArray(rawValue)) {
      clauses.push(field.in(rawValue.map(normalizeInput)));
      continue;
    }
    if (typeof rawValue !== "object") {
      clauses.push(field.eq(rawValue));
      continue;
    }

    for (const [operator, value] of Object.entries(rawValue as AnyRecord)) {
      if (operator === "mode" || value === undefined) continue;
      switch (operator) {
        case "equals":
          clauses.push(value === null ? field.isNull() : field.eq(normalizeInput(value)));
          break;
        case "in":
          clauses.push(field.in((value as any[]).map(normalizeInput)));
          break;
        case "notIn":
          clauses.push(field.notIn((value as any[]).map(normalizeInput)));
          break;
        case "gt":
        case "gte":
        case "lt":
        case "lte":
          clauses.push(field[operator](normalizeInput(value)));
          break;
        case "contains": {
          const escaped = String(value).replace(/[\\%_]/g, "\\$&");
          clauses.push(field.ilike(`%${escaped}%`));
          break;
        }
        case "startsWith": {
          const escaped = String(value).replace(/[\\%_]/g, "\\$&");
          clauses.push(field.ilike(`${escaped}%`));
          break;
        }
        case "endsWith": {
          const escaped = String(value).replace(/[\\%_]/g, "\\$&");
          clauses.push(field.ilike(`%${escaped}`));
          break;
        }
        case "not":
          clauses.push(value === null ? field.isNotNull() : not(field.eq(normalizeInput(value))));
          break;
        default:
          // Unsupported Prisma 7 filter operators should fail visibly rather
          // than silently broaden a production query.
          throw new Error(`Filter operator Prisma ORM 8 belum dipetakan: ${operator}`);
      }
    }
  }

  if (clauses.length === 0) return all();
  return clauses.length === 1 ? clauses[0] : and(...clauses);
}

function isEqualityFilter(filter: AnyRecord): boolean {
  if (!filter || typeof filter !== "object" || Array.isArray(filter)) return false;
  for (const [key, value] of Object.entries(filter)) {
    if (["OR", "AND", "NOT"].includes(key)) return false;
    if (value === undefined) continue;
    if (value === null || value instanceof Date || ["string", "number", "boolean"].includes(typeof value)) continue;
    return false;
  }
  return true;
}

function availableMethods(value: AnyCollection): string {
  if (value === null || value === undefined) return String(value);
  const names = new Set<string>();
  let proto = value;
  for (let i = 0; proto && i < 3; i++, proto = Object.getPrototypeOf(proto)) {
    for (const name of Object.getOwnPropertyNames(proto)) names.add(name);
  }
  return [...names].filter((name) => !name.startsWith("_")).sort().join(",");
}

function buildQuery(model: AnyCollection, options: AnyRecord = {}): AnyCollection {
  let query = model;
  if (options.where && Object.keys(options.where).length) {
    // Prisma 8's object filter is both simpler and safer for equality-only
    // predicates. Use expression callbacks only for the Prisma 7 operators.
    query = isEqualityFilter(options.where)
      ? query.where(normalizeInput(options.where))
      : query.where((fields: AnyRecord) => filterExpression(options.where, fields));
    if (typeof query.take !== "function") {
      throw new Error(`Prisma ORM 8 where() did not return a chainable collection. Methods: ${availableMethods(query)}`);
    }
  }

  if (options.orderBy) {
    const clauses = Array.isArray(options.orderBy) ? options.orderBy : [options.orderBy];
    const orderCallbacks = clauses.map((clause: AnyRecord) => (fields: AnyRecord) => {
      const [field, direction] = Object.entries(clause)[0] ?? [];
      if (!field) throw new Error("OrderBy Prisma ORM 8 tidak memiliki field.");
      const accessor = fields[field];
      if (!accessor) throw new Error(`Field orderBy tidak ditemukan: ${field}`);
      return accessor[direction === "asc" ? "asc" : "desc"]();
    });
    query = query.orderBy(orderCallbacks.length === 1 ? orderCallbacks[0] : orderCallbacks);
    if (typeof query.take !== "function") {
      throw new Error(`Prisma ORM 8 orderBy() did not return a chainable collection. Methods: ${availableMethods(query)}`);
    }
  }

  if (Number.isFinite(options.skip) && options.skip > 0) query = query.skip(options.skip);
  if (Number.isFinite(options.take) && options.take >= 0) {
    if (typeof query.take !== "function") {
      throw new Error(`Prisma ORM 8 collection.take() unavailable before pagination. Methods: ${availableMethods(query)}`);
    }
    query = query.take(options.take);
  }

  // Keep projections/includes as the final collection refinements. This makes
  // pagination modifiers run against the base collection before shape narrowing.
  if (options.select && typeof options.select === "object") {
    const selected = Object.entries(options.select)
      .filter(([, enabled]) => enabled === true)
      .map(([field]) => field);
    if (selected.length) query = query.select(...selected);
  }
  if (options.include && typeof options.include === "object") {
    for (const [relation, enabled] of Object.entries(options.include)) {
      if (enabled === true) query = query.include(relation);
    }
  }
  return query;
}

function applyDistinct(rows: AnyRecord[], distinct?: string[]): AnyRecord[] {
  if (!distinct?.length) return rows;
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = JSON.stringify(distinct.map((field) => row[field]));
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function rowCountResult(count: number) {
  return { count };
}

function makeDelegate(name: ModelName) {
  const collection = () => (runtime.orm.public as AnyRecord)[MODEL_NAMES[name]] as AnyCollection;

  return {
    async findMany(options: AnyRecord = {}) {
      ensureDatabaseConfigured();
      const rows = await buildQuery(collection(), options).all();
      return normalizeOutput(applyDistinct(rows, options.distinct));
    },
    async findFirst(options: AnyRecord = {}) {
      ensureDatabaseConfigured();
      return normalizeOutput(await buildQuery(collection(), options).first());
    },
    async findUnique(options: AnyRecord = {}) {
      ensureDatabaseConfigured();
      return normalizeOutput(await buildQuery(collection(), options).first());
    },
    async count(options: AnyRecord = {}) {
      ensureDatabaseConfigured();
      const result = await buildQuery(collection(), { where: options.where }).aggregate(
        (agg: AnyRecord) => ({ value: agg.count() }),
      );
      return Number(result.value ?? 0);
    },
    async create(options: AnyRecord) {
      ensureDatabaseConfigured();
      return normalizeOutput(await collection().create(normalizeInput(options.data)));
    },
    async createMany(options: AnyRecord) {
      ensureDatabaseConfigured();
      const rows = Array.isArray(options.data) ? options.data : [];
      if (!rows.length) return rowCountResult(0);
      const count = await collection().createCount(rows.map(normalizeInput));
      return rowCountResult(Number(count));
    },
    async update(options: AnyRecord) {
      ensureDatabaseConfigured();
      const where = options.where ?? {};
      const row = await collection().where((fields: AnyRecord) => filterExpression(where, fields))
        .update(normalizeInput(options.data ?? {}));
      if (!row) throw new Error(`Record ${name} tidak ditemukan untuk diubah.`);
      return normalizeOutput(row);
    },
    async updateMany(options: AnyRecord) {
      ensureDatabaseConfigured();
      const count = await collection().where((fields: AnyRecord) => filterExpression(options.where ?? {}, fields))
        .updateCount(normalizeInput(options.data ?? {}));
      return rowCountResult(Number(count));
    },
    async upsert(options: AnyRecord) {
      ensureDatabaseConfigured();
      const where = { ...(options.where ?? {}) };
      const flattened: AnyRecord = {};
      for (const [key, value] of Object.entries(where)) {
        if (key.includes("_") && value && typeof value === "object") Object.assign(flattened, value);
        else flattened[key] = value;
      }
      return normalizeOutput(await collection().upsert({
        create: normalizeInput(options.create),
        update: normalizeInput(options.update),
        conflictOn: normalizeInput(flattened),
      }));
    },
    async delete(options: AnyRecord) {
      ensureDatabaseConfigured();
      const row = await collection().where((fields: AnyRecord) => filterExpression(options.where ?? {}, fields)).delete();
      if (!row) throw new Error(`Record ${name} tidak ditemukan untuk dihapus.`);
      return normalizeOutput(row);
    },
    async deleteMany(options: AnyRecord) {
      ensureDatabaseConfigured();
      const count = await collection().where((fields: AnyRecord) => filterExpression(options.where ?? {}, fields)).deleteCount();
      return rowCountResult(Number(count));
    },
    async aggregate(options: AnyRecord = {}) {
      ensureDatabaseConfigured();
      const fields = options._sum ? Object.keys(options._sum) : [];
      const selectors: AnyRecord = {};
      if (options._count) selectors.__countAll = (agg: AnyRecord) => agg.count();
      for (const field of fields) selectors[`__sum_${field}`] = (agg: AnyRecord) => agg.sum(field);
      const result = await buildQuery(collection(), { where: options.where }).aggregate(
        (agg: AnyRecord) => Object.fromEntries(Object.entries(selectors).map(([key, getter]) => [key, (getter as any)(agg)])),
      );
      const output: AnyRecord = {};
      if (options._count) output._count = { _all: Number(result.__countAll ?? 0) };
      if (options._sum) {
        output._sum = {};
        for (const field of fields) output._sum[field] = result[`__sum_${field}`] ?? null;
      }
      return output;
    },
    async groupBy(options: AnyRecord) {
      ensureDatabaseConfigured();
      const by = options.by as string[];
      const aggregates: AnyRecord = {};
      const needCount = Boolean(options._count);
      if (needCount) aggregates.__countAll = (agg: AnyRecord) => agg.count();
      const sumFields = options._sum ? Object.keys(options._sum) : [];
      for (const field of sumFields) aggregates[`__sum_${field}`] = (agg: AnyRecord) => agg.sum(field);
      const groups = await buildQuery(collection(), { where: options.where })
        .groupBy(...by)
        .aggregate((agg: AnyRecord) => Object.fromEntries(
          Object.entries(aggregates).map(([key, getter]) => [key, (getter as any)(agg)]),
        ));
      return groups.map((group: AnyRecord) => {
        const row: AnyRecord = {};
        for (const field of by) row[field] = group[field];
        if (needCount) row._count = options._count === true ? { _all: Number(group.__countAll ?? 0) } : {
          ...(options._count._all ? { _all: Number(group.__countAll ?? 0) } : {}),
        };
        if (options._sum) {
          row._sum = {};
          for (const field of sumFields) row._sum[field] = group[`__sum_${field}`] ?? null;
        }
        return normalizeOutput(row);
      });
    },
  };
}

export const db = Object.fromEntries(
  Object.keys(MODEL_NAMES).map((model) => [model, makeDelegate(model as ModelName)]),
) as Record<ModelName, ReturnType<typeof makeDelegate>>;

// Export the native Prisma ORM 8 client for modules that need its query API.
export const prisma8 = runtime;
