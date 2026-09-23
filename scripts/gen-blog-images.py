"""
Featured images for the 2026 Business Guide Series.

Same house style as scripts/gen-panels.py: a navy field, a faint grid, brand
line work, the Raulji mark and a line of type. Drawn artwork rather than
photography, and nothing here pretends otherwise. Each one draws what its
article is actually about (four paths from one decision, a name and a filing
and a certificate with the resubmission loop, a waiting period timeline), so
the image carries information rather than decorating the top of the page.

Every output is 1200x675, which is the 16:9 the brief asks for.

Run:  python3 scripts/gen-blog-images.py
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

NAVY = (25, 42, 66)
NAVY_D = (15, 26, 42)
BLUE = (49, 153, 212)
WHITE = (255, 255, 255)
SUB = (150, 195, 228)
LABEL = (205, 228, 244)

W, H = 1200, 675
OUT = "public/blog"


def font(sz, bold=False):
    p = (
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
        if bold
        else "/System/Library/Fonts/Supplemental/Arial.ttf"
    )
    return ImageFont.truetype(p, sz) if os.path.exists(p) else ImageFont.load_default()


mark = Image.open("public/favicon.png").convert("RGBA")

# Ground the drawing sits on, roughly the middle of the navy gradient.
GROUND = (20, 34, 54)


def blend(color, alpha, bg=GROUND):
    """
    A colour already mixed down towards the background.

    ImageDraw does not alpha-blend when it paints onto an RGBA image: it
    replaces the pixel, alpha included, and the alpha channel is then dropped
    on conversion to RGB. So a fill of (r, g, b, 40) does not come out faint,
    it comes out solid. Every "faint" line in these panels is therefore mixed
    here instead, against the ground it will sit on.
    """
    t = alpha / 255
    return tuple(int(c * t + b * (1 - t)) for c, b in zip(color, bg))


def base():
    im = Image.new("RGBA", (W, H), NAVY)
    d = ImageDraw.Draw(im)
    for i in range(H):
        t = i / H
        d.line(
            [(0, i), (W, i)],
            fill=(
                int(NAVY[0] + (NAVY_D[0] - NAVY[0]) * t),
                int(NAVY[1] + (NAVY_D[1] - NAVY[1]) * t),
                int(NAVY[2] + (NAVY_D[2] - NAVY[2]) * t),
                255,
            ),
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
    d.text(
        (int(W * 0.07), int(H * 0.71) + int(W / 19)),
        sub,
        font=font(int(W / 54)),
        fill=SUB,
    )
    m = mark.resize((int(W / 18), int(W / 18)), Image.LANCZOS)
    im.alpha_composite(m, (W - int(W / 18) - int(W * 0.05), H - int(W / 18) - int(W * 0.07)))
    return im


def save(im, name):
    os.makedirs(OUT, exist_ok=True)
    path = f"{OUT}/{name}.webp"
    im.convert("RGB").save(path, "WEBP", quality=86, method=6)
    print(f"{name}.webp {W}x{H} {os.path.getsize(path) // 1024}KB")


def dashed(d, a, b, fill, width=3, on=9, off=7):
    ax, ay = a
    bx, by = b
    total = math.hypot(bx - ax, by - ay)
    if total == 0:
        return
    ux, uy = (bx - ax) / total, (by - ay) / total
    t = 0.0
    while t < total:
        e = min(t + on, total)
        d.line([(ax + ux * t, ay + uy * t), (ax + ux * e, ay + uy * e)], fill=fill, width=width)
        t = e + off


def dot(d, x, y, r, alpha=255, outline=False):
    if outline:
        d.ellipse([x - r, y - r, x + r, y + r], outline=blend(BLUE, alpha), width=3)
    else:
        d.ellipse([x - r, y - r, x + r, y + r], fill=blend(BLUE, alpha))


# 1. Choosing a structure: one decision, four routes, each arriving somewhere
#    different. The routes fan rather than branch, because the four options are
#    alternatives rather than a tree.
def choose():
    im = base()
    d = ImageDraw.Draw(im)
    sx, sy = int(W * 0.10), int(H * 0.33)
    dot(d, sx, sy, 18)
    dot(d, sx, sy, 32, 80, outline=True)
    ends = [(0.14, 4), (0.27, 3), (0.40, 2), (0.53, 1)]
    ex = int(W * 0.72)
    for i, (fy, rules) in enumerate(ends):
        ey = int(H * fy)
        mx = int(W * 0.40)
        d.line([(sx + 34, sy), (mx, ey)], fill=blend(BLUE, 150 if i else 230), width=4 if i == 0 else 3)
        d.line([(mx, ey), (ex - 12, ey)], fill=blend(BLUE, 150 if i else 230), width=4 if i == 0 else 3)
        cw, ch = int(W * 0.17), int(H * 0.085)
        d.rounded_rectangle(
            [ex, ey - ch // 2, ex + cw, ey + ch // 2],
            radius=10,
            outline=blend(BLUE, 210 if i == 0 else 140),
            width=3,
        )
        # Fewer rules in each card as you move down the fan, because the annual
        # compliance genuinely falls away from Private Limited to Proprietorship.
        for k in range(rules):
            ly = ey - ch // 2 + 14 + k * 11
            d.line(
                [(ex + 14, ly), (ex + 14 + int(cw * (0.55 if k % 2 else 0.34)), ly)],
                fill=blend(BLUE, 95),
                width=3,
            )
        dot(d, mx, ey, 6, 200)
    return label(im, "One decision, four answers", "Liability, owners, compliance, funding")


# 2. Company against LLP: two frames. The left one holds share units, which is
#    the thing an LLP does not have; the right one holds partners joined to each
#    other, which is how an LLP is actually run.
def pvt_llp():
    im = base()
    d = ImageDraw.Draw(im)
    top, fh = int(H * 0.12), int(H * 0.40)
    ax0, ax1 = int(W * 0.08), int(W * 0.45)
    bx0, bx1 = int(W * 0.55), int(W * 0.92)

    d.rounded_rectangle([ax0, top, ax1, top + fh], radius=14, outline=blend(BLUE, 225), width=4)
    # share units
    cols, rows = 6, 4
    gw = (ax1 - ax0) - 60
    gh = fh - 70
    for r in range(rows):
        for c in range(cols):
            x = ax0 + 30 + int(gw * c / cols)
            y = top + 40 + int(gh * r / rows)
            s = 13
            filled = (r * cols + c) % 3 == 0
            d.rectangle(
                [x, y, x + s, y + s],
                fill=blend(BLUE, 235) if filled else None,
                outline=blend(BLUE, 110),
                width=2,
            )

    d.rounded_rectangle([bx0, top, bx1, top + fh], radius=14, outline=blend(BLUE, 160), width=3)
    px = [bx0 + int((bx1 - bx0) * f) for f in (0.28, 0.72)]
    py = top + fh // 2 - 18
    for x in px:
        dot(d, x, py, 22, 225)
        dot(d, x, py, 36, 70, outline=True)
    d.line([(px[0] + 36, py), (px[1] - 36, py)], fill=blend(BLUE, 190), width=4)

    f = font(int(W / 50), True)
    d.text((ax0, top + fh + 20), "Shares", font=f, fill=LABEL)
    d.text((bx0, top + fh + 20), "Partners", font=f, fill=SUB)
    return label(im, "Shares, or partners", "The difference that settles most of this choice")


# 3. Partnership against proprietorship: one owner, then two, and the liability
#    ring left open in both because neither one closes it.
def partnership_prop():
    im = base()
    d = ImageDraw.Draw(im)
    cy = int(H * 0.30)

    ax = int(W * 0.24)
    dot(d, ax, cy, 26, 235)
    for a in range(200, 341, 12):
        d.arc([ax - 78, cy - 78, ax + 78, cy + 78], a, a + 7, fill=blend(BLUE, 95), width=4)

    bx0, bx1 = int(W * 0.63), int(W * 0.80)
    for x in (bx0, bx1):
        dot(d, x, cy, 26, 235)
    d.line([(bx0 + 26, cy), (bx1 - 26, cy)], fill=blend(BLUE, 200), width=4)
    mid = (bx0 + bx1) // 2
    for a in range(200, 341, 12):
        d.arc([mid - 130, cy - 130, mid + 130, cy + 130], a, a + 7, fill=blend(BLUE, 95), width=4)

    d.line([(int(W * 0.44), int(H * 0.10)), (int(W * 0.44), int(H * 0.50))], fill=blend(WHITE, 30), width=2)
    f = font(int(W / 50), True)
    d.text((int(W * 0.17), int(H * 0.52)), "One owner", font=f, fill=LABEL)
    d.text((int(W * 0.60), int(H * 0.52)), "Two or more", font=f, fill=LABEL)
    return label(im, "Neither one is a separate entity", "The liability ring stays open in both")


# 4. Documents: rows of paper with a tick against most and a cross against the
#    one that comes back. That is the actual experience of the document stage.
def documents():
    im = base()
    d = ImageDraw.Draw(im)
    x0 = int(W * 0.50)
    rw, rh = int(W * 0.40), 40
    marks = [True, True, False, True, True]
    for i, ok in enumerate(marks):
        y = int(H * 0.11) + i * (rh + 14)
        d.rounded_rectangle([x0, y, x0 + rw, y + rh], radius=8, outline=blend(BLUE, 150), width=3)
        d.line([(x0 + 52, y + 15), (x0 + 52 + int(rw * 0.45), y + 15)], fill=blend(BLUE, 85), width=3)
        d.line([(x0 + 52, y + 27), (x0 + 52 + int(rw * 0.28), y + 27)], fill=blend(BLUE, 60), width=3)
        cx, cy = x0 + 26, y + rh // 2
        if ok:
            d.line([(cx - 9, cy), (cx - 3, cy + 7), (cx + 10, cy - 8)], fill=blend(BLUE, 255), width=4)
        else:
            d.ellipse([cx - 13, cy - 13, cx + 13, cy + 13], outline=blend(BLUE, 235), width=3)
            d.line([(cx - 6, cy - 6), (cx + 6, cy + 6)], fill=blend(BLUE, 255), width=4)
            d.line([(cx + 6, cy - 6), (cx - 6, cy + 6)], fill=blend(BLUE, 255), width=4)
    return label(im, "Four groups of documents", "Identity, address, registered office, declarations")


# 5. Mistakes: a filing that goes out and comes back. The loop is the point.
def mistakes():
    im = base()
    d = ImageDraw.Draw(im)
    fx, fy = int(W * 0.52), int(H * 0.12)
    fw, fh = int(W * 0.24), int(H * 0.36)
    d.rounded_rectangle([fx, fy, fx + fw, fy + fh], radius=12, outline=blend(BLUE, 210), width=3)
    for i in range(4):
        ly = fy + 34 + i * 34
        d.rounded_rectangle(
            [fx + 20, ly, fx + int(fw * (0.55 if i % 2 else 0.80)), ly + 16],
            radius=6,
            fill=blend(BLUE, 70),
        )
    gx = int(W * 0.88)
    d.rounded_rectangle([gx - 40, fy + 40, gx, fy + fh - 40], radius=10, outline=blend(BLUE, 120), width=3)

    d.line([(fx + fw + 8, fy + 60), (gx - 52, fy + 60)], fill=blend(BLUE, 200), width=4)
    d.polygon(
        [(gx - 44, fy + 60), (gx - 62, fy + 51), (gx - 62, fy + 69)], fill=blend(BLUE, 230)
    )
    back_y = fy + fh - 60
    dashed(d, (gx - 52, back_y), (fx + fw + 8, back_y), blend(BLUE, 140), width=4)
    d.polygon(
        [(fx + fw + 2, back_y), (fx + fw + 20, back_y - 9), (fx + fw + 20, back_y + 9)],
        fill=blend(BLUE, 190),
    )
    d.text(
        (fx + fw + 24, back_y + 14), "resubmission", font=font(int(W / 60), True), fill=SUB
    )
    return label(im, "Nine ways this goes wrong", "Almost all of them before anything is filed")


# 6. Gujarat: two layers, because that is the article's argument. One national
#    process, one state layer sitting under it with its own markers.
def gujarat():
    im = base()
    d = ImageDraw.Draw(im)
    x0, x1 = int(W * 0.46), int(W * 0.93)

    y1 = int(H * 0.16)
    d.rounded_rectangle([x0, y1, x1, y1 + 54], radius=10, outline=blend(BLUE, 225), width=4)
    for i in range(1, 4):
        x = x0 + int((x1 - x0) * i / 4)
        d.line([(x, y1), (x, y1 + 54)], fill=blend(BLUE, 60), width=2)
    d.text((x0, y1 - 34), "National", font=font(int(W / 58), True), fill=LABEL)

    y2 = int(H * 0.38)
    d.rounded_rectangle([x0, y2, x1, y2 + 54], radius=10, outline=blend(BLUE, 140), width=3)
    for i in (0, 2, 3):
        sx = x0 + int((x1 - x0) * i / 4) + 5
        ex = x0 + int((x1 - x0) * (i + 1) / 4) - 5
        d.rounded_rectangle([sx, y2 + 5, ex, y2 + 49], radius=7, fill=blend(BLUE, 210))
    d.text((x0, y2 - 34), "Gujarat", font=font(int(W / 58), True), fill=SUB)

    for i in range(5):
        x = x0 + int((x1 - x0) * i / 4)
        dashed(d, (x, y1 + 58), (x, y2 - 4), blend(BLUE, 55), width=2, on=6, off=6)
    return label(im, "One process, one state layer", "Stamp duty, Registrar of Firms, shops and establishments")


# 7. MCA process: name, filing, certificate, with the loop back that a
#    resubmission actually is.
def mca():
    im = base()
    d = ImageDraw.Draw(im)
    y = int(H * 0.26)
    xs = [int(W * f) for f in (0.14, 0.42, 0.70)]
    bw, bh = int(W * 0.18), int(H * 0.16)
    names = ["Name", "Filing", "Certificate"]
    for i, x in enumerate(xs):
        d.rounded_rectangle(
            [x, y, x + bw, y + bh],
            radius=12,
            outline=blend(BLUE, 235 if i == 2 else 175),
            width=4 if i == 2 else 3,
        )
        for k in range(2 if i < 2 else 1):
            ly = y + 26 + k * 20
            d.line([(x + 20, ly), (x + 20 + int(bw * (0.5 if k else 0.68)), ly)], fill=blend(BLUE, 85), width=3)
        if i == 2:
            sx, sy = x + bw - 30, y + bh - 28
            dot(d, sx, sy, 16, 255)
            d.line([(sx - 7, sy), (sx - 2, sy + 6), (sx + 8, sy - 6)], fill=NAVY, width=3)
        d.text((x, y + bh + 16), names[i], font=font(int(W / 56), True), fill=LABEL if i == 2 else SUB)
        if i < 2:
            mid = y + bh // 2
            d.line([(x + bw + 10, mid), (xs[i + 1] - 22, mid)], fill=blend(BLUE, 190), width=4)
            d.polygon(
                [(xs[i + 1] - 14, mid), (xs[i + 1] - 32, mid - 9), (xs[i + 1] - 32, mid + 9)],
                fill=blend(BLUE, 220),
            )
    loop_y = y + bh + 74
    dashed(d, (xs[1] + bw // 2, loop_y), (xs[0] + bw // 2, loop_y), blend(BLUE, 130), width=3)
    dashed(d, (xs[1] + bw // 2, y + bh + 6), (xs[1] + bw // 2, loop_y), blend(BLUE, 130), width=3)
    d.line([(xs[0] + bw // 2, loop_y), (xs[0] + bw // 2, y + bh + 6)], fill=blend(BLUE, 130), width=3)
    d.polygon(
        [
            (xs[0] + bw // 2, y + bh + 2),
            (xs[0] + bw // 2 - 8, y + bh + 20),
            (xs[0] + bw // 2 + 8, y + bh + 20),
        ],
        fill=blend(BLUE, 180),
    )
    return label(im, "Name, filing, certificate", "And the loop a resubmission sends you round")


# 8. The reference guide: a comparison matrix, drawn as a matrix. Four columns
#    because there are four structures, and the fill falls away to the right
#    because the compliance does.
def matrix():
    im = base()
    d = ImageDraw.Draw(im)
    x0, x1 = int(W * 0.07), int(W * 0.93)
    top = int(H * 0.12)
    cols, rows = 4, 5
    cw = (x1 - x0) // cols
    rh = int(H * 0.075)
    for c in range(cols):
        hx = x0 + c * cw
        d.rounded_rectangle(
            [hx + 4, top, hx + cw - 8, top + 26], radius=6, fill=blend(BLUE, 235 - c * 20)
        )
    for r in range(rows):
        ry = top + 40 + r * rh
        for c in range(cols):
            hx = x0 + c * cw
            filled = c <= (cols - 1 - r % 2) and (r + c) % 4 != 3
            d.rounded_rectangle(
                [hx + 4, ry, hx + cw - 8, ry + rh - 12],
                radius=6,
                outline=blend(BLUE, 130),
                width=2,
            )
            if filled:
                d.line(
                    [(hx + 18, ry + (rh - 12) // 2), (hx + 18 + int(cw * 0.42), ry + (rh - 12) // 2)],
                    fill=blend(BLUE, 150),
                    width=3,
                )
    return label(im, "Four structures, one table", "Ownership, liability, management, compliance, funding")


# 9. Health insurance: the policy, and under it the thing that actually decides
#    a claim, which is time. Markers at the waiting periods the rules set.
def health():
    im = base()
    d = ImageDraw.Draw(im)
    px, py = int(W * 0.10), int(H * 0.11)
    pw, ph = int(W * 0.26), int(H * 0.34)
    d.rounded_rectangle([px, py, px + pw, py + ph], radius=12, outline=blend(BLUE, 225), width=4)
    for i in range(5):
        ly = py + 30 + i * 30
        d.line([(px + 22, ly), (px + 22 + int(pw * (0.48 if i % 2 else 0.70)), ly)], fill=blend(BLUE, 85), width=3)

    tx0, tx1 = int(W * 0.46), int(W * 0.92)
    ty = int(H * 0.30)
    d.line([(tx0, ty), (tx1, ty)], fill=blend(BLUE, 140), width=4)
    stops = [(0.0, "30 days"), (0.45, "36 months"), (1.0, "60 months")]
    for f, text in stops:
        x = int(tx0 + (tx1 - tx0) * f)
        d.line([(x, ty - 22), (x, ty + 22)], fill=blend(BLUE, 210), width=4)
        dot(d, x, ty, 9, 255)
        d.text((x - 34, ty + 34), text, font=font(int(W / 62), True), fill=SUB)
    d.polygon([(tx1 + 16, ty), (tx1 - 4, ty - 10), (tx1 - 4, ty + 10)], fill=blend(BLUE, 200))
    return label(im, "Read it before you need it", "Waiting periods, exclusions, limits, the claim")


save(choose(), "choosing-a-business-structure-india")
save(pvt_llp(), "private-limited-company-vs-llp")
save(partnership_prop(), "partnership-firm-vs-proprietorship")
save(documents(), "company-registration-documents")
save(mistakes(), "business-registration-mistakes")
save(gujarat(), "starting-a-business-in-gujarat")
save(mca(), "mca-company-incorporation-process")
save(matrix(), "business-structure-comparison-guide")
save(health(), "health-insurance-policy-india")
