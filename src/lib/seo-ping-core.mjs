// ============================================================
// PUSATPERIZINAN.COM — MESIN AUTO-PING SEO (IndexNow + Rotasi GSC)
// ============================================================
// Satu sumber logika untuk dua pintu eksekusi:
//   1. CLI   : node scripts/seo/auto-ping.mjs --daily
//   2. HTTP  : GET /api/cron/seo-ping?secret=CRON_SECRET  (route Next)
//
// Yang dilakukan tiap eksekusi harian:
//   a. Tarik SELURUH URL dari sitemap terpartisi (/sitemap/<id>.xml,
//      15 seksi) SEKUENSIAL — hindari lonjakan memori build seksi
//      paralel (lihat DEV-GUARD di app/sitemap/[id]/route.ts).
//   b. Bandingkan dengan snapshot `.seo/state.json` → URL BARU.
//   c. URL baru → submit IndexNow (api.indexnow.org) per batch 100,
//      idempoten per URL (tidak dobel ping dalam ≤365 hari).
//   d. Susun DAFTAR ROTASI HARIAN 12 URL untuk request-indexing
//      manual di Google Search Console (URL Inspection) — rotasi
//      deterministik + kursor tersimpan, siklus penuh pool.
//   e. Tulis laporan: download/seo/ping-report-<tanggal>.json +
//      download/seo/gsc-request-<tanggal>.txt (siap tempel GSC).
//
// Tanpa dependensi eksternal — Node ≥18 (fetch bawaan).
// ============================================================

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

// ------------------------------------------------------------
// Konstanta
// ------------------------------------------------------------

export const KNOWN_SECTIONS = [
  "static", "blog", "panduan", "testimoni", "layanan", "kbli", "hubs",
  "jobs", "bandingkan", "glosarium", "katalog", "layanan500",
  "layanan-pp", "layanan-pp3", "seo-expansion",
];

// Seksi yang ikut pool rotasi GSC — halaman semantik/konten yang
// paling sering tersangkut "Ditemukan — tak diindeks". Urutan =
// prioritas. URL long-tail layanan (10.262 URL) TIDAK dirotasi:
// jalurnya IndexNow + internal linking, bukan request manual.
export const ROTATION_SECTIONS = [
  "jobs",       // 7 lowongan (JobPosting — prioritas Google Jobs)
  "blog",       // 13 artikel
  "static",     // 36 halaman inti (katalog, kbli, glosarium, biaya, ...)
  "panduan",    // 16 panduan
  "bandingkan", // 78 arena perbandingan
  "kbli",       // 148 detail KBLI
  "glosarium",  // 214 istilah
  "hubs",       // 559 hub wilayah (terakhir, hal terpanjang)
];

export const DEFAULTS = {
  rotationSize: 12,          // 12 URL/hari untuk GSC (aman kuota manual)
  maxNewPingsPerRun: 200,    // pagar anti-banjir saat first run / migrasi besar
  indexnowBatch: 100,        // IndexNow terima ≤10.000; 100 = sopan & mudah di-retry
  batchDelayMs: 1_500,       // jeda antar-batch (hindari 429)
  fetchTimeoutMs: 60_000,    // seksi layanan (8.873 URL) bisa lambat di dev
};

// ------------------------------------------------------------
// Util dasar
// ------------------------------------------------------------

/** Baca `.env` sederhana (KEY=VALUE, abaikan komentar) — tanpa dotenv. */
export function parseEnvFile(envPath) {
  if (!existsSync(envPath)) return {};
  const out = {};
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

export function getEnv(name, fallback = "") {
  if (process.env[name] !== undefined && process.env[name] !== "") return process.env[name];
  const file = parseEnvFile(join(process.cwd(), ".env"));
  return file[name] !== undefined ? file[name] : fallback;
}

/** FNV-1a 32-bit — stabil antar-run, pola deterministik yang sama dengan rich-content.ts. */
export function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

async function fetchWithTimeout(url, timeoutMs) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: ctrl.signal, cache: "no-store" });
  } finally {
    clearTimeout(t);
  }
}

function todayWIB() {
  // Asia/Jakarta = UTC+7 tanpa DST — cukup offset manual agar tak bergantung ICU.
  const d = new Date(Date.now() + 7 * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}

// ------------------------------------------------------------
// Sitemap
// ------------------------------------------------------------

function parseLocs(xml) {
  const out = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1].trim());
  return out;
}

