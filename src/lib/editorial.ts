import { db } from "@/lib/db";
import type { CmsPost } from "@/lib/blog-cms";
import { TOPIC_BANK, type TopicSeed } from "@/lib/editorial-topics";
import type {
  EditorialPillar,
  EditorialSlotStatus,
  EditorialSlotView,
  EditorialWeekView,
  EditorialBoard,
} from "@/lib/editorial-types";
export { TOPIC_BANK } from "@/lib/editorial-topics";
export type { TopicSeed } from "@/lib/editorial-topics";
export type {
  EditorialPillar,
  EditorialSlotStatus,
  EditorialSlotView,
  EditorialWeekView,
  EditorialBoard,
} from "@/lib/editorial-types";

// ============================================================
// PUSATPERIZINAN.COM — Kalender Editorial Blog (langkah 35)
// Ritme 3×/minggu: Senin = Panduan · Rabu = Regulasi (berita) ·
// Jumat = Tips Pajak. Horizonta 12 minggu digulir otomatis dari
// bank topik kurasi — slot tersimpan di tabel EditorialSlot agar
// editan admin (ganti topik, skip, draft) tidak tertimpa.
// ============================================================

export const EDITORIAL_HORIZON_WEEKS = 12;


/** Pemetaan pilar → label tampilan + kategori blog CMS */
export const PILLAR_META: Record<
  EditorialPillar,
  { label: string; day: string; slotIndex: number; category: string }
> = {
  PANDUAN: { label: "Panduan", day: "Senin", slotIndex: 0, category: "Panduan" },
  REGULASI: { label: "Regulasi (berita)", day: "Rabu", slotIndex: 1, category: "Regulasi" },
  PAJAK: { label: "Tips Pajak", day: "Jumat", slotIndex: 2, category: "Pajak" },
};

const PILLAR_BY_SLOT: EditorialPillar[] = ["PANDUAN", "REGULASI", "PAJAK"];

export function pillarBySlotIndex(slotIndex: number): EditorialPillar {
  return PILLAR_BY_SLOT[slotIndex] ?? "PANDUAN";
}

/** Kerangka section H2 usulan per pilar — scaffold agar penulisan cepat */
const SCAFFOLD: Record<EditorialPillar, string[]> = {
  PANDUAN: [
    "Syarat & Dokumen yang Harus Disiapkan",
    "Langkah Pengurusan dari Awal sampai Selesai",
    "Kesalahan Umum & Cara Menghindarinya",
  ],
  REGULASI: [
    "Isi Pokok Regulasi yang Berubah",
    "Siapa yang Terdampak & Sejak Kapan",
    "Langkah Kepatuhan yang Perlu Dilakukan",
  ],
  PAJAK: [
    "Dasar Pengenaan & Tarif Berlaku",
    "Cara Menghitung (Contoh Kasus)",
    "Jadwal & Cara Pelaporannya",
  ],
};

export function scaffoldForPillar(pillar: EditorialPillar): { heading: string; paragraphs: string[] }[] {
  return SCAFFOLD[pillar].map((heading) => ({ heading, paragraphs: [] as string[] }));
}

// ------------------------------------------------------------
// Bank topik kurasi — 12 topik × 3 pilar (36 topik = 12 minggu).
// Judul kerja + kata kunci + sudut pandang; admin bebas mengubah
// per slot lewat kalender.
// ------------------------------------------------------------

// ------------------------------------------------------------
// Helper minggu (WIB, UTC+7) — minggu dimulai SENIN.
// ------------------------------------------------------------

const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
/** Senin referensi rotasi topik (2026-01-05 adalah Senin). */
const EPOCH_MONDAY_MS = Date.UTC(2026, 0, 5);

