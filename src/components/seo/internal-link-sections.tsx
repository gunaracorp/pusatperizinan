// ============================================================
// PUSATPERIZINAN.COM — SEKSI INTERNAL LINK (server component)
// ============================================================
// Merender grup-grup tautan internal (chips) secara konsisten di
// seluruh halaman programatik. Murni server render — tanpa client JS.
// Aksesibilitas: nav aria-label unik per seksi, <h2> berjenjang.
// ============================================================

import Link from "next/link";
import { BookOpen, Compass, Link2, MapPin, Wrench } from "lucide-react";
import type { InternalLinkGroup } from "@/lib/internal-links";

const ICONS = [MapPin, Compass, BookOpen, Wrench, Link2];

function headingIcon(index: number) {
  const Icon = ICONS[index % ICONS.length];
  return <Icon className="h-4.5 w-4.5 text-primary shrink-0" aria-hidden />;
}

/**
 * Render 1–N grup link internal. Pakai di:
 *  - /layanan/[...slug]   (silo wilayah)
 *  - landing-renderer     (biaya/syarat/industri)
 *  - /glosarium/[slug]    (jembatan layanan)
 *  - /bandingkan/[slug]   (jembatan layanan+glosarium)
 *  - /[slug]              (landing 500)
 */
export function InternalLinkSections({
  groups,
  ariaPrefix = "Tautan terkait",
}: {
  groups: InternalLinkGroup[];
  ariaPrefix?: string;
}) {
  if (groups.length === 0) return null;
  return (
    <>
      {groups.map((g, gi) => (
        <section
          key={g.heading}
          className="mt-10"
          aria-labelledby={`il-heading-${gi}`}
        >
          <h2
            id={`il-heading-${gi}`}
            className="flex items-center gap-2 text-lg font-bold mb-4"
          >
            {headingIcon(gi)}
            {g.heading}
          </h2>
          <nav aria-label={`${ariaPrefix}: ${g.heading}`}>
            <ul className="flex flex-wrap gap-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex max-w-full items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                  >
                    <span className="truncate">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      ))}
    </>
  );
}
