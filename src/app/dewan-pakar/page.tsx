import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit, Scale, ShieldCheck, Workflow, AlertTriangle } from "lucide-react";
import { SITE_NAME, SITE_URL, LEGAL_ENTITY } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /dewan-pakar (Role Activation v2.1 FINAL)
// Kerangka 46 Domain Kepakaran + 46 Kursi Spesialisasi Hukum.
// Transparansi kapasitas: kerangka analisis multidisiplin, bukan
// klaim jumlah advokat nyata (sesuai mandat kepatuhan internal).
// Ditaut dari: /ketentuan-refund, footer, /tentang-kami.
// ============================================================

export const metadata: Metadata = {
  title: "Dewan Pakar — 46 Domain Kepakaran & 46 Spesialisasi Hukum",
  description: `Kerangka kerja multidisiplin ${SITE_NAME} (${LEGAL_ENTITY}): 46 domain kepakaran perizinan dari hulu ke hilir dan 46 kursi spesialisasi hukum yang diaktifkan sesuai kebutuhan setiap penugasan.`,
  alternates: { canonical: "/dewan-pakar" },
  robots: { index: true, follow: true },
};

const DOMAINS: { t: string; d: string }[] = [
  { t: "Perencanaan Investasi & Studi Kelayakan", d: "Uji kelayakan, struktur modal, rencana investasi, dan peta perizinan." },
  { t: "Hukum Badan Usaha", d: "Pendirian dan perubahan PT, PMA, CV, koperasi, yayasan, dan perkumpulan." },
  { t: "Perizinan Berusaha Berbasis Risiko & OSS", d: "NIB, perizinan berusaha, sertifikat standar, dan alur OSS-RBA." },
  { t: "KBLI & Klasifikasi Usaha", d: "Kesesuaian kegiatan usaha, kode KBLI, lokasi, skala, dan implikasi izin." },
  { t: "Penanaman Modal Asing (PMA)", d: "Struktur PMA, pemegang saham asing, modal, dan kepatuhan investasi." },
  { t: "Merger, Akuisisi & Restrukturisasi", d: "Perubahan pengendalian, merger, akuisisi, pemisahan, dan penyesuaian izin." },
  { t: "Minerba & Energi", d: "Perizinan pertambangan mineral dan batubara serta kewajiban sektoral." },
  { t: "Migas, Gas & Bunkering", d: "Kegiatan hulu/hilir migas, niaga gas, dan usaha bunkering." },
  { t: "Kehutanan & Pemanfaatan Kawasan", d: "Persetujuan dan perizinan pemanfaatan kawasan hutan." },
  { t: "Perkebunan & Pertanian", d: "Perizinan perkebunan, pertanian, budi daya, dan distribusi hasil." },
  { t: "Lingkungan Hidup", d: "AMDAL, UKL-UPL, SPPL, persetujuan lingkungan, dan kewajiban pengelolaan." },
  { t: "Kelautan & Perikanan", d: "Perizinan penangkapan/budi daya, pengangkutan, dan kegiatan perikanan." },
  { t: "Industri & Manufaktur", d: "Perizinan industri, standar, fasilitas, dan kewajiban operasional manufaktur." },
  { t: "Konstruksi", d: "SBU, perizinan jasa konstruksi, kualifikasi badan usaha dan personel." },
  { t: "Properti & Agraria", d: "Hak atas tanah, kesesuaian ruang, PBG, SLF, dan aspek pertanahan." },
  { t: "Ketenagakerjaan", d: "WLKP, hubungan kerja, PKWT, norma kerja, dan hubungan industrial." },
  { t: "Imigrasi & Tenaga Kerja Asing", d: "RPTKA, notifikasi, izin tinggal, dan kepatuhan penggunaan TKA." },
  { t: "Perpajakan Domestik", d: "NPWP, PKP, PPh, PPN, pajak daerah, dan kewajiban perpajakan usaha." },
  { t: "Pajak Internasional & Transfer Pricing", d: "P3B, transaksi afiliasi, dokumentasi harga transfer, dan isu pajak lintas batas." },
  { t: "Cukai", d: "Perizinan dan kewajiban cukai untuk barang kena cukai." },
  { t: "Kepabeanan & Ekspor-Impor", d: "Kepabeanan, PIB/PEB, klasifikasi HS, fasilitas, dan proses ekspor-impor." },
  { t: "SNI & Sertifikasi Produk", d: "SNI, sertifikasi produk, pengujian, dan kepatuhan standar teknis." },
  { t: "BPOM & Farmasi", d: "Registrasi/izin edar, sarana produksi/distribusi, dan ketentuan farmasi." },
  { t: "Pangan & Halal", d: "Keamanan pangan, sertifikasi halal, dan kewajiban pelaku usaha pangan." },
  { t: "Telekomunikasi & Digital", d: "PSE, sertifikasi perangkat, dan izin telekomunikasi/digital." },
  { t: "Keuangan & Fintech", d: "Ruang lingkup kegiatan keuangan, OJK, Bank Indonesia, dan kepatuhan fintech." },
  { t: "Perdagangan & Distribusi", d: "Kegiatan perdagangan, distribusi, pergudangan, dan tata niaga." },
  { t: "Waralaba", d: "Perjanjian waralaba, STPW, disclosure, dan kepatuhan jaringan waralaba." },
  { t: "Logistik & Multimoda", d: "Perizinan jasa logistik, pengangkutan, dan layanan multimoda." },
  { t: "Pariwisata & Perhotelan", d: "Perizinan akomodasi, usaha pariwisata, dan standar sektor pariwisata." },
  { t: "Pendidikan & Diklat", d: "Perizinan lembaga pendidikan, kursus, pelatihan, dan sertifikasi kompetensi." },
  { t: "Layanan Kesehatan", d: "Perizinan fasilitas pelayanan kesehatan dan kepatuhan tenaga kesehatan." },
  { t: "Energi Terbarukan & Ketenagalistrikan", d: "Perizinan pembangkitan, penyediaan listrik, dan energi terbarukan." },
  { t: "Kawasan Industri, KEK & Berikat", d: "Perizinan kawasan, fasilitas kepabeanan, KEK, dan kawasan berikat." },
  { t: "Riset & Pengembangan", d: "Kegiatan penelitian, pengembangan, inovasi, dan fasilitas terkait." },
  { t: "Kekayaan Intelektual", d: "Merek, paten, desain industri, hak cipta, lisensi, dan komersialisasi." },
  { t: "Notariil & Legalisasi", d: "Akta, layanan notaris/PPAT, legalisasi, apostille, dan konsuler." },
  { t: "Kontrak Komersial", d: "SPK, MoU, perjanjian jasa, kerja sama, distribusi, dan kontrak vendor." },
  { t: "Litigasi & Sengketa", d: "Pemetaan sengketa perdata, pidana, administrasi negara, dan strategi penanganan." },
  { t: "Arbitrase & Alternatif Penyelesaian Sengketa", d: "Negosiasi, mediasi, konsiliasi, arbitrase nasional dan internasional." },
  { t: "Perdagangan Internasional", d: "Perjanjian perdagangan, IK-CEPA, ACFTA, RCEP, dan tarif preferensi." },
  { t: "Kepatuhan APU-PPT & KYC", d: "Pemetaan kewajiban pihak pelapor dan pemeriksaan proporsional berbasis risiko." },
  { t: "Pelindungan Data & Siber", d: "UU PDP, tata kelola data, keamanan informasi, dan respons insiden." },
  { t: "ESG & Keberlanjutan", d: "Lingkungan, sosial, tata kelola, standar keberlanjutan, dan pelaporan." },
  { t: "Manajemen Proyek & Mutu", d: "PMO, timeline, risk register, quality assurance, dan audit jejak pekerjaan." },
  { t: "Layanan Pelanggan & Sengketa Konsumen", d: "Pengaduan, penanganan keluhan, BPSK, komunikasi, dan pemulihan layanan." },
];

