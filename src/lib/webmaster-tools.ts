// ============================================================
// PUSATPERIZINAN.COM — WEBMASTER TOOLS MASTER (Data)
// ============================================================
// Sumber data tunggal untuk halaman /webmaster: katalog mesin
// pencari dunia (jawaban "ada berapa mesin pencari?"), langkah
// verifikasi Google (prioritas #1), protokol IndexNow, dan daftar
// seksi sitemap (mirror SITEMAP_SECTION_IDS agar halaman ini
// tidak menarik rantai impor katalog berat — source of truth
// tetap src/lib/sitemap-sections.ts).
// ============================================================

export type EngineTier = 1 | 2 | 3 | 4;
export type EnginePriority = "P0" | "P1" | "P2" | "P3";

export interface SearchEngine {
  id: string;
  name: string;
  emoji: string;
  flag: string;
  region: string;
  tier: EngineTier;
  /** Pangsa pasar perkiraan (untuk display, bukan klaim akurat). */
  share: string;
  /** Jenis index — penjelasan singkat bagaimana mesin ini mendapat data. */
  indexKind: string;
  /** URL portal webmaster tools (jika ada). */
  portal?: string;
  portalLabel?: string;
  /** URL form submit sitemap/URL (jika ada). */
  submit?: string;
  /** Nama meta tag verifikasi resmi (jika mendukung). */
  metaName?: string;
  /** Nama env var untuk kode verifikasi (jika didukung layout.tsx). */
  envKey?: string;
  /** Metode verifikasi yang tersedia. */
  methods: string[];
  priority: EnginePriority;
  /** Mendukung protokol IndexNow (ping instan). */
  indexNow?: boolean;
  note: string;
}

// ------------------------------------------------------------
// KATALOG 26 MESIN PENCARI (terkurasi untuk pemilik situs)
// ------------------------------------------------------------

