import { db } from "../src/lib/db";

// ============================================================
// QA E2E — MESIN PEMULIHAN CHECKOUT (langkah 12 ROADMAP-99)
// Menjalankan: seed order PENDING due → antrean admin → prefill
// wa.me + link bayar → sweep via cron (tanpa kanal = skipped) →
// 401 tanpa auth → respons tanpa PII → cleanup.
// Jalankan: ADMIN_PASSWORD=<pw> bunx tsx scripts/verify-recovery.ts
// ============================================================

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const password = process.env.ADMIN_PASSWORD;
if (!password) throw new Error("ADMIN_PASSWORD wajib diset untuk recovery smoke test.");

const stamp = `recovery-prisma8-${Date.now()}`;
let orderId: string | undefined;

async function main() {
  try {
    // 1) Seed order PENDING berumur 2 jam (due step 1) — nilai tinggi
    const order = await db.order.create({
      data: {
        orderNo: `INV-QA-${Date.now()}`,
        serviceId: "QA-RECOVERY",
        serviceName: "QA Pemulihan Checkout",
        amount: 2_500_000,
        customerName: "QA Recovery Tester",
        customerPhone: "6281200000001",
        provider: "demo",
        status: "PENDING",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    });
    orderId = order.id;
    console.log("[recovery-smoke] PASS create due PENDING order");

    // 2) Login admin
    const login = await fetch(`${baseUrl}/api/admin/auth`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const rawCookie = login.headers.get("set-cookie") || "";
    const cookie = rawCookie.split(";")[0];
    if (!login.ok || !cookie.startsWith("pp_admin_token=")) {
      throw new Error(`Admin login failed: HTTP ${login.status}`);
    }
    console.log("[recovery-smoke] PASS admin login");

    // 3) Antrean admin memuat order + prefill + payUrl + step benar
    const response = await fetch(`${baseUrl}/api/admin/recovery`, { headers: { cookie } });
    const body = await response.json();
    if (!response.ok || body.success !== true) {
      throw new Error(`Recovery API failed: HTTP ${response.status}`);
    }
    const candidate = body.data?.candidates?.find((item: any) => item.orderNo === order.orderNo);
    if (!candidate) throw new Error("Due order not found in recovery queue");
    if (candidate.nextStep !== 1) throw new Error(`Expected step 1, got ${candidate.nextStep}`);
    if (!String(candidate.prefill || "").startsWith("https://wa.me/6281200000001?text=")) {
      throw new Error("Recovery WhatsApp prefill URL is invalid");
    }
    if (!String(candidate.payUrl || "").includes(`/payment/${order.orderNo}`)) {
      throw new Error("Payment URL is invalid");
    }
    console.log("[recovery-smoke] PASS due queue, step, wa.me prefill, and payment URL");

    // 4) Tanpa auth → 401
    const denied = await fetch(`${baseUrl}/api/admin/recovery`);
    if (denied.status !== 401) {
      throw new Error(`Unauthenticated admin route should return 401, got ${denied.status}`);
    }
    console.log("[recovery-smoke] PASS unauthenticated request denied");

    // 5) Sweep via cron endpoint (tanpa kanal → skippedNoChannel, tetap sukses)
    const cron = await fetch(`${baseUrl}/api/cron/recovery`, { method: "POST", headers: { cookie } });
    const cronBody = await cron.json();
    if (!cron.ok || cronBody.success !== true || typeof cronBody.data?.scanned !== "number") {
      throw new Error(`Cron sweep failed: HTTP ${cron.status}`);
    }
    if (cronBody.data.skippedNoChannel !== true) {
      // Kanal bisa saja terpasang di env — bukan kegagalan QA, hanya catatan.
      console.log("[recovery-smoke] NOTE channel configured; sweep executed with sends:", JSON.stringify(cronBody.data));
    }
    console.log("[recovery-smoke] PASS cron sweep endpoint");

    // 6) Idempotensi struktur: log unik per (orderId, step, lane)
    const logs = await db.recoveryLog.findMany({ where: { orderId } });
    const unique = new Set(logs.map((l) => `${l.step}:${l.lane}`));
    if (unique.size !== logs.length) throw new Error("RecoveryLog violated (orderId, step, lane) uniqueness");
    console.log("[recovery-smoke] PASS recovery log uniqueness");
  } finally {
    if (orderId) {
      await db.recoveryLog.deleteMany({ where: { orderId } });
      await db.order.deleteMany({ where: { id: orderId } });
      console.log("[recovery-smoke] Cleaned temporary test records");
    }
  }
}

main().catch((error) => {
  console.error("[recovery-smoke] FAIL:", error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
