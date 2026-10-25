// ============================================================
// QA — Verifikasi Kalender Editorial Blog (ROADMAP-99 langkah 35)
// Jalankan: bun run scripts/verify-editorial.ts
// ============================================================

import { db } from "../src/lib/db";
import {
  EDITORIAL_HORIZON_WEEKS,
  PILLAR_META,
  TOPIC_BANK,
  currentWeekStart,
  ensureUpcomingWeeks,
  getEditorialBoard,
  pillarBySlotIndex,
  scaffoldForPillar,
  slotDate,
  starterExcerpt,
  topicForWeek,
  weekLabel,
} from "../src/lib/editorial";
import type { EditorialPillar } from "../src/lib/editorial";

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
const ok = (msg: string) => console.log("  ✓ " + msg);

const PILLARS = Object.keys(PILLAR_META) as EditorialPillar[];

console.log("\n═══ 1. Bank topik — kelengkapan & keunikan ═══");
const allTitles = new Set<string>();
const allKeywords = new Set<string>();
for (const p of PILLARS) {
  const bank = TOPIC_BANK[p];
  if (bank.length !== EDITORIAL_HORIZON_WEEKS) {
    fail(`${p}: jumlah topik ${bank.length} ≠ ${EDITORIAL_HORIZON_WEEKS} (rotasi akan berulang dalam horizonta)`);
  } else {
    ok(`${p}: ${bank.length} topik = horizonta ${EDITORIAL_HORIZON_WEEKS} minggu`);
  }
  for (const t of bank) {
    if (!t.title.trim()) fail(`${p}: ada judul kosong`);
    if (allTitles.has(t.title)) fail(`judul duplikat lintas pilar: "${t.title}"`);
    allTitles.add(t.title);
    if (!t.focusKeyword.trim()) fail(`${p}: "${t.title.slice(0, 40)}" tanpa kata kunci fokus`);
    if (allKeywords.has(t.focusKeyword)) fail(`kata kunci fokus duplikat: "${t.focusKeyword}"`);
    allKeywords.add(t.focusKeyword);
    if (!t.keywords.trim()) warn(`"${t.title.slice(0, 40)}" tanpa kata kunci tambahan`);
    if ((t.notes ?? "").length < 40) fail(`${p}: sudut pandang terlalu pendek (<40 kar.): "${t.title.slice(0, 40)}"`);
  }
}
ok(`total ${allTitles.size} topik unik (3 pilar × ${EDITORIAL_HORIZON_WEEKS})`);

console.log("\n═══ 2. Rotasi topik — tanpa pengulangan dalam horizonta ═══");
const monday = currentWeekStart();
for (const p of PILLARS) {
  const seen = new Set<string>();
  for (let w = 0; w < EDITORIAL_HORIZON_WEEKS; w++) {
    const d = new Date(Date.parse(`${monday}T00:00:00Z`) + w * 7 * 86400_000);
    const ws = d.toISOString().slice(0, 10);
    const t = topicForWeek(p, ws);
    if (seen.has(t.title)) fail(`${p}: topik "${t.title.slice(0, 40)}" berulang dalam ${EDITORIAL_HORIZON_WEEKS} minggu`);
    seen.add(t.title);
  }
  ok(`${p}: ${seen.size}/${EDITORIAL_HORIZON_WEEKS} minggu tanpa pengulangan`);
}

console.log("\n═══ 3. Helper minggu WIB ═══");
const dow = new Date(`${monday}T00:00:00Z`).getUTCDay();
if (dow !== 1) fail(`currentWeekStart(${monday}) bukan Senin (dow=${dow})`);
else ok(`currentWeekStart = ${monday} (Senin WIB)`);
const label = weekLabel(monday);
if (!/^\d{1,2} \w{3} – \d{1,2} \w{3} \d{4}$/.test(label)) fail(`format weekLabel tak terduga: "${label}"`);
else ok(`weekLabel: "${label}"`);
if (slotDate(monday, 0) !== monday) fail(`slotDate(0) ≠ weekStart`);
if (slotDate(monday, 1) !== new Date(Date.parse(`${monday}T00:00:00Z`) + 2 * 86400_000).toISOString().slice(0, 10))
  fail(`slotDate(1) ≠ Senin+2 (Rabu)`);
