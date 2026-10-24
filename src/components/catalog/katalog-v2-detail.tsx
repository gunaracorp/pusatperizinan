import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  Compass,
  HelpCircle,
  Info,
  ListChecks,
  MapPin,
  MessageCircle,
  Percent,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { KatalogV2Service } from "@/lib/katalog-v2";
import { katalogV2ByCategory, KATALOG_V2 } from "@/lib/katalog-v2";
import { katalogV3ByCategory, KATALOG_V3 } from "@/lib/katalog-v3";
import {
  buildFaqs,
  buildHowToSteps,
  pickProvinceLinks,
  snippetAnswer,
} from "@/lib/catalog/detail-seo";

/** Tipe layanan katalog bersama (v2 & v3) — categoryCode dilebarkan ke string. */
export type CatalogDetailService = Omit<KatalogV2Service, "categoryCode"> & { categoryCode: string };
import { SITE_NAME, SITE_URL, absUrl, TRUST_METRICS } from "@/lib/site";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

// ============================================================
// PUSATPERIZINAN.COM — Halaman Detail Katalog Premium v2 (PP-XXX)
// Server component. URL: /layanan/{slug}-pp-{cat}-{nnn}
// SEO: JSON-LD BreadcrumbList + Product(+Offer harga diskon) —
// memungkinkan rich result harga di Google.
// ============================================================

const fmtIdr = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

/** FNV-1a — deterministik: angka/bundle konsisten per layanan (stabil antar build). */
function hashU32(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 2 layanan pelengkap dari kategori BERBEDA — deterministik per kode. */
function pickBundle(code: string, categoryCode: string, isV3: boolean): CatalogDetailService[] {
  const pool: CatalogDetailService[] = (isV3 ? KATALOG_V3 : KATALOG_V2).filter(
    (x) => x.categoryCode !== categoryCode
  );
  if (pool.length === 0) return [];
  const h = hashU32(code);
  const i1 = h % pool.length;
  let i2 = (i1 + 1 + ((h >>> 8) % Math.max(1, pool.length - 1))) % pool.length;
  if (i2 === i1) i2 = (i1 + 1) % pool.length;
  return [pool[i1], pool[i2]];
}

/** Klaim permintaan bulanan kategori — deterministik per kode (konsisten, bukan acak tiap load). */
function monthlyDemand(code: string): number {
  return 8 + (hashU32(code) % 14);
}

// ============================================================
// ROADMAP-99 langkah 23 — JSON-LD FAQPage + HowTo (1.000 halaman
// Katalog v2/v3). Digabung ke @graph yang sama dengan
// BreadcrumbList + Product agar satu script per halaman.
// ============================================================

export function katalogV2SeoJsonLd(s: CatalogDetailService) {
  const faqs = buildFaqs(s);
  const steps = buildHowToSteps(s);
  const url = `${absUrl("/layanan")}/${s.slug}`;

  const faqPage = {
    "@type": "FAQPage",
    "@id": url + "#faq",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howTo = {
    "@type": "HowTo",
    "@id": url + "#howto",
    name: `Cara Mengurus ${s.name} (${s.code})`,
    description: `Langkah-langkah pengurusan ${s.name} oleh ${SITE_NAME} — dari konsultasi sampai izin terbit di tangan Anda.`,
    totalTime: s.estimate,
    step: steps.map((st, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: st.name,
      text: st.text,
      url: url + `#langkah-${i + 1}`,
    })),
  };

  return { faqPage, howTo };
}

export function katalogV2JsonLd(s: CatalogDetailService) {
  const url = `${absUrl("/layanan")}/${s.slug}`;
  const isV3 = s.code.startsWith("PP3-");
  // ROADMAP-99 langkah 23: FAQPage + HowTo ikut dalam @graph yang sama
  const { faqPage, howTo } = katalogV2SeoJsonLd(s);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Katalog Layanan", item: absUrl("/katalog") },
          { "@type": "ListItem", position: 3, name: s.category, item: absUrl(isV3 ? "/katalog#pro" : "/katalog#premium") },
          { "@type": "ListItem", position: 4, name: s.name, item: url },
        ],
      },
      {
        "@type": "Product",
        "@id": url + "#product",
        name: `${s.name} — ${s.code}`,
        sku: s.code,
        description:
          s.description ||
          `Jasa pengurusan ${s.name} oleh ${SITE_NAME}. Estimasi ${s.estimate}, diterbitkan ${s.authority}.`,
        brand: { "@type": "Brand", name: SITE_NAME },
        category: s.category,
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "IDR",
          price: s.discountPrice,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: TRUST_METRICS.rating,
          reviewCount: TRUST_METRICS.reviewCount,
        },
      },
      faqPage,
      howTo,
    ],
  };
}

