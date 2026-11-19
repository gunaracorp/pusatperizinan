import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList, FileText, Globe, LayoutDashboard, Star,
  MessageCircle, CheckCircle2, Phone, ExternalLink,
} from "lucide-react";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import { ogImageUrl } from "@/lib/og-template";

// ============================================================
// PUSATPERIZINAN.COM — /pengurusan-perizinan-kbli-85520
// Halaman produk resmi: PAKET ALL-IN PENGURUSAN PERIZINAN
// KBLI 85520 + 2 WEBSITE BISNIS.
// Kode item  : PP-KBLI85520-ALLIN (standar internal, bukan kode
//              resmi pemerintah) — identitas konsisten antara
//              WhatsApp Business, website, invoice, dan CRM.
// Harga      : normal Rp28.000.000 → paket Rp18.000.000
//              (hemat Rp10.000.000 / ±36%); DP & pelunasan
//              mengikuti penawaran/invoice resmi.
// ============================================================

const KODE_ITEM = "PP-KBLI85520-ALLIN";
const HARGA_NORMAL = 28_000_000;
const HARGA_PAKET = 18_000_000;
const HEMAT = HARGA_NORMAL - HARGA_PAKET; // 10.000.000

const fmtIdr = (n: number): string => `Rp${n.toLocaleString("id-ID")}`;

