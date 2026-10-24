// ============================================================
// PUSATPERIZINAN.COM — GENERATOR KATALOG v3 (kode PP3-XXX)
// Mengembangkan 120 base arketipe (katalog-v3-bases.mjs) + pool
// kurasi (katalog-v3-pool.json) menjadi PASTI 500 layanan baru
// via variant factory (Baru / Perpanjangan / Perubahan Data).
// Output: src/lib/katalog-v3.ts — JANGAN EDIT MANUAL, regenerasi:
//   node scripts/generate-katalog-v3.mjs
// ============================================================

import { readFileSync, writeFileSync } from "node:fs";
import { BASES } from "./katalog-v3-bases.mjs";

const POOL = JSON.parse(readFileSync(new URL("./katalog-v3-pool.json", import.meta.url), "utf8"));

// Quota ketat per kategori (total 500)
const QUOTA = { PN: 85, WK: 80, AG: 85, DT: 85, KF: 80, TK: 85 };
const CATEGORY_META = {
  PN: { name: "Pendidikan & Pelatihan", desc: "Izin lembaga kursus, sekolah & yayasan pendidikan, akreditasi BAN-S/M & BAN-PT, sertifikasi LSP/BNSP, NUPTK, PKPA, dan legalitas satuan pendidikan nonformal-formal." },
  WK: { name: "Pariwisata & Ekonomi Kreatif", desc: "Standar usaha hotel-homestay-villa, SLS & laik fungsi daya tarik, lisensi pemandu wisata, perizinan film LSF, IUK gim, pendataan ekraf, event & MICE." },
  AG: { name: "Pertanian, Peternakan & Perikanan", desc: "SIT ternak, pakan & obat hewan, budidaya perikanan, SIUP-SIPI-SIO kapal, TUKS pengolahan, STDB perkebunan, benih, dan karantina Barantan." },
  DT: { name: "Digital, Media & Penyiaran", desc: "PSE Terdaftar & Asing Komdigi, LPS radio-TV, BTS & tower sharing, ISR frekuensi, type approval, Jartaplok-VSAT, Dewan Pers, LMKN, hak cipta DJKI, dan kepatuhan siber." },
  KF: { name: "Keuangan & Fintech", desc: "Izin OJK (pembiayaan, asuransi, sekuritas, MI, BPR), Bank Indonesia (PJSP, e-money, BJIB, money changer), Bappebti kripto fisik, koperasi simpan pinjam, dan PPATK." },
  TK: { name: "Ketenagakerjaan & Keamanan", desc: "RPTKA & Kitas-KITAP, WLKP & Bp 21, PJK3, Ahli K3, SKK-SBU konstruksi, BUJP & Gada Polri, LKSSP-PKB, SIO alat berat, SMK3, dan BPJS Ketenagakerjaan." },
};

// Entry pool yang sengaja dilewati (quota trimming — duplikat konsep terdekat)
const SKIP_POOL = new Set([
  "Perpanjangan Pengesahan Standar Usaha Restoran",
  "Perpanjangan Sertifikasi Standar Usaha MICE",
]);
// Base yang hanya 1 varian (tanpa perpanjangan/perubahan)
const SINGLE_BASE = new Set([
  "Karantina Hewan Domestik (KH) — Perpindahan Antarprovinsi", // AG
  "Pendaftaran NPWP Badan & PKP untuk Lembaga Keuangan (DJP)", // KF
  "Registrasi Merchant QRIS Besar & Integrasi Payment (BI)", // KF
  "Pendampingan Inspeksi Ketenagakerjaan (Kemnaker — Inspektur Kerja)", // TK
]);
// Base yang dilewati sepenuhnya (trimming)
const SKIP_BASE = new Set([
  "Izin Pembenihan Ikan (BBI/BUIT) & Penyebaran Benih", // AG (dup konsep dgn budidaya)
  "Penerbitan DTKLN (Administrasi Digital TKA) & Pemberitahuan Online", // TK (rapat dgn RPTKA)
]);

const fmt = (n) => "Rp " + n.toLocaleString("id-ID");
const hash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
const kebab = (s) =>
  s.toLowerCase()
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

// ---------- variant factory ----------

