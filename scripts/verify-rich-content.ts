// ============================================================
// QA SCRIPT — ROADMAP-99 langkah 33 (Anti-Thin Content)
// Memverifikasi generator rich-content:
//   1. Panjang konten: total kata per layanan (target ±300)
//   2. Keunikan: kombinasi paragraf unik antar 1.000+ layanan
//   3. Determinisme: dua kali generate → hasil identik
// Jalankan: bun scripts/verify-rich-content.ts
// ============================================================

import { KATALOG_V2 } from "../src/lib/katalog-v2";
import { KATALOG_V3 } from "../src/lib/katalog-v3";
import { buildRichParagraphs, richSectionTitle } from "../src/lib/catalog/rich-content";
import { BASE_SERVICES, getServicePage } from "../src/lib/catalog/generators";
import { CATEGORY_META } from "../src/lib/catalog/types";

const wc = (s: string) => s.trim().split(/\s+/).length;

// ---------- 1 & 2. Katalog v2/v3 (1.000 layanan) ----------
const all = [...KATALOG_V2, ...KATALOG_V3];
const combos = new Map<string, string>();
const titles = new Map<string, string>();
const wordCounts: number[] = [];
let min = Infinity;
let max = 0;

for (const s of all) {
  const paras = buildRichParagraphs({
    seed: s.code,
    name: s.name,
    authority: s.authority,
    category: s.category,
    estimate: s.estimate,
    validity: s.validity,
    requirements: s.requirements || "",
    priceLabel: "Rp 1.000.000",
  });
  const key = JSON.stringify(paras);
  const total = paras.reduce((acc, p) => acc + wc(p), 0);
  wordCounts.push(total);
  min = Math.min(min, total);
  max = Math.max(max, total);
  if (!combos.has(key)) combos.set(key, s.code);
  titles.set(richSectionTitle(s.code, s.name), s.code);
}

const uniq = combos.size;
const uniqPct = ((uniq / all.length) * 100).toFixed(1);
const avg = Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length);
const uniqTitles = titles.size;

console.log("=== KATALOG v2/v3 (anti-thin rich content) ===");
console.log(`Layanan        : ${all.length}`);
console.log(`Kata/halaman   : min ${min} · rata² ${avg} · max ${max}`);
console.log(`Kombinasi unik : ${uniq}/${all.length} (${uniqPct}%)`);
console.log(`Judul unik     : ${uniqTitles} varian`);

// ---------- 3. Halaman induk v1 (buildBasePage.longDesc) ----------
console.log("\n=== HALAMAN INDUK v1 (longDesc + rich content) ===");
let baseCount = 0;
let baseMin = Infinity;
let baseMax = 0;
let baseAvgSum = 0;
const baseLongDescUniq = new Set<string>();

for (const b of BASE_SERVICES.values()) {
  const page = getServicePage(b.id); // halaman induk v1: slug = id layanan
  if (!page || page.kind !== "base") continue;
  baseCount++;
  const total = page.longDesc.reduce((acc, p) => acc + wc(p), 0);
  baseMin = Math.min(baseMin, total);
  baseMax = Math.max(baseMax, total);
  baseAvgSum += total;
  baseLongDescUniq.add(JSON.stringify(page.longDesc));
}
console.log(`Halaman induk  : ${baseCount}`);
console.log(`Kata (intro+longDesc): min ${baseMin} · rata² ${Math.round(baseAvgSum / baseCount)} · max ${baseMax}`);
console.log(`longDesc unik  : ${baseLongDescUniq.size}/${baseCount}`);

// ---------- 4. Determinisme ----------
const sample = all[0];
const runA = JSON.stringify(buildRichParagraphs({ seed: sample.code, name: sample.name, authority: sample.authority, category: sample.category, estimate: sample.estimate, validity: sample.validity, requirements: sample.requirements, priceLabel: "Rp 1.000.000" }));
const runB = JSON.stringify(buildRichParagraphs({ seed: sample.code, name: sample.name, authority: sample.authority, category: sample.category, estimate: sample.estimate, validity: sample.validity, requirements: sample.requirements, priceLabel: "Rp 1.000.000" }));
console.log("\n=== DETERMINISME ===");
console.log(`Run A === Run B: ${runA === runB ? "PASS ✅" : "FAIL ❌"}`);

// ---------- 5. Sampel output (2 layanan) ----------
console.log("\n=== SAMPEL OUTPUT ===");
for (const idx of [0, 517]) {
  const s = all[idx];
  console.log(`\n[${s.code}] ${s.name} — judul: "${richSectionTitle(s.code, s.name)}"`);
  const paras = buildRichParagraphs({
    seed: s.code, name: s.name, authority: s.authority, category: s.category,
    estimate: s.estimate, validity: s.validity, requirements: s.requirements || "", priceLabel: "Rp 1.000.000",
  });
  paras.forEach((p, i) => console.log(`  P${i + 1} (${wc(p)} kata): ${p}`));
}

// ---------- Verdict ----------
const pass = avg >= 280 && min >= 240 && parseFloat(uniqPct) >= 95 && baseLongDescUniq.size === baseCount && runA === runB;
console.log(`\nVERDICT: ${pass ? "PASS ✅" : "REVIEW ⚠️"}`);
if (!pass) process.exit(1);
