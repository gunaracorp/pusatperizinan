import { db } from "../src/lib/db";

const prefix = `prisma8-smoke-${Date.now()}`;
const made: Record<string, any> = {};
const failures: string[] = [];

async function verify(name: string, run: () => Promise<unknown>) {
  await run();
  console.log(`[prisma8-smoke] PASS ${name}`);
}

async function cleanup() {
  const tasks: Array<[string, () => Promise<unknown>]> = [
    ["followUpLog", () => made.followUpLog ? db.followUpLog.deleteMany({ where: { id: made.followUpLog.id } }) : Promise.resolve()],
    ["lead", () => made.lead ? db.lead.deleteMany({ where: { id: made.lead.id } }) : Promise.resolve()],
    ["consultation", () => made.consultation ? db.consultation.deleteMany({ where: { id: made.consultation.id } }) : Promise.resolve()],
    ["chatMessage", () => made.chatMessage ? db.chatMessage.deleteMany({ where: { id: made.chatMessage.id } }) : Promise.resolve()],
    ["licenseCheck", () => made.licenseCheck ? db.licenseCheck.deleteMany({ where: { id: made.licenseCheck.id } }) : Promise.resolve()],
    ["subscriber", () => made.subscriber ? db.subscriber.deleteMany({ where: { id: made.subscriber.id } }) : Promise.resolve()],
    ["testimonial", () => made.testimonial ? db.testimonial.deleteMany({ where: { id: made.testimonial.id } }) : Promise.resolve()],
    ["documentCheck", () => made.documentCheck ? db.documentCheck.deleteMany({ where: { id: made.documentCheck.id } }) : Promise.resolve()],
    ["roadmapRequest", () => made.roadmapRequest ? db.roadmapRequest.deleteMany({ where: { id: made.roadmapRequest.id } }) : Promise.resolve()],
    ["notificationSetting", () => made.notificationSetting ? db.notificationSetting.deleteMany({ where: { id: made.notificationSetting.id } }) : Promise.resolve()],
    ["order", () => made.order ? db.order.deleteMany({ where: { id: made.order.id } }) : Promise.resolve()],
    ["post", () => made.post ? db.post.deleteMany({ where: { id: made.post.id } }) : Promise.resolve()],
    ["notificationLog", () => made.notificationLog ? db.notificationLog.deleteMany({ where: { id: made.notificationLog.id } }) : Promise.resolve()],
    ["editorialSlot", () => made.editorialSlot ? db.editorialSlot.deleteMany({ where: { id: made.editorialSlot.id } }) : Promise.resolve()],
  ];
  for (const [name, task] of tasks) {
    try { await task(); } catch (error) {
      console.error(`[prisma8-smoke] cleanup ${name}:`, error instanceof Error ? error.message : error);
    }
  }
}

