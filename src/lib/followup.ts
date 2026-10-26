import { db } from "@/lib/db";
import { getEffectiveSettings, sendTelegram, sendWhatsapp } from "./notify";

// ============================================================
// PUSATPERIZINAN.COM — MESIN FOLLOW-UP OTOMATIS LEAD (langkah 6 ROADMAP-99)
// ============================================================
// "80% penjualan datang dari follow-up, bukan klik pertama."
//
// Sequence 3 langkah untuk lead status NEW (belum dibalas):
//   Step 1 = 24 jam · Step 2 = 48 jam · Step 3 = 72 jam
//
// Dua jalur (lane):
//   lane "lead"  → pesan otomatis LANGSUNG ke nomor lead via gateway WA
//                  (Fonnte/Wablas) — hanya bila gateway terpasang.
//   lane "admin" → reminder ke admin (Telegram gratis / WA gateway)
//                  berisi link wa.me 1-klik dengan pesan siap kirim.
//
// Jaminan:
//   • IDEMPOTEN — @@unique([leadId, step, lane]) + upsert; sweep berulang
//     tidak pernah mengirim dobel (baris "failed" otomatis di-retry sweep
//     berikutnya, baris "sent" tidak disentuh lagi).
//   • BERHENTI OTOMATIS — begitu lead.status ≠ NEW (dihubungi admin),
//     sequence berhenti di langkah mana pun.
//   • TIDAK PERNAH THROW — kegagalan diserap & dilaporkan sebagai ringkasan.
//   • MENGHORMATI LEAD — lead lebih tua dari MAX_AGE_DAYS tidak dikejar;
//     step 3 menyatakan pesan terakhir secara eksplisit.
// ============================================================

export interface FollowUpStep {
  step: number;
  hours: number;
  label: string;
}

export const FOLLOWUP_STEPS: FollowUpStep[] = [
  { step: 1, hours: 24, label: "24 jam" },
  { step: 2, hours: 48, label: "48 jam" },
  { step: 3, hours: 72, label: "72 jam" },
];

/** Lead lebih tua dari ini tidak lagi dikejar (hormati prospek dingin). */
export const MAX_AGE_DAYS = 30;
/** Batas lead yang diproses per sweep (aman utk gateway + rate limit). */
export const SWEEP_BATCH = 50;

export interface LeadLite {
  id: string;
  name: string;
  whatsapp: string;
  businessType: string;
  package: string | null;
  estimatedValue: number;
  source: string;
  createdAt: Date;
}

/** 62xxx → kirim gateway aman. Sumber: form/seed bisa 08xx / 8xx / 62xxx. */
export function normalizeWaDigits(wa: string): string {
  const d = (wa || "").replace(/[^0-9]/g, "");
  if (d.startsWith("62")) return d;
  if (d.startsWith("0")) return "62" + d.slice(1);
  if (d.startsWith("8")) return "62" + d;
  return d;
}

// ------------------------------------------------------------
// TEMPLATE PESAN — 3 langkah, nada naik bertahap, berakhir sopan
// ------------------------------------------------------------

function brand(): string {
  return "PusatPerizinan.com";
}

/** Pesan untuk LEAD per step (dipakai lane lead + prefill 1-klik admin). */
export function leadMessage(lead: LeadLite, step: number): string {
  const layanan = lead.package || "perizinan & kepatuhan usaha";
  const jenis = lead.businessType || "usaha Kakak";
  if (step <= 1) {
    return [
      `Halo Kak ${lead.name} 👋`,
      "",
      `Kemarin Kakak sempat menanyakan soal ${layanan} untuk usaha ${jenis}. Saya tim ${brand()} — masih berminat dilanjutkan?`,
      "",
      "Kalau mau tanya dulu (syarat, biaya, lama proses), cukup balas pesan ini ya Kak. Kami bantu dari awal sampai izin terbit 🙌",
    ].join("\n");
  }
  if (step === 2) {
    return [
      `Halo Kak ${lead.name}, semoga usaha ${jenis}-nya lancar terus 🙌`,
      "",
      `Menindaklanjuti permintaan ${layanan} Kakak kemarin — tim kami siap urus dari awal: dokumen dicek, pengajuan kami antrekan, Kakak tinggal terima laporan progres tiap tahap.`,
      "",
      'Slot konsultasi gratis minggu ini masih ada. Mau kami amankan satu untuk Kakak? Balas "BISA" saja 😊',
    ].join("\n");
  }
  return [
    `Halo Kak ${lead.name} — ini pesan terakhir dari saya kok 🙏`,
    "",
    "Saya berhenti mengirim pengingat setelah ini supaya tidak mengganggu. Tapi kalau rencana pengurusan izinnya masih jalan, pintu kami selalu terbuka:",
    "",
    "✅ Konsultasi awal gratis",
    "✅ Dokumen dicek sebelum diajukan",
    "✅ Progres dilaporkan tiap tahap",
    "",
    `Balas pesan ini kapan saja — kami siap bantu. Sukses selalu untuk usaha Kakak! 🙌`,
    "",
    `— Tim ${brand()}`,
  ].join("\n");
}

