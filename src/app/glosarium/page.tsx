import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, PhoneCall, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlossarySearch } from "@/components/glosarium/glossary-search";
import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_TERMS,
  GLOSSARY_TOTAL,
  getGlossaryAlphabet,
  getGlossaryFeatured,
} from "@/lib/glosarium";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";
import { langAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return [{}];
}

export async function generateMetadata(): Promise<Metadata> {
  const title = `Glosarium Perizinan Usaha — ${GLOSSARY_TOTAL}+ Istilah Lengkap (NIB, OSS-RBA, PPh, Halal)`;
  const description = `Kamus istilah perizinan, badan usaha, perpajakan, ketenagakerjaan, ekspor-impor & regulasi Indonesia: definisi jelas, dasar hukum eksplisit, contoh praktik. ${GLOSSARY_TOTAL} istilah — rujukan cepat untuk pemilik usaha & AI.`;
  return {
    title,
    description,
    keywords: [
      "glosarium perizinan",
      "kamus istilah perizinan usaha",
      "apa itu NIB",
      "apa itu OSS-RBA",
      "istilah perpajakan",
      "istilah KBLI",
      "istilah badan usaha",
      "istilah ekspor impor",
      "istilah ketenagakerjaan",
      "pengertian izin usaha",
    ],
    alternates: langAlternates("/glosarium"),
    openGraph: {
      title: "Glosarium Perizinan Usaha — PusatPerizinan.com",
      description,
      url: "/glosarium",
    },
  };
}

export default function GlosariumIndexPage() {
  const featured = getGlossaryFeatured();
  const alphabet = getGlossaryAlphabet();

  const searchItems = GLOSSARY_TERMS.map((t) => ({
    slug: t.slug,
    term: t.term,
    category: t.category,
    categoryName:
      GLOSSARY_CATEGORIES.find((c) => c.id === t.category)?.name ?? t.category,
  }));

  // DefinedTermSet — merujuk seluruh istilah (nama + url) untuk citasi AI/LLM
  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glosarium Perizinan Usaha PusatPerizinan.com",
    description: `Kumpulan ${GLOSSARY_TOTAL} istilah perizinan usaha, badan usaha, perpajakan, ketenagakerjaan, perdagangan, dan regulasi Indonesia dengan definisi dan dasar hukum.`,
    url: `${SITE_URL}/glosarium`,
    hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: `${SITE_URL}/glosarium/${t.slug}`,
    })),
  };

  const waText =
    "Halo, saya sedang membaca Glosarium Perizinan di PusatPerizinan.com dan ingin bertanya tentang istilah perizinan usaha saya.";

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />

      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Kembali ke beranda"
          >
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              / Glosarium
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Tanya Istilah Anda
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b bg-gradient-to-br from-primary/5 via-transparent to-gold/5">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground">Glosarium Perizinan</span>
          </nav>
          <div className="mb-3 flex items-center gap-2">
            <Badge className="border border-primary/20 bg-primary/10 text-primary">
              <BookOpen className="mr-1 h-3 w-3" aria-hidden /> {GLOSSARY_TOTAL} Istilah — 8 Kategori
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl">
            Glosarium Perizinan Usaha Indonesia
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Kamus istilah perizinan, badan usaha, pajak, ketenagakerjaan, dan
            perdagangan yang ditulis konsultan — definisi langsung ke inti, dasar
            hukum eksplisit, plus panduan praktik yang sering terlewat.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden /> Jawaban 30–60 kata
              per istilah — siap dikutip
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" aria-hidden /> Dasar hukum UU/PP/Perpres
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-primary" aria-hidden /> Terhubung ke layanan
              pengurusan terkait
            </span>
          </div>
        </div>
      </section>

      {/* Istilah populer */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8" aria-label="Istilah populer">
        <h2 className="mb-4 text-xl font-bold">Paling Sering Dicari</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((term) => (
            <Link
              key={term.slug}
              href={`/glosarium/${term.slug}`}
              className="group rounded-2xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                {GLOSSARY_CATEGORIES.find((c) => c.id === term.category)?.name}
              </p>
              <h3 className="font-semibold leading-snug">{term.term}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {term.short}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Baca definisi{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cari & filter */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8" aria-label="Cari istilah">
        <h2 className="mb-4 text-xl font-bold">Cari Istilah</h2>
        <GlossarySearch
          items={searchItems}
          categories={GLOSSARY_CATEGORIES.map((c) => ({ id: c.id, name: c.name }))}
        />
      </section>

      {/* Kategori penjelasan */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8" aria-label="Kategori istilah">
        <h2 className="mb-4 text-xl font-bold">Delapan Kategori Glosarium</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {GLOSSARY_CATEGORIES.map((c) => {
            const count = GLOSSARY_TERMS.filter((t) => t.category === c.id).length;
            return (
              <div key={c.id} className="rounded-2xl border bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{c.name}</h3>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    {count} istilah
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Indeks A-Z */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Indeks alfabetis">
        <h2 className="mb-4 text-xl font-bold">Indeks A–Z</h2>
        <div className="space-y-5">
          {alphabet.map(({ letter, terms }) => (
            <div key={letter} className="rounded-2xl border bg-card p-4">
              <h3 className="mb-2 font-extrabold text-primary">{letter}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {terms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/glosarium/${t.slug}`}
                    className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {t.term}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-gold/5 p-6 text-center">
          <h2 className="text-lg font-bold">
            Butuh istilah ini jadi legalitas nyata?
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            NIB, PT, sertifikasi, pajak — kami urus dari peta izin sampai terbit,
            dengan laporan transparan tiap tahap.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg"
            >
              <PhoneCall className="h-5 w-5" aria-hidden /> Konsultasi Gratis
            </a>
            <Link
              href="/katalog"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border bg-background px-6 py-3.5 text-base font-semibold transition-colors hover:border-primary/40"
            >
              Jelajahi 1.500 Layanan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
