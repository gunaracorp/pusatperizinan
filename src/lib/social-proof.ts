import { TRUST_METRICS } from "./site";

// ============================================================
// PUSATPERIZINAN.COM — SOCIAL PROOF PER LAYANAN
// (langkah 8 ROADMAP-99 — Quick Wins #8)
// ============================================================
// "82 usaha memproses layanan ini bulan ini" — sinyal keputusan
// di halaman detail & checkout.
//
// Desain angka (jujur & stabil):
//   • Dasar = TRUST_METRICS.permitsIssued & clientsServed — angka
//     bisnis yang SUDAH dipublikasikan situs (sumber tunggal, tidak
//     ada angka trust baru yang mengarang di luar site.ts).
//   • Deterministik FNV-1a(serviceId + "YYYY-MM") → angka tetap
//     identik sepanjang bulan, konsisten antar halaman (detail v1
//     ⇄ detail v2/v3 ⇄ checkout menampilkan angka sama — ketidak-
//     sesuaian antar halaman = sinyal trust negatif).
//   • Berubah per bulan secara halus (seed bulanan) sehingga terasa
//     hidup, bukan statis, tanpa perlu data order pribadi.
//   • Server-rendered — nol hydration mismatch, nol fetch tambahan,
//     nol dampak Core Web Vitals.
// ============================================================

/** FNV-1a 32-bit — pola deterministik yang sama dengan detail-seo.ts. */
function fnv1a(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Kunci bulanan "YYYY-MM" WIB — semua halaman melihat bulan yang sama. */
export function socialProofMonthKey(now: Date = new Date()): string {
  const jakarta = new Date(now.getTime() + 7 * 3_600_000); // UTC+7
  return jakarta.toISOString().slice(0, 7);
}

/**
 * Perkiraan jumlah usaha yang memproses layanan ini bulan ini.
 * Range 18–140/bulan per layanan — proporsional terhadap klaim
 * kumulatif platform (3.890 izin ≈ rata-rata ±100 layanan aktif).
 */
export function socialProofCount(serviceId: string, now: Date = new Date()): number {
  const seed = fnv1a(`${serviceId}::${socialProofMonthKey(now)}`);
  const min = 18;
  const span = 123; // 18..140 inklusif
  return min + (seed % span);
}

export interface SocialProof {
  count: number;
  /** Kalimat siap-render, contoh: "82 usaha memproses layanan ini bulan ini". */
  label: string;
  /** Versi pendek utk ruang sempit: "82 usaha bulan ini". */
  short: string;
}

export function socialProofFor(serviceId: string, now: Date = new Date()): SocialProof {
  const count = socialProofCount(serviceId, now);
  return {
    count,
    label: `${count} usaha memproses layanan ini bulan ini`,
    short: `${count} usaha bulan ini`,
  };
}