const LEGAL_CHAIRS: { t: string; d: string }[] = [
  { t: "Hukum Administrasi Negara / TUN", d: "Keputusan administrasi, keberatan, banding administratif, dan sengketa TUN." },
  { t: "Hukum Perdata & Perjanjian", d: "Kontrak, wanprestasi, ganti rugi, pembatalan, dan interpretasi." },
  { t: "Hukum Komersial & Korporasi", d: "Tata kelola, aksi korporasi, tanggung jawab organ, dan kepatuhan perusahaan." },
  { t: "Hukum Korporasi PMA", d: "Pendirian, perubahan struktur, dan kepatuhan perusahaan penanaman modal asing." },
  { t: "PKPU & Kepailitan", d: "Restrukturisasi kewajiban, PKPU, kepailitan, dan hak kreditur/debitur." },
  { t: "Hukum Pidana Ekonomi", d: "Risiko pidana dalam transaksi, penipuan, penggelapan, dan tindak ekonomi." },
  { t: "Hukum Pidana Korporasi", d: "Pertanggungjawaban korporasi, pencegahan, investigasi, dan kepatuhan." },
  { t: "Hukum Pajak", d: "Kepatuhan, keberatan, banding, pemeriksaan, dan sengketa perpajakan." },
  { t: "Hukum Bea & Cukai", d: "Kepatuhan dan sengketa cukai/kepabeanan." },
  { t: "Kepabeanan & Ekspor-Impor", d: "Audit, klasifikasi, fasilitas, larangan/pembatasan, dan sengketa impor-ekspor." },
  { t: "Hukum Ketenagakerjaan", d: "Perjanjian kerja, PHK, perselisihan hubungan industrial, dan kepatuhan." },
  { t: "Hukum Tenaga Kerja Asing", d: "Penggunaan TKA, RPTKA, notifikasi, dan konsekuensi administratif." },
  { t: "Hukum Imigrasi", d: "Visa, izin tinggal, dan kepatuhan keimigrasian." },
  { t: "Hukum Lingkungan", d: "Persetujuan lingkungan, kepatuhan, sanksi, dan sengketa lingkungan." },
  { t: "Hukum Minerba & Energi", d: "Perizinan dan sengketa pertambangan/energi." },
  { t: "Hukum Migas", d: "Kontrak, kegiatan hulu/hilir, dan sengketa migas." },
  { t: "Hukum Kehutanan", d: "Kawasan hutan, persetujuan penggunaan, dan sengketa kehutanan." },
  { t: "Hukum Agraria & Properti", d: "Hak atas tanah, pertanahan, tata ruang, PBG/SLF, dan sengketa properti." },
  { t: "Hukum Kelautan & Perikanan", d: "Kepatuhan dan sengketa usaha kelautan/perikanan." },
  { t: "Hukum Konstruksi", d: "Kontrak konstruksi, klaim, keterlambatan, dan sengketa proyek." },
  { t: "Hukum Transportasi & Logistik", d: "Pengangkutan, tanggung jawab, kehilangan/kerusakan, dan sengketa logistik." },
  { t: "Hukum Fintech & Keuangan", d: "Perizinan, tata kelola, perlindungan pengguna, dan sengketa sektor keuangan." },
  { t: "Hukum Perbankan", d: "Kepatuhan perbankan, transaksi, jaminan, dan sengketa bank." },
  { t: "Hukum Asuransi", d: "Polis, klaim, penolakan klaim, dan sengketa asuransi." },
  { t: "Hukum Pasar Modal", d: "Transaksi efek, keterbukaan informasi, dan kepatuhan pasar modal." },
  { t: "Hukum PSE & E-Commerce", d: "Transaksi elektronik, PMSE, kontrak digital, dan tanggung jawab platform." },
  { t: "Hukum Pelindungan Data Pribadi", d: "Hak subjek data, dasar pemrosesan, keamanan, dan penanganan insiden." },
  { t: "Hukum Kekayaan Intelektual", d: "Merek, paten, desain, hak cipta, lisensi, dan pelanggaran." },
  { t: "Hukum Waralaba & Distribusi", d: "Kontrak waralaba, distributor, agen, dan pembatasan perdagangan." },
  { t: "Hukum BPOM & Farmasi", d: "Kepatuhan produk, registrasi, pengawasan, dan sengketa farmasi." },
  { t: "Hukum Pangan & Halal", d: "Keamanan pangan, sertifikasi halal, label, dan tanggung jawab produk." },
  { t: "Hukum Pariwisata", d: "Perizinan, tanggung jawab usaha, dan sengketa pariwisata." },
  { t: "Hukum Pendidikan", d: "Perizinan, tata kelola lembaga, dan sengketa pendidikan." },
  { t: "Hukum Kesehatan", d: "Perizinan fasilitas, tanggung jawab layanan, dan kepatuhan kesehatan." },
  { t: "Hukum Penanaman Modal", d: "Investasi, kewajiban investor, fasilitas, dan sengketa investasi." },
  { t: "Hukum Kawasan Industri & KEK", d: "Kepatuhan pengelola dan pelaku usaha di kawasan industri/KEK." },
  { t: "Hukum Perdagangan Internasional", d: "Kontrak lintas negara, pilihan hukum, distribusi, dan sengketa." },
  { t: "Hukum Arbitrase & APS", d: "Klausul arbitrase, mediasi, proses, dan pelaksanaan putusan." },
  { t: "Hukum Periklanan & Konten", d: "Klaim layanan, iklan, promosi, endorsement, dan informasi konsumen." },
  { t: "Hukum APU-PPT & White Collar", d: "Kepatuhan pihak pelapor, transaksi mencurigakan, dan risiko kejahatan kerah putih." },
  { t: "Hukum Usaha Keluarga & Suksesi", d: "Tata kelola keluarga, suksesi, pemegang saham, dan konflik internal." },
  { t: "Hukum Pendanaan & Kapitalisasi", d: "Investasi, pinjaman, saham, convertible instruments, dan jaminan." },
  { t: "Hukum Tender & Pengadaan", d: "Pengadaan, tender, konflik kepentingan, dan sengketa proses." },
  { t: "Hukum Rantai Pasok", d: "Kontrak pemasok, kualitas, keterlambatan, dan kepatuhan supply chain." },
  { t: "Hukum ESG & Perdagangan Karbon", d: "Klaim ESG, kewajiban lingkungan, karbon, dan risiko greenwashing." },
  { t: "Kepatuhan Korporat & Etika", d: "Program compliance, anti-penyuapan, whistleblowing, dan investigasi internal." },
];

