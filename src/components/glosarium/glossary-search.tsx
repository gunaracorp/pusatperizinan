"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";

export interface GlossarySearchItem {
  slug: string;
  term: string;
  category: string;
  categoryName: string;
}

/**
 * Pencarian & filter glosarium — client-side (static-export friendly).
 * Data ringan: hanya slug + nama + kategori (tanpa isi definisi).
 */
export function GlossarySearch({
  items,
  categories,
}: {
  items: GlossarySearchItem[];
  categories: { id: string; name: string }[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("semua");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchCat = active === "semua" || item.category === active;
      const matchQ =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.slug.includes(q.replace(/\s+/g, "-"));
      return matchCat && matchQ;
    });
  }, [items, query, active]);

  const grouped = useMemo(() => {
    const map = new Map<string, GlossarySearchItem[]>();
    for (const item of results) {
      const bucket = map.get(item.categoryName);
      if (bucket) bucket.push(item);
      else map.set(item.categoryName, [item]);
    }
    return [...map.entries()];
  }, [results]);

  const hasQuery = query.trim().length > 0 || active !== "semua";

  return (
    <div>
      {/* Kontrol pencarian */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari istilah… mis. NIB, LKPM, RPTKA, faktur pajak"
            aria-label="Cari istilah glosarium"
            className="w-full rounded-2xl border bg-card py-3.5 pl-12 pr-12 text-base outline-none transition-colors focus:border-primary/50"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Hapus pencarian"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>

        {/* Filter kategori */}
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter kategori istilah"
        >
          <button
            type="button"
            onClick={() => setActive("semua")}
            aria-pressed={active === "semua"}
            className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors min-h-[40px] ${
              active === "semua"
                ? "border-primary/40 bg-primary/10 text-primary"
                : "bg-card hover:border-primary/30"
            }`}
          >
            Semua ({items.length})
          </button>
          {categories.map((c) => {
            const count = items.filter((i) => i.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={active === c.id}
                className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors min-h-[40px] ${
                  active === c.id
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "bg-card hover:border-primary/30"
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Hasil */}
      <div className="mt-8">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {hasQuery
            ? `${results.length} istilah cocok dengan filter Anda.`
            : `${results.length} istilah terdaftar — pilih kategori atau cari untuk menyaring.`}
        </p>

        {results.length === 0 ? (
          <div className="mt-6 rounded-2xl border bg-card p-8 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
            <p className="mt-3 font-semibold">Tidak ada istilah yang cocok</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Coba kata kunci lain — misalnya &quot;NIB&quot;, &quot;PPh&quot;,
              atau &quot;izin edar&quot;.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-8">
            {grouped.map(([catName, catItems]) => (
              <section key={catName} aria-label={catName}>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  {catName}
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-foreground">
                    {catItems.length}
                  </span>
                </h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {catItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/glosarium/${item.slug}`}
                      className="group flex items-center justify-between gap-2 rounded-xl border bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary/40 hover:shadow-sm"
                    >
                      <span className="truncate">{item.term}</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
