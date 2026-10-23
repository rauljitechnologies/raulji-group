"""
Featured images for the Panchmahal health insurance guides and village guides.

Same house style and helpers as scripts/gen-godhra-images.py: a navy field, a
faint grid, brand line work, the Raulji mark and a line of type. Drawn
diagrams rather than photographs: there is no photograph of these towns in
the repository, and a stock family captioned as Panchmahal would be a false
local signal and the kind of generic imagery the brand rules exclude. Each
image draws the idea its article is built around.

Every output is 1200x675 (16:9).

Run:  python3 scripts/gen-health-images.py
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
    d.text((x, y - 34), "HEALTH INSURANCE GUIDES", font=font(17, True), fill=BLUE)
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



def pill(d, x, y, text, strong=False, w=None):
    w = w or (len(text) * 12 + 40)
    d.rounded_rectangle([x, y, x + w, y + 46], radius=23, outline=blend(BLUE, 235 if strong else 140), width=4 if strong else 3)
    d.text((x + 20, y + 11), text, font=font(20, True), fill=WHITE if strong else LABEL)
    return w


# 1. Panchmahal: one district hub, four towns around it, and the route on to
#    Vadodara that treatment often takes.
def panchmahal():
    im = base()
    d = ImageDraw.Draw(im)
    hx, hy = int(W * 0.36), int(H * 0.30)
    towns = [("Godhra", 0.10, 0.10), ("Halol", 0.10, 0.44), ("Kalol", 0.58, 0.10), ("Jambughoda", 0.58, 0.44)]
    for name, fx, fy in towns:
        tx, ty = int(W * fx), int(H * fy)
        tw = len(name) * 12 + 40
        d.line([(hx + 100, hy + 23), (tx + tw // 2, ty + 23)], fill=blend(BLUE, 90), width=3)
    for name, fx, fy in towns:
        pill(d, int(W * fx), int(H * fy), name)
    pill(d, hx, hy, "Panchmahal", strong=True, w=200)
    vx = int(W * 0.80)
    arrow(d, (int(W * 0.58) + 170, hy + 23), (vx - 8, hy + 23), 200)
    d.rounded_rectangle([vx, hy - 8, vx + 170, hy + 54], radius=12, outline=blend(BLUE, 245), width=4)
    d.text((vx + 18, hy + 4), "Vadodara", font=font(22, True), fill=WHITE)
    d.text((vx + 18, hy + 32), "Specialist care", font=font(15), fill=SUB)
    return label(im, "One district, four guides", "Compare cover where you would be treated")


# 2. Godhra: a family floater, one shared amount, beside individual policies,
#    one amount each.
def godhra():
    im = base()
    d = ImageDraw.Draw(im)
    top = int(H * 0.10)
    lx = int(W * 0.07)
    d.text((lx, top), "Family floater", font=font(21, True), fill=LABEL)
    d.rounded_rectangle([lx, top + 40, lx + 430, top + 210], radius=14, outline=blend(BLUE, 220), width=4)
    for k in range(4):
        dot(d, lx + 70 + k * 96, top + 95, 20 if k < 2 else 15, 235)
    d.rounded_rectangle([lx + 30, top + 150, lx + 400, top + 182], radius=8, fill=blend(BLUE, 170))
    d.text((lx + 44, top + 154), "One shared sum insured", font=font(17, True), fill=WHITE)
    rx = int(W * 0.55)
    d.text((rx, top), "Individual policies", font=font(21, True), fill=SUB)
    for k in range(4):
        x = rx + k * 120
        d.rounded_rectangle([x, top + 40, x + 100, top + 210], radius=12, outline=blend(BLUE, 140), width=3)
        dot(d, x + 50, top + 95, 20 if k < 2 else 15, 210)
        d.rounded_rectangle([x + 14, top + 150, x + 86, top + 182], radius=6, fill=blend(BLUE, 120))
    return label(im, "Shared cover or one each", "Floater and individual policies for a household")


# 3. Halol: group cover that stops at the end of the job, and a personal
#    policy that runs on past it.
def halol():
    im = base()
    d = ImageDraw.Draw(im)
    x0, x1 = int(W * 0.22), int(W * 0.92)
    end = int(W * 0.62)
    y1, y2 = int(H * 0.16), int(H * 0.36)
    d.text((int(W * 0.07), y1 - 4), "Group cover", font=font(20, True), fill=SUB)
    d.text((int(W * 0.07), y2 - 4), "Personal policy", font=font(20, True), fill=LABEL)
    d.rounded_rectangle([x0, y1, end, y1 + 26], radius=13, fill=blend(BLUE, 150))
    d.rounded_rectangle([x0, y2, x1, y2 + 26], radius=13, fill=blend(BLUE, 230))
    d.line([(end, y1 - 30), (end, y2 + 60)], fill=blend(BLUE, 200), width=3)
    d.text((end + 12, y2 + 40), "Job changes", font=font(18, True), fill=SUB)
    for k in range(5):
        x = x0 + 40 + k * int((x1 - x0 - 80) / 4)
        d.line([(x, y2 + 30), (x, y2 + 42)], fill=blend(BLUE, 180), width=3)
    d.text((x0, y2 + 54), "Waiting period credit keeps building", font=font(17), fill=SUB)
    return label(im, "Cover from work, and your own", "Group cover ends with the job; a personal policy does not")


# 4. Kalol: the waiting period timeline, the mechanism the article explains.
def kalol():
    im = base()
    d = ImageDraw.Draw(im)
    x0, x1, y = int(W * 0.08), int(W * 0.92), int(H * 0.30)
    d.line([(x0, y), (x1, y)], fill=blend(BLUE, 170), width=5)
    marks = [(0.0, "Start"), (0.10, "30 days"), (0.36, "Specific illness"), (0.60, "36 months"), (1.0, "60 months")]
    for f, text in marks:
        x = int(x0 + (x1 - x0) * f)
        d.line([(x, y - 22), (x, y + 22)], fill=blend(BLUE, 230), width=4)
        dot(d, x, y, 9, 255)
        tx = x - (0 if f == 0 else (150 if f == 1.0 else 40))
        d.text((tx, y + 34), text, font=font(18, True), fill=LABEL if f in (0.6, 1.0) else SUB)
    d.text((int(x0 + (x1 - x0) * 0.60) - 40, y - 62), "Pre-existing", font=font(17), fill=SUB)
    d.text((x1 - 150, y - 62), "Moratorium", font=font(17), fill=SUB)
    return label(im, "Four clocks, one policy", "Waiting periods run while cover stays continuous")


# 5. Jambughoda: a long route to a network hospital, with the reimbursement
#    branch that distance makes more likely.
def jambughoda():
    im = base()
    d = ImageDraw.Draw(im)
    hx, hy = int(W * 0.08), int(H * 0.24)
    for k in range(5):
        tx = hx + 20 + k * 26
        d.polygon([(tx, hy - 40), (tx - 16, hy), (tx + 16, hy)], outline=blend(BLUE, 110), fill=None)
    d.rectangle([hx + 40, hy + 10, hx + 110, hy + 60], outline=blend(BLUE, 210), width=3)
    d.polygon([(hx + 30, hy + 12), (hx + 75, hy - 20), (hx + 120, hy + 12)], outline=blend(BLUE, 210))
    d.text((hx, hy + 76), "Home", font=font(18, True), fill=SUB)
    px = int(W * 0.66)
    for k in range(14):
        x = hx + 150 + k * int((px - hx - 170) / 14)
        d.line([(x, hy + 35), (x + 14, hy + 35)], fill=blend(BLUE, 170), width=4)
    arrow(d, (px - 40, hy + 35), (px - 6, hy + 35), 220)
    d.rounded_rectangle([px, hy - 10, px + 220, hy + 80], radius=12, outline=blend(BLUE, 245), width=4)
    d.text((px + 18, hy + 6), "Network hospital", font=font(20, True), fill=WHITE)
    d.text((px + 18, hy + 40), "Cashless", font=font(17), fill=SUB)
    by = hy + 130
    d.line([(int(W * 0.40), hy + 35), (int(W * 0.40), by + 20), (px - 8, by + 20)], fill=blend(BLUE, 110), width=3)
    d.rounded_rectangle([px, by - 6, px + 220, by + 46], radius=10, outline=blend(BLUE, 150), width=3)
    d.text((px + 18, by + 6), "Reimbursement", font=font(19, True), fill=LABEL)
    return label(im, "Far from the network", "Check the route, and keep every bill")


save(panchmahal(), "health-insurance-panchmahal-gujarat")
save(godhra(), "health-insurance-godhra-gujarat")
save(halol(), "health-insurance-halol-gujarat")
save(kalol(), "health-insurance-kalol-gujarat")
save(jambughoda(), "health-insurance-jambughoda-panchmahal")


# 6. Villages around Godhra: the buying steps in order, then the free look window.
def villages():
    im = base()
    d = ImageDraw.Draw(im)
    steps = ["Choose", "Proposal", "KYC", "Pay", "Policy"]
    y, w, h = int(H * 0.16), 160, 84
    x0 = int(W * 0.07)
    gap = (int(W * 0.86) - len(steps) * w) // (len(steps) - 1)
    for i, s in enumerate(steps):
        x = x0 + i * (w + gap)
        d.rounded_rectangle([x, y, x + w, y + h], radius=10, outline=blend(BLUE, 230 if i == 1 else 150), width=4 if i == 1 else 3)
        d.text((x + 18, y + 28), s, font=font(21, True), fill=LABEL if i == 1 else SUB)
        if i < len(steps) - 1:
            arrow(d, (x + w + 6, y + h // 2), (x + w + gap - 6, y + h // 2), 170)
    px = x0 + 4 * (w + gap)
    fy = y + h + 40
    d.rounded_rectangle([px - 190, fy, px + w, fy + 46], radius=23, fill=blend(BLUE, 160))
    d.text((px - 172, fy + 11), "30-day free look", font=font(20, True), fill=WHITE)
    return label(im, "Buying a policy, step by step", "From the proposal form to the free look period")


# 7. Kakanpur: three generations, split into a floater and a separate policy.
def kakanpur():
    im = base()
    d = ImageDraw.Draw(im)
    top = int(H * 0.12)
    lx = int(W * 0.07)
    d.text((lx, top), "Family floater", font=font(21, True), fill=LABEL)
    d.rounded_rectangle([lx, top + 38, lx + 520, top + 190], radius=14, outline=blend(BLUE, 225), width=4)
    for k, r in enumerate([22, 22, 15, 15]):
        dot(d, lx + 80 + k * 120, top + 100, r, 235)
    rx = int(W * 0.62)
    d.text((rx, top), "Parents' own policy", font=font(21, True), fill=SUB)
    d.rounded_rectangle([rx, top + 38, rx + 300, top + 190], radius=14, outline=blend(BLUE, 160), width=3)
    for k in range(2):
        dot(d, rx + 90 + k * 120, top + 100, 22, 190)
    return label(im, "One household, two policies", "A floater for the family, separate cover for parents")


# 8. Tuwa: one bill, split into what the policy pays and what the family pays.
def tuwa():
    im = base()
    d = ImageDraw.Draw(im)
    x0, x1, y = int(W * 0.07), int(W * 0.93), int(H * 0.22)
    split = int(x0 + (x1 - x0) * 0.76)
    d.rounded_rectangle([x0, y, split, y + 70], radius=10, fill=blend(BLUE, 210))
    d.rounded_rectangle([split + 8, y, x1, y + 70], radius=10, outline=blend(BLUE, 160), width=3)
    d.text((x0 + 22, y + 22), "Paid by the policy", font=font(22, True), fill=WHITE)
    d.text((split + 26, y + 22), "Paid by you", font=font(20, True), fill=LABEL)
    for k, t in enumerate(["Co-payment", "Non-medical items", "Above a limit"]):
        d.text((split + 26, y + 96 + k * 30), t, font=font(17), fill=SUB)
    return label(im, "What a policy pays for", "And the share a family still pays at discharge")


# 9. Kantadi: a parent's declared condition, its waiting period, then cover.
def kantadi():
    im = base()
    d = ImageDraw.Draw(im)
    x0, x1, y = int(W * 0.30), int(W * 0.92), int(H * 0.28)
    lx = int(W * 0.07)
    dot(d, lx + 60, y - 10, 30, 235)
    d.text((lx, y + 40), "Parent, 60+", font=font(19, True), fill=LABEL)
    d.text((lx, y + 68), "Condition declared", font=font(16), fill=SUB)
    mid = int(x0 + (x1 - x0) * 0.55)
    d.rounded_rectangle([x0, y - 22, mid, y + 4], radius=13, outline=blend(BLUE, 160), width=3)
    d.rounded_rectangle([mid + 8, y - 22, x1, y + 4], radius=13, fill=blend(BLUE, 225))
    d.text((x0, y + 24), "Waiting period, up to 36 months", font=font(17), fill=SUB)
    d.text((mid + 8, y + 24), "Covered", font=font(18, True), fill=LABEL)
    return label(im, "Cover for parents", "Declare every condition; cover follows the waiting period")


save(villages(), "health-insurance-villages-godhra-panchmahal")
save(kakanpur(), "health-insurance-kakanpur-panchmahal")
save(tuwa(), "health-insurance-tuwa-panchmahal")
save(kantadi(), "health-insurance-kantadi-panchmahal")
