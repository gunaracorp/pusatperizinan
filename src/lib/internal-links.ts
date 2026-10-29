// ============================================================
// PUSATPERIZINAN.COM — MESIN INTERNAL LINKING PROGRAMATIK
// ============================================================
// Tujuan bisnis: mempercepat pengindeksan ±8.700 halaman layanan ×
// wilayah (GSC "Discovered — currently not indexed") dengan:
//   1. Rantai silo vertikal utuh: induk ↔ saudara wilayah ↔ kota ↔ hub.
//   2. Rotasi deterministik (FNV-1a): tiap halaman menampilkan urutan
//      saudara yang berbeda → cakupan crawl graph melebar tanpa random
//      (aman SSG, konsisten antar-build).
//   3. Jembatan konten: /layanan ↔ /glosarium ↔ /kbli ↔ kalkulator.
// Semua href divalidasi runtime terhadap katalog & glosarium — TIDAK
// ADA link mati yang dirender (keselamatan data > fitur).
// ============================================================

import {
  ALL_SERVICE_PAGES,
  CATEGORY_META,
  getServicePage,
  slugify,
  type CatalogCategory,
  type ServicePage,
} from "@/lib/catalog";
import { PROVINCES } from "@/lib/coverage-data";
import { GLOSSARY_TERMS } from "@/lib/glosarium";

// ------------------------------------------------------------
// TIPE PUBLIK
// ------------------------------------------------------------

export interface InternalLink {
  label: string;
  href: string;
}

export interface InternalLinkGroup {
  heading: string;
  links: InternalLink[];
}

// ------------------------------------------------------------
// INDEKS MODUL (dihitung sekali per proses — pola buildRelated)
// ------------------------------------------------------------

const byParentRegion = new Map<string, ServicePage[]>();
const byParentCity = new Map<string, ServicePage[]>();
const byRegion = new Map<string, ServicePage[]>();
const byCityName = new Map<string, Map<string, ServicePage[]>>(); // parent → city → pages
const baseByCategory = new Map<CatalogCategory, ServicePage[]>();
const provinceOrder = new Map<string, number>();

for (const p of ALL_SERVICE_PAGES) {
  if (p.kind === "region" && p.parent) {
    const arr = byParentRegion.get(p.parent) ?? [];
    arr.push(p);
    byParentRegion.set(p.parent, arr);
  }
  if (p.kind === "city" && p.parent) {
    const arr = byParentCity.get(p.parent) ?? [];
    arr.push(p);
    byParentCity.set(p.parent, arr);
  }
  if (p.region && (p.kind === "region" || p.kind === "city")) {
    const arr = byRegion.get(p.region) ?? [];
    arr.push(p);
    byRegion.set(p.region, arr);
    if (p.parent) {
      const byCity = byCityName.get(p.parent) ?? new Map<string, ServicePage[]>();
      const list = byCity.get(p.region) ?? [];
      list.push(p);
      byCity.set(p.region, list);
      byCityName.set(p.parent, byCity);
    }
  }
  if (p.kind === "base") {
    const arr = baseByCategory.get(p.category) ?? [];
    arr.push(p);
    baseByCategory.set(p.category, arr);
  }
}

PROVINCES.forEach((p, i) => provinceOrder.set(p.name, i));

// ------------------------------------------------------------
// UTIL DETERMINISTIK
// ------------------------------------------------------------

