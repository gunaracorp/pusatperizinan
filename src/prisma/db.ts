// PUSATPERIZINAN.COM — native Prisma ORM 8 PostgreSQL runtime.
// Every application database operation is served by this runtime.
// "contract.json" and its generated type are emitted by "prisma contract emit".

import { config as loadEnv } from "dotenv";
// .env file wins over any inherited shell DATABASE_URL (sandbox/CI safety).
loadEnv({ override: true });
import "temporal-polyfill/global";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "../../generated/prisma8/contract.d";
import contractJson from "../../generated/prisma8/contract.json" with { type: "json" };

const connectionString = process.env.DATABASE_URL;
if (!connectionString?.startsWith("postgres")) {
  throw new Error("DATABASE_URL harus diatur ke PostgreSQL sebelum Prisma ORM 8 diinisialisasi.");
}

export const contract = contractFromJson<Contract>(contractJson);
export const prisma8 = postgres({
  url: connectionString,
  contract,
});
