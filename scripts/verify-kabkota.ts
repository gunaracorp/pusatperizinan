// Verifikasi data kabupaten/kota: jumlah, alias, dan duplikat slug.
// Dijalankan lintas platform melalui tsx/Node.js (tanpa Bun atau path lokal khusus).
import { KABKOTA_PER_PROVINSI } from "../src/lib/kabkota-data";

const slugify = (value: string): string =>
  value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const RESMI: Record<string, number> = {
  Aceh: 23, "Sumatera Utara": 33, "Sumatera Barat": 19, Riau: 12, Jambi: 11,
  "Sumatera Selatan": 17, "Kepulauan Bangka Belitung": 7, Bengkulu: 10,
  Lampung: 15, "Kepulauan Riau": 7, "DKI Jakarta": 6, "Jawa Barat": 27,
  "Jawa Tengah": 35, "DI Yogyakarta": 5, "Jawa Timur": 38, Banten: 8,
  Bali: 9, "Nusa Tenggara Barat": 10, "Nusa Tenggara Timur": 22,
  "Kalimantan Barat": 14, "Kalimantan Tengah": 14, "Kalimantan Selatan": 13,
  "Kalimantan Timur": 10, "Kalimantan Utara": 5, "Sulawesi Utara": 15,
  Gorontalo: 6, "Sulawesi Tengah": 13, "Sulawesi Selatan": 24,
  "Sulawesi Tenggara": 17, "Sulawesi Barat": 6, Maluku: 11, "Maluku Utara": 10,
  Papua: 9, "Papua Barat": 7, "Papua Barat Daya": 6, "Papua Tengah": 8,
  "Papua Pegunungan": 8, "Papua Selatan": 4,
};

let total = 0;
let ok = true;
const allSlugs = new Map<string, string>();
const provinces = Object.entries(KABKOTA_PER_PROVINSI) as [string, readonly string[]][];

for (const [province, list] of provinces) {
  const resmi = RESMI[province];
  if (resmi === undefined) {
    console.error(`❌ Provinsi tidak terdaftar pada pembanding resmi: ${province}`);
    ok = false;
    continue;
  }
  const extra = list.length - resmi;
  if (extra < 0 || extra > 1) {
    console.error(`❌ ${province}: ${list.length} (resmi ${resmi}) — selisih ${extra}`);
    ok = false;
  }
  const seen = new Set<string>();
  for (const city of list) {
    const citySlug = slugify(city);
    if (seen.has(citySlug)) {
      console.error(`❌ DUP ${province}: ${city}`);
      ok = false;
    }
    seen.add(citySlug);
    const url = `${slugify(province)}/${citySlug}`;
    if (allSlugs.has(url)) {
      console.error(`❌ DUP URL ${url}: ${allSlugs.get(url)} vs ${city}`);
      ok = false;
    }
    allSlugs.set(url, city);
  }
  total += list.length;
}

console.log(`\nTotal entri: ${total} (resmi 514 + ${total - 514} alias existing)`);
console.log(ok ? "✅ Semua jumlah cocok & tidak ada duplikat slug" : "⚠️ Ada masalah di atas");
if (!ok) process.exitCode = 1;
