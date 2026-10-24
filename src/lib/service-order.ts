// ============================================================
// PUSATPERIZINAN.COM — SERVICE ORDER RESOLVER (Server-only)
// ============================================================
// Menjadikan SELURUH 1.500 layanan katalog (v1 kode BU-*-*, v2
// kode PP-*-*, v3 kode PP3-*-*) orderable melalui /checkout?paket=.
//
// ATURAN ANTI-MANIPULASI (melanjutkan kontrak pricing.ts):
//   Harga TIDAK PERNAH dikirim dari client. API payment/create
//   selalu me-resolve harga dari modul ini (server-side).
// ============================================================

import { getLayananByKode, type Layanan500 } from "@/lib/layanan-500";
import { KATALOG_V2 } from "@/lib/katalog-v2";
import { KATALOG_V3 } from "@/lib/katalog-v3";
import { absUrl } from "@/lib/site";

export interface OrderableService {
  /** Kode item resmi — dipakai sebagai ?paket= di /checkout. */
  id: string;
  name: string;
  /** Harga jual (sudah diskon katalog), Rupiah integer — server truth. */
  price: number;
  /** Harga normal untuk anchor coret (opsional). */
  strike?: number;
  /** Estimasi waktu proses. */
  duration: string;
  /** Label edisi katalog untuk ditampilkan di checkout. */
  categoryLabel: string;
  /** Catatan ringkas (syarat/keterangan) untuk ringkasan checkout. */
  features: string[];
  /** URL halaman detail layanan (relatif). */
  detailUrl: string;
}

function fromV1(s: Layanan500): OrderableService {
  return {
    id: s.kode,
    name: s.nama,
    price: s.harga_diskon,
    strike: s.harga > s.harga_diskon ? s.harga : undefined,
    duration: "Sesuai estimasi katalog (cek halaman detail)",
    categoryLabel: `Katalog Resmi · ${s.kategori}`,
    features: [
      s.deskripsi.slice(0, 120),
      `Kode item ${s.kode} — kupon diskon ${Math.round(s.diskon * 100)}%`,
    ],
    detailUrl: `/${s.tautan.split("/").filter(Boolean).pop()}`,
  };
}

/** Struktur minimal yang dibutuhkan dari item katalog v2/v3. */
interface CatalogLike {
  code: string;
  slug: string;
  name: string;
  category: string;
  normalPrice: number;
  discountPrice: number;
  estimate: string;
  authority: string;
  requirements: string;
  description: string;
}

function fromV2(s: CatalogLike, label: string): OrderableService {
  return {
    id: s.code,
    name: s.name,
    price: s.discountPrice,
    strike: s.normalPrice > s.discountPrice ? s.normalPrice : undefined,
    duration: s.estimate,
    categoryLabel: `${label} · ${s.category}`,
    features: [
      s.description.slice(0, 140),
      s.requirements ? `Syarat: ${s.requirements}` : `Diterbitkan ${s.authority}`,
    ],
    detailUrl: `/layanan/${s.slug}`,
  };
}

// Maps dibangun sekali saat module load (server-only — bundle client bebas).
const V2_BY_CODE = new Map<string, CatalogLike>(
  KATALOG_V2.map((s) => [s.code, s] as [string, CatalogLike])
);
const V3_BY_CODE = new Map<string, CatalogLike>(
  KATALOG_V3.map((s) => [s.code, s] as [string, CatalogLike])
);

/** Resolve kode item katalog (v1/v2/v3) → layanan orderable, atau undefined. */
export function resolveOrderableService(code: string): OrderableService | undefined {
  const c = String(code || "").trim().toUpperCase();
  if (!c) return undefined;
  if (V2_BY_CODE.has(c)) return fromV2(V2_BY_CODE.get(c) as CatalogLike, "Katalog Premium");
  if (V3_BY_CODE.has(c)) return fromV2(V3_BY_CODE.get(c) as CatalogLike, "Katalog Pro");
  return undefined;
}

/** True bila kode bentuknya kode katalog (BU-XX-NNN / PP-XX-NNN / PP3-XX-NNN). */
export function looksLikeCatalogCode(code: string): boolean {
  return /^(PP3-)?[A-Z]{2}-[A-Z0-9]{2,4}-\d{3}$/.test(String(code || "").trim().toUpperCase());
}

/** Resolve kode v1 (BU-PT-001 dll.) — dipisah agar API create tak memuat data JSON 500 item dua kali. */
export function resolveV1Service(code: string): OrderableService | undefined {
  const c = String(code || "").trim().toUpperCase();
  const s = getLayananByKode(c);
  return s ? fromV1(s) : undefined;
}

/** Resolve gabungan: v1 + v2 + v3. */
export function resolveAnyService(code: string): OrderableService | undefined {
  return resolveOrderableService(code) ?? resolveV1Service(code);
}

/** URL absolut halaman detail (untuk notifikasi admin). */
export function orderableAbsoluteUrl(s: OrderableService): string {
  return absUrl(s.detailUrl);
}