/** Tarik daftar seksi dari indeks /sitemap.xml; fallback daftar statis. */
export async function listSections(base) {
  try {
    const res = await fetchWithTimeout(`${base}/sitemap.xml`, 15_000);
    if (res.ok) {
      const xml = await res.text();
      if (xml.includes("<sitemapindex")) {
        const kids = parseLocs(xml)
          .map((u) => (u.match(/\/sitemap\/([a-z0-9-]+)\.xml/i) || [])[1])
          .filter(Boolean);
        if (kids.length) return [...new Set(kids)];
      }
    }
  } catch {
    /* fallback di bawah */
  }
  return [...KNOWN_SECTIONS];
}

/** Parse satu seksi sitemap → [{ url, section }] */
export async function fetchSectionUrls(base, section) {
  const res = await fetchWithTimeout(`${base}/sitemap/${section}.xml`, DEFAULTS.fetchTimeoutMs);
  if (!res.ok) throw new Error(`HTTP ${res.status} pada /sitemap/${section}.xml`);
  const xml = await res.text();
  if (!xml.includes("<urlset")) return [];
  return parseLocs(xml).map((loc) => ({ url: loc, section }));
}

/**
 * Tarik SEMUA URL dari semua seksi — SEKUENSIAL satu per satu.
 * (Paralel = lonjakan memori build 15 seksi serentak → OOM di sandbox 4GB.)
 */
export async function fetchAllUrls(base, { sections = null, onSection = null } = {}) {
  const ids = sections || (await listSections(base));
  const all = [];
  const errors = [];
  for (const section of ids) {
    try {
      const entries = await fetchSectionUrls(base, section);
      all.push(...entries);
      if (onSection) onSection(section, entries.length);
    } catch (e) {
      errors.push({ section, error: e.message });
    }
    // sela kecil antar seksi — beri napas build on-demand di dev
    await new Promise((r) => setTimeout(r, 250));
  }
  return { all, errors, sections: ids };
}

// ------------------------------------------------------------
// State (snapshot + kursor rotasi + log ping)
// ------------------------------------------------------------

export function statePath(root) {
  return join(root, ".seo", "state.json");
}

export function loadState(root) {
  const p = statePath(root);
  if (existsSync(p)) {
    try {
      const st = JSON.parse(readFileSync(p, "utf8"));
      st.snapshot ??= {};
      st.pinged ??= {};
      st.rotation ??= { cursor: 0, lastDate: "" };
      return st;
    } catch {
      /* korup → mulai segar */
    }
  }
  return { version: 1, updatedAt: "", snapshot: {}, pinged: {}, rotation: { cursor: 0, lastDate: "" } };
}

export function saveState(root, state) {
  const p = statePath(root);
  mkdirSync(dirname(p), { recursive: true });
  state.updatedAt = new Date().toISOString();
  writeFileSync(p, JSON.stringify(state, null, 1) + "\n");
}

/**
 * Tandai URL sebagai sudah ter-ping (dipakai hook on-publish agar
 * cron harian tidak mem-ping ulang URL yang baru saja dikirim instan).
 */
export function markPinged(root, urls, date = todayWIB()) {
  const st = loadState(root);
  for (const u of urls) st.pinged[u] = date;
  saveState(root, st);
}

// ------------------------------------------------------------
// IndexNow
// ------------------------------------------------------------

/**
 * Submit URL ke api.indexnow.org per batch 100 dengan jeda.
 * Return { ok, submitted, status, batches, error }
 */