/** FNV-1a 32-bit — stabil antar build, tanpa Math.random. */
function hashStr(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Rotasi array oleh seed — menyebar prioritas link pertama ke seluruh graph. */
function rotate<T>(arr: T[], seed: string): T[] {
  if (arr.length <= 1) return arr;
  const off = hashStr(seed) % arr.length;
  return [...arr.slice(off), ...arr.slice(0, off)];
}

function orderByProvince(pages: ServicePage[]): ServicePage[] {
  return [...pages].sort(
    (a, b) => (provinceOrder.get(a.region ?? "") ?? 99) - (provinceOrder.get(b.region ?? "") ?? 99)
  );
}

/**
 * Nama provinsi sebuah halaman wilayah. Halaman kind "city" TIDAK membawa
 * field `province` di generator (hanya region = nama kota) — derivasi murni
 * dari data PROVINCES.majors, persis pola buildCityPage. Return undefined
 * bila tidak bisa dipastikan → penelepon WAJIB melewatkan link, bukan
 * menebak URL (anti link mati).
 */
function resolveProvinceName(page: ServicePage): string | undefined {
  if (page.province) return page.province;
  if (page.kind === "city" && page.region) {
    return PROVINCES.find((p) => p.majors.includes(page.region!))?.name;
  }
  return undefined;
}

function dedupeLinks(links: InternalLink[]): InternalLink[] {
  const seen = new Set<string>();
  return links.filter((l) => (seen.has(l.href) ? false : (seen.add(l.href), true)));
}

// ------------------------------------------------------------
// KURASI KONTEN — glosarium & alat (slug diverifikasi runtime)
// ------------------------------------------------------------

const GLOSSARY_PICKS: Record<CatalogCategory, string[]> = {
  perizinan: ["nib", "oss-rba", "sertifikat-standar", "lkpm", "kbli", "nib-asing"],
  pajak: ["npwp", "coretax", "ppn", "pph-badan", "faktur-pajak", "pkp"],
  pmi: ["pmi", "rptka", "pptkis", "kitas", "notifikasi-tka", "dkptka"],
  "virtual-office": ["alamat-kedudukan", "akta-pendirian", "pt", "cv", "badan-hukum"],
  sertifikasi: ["halal", "bpom", "iso", "bnsp", "sni"],
};

const GLOSSARY_SLUG_SET = new Set(GLOSSARY_TERMS.map((t) => t.slug));

function glossaryLinks(category: CatalogCategory): InternalLink[] {
  return glossaryLinksFromSlugs(GLOSSARY_PICKS[category] ?? []);
}

function glossaryLinksFromSlugs(slugs: string[]): InternalLink[] {
  return slugs
    .filter((s) => GLOSSARY_SLUG_SET.has(s))
    .map((s) => {
      const term = GLOSSARY_TERMS.find((t) => t.slug === s);
      return { label: term?.term ?? s, href: `/glosarium/${s}` };
    });
}

/** Alat & indeks global — tautan konversi + crawl entry point. */
const TOOL_LINKS: InternalLink[] = [
  { label: "Cari Kode KBLI", href: "/kbli" },
  { label: "Kalkulator Pajak", href: "/kalkulator-pajak" },
  { label: "Cek Izin Usaha", href: "/cek-izin" },
  { label: "Kalender Kepatuhan", href: "/kalender-kepatuhan" },
  { label: "Daftar Harga Layanan", href: "/katalog" },
];

/** Layanan dasar kurasi per kategori (filter runtime terhadap katalog). */
const BASE_PICKS: Record<CatalogCategory, string[]> = {
  perizinan: ["nib", "pt", "cv", "pt-perorangan", "merek", "lkpm"],
  pajak: ["tax-npwp-badan", "tax-pkp-badan", "tax-spt-tahunan-badan", "tax-planning", "tax-daerah"],
  pmi: ["pptkis", "rptka-kitas", "dokumen-pmi", "keberangkatan-pmi"],
  "virtual-office": ["virtual-office", "virtual-office-plus-pajak"],
  sertifikasi: ["halal", "iso-9001", "sni", "bpom"],
};

function baseServicePicks(category: CatalogCategory, excludeSlug?: string): InternalLink[] {
  const picks = (BASE_PICKS[category] ?? [])
    .filter((id) => id !== excludeSlug)
    .map((id) => getServicePage(id))
    .filter((p): p is ServicePage => Boolean(p))
    .map((p) => ({ label: p.h1, href: `/layanan/${p.slug}` }));
  if (picks.length >= 3) return picks;
  // Fallback: layanan dasar apa pun dalam kategori yang sama.
  return baseByCategory
    .get(category)
    ?.filter((p) => p.slug !== excludeSlug)
    .slice(0, 6)
    .map((p) => ({ label: p.h1, href: `/layanan/${p.slug}` })) ?? [];
}

// ------------------------------------------------------------
// BUILDER GRUP — HALAMAN LAYANAN (base / region / city / country / sector)
// ------------------------------------------------------------

export function buildServicePageLinkGroups(page: ServicePage): InternalLinkGroup[] {
  const groups: InternalLinkGroup[] = [];
  const seed = page.slug;

  // 1) Silo vertikal: saudara wilayah dari layanan yang sama.
  if (page.kind === "base") {
    const kids = orderByProvince(byParentRegion.get(page.slug) ?? []);
    const cityKids = orderByProvince(byParentCity.get(page.slug) ?? []);
    if (kids.length > 0) {
      const rotated = rotate(kids, seed);
      groups.push({
        heading: `Layanan ${page.h1} di Seluruh Indonesia`,
        links: rotated.slice(0, 38).map((k) => ({
          label: k.region ?? k.h1,
          href: `/layanan/${k.slug}`,
        })),
      });
    }
    if (cityKids.length > 0) {
      groups.push({
        heading: `${page.h1} di Kota Besar`,
        links: rotate(cityKids, seed)
          .slice(0, 12)
          .map((k) => ({ label: k.region ?? k.h1, href: `/layanan/${k.slug}` })),
      });
    }
    // Entry point silo: hub kategori.
    const hub = CATEGORY_META[page.category];
    if (hub?.slug) {
      groups.push({
        heading: "Jelajahi Berdasarkan Kategori",
        links: [
          { label: hub.label, href: `/layanan/kategori/${hub.slug}` },
          { label: "Semua Layanan", href: "/layanan" },
        ],
      });
    }
  }

  if (page.kind === "region" || page.kind === "city") {
    const parentId = page.parent ?? "";
    const parentPage = getServicePage(parentId);

    // Saudara provinsi (region) dari layanan induk yang sama.
    const siblings = orderByProvince(
      (byParentRegion.get(parentId) ?? []).filter((k) => k.slug !== page.slug)
    );
    if (siblings.length > 0) {
      groups.push({
        heading: parentPage
          ? `${parentPage.h1} di Provinsi Lain`
          : "Layanan di Provinsi Lain",
        links: rotate(siblings, seed)
          .slice(0, 18)
          .map((k) => ({ label: k.region ?? k.h1, href: `/layanan/${k.slug}` })),
      });
    }

    // Saudara kota (untuk kind city) / kota besar layanan ini (untuk kind region).
    const pageProvince = resolveProvinceName(page);
    const citySiblings = (byParentCity.get(parentId) ?? []).filter((k) => k.slug !== page.slug);
    const cityInSameProvince = pageProvince
      ? citySiblings.filter((k) => resolveProvinceName(k) === pageProvince)
      : [];
    if (cityInSameProvince.length > 0) {
      groups.push({
        heading: page.kind === "city"
          ? `${parentPage?.h1 ?? "Layanan"} di Kota Lain`
          : `${parentPage?.h1 ?? "Layanan"} di Kota Besar ${page.region}`,
        links: rotate(cityInSameProvince, seed)
          .slice(0, 10)
          .map((k) => ({ label: k.region ?? k.h1, href: `/layanan/${k.slug}` })),
      });
    }

    // Layanan lain di wilayah yang sama (silo horizontal).
    const sameRegion = (byRegion.get(page.region ?? "") ?? []).filter(
      (k) => k.slug !== page.slug && k.kind === "region"
    );
    if (sameRegion.length > 0) {
      groups.push({
        heading: `Layanan Lain di ${page.region}`,
        links: rotate(sameRegion, seed)
          .slice(0, 10)
          .map((k) => {
            const pp = k.parent ? getServicePage(k.parent) : undefined;
            return { label: pp?.h1 ?? k.h1, href: `/layanan/${k.slug}` };
          }),
      });
    }

    // Entry point silo: hub wilayah + hub kategori.
    const hubLinks: InternalLink[] = [];
    const provName = pageProvince;
    const regionName = page.region ?? "";
    if (page.kind === "city" && provName) {
      hubLinks.push({
        label: `Semua Layanan di ${provName}`,
        href: `/layanan/wilayah/${slugify(provName)}`,
      });
      hubLinks.push({
        label: `Layanan di ${regionName}`,
        href: `/layanan/wilayah/${slugify(provName)}/${slugify(regionName)}`,
      });
    } else if (page.kind === "region" && regionName) {
      hubLinks.push({
        label: `Semua Layanan di ${regionName}`,
        href: `/layanan/wilayah/${slugify(regionName)}`,
      });
    }
    const hub = CATEGORY_META[page.category];
    if (hub?.slug) {
      hubLinks.push({ label: hub.label, href: `/layanan/kategori/${hub.slug}` });
    }
    if (hubLinks.length > 0) {
      groups.push({ heading: "Jelajahi Wilayah & Kategori", links: hubLinks });
    }
  }

  // 2) Deep link ekspansi utk kind region/city: biaya & syarat induknya.
  if (page.kind === "region" || page.kind === "city") {
    const parentId = page.parent ?? "";
    const deep: InternalLink[] = [];
    if (parentId && getServicePage(parentId)) {
      deep.push({ label: `Biaya ${getServicePage(parentId)!.h1}`, href: `/biaya/${parentId}` });
      deep.push({ label: `Syarat ${getServicePage(parentId)!.h1}`, href: `/syarat/${parentId}` });
    }
    if (deep.length > 0) {
      groups.push({ heading: "Panduan Biaya & Syarat", links: deep });
    }
  }

  // 3) Cross-service dalam kategori (layanan dasar) — semua kind.
  const crossBase = baseServicePicks(page.category, page.kind === "base" ? page.slug : page.parent ?? undefined);
  if (crossBase.length > 0) {
    groups.push({ heading: "Layanan Populer Lainnya", links: crossBase });
  }

  // 4) Jembatan konten: glosarium + alat.
  const content = [...glossaryLinks(page.category), ...TOOL_LINKS];
  groups.push({ heading: "Panduan & Referensi", links: dedupeLinks(content) });

  return groups;
}

// ------------------------------------------------------------
// BUILDER GRUP — HALAMAN GLOSARIUM
// ------------------------------------------------------------

const GLOSSARY_SERVICE_PICKS: Record<string, string[]> = {
  dasar: ["nib", "lkpm", "sertifikat-standar"],
  "badan-usaha": ["pt", "cv", "pt-perorangan"],
  pajak: ["tax-npwp-badan", "tax-pkp-badan", "tax-planning"],
  sektor: ["halal", "bpom", "iso-9001"],
  ketenagakerjaan: ["rptka-kitas", "pptkis", "bpjs"],
  perdagangan: ["api-impex", "hscoo", "logistik"],
  regulasi: ["nib", "pt"],
  proses: ["nib", "pt", "cv"],
};

export function buildGlossaryLinkGroups(
  category: string,
  serviceLinks?: { label: string; href: string }[]
): InternalLinkGroup[] {
  const groups: InternalLinkGroup[] = [];

  const fromData = (serviceLinks ?? [])
    .filter((l) => l.href.startsWith("/"))
    .map((l) => ({ label: l.label, href: l.href }));
  if (fromData.length > 0) {
    groups.push({ heading: "Urus Izin Terkait Istilah Ini", links: fromData });
  }

  const catKey = category in GLOSSARY_SERVICE_PICKS ? category : "dasar";
  const picks = (GLOSSARY_SERVICE_PICKS[catKey] ?? [])
    .map((id) => getServicePage(id))
    .filter((p): p is ServicePage => Boolean(p))
    .map((p) => ({ label: p.h1, href: `/layanan/${p.slug}` }));
  if (picks.length > 0) {
    groups.push({ heading: "Layanan Paling Dicari", links: dedupeLinks([...fromData, ...picks]).slice(fromData.length) });
  }

  groups.push({ heading: "Alat Bisnis Gratis", links: TOOL_LINKS });
  return groups;
}

// ------------------------------------------------------------
// BUILDER GRUP — HALAMAN SEO LANDING (biaya / syarat / industri)
// ------------------------------------------------------------

export function buildSeoLandingLinkGroups(
  kind: string,
  serviceId?: string,
  currentSlug?: string
): InternalLinkGroup[] {
  const groups: InternalLinkGroup[] = [];
  const svc = serviceId ? getServicePage(serviceId) : undefined;

  // Pasangan famili: biaya ↔ syarat ↔ halaman layanan induk.
  const family: InternalLink[] = [];
  if (svc) {
    if (kind !== "svc") family.push({ label: `Layanan ${svc.h1}`, href: `/layanan/${svc.slug}` });
    if (kind !== "biaya" && getServicePage(serviceId!)) {
      family.push({ label: `Biaya ${svc.h1}`, href: `/biaya/${svc.slug}` });
    }
    if (kind !== "syarat" && getServicePage(serviceId!)) {
      family.push({ label: `Syarat ${svc.h1}`, href: `/syarat/${svc.slug}` });
    }
    // Anak wilayah populer dari layanan ini.
    const kids = orderByProvince(byParentRegion.get(svc.slug) ?? []);
    for (const k of rotate(kids, currentSlug ?? svc.slug).slice(0, 8)) {
      family.push({ label: `${svc.h1} ${k.region}`, href: `/layanan/${k.slug}` });
    }
  }
  if (family.length > 0) {
    groups.push({ heading: "Lanjutkan Penelusuran Anda", links: family });
  }

  // Layanan dasar kategori sama (bila kategori diketahui).
  if (svc) {
    const crossBase = baseServicePicks(svc.category, svc.slug).slice(0, 6);
    if (crossBase.length > 0) {
      groups.push({ heading: "Layanan Populer Lainnya", links: crossBase });
    }
    const content = dedupeLinks([...glossaryLinks(svc.category), ...TOOL_LINKS]);
    groups.push({ heading: "Panduan & Referensi", links: content });
  } else {
    groups.push({
      heading: "Jelajahi Layanan",
      links: [
        { label: "Semua Layanan", href: "/layanan" },
        { label: "Daftar Harga Layanan", href: "/katalog" },
        ...TOOL_LINKS.slice(0, 3),
      ],
    });
  }

  return groups;
}

// ------------------------------------------------------------
// BUILDER GRUP — HALAMAN BANDINGKAN
// ------------------------------------------------------------

export function buildComparisonLinkGroups(
  aId: string,
  bId: string
): InternalLinkGroup[] {
  const groups: InternalLinkGroup[] = [];
  const both: InternalLink[] = [];
  for (const id of [aId, bId]) {
    const svc = getServicePage(id);
    if (svc) both.push({ label: `Layanan ${svc.h1}`, href: `/layanan/${svc.slug}` });
  }
  if (both.length > 0) {
    groups.push({ heading: "Halaman Layanan Terkait", links: both });
  }

  // Glosarium dari id perbandingan (pt, cv, nib, siup, dst.).
  const glossary: InternalLink[] = [];
  for (const id of [aId, bId]) {
    if (GLOSSARY_SLUG_SET.has(id)) {
      const term = GLOSSARY_TERMS.find((t) => t.slug === id);
      glossary.push({ label: term?.term ?? id, href: `/glosarium/${id}` });
    }
  }
  if (glossary.length > 0) {
    groups.push({ heading: "Istilah Terkait", links: glossary });
  }

  groups.push({
    heading: "Panduan & Referensi",
    links: [...TOOL_LINKS.slice(0, 3), ...glossaryLinksFromSlugs(["pt", "cv", "pma", "pt-perorangan", "nib", "oss-rba"])],
  });
  return groups;
}

// ------------------------------------------------------------
// BUILDER GRUP — LANDING 500 (root level)
// ------------------------------------------------------------

const LANDING_GLOSSARY_BY_KEYWORD: [string, string[]][] = [
  ["pt ", ["pt", "akta-pendirian", "badan-hukum"]],
  ["pma", ["pma", "pt", "ekspansi-asing"]],
  ["npwp", ["npwp", "coretax", "faktur-pajak"]],
  ["pajak", ["ppn", "pph-badan", "coretax"]],
  ["nib", ["nib", "oss-rba", "kbli"]],
  ["kbli", ["kbli", "nib", "oss-rba"]],
  ["halal", ["halal", "bpjph"]],
  ["iso", ["iso", "bnsp"]],
  ["kitas", ["kitas", "rptka", "notifikasi-tka"]],
  ["pmi", ["pmi", "pptkis", "rptka"]],
];

export function buildLandingLinkGroups(
  itemName: string,
  itemKode: string
): InternalLinkGroup[] {
  const lower = ` ${itemName.toLowerCase()} `;
  const picks: InternalLink[] = [];
  for (const [kw, slugs] of LANDING_GLOSSARY_BY_KEYWORD) {
    if (lower.includes(kw)) {
      for (const s of slugs) {
        if (GLOSSARY_SLUG_SET.has(s)) {
          const term = GLOSSARY_TERMS.find((t) => t.slug === s);
          picks.push({ label: term?.term ?? s, href: `/glosarium/${s}` });
        }
      }
      break;
    }
  }

  const groups: InternalLinkGroup[] = [];
  if (picks.length > 0) {
    groups.push({ heading: "Pahami Dasar Izinnya", links: picks });
  }
  groups.push({
    heading: "Jelajahi Layanan & Wilayah",
    links: [
      { label: "Semua Layanan per Wilayah", href: "/layanan" },
      { label: "Daftar Harga Lengkap", href: "/katalog" },
      { label: "Cari Kode KBLI", href: "/kbli" },
      { label: "Kalkulator Pajak", href: "/kalkulator-pajak" },
      { label: "Cek Izin Usaha", href: "/cek-izin" },
    ],
  });
  return groups;
}
