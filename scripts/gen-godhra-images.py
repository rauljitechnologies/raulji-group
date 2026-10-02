"""
Featured images for the Godhra business guides.

Same house style as scripts/gen-blog-images.py: a navy field, a faint grid,
brand line work, the Raulji mark and a line of type. Drawn artwork, because
there is no photograph of Godhra in the repository and a stock photograph of
somewhere else captioned as Godhra would be a false local signal. Each image
draws what its article is about, so it carries information.

Kept separate from gen-blog-images.py so that running this never redraws the
nine series images, which have since been replaced by supplied artwork.

Every output is 1200x675 (16:9).

Run:  python3 scripts/gen-godhra-images.py
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

FONTS = {
    True: [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ],
    False: [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ],
}


def font(sz, bold=False):
    for path in FONTS[bold]:
        if os.path.exists(path):
            return ImageFont.truetype(path, sz)
    raise SystemExit("No usable font found. Add a TrueType path to FONTS.")


mark = Image.open("public/favicon.png").convert("RGBA")


def blend(color, alpha, bg=GROUND):
    """ImageDraw replaces pixels rather than blending, so faint colours are mixed here."""
    t = alpha / 255
    return tuple(int(c * t + b * (1 - t)) for c, b in zip(color, bg))


def base():
    im = Image.new("RGBA", (W, H), NAVY)
    d = ImageDraw.Draw(im)
    for i in range(H):
        t = i / H
        d.line(
            [(0, i), (W, i)],
            fill=tuple(int(a + (b - a) * t) for a, b in zip(NAVY, NAVY_D)) + (255,),
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
    x, y = int(W * 0.07), int(H * 0.71)
    d.text((x, y - 34), "GODHRA BUSINESS GUIDES", font=font(17, True), fill=BLUE)
    d.text((x, y), title, font=font(int(W / 23), True), fill=WHITE)
    d.text((x, y + int(W / 19)), sub, font=font(int(W / 54)), fill=SUB)
    m = mark.resize((int(W / 18), int(W / 18)), Image.LANCZOS)
    im.alpha_composite(m, (W - int(W / 18) - int(W * 0.05), H - int(W / 18) - int(W * 0.07)))
    return im


def save(im, name):
    os.makedirs(OUT, exist_ok=True)
    path = f"{OUT}/{name}.webp"
    im.convert("RGB").save(path, "WEBP", quality=86, method=6)
    print(f"{name}.webp {W}x{H} {os.path.getsize(path) // 1024}KB")


def dot(d, x, y, r, alpha=255, outline=False):
    box = [x - r, y - r, x + r, y + r]
    if outline:
        d.ellipse(box, outline=blend(BLUE, alpha), width=3)
    else:
        d.ellipse(box, fill=blend(BLUE, alpha))


def arrow(d, a, b, alpha=200):
    (ax, ay), (bx, by) = a, b
    d.line([(ax, ay), (bx - 14, by)], fill=blend(BLUE, alpha), width=4)
    d.polygon([(bx, by), (bx - 18, by - 9), (bx - 18, by + 9)], fill=blend(BLUE, alpha + 20))


def card(d, x, y, w, h, text, strong=False, lines=1):
    d.rounded_rectangle(
        [x, y, x + w, y + h], radius=10, outline=blend(BLUE, 230 if strong else 150), width=4 if strong else 3
    )
    d.text((x + 18, y + 16), text, font=font(21, True), fill=LABEL if strong else SUB)
    for k in range(lines):
        ly = y + 56 + k * 16
        d.line([(x + 18, ly), (x + 18 + int(w * (0.62 if k % 2 == 0 else 0.4)), ly)], fill=blend(BLUE, 80), width=3)


# 1. Starting a business: five decisions in the order they should be made, the
#    structure one emphasised because everything after it depends on it.
def starting():
    im = base()
    d = ImageDraw.Draw(im)
    steps = ["Idea", "Owners", "Structure", "Register", "Plan"]
    y = int(H * 0.22)
    w, h = 170, 96
    gap = (int(W * 0.86) - len(steps) * w) // (len(steps) - 1)
    x0 = int(W * 0.07)
    for i, s in enumerate(steps):
        x = x0 + i * (w + gap)
        card(d, x, y, w, h, s, strong=(i == 2), lines=2)
        d.text((x, y - 34), f"0{i + 1}", font=font(18, True), fill=blend(BLUE, 230))
        if i < len(steps) - 1:
            arrow(d, (x + w + 8, y + h // 2), (x + w + gap - 8, y + h // 2), 170)
    return label(im, "Five decisions, in order", "The structure is the one everything else depends on")


# 2. Company registration: the incorporation path as filed, with the
#    registrations that come out of it on the right.
def company():
    im = base()
    d = ImageDraw.Draw(im)
    y = int(H * 0.16)
    xs = [int(W * f) for f in (0.07, 0.30, 0.53)]
    names = ["DSC", "Name", "SPICe+"]
    w, h = 200, 92
    for i, x in enumerate(xs):
        card(d, x, y, w, h, names[i], strong=(i == 2))
        if i < 2:
            arrow(d, (x + w + 8, y + h // 2), (xs[i + 1] - 8, y + h // 2), 170)
    cx = int(W * 0.80)
    arrow(d, (xs[2] + w + 8, y + h // 2), (cx - 8, y + h // 2), 210)
    d.rounded_rectangle([cx, y - 6, cx + 170, y + h + 6], radius=12, outline=blend(BLUE, 245), width=4)
    d.text((cx + 18, y + 12), "CIN", font=font(24, True), fill=WHITE)
    d.text((cx + 18, y + 48), "Certificate", font=font(18), fill=SUB)
    outs = ["PAN", "TAN", "GST", "EPFO", "ESIC"]
    oy = y + h + 52
    for k, o in enumerate(outs):
        ox = int(W * 0.30) + k * 132
        d.rounded_rectangle([ox, oy, ox + 112, oy + 44], radius=8, outline=blend(BLUE, 120), width=2)
        d.text((ox + 18, oy + 10), o, font=font(18, True), fill=SUB)
    d.text((int(W * 0.07), oy + 10), "Applied for alongside", font=font(18), fill=SUB)
    return label(im, "One filing, several registrations", "Name, incorporation, then the numbers that follow")


# 3. Private Limited: shareholders own, directors run. Two rows, because the
#    split between ownership and management is what the structure is.
def pvt():
    im = base()
    d = ImageDraw.Draw(im)
    top = int(H * 0.10)
    d.text((int(W * 0.07), top), "Shareholders", font=font(21, True), fill=LABEL)
    d.text((int(W * 0.07), top + 150), "Directors", font=font(21, True), fill=SUB)
    xs = [int(W * f) for f in (0.34, 0.50, 0.66, 0.82)]
    for i, x in enumerate(xs):
        for r in range(2):
            for c in range(3):
                s = 15
                filled = (r * 3 + c + i) % 2 == 0
                bx, by = x - 30 + c * 22, top - 8 + r * 22
                d.rectangle([bx, by, bx + s, by + s], fill=blend(BLUE, 230) if filled else None, outline=blend(BLUE, 120), width=2)
    for x in xs[1:3]:
        dot(d, x, top + 162, 20, 235)
        dot(d, x, top + 162, 32, 70, outline=True)
    for x in xs:
        for t in xs[1:3]:
            d.line([(x, top + 52), (t, top + 126)], fill=blend(BLUE, 60), width=2)
    d.rounded_rectangle([int(W * 0.28), top - 30, int(W * 0.90), top + 205], radius=16, outline=blend(BLUE, 200), width=3)
    return label(im, "Shareholders own, directors run", "A separate company with limited liability")


# 4. LLP: partners joined under one agreement, with the 30-day marker that the
#    agreement filing runs against.
def llp():
    im = base()
    d = ImageDraw.Draw(im)
    cy = int(H * 0.24)
    xs = [int(W * 0.18), int(W * 0.38)]
    for x in xs:
        dot(d, x, cy, 24, 235)
        dot(d, x, cy, 38, 70, outline=True)
    d.line([(xs[0] + 38, cy), (xs[1] - 38, cy)], fill=blend(BLUE, 200), width=4)
    d.text((xs[0] - 70, cy + 54), "Designated partners", font=font(20, True), fill=LABEL)
    dx, dy = int(W * 0.52), int(H * 0.10)
    d.rounded_rectangle([dx, dy, dx + 150, dy + 190], radius=10, outline=blend(BLUE, 225), width=4)
    d.text((dx + 18, dy + 16), "LLP", font=font(22, True), fill=WHITE)
    d.text((dx + 18, dy + 44), "Agreement", font=font(18), fill=SUB)
    for k in range(5):
        ly = dy + 88 + k * 18
        d.line([(dx + 18, ly), (dx + 18 + (96 if k % 2 == 0 else 64), ly)], fill=blend(BLUE, 85), width=3)
    tx0, tx1, ty = int(W * 0.66), int(W * 0.92), int(H * 0.24)
    d.line([(tx0, ty), (tx1, ty)], fill=blend(BLUE, 150), width=4)
    for f, text in ((0.0, "Incorporated"), (1.0, "Day 30: Form 3")):
        x = int(tx0 + (tx1 - tx0) * f)
        d.line([(x, ty - 20), (x, ty + 20)], fill=blend(BLUE, 220), width=4)
        dot(d, x, ty, 9, 255)
        d.text((x - (0 if f == 0 else 140), ty + 30), text, font=font(18, True), fill=SUB)
    return label(im, "Partners, one agreement, 30 days", "Limited liability without a company's board")


# 5. Options: four columns, and a set of factors running across them, because
#    the choice is made by weighing factors rather than by picking a winner.
def options():
    im = base()
    d = ImageDraw.Draw(im)
    names = ["Proprietorship", "Partnership", "LLP", "Pvt Ltd"]
    x0, x1 = int(W * 0.22), int(W * 0.93)
    top = int(H * 0.08)
    cw = (x1 - x0) // 4
    for c, n in enumerate(names):
        hx = x0 + c * cw
        d.rounded_rectangle([hx + 4, top, hx + cw - 8, top + 40], radius=8, fill=blend(BLUE, 200 - c * 25))
        d.text((hx + 18, top + 9), n, font=font(19, True), fill=WHITE)
    factors = ["Owners", "Liability cap", "Compliance", "Equity funding"]
    for r, f in enumerate(factors):
        ry = top + 58 + r * 52
        for c in range(4):
            hx = x0 + c * cw
            d.rounded_rectangle([hx + 4, ry, hx + cw - 8, ry + 40], radius=6, outline=blend(BLUE, 110), width=2)
            level = [[1, 2, 2, 3], [1, 1, 3, 3], [1, 2, 2, 3], [1, 1, 2, 3]][r][c]
            for k in range(level):
                bx = hx + 18 + k * 22
                d.rounded_rectangle([bx, ry + 13, bx + 14, ry + 27], radius=3, fill=blend(BLUE, 210))
        d.text((int(W * 0.07), ry + 9), f, font=font(19, True), fill=SUB)
    return label(im, "Four structures, weighed not ranked", "Owners, liability, compliance and funding plans")


save(starting(), "starting-a-business-in-godhra")
save(company(), "company-registration-godhra")
save(pvt(), "private-limited-company-registration-godhra")
save(llp(), "llp-registration-godhra-gujarat")
save(options(), "business-registration-options-godhra")
