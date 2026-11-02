// ============================================================
// QA — ROADMAP-99 langkah 7 (v1.13.0 "Peta Provinsi")
// Verifikasi schema Service + Offer di seluruh hub wilayah:
//   • 38 hub provinsi  : /layanan/wilayah/{prov}
//   • spot-check 3 kota: /layanan/wilayah/{prov}/{kota}
// Cek per halaman:
//   1. JSON-LD node Service dengan @id ...#service
//   2. hasOfferCatalog berisi Offer (priceCurrency IDR)
//   3. areaServed State/City
//   4. meta geo.region = kode ISO 3166-2:ID provinsi
//   5. Node non-wilayah (kategori) TIDAK mendapat #service
// Jalankan: bun scripts/verify-wilayah-schema.ts  (dev server :3000)
// ============================================================

import { PROVINCES } from "../src/lib/coverage-data";
import { PROVINCE_GEO } from "../src/lib/geo";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const BASE = process.env.VERIFY_BASE ?? "http://localhost:3000";

let failures = 0;
function fail(msg: string) {
  failures++;
  console.error(`  ✗ ${msg}`);
}
function ok(msg: string) {
  console.log(`  ✓ ${msg}`);
}

async function checkPage(path: string, expectedRegion: string, expectService: boolean) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    fail(`${path} → HTTP ${res.status}`);
    return;
  }
  const html = await res.text();
  const hasService = html.includes('"@id":"' + "https://pusatperizinan.com" + path + "#service\"");
  const hasOffer = html.includes('"@type":"Offer"');
  const hasCatalog = html.includes('hasOfferCatalog');
  const hasArea = html.includes('"areaServed"');
  const iso = PROVINCE_GEO[expectedRegion]?.region ?? "";
  const geoMetaOk = iso ? html.includes(iso) : false;

  if (expectService) {
    if (!hasService) fail(`${path} — node Service #service TIDAK ditemukan`);
    else ok(`${path} — Service ✓`);
    if (!hasOffer) fail(`${path} — Offer tidak ditemukan`);
    if (!hasCatalog) fail(`${path} — hasOfferCatalog tidak ditemukan`);
    if (!hasArea) fail(`${path} — areaServed tidak ditemukan`);
    if (iso && !geoMetaOk) fail(`${path} — kode ISO ${iso} tidak ditemukan (geo meta/schema)`);
    else if (iso) ok(`${path} — geo/ISO ${iso} ✓`);
  } else if (hasService) {
    fail(`${path} — halaman NON-wilayah tidak seharusnya punya #service`);
  } else {
    ok(`${path} — non-wilayah bersih ✓`);
  }
}

async function main() {
  console.log(`QA langkah 7 — schema wilayah di ${BASE}\n`);

  // 0) Data check: 38 provinsi coverage ↔ PROVINCE_GEO lengkap
  const slugs = PROVINCES.map((p) => slugify(p.name));
  const missing = slugs.filter((s) => !PROVINCE_GEO[s]);
  console.log(`[0] coverage-data: ${slugs.length} provinsi · PROVINCE_GEO: ${Object.keys(PROVINCE_GEO).length} entri`);
  if (slugs.length !== 38) fail(`jumlah provinsi coverage = ${slugs.length}, harusnya 38`);
  if (missing.length) fail(`PROVINCE_GEO kurang: ${missing.join(", ")}`);
  else ok("PROVINCE_GEO lengkap 38/38 (banten termasuk)");

  // 1) Seluruh 38 hub provinsi
  console.log("\n[1] 38 hub provinsi /layanan/wilayah/{prov}");
  for (const p of PROVINCES) {
    await checkPage(`/layanan/wilayah/${slugify(p.name)}`, slugify(p.name), true);
  }

  // 2) Spot-check kota (State di dalam City)
  console.log("\n[2] spot-check 3 hub kota");
  const cityChecks: Array<[string, string, string]> = [
    ["/layanan/wilayah/bali/denpasar", "bali", "Denpasar"],
    ["/layanan/wilayah/jawa-barat/bandung", "jawa-barat", "Bandung"],
    ["/layanan/wilayah/banten/serang", "banten", "Serang"],
  ];
  for (const [path, prov, city] of cityChecks) {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) {
      fail(`${path} → HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();
    const cityOk =
      html.includes('"@type":"City"') &&
      html.includes(`"${city}"`) &&
      html.includes('"containedInPlace"') &&
      html.includes('"@type":"State"');
    const svcOk = html.includes("#service");
    if (!cityOk) fail(`${path} — City/containedInPlace/State tidak lengkap`);
    else if (!svcOk) fail(`${path} — Service #service tidak ditemukan`);
    else ok(`${path} — City ⊂ State(${prov}) + Service ✓`);
  }

  // 3) Regresi: hub kategori tidak boleh dapat #service
  console.log("\n[3] regresi non-wilayah");
  await checkPage("/layanan/kategori/pajak", "", false);

  console.log("\n========================================");
  if (failures > 0) {
    console.error(`VERDICT: FAIL — ${failures} gagal`);
    process.exit(1);
  }
  console.log("VERDICT: PASS — schema wilayah lengkap & bersih");
}

await main();
