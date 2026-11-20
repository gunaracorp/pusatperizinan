import type { Metadata } from "next";
import { IataArticlePage, iataArticleMetadata } from "@/components/iata/article-page";

// Route STATIS /panduan/perbedaan-iata-golite-gostandard-goglobal — artikel edukasi IATA (BAGIAN 8).
// Statis agar tidak ambigu dengan /panduan/[id] yang sudah ada.

export const metadata: Metadata = iataArticleMetadata("perbedaan-iata-golite-gostandard-goglobal");

export default function Page() {
  return <IataArticlePage slug="perbedaan-iata-golite-gostandard-goglobal" />;
}
