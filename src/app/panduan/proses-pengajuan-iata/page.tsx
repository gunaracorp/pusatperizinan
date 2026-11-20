import type { Metadata } from "next";
import { IataArticlePage, iataArticleMetadata } from "@/components/iata/article-page";

// Route STATIS /panduan/proses-pengajuan-iata — artikel edukasi IATA (BAGIAN 8).
// Statis agar tidak ambigu dengan /panduan/[id] yang sudah ada.

export const metadata: Metadata = iataArticleMetadata("proses-pengajuan-iata");

export default function Page() {
  return <IataArticlePage slug="proses-pengajuan-iata" />;
}
