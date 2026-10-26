// PUSATPERIZINAN.COM — Prisma ORM 8 config (SQLite, experimental).
// Prisma 8 contract/client are generated separately from the Prisma 7 runtime.
// The current live app still uses Prisma 7 until routes are migrated and tested.

import "dotenv/config";
import { definePrismaConfig } from "prisma/config";
import { defineConfig as defineSqliteConfig } from "@prisma/orm-sqlite/config";

const databasePath = (process.env.DATABASE_URL || "file:./db/custom.db").replace(/^file:/, "");

export default definePrismaConfig({
  orm: defineSqliteConfig({
    contract: "src/prisma/contract.prisma",
    output: "generated/prisma8",
    db: {
      connection: databasePath,
    },
  }),
});
