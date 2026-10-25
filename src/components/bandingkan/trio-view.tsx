// ============================================================
// ROADMAP-99 langkah 34 — Tampilan Perbandingan Trio (3 pihak)
// Mobile: kartu per aspek · Desktop: grid 4 kolom (1 aspek + 3 pihak)
// ============================================================

import Link from "next/link";
import { ArrowRight, CheckCircle2, Crown, HelpCircle, PhoneCall, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TrioComparison } from "@/lib/comparisons-trio";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

const BEST_STYLES = [
  "bg-primary/[0.06] border border-primary/20",
  "bg-gold/[0.06] border border-gold/20",
  "bg-emerald-500/[0.06] border border-emerald-500/20",
];

function PartyBadge({ short, variant }: { short: string; variant: number }) {
  const styles = ["bg-primary/10 text-primary", "bg-gold/10 text-gold", "bg-emerald-500/10 text-emerald-600"];
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${styles[variant]}`}>{short}</span>;
}

function hrefFor(id: string): string {
  const alias: Record<string, string> = { "usaha-dagang": "nib", "yayasan": "koperasi-yayasan", "koperasi": "koperasi-yayasan", "firma": "cv", "nib-op": "nib", "pt-pma": "pt", "pt-lokal": "pt", "siup": "nib" };
  return `/layanan/${alias[id] ?? id}`;
}

export function TrioView({ trio }: { trio: TrioComparison }) {
  const [pA, pB, pC] = trio.parties;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: trio.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://pusatperizinan.com/" },
      { "@type": "ListItem", position: 2, name: "Perbandingan Badan Usaha", item: "https://pusatperizinan.com/bandingkan" },
      { "@type": "ListItem", position: 3, name: trio.title, item: `https://pusatperizinan.com/bandingkan/${trio.slug}` },
    ],
  };

  const waText = `Halo, saya baru membaca perbandingan ${trio.parties.map((p) => p.short).join(" vs ")} di PusatPerizinan.com. Kondisi usaha saya: \n\nMohon direkomendasikan badan usaha yang paling cocok.`;

  const partiesJsx = [
    { p: pA, v: 0 },
    { p: pB, v: 1 },
    { p: pC, v: 2 },
  ];

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/bandingkan" className="flex items-center gap-2.5" aria-label="Kembali ke daftar perbandingan">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
            <span className="text-sm text-muted-foreground hidden sm:inline">/ Perbandingan</span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Konsultasi Gratis
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 border-b">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-1.5">/</span>
            <Link href="/bandingkan" className="hover:text-primary">Perbandingan</Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground">{trio.parties.map((p) => p.short).join(" vs ")}</span>
          </nav>
          <Badge className="bg-primary/10 text-primary border border-primary/20 mb-3">
            <Sparkles className="h-3 w-3 mr-1" aria-hidden /> Perbandingan 3 Badan Usaha — Basis UU/PP Resmi
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            {pA.short} vs {pB.short} vs {pC.short}: Mana yang Cocok untuk Usaha Anda?
          </h1>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {partiesJsx.map(({ p, v }) => (
              <div key={p.id} className="rounded-2xl border bg-card p-4">
                <div className="flex items-center gap-2 mb-2"><PartyBadge short={p.short} variant={v} /></div>
                <p className="font-semibold text-sm leading-snug">{p.name}</p>
                <Link href={hrefFor(p.id)} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                  Jasa {p.name.split(" (")[0]} <ArrowRight className="h-3 w-3" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro prose */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-neutral max-w-none space-y-4">
          {trio.intro.map((par, i) => (
            <p key={i} className="leading-relaxed">{par}</p>
          ))}
        </div>
      </section>

      {/* Tabel trio */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-4">Tabel Perbandingan {trio.rows.length} Aspek</h2>

        {/* Desktop grid */}
        <div className="hidden md:block rounded-2xl border overflow-hidden">
          <div className="grid grid-cols-[210px_1fr_1fr_1fr] bg-muted/60 text-sm font-bold">
            <div className="p-3.5">Aspek</div>
            {trio.parties.map((p, i) => (
              <div key={p.id} className={`p-3.5 ${BEST_STYLES[i]}`}>{p.short}</div>
            ))}
          </div>
          {trio.rows.map((row) => (
            <div key={row.aspect} className="grid grid-cols-[210px_1fr_1fr_1fr] border-t text-sm">
              <div className="p-3.5 font-semibold bg-muted/30">{row.aspect}</div>
              {row.cells.map((cell, i) => (
                <div key={i} className={`p-3.5 leading-relaxed ${row.best === i ? BEST_STYLES[i] : ""}`}>
                  {row.best === i && <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary mb-1"><Crown className="h-3 w-3" aria-hidden /> Terbaik di aspek ini</span>}
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {trio.rows.map((row) => (
            <div key={row.aspect} className="rounded-2xl border bg-card overflow-hidden">
              <div className="px-4 py-3 bg-muted/60 font-bold text-sm">{row.aspect}</div>
              <div className="divide-y">
                {row.cells.map((cell, i) => (
                  <div key={i} className={`px-4 py-3 text-sm leading-relaxed ${row.best === i ? BEST_STYLES[i] : ""}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <PartyBadge short={trio.parties[i].short} variant={i} />
                      {row.best === i && <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary"><Crown className="h-3 w-3" aria-hidden /> Terbaik</span>}
                    </div>
                    {cell}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Peta keputusan */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-4">Peta Keputusan: Kapan Pilih yang Mana</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {trio.choose.map((list, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${BEST_STYLES[i]}`}>
              <div className="flex items-center gap-2 mb-3"><PartyBadge short={trio.parties[i].short} variant={i} /> <span className="font-bold text-sm">Pilih {trio.parties[i].short} bila:</span></div>
              <ul className="space-y-2">
                {list.map((item, j) => (
                  <li key={j} className="flex gap-2 text-sm leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Verdict */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-gold/5 p-6">
          <h2 className="font-extrabold text-lg mb-2">Verdict Jujur — Tanpa Promosi</h2>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{trio.verdict}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" aria-hidden /> Pertanyaan yang Sering Ditanyakan
        </h2>
        <div className="space-y-2.5">
          {trio.faq.map((f, i) => (
            <details key={i} className="group rounded-xl border bg-card px-4 py-3 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold text-sm md:text-base">
                {f.q}
                <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45 text-lg leading-none">+</span>
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-2xl border bg-card p-6 text-center">
          <h2 className="font-bold text-lg">Masih ragu memilih di antara ketiganya?</h2>
          <p className="text-sm text-muted-foreground mt-1.5 mb-4">
            Konsultasi gratis 15 menit — sebutkan omzet, jumlah pemilik, dan target usaha Anda. Kami petakan struktur
            yang paling hemat sekarang dan biaya naik kelasnya nanti.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md min-h-[48px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden /> Konsultasi Gratis via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
