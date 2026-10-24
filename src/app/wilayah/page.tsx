import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, ShieldCheck, Star } from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { WILAYAH, WILAYAH_ISLANDS, wilayahByIsland, TOTAL_KABKOTA_HUBS } from "@/lib/wilayah";
import { TOTAL_KABKOTA, TOTAL_PROVINCES } from "@/lib/coverage-data";
import { SITE_NAME, SITE_URL, absUrl, TRUST_METRICS } from "@/lib/site";
import { LAYANAN_STATS } from "@/lib/layanan-500";

// ============================================================
// PUSATPERIZINAN.COM — /wilayah (Hub Navigasi Local SEO)
// BUKAN halaman kompetitor: halaman lokal ASLI hidup di
// /layanan/wilayah/{prov} & /layanan/wilayah/{prov}/{kota}
// (dibangun generators.ts, terindeks sitemap "hubs").
// ROADMAP-99 langkah 25: kini memperkuat 554 halaman lokal
// (38 hub provinsi + 516 hub kab/kota) lewat internal-linking
// penuh ke seluruh kab/kota + ItemList JSON-LD.
// ============================================================

export const metadata: Metadata = {
  title: "Jasa Pengurusan Perizinan Usaha — 38 Provinsi & 514 Kabupaten/Kota",
  description: `Layanan pengurusan izin usaha di seluruh Indonesia — ${TOTAL_PROVINCES} provinsi, ${TOTAL_KABKOTA} kabupaten/kota. Pilih wilayah Anda: NIB, PT/CV, Halal, BPOM, PBG/SLF sampai izin sektoral. Tanpa datang ke kantor, garansi proses.`,
  alternates: { canonical: absUrl("/wilayah") },
  openGraph: {
    title: "Jasa Pengurusan Perizinan Usaha — 38 Provinsi & 514 Kabupaten/Kota",
    description:
      "Pilih provinsi Anda — jadwal proses, estimasi biaya, dan konsultan lokal siap membantu. Melayani 514 kabupaten/kota.",
    url: absUrl("/wilayah"),
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absUrl("/wilayah") + "#webpage",
        name: "Jangkauan Nasional — Jasa Perizinan di 38 Provinsi",
        isPartOf: { "@id": SITE_URL + "/#website" },
        inLanguage: "id-ID",
      },
      {
        "@type": "ItemList",
        name: "Provinsi yang dilayani PusatPerizinan.com",
        numberOfItems: WILAYAH.length,
        itemListElement: WILAYAH.map((w, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `Jasa Perizinan & Konsultan di ${w.name}`,
          url: absUrl(w.hubHref),
        })),
      },
      {
        // ROADMAP-99 langkah 25: seluruh 514 kab/kota (±alias) sebagai
        // ItemList — sinyal cakupan lokal penuh untuk mesin pencari.
        "@type": "ItemList",
        name: "Kabupaten & Kota yang dilayani PusatPerizinan.com",
        numberOfItems: TOTAL_KABKOTA_HUBS,
        itemListElement: WILAYAH.flatMap((w) =>
          w.kabkotaHrefs.map((k) => ({
            "@type": "ListItem",
            name: `Jasa Perizinan di ${k.name}`,
            url: absUrl(k.href),
          }))
        ),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Wilayah Layanan", item: absUrl("/wilayah") },
        ],
      },
    ],
  };
}

export default function WilayahHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="border-b bg-gradient-to-b from-emerald-50/60 via-background to-background">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> JANGKAUAN NASIONAL
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              Jasa Pengurusan Perizinan di <span className="text-emerald-600">Seluruh Indonesia</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {TOTAL_PROVINCES} provinsi · {TOTAL_KABKOTA} kabupaten/kota. Pilih provinsi Anda untuk melihat
              layanan lengkap, catatan perizinan lokal, dan mulai proses hari ini — tanpa datang ke kantor.
            </p>
            <dl className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                [String(TOTAL_PROVINCES), "provinsi"],
                [String(TOTAL_KABKOTA), "kabupaten/kota"],
                [String(LAYANAN_STATS.total), "layanan katalog"],
                [TRUST_METRICS.permitsIssued, "izin terbit"],
              ].map(([v, l]) => (
                <div key={String(l)} className="rounded-2xl border bg-card p-4">
                  <dt className="sr-only">{String(l)}</dt>
                  <dd className="text-2xl font-extrabold text-emerald-700">{v}</dd>
                  <dd className="mt-0.5 text-[11px] text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* GRID PULAU — link ke hub provinsi & kota yang sudah ada */}
        <section aria-labelledby="daftar-wilayah" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="daftar-wilayah" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Pilih Provinsi Anda
          </h2>
          <div className="mt-8 space-y-10">
            {WILAYAH_ISLANDS.map((island) => {
              const list = wilayahByIsland(island);
              if (!list.length) return null;
              return (
                <div key={island}>
                  <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
                    <Building2 className="h-4 w-4 text-emerald-600" aria-hidden /> {island}
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold">{list.length} provinsi</span>
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((w) => (
                      // v1.6.0: kartu bukan lagi <Link> tunggal — berisi
                      // banyak anchor (hub kab/kota); anchor bersarang
                      // adalah HTML invalid & merusak hidrasi React.
                      <div
                        key={w.slug}
                        className="rounded-xl border bg-card p-4 transition hover:border-emerald-300 hover:shadow-md"
                      >
                        <Link
                          href={w.hubHref}
                          className="group block"
                        >
                          <p className="text-sm font-bold leading-snug group-hover:text-emerald-700">
                            Jasa Perizinan di {w.name}
                          </p>
                          <p className="mt-1.5 flex flex-wrap gap-1.5">
                            {w.cityHrefs.slice(0, 4).map((c) => (
                              <span
                                key={c.href}
                                className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                              >
                                {c.name}
                              </span>
                            ))}
                          </p>
                        </Link>
                        {/* ROADMAP-99 langkah 25: internal-link ke SELURUH
                            kab/kota — <details> = ringan, tetap crawlable */}
                        <details className="mt-2">
                          <summary className="cursor-pointer select-none text-[11px] font-bold text-emerald-700 hover:text-emerald-800">
                            {w.kabkotaHrefs.length} kabupaten/kota dilayani — lihat semua
                          </summary>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {w.kabkotaHrefs.map((k) => (
                              <Link
                                key={k.href}
                                href={k.href}
                                className="rounded-full border bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition hover:border-emerald-300 hover:text-emerald-700"
                              >
                                {k.name}
                              </Link>
                            ))}
                          </div>
                        </details>
                        <Link
                          href={w.hubHref}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700"
                        >
                          Lihat semua layanan <ArrowRight className="h-3 w-3" aria-hidden />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
            <ShieldCheck className="mx-auto h-8 w-8 text-emerald-600" aria-hidden />
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight">Proses 100% Online, Tim di 2 Kota</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Koordinasi via WhatsApp &amp; email, dokumen digital. Kantor fisik di SCBD Jakarta &amp; Bandung —
              kunjungan welcome, tidak pernah wajib. Rating {TRUST_METRICS.rating}/5 dari {TRUST_METRICS.reviewCount} ulasan.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/konsultasi"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Konsultasi Gratis — Pilih Wilayah Saya
              </Link>
              <Link
                href="/katalog"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold transition hover:bg-accent"
              >
                Jelajahi {LAYANAN_STATS.total} Layanan
              </Link>
            </div>
            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
              Dipercaya {TRUST_METRICS.clientsServed}+ bisnis di {TRUST_METRICS.provinces} provinsi &amp; {TRUST_METRICS.cities} kota
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
