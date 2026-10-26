// ============================================================
// QA v1.14.0 — verify-followup.mjs (langkah 6 ROADMAP-99)
// E2E: seed lead QA → sweep → FollowUpLog idempoten → antrean admin → cleanup
// Jalankan: node scripts/verify-followup.mjs   (dev server di :3000)
// ============================================================
import { DatabaseSync } from "node:sqlite";
import { existsSync } from "node:fs";

// Path DB dicari di beberapa lokasi kandidat (tahan relokasi repo).
// Kandidat pertama = path kanonik dari .env repo (dipakai server).
const DB_CANDIDATES = [
  "/home/z/my-project/db/custom.db",
  "/home/z/my-project/pusatperizinan/db/custom.db",
];
const DB_PATH = DB_CANDIDATES.find(existsSync) ?? DB_CANDIDATES[0];
const BASE = "http://localhost:3000";
const PASS = [];
const FAIL = [];
function check(name, cond, detail = "") {
  (cond ? PASS : FAIL).push(name + (detail ? ` — ${detail}` : ""));
  console.log(`${cond ? "✅" : "❌"} ${name}${detail ? ` — ${detail}` : ""}`);
}

const db = new DatabaseSync(DB_PATH);
const H = 3_600_000;
const now = Date.now();

// ---------- 0. Baseline ----------
const settingBefore = db.prepare("SELECT COUNT(*) c FROM NotificationSetting").get().c;
const logBefore = db.prepare("SELECT COUNT(*) c FROM FollowUpLog").get().c;
check("Baseline bersih", settingBefore === 0 && logBefore === 0, `setting=${settingBefore} log=${logBefore}`);

// Lead due saat ini (NEW, 24h–30d) — dihitung dgn logika yang sama dgn loadCandidates
const dueNow = db
  .prepare(
    `SELECT COUNT(*) c FROM Lead WHERE status='NEW'
     AND createdAt <= ? AND createdAt >= ?`
  )
  // Prisma 7 menyimpan DateTime SQLite sebagai teks ISO-8601 (bukan
  // integer ms seperti v6) → param pembanding wajib ISO string agar
  // komparasi teks↔teks konsisten dengan binding mesin.
  .get(new Date(now - 24 * H).toISOString(), new Date(now - 30 * 24 * H).toISOString()).c;

