import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, CheckCircle2, ClipboardCheck, FileText,
  MessageCircle, ShieldAlert, Sparkles,
} from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import { ogImageUrl } from "@/lib/og-template";
import { IataMotionStyles, Reveal } from "@/components/iata/iata-motion";
import { TrackLink } from "@/components/iata/track-link";
import {
  IATA_PRODUCTS, IATA_DISCLAIMER, IATA_SOURCES, IATA_URLS,
  HARGA_CATATAN, PROMO_LABEL, fmtIdrIata, iataWaLink,
  iataWaMessageOf, absIataUrl, productByKode,
} from "@/lib/iata";

// ============================================================
// PUSATPERIZINAN.COM — SHARED IATA PRODUCT PAGE RENDERER
// BAGIAN 5/6/7 master brief: konten tiap produk UNIK (data dari
// src/lib/iata-pages-data.ts), layout & animasi konsisten.
// Harga selalu dari src/lib/iata.ts (single source of truth).
// ============================================================

export interface IataProductContent {
  kode: "GOLITE" | "GOSTANDARD" | "GOGLOBAL";
  heroCopy: string[];
  apaItu: { heading: string; paragraphs: string[] };
  keunggulan: { heading: string; items: string[]; note?: string };
  siapa: { heading: string; items: string[] };
  ruangLingkup: { judul: string; desc?: string }[];
  ruangLingkupHeading: string;
  dokumen: { heading: string; items: string[]; note: string };
  financialSecurity: { heading: string; paragraphs: string[] };
  proses: { heading: string; items: string[] };
  pengecualian: { heading: string; items: string[] };
  faq: { q: string; a: string }[];
  finalCta: { title: string; desc: string };
  /** Internal linking khusus produk (BAGIAN 13) */
  terkait: { href: string; label: string; desc: string }[];
}

