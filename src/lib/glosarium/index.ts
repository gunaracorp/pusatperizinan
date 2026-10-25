import type {
  GlossaryCategory,
  GlossaryCategoryId,
  GlossaryTerm,
} from "./types";
import { GLOSARIUM_DASAR } from "./dasar";
import { GLOSARIUM_BADAN_USAHA } from "./badan-usaha";
import { GLOSARIUM_PAJAK } from "./perpajakan";
import { GLOSARIUM_SEKTOR } from "./sektor";
import { GLOSARIUM_KETENAGAKERJAAN } from "./ketenagakerjaan";
import { GLOSARIUM_PERDAGANGAN } from "./perdagangan";
import { GLOSARIUM_REGULASI } from "./regulasi";
import { GLOSARIUM_PROSES } from "./proses";

export type {
  GlossaryCategory,
  GlossaryCategoryId,
  GlossaryTerm,
  GlossaryServiceLink,
} from "./types";

// ============================================================
// GLOSARIUM — AGREGASI 200+ ISTILAH PERIZINAN
// ============================================================
// ROADMAP-99 langkah 41. Sumber kebenaran data: 8 file kategori.
// Halaman: /glosarium (indeks) + /glosarium/[slug] (211 halaman
// DefinedTerm). Jangan hardcode daftar slug — selalu pakai helper
// di bawah agar QA & sitemap otomatis konsisten.

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    id: "dasar",
    name: "Perizinan Dasar & OSS",
    desc: "NIB, OSS-RBA, sertifikat standar, LKPM, KBLI, hingga lisensi warisan yang telah dilebur.",
  },
  {
    id: "badan-usaha",
    name: "Badan Usaha & Kepemilikan",
    desc: "PT, CV, PT Perorangan, PMA, saham, akta, hingga struktur modal dan organ perseroan.",
  },
  {
    id: "pajak",
    name: "Perpajakan",
    desc: "NPWP, Coretax, PPN, PPh pasal demi pasal, faktur pajak, SPT, hingga pemeriksaan pajak.",
  },
  {
    id: "sektor",
    name: "Izin Sektor & Sertifikasi",
    desc: "BPOM, halal, SNI, tambang, PBG/SLF, lingkungan, kesehatan, PSE, hingga PROPER.",
  },
  {
    id: "ketenagakerjaan",
    name: "Ketenagakerjaan & PMI",
    desc: "RPTKA, KITAS, BPJS, kontrak kerja, UMP/UMK, hingga penempatan pekerja migran.",
  },
  {
    id: "perdagangan",
    name: "Perdagangan & Ekspor-Impor",
    desc: "API, PEB, PIB, HS code, bea masuk, lartas, hingga rezim kawasan berikat.",
  },
  {
    id: "regulasi",
    name: "Regulasi & Lembaga",
    desc: "UU Cipta Kerja, Perpres 5/2021, hingga kementerian dan lembaga penerbit lisensi.",
  },
  {
    id: "proses",
    name: "Proses, Dokumen & Kepatuhan",
    desc: "Alur permohonan, verifikasi, kuasa, apostille, SLA, hingga kalender kepatuhan.",
  },
];

const CATEGORY_GROUPS: Record<GlossaryCategoryId, GlossaryTerm[]> = {
  dasar: GLOSARIUM_DASAR,
  "badan-usaha": GLOSARIUM_BADAN_USAHA,
  pajak: GLOSARIUM_PAJAK,
  sektor: GLOSARIUM_SEKTOR,
  ketenagakerjaan: GLOSARIUM_KETENAGAKERJAAN,
  perdagangan: GLOSARIUM_PERDAGANGAN,
  regulasi: GLOSARIUM_REGULASI,
  proses: GLOSARIUM_PROSES,
};

/** Seluruh istilah — urut abjad A-Z berdasarkan nama tampil. */
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  ...GLOSARIUM_DASAR,
  ...GLOSARIUM_BADAN_USAHA,
  ...GLOSARIUM_PAJAK,
  ...GLOSARIUM_SEKTOR,
  ...GLOSARIUM_KETENAGAKERJAAN,
  ...GLOSARIUM_PERDAGANGAN,
  ...GLOSARIUM_REGULASI,
  ...GLOSARIUM_PROSES,
].sort((a, b) => a.term.localeCompare(b.term, "id"));

export const GLOSSARY_TOTAL = GLOSSARY_TERMS.length;

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

export function getGlossaryByCategory(id: GlossaryCategoryId): GlossaryTerm[] {
  return CATEGORY_GROUPS[id] ?? [];
}

/** Istilah terkait yang benar-benar resolve (aman dari slug salah ketik). */
export function getRelatedGlossaryTerms(
  slug: string,
  limit = 6
): GlossaryTerm[] {
  const term = getGlossaryTerm(slug);
  if (!term?.related?.length) return [];
  const related: GlossaryTerm[] = [];
  for (const rel of term.related) {
    if (rel === slug) continue;
    const found = getGlossaryTerm(rel);
    if (found && !related.some((r) => r.slug === found.slug)) {
      related.push(found);
      if (related.length >= limit) break;
    }
  }
  return related;
}

/** Istilah populer untuk kartu unggulan di halaman indeks (slug manual). */
export const GLOSSARY_FEATURED_SLUGS = [
  "nib",
  "oss-rba",
  "lkpm",
  "kbli",
  "pt",
  "pt-perorangan",
  "ppn",
  "pkp",
  "halal",
  "izin-edar",
  "rptka",
  "api-u",
  "pbg",
  "uu-cipta-kerja",
];

export function getGlossaryFeatured(): GlossaryTerm[] {
  const featured: GlossaryTerm[] = [];
  for (const slug of GLOSSARY_FEATURED_SLUGS) {
    const term = getGlossaryTerm(slug);
    if (term) featured.push(term);
  }
  return featured;
}

/** Indeks A-Z untuk navigasi alfabet di halaman indeks. */
export function getGlossaryAlphabet(): { letter: string; terms: GlossaryTerm[] }[] {
  const map = new Map<string, GlossaryTerm[]>();
  for (const term of GLOSSARY_TERMS) {
    const letter = term.term.charAt(0).toUpperCase();
    const bucket = map.get(letter);
    if (bucket) bucket.push(term);
    else map.set(letter, [term]);
  }
  return [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], "id"))
    .map(([letter, terms]) => ({ letter, terms }));
}
