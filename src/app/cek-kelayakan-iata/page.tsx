import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import { IataMotionStyles, Reveal } from "@/components/iata/iata-motion";
import IataEligibilityForm from "./form";
import {
  IATA_DISCLAIMER, IATA_URLS, iataWaLink, IATA_WA_UMUM, absIataUrl,
} from "@/lib/iata";

// ============================================================
// PUSATPERIZINAN.COM — /cek-kelayakan-iata (BAGIAN 9)
// Formulir pemeriksaan kelayakan awal — lead generation, bukan
// keputusan kelayakan resmi IATA. Tanpa data kredensial apa pun.
// ============================================================

export const metadata: Metadata = {
  title: "Cek Kelayakan IATA | Pemeriksaan Awal Perusahaan Travel Agent",
  description:
    "Periksa kelayakan awal perusahaan untuk akreditasi IATA: status badan usaha, izin perjalanan, laporan keuangan, dan model akreditasi yang sesuai (GoLite, GoStandard, GoGlobal). Gratis dan tanpa komitmen.",
  alternates: langAlternates("/cek-kelayakan-iata"),
  openGraph: {
    title: "Cek Kelayakan Awal IATA Accreditation untuk Perusahaan Anda",
    description:
      "Formulir pemeriksaan kelayakan awal akreditasi IATA — status badan usaha, izin usaha perjalanan, laporan keuangan, dan model akreditasi yang sesuai.",
    url: `${SITE_URL}/cek-kelayakan-iata`,
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
    name: "Cek Kelayakan Awal IATA Accreditation untuk Perusahaan Anda",
    url: absIataUrl(IATA_URLS.cekKelayakan),
    description: metadata.description ?? undefined,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "IATA Accreditation", item: absIataUrl(IATA_URLS.pillar) },
      { "@type": "ListItem", position: 3, name: "Cek Kelayakan IATA", item: absIataUrl(IATA_URLS.cekKelayakan) },
    ],
  },
];

export default function CekKelayakanIataPage() {
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
          <span className="font-medium text-stone-700" aria-current="page">Cek Kelayakan</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="iata-hero-grad bg-[radial-gradient(55%_55%_at_25%_25%,rgba(16,185,129,.32),transparent_60%),radial-gradient(45%_45%_at_78%_30%,rgba(251,191,36,.16),transparent_55%)]" aria-hidden />
        <div className="iata-orb left-[10%] top-[20%] h-52 w-52 bg-emerald-500/25" aria-hidden style={{ animationDelay: "-5s" }} />
        <div className="relative mx-auto max-w-4xl px-4 py-14 md:py-18">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-200">
              <ClipboardCheck className="h-3.5 w-3.5" aria-hidden /> Pemeriksaan Awal — Gratis &amp; Tanpa Komitmen
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
              Cek Kelayakan Awal IATA Accreditation untuk Perusahaan Anda
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-emerald-100/90 md:text-lg">
              Isi profil perusahaan Anda — tim kami memeriksa status badan usaha, izin usaha
              perjalanan, kesiapan laporan keuangan, dan model akreditasi yang paling relevan
              (GoLite, GoStandard, atau GoGlobal).
            </p>
          </Reveal>
        </div>
      </section>

      {/* FORM + SIDEBAR INFO */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <IataEligibilityForm />
          </Reveal>

          <Reveal delay={150}>
            <aside className="space-y-5">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h2 className="font-bold text-stone-900">Apa yang diperiksa?</h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-600">
                  <li>• Kesesuaian status badan usaha dan dokumen legal.</li>
                  <li>• Kesiapan izin usaha perjalanan yang relevan.</li>
                  <li>• Kesiapan dokumen keuangan sesuai model.</li>
                  <li>• Model akreditasi yang paling relevan untuk kebutuhan pembayaran Anda.</li>
                  <li>• Kebutuhan multi-lokasi atau multi-negara (GoGlobal).</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5">
                <h2 className="flex items-center gap-2 font-bold text-amber-900">
                  <ShieldCheck className="h-5 w-5" aria-hidden /> Hasil = Pemeriksaan Awal
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-amber-900">
                  Hasil formulir ini adalah pemeriksaan awal administratif oleh PusatPerizinan.com —
                  bukan keputusan kelayakan resmi IATA. Kelayakan final mengikuti ketentuan IATA dan
                  hukum setempat.
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-950 p-5 text-white">
                <h2 className="font-bold">Lebih suka langsung bicara?</h2>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100/85">
                  Hubungi tim kami via WhatsApp untuk konsultasi awal tanpa formulir.
                </p>
                <a
                  href={iataWaLink(IATA_WA_UMUM)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp Konsultasi IATA
                </a>
                <Link
                  href={IATA_URLS.konsultasi}
                  className="mt-2 flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                >
                  Halaman Konsultasi IATA →
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <p className="mx-auto mt-10 max-w-3xl rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-500">
            {IATA_DISCLAIMER}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
