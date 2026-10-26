// PUSATPERIZINAN.COM — native Prisma ORM 8 PostgreSQL runtime.
// Every application database operation is served by this runtime.
// "contract.json" and its generated type are emitted by "prisma contract emit".

import "server-only";
import "temporal-polyfill/global";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "../../generated/prisma8/contract";
import contractJson from "../../generated/prisma8/contract.json" with { type: "json" };

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://build:build@127.0.0.1:5432/pusatperizinan_build";

export const contract = contractFromJson<Contract>(contractJson);
export const prisma8 = postgres({
  url: connectionString,
  contract,
});
