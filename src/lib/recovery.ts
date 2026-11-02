import { db } from "@/lib/db";
import { getEffectiveSettings, sendTelegram, sendWhatsapp } from "./notify";
import { absUrl } from "./site";

// ============================================================
// PUSATPERIZINAN.COM — MESIN PEMULIHAN CHECKOUT TERBENGKALAI
// (langkah 12 ROADMAP-99 — "Abandoned checkout recovery")
// ============================================================
// "Kembangkan keranjang yang 'hampir jadi'."
//
// Sequence 3 langkah untuk order status PENDING (checkout dibuat,
// pembayaran belum masuk):
//   Step 1 = 1 jam  · Step 2 = 24 jam · Step 3 = 72 jam
//
// Dua jalur (lane) — pola identik mesin follow-up lead (langkah 6):
//   lane "lead"  → pesan langsung ke nomor pemesan via gateway WA
//                  (Fonnte/Wablas) — hanya bila gateway terpasang.
//   lane "admin" → reminder ke admin (Telegram gratis / WA gateway)
//                  berisi link halaman bayar (/payment/<orderNo>) siap
//                  diteruskan 1-klik.
//
// Jaminan:
//   • IDEMPOTEN — @@unique([orderId, step, lane]) + upsert; sweep berulang
//     tidak pernah mengirim dobel (baris "failed" otomatis di-retry sweep
//     berikutnya, baris "sent" tidak disentuh lagi).
//   • BERHENTI OTOMATIS — begitu order.status ≠ PENDING (PAID / CANCELLED /
//     EXPIRED / FAILED / CHALLENGE / REFUNDED), sequence berhenti di
//     langkah mana pun. Dana sudah masuk tidak boleh dikejar lagi.
//   • TIDAK PERNAH THROW — kegagalan diserap & dilaporkan sebagai ringkasan.
//   • MENGHORMATI WAKTU — order lebih tua dari MAX_AGE_HOURS (3 hari)
//     tidak lagi dikejar; step 3 menyatakan pesan terakhir secara eksplisit.
//   • EMAIL LANE — siap disambungkan bila SMTP produksi ditambahkan;
//     saat ini kanal aktif = WA gateway + Telegram (kanal favorit pasar
//     Indonesia & gratis).
// ============================================================

export interface RecoveryStep {
  step: number;
  hours: number;
  label: string;
}

export const RECOVERY_STEPS: RecoveryStep[] = [
  { step: 1, hours: 1, label: "1 jam" },
  { step: 2, hours: 24, label: "24 jam" },
  { step: 3, hours: 72, label: "72 jam" },
];

/** Order lebih tua dari ini (masih PENDING) tidak lagi dikejar. */
export const MAX_AGE_HOURS = 72;
/** Batas order yang diproses per sweep (aman utk gateway + rate limit). */
export const SWEEP_BATCH = 50;

export interface OrderLite {
  id: string;
  orderNo: string;
  serviceName: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  provider: string;
  createdAt: Date;
}

export function normalizeWaDigits(wa: string): string {
  const d = (wa || "").replace(/[^0-9]/g, "");
  if (d.startsWith("62")) return d;
  if (d.startsWith("0")) return "62" + d.slice(1);
  if (d.startsWith("8")) return "62" + d;
  return d;
}

// ------------------------------------------------------------
// TEMPLATE PESAN — 3 langkah, nada membantu (bukan menekan)
// ------------------------------------------------------------

function brand(): string {
  return "PusatPerizinan.com";
}

export function paymentUrl(orderNo: string): string {
  return absUrl(`/payment/${orderNo}`);
}

export function rupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

/** Pesan untuk PEMESAN per step (dipakai lane lead + prefill admin). */
export function recoveryMessage(o: OrderLite, step: number): string {
  const namaDepan = o.customerName.split(/\s+/)[0] || o.customerName;
  const url = paymentUrl(o.orderNo);
  if (step <= 1) {
    return [
      `Halo Kak ${namaDepan} 👋`,
      "",
      `Pesanan ${o.orderNo} — ${o.serviceName} (${rupiah(o.amount)}) sudah kami siapkan, tinggal pembayarannya.`,
      "",
      `Bayar kapan saja di sini: ${url}`,
      "",
      "Setelah bayar terkonfirmasi, tim kami langsung mulai mengurus dokumen Kakak. Ada kendala saat bayar? Balas pesan ini ya 🙌",
    ].join("\n");
  }
  if (step === 2) {
    return [
      `Halo Kak ${namaDepan}, pesanan ${o.orderNo} masih kami tahan 🙏`,
      "",
      `${o.serviceName} — ${rupiah(o.amount)}. Slot antrean pengurusan hari ini masih tersedia, kakak bisa menyelesaikan pembayaran di sini:`,
      "",
      url,
      "",
      'Kalau ada yang mau ditanyakan dulu (syarat, proses, garansi), balas "TANYA" — kami bantu dengan senang hati 😊',
    ].join("\n");
  }
  return [
    `Halo Kak ${namaDepan} — ini pesan terakhir dari saya kok 🙏`,
    "",
    `Pesanan ${o.orderNo} (${o.serviceName}) akan otomatis berhenti kami jaga setelah ini supaya tidak mengganggu.`,
    "",
    `Kalau masih jadi, cukup bayar di sini: ${url}`,
    "",
    "✅ Garansi 100% uang kembali bila gagal karena kesalahan kami",
    "✅ Dokumen dicek sebelum diajukan",
    "✅ Progres dilaporkan tiap tahap",
    "",
    `— Tim ${brand()}`,
  ].join("\n");
}

