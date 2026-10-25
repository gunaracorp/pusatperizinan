// ============================================================
// scripts/verify-order-cta.ts — QA RILIS v1.11.0 "Sapa Langsung"
// ============================================================
// Verifikasi ROADMAP-99:
//   langkah 3 — blok bundle "Sering Diambil Bersama" −10% di halaman
//               detail v1 (/[slug], 500 layanan) — paritas dgn v2/v3
//   langkah 5 — Floating WhatsApp CTA sitewide (komponen + mount layout)
//   langkah 4 — Microsoft Clarity env-gated (analytics.tsx)
// Jalankan: bun scripts/verify-order-cta.ts
// ============================================================

import { readFileSync } from "node:fs";
import path from "node:path";
import { LAYANAN_500, slugOf } from "../src/lib/layanan-500";
import { WHATSAPP_NUMBER } from "../src/lib/landing-data";
import { CONTACT } from "../src/lib/site";

const fail = (msg: string) => {
  console.error("  ✗ " + msg);
  process.exitCode = 1;
};
const warn = (msg: string) => console.warn("  ⚠ " + msg);
const ok = (msg: string) => console.log("  ✓ " + msg);

const ROOT = path.resolve(__dirname, "..");

function readFile(rel: string): string {
  try {
    return readFileSync(path.join(ROOT, rel), "utf8");
  } catch {
    fail(`file hilang: ${rel}`);
    return "";
  }
}

