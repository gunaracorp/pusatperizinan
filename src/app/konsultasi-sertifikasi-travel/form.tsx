"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { trackEvent } from "@/components/landing/analytics";
import { certWaLink } from "@/lib/sertifikasi-travel";

// Formulir pemeriksaan kesiapan trilogi sertifikasi travel
// (PPIU/PIHK/BPW) — POST ke /api/leads yang sudah ada (validasi
// server + notifikasi admin). Honeypot sederhana + consent privasi
// wajib. Tanpa data kredensial apa pun.

const PRODUCT_TO_MAP: Record<string, { package: string; source: string; label: string }> = {
  PPIU: { package: "Bisnis", source: "sertifikasi-ppiu", label: "Sertifikasi PPIU (umrah)" },
  PIHK: { package: "Enterprise", source: "sertifikasi-pihk", label: "Sertifikasi PIHK (haji khusus)" },
  BPW: { package: "UMKM", source: "sertifikasi-bpw", label: "Sertifikasi BPW (biro perjalanan wisata)" },
  "Belum tahu": { package: "Belum tahu", source: "sertifikasi-travel", label: "Belum tahu — minta rekomendasi" },
};

const BIZ_TYPES = ["Travel Ibadah (Haji/Umroh)", "Pariwisata / Hotel", "Jasa / Konsultan", "Lainnya"];

const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";
const labelCls = "block text-sm font-semibold text-stone-800";