/** Link wa.me 1-klik untuk admin (pesan sudah terisi). */
export function waPrefill(lead: LeadLite, step: number): string {
  const digits = normalizeWaDigits(lead.whatsapp);
  return `https://wa.me/${digits}?text=${encodeURIComponent(leadMessage(lead, step))}`;
}

const SOURCE_LABELS: Record<string, string> = {
  landing: "Form Website",
  chat: "Chat AI RIZKI",
  roadmap: "AI Roadmap",
  checker: "AI Cek Izin",
  popup: "Popup Website",
  konsultasi: "Booking Konsultasi",
  test: "Uji Coba",
};

/** Reminder untuk ADMIN per step — berisi semua konteks + link 1-klik. */
export function adminMessage(lead: LeadLite, step: number): string {
  const s = FOLLOWUP_STEPS.find((x) => x.step === step) ?? FOLLOWUP_STEPS[0];
  const ageH = Math.floor((Date.now() - lead.createdAt.getTime()) / 3_600_000);
  const nilai =
    lead.estimatedValue > 0
      ? "Rp " + lead.estimatedValue.toLocaleString("id-ID")
      : "Belum diestimasi";
  return [
    `⏰ FOLLOW-UP ${s.label.toUpperCase()} — lead belum dibalas (step ${step}/3)!`,
    "",
    `👤 ${lead.name} — ${lead.businessType || "jenis usaha belum diisi"}`,
    `📱 ${normalizeWaDigits(lead.whatsapp)}`,
    `📦 Minat: ${lead.package || "belum memilih paket"}`,
    `💰 Nilai estimasi: ${nilai}`,
    `⏳ Umur lead: ${ageH} jam · 📡 ${SOURCE_LABELS[lead.source] || lead.source}`,
    "",
    "👉 Chat 1-klik (pesan sudah disiapkan):",
    waPrefill(lead, step),
    "",
    "Setelah menghubungi, ubah status lead → CONTACTED agar sequence berhenti.",
  ].join("\n");
}

// ------------------------------------------------------------
// ANTREAN — lead NEW berumur ≥24 jam yang masih punya step due
// ------------------------------------------------------------

export interface FollowUpCandidate extends LeadLite {
  ageHours: number;
  nextStep: number; // step due terkecil yang belum sent
  stepsSent: number[]; // step yang sudah TERKIRIM (salah satu lane)
}

function ageHoursOf(createdAt: Date): number {
  return Math.floor((Date.now() - createdAt.getTime()) / 3_600_000);
}

async function loadCandidates(limit: number): Promise<FollowUpCandidate[]> {
  const maxAgeMs = MAX_AGE_DAYS * 24 * 3_600_000;
  const leads = await db.lead.findMany({
    where: {
      status: "NEW",
      createdAt: { lte: new Date(Date.now() - 24 * 3_600_000), gte: new Date(Date.now() - maxAgeMs) },
    },
    include: { followUps: true },
    orderBy: { estimatedValue: "desc" },
    take: limit * 4, // cadangan utk yang sudah selesai sequence
  });

  const out: FollowUpCandidate[] = [];
  for (const l of leads) {
    const sentSteps = [
      ...new Set<number>(
        l.followUps
          .filter((f) => f.status === "sent")
          .map((f) => f.step as number)
      ),
    ].sort((a, b) => a - b);
    const ageH = ageHoursOf(l.createdAt);
    // CATCH-UP: lead ditemukan telat (mis. 50 jam) → langsung di posisi window
    // yang sesuai (step 2), bukan mengulang dari step 1 — 3 titik sentuhan
    // maksimal dalam jendela 24/48/72 jam, lalu berhenti.
    const due = [...FOLLOWUP_STEPS]
      .reverse()
      .find((s) => ageH >= s.hours && !sentSteps.includes(s.step));
    if (!due) continue;
    out.push({
      id: l.id,
      name: l.name,
      whatsapp: l.whatsapp,
      businessType: l.businessType,
      package: l.package,
      estimatedValue: l.estimatedValue,
      source: l.source,
      createdAt: l.createdAt,
      ageHours: ageH,
      nextStep: due.step,
      stepsSent: sentSteps,
    });
    if (out.length >= limit) break;
  }
  return out;
}

