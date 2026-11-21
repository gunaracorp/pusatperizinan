import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { isLangCode, langEnglishName } from "@/lib/i18n/languages";
import { notifyNewLead } from "@/lib/notify";
import { PACKAGES } from "@/lib/pricing";
import { KATALOG_V2 } from "@/lib/katalog-v2";
import { KATALOG_V3 } from "@/lib/katalog-v3";
import { resolveAnyService } from "@/lib/service-order";

// ============================================================
// POST /api/chat — Konsultan AI Perizinan 24/7
// AI expert Indonesia licensing yang juga menangkap lead
// ============================================================

// In-memory conversation store (per session)
const conversations = new Map<string, { role: string; content: string }[]>();
const sessionLangs = new Map<string, string>();

/** Suffix instruksi bahasa untuk system prompt (dipanggil saat visitor memilih bahasa) */
function languageSuffix(langCode: string): string {
  if (!isLangCode(langCode) || langCode === "id") return "";
  const name = langEnglishName(langCode);
  return `\n\nBAHASA JAWABAN WAJIB: Pengunjung memilih bahasa ${name}. Selalu balas dalam ${name} yang natural, hangat, dan profesional (istilah hukum Indonesia seperti NIB, PT, KBLI, OSS boleh tetap dalam bentuk aslinya). Jika user menulis dalam bahasa lain, ikuti bahasa user.`;
}

