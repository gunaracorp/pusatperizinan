import { db } from "../src/lib/db";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const password = process.env.ADMIN_PASSWORD;
if (!password) throw new Error("ADMIN_PASSWORD wajib diset untuk follow-up smoke test.");

const stamp = `followup-prisma8-${Date.now()}`;
let leadId: string | undefined;

async function main() {
  try {
    const lead = await db.lead.create({
      data: {
        name: stamp,
        whatsapp: "6281200000000",
        businessType: "Kuliner",
        package: "UMKM",
        source: "test",
        status: "NEW",
        estimatedValue: 1500000,
        createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000),
      },
    });
    leadId = lead.id;
    console.log("[followup-smoke] PASS create due lead");

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
    console.log("[followup-smoke] PASS admin login");

    const response = await fetch(`${baseUrl}/api/admin/followup`, {
      headers: { cookie },
    });
    const body = await response.json();
    if (!response.ok || body.success !== true) {
      throw new Error(`Follow-up API failed: HTTP ${response.status}`);
    }
    const candidate = body.data?.candidates?.find((item: any) => item.id === leadId);
    if (!candidate) throw new Error("Due lead not found in follow-up queue");
    if (candidate.nextStep !== 1) {
      throw new Error(`Expected follow-up step 1, got ${candidate.nextStep}`);
    }
    if (!String(candidate.prefill || "").startsWith("https://wa.me/6281200000000?text=")) {
      throw new Error("Follow-up WhatsApp prefill URL is invalid");
    }
    console.log("[followup-smoke] PASS due queue, step number, and wa.me prefill");

    const denied = await fetch(`${baseUrl}/api/admin/followup`);
    if (denied.status !== 401) {
      throw new Error(`Unauthenticated admin route should return 401, got ${denied.status}`);
    }
    console.log("[followup-smoke] PASS unauthenticated request denied");
  } finally {
    if (leadId) {
      await db.followUpLog.deleteMany({ where: { leadId } });
      await db.lead.deleteMany({ where: { id: leadId } });
      console.log("[followup-smoke] Cleaned temporary test records");
    }
  }
}

main().catch((error) => {
  console.error("[followup-smoke] FAIL:", error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
