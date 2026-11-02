// Deklarasi tipe untuk src/lib/seo-ping-core.mjs (mesin auto-ping SEO).
// Dipakai route TS saat import via @/lib/seo-ping-core.mjs.

export interface SitemapEntry {
  url: string;
  section: string;
}

export interface FetchAllResult {
  all: SitemapEntry[];
  errors: { section: string; error: string }[];
  sections: string[];
}

export interface SeoPingState {
  version: number;
  updatedAt: string;
  snapshot: Record<string, string>;
  pinged: Record<string, string>;
  rotation: { cursor: number; lastDate: string };
}

export interface IndexNowResult {
  ok: boolean;
  submitted: number;
  status: number;
  batches: number;
  error: string | null;
}

export interface DailyCycleReport {
  date: string;
  base: string;
  generatedAt: string;
  totalSitemapUrls: number;
  sections: Record<string, number>;
  newSinceSnapshot: number;
  indexnow: { submitted: number; httpStatus: number; error: string | null; skippedPingCount: number };
  rotation: { poolSize: number; cursorStart: number; cursorEnd: number; size: number };
  gscList: string[];
  sitemapErrors: { section: string; error: string }[];
  durationMs: number;
  log: string[];
}

export interface DailyCycleResult {
  report: DailyCycleReport;
  rotation: string[];
  newEntries: SitemapEntry[];
  ping: IndexNowResult;
  state: SeoPingState;
}

export interface RunDailyOpts {
  root?: string;
  base?: string;
  rotationSize?: number;
  maxNewPings?: number;
  dryRun?: boolean;
  rotationOnly?: boolean;
}

export declare const KNOWN_SECTIONS: readonly string[];
export declare const ROTATION_SECTIONS: readonly string[];

export declare function parseEnvFile(envPath: string): Record<string, string>;
export declare function getEnv(name: string, fallback?: string): string;
export declare function fnv1a(str: string): number;
export declare function listSections(base: string): Promise<string[]>;
export declare function fetchSectionUrls(base: string, section: string): Promise<SitemapEntry[]>;
export declare function fetchAllUrls(
  base: string,
  opts?: { sections?: string[]; onSection?: (section: string, count: number) => void }
): Promise<FetchAllResult>;
export declare function statePath(root: string): string;
export declare function loadState(root: string): SeoPingState;
export declare function saveState(root: string, state: SeoPingState): void;
export declare function markPinged(root: string, urls: string[], date?: string): void;
export declare function submitIndexNow(
  urls: string[],
  opts?: {
    key?: string;
    endpoint?: string;
    host?: string;
    keyLocation?: string;
    batchSize?: number;
    delayMs?: number;
  }
): Promise<IndexNowResult>;
export declare function buildRotationPool(
  entries: SitemapEntry[],
  opts?: { seedUrls?: string[] }
): string[];
export declare function pickRotation(
  pool: string[],
  cursor: number,
  n: number
): { list: string[]; nextCursor: number };
export declare function runDailyCycle(opts?: RunDailyOpts): Promise<DailyCycleResult>;