/** ISO tanggal (YYYY-MM-DD) dari Date — dihitung pada sumbu WIB */
function isoDateWIB(shiftedMs: number): string {
  const d = new Date(shiftedMs);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Senin minggu berjalan menurut WIB — "sekarang" 23:00 WIB tetap masuk hari yang sama */
export function currentWeekStart(now: Date = new Date()): string {
  const shifted = now.getTime() + WIB_OFFSET_MS;
  const d = new Date(shifted);
  const dow = d.getUTCDay(); // 0=Minggu .. 6=Sabtu
  const daysSinceMonday = (dow + 6) % 7;
  const midnight = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return isoDateWIB(midnight - daysSinceMonday * DAY_MS);
}

/** Senin minggu ke-`n` setelah ISO Senin tertentu */
function addWeeks(isoMonday: string, n: number): string {
  const [y, m, d] = isoMonday.split("-").map(Number);
  return isoDateWIB(Date.UTC(y, m - 1, d) + n * 7 * DAY_MS);
}

const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function shortDate(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_ID[m - 1]}`;
}

/** Label rentang minggu: "26 Okt – 1 Nov 2026" */
export function weekLabel(weekStart: string): string {
  const [ys, ms, ds] = weekStart.split("-").map(Number);
  const end = new Date(Date.UTC(ys, ms - 1, ds) + 6 * DAY_MS);
  return `${ds} ${MONTHS_ID[ms - 1]} – ${end.getUTCDate()} ${MONTHS_ID[end.getUTCMonth()]} ${end.getUTCFullYear()}`;
}

/** Tanggal spesifik slot: Senin+0 / Rabu+2 / Jumat+4 */
export function slotDate(weekStart: string, slotIndex: number): string {
  const offsetDays = [0, 2, 4][slotIndex] ?? 0;
  const [y, m, d] = weekStart.split("-").map(Number);
  return isoDateWIB(Date.UTC(y, m - 1, d) + offsetDays * DAY_MS);
}

/** Topik dari bank — rotasi deterministik per minggu absolut (tidak berulang dalam 12 minggu) */
export function topicForWeek(pillar: EditorialPillar, weekStartIso: string): TopicSeed {
  const bank = TOPIC_BANK[pillar];
  const [y, m, d] = weekStartIso.split("-").map(Number);
  const ms = Date.UTC(y, m - 1, d);
  const weeksSinceEpoch = Math.floor((ms - EPOCH_MONDAY_MS) / (7 * DAY_MS));
  const idx = ((weeksSinceEpoch % bank.length) + bank.length) % bank.length;
  return bank[idx];
}

// ------------------------------------------------------------
// Layer DB — pastikan horizonta 12 minggu terisi (idempoten),
// lalu susun papan kalender + statistik.
// ------------------------------------------------------------

/** Buat slot yang belum ada untuk 12 minggu ke depan — TIDAK menimpa editan admin */
export async function ensureUpcomingWeeks(now: Date = new Date()): Promise<void> {
  const monday = currentWeekStart(now);
  for (let w = 0; w < EDITORIAL_HORIZON_WEEKS; w++) {
    const weekStart = addWeeks(monday, w);
    for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
      const exists = await db.editorialSlot.findUnique({
        where: { weekStart_slotIndex: { weekStart, slotIndex } },
        select: { id: true },
      });
      if (exists) continue;
      const pillar = pillarBySlotIndex(slotIndex);
      const t = topicForWeek(pillar, weekStart);
      await db.editorialSlot.create({
        data: {
          weekStart,
          slotIndex,
          pillar,
          title: t.title,
          focusKeyword: t.focusKeyword,
          keywords: t.keywords,
          notes: t.notes,
        },
      });
    }
  }
}

/** Slot DB → bentuk tampilan (defensif: data rusak tidak boleh mematikan panel) */
function slotToView(
  s: {
    id: string; slotIndex: number; pillar: string; title: string;
    focusKeyword: string | null; keywords: string | null; notes: string | null;
    status: string; postId: string | null; updatedAt: Date;
  },
  weekStart: string,
  post: { id: string; slug: string; status: string } | null
): EditorialSlotView {
  const pillar = (PILLAR_BY_SLOT as string[]).includes(s.pillar)
    ? (s.pillar as EditorialPillar)
    : "PANDUAN";
  const meta = PILLAR_META[pillar];
  const status = (["PLANNED", "DRAFTED", "PUBLISHED", "SKIPPED"] as string[]).includes(s.status)
    ? (s.status as EditorialSlotStatus)
    : "PLANNED";
  return {
    id: s.id,
    slotIndex: s.slotIndex,
    day: meta.day,
    date: slotDate(weekStart, s.slotIndex),
    pillar,
    pillarLabel: meta.label,
    category: meta.category,
    title: s.title || "Tanpa judul",
    focusKeyword: s.focusKeyword,
    keywords: s.keywords,
    notes: s.notes,
    status,
    post,
    updatedAt: s.updatedAt.toISOString(),
  };
}

/** Susun papan kalender lengkap — dipakai GET /api/admin/editorial */
export async function getEditorialBoard(now: Date = new Date()): Promise<EditorialBoard> {
  const current = currentWeekStart(now);
  const horizonEnd = addWeeks(current, EDITORIAL_HORIZON_WEEKS - 1);
  const rows = await db.editorialSlot.findMany({
    where: { weekStart: { gte: current, lte: horizonEnd } },
    orderBy: [{ weekStart: "asc" }, { slotIndex: "asc" }],
  });

  // gabungkan post terkait dalam 1 query
  const postIds = [...new Set(rows.map((r) => r.postId).filter((v): v is string => Boolean(v)))];
  const posts = postIds.length > 0
    ? await db.post.findMany({
        where: { id: { in: postIds } },
        select: { id: true, slug: true, status: true },
      })
    : [];
  const postMap = new Map(posts.map((p) => [p.id, { id: p.id, slug: p.slug, status: p.status }]));

  const byWeek = new Map<string, EditorialSlotView[]>();
  for (const r of rows) {
    const list = byWeek.get(r.weekStart) ?? [];
    list.push(slotToView(r as Parameters<typeof slotToView>[0], r.weekStart, r.postId ? postMap.get(r.postId) ?? null : null));
    byWeek.set(r.weekStart, list);
  }

  const weeks: EditorialWeekView[] = [];
  for (let w = 0; w < EDITORIAL_HORIZON_WEEKS; w++) {
    const weekStart = addWeeks(current, w);
    const slots = (byWeek.get(weekStart) ?? []).sort((a, b) => a.slotIndex - b.slotIndex);
    weeks.push({
      weekStart,
      label: weekLabel(weekStart),
      isCurrent: weekStart === current,
      isPast: weekStart < current,
      slots,
    });
  }

  const statuses = rows.map((r) => r.status);
  return {
    currentWeekStart: current,
    weeks,
    stats: {
      total: rows.length,
      planned: statuses.filter((s) => s === "PLANNED").length,
      drafted: statuses.filter((s) => s === "DRAFTED").length,
      published: statuses.filter((s) => s === "PUBLISHED").length,
      skipped: statuses.filter((s) => s === "SKIPPED").length,
      bankSize: {
        PANDUAN: TOPIC_BANK.PANDUAN.length,
        REGULASI: TOPIC_BANK.REGULASI.length,
        PAJAK: TOPIC_BANK.PAJAK.length,
      },
    },
  };
}

/** Starter ringkasan untuk draft otomatis — panjang aman (>1, target ~120-160 kar.) */
export function starterExcerpt(t: { title: string; notes: string | null }): string {
  const angle = t.notes ? ` Angle: ${t.notes}` : "";
  const base = `Draf dari Kalender Editorial: ${t.title}.${angle}`;
  return base.length > 300 ? `${base.slice(0, 297)}...` : base;
}

/** Sinkronkan status slot saat Post CMS berubah status (dipanggil dari posts API) */
export async function syncSlotForPost(post: Pick<CmsPost, "id" | "status">): Promise<void> {
  const slot = await db.editorialSlot.findFirst({ where: { postId: post.id } });
  if (!slot) return;
  if (post.status === "PUBLISHED") {
    await db.editorialSlot.update({ where: { id: slot.id }, data: { status: "PUBLISHED" } });
  } else if (slot.status === "PUBLISHED") {
    // artikel di-unpublish → kembali ke DRAFTED
    await db.editorialSlot.update({ where: { id: slot.id }, data: { status: "DRAFTED" } });
  }
}
