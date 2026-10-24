// QA — validasi kandidat pasangan baru langkah 34
import { ALL_SERVICE_PAGES } from "../src/lib/catalog/generators";

const bases = ALL_SERVICE_PAGES.filter((p) => p.kind === "base");
const baseMap = new Map(bases.map((p) => [p.slug, p]));
console.log("TOTAL_BASE_ALL_SERVICE_PAGES:", bases.length);

const NEW_PAIRS: [string, string][] = [
  ["ekspansi-asing", "pt"],
  ["ekspansi-asing", "pt-perorangan"],
  ["koperasi-yayasan", "cv"],
  ["iso-14001", "iso-45001"],
  ["iso-9001", "iso-22000"],
  ["iso-14001", "iso-27001"],
  ["iso-9001", "smk3"],
  ["halal", "pirt"],
  ["bpom", "alkes"],
  ["halal", "higiene-sanitasi"],
  ["pirt", "higiene-sanitasi"],
  ["tax-spt-op", "tax-spt-tahunan-badan"],
  ["tax-npwp-badan", "tax-pkp-badan"],
  ["tax-audit", "tax-restitusi"],
  ["tax-restitusi", "tax-sengketa"],
  ["tax-planning", "tax-audit"],
  ["tax-umkm", "tax-pkp-op"],
  ["tax-spt-masa-op", "tax-spt-masa-badan"],
  ["tax-transfer-pricing", "tax-audit"],
  ["pptkis", "lpk-pmi"],
  ["bnsp-pmi", "pptkis"],
  ["bahasa-pmi", "lpk-pmi"],
  ["barat-pmi", "timur-tengah-pmi"],
  ["korea-eps", "taiwan-hk-sg"],
  ["rkab-tambang", "tambang"],
  ["reklame", "pbg"],
  ["nib", "lkpm"],
  ["virtual-office-serviced", "virtual-office-plus-pajak"],
  ["virtual-office-plus-pajak", "virtual-office-bundle-pt"],
  ["halal", "halal-jasa-restoran"],
];

let ok = 0;
for (const [a, b] of NEW_PAIRS) {
  const pa = baseMap.get(a);
  const pb = baseMap.get(b);
  if (pa && pb) {
    ok++;
    console.log(`OK   ${a} vs ${b}  (${pa.h1} | ${pb.h1})`);
  } else {
    console.log(`MISS ${a} vs ${b}  a=${!!pa} b=${!!pb}`);
  }
}
console.log(`\nVALID: ${ok}/${NEW_PAIRS.length}`);
console.log("===DUP CHECK vs PAIRS EXISTING (slug)===");
const existing = ["nib-vs-pt","nib-vs-pt-perorangan","cv-vs-pt-perorangan","halal-vs-bpom","halal-vs-sni","sni-vs-bpom","merek-vs-paten-hki","pbg-vs-lingkungan","api-impex-vs-hscoo","iso-vs-sni","iso-9001-vs-iso-14001","iso-9001-vs-iso-45001","iso-9001-vs-iso-27001","iso-27001-vs-iso-27701","iso-22000-vs-haccp","iso-45001-vs-smk3","iso-17025-vs-iso-15189","pirt-vs-bpom","pirt-vs-sni","lingkungan-vs-b3-proper","tax-npwp-op-vs-tax-npwp-badan","tax-umkm-vs-tax-spt-tahunan-badan","tax-pkp-op-vs-tax-pkp-badan","tax-spt-op-vs-tax-spt-masa-op","tax-sengketa-vs-tax-audit","tax-planning-vs-tax-umkm","ppi-umroh-vs-ppi-haji","jepang-ssw-vs-korea-eps","jepang-ssw-vs-taiwan-hk-sg","korea-eps-vs-timur-tengah-pmi","virtual-office-address-vs-virtual-office-serviced","virtual-office-address-vs-virtual-office-plus-pajak","virtual-office-bundle-pt-vs-virtual-office-pma","halal-jasa-restoran-vs-halal-jasa-hotel","sbu-lpjk-vs-skttk-tenaga-teknik","dokumen-pmi-vs-kontrak-visa-pmi","ppmp-pihk-vs-upgrade-ppiu-ke-pihk","paket-pendirian-travel-umrah-vs-kepatuhan-pmh-2-2026"];
const newSlugs = NEW_PAIRS.map(([a, b]) => `${a}-vs-${b}`);
const dupes = newSlugs.filter((s) => existing.includes(s));
console.log("dupes:", dupes.length ? dupes : "NONE");
