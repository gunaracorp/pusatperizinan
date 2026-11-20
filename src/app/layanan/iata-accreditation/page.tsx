import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, CheckCircle2, ClipboardCheck, Compass,
  Globe2, LineChart, MessageCircle, Plane, ShieldCheck, Sparkles,
} from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import { ogImageUrl } from "@/lib/og-template";
import { IataMotionStyles, Reveal } from "@/components/iata/iata-motion";
import {
  IATA_PRODUCTS, IATA_SERVICES, IATA_PROCESS, IATA_DISCLAIMER,
  IATA_SOURCES, IATA_URLS, fmtIdrIata, iataWaLink, IATA_WA_UMUM,
  HARGA_CATATAN_PENDEK, PROMO_LABEL, absIataUrl,
} from "@/lib/iata";

// ============================================================
// PUSATPERIZINAN.COM — PILLAR PAGE: /layanan/iata-accreditation
// Pusat seluruh informasi & produk akreditasi IATA (BAGIAN 4).
// Konsultan independen — tanpa klaim afiliasi IATA, tanpa janji
// persetujuan. Harga dari src/lib/iata.ts (single source of truth).
// ============================================================

export const metadata: Metadata = {
  title: "IATA Accreditation Indonesia | Konsultasi GoLite, GoStandard & GoGlobal",
  description:
    "Konsultasi dan pendampingan akreditasi IATA untuk travel agent Indonesia. Pelajari GoLite, GoStandard dan GoGlobal, persyaratan, biaya jasa, serta pemeriksaan kelayakan perusahaan.",
  alternates: langAlternates("/layanan/iata-accreditation"),
  openGraph: {
    images: [
      {
        url: ogImageUrl({
          title: "Konsultasi Akreditasi IATA untuk Travel Agent Indonesia",
          subtitle: "GoLite · GoStandard · GoGlobal",
          category: "PusatPerizinan.com — Licensing Consultancy Services",
        }),
        width: 1200,
        height: 630,
        alt: "Konsultasi Akreditasi IATA untuk Travel Agent Indonesia",
      },
    ],
    title: "IATA Accreditation Indonesia | Konsultasi GoLite, GoStandard & GoGlobal",
    description:
      "Konsultasi dan pendampingan akreditasi IATA untuk travel agent Indonesia — GoLite, GoStandard, dan GoGlobal.",
    url: `${SITE_URL}/layanan/iata-accreditation`,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const PANDUAN_LINKS: { href: string; label: string; desc: string }[] = [
  {
    href: IATA_URLS.panduan.overview,
    label: "Panduan Lengkap IATA Accreditation Indonesia",
    desc: "Pengertian, manfaat, hubungan dengan BSP, dan tahapan permohonan.",
  },
  {
    href: IATA_URLS.panduan.persyaratan,
    label: "Persyaratan IATA Indonesia",
    desc: "Dokumen legal, izin usaha perjalanan, dan dokumen finansial yang diperiksa.",
  },
  {
    href: IATA_URLS.panduan.perbedaan,
    label: "Perbedaan GoLite, GoStandard & GoGlobal",
    desc: "Tabel komparasi model, cash facility, dan profil perusahaan yang sesuai.",
  },
  {
    href: IATA_URLS.panduan.biaya,
    label: "Biaya Akreditasi IATA",
    desc: "Memisahkan jasa konsultasi dari biaya resmi IATA dan pihak ketiga.",
  },
  {
    href: IATA_URLS.panduan.proses,
    label: "Proses Pengajuan IATA",
    desc: "Dari pemeriksaan profil perusahaan hingga keputusan akhir IATA.",
  },
  {
    href: IATA_URLS.panduan.financialSecurity,
    label: "Financial Security IATA",
    desc: "Pengertian, fungsi, dan hal yang perlu dipersiapkan sebelum mengajukan.",
  },
];

const MENGAPA = [
  "Mengidentifikasi model akreditasi yang relevan.",
  "Memeriksa kesesuaian dokumen perusahaan.",
  "Mengevaluasi kesiapan perizinan usaha.",
  "Mengidentifikasi kebutuhan dokumen keuangan.",
  "Memetakan kekurangan yang perlu diperbaiki.",
  "Menyusun tahapan persiapan.",
  "Mengurangi kesalahan administratif dalam proses persiapan aplikasi.",
];

const SIAPA = [
  "Travel agent yang baru berdiri.",
  "Perusahaan travel yang sudah beroperasi.",
  "Agen penjualan tiket pesawat.",
  "Perusahaan tour and travel.",
  "Perusahaan perjalanan yang ingin mengembangkan jaringan distribusi.",
  "Grup usaha perjalanan dengan beberapa entitas.",
  "Perusahaan yang ingin mengevaluasi perubahan model akreditasi.",
];

const FAQ = [
  {
    q: "Apakah PusatPerizinan.com bagian dari IATA?",
    a: "Tidak. PusatPerizinan.com (PT Top Konsultan Internasional) adalah konsultan independen yang menyediakan jasa konsultasi dan pendampingan persiapan. Kami bukan cabang, agen resmi, atau mitra resmi IATA, dan tidak menerbitkan akreditasi IATA. Keputusan akreditasi sepenuhnya merupakan kewenangan IATA.",
  },
  {
    q: "Model akreditasi IATA mana yang cocok untuk perusahaan kami?",
    a: "Kecocokan model bergantung pada kebutuhan pembayaran (cash facility atau tidak), kesiapan dokumen keuangan, dan struktur usaha — satu lokasi di Indonesia (GoLite/GoStandard) atau operasi multi-negara (GoGlobal). Pemeriksaan kelayakan awal kami membantu memetakan hal ini sebelum Anda memutuskan.",
  },
  {
    q: "Apakah harga di halaman ini adalah biaya resmi IATA?",
    a: "Tidak. Harga yang ditampilkan adalah jasa konsultasi dan pendampingan PusatPerizinan.com. Biaya resmi IATA (application fee, annual fee), financial security, audit, notaris, penerjemahan tersumpah, biaya bank, dan pajak tidak termasuk kecuali dinyatakan tertulis dalam quotation.",
  },
  {
    q: "Apakah persetujuan akreditasi dijamin?",
    a: "Tidak. Tidak ada konsultan yang dapat menjamin persetujuan. IATA menentukan persyaratan, mengevaluasi permohonan, dan mengambil keputusan akhir. Peran kami adalah membantu perusahaan mempersiapkan dokumen dan proses secara selengkap dan seakurat mungkin.",
  },
  {
    q: "Apakah checklist persyaratan IATA Indonesia selalu sama?",
    a: "Tidak. Checklist resmi IATA bersifat dinamis dan difilter berdasarkan jenis akreditasi, jenis lokasi, jenis permohonan, dan kategori mandatory/optional. Karena itu konten kami selalu menyebut bahwa checklist final mengikuti kondisi pemohon dan ketentuan terbaru IATA.",
  },
];

export default function IataAccreditationPillarPage() {
  const wa = iataWaLink(IATA_WA_UMUM);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Konsultasi dan Pendampingan Akreditasi IATA untuk Travel Agent Indonesia",
      serviceType: "Professional Licensing, Accreditation & Corporate Compliance Consultancy",
      description:
        "Layanan konsultasi dan pendampingan persiapan akreditasi IATA (GoLite, GoStandard, GoGlobal) untuk travel agent di Indonesia: pemeriksaan kelayakan, review dokumen legal, izin usaha perjalanan, kesiapan keuangan, dan pendampingan aplikasi melalui saluran resmi IATA.",
      url: absIataUrl(IATA_URLS.pillar),
      provider: {
        "@type": "ProfessionalService",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: { "@type": "Country", name: "Indonesia" },
      offers: IATA_PRODUCTS.map((p) => ({
        "@type": "Offer",
        name: `${p.namaPendek} — ${p.model}`,
        priceCurrency: "IDR",
        price: p.hargaPromo,
        url: absIataUrl(p.url),
        availability: "https://schema.org/InStock",
      })),
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
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
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
          <span className="font-medium text-stone-700" aria-current="page">IATA Accreditation Indonesia</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="iata-hero-grad bg-[radial-gradient(60%_60%_at_20%_20%,rgba(16,185,129,.35),transparent_60%),radial-gradient(50%_50%_at_80%_30%,rgba(251,191,36,.18),transparent_55%)]" aria-hidden />
        <div className="iata-orb left-[6%] top-[18%] h-64 w-64 bg-emerald-500/30" aria-hidden style={{ animationDelay: "-4s" }} />
        <div className="iata-orb right-[10%] top-[8%] h-56 w-56 bg-amber-400/20" aria-hidden style={{ animationDelay: "-9s" }} />
        <div className="iata-orb left-[38%] bottom-[4%] h-48 w-48 bg-teal-400/20" aria-hidden style={{ animationDelay: "-6s" }} />

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-200">
              <Plane className="h-3.5 w-3.5" aria-hidden />
              Licensing Consultancy Services — Akreditasi IATA
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Konsultasi dan Pendampingan Akreditasi IATA untuk Travel Agent Indonesia
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-3xl leading-relaxed text-emerald-100/90 md:text-lg">
              Persiapkan perusahaan perjalanan Anda untuk mengikuti proses akreditasi IATA dengan
              pemeriksaan legalitas, kesiapan dokumen, evaluasi finansial, dan pendampingan aplikasi
              berdasarkan model akreditasi yang sesuai dengan kebutuhan bisnis.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={IATA_URLS.konsultasi}
                className="iata-shine relative flex min-h-12 items-center gap-2 overflow-hidden rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300"
              >
                <Compass className="h-4 w-4" aria-hidden /> Konsultasikan Akreditasi IATA Anda
              </Link>
              <Link
                href={IATA_URLS.cekKelayakan}
                className="flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold transition hover:bg-white/10"
              >
                <ClipboardCheck className="h-4 w-4" aria-hidden /> Periksa Kelayakan Perusahaan
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold transition hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-4xl px-4 py-14" aria-labelledby="intro">
        <Reveal>
          <h2 id="intro" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Mengenal Akreditasi IATA untuk Perusahaan Perjalanan
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-5 space-y-4 leading-relaxed text-stone-700">
            <p>
              Akreditasi dari International Air Transport Association (IATA) merupakan salah satu
              bentuk pengakuan dalam ekosistem industri perjalanan udara internasional. Program
              akreditasi IATA membantu travel agent memenuhi kerangka persyaratan dan prosedur yang
              berlaku untuk berpartisipasi dalam Agency Programme dan sistem Billing and Settlement
              Plan (BSP), sesuai model akreditasi serta ketentuan pasar yang bersangkutan.
            </p>
            <p>
              Bagi perusahaan perjalanan di Indonesia, persiapan akreditasi tidak hanya menyangkut
              pengisian formulir. Perusahaan perlu memahami bentuk badan usaha, perizinan
              perjalanan, struktur pengelolaan, dokumen keuangan, informasi lokasi, serta
              persyaratan khusus yang ditentukan IATA.
            </p>
            <p>
              {SITE_NAME} menyediakan layanan konsultasi dan pendampingan untuk membantu perusahaan
              mempersiapkan proses tersebut secara sistematis.
            </p>
          </div>
        </Reveal>
      </section>

      {/* TIGA MODEL AKREDITASI */}
      <section className="bg-stone-50 py-14" aria-labelledby="model">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="model" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Mengenal Tiga Model Akreditasi
            </h2>
            <p className="mt-2 max-w-3xl text-stone-600">
              Tiga model dengan kebutuhan finansial dan ruang lingkup yang berbeda — pilih
              berdasarkan kebutuhan pembayaran dan struktur usaha Anda.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {IATA_PRODUCTS.map((p, i) => (
              <Reveal key={p.kode} delay={i * 140} as="article" className={p.kode === "GOSTANDARD" ? "iata-beam h-full" : "h-full"}>
                <div className="iata-card flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-emerald-700">{p.kode}</span>
                  <h3 className="mt-1.5 text-xl font-bold text-stone-900">{p.namaPendek}</h3>
                  <p className="mt-1 text-xs font-semibold text-emerald-800">{p.model}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{p.deskripsiModel}</p>
                  <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3">
                    <p className="text-xs font-semibold text-stone-500">Harga jasa konsultasi</p>
                    <p className="mt-0.5 text-lg font-extrabold text-emerald-900">
                      {p.hargaMulaiDari ? "Mulai " : ""}{fmtIdrIata(p.hargaPromo)}
                      {" "}
                      <span className="text-xs font-semibold text-amber-600">— {PROMO_LABEL}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-stone-400 line-through">{fmtIdrIata(p.hargaKatalog)}</p>
                  </div>
                  <Link
                    href={p.url}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                  >
                    {p.kode === "GOGLOBAL" ? "Konsultasikan" : "Pelajari"} IATA {p.namaPendek.replace("IATA ", "")}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 text-xs leading-relaxed text-stone-500">*{HARGA_CATATAN_PENDEK}</p>
          </Reveal>
        </div>
      </section>

      {/* MENGAPA KONSULTASI */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="mengapa">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 id="mengapa" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Mengapa Memilih Konsultasi Sebelum Mengajukan IATA?
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600">
              Pengajuan tanpa pemeriksaan awal dapat menimbulkan risiko kekurangan dokumen,
              ketidaksesuaian izin usaha, masalah pada struktur perusahaan, ketidaksiapan laporan
              keuangan, dan permintaan klarifikasi tambahan.
            </p>
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-relaxed text-emerald-900">
              <p className="flex items-start gap-2 font-semibold">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                Konsultan tidak dapat menjamin persetujuan — persetujuan merupakan kewenangan IATA.
              </p>
              <p className="mt-2 text-emerald-800">
                Yang dapat kami lakukan: memastikan perusahaan Anda masuk ke proses dengan dokumen
                selengkap dan seakurat mungkin.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {MENGAPA.map((m) => (
                <li key={m} className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* LAYANAN A–H */}
      <section className="bg-stone-50 py-14" aria-labelledby="layanan">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="layanan" className="text-2xl font-bold text-stone-900 md:text-3xl">Layanan Kami</h2>
            <p className="mt-2 max-w-3xl text-stone-600">
              Delapan blok layanan yang dapat disesuaikan dengan ruang lingkup quotation tertulis.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IATA_SERVICES.map((s, i) => (
              <Reveal key={s.kode} delay={i * 90} as="article" className="h-full">
                <div className="iata-card h-full rounded-2xl border border-stone-200 bg-white p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-sm font-bold text-white" aria-hidden>
                    {s.kode}
                  </span>
                  <h3 className="mt-3 font-bold leading-snug text-stone-900">{s.judul}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROSES 01–08 */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="proses">
        <Reveal>
          <h2 id="proses" className="text-2xl font-bold text-stone-900 md:text-3xl">Proses Kerja</h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            Delapan tahap transparan — Anda selalu tahu posisi dokumen dan status pekerjaan.
          </p>
        </Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IATA_PROCESS.map((t, i) => (
            <Reveal key={t.step} delay={i * 80} as="li" className="h-full">
              <div className="iata-card h-full rounded-2xl border border-stone-200 bg-white p-5">
                <span className="font-mono text-sm font-extrabold text-amber-600">{t.step}</span>
                <h3 className="mt-1 font-bold text-stone-900">{t.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* SIAPA YANG DAPAT BERKONSULTASI */}
      <section className="bg-stone-50 py-14" aria-labelledby="siapa">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="siapa" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Siapa yang Dapat Berkonsultasi?
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SIAPA.map((s, i) => (
              <Reveal key={s} delay={i * 70} as="li" className="h-full">
                <div className="flex h-full items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                  {s}
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={160}>
            <p className="mt-5 text-sm text-stone-500">
              Kelayakan aktual tetap harus diperiksa berdasarkan ketentuan IATA dan hukum setempat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PANDUAN TERKAIT — internal linking (BAGIAN 13) */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="panduan">
        <Reveal>
          <h2 id="panduan" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Panduan IATA Terkait
          </h2>
          <p className="mt-2 text-stone-600">Perdalam pemahaman sebelum menentukan model akreditasi.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PANDUAN_LINKS.map((l, i) => (
            <Reveal key={l.href} delay={i * 80} className="h-full">
              <Link
                href={l.href}
                className="iata-card block h-full rounded-2xl border border-stone-200 bg-white p-5"
              >
                <h3 className="font-bold leading-snug text-stone-900">{l.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{l.desc}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  Baca panduan <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone-50 py-14" aria-labelledby="faq">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <h2 id="faq" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Pertanyaan Umum Akreditasi IATA
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
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
        </div>
      </section>

      {/* SUMBER RESMI + DISCLAIMER */}
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
      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="cta-akhir">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-8 text-white md:p-12">
            <div className="iata-orb right-[-40px] top-[-30px] h-56 w-56 bg-amber-400/25" aria-hidden />
            <h2 id="cta-akhir" className="relative text-2xl font-bold md:text-3xl">
              Ingin mengetahui model akreditasi IATA yang paling sesuai untuk perusahaan Anda?
            </h2>
            <p className="relative mt-3 max-w-2xl leading-relaxed text-emerald-100/90">
              Konsultasikan profil perusahaan, izin usaha, aktivitas bisnis, dan kesiapan dokumen
              kepada tim {SITE_NAME}.
            </p>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <Link
                href={IATA_URLS.konsultasi}
                className="iata-shine relative flex min-h-12 items-center gap-2 overflow-hidden rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300"
              >
                <Sparkles className="h-4 w-4" aria-hidden /> MULAI KONSULTASI IATA
              </Link>
              <Link
                href={IATA_URLS.cekKelayakan}
                className="flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold transition hover:bg-white/10"
              >
                <ClipboardCheck className="h-4 w-4" aria-hidden /> Periksa Kelayakan Perusahaan
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Mikro-trust: nilai layanan */}
      <section className="mx-auto max-w-6xl px-4 pb-16" aria-label="Nilai pendekatan kami">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Globe2, t: "Perspektif global", d: "Pendekatan mengikuti kerangka IATA dan ketentuan pasar Indonesia." },
            { icon: LineChart, t: "Evaluasi finansial", d: "Kesiapan dokumen keuangan dipetakan sesuai model akreditasi." },
            { icon: BadgeCheck, t: "Transparansi", d: "Ruang lingkup, biaya, dan pengecualian dikunci dalam quotation tertulis." },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 100} className="h-full">
              <div className="flex h-full items-start gap-3 rounded-2xl border border-stone-200 bg-white p-5">
                <v.icon className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" aria-hidden />
                <div>
                  <h3 className="font-bold text-stone-900">{v.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{v.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
