import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, MessageCircle, Plane, ShieldCheck } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import { IataMotionStyles, Reveal } from "@/components/iata/iata-motion";
import CertTravelForm from "./form";
import {
  CERT_DISCLAIMER, CERT_WA_UMUM, certWaLink, absCertUrl, SERTIFIKASI_URLS,
} from "@/lib/sertifikasi-travel";

// /konsultasi-sertifikasi-travel — halaman konversi trilogi
// sertifikasi (PPIU/PIHK/BPW): form pemeriksaan kesiapan awal →
// POST /api/leads existing (validasi server + notifikasi admin),
// tanpa kolom kredensial apa pun. Bukan keputusan kelayakan resmi
// penerbit.

export const metadata: Metadata = {
  title: "Konsultasi Sertifikasi Travel — PPIU, PIHK, BPW | PusatPerizinan.com",
  description:
    "Isi profil perusahaan Anda: pemeriksaan kesiapan awal untuk Sertifikasi PPIU (umrah, Rp20 jt), Sertifikasi PIHK (haji khusus, Rp25 jt), dan Sertifikasi BPW (biro perjalanan wisata, Rp15 jt). Gratis, tanpa komitmen — roadmap legalitas travel terbaik.",
  alternates: langAlternates("/konsultasi-sertifikasi-travel"),
  openGraph: {
    title: "Pemeriksaan Kesiapan Sertifikasi Travel: PPIU, PIHK, BPW",
    description:
      "Formulir pemeriksaan kesiapan awal trilogi sertifikasi travel — petakan jalur PPIU → PIHK atau fondasi BPW yang paling efisien untuk perusahaan Anda.",
    url: `${SITE_URL}/konsultasi-sertifikasi-travel`,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pemeriksaan Kesiapan Sertifikasi Travel: PPIU, PIHK, BPW",
    url: absCertUrl(SERTIFIKASI_URLS.konsultasi),
    description: metadata.description ?? undefined,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Layanan", item: `${SITE_URL}/layanan` },
      { "@type": "ListItem", position: 3, name: "Konsultasi Sertifikasi Travel", item: absCertUrl(SERTIFIKASI_URLS.konsultasi) },
    ],
  },
];

export default function KonsultasiSertifikasiTravelPage() {
  return (
    <div className="min-h-screen bg-white">
      <IataMotionStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/layanan" className="hover:text-emerald-700">Layanan</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">Konsultasi Sertifikasi Travel</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="iata-hero-grad bg-[radial-gradient(55%_55%_at_25%_25%,rgba(16,185,129,.32),transparent_60%),radial-gradient(45%_45%_at_78%_30%,rgba(251,191,36,.16),transparent_55%)]" aria-hidden />
        <div className="iata-orb left-[10%] top-[20%] h-52 w-52 bg-emerald-500/25" aria-hidden style={{ animationDelay: "-5s" }} />
        <div className="relative mx-auto max-w-4xl px-4 py-14 md:py-18">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-200">
              <Plane className="h-3.5 w-3.5" aria-hidden /> Trilogi Sertifikasi Travel — Pemeriksaan Awal Gratis
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
              Pemeriksaan Kesiapan Sertifikasi Travel: PPIU, PIHK, atau BPW?
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-emerald-100/90 md:text-lg">
              Isi profil perusahaan Anda — tim kami memetakan posisi badan usaha, izin dasar, dan
              riwayat usaha, lalu merekomendasikan jalur paling efisien: fondasi BPW (Rp15 jt),
              izin umrah PPIU (Rp20 jt), atau haji khusus PIHK (Rp25 jt).
            </p>
          </Reveal>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <CertTravelForm />
          </Reveal>

          <Reveal delay={150}>
            <aside className="space-y-5">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h2 className="font-bold text-stone-900">Yang akan kami petakan</h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-600">
                  <li>• Struktur badan usaha & KBLI Anda hari ini (79120 vs 79122).</li>
                  <li>• Prasyarat yang sudah terpenuhi vs yang perlu dikejar.</li>
                  <li>• Jalur paling efisien: BPW → PPIU → PIHK atau kombinasi.</li>
                  <li>• Estimasi timeline & dokumen yang harus Anda siapkan.</li>
                  <li>• Rincian quotation jasa all-in — transparan sejak awal.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5">
                <h2 className="flex items-center gap-2 font-bold text-amber-900">
                  <ShieldCheck className="h-5 w-5" aria-hidden /> Hasil = Pemeriksaan Awal
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-amber-900">
                  Hasil pemeriksaan ini adalah analisis administratif oleh PusatPerizinan.com —
                  bukan keputusan kelayakan resmi penerbit. Kelayakan final mengikuti ketentuan
                  Kemenag/Baparekraf dan hukum yang berlaku.
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-950 p-5 text-white">
                <h2 className="font-bold">Lebih suka langsung bicara?</h2>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100/85">
                  Hubungi tim kami via WhatsApp untuk pemeriksaan awal tanpa formulir.
                </p>
                <a
                  href={certWaLink(CERT_WA_UMUM)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp Konsultasi Travel
                </a>
                <Link
                  href={SERTIFIKASI_URLS.ppiu}
                  className="mt-2 flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                >
                  Baca Detail Sertifikasi PPIU →
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <p className="mx-auto mt-10 max-w-3xl rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-500">
            <ClipboardCheck className="mr-1 inline h-3.5 w-3.5" aria-hidden /> {CERT_DISCLAIMER}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