/** Link wa.me 1-klik untuk admin (pesan sudah terisi). */
export function recoveryWaPrefill(o: OrderLite, step: number): string {
  const digits = normalizeWaDigits(o.customerPhone);
  return `https://wa.me/${digits}?text=${encodeURIComponent(recoveryMessage(o, step))}`;
}

const PROVIDER_LABELS: Record<string, string> = {
  midtrans: "Midtrans",
  tripay: "Tripay",
  demo: "Uji Coba",
  manual: "Transfer Manual",
};

/** Reminder untuk ADMIN per step — konteks penuh + link bayar + prefill. */
export function recoveryAdminMessage(o: OrderLite, step: number): string {
  const s = RECOVERY_STEPS.find((x) => x.step === step) ?? RECOVERY_STEPS[0];
  const ageH = Math.floor((Date.now() - o.createdAt.getTime()) / 3_600_000);
  return [
    `🛒 CHECKOUT TERBENGKALAI ${s.label.toUpperCase()} — pembayaran belum masuk (step ${step}/3)!`,
    "",
    `🧾 ${o.orderNo} — ${o.serviceName}`,
    `💵 Nilai: ${rupiah(o.amount)}`,
    `👤 ${o.customerName} — ${normalizeWaDigits(o.customerPhone)}`,
    `⏳ Dibuat: ${ageH} jam lalu · 💳 ${PROVIDER_LABELS[o.provider] ?? o.provider}`,
    "",
    "👉 Halaman bayar: " + paymentUrl(o.orderNo),
    "👉 Chat klien 1-klik (pesan siap):",
    recoveryWaPrefill(o, step),
    "",
    "Order lunas/batal otomatis menghentikan sequence ini.",
  ].join("\n");
}

// ------------------------------------------------------------
// ANTREAN — order PENDING berumur ≥1 jam yang masih punya step due
// ------------------------------------------------------------

export interface RecoveryCandidate extends OrderLite {
  ageHours: number;
  nextStep: number;
  stepsSent: number[];
}

async function loadCandidates(limit: number): Promise<RecoveryCandidate[]> {
  const maxAgeMs = MAX_AGE_HOURS * 3_600_000;
  const orders = await db.order.findMany({
    where: {
      status: "PENDING",
      createdAt: { lte: new Date(Date.now() - 1 * 3_600_000), gte: new Date(Date.now() - maxAgeMs) },
    },
    include: { recoveries: true },
    orderBy: { amount: "desc" },
    take: limit * 4,
  });

  const out: RecoveryCandidate[] = [];
  for (const o of orders) {
    const recoveries = (o.recoveries ?? []) as { status: string; step: number | string }[];
    const sentSteps: number[] = [
      ...new Set<number>(
        recoveries.filter((r) => r.status === "sent").map((r) => Number(r.step))
      ),
    ].sort((a, b) => a - b);
    const ageH = Math.floor((Date.now() - new Date(o.createdAt).getTime()) / 3_600_000);
    // CATCH-UP: server mati/micron → order ditemukan telat (mis. 30 jam) →
    // langsung di posisi window (step 2), bukan mengulang dari step 1.
    const due = [...RECOVERY_STEPS]
      .reverse()
      .find((s) => ageH >= s.hours && !sentSteps.includes(s.step));
    if (!due) continue;
    out.push({
      id: o.id,
      orderNo: o.orderNo,
      serviceName: o.serviceName,
      amount: o.amount,
      customerName: o.customerName,
      customerPhone: o.customerPhone,
      customerEmail: o.customerEmail ?? null,
      provider: o.provider,
      createdAt: new Date(o.createdAt),
      ageHours: ageH,
      nextStep: due.step,
      stepsSent: sentSteps,
    });
    if (out.length >= limit) break;
  }
  return out;
}