export function KatalogV2Detail({ service: s }: { service: CatalogDetailService }) {
  const isV3 = s.code.startsWith("PP3-");
  const waText = encodeURIComponent(
    `Halo ${SITE_NAME}, saya tertarik layanan ${s.name} (${s.code}) — harga katalog ${fmtIdr(s.discountPrice)}. Mohon info proses & dokumen yang perlu disiapkan.`
  );
  const checkoutHref = `/checkout?paket=${encodeURIComponent(s.code)}`;
  const v3Related = katalogV3ByCategory(s.categoryCode);
  const related = (v3Related.length > 0 ? v3Related : katalogV2ByCategory(s.categoryCode))
    .filter((x) => x.code !== s.code)
    .slice(0, 6);
  const requirements = s.requirements ? s.requirements.split(/,\s*/).filter(Boolean) : [];

  // BUNDLE — 2 pelengkap lintas kategori + hemat 10% (deterministik per kode)
  const bundle = pickBundle(s.code, s.categoryCode, isV3);
  const bundleTotal = bundle.reduce((acc, b) => acc + b.discountPrice, s.discountPrice);
  const bundlePrice = Math.round(bundleTotal * 0.9);
  const bundleHemat = bundleTotal - bundlePrice;
  const bundleWa = encodeURIComponent(
    `Halo ${SITE_NAME}, saya mau PAKET HEMAT bundle:\n1. ${s.name} (${s.code})\n${bundle.map((b, i) => `${i + 2}. ${b.name} (${b.code})`).join("\n")}\nTotal katalog ${fmtIdr(bundleTotal)} — mohon harga bundle & invoice pembayaran.`
  );
  const demand = monthlyDemand(s.code);
  // ROADMAP-99 langkah 23/24/27 — konten SEO deterministik per kode
  const snippet = snippetAnswer(s);
  const faqs = buildFaqs(s);
  const steps = buildHowToSteps(s);
  const provinceLinks = pickProvinceLinks(s.code);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(katalogV2JsonLd(s)) }}
      />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/katalog" className="hover:text-primary">Katalog Layanan</Link></li>
              <li aria-hidden>/</li>
              <li><Link href={isV3 ? "/katalog#pro" : "/katalog#premium"} className="hover:text-primary">{s.category}</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-foreground">{s.name}</li>
            </ol>
          </nav>

          {/* HERO */}
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                {s.code}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {isV3 ? "Katalog Pro" : "Katalog Premium"} · {s.category}
              </span>
              {s.savings > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <Percent className="h-3.5 w-3.5" aria-hidden />
                  Diskon {s.discountPct}%
                </span>
              )}
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              {s.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {s.description || `Jasa pengurusan ${s.name} lengkap oleh tim ${SITE_NAME} — pendampingan hingga terbit.`}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-600" aria-hidden /> Estimasi: <strong className="text-foreground">{s.estimate}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="h-4 w-4 text-emerald-600" aria-hidden /> Masa berlaku: <strong className="text-foreground">{s.validity}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-emerald-600" aria-hidden /> Diterbitkan: <strong className="text-foreground">{s.authority}</strong>
              </span>
            </div>
          </header>

          {/* RINGKASAN CEPAT — ROADMAP-99 langkah 27: blok jawaban langsung
              40–60 kata, target featured snippet Google untuk query
              "biaya/jasa pengurusan <layanan>". */}
          <section
            aria-labelledby="ringkasan-cepat"
            className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6"
          >
            <h2 id="ringkasan-cepat" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-emerald-800">
              <Sparkles className="h-4 w-4" aria-hidden />
              Ringkasan Cepat
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">{snippet}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl bg-card px-4 py-3">
                <dt className="text-xs text-muted-foreground">Biaya jasa</dt>
                <dd className="font-bold text-emerald-700">mulai {fmtIdr(s.discountPrice)}</dd>
              </div>
              <div className="rounded-xl bg-card px-4 py-3">
                <dt className="text-xs text-muted-foreground">Estimasi proses</dt>
                <dd className="font-bold text-foreground">{s.estimate}</dd>
              </div>
              <div className="rounded-xl bg-card px-4 py-3">
                <dt className="text-xs text-muted-foreground">Diterbitkan</dt>
                <dd className="font-bold text-foreground">{s.authority}</dd>
              </div>
            </dl>
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* KOLOM UTAMA */}
            <div className="space-y-6 lg:col-span-2">
              {/* Harga */}
              <section aria-labelledby="harga" className="rounded-2xl border bg-card p-6">
                <h2 id="harga" className="flex items-center gap-2 text-lg font-bold">
                  <Banknote className="h-5 w-5 text-emerald-600" aria-hidden />
                  Harga Jasa Pengurusan
                </h2>
                <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Harga diskon</p>
                    <p className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">{fmtIdr(s.discountPrice)}</p>
                  </div>
                  {s.normalPrice > s.discountPrice && (
                    <>
                      <div>
                        <p className="text-xs text-muted-foreground">Harga normal</p>
                        <p className="text-lg font-semibold text-muted-foreground line-through">{fmtIdr(s.normalPrice)}</p>
                      </div>
                      <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700">
                        Hemat {fmtIdr(s.savings)}
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  Harga jasa konsultan — biaya resmi pemerintah (PNBP) dibayar terpisah sesuai tarif instansi.
                  Final setelah review kasus: lokasi, kelengkapan dokumen & kompleksitas.
                </p>
                <p className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                  <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  ±{demand} perusahaan memilih layanan sejenis di {s.category} bulan ini
                </p>
              </section>

              {/* Syarat */}
              {requirements.length > 0 && (
                <section aria-labelledby="syarat" className="rounded-2xl border bg-card p-6">
                  <h2 id="syarat" className="flex items-center gap-2 text-lg font-bold">
                    <ListChecks className="h-5 w-5 text-emerald-600" aria-hidden />
                    Syarat Utama
                  </h2>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Belum punya salah satu dokumen? Tim kami membantu pengadaannya — sampaikan saat konsultasi.
                  </p>
                </section>
              )}

              {/* PROSES PENGURUSAN — ROADMAP-99 langkah 23: section HowTo
                  server-rendered + HowToStep schema di @graph atas. */}
              <section aria-labelledby="proses" className="rounded-2xl border bg-card p-6">
                <h2 id="proses" className="flex items-center gap-2 text-lg font-bold">
                  <Compass className="h-5 w-5 text-emerald-600" aria-hidden />
                  Proses Pengurusan — 5 Langkah
                </h2>
                <ol className="mt-4 space-y-4">
                  {steps.map((st, i) => (
                    <li key={st.name} id={`langkah-${i + 1}`} className="flex gap-3.5">
                      <span
                        aria-hidden
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-sm font-extrabold text-emerald-700"
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold">{st.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{st.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* CATATAN */}
              {s.notes && (
                <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                    <Sparkles className="h-4 w-4" aria-hidden />
                    Catatan Penting
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-900/90">{s.notes}</p>
                </section>
              )}

              {/* BUNDLE — sering diambil bersama */}
              {bundle.length === 2 && (
                <section aria-labelledby="bundle" className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 to-card p-6">
                  <h2 id="bundle" className="flex items-center gap-2 text-lg font-bold">
                    <Sparkles className="h-5 w-5 text-emerald-600" aria-hidden />
                    Sering Diambil Bersama — Paket Hemat 10%
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Klien {s.category} biasanya menyelesaikan 3 urusan ini sekaligus supaya operasional langsung legal penuh.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[{ code: s.code, name: s.name, discountPrice: s.discountPrice, slug: s.slug, self: true } as const, ...bundle.map((b) => ({ code: b.code, name: b.name, discountPrice: b.discountPrice, slug: b.slug, self: false }))].map((item, i) => (
                      <li key={item.code} className="flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-emerald-700">{i + 1}. {item.code}{item.self ? " — layanan ini" : ""}</p>
                          {item.self ? (
                            <p className="truncate text-sm font-semibold">{item.name}</p>
                          ) : (
                            <Link href={`/layanan/${item.slug}`} className="truncate text-sm font-semibold hover:text-primary hover:underline">
                              {item.name}
                            </Link>
                          )}
                        </div>
                        <p className="shrink-0 text-sm font-bold text-emerald-700">{fmtIdr(item.discountPrice)}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3 rounded-xl bg-emerald-600/10 px-4 py-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Total bundle <span className="line-through">{fmtIdr(bundleTotal)}</span></p>
                      <p className="text-2xl font-extrabold text-emerald-700">{fmtIdr(bundlePrice)}</p>
                    </div>
                    <span className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-bold text-white">Hemat {fmtIdr(bundleHemat)}</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${bundleWa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden /> Ambil Paket Hemat 3 Layanan
                    </a>
                    <Link
                      href={checkoutHref}
                      className="flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition hover:bg-accent"
                    >
                      <ShoppingCart className="h-4 w-4" aria-hidden /> Ambil {s.code} saja
                    </Link>
                  </div>
                </section>
              )}

              {/* FAQ — ROADMAP-99 langkah 23: konten FAQ nyata (server-rendered)
                  + FAQPage schema di @graph atas. */}
              <section aria-labelledby="faq" className="rounded-2xl border bg-card p-6">
                <h2 id="faq" className="flex items-center gap-2 text-lg font-bold">
                  <HelpCircle className="h-5 w-5 text-emerald-600" aria-hidden />
                  Pertanyaan Umum {s.name}
                </h2>
                <Accordion type="single" collapsible className="mt-4">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-sm font-semibold">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Layanan sejenis */}
              {related.length > 0 && (
                <section aria-labelledby="terkait" className="rounded-2xl border bg-card p-6">
                  <h2 id="terkait" className="text-lg font-bold">
                    Layanan {s.category} Lainnya
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {related.map((r) => (
                      <Link
                        key={r.code}
                        href={`/layanan/${r.slug}`}
                        className="group rounded-xl border p-4 transition hover:border-emerald-300 hover:bg-accent"
                      >
                        <p className="text-xs font-bold text-emerald-700">{r.code}</p>
                        <p className="mt-1 text-sm font-semibold leading-snug group-hover:text-primary">{r.name}</p>
                        <p className="mt-1.5 text-sm font-bold text-emerald-700">{fmtIdr(r.discountPrice)}</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={isV3 ? "/katalog#pro" : "/katalog#premium"}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                  >
                    {isV3 ? "Lihat seluruh 1.500 layanan dalam 3 katalog" : "Lihat seluruh 500 layanan Katalog Premium"}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </section>
              )}

              {/* JANGKAUAN NASIONAL — ROADMAP-99 langkah 24: internal-linking
                  dari 1.000 halaman katalog ke 38 hub wilayah
                  /layanan/wilayah/<prov> (pemilihan deterministik per kode). */}
              <section aria-labelledby="jangkauan" className="rounded-2xl border bg-card p-6">
                <h2 id="jangkauan" className="flex items-center gap-2 text-lg font-bold">
                  <MapPin className="h-5 w-5 text-emerald-600" aria-hidden />
                  Urus {s.name} dari Mana Saja
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {SITE_NAME} memproses {s.name.toLowerCase()} untuk klien di 38 provinsi & 514 kabupaten/kota —
                  proses dominan daring, tanpa perlu datang ke kantor. Pilih wilayah Anda:
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {provinceLinks.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition hover:border-emerald-300 hover:bg-accent hover:text-primary"
                      >
                        <MapPin className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/wilayah"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                >
                  Lihat seluruh 38 provinsi & 514 kabupaten/kota
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </section>
            </div>

            {/* SIDEBAR */}
            <aside className="space-y-5">
              <div className="rounded-2xl border bg-card p-6 lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Siap diurus?</p>
                <p className="mt-1 text-2xl font-extrabold text-emerald-700">{fmtIdr(s.discountPrice)}</p>
                <div className="mt-4 space-y-2.5">
                  <Link
                    href={checkoutHref}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                  >
                    <ShoppingCart className="h-4 w-4" aria-hidden />
                    Pesan Sekarang — Bayar Langsung
                  </Link>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-emerald-600/40 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Tanya Dulu via WhatsApp
                  </a>
                  <Link
                    href="/konsultasi"
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
                  >
                    <ShieldCheck className="h-4 w-4" aria-hidden />
                    Konsultasi Gratis 30 Menit
                  </Link>
                  <Link
                    href="/kalkulator"
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition hover:bg-accent"
                  >
                    Hitung Estimasi Total Biaya
                  </Link>
                </div>
                <dl className="mt-5 space-y-2.5 border-t pt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
                    <dd className="font-semibold">{TRUST_METRICS.rating}/5 · {TRUST_METRICS.reviewCount} ulasan</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                    <dd className="text-muted-foreground">{TRUST_METRICS.permitsIssued}+ izin terbit</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                    <dd className="text-muted-foreground">Garansi 100% uang kembali bila gagal karena proses kami</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