export const metadata: Metadata = {
  title: "Jasa Pengurusan KBLI 85520 | PusatPerizinan.com",
  description:
    "Layanan pengurusan perizinan KBLI 85520 bidang pendidikan dan pelatihan kerja. Paket lengkap meliputi konsultasi, persiapan dokumen, pendampingan OSS RBA, dan dukungan legalitas usaha.",
  alternates: langAlternates("/pengurusan-perizinan-kbli-85520"),
  openGraph: {
    images: [
      {
        url: ogImageUrl({
          title: "Paket All-In Pengurusan Perizinan KBLI 85520 + 2 Website Bisnis",
          subtitle: `Kode item ${KODE_ITEM} · Rp18.000.000 (hemat ±36%)`,
          category: "Perizinan Usaha & Legalitas Bisnis",
        }),
        width: 1200,
        height: 630,
        alt: "Paket All-In Pengurusan Perizinan KBLI 85520 + 2 Website Bisnis",
      },
    ],
    title: "Paket All-In Pengurusan Perizinan KBLI 85520 + 2 Website Bisnis",
    description:
      "Pengurusan KBLI 85520 + dokumen profesional + website publik + management system dalam satu paket. Harga paket spesial Rp18.000.000.",
    url: `${SITE_URL}/pengurusan-perizinan-kbli-85520`,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  `Halo ${SITE_NAME}, saya tertarik dengan PAKET ALL-IN Pengurusan Perizinan KBLI 85520 + 2 Website Bisnis (kode item ${KODE_ITEM}). Mohon dibantu konsultasi dan penawaran resmi. Terima kasih.`,
)}`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pengurusan Perizinan KBLI 85520 – Paket Lengkap All-In",
    serviceType: "Perizinan Usaha & Legalitas Bisnis",
    category: "KBLI 85520 – Pendidikan Kebudayaan",
    description:
      "Layanan pengurusan perizinan KBLI 85520 bidang pendidikan dan pelatihan kerja. Paket lengkap meliputi konsultasi, persiapan dokumen, pendampingan OSS RBA, penyusunan dokumen profesional, serta pengembangan dua website bisnis (website publik dan website internal/management system).",
    url: `${SITE_URL}/pengurusan-perizinan-kbli-85520`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: CONTACT.phoneDisplay,
    },
    areaServed: { "@type": "Country", name: "Indonesia" },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: HARGA_PAKET,
      url: `${SITE_URL}/pengurusan-perizinan-kbli-85520`,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Paket & Bundel Layanan", item: `${SITE_URL}/katalog` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Paket All-In Pengurusan Perizinan KBLI 85520 + 2 Website Bisnis",
        item: `${SITE_URL}/pengurusan-perizinan-kbli-85520`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Apa saja yang termasuk dalam Paket All-In KBLI 85520?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Paket mencakup empat bagian: (A) pengurusan perizinan KBLI 85520 – Pendidikan Kebudayaan meliputi konsultasi, persiapan dokumen, pendampingan OSS RBA hingga Sertifikat Standar; (B) penyusunan dokumen profesional (company profile, profil pengelola, kurikulum, silabus, SOP); (C) website publik profesional untuk pemasaran; dan (D) website internal/management system untuk operasional. Kedua website mencakup pembuatan, konfigurasi awal, dan pendampingan sesuai spesifikasi yang disepakati.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa harga paket dan bagaimana skema pembayarannya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harga normal Rp28.000.000, harga paket spesial Rp18.000.000 (hemat Rp10.000.000 atau sekitar 36%). Pembayaran menggunakan skema DP sesuai penawaran resmi dan pelunasan sesuai invoice. Harga dan termin pembayaran mengikuti penawaran atau invoice resmi yang berlaku — tidak dicampur antara harga katalog dan invoice khusus untuk transaksi yang sama.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah KBLI 85520 sesuai untuk lembaga pendidikan dan studio seni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KBLI 85520 (Pendidikan Kebudayaan) mencakup kegiatan pendidikan kebudayaan seperti kursus seni, studio seni, dan lembaga pendidikan kebudayaan. Paket ini dirancang untuk perusahaan, studio seni, lembaga pendidikan kebudayaan, dan pelaku usaha kreatif. Kesesuaian KBLI dengan kegiatan usaha aktual dianalisis pada tahap konsultasi awal sebelum pengajuan.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah harga paket sudah termasuk biaya resmi pemerintah (PNBP)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Biaya jasa mengikuti ruang lingkup paket. Biaya resmi pemerintah/PNBP atau biaya pihak ketiga, jika ada, diinformasikan secara transparan terpisah. Penerbitan perizinan mengikuti hasil verifikasi dan keputusan instansi berwenang. Spesifikasi teknis, hosting, domain, dan masa pemeliharaan website mengikuti kesepakatan tertulis.",
        },
      },
    ],
  },
];

const LINGKUP_PERIZINAN = [
  "Konsultasi dan analisis kebutuhan perizinan.",
  "Pemeriksaan legalitas dan administrasi perusahaan.",
  "Pendampingan penambahan atau penyesuaian KBLI 85520.",
  "Persiapan dan pemeriksaan dokumen persyaratan.",
  "Penyusunan dokumen pendukung kegiatan usaha.",
  "Pendampingan proses pengajuan melalui OSS RBA.",
  "Pendampingan pemenuhan persyaratan Sertifikat Standar atau keluaran perizinan sesuai ketentuan.",
  "Koordinasi dan pendampingan visitasi apabila dipersyaratkan.",
  "Monitoring, evaluasi, dan tindak lanjut proses.",
  "Pendampingan hingga penyelesaian tahapan perizinan sesuai ruang lingkup kesepakatan.",
];

const DOKUMEN_PROFESIONAL = [
  "Company Profile.",
  "Profil dan struktur organisasi.",
  "Profil pengelola dan tenaga pengajar.",
  "Data pengalaman dan kualifikasi instruktur.",
  "Program dan kurikulum pembelajaran.",
  "Silabus dan deskripsi materi kelas.",
  "Dokumen administrasi pendidikan.",
  "SOP dan dokumen pendukung teknis sesuai kebutuhan.",
];

const WEBSITE_PUBLIK = [
  "Homepage profesional.",
  "Company Profile.",
  "Profil usaha, visi, dan misi.",
  "Informasi program dan kelas.",
  "Profil instruktur.",
  "Galeri dan dokumentasi.",
  "Formulir konsultasi dan pendaftaran.",
  "Integrasi WhatsApp.",
  "Informasi kontak dan lokasi.",
  "Tampilan responsif untuk smartphone, tablet, dan desktop.",
];

const WEBSITE_INTERNAL = [
  "Dashboard manajemen.",
  "Pengelolaan kelas dan program.",
  "Manajemen data peserta.",
  "Pengelolaan instruktur.",
  "Manajemen jadwal kegiatan.",
  "Pencatatan pendaftaran.",
  "Administrasi dan laporan operasional.",
];

const KEUNGGULAN = [
  "Berpengalaman sejak 2009.",
  "Layanan konsultasi profesional.",
  "Proses kerja terstruktur dan terarah.",
  "Pendampingan administrasi dan teknis.",
  "Koordinasi proses melalui OSS RBA.",
  "Penyusunan dokumen secara sistematis.",
  "Transparansi biaya dan ruang lingkup pekerjaan.",
  "Pendampingan hingga tahapan layanan selesai.",
];

const TAHAPAN = [
  "Konsultasi dan analisis kebutuhan.",
  "Pemeriksaan serta persiapan dokumen.",
  "Penyusunan profil dan dokumen pendukung.",
  "Persiapan dan pengajuan perizinan melalui OSS RBA.",
  "Pendampingan verifikasi dan visitasi apabila diperlukan.",
  "Pengembangan dan konfigurasi kedua website.",
  "Monitoring, penyelesaian administrasi, dan serah terima hasil pekerjaan.",
];

export default function PaketKbli85520AllInPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/katalog" className="hover:text-emerald-700">Katalog Layanan</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">
            Paket All-In KBLI 85520 + 2 Website
          </span>
        </div>
      </nav>

      {/* HERO + HARGA */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.5fr_1fr] md:py-16">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-emerald-400/15 px-3 py-1 font-mono text-xs font-bold tracking-wider text-emerald-300">
                {KODE_ITEM}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                Perizinan Usaha &amp; Legalitas Bisnis
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                KBLI 85520 – Pendidikan Kebudayaan
              </span>
              <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-emerald-950">
                Paket All-In + 2 Website
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Paket All-In Pengurusan Perizinan KBLI 85520 + 2 Website Bisnis
            </h1>
            <p className="mt-4 max-w-2xl text-emerald-100/90 leading-relaxed md:text-lg">
              Solusi terpadu untuk perusahaan, studio seni, lembaga pendidikan kebudayaan,
              dan pelaku usaha kreatif yang ingin membangun legalitas usaha sekaligus
              memperkuat kehadiran digital secara profesional.
            </p>
            <p className="mt-3 max-w-2xl text-emerald-100/75 leading-relaxed">
              {SITE_NAME} menghadirkan layanan pengurusan perizinan, penyusunan dokumen,
              konsultasi, pendampingan OSS RBA, serta pengembangan dua website bisnis
              dalam satu paket spesial.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> Konsultasi via WhatsApp
              </a>
              <Link
                href="/konsultasi"
                className="flex min-h-11 items-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Ajukan Konsultasi Gratis
              </Link>
            </div>
          </div>

          {/* KARTU HARGA */}
          <aside className="h-fit rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur md:sticky md:top-24">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Harga spesial paket all-in
            </p>
            <p className="mt-2 text-lg text-stone-300 line-through">{fmtIdr(HARGA_NORMAL)}</p>
            <p className="text-3xl font-extrabold text-amber-400 md:text-4xl">{fmtIdr(HARGA_PAKET)}</p>
            <p className="mt-1 text-sm font-semibold text-emerald-300">
              Hemat {fmtIdr(HEMAT)} (diskon ±36%) · kode item{" "}
              <span className="font-mono">{KODE_ITEM}</span>
            </p>
            <dl className="mt-4 space-y-2 rounded-xl bg-emerald-400/10 px-3 py-3 text-xs leading-relaxed text-emerald-100/90">
              <div className="flex justify-between gap-3">
                <dt className="font-semibold">DP sesuai penawaran</dt>
                <dd className="font-bold text-amber-300">{fmtIdr(5_000_000)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="font-semibold">Pelunasan sesuai invoice</dt>
                <dd className="font-bold text-amber-300">{fmtIdr(5_000_000)}</dd>
              </div>
            </dl>
            <p className="mt-3 rounded-xl bg-emerald-400/10 px-3 py-2 text-xs leading-relaxed text-emerald-100/90">
              Harga dan termin pembayaran mengikuti invoice/penawaran resmi yang berlaku.
              Harga katalog tidak dicampur dengan invoice khusus untuk transaksi yang sama.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-xl bg-amber-400 px-5 py-3 text-center text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              Pesan via WhatsApp — sebut kode item {KODE_ITEM}
            </a>
            <p className="mt-3 text-[11px] leading-relaxed text-emerald-200/70">
              * Biaya jasa mengikuti ruang lingkup paket; biaya resmi pemerintah/PNBP atau
              pihak ketiga (jika ada) diinformasikan transparan.
            </p>
          </aside>
        </div>
      </section>

      {/* A — PENGURUSAN PERIZINAN KBLI 85520 */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="bagian-a">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
            <ClipboardList className="h-5 w-5" />
          </span>
          <div>
            <h2 id="bagian-a" className="text-2xl font-bold text-stone-900 md:text-3xl">
              A. Pengurusan Perizinan KBLI 85520
            </h2>
            <p className="mt-2 text-stone-600">
              KBLI 85520 – Pendidikan Kebudayaan. Ruang lingkup layanan:
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {LINGKUP_PERIZINAN.map((c) => (
            <li key={c} className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* B — PENYUSUNAN DOKUMEN PROFESIONAL */}
      <section className="bg-stone-50 py-14" aria-labelledby="bagian-b">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-start gap-4">
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h2 id="bagian-b" className="text-2xl font-bold text-stone-900 md:text-3xl">
                B. Penyusunan Dokumen Profesional
              </h2>
              <p className="mt-2 max-w-3xl text-stone-600">
                Membantu mempersiapkan dan menata dokumen pendukung usaha, meliputi:
              </p>
            </div>
          </div>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {DOKUMEN_PROFESIONAL.map((c) => (
              <li key={c} className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* C — WEBSITE PUBLIK PROFESIONAL */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="bagian-c">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
            <Globe className="h-5 w-5" />
          </span>
          <div>
            <h2 id="bagian-c" className="text-2xl font-bold text-stone-900 md:text-3xl">
              C. Website Publik Profesional
            </h2>
            <p className="mt-2 max-w-3xl text-stone-600">
              Website resmi untuk membangun kredibilitas, identitas, dan pemasaran bisnis.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {WEBSITE_PUBLIK.map((c) => (
            <li key={c} className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* D — WEBSITE INTERNAL / MANAGEMENT SYSTEM */}
      <section className="bg-stone-50 py-14" aria-labelledby="bagian-d">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-start gap-4">
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
              <LayoutDashboard className="h-5 w-5" />
            </span>
            <div>
              <h2 id="bagian-d" className="text-2xl font-bold text-stone-900 md:text-3xl">
                D. Website Internal / Management System
              </h2>
              <p className="mt-2 max-w-3xl text-stone-600">
                Sistem digital untuk mendukung operasional dan administrasi usaha.
              </p>
            </div>
          </div>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {WEBSITE_INTERNAL.map((c) => (
              <li key={c} className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900">
            Kedua website mencakup pembuatan, konfigurasi awal, dan pendampingan sesuai
            spesifikasi serta ruang lingkup yang disepakati.
          </p>
        </div>
      </section>

      {/* E — KEUNGGULAN */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="bagian-e">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
            <Star className="h-5 w-5" />
          </span>
          <div>
            <h2 id="bagian-e" className="text-2xl font-bold text-stone-900 md:text-3xl">
              E. Keunggulan {SITE_NAME}
            </h2>
          </div>
        </div>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {KEUNGGULAN.map((c) => (
            <li key={c} className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* F — TAHAPAN PENGERJAAN */}
      <section className="bg-stone-50 py-14" aria-labelledby="bagian-f">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="bagian-f" className="text-2xl font-bold text-stone-900 md:text-3xl">
            F. Tahapan Pengerjaan
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TAHAPAN.map((t, i) => (
              <li key={t} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 font-bold text-white" aria-hidden>
                  {i + 1}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MENGAPA MEMILIH */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="mengapa">
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8">
          <h2 id="mengapa" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Mengapa Memilih Paket All-In Ini?
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-stone-700">
            Anda tidak hanya mendapatkan pendampingan pengurusan perizinan, tetapi juga dua
            aset digital bisnis yang mendukung kredibilitas, pemasaran, administrasi, dan
            pengembangan usaha jangka panjang.
          </p>
          <p className="mt-3 max-w-3xl font-semibold text-emerald-900">
            Satu paket untuk mendukung LEGALITAS + DOKUMEN PROFESIONAL + DIGITALISASI BISNIS.
          </p>
        </div>
      </section>

      {/* KONSULTASI & PEMESANAN */}
      <section className="bg-stone-50 py-14" aria-labelledby="pemesanan">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl bg-emerald-950 p-6 text-white md:p-10">
            <h2 id="pemesanan" className="text-2xl font-bold md:text-3xl">
              Konsultasi &amp; Pemesanan
            </h2>
            <p className="mt-2 text-lg font-bold text-emerald-100">PUSATPERIZINAN.COM</p>
            <p className="text-sm text-emerald-200/80">Licensing Consultancy Services</p>
            <p className="mt-2 text-sm text-emerald-200/80">
              Official Partner: GUNARA.WEB.ID
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a
                href="https://www.pusatperizinan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-amber-300 hover:underline"
              >
                https://www.pusatperizinan.com <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
              <a
                href="https://gunara.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-amber-300 hover:underline"
              >
                https://gunara.web.id <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/85">
              Silakan hubungi tim kami untuk konsultasi dan analisis kebutuhan usaha Anda.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp — {CONTACT.phoneDisplay}
              </a>
              <Link
                href="/kontak"
                className="flex min-h-11 items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" aria-hidden /> Kontak &amp; Kantor Kami
              </Link>
            </div>
            <p className="mt-5 text-sm font-semibold text-emerald-100">
              {SITE_NAME} — Bersama Anda Menuju Legalitas Usaha yang Lebih Baik.
            </p>
          </div>
        </div>
      </section>

      {/* CATATAN */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <p className="text-xs leading-relaxed text-stone-500">
          *Catatan: Biaya jasa mengikuti ruang lingkup paket. Biaya resmi pemerintah/PNBP
          atau pihak ketiga, jika ada, diinformasikan secara transparan. Penerbitan
          perizinan mengikuti hasil verifikasi dan keputusan instansi berwenang.
          Spesifikasi teknis, hosting, domain, dan masa pemeliharaan website mengikuti
          kesepakatan tertulis. Kode item {KODE_ITEM} adalah standar internal
          {SITE_NAME}, bukan kode resmi pemerintah.
        </p>
      </section>
    </div>
  );
}
