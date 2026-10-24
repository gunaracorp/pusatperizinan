import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { INDEXNOW_LIMITS } from "@/lib/webmaster-tools";

// ============================================================
// PUSATPERIZINAN.COM — INDEXNOW API (Ping Instan Mesin Pencari)
// ============================================================
// POST /api/indexnow  { urls: string[] }
//   → meneruskan daftar URL ke api.indexnow.org (jaringan IndexNow
//     yang dibaca Bing, Yandex, Seznam, Naver, Ecosia, Qwant, Yep).
//   Kunci diambil dari env INDEXNOW_KEY; file kunci tersaji sebagai
//     FILE STATIS di public/<key>.txt (bekerja di dev/standalone/export).
// GET  /api/indexnow  → status konfigurasi (tanpa membocorkan key).
// ============================================================

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function infoResponse() {
  const key = process.env.INDEXNOW_KEY;
  return NextResponse.json({
    ok: true,
    protocol: "IndexNow v1",
    endpoint: INDEXNOW_LIMITS.endpoint,
    host: new URL(SITE_URL).host,
    keyConfigured: Boolean(key),
    keyLocation: key ? `${SITE_URL}/${key}.txt` : null,
    maxUrlsPerRequest: INDEXNOW_LIMITS.maxUrlsPerRequest,
    engines: ["Bing", "Yandex", "Seznam", "Naver", "Ecosia", "Qwant", "Yep"],
    usage: 'POST { "urls": ["https://pusatperizinan.com/..."] }',
  });
}

export async function GET() {
  return infoResponse();
}

export async function POST(req: NextRequest) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "INDEXNOW_KEY belum di-set. Generate kunci di /webmaster (tab IndexNow), lalu tambahkan INDEXNOW_KEY=<kunci> ke .env dan restart server.",
      },
      { status: 400 }
    );
  }

  let body: { urls?: unknown } | null = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body JSON tidak valid" }, { status: 400 });
  }

  const raw = Array.isArray(body?.urls) ? body!.urls : [];
  const urls = raw
    .map((u) => String(u).trim())
    .filter((u) => /^https?:\/\//i.test(u))
    .slice(0, INDEXNOW_LIMITS.maxUrlsPerRequest);
  if (!urls.length) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Tidak ada URL valid. Kirim { urls: ["https://..."] } atau tulis URL satu per baris di /webmaster.',
      },
      { status: 400 }
    );
  }

  // Semua URL harus milik host canonical — IndexNow menolak campuran host.
  const host = new URL(SITE_URL).host;
  const foreign = urls.filter((u) => {
    try {
      return new URL(u).host !== host;
    } catch {
      return true;
    }
  });
  if (foreign.length) {
    return NextResponse.json(
      {
        ok: false,
        error: `Semua URL harus milik ${host} (sesuai kunci IndexNow).`,
        foreignSample: foreign.slice(0, 5),
      },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(INDEXNOW_LIMITS.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      cache: "no-store",
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList: urls,
      }),
    });

    // IndexNow: 200/202 = OK, 429 = quota, 403 = key tidak valid, 422 = key/url mismatch
    const messages: Record<number, string> = {
      200: `✅ ${urls.length} URL diterima — ping instan dikirim ke jaringan IndexNow (Bing, Yandex, Seznam, Naver, Ecosia, Qwant, Yep).`,
      202: `✅ ${urls.length} URL diterima (antrian) — mesin pencari akan memproses sebentar lagi.`,
      400: "❌ Permintaan ditolak — format URL tidak valid.",
      403: "❌ Kunci IndexNow tidak valid (403). Pastikan file /<key>.txt tersaji & isinya persis kuncinya.",
      422: "❌ Kunci atau URL tidak cocok dengan host (422).",
      429: "⚠️ Terlalu banyak permintaan (429) — tunggu beberapa menit lalu kirim ulang.",
    };

    return NextResponse.json(
      {
        ok: res.ok || res.status === 202,
        status: res.status,
        message: messages[res.status] ?? `Respon IndexNow: HTTP ${res.status}`,
        submitted: urls.length,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Gagal menghubungi api.indexnow.org (jaringan sandbox mungkin membatasi keluar). Saat deploy produksi, ping akan berjalan normal.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 }
    );
  }
}
