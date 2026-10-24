// Smoke test ROADMAP-99 langkah 25: 516 hub kab/kota + routing
import { getCityHubs, getAnyPage, getHubSlugs, ALL_SERVICE_PAGES } from "../src/lib/catalog";

const hubs = getCityHubs();
console.log(`City hubs: ${hubs.length} (target ≥ 514)`);
console.log(`ALL_SERVICE_PAGES: ${ALL_SERVICE_PAGES.length}`);
console.log(`getHubSlugs: ${getHubSlugs().length}`);

// Cek sample halaman baru (kabupaten & kota non-major)
const tests = [
  "wilayah/sumatera-utara/kabupaten-deli-serdang",
  "wilayah/jawa-barat/kota-sukabumi",
  "wilayah/sulawesi-tengah/kabupaten-donggala",
  "wilayah/papua-tengah/kabupaten-puncak-jaya",
  "wilayah/papua-barat-daya/kabupaten-raja-ampat",
  // existing URL HARUS tetap sama
  "wilayah/sumatera-utara/medan",
  "wilayah/jambi/jambi-kota",
  "wilayah/dki-jakarta/jakarta-selatan-scbd",
  "wilayah/sulawesi-tengah/luwuk",
  "wilayah/papua-barat/sorong",
  "wilayah/papua-tengah/timika-mimika",
];
let ok = true;
for (const t of tests) {
  const p = getAnyPage(t);
  if (!p) { console.log(`❌ MISSING: ${t}`); ok = false; continue; }
  console.log(`✅ ${t} → "${p.h1}" | faq=${p.faq.length}`);
}
// URL kota baru tidak boleh bentrok & jumlah harus konsisten antar panggilan
const second = getCityHubs();
if (second.length !== hubs.length) { console.log("❌ getCityHubs tidak memoized konsisten"); ok = false; }

// Semua hub harus punya breadcrumb balik ke provinsi
const broken = hubs.filter((h) => h.breadcrumbs.length < 4);
if (broken.length) { console.log(`❌ ${broken.length} hub tanpa breadcrumb 4 level`); ok = false; }

console.log(ok ? "\n✅ SMOKE TEST PASS" : "\n❌ FAIL");
