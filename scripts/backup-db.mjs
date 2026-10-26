#!/usr/bin/env node
// Daily PostgreSQL snapshot using Prisma ORM 8, saved as compressed NDJSON.
// Output is private (0600), retained for the 14 most recent successful backups.
// Restore requires the same emitted contract and a target database initialized
// with that contract. Never commit the backups directory.

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { once } from "node:events";
import { createGzip } from "node:zlib";
import { createWriteStream } from "node:fs";
import { finished } from "node:stream/promises";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

const ROOT = process.cwd();
const BACKUP_DIR = path.join(ROOT, "backups");
const RETAIN = 14;
const MODELS = [
  "Lead", "Consultation", "ChatMessage", "LicenseCheck", "Subscriber",
  "Testimonial", "DocumentCheck", "RoadmapRequest", "NotificationSetting",
  "Order", "Post", "NotificationLog", "EditorialSlot", "FollowUpLog",
];

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function writeLine(stream, text) {
  if (!stream.write(text + "\n")) await once(stream, "drain");
}

async function main() {
  if (!process.env.DATABASE_URL?.startsWith("postgres")) {
    throw new Error("DATABASE_URL belum diatur ke database PostgreSQL produksi.");
  }
  const contractFile = path.join(ROOT, "generated", "prisma8", "contract.json");
  if (!fs.existsSync(contractFile)) {
    throw new Error("Kontrak Prisma 8 belum di-emit. Jalankan npm run prisma8:emit.");
  }
  fs.mkdirSync(BACKUP_DIR, { recursive: true, mode: 0o700 });
  const destination = path.join(BACKUP_DIR, `pp-postgres-${timestamp()}.ndjson.gz`);
  const contractJson = JSON.parse(fs.readFileSync(contractFile, "utf8"));
  const db = postgres({
    url: process.env.DATABASE_URL,
    contract: contractFromJson(contractJson),
  });
  const gzip = createGzip({ level: 9 });
  const output = createWriteStream(destination, { flags: "wx", mode: 0o600 });
  gzip.pipe(output);
  const finishedOutput = finished(output);
  let total = 0;

  try {
    await writeLine(gzip, JSON.stringify({
      type: "backup",
      format: 1,
      createdAt: new Date().toISOString(),
      models: MODELS,
    }));

    for (const model of MODELS) {
      let count = 0;
      for await (const row of db.orm.public[model].all()) {
        await writeLine(gzip, JSON.stringify({ type: "row", model, data: row }));
        count++;
        total++;
      }
      await writeLine(gzip, JSON.stringify({ type: "end-model", model, count }));
      console.log(`[backup-db] ${model}: ${count} rows`);
    }

    gzip.end();
    await finishedOutput;

    const backups = fs.readdirSync(BACKUP_DIR)
      .filter((file) => file.startsWith("pp-postgres-") && file.endsWith(".ndjson.gz"))
      .sort();
    while (backups.length > RETAIN) {
      fs.rmSync(path.join(BACKUP_DIR, backups.shift()), { force: true });
    }

    const size = (fs.statSync(destination).size / 1024).toFixed(1);
    console.log(`[backup-db] OK: ${path.basename(destination)} (${size} KB compressed, ${total} rows)`);
  } catch (error) {
    gzip.destroy(error instanceof Error ? error : new Error(String(error)));
    output.destroy();
    fs.rmSync(destination, { force: true });
    throw error;
  }
}

main().catch((error) => {
  console.error("[backup-db] FAILED:", error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
