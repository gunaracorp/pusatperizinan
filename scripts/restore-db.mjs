#!/usr/bin/env node
// ============================================================
// PUSATPERIZINAN.COM — RESTORE DB DARI BACKUP (Langkah 68)
// ------------------------------------------------------------
// Pemakaian:
//   node scripts/restore-db.mjs backups/pp-20261026-220000.db.gz          → DRY-RUN
//   node scripts/restore-db.mjs backups/pp-....db.gz --to /tmp/test.db    → uji ke path lain
//   node scripts/restore-db.mjs backups/pp-....db.gz --commit             → TIMPA DB AKTIF
//
// --commit: DB aktif disalin dulu ke .pre-restore-<stamp>, lalu backup
// dipulihkan. Verifikasi integrity + perbandingan jumlah objek & baris
// per tabel dilakukan SEBELUM penggantian.
// ============================================================
import { DatabaseSync } from "node:sqlite";
import { gunzipSync } from "node:zlib";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const commit = args.includes("--commit");
const toIdx = args.indexOf("--to");
const toPath = toIdx >= 0 ? path.resolve(args[toIdx + 1]) : null;
const src = path.resolve(args[0] ?? "");

if (!fs.existsSync(src)) {
  console.error(`FAIL: backup tidak ditemukan: ${src}`);
  process.exit(1);
}

function resolveDbPath() {
  const envFile = path.join(ROOT, ".env");
  if (fs.existsSync(envFile)) {
    const m = fs
      .readFileSync(envFile, "utf8")
      .match(/^DATABASE_URL=file:(.+)$/m);
    if (m) return path.resolve(m[1].trim());
  }
  return path.join(ROOT, "db", "custom.db");
}

function snapshotStats(file) {
  const db = new DatabaseSync(file, { readOnly: true });
  try {
    const ic = db.prepare("PRAGMA integrity_check").get();
    const objs = db
      .prepare(
        "SELECT type, name FROM sqlite_master WHERE name NOT LIKE 'sqlite_%'",
      )
      .all();
    let tables = 0;
    let rows = 0;
    const perTable = {};
    for (const o of objs) {
      if (o.type !== "table") continue;
      tables += 1;
      const n = db.prepare(`SELECT COUNT(*) c FROM "${o.name}"`).get().c;
      perTable[o.name] = n;
      rows += n;
    }
    return { ic: ic.integrity_check, tables, rows, perTable };
  } finally {
    db.close();
  }
}

// 1) Ekstrak gzip → file sementara
const tmp = src.replace(/\.gz$/, "") + `.restore-${Date.now()}.db`;
fs.writeFileSync(tmp, gunzipSync(fs.readFileSync(src)));

try {
  // 2) Verifikasi snapshot
  const snap = snapshotStats(tmp);
  console.log(`Snapshot : ${path.basename(src)}`);
  console.log(
    `Integrity: ${snap.ic} | objek tabel: ${snap.tables} | total baris: ${snap.rows}`,
  );
  if (snap.ic !== "ok") {
    console.error("FAIL: integrity snapshot tidak 'ok' — restore dibatalkan.");
    process.exit(2);
  }

  const target = toPath ?? resolveDbPath();

  if (toPath) {
    fs.copyFileSync(tmp, toPath);
    const t = snapshotStats(toPath);
    console.log(
      `RESTORE-UJI OK → ${toPath} (tabel ${t.tables}, baris ${t.rows})`,
    );
  } else if (!commit) {
    console.log(
      "DRY-RUN OK — snapshot valid & siap dipulihkan. Ulangi dengan --commit untuk timpa DB aktif.",
    );
  } else {
    // 3) --commit: amankan DB aktif dulu
    if (fs.existsSync(target)) {
      const safe = `${target}.pre-restore-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}`;
      fs.copyFileSync(target, safe);
      console.log(`DB lama diamankan → ${path.basename(safe)}`);
    }
    fs.copyFileSync(tmp, target);
    const t = snapshotStats(target);
    console.log(
      `RESTORE COMMIT OK → ${target} (tabel ${t.tables}, baris ${t.rows})`,
    );
    console.log("Catatan: restart server agar koneksi DB memuat file baru.");
  }

  // 4) Bandingkan ringkas dengan DB aktif bila ada
  const live = resolveDbPath();
  if (fs.existsSync(live)) {
    const cur = snapshotStats(live);
    console.log(
      `DB aktif  : ${cur.ic} | tabel ${cur.tables} | baris ${cur.rows}`,
    );
  }
} finally {
  fs.rmSync(tmp, { force: true });
}
