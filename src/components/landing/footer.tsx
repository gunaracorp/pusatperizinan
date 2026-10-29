"use client";

import Link from "next/link";
import {
  Activity,
  BadgeCheck,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Tag,
} from "lucide-react";
import type { ReactNode } from "react";
import { APP_VERSION, RELEASE_NAME, RELEASE_DATE, PLATFORM_STATS } from "@/lib/version";
import { WHATSAPP_DISPLAY } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LanguageSwitcher } from "@/components/landing/language-switcher";
import { SUPPORT_SYSTEM_URL } from "@/lib/site";

// ============================================================
// Footer v5 "God Mode Tier Max" (v1.19.0 / Task 44)
// ------------------------------------------------------------
// 5 lapisan: (0) aurora signal bar · (1) command band — status
// sistem + statistik platform + CTA konsultasi · (2) mega-grid
// SEO 6 kolom TANPA duplikasi link · (3) trending searches ·
// (4) legal sovereign. Animasi compositor-only (transform/
// opacity), hormat prefers-reduced-motion, nol dependensi baru.
// ============================================================

const SERVICE_LINKS = [
  { label: "NIB & OSS-RBA", href: "/layanan/nib" },
  { label: "Pendirian PT & PMA", href: "/layanan/pt" },
  { label: "Jasa Pajak Pribadi & Badan", href: "/layanan/kategori/pajak" },
  { label: "NPWP & SPT Tahunan", href: "/layanan/tax-npwp-op" },
  { label: "Kerja Luar Negeri (PMI)", href: "/layanan/kategori/kerja-luar-negeri" },
  { label: "Kerja di Jepang (SSW)", href: "/layanan/kerja-di-jp" },
  { label: "Izin PPTKIS / P3MI", href: "/layanan/pptkis" },
  { label: "Izin Umroh (PPIU)", href: "/layanan/ppi-umroh" },
  { label: "Izin Haji (PPIH)", href: "/layanan/ppi-haji" },
  { label: "Katalog Sertifikasi (43+)", href: "/layanan/kategori/sertifikasi" },
  { label: "Pendirian Travel Umrah (PT+PPIU)", href: "/layanan/paket-pendirian-travel-umrah" },
  { label: "Upgrade PIHK (Haji Khusus)", href: "/layanan/upgrade-ppiu-ke-pihk" },
  { label: "ISO 9001:2026", href: "/layanan/iso-9001" },
  { label: "ISO 27001 Keamanan Informasi", href: "/layanan/iso-27001" },
  { label: "Halal Jasa (PP 42/2024)", href: "/layanan/halal-jasa-restoran" },
  { label: "SBU LPJK untuk Tender", href: "/layanan/sbu-lpjk" },
  { label: "Pendaftaran Merek (DJKI)", href: "/layanan/merek" },
  { label: "API Ekspor Impor & COO", href: "/layanan/api-impex" },
  { label: "ISO & SMK3", href: "/layanan/iso" },
  { label: "RPTKA, KITAS Expatriat", href: "/layanan/rptka-kitas" },
  { label: "Registrasi IATA", href: "/layanan/iata" },
  { label: "Izin Usaha Arab Saudi (MISA)", href: "/layanan/saudi-arabia" },
  { label: "RKAB & Kepatuhan Tambang", href: "/layanan/rkab-tambang" },
  { label: "Sertifikasi Halal", href: "/layanan/halal" },
];

const POPULAR_REGIONS = [
  { label: "Layanan di DKI Jakarta", href: "/layanan/wilayah/dki-jakarta" },
  { label: "Layanan di Jawa Barat", href: "/layanan/wilayah/jawa-barat" },
  { label: "Layanan di Jawa Tengah", href: "/layanan/wilayah/jawa-tengah" },
  { label: "Layanan di Jawa Timur", href: "/layanan/wilayah/jawa-timur" },
  { label: "Layanan di Bali", href: "/layanan/wilayah/bali" },
  { label: "Layanan di Sumatera Utara", href: "/layanan/wilayah/sumatera-utara" },
];

