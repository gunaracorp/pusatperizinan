import type { Metadata } from "next";
import { IataArticlePage, iataArticleMetadata } from "@/components/iata/article-page";

// Route STATIS /panduan/persyaratan-iata-indonesia — artikel edukasi IATA (BAGIAN 8).
// Statis agar tidak ambigu dengan /panduan/[id] yang sudah ada.

export const metadata: Metadata = iataArticleMetadata("persyaratan-iata-indonesia");

export default function Page() {
  return <IataArticlePage slug="persyaratan-iata-indonesia" />;
}
