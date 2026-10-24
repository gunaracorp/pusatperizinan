#!/usr/bin/env bash
# Verifikasi runtime Kalender Editorial (langkah 35) — server dinyalakan
# di dalam sesi yang sama agar tidak dibunuh antar-tool-call.
set -u
cd /home/z/my-project

code() { curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$1"; }

# 1) Pastikan server hidup
if [ "$(code http://localhost:3000/api/version)" != "200" ]; then
  pkill -9 -f "next dev" 2>/dev/null; sleep 1
  setsid bash -c 'exec bunx next dev -p 3000 >> dev.log 2>&1 < /dev/null' &
  for i in $(seq 1 30); do
    sleep 2
    [ "$(code http://localhost:3000/api/version)" = "200" ] && break
  done
fi
echo "server: $(code http://localhost:3000/api/version)"

# 2) Login admin
rm -f /tmp/pp-admin-cookie.txt
echo "login: $(curl -s -c /tmp/pp-admin-cookie.txt -X POST http://localhost:3000/api/admin/auth -H 'Content-Type: application/json' -d '{"password":"admin2026"}' -o /dev/null -w '%{http_code}')"

# 3) GET papan kalender (memicu ensureUpcomingWeeks → seeding 36 slot)
b1=$(curl -s -b /tmp/pp-admin-cookie.txt http://localhost:3000/api/admin/editorial -w '\n%{http_code}')
echo "GET editorial: $(echo "$b1" | tail -1)"
echo "$b1" | head -n -1 > /tmp/ed-board.json
bun -e '
const d=require("/tmp/ed-board.json");
if(!d.success){console.log("FAIL",d.error);process.exit(1)}
const b=d.data;
console.log("currentWeekStart:",b.currentWeekStart);
console.log("weeks:",b.weeks.length,"slots:",b.stats.total);
console.log("stats:",JSON.stringify(b.stats));
const w0=b.weeks[0];
console.log("week0:",w0.label,"current:",w0.isCurrent);
w0.slots.forEach(s=>console.log(" -",s.day,s.date,s.pillar,"|",s.title.slice(0,58),"|",s.status));
const w11=b.weeks[11];
console.log("week11:",w11.label);
w11.slots.forEach(s=>console.log(" -",s.day,s.pillar,"|",s.title.slice(0,58)));
// idempoten: GET kedua tidak boleh menambah slot
const s1=b.stats.total;
require("child_process").execSync("curl -s -b /tmp/pp-admin-cookie.txt http://localhost:3000/api/admin/editorial -o /tmp/ed-board2.json");
const d2=require("/tmp/ed-board2.json");
console.log("idempoten GET-2 slots:",d2.data.stats.total,"(harus tetap",s1+")",d2.data.stats.total===s1?"OK":"LEAK!");
'

# 4) Ambil slot PLANNED pertama untuk uji PATCH + start-draft
SLOT=$(bun -e '
const d=require("/tmp/ed-board.json");
const all=d.data.weeks.flatMap(w=>w.slots);
console.log(JSON.stringify(all.find(s=>s.status==="PLANNED")));
')
SID=$(echo "$SLOT" | bun -e 'const s=JSON.parse(require("fs").readFileSync(0,"utf8"));console.log(s.id)')
STITLE=$(echo "$SLOT" | bun -e 'const s=JSON.parse(require("fs").readFileSync(0,"utf8"));console.log(s.title)')
echo "uji slot: $STITLE"

# 5) PATCH skip → unskip
echo "PATCH skip: $(curl -s -b /tmp/pp-admin-cookie.txt -X PATCH http://localhost:3000/api/admin/editorial -H 'Content-Type: application/json' -d "{\"id\":\"$SID\",\"action\":\"skip\"}" -o /tmp/ed-patch.json -w '%{http_code}') — $(cat /tmp/ed-patch.json)"
echo "PATCH unskip: $(curl -s -b /tmp/pp-admin-cookie.txt -X PATCH http://localhost:3000/api/admin/editorial -H 'Content-Type: application/json' -d "{\"id\":\"$SID\",\"action\":\"unskip\"}" -o /tmp/ed-patch2.json -w '%{http_code}') — $(cat /tmp/ed-patch2.json)"

# 6) PATCH update judul (lalu kembalikan)
echo "PATCH update: $(curl -s -b /tmp/pp-admin-cookie.txt -X PATCH http://localhost:3000/api/admin/editorial -H 'Content-Type: application/json' -d "{\"id\":\"$SID\",\"action\":\"update\",\"title\":\"$STITLE (uji)\",\"focusKeyword\":\"uji kalender\"}" -o /tmp/ed-patch3.json -w '%{http_code}')"
echo "PATCH restore: $(curl -s -b /tmp/pp-admin-cookie.txt -X PATCH http://localhost:3000/api/admin/editorial -H 'Content-Type: application/json' -d "{\"id\":\"$SID\",\"action\":\"update\",\"title\":\"$STITLE\"}" -o /tmp/ed-patch4.json -w '%{http_code}')"

# 7) POST start-draft → Post CMS dibuat ter-prefill, slot DRAFTED
curl -s -b /tmp/pp-admin-cookie.txt -X POST http://localhost:3000/api/admin/editorial -H 'Content-Type: application/json' -d "{\"action\":\"start-draft\",\"id\":\"$SID\"}" -o /tmp/ed-draft.json -w "POST start-draft: %{http_code}\n"
bun -e '
const d=require("/tmp/ed-draft.json");
if(!d.success){console.log("FAIL",d.error);process.exit(1)}
const p=d.data.post;
console.log("draft slug:",p.slug);
console.log("draft status:",p.status,"| kategori:",p.category,"| kw:",p.focusKeyword);
console.log("excerpt:",p.excerpt.slice(0,110)+"...");
console.log("sections scaffold:",p.sections.map(s=>s.heading).join(" / "));
require("fs").writeFileSync("/tmp/ed-draft-slug.txt",p.slug);
require("fs").writeFileSync("/tmp/ed-draft-id.txt",p.id);
'

# 8) Pratinjau draft di /blog (draft tampil utk admin pratinjau)
SLUG=$(cat /tmp/ed-draft-slug.txt)
echo "GET /blog/$SLUG: $(code "http://localhost:3000/blog/$SLUG")"

# 9) Sinkron status: PUT post → PUBLISHED, cek slot PUBLISHED; DELETE → slot kembali PLANNED
PID=$(cat /tmp/ed-draft-id.txt)
curl -s -b /tmp/pp-admin-cookie.txt http://localhost:3000/api/admin/posts/$PID -o /tmp/ed-post.json
bun -e '
const d=require("/tmp/ed-post.json");
const f=d.data; f.status="PUBLISHED";
f.sections=f.sections.map(s=>({heading:s.heading,paragraphs:s.paragraphs,bullets:[]})); 
f.faq=[];
require("fs").writeFileSync("/tmp/ed-post-put.json",JSON.stringify(f));
'
echo "PUT publish: $(curl -s -b /tmp/pp-admin-cookie.txt -X PUT http://localhost:3000/api/admin/posts/$PID -H 'Content-Type: application/json' -d @/tmp/ed-post-put.json -o /tmp/ed-post-put-res.json -w '%{http_code}')"
curl -s -b /tmp/pp-admin-cookie.txt http://localhost:3000/api/admin/editorial -o /tmp/ed-board3.json
bun -e '
const d=require("/tmp/ed-board3.json");
const all=d.data.weeks.flatMap(w=>w.slots);
const slot=all.find(s=>s.post&&s.post.id===require("/tmp/ed-draft-id.txt").trim?null:null);
const s2=all.find(s=>s.post && s.post.id===require("fs").readFileSync("/tmp/ed-draft-id.txt","utf8").trim());
console.log("slot setelah publish:",s2? s2.status : "TIDAK KETEMU (harusnya PUBLISHED)");
'
echo "DELETE draft: $(curl -s -b /tmp/pp-admin-cookie.txt -X DELETE http://localhost:3000/api/admin/posts/$PID -o /tmp/ed-del.json -w '%{http_code}')"
curl -s -b /tmp/pp-admin-cookie.txt http://localhost:3000/api/admin/editorial -o /tmp/ed-board4.json
bun -e '
const d=require("/tmp/ed-board4.json");
const all=d.data.weeks.flatMap(w=>w.slots);
const s3=all.find(s=>s.id===JSON.parse(process.argv[1]).id);
' "$SLOT" 2>/dev/null || true
bun -e '
const d=require("/tmp/ed-board4.json");
const all=d.data.weeks.flatMap(w=>w.slots);
const sid=require("fs").readFileSync("/tmp/ed-slot-id.txt","utf8").trim();
const s3=all.find(s=>s.id===sid);
console.log("slot setelah delete:",s3? s3.status+" post:"+JSON.stringify(s3.post) : "TIDAK KETEMU");
' 2>/dev/null || echo "slot setelah delete: (cek manual)"

# simpan slot id utk langkah di atas
echo "$SID" > /tmp/ed-slot-id.txt
curl -s -b /tmp/pp-admin-cookie.txt http://localhost:3000/api/admin/editorial -o /tmp/ed-board4.json
bun -e '
const d=require("/tmp/ed-board4.json");
const all=d.data.weeks.flatMap(w=>w.slots);
const sid=require("fs").readFileSync("/tmp/ed-slot-id.txt","utf8").trim();
const s3=all.find(s=>s.id===sid);
console.log("slot akhir:",s3.status,"| post:",s3.post? s3.post.slug : "null (benar, kembali PLANNED)");
console.log("stats akhir:",JSON.stringify(d.data.stats));
'

# 10) Guard tanpa kuki harus 401
echo "GET tanpa auth: $(curl -s http://localhost:3000/api/admin/editorial -o /dev/null -w '%{http_code}') (harus 401)"
