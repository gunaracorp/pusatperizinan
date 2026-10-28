import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeDollarSign,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
  PhoneCall,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JOBS, salaryText } from "@/lib/jobs-data";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

export function generateStaticParams() {
  return [{}];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Lowongan Kerja Khusus Wanita Remote — Gaji UMR + Bonus Target (7 Posisi)",
    description:
      "7 lowongan kerja KHUSUS WANITA di PusatPerizinan.com: programmer full-stack, admin marketing, admin melayani pelanggan, staf perpajakan, staf perizinan NIB & OSS, admin customer service, dan admin media sosial. Gaji awal UMR + bonus target perusahaan, bisa remote penuh, jenjang karier jelas.",
    keywords: [
      "lowongan kerja khusus wanita",
      "loker wanita remote",
      "lowongan admin marketing wanita",
      "lowongan customer service wanita remote",
      "lowongan programmer wanita full stack",
      "lowongan staf perpajakan remote",
      "lowongan perizinan nib oss",
      "lowongan admin media sosial wanita",
      "loker umr plus bonus",
      "lowongan kerja remote indonesia",
    ],
    alternates: { canonical: "/lowongan-kerja" },
    openGraph: {
      title: "Lowongan Kerja Khusus Wanita — Remote, UMR + Bonus Target",
      description: `${JOBS.length} posisi aktif khusus perempuan: programmer full-stack, admin marketing, admin melayani pelanggan, staf perpajakan, staf perizinan NIB & OSS, admin customer service, admin media sosial. Gaji awal UMR + bonus target, bisa remote penuh. Lamar via WhatsApp.`,
      url: "/lowongan-kerja",
    },
  };
}