// ---------- 1. Seed: 4 lead QA + fake kanal Telegram ----------
const ins = db.prepare(
  `INSERT INTO Lead (id, name, whatsapp, businessType, package, source, status, estimatedValue, notes, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);
const t = (h) => new Date(now - h * H).toISOString();
const leads = [
  { id: "qafuA0000000000000000000A", name: "QA-FU-Andi-25h", wa: "081111000001", ageH: 25, status: "NEW", val: 2_500_000 },
  { id: "qafuB0000000000000000000B", name: "QA-FU-Budi-50h", wa: "6281111000002", ageH: 50, status: "NEW", val: 7_500_000 },
  { id: "qafuC0000000000000000000C", name: "QA-FU-Citra-25h", wa: "081111000003", ageH: 25, status: "CONTACTED", val: 1_000_000 },
  { id: "qafuD0000000000000000000D", name: "QA-FU-Dodi-40d", wa: "081111000004", ageH: 40 * 24, status: "NEW", val: 3_000_000 },
];
for (const l of leads) {
  ins.run(l.id, l.name, l.wa, "Kafe / Kuliner", "Paket Bisnis", "landing", l.status, l.val, "QA otomatis v1.14.0", t(l.ageH), t(l.ageH));
}
db.prepare(
  `INSERT INTO NotificationSetting (id, telegramEnabled, telegramBotToken, telegramChatId, whatsappEnabled, whatsappProvider, updatedAt)
   VALUES ('qafusetting0000000000000', 1, '123456:FAKE-QA-TOKEN', '-100999', 0, 'fonnte', ?)`
).run(new Date(now).toISOString());
console.log(`Seed: 4 lead QA + fake Telegram (lead due pre-existing: ${dueNow})`);

// ---------- 2. Login admin ----------
const login = await fetch(`${BASE}/api/admin/auth`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password: "admin2026" }),
});
const cookie = (login.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).join("; ");
check("Login admin", login.status === 200 && cookie.includes("pp_admin_token="));

// ---------- 3. Sweep 1 ----------
const expDue = dueNow + 2; // + Andi(25h) + Budi(50h); Citra CONTACTED & Dodi 40d tereliminasi
const s1 = await (await fetch(`${BASE}/api/cron/followup`, { method: "POST", headers: { cookie } })).json();
check("Sweep 1 sukses", s1.success === true, JSON.stringify(s1.data ?? s1.error));
check("Sweep 1 scanned tepat", s1.data?.scanned === expDue, `scanned=${s1.data?.scanned} expect=${expDue}`);
check("Sweep 1 admin attempt = scanned", s1.data?.adminFailed + s1.data?.adminSent === expDue);

// ---------- 4. FollowUpLog: baris tepat, lane/channel benar ----------
const rows1 = db.prepare("SELECT leadId, step, lane, channel, status FROM FollowUpLog").all();
check("Log baris = scanned (tidak dobel)", rows1.length === expDue, `rows=${rows1.length} expect=${expDue}`);
const A = rows1.filter((r) => r.leadId === "qafuA0000000000000000000A");
const B = rows1.filter((r) => r.leadId === "qafuB0000000000000000000B");
const C = rows1.filter((r) => r.leadId === "qafuC0000000000000000000C");
const D = rows1.filter((r) => r.leadId === "qafuD0000000000000000000D");
check("Andi 25h → step 1", A.length === 1 && A[0]?.step === 1);
check("Budi 50h → step 2", B.length === 1 && B[0]?.step === 2);
check("Citra CONTACTED tidak dikejar", C.length === 0);
check("Dodi 40 hari tidak dikejar", D.length === 0);
check("Semua baris lane=admin channel=telegram", rows1.every((r) => r.lane === "admin" && r.channel === "telegram"));

// ---------- 5. Sweep 2 — idempoten ----------
const s2 = await (await fetch(`${BASE}/api/cron/followup`, { method: "POST", headers: { cookie } })).json();
const rows2 = db.prepare("SELECT COUNT(*) c FROM FollowUpLog").get().c;
check("Sweep 2 scanned tetap", s2.data?.scanned === expDue, `scanned=${s2.data?.scanned}`);
check("IDEMPOTEN: baris tetap setelah sweep ulang", rows2 === rows1.length, `rows=${rows2}`);

// ---------- 6. Lead dihubungi → sequence berhenti ----------
db.prepare("UPDATE Lead SET status='CONTACTED' WHERE id='qafuA0000000000000000000A'").run();
const s3 = await (await fetch(`${BASE}/api/cron/followup`, { method: "POST", headers: { cookie } })).json();
check("Sweep 3: Andi tak lagi diproses", s3.data?.scanned === expDue - 1, `scanned=${s3.data?.scanned} expect=${expDue - 1}`);

// ---------- 7. Antrean admin ----------
const q = await (await fetch(`${BASE}/api/admin/followup`, { headers: { cookie } })).json();
const qd = q.data;
check("Antrean admin sukses", q.success === true);
check("Antrean memuat Budi (step 2)", qd?.candidates?.some((c) => c.id === "qafuB0000000000000000000B" && c.nextStep === 2));
check("Andi (sudah CONTACTED) keluar dari antrean", !qd?.candidates?.some((c) => c.id === "qafuA0000000000000000000A"));
const budi = qd?.candidates?.find((c) => c.id === "qafuB0000000000000000000B");
check("Prefill wa.me benar (0811→62, pesan step 2)", typeof budi?.prefill === "string" && budi.prefill.startsWith("https://wa.me/6281111000002?text="), budi?.prefill?.slice(0, 40));
check("Stats pipeline > 0", qd?.stats?.due > 0 && qd?.stats?.pipelineValue > 0, `due=${qd?.stats?.due} nilai=${qd?.stats?.pipelineValue}`);
check("Kanal telegram terdeteksi aktif", qd?.channels?.telegram === true);

// ---------- 8. Tanpa auth ditolak (admin API) ----------
const noAuth = await fetch(`${BASE}/api/admin/followup`);
check("API admin tanpa cookie → 401", noAuth.status === 401);

// ---------- 9. Cron respons tanpa PII ----------
const pii = JSON.stringify(s1.data);
check("Respons cron bebas PII", !/QA-FU|@|wa\.me/.test(pii), pii.slice(0, 120));

// ---------- 10. Cleanup ----------
db.prepare("DELETE FROM FollowUpLog").run();
db.prepare("DELETE FROM Lead WHERE id LIKE 'qafu%'").run();
db.prepare("DELETE FROM NotificationSetting WHERE id='qafusetting0000000000000'").run();
const after = {
  log: db.prepare("SELECT COUNT(*) c FROM FollowUpLog").get().c,
  qaLead: db.prepare("SELECT COUNT(*) c FROM Lead WHERE id LIKE 'qafu%'").get().c,
  setting: db.prepare("SELECT COUNT(*) c FROM NotificationSetting").get().c,
};
check("Cleanup DB pulih", after.log === logBefore && after.qaLead === 0 && after.setting === settingBefore, JSON.stringify(after));

// ---------- Ringkasan ----------
console.log(`\n${"=".repeat(56)}`);
console.log(`HASIL: ${PASS.length} PASS · ${FAIL.length} FAIL`);
if (FAIL.length) { console.log("GAGAL:", FAIL.join(" | ")); process.exit(1); }
console.log("QA FOLLOW-UP v1.14.0: SEMUA PASS 🎉");