const SYSTEM_PROMPT = `Kamu adalah "RIZKI", Konsultan AI Senior PusatPerizinan.com — konsultan perizinan usaha terbaik di Indonesia. Kamu menguasai seluruh regulasi perizinan Indonesia secara mendalam.

KEAHLIANMU:
1. NIB (Nomor Induk Berusaha) & OSS-RBA (Online Single Submission Risk-Based Approach) — cara daftar, persyaratan, perbedaan izin berdasarkan risiko (rendah/menengah rendah/menengah tinggi/tinggi)
2. Pendirian badan usaha: PT (Perseroan Terbatas) lokal & PMA, CV, Firma, Koperasi, Perseorangan — biaya, waktu, persyaratan notaris
3. KBLI 2020/2025 — kode klasifikasi bidang usaha Indonesia, cara memilih kode yang tepat
4. Izin sektor spesifik: SIUP, TDUP (izin usaha angkutan), Sertifikat Standar, Izin Lingkungan (SPPL/UKL-UPL/AMDAL), IMB/PBG & SLF, Izin Usaha Pariwisata, Izin Depot/Izin Niaga, Izin Edar & BPOM (MD, CPPOB), Sertifikasi Halal (UU JPH, gratis via Sehati), SNI, Izin Freelance/Perseorangan
5. Perizinan khusus: Pertambangan (IUP, IUPK), Kehutanan, Perikanan (SIPI), Farmasi/Klinik (SIPA, SIKIA), Pendidikan, Ketenagakerjaan (Wajib Lapor, RPTKA untuk TKA)
6. Kewajiban pasca-izin: NPWP, PKP (SPPKP), laporan OSS, LKPM (Laporan Kegiatan Penanaman Modal), pajak UMKM PPh final 0.5%, UU Cipta Kerja
7. KATALOG SPESIALISASI FLAGSHIP — travel haji-umrah: PPIU (jasa mulai Rp 20jt all-in, 90-120 hari; syarat PT KBLI 79120, TDUP aktif, SISKOPATUH), PIHK/haji plus (jasa mulai Rp 25jt all-in; syarat PPIU aktif 2 tahun + track record 2.000 jamaah + laporan auditan), izin kuota haji plus tahunan (Rp 6,5-19,5jt/musim), sertifikasi tour leader & guide, perpanjangan PPIU/PIHK (siklus 5 tahun), pra-audit compliance Kemenag
8. PAKET BUNDEL UNGGULAN (harga promo 50% — Master Pricing Haji-Umrah 2026): "GO UMRAH!" Rp 100jt promo (normal Rp 200jt; PT + izin + PPIU + training), "GO HAJI PLUS!" Rp 215jt promo (normal Rp 430jt; PT + PPIU + PIHK + strategi), "UPGRADE PPIU KE PIHK" Rp 115jt promo (normal Rp 230jt), "SERTIFIKASI ISO LENGKAP" Rp 39jt (9001+14001+45001), "PERIZINAN HOTEL COMPLETE" Rp 71,5jt, "LEGALITAS LENGKAP STARTUP" Rp 32,5jt
9. BUNDLE IATA — TRAVEL GLOBAL (gabungan promo komponen; komponen bisa diambil terpisah): "TRAVEL-GLOBAL-STARTER" Rp 47.787.500 promo (normal Rp 75.575.000; IATA GoLite promo + Sertifikasi PPIU), "TRAVEL-GLOBAL-PRO" Rp 98.437.500 promo (normal Rp 151.875.000; IATA GoStandard promo + Sertifikasi PPIU + PIHK). Matriks harga IATA: GoLite katalog Rp 55.575.000 promo Rp 27.787.500; GoStandard katalog Rp 106.875.000 promo Rp 53.437.500; GoGlobal mulai Rp 213.750.000 promo mulai Rp 106.875.000 (penawaran khusus multi-negara)
10. KATALOG LENGKAP 31 divisi: halaman /katalog (semua layanan + kisaran harga + timeline) dan /paket (paket bundel) — arahkan user kesana untuk menjelajah mandiri

GAYA MENJAWAB:
- Bahasa Indonesia hangat, profesional, meyakinkan — seperti konsultan senior yang peduli
- JAWAB SINGKAT & TERSTRUKTUR (maksimal 120 kata kecuali diminta detail). Gunakan bullet poin dengan simbol • saat menjelaskan langkah/persyaratan
- Selalu akhiri jawaban substantif dengan 1 pertanyaan penjajakan (contoh: "Boleh tau jenis usahanya apa dan sudah berdiri di mana, Kak?" atau "Kapan rencana mulai operasional?")
- Jika ditanya harga: sebutkan rentang indikatif (jasa mulai Rp 585rb untuk registrasi, paket pendirian PT mulai Rp 3,9jt, PPIU mulai Rp 20jt) lalu arahkan konsultasi gratis — tegaskan harga adalah jasa konsultan, biaya resmi negara terpisah
- Jika user menyebut kebutuhan spesifik, tawarkan: "Tim kami bisa proseskan full sampai selesai, Kak tinggal terima dokumen"
- Jika user memberikan NAMA + NOMOR WHATSAPP, ucapkan terima kasih dan konfirmasi bahwa tim akan menghubungi via WhatsApp
- Jika user menanyakan cara kontak / nomor resmi, sebutkan WhatsApp resmi PusatPerizinan.com: 0812-6999-9910 (kantor SCBD, se-lantai Bursa Efek Indonesia)
- JUJUR: jangan mengklaim "terbesar di Indonesia" atau kemitraan yang belum terverifikasi — fokus pada kekuatan nyata: jangkauan 38 provinsi, katalog 31 divisi, garansi tertulis, proses transparan

TANGKAP LEAD SECARA ALAMI:
Selalu dorong percakapan ke arah user meninggalkan nama + nomor WhatsApp untuk konsultasi gratis / penawaran resmi. Jangan memaksa, tapi yakinkan manfaatnya (konsultasi gratis, penawaran resmi, prioritas proses).

JANGAN:
- Jangan mengarang KBLI code secara spesifik jika ragu (boleh menyebut contoh umum)
- Jangan menjanjikan pasti selesai dalam waktu tertentu tanpa "estimasi"
- Jangan menjawab topik di luar bisnis/perizinan/pajak usaha — arahkan kembali dengan sopan

MODE AGEN PENJUALAN (AKTIF):
- Setiap pesan user menyertakan blok "KATALOG TERKINI" berisi paket unggulan + layanan katalog paling relevan dengan kode & harga PERSIS dari sistem (server-side, anti-manipulasi).
- WAJIB: setiap kali kamu merekomendasikan item yang ada di blok, sertakan link order yang bisa diklik dengan format persis: [Order Nama — Rp harga](/checkout?paket=KODE). Jawaban yang merekomendasikan layanan TANPA link order dianggap gagal.
- SATU link = SATU kode paket/katalog. Jika kamu merekomendasikan beberapa item, berikan link TERPISAH per item — jangan pernah menggabungkan dua kode dalam satu link.
- DILARANG mengarang kode, harga, atau link di luar blok. Jika kebutuhan user tidak ada di blok: jelaskan umum, arahkan ke /katalog, dan tawarkan konsultasi gratis.
- Harga yang dikutip = jasa konsultan; biaya resmi negara/notaris ditagih terpisah — selalu disebutkan saat memberi link order.
- Jika user bertanya soal rencana/fitur masa depan platform, perkenalkan halaman visi: /masa-depan`;

