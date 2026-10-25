// ============================================================
// PUSATPERIZINAN.COM — DETAK JANTUNG FOLLOW-UP (v1.14.1, Task 37)
// ============================================================
// Mesin follow-up (v1.14.0 "Kejar Order") kini BERDENYUT SENDIRI:
//   • 25 detik setelah server hidup → sweep pertama
//   • tiap N menit (default 15)     → sweep berkala
// TIDAK BUTUH CRON EKSTERNAL — server memicu dirinya sendiri.
// Cron /api/cron/followup tetap tersedia untuk infrastruktur
// yang punya scheduler luar; kirim ganda mustahil karena sweep
// idempoten per (lead, step, lane).
//
// Kendali (env):
//   FOLLOWUP_SWEEP_MINUTES=15  → default, denyut tiap 15 menit
//   FOLLOWUP_SWEEP_MINUTES=0   → matikan detak jantung (pakai cron)
//
// Dipanggil dari src/instrumentation.ts register() — hanya
// runtime Node.js (guard edge ada di pemanggil).
// ============================================================

import { sweepFollowUps } from "./followup";

/** Guard proses panjang: interval hanya pernah dipasang sekali. */
let started = false;

export function startFollowUpScheduler(): void {
  if (started) return;
  started = true;

  // Jangan pernah menyala saat proses build / prerender statis.
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const raw = Number(process.env.FOLLOWUP_SWEEP_MINUTES ?? "15");
  const minutes = Number.isFinite(raw) ? raw : 15;
  if (minutes <= 0) {
    console.log(
      "[detak-jantung] OFF (FOLLOWUP_SWEEP_MINUTES=0) — sweep hanya via tombol Mission Control atau cron eksternal /api/cron/followup"
    );
    return;
  }

  const tick = async (): Promise<void> => {
    try {
      const r = await sweepFollowUps();
      const adaAktivitas =
        r.scanned > 0 ||
        r.adminSent > 0 ||
        r.adminFailed > 0 ||
        r.leadSent > 0 ||
        r.leadFailed > 0;
      if (adaAktivitas) {
        const kanal = r.skippedNoChannel
          ? " (kanal belum terpasang — isi token Telegram/WA di Mission Control → Notifikasi)"
          : "";
        console.log(
          `[detak-jantung] sweep: scan=${r.scanned} admin=${r.adminSent} sukses/${r.adminFailed} gagal · lead=${r.leadSent} sukses/${r.leadFailed} gagal${kanal}`
        );
      }
      // Tanpa aktivitas = sunyi (normal: tidak ada lead jatuh tempo).
    } catch (e) {
      // Detak jantung TIDAK PERNAH MATI — error satu denyut dilalui saja.
      console.error("[detak-jantung] sweep gagal (denyut berikutnya lanjut):", e);
    }
  };

  // Denyut pertama 25 detik pasca-boot — beri waktu Prisma/DB siap.
  setTimeout(() => void tick(), 25_000);
  setInterval(() => void tick(), Math.round(minutes * 60_000));

  console.log(
    `[detak-jantung] ON — sweep follow-up otomatis tiap ${minutes} menit (idempoten, tanpa cron eksternal)`
  );
}