export async function submitIndexNow(urls, { key, endpoint = "https://api.indexnow.org/indexnow", host, keyLocation, batchSize = DEFAULTS.indexnowBatch, delayMs = DEFAULTS.batchDelayMs } = {}) {
  if (!key) return { ok: false, submitted: 0, status: 0, batches: 0, error: "INDEXNOW_KEY belum di-set di .env" };
  if (!urls.length) return { ok: true, submitted: 0, status: 0, batches: 0, error: null };

  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) batches.push(urls.slice(i, i + batchSize));

  let submitted = 0;
  let lastStatus = 0;
  let firstError = null;

  for (let i = 0; i < batches.length; i++) {
    if (i > 0) await new Promise((r) => setTimeout(r, delayMs));
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        cache: "no-store",
        body: JSON.stringify({ host, key, keyLocation, urlList: batches[i] }),
      });
      lastStatus = res.status;
      // 200/202 = diterima; 429/5xx = berhenti (biar cron berikutnya meresume)
      if (res.status === 200 || res.status === 202) {
        submitted += batches[i].length;
      } else {
        firstError = `HTTP ${res.status} pada batch ${i + 1}/${batches.length}`;
        break;
      }
    } catch (e) {
      firstError = `Jaringan: ${e.message} (batch ${i + 1}/${batches.length})`;
      break;
    }
  }

  return { ok: submitted > 0, submitted, status: lastStatus, batches: batches.length, error: firstError };
}

// ------------------------------------------------------------
// Rotasi harian GSC
// ------------------------------------------------------------

/** Pool rotasi: seed prioritas (jika ada) → seksi semantik sesuai ROTATION_SECTIONS. */
export function buildRotationPool(entries, { seedUrls = [] } = {}) {
  const bySection = new Map();
  for (const e of entries) {
    if (!bySection.has(e.section)) bySection.set(e.section, []);
    bySection.get(e.section).push(e.url);
  }
  const valid = new Set(entries.map((e) => e.url));

  const pool = [];
  const seen = new Set();
  const push = (u) => {
    if (valid.has(u) && !seen.has(u)) {
      seen.add(u);
      pool.push(u);
    }
  };

  // Tier A — seed daftar prioritas manual (download/ping-priority-indexnow.txt)
  for (const u of seedUrls) push(u);
  // Tier B — seksi semantik sesuai urutan prioritas
  for (const s of ROTATION_SECTIONS) for (const u of bySection.get(s) || []) push(u);

  return pool;
}

/**
 * Pilih N URL harian — deterministik: kursor maju N tiap hari,
 * wrap modulo panjang pool, tersimpan di state (idempoten: re-run
 * di hari yang sama mengembalikan daftar yang sama).
 */
export function pickRotation(pool, cursor, n) {
  if (!pool.length) return { list: [], nextCursor: cursor };
  const start = ((cursor % pool.length) + pool.length) % pool.length;
  const list = [];
  for (let i = 0; i < Math.min(n, pool.length); i++) list.push(pool[(start + i) % pool.length]);
  return { list, nextCursor: (start + n) % pool.length };
}

// ------------------------------------------------------------
// Orkestrasi harian
// ------------------------------------------------------------

function reportPath(root, date, kind) {
  const dir = join(root, "download", "seo");
  mkdirSync(dir, { recursive: true });
  return join(dir, `${kind}-${date}.${kind === "gsc-request" ? "txt" : "json"}`);
}

/**
 * Jalankan siklus penuh: diff → IndexNow → rotasi → laporan.
 * opts: { base, root, rotationSize, maxNewPings, dryRun, rotationOnly }
 */
