#!/usr/bin/env node
// One-time, resumable import from the repository's historical SQLite DB into
// an already initialized Prisma ORM 8 PostgreSQL database.
//
// Usage:
//   DATABASE_URL="postgresql://..." node scripts/migrate-sqlite-to-postgres.mjs [path/to/custom.db]
//
// Safety:
// - source DB is opened read-only;
// - destination tables must have been created with "npm run db:init";
// - rows are matched by their original IDs and imported in batches;
// - rerunning skips IDs already present, so a partially completed import resumes;
// - the script never drops or truncates target tables.

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { Temporal } from "temporal-polyfill";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

const root = process.cwd();
const sourcePath = process.argv[2] ? path.resolve(process.argv[2]) : "";
const url = process.env.DATABASE_URL;
const contractPath = path.join(root, "generated", "prisma8", "contract.json");

const MODELS = [
  "Lead",
  "Consultation",
  "ChatMessage",
  "LicenseCheck",
  "Subscriber",
  "Testimonial",
  "DocumentCheck",
  "RoadmapRequest",
  "NotificationSetting",
  "Order",
  "Post",
  "NotificationLog",
  "EditorialSlot",
  // FollowUpLog has a required FK to Lead, so import it after Lead.
  "FollowUpLog",
];

const BOOLEAN_FIELDS = {
  ChatMessage: ["leadCaptured"],
  Testimonial: ["published"],
  NotificationSetting: ["telegramEnabled", "whatsappEnabled"],
  Post: ["noindex"],
};
const DATETIME_FIELDS = ["createdAt", "updatedAt", "paidAt", "expiresAt"];

function stop(message) {
  console.error(`[sqlite-import] ERROR: ${message}`);
  process.exitCode = 1;
}

function normalizeRow(model, raw) {
  const row = { ...raw };
  for (const key of BOOLEAN_FIELDS[model] || []) {
    if (row[key] !== null && row[key] !== undefined) row[key] = Boolean(row[key]);
  }
  for (const key of DATETIME_FIELDS) {
    if (row[key] !== null && row[key] !== undefined) {
      row[key] = Temporal.Instant.from(new Date(row[key]).toISOString());
    }
  }
  return row;
}

async function main() {
  if (!url || !url.startsWith("postgres")) {
    throw new Error("DATABASE_URL wajib berisi URL PostgreSQL tujuan dari dashboard database.");
  }
  if (!sourcePath) {
    throw new Error("Path file SQLite sumber wajib diberikan sebagai argumen. Gunakan salinan privat/backup, bukan file database dari repo publik.");
  }
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Database SQLite sumber tidak ditemukan: ${sourcePath}. Periksa path backup privat lokal.`);
  }
  if (!fs.existsSync(contractPath)) {
    throw new Error("Contract Prisma 8 belum di-emit. Jalankan npm install atau npm run prisma8:emit terlebih dahulu.");
  }

  const sqlite = new DatabaseSync(sourcePath, { readOnly: true });
  const knownTables = new Set(
    sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((r) => r.name),
  );
  const missing = MODELS.filter((model) => !knownTables.has(model));
  if (missing.length) {
    throw new Error(`Tabel sumber tidak lengkap: ${missing.join(", ")}. Jangan lanjutkan sampai database sumber yang benar dipilih.`);
  }

  const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));
  const client = postgres({ url, contract: contractFromJson(contractJson) });
  let totalImported = 0;

  try {
    // Probe every destination table first. This catches a missing db:init before
    // any data is written, and validates the contract/schema as a whole.
    for (const model of MODELS) {
      const target = client.orm.public[model];
      await target.take(1).all();
    }

    for (const model of MODELS) {
      const target = client.orm.public[model];
      const existingRows = await target.select("id").all();
      const existingIds = new Set(existingRows.map((row) => String(row.id)));
      const source = sqlite.prepare(`SELECT * FROM "${model}"`);
      let batch = [];
      let inserted = 0;
      let skipped = 0;

      const flush = async () => {
        if (!batch.length) return;
        await target.createAll(batch);
        inserted += batch.length;
        totalImported += batch.length;
        batch = [];
      };

      for (const raw of source.iterate()) {
        const row = normalizeRow(model, raw);
        const id = String(row.id ?? "");
        if (!id) throw new Error(`Baris tanpa id ditemukan pada tabel ${model}; impor dihentikan.`);
        if (existingIds.has(id)) {
          skipped++;
          continue;
        }
        batch.push(row);
        if (batch.length >= 100) await flush();
      }
      await flush();
      console.log(`[sqlite-import] ${model}: ${inserted} inserted, ${skipped} existing IDs skipped`);
    }

    console.log(`[sqlite-import] Selesai. Total baris baru: ${totalImported}.`);
    console.log("[sqlite-import] Berikutnya jalankan: npm run db:verify");
  } finally {
    sqlite.close();
  }
}

main().catch((error) => {
  stop(error instanceof Error ? error.message : String(error));
});
