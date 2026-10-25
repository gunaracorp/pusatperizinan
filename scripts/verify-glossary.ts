// ============================================================
// QA — Verifikasi data glosarium (ROADMAP-99 langkah 41)
// Jalankan: bun run scripts/verify-glossary.ts
// ============================================================

import { ALL_SERVICE_PAGES } from "../src/lib/catalog";
import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_TERMS,
  getRelatedGlossaryTerms,
} from "../src/lib/glosarium";

const ALLOWED_STATIC_HREFS = new Set([
  "/konsultasi",
  "/kalkulator",
  "/kalkulator-pajak",
  "/kepatuhan-pro",
  "/kbli",
  "/katalog",
  "/virtual-office",
  "/layanan/kategori/pajak",
]);

let errors = 0;
let warnings = 0;
const fail = (msg: string) => {
  errors++;
  console.error("  ✗ " + msg);
};
const warn = (msg: string) => {
  warnings++;
  console.warn("  ⚠ " + msg);
};

// 1. Jumlah minimal
console.log(`TOTAL istilah: ${GLOSSARY_TERMS.length}`);
if (GLOSSARY_TERMS.length < 200) fail(`Glosarium kurang dari 200 (${GLOSSARY_TERMS.length})`);

// 2. Slug unik
const slugs = GLOSSARY_TERMS.map((t) => t.slug);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupes.length) fail(`Slug duplikat: ${[...new Set(dupes)].join(", ")}`);
else console.log("  ✓ Slug unik (semua)");

// 3. Kategori valid
const validCats = new Set(GLOSSARY_CATEGORIES.map((c) => c.id));
for (const t of GLOSSARY_TERMS) {
  if (!validCats.has(t.category)) fail(`${t.slug}: kategori tidak dikenal "${t.category}"`);
}
const perCat = GLOSSARY_CATEGORIES.map(
  (c) => `${c.id}=${GLOSSARY_TERMS.filter((t) => t.category === c.id).length}`
).join(", ");
console.log(`  ✓ Per kategori: ${perCat}`);
for (const c of GLOSSARY_CATEGORIES) {
  if (GLOSSARY_TERMS.filter((t) => t.category === c.id).length < 15)
    warn(`Kategori "${c.id}" kurang dari 15 istilah`);
}

// 4. Konten minimum
for (const t of GLOSSARY_TERMS) {
  const words = t.short.trim().split(/\s+/).length;
  if (words < 30) fail(`${t.slug}: short hanya ${words} kata (min 30)`);
  if (!t.detail || t.detail.length < 2)
    fail(`${t.slug}: detail kurang dari 2 paragraf`);
  for (const [i, p] of (t.detail ?? []).entries()) {
    if (p.trim().split(/\s+/).length < 30)
      fail(`${t.slug}: paragraf detail[${i}] hanya ${p.trim().split(/\s+/).length} kata (min 30)`);
  }
  if (!t.term || t.term.length < 3) fail(`${t.slug}: nama istilah kosong/terlalu pendek`);
}
console.log("  ✓ Konten minimum (short ≥30 kata, detail ≥2 paragraf ≥30 kata)");

// 5. Relasi related resolve + tanpa self-ref
const slugSet = new Set(slugs);
let relCount = 0;
for (const t of GLOSSARY_TERMS) {
  for (const r of t.related ?? []) {
    relCount++;
    if (r === t.slug) fail(`${t.slug}: related menunjuk diri sendiri`);
    if (!slugSet.has(r)) fail(`${t.slug}: related tidak resolve → "${r}"`);
  }
}
// Helper related: pastikan hasilnya tidak kosong untuk istilah yang punya related
let relatedEmpty = 0;
for (const t of GLOSSARY_TERMS) {
  if ((t.related?.length ?? 0) > 0 && getRelatedGlossaryTerms(t.slug, 6).length === 0)
    relatedEmpty++;
}
if (relatedEmpty) fail(`${relatedEmpty} istilah punya related tapi helper mengembalikan 0`);
console.log(`  ✓ ${relCount} tautan related semuanya resolve (tanpa self-ref)`);

// 6. Href layanan valid — semua base service atau allowlist statis
const serviceSlugs = new Set(ALL_SERVICE_PAGES.map((p) => p.slug));
let linkCount = 0;
for (const t of GLOSSARY_TERMS) {
  for (const s of t.services ?? []) {
    linkCount++;
    if (s.href.startsWith("/layanan/")) {
      const slug = s.href.replace("/layanan/", "");
      if (!serviceSlugs.has(slug)) fail(`${t.slug}: href tidak valid ${s.href} (bukan base service)`);
    } else if (!ALLOWED_STATIC_HREFS.has(s.href)) {
      fail(`${t.slug}: href statis tidak di-allowlist ${s.href}`);
    }
    if (!s.label || s.label.length < 5) fail(`${t.slug}: label layanan terlalu pendek "${s.label}"`);
  }
}
console.log(`  ✓ ${linkCount} tautan layanan internal semuanya valid`);

// 7. Slug URL-safe
for (const s of slugs) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)) fail(`Slug tidak URL-safe: "${s}"`);
}
console.log("  ✓ Semua slug URL-safe (kebab-case)");

// 8. Determinisme — data statis, sort stabil
const sorted = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term, "id"));
console.log(
  `  ✓ Sort deterministik: ${sorted[0].term} → ${sorted[sorted.length - 1].term}`
);

console.log("\n==============================");
console.log(
  errors === 0
    ? `PASS — ${GLOSSARY_TERMS.length} istilah, ${relCount} related, ${linkCount} service-link (${warnings} warning)`
    : `FAIL — ${errors} error, ${warnings} warning`
);
process.exit(errors === 0 ? 0 : 1);
