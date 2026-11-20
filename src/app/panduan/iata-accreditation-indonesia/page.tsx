import type { Metadata } from "next";
import { IataArticlePage, iataArticleMetadata } from "@/components/iata/article-page";

// Route STATIS /panduan/iata-accreditation-indonesia — artikel edukasi IATA (BAGIAN 8).
// Statis agar tidak ambigu dengan /panduan/[id] yang sudah ada.

export const metadata: Metadata = iataArticleMetadata("iata-accreditation-indonesia");

export default function Page() {
  return <IataArticlePage slug="iata-accreditation-indonesia" />;
}
