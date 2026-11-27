import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Building2, CheckCircle2, Clock, FileText,
  Globe, LayoutTemplate, Mail, MessageCircle,
  Search, ShieldCheck, Smartphone, Sparkles, Wallet,
} from "lucide-react";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import { ogImageUrl } from "@/lib/og-template";

// ============================================================
// PUSATPERIZINAN.COM — /jasa-pembuatan-website-company-profile
// Halaman produk resmi: JASA PEMBUATAN WEBSITE COMPANY PROFILE
// LENGKAP.
// Kode item  : PP-WCP-001 (standar internal, bukan kode resmi
//              pemerintah) — identitas konsisten antara WhatsApp
//              Business, website, invoice, dan CRM.
// Harga      : Rp1.500.000 all-in — sudah termasuk DOMAIN WEB.ID.
//              Domain lain (.com/.id/.co.id/.net/.org dll) nambah
//              Rp500.000 → total Rp2.000.000.
// Skema      : WAJIB DP 50% dibayar dulu saat mulai; pelunasan
//              saat website live.
// ============================================================

const KODE_ITEM = "PP-WCP-001";
const HARGA_WEB_ID = 1_500_000;
const BIAYA_DOMAIN_LAIN = 500_000;
const HARGA_DOMAIN_LAIN = HARGA_WEB_ID + BIAYA_DOMAIN_LAIN;
const DP_WEB_ID = 750_000;
const DP_DOMAIN_LAIN = 1_000_000;

