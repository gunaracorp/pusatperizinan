import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Building2, CheckCircle2, Clock, FileText,
  Globe, LayoutTemplate, Mail, MessageCircle, PenTool, RefreshCcw,
  ShieldCheck, Sparkles, Wallet,
} from "lucide-react";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import { ogImageUrl } from "@/lib/og-template";

// ============================================================
// PUSATPERIZINAN.COM — /jasa-pembuatan-company-profile
// Halaman produk resmi: JASA PEMBUATAN COMPANY PROFILE LENGKAP.
// Kode item  : PP-CP-001 (standar internal, bukan kode resmi
//              pemerintah) — identitas konsisten antara WhatsApp
//              Business, website, invoice, dan CRM.
// Harga      : Rp1.500.000 all-in (lengkap, tanpa biaya tersembunyi)
// Skema      : DP 50% Rp750.000 dibayar dulu saat mulai, pelunasan
//              Rp750.000 saat hasil jadi & diserahkan.
// ============================================================

const KODE_ITEM = "PP-CP-001";
const HARGA = 1_500_000;
const DP = 750_000;
const PELUNASAN = 750_000;

const fmtIdr = (n: number): string => `Rp${n.toLocaleString("id-ID")}`;

export const metadata: Metadata = {
  title: "Jasa Pembuatan Company Profile Lengkap Murah Profesional | PusatPerizinan.com",
  description:
    "Jasa pembuatan company profile lengkap Rp1.500.000 all-in: desain premium, copywriting profesional, struktur lengkap (profil, visi misi, legalitas, produk, portofolio), format PDF + siap cetak, revisi, selesai 3-5 hari kerja. DP 50% Rp750.000, lunas saat jadi.",
  keywords: [
    "jasa pembuatan company profile",
    "jasa company profile murah",
    "jasa buat company profile perusahaan",
    "harga jasa pembuatan company profile",
    "company profile profesional",
    "jasa desain company profile",
    "contoh company profile perusahaan",
    "company profile pdf siap cetak",
    "company profile 1.5 juta",
    "jasa company profile terpercaya",
  ],
  alternates: langAlternates("/jasa-pembuatan-company-profile"),
  openGraph: {
    images: [
      {
        url: ogImageUrl({
          title: "Jasa Pembuatan Company Profile Lengkap",
          subtitle: `Kode item ${KODE_ITEM} · Rp1.500.000 all-in · DP 50%`,
          category: "Dokumen & Profil Digital Bisnis",
        }),
        width: 1200,
        height: 630,
        alt: "Jasa Pembuatan Company Profile Lengkap — Rp1.500.000 All-In",
      },
    ],
    title: "Jasa Pembuatan Company Profile Lengkap — Rp1.500.000 All-In",
    description:
      "Company profile lengkap: desain premium + copywriting profesional + struktur lengkap + PDF siap kirim & cetak. DP 50% Rp750.000, lunas Rp750.000 saat hasil jadi.",
    url: `${SITE_URL}/jasa-pembuatan-company-profile`,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  `Halo ${SITE_NAME}, saya tertarik dengan JASA PEMBUATAN COMPANY PROFILE LENGKAP (kode item ${KODE_ITEM}) — Rp1.500.000, DP 50% Rp750.000. Mohon dibantu konsultasi dan penawaran resmi. Terima kasih.`,
)}`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Jasa Pembuatan Company Profile Lengkap",
    serviceType: "Penyusunan Dokumen & Profil Digital Bisnis",
    category: "Company Profile — Dokumen Presentasi Perusahaan",
    description:
      "Jasa pembuatan company profile lengkap untuk UMKM, PT, CV, yayasan, dan lembaga: desain premium, copywriting profesional, struktur lengkap (sejarah, visi misi, legalitas, produk & layanan, struktur organisasi, portofolio, testimoni, kontak), format PDF siap kirim + versi siap cetak, revisi, selesai 3-5 hari kerja setelah data lengkap. Harga Rp1.500.000 all-in dengan skema DP 50% (Rp750.000) dan pelunasan Rp750.000 saat hasil diserahkan.",
    url: `${SITE_URL}/jasa-pembuatan-company-profile`,
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
      price: HARGA,
      url: `${SITE_URL}/jasa-pembuatan-company-profile`,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: HARGA,
        priceCurrency: "IDR",
        description: "DP 50% Rp750.000 dibayar di awal, pelunasan Rp750.000 saat hasil jadi dan diserahkan.",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Paket & Layanan Digital", item: `${SITE_URL}/katalog` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Jasa Pembuatan Company Profile Lengkap",
        item: `${SITE_URL}/jasa-pembuatan-company-profile`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Alur Pemesanan Jasa Pembuatan Company Profile",
    description: "Empat langkah pemesanan company profile lengkap di PusatPerizinan.com, dari konsultasi sampai serah terima file.",
    totalTime: "P3D",
    step: [
      { "@type": "HowToStep", name: "Konsultasi & brief", text: "Hubungi WhatsApp resmi, sebut kode item PP-CP-001, jelaskan usaha Anda. Kami kirim daftar data & bahan yang perlu disiapkan." },
      { "@type": "HowToStep", name: "DP 50% & tim mulai bekerja", text: "DP Rp750.000 dibayar dulu saat mulai pengerjaan; tim menyusun konsep, copywriting, dan desain company profile." },
      { "@type": "HowToStep", name: "Review & revisi", text: "Anda mereview draft; revisi sesuai catatan (termasuk dalam harga) hingga konten dan tampilan sesuai kebutuhan." },
      { "@type": "HowToStep", name: "Pelunasan & serah terima", text: "Pelunasan Rp750.000, lalu file master diserahkan: PDF siap kirim, versi siap cetak, dan sumber yang bisa diedit ulang." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Berapa harga jasa pembuatan company profile dan bagaimana skema pembayarannya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harga Rp1.500.000 all-in untuk company profile lengkap — tanpa biaya tersembunyi. Skema pembayaran: DP 50% sebesar Rp750.000 dibayar dulu saat mulai pengerjaan, lalu pelunasan Rp750.000 dibayar saat hasil sudah jadi dan diserahkan. Termin resmi mengikuti penawaran/invoice.",
        },
      },
      {
        "@type": "Question",
        name: "Apa saja yang termasuk dalam company profile lengkap?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Struktur lengkap: cover desain premium, sejarah & profil usaha, visi misi & nilai, legalitas perusahaan (NIB, akta, izin), produk & layanan, struktur organisasi, portofolio/proyek, testimoni klien, dan halaman kontak. Termasuk copywriting profesional, layout premium, format PDF siap kirim, versi siap cetak, dan file master.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa lama proses pengerjaan company profile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "3-5 hari kerja setelah data dan bahan dari Anda lengkap (profil usaha, logo/foto, dokumen legalitas, daftar produk & portofolio). Perubahan besar di tengah proses dapat memengaruhi estimasi waktu dan diinformasikan lebih dulu.",
        },
      },
      {
        "@type": "Question",
        name: "Data apa yang perlu saya siapkan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nama & bidang usaha, logo (jika ada), foto pendukung (produk, tim, kantor), dokumen legalitas (NIB/akta — opsional), visi misi (jika sudah ada), daftar produk/layanan, portofolio atau pengalaman proyek, dan data kontak. Belum punya legalitas? Kami bisa bantu urus NIB atau pendirian PT/CV lebih dulu.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah ada revisi dan format file apa yang diterima?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ada — revisi sesuai catatan Anda termasuk dalam harga (dua putaran revisi standar; perubahan besar selain cakupan dihitung terpisah dan disepakati tertulis). File yang diterima: PDF siap kirim (email/WhatsApp), versi siap cetak, dan file master sumber.",
        },
      },
      {
        "@type": "Question",
        name: "Apa bedanya company profile biasa dengan website company profile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Company profile biasa berupa dokumen (PDF/cetak) untuk dikirim ke klien, tender, atau investor. Website company profile berupa situs online aktif 24 jam dengan domain & hosting, bisa diakses siapa pun dari Google. Kami sediakan keduanya — paket website company profile all-in Rp1.500.000 sudah termasuk domain web.id dan SEO dasar.",
        },
      },
    ],
  },
];

const YANG_DIDAPAT = [
  "Cover & layout desain premium — kelas korporat, bukan template pasaran",
  "Copywriting profesional — seluruh teks ditulis ulang oleh penulis berpengalaman",
  "Sejarah, profil usaha, visi misi & nilai perusahaan",
  "Bagian legalitas: NIB, akta pendirian, izin terkait (jika sudah ada)",
  "Katalog produk & layanan lengkap dengan penjelasan per item",
  "Struktur organisasi & profil tim/pengelola",
  "Portofolio proyek & pengalaman kerja sama",
  "Halaman testimoni & data kontak lengkap",
  "PDF siap kirim (email/WhatsApp) + versi siap cetak + file master",
  "Dua putaran revisi termasuk dalam harga",
];

const SKEMA_BAYAR = [
  {
    label: "DP 50% — dibayar dulu saat mulai",
    value: fmtIdr(DP),
    desc: "Pengerjaan langsung dimulai setelah DP masuk dan brief data lengkap diterima.",
  },
  {
    label: "Pelunasan 50% — saat hasil jadi",
    value: fmtIdr(PELUNASAN),
    desc: "Dibayar saat company profile selesai & diserahkan sebelum file final dihanded-over.",
  },
];

const TAHAPAN = [
  "Konsultasi & brief: Anda sebut kode item PP-CP-001, kami kirim checklist data & bahan.",
  "DP 50% (Rp750.000) — tim langsung mulai: riset singkat, konsep, copywriting, desain.",
  "Review draft 1: Anda beri catatan; kami revisi sesuai masukan.",
  "Review draft 2 (bila perlu): penyempurnaan akhir konten & tampilan.",
  "Pelunasan Rp750.000 — serah terima semua file (PDF, cetak, master).",
];

const KEUNGGULAN = [
  "Dikerjakan tim berpengalaman menangani dokumen perusahaan & lembaga sejak 2009",
  "Harga transparan Rp1.500.000 all-in — tertulis, tanpa biaya kejut",
  "Terintegrasi dengan layanan legalitas: NIB, PT, CV — satu pintu di PusatPerizinan.com",
  "Bisa ditingkatkan jadi website company profile dengan harga khusus",
  "Proses jelas: brief → DP → draft → revisi → pelunasan → serah terima",
  "Komunikasi cepat via WhatsApp resmi 0812-6999-9910",
];

export default function JasaCompanyProfilePage() {
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
            Jasa Pembuatan Company Profile
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
                Dokumen &amp; Profil Digital Bisnis
              </span>
              <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-emerald-950">
                Lengkap All-In
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Jasa Pembuatan Company Profile Lengkap — Profesional &amp; Terjangkau
            </h1>
            <p className="mt-4 max-w-2xl text-emerald-100/90 leading-relaxed md:text-lg">
              Company profile adalah wajah resmi usaha Anda di mata klien, investor,
              instansi, dan tender. Kami buatkan company profile lengkap — desain premium,
              copywriting profesional, struktur lengkap — dalam format siap kirim dan siap cetak.
            </p>
            <p className="mt-3 max-w-2xl text-emerald-100/75 leading-relaxed">
              Cocok untuk UMKM, PT, CV, yayasan, koperasi, lembaga pendidikan, dan
              kontraktor yang butuh dokumen profil bertkelas korporat dengan harga ramah
              keuangan usaha kecil.
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
              Harga all-in lengkap
            </p>
            <p className="mt-2 text-3xl font-extrabold text-amber-400 md:text-4xl">{fmtIdr(HARGA)}</p>
            <p className="mt-1 text-sm font-semibold text-emerald-300">
              Tanpa biaya tersembunyi · kode item <span className="font-mono">{KODE_ITEM}</span>
            </p>
            <dl className="mt-4 space-y-2 rounded-xl bg-emerald-400/10 px-3 py-3 text-xs leading-relaxed text-emerald-100/90">
              {SKEMA_BAYAR.map((s) => (
                <div key={s.label} className="flex justify-between gap-3">
                  <dt className="font-semibold">{s.label}</dt>
                  <dd className="font-bold text-amber-300">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 rounded-xl bg-emerald-400/10 px-3 py-2 text-xs leading-relaxed text-emerald-100/90">
              <Wallet className="mr-1 inline h-3.5 w-3.5" aria-hidden />
              Bayar dulu DP 50% (Rp750.000) — pelunasan Rp750.000 hanya setelah hasil jadi
              dan diserahkan. Termin resmi mengikuti penawaran/invoice.
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
              * Harga jasa sesuai ruang lingkup di halaman ini; kebutuhan di luar cakupan
              (mis. penerjemahan, foto produksi) diinformasikan &amp; disepakati tertulis dulu.
            </p>
          </aside>
        </div>
      </section>

      {/* YANG ANDA DAPATKAN */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="isi-paket">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h2 id="isi-paket" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Isi Company Profile Lengkap — Semua Termasuk Rp1.500.000
            </h2>
            <p className="mt-2 max-w-3xl text-stone-600">
              Bukan template kosong. Setiap bagian ditulis dan didesain ulang sesuai
              identitas usaha Anda, lalu dirapikan mengikuti standar dokumen perusahaan
              yang dipakai untuk tender, registrasi vendor, dan presentasi investor.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {YANG_DIDAPAT.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50/60 px-4 py-3 text-sm text-stone-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-stone-600">
          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-emerald-700" aria-hidden /> Pengerjaan 3-5 hari kerja setelah data lengkap</span>
          <span className="flex items-center gap-2"><RefreshCcw className="h-4 w-4 text-emerald-700" aria-hidden /> 2 putaran revisi termasuk</span>
          <span className="flex items-center gap-2"><PenTool className="h-4 w-4 text-emerald-700" aria-hidden /> Desain + copywriting satu tim</span>
        </div>
      </section>

      {/* SKEMA PEMBAYARAN */}
      <section className="border-y border-stone-100 bg-stone-50/60 py-14" aria-labelledby="skema-bayar">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="skema-bayar" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Skema Pembayaran — DP 50% Dulu, Lunas Saat Hasil Jadi
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            Kami membagi pembayaran dua termin supaya Anda tidak membayar penuh di depan:
            pengerjaan baru dimulai setelah DP masuk, dan file final diserahkan setelah
            pelunasan. Semua termin tertulis di penawaran/invoice resmi.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {SKEMA_BAYAR.map((s) => (
              <div key={s.label} className="rounded-2xl border border-stone-200 bg-white p-6">
                <p className="text-sm font-semibold text-stone-500">{s.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-emerald-800">{s.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAHAPAN */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="tahapan">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
            <LayoutTemplate className="h-5 w-5" />
          </span>
          <div>
            <h2 id="tahapan" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Alur Pengerjaan — 5 Langkah Transparan
            </h2>
            <p className="mt-2 max-w-3xl text-stone-600">
              Setiap tahap ada titik serah terima yang jelas, jadi Anda selalu tahu
              progres dan kapan file jadi.
            </p>
          </div>
        </div>
        <ol className="mt-8 space-y-3">
          {TAHAPAN.map((t, i) => (
            <li key={t} className="flex items-start gap-4 rounded-xl border border-stone-100 bg-white px-4 py-3 text-sm text-stone-700">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white" aria-hidden>
                {i + 1}
              </span>
              {t}
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ ON-PAGE */}
      <section className="border-y border-stone-100 bg-stone-50/60 py-14" aria-labelledby="faq">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="faq" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              { q: "Berapa harga dan bagaimana pembayarannya?", a: `Rp${HARGA.toLocaleString("id-ID")} all-in. DP 50% (Rp${DP.toLocaleString("id-ID")}) dibayar dulu saat mulai, pelunasan Rp${PELUNASAN.toLocaleString("id-ID")} saat hasil jadi & diserahkan.` },
              { q: "Berapa lama pengerjaannya?", a: "3-5 hari kerja setelah data & bahan lengkap. Perubahan besar di tengah jalan dihitung ulang dan disepakati dulu secara tertulis." },
              { q: "Data apa yang harus saya siapkan?", a: "Nama & bidang usaha, logo/foto, dokumen legalitas (opsional), visi misi, daftar produk & portofolio, data kontak. Belum punya NIB? Bisa kami bantu urus dulu." },
              { q: "Apakah bisa revisi?", a: "Bisa — dua putaran revisi termasuk dalam harga, sesuai catatan Anda pada tiap draft." },
              { q: "File apa yang saya terima?", a: "PDF siap kirim (email/WhatsApp), versi siap cetak, dan file master sumber yang bisa diedit ulang." },
              { q: "Bisa dijadikan website juga?", a: "Bisa. Konten company profile Anda bisa langsung dipakai jadi website company profile all-in Rp1.500.000 (domain web.id + hosting 1 tahun + SEO dasar) — lihat halaman website company profile kami." },
            ].map((f) => (
              <div key={f.q} className="rounded-2xl border border-stone-200 bg-white p-6">
                <p className="font-bold text-stone-900">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEUNGGULAN + INTERNAL LINKS */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="kenapa-kami">
        <h2 id="kenapa-kami" className="text-2xl font-bold text-stone-900 md:text-3xl">
          Kenapa Pesan Company Profile di PusatPerizinan.com
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {KEUNGGULAN.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50/60 px-4 py-3 text-sm text-stone-700">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
          <h3 className="flex items-center gap-2 font-bold text-stone-900">
            <Sparkles className="h-5 w-5 text-emerald-700" aria-hidden /> Lengkapi Jadi Satu Paket
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Company profile paling kuat kalau legalitasnya lengkap. Jika usaha Anda belum
            punya dokumen dasar, uruskan sekalian di satu pintu:
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <Link href="/layanan/nib" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2 font-semibold text-emerald-800 transition hover:bg-emerald-100">
              <ShieldCheck className="h-4 w-4" aria-hidden /> NIB &amp; OSS-RBA <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link href="/layanan/pt" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2 font-semibold text-emerald-800 transition hover:bg-emerald-100">
              <Building2 className="h-4 w-4" aria-hidden /> Pendirian PT / CV <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link href="/jasa-pembuatan-website-company-profile" className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-4 py-2 font-semibold text-amber-800 transition hover:bg-amber-50">
              <Globe className="h-4 w-4" aria-hidden /> Versi Website + domain web.id <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link href="/pengurusan-perizinan-kbli-85520" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2 font-semibold text-emerald-800 transition hover:bg-emerald-100">
              <FileText className="h-4 w-4" aria-hidden /> Paket All-In KBLI 85520 + 2 Website <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA AKHIR */}
      <section className="bg-emerald-950 py-14 text-white" aria-label="Ajukan pemesanan">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Siap Punya Company Profile Bertkelas Korporat?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-emerald-100/85 leading-relaxed">
            Pesan hari ini: kirim brief via WhatsApp, bayar DP 50% (Rp750.000),
            dan dalam 3-5 hari kerja company profile lengkap Anda siap dipakai.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Pesan Sekarang — {KODE_ITEM}
            </a>
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Pemesanan ${KODE_ITEM} — Jasa Pembuatan Company Profile`)}`}
              className="flex min-h-11 items-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" aria-hidden /> Pesan via Email
            </a>
          </div>
          <p className="mt-4 text-xs text-emerald-200/70">
            Konsultasi awal gratis · WhatsApp resmi {CONTACT.phoneDisplay} · kantor {CONTACT.address.street}, {CONTACT.address.city}
          </p>
        </div>
      </section>
    </div>
  );
}