// ============================================================
// RIZKI 2.0 — MESIN RETRIEVAL KATALOG (agen bisa MENJUAL)
// Indeks in-memory seluruh katalog orderable; setiap pesan user
// din-lokalisasi → 6 layanan paling relevan + paket unggulan
// disuntikkan ke system prompt dengan harga & link checkout
// persis dari server (sumber: pricing.ts + katalog v2/v3).
// ============================================================

interface CatalogEntry {
  code: string;
  name: string;
  search: string;
  price: number;
  strike?: number;
  duration: string;
  checkoutUrl: string;
}

const CATALOG_INDEX: CatalogEntry[] = [
  ...PACKAGES.map((p) => ({
    code: p.id,
    name: p.name,
    search: `${p.name} ${p.tagline} ${p.category}`.toLowerCase(),
    price: p.price,
    strike: p.strike,
    duration: p.duration,
    checkoutUrl: `/checkout?paket=${p.id}`,
  })),
  ...KATALOG_V2.map((s) => ({
    code: s.code,
    name: s.name,
    search: `${s.name} ${s.slug} ${s.category}`.toLowerCase(),
    price: s.discountPrice,
    strike: s.normalPrice,
    duration: s.estimate,
    checkoutUrl: `/checkout?paket=${s.code}`,
  })),
  ...KATALOG_V3.map((s) => ({
    code: s.code,
    name: s.name,
    search: `${s.name} ${s.slug} ${s.category}`.toLowerCase(),
    price: s.discountPrice,
    strike: s.normalPrice,
    duration: s.estimate,
    checkoutUrl: `/checkout?paket=${s.code}`,
  })),
];

const STOPWORDS = new Set([
  "yang", "dan", "untuk", "dengan", "saya", "kami", "apa", "bagaimana", "kenapa",
  "bisa", "mau", "ingin", "ada", "sudah", "belum", "kak", "min", "tolong", "dong",
  "the", "and", "for", "with", "want", "need", "how", "what", "harga", "berapa",
]);

/**
 * Pengaman anti-halusinasi: semua link checkout di balasan AI
 * divalidasi terhadap sumber harga server (PACKAGES + katalog
 * v1/v2/v3). Kode yang tidak dikenal dilucuti menjadi teks biasa
 * sehingga pengunjung tidak pernah menerima link checkout rusak.
 */
function sanitizeCheckoutLinks(reply: string): string {
  return reply.replace(
    /\[([^\]]+)\]\(\/checkout\?paket=([A-Za-z0-9-]+)\)/g,
    (full: string, label: string, code: string) => {
      const valid =
        PACKAGES.some((p) => p.id === code) || !!resolveAnyService(code);
      return valid ? full : label;
    }
  );
}