/** Kota paling dicari — URL terverifikasi E2E 200 (Task 44). */
const TOP_CITIES = [
  { label: "Jakarta Selatan (SCBD)", href: "/layanan/wilayah/dki-jakarta/jakarta-selatan-scbd" },
  { label: "Bekasi", href: "/layanan/wilayah/jawa-barat/bekasi" },
  { label: "Bandung", href: "/layanan/wilayah/jawa-barat/bandung" },
  { label: "Surabaya", href: "/layanan/wilayah/jawa-timur/surabaya" },
  { label: "Denpasar", href: "/layanan/wilayah/bali/denpasar" },
  { label: "Medan", href: "/layanan/wilayah/sumatera-utara/medan" },
];

const COUNTRY_LINKS = [
  { label: "🇯🇵 Jepang (SSW)", href: "/layanan/kerja-di-jp" },
  { label: "🇰🇷 Korea Selatan (EPS)", href: "/layanan/kerja-di-kr" },
  { label: "🇹🇼 Taiwan", href: "/layanan/kerja-di-tw" },
  { label: "🇲🇾 Malaysia", href: "/layanan/kerja-di-my" },
  { label: "🇸🇬 Singapura", href: "/layanan/kerja-di-sg" },
  { label: "🇸🇦 Arab Saudi", href: "/layanan/kerja-di-sa" },
  { label: "🇭🇰 Hong Kong", href: "/layanan/kerja-di-hk" },
  { label: "🇩🇪 Jerman (Triple Win)", href: "/layanan/kerja-di-de" },
];

const TOOL_LINKS = [
  { label: "Katalog Lengkap 140+ Layanan (31 Divisi)", href: "/katalog" },
  { label: "Paket Usaha per Industri (Kopi, Klinik, Umroh…)", href: "/paket-usaha" },
  { label: "Paket Bundel Hemat (GO UMRAH, dll.)", href: "/paket" },
  { label: "Kalender Kepatuhan (LKPM, SPT, JAMSOSTEK)", href: "/kalender-kepatuhan" },
  { label: "AI Roadmap Perizinan 12 Bulan", href: "/roadmap" },
  { label: "Kalkulator Pajak (PPh 21, UMKM, PPN)", href: "/kalkulator-pajak" },
  { label: "Kalkulator Biaya Layanan", href: "/kalkulator" },
  { label: "Database KBLI 2025", href: "/kbli" },
  { label: "AI Cek Dokumen (Upload Foto)", href: "/cek-dokumen" },
  { label: "Cek Izin AI", href: "/cek-izin" },
  { label: "Perbandingan Badan Usaha (PT vs CV)", href: "/bandingkan" },
  { label: "Glosarium Perizinan (200+ Istilah)", href: "/glosarium" },
  { label: "Panduan Lengkap", href: "/panduan" },
  { label: "Blog Perizinan", href: "/blog" },
];

const COMPANY_LINKS = [
  { label: "Kenapa Kami", href: "/#keunggulan" },
  { label: "Cara Kerja", href: "/#cara-kerja" },
  { label: "Jangkauan Nasional", href: "/#jangkauan" },
  { label: "Harga & Paket", href: "/paket" },
  { label: "KepatuhanPRO (MRR)", href: "/kepatuhan-pro" },
  { label: "Program Kemitraan", href: "/mitra" },
  { label: "Solusi Korporat (B2B)", href: "/solusi-korporat" },
  { label: "Layanan BUMDes", href: "/bumdes" },
  { label: "PMA Investor (English)", href: "/pma-company-registration" },
  { label: "Virtual Office (48 Lokasi)", href: "/virtual-office" },
  { label: "Direktori Kanal Resmi Pemerintah", href: "/kanal-resmi" },
  { label: "Testimoni Klien (4,9/5)", href: "/testimoni" },
  { label: "Garansi 100%", href: "/garansi" },
  { label: "Lowongan Kerja Khusus Wanita", href: "/lowongan-kerja" },
  { label: "FAQ", href: "/faq" },
  { label: "Webmaster Tools Master (26 Mesin)", href: "/webmaster" },
];

