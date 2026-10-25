import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookMarked,
  ChevronRight,
  PhoneCall,
  Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_TERMS,
  GLOSSARY_TOTAL,
  getGlossaryTerm,
  getRelatedGlossaryTerms,
} from "@/lib/glosarium";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";
import { langAlternates } from "@/lib/seo";

export function generateStaticParams() {
  // Dihasilkan dari sumber data tunggal — selalu sinkron dengan sitemap glosarium.
  return GLOSSARY_TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};
  const title = `${term.term} adalah — Arti, Dasar Hukum & Praktiknya`;
  const description = `${term.short.slice(0, 155)}`;
  return {
    title,
    description,
    keywords: [
      term.term.toLowerCase(),
      term.en?.toLowerCase(),
      term.abbr?.toLowerCase(),
      `apa itu ${term.abbr?.toLowerCase() ?? term.slug.replace(/-/g, " ")}`,
      "glosarium perizinan",
    ].filter(Boolean) as string[],
    alternates: langAlternates(`/glosarium/${term.slug}`),
    openGraph: {
      title: `${term.term} — Glosarium PusatPerizinan.com`,
      description,
      url: `/glosarium/${term.slug}`,
      type: "article",
    },
  };
}

export default async function GlossaryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const category = GLOSSARY_CATEGORIES.find((c) => c.id === term.category);
  const related = getRelatedGlossaryTerms(term.slug, 6);
  const wordCount = term.short.split(/\s+/).length;

  const waText = `Halo, saya baru membaca definisi "${term.term}" di Glosarium PusatPerizinan.com. Kondisi usaha saya: \n\nMohon dibantu penerapannya.`;

  // DefinedTerm — skema utama glosarium (ramah SEO & citasi AI)
  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    ...(term.en ? { alternateName: term.en } : {}),
    description: term.legal
      ? `${term.short} Dasar hukum: ${term.legal}.`
      : term.short,
    url: `${SITE_URL}/glosarium/${term.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Glosarium Perizinan Usaha PusatPerizinan.com",
      url: `${SITE_URL}/glosarium`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Glosarium Perizinan", item: `${SITE_URL}/glosarium` },
      { "@type": "ListItem", position: 3, name: term.term, item: `${SITE_URL}/glosarium/${term.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/glosarium"
            className="flex items-center gap-2.5"
            aria-label="Kembali ke glosarium"
          >
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Tanya Istilah Ini
          </a>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <ChevronRight className="mx-1 inline h-3 w-3" aria-hidden />
          <Link href="/glosarium" className="hover:text-primary">Glosarium</Link>
          <ChevronRight className="mx-1 inline h-3 w-3" aria-hidden />
          <span className="font-medium text-foreground">{term.term}</span>
        </nav>
      </div>

      {/* Konten utama */}
      <article className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className="border border-primary/20 bg-primary/10 text-primary">
            <BookMarked className="mr-1 h-3 w-3" aria-hidden /> {category?.name}
          </Badge>
          {term.en && (
            <Badge variant="outline" className="text-muted-foreground">
              EN: {term.en}
            </Badge>
          )}
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-balance md:text-3xl">
          {term.term}
        </h1>

        {/* Definisi inti — jawaban langsung (featured snippet) */}
        <div
          id="definisi-inti"
          className="mt-5 rounded-2xl border-2 border-primary/25 bg-primary/5 p-5"
        >
          <h2 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
            <BookMarked className="h-4 w-4" aria-hidden /> Definisi Singkat
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold normal-case">
              {wordCount} kata
            </span>
          </h2>
          <p className="text-base leading-relaxed text-foreground md:text-lg">
            {term.short}
          </p>
        </div>

        {/* Pendalaman */}
        <section className="mt-8 space-y-4" aria-label="Pendalaman istilah">
          <h2 className="text-xl font-bold">Pendalaman & Praktiknya</h2>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {term.detail.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Dasar hukum */}
        {term.legal && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border bg-card p-5">
            <Scale className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
            <div>
              <h2 className="font-semibold">Dasar Hukum</h2>
              <p className="mt-1 text-sm text-muted-foreground">{term.legal}</p>
            </div>
          </div>
        )}

        {/* CTA layanan terkait */}
        <div className="mt-8 rounded-2xl border bg-gradient-to-br from-primary/5 to-gold/5 p-6 text-center">
          <h2 className="text-lg font-bold">
            Butuh "{term.abbr ?? term.term.split(" (")[0]}" diurus sampai terbit?
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Tim konsultan kami memetakan kebutuhan Anda dan mengurusi dari
            persiapan dokumen hingga pengawasan pasca-terbit.
          </p>
          <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg"
            >
              <PhoneCall className="h-5 w-5" aria-hidden /> Konsultasi Gratis
            </a>
          </div>
          {term.services && term.services.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
              {term.services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-full border bg-background px-3.5 py-2 transition-colors hover:border-primary/50"
                >
                  {s.label} <ArrowRight className="inline h-3.5 w-3.5" aria-hidden />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Istilah terkait */}
        {related.length > 0 && (
          <section className="mt-10" aria-label="Istilah terkait">
            <h2 className="mb-4 text-xl font-bold">Istilah Terkait</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((rt) => (
                <Link
                  key={rt.slug}
                  href={`/glosarium/${rt.slug}`}
                  className="group rounded-2xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                >
                  <p className="text-xs font-bold text-muted-foreground">
                    {GLOSSARY_CATEGORIES.find((c) => c.id === rt.category)?.name}
                  </p>
                  <h3 className="mt-0.5 font-semibold leading-snug">{rt.term}</h3>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Baca definisi{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Kembali ke indeks */}
        <div className="mt-10 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Bagian dari {GLOSSARY_TOTAL} istilah di{" "}
            <Link href="/glosarium" className="font-semibold text-primary hover:underline">
              Glosarium Perizinan PusatPerizinan.com
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
