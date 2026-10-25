# ============================================================
# make-logo-assets.py — v1.14.0 "Identitas Visual"
# Post-process logo AI (z-candidate-a) -> aset situs:
#   1. public/logo-icon.png       512x512 RGBA transparan (varian warna)
#   2. public/logo-icon-white.png 512x512 RGBA siluet putih penuh (footer gelap)
#   3. public/logo.png            800x800 lockup ikon + wordmark
# Cadangan master: download/logo/
# ============================================================
from collections import deque
from PIL import Image, ImageDraw, ImageFont

SRC = "/home/z/my-project/download/logo/z-candidate-a.png"
OUT = "/home/z/my-project/public"
DL = "/home/z/my-project/download/logo"

EMERALD = (4, 120, 87, 255)  # #047857
GOLD = (245, 158, 11, 255)   # #F59E0B

im = Image.open(SRC).convert("RGB")
w, h = im.size
px = im.load()

# ---- 1. Hapus background putih (flood-fill dari tepi, toleransi near-white)
THRESH = 228  # luminance; emas wreath ~200 aman, putih di dalam shield tidak terhubung tepi
def is_bg(c):
    r, g, b = c
    return (r + g + b) / 3 >= THRESH and max(r, g, b) - min(r, g, b) <= 14

visited = [[False] * w for _ in range(h)]
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if is_bg(px[x, y]) and not visited[y][x]:
            visited[y][x] = True; q.append((x, y))
for y in range(h):
    for x in (0, w - 1):
        if is_bg(px[x, y]) and not visited[y][x]:
            visited[y][x] = True; q.append((x, y))
while q:
    x, y = q.popleft()
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx] and is_bg(px[nx, ny]):
            visited[ny][nx] = True; q.append((nx, ny))

rgba = im.convert("RGBA")
rpx = rgba.load()
for y in range(h):
    for x in range(w):
        if visited[y][x]:
            r, g, b, _ = rpx[x, y]
            rpx[x, y] = (r, g, b, 0)

# ---- 2. Bbox konten + padding 3% + kanvas persegi
bbox = rgba.getbbox()
if bbox:
    rgba = rgba.crop(bbox)
iw, ih = rgba.size
pad = int(max(iw, ih) * 0.03)
side = max(iw, ih) + pad * 2
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
canvas.paste(rgba, ((side - iw) // 2, (side - ih) // 2), rgba)

# ---- 3. logo-icon.png 512x512 (varian warna)
icon = canvas.resize((512, 512), Image.LANCZOS)
icon.save(f"{OUT}/logo-icon.png")
icon.save(f"{DL}/logo-icon-baru.png")

# ---- 4. logo-icon-white.png 512x512 (varian dark-bg: shield frost + Z/wreath/star putih)
# Wreath menyentuh tepi shield -> siluet putih solid menyatu jadi blob & Z hilang.
# Treatment standar logo-on-dark: hijau shield -> putih semi-transparan (frost),
# piksel putih (huruf Z) & emas (wreath/star) -> putih solid.
white = Image.new("RGBA", icon.size, (0, 0, 0, 0))
wpx, ipx = white.load(), icon.load()
for y in range(512):
    for x in range(512):
        r, g, b, a = ipx[x, y]
        if a == 0:
            continue
        mx, mn = max(r, g, b), min(r, g, b)
        lum = (r + g + b) / 3
        if lum >= 242 and mx - mn <= 14:
            wpx[x, y] = (255, 255, 255, a)          # huruf Z + highlight -> putih solid
        elif g >= r and g >= b:
            wpx[x, y] = (255, 255, 255, 64)          # shield hijau -> frost putih
        else:
            wpx[x, y] = (255, 255, 255, a)           # emas wreath/star -> putih solid
white.save(f"{OUT}/logo-icon-white.png")
white.save(f"{DL}/logo-icon-white-baru.png")

# ---- 5. logo.png 800x800 lockup: ikon + wordmark
S = 800
lockup = Image.new("RGBA", (S, S), (0, 0, 0, 0))
ic = canvas.resize((470, 470), Image.LANCZOS)
lockup.paste(ic, ((S - 470) // 2, 30), ic)
draw = ImageDraw.Draw(lockup)
font_path = "/usr/share/fonts/truetype/english/Carlito-Bold.ttf"
try:
    f_word = ImageFont.truetype(font_path, 64)
except Exception:
    f_word = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
word = "PUSATPERIZINAN.COM"
tw = draw.textlength(word, font=f_word)
draw.text(((S - tw) / 2, 540), word, font=f_word, fill=EMERALD)
try:
    f_tag = ImageFont.truetype(font_path, 30)
except Exception:
    f_tag = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 28)
tag = "KONSULTAN PERIZINAN USAHA"
tgw = draw.textlength(tag, font=f_tag)
draw.text(((S - tgw) / 2, 625), tag, font=f_tag, fill=GOLD)
lockup.save(f"{OUT}/logo.png")
lockup.save(f"{DL}/logo-lockup-baru.png")

print("OK — aset logo baru dibuat:")
print("  public/logo-icon.png        (512, varian warna)")
print("  public/logo-icon-white.png  (512, siluet putih)")
print("  public/logo.png             (800, lockup wordmark)")
