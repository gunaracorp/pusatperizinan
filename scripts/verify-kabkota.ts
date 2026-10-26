// Verifikasi data kabkota tanpa path lokal atau runtime khusus Bun.
import { KABKOTA_PER_PROVINSI } from "../src/lib/kabkota-data";

const slugify = (t: string) =>
  t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

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
const allSlugs = new Map<string, string>(); // provSlug/citySlug → name
for (const [prov, list] of Object.entries(KABKOTA_PER_PROVINSI)) {
  const resmi = RESMI[prov];
  const extra = list.length - resmi; // +1 = alias yang dipertahankan (Luwuk/Sorong)
  if (extra < 0 || extra > 1) {
    console.log(`❌ ${prov}: ${list.length} (resmi ${resmi}) — selisih ${extra}`);
    ok = false;
  }
  // duplikat slug dalam provinsi
  const seen = new Set<string>();
  for (const k of list) {
    const s = slugify(k);
    if (seen.has(s)) { console.log(`❌ DUP ${prov}: ${k}`); ok = false; }
    seen.add(s);
    const url = `${slugify(prov)}/${s}`;
    if (allSlugs.has(url)) { console.log(`❌ DUP URL ${url}: ${allSlugs.get(url)} vs ${k}`); ok = false; }
    allSlugs.set(url, k);
  }
  total += list.length;
}
console.log(`\nTotal entri: ${total} (resmi 514 + ${total - 514} alias existing)`);
console.log(ok ? "✅ Semua jumlah cocok & tidak ada duplikat slug" : "⚠️ Ada masalah di atas");
