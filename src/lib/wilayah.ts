// ============================================================
// PUSATPERIZINAN.COM — DATA WILAYAH (Hub Programmatic SEO Lokal)
// ============================================================
// ARSITEKTUR SEO (keputusan master-call):
//   Halaman lokal ASLI hidup di /layanan/wilayah/{prov} (38 hub)
//   dan /layanan/wilayah/{prov}/{kota} (kota utama) — dibangun
//   lib/catalog/generators.ts, sudah terindeks sitemap "hubs".
//   Halaman /wilayah adalah HUB NAVIGASI yang memperkuat halaman
//   tersebut lewat internal-linking — BUKAN pesaing URL baru.
// ============================================================

import { PROVINCES, type ProvinceCoverage, type Island } from "@/lib/coverage-data";
import { KABKOTA_PER_PROVINSI } from "@/lib/kabkota-data";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export interface WilayahEntry {
  name: string;
  island: Island;
  majors: string[];
  note: string;
  /** Slug provinsi (konvensi slugify yang sama dengan generators.ts). */
  slug: string;
  /** URL hub provinsi yang SUDAH ADA (dibangun generators.ts). */
  hubHref: string;
  /** URL hub kota utama yang SUDAH ADA. */
  cityHrefs: { name: string; href: string }[];
  /** ROADMAP-99 langkah 25: SELURUH kab/kota provinsi ini (majors paling
   *  depan, sisanya dari kabkota-data) — engine internal-linking /wilayah. */
  kabkotaHrefs: { name: string; href: string }[];
}

export const WILAYAH: WilayahEntry[] = PROVINCES.map((p: ProvinceCoverage) => {
  const slug = slugify(p.name);
  const extra = (KABKOTA_PER_PROVINSI[p.name] ?? []).filter(
    (k) => !p.majors.includes(k)
  );
  return {
    name: p.name,
    island: p.island,
    majors: p.majors,
    note: p.note,
    slug,
    hubHref: `/layanan/wilayah/${slug}`,
    cityHrefs: p.majors.map((c) => ({
      name: c,
      href: `/layanan/wilayah/${slug}/${slugify(c)}`,
    })),
    kabkotaHrefs: [...p.majors, ...extra].map((c) => ({
      name: c,
      href: `/layanan/wilayah/${slug}/${slugify(c)}`,
    })),
  };
});

/** Jumlah total link hub kab/kota yang tersedia (±514 resmi + alias existing). */
export const TOTAL_KABKOTA_HUBS = WILAYAH.reduce(
  (n, w) => n + w.kabkotaHrefs.length,
  0
);

export const WILAYAH_BY_SLUG = new Map<string, WilayahEntry>(WILAYAH.map((w) => [w.slug, w]));

export const WILAYAH_ISLANDS: Island[] = [
  "Sumatera",
  "Jawa",
  "Bali & Nusa Tenggara",
  "Kalimantan",
  "Sulawesi",
  "Maluku & Papua",
];

export function wilayahByIsland(island: Island): WilayahEntry[] {
  return WILAYAH.filter((w) => w.island === island);
}