export const SEARCH_ENGINES: SearchEngine[] = [
  // ── TIER 1 — WAJIB (menutupi 99%+ pencarian dunia) ──
  {
    id: "google",
    name: "Google Search",
    emoji: "🔍",
    flag: "🌍",
    region: "Global · #1 Indonesia",
    tier: 1,
    share: "≈89% global · ≈95%+ Indonesia",
    indexKind: "Index independen — raja semua mesin pencari",
    portal: "https://search.google.com/search-console",
    portalLabel: "Google Search Console",
    submit: "https://search.google.com/search-console/sitemaps",
    metaName: "google-site-verification",
    envKey: "NEXT_PUBLIC_GSC_VERIFICATION",
    methods: [
      "Meta tag HTML (sudah disiapkan di layout.tsx via env)",
      "DNS TXT record (paling kokoh, domain property)",
      "File HTML di root situs",
      "Akun Google Analytics / Tag Manager",
    ],
    priority: "P0",
    note: "Sumber ±19 dari 20 pencarian di Indonesia. Seluruh sitemap, status indexing, Core Web Vitals, dan kualitas 11.200+ URL diawasi dari satu dashboard. INI LANGKAH #1.",
  },
  {
    id: "bing",
    name: "Bing",
    emoji: "🟦",
    flag: "🇺🇸",
    region: "Global · #2 dunia",
    tier: 1,
    share: "≈4% global (+ menopang 6 mesin lain)",
    indexKind: "Index independen — mesin index #2 dunia",
    portal: "https://www.bing.com/webmasters",
    portalLabel: "Bing Webmaster Tools",
    submit: "https://www.bing.com/webmasters/sitemaps",
    metaName: "msvalidate.01",
    envKey: "NEXT_PUBLIC_BING_VERIFICATION",
    methods: [
      "Meta tag HTML (disiapkan di layout.tsx via env)",
      "XML file di root situs",
      "CNAME record di DNS",
      "⭐ IMPORT 1-KLIK dari Google Search Console (setup 2 menit)",
    ],
    priority: "P0",
    indexNow: true,
    note: "Satu verifikasi menutup Bing + Yahoo + DuckDuckGo + Ecosia + Qwant + Swisscows. Fitur 'Import from GSC' menarik sitemap & data otomatis — ROI terbaik setelah Google.",
  },
  {
    id: "yandex",
    name: "Yandex",
    emoji: "🟥",
    flag: "🇷🇺",
    region: "Rusia · CIS · Turki",
    tier: 1,
    share: "≈2,5% global · dominan di Rusia",
    indexKind: "Index independen — mesin #4 dunia",
    portal: "https://webmaster.yandex.com",
    portalLabel: "Yandex Webmaster",
    metaName: "yandex-verification",
    envKey: "NEXT_PUBLIC_YANDEX_VERIFICATION",
    methods: ["Meta tag HTML (via env)", "DNS TXT record", "File HTML di root"],
    priority: "P1",
    indexNow: true,
    note: "Saluran bagi ekspatriat Rusia/CIS yang mencari bisnis & perizinan di Indonesia. Dashboard-nya sangat detail ( crawl stats gratis ).",
  },
  {
    id: "yahoo",
    name: "Yahoo! Search",
    emoji: "🟪",
    flag: "🇺🇸",
    region: "Global · US & Jepang",
    tier: 1,
    share: "≈1,3% global",
    indexKind: "Memakai index Bing (sejak 2010)",
    portal: "https://www.bing.com/webmasters",
    portalLabel: "Lewat Bing Webmaster",
    methods: ["Otomatis — ikut verifikasi Bing, tidak ada portal terpisah"],
    priority: "P2",
    note: "Yahoo tidak punya crawler sendiri. Sekali Bing terverifikasi, Yahoo ikut terindeks. Nol biaya tambahan.",
  },

  // ── TIER 2 — REGIONAL (pasar spesifik) ──
  {
    id: "baidu",
    name: "Baidu",
    emoji: "🐾",
    flag: "🇨🇳",
    region: "Tiongkok",
    tier: 2,
    share: "≈60-70% pasar Tiongkok",
    indexKind: "Index independen",
    portal: "https://ziyuan.baidu.com",
    portalLabel: "Baidu Ziyuan (Resource)",
    metaName: "baidu-site-verification",
    envKey: "NEXT_PUBLIC_BAIDU_VERIFICATION",
    methods: ["Meta tag HTML (via env)", "File HTML di root", "Butuh akun — ranking idealnya + ICP Tiongkok"],
    priority: "P2",
    note: "Relevan bila menarget investor/ekspatriat Tiongkok (PMA, Mandarin). Tanpa ICP & server CN, crawl bisa lambat.",
  },
  {
    id: "naver",
    name: "Naver",
    emoji: "🟩",
    flag: "🇰🇷",
    region: "Korea Selatan",
    tier: 2,
    share: "≈55% pasar Korea",
    indexKind: "Index independen",
    portal: "https://searchadvisor.naver.com",
    portalLabel: "Naver Search Advisor",
    metaName: "naver-site-verification",
    envKey: "NEXT_PUBLIC_NAVER_VERIFICATION",
    methods: ["Meta tag HTML (via env)", "File HTML di root"],
    priority: "P2",
    indexNow: true,
    note: "Pintu masuk pasar Korea. Submit blog & sitemap via Search Advisor; konten EN tetap terindeks.",
  },
  {
    id: "seznam",
    name: "Seznam",
    emoji: "🔷",
    flag: "🇨🇿",
    region: "Ceko",
    tier: 2,
    share: "≈25% pasar Ceko",
    indexKind: "Index independen",
    portal: "https://search.seznam.cz/pridavani-stranek",
    portalLabel: "Seznam Webmaster",
    metaName: "seznam-wmt",
    envKey: "NEXT_PUBLIC_SEZNAM_VERIFICATION",
    methods: ["Meta tag HTML (via env)", "File HTML di root"],
    priority: "P3",
    indexNow: true,
    note: "Mesin nasional Ceko — salah satu pendukung awal IndexNow.",
  },
  {
    id: "sogou",
    name: "Sogou",
    emoji: "🦊",
    flag: "🇨🇳",
    region: "Tiongkok (Tencent/WeChat)",
    tier: 2,
    share: "≈#3 Tiongkok",
    indexKind: "Index independen (ekosistem Tencent)",
    portal: "https://zhanzhang.sogou.com",
    portalLabel: "Sogou Zhanzhang",
    methods: ["Meta tag", "Akun Tiongkok"],
    priority: "P3",
    note: "Kuat di WeChat — konten yang dibagikan di WeChat terindeks Sogou.",
  },
  {
    id: "so360",
    name: "360 Search (so.com)",
    emoji: "🟢",
    flag: "🇨🇳",
    region: "Tiongkok",
    tier: 2,
    share: "Tier-2 Tiongkok",
    indexKind: "Index independen",
    portal: "http://zhanzhang.so.com",
    portalLabel: "360 Zhanzhang",
    methods: ["Meta tag", "Akun Tiongkok"],
    priority: "P3",
    note: "Browser 360 di Tiongkok default memakai mesin ini.",
  },
  {
    id: "shenma",
    name: "Shenma (神马)",
    emoji: "🐎",
    flag: "🇨🇳",
    region: "Tiongkok mobile",
    tier: 2,
    share: "Mobile-first Tiongkok (Alibaba/UC)",
    indexKind: "Index independen mobile",
    methods: ["Akses via platform Yicheng/UC"],
    priority: "P3",
    note: "Mesin mobile milik Alibaba — trafik datang dari browser UC.",
  },

  // ── TIER 3 — PRIVASI & INDEPENDEN ──
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    emoji: "🦆",
    flag: "🌍",
    region: "Global · US/EU kuat",
    tier: 3,
    share: "≈1% global",
    indexKind: "DuckDuckBot sendiri + index Bing",
    methods: [
      "Ikut verifikasi Bing (index utama) — tidak ada portal DDG",
      "robots.txt sudah membuka DuckDuckBot ✓",
    ],
    priority: "P1",
    note: "Sangat populer di kalangan privacy-first. Cakup mengikuti Bing + crawler sendiri.",
  },
  {
    id: "brave",
    name: "Brave Search",
    emoji: "🦁",
    flag: "🇺🇸",
    region: "Global · tumbuh cepat",
    tier: 3,
    share: "20 jt+ kueri/hari",
    indexKind: "Index independen penuh",
    methods: [
      "Tidak ada portal wajib — biarkan Bravebot crawl",
      "Sitemap di robots.txt ✓",
      "Pantau referral (search.brave.com) di analytics",
    ],
    priority: "P2",
    note: "Satu-satunya alternatif baru dengan index independen penuh — bernilai strategis jangka panjang.",
  },
  {
    id: "ecosia",
    name: "Ecosia",
    emoji: "🌳",
    flag: "🇩🇪",
    region: "Global · Eropa kuat",
    tier: 3,
    share: "±20 jt pengguna aktif",
    indexKind: "Index Bing",
    methods: ["Ikut verifikasi Bing", "IndexNow didukung ✓"],
    priority: "P2",
    indexNow: true,
    note: "Mesin 'penanam pohon' — audiens Eropa yang sadar lingkungan.",
  },
  {
    id: "qwant",
    name: "Qwant",
    emoji: "🇫🇷",
    flag: "🇫🇷",
    region: "Prancis · EU",
    tier: 3,
    share: "Kuat di Prancis",
    indexKind: "Index Bing (joint venture Ecosia)",
    methods: ["Ikut verifikasi Bing", "IndexNow didukung ✓"],
    priority: "P3",
    indexNow: true,
    note: "Mesin Eropa yang menjunjung privasi & kedaulatan data.",
  },
  {
    id: "startpage",
    name: "Startpage",
    emoji: "🛡️",
    flag: "🇳🇱",
    region: "Global · EU",
    tier: 3,
    share: "Metasearch privasi populer",
    indexKind: "Memakai hasil Google",
    methods: ["Otomatis — ikut Google, tidak ada portal"],
    priority: "P3",
    note: "'Privasi paling privat' — hasil Google tanpa tracking. Nol biaya.",
  },
  {
    id: "mojeek",
    name: "Mojeek",
    emoji: "🕸️",
    flag: "🇬🇧",
    region: "UK · Global",
    tier: 3,
    share: "Index independen sejak 2004",
    indexKind: "Index independen penuh",
    submit: "https://www.mojeek.com/add-url",
    portalLabel: "Mojeek Add URL",
    methods: ["Submit URL manual", "Kirim sitemap via halaman add-url"],
    priority: "P3",
    note: "Veteran index independen — juga memasok hasil ke beberapa metasearch.",
  },
  {
    id: "swisscows",
    name: "Swisscows",
    emoji: "🐄",
    flag: "🇨🇭",
    region: "Swiss · DACH",
    tier: 3,
    share: "Audiens keluarga Eropa",
    indexKind: "Index Bing",
    methods: ["Ikut verifikasi Bing"],
    priority: "P3",
    note: "Mesin ramah-keluarga tanpa pelacakan, server Swiss.",
  },
  {
    id: "yep",
    name: "Yep (Ahrefs)",
    emoji: "🟡",
    flag: "🌐",
    region: "Global",
    tier: 3,
    share: "Index baru dari Ahrefs",
    indexKind: "Membangun index independen",
    methods: ["Biarkan crawler — sitemap di robots.txt ✓", "IndexNow didukung ✓"],
    priority: "P3",
    indexNow: true,
    note: "Ahrefs (raja data backlink) sedang membangun mesin sendiri — masuk sekarang = dapat posisi awal.",
  },
  {
    id: "petal",
    name: "Petal Search",
    emoji: "🌸",
    flag: "🌸",
    region: "Perangkat Huawei",
    tier: 3,
    share: "Mobile Huawei global",
    indexKind: "Index sendiri + partner",
    methods: ["Akses via aplikasi Petal", "Submit melalui aplikasi"],
    priority: "P3",
    note: "Bawaan ratusan juta perangkat Huawei tanpa Google Mobile Services.",
  },
  {
    id: "searx",
    name: "SearXNG & metasearch",
    emoji: "🔀",
    flag: "🌐",
    region: "Global (developer & privasi)",
    tier: 3,
    share: "Belasan instance publik besar",
    indexKind: "Agregator — TIDAK mengindeks",
    methods: ["Tidak perlu — hasil berasal dari Google/Bing"],
    priority: "P3",
    note: "Cakup otomatis begitu Google & Bing beres. Ada di daftar ini supaya tidak bingung mencari portalnya.",
  },

  // ── TIER 4 — AI ANSWER ENGINE (GEO: Generative Engine Optimization) ──
  {
    id: "ai-google",
    name: "Google AI Overviews & Gemini",
    emoji: "✨",
    flag: "🤖",
    region: "Di dalam Google",
    tier: 4,
    share: "Bagian dari ±5 miliar kueri Google/hari",
    indexKind: "Jawaban AI + kutipan dari index Google",
    methods: [
      "Ikut Google Search Console (sudah jadi prioritas #1)",
      "Konten Q&A 40–60 kata + FAQ schema ✓",
      "llms.txt tersedia ✓",
    ],
    priority: "P0",
    note: "AI Overviews mengutip halaman kami sebagai sumber — trafik 'nol-klik' terbesar masa depan.",
  },
  {
    id: "chatgpt",
    name: "ChatGPT Search (OpenAI)",
    emoji: "🟢",
    flag: "🤖",
    region: "Global",
    tier: 4,
    share: "Ratusan juta pengguna mingguan",
    indexKind: "Crawler OAI-SearchBot + index sendiri",
    methods: [
      "robots.txt sudah membuka OAI-SearchBot & ChatGPT-User ✓",
      "llms.txt ✓",
      "Tidak ada portal — fokus konten jelas & terstruktur",
    ],
    priority: "P1",
    note: "Saat user bertanya 'cara mengurus NIB' ke ChatGPT, situs kami bisa jadi sumber kutipan — GEO, bukan SEO biasa.",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    emoji: "💭",
    flag: "🤖",
    region: "Global",
    tier: 4,
    share: "±100 jt kueri/minggu",
    indexKind: "Crawler PerplexityBot + index sendiri",
    methods: [
      "robots.txt sudah membuka PerplexityBot ✓",
      "llms.txt ✓",
      "Jawaban inti 40–60 kata di awal konten",
    ],
    priority: "P1",
    note: "Mesin jawaban dengan sitasi paling terlihat — brand mention gratis bila konten terstruktur.",
  },
  {
    id: "copilot",
    name: "Microsoft Copilot",
    emoji: "💠",
    flag: "🤖",
    region: "Windows · Edge · Bing",
    tier: 4,
    share: "Bawaan Windows 11 & Edge",
    indexKind: "Index Bing",
    methods: ["Ikut Bing Webmaster Tools (sudah mencakup)"],
    priority: "P1",
    note: "Copilot = wajah AI dari Bing. Verifikasi Bing sekali → Copilot ikut.",
  },
  {
    id: "apple",
    name: "Apple Spotlight & Siri",
    emoji: "🍎",
    flag: "🤖",
    region: "iOS · macOS · 1,4 M+ perangkat",
    tier: 4,
    share: "Crawler Applebot",
    indexKind: "Index Apple (Spotlight, Siri, News)",
    portal: "https://businessconnect.apple.com",
    portalLabel: "Apple Business Connect (opsional)",
    methods: [
      "robots.txt membuka Applebot-Extended ✓ (Applebot lewat wildcard)",
      "Daftarkan bisnis di Apple Business Connect untuk Places",
    ],
    priority: "P2",
    note: "Pencarian Spotlight/Siri menarik dari index Apple + Bing — keduanya sudah tercakup.",
  },
  {
    id: "claude",
    name: "Claude (Anthropic)",
    emoji: "🧠",
    flag: "🤖",
    region: "Global",
    tier: 4,
    share: "Crawler ClaudeBot",
    indexKind: "Crawler + Web Search",
    methods: [
      "robots.txt sudah membuka ClaudeBot & Claude-User ✓",
      "llms.txt ✓",
    ],
    priority: "P2",
    note: "Claude bisa mengutip panduan perizinan kami saat membantu pengguna — tambahan trafik GEO.",
  },
];

