#!/usr/bin/env node
// ============================================================
// PUSATPERIZINAN.COM — CLI AUTO-PING SEO
// ============================================================
// Pemakaian:
//   node scripts/seo/auto-ping.mjs                 → siklus harian penuh (diff + IndexNow + rotasi 12 URL GSC)
//   node scripts/seo/auto-ping.mjs --daily         → sama dengan di atas
//   node scripts/seo/auto-ping.mjs --rotation-only → hanya cetak 12 URL rotasi hari ini (tanpa ping, tanpa ubah state)
//   node scripts/seo/auto-ping.mjs --ping-file f   → ping URL dari file (satu per baris) ke IndexNow
//   node scripts/seo/auto-ping.mjs --ping-url U    → ping satu URL
//   node scripts/seo/auto-ping.mjs --dry-run       → diff + rotasi tanpa submit & tanpa tulis state
//   node scripts/seo/auto-ping.mjs --base <url>    → override base sitemap (default http://localhost:3000 / env PING_BASE)
//
// Keluaran harian:
//   download/seo/gsc-request-<tanggal>.txt  → 12 URL siap request-indexing manual di GSC
//   download/seo/ping-report-<tanggal>.json → laporan lengkap mesin
//   .seo/state.json                         → snapshot + kursor rotasi + log ping (idempoten)
// ============================================================

import { readFileSync } from "node:fs";
import {
  runDailyCycle,
  submitIndexNow,
  getEnv,
  loadState,
  buildRotationPool,
  pickRotation,
  fetchAllUrls,
} from "../../src/lib/seo-ping-core.mjs";

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const has = (name) => process.argv.includes(name);

const mode = {
  rotationOnly: has("--rotation-only"),
  pingFile: arg("--ping-file"),
  pingUrl: arg("--ping-url"),
  dryRun: has("--dry-run"),
  base: arg("--base"),
};

const root = process.cwd();

// ---------- mode ping manual ----------
if (mode.pingFile || mode.pingUrl) {
  const urls = mode.pingUrl
    ? [mode.pingUrl]
    : readFileSync(mode.pingFile, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith("https://"));
  const key = getEnv("INDEXNOW_KEY");
  if (!key) {
    console.error("INDEXNOW_KEY belum di-set di .env — generate di /webmaster (tab IndexNow).");
    process.exit(1);
  }
  console.log(`Ping ${urls.length} URL ke IndexNow...`);
  const res = await submitIndexNow(urls, {
    key,
    host: "pusatperizinan.com",
    keyLocation: `https://pusatperizinan.com/${key}.txt`,
  });
  console.log(JSON.stringify(res, null, 1));
  process.exit(res.ok ? 0 : 2);
}

// ---------- mode rotasi saja (tanpa menyentuh state) ----------
if (mode.rotationOnly) {
  const base = (mode.base || getEnv("PING_BASE", "http://localhost:3000")).replace(/\/$/, "");
  const { all } = await fetchAllUrls(base);
  const state = loadState(root);
  let seedUrls = [];
  try {
    seedUrls = readFileSync(`${root}/download/ping-priority-indexnow.txt`, "utf8")
      .split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith("https://"));
  } catch {}
  const pool = buildRotationPool(all, { seedUrls });
  const { list } = pickRotation(pool, state.rotation.cursor, 12);
  console.log(list.join("\n"));
  process.exit(0);
}

// ---------- mode harian (default) ----------
console.log(`[auto-ping] mulai ${new Date().toISOString()} — base: ${mode.base || getEnv("PING_BASE", "http://localhost:3000")}`);
const { report, rotation, newEntries, ping } = await runDailyCycle({
  root,
  base: mode.base,
  dryRun: mode.dryRun,
});

console.log(`
=== LAPORAN AUTO-PING ${report.date} ===
Total URL sitemap      : ${report.totalSitemapUrls}
URL baru vs snapshot   : ${newEntries.length}
Dikirim ke IndexNow    : ${ping.submitted} (HTTP ${ping.status || "-"})${ping.error ? `\n  ⚠ ${ping.error}` : ""}
Pool rotasi GSC        : ${report.rotation.poolSize} URL (kursor ${report.rotation.cursorStart} → ${report.rotation.cursorEnd})
Durasi                 : ${(report.durationMs / 1000).toFixed(1)} dtk

=== 12 URL ROTASI HARI INI (request-indexing manual di GSC) ===
${rotation.map((u, i) => `${String(i + 1).padStart(2, "0")}. ${u}`).join("\n")}

Berkas: download/seo/gsc-request-${report.date}.txt · download/seo/ping-report-${report.date}.json`);
