// PUSATPERIZINAN.COM — Prisma ORM 8 PostgreSQL configuration.
// The fallback exists only so contract emission can run in build workers
// that do not connect to production data. Runtime access explicitly requires
// DATABASE_URL and will fail closed if it is not set.
import "dotenv/config";
import { definePrismaConfig } from "prisma/config";
import { defineConfig as definePostgresConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  orm: definePostgresConfig({
    contract: "src/prisma/contract.prisma",
    output: "generated/prisma8",
    db: {
      connection:
        process.env.DATABASE_URL ??
        "postgresql://build:build@127.0.0.1:5432/pusatperizinan_build",
    },
  }),
});