export function iataProductMetadata(c: IataProductContent): Metadata {
  const p = productByKode(c.kode);
  if (!p) throw new Error(`Kode produk IATA tidak dikenal: ${c.kode}`);
  return {
    title: p.seoTitle,
    description: p.metaDescription,
    alternates: langAlternates(p.url),
    openGraph: {
      images: [
        {
          url: ogImageUrl({
            title: p.h1,
            subtitle: `${p.namaPendek} · ${p.model}`,
            category: "PusatPerizinan.com — Licensing Consultancy Services",
          }),
          width: 1200,
          height: 630,
          alt: p.h1,
        },
      ],
      title: p.seoTitle,
      description: p.metaDescription,
      url: `${SITE_URL}${p.url}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "id_ID",
    },
    robots: { index: true, follow: true },
  };
}

const EVENT_BY_KODE = {
  GOLITE: "click_product_golite",
  GOSTANDARD: "click_product_gostandard",
  GOGLOBAL: "click_product_goglobal",
} as const;

export function IataProductPage({ content }: { content: IataProductContent }) {
  const p = productByKode(content.kode);
  if (!p) throw new Error(`Kode produk IATA tidak dikenal: ${content.kode}`);
  const waQuote = iataWaLink(iataWaMessageOf(p));
  const lainnya = IATA_PRODUCTS.filter((x) => x.kode !== p.kode);
  const gaEvent = EVENT_BY_KODE[p.kode];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: p.nama,
      serviceType: p.model,
      description: p.metaDescription,
      url: absIataUrl(p.url),
      provider: {
        "@type": "ProfessionalService",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: { "@type": "Country", name: "Indonesia" },
      offers: {
        "@type": "Offer",
        priceCurrency: "IDR",
        price: p.hargaPromo,
        url: absIataUrl(p.url),
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Layanan", item: `${SITE_URL}/layanan` },
        {
          "@type": "ListItem",
          position: 3,
          name: "IATA Accreditation Indonesia",
          item: absIataUrl(IATA_URLS.pillar),
        },
        { "@type": "ListItem", position: 4, name: p.namaPendek, item: absIataUrl(p.url) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((f) => ({
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

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/layanan" className="hover:text-emerald-700">Layanan</Link>
          <span className="mx-2">/</span>
          <Link href={IATA_URLS.pillar} className="hover:text-emerald-700">IATA Accreditation</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">{p.namaPendek}</span>
        </div>
      </nav>

      {/* HERO + HARGA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="iata-hero-grad bg-[radial-gradient(55%_55%_at_18%_22%,rgba(16,185,129,.32),transparent_60%),radial-gradient(45%_45%_at_82%_28%,rgba(251,191,36,.16),transparent_55%)]" aria-hidden />
        <div className="iata-orb left-[8%] top-[16%] h-56 w-56 bg-emerald-500/25" aria-hidden style={{ animationDelay: "-5s" }} />
        <div className="iata-orb right-[8%] bottom-[6%] h-48 w-48 bg-amber-400/15" aria-hidden style={{ animationDelay: "-8s" }} />

        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.5fr_1fr] md:py-18">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-emerald-400/15 px-3 py-1 font-mono text-xs font-bold tracking-wider text-emerald-300">
                  {p.kode}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                  {p.model}
                </span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">{p.h1}</h1>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-5 max-w-2xl space-y-4 leading-relaxed text-emerald-100/90">
                {content.heroCopy.map((t, i) => (
                  <p key={i} className={i === 0 ? "text-lg md:text-xl font-medium text-white" : ""}>{t}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-7 flex flex-wrap gap-3">
                <TrackLink
                  href={waQuote}
                  event="click_request_quotation"
                  params={{ product: p.kode }}
                  external
                  className="iata-shine relative flex min-h-12 items-center gap-2 overflow-hidden rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> Minta Quotation IATA
                </TrackLink>
                <TrackLink
                  href={IATA_URLS.cekKelayakan}
                  event="click_check_eligibility"
                  params={{ product: p.kode }}
                  className="flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold transition hover:bg-white/10"
                >
                  <ClipboardCheck className="h-4 w-4" aria-hidden /> Periksa Kelayakan Perusahaan
                </TrackLink>
              </div>
            </Reveal>
          </div>

          {/* KARTU HARGA */}
          <Reveal delay={180}>
            <aside className="iata-beam h-fit rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur md:sticky md:top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Harga jasa konsultasi &amp; pendampingan
              </p>
              <p className="mt-2 text-lg text-stone-300 line-through">{fmtIdrIata(p.hargaKatalog)}</p>
              <p className="text-3xl font-extrabold text-amber-400 md:text-4xl">
                {p.hargaMulaiDari ? "Mulai " : ""}{fmtIdrIata(p.hargaPromo)}
              </p>
              <p className="mt-1 text-sm font-semibold text-emerald-300">{PROMO_LABEL}</p>
              <p className="mt-3 rounded-xl bg-emerald-400/10 px-3 py-2 text-xs leading-relaxed text-emerald-100/90">
                *{HARGA_CATATAN}
              </p>
              {p.kode === "GOGLOBAL" && (
                <p className="mt-2 rounded-xl bg-emerald-400/10 px-3 py-2 text-xs leading-relaxed text-emerald-100/90">
                  Harga akhir ditentukan setelah pemeriksaan jumlah negara, entitas, lokasi,
                  kompleksitas struktur perusahaan, dan kebutuhan dokumen.
                </p>
              )}
              <TrackLink
                href={waQuote}
                event="click_request_quotation"
                params={{ product: p.kode }}
                external
                className="mt-4 block rounded-xl bg-amber-400 px-5 py-3 text-center text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
              >
                WhatsApp — sebut {p.kode}
              </TrackLink>
              <TrackLink
                href={IATA_URLS.konsultasi}
                event="click_consultation"
                params={{ product: p.kode }}
                className="mt-2 block rounded-xl border border-white/25 px-5 py-3 text-center text-sm font-semibold transition hover:bg-white/10"
              >
                Halaman Konsultasi IATA →
              </TrackLink>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* APA ITU */}
      <section className="mx-auto max-w-4xl px-4 py-14" aria-labelledby="apa-itu">
        <Reveal>
          <h2 id="apa-itu" className="text-2xl font-bold text-stone-900 md:text-3xl">{content.apaItu.heading}</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-5 space-y-4 leading-relaxed text-stone-700">
            {content.apaItu.paragraphs.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* KEUNGGULAN */}
      <section className="bg-stone-50 py-14" aria-labelledby="keunggulan">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="keunggulan" className="text-2xl font-bold text-stone-900 md:text-3xl">
              {content.keunggulan.heading}
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.keunggulan.items.map((k, i) => (
              <Reveal key={k} delay={i * 70} as="li" className="h-full">
                <div className="flex h-full items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                  {k}
                </div>
              </Reveal>
            ))}
          </ul>
          {content.keunggulan.note && (
            <Reveal delay={140}>
              <p className="mt-5 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {content.keunggulan.note}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* SIAPA */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="siapa">
        <Reveal>
          <h2 id="siapa" className="text-2xl font-bold text-stone-900 md:text-3xl">{content.siapa.heading}</h2>
        </Reveal>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.siapa.items.map((s, i) => (
            <Reveal key={s} delay={i * 60} as="li" className="h-full">
              <div className="flex h-full items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                {s}
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={140}>
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-semibold text-emerald-900">
              Belum yakin {p.namaPendek} yang paling sesuai?
            </p>
            <p className="mt-1 text-sm text-emerald-800">
              Gunakan pemeriksaan kelayakan awal — gratis, tanpa komitmen, hasilnya pemeriksaan
              administratif bukan keputusan IATA.
            </p>
            <TrackLink
              href={IATA_URLS.cekKelayakan}
              event="click_check_eligibility"
              params={{ product: p.kode }}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Periksa Kelayakan Perusahaan <ArrowRight className="h-4 w-4" aria-hidden />
            </TrackLink>
          </div>
        </Reveal>
      </section>

      {/* RUANG LINGKUP */}
      <section className="bg-stone-50 py-14" aria-labelledby="lingkup">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="lingkup" className="text-2xl font-bold text-stone-900 md:text-3xl">
              {content.ruangLingkupHeading}
            </h2>
            <p className="mt-2 max-w-3xl text-stone-600">
              Ruang lingkup final dikunci dalam quotation tertulis sebelum pekerjaan dimulai.
            </p>
          </Reveal>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.ruangLingkup.map((r, i) => (
              <Reveal key={r.judul} delay={i * 60} as="li" className="h-full">
                <div className="iata-card h-full rounded-2xl border border-stone-200 bg-white p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-sm font-bold text-white" aria-hidden>
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-bold leading-snug text-stone-900">{r.judul}</h3>
                  {r.desc && <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{r.desc}</p>}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* DOKUMEN AWAL */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="dokumen">
        <Reveal>
          <h2 id="dokumen" className="text-2xl font-bold text-stone-900 md:text-3xl">{content.dokumen.heading}</h2>
        </Reveal>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {content.dokumen.items.map((d, i) => (
            <Reveal key={d} delay={i * 40} as="li">
              <div className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                {d}
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={120}>
          <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            {content.dokumen.note}
          </p>
        </Reveal>
      </section>

      {/* FINANCIAL SECURITY */}
      <section className="bg-stone-50 py-14" aria-labelledby="fs">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <h2 id="fs" className="text-2xl font-bold text-stone-900 md:text-3xl">
              {content.financialSecurity.heading}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-5 space-y-4 leading-relaxed text-stone-700">
              {content.financialSecurity.paragraphs.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <Link
              href={IATA_URLS.panduan.financialSecurity}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Baca: Financial Security IATA — Pengertian, Fungsi, dan Persiapan
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PROSES */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="proses">
        <Reveal>
          <h2 id="proses" className="text-2xl font-bold text-stone-900 md:text-3xl">{content.proses.heading}</h2>
        </Reveal>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.proses.items.map((s, i) => (
            <Reveal key={s} delay={i * 50} as="li" className="h-full">
              <div className="flex h-full items-start gap-3 rounded-xl border border-stone-200 bg-white p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white" aria-hidden>
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-stone-700">{s}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* PENGECUALIAN BIAYA */}
      <section className="bg-stone-50 py-14" aria-labelledby="biaya">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <h2 id="biaya" className="text-2xl font-bold text-stone-900 md:text-3xl">{content.pengecualian.heading}</h2>
            <p className="mt-2 text-stone-600">Tidak termasuk dalam harga jasa kecuali dinyatakan tertulis dalam quotation:</p>
          </Reveal>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {content.pengecualian.items.map((b, i) => (
              <Reveal key={b} delay={i * 40} as="li">
                <div className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700">
                  <span className="mt-0.5 font-bold text-amber-600" aria-hidden>–</span>
                  {b}
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140}>
            <Link
              href={IATA_URLS.panduan.biaya}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Baca: Biaya Akreditasi IATA — Resmi vs Jasa Konsultasi
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-14" aria-labelledby="faq">
        <Reveal>
          <h2 id="faq" className="text-2xl font-bold text-stone-900 md:text-3xl">
            FAQ {p.namaPendek}
          </h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {content.faq.map((f, i) => (
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
      </section>

      {/* TERKAIT — internal linking per produk (BAGIAN 13) */}
      <section className="bg-stone-50 py-14" aria-labelledby="terkait">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="terkait" className="text-2xl font-bold text-stone-900 md:text-3xl">Halaman Terkait</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.terkait.map((l, i) => (
              <Reveal key={l.href} delay={i * 80} className="h-full">
                <Link href={l.href} className="iata-card block h-full rounded-2xl border border-stone-200 bg-white p-5">
                  <h3 className="font-bold leading-snug text-stone-900">{l.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{l.desc}</p>
                </Link>
              </Reveal>
            ))}
            {lainnya.map((x, i) => (
              <Reveal key={x.kode} delay={(content.terkait.length + i) * 80} className="h-full">
                <TrackLink
                  href={x.url}
                  event={EVENT_BY_KODE[x.kode]}
                  className="iata-card block h-full rounded-2xl border border-stone-200 bg-white p-5"
                >
                  <span className="font-mono text-[11px] font-bold text-emerald-700">{x.kode}</span>
                  <h3 className="mt-1 font-bold leading-snug text-stone-900">{x.namaPendek}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{x.model}</p>
                </TrackLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUMBER + DISCLAIMER */}
      <section className="mx-auto max-w-4xl px-4 pb-8" aria-label="Sumber referensi resmi">
        <Reveal>
          <h2 className="text-lg font-bold text-stone-900">Sumber Referensi Resmi</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-stone-600">
            {IATA_SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-500">
            {IATA_DISCLAIMER}
          </p>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16" aria-labelledby="cta-akhir">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-8 text-white md:p-12">
            <div className="iata-orb right-[-30px] top-[-20px] h-48 w-48 bg-amber-400/25" aria-hidden />
            <h2 id="cta-akhir" className="relative text-2xl font-bold md:text-3xl">{content.finalCta.title}</h2>
            <p className="relative mt-3 max-w-2xl leading-relaxed text-emerald-100/90">{content.finalCta.desc}</p>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <TrackLink
                href={waQuote}
                event="click_request_quotation"
                params={{ product: p.kode }}
                external
                className="iata-shine relative flex min-h-12 items-center gap-2 overflow-hidden rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300"
              >
                <Sparkles className="h-4 w-4" aria-hidden /> KONSULTASI {p.kode === "GOLITE" ? "IATA GOLITE" : p.kode === "GOSTANDARD" ? "IATA GOSTANDARD" : "IATA GOGLOBAL"} SEKARANG
              </TrackLink>
              <TrackLink
                href={IATA_URLS.konsultasi}
                event="click_consultation"
                params={{ product: p.kode }}
                className="flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold transition hover:bg-white/10"
              >
                Formulir Konsultasi Online
              </TrackLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
