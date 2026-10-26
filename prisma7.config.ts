// ============================================================
// PUSATPERIZINAN.COM — Prisma 7 Config (kompatibilitas sementara)
// Menggantikan konfigurasi via package.json. Prisma 7 TIDAK lagi
// memuat .env secara otomatis di CLI → dotenv dimuat eksplisit di
// sini. Bun otomatis memuat .env, tapi config ini membuat perintah
// (db push/generate) tetap aman dijalankan via npm/npx/CI.
// ============================================================

import "dotenv/config";
import { defineConfig, env } from "@prisma/prisma7/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