// ------------------------------------------------------------
// JAWABAN: "ADA BERAPA MESIN PENCARI DI DUNIA?"
// ------------------------------------------------------------

export const SEARCH_ENGINE_STATS = {
  /** Perkiraan total mesin pencari aktif di dunia (berbagai direktori: 200–300+). */
  totalActive: "200+",
  /** Jumlah mesin dengan index independen penuh (crawler + database sendiri). */
  independentIndex: "≈10",
  /** Portal verifikasi inti yang menutupi hampir semua mesin. */
  corePortals: 3,
  categories: [
    {
      label: "Raksasa global (umum)",
      count: "5",
      examples: "Google, Bing, Yandex, Yahoo, DuckDuckGo",
      emoji: "🌍",
    },
    {
      label: "Mesin regional dominan",
      count: "6",
      examples: "Baidu (Tiongkok), Naver (Korea), Seznam (Ceko), Sogou, 360, Shenma",
      emoji: "🌏",
    },
    {
      label: "Privasi & alternatif",
      count: "15+",
      examples: "Brave, Ecosia, Qwant, Startpage, Mojeek, Swisscows, Yep…",
      emoji: "🛡️",
    },
    {
      label: "Mesin vertikal (niche)",
      count: "50+",
      examples: "YouTube, Amazon, Pinterest, TikTok Search, App Store, TripAdvisor",
      emoji: "🎯",
    },
    {
      label: "AI answer engine (GEO)",
      count: "12+",
      examples: "ChatGPT Search, Perplexity, Gemini, Copilot, You.com, Phind…",
      emoji: "🤖",
    },
    {
      label: "Metasearch & agregator",
      count: "10+",
      examples: "Startpage, SearXNG, Dogpile, Info.com…",
      emoji: "🔀",
    },
  ],
  verdict:
    "Karena ±80% mesin pencari 'meminjam' index Google atau Bing, memverifikasi 3 portal inti (Google + Bing + Yandex) sudah menutupi 99%+ pencarian dunia. Tambahkan portal regional hanya bila menarget pasar negara itu.",
};