const P_SCAFFOLDS = [
  (N, A, V) => `Perpanjangan ${N} menjaga status ${V} berikutnya tanpa jeda legal. Kami menata dokumen peremajaan dan mendampingi verifikasi ${A} hingga terbit. Izin aktif menjaga kontrak, tender, dan kepatuhan operasional Anda aman.`,
  (N, A, V) => `Proses perpanjangan ${N} membutuhkan dokumen lama yang terawat dan koordinasi ${A}. Kami meninjau kepatuhan, melengkapi persyaratan, dan mengurus hingga izin ${V} berikutnya terbit. Layanan ini mencegah izin hangus saat sedang digunakan.`,
  (N, A, V) => `Jangan tunggu izin hangus — perpanjangan ${N} sebaiknya diajukan 1-2 bulan sebelum masa berlaku habis. Kami mengatur jadwal, menyiapkan dokumen, dan mendampingi proses di ${A} hingga izin ${V} berikutnya terbit tanpa jeda operasional.`,
  (N, A, V) => `Perpanjangan ${N} memvalidasi ulang kelayakan usaha Anda di hadapan ${A} dengan dokumen terkini. Kami menyusun berkas peremajaan, menindaklanjuti verifikasi, hingga izin dengan masa berlaku ${V} terbit kembali. Status aktif menjaga reputasi bisnis dan kelancaran audit.`,
];
const C_SCAFFOLDS = [
  (N, A, CH) => `Perubahan data ${N} untuk ${CH} wajib dilaporkan agar dokumen resmi selalu sinkron dengan kondisi terkini. Kami menyiapkan berkas perubahan dan mendampingi verifikasi ${A}. Data mutakhir menjaga keabsahan izin saat audit dan klaim.`,
  (N, A, CH) => `Ketika terjadi ${CH}, izin ${N} harus diperbarui agar sesuai fakta usaha. Kami mengurus administrasi perubahan di ${A} hingga dokumen baru terbit. Memutakhirkan data mencegah masalah hukum saat verifikasi pihak ketiga.`,
  (N, A, CH) => `Perubahan ${CH} pada ${N} diproses sebagai administrasi koreksi — lebih cepat dan murah daripada izin baru. Kami menyiapkan dokumen pendukung perubahan dan mendampingi proses ${A}. Dokumen akurat melindungi bisnis Anda saat due diligence.`,
  (N, A, CH) => `Setiap ${CH} pada ${N} wajib disinkronkan ke dokumen izin resmi. Kami menata berkas, mengajukan koreksi ke ${A}, dan memastikan dokumen baru terbit tanpa jeda operasional. Kepatuhan data menjaga kepercayaan mitra dan regulator.`,
];
const P_NOTES = [
  "Ajukan 1-2 bulan sebelum masa berlaku habis agar tidak ada jeda.",
  "Kami ingatkan otomatis saat mendekati masa berlaku.",
  "Termasuk cek kepatuhan dokumen sebelum diajukan.",
  "Peremajaan dibantu penuh oleh tim kami dari dokumen hingga verifikasi.",
];
const C_NOTES = [
  "Perubahan dibatasi data yang tidak mengubah hak pokok izin.",
  "Lebih cepat dan murah dibanding mengurus izin baru.",
  "Termasuk sinkronisasi data ke dokumen turunan terkait.",
  "Kami cek dulu kelayakan perubahan sebelum pengajuan.",
];

function parseEstimate(e) {
  const m = e.match(/(\d+)-(\d+)\s*hari\s*\((\d+)\s*hari kerja\)/);
  if (!m) return null;
  return { min: +m[1], max: +m[2], work: +m[3] };
}
function scaleEstimate(e, factor, floorMin) {
  const p = parseEstimate(e);
  if (!p) return e;
  const min = Math.max(floorMin, Math.round(p.min * factor));
  const max = Math.max(min + 1, Math.round(p.max * factor));
  const work = Math.max(max, Math.round(p.work * factor));
  return `${min}-${max} hari (${work} hari kerja)`;
}
const round50k = (n) => Math.max(300000, Math.round(n / 50000) * 50000);

