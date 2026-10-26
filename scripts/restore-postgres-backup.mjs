#!/usr/bin/env node
// Restore a compressed Prisma 8 NDJSON backup to an initialized PostgreSQL DB.
// Run only against a fresh/staging target. Never point this at the live DB unless
// you have deliberately prepared a clean restore target and verified the backup.

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { createGunzip } from "node:zlib";
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

const MODELS = [
  "Lead", "Consultation", "ChatMessage", "LicenseCheck", "Subscriber",
  "Testimonial", "DocumentCheck", "RoadmapRequest", "NotificationSetting",
  "Order", "Post", "NotificationLog", "EditorialSlot", "FollowUpLog",
];

async function main() {
  const source = path.resolve(process.argv[2] || "");
  if (!process.argv[2] || !fs.existsSync(source)) {
    throw new Error("Berikan path file backup .ndjson.gz yang valid.");
  }
  if (!process.env.DATABASE_URL?.startsWith("postgres")) {
    throw new Error("DATABASE_URL harus menunjuk database PostgreSQL tujuan.");
  }
  const contractPath = path.join(process.cwd(), "generated", "prisma8", "contract.json");
  if (!fs.existsSync(contractPath)) throw new Error("Kontrak Prisma 8 belum di-emit.");

  const contract = contractFromJson(JSON.parse(fs.readFileSync(contractPath, "utf8")));
  const db = postgres({ url: process.env.DATABASE_URL, contract });

  // Restore assumes the target schema exists and has no rows. Do this before
  // writing any data, so a mistaken target cannot be partially overwritten.
  for (const model of MODELS) {
    const existing = await db.orm.public[model].take(1).all();
    if (existing.length) {
      throw new Error(`Database tujuan tidak kosong (model ${model}). Buat database/schema restore baru terlebih dahulu.`);
    }
  }

  const reader = createInterface({
    input: createReadStream(source).pipe(createGunzip()),
    crlfDelay: Infinity,
  });

  let headerSeen = false;
  let expectedModels: string[] = [];
  const counts = new Map<string, number>();
  let batchModel = "";
  let batch: any[] = [];

  const flush = async () => {
    if (!batch.length) return;
    await db.orm.public[batchModel].createAll(batch);
    counts.set(batchModel, (counts.get(batchModel) ?? 0) + batch.length);
    batch = [];
  };

  try {
    for await (const line of reader) {
      if (!line.trim()) continue;
      const entry = JSON.parse(line);
      if (!headerSeen) {
        if (entry.type !== "backup" || entry.format !== 1 || !Array.isArray(entry.models)) {
          throw new Error("Header backup tidak dikenal atau tidak didukung.");
        }
        expectedModels = entry.models;
        if (expectedModels.some((name) => !MODELS.includes(name)) || expectedModels.length !== MODELS.length) {
          throw new Error("Daftar model backup tidak cocok dengan contract versi ini.");
        }
        headerSeen = true;
        continue;
      }
      if (entry.type === "row") {
        if (!MODELS.includes(entry.model) || !entry.data || typeof entry.data !== "object") {
          throw new Error("Record backup tidak valid.");
        }
        if (batchModel && batchModel !== entry.model) await flush();
        batchModel = entry.model;
        batch.push(entry.data);
        if (batch.length >= 100) await flush();
      } else if (entry.type === "end-model") {
        await flush();
        const inserted = counts.get(entry.model) ?? 0;
        console.log(`[restore-db] ${entry.model}: ${inserted} rows restored`);
        batchModel = "";
      }
    }
    await flush();
    if (!headerSeen) throw new Error("Backup kosong atau rusak.");
    console.log("[restore-db] Restore selesai. Jalankan npm run db:verify pada target.");
  } finally {
    reader.close();
  }
}

main().catch((error) => {
  console.error("[restore-db] FAILED:", error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
