// PUSATPERIZINAN.COM — Prisma ORM 8 PostgreSQL configuration.
// DATABASE_URL must be present for install/build commands and for runtime.
// No localhost fallback is permitted: it could make a build appear healthy
// while the production app is not connected to the intended database.
import { config as loadEnv } from "dotenv";
// .env file is authoritative for CLI commands (override inherited shell env).
loadEnv({ override: true });
import { definePrismaConfig } from "prisma/config";
import { defineConfig as definePostgresConfig } from "@prisma/orm-postgres/config";

if (!process.env.DATABASE_URL?.startsWith("postgres")) {
  throw new Error("DATABASE_URL harus diisi dengan connection string PostgreSQL sebelum build atau migrasi Prisma 8.");
}

export default definePrismaConfig({
  orm: definePostgresConfig({
    contract: "src/prisma/contract.prisma",
    output: "generated/prisma8",
    db: {
      connection: process.env.DATABASE_URL,
    },
  }),
});