function coreName(n) {
  return n.replace(/^Pengurusan\s+/, "").replace(/^Pendaftaran\s+/, "").replace(/^Pengesahan\s+Standar Usaha\s+/, "Standar Usaha ");
}
function makeVariants(b) {
  const out = [b]; // varian baru (nama & deskripsi asli)
  const core = coreName(b.n);
  if (!/^Perpanjangan/i.test(b.n)) {
    const p = round50k(b.p * 0.65);
    const pName = / — (Pendaftaran|Pengajuan Baru)$/i.test(b.n) ? b.n.replace(/ — (Pendaftaran|Pengajuan Baru)$/i, "") : b.n;
    out.push({
      ...b,
      n: `Perpanjangan ${pName}`,
      p,
      e: scaleEstimate(b.e, 0.6, 5),
      r: `Izin/tanda daftar lama masih berlaku, ${b.r.split(",").slice(0, 3).join(",").trim()}`,
      nt: P_NOTES[hash(b.n) % P_NOTES.length],
      ds: P_SCAFFOLDS[hash(b.n) % P_SCAFFOLDS.length](b.n, b.a, b.v),
    });
  }
  const p2 = round50k(b.p * 0.5);
  out.push({
    ...b,
    n: `Perubahan Data ${core} — ${b.ch}`,
    p: p2,
    e: scaleEstimate(b.e, 0.45, 5),
    r: `${b.r.split(",").slice(0, 2).join(",").trim()}, dokumen pendukung perubahan (${b.ch.toLowerCase()})`,
    nt: C_NOTES[hash(b.ch) % C_NOTES.length],
    ds: C_SCAFFOLDS[hash(b.n) % C_SCAFFOLDS.length](core, b.a, b.ch),
  });
  return out;
}

// ---------- assembly ----------

function assemble() {
  const result = { PN: [], WK: [], AG: [], DT: [], KF: [], TK: [] };
  for (const cat of Object.keys(QUOTA)) {
    const need = QUOTA[cat];
    // 1) pool entries (skip yang ditandai)
    const pool = (POOL[cat] || []).filter((x) => !SKIP_POOL.has(x.n));
    const entries = pool.map((x) => ({
      n: x.n, p: x.p, d: x.d, a: x.a, e: x.e, v: x.v, r: x.r, nt: x.nt, ds: x.ds,
      ch: x.ch || "Penambahan Lingkup Layanan", // pool tak punya ch → fallback generik (tak dipakai: pool 1 varian)
    }));
    // 2) bases → variants
    for (const b of BASES[cat] || []) {
      if (SKIP_BASE.has(b.n)) continue;
      if (SINGLE_BASE.has(b.n)) { entries.push(b); continue; }
      entries.push(...makeVariants(b));
    }
    // 3) trim to quota (potong dari ekor — prioritas varian Baru sudah masuk lebih dulu)
    let final = entries.slice(0, need);
    if (final.length < need) {
      throw new Error(`Kategori ${cat} kurang: butuh ${need}, tersedia ${entries.length}`);
    }
    // pastikan tidak ada entri "Perpanjangan/Perubahan" terpotong yang meninggalkan induknya sendirian — tolerable: slice aman karena urutan [baru, perpanjangan, perubahan] per base
    result[cat] = final;
  }
  return result;
}

// ---------- validation & emit ----------

