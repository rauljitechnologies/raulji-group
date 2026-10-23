"""
Featured images for the second batch of business guides (23 Oct 2026).

Same house style as scripts/gen-blog-images.py: a navy field, a faint grid,
brand line work, the Raulji mark and a line of type. Each one draws what its
article is about, so the image carries information rather than decorating
the page:

  gst-gujarat          two threshold bars (goods, services) and the state line
  udyam-msme           three nested categories on investment and turnover axes
  gujarat-shops        workers counted against the ten-worker line
  partnership-deed     a deed with twelve clause rows being agreed
  after-incorporation  a timeline with the 30-day, 2-month and 180-day marks,
                       then the annual loop

Fonts: Arial where it exists (the original generator's choice), otherwise
Liberation Sans, which is metric-compatible with Arial. The original script
falls back to PIL's bitmap font on Linux, which is why this one checks.

Every output is 1200x675 (16:9).

Run:  python3 scripts/gen-blog-images-batch2.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

NAVY = (25, 42, 66)
NAVY_D = (15, 26, 42)
BLUE = (49, 153, 212)
WHITE = (255, 255, 255)
SUB = (150, 195, 228)
LABEL = (205, 228, 244)
GROUND = (20, 34, 54)

W, H = 1200, 675
OUT = "public/blog"

FONT_CANDIDATES = {
    False: [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ],
    True: [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ],
}


def font(sz, bold=False):
    for p in FONT_CANDIDATES[bold]:
        if os.path.exists(p):
            return ImageFont.truetype(p, sz)
    raise SystemExit("No Arial or Liberation Sans found; install fonts-liberation.")


mark = Image.open("public/favicon.png").convert("RGBA")


def blend(color, alpha, bg=GROUND):
    """A colour mixed down towards the ground, because ImageDraw does not alpha-blend."""
    t = alpha / 255
    return tuple(int(c * t + b * (1 - t)) for c, b in zip(color, bg))


def base():
    im = Image.new("RGBA", (W, H), NAVY)
    d = ImageDraw.Draw(im)
    for i in range(H):
        t = i / H
        d.line(
            [(0, i), (W, i)],
            fill=tuple(int(NAVY[k] + (NAVY_D[k] - NAVY[k]) * t) for k in range(3)) + (255,),
        )
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(g)
    step = W // 20
    for x in range(0, W, step):
        gd.line([(x, 0), (x, H)], fill=(255, 255, 255, 12))
    for y in range(0, H, step):
        gd.line([(0, y), (W, y)], fill=(255, 255, 255, 12))
    return Image.alpha_composite(im, g)


def label(im, title, sub):
    d = ImageDraw.Draw(im)
    d.text((int(W * 0.07), int(H * 0.71)), title, font=font(int(W / 23), True), fill=WHITE)
    d.text((int(W * 0.07), int(H * 0.71) + int(W / 19)), sub, font=font(int(W / 54)), fill=SUB)
    m = mark.resize((int(W / 18), int(W / 18)), Image.LANCZOS)
    im.alpha_composite(m, (W - int(W / 18) - int(W * 0.05), H - int(W / 18) - int(W * 0.07)))
    return im


def small(d, xy, text, fill=LABEL, size=None, anchor="la"):
    d.text(xy, text, font=font(size or int(W / 62)), fill=fill, anchor=anchor)


def dot(d, x, y, r, alpha=255, outline=False):
    if outline:
        d.ellipse([x - r, y - r, x + r, y + r], outline=blend(BLUE, alpha), width=3)
    else:
        d.ellipse([x - r, y - r, x + r, y + r], fill=blend(BLUE, alpha))


def save(im, name):
    os.makedirs(OUT, exist_ok=True)
    path = f"{OUT}/{name}.webp"
    im.convert("RGB").save(path, "WEBP", quality=86, method=6)
    print(f"{name}.webp {W}x{H} {os.path.getsize(path) // 1024}KB")


# GST: two bars filling towards their thresholds, and a vertical state line
# that an inter-state arrow crosses with no threshold at all.
def gst():
    im = base()
    d = ImageDraw.Draw(im)
    x0, x1 = int(W * 0.08), int(W * 0.58)
    rows = [("Goods only", 1.0, "40 lakh"), ("Any services", 0.5, "20 lakh")]
    for i, (name, frac, limit) in enumerate(rows):
        y = int(H * (0.16 + i * 0.17))
        small(d, (x0, y - 34), name)
        d.rounded_rectangle([x0, y, x1, y + 34], radius=8, outline=blend(BLUE, 120), width=2)
        fill_to = x0 + int((x1 - x0) * frac)
        d.rounded_rectangle([x0 + 4, y + 4, fill_to - 4, y + 30], radius=6, fill=blend(BLUE, 190 if i == 0 else 150))
        d.line([(fill_to, y - 10), (fill_to, y + 44)], fill=WHITE, width=3)
        small(d, (fill_to, y + 50), limit, fill=WHITE, anchor="ma")
    # State line
    sx = int(W * 0.74)
    for yy in range(int(H * 0.08), int(H * 0.60), 18):
        d.line([(sx, yy), (sx, yy + 9)], fill=blend(BLUE, 170), width=3)
    small(d, (sx - 14, int(H * 0.06)), "Gujarat", anchor="ra")
    small(d, (sx + 14, int(H * 0.06)), "Other state", anchor="la")
    ay = int(H * 0.47)
    d.line([(sx - 110, ay), (sx + 110, ay)], fill=WHITE, width=4)
    d.polygon([(sx + 110, ay - 10), (sx + 128, ay), (sx + 110, ay + 10)], fill=WHITE)
    # Label sits left of the state line so the dashed line never runs through it.
    small(d, (sx - 14, ay + 18), "Inter-state goods: from the first sale", fill=WHITE, anchor="ra")
    return label(im, "Thresholds, and the state line", "GST registration in Gujarat: who needs it, and when")


# Udyam: nested rectangles on investment (x) and turnover (y) axes. Both
# limits must be met, which is exactly what a nested box shows.
def udyam():
    im = base()
    d = ImageDraw.Draw(im)
    ox, oy = int(W * 0.10), int(H * 0.60)
    ax_w, ax_h = int(W * 0.50), int(H * 0.50)
    d.line([(ox, oy), (ox + ax_w + 20, oy)], fill=blend(BLUE, 200), width=3)
    d.line([(ox, oy), (ox, oy - ax_h - 20)], fill=blend(BLUE, 200), width=3)
    small(d, (ox + ax_w + 24, oy), "Investment", anchor="lm")
    small(d, (ox, oy - ax_h - 30), "Turnover", anchor="ms")
    boxes = [("Medium", 1.0, 120), ("Small", 0.62, 170), ("Micro", 0.30, 235)]
    for name, f, a in boxes:
        bw, bh = int(ax_w * f), int(ax_h * f)
        d.rectangle([ox + 3, oy - bh, ox + bw, oy - 3], outline=blend(BLUE, a), width=3)
        small(d, (ox + bw - 10, oy - bh + 10), name, fill=WHITE if name == "Micro" else LABEL, anchor="ra")
    small(d, (int(W * 0.68), int(H * 0.14)), "Investment / turnover, in crore", fill=SUB)
    small(d, (int(W * 0.68), int(H * 0.22)), "Micro: up to 2.5 and 10", fill=LABEL)
    small(d, (int(W * 0.68), int(H * 0.30)), "Small: up to 25 and 100", fill=LABEL)
    small(d, (int(W * 0.68), int(H * 0.38)), "Medium: up to 125 and 500", fill=LABEL)
    small(d, (int(W * 0.68), int(H * 0.48)), "From 1 April 2025. Both limits apply.", fill=SUB)
    return label(im, "Both limits, together", "Udyam registration: classification, process and conditions")


# Shops and establishments: a row of worker figures with a vertical line
# after the ninth. Left of it: intimation. From ten: registration.
def shops():
    im = base()
    d = ImageDraw.Draw(im)
    y = int(H * 0.30)
    gap = int(W * 0.062)
    x0 = int(W * 0.09)
    for i in range(12):
        x = x0 + i * gap
        a = 230 if i < 9 else 150
        dot(d, x, y - 26, 12, a)
        d.rounded_rectangle([x - 16, y - 8, x + 16, y + 34], radius=10, fill=blend(BLUE, a))
    lx = x0 + int(gap * 8.5)
    d.line([(lx, int(H * 0.12)), (lx, int(H * 0.56))], fill=WHITE, width=3)
    small(d, (lx, int(H * 0.09)), "10 workers", fill=WHITE, anchor="ms")
    small(d, (x0 - 16, int(H * 0.47)), "Fewer than 10: intimation (section 7)", fill=LABEL)
    small(d, (lx + 16, int(H * 0.47)), "10 or more: registration (section 6)", fill=LABEL)
    small(d, (x0 - 16, int(H * 0.54)), "Both within 60 days of starting business", fill=SUB)
    return label(im, "Ten workers decide the route", "Gujarat Shops and Establishments Act, 2019")


# Partnership deed: a document with twelve clause rows, most ticked, two
# still open, because the point of the article is agreeing them before signing.
def deed():
    im = base()
    d = ImageDraw.Draw(im)
    dx0, dy0, dx1, dy1 = int(W * 0.30), int(H * 0.06), int(W * 0.70), int(H * 0.64)
    d.rounded_rectangle([dx0, dy0, dx1, dy1], radius=12, outline=blend(BLUE, 220), width=3)
    d.line([(dx0 + 30, dy0 + 34), (dx0 + 230, dy0 + 34)], fill=WHITE, width=4)
    for i in range(12):
        col = i // 6
        row = i % 6
        x = dx0 + 34 + col * int((dx1 - dx0) / 2)
        yy = dy0 + 72 + row * 50
        d.rectangle([x, yy, x + 20, yy + 20], outline=blend(BLUE, 200), width=2)
        if i not in (5, 10):
            d.line([(x + 4, yy + 11), (x + 9, yy + 16), (x + 17, yy + 5)], fill=WHITE, width=3)
        d.line([(x + 34, yy + 10), (x + 34 + (150 if i % 3 else 110), yy + 10)], fill=blend(BLUE, 120), width=3)
    for k, x in enumerate((int(W * 0.12), int(W * 0.86))):
        dot(d, x, int(H * 0.33), 26, 225)
        dot(d, x, int(H * 0.33), 40, 70, outline=True)
    return label(im, "Twelve things to agree", "Partnership deed: what the Act says if your deed is silent")


# After incorporation: a timeline with the statutory marks, then the annual
# loop that runs every year afterwards.
def after():
    im = base()
    d = ImageDraw.Draw(im)
    y = int(H * 0.34)
    x0, x1 = int(W * 0.08), int(W * 0.66)
    d.line([(x0, y), (x1, y)], fill=blend(BLUE, 200), width=4)
    # Schematic, not to scale: spaced so each label has room.
    marks = [(0.0, "Day 1", "Certificate"), (0.24, "30 days", "Board, auditor"),
             (0.48, "2 months", "Share certificates"), (0.92, "180 days", "INC-20A")]
    for f, top, bottom in marks:
        x = x0 + int((x1 - x0) * f)
        dot(d, x, y, 13, 240)
        small(d, (x, y - 30), top, fill=WHITE, anchor="ms")
        small(d, (x, y + 32), bottom, fill=LABEL, anchor="ma")
    cx, cy, r = int(W * 0.82), y, int(H * 0.13)
    d.arc([cx - r, cy - r, cx + r, cy + r], start=200, end=520, fill=blend(BLUE, 210), width=4)
    d.polygon([(cx - r - 10, cy - 6), (cx - r + 10, cy - 6), (cx - r, cy + 12)], fill=blend(BLUE, 210))
    small(d, (cx, cy - 8), "Every year", fill=WHITE, anchor="mm")
    small(d, (cx, cy + 16), "Audit, AGM, filings", fill=LABEL, anchor="mm")
    d.line([(x1, y), (cx - r - 4, y)], fill=blend(BLUE, 120), width=3)
    return label(im, "The clocks that start on day one", "After incorporation: what is due, and by when")


if __name__ == "__main__":
    save(gst(), "gst-registration-gujarat")
    save(udyam(), "udyam-registration-msme")
    save(shops(), "gujarat-shops-establishments-registration")
    save(deed(), "partnership-deed-checklist")
    save(after(), "after-company-incorporation-checklist")