async function main() {
  try {
    made.lead = await db.lead.create({ data: {
      name: prefix, whatsapp: "6281200000000", businessType: "smoke",
      estimatedValue: 1234, source: "test",
    }});
    await verify("Lead create/read/filter", async () => {
      const rows = await db.lead.findMany({
        where: { OR: [{ name: { contains: prefix } }, { whatsapp: "not-a-match" }] },
        select: { id: true, name: true }, orderBy: { createdAt: "desc" }, take: 5,
      });
      if (rows.length !== 1 || rows[0].id !== made.lead.id) throw new Error("lead query returned unexpected rows");
    });
    await verify("Lead update/count/groupBy", async () => {
      await db.lead.update({ where: { id: made.lead.id }, data: { status: "CONTACTED" } });
      if (await db.lead.count({ where: { id: made.lead.id, status: "CONTACTED" } }) !== 1) throw new Error("lead update/count mismatch");
      const groups = await db.lead.groupBy({ by: ["status"], where: { id: made.lead.id }, _count: true, _sum: { estimatedValue: true } });
      if (groups[0]?._count?._all !== 1 || groups[0]?._sum?.estimatedValue !== 1234) throw new Error("groupBy mismatch");
    });

    made.consultation = await db.consultation.create({ data: { name: prefix, whatsapp: "6281200000000", topic: prefix } });
    made.chatMessage = await db.chatMessage.create({ data: { sessionId: prefix, role: "user", content: prefix } });
    made.licenseCheck = await db.licenseCheck.create({ data: { businessInput: prefix } });
    made.subscriber = await db.subscriber.upsert({
      where: { email: `${prefix}@example.test` },
      create: { name: prefix, email: `${prefix}@example.test` },
      update: { name: `${prefix}-updated` },
    });
    await verify("Subscriber upsert", async () => {
      const updated = await db.subscriber.upsert({
        where: { email: `${prefix}@example.test` },
        create: { name: prefix, email: `${prefix}@example.test` },
        update: { name: `${prefix}-updated` },
      });
      if (updated.id !== made.subscriber.id || updated.name !== `${prefix}-updated`) throw new Error("upsert mismatch");
    });
    made.testimonial = await db.testimonial.create({ data: { name: prefix, content: prefix } });
    made.documentCheck = await db.documentCheck.create({ data: { fileName: `${prefix}.png`, docCategory: "auto", fileType: "image/png", fileSize: 1 } });
    made.roadmapRequest = await db.roadmapRequest.create({ data: { name: prefix, whatsapp: "6281200000000", businessField: prefix, province: "DKI Jakarta", scale: "umkm", capital: "10-50jt" } });
    made.notificationSetting = await db.notificationSetting.create({ data: { updatedAt: new Date() } });
    made.order = await db.order.create({ data: { orderNo: prefix.toUpperCase(), serviceId: "smoke", serviceName: prefix, amount: 1234, customerName: prefix, customerPhone: "6281200000000" } });
    made.post = await db.post.create({ data: { slug: prefix, title: prefix, excerpt: prefix, status: "DRAFT" } });
    made.notificationLog = await db.notificationLog.create({ data: { leadName: prefix, leadWa: "6281200000000", source: "test", channel: "telegram", status: "sent" } });
    made.editorialSlot = await db.editorialSlot.create({ data: { weekStart: "2999-12-31", slotIndex: 0, pillar: "PANDUAN", title: prefix } });
    made.followUpLog = await db.followUpLog.create({ data: { leadId: made.lead.id, step: 1, lane: "admin", channel: "telegram", status: "sent" } });

    await verify("Lead relation include", async () => {
      const rows = await db.lead.findMany({ where: { id: made.lead.id }, include: { followUps: true } });
      if (rows[0]?.followUps?.length !== 1) throw new Error("followUps relation was not returned");
    });
    await verify("Order aggregate", async () => {
      const aggregate = await db.order.aggregate({ where: { id: made.order.id }, _sum: { amount: true }, _count: true });
      if (aggregate._sum.amount !== 1234 || aggregate._count._all !== 1) throw new Error("aggregate mismatch");
    });

    const modelChecks: Array<[string, string, any]> = [
      ["Consultation", "consultation", made.consultation],
      ["ChatMessage", "chatMessage", made.chatMessage],
      ["LicenseCheck", "licenseCheck", made.licenseCheck],
      ["Subscriber", "subscriber", made.subscriber],
      ["Testimonial", "testimonial", made.testimonial],
      ["DocumentCheck", "documentCheck", made.documentCheck],
      ["RoadmapRequest", "roadmapRequest", made.roadmapRequest],
      ["NotificationSetting", "notificationSetting", made.notificationSetting],
      ["Order", "order", made.order],
      ["Post", "post", made.post],
      ["NotificationLog", "notificationLog", made.notificationLog],
      ["EditorialSlot", "editorialSlot", made.editorialSlot],
      ["FollowUpLog", "followUpLog", made.followUpLog],
    ];
    for (const [label, delegate, row] of modelChecks) {
      await verify(`${label} create/read`, async () => {
        const found = await (db as any)[delegate].findUnique({ where: { id: row.id } });
        if (!found || found.id !== row.id) throw new Error(`${label} lookup mismatch`);
      });
    }
  } finally {
    await cleanup();
  }
}

main().catch((error) => {
  console.error("[prisma8-smoke] FAIL:", error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
