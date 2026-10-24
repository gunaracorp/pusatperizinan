// ============================================================
// PUSATPERIZINAN.COM — i18n Index (LAZY LOADED)
// ============================================================
// PERF-01 (ROADMAP-99, Core Web Vitals — TBT 1.520ms di PSI mobile):
//   28 bahasa non-inti (≈360 KB sumber) sebelumnya di-import STATIS
//   di sini → ikut bundle client SEMUA halaman padahal hanya 1 bahasa
//   aktif per pengunjung. Ini penyumbang TBT + LCP terbesar.
//
//   Solusi: hanya TRANSLATIONS_CORE (id + en, 22 KB) yang statis.
//   28 bahasa lain diunduh ON-DEMAND via dynamic import() per kode
//   bahasa, lalu ditempel ke objek TRANSLATIONS yang sama (referensi
//   tidak berubah — t() otomatis melihat dict baru setelah render
//   berikutnya dipicu provider).
//
//   API tambahan: ensureTranslations(lang) — dipanggil
//   LanguageProvider setelah deteksi bahasa awal & saat setLang().
//   Untuk id/en resolve seketika (tidak ada network).
//
//   Kontrak lama tetap terpenuhi: TRANSLATIONS tetap di-export
//   dengan tipe yang sama, jadi konsumen lain tidak perlu diubah.
// ============================================================

import type { LangCode, Translation } from "./types";
import { TRANSLATIONS_CORE } from "./translations-core";

/** Dict aktif — core (id+en) selalu ada; 28 bahasa lain menempel di runtime. */
export const TRANSLATIONS: Record<LangCode, Partial<Translation>> = {
  ...TRANSLATIONS_CORE,
} as Record<LangCode, Partial<Translation>>;

// ------------------------------------------------------------
// Loader per kode bahasa — satu chunk kecil per file partisi,
// browser meng-cache chunk yang sama untuk semua bahasa separtisi.
// ------------------------------------------------------------

type PartDictLoader = () => Promise<Partial<Translation> | undefined>;

const LANG_DICT_LOADERS: Partial<Record<LangCode, PartDictLoader>> = {
  // translations-a — Asia Timur & Tenggara
  zh: () => import("./translations-a").then((m) => m.TRANSLATIONS_A.zh),
  ja: () => import("./translations-a").then((m) => m.TRANSLATIONS_A.ja),
  ko: () => import("./translations-a").then((m) => m.TRANSLATIONS_A.ko),
  vi: () => import("./translations-a").then((m) => m.TRANSLATIONS_A.vi),
  th: () => import("./translations-a").then((m) => m.TRANSLATIONS_A.th),
  tl: () => import("./translations-a").then((m) => m.TRANSLATIONS_A.tl),
  ms: () => import("./translations-a").then((m) => m.TRANSLATIONS_A.ms),
  // translations-b — Asia Selatan & Timur Tengah
  hi: () => import("./translations-b").then((m) => m.TRANSLATIONS_B.hi),
  ta: () => import("./translations-b").then((m) => m.TRANSLATIONS_B.ta),
  bn: () => import("./translations-b").then((m) => m.TRANSLATIONS_B.bn),
  ar: () => import("./translations-b").then((m) => m.TRANSLATIONS_B.ar),
  fa: () => import("./translations-b").then((m) => m.TRANSLATIONS_B.fa),
  ur: () => import("./translations-b").then((m) => m.TRANSLATIONS_B.ur),
  he: () => import("./translations-b").then((m) => m.TRANSLATIONS_B.he),
  // translations-c — Eropa Barat
  es: () => import("./translations-c").then((m) => m.TRANSLATIONS_C.es),
  fr: () => import("./translations-c").then((m) => m.TRANSLATIONS_C.fr),
  de: () => import("./translations-c").then((m) => m.TRANSLATIONS_C.de),
  it: () => import("./translations-c").then((m) => m.TRANSLATIONS_C.it),
  nl: () => import("./translations-c").then((m) => m.TRANSLATIONS_C.nl),
  pt: () => import("./translations-c").then((m) => m.TRANSLATIONS_C.pt),
  el: () => import("./translations-c").then((m) => m.TRANSLATIONS_C.el),
  // translations-d — Eropa Timur, Afrika, Jawa
  ru: () => import("./translations-d").then((m) => m.TRANSLATIONS_D.ru),
  pl: () => import("./translations-d").then((m) => m.TRANSLATIONS_D.pl),
  uk: () => import("./translations-d").then((m) => m.TRANSLATIONS_D.uk),
  tr: () => import("./translations-d").then((m) => m.TRANSLATIONS_D.tr),
  sw: () => import("./translations-d").then((m) => m.TRANSLATIONS_D.sw),
  pa: () => import("./translations-d").then((m) => m.TRANSLATIONS_D.pa),
  jv: () => import("./translations-d").then((m) => m.TRANSLATIONS_D.jv),
};

const requestedLangs = new Set<LangCode>();

/**
 * Pastikan dict bahasa `lang` sudah menempel di TRANSLATIONS.
 * id/en → resolve seketika. Bahasa lain → dynamic import sekali
 * (hasil di-cache); gagal network tidak melempar error — t()
 * otomatis fallback ke bahasa Indonesia.
 */
export async function ensureTranslations(lang: LangCode): Promise<void> {
  if (lang in TRANSLATIONS_CORE) return; // id / en — sudah statis
  if (requestedLangs.has(lang)) return;
  const loader = LANG_DICT_LOADERS[lang];
  if (!loader) return;
  requestedLangs.add(lang);
  try {
    const dict = await loader();
    if (dict) TRANSLATIONS[lang] = dict;
  } catch {
    // Chunk gagal dimuat (offline/dll) — fallback ke id tetap berfungsi
    requestedLangs.delete(lang); // boleh dicoba lagi nanti
  }
}

export * from "./types";
export {
  LANGUAGES,
  LANG_MAP,
  LANG_CODES,
  DEFAULT_LANG,
  langEnglishName,
  isLangCode,
  type LanguageMeta,
} from "./languages";
export { TRANSLATIONS_CORE } from "./translations-core";
