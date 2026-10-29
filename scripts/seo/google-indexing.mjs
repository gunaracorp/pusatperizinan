#!/usr/bin/env node
// ============================================================
// PUSATPERIZINAN.COM — GOOGLE INDEXING API (untuk halaman LOWONGAN)
// ============================================================
// Google Indexing API resminya hanya untuk halaman JobPosting &
// BroadcastEvent — cocok persis untuk /lowongan-kerja yang sudah
// membawa JSON-LD JobPosting (sejak v1.16.0). Kirim URL_UPDATED ke
// https://indexing.googleapis.com/v3/urlNotifications:publish.
//
// SETUP SEKALI (±10 menit):
//   1. https://console.cloud.google.com → buat/pilih project
//   2. Aktifkan "Web Search Indexing API" (indexing.googleapis.com)
//   3. IAM & Admin → Service Accounts → Create (+ key JSON)
//   4. Search Console → Settings → Property settings → tambahkan
//      email service account sebagai PEMILIK (Owner) properti
//   5. Simpan JSON: env GOOGLE_SERVICE_ACCOUNT_JSON='<isi JSON>'
//      atau GOOGLE_APPLICATION_CREDENTIALS=/path/service-account.json
//   6. Uji: node scripts/seo/google-indexing.mjs --jobs
//
// Pemakaian:
//   node scripts/seo/google-indexing.mjs --jobs        → ping semua URL lowongan (seksi jobs sitemap)
//   node scripts/seo/google-indexing.mjs --url <u>     → ping satu URL
//   node scripts/seo/google-indexing.mjs --urls <f>    → ping URL dari file (satu per baris)
//   node scripts/seo/google-indexing.mjs --check <u>   → cek status notifikasi terakhir satu URL
//
// Kuota default: 200 permintaan/hari (bisa diminta naik via Cloud Console).
// Tanpa dependensi eksternal — Node ≥18.
// ============================================================

import { readFileSync, existsSync } from "node:fs";
import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const JOBS_PAGE = "https://pusatperizinan.com/lowongan-kerja";

// ---------- kredensial ----------
function loadCredentials() {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline) {
    try {
      return JSON.parse(inline);
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON bukan JSON service account yang valid.");
    }
  }
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (path && existsSync(path)) {
    return JSON.parse(readFileSync(path, "utf8"));
  }
  return null;
}

const b64url = (buf) => Buffer.from(buf).toString("base64url");

/** Buat (dan cache) access token dari service account — JWT RS256. */
let cachedToken = null;
async function getAccessToken(creds) {
  if (cachedToken && cachedToken.exp > Date.now() / 1000 + 60) return cachedToken.token;

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: creds.client_email,
      scope: INDEXING_SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  signer.end();
  const signature = signer.sign(creds.private_key).toString("base64url");
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`Gagal dapat access token (HTTP ${res.status}): ${data.error_description || data.error || "?"}`);
  }
  cachedToken = { token: data.access_token, exp: now + (data.expires_in || 3600) };
  return cachedToken.token;
}

async function publishUrl(url, creds, type = "URL_UPDATED") {
  const token = await getAccessToken(creds);
  const res = await fetch(PUBLISH_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, type }),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function checkUrl(url, creds) {
  const token = await getAccessToken(creds);
  const res = await fetch(
    `https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(url)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

/** Tarik URL seksi "jobs" dari sitemap lokal (fallback: halaman induk lowongan). */
async function discoverJobUrls(base) {
  const urls = [JOBS_PAGE];
  try {
    const res = await fetch(`${base}/sitemap/jobs.xml`, { cache: "no-store" });
    if (res.ok) {
      const xml = await res.text();
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        const u = m[1].trim();
        if (!urls.includes(u)) urls.push(u);
      }
    }
  } catch {
    /* fallback: hanya halaman induk */
  }
  return urls;
}

// ---------- CLI ----------
function arg(name) {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

let creds;
try {
  creds = loadCredentials();
} catch (e) {
  console.error(`❌ ${e.message}`);
  process.exit(1);
}

if (!creds) {
  console.error(`❌ Kredensial Google belum terpasang.

SETUP (sekali):
  1. Google Cloud Console → aktifkan "Web Search Indexing API"
  2. Buat Service Account + kunci JSON
  3. Search Console → tambahkan email SA sebagai PEMILIK properti
  4. Set env: GOOGLE_SERVICE_ACCOUNT_JSON='<isi JSON>'
     atau GOOGLE_APPLICATION_CREDENTIALS=/path/service-account.json
  5. Jalankan ulang: node scripts/seo/google-indexing.mjs --jobs`);
  process.exit(1);
}

const target = arg("--url") || arg("--check") || arg("--urls");
const jobsMode = process.argv.includes("--jobs");
const checkMode = arg("--check");

if (checkMode) {
  const r = await checkUrl(checkMode, creds);
  console.log(JSON.stringify(r, null, 1));
  process.exit(r.ok ? 0 : 2);
} else if (jobsMode) {
  const base = arg("--base") || "http://localhost:3000";
  const urls = await discoverJobUrls(base);
  console.log(`Ping ${urls.length} URL lowongan ke Google Indexing API...`);
  for (const u of urls) {
    const r = await publishUrl(u, creds);
    console.log(`${r.ok ? "✅" : "❌"} ${u} — HTTP ${r.status}${r.data?.urlNotificationMetadata ? "" : r.data?.error ? ` (${r.data.error.message})` : ""}`);
  }
} else if (target === null) {
  console.error("Pemakaian: --jobs | --url <u> | --urls <file> | --check <u>");
  process.exit(1);
} else {
  const urls = arg("--url")
    ? [arg("--url")]
    : readFileSync(arg("--urls"), "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith("https://"));
  for (const u of urls) {
    const r = await publishUrl(u, creds);
    console.log(`${r.ok ? "✅" : "❌"} ${u} — HTTP ${r.status}`);
  }
}