export async function runDailyCycle(opts = {}) {
  const root = opts.root || process.cwd();
  const base = (opts.base || getEnv("PING_BASE", "http://localhost:3000")).replace(/\/$/, "");
  const size = opts.rotationSize || Number(getEnv("GSC_ROTATION_SIZE", DEFAULTS.rotationSize));
  const maxNew = opts.maxNewPings || Number(getEnv("PING_MAX_NEW", DEFAULTS.maxNewPingsPerRun));
  const date = todayWIB();

  const host = new URL(base).host;
  const isProd = host === "pusatperizinan.com";
  const prodBase = isProd ? base : "https://pusatperizinan.com";
  const key = getEnv("INDEXNOW_KEY");

  const state = loadState(root);
  const log = [];
  const t0 = Date.now();

  // --- (a) tarik semua URL sitemap ---
  const { all, errors } = await fetchAllUrls(base, {
    onSection: (s, n) => log.push(`  seksi ${s}: ${n} URL`),
  });
  const currentMap = new Map(all.map((e) => [e.url, e.section]));

  // --- (c) ping URL baru ke IndexNow (pagar jumlah, skip yang sudah pernah diping) ---
  // Entri `pinged` kedaluwarsa setelah 14 hari: bila IndexNow menolak
  // (mis. verifikasi file kunci gagal → 403) URL tetap di-ping ulang nanti.
  const pingedCutoff = Date.now() - 14 * 86_400_000;
  const wasRecentlyPinged = (u) => {
    const d = state.pinged[u];
    if (!d) return false;
    const t = new Date(d).getTime();
    return Number.isFinite(t) && t > pingedCutoff;
  };
  const newEntries = all.filter((e) => !state.snapshot[e.url]);
  // urutkan: seksi semantik dulu (ROTATION_SECTIONS order) → agak deterministik
  const prio = new Map(ROTATION_SECTIONS.map((s, i) => [s, i]));
  newEntries.sort((a, b) => (prio.get(a.section) ?? 99) - (prio.get(b.section) ?? 99));

  const toPing = newEntries.map((e) => e.url).filter((u) => !wasRecentlyPinged(u)).slice(0, maxNew);

  let ping = { ok: true, submitted: 0, status: 0, batches: 0, error: null };
  if (opts.dryRun) {
    log.push(`  DRY-RUN: ${toPing.length} URL baru akan di-ping (tidak dieksekusi)`);
  } else if (toPing.length) {
    ping = await submitIndexNow(toPing, {
      key,
      host: "pusatperizinan.com", // IndexNow selalu memakai host produksi (canonical)
      keyLocation: `${prodBase}/${key}.txt`,
    });
    if (ping.ok) for (const u of toPing) state.pinged[u] = date;
    log.push(`  IndexNow: ${ping.submitted}/${toPing.length} URL baru dikirim (HTTP ${ping.status || "-"})${ping.error ? ` — ${ping.error}` : ""}`);
  } else {
    log.push("  IndexNow: tidak ada URL baru sejak snapshot terakhir");
  }

  // --- (d) rotasi harian 12 URL untuk GSC ---
  let seedUrls = [];
  const seedFile = join(root, "download", "ping-priority-indexnow.txt");
  if (existsSync(seedFile)) {
    seedUrls = readFileSync(seedFile, "utf8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.startsWith("https://"));
  }
  const pool = buildRotationPool(all, { seedUrls });
  const sameDay = state.rotation.lastDate === date;
  const cursor = state.rotation.cursor;
  const { list: rotation, nextCursor: advancedCursor } = pickRotation(pool, cursor, size);
  // Idempoten per hari: re-run di tanggal yang sama TIDAK memajukan kursor
  // (daftar rotasi hari ini tetap identik berapa kali pun cron dipanggil).
  const nextCursor = sameDay ? cursor : advancedCursor;

  // --- (e) tulis laporan + state ---
  const report = {
    date,
    base,
    generatedAt: new Date().toISOString(),
    totalSitemapUrls: all.length,
    sections: Object.fromEntries([...currentMap.values()].map((s) => [s, 0])),
    newSinceSnapshot: newEntries.length,
    indexnow: { submitted: ping.submitted, httpStatus: ping.status, error: ping.error, skippedPingCount: newEntries.length - toPing.length },
    rotation: { poolSize: pool.length, cursorStart: cursor, cursorEnd: nextCursor, size },
    gscList: rotation,
    sitemapErrors: errors,
    durationMs: 0,
    log,
  };
  for (const e of all) report.sections[e.section]++;

  if (!opts.dryRun) {
    // file teks 12 URL — siap tempel ke GSC → Perayapan → Inspeksi URL → Minta pengindeksan
    writeFileSync(
      reportPath(root, date, "gsc-request"),
      `# GSC request-indexing — ${date} (rotasi ${(cursor / pool.length * 100).toFixed(1)}% dari pool ${pool.length} URL)\n` +
        `# Tempel satu per satu ke: Search Console → Inspeksi URL → Minta pengindeksan\n` +
        rotation.join("\n") +
        "\n"
    );
    writeFileSync(reportPath(root, date, "ping-report"), JSON.stringify(report, null, 1) + "\n");

    // simpan state: snapshot URL terkini + kursor rotasi maju
    for (const e of all) state.snapshot[e.url] = e.section;
    state.rotation = { cursor: nextCursor, lastDate: date };
    saveState(root, state);
  }
  report.durationMs = Date.now() - t0;

  return { report, rotation, newEntries, ping, state };
}
