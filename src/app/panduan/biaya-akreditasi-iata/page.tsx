import type { Metadata } from "next";
import { IataArticlePage, iataArticleMetadata } from "@/components/iata/article-page";

// Route STATIS /panduan/biaya-akreditasi-iata — artikel edukasi IATA (BAGIAN 8).
// Statis agar tidak ambigu dengan /panduan/[id] yang sudah ada.

export const metadata: Metadata = iataArticleMetadata("biaya-akreditasi-iata");

export default function Page() {
  return <IataArticlePage slug="biaya-akreditasi-iata" />;
}
