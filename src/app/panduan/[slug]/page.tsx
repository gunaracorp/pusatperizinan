import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, CalendarDays, CheckCircle2, Clock, ListChecks, MessageCircle,
  Table2,
} from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import { ogImageUrl } from "@/lib/og-template";
import { IataMotionStyles, Reveal } from "@/components/iata/iata-motion";
import {
  IATA_DISCLAIMER, IATA_SOURCES, IATA_URLS, iataWaLink, IATA_WA_UMUM,
  absIataUrl,
} from "@/lib/iata";
import {
  allIataArticles, getIataArticle, slugOfArticlePath, type IataArticleSection,
} from "@/lib/iata-articles";

// ============================================================
// PUSATPERIZINAN.COM — /panduan/[slug] (BAGIAN 8)
// Renderer artikel edukasi IATA dari data terstruktur:
// Article + BreadcrumbList + FAQPage JSON-LD, tabel komparasi,
// checklist, CTA kontekstual per seksi, sumber resmi IATA.
// ============================================================

export function generateStaticParams(): { slug: string }[] {
  return allIataArticles().map((a) => ({ slug: a.slug }));
}

const TANGGAL_ID = (iso: string): string =>
  new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getIataArticle(slug);
  if (!a) return { robots: { index: false, follow: false } };
  const path = `/panduan/${slug}`;
  return {
    title: a.seoTitle,
    description: a.metaDescription,
    alternates: langAlternates(path),
    openGraph: {
      images: [
        {
          url: ogImageUrl({
            title: a.h1,
            subtitle: "Panduan Akreditasi IATA Indonesia",
            category: "PusatPerizinan.com — Licensing Consultancy Services",
          }),
          width: 1200,
          height: 630,
          alt: a.h1,
        },
      ],
      title: a.seoTitle,
      description: a.metaDescription,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "article",
      locale: "id_ID",
    },
    robots: { index: true, follow: true },
  };
}

function Section({ s }: { s: IataArticleSection }) {
  return (
    <div>
      {s.heading && <h2 className="mt-10 text-2xl font-bold text-stone-900">{s.heading}</h2>}
      {s.paragraphs?.map((p, i) => (
        <p key={i} className="mt-4 leading-relaxed text-stone-700">{p}</p>
      ))}
      {s.bullets && (
        <ul className="mt-4 space-y-2">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-stone-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      )}
      {s.checklist && (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="flex items-center gap-2 font-bold text-emerald-900">
            <ListChecks className="h-5 w-5" aria-hidden /> Checklist Pemeriksaan
          </p>
          <ul className="mt-3 space-y-2">
            {s.checklist.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm leading-relaxed text-emerald-900">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
      {s.table && (
        <div className="mt-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-stone-600">
            <Table2 className="h-4 w-4" aria-hidden /> {s.table.caption}
          </p>
          <div className="mt-2 overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="bg-emerald-950 text-white">
                  {s.table.headers.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.table.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 ? "bg-stone-50" : "bg-white"}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`border-t border-stone-100 px-4 py-3 align-top leading-relaxed text-stone-700 ${ci === 0 ? "font-semibold text-stone-900" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {s.cta && (
        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <span className="font-semibold">{s.cta.text}</span>
          <Link href={s.cta.href} className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:underline">
            {s.cta.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}

export default async function PanduanIataArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getIataArticle(slugOfArticlePath(slug));
  if (!a) notFound();

  const path = `/panduan/${a.slug}`;
  const wa = iataWaLink(IATA_WA_UMUM);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.h1,
      description: a.metaDescription,
      datePublished: a.updatedAt,
      dateModified: a.updatedAt,
      inLanguage: "id-ID",
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: absIataUrl(path),
      about: "IATA Accreditation untuk travel agent Indonesia",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "IATA Accreditation", item: absIataUrl(IATA_URLS.pillar) },
        { "@type": "ListItem", position: 3, name: a.h1, item: absIataUrl(path) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: a.faq.map((f) => ({
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
        <div className="mx-auto max-w-4xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href={IATA_URLS.pillar} className="hover:text-emerald-700">IATA Accreditation</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">Panduan</span>
        </div>
      </nav>

      {/* HEADER ARTIKEL */}
      <header className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="iata-hero-grad bg-[radial-gradient(55%_55%_at_25%_25%,rgba(16,185,129,.3),transparent_60%),radial-gradient(45%_45%_at_78%_30%,rgba(251,191,36,.14),transparent_55%)]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-12 md:py-16">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-200">
              Panduan IATA — Licensing Consultancy Services
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">{a.h1}</h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-emerald-100/90">{a.excerpt}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-emerald-200/80">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Diperbarui {TANGGAL_ID(a.updatedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden /> ±{a.readMinutes} menit baca
              </span>
            </p>
          </Reveal>
        </div>
      </header>

      {/* ISI ARTIKEL */}
      <article className="mx-auto max-w-4xl px-4 py-12">
        {a.sections.map((s, i) => (
          <Reveal key={i} delay={Math.min(i * 40, 200)}>
            <Section s={s} />
          </Reveal>
        ))}

        {/* FAQ */}
        <section aria-labelledby="faq" className="mt-12">
          <Reveal>
            <h2 id="faq" className="text-2xl font-bold text-stone-900">Pertanyaan Umum</h2>
          </Reveal>
          <div className="mt-5 space-y-3">
            {a.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
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

        {/* TERKAIT — internal linking kontekstual */}
        <section aria-labelledby="terkait" className="mt-12">
          <Reveal>
            <h2 id="terkait" className="text-2xl font-bold text-stone-900">Halaman Terkait</h2>
          </Reveal>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {a.terkait.map((l, i) => (
              <Reveal key={l.href} delay={i * 60} className="h-full">
                <Link href={l.href} className="iata-card block h-full rounded-xl border border-stone-200 bg-white p-4 font-semibold text-stone-900">
                  {l.label}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SUMBER RESMI */}
        <Reveal>
          <section aria-labelledby="sumber" className="mt-12">
            <h2 id="sumber" className="text-lg font-bold text-stone-900">Sumber Resmi IATA</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-stone-600">
              {IATA_SOURCES.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </article>

      {/* CTA AKHIR */}
      <section className="bg-stone-50 py-12" aria-labelledby="cta">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-8 text-white">
              <div className="iata-orb right-[-30px] top-[-20px] h-44 w-44 bg-amber-400/25" aria-hidden />
              <h2 id="cta" className="relative text-2xl font-bold md:text-3xl">
                Perlu pendampingan persiapan akreditasi IATA?
              </h2>
              <p className="relative mt-2 max-w-2xl text-emerald-100/90">
                Konsultasi awal gratis — periksa kesiapan perusahaan Anda sebelum mengajukan.
              </p>
              <div className="relative mt-5 flex flex-wrap gap-3">
                <Link
                  href={IATA_URLS.cekKelayakan}
                  className="flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300"
                >
                  <ListChecks className="h-4 w-4" aria-hidden /> Cek Kelayakan IATA
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 rounded-xl border border-stone-200 bg-white p-4 text-xs leading-relaxed text-stone-500">
              {IATA_DISCLAIMER}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