function validate(data) {
  const errors = [];
  // load existing slugs/names v1
  const v1 = JSON.parse(readFileSync(new URL("../src/data/layanan-500.json", import.meta.url), "utf8"));
  const v1Slugs = new Set(v1.map((x) => (x.tautan || "").replace("https://pusatperizinan.com/", "")));
  const v1Names = new Set(v1.map((x) => x.nama.toLowerCase()));
  // v2 slugs/names
  const v2src = readFileSync(new URL("../src/lib/katalog-v2.ts", import.meta.url), "utf8");
  const v2Slugs = new Set([...v2src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
  const v2Names = new Set([...v2src.matchAll(/\n\s+name:\s*"([^"]+)"/g)].map((m) => m[1].toLowerCase()));

  const allSlugs = new Set(), allCodes = new Set(), allNames = new Set(), allDesc = new Set();
  let total = 0;
  for (const cat of Object.keys(QUOTA)) {
    const items = data[cat];
    if (items.length !== QUOTA[cat]) errors.push(`${cat}: count ${items.length} != quota ${QUOTA[cat]}`);
    items.forEach((x, i) => {
      total++;
      const code = `PP3-${cat}-${String(i + 1).padStart(3, "0")}`;
      const slug = `${kebab(x.n)}-pp3-${cat.toLowerCase()}-${String(i + 1).padStart(3, "0")}`;
      if (allSlugs.has(slug)) errors.push(`dup slug: ${slug}`);
      if (allCodes.has(code)) errors.push(`dup code: ${code}`);
      const ln = x.n.toLowerCase();
      if (allNames.has(ln)) errors.push(`dup name: ${x.n}`);
      if (allDesc.has(x.ds)) errors.push(`dup desc: ${x.n}`);
      if (v1Slugs.has(slug) || v2Slugs.has(slug)) errors.push(`collision slug v1/v2: ${slug}`);
      if (v1Names.has(ln) || v2Names.has(ln)) errors.push(`collision name v1/v2: ${x.n}`);
      if (!/^[a-z0-9-]+-pp3-[a-z]{2}-\d{3}$/.test(slug)) errors.push(`bad slug: ${slug}`);
      if (x.discountPrice !== undefined) { /* tidak dipakai: dihitung di emit */ }
      if (!x.n || !x.p || !x.a || !x.e || !x.v || !x.r || !x.ds) errors.push(`incomplete: ${x.n}`);
      allSlugs.add(slug); allCodes.add(code); allNames.add(ln); allDesc.add(x.ds);
    });
  }
  if (total !== 500) errors.push(`total ${total} != 500`);
  return { errors, v1Slugs, v2Slugs, v1Names, v2Names };
}

function emit(data) {
  const lines = [];
  let totalSavings = 0, priceMin = Infinity, priceMax = 0;
  const tiers = { entry: 0, mid: 0, premium: 0, enterprise: 0 };
  const tierOf = (price) => (price < 2_000_000 ? "entry" : price < 15_000_000 ? "mid" : price < 100_000_000 ? "premium" : "enterprise");

  lines.push(`// ============================================================`);
  lines.push(`// PUSATPERIZINAN.COM — KATALOG v3 (kode PP3-XXX) — 500 LAYANAN`);
  lines.push(`// AUTO-GENERATED oleh scripts/generate-katalog-v3.mjs — JANGAN`);
  lines.push(`// EDIT MANUAL. Sumber: scripts/katalog-v3-bases.mjs (120 base`);
  lines.push(`// arketipe) + scripts/katalog-v3-pool.json (kurasi) → variant`);
  lines.push(`// factory (Baru/Perpanjangan/Perubahan). Regenerasi:`);
  lines.push(`//   node scripts/generate-katalog-v3.mjs`);
  lines.push(`// ============================================================`);
  lines.push(``);
  lines.push(`import type { KatalogV2Service } from "./katalog-v2";`);
  lines.push(``);
  lines.push(`/** Layanan Katalog v3 — struktur identik dengan v2 agar komponen detail bersama dapat dipakai. */`);
  lines.push(`export type KatalogV3Service = Omit<KatalogV2Service, "categoryCode"> & { categoryCode: "PN" | "WK" | "AG" | "DT" | "KF" | "TK" };`);
  lines.push(``);
  lines.push(`export const KATALOG_V3_CATEGORIES: { code: keyof typeof CATEGORY_META_V3; name: string; desc: string; count: number }[] = [`);
  for (const [code, meta] of Object.entries(CATEGORY_META)) {
    lines.push(`  { code: "${code}", name: "${meta.name}", desc: ${JSON.stringify(meta.desc)}, count: ${data[code].length} },`);
  }
  lines.push(`];`);
  lines.push(``);
  lines.push(`const CATEGORY_META_V3 = {`);
  for (const [code, meta] of Object.entries(CATEGORY_META)) {
    lines.push(`  ${code}: { name: "${meta.name}", desc: ${JSON.stringify(meta.desc)} },`);
  }
  lines.push(`} as const;`);
  lines.push(``);
  lines.push(`export const KATALOG_V3: KatalogV3Service[] = [`);
  const indexRows = [];
  for (const cat of Object.keys(QUOTA)) {
    data[cat].forEach((x, i) => {
      const code = `PP3-${cat}-${String(i + 1).padStart(3, "0")}`;
      const slug = `${kebab(x.n)}-pp3-${cat.toLowerCase()}-${String(i + 1).padStart(3, "0")}`;
      const normal = x.p;
      const pct = x.d;
      const disc = Math.round(normal * (1 - pct / 100));
      const save = normal - disc;
      totalSavings += save;
      priceMin = Math.min(priceMin, disc);
      priceMax = Math.max(priceMax, disc);
      tiers[tierOf(disc)]++;
      const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      lines.push(`  {`);
      lines.push(`    code: "${code}",`);
      lines.push(`    slug: "${slug}",`);
      lines.push(`    name: "${esc(x.n)}",`);
      lines.push(`    categoryCode: "${cat}",`);
      lines.push(`    category: "${CATEGORY_META[cat].name}",`);
      lines.push(`    normalPrice: ${normal},`);
      lines.push(`    discountPct: ${pct},`);
      lines.push(`    discountPrice: ${disc},`);
      lines.push(`    savings: ${save},`);
      lines.push(`    estimate: "${esc(x.e)}",`);
      lines.push(`    authority: "${esc(x.a)}",`);
      lines.push(`    requirements: "${esc(x.r)}",`);
      lines.push(`    validity: "${esc(x.v)}",`);
      lines.push(`    notes: "${esc(x.nt)}",`);
      lines.push(`    description: "${esc(x.ds)}",`);
      lines.push(`  },`);
      indexRows.push({ slug, code, name: x.n, cat, disc, normal, pct, est: x.e });
    });
  }
  lines.push(`];`);
  lines.push(``);
  lines.push(`/** Resolusi slug → layanan v3 (dipakai catch-all /layanan/[...slug]). */`);
  lines.push(`export function resolveKatalogV3(slug: string): KatalogV3Service | undefined {`);
  lines.push(`  return V3_MAP.get(slug);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`/** Semua slug v3 — dipakai generateStaticParams + sitemap. */`);
  lines.push(`export const KATALOG_V3_SLUGS: string[] = KATALOG_V3.map((s) => s.slug);`);
  lines.push(``);
  lines.push(`const V3_MAP = new Map(KATALOG_V3.map((s) => [s.slug, s]));`);
  lines.push(``);
  lines.push(`/** Layanan satu kategori v3 (untuk related/internal linking). */`);
  lines.push(`export function katalogV3ByCategory(code: string): KatalogV3Service[] {`);
  lines.push(`  return KATALOG_V3.filter((s) => s.categoryCode === code);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export const KATALOG_V3_STATS = {`);
  lines.push(`  total: 500,`);
  lines.push(`  categories: 6,`);
  lines.push(`  priceMin: ${priceMin},`);
  lines.push(`  priceMax: ${priceMax},`);
  lines.push(`  totalSavings: ${totalSavings},`);
  lines.push(`  tiers: {`);
  lines.push(`    entry: ${tiers.entry},`);
  lines.push(`    mid: ${tiers.mid},`);
  lines.push(`    premium: ${tiers.premium},`);
  lines.push(`    enterprise: ${tiers.enterprise},`);
  lines.push(`  },`);
  lines.push(`} as const;`);
  lines.push(``);
  lines.push(`/** Tier harga untuk badge/filter browser (threshold sama dengan v2). */`);
  lines.push(`export function katalogV3Tier(price: number): "entry" | "mid" | "premium" | "enterprise" {`);
  lines.push(`  if (price < 2_000_000) return "entry";`);
  lines.push(`  if (price < 15_000_000) return "mid";`);
  lines.push(`  if (price < 100_000_000) return "premium";`);
  lines.push(`  return "enterprise";`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export { CATEGORY_META_V3 };`);
  lines.push(``);
  lines.push(`/** Index ringan untuk browser client (tanpa description/requirements agar bundle ramping). */`);
  lines.push(`export interface KatalogV3IndexItem {`);
  lines.push(`  slug: string; code: string; name: string; categoryCode: string;`);
  lines.push(`  discountPrice: number; normalPrice: number; discountPct: number; estimate: string;`);
  lines.push(`}`);
  lines.push(`export const KATALOG_V3_INDEX: KatalogV3IndexItem[] = [`);
  for (const r of indexRows) {
    const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    lines.push(`  { slug: "${r.slug}", code: "${r.code}", name: "${esc(r.name)}", categoryCode: "${r.cat}", discountPrice: ${r.disc}, normalPrice: ${r.normal}, discountPct: ${r.pct}, estimate: "${esc(r.est)}" },`);
  }
  lines.push(`];`);
  return lines.join("\n") + "\n";
}

// ---------- main ----------

const data = assemble();
const { errors } = validate(data);
if (errors.length) {
  console.error("VALIDATION FAILED:");
  errors.forEach((e) => console.error("  ✗", e));
  process.exit(1);
}
const ts = emit(data);
writeFileSync(new URL("../src/lib/katalog-v3.ts", import.meta.url), ts);
console.log("✓ KATALOG v3 generated: src/lib/katalog-v3.ts (" + (ts.length / 1024).toFixed(0) + " KB)");
for (const cat of Object.keys(QUOTA)) {
  console.log(`  ${cat}: ${data[cat].length} layanan`);
}
const stats = { savings: 0 };
let priceMin = Infinity, priceMax = 0;
for (const cat of Object.keys(QUOTA)) for (const x of data[cat]) { const d = Math.round(x.p * (1 - x.d / 100)); priceMin = Math.min(priceMin, d); priceMax = Math.max(priceMax, d); stats.savings += x.p - d; }
console.log(`  harga: ${fmt(priceMin)} — ${fmt(priceMax)} | total hemat: ${fmt(stats.savings)}`);