export default function CertTravelForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [waFollowUp, setWaFollowUp] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: bot mengisi kolom tersembunyi → diam-diam dilaporkan sukses palsu.
    if (String(fd.get("company_website_hp") || "").length > 0) {
      setStatus("done");
      return;
    }
    if (!fd.get("consent")) {
      setError("Mohon setujui pemrosesan data pribadi dan kebijakan privasi sebelum mengirim.");
      return;
    }

    const get = (k: string) => String(fd.get(k) || "").trim();
    const namaPj = get("nama_penanggung_jawab");
    const wa = get("whatsapp");
    if (namaPj.length < 2) {
      setError("Nama penanggung jawab wajib diisi (min. 2 karakter).");
      return;
    }
    if (wa.replace(/[^0-9]/g, "").length < 9) {
      setError("Nomor WhatsApp tidak valid.");
      return;
    }

    const produk = get("produk_minati") || "Belum tahu";
    const map = PRODUCT_TO_MAP[produk] ?? PRODUCT_TO_MAP["Belum tahu"];
    const bizType = get("jenis_usaha") || "Lainnya";
    const ringkasan = [
      `Perusahaan: ${get("nama_perusahaan") || "-"}`,
      `Status badan usaha: ${get("status_badan") || "-"}`,
      `Jenis usaha: ${bizType}`,
      `KBLI aktif: ${get("kbli") || "-"}`,
      `Izin dasar: ${get("izin_dasar") || "-"}`,
      `Riwayat keberangkatan: ${get("riwayat") || "-"}`,
      `Produk diminati: ${produk}`,
      `Target waktu: ${get("target") || "-"}`,
      `Catatan: ${get("info_tambahan") || "-"}`,
    ].join(" | ").slice(0, 1000);

    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: namaPj,
          whatsapp: wa,
          email: get("email"),
          businessType: bizType,
          businessDesc: ringkasan,
          package: map.package,
          source: map.source,
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error || "Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.");
        setStatus("error");
        return;
      }
      trackEvent("submit_cert_travel_lead", { product: produk });
      setWaFollowUp(
        certWaLink(
          `Selamat siang PusatPerizinan.com, saya ${namaPj} dari ${get("nama_perusahaan") || "perusahaan kami"} baru saja mengisi formulir pemeriksaan kesiapan sertifikasi travel (minat: ${map.label}). Mohon dibantu tindak lanjutnya.`
        )
      );
      setStatus("done");
      form.reset();
    } catch {
      setError("Koneksi bermasalah. Silakan coba lagi atau hubungi kami via WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
        <p className="flex items-center gap-2 text-lg font-bold text-emerald-900">
          <CheckCircle2 className="h-6 w-6" aria-hidden /> Formulir Terkirim
        </p>
        <p className="mt-3 text-sm leading-relaxed text-emerald-900">
          Terima kasih. Profil perusahaan Anda telah kami terima — tim kami akan menghubungi
          Anda melalui WhatsApp/email dengan peta jalur sertifikasi yang paling efisien.
        </p>
        <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          Hasil formulir ini merupakan <strong>pemeriksaan awal administratif</strong> oleh
          PusatPerizinan.com — bukan keputusan kelayakan resmi penerbit izin. Kelayakan final
          mengikuti ketentuan Kemenag/Baparekraf dan hukum yang berlaku.
        </p>
        {waFollowUp && (
          <a
            href={waFollowUp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> Lanjut via WhatsApp Sekarang
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8" noValidate>
      <h2 className="text-xl font-bold text-stone-900">Pemeriksaan Kesiapan — Gratis &amp; Tanpa Komitmen</h2>
      <p className="mt-1 mb-6 text-sm text-stone-500">
        Isi sekali, kami petakan jalur PPIU / PIHK / BPW yang paling efisien untuk perusahaan Anda.
      </p>

      {status === "error" && error && (
        <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>
      )}

      <div className="grid gap-4">
        <div>
          <label htmlFor="produk_minati" className={labelCls}>Sertifikasi yang diminati</label>
          <select id="produk_minati" name="produk_minati" className={inputCls} defaultValue="Belum tahu">
            {Object.entries(PRODUCT_TO_MAP).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nama_perusahaan" className={labelCls}>Nama perusahaan</label>
            <input id="nama_perusahaan" name="nama_perusahaan" type="text" className={inputCls} placeholder="PT/CV — kosongkan bila belum ada" />
          </div>
          <div>
            <label htmlFor="status_badan" className={labelCls}>Status badan usaha</label>
            <select id="status_badan" name="status_badan" className={inputCls} defaultValue="Belum ada">
              <option>PT (perseroan terbatas)</option>
              <option>CV</option>
              <option>Koperasi</option>
              <option>Usaha perseorangan</option>
              <option>Belum ada</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="jenis_usaha" className={labelCls}>Jenis usaha saat ini</label>
            <select id="jenis_usaha" name="jenis_usaha" className={inputCls} defaultValue="Travel Ibadah (Haji/Umroh)">
              {BIZ_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="kbli" className={labelCls}>KBLI aktif saat ini</label>
            <input id="kbli" name="kbli" type="text" className={inputCls} placeholder="mis. 79120 / 79122 / belum ada" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="izin_dasar" className={labelCls}>Izin dasar yang dimiliki</label>
            <input id="izin_dasar" name="izin_dasar" type="text" className={inputCls} placeholder="mis. TDA BPW / PPIU / belum ada" />
          </div>
          <div>
            <label htmlFor="riwayat" className={labelCls}>Riwayat keberangkatan jamaah</label>
            <select id="riwayat" name="riwayat" className={inputCls} defaultValue="Belum ada">
              <option>Belum ada</option>
              <option>Umrah — kurang dari 5 rombongan</option>
              <option>Umrah — lebih dari 5 rombongan</option>
              <option>Umrah &amp; haji khusus</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nama_penanggung_jawab" className={labelCls}>Nama penanggung jawab <span className="text-red-600">*</span></label>
            <input id="nama_penanggung_jawab" name="nama_penanggung_jawab" type="text" required minLength={2} className={inputCls} placeholder="Nama lengkap" />
          </div>
          <div>
            <label htmlFor="whatsapp" className={labelCls}>Nomor WhatsApp <span className="text-red-600">*</span></label>
            <input id="whatsapp" name="whatsapp" type="tel" required className={inputCls} placeholder="08xxxxxxxxxx" inputMode="tel" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelCls}>Email</label>
            <input id="email" name="email" type="email" className={inputCls} placeholder="opsional" />
          </div>
          <div>
            <label htmlFor="target" className={labelCls}>Target mulai usaha</label>
            <select id="target" name="target" className={inputCls} defaultValue="1–3 bulan">
              <option>Segera (1–3 bulan)</option>
              <option>3–6 bulan</option>
              <option>Tahun ini</option>
              <option>Masih riset</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="info_tambahan" className={labelCls}>Catatan tambahan</label>
          <textarea id="info_tambahan" name="info_tambahan" rows={3} className={inputCls} placeholder="Ceritakan kondisi usaha Anda hari ini (opsional)" />
        </div>

        {/* Honeypot — tersembunyi dari manusia, tidak dari bot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_website_hp">Website perusahaan (jangan diisi)</label>
          <input id="company_website_hp" name="company_website_hp" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-600">
          <input id="consent" name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-emerald-700" />
          <span>
            Saya menyetujui data pada formulir ini diproses untuk keperluan tindak lanjut konsultasi sesuai
            kebijakan privasi PusatPerizinan.com. Data tidak digunakan untuk tujuan lain.
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Mengirim…</>
          ) : (
            "Kirim & Minta Pemeriksaan Kesiapan"
          )}
        </button>
        <p className="text-center text-xs text-stone-400">Balasan cepat di jam kerja — tim konsultan senior, bukan bot.</p>
      </div>
    </form>
  );
}
