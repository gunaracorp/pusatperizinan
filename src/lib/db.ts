// ============================================================
// PUSATPERIZINAN.COM — Prisma Client Singleton (Prisma 7)
// Prisma 7 tanpa Rust query engine → driver adapter WAJIB.
// SQLite memakai @prisma/adapter-better-sqlite3; URL diambil dari
// DATABASE_URL (.env, dimuat otomatis oleh Next.js / bun).
// Client digenerate ke src/generated/prisma (lihat schema.prisma)
// dan di-import dari sana, BUKAN dari "@prisma/client".
// ============================================================

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./db/custom.db",
})

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
