"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUp,
  Award,
  Briefcase,
  Building2,
  Clock,
  Flame,
  Globe,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { APP_VERSION, RELEASE_NAME, RELEASE_DATE, PLATFORM_STATS } from "@/lib/version";
import { WHATSAPP_DISPLAY } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LanguageSwitcher } from "@/components/landing/language-switcher";
import { SUPPORT_SYSTEM_URL } from "@/lib/site";

// ============================================================
// Footer v6 "Mahkota" — God Mode Tier Max (v1.20.0 / Task 46)
// ------------------------------------------------------------
// 7 lapisan: (0) summit deck — panel CTA dengan border-beam
// conic yang berputar + aurora internal · (1) command strip —
// status + jam WIB live (hydration-safe) + statistik platform ·
// (2) marquee ticker layanan unggulan · (3) mega-grid SEO penuh
// (NOL link hilang dari v5) · (4) trending searches · (5) legal
// sovereign + back-to-top · (6) atmosfer: aurora orb drift,
// pattern grid, noise grain.
// Semua animasi compositor-only (transform/opacity), hormat
// prefers-reduced-motion, nol dependensi baru, nol gambar baru.
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

/** Marquee ticker — showcase gerak layanan unggulan (Lapisan 2). */
const TICKER_ITEMS = [
  "NIB & OSS-RBA",
  "Pendirian PT & CV",
  "PT PMA Investor Asing",
  "Sertifikasi Halal BPJPH",
  "ISO 9001 · 27001 · SMK3",
  "SBU LPJK untuk Tender",
  "PPh 21 · PPN · Coretax",
  "Virtual Office SCBD",
  "Kerja Jepang (SSW)",
  "Korea Selatan (EPS)",
  "Izin PPIU Umroh",
  "Pendaftaran Merek DJKI",
  "KBLI 2025",
  "API Ekspor Impor",
];

