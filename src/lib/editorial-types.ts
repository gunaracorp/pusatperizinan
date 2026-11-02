// Shared, browser-safe data contracts for the editorial calendar UI and API.

export type EditorialPillar = "PANDUAN" | "REGULASI" | "PAJAK";
export type EditorialSlotStatus = "PLANNED" | "DRAFTED" | "PUBLISHED" | "SKIPPED";

export interface EditorialSlotView {
  id: string;
  slotIndex: number;
  day: string;
  date: string; // tanggal terbit rencana (YYYY-MM-DD)
  pillar: EditorialPillar;
  pillarLabel: string;
  category: string;
  title: string;
  focusKeyword: string | null;
  keywords: string | null;
  notes: string | null;
  status: EditorialSlotStatus;
  post: { id: string; slug: string; status: string } | null;
  updatedAt: string;
}

export interface EditorialWeekView {
  weekStart: string;
  label: string;
  isCurrent: boolean;
  isPast: boolean;
  slots: EditorialSlotView[];
}

export interface EditorialBoard {
  currentWeekStart: string;
  weeks: EditorialWeekView[];
  stats: {
    total: number;
    planned: number;
    drafted: number;
    published: number;
    skipped: number;
    /** topik bank per pilar — untuk penampil "ganti topik" */
    bankSize: { PANDUAN: number; REGULASI: number; PAJAK: number };
  };
}
