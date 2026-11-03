// ============================================================
// PUSATPERIZINAN.COM — MODUL 2027 #1: MULTI-CURRENCY
// ============================================================
// Harga sumber kebenaran SELALU Rupiah (src/lib/pricing.ts) dan
// pembayaran SELALU ditagih dalam IDR. Lapisan ini HANYA konversi
// tampilan agar investor asing (PMA, ekspat, buyer luar negeri)
// melihat harga dalam mata uangnya → konversi checkout naik.
//
// • Basis konversi: 1 unit mata uang = rateToIdr Rupiah.
// • Kurs default di bawah = nilai indikatif awal (seed) — KURS
//   AKTIF dibaca dari tabel CurrencyRate (bisa diubah admin via
//   PATCH /api/currency/rates) dengan fallback ke daftar ini bila
//   DB kosong/tidak tersedia. Jangan pakai kurs ini untuk
//   perhitungan akuntansi — invoice resmi selalu IDR.
// ============================================================

export interface CurrencyDef {
  /** Kode ISO 4217 */
  code: string;
  name: string;
  symbol: string;
  /** Locale Intl.NumberFormat — eksplisit agar SSR & client identik */
  locale: string;
  /** 1 unit mata uang ini = rateToIdr Rupiah */
  rateToIdr: number;
  /** Flag emoji untuk switcher */
  flag: string;
  /** true bila mata uang tanpa desimal (JPY) */
  zeroDecimals?: boolean;
}

/** Mata uang dasar situs & mata uang penagihan (invoice resmi). */
export const IDR: CurrencyDef = {
  code: "IDR",
  name: "Rupiah Indonesia",
  symbol: "Rp",
  locale: "id-ID",
  rateToIdr: 1,
  flag: "🇮🇩",
};

/** Kurs default indikatif — ditimpa nilai DB saat tersedia. */
export const DEFAULT_CURRENCIES: CurrencyDef[] = [
  IDR,
  { code: "USD", name: "US Dollar", symbol: "$", locale: "en-US", rateToIdr: 16_600, flag: "🇺🇸" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", locale: "en-SG", rateToIdr: 12_700, flag: "🇸🇬" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", locale: "ms-MY", rateToIdr: 3_950, flag: "🇲🇾" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", locale: "zh-CN", rateToIdr: 2_330, flag: "🇨🇳" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", locale: "ja-JP", rateToIdr: 108, flag: "🇯🇵", zeroDecimals: true },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", locale: "en-AU", rateToIdr: 10_900, flag: "🇦🇺" },
  { code: "EUR", name: "Euro", symbol: "€", locale: "de-DE", rateToIdr: 19_300, flag: "🇪🇺" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", locale: "en-AE", rateToIdr: 4_520, flag: "🇦🇪" },
];

export const BASE_CURRENCY = IDR;

/** Peta code → definisi, dari daftar kurs yang diberikan. */
export function currencyMap(list: CurrencyDef[]): Record<string, CurrencyDef> {
  return Object.fromEntries(list.map((c) => [c.code, c]));
}

export function isValidCurrencyCode(code: string | null | undefined): boolean {
  return !!code && DEFAULT_CURRENCIES.some((c) => c.code === code.toUpperCase());
}

export function getCurrencyDef(code: string | null | undefined, list: CurrencyDef[] = DEFAULT_CURRENCIES): CurrencyDef {
  const upper = code?.toUpperCase();
  return list.find((c) => c.code === upper) ?? IDR;
}

/**
 * Konversi IDR → mata uang target dengan pembulatan ramah-harga:
 * nilai ≥1000 dibulatkan utuh, <1000 dua desimal, JPY selalu utuh.
 */
export function convertFromIdr(amountIdr: number, cur: CurrencyDef): number {
  if (!Number.isFinite(amountIdr) || amountIdr <= 0) return 0;
  const raw = amountIdr / (cur.rateToIdr > 0 ? cur.rateToIdr : 1);
  if (cur.code === "IDR") return Math.round(raw);
  if (cur.zeroDecimals) return Math.round(raw);
  if (raw >= 1000) return Math.round(raw);
  return Math.round(raw * 100) / 100;
}

/**
 * Format deterministik (aman SSR): "Rp 350.000" / "$21" / "¥1.990".
 * Memakai Intl.NumberFormat dengan locale eksplisit per mata uang.
 */
export function formatMoney(amountIdr: number, cur: CurrencyDef): string {
  const value = convertFromIdr(amountIdr, cur);
  if (cur.code === "IDR") return "Rp " + value.toLocaleString("id-ID");
  const frac = Number.isInteger(value) ? 0 : 2;
  return new Intl.NumberFormat(cur.locale, {
    style: "currency",
    currency: cur.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: frac,
  }).format(value);
}

/** Nama cookie preferensi mata uang (dibaca/ditulis client). */
export const CURRENCY_COOKIE = "pp_currency";