// ------------------------------------------------------------
// GOOGLE — PANDUAN LANGKAH DEMI LANGKAH (PRIORITAS #1)
// ------------------------------------------------------------

export const GSC_STEPS = [
  {
    title: "Buat properti Domain",
    desc: "Di Search Console, pilih tipe DOMAIN → tulis pusatperizinan.com (sc-domain:). Tipe domain mencakup semua subdomain + http/https sekaligus.",
    tip: "Butuh akses DNS domain (idwebhost/registrar). Kalau belum punya akses DNS, pilih tipe URL-prefix dulu.",
  },
  {
    title: "Verifikasi kepemilikan",
    desc: "3 cara: (a) tag meta HTML — paling cepat, sudah disiapkan di layout.tsx via env NEXT_PUBLIC_GSC_VERIFICATION; (b) DNS TXT record — paling kokoh, jangan pernah lepas; (c) file HTML di root.",
    tip: "Salin kode verifikasi dari GSC, set di .env: NEXT_PUBLIC_GSC_VERIFICATION=<kode> lalu restart. Tag otomatis muncul di <head> seluruh 11.200+ halaman.",
  },
  {
    title: "Submit sitemap index + 14 seksi",
    desc: "Masuk menu Sitemaps → kirim /sitemap.xml (indeks otomatis menarik 14 seksi). Untuk memastikan, submit juga tiap seksi di tab daftar sitemap di bawah.",
    tip: "±11.200 URL butuh 1–4 minggu untuk terindek penuh — normal. Pantau menu Pages → 'Why pages aren't indexed'.",
  },
  {
    title: "Aktifkan pemantauan",
    desc: "Cek tiap minggu: Performance (CTR, query), Pages (coverage), Core Web Vitals (LCP/INP/CLS), dan Manual Actions. Aktifkan email alert agar tahu saat ada masalah.",
    tip: "Bandingkan CTR per halaman: CTR rendah + impresi tinggi = perbaiki meta title/description (A/B).",
  },
  {
    title: "Pakai alat lanjutan",
    desc: "URL Inspection (cek URL individual langsung terindeks), Rich Results Test (validasi JSON-LD Service/FAQ/Breadcrumb), PageSpeed Insights, dan GSC API untuk otomasi.",
    tip: "Setelah terverifikasi, hubungkan GSC ke Bing Webmaster lewat fitur Import — dua portal beres dalam 5 menit.",
  },
] as const;

