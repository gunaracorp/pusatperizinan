#!/usr/bin/env node
// ============================================================
// PUSATPERIZINAN.COM — BACKUP DB HARIAN (Langkah 68 Roadmap-99)
// ------------------------------------------------------------
// - Snapshot konsisten SQLite via `VACUUM INTO` (tanpa sqlite3 CLI)
// - Integrity check snapshot sebelum dianggap valid
// - Kompresi gzip + retensi 14 file terakhir
// - Log ke backups/backup.log; exit code sesuai hasil
// - Flag --if-stale: hanya backup bila backup terakhir > 24 jam
//   (dipanggil npm predev/prestart → self-healing tanpa cron daemon)
// Cron produksi (opsional, bila daemon tersedia):
//   0 22 * * * cd <repo> && node scripts/backup-db.mjs   (= 03:00 WIB)
// ============================================================
import { DatabaseSync } from "node:sqlite";
import { gzipSync } from "node:zlib";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const RETAIN = 14;
const IF_STALE = process.argv.includes("--if-stale");
const STALE_MS = 24 * 60 * 60 * 1000;

function newestBackupAge() {
  const dir = path.join(ROOT, "backups");
  if (!fs.existsSync(dir)) return Infinity;
  const times = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith("pp-") && f.endsWith(".db.gz"))
    .map((f) => fs.statSync(path.join(dir, f)).mtimeMs);
  return times.length ? Date.now() - Math.max(...times) : Infinity;
}

if (IF_STALE && newestBackupAge() < STALE_MS) {
  console.log("[backup-db] SKIP — backup terakhir masih segar (< 24 jam)");
  process.exit(0);
}

// --- Resolusi path DB dari .env (DATABASE_URL=file:...) atau argumen ---
function resolveDbPath() {
  if (process.argv[2] && !process.argv[2].startsWith("--")) {
    return path.resolve(process.argv[2]);
  }
  const envFile = path.join(ROOT, ".env");
  if (fs.existsSync(envFile)) {
    const m = fs
      .readFileSync(envFile, "utf8")
      .match(/^DATABASE_URL=file:(.+)$/m);
    if (m) return path.resolve(m[1].trim());
  }
  return path.join(ROOT, "db", "custom.db");
}

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try {
    fs.appendFileSync(path.join(ROOT, "backups", "backup.log"), line + "\n");
  } catch {
    /* log opsional */
  }
}

function fail(msg) {
  log(`BACKUP GAGAL: ${msg}`);
  process.exit(1);
}

// --- Main ---
const dbPath = resolveDbPath();
if (!fs.existsSync(dbPath)) fail(`DB tidak ditemukan: ${dbPath}`);

const backupDir = path.join(ROOT, "backups");
fs.mkdirSync(backupDir, { recursive: true });

const now = new Date();
const stamp = [
  now.getUTCFullYear(),
  String(now.getUTCMonth() + 1).padStart(2, "0"),
  String(now.getUTCDate()).padStart(2, "0"),
  "-",
  String(now.getUTCHours()).padStart(2, "0"),
  String(now.getUTCMinutes()).padStart(2, "0"),
  String(now.getUTCSeconds()).padStart(2, "0"),
].join("");
const rawPath = path.join(backupDir, `pp-${stamp}.db`);

// 1) Snapshot konsisten (VACUUM INTO menulis salinan bersih & terdefragmentasi)
const db = new DatabaseSync(dbPath, { readOnly: true });
try {
  db.exec(`VACUUM INTO '${rawPath.replace(/'/g, "''")}'`);
} catch (e) {
  fail(`VACUUM INTO error: ${e.message}`);
} finally {
  db.close();
}

// 2) Integrity check snapshot
const snap = new DatabaseSync(rawPath, { readOnly: true });
let check;
try {
  check = snap.prepare("PRAGMA integrity_check").get();
} finally {
  snap.close();
}
if (!check || check.integrity_check !== "ok") {
  fs.rmSync(rawPath, { force: true });
  fail(`integrity_check snapshot: ${JSON.stringify(check)}`);
}

// 3) Kompresi + hapus mentah
const gzPath = `${rawPath}.gz`;
fs.writeFileSync(gzPath, gzipSync(fs.readFileSync(rawPath)));
fs.rmSync(rawPath, { force: true });

// 4) Retensi: sisakan RETAIN file .db.gz terbaru
const all = fs
  .readdirSync(backupDir)
  .filter((f) => f.startsWith("pp-") && f.endsWith(".db.gz"))
  .sort();
let purged = 0;
while (all.length > RETAIN) {
  fs.rmSync(path.join(backupDir, all.shift()), { force: true });
  purged += 1;
}

const sizeKb = (fs.statSync(gzPath).size / 1024).toFixed(1);
log(
  `BACKUP OK: ${path.basename(gzPath)} (${sizeKb} KB, integrity ok` +
    (purged ? `, retensi -${purged}` : "") +
    ")",
);
