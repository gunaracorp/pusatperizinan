import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BellRing, CheckCircle2, FileCheck2, Landmark, ReceiptText, ShieldCheck } from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { KepatuhanProClient } from "./kepatuhan-client";
import { KEPATUHAN_META, KEPATUHAN_TIERS } from "@/lib/kepatuhan-pro";
import { SITE_NAME, SITE_URL, absUrl, TRUST_METRICS } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — KEPATUHANPRO (/kepatuhan-pro)
// Produk langganan kepatuhan (MRR): LKPM, pajak bulanan,
// monitoring izin. SEO: JSON-LD Product(3 Offer) + FAQPage +
// BreadcrumbList di @graph tunggal.
// ============================================================

export const metadata: Metadata = {
  title: KEPATUHAN_META.title,
  description: KEPATUHAN_META.description,
  keywords: [
    "jasa laporan LKPM",
    "pendampingan pajak usaha bulanan",
    "langganan kepatuhan perizinan",
    "jasa lapor SPT masa PPN",
    "konsultan kepatuhan usaha Indonesia",
    "langganan pengurusan izin",
  ],
  alternates: { canonical: absUrl("/kepatuhan-pro") },
  openGraph: {
    title: KEPATUHAN_META.title,
    description: KEPATUHAN_META.description,
    url: absUrl("/kepatuhan-pro"),
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

function jsonLd() {
  const url = absUrl("/kepatuhan-pro");
  const offers = KEPATUHAN_TIERS.flatMap((t) => [
    {
      "@type": "Offer",
      name: `KepatuhanPRO ${t.name} — Bulanan`,
      price: t.monthly,
      priceCurrency: "IDR",
      url: `${url}?tier=${t.sku}`,
      availability: "https://schema.org/InStock",
      category: "Langganan bulanan",
    },
    {
      "@type": "Offer",
      name: `KepatuhanPRO ${t.name} — Tahunan`,
      price: t.annual,
      priceCurrency: "IDR",
      url: `${url}?tier=${t.skuTahunan}`,
      availability: "https://schema.org/InStock",
      category: "Langganan tahunan",
    },
  ]);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": url + "#service",
        name: "KepatuhanPRO — Langganan Kepatuhan Usaha",
        serviceType: "Compliance subscription service",
        provider: { "@id": SITE_URL + "/#organization" },
        areaServed: "Indonesia",
        description: KEPATUHAN_META.description,
        offers: offers,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "KepatuhanPRO", item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          ["Apa bedanya KepatuhanPRO dengan jasa pengurusan izin biasa?", "Pengurusan izin itu sekali jadi; KepatuhanPRO menjaga izin dan kewajibanmu tetap hidup setiap bulan — LKPM, pajak, masa berlaku dokumen, dan konsultasi."],
          ["Bagaimana cara berhenti langganan?", "Langganan bulanan bisa dihentikan kapan saja dengan pemberitahuan 14 hari sebelum periode berikutnya — tanpa penalti."],
          ["Apakah biaya resmi negara (PNBP, pajak terutang) sudah termasuk?", "Tidak. Harga langganan adalah jasa pendampingan & pengurusan; pajak terutang dan PNBP dibayar langsung ke negara atas nama usahamu."],
          ["Usaha saya masih kecil, ambil paket yang mana?", "Starter cukup untuk usaha perorangan/UMKM yang baru punya NIB; bila sudah berbadan hukum dan berputar pajak bulanan, Growth paling ekonomis."],
        ].map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}

const COVERAGE = [
  { icon: ReceiptText, t: "Pajak Bulanan", d: "SPT Masa PPN & PPh 21/23 unifikasi — tepat waktu, nol denda." },
  { icon: FileCheck2, t: "LKPM OSS-RBA", d: "Triwulanan diajarkan, dibantu, sampai submit — NIB aman dari pembekuan." },
  { icon: BellRing, t: "Monitoring Izin", d: "Masa berlaku semua izin & sertifikat dipantau — diingatkan sebelum kadaluarsa." },
  { icon: Landmark, t: "Kepatuhan Sektoral", d: "Halal, BPOM, ISO, ketenagakerjaan — sesuai industri usahamu." },
];

export default function KepatuhanProPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-emerald-50/60 via-background to-background">
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 text-center sm:px-6 sm:pt-20">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> LANGGANAN KEPATUHAN #1 INDONESIA
            </div>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              Izinmu Sudah Terbit. <span className="text-emerald-600">Sekarang Jaga agar Tidak Dicabut.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              KepatuhanPRO menjaga LKPM, pajak bulanan, dan masa berlaku seluruh izinmu —
              supaya usaha bebas denda, bebas pembekuan NIB, dan selalu siap dicari bank &amp; investor.
              Mulai <strong className="text-foreground">Rp 499rb/bulan</strong>.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="#harga-pro">
                <span className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700">
                  Lihat Paket Langganan <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/kalkulator">
                <span className="inline-flex min-h-11 items-center gap-2 rounded-xl border bg-card px-6 py-3 text-sm font-bold transition hover:bg-accent">
                  Hitung Potensi Denda Tanpa Kepatuhan
                </span>
              </Link>
            </div>
            <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 text-center">
              {[
                [TRUST_METRICS.clientsServed, "klien aktif terlayani"],
                ["Rp 1,2jt+", "denda rata-rata terhindarkan/tahun"],
                ["≤ 30 mnt", "respons admin jam kerja"],
              ].map(([v, l]) => (
                <div key={String(l)} className="rounded-2xl border bg-card p-4">
                  <dt className="sr-only">{String(l)}</dt>
                  <dd className="text-xl font-extrabold text-emerald-700 sm:text-2xl">{v}</dd>
                  <dd className="mt-1 text-[11px] leading-tight text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CAKUPAN LAYANAN */}
        <section aria-labelledby="cakupan" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 id="cakupan" className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Satu Langganan, Semua Kewajiban Terjaga
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COVERAGE.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border bg-card p-6">
                <Icon className="h-7 w-7 text-emerald-600" aria-hidden />
                <h3 className="mt-3 font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
            Ditangani konsultan bersertifikat — bukan bot, bukan template.
          </p>
        </section>

        <KepatuhanProClient />
      </main>
      <Footer />
    </div>
  );
}