/** Antrean utk UI admin — tanpa efek samping. */
export async function getRecoveryQueue(limit = 25): Promise<{
  candidates: (RecoveryCandidate & { prefill: string; payUrl: string })[];
  stats: { due: number; abandonedValue: number; recovered: number; activePending: number };
  channels: { telegram: boolean; whatsappGateway: boolean; leadAutoSend: boolean };
}> {
  const [candidates, settings, recoveredRows, activePending] = await Promise.all([
    loadCandidates(limit),
    getEffectiveSettings(),
    db.recoveryLog.findMany({ where: { status: "sent" }, select: { orderId: true, step: true }, distinct: ["orderId", "step"] }),
    db.order.count({ where: { status: "PENDING" } }),
  ]);

  // order dianggap "selesai sequence" bila step 3 sudah sent di lane mana pun
  const doneOrderIds = new Set(
    recoveredRows.filter((r) => r.step === 3).map((r) => r.orderId)
  );

  return {
    candidates: candidates.map((c) => ({
      ...c,
      prefill: recoveryWaPrefill(c, c.nextStep),
      payUrl: paymentUrl(c.orderNo),
    })),
    stats: {
      due: candidates.length,
      abandonedValue: candidates.reduce((a, c) => a + c.amount, 0),
      recovered: doneOrderIds.size,
      activePending,
    },
    channels: {
      telegram: settings.telegramEnabled,
      whatsappGateway: settings.whatsappEnabled,
      leadAutoSend: settings.whatsappEnabled,
    },
  };
}

// ------------------------------------------------------------
// SWEEP — eksekusi semua pemulihan yang jatuh tempo
// ------------------------------------------------------------

export interface RecoverySweepResult {
  scanned: number;
  adminSent: number;
  adminFailed: number;
  leadSent: number;
  leadFailed: number;
  skippedNoChannel: boolean;
  details: { order: string; step: number; lane: string; status: string }[];
}

async function logOne(
  orderId: string,
  step: number,
  lane: "lead" | "admin",
  channel: string,
  status: "sent" | "failed",
  message: string,
  error?: string
): Promise<void> {
  await db.recoveryLog.upsert({
    where: { orderId_step_lane: { orderId, step, lane } },
    create: { orderId, step, lane, channel, status, message, error: error ?? null },
    update: { channel, status, message, error: error ?? null, createdAt: new Date() },
  });
}

/** Jalankan sweep. Aman dipanggil berulang — idempoten per (order, step, lane). */
export async function sweepAbandonedCheckouts(opts?: { maxOrders?: number }): Promise<RecoverySweepResult> {
  const result: RecoverySweepResult = {
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
    const leadLaneActive = settings.whatsappEnabled;

    if (!adminChannel && !leadLaneActive) {
      result.skippedNoChannel = true;
      return result;
    }

    const candidates = await loadCandidates(opts?.maxOrders ?? SWEEP_BATCH);
    result.scanned = candidates.length;

    for (const c of candidates) {
      // Cek ulang status TERKINI — klien bisa saja baru saja membayar
      // di antara loadCandidates dan pengiriman. Jangan kejar dana yang
      // sudah masuk.
      const fresh = await db.order.findUnique({
        where: { id: c.id },
        select: { status: true },
      }).catch(() => null);
      if (!fresh || fresh.status !== "PENDING") continue;

      const step = c.nextStep;

      // ---- lane lead: kirim langsung via gateway WA (full otomatis) ----
      if (leadLaneActive && settings.whatsappApiToken) {
        const msg = recoveryMessage(c, step);
        const digits = normalizeWaDigits(c.customerPhone);
        const r = await sendWhatsapp(
          settings.whatsappProvider as "fonnte" | "wablas",
          settings.whatsappApiToken,
          digits,
          msg
        );
        await logOne(c.id, step, "lead", "whatsapp", r.ok ? "sent" : "failed", msg, r.error);
        if (r.ok) result.leadSent++;
        else result.leadFailed++;
        result.details.push({ order: c.orderNo, step, lane: "lead", status: r.ok ? "sent" : "failed" });
      }

      // ---- lane admin: reminder 1-klik (Telegram gratis dulu, lalu WA) ----
      if (adminChannel === "telegram" && settings.telegramBotToken && settings.telegramChatId) {
        const msg = recoveryAdminMessage(c, step);
        const r = await sendTelegram(settings.telegramBotToken, settings.telegramChatId, msg);
        await logOne(c.id, step, "admin", "telegram", r.ok ? "sent" : "failed", msg, r.error);
        if (r.ok) result.adminSent++;
        else result.adminFailed++;
        result.details.push({ order: c.orderNo, step, lane: "admin", status: r.ok ? "sent" : "failed" });
      } else if (adminChannel === "whatsapp" && settings.whatsappApiToken) {
        const msg = recoveryAdminMessage(c, step);
        const r = await sendWhatsapp(
          settings.whatsappProvider as "fonnte" | "wablas",
          settings.whatsappApiToken,
          settings.whatsappTarget ?? "",
          msg
        );
        await logOne(c.id, step, "admin", "whatsapp", r.ok ? "sent" : "failed", msg, r.error);
        if (r.ok) result.adminSent++;
        else result.adminFailed++;
        result.details.push({ order: c.orderNo, step, lane: "admin", status: r.ok ? "sent" : "failed" });
      }
    }
  } catch (e) {
    console.error("[recovery] sweep error:", e);
  }
  return result;
}
