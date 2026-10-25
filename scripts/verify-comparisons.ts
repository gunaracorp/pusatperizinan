// ============================================================
// QA SCRIPT — ROADMAP-99 langkah 34 (Perbandingan Programatik)
// Memverifikasi:
//   1. Semua pasangan programatik resolve ke base page katalog
//   2. Slug unik lintas semua sumber (handmade + programatik + trio)
//   3. Kualitas minimal: >=6 aspek & >=4 FAQ per perbandingan
//   4. Determinisme: dua kali generate → hasil identik
// Jalankan: bun scripts/verify-comparisons.ts
// ============================================================

import { COMPARISONS } from "../src/lib/comparisons";
import { PROGRAMMATIC_COMPARISONS, PROGRAMMATIC_COMPARISONS_TOTAL } from "../src/lib/comparisons-generated";
import { TRIO_COMPARISONS, TRIO_TOTAL } from "../src/lib/comparisons-trio";
import { ALL_SERVICE_PAGES } from "../src/lib/catalog/generators";

let fail = 0;
const check = (label: string, ok: boolean, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) fail++;
};

// ---------- 1. Semua pasangan programatik resolve ----------
const baseMap = new Map(ALL_SERVICE_PAGES.filter((p) => p.kind === "base").map((p) => [p.slug, p]));
const PAIRS_EXPECTED = 68;
check(
  `jumlah perbandingan programatik = ${PAIRS_EXPECTED}`,
  PROGRAMMATIC_COMPARISONS_TOTAL === PAIRS_EXPECTED,
  `aktual: ${PROGRAMMATIC_COMPARISONS_TOTAL}`
);
const broken = PROGRAMMATIC_COMPARISONS.filter((c) => !baseMap.has(c.aId) || !baseMap.has(c.bId));
check("semua aId/bId programatik ada di katalog base", broken.length === 0, broken.map((b) => b.slug).join(", ") || "0 broken");

// ---------- 2. Slug unik lintas sumber ----------
const allSlugs = [...COMPARISONS.map((c) => c.slug), ...TRIO_COMPARISONS.map((t) => t.slug)];
const dupes = allSlugs.filter((s, i) => allSlugs.indexOf(s) !== i);
check(`slug unik (${allSlugs.length} total)`, dupes.length === 0, dupes.join(", ") || "0 duplikat");

// ---------- 3. Kualitas minimal ----------
const thin = COMPARISONS.filter((c) => c.aspects.length < 6 || c.faq.length < 4);
check("semua perbandingan 2-pihak >= 6 aspek & >= 4 FAQ", thin.length === 0, thin.map((t) => t.slug).join(", ") || "OK");
const thinTrio = TRIO_COMPARISONS.filter((t) => t.rows.length < 8 || t.faq.length < 4);
check("semua trio >= 8 aspek & >= 4 FAQ", thinTrio.length === 0, thinTrio.join(", ") || "OK");
const badWinner = COMPARISONS.filter((c) => c.aspects.some((a) => !["a", "b", "tie"].includes(a.winner)));
check("winner valid (a|b|tie)", badWinner.length === 0, badWinner.map((b) => b.slug).join(", ") || "OK");
const badBest = TRIO_COMPARISONS.filter((t) => t.rows.some((r) => r.best !== null && ![0, 1, 2].includes(r.best)));
check("trio best valid (0|1|2|null)", badBest.length === 0, "OK");

// ---------- 4. Determinisme ----------
const snap1 = JSON.stringify(PROGRAMMATIC_COMPARISONS.map((c) => ({ s: c.slug, t: c.title, v: c.verdict, a: c.aspects.map((x) => x.a + "|" + x.b) })));
const snap2 = JSON.stringify(PROGRAMMATIC_COMPARISONS.map((c) => ({ s: c.slug, t: c.title, v: c.verdict, a: c.aspects.map((x) => x.a + "|" + x.b) })));
check("determinisme programatik (2x generate identik)", snap1 === snap2);

// ---------- Ringkasan ----------
const totalWords = COMPARISONS.reduce(
  (sum, c) => sum + [...c.intro, ...c.chooseA, ...c.chooseB, c.verdict, ...c.faq.map((f) => f.a)].join(" ").split(/\s+/).length,
  0
);
console.log("\n===== RINGKASAN =====");
console.log(`Handmade  : ${COMPARISONS.length - PROGRAMMATIC_COMPARISONS_TOTAL}`);
console.log(`Programatik: ${PROGRAMMATIC_COMPARISONS_TOTAL}`);
console.log(`Trio      : ${TRIO_TOTAL}`);
console.log(`TOTAL halaman /bandingkan/*: ${allSlugs.length}`);
console.log(`Prosa rata-rata per perbandingan: ${Math.round(totalWords / COMPARISONS.length)} kata`);

if (fail > 0) {
  console.error(`\n${fail} pemeriksaan GAGAL`);
  process.exit(1);
}
console.log("\nSEMUA PEMERIKSAAN PASS ✓");