function formatRupiah(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

const PAKET_PROMO_LINES: string[] = PACKAGES.slice(0, 8).map(
  (p) => `- ${p.id} | ${p.name} — ${formatRupiah(p.price)} (${p.duration}) | Order: [${p.name} — ${formatRupiah(p.price)}](${`/checkout?paket=${p.id}`})`
);

function retrieveCatalog(message: string): CatalogEntry[] {
  const lower = message.toLowerCase();
  const tokens = lower
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
  // token pendek penting domain: pt, cv, npwp, ppn
  for (const short of ["pt", "cv"]) {
    if (new RegExp(`\\b${short}\\b`).test(lower)) tokens.push(short);
  }
  if (tokens.length === 0) return [];
  return CATALOG_INDEX.map((e) => {
    let score = 0;
    const nameLower = e.name.toLowerCase();
    for (const t of tokens) {
      if (nameLower.includes(t)) score += 3;
      else if (e.search.includes(t)) score += 1;
    }
    return { e, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((x) => x.e);
}

function buildCatalogBlock(message: string): string {
  const relevant = retrieveCatalog(message);
  const lines: string[] = [
    "",
    "",
    "=== KATALOG TERKINI (data langsung dari sistem — kode, harga, dan link WAJIB dipakai persis) ===",
    "--- PAKET UNGGULAN (selalu boleh ditawarkan) ---",
    ...PAKET_PROMO_LINES,
  ];
  if (relevant.length > 0) {
    lines.push("--- LAYANAN KATALOG PALING RELEVAN DENGAN PERCAKAPAN INI ---");
    for (const e of relevant) {
      lines.push(
        `- ${e.code} | ${e.name} — ${formatRupiah(e.price)}${e.strike ? ` (normal ${formatRupiah(e.strike)})` : ""} (${e.duration}) | Order: [${e.name} — ${formatRupiah(e.price)}](${e.checkoutUrl})`
      );
    }
  }
  lines.push("Saat menawarkan item di atas, gunakan format link persis seperti contoh.");
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, message, language } = body;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ success: false, error: "sessionId wajib" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Pesan kosong" }, { status: 400 });
    }
    const userMessage = message.trim().slice(0, 2000);

    // Ambil / buat riwayat percakapan (dengan instruksi bahasa aktif)
    const langCode = isLangCode(language) ? language : "id";
    const existingLang = sessionLangs.get(sessionId);
    let history = conversations.get(sessionId);
    if (!history) {
      history = [{ role: "assistant", content: SYSTEM_PROMPT }];
      conversations.set(sessionId, history);
      sessionLangs.set(sessionId, langCode);
    } else if (existingLang !== langCode) {
      // Bahasa diganti di tengah sesi -> perbarui instruksi bahasa
      sessionLangs.set(sessionId, langCode);
    }
    // RIZKI 2.0: system prompt diperbarui setiap giliran dengan blok
    // katalog relevan (retrieval) — agen selalu memakai harga server.
    history[0] = {
      role: "assistant",
      content: SYSTEM_PROMPT + languageSuffix(langCode) + buildCatalogBlock(userMessage),
    };

    // Simpan pesan user ke DB
    await db.chatMessage.create({
      data: { sessionId, role: "user", content: userMessage },
    });

    history.push({ role: "user", content: userMessage });

    // Trim riwayat (jaga context window): simpan system prompt + 20 pesan terakhir
    if (history.length > 21) {
      const trimmed = [history[0], ...history.slice(-20)];
      history.length = 0;
      history.push(...trimmed);
    }

    // Panggil LLM
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: history as {
        role: "system" | "user" | "assistant";
        content: string;
      }[],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content;
    if (!reply || reply.trim().length === 0) {
      throw new Error("Empty AI response");
    }

    const safeReply = sanitizeCheckoutLinks(reply);

    history.push({ role: "assistant", content: safeReply });

    // Deteksi apakah lead tertangkap (user menyebut nomor WA di percakapan)
    const convoText = history.map((m) => m.content).join(" ");
    const waPattern = /(\+62|62|0)8[0-9]{7,13}/;
    const leadCaptured = waPattern.test(userMessage);

    if (leadCaptured) {
      // Ekstrak nomor WA & simpan sebagai lead dari chat
      const match = userMessage.match(waPattern);
      if (match) {
        const wa = match[0].replace(/[^0-9]/g, "");
        const normalizedWa = wa.startsWith("0") ? `62${wa.slice(1)}` : wa;
        // Cek apakah lead dari session ini sudah ada
        const existing = await db.lead.findFirst({
          where: { whatsapp: normalizedWa, source: "chat" },
        });
        if (!existing) {
          const chatLead = await db.lead.create({
            data: {
              name: "Lead dari Chat AI",
              whatsapp: normalizedWa,
              businessType: "Lainnya",
              source: "chat",
              notes: `Session: ${sessionId}. Konteks: ${userMessage.slice(0, 300)}`,
            },
          });
          // 🔔 Notifikasi real-time Telegram/WhatsApp (fire-and-forget)
          void notifyNewLead({
            leadId: chatLead.id,
            name: chatLead.name,
            whatsapp: chatLead.whatsapp,
            source: "chat",
            notes: chatLead.notes,
          });
        }
      }
    }

    // Simpan balasan AI ke DB
    await db.chatMessage.create({
      data: { sessionId, role: "assistant", content: safeReply, leadCaptured },
    });

    return NextResponse.json({ success: true, reply: safeReply, leadCaptured });
  } catch (error) {
    console.error("[API /chat] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Mohon maaf, sistem sedang sibuk. Silakan coba lagi atau hubungi WhatsApp kami langsung di 0812-6999-9910.",
      },
      { status: 500 }
    );
  }
}