const fmtIdr = (n: number): string => `Rp${n.toLocaleString("id-ID")}`;

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website Company Profile All-In Rp1,5 Juta + Domain | PusatPerizinan.com",
  description:
    "Jasa pembuatan website company profile lengkap Rp1.500.000 all-in: domain web.id gratis termasuk, hosting 1 tahun, SSL, 6 halaman lengkap, responsif, SEO on-page (schema, sitemap, Search Console), tombol WhatsApp, Google Analytics. Domain lain nambah Rp500rb. WAJIB DP 50%.",
  keywords: [
    "jasa pembuatan website company profile",
    "jasa bikin website perusahaan",
    "jasa website company profile murah",
    "harga jasa pembuatan website company profile",
    "website company profile 1.5 juta",
    "jasa pembuatan website all in domain",
    "jasa website murah seo",
    "pembuatan website web.id",
    "jasa bikin website usaha lengkap",
    "website company profile profesional indonesia",
  ],
  alternates: langAlternates("/jasa-pembuatan-website-company-profile"),
  openGraph: {
    images: [
      {
        url: ogImageUrl({
          title: "Jasa Pembuatan Website Company Profile Lengkap",
          subtitle: `Kode item ${KODE_ITEM} · Rp1.500.000 all-in + domain web.id · DP 50%`,
          category: "Website & Profil Digital Bisnis",
        }),
        width: 1200,
        height: 630,
        alt: "Jasa Pembuatan Website Company Profile — Rp1.500.000 All-In Domain web.id",
      },
    ],
    title: "Jasa Pembuatan Website Company Profile — Rp1.500.000 All-In + Domain web.id",
    description:
      "Website company profile lengkap: domain web.id, hosting 1 tahun, SSL, 6 halaman, responsif, SEO on-page, tombol WhatsApp, Google Analytics. Domain lain +Rp500rb. WAJIB DP 50%.",
    url: `${SITE_URL}/jasa-pembuatan-website-company-profile`,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  `Halo ${SITE_NAME}, saya tertarik dengan JASA PEMBUATAN WEBSITE COMPANY PROFILE LENGKAP (kode item ${KODE_ITEM}) — Rp1.500.000 all-in domain web.id. Mohon dibantu konsultasi dan penawaran resmi. Terima kasih.`,
)}`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Jasa Pembuatan Website Company Profile Lengkap",
    serviceType: "Pengembangan Website & Profil Digital Bisnis",
    category: "Website Company Profile — Situs Perusahaan",
    description:
      "Jasa pembuatan website company profile lengkap Rp1.500.000 all-in dengan domain web.id sudah termasuk: hosting 1 tahun, SSL, 6 halaman standar (Beranda, Tentang, Produk/Layanan, Portofolio, Kontak, Artikel), desain responsif, SEO on-page (meta, schema JSON-LD, sitemap.xml, robots.txt, pendaftaran Google Search Console), tombol WhatsApp, form kontak, dan Google Analytics. Domain lain (.com, .id, .co.id, dll) tambah Rp500.000. Skema pembayaran wajib DP 50% di awal, pelunasan saat website live.",
    url: `${SITE_URL}/jasa-pembuatan-website-company-profile`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: CONTACT.phoneDisplay,
    },
    areaServed: { "@type": "Country", name: "Indonesia" },
    offers: [
      {
        "@type": "Offer",
        name: "Website Company Profile + domain web.id",
        priceCurrency: "IDR",
        price: HARGA_WEB_ID,
        url: `${SITE_URL}/jasa-pembuatan-website-company-profile`,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: HARGA_WEB_ID,
          priceCurrency: "IDR",
          description: "All-in termasuk domain web.id 1 tahun, hosting 1 tahun, SSL, 6 halaman, SEO on-page. DP wajib 50% (Rp750.000), pelunasan saat website live.",
        },
      },
      {
        "@type": "Offer",
        name: "Website Company Profile + domain lain (.com/.id/.co.id/dll)",
        priceCurrency: "IDR",
        price: HARGA_DOMAIN_LAIN,
        url: `${SITE_URL}/jasa-pembuatan-website-company-profile`,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: HARGA_DOMAIN_LAIN,
          priceCurrency: "IDR",
          description: "Rp1.500.000 + Rp500.000 untuk domain premium (.com, .id, .co.id, .net, .org dll). DP wajib 50% (Rp1.000.000), pelunasan saat website live.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Paket & Layanan Digital", item: `${SITE_URL}/katalog` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Jasa Pembuatan Website Company Profile Lengkap",
        item: `${SITE_URL}/jasa-pembuatan-website-company-profile`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Alur Pemesanan Jasa Pembuatan Website Company Profile",
    description: "Lima langkah pemesanan website company profile all-in di PusatPerizinan.com, dari konsultasi sampai website live.",
    totalTime: "P7D",
    step: [
      { "@type": "HowToStep", name: "Konsultasi & pilih domain", text: "Hubungi WhatsApp resmi, sebut kode item PP-WCP-001, tentukan nama domain (web.id sudah termasuk; domain lain tambah Rp500.000)." },
      { "@type": "HowToStep", name: "DP 50% & brief data", text: "DP 50% dibayar dulu saat mulai (Rp750.000 untuk web.id / Rp1.000.000 untuk domain lain); kirim data usaha, logo, foto, dan teks dasar." },
      { "@type": "HowToStep", name: "Pembangunan website", text: "Tim membangun 6 halaman, mengisi konten, mendesain responsif, dan menerapkan SEO on-page lengkap." },
      { "@type": "HowToStep", name: "Review & revisi", text: "Anda mereview versi preview; revisi sesuai catatan hingga konten dan tampilan sesuai kebutuhan." },
      { "@type": "HowToStep", name: "Pelunasan & website live", text: "Pelunasan dibayar, domain & hosting diaktifkan, website resmi live, sitemap didaftarkan ke Google Search Console, dan akses diserahkan ke Anda." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Apa saja yang termasuk dalam harga Rp1.500.000?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All-in: domain web.id 1 tahun, hosting 1 tahun, SSL, 6 halaman standar (Beranda, Tentang Kami, Produk/Layanan, Portofolio/Galeri, Kontak, Artikel), desain responsif mobile/tablet/desktop, pengisian konten, tombol WhatsApp, form kontak, Google Analytics, dan SEO on-page (meta per halaman, schema JSON-LD, sitemap.xml, robots.txt, pendaftaran Google Search Console).",
        },
      },
      {
        "@type": "Question",
        name: "Kalau mau domain selain web.id, berapa tambahannya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Domain premium lain seperti .com, .id, .co.id, .net, atau .org menambah Rp500.000 sekali di awal — total menjadi Rp2.000.000. Biaya pembaruan domain tahun berikutnya mengikuti harga registrar dan diinformasikan transparan sebelum pembelian.",
        },
      },
      {
        "@type": "Question",
        name: "Bagaimana skema pembayarannya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WAJIB DP 50% dibayar dulu saat pengerjaan dimulai: Rp750.000 untuk paket domain web.id, Rp1.000.000 untuk domain premium. Pelunasan sisanya hanya dibayar setelah website selesai dan live. Termin resmi tertulis di penawaran/invoice.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa lama website bisa jadi dan online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "5-7 hari kerja setelah DP masuk dan data (logo, foto, teks dasar) lengkap — sampai website live dengan domain aktif. Konten artikel tambahan atau fitur khusus di luar cakupan dihitung terpisah dan disepakati tertulis dulu.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah SEO-nya benar-benar diatur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya. Setiap halaman mendapat meta title & description unik, heading terstruktur, schema JSON-LD (Organization, WebSite, BreadcrumbList), sitemap.xml + robots.txt, canonical URL, dan Open Graph. Sitemap didaftarkan ke Google Search Console agar halaman cepat terindeks — fondasi SEO yang benar untuk website baru.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah website bisa diakses dari HP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya, desain responsif penuh untuk smartphone, tablet, dan desktop — sekaligus cepat dimuat, karena mayoritas pencari jasa di Indonesia menggunakan ponsel.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah saya bisa mengelola konten sendiri setelah serah terima?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bisa. Semua akses (domain, hosting, admin website) diserahkan atas nama Anda disertai panduan singkat pengelolaan. Perubahan konten besar atau redesign berikutnya bisa dipesan terpisah dengan harga khusus klien lama.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah harus punya NIB atau PT dulu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tidak wajib — usaha perorangan bisa langsung pesan. Namun website dengan legalitas tampil lebih dipercaya klien & instansi; kalau belum punya, kami bisa uruskan NIB atau pendirian PT/CV sekalian di satu pintu.",
        },
      },
    ],
  },
];

const FITUR_TERMASUK = [
  "Domain web.id 1 tahun — GRATIS termasuk dalam harga all-in",
  "Hosting cepat 1 tahun + SSL (gembok keamanan https://)",
  "6 halaman lengkap: Beranda, Tentang Kami, Produk/Layanan, Portofolio/Galeri, Kontak, Artikel",
  "Desain responsif — rapi di smartphone, tablet, dan desktop",
  "Konten diisi tim kami dari data & bahan Anda (bukan template kosong)",
  "SEO on-page: meta title & description unik per halaman + heading terstruktur",
  "Schema JSON-LD: Organization, WebSite, BreadcrumbList — sinyal kuat ke Google",
  "sitemap.xml + robots.txt + URL canonical + Open Graph siap dibaca mesin pencari",
  "Pendaftaran Google Search Console & submit sitemap — percepat indeks Google",
  "Tombol WhatsApp langsung ke nomor bisnis Anda + form kontak masuk email",
  "Google Analytics 4 terpasang — pantau pengunjung dari hari pertama",
  "Serah terima akses domain, hosting & admin + panduan pengelolaan",
];

const OPSI_DOMAIN = [
  {
    label: "Domain web.id (termasuk all-in)",
    harga: fmtIdr(HARGA_WEB_ID),
    dp: `DP 50% ${fmtIdr(DP_WEB_ID)}`,
    desc: "Domain resmi Indonesia untuk identitas usaha — sudah dibayar 1 tahun pertama, tanpa tambahan biaya.",
    highlight: true,
  },
  {
    label: "Domain lain: .com / .id / .co.id / .net / .org (dll)",
    harga: `${fmtIdr(HARGA_DOMAIN_LAIN)} (+${fmtIdr(BIAYA_DOMAIN_LAIN)})`,
    dp: `DP 50% ${fmtIdr(DP_DOMAIN_LAIN)}`,
    desc: "Domain premium internasional/nasional — biaya domain tahun berikutnya mengikuti harga registrar, diinformasikan transparan.",
    highlight: false,
  },
];

const TAHAPAN = [
  "Konsultasi & pilih domain: sebut kode item PP-WCP-001, tentukan nama domain yang diinginkan.",
  "DP 50% wajib — Rp750.000 (web.id) atau Rp1.000.000 (domain premium); kirim data & bahan (logo, foto, teks dasar).",
  "Pembangunan: 6 halaman dibangun, konten diisi, SEO on-page & schema dipasang.",
  "Review preview: Anda cek versi pra-rilis, beri catatan, kami revisi.",
  "Pelunasan → website live: domain & hosting aktif, sitemap masuk Google Search Console, akses diserahkan + panduan.",
];

const KEUNGGULAN = [
  "Dibangun tim yang mengelola website 11.000+ halaman dengan praktik SEO terbukti",
  "SEO on-page lengkap sejak hari pertama — bukan sekadar 'ada website'",
  "Harga transparan & tertulis: Rp1.500.000 all-in (web.id) atau Rp2.000.000 (domain premium)",
  "Terintegrasi layanan legalitas usaha: NIB, PT, CV, company profile — satu pintu",
  "Proses jelas: brief → DP → build → review → pelunasan → live",
  "Komunikasi cepat via WhatsApp resmi 0812-6999-9910",
];

export default function JasaWebsiteCompanyProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/katalog" className="hover:text-emerald-700">Katalog Layanan</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">
            Jasa Pembuatan Website Company Profile
          </span>
        </div>
      </nav>

      {/* HERO + HARGA */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.5fr_1fr] md:py-16">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-emerald-400/15 px-3 py-1 font-mono text-xs font-bold tracking-wider text-emerald-300">
                {KODE_ITEM}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                Website &amp; Profil Digital Bisnis
              </span>
              <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-emerald-950">
                All-In + Domain web.id
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Jasa Pembuatan Website Company Profile Lengkap — Rp1,5 Juta All-In + Domain
            </h1>
            <p className="mt-4 max-w-2xl text-emerald-100/90 leading-relaxed md:text-lg">
              Website resmi perusahaan Anda yang online 24 jam: domain web.id sudah
              termasuk, hosting 1 tahun, SSL, 6 halaman lengkap, desain responsif,
              dan SEO on-page yang disusun benar sejak hari pertama — bukan sekadar
              &quot;ada website&quot;, tapi website yang siap bersaing di Google.
            </p>
            <p className="mt-3 max-w-2xl text-emerald-100/75 leading-relaxed">
              Mau domain lain (.com, .id, .co.id, dll)? Tambah Rp500.000 — total
              Rp2.000.000. Skema pembayaran aman: wajib DP 50% di awal, pelunasan
              hanya setelah website live.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> Konsultasi via WhatsApp
              </a>
              <Link
                href="/konsultasi"
                className="flex min-h-11 items-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Ajukan Konsultasi Gratis
              </Link>
            </div>
          </div>

          {/* KARTU HARGA */}
          <aside className="h-fit rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur md:sticky md:top-24">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Harga all-in — domain web.id
            </p>
            <p className="mt-2 text-3xl font-extrabold text-amber-400 md:text-4xl">{fmtIdr(HARGA_WEB_ID)}</p>
            <p className="mt-1 text-sm font-semibold text-emerald-300">
              Domain premium lain +{fmtIdr(BIAYA_DOMAIN_LAIN)} · kode item{" "}
              <span className="font-mono">{KODE_ITEM}</span>
            </p>
            <dl className="mt-4 space-y-2 rounded-xl bg-emerald-400/10 px-3 py-3 text-xs leading-relaxed text-emerald-100/90">
              <div className="flex justify-between gap-3">
                <dt className="font-semibold">DP wajib 50% (web.id)</dt>
                <dd className="font-bold text-amber-300">{fmtIdr(DP_WEB_ID)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="font-semibold">DP wajib 50% (domain premium)</dt>
                <dd className="font-bold text-amber-300">{fmtIdr(DP_DOMAIN_LAIN)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="font-semibold">Pelunasan</dt>
                <dd className="font-bold text-amber-300">saat website live</dd>
              </div>
            </dl>
            <p className="mt-3 rounded-xl bg-emerald-400/10 px-3 py-2 text-xs leading-relaxed text-emerald-100/90">
              <Wallet className="mr-1 inline h-3.5 w-3.5" aria-hidden />
              Wajib bayar DP 50% dulu saat mulai; pelunasan dibayar setelah website
              selesai dan live. Termin resmi mengikuti penawaran/invoice.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-xl bg-amber-400 px-5 py-3 text-center text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              Pesan via WhatsApp — sebut kode item {KODE_ITEM}
            </a>
            <p className="mt-3 text-[11px] leading-relaxed text-emerald-200/70">
              * Termasuk domain &amp; hosting tahun pertama. Pembaruan tahun berikutnya
              mengikuti harga registrar/hosting — diinformasikan transparan sebelum jatuh tempo.
            </p>
          </aside>
        </div>
      </section>

      {/* FITUR TERMASUK */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="fitur">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
            <Globe className="h-5 w-5" />
          </span>
          <div>
            <h2 id="fitur" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Semua Ini Termasuk Rp1.500.000 — Tanpa Biaya Kejut
            </h2>
            <p className="mt-2 max-w-3xl text-stone-600">
              Kami rancang paket ini agar usaha kecil pun bisa punya website resmi
              berstandar korporat: domain, hosting, keamanan, konten, dan fondasi SEO
              yang benar — sekali bayar untuk tahun pertama penuh.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {FITUR_TERMASUK.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50/60 px-4 py-3 text-sm text-stone-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-stone-600">
          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-emerald-700" aria-hidden /> Live 5-7 hari kerja setelah DP &amp; data lengkap</span>
          <span className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-emerald-700" aria-hidden /> Responsif semua perangkat</span>
          <span className="flex items-center gap-2"><Search className="h-4 w-4 text-emerald-700" aria-hidden /> SEO on-page + Search Console</span>
        </div>
      </section>

      {/* OPSI DOMAIN */}
      <section className="border-y border-stone-100 bg-stone-50/60 py-14" aria-labelledby="domain">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="domain" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Pilih Domain Anda — web.id Termasuk, Domain Lain +Rp500rb
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            Semua paket wajib DP 50% dibayar dulu saat pengerjaan dimulai. Sisanya
            dibayar hanya setelah website live — tanpa risiko membayar penuh di depan.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {OPSI_DOMAIN.map((d) => (
              <div
                key={d.label}
                className={`rounded-2xl border p-6 ${d.highlight ? "border-emerald-300 bg-emerald-50/60" : "border-stone-200 bg-white"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-stone-900">{d.label}</p>
                  {d.highlight && (
                    <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white">Termasuk all-in</span>
                  )}
                </div>
                <p className="mt-2 text-3xl font-extrabold text-emerald-800">{d.harga}</p>
                <p className="mt-1 text-sm font-semibold text-amber-700">{d.dp}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO EXPLAINER */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="seo-explain">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
            <Search className="h-5 w-5" />
          </span>
          <div>
            <h2 id="seo-explain" className="text-2xl font-bold text-stone-900 md:text-3xl">
              SEO On-Page Lengkap Sejak Hari Pertama
            </h2>
            <p className="mt-2 max-w-3xl text-stone-600">
              Kami mengelola situs dengan 11.000+ halaman yang terindeks Google — praktik
              yang sama kami terapkan di website company profile Anda agar cepat ditemukan.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            "Meta title & description unik per halaman — disusun dari keyword usaha Anda",
            "Struktur heading H1-H3 semantik yang dibaca benar oleh Google",
            "Schema JSON-LD Organization + WebSite + BreadcrumbList (rich result)",
            "sitemap.xml otomatis + robots.txt yang benar — crawl efisien",
            "URL canonical + Open Graph — bersih dari duplikat, rapi saat dibagikan",
            "Pendaftaran Google Search Console + submit sitemap + verifikasi",
            "Gambar dioptimalkan (ukuran & alt text) agar halaman cepat dimuat",
            "Halaman kontak ber-NAP (nama, alamat, telepon) konsisten — sinyal bisnis lokal",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50/60 px-4 py-3 text-sm text-stone-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* TAHAPAN */}
      <section className="border-y border-stone-100 bg-stone-50/60 py-14" aria-labelledby="tahapan-web">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-start gap-4">
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white" aria-hidden>
              <LayoutTemplate className="h-5 w-5" />
            </span>
            <div>
              <h2 id="tahapan-web" className="text-2xl font-bold text-stone-900 md:text-3xl">
                Alur Pengerjaan — 5 Langkah Sampai Live
              </h2>
              <p className="mt-2 max-w-3xl text-stone-600">
                DP dibayar dulu untuk mengunci slot pengerjaan; pelunasan baru setelah
                website Anda benar-benar live.
              </p>
            </div>
          </div>
          <ol className="mt-8 space-y-3">
            {TAHAPAN.map((t, i) => (
              <li key={t} className="flex items-start gap-4 rounded-xl border border-stone-100 bg-white px-4 py-3 text-sm text-stone-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white" aria-hidden>
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ ON-PAGE */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="faq-web">
        <h2 id="faq-web" className="text-2xl font-bold text-stone-900 md:text-3xl">
          Pertanyaan yang Sering Diajukan
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { q: "Apa saja yang termasuk Rp1,5 juta?", a: "Domain web.id 1 tahun, hosting 1 tahun, SSL, 6 halaman lengkap, desain responsif, konten diisi tim kami, SEO on-page + schema + sitemap + Search Console, tombol WhatsApp, form kontak, Google Analytics, dan serah terima akses." },
            { q: "Kalau mau domain .com/.id?", a: `Tambah Rp500.000 sekali di awal — total Rp${HARGA_DOMAIN_LAIN.toLocaleString("id-ID")}. Pembaruan tahun berikutnya mengikuti harga registrar dan diinformasikan transparan.` },
            { q: "Bagaimana pembayarannya?", a: "WAJIB DP 50% dibayar dulu saat mulai (Rp750.000 web.id / Rp1.000.000 domain premium). Pelunasan dibayar setelah website live — bukan sebelum pekerjaan selesai." },
            { q: "Berapa lama sampai live?", a: "5-7 hari kerja setelah DP masuk dan data lengkap — termasuk domain aktif dan sitemap terdaftar di Google Search Console." },
            { q: "Saya belum punya logo/naskah, bagaimana?", a: "Tidak masalah — kirim data mentah (nama usaha, produk, foto), tim kami tuliskan dan rapikan. Logo belum punya? Bisa kami bantu buatkan sederhana, atau gunakan wordmark profesional." },
            { q: "Bisa dikombinasi dengan company profile PDF?", a: "Sangat bisa — paket company profile dokumen (Rp1.500.000) kontennya bisa langsung dipakai di website sehingga konsisten. Lihat halaman jasa pembuatan company profile kami." },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="font-bold text-stone-900">{f.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KEUNGGULAN + INTERNAL LINKS */}
      <section className="border-y border-stone-100 bg-stone-50/60 py-14" aria-labelledby="kenapa-web">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="kenapa-web" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Kenapa Pesan Website di PusatPerizinan.com
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {KEUNGGULAN.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-stone-100 bg-white px-4 py-3 text-sm text-stone-700">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
            <h3 className="flex items-center gap-2 font-bold text-stone-900">
              <Sparkles className="h-5 w-5 text-emerald-700" aria-hidden /> Lengkapi Jadi Satu Ekosistem
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Website paling meyakinkan kalau legalitas usaha di dalamnya lengkap dan
              terverifikasi. Satu pintu di PusatPerizinan.com:
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link href="/jasa-pembuatan-company-profile" className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-4 py-2 font-semibold text-amber-800 transition hover:bg-amber-50">
                <FileText className="h-4 w-4" aria-hidden /> Company Profile dokumen Rp1,5jt <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link href="/layanan/nib" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2 font-semibold text-emerald-800 transition hover:bg-emerald-100">
                <ShieldCheck className="h-4 w-4" aria-hidden /> NIB &amp; OSS-RBA <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link href="/layanan/pt" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2 font-semibold text-emerald-800 transition hover:bg-emerald-100">
                <Building2 className="h-4 w-4" aria-hidden /> Pendirian PT / CV <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link href="/virtual-office" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2 font-semibold text-emerald-800 transition hover:bg-emerald-100">
                <Globe className="h-4 w-4" aria-hidden /> Virtual Office alamat usaha <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA AKHIR */}
      <section className="bg-emerald-950 py-14 text-white" aria-label="Ajukan pemesanan">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Website Perusahaan Anda Online Dalam 5-7 Hari</h2>
          <p className="mx-auto mt-3 max-w-2xl text-emerald-100/85 leading-relaxed">
            Pesan hari ini: pilih domain (web.id termasuk — domain lain +Rp500.000),
            bayar DP 50%, dan 5-7 hari kerja lagi website company profile Anda live
            dengan SEO siap terindeks Google.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Pesan Sekarang — {KODE_ITEM}
            </a>
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Pemesanan ${KODE_ITEM} — Jasa Pembuatan Website Company Profile`)}`}
              className="flex min-h-11 items-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" aria-hidden /> Pesan via Email
            </a>
          </div>
          <p className="mt-4 text-xs text-emerald-200/70">
            Konsultasi awal gratis · WhatsApp resmi {CONTACT.phoneDisplay} · kantor {CONTACT.address.street}, {CONTACT.address.city}
          </p>
        </div>
      </section>
    </div>
  );
}
