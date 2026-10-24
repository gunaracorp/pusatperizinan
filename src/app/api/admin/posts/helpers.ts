// ============================================================
// Helper bersama untuk API post CMS — validasi & normalisasi
// payload dari editor Mission Control → Konten & SEO.
// ============================================================

export function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // buang karakter non-URL
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

/** Validasi & normalisasi sections → JSON string (atau null bila bukan array) */
export function sanitizeSections(raw: unknown): string | null {
  if (!Array.isArray(raw)) return null;
  const clean = raw
    .filter(
      (s): s is { heading: string } =>
        s &&
        typeof s === "object" &&
        typeof (s as Record<string, unknown>).heading === "string" &&
        ((s as Record<string, unknown>).heading as string).trim().length > 0
    )
    .map((s) => {
      const sec = s as Record<string, unknown>;
      const paragraphs = Array.isArray(sec.paragraphs)
        ? (sec.paragraphs as unknown[]).map(String).filter((p) => p.trim())
        : [];
      const bullets = Array.isArray(sec.bullets)
        ? (sec.bullets as unknown[]).map(String).filter((b) => b.trim())
        : [];
      return {
        heading: String(sec.heading).trim(),
        paragraphs,
        ...(bullets.length > 0 ? { bullets } : {}),
      };
    });
  return JSON.stringify(clean);
}

/** Validasi & normalisasi FAQ → JSON string (atau null bila bukan array) */
export function sanitizeFaq(raw: unknown): string | null {
  if (!Array.isArray(raw)) return null;
  const clean = raw
    .filter(
      (f): f is { question: string; answer: string } =>
        f &&
        typeof f === "object" &&
        typeof (f as Record<string, unknown>).question === "string" &&
        typeof (f as Record<string, unknown>).answer === "string" &&
        ((f as Record<string, unknown>).question as string).trim().length > 0 &&
        ((f as Record<string, unknown>).answer as string).trim().length > 0
    )
    .map((f) => {
      const q = f as Record<string, unknown>;
      return { question: String(q.question).trim(), answer: String(q.answer).trim() };
    });
  return JSON.stringify(clean);
}