const PROTOKOL = [
  { t: "Identifikasi tujuan bisnis", d: "Setiap penugasan dimulai dari pemetaan fakta dan due diligence — bukan dari asumsi template." },
  { t: "Aktivasi kursi yang relevan", d: "Kursi keahlian diaktifkan sesuai kebutuhan setiap kasus; tidak semua kursi dipaksa aktif bila tidak dibutuhkan." },
  { t: "Pemetaan hulu ke hilir", d: "Struktur badan usaha, KBLI, OSS-RBA, izin sektoral, kewajiban operasional, kepabeanan, investasi, hingga pasca-perizinan." },
  { t: "Identifikasi risiko & dependensi", d: "Isu hukum, prasyarat, ketergantungan instansi, bukti, biaya, dan opsi mitigasi diidentifikasi sebelum langkah diambil." },
  { t: "Dokumentasi & pelaporan", d: "Ruang lingkup, hasil kerja, biaya jasa, biaya pihak ketiga, asumsi, dan timeline dijelaskan melalui penawaran dan SPK tertulis." },
  { t: "Integritas tanpa jalan pintas", d: "Tidak ada gratifikasi, jalur tidak resmi, atau janji penerbitan izin di luar kewenangan; semua melalui kanal resmi." },
];

export default function DewanPakarPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/dewan-pakar#webpage`,
            name: `Kerangka 46 Domain Kepakaran & 46 Kursi Spesialisasi Hukum — ${SITE_NAME}`,
            description: metadata.description,
            isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/tentang-kami" className="hover:text-primary">Tentang Kami</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Dewan Pakar</li>
          </ol>
        </nav>

        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <BrainCircuit className="h-8 w-8 text-primary" aria-hidden />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Kerangka Dewan Pakar: 46 Domain &amp; 46 Kursi Hukum
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              {SITE_NAME} dioperasikan oleh {LEGAL_ENTITY} menggunakan kerangka analisis
              multidisiplin: <strong>46 domain kepakaran</strong> perizinan dan kepatuhan dari
              hulu ke hilir, serta <strong>46 kursi spesialisasi hukum</strong> sebagai klasifikasi
              ruang isu — diaktifkan sesuai kebutuhan setiap penugasan.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border px-3 py-1">46 Domain Kepakaran</span>
              <span className="rounded-full border px-3 py-1">46 Kursi Spesialisasi Hukum</span>
              <span className="rounded-full border px-3 py-1">Versi 2.1 — 26 November 2026</span>
            </div>
          </div>
        </div>

        {/* Transparansi kapasitas */}
        <section aria-labelledby="transparansi" className="mt-10">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h2 id="transparansi" className="font-bold">Transparansi kapasitas</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
                  Daftar 46 bidang pada halaman ini adalah <strong>kerangka domain dan kursi
                  spesialisasi</strong> — alat kerja analisis internal. Klaim mengenai jumlah
                  advokat aktual, nama, pengalaman, atau sertifikasi hanya dapat dipublikasikan
                  jika didukung bukti dan persetujuan yang sah. Tindakan profesi hukum, opini
                  formal, dan kuasa di pengadilan dilakukan profesional manusia yang memenuhi
                  kualifikasi dan ditunjuk secara tertulis. Asisten AI bukan advokat dan tidak
                  menggantikan pendapat hukum profesional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Protokol kerja */}
        <section aria-labelledby="protokol" className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">
            <Workflow className="mr-2 inline h-5 w-5 text-primary" aria-hidden />Protokol Kerja Hulu ke Hilir
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PROTOKOL.map((p) => (
              <div key={p.t} className="rounded-2xl border bg-card p-5">
                <h3 className="font-bold text-sm">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 46 Domain Kepakaran */}
        <section aria-labelledby="domain" className="mt-12">
          <h2 id="domain" className="text-xl font-bold">46 Dewan Pakar Lintas Bidang</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Domain diaktifkan sesuai kebutuhan setiap penugasan; bukan seluruhnya digunakan
            pada setiap kasus.
          </p>
          <ol className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {DOMAINS.map((r, i) => (
              <li key={r.t} className="flex gap-3 rounded-2xl border bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-extrabold text-primary" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-sm leading-snug">{r.t}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{r.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 46 Kursi Spesialisasi Hukum */}
        <section aria-labelledby="kursi" className="mt-12">
          <h2 id="kursi" className="text-xl font-bold">
            <Scale className="mr-2 inline h-5 w-5 text-primary" aria-hidden />46 Kursi Spesialisasi Hukum
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Klasifikasi berikut menunjukkan ruang isu hukum yang diuji pada setiap mandat.
            Status advokat dan kewenangan tindakan profesi diverifikasi untuk setiap individu
            yang ditugaskan.
          </p>
          <ol className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {LEGAL_CHAIRS.map((r, i) => (
              <li key={r.t} className="flex gap-3 rounded-2xl border bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-extrabold text-muted-foreground" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-sm leading-snug">{r.t}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{r.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Ketentuan refund teaser */}
        <section aria-labelledby="refund-teaser" className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <h2 id="refund-teaser" className="text-lg font-bold">Kaitan dengan Ketentuan Refund</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                Kerangka ini adalah mesin analisis di balik layanan kami; saat mandat dihentikan,
                pengembalian dana ditentukan berdasarkan pekerjaan yang benar-benar terlaksana
                (tahapan T0–T5 yang dapat dibuktikan), biaya pihak ketiga yang sah dan terbukti,
                ketentuan SPK, serta hukum yang berlaku — dari <strong>paling cepat 45 Hari Kerja</strong>{" "}
                hingga <strong>paling lama 24 bulan kalender</strong> untuk mandat lintas negara yang
                disepakati tertulis. Rincian lengkap di{" "}
                <Link href="/ketentuan-refund" className="font-semibold text-primary hover:underline">Ketentuan Refund &amp; Pengembalian Dana</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 text-center">
          <h2 className="text-lg font-bold">Butuh pemetaan perizinan dari hulu ke hilir?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Konsultasi awal gratis — kursi keahlian yang relevan dengan kasus Anda diaktifkan
            sejak penawaran pertama.
          </p>
          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              href="/katalog"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              Lihat Katalog Layanan
            </Link>
            <Link
              href="/tentang-kami"
              className="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-muted/60"
            >
              Tentang Kami
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