/** Trending searches — anchor teks kaya semantik untuk GSC (Task 44). */
const TRENDING_SEARCHES = [
  { label: "NIB online", href: "/layanan/nib" },
  { label: "Pendirian PT", href: "/layanan/pt" },
  { label: "PT PMA investor asing", href: "/pma-company-registration" },
  { label: "Izin PPIU umroh", href: "/layanan/ppi-umroh" },
  { label: "KBLI 2025", href: "/kbli" },
  { label: "Sertifikasi Halal", href: "/layanan/halal" },
  { label: "ISO 9001", href: "/layanan/iso-9001" },
  { label: "SBU LPJK tender", href: "/layanan/sbu-lpjk" },
  { label: "Virtual office SCBD", href: "/virtual-office" },
  { label: "Loker host live TikTok Shopee", href: "/lowongan-kerja" },
  { label: "NPWP & SPT", href: "/layanan/tax-npwp-op" },
  { label: "Kerja di Jepang SSW", href: "/layanan/kerja-di-jp" },
];

/** Format ribuan gaya Indonesia tanpa Intl (aman hydration SSR/client). */
function formatIdNumber(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const PLATFORM_CHIPS = [
  { label: `${PLATFORM_STATS.orderableServices}+ layanan orderable` },
  { label: `${PLATFORM_STATS.provinces} provinsi + 516 kota/kab` },
  { label: `${formatIdNumber(PLATFORM_STATS.indexedUrls)} halaman database` },
  { label: `${PLATFORM_STATS.languages} bahasa antarmuka` },
  { label: "Rating klien 4,9/5" },
];

const WA_CTA_HREF =
  "https://wa.me/6281269999910?text=" +
  encodeURIComponent("Halo PusatPerizinan.com, saya mau konsultasi gratis.");

function FooterLinkColumn({
  ariaLabel,
  title,
  links,
  children,
}: {
  ariaLabel: string;
  title: string;
  links: { label: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <h3 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-block max-w-full text-sm leading-snug text-emerald-100/70 transition-all duration-200 hover:translate-x-0.5 hover:text-emerald-300 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
            >
              {link.label}
            </a>
          </li>
        ))}
        {children}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative mt-auto overflow-hidden bg-[oklch(0.21_0.03_165)] text-emerald-50/90">
      {/* ===== Lapisan 0 — Aurora signal bar (compositor-only) ===== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 opacity-80"
      />
      <div
        aria-hidden="true"
        className="aurora-sweep pointer-events-none absolute inset-x-0 top-0 h-[3px]"
      />
      <style>{`
        @keyframes aurora-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .aurora-sweep {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
          animation: aurora-sweep 7s linear infinite;
          will-change: transform;
        }
        @keyframes status-ping {
          0% { transform: scale(1); opacity: 0.9; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }
        .status-ping { animation: status-ping 2.2s cubic-bezier(0,0,0.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aurora-sweep, .status-ping { animation: none; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* ===== Lapisan 1 — Command band: status + statistik + CTA ===== */}
        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 shadow-[0_0_40px_-16px_rgba(16,185,129,0.45)] lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Status pill — deterministik, tanpa panggilan jaringan */}
              <a
                href="/api/version"
                title={`Status rilis "${RELEASE_NAME}" — ${RELEASE_DATE} (WIB) · GET /api/version`}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-200"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Semua sistem operasional
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-emerald-100/70">
                <MessageCircle className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                AI RIZKI aktif 24/7
              </span>
            </div>
            <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-emerald-100/70">
              {PLATFORM_CHIPS.map((chip) => (
                <li key={chip.label} className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-amber-400/80" aria-hidden="true" />
                  {chip.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href={WA_CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-emerald-950 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              Konsultasi Gratis 24/7
            </a>
            <a
              href="/cek-izin"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:border-emerald-400/40 hover:bg-white/10 hover:text-white"
            >
              <Activity className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              Cek Izin AI
            </a>
          </div>
        </div>

        {/* ===== Lapisan 2 — Mega-grid SEO 6 kolom (nol duplikasi) ===== */}
        <div className="grid gap-10 pt-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Kolom brand */}
          <div className="md:col-span-3 lg:col-span-2 lg:pr-8">
            <a href="/#beranda" className="flex items-center gap-2.5">
              <img src="/logo-icon-white.png" alt="Logo PusatPerizinan.com" className="h-10 w-10" />
              <span className="font-bold text-lg text-white">
                Pusat<span className="text-emerald-400">Perizinan</span>
                <span className="text-amber-400">.com</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/70">{t("footerTagline")}</p>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-100/80">{t("footerVerified")}</p>
            </div>
            {/* Language switcher — 30 bahasa dunia */}
            <div className="mt-4 [&_[role=combobox]]:border-white/15 [&_[role=combobox]]:bg-white/5 [&_[role=combobox]]:text-emerald-50 [&_[role=combobox]]:hover:bg-white/10 [&_[role=combobox]]:shadow-none">
              <LanguageSwitcher />
            </div>
          </div>

          <FooterLinkColumn
            ariaLabel="Layanan populer"
            title="Layanan Populer"
            links={SERVICE_LINKS.slice(0, 10)}
          >
            <li>
              <a
                href="/layanan"
                className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
              >
                → Semua 1.000+ Halaman Layanan
              </a>
            </li>
          </FooterLinkColumn>

          <FooterLinkColumn
            ariaLabel="Sertifikasi dan korporasi"
            title="Sertifikasi & Korporasi"
            links={SERVICE_LINKS.slice(10, 22)}
          >
            <li>
              <a
                href="/layanan/kategori/sertifikasi"
                className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
              >
                → 43+ Sertifikasi Lainnya
              </a>
            </li>
          </FooterLinkColumn>

          {/* Wilayah: provinsi + kota paling dicari */}
          <nav aria-label="Wilayah layanan">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Wilayah & Kota</h3>
            <ul className="mt-4 space-y-2.5">
              {POPULAR_REGIONS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block max-w-full text-sm leading-snug text-emerald-100/70 transition-all duration-200 hover:translate-x-0.5 hover:text-emerald-300 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {TOP_CITIES.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block max-w-full text-sm leading-snug text-emerald-100/50 transition-all duration-200 hover:translate-x-0.5 hover:text-emerald-300 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
                  >
                    └ {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/wilayah"
                  className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
                >
                  → 38 Provinsi & 516 Kota/Kab
                </a>
              </li>
            </ul>
          </nav>

          {/* Kolom: luar negeri + alat (gabungan hemat kolom) */}
          <div className="grid gap-8 md:col-span-3 lg:col-span-2 lg:grid-cols-2">
            <FooterLinkColumn
              ariaLabel="Negara tujuan PMI"
              title="Kerja Luar Negeri"
              links={COUNTRY_LINKS.slice(0, 6)}
            >
              <li>
                <a
                  href="/layanan/kategori/kerja-luar-negeri"
                  className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
                >
                  → 17 Negara Tujuan
                </a>
              </li>
            </FooterLinkColumn>
            <FooterLinkColumn
              ariaLabel="Alat gratis dan pintasan"
              title="Alat & Pintasan"
              links={TOOL_LINKS.slice(0, 8)}
            >
              <li>
                <a
                  href="/katalog"
                  className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
                >
                  → Semua Alat Gratis
                </a>
              </li>
            </FooterLinkColumn>
          </div>
        </div>

        {/* Baris lanjutan mega-grid: sisa alat + perusahaan + kontak */}
        <div className="grid gap-10 pt-10 md:grid-cols-3 lg:grid-cols-4">
          <FooterLinkColumn
            ariaLabel="Alat gratis lanjutan"
            title="Alat Lanjutan"
            links={TOOL_LINKS.slice(8)}
          />

          <FooterLinkColumn ariaLabel="Perusahaan" title={t("footerColCompany")} links={COMPANY_LINKS.slice(0, 8)}>
            <li>
              <a
                href="/tentang-kami"
                className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
              >
                → Profil Lengkap Perusahaan
              </a>
            </li>
          </FooterLinkColumn>

          <FooterLinkColumn
            ariaLabel="Bantuan dan dukungan"
            title="Bantuan & Dukungan"
            links={COMPANY_LINKS.slice(8)}
          />

          {/* Kontak */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("footerColContact")}
            </h3>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={`https://wa.me/6281269999910`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors"
                >
                  <PhoneCall className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    WhatsApp {WHATSAPP_DISPLAY}
                    <br />
                    <span className="text-xs text-emerald-200/50">{t("footerHours")}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-emerald-100/70">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                halo@pusatperizinan.com
              </li>
              <li className="flex items-start gap-2.5 text-sm text-emerald-100/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  Indonesia Stock Exchange Building, Lantai 5
                  <br />
                  SCBD Lot 13, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190
                  <span className="block text-xs text-emerald-200/50 mt-0.5">{t("footerNote")}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Lapisan 3 — Trending searches (chips semantik) ===== */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            🔥 Paling Dicari Minggu Ini
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((s) => (
              <li key={s.href + s.label}>
                <a
                  href={s.href}
                  className="inline-block rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-emerald-100/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-200 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Lapisan 4 — Legal sovereign ===== */}
        <div className="mt-12 pt-7 border-t border-white/10 space-y-5 pr-2 sm:pr-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-emerald-100/50">
              {t("footerRights").replace("{year}", String(new Date().getFullYear()))}
            </p>
            <nav
              aria-label="Tautan legal"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
            >
              <Link
                href="/tentang-kami"
                className="text-xs text-emerald-100/50 hover:text-emerald-300 transition-colors"
              >
                Tentang Kami
              </Link>
              <span aria-hidden>·</span>
              <Link
                href="/kontak"
                className="text-xs text-emerald-100/50 hover:text-emerald-300 transition-colors"
              >
                Kontak
              </Link>
              <span aria-hidden>·</span>
              <Link
                href="/kebijakan-privasi"
                className="text-xs text-emerald-100/50 hover:text-emerald-300 transition-colors"
              >
                Privasi
              </Link>
              <span aria-hidden>·</span>
              <Link
                href="/syarat-ketentuan"
                className="text-xs text-emerald-100/50 hover:text-emerald-300 transition-colors"
              >
                Syarat &amp; Ketentuan
              </Link>
              <span aria-hidden>·</span>
              <Link
                href="/garansi"
                className="text-xs text-emerald-100/50 hover:text-emerald-300 transition-colors"
              >
                Garansi 100%
              </Link>
            </nav>
            {/* 🏷️ Badge versi resmi — sumber tunggal: src/lib/version.ts (v1.4.0+) */}
            <a
              href="/api/version"
              title={`Rilis "${RELEASE_NAME}" — ${RELEASE_DATE} (WIB) · riwayat lengkap via GET /api/version`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/25 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-200/90 transition-colors hover:border-emerald-400/50 hover:bg-white/10 hover:text-white"
            >
              <Tag className="h-3 w-3 text-emerald-400" aria-hidden="true" />
              pusatperizinan.com · v{APP_VERSION}
            </a>
          </div>
          {/* Support system credit — PT Digital Bisnis Manajemen (digiman.id) */}
          <div className="flex justify-center">
            <a
              href={SUPPORT_SYSTEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-full items-center justify-center gap-2.5 rounded-full border border-emerald-400/20 bg-white/[0.04] px-5 py-2.5 text-center shadow-[0_0_24px_-8px_rgba(16,185,129,0.35)] transition-colors hover:border-emerald-400/50 hover:bg-white/10"
            >
              <Globe className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
              <span className="text-xs leading-relaxed tracking-wide text-emerald-100/85">
                {t("footerMade")}
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