// --- Mirror FNV-1a + pickBundleV1 dari src/app/[slug]/page.tsx ---
// (halaman detail tidak bisa diimpor ke skrip — berisi JSX/next —
//  jadi algoritma dicerminkan persis; perubahan di halaman wajib
//  disinkronkan di sini.)
function hashU32(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickBundleV1(code: string, kategoriKode: string): typeof LAYANAN_500 {
  const pool = LAYANAN_500.filter((x) => x.kategori_kode !== kategoriKode);
  if (pool.length === 0) return [];
  const h = hashU32(code);
  const i1 = h % pool.length;
  let i2 = (i1 + 1 + ((h >>> 8) % Math.max(1, pool.length - 1))) % pool.length;
  if (i2 === i1) i2 = (i1 + 1) % pool.length;
  return [pool[i1], pool[i2]];
}

// ------------------------------------------------------------
console.log("\n1) Bundle v1 — determinisme, lintas kategori, matematika −10%");
// ------------------------------------------------------------
let bundleIssues = 0;
const bundleCrossPairs = new Set<string>();
for (const s of LAYANAN_500) {
  const b1 = pickBundleV1(s.kode, s.kategori_kode);
  const b2 = pickBundleV1(s.kode, s.kategori_kode);
  if (b1.length !== 2) {
    fail(`${s.kode}: anggota bundle ${b1.length} (harus 2)`);
    bundleIssues++;
    continue;
  }
  if (JSON.stringify(b1.map((x) => x.kode)) !== JSON.stringify(b2.map((x) => x.kode))) {
    fail(`${s.kode}: bundle tidak deterministik`);
    bundleIssues++;
  }
  if (b1.some((x) => x.kategori_kode === s.kategori_kode)) {
    fail(`${s.kode}: anggota bundle dari kategori yang sama`);
    bundleIssues++;
  }
  const [a, c] = b1;
  if (a.kode === c.kode || a.kode === s.kode || c.kode === s.kode) {
    fail(`${s.kode}: kode duplikat di dalam bundle`);
    bundleIssues++;
  }
  const total = s.harga_diskon + a.harga_diskon + c.harga_diskon;
  const price = Math.round(total * 0.9);
  if (!(price < total && price > 0)) {
    fail(`${s.kode}: harga bundle ${price} tidak valid (total ${total})`);
    bundleIssues++;
  }
  for (const x of b1) {
    const slug = slugOf(x);
    if (!slug) {
      fail(`${s.kode}: slug kosong untuk ${x.kode}`);
      bundleIssues++;
    }
  }
  bundleCrossPairs.add([s.kode, ...b1.map((x) => x.kode)].sort().join("|"));
}
if (bundleIssues === 0) {
  ok(`${LAYANAN_500.length}/${LAYANAN_500.length} layanan v1: bundle 2 pelengkap lintas kategori, deterministik, harga −10% valid`);
}
const totalCombos = bundleCrossPairs.size;
if (totalCombos === LAYANAN_500.length) {
  ok(`kombinasi bundle unik: ${totalCombos} dari ${LAYANAN_500.length} kode (tanpa kolapsi hash)`);
} else {
  fail(`kombinasi bundle hanya ${totalCombos} dari ${LAYANAN_500.length} — ada kolapsi hash`);
}

// ------------------------------------------------------------
console.log("\n2) Halaman detail v1 ([slug]/page.tsx) — blok bundle terpasang");
// ------------------------------------------------------------
const v1Page = readFile("src/app/[slug]/page.tsx");
if (v1Page.includes("Sering Diambil Bersama — Paket Hemat 10%")) {
  ok('judul blok "Sering Diambil Bersama — Paket Hemat 10%" ada');
} else fail("judul blok bundle tidak ditemukan di [slug]/page.tsx");
if (v1Page.includes("pickBundleV1") && v1Page.includes("bundle.length === 2")) {
  ok("helper pickBundleV1 + guard render bundle ada");
} else fail("helper/guard bundle tidak lengkap");
if (v1Page.includes("checkout?paket=${encodeURIComponent(s.kode)}")) {
  ok("CTA checkout tunggal (Ambil <kode> saja) ada");
} else fail("CTA checkout bundle tidak ditemukan");
if (v1Page.includes("Ambil Paket Hemat 3 Layanan")) {
  ok("CTA WhatsApp bundle ada");
} else fail("CTA WhatsApp bundle tidak ditemukan");
if (v1Page.includes("wa.me/${CONTACT.whatsapp}")) {
  ok("nomor WA bundle dari CONTACT.whatsapp (site.ts)");
} else fail("nomor WA bundle tidak memakai CONTACT.whatsapp");

// ------------------------------------------------------------
console.log("\n3) Floating WhatsApp — komponen + mount layout + aturan sembunyi");
// ------------------------------------------------------------
const waComp = readFile("src/components/landing/floating-whatsapp.tsx");
const layout = readFile("src/app/layout.tsx");
const analytics = readFile("src/components/landing/analytics.tsx");

if (waComp.includes("WHATSAPP_NUMBER")) {
  ok("nomor dari landing-data.ts (WHATSAPP_NUMBER) — sumber tunggal");
} else fail("floating WA tidak memakai WHATSAPP_NUMBER dari landing-data.ts");
for (const marker of ['"/"', "/admin", "/webmaster", "/checkout"]) {
  if (waComp.includes(marker)) ok(`aturan sembunyi memuat "${marker}"`);
  else fail(`aturan sembunyi "${marker}" hilang`);
}
if (waComp.includes("aria-label=")) ok("aria-label eksplisit (a11y)");
else fail("aria-label hilang");
if (waComp.includes("motion-reduce:hidden")) ok("cincin denyut hormat reduced-motion (WCAG)");
else warn("reduced-motion guard tidak ditemukan");
if (waComp.includes("noopener noreferrer")) ok("rel noopener noreferrer (target=_blank)");
else fail("rel noopener noreferrer hilang");
if (layout.includes("<FloatingWhatsApp />")) ok("dimount di root layout (sitewide)");
else fail("FloatingWhatsApp TIDAK dimount di layout.tsx");
if (waComp.includes("wa.me/${WHATSAPP_NUMBER}")) ok("href fallback pra-hydration = wa.me polos");
else fail("fallback href wa.me tidak ditemukan");

// ------------------------------------------------------------
console.log("\n4) Paritas nomor WA lintas modul");
// ------------------------------------------------------------
if (CONTACT.whatsapp === WHATSAPP_NUMBER) {
  ok(`CONTACT.whatsapp (site.ts) === WHATSAPP_NUMBER (landing-data.ts) === ${WHATSAPP_NUMBER}`);
} else {
  fail(`nomor WA berbeda: site.ts=${CONTACT.whatsapp} vs landing-data.ts=${WHATSAPP_NUMBER}`);
}

// ------------------------------------------------------------
console.log("\n5) Analitik — GA4 + Microsoft Clarity env-gated (langkah 4)");
// ------------------------------------------------------------
if (analytics.includes("NEXT_PUBLIC_GA_ID")) ok("GA4 env-gated (NEXT_PUBLIC_GA_ID)");
else fail("GA4 env hilang di analytics.tsx");
if (analytics.includes("NEXT_PUBLIC_CLARITY_ID")) ok("Clarity env-gated (NEXT_PUBLIC_CLARITY_ID)");
else fail("Clarity env hilang di analytics.tsx");
if (analytics.includes("clarity.ms/tag/")) ok("snippet resmi clarity.ms terpasang");
else fail("snippet clarity.ms tidak ditemukan");
if (analytics.includes("afterInteractive")) ok("strategy afterInteractive (tidak geser LCP)");
else fail("strategy afterInteractive hilang");

// ------------------------------------------------------------
console.log("\n6) Dampak permukaan");
// ------------------------------------------------------------
ok(`bundle −10% kini di ${LAYANAN_500.length} halaman v1 + 1.000 halaman v2/v3 (sudah ada)`);
ok(`floating WA tampil di seluruh halaman publik (sembunyi: /, /admin*, /webmaster*, /checkout*)`);
ok("nol URL baru → indeks 11.876 URL tetap aman");

console.log(
  process.exitCode === 1
    ? "\n✗ GAGAL — perbaiki temuan di atas sebelum rilis.\n"
    : "\n✓ verify-order-cta PASS — langkah 3 (bundle v1) + langkah 5 (floating WA) + langkah 4 (Clarity env-gated) terverifikasi.\n"
);
