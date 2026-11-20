import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ClipboardCheck, MessageCircle } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import { IataMotionStyles, Reveal } from "@/components/iata/iata-motion";
import IataConsultForm from "./konsultasi-form";
import {
  IATA_DISCLAIMER, IATA_PRODUCTS, IATA_SERVICES, IATA_URLS,
  iataWaLink, IATA_WA_UMUM, absIataUrl,
} from "@/lib/iata";

// ============================================================
// PUSATPERIZINAN.COM — /konsultasi-iata (BAGIAN 10)
// Tanpa testimoni/logo klien/angka klien/tingkat keberhasilan
// yang belum memiliki bukti (aturan E-E-A-T master brief).
// ============================================================

export const metadata: Metadata = {
  title: "Konsultasi IATA Accreditation untuk Travel Agent Indonesia",
  description:
    "Diskusikan profil perusahaan, kesiapan dokumen, model akreditasi (GoLite, GoStandard, GoGlobal), dan langkah persiapan akreditasi IATA bersama tim PusatPerizinan.com.",
  alternates: langAlternates("/konsultasi-iata"),
  openGraph: {
    title: "Konsultasi IATA Accreditation untuk Travel Agent Indonesia",
    description:
      "Diskusikan profil perusahaan, kesiapan dokumen, dan model akreditasi IATA bersama tim PusatPerizinan.com.",
    url: `${SITE_URL}/konsultasi-iata`,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const DIPERIKSA = [
  "Profil perusahaan, bentuk badan usaha, dan struktur pengelolaan.",
  "Dokumen legal: akta, pengesahan AHU, NIB, NPWP badan usaha.",
  "Kesesuaian izin usaha perjalanan dengan aktivitas nyata perusahaan.",
  "Kesiapan dokumen keuangan sesuai model akreditasi yang relevan.",
  "Kebutuhan cash facility dan implikasi pemilihan model.",
  "Cakupan lokasi — satu lokasi (GoLite/GoStandard) atau multi-negara (GoGlobal).",
];

const TAHAPAN = [
  { t: "Konsultasi awal", d: "Diskusi profil perusahaan, kebutuhan pembayaran, dan rencana bisnis." },
  { t: "Pemeriksaan kelayakan awal", d: "Tim menelaah legalitas, perizinan, dan kesiapan dokumen Anda." },
  { t: "Rekomendasi model", d: "GoLite, GoStandard, atau GoGlobal — dengan alasannya, bukan tebakan." },
  { t: "Quotation tertulis", d: "Ruang lingkup pekerjaan, biaya jasa, pengecualian, dan jadwal dikunci tertulis." },
  { t: "Persiapan dokumen", d: "Checklist disepakati, dokumen disusun dan diperiksa bersama." },
  { t: "Pendampingan aplikasi", d: "Persiapan pengajuan melalui saluran resmi IATA oleh pihak berwenang perusahaan." },
];

const FAQ = [
  {
    q: "Apakah konsultasi awal berbayar?",
    a: "Konsultasi awal melalui formulir atau WhatsApp bersifat gratis dan tanpa komitmen. Biaya jasa konsultasi baru muncul setelah quotation tertulis disepakati.",
  },
  {
    q: "Apa yang dibahas dalam konsultasi?",
    a: "Profil perusahaan, legalitas, izin usaha perjalanan, kesiapan dokumen keuangan, kebutuhan cash facility, dan pemetaan model akreditasi yang paling relevan.",
  },
  {
    q: "Apakah konsultan menjamin persetujuan IATA?",
    a: "Tidak. Persetujuan akreditasi sepenuhnya merupakan kewenangan IATA. Konsultan membantu persiapan dokumen dan proses agar berjalan selengkap dan seakurat mungkin.",
  },
  {
    q: "Apakah saya harus mengirim password atau kredensial?",
    a: "Tidak, dan jangan pernah. Konsultasi ini tidak membutuhkan password OSS, email, atau IATA. Pengajuan resmi dilakukan oleh pihak berwenang perusahaan melalui portal resmi IATA.",
  },
  {
    q: "Bagaimana biaya jasa dihitung?",
    a: "Harga jasa konsultasi mengikuti model akreditasi (lihat halaman produk) dan dikunci dalam quotation tertulis beserta pengecualiannya. Biaya resmi IATA dan pihak ketiga tidak termasuk kecuali dinyatakan tertulis.",
  },
];

export default function KonsultasiIataPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Konsultasi IATA Accreditation untuk Travel Agent Indonesia",
      url: absIataUrl(IATA_URLS.konsultasi),
      description: metadata.description ?? undefined,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "IATA Accreditation", item: absIataUrl(IATA_URLS.pillar) },
        { "@type": "ListItem", position: 3, name: "Konsultasi IATA", item: absIataUrl(IATA_URLS.konsultasi) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <IataMotionStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href={IATA_URLS.pillar} className="hover:text-emerald-700">IATA Accreditation</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">Konsultasi IATA</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="iata-hero-grad bg-[radial-gradient(55%_55%_at_22%_25%,rgba(16,185,129,.32),transparent_60%),radial-gradient(45%_45%_at_80%_28%,rgba(251,191,36,.16),transparent_55%)]" aria-hidden />
        <div className="iata-orb left-[8%] top-[18%] h-52 w-52 bg-emerald-500/25" aria-hidden style={{ animationDelay: "-6s" }} />
        <div className="relative mx-auto max-w-4xl px-4 py-14 md:py-18">
          <Reveal>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Konsultasi IATA Accreditation untuk Travel Agent Indonesia
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-emerald-100/90 md:text-lg">
              Diskusikan profil perusahaan, kesiapan dokumen, model akreditasi, dan langkah
              persiapan bersama tim {SITE_NAME}.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={iataWaLink(IATA_WA_UMUM)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp Langsung
              </a>
              <Link
                href="#form-konsultasi"
                className="flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold transition hover:bg-white/10"
              >
                Formulir Konsultasi ↓
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APA YANG DIPERIKSA */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="diperiksa">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 id="diperiksa" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Apa yang Akan Diperiksa?
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600">
              Konsultasi kami berbasis pemeriksaan administratif yang terstruktur — bukan promosi.
              Anda mendapatkan gambaran jujur tentang posisi perusahaan sebelum mengajukan.
            </p>
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-relaxed text-emerald-900">
              <strong>Prinsip kami:</strong> tidak menjanjikan persetujuan, tidak mengarang angka,
              dan tidak meminta kredensial apa pun. Semua kesepakatan dikunci dalam quotation
              tertulis.
            </div>
          </Reveal>
          <Reveal delay={150}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {DIPERIKSA.map((d) => (
                <li key={d} className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* TIGA MODEL */}
      <section className="bg-stone-50 py-14" aria-labelledby="model">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="model" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Tiga Model Akreditasi yang Akan Dibahas
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {IATA_PRODUCTS.map((p, i) => (
              <Reveal key={p.kode} delay={i * 120} className="h-full">
                <Link
                  href={p.url}
                  className="iata-card block h-full rounded-2xl border border-stone-200 bg-white p-5"
                >
                  <span className="font-mono text-[11px] font-bold text-emerald-700">{p.kode}</span>
                  <h3 className="mt-1 font-bold text-stone-900">{p.namaPendek}</h3>
                  <p className="mt-1 text-xs font-semibold text-emerald-800">{p.model}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-600">{p.deskripsiModel}</p>
                  <p className="mt-3 text-sm font-bold text-emerald-700">Pelajari model →</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TAHAPAN KONSULTASI */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="tahapan">
        <Reveal>
          <h2 id="tahapan" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Tahapan Konsultasi
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TAHAPAN.map((t, i) => (
            <Reveal key={t.t} delay={i * 80} as="li" className="h-full">
              <div className="iata-card h-full rounded-2xl border border-stone-200 bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-sm font-bold text-white" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="mt-3 font-bold text-stone-900">{t.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{t.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* RUANG LINGKUP + BIAYA */}
      <section className="bg-stone-50 py-14" aria-labelledby="lingkup-biaya">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <Reveal>
            <h2 id="lingkup-biaya" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Ruang Lingkup Layanan
            </h2>
            <ul className="mt-5 space-y-2.5">
              {IATA_SERVICES.map((s) => (
                <li key={s.kode} className="flex items-start gap-3 text-sm leading-relaxed text-stone-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-[11px] font-bold text-white" aria-hidden>
                    {s.kode}
                  </span>
                  <span><strong className="text-stone-900">{s.judul}</strong> — {s.desc}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="text-xl font-bold text-stone-900">Penjelasan Biaya</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-stone-600">
                <li>• Harga jasa konsultasi mengikuti model akreditasi yang dipilih — lihat halaman produk masing-masing.</li>
                <li>• Harga promo berlaku untuk periode tertentu dan dapat diubah oleh administrator.</li>
                <li>• Biaya resmi IATA, annual fee, financial security, audit, notaris, terjemahan tersumpah, bank, dan pajak <strong className="text-stone-900">tidak termasuk</strong> kecuali dinyatakan tertulis dalam quotation.</li>
                <li>• Semua kesepakatan dikunci dalam quotation tertulis sebelum pekerjaan dimulai.</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-emerald-800">
                Lihat detail:{" "}
                <Link href={IATA_URLS.panduan.biaya} className="underline">Biaya Akreditasi IATA</Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORM */}
      <section id="form-konsultasi" className="mx-auto max-w-4xl px-4 py-14" aria-labelledby="form">
        <Reveal>
          <h2 id="form" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Formulir Konsultasi
          </h2>
          <p className="mt-2 text-stone-600">
            Isi ringkas — tim kami akan menghubungi Anda. Butuh pemeriksaan lebih terstruktur?{" "}
            <Link href={IATA_URLS.cekKelayakan} className="font-semibold text-emerald-700 hover:underline">
              Gunakan formulir Cek Kelayakan IATA
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-8">
          <IataConsultForm />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-stone-50 py-14" aria-labelledby="faq">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <h2 id="faq" className="text-2xl font-bold text-stone-900 md:text-3xl">FAQ Konsultasi IATA</h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <details className="group rounded-xl border border-stone-200 bg-white p-5 open:shadow-sm">
                  <summary className="cursor-pointer list-none font-semibold text-stone-900">
                    <span className="mr-2 text-emerald-700 group-open:hidden" aria-hidden>+</span>
                    <span className="mr-2 hidden text-emerald-700 group-open:inline" aria-hidden>−</span>
                    {f.q}
                  </summary>
                  <p className="mt-3 pl-6 text-sm leading-relaxed text-stone-600">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16" aria-label="Disclaimer">
        <Reveal>
          <p className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-500">
            {IATA_DISCLAIMER}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