/** Antrean utk UI admin — tanpa efek samping. */
export async function getFollowUpQueue(limit = 25): Promise<{
  candidates: (FollowUpCandidate & { prefill: string })[];
  stats: { due: number; pipelineValue: number; completed: number; activeNew: number };
  channels: { telegram: boolean; whatsappGateway: boolean; leadAutoSend: boolean };
}> {
  const [candidates, settings, completedCount, activeNew] = await Promise.all([
    loadCandidates(limit),
    getEffectiveSettings(),
    db.followUpLog.findMany({ where: { status: "sent" }, select: { leadId: true, step: true }, distinct: ["leadId", "step"] }),
    db.lead.count({ where: { status: "NEW" } }),
  ]);

  // lead dianggap "selesai" bila step 3 sudah sent di lane mana pun
  const doneLeadIds = new Set(
    completedCount.filter((r) => r.step === 3).map((r) => r.leadId)
  );

  return {
    candidates: candidates.map((c) => ({ ...c, prefill: waPrefill(c, c.nextStep) })),
    stats: {
      due: candidates.length,
      pipelineValue: candidates.reduce((a, c) => a + c.estimatedValue, 0),
      completed: doneLeadIds.size,
      activeNew,
    },
    channels: {
      telegram: settings.telegramEnabled,
      whatsappGateway: settings.whatsappEnabled,
      leadAutoSend: settings.whatsappEnabled, // lane lead butuh gateway WA
    },
  };
}

// ------------------------------------------------------------
// SWEEP — eksekusi semua follow-up yang jatuh tempo
// ------------------------------------------------------------

export interface SweepResult {
  scanned: number;
  adminSent: number;
  adminFailed: number;
  leadSent: number;
  leadFailed: number;
  skippedNoChannel: boolean;
  details: { lead: string; step: number; lane: string; status: string }[];
}

async function logOne(
  leadId: string,
  step: number,
  lane: "lead" | "admin",
  channel: string,
  status: "sent" | "failed",
  message: string,
  error?: string
): Promise<void> {
  await db.followUpLog.upsert({
    where: { leadId_step_lane: { leadId, step, lane } },
    create: { leadId, step, lane, channel, status, message, error: error ?? null },
    update: { channel, status, message, error: error ?? null, createdAt: new Date() },
  });
}

/** Jalankan sweep. Aman dipanggil berulang — idempoten per (lead, step, lane). */
export async function sweepFollowUps(opts?: { maxLeads?: number }): Promise<SweepResult> {
  const result: SweepResult = {
    scanned: 0,
    adminSent: 0,
    adminFailed: 0,
    leadSent: 0,
    leadFailed: 0,
    skippedNoChannel: false,
    details: [],
  };

  try {
    const settings = await getEffectiveSettings();
    const adminChannel: "telegram" | "whatsapp" | null = settings.telegramEnabled
      ? "telegram"
      : settings.whatsappEnabled
        ? "whatsapp"
        : null;
    const leadLaneActive = settings.whatsappEnabled; // ke lead hanya via gateway WA

    if (!adminChannel && !leadLaneActive) {
      result.skippedNoChannel = true;
      return result;
    }

    const candidates = await loadCandidates(opts?.maxLeads ?? SWEEP_BATCH);
    result.scanned = candidates.length;

    for (const c of candidates) {
      const step = c.nextStep;

      // ---- lane lead: kirim langsung via gateway WA (full otomatis) ----
      if (leadLaneActive && settings.whatsappApiToken) {
        const msg = leadMessage(c, step);
        const digits = normalizeWaDigits(c.whatsapp);
        const r = await sendWhatsapp(
          settings.whatsappProvider as "fonnte" | "wablas",
          settings.whatsappApiToken,
          digits,
          msg
        );
        await logOne(c.id, step, "lead", "whatsapp", r.ok ? "sent" : "failed", msg, r.error);
        if (r.ok) result.leadSent++;
        else result.leadFailed++;
        result.details.push({ lead: c.name, step, lane: "lead", status: r.ok ? "sent" : "failed" });
      }

      // ---- lane admin: reminder 1-klik (Telegram gratis dulu, lalu WA) ----
      if (adminChannel === "telegram" && settings.telegramBotToken && settings.telegramChatId) {
        const msg = adminMessage(c, step);
        const r = await sendTelegram(settings.telegramBotToken, settings.telegramChatId, msg);
        await logOne(c.id, step, "admin", "telegram", r.ok ? "sent" : "failed", msg, r.error);
        if (r.ok) result.adminSent++;
        else result.adminFailed++;
        result.details.push({ lead: c.name, step, lane: "admin", status: r.ok ? "sent" : "failed" });
      } else if (adminChannel === "whatsapp" && settings.whatsappApiToken) {
        const msg = adminMessage(c, step);
        const r = await sendWhatsapp(
          settings.whatsappProvider as "fonnte" | "wablas",
          settings.whatsappApiToken,
          settings.whatsappTarget ?? "",
          msg
        );
        await logOne(c.id, step, "admin", "whatsapp", r.ok ? "sent" : "failed", msg, r.error);
        if (r.ok) result.adminSent++;
        else result.adminFailed++;
        result.details.push({ lead: c.name, step, lane: "admin", status: r.ok ? "sent" : "failed" });
      }
    }
  } catch (e) {
    console.error("[followup] sweep error:", e);
  }
  return result;
}
