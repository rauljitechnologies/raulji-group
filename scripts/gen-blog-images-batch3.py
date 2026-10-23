"""
Featured images for the third batch of guides (23 Oct 2026): trademark,
FSSAI and Import Export Code.

Reuses the drawing helpers and house style of gen-blog-images-batch2.py
rather than copying them, so the batches cannot drift apart. Each image draws
the article's subject:

  trademark  a mark moving from TM to (R) through filing, examination,
             advertisement, the four-month opposition window and registration
  fssai      the three tiers on a turnover scale with the 1 April 2026 limits
  iec        India and the world joined by two trade arrows, with
             IEC = PAN and the April to June update

Run:  python3 scripts/gen-blog-images-batch3.py
"""

import importlib.util
import os

here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("batch2", os.path.join(here, "gen-blog-images-batch2.py"))
b2 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(b2)

from PIL import ImageDraw  # noqa: E402

W, H, BLUE, WHITE, LABEL, SUB = b2.W, b2.H, b2.BLUE, b2.WHITE, b2.LABEL, b2.SUB
base, label, small, dot, blend, save, font = b2.base, b2.label, b2.small, b2.dot, b2.blend, b2.save, b2.font


def trademark():
    im = base()
    d = ImageDraw.Draw(im)
    y = int(H * 0.34)
    x0, x1 = int(W * 0.18), int(W * 0.80)
    d.line([(x0, y), (x1, y)], fill=blend(BLUE, 200), width=4)
    stages = [(0.0, "Filed"), (0.22, "Examined"), (0.44, "Advertised"), (0.72, "Registered"), (1.0, "10 years")]
    for f, name in stages:
        x = x0 + int((x1 - x0) * f)
        dot(d, x, y, 12, 235)
        small(d, (x, y + 28), name, fill=LABEL, anchor="ma")
    # Opposition window between advertisement and registration.
    ax, rx = x0 + int((x1 - x0) * 0.44), x0 + int((x1 - x0) * 0.72)
    d.rounded_rectangle([ax + 16, y - 52, rx - 16, y - 22], radius=8, outline=blend(BLUE, 170), width=2)
    small(d, ((ax + rx) // 2, y - 37), "4 months to oppose", fill=WHITE, anchor="mm")
    # The marks either end.
    for x, sym in ((int(W * 0.09), "TM"), (int(W * 0.89), "R")):
        d.ellipse([x - 38, y - 38, x + 38, y + 38], outline=WHITE, width=3)
        d.text((x, y), sym, font=font(30 if sym == "TM" else 38, True), fill=WHITE, anchor="mm")
    return label(im, "From TM to registered", "Trademark registration in India: classes, process and fees")


def fssai():
    im = base()
    d = ImageDraw.Draw(im)
    tiers = [("Registration", "up to 1.5 crore", 0.30, 150), ("State licence", "1.5 to 50 crore", 0.58, 195), ("Central licence", "above 50 crore", 0.86, 240)]
    x0 = int(W * 0.08)
    for i, (name, rng, frac, a) in enumerate(tiers):
        y = int(H * (0.10 + i * 0.17))
        x1 = x0 + int(W * 0.62 * frac)
        d.rounded_rectangle([x0, y, x1, y + 44], radius=8, fill=blend(BLUE, a))
        small(d, (x0 + 16, y + 22), name, fill=WHITE, anchor="lm")
        small(d, (x1 + 16, y + 22), rng, fill=LABEL, anchor="lm")
    small(d, (x0, int(H * 0.62)), "Turnover limits from 1 April 2026. Perpetual validity, subject to inspection.", fill=SUB)
    return label(im, "Three tiers, new limits", "FSSAI registration, state licence or central licence")


def iec():
    im = base()
    d = ImageDraw.Draw(im)
    cy = int(H * 0.30)
    lx, rx = int(W * 0.20), int(W * 0.62)
    dot(d, lx, cy, 40, 225)
    d.ellipse([rx - 70, cy - 70, rx + 70, cy + 70], outline=blend(BLUE, 200), width=3)
    d.line([(rx - 70, cy), (rx + 70, cy)], fill=blend(BLUE, 120), width=2)
    d.arc([rx - 35, cy - 70, rx + 35, cy + 70], 0, 360, fill=blend(BLUE, 120), width=2)
    small(d, (lx, cy + 58), "India", fill=WHITE, anchor="ma")
    small(d, (rx, cy + 84), "Rest of the world", fill=WHITE, anchor="ma")
    for dy, direction in ((-16, 1), (16, -1)):
        y = cy + dy
        a, b = (lx + 50, rx - 80) if direction == 1 else (rx - 80, lx + 50)
        d.line([(a, y), (b, y)], fill=WHITE, width=3)
        tip = b
        d.polygon([(tip, y), (tip - 12 * direction, y - 7), (tip - 12 * direction, y + 7)], fill=WHITE)
    small(d, (int(W * 0.80), cy - 30), "IEC = PAN", fill=WHITE)
    small(d, (int(W * 0.80), cy + 4), "One per PAN", fill=LABEL)
    small(d, (int(W * 0.80), cy + 38), "Update every year,", fill=LABEL)
    small(d, (int(W * 0.80), cy + 62), "April to June", fill=LABEL)
    return label(im, "One PAN, one IEC", "Import Export Code: apply once, update every year")


if __name__ == "__main__":
    save(trademark(), "trademark-registration-india")
    save(fssai(), "fssai-registration-food-licence")
    save(iec(), "import-export-code-iec")