export const GSC_LINKS = [
  { label: "Google Search Console", url: "https://search.google.com/search-console", emoji: "🏠" },
  { label: "Halaman Submit Sitemaps", url: "https://search.google.com/search-console/sitemaps", emoji: "🗺️" },
  { label: "URL Inspection", url: "https://search.google.com/search-console/inspect", emoji: "🔎" },
  { label: "Rich Results Test", url: "https://search.google.com/test/rich-results", emoji: "🧪" },
  { label: "PageSpeed Insights", url: "https://pagespeed.web.dev/", emoji: "⚡" },
] as const;

// ------------------------------------------------------------
// INDEXNOW — PING INSTAN UNTUK 8+ MESIN PENCARI
// ------------------------------------------------------------

export const INDEXNOW_ENGINES = [
  "Bing",
  "Yandex",
  "Seznam",
  "Naver",
  "Ecosia",
  "Qwant",
  "Yep",
  "Seznam partner lainnya",
] as const;

export const INDEXNOW_LIMITS = {
  maxUrlsPerRequest: 10_000,
  endpoint: "https://api.indexnow.org/indexnow",
} as const;

// ------------------------------------------------------------
// SITEMAP (mirror source-of-truth di sitemap-sections.ts)
// ------------------------------------------------------------

export const SITEMAP_SECTION_LABELS: Record<string, string> = {
  static: "Halaman statis & legal",
  blog: "Blog",
  panduan: "Panduan izin",
  testimoni: "Testimoni",
  layanan: "Layanan detail",
  kbli: "KBLI",
  hubs: "Hub layanan",
  jobs: "Lowongan kerja",
  bandingkan: "Perbandingan",
  katalog: "Katalog (31 divisi)",
  layanan500: "Katalog 500 (BU-XX)",
  "layanan-pp": "Katalog Premium v2 (PP-XX)",
  "layanan-pp3": "Katalog Pro v3 (PP3-XX)",
  "seo-expansion": "Ekspansi SEO (biaya/syarat/industri)",
};

export const SITEMAP_SECTION_IDS = Object.keys(SITEMAP_SECTION_LABELS);
