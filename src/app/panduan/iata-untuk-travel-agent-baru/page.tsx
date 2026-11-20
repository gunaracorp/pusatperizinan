import type { Metadata } from "next";
import { IataArticlePage, iataArticleMetadata } from "@/components/iata/article-page";

// Route STATIS /panduan/iata-untuk-travel-agent-baru — artikel edukasi IATA (BAGIAN 8).
// Statis agar tidak ambigu dengan /panduan/[id] yang sudah ada.

export const metadata: Metadata = iataArticleMetadata("iata-untuk-travel-agent-baru");

export default function Page() {
  return <IataArticlePage slug="iata-untuk-travel-agent-baru" />;
}
