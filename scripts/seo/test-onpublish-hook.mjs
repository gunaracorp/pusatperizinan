#!/usr/bin/env node
// E2E uji hook on-publish: login admin → create draft → publish → verifikasi ping instan.
// Post uji DIHAPUS di akhir. Bukan bagian dari produksi.
import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env", "utf8").split(/\r?\n/).filter((l) => /^\w+=/.test(l)).map((l) => {
    const i = l.indexOf("=");
    return [l.slice(0, i), l.slice(i + 1).replace(/^["']|["']$/g, "")];
  })
);

const B = "http://localhost:3000";
let cookie = "";

async function api(method, path, body) {
  const res = await fetch(B + path, {
    method,
    headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) cookie = setCookie.split(";")[0];
  let json = null;
  try { json = await res.json(); } catch {}
  return { status: res.status, json };
}

const slug = `uji-auto-ping-${Date.now()}`;
const title = "Uji Auto-Ping SEO (hapus otomatis)";

// 1. login
const login = await api("POST", "/api/admin/auth", { password: env.ADMIN_PASSWORD });
console.log("1. login:", login.status, login.json?.success === true ? "OK" : JSON.stringify(login.json));
if (login.status !== 200) process.exit(1);

// 2. create draft
const created = await api("POST", "/api/admin/posts", {
  title, excerpt: "Post uji hook IndexNow on-publish — dihapus otomatis.", status: "DRAFT",
  sections: [{ heading: "Ringkasan Uji", paragraphs: ["Paragraf uji hook auto-ping IndexNow on-publish."] }],
  faq: [],
});
const id = created.json?.data?.id;
console.log("2. create draft:", created.status, id ? `OK (${id})` : JSON.stringify(created.json).slice(0, 200));
if (!id) process.exit(1);

// 3. publish → hook after() → IndexNow
const published = await api("PUT", `/api/admin/posts/${id}`, {
  title, excerpt: "Post uji hook IndexNow on-publish — dihapus otomatis.",
  status: "PUBLISHED", slug,
  sections: [{ heading: "Ringkasan Uji", paragraphs: ["Paragraf uji hook auto-ping IndexNow on-publish."] }],
  faq: [],
});
console.log("3. publish:", published.status, published.json?.success === true ? "OK — hook after() terpicu" : JSON.stringify(published.json).slice(0, 200));

// beri waktu after() menyelesaikan ping
await new Promise((r) => setTimeout(r, 6000));

// 4. cek jejak ping di state (markPinged menulis URL post + /blog)
let pinged = false;
if (existsSync(".seo/state.json")) {
  const st = JSON.parse(readFileSync(".seo/state.json", "utf8"));
  pinged = Boolean(st.pinged[`https://pusatperizinan.com/blog/${slug}`]);
  console.log("4. jejak markPinged:", pinged ? "ADA — post + /blog ter-catat sudah ping" : "BELUM (cek log server)");
} else {
  console.log("4. state .seo/state.json belum ada");
}

// 5. hapus post uji
const del = await api("DELETE", `/api/admin/posts/${id}`);
console.log("5. hapus post uji:", del.status, del.json?.success === true ? "OK" : JSON.stringify(del.json));

console.log(pinged ? "\n✅ E2E hook on-publish PASS" : "\n⚠️ Hook terpicu tapi jejak state belum terlihat — periksa INDEXNOW_KEY / jaringan");
