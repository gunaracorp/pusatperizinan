// Prisma ORM 8 client (experimental SQLite runtime).
// This client is intentionally introduced side-by-side. Current API routes
// still use src/lib/db.ts (Prisma 7) until each route is migrated and tested.

import "temporal-polyfill/global";
import sqlite from "@prisma/orm-sqlite/runtime";
import type { Contract } from "../../generated/prisma8/contract";
import contractJson from "../../generated/prisma8/contract.json" with { type: "json" };

const databasePath = (process.env.DATABASE_URL || "file:./db/custom.db").replace(/^file:/, "");

export const db8 = sqlite<Contract>({
  contractJson,
  path: databasePath,
});
