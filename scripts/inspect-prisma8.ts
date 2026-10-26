import { prisma8 } from "../src/prisma/db";

function methods(value: any): string {
  if (value == null) return String(value);
  const names = new Set<string>();
  let current = value;
  for (let i = 0; current && i < 4; i++, current = Object.getPrototypeOf(current)) {
    for (const name of Object.getOwnPropertyNames(current)) names.add(name);
  }
  return [...names].sort().join(", ");
}

const collection = (prisma8.orm.public as any).Lead;
console.log("[prisma8-inspect] collection:", methods(collection));
for (const [label, create] of [
  ["where-object", () => collection.where({ name: "__prisma8_inspect_no_row__" })],
  ["where-callback", () => collection.where((fields: any) => fields.name.eq("__prisma8_inspect_no_row__"))],
  ["orderBy-callback", () => collection.orderBy((fields: any) => fields.createdAt.desc())],
  ["take", () => collection.take(1)],
  ["all", () => collection.all()],
  ["first", () => collection.first()],
] as Array<[string, () => any]>) {
  try {
    const result = create();
    console.log(`[prisma8-inspect] ${label}: ${methods(result)}`);
  } catch (error) {
    console.log(`[prisma8-inspect] ${label} THREW: ${error instanceof Error ? error.message : String(error)}`);
  }
}
for (const method of ["deleteCount", "deleteAll", "updateCount", "updateAll", "createCount"]) {
  console.log(`[prisma8-inspect] collection prototype has ${method}:`, typeof collection[method]);
}