if (slotDate(monday, 2) !== new Date(Date.parse(`${monday}T00:00:00Z`) + 4 * 86400_000).toISOString().slice(0, 10))
  fail(`slotDate(2) ≠ Senin+4 (Jumat)`);
ok("slotDate: Senin+0 / +2 / +4 tepat");
for (let i = 0; i < 3; i++) {
  const expect = ["PANDUAN", "REGULASI", "PAJAK"][i];
  if (pillarBySlotIndex(i) !== expect) fail(`pillarBySlotIndex(${i}) ≠ ${expect}`);
}
ok("slotIndex → pilar (0=Senin/Panduan, 1=Rabu/Regulasi, 2=Jumat/Pajak)");

console.log("\n═══ 4. Scaffold & starter excerpt ═══");
for (const p of PILLARS) {
  const sc = scaffoldForPillar(p);
  if (sc.length !== 3) fail(`scaffold ${p}: ${sc.length} section (harus 3)`);
  if (sc.some((s) => !s.heading.trim() || s.paragraphs.length !== 0)) fail(`scaffold ${p}: heading kosong / paragraphs tidak kosong`);
}
ok("scaffold 3 pilar: 3 heading H2 kosong-isi, siap diedit");
const ex = starterExcerpt({ title: TOPIC_BANK.PANDUAN[0].title, notes: TOPIC_BANK.PANDUAN[0].notes });
if (ex.length < 60 || ex.length > 300) fail(`starterExcerpt panjang tak wajar: ${ex.length}`);
else ok(`starterExcerpt ${ex.length} kar. (60–300)`);

console.log("\n═══ 5. DB — ensure idempoten & papan konsisten ═══");
try {
  await ensureUpcomingWeeks();
  const c1 = await db.editorialSlot.count();
  await ensureUpcomingWeeks();
  const c2 = await db.editorialSlot.count();
  if (c1 !== c2) fail(`ensureUpcomingWeeks tidak idempoten: ${c1} → ${c2}`);
  else ok(`ensureUpcomingWeeks idempoten (${c2} slot)`);
  if (c1 < EDITORIAL_HORIZON_WEEKS * 3) fail(`slot ${c1} < ${EDITORIAL_HORIZON_WEEKS * 3} (12 minggu × 3)`);
  else ok(`slot terisi ${c1}/${EDITORIAL_HORIZON_WEEKS * 3}`);
  const board = await getEditorialBoard();
  const weeksOk = board.weeks.length === EDITORIAL_HORIZON_WEEKS;
  if (!weeksOk) fail(`board weeks ${board.weeks.length} ≠ ${EDITORIAL_HORIZON_WEEKS}`);
  else ok(`board: ${board.weeks.length} minggu, minggu-0 current=${board.weeks[0].isCurrent}`);
  const badPillar = board.weeks.flatMap((w) => w.slots).find(
    (s) => PILLAR_META[s.pillar].slotIndex !== s.slotIndex
  );
  if (badPillar) fail(`ada slot dengan pilar/slotIndex tak sinkron: ${badPillar.id}`);
  else ok("seluruh slot: pilar ↔ slotIndex ↔ hari sinkron");
  const slotIdxSet = new Set(board.weeks[0].slots.map((s) => s.slotIndex));
  if (slotIdxSet.size !== 3) fail("minggu-0 tidak punya 3 slotIndex unik");
  else ok("minggu-0: 3 slot (Senin/Rabu/Jumat)");
} catch (e) {
  fail(`DB check gagal: ${e instanceof Error ? e.message : String(e)}`);
}

console.log("\n════════════════════════════════════");
if (errors === 0) {
  console.log(`VERDICT: PASS ✅  (${warnings} warning)`);
  process.exit(0);
} else {
  console.log(`VERDICT: FAIL ❌  (${errors} error, ${warnings} warning)`);
  process.exit(1);
}