function WorkTypeBadge({ workType }: { workType: "onsite" | "hybrid" | "remote" }) {
  const map = {
    onsite: { label: "On-site", cls: "bg-muted text-muted-foreground border-border" },
    hybrid: { label: "Hybrid", cls: "bg-gold/10 text-gold border-gold/20" },
    remote: { label: "Remote", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  } as const;
  const m = map[workType];
  return <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${m.cls}`}>{m.label}</span>;
}

export default function LowonganPage() {
  const featured = JOBS.filter((j) => j.featured);
  const others = JOBS.filter((j) => !j.featured);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya perempuan dan ingin menanyakan lowongan kerja khusus wanita di PusatPerizinan.com")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Tanya via WhatsApp
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 border-b">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground">Lowongan Kerja</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-rose-100 text-rose-700 border border-rose-300">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden /> Khusus Wanita — Seluruh Rekrutmen
            </Badge>
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              {JOBS.length} Posisi Aktif — Diperbarui Berkala
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            Lowongan Kerja Khusus Wanita — Remote, Gaji UMR + Bonus Target
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {JOBS.length} posisi aktif khusus perempuan: programmer full-stack, admin marketing, admin melayani
            pelanggan, staf perpajakan, staf perizinan NIB &amp; OSS, admin customer service, dan admin media sosial.
            Gaji awal UMR, bonus dari target perusahaan, sepenuhnya bisa remote, dan jenjang karier jelas. Lamar
            langsung via WhatsApp — tanpa biaya apa pun.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-primary" aria-hidden /> {JOBS.length} posisi aktif — semua khusus wanita</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" aria-hidden /> Remote penuh — dari seluruh Indonesia</span>
            <span className="flex items-center gap-1.5"><BadgeDollarSign className="h-4 w-4 text-primary" aria-hidden /> Gaji awal UMR + bonus target</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" aria-hidden /> Proses lamaran &lt; 7 hari</span>
          </div>
        </div>
      </section>

      {/* Daftar lowongan */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Info khusus wanita */}
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <h2 className="font-bold text-rose-900 flex items-center gap-2 mb-1.5">
            <Users className="h-5 w-5" aria-hidden /> Seluruh Lowongan di Halaman Ini Khusus untuk Perempuan
          </h2>
          <p className="text-sm text-rose-800 leading-relaxed">
            PusatPerizinan.com sedang membangun tim perempuan unggul yang menguasai IT dan perizinan dari hulu ke
            hilir. Lamaran laki-laki tidak diproses — terima kasih atas pengertiannya.
          </p>
        </div>

        {/* Skema gaji, bonus & jenjang karier */}
        <div className="mb-10 rounded-2xl border bg-card p-5 md:p-6">
          <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
            <BadgeDollarSign className="h-5 w-5 text-gold" aria-hidden /> Gaji, Bonus & Jenjang Karier — Sama untuk Semua Posisi
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            <div className="rounded-xl border bg-background p-4">
              <p className="font-bold mb-1">Gaji Awal UMR</p>
              <p className="text-muted-foreground leading-relaxed">
                Gaji awal UMR sesuai domisili — acuan UMP DKI Jakarta 2026 Rp5.729.876/bulan. Tanpa potongan
                aneh-aneh, cair tiap bulan.
              </p>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <p className="font-bold mb-1">Bonus dari Target</p>
              <p className="text-muted-foreground leading-relaxed">
                Bonus bulanan dari target yang ditetapkan perusahaan — angkanya jelas, terukur, dan disepakati di
                awal. Makin capai target, makin besar bonus.
              </p>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <p className="font-bold mb-1">Jenjang Karier Jelas</p>
              <p className="text-muted-foreground leading-relaxed">
                Staff → Senior → Team Lead → Manager. Evaluasi & kenaikan jenjang tiap 6 bulan berdasarkan
                performa, bukan senioritas.
              </p>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <p className="font-bold mb-1">Remote Penuh</p>
              <p className="text-muted-foreground leading-relaxed">
                Semua posisi bisa dikerjakan dari rumah di seluruh Indonesia — koordinasi online harian, tanpa
                biaya transport.
              </p>
            </div>
          </div>
        </div>

        {/* Posisi prioritas */}
        {featured.length > 0 && (
          <>
            <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" aria-hidden /> Prioritas Rekrutmen
            </h2>
            <div className="grid gap-4 md:grid-cols-2 mb-10">
              {featured.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}

        {/* Posisi lainnya */}
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" aria-hidden /> Semua Posisi Terbuka
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {others.map((job) => (
            <JobCard key={job.id} job={job} compact />
          ))}
        </div>
      </section>

      {/* Perhatian anti-penipuan */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5" aria-hidden /> Perhatian: Rekrutmen Kami 100% Gratis
          </h2>
          <p className="text-sm text-amber-800 leading-relaxed">
            PusatPerizinan.com dan mitranya TIDAK PERNAH memungut biaya lamaran, biaya training, atau biaya
            administrasi apa pun dari pelamar. Jika ada pihak yang mengatasnamakan kami meminta pembayaran, jangan
            transfer — lapor langsung ke WhatsApp resmi kami di bawah. Untuk posisi di LPK mitra, biaya pelatihan
            (jika ada) mengikuti regulasi KemenP2MI dan diinformasikan tertulis sebelum penandatanganan.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-2xl border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Belum menemukan posisi yang cocok? Perempuan dengan keahlian IT/perizinan bisa kirim CV terbuka ke
            WhatsApp kami, atau jelajahi{" "}
            <Link href="/layanan" className="font-semibold text-primary hover:underline">layanan perizinan</Link> &{" "}
            <Link href="/roadmap" className="font-semibold text-primary hover:underline">alat AI gratis</Link> kami.
          </p>
        </div>
      </section>
    </main>
  );
}

function JobCard({ job, compact = false }: { job: (typeof JOBS)[number]; compact?: boolean }) {
  return (
    <article className={`rounded-2xl border bg-card p-5 flex flex-col hover:shadow-md transition-shadow ${compact ? "" : "md:p-6"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" aria-hidden /> {job.organization}
        </span>
        <WorkTypeBadge workType={job.workType} />
      </div>
      <h3 className={`font-bold leading-snug ${compact ? "text-base" : "text-lg"}`}>
        <Link href={`/lowongan-kerja/${job.slug}`} className="hover:text-primary transition-colors">
          {job.title}
        </Link>
      </h3>
      {job.femaleOnly && (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-rose-300 bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
          <Users className="h-3 w-3" aria-hidden /> Khusus Wanita
        </span>
      )}
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden /> {job.city}</span>
        <span className="flex items-center gap-1"><BadgeDollarSign className="h-3.5 w-3.5" aria-hidden /> {salaryText(job)}/bln</span>
        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" aria-hidden /> {job.employmentType === "FULL_TIME" ? "Penuh Waktu" : job.employmentType === "PART_TIME" ? "Paruh Waktu" : job.employmentType === "CONTRACT" ? "Kontrak" : "Magang"}</span>
      </div>
      {job.salaryNote && !compact && <p className="mt-2 text-xs text-muted-foreground italic">{job.salaryNote}</p>}
      <div className="mt-auto pt-4">
        <Link
          href={`/lowongan-kerja/${job.slug}`}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md min-h-[44px] w-full"
        >
          Lihat Detail & Lamar
        </Link>
      </div>
    </article>
  );
}
