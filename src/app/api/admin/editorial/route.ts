import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import {
  ensureUpcomingWeeks,
  getEditorialBoard,
  starterExcerpt,
  scaffoldForPillar,
  pillarBySlotIndex,
  PILLAR_META,
} from "@/lib/editorial";
import type { EditorialPillar } from "@/lib/editorial";
import { ensureUniqueSlug, rowToCmsPost } from "@/lib/blog-cms";
import { normalizeSlug } from "../posts/helpers";

// ============================================================
// GET   /api/admin/editorial — papan kalender editorial 12 minggu
// PATCH /api/admin/editorial — kelola slot: skip / unskip / update topik
// POST  /api/admin/editorial — aksi {action:"start-draft"}: buat draft
//        Post CMS ter-prefill dari slot + tautkan (status → DRAFTED)
// ============================================================
// Kalender editorial blog 3×/minggu (ROADMAP-99 langkah 35):
// Senin = Panduan · Rabu = Regulasi (berita) · Jumat = Tips Pajak.

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export async function GET() {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    await ensureUpcomingWeeks();
    const board = await getEditorialBoard();
    return NextResponse.json({ success: true, data: board });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat kalender" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const id = String(body.id ?? "");
    const action = String(body.action ?? "");
    const slot = await db.editorialSlot.findUnique({ where: { id } });
    if (!slot) {
      return NextResponse.json({ success: false, error: "Slot tidak ditemukan" }, { status: 404 });
    }

    if (action === "skip") {
      if (slot.status === "DRAFTED" || slot.status === "PUBLISHED") {
        return NextResponse.json(
          { success: false, error: "Slot sudah punya draft/artikel — hapus atau selesaikan dulu" },
          { status: 400 }
        );
      }
      await db.editorialSlot.update({ where: { id }, data: { status: "SKIPPED" } });
      return NextResponse.json({ success: true, data: { id, status: "SKIPPED" } });
    }

    if (action === "unskip") {
      if (slot.status !== "SKIPPED") {
        return NextResponse.json({ success: false, error: "Slot tidak sedang dilewati" }, { status: 400 });
      }
      await db.editorialSlot.update({ where: { id }, data: { status: "PLANNED" } });
      return NextResponse.json({ success: true, data: { id, status: "PLANNED" } });
    }

    if (action === "update") {
      if (slot.status === "DRAFTED" || slot.status === "PUBLISHED") {
        return NextResponse.json(
          { success: false, error: "Slot sudah dipakai — edit judul lewat editor artikel" },
          { status: 400 }
        );
      }
      const title = String(body.title ?? "").trim();
      if (!title) {
        return NextResponse.json({ success: false, error: "Judul topik wajib diisi" }, { status: 400 });
      }
      await db.editorialSlot.update({
        where: { id },
        data: {
          title: title.slice(0, 200),
          focusKeyword: String(body.focusKeyword ?? "").trim().slice(0, 120) || null,
          keywords: String(body.keywords ?? "").trim().slice(0, 300) || null,
          notes: String(body.notes ?? "").trim().slice(0, 500) || null,
        },
      });
      return NextResponse.json({ success: true, data: { id } });
    }

    return NextResponse.json({ success: false, error: "Aksi tidak dikenal" }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memperbarui slot" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (String(body.action ?? "") !== "start-draft") {
      return NextResponse.json({ success: false, error: "Aksi tidak dikenal" }, { status: 400 });
    }
    const slot = await db.editorialSlot.findUnique({ where: { id: String(body.id ?? "") } });
    if (!slot) {
      return NextResponse.json({ success: false, error: "Slot tidak ditemukan" }, { status: 404 });
    }
    if (slot.status !== "PLANNED") {
      return NextResponse.json(
        { success: false, error: "Slot bukan berstatus rencana — cek status kalender" },
        { status: 400 }
      );
    }

    const pillar = pillarBySlotIndex(slot.slotIndex);
    const category = PILLAR_META[pillar].category;
    const slug = await ensureUniqueSlug(normalizeSlug(slot.title));
    const created = await db.post.create({
      data: {
        slug,
        title: slot.title,
        metaTitle: null,
        metaDescription: null,
        focusKeyword: slot.focusKeyword,
        keywords: slot.keywords,
        category,
        excerpt: starterExcerpt({ title: slot.title, notes: slot.notes }),
        readMinutes: 5,
        author: "Tim PusatPerizinan",
        authorRole: "Konsultan Perizinan",
        sections: JSON.stringify(scaffoldForPillar(pillar as EditorialPillar)),
        faq: "[]",
        cta: JSON.stringify({ text: "Konsultasi Sekarang", anchor: "#konsultasi" }),
        relatedArticles: JSON.stringify([]),
        relatedGuides: JSON.stringify([]),
        status: "DRAFT",
        noindex: false,
      },
    });

    await db.editorialSlot.update({
      where: { id: slot.id },
      data: { status: "DRAFTED", postId: created.id },
    });

    return NextResponse.json(
      { success: true, data: { post: rowToCmsPost(created) } },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal membuat draft" },
      { status: 500 }
    );
  }
}