/** Format ribuan gaya Indonesia tanpa Intl (aman hydration SSR/client). */
function formatIdNumber(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Jam WIB live — null di server (anti hydration mismatch), berdetak 1 dtk di client. */
function useWibClock(): string | null {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const wib = new Date(now.getTime() + (now.getTimezoneOffset() + 7 * 60) * 60_000);
      setTime(
        `${String(wib.getHours()).padStart(2, "0")}:${String(wib.getMinutes()).padStart(2, "0")}:${String(wib.getSeconds()).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const WA_CTA_HREF =
  "https://wa.me/6281269999910?text=" +
  encodeURIComponent("Halo PusatPerizinan.com, saya mau konsultasi gratis.");

/** Back-to-top yang hormat prefers-reduced-motion. */
function scrollToTop(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

function FooterLinkColumn({
  ariaLabel,
  title,
  icon: Icon,
  links,
  children,
}: {
  ariaLabel: string;
  title: string;
  icon?: typeof Globe;
  links: { label: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 shrink-0 text-emerald-400/90" aria-hidden="true" />}
        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">{title}</h3>
      </div>
      <div
        aria-hidden="true"
        className="mt-2 h-px w-9 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400/70 to-transparent"
      />
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="group inline-block max-w-full text-sm leading-snug text-emerald-100/70 transition-all duration-200 hover:translate-x-0.5 hover:text-emerald-300 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
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

/** Chip statistik dengan angka gradient. */
function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
      <span className="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-sm font-extrabold text-transparent">
        {value}
      </span>
      <span className="text-xs text-emerald-100/60">{label}</span>
    </div>
  );
}

/** Gaya scoped footer — semua animasi transform/opacity (compositor-only). */
const FOOTER_STYLES = `
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
  @keyframes beam-spin {
    to { transform: rotate(1turn); }
  }
  .beam-host { position: relative; overflow: hidden; }
  .beam-host::before {
    content: "";
    position: absolute;
    inset: -65%;
    background: conic-gradient(from 0deg,
      transparent 0deg,
      rgba(16,185,129,0.75) 42deg,
      rgba(251,191,36,0.65) 84deg,
      transparent 132deg,
      transparent 360deg);
    animation: beam-spin 8s linear infinite;
    will-change: transform;
  }
  @keyframes orb-drift {
    0% { transform: translate3d(0,0,0) scale(1); }
    50% { transform: translate3d(4%,-3%,0) scale(1.08); }
    100% { transform: translate3d(-3%,3%,0) scale(0.96); }
  }
  .orb-drift { animation: orb-drift 22s ease-in-out infinite; will-change: transform; }
  .orb-drift-alt { animation: orb-drift 28s ease-in-out -9s infinite reverse; will-change: transform; }
  @keyframes ticker-move {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .ticker-track {
    display: flex;
    width: max-content;
    animation: ticker-move 46s linear infinite;
    will-change: transform;
  }
  .ticker:hover .ticker-track { animation-play-state: paused; }
  .noise-overlay {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .footer-grid-lines {
    background-image:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 44px 44px;
  }
  @media (prefers-reduced-motion: reduce) {
    .aurora-sweep, .status-ping, .orb-drift, .orb-drift-alt { animation: none; }
    .beam-host::before { animation: none; opacity: 0.5; }
    .ticker-track { animation: none; }
  }
`;

export function Footer() {
  const { t } = useLanguage();
  const wibTime = useWibClock();

  return (
    <footer className="relative mt-auto overflow-hidden bg-[oklch(0.175_0.025_165)] text-emerald-50/90">
      <style>{FOOTER_STYLES}</style>

      {/* ============================================================ */}
      {/* LAPISAN 6 — Atmosfer ruang dalam (orb aurora, grid, grain)   */}
      {/* ============================================================ */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(16,185,129,0.16),transparent)]" />
        <div className="orb-drift absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="orb-drift-alt absolute -bottom-40 -right-32 h-[460px] w-[460px] rounded-full bg-amber-400/10 blur-3xl" />
        <div className="footer-grid-lines absolute inset-0" />
        <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
      </div>

      {/* LAPISAN 0a — Sinyal aurora puncak */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 opacity-90"
      />
      <div aria-hidden="true" className="aurora-sweep pointer-events-none absolute inset-x-0 top-0 z-10 h-1" />

      {/* ============================================================ */}
      {/* KONTAINER A — Summit deck (beam border) + command strip      */}
      {/* ============================================================ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* LAPISAN 0 — Summit deck: border-beam conic berputar */}
        <div className="beam-host rounded-[1.65rem] p-px shadow-[0_24px_80px_-24px_rgba(16,185,129,0.35)]">
          <div className="relative overflow-hidden rounded-[1.6rem] bg-[oklch(0.205_0.03_165)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="orb-drift absolute -top-24 -left-16 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="orb-drift-alt absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-amber-300/[0.12] blur-3xl" />
              <div className="footer-grid-lines absolute inset-0 opacity-60" />
            </div>

            <div className="relative px-6 py-10 text-center sm:px-10 sm:py-12">
              <a
                href="/api/version"
                title={`Rilis "${RELEASE_NAME}" — ${RELEASE_DATE} (WIB) · GET /api/version`}
                className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/[0.07] px-4 py-1.5 transition-colors hover:border-amber-300/50"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                <span className="animate-shimmer text-[11px] font-bold uppercase tracking-[0.2em]">
                  Platform Perizinan Terlengkap Indonesia
                </span>
              </a>

              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold tracking-tight leading-[1.12] text-white sm:text-4xl lg:text-[2.9rem]">
                Dari NIB sampai Sertifikasi Global —{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
                  satu pintu, semua terurus.
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-emerald-100/70 sm:text-base">
                {formatIdNumber(PLATFORM_STATS.indexedUrls)} halaman database · {PLATFORM_STATS.orderableServices}+ layanan orderable ·
                tim konsultan siaga 24/7 memandu usaha Anda dari hulu ke hilir — di {PLATFORM_STATS.provinces} provinsi dan 17 negara tujuan.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={WA_CTA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animate-pulse-ring inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3 text-sm font-bold text-emerald-950 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:animate-none"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  Konsultasi Gratis Sekarang
                </a>
                <a
                  href="/cek-izin"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:border-emerald-400/40 hover:bg-white/10 hover:text-white"
                >
                  <Activity className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  Cek Izin AI
                </a>
              </div>

              <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-emerald-100/65">
                <li className="inline-flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
                  Rating 4,9/5 dari klien
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                  Garansi 100%
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
                  Respons WA &lt; 15 menit
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                  AI RIZKI online 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* LAPISAN 1 — Command strip: status live + statistik platform */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
          <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
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
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-emerald-100/75"
                title="Waktu Indonesia Barat (UTC+7)"
              >
                <Clock className="h-3 w-3 text-amber-400" aria-hidden="true" />
                <span className="tabular-nums">{wibTime ?? "--:--:--"}</span>
                WIB
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-emerald-100/70">
                <MessageCircle className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                AI RIZKI aktif 24/7
              </span>
            </div>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <li>
                <StatChip value={`${PLATFORM_STATS.orderableServices}+`} label="layanan" />
              </li>
              <li>
                <StatChip value={`${PLATFORM_STATS.provinces}`} label="provinsi · 516 kota" />
              </li>
              <li>
                <StatChip value={formatIdNumber(PLATFORM_STATS.indexedUrls)} label="halaman" />
              </li>
              <li>
                <StatChip value={`${PLATFORM_STATS.languages}`} label="bahasa" />
              </li>
              <li>
                <StatChip value="4,9/5" label="rating" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAPISAN 2 — Marquee ticker full-bleed (pause saat hover)     */}
      {/* ============================================================ */}
      <div
        className="ticker relative mt-10 overflow-hidden border-y border-white/[0.07] bg-white/[0.02] py-3.5"
        role="presentation"
      >
        <div className="ticker-track">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
              {TICKER_ITEMS.map((item) => (
                <li key={`${dup}-${item}`} className="flex items-center whitespace-nowrap">
                  <span className="px-4 text-sm font-medium tracking-wide text-emerald-100/75">{item}</span>
                  <span aria-hidden="true" className="text-[10px] text-amber-400/80">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[oklch(0.175_0.025_165)] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[oklch(0.175_0.025_165)] to-transparent"
        />
      </div>

      {/* ============================================================ */}
      {/* KONTAINER B — Mega-grid SEO + trending + legal               */}
      {/* ============================================================ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {/* LAPISAN 3 — Mega-grid SEO (nol duplikasi, warisan penuh v5) */}
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
            icon={Briefcase}
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
            icon={Award}
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
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-400/90" aria-hidden="true" />
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Wilayah &amp; Kota</h3>
            </div>
            <div
              aria-hidden="true"
              className="mt-2 h-px w-9 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400/70 to-transparent"
            />
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
                  → 38 Provinsi &amp; 516 Kota/Kab
                </a>
              </li>
            </ul>
          </nav>

          {/* Kolom: luar negeri + alat (gabungan hemat kolom) */}
          <div className="grid gap-8 md:col-span-3 lg:col-span-2 lg:grid-cols-2">
            <FooterLinkColumn
              ariaLabel="Negara tujuan PMI"
              title="Kerja Luar Negeri"
              icon={Globe}
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
              icon={Wrench}
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
            icon={Zap}
            links={TOOL_LINKS.slice(8)}
          />

          <FooterLinkColumn
            ariaLabel="Perusahaan"
            title={t("footerColCompany")}
            icon={Building2}
            links={COMPANY_LINKS.slice(0, 8)}
          >
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
            icon={LifeBuoy}
            links={COMPANY_LINKS.slice(8)}
          />

          {/* Kontak */}
          <div>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 shrink-0 text-emerald-400/90" aria-hidden="true" />
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
                {t("footerColContact")}
              </h3>
            </div>
            <div
              aria-hidden="true"
              className="mt-2 h-px w-9 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400/70 to-transparent"
            />
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

        {/* LAPISAN 4 — Trending searches (chip semantik GSC) */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-amber-400" aria-hidden="true" />
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-amber-200/90">
              Paling Dicari Minggu Ini
            </h3>
          </div>
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

        {/* LAPISAN 5 — Legal sovereign + back-to-top */}
        <div className="mt-12 pt-7 border-t border-white/10 space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs text-emerald-100/50 text-center lg:text-left">
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
            <div className="flex items-center justify-center gap-2">
              {/* 🏷️ Badge versi resmi — sumber tunggal: src/lib/version.ts (v1.4.0+) */}
              <a
                href="/api/version"
                title={`Rilis "${RELEASE_NAME}" — ${RELEASE_DATE} (WIB) · riwayat lengkap via GET /api/version`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/25 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-200/90 transition-colors hover:border-emerald-400/50 hover:bg-white/10 hover:text-white"
              >
                <Tag className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                pusatperizinan.com · v{APP_VERSION}
              </a>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Kembali ke atas"
                title="Kembali ke atas"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-emerald-100/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-white motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
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

