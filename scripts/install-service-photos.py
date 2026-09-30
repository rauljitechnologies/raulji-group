#!/usr/bin/env python3
"""
Install service-page photographs from a folder of raw images.

    python3 scripts/install-service-photos.py <incoming-folder>
    python3 scripts/install-service-photos.py --status

Each raw image must be named after its slot's filename in
lib/service-photos.ts, with any extension: e.g.
`llp-partners-business-agreement.png` or `.jpg` for
`llp-partners-business-agreement.webp`. Anything else is reported and skipped.

For every match it centre-crops to the slot's shape (16:9 for heroes, 4:3 for
everything else), resizes to 1600 px wide, and writes WebP into
public/photos/services/, lowering quality until the file is under 250 KB
(docs/SERVICE-IMAGE-BRIEF.md). Next.js generates the AVIF and smaller WebP
variants from that one file at request time.

It never deletes anything, and it will not upscale an image smaller than the
target: those are reported so a larger original can be supplied.
"""

import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "lib" / "service-photos.ts"
OUT = ROOT / "public" / "photos" / "services"
MAX_BYTES = 250 * 1024
WIDTH = 1600


def slots():
    """(page, slot, filename) for every photograph in the manifest."""
    text = MANIFEST.read_text()
    found = []
    for page_match in re.finditer(r'\n  "([a-z-]+)": \{\n    fallback:(.*?)\n  \},', text, re.S):
        page, body = page_match.groups()
        for m in re.finditer(r'\n      (\w+): \{\n        file: "([^"]+)"', body):
            found.append((page, m.group(1), m.group(2)))
    return found


def status():
    rows = slots()
    have = 0
    for page, slot, name in rows:
        path = OUT / name
        if path.exists():
            have += 1
            with Image.open(path) as im:
                size = f"{im.width}x{im.height}, {path.stat().st_size // 1024} KB"
            print(f"  ok       {page:30} {slot:15} {name} ({size})")
        else:
            print(f"  missing  {page:30} {slot:15} {name}")
    print(f"\n{have} of {len(rows)} photographs installed.")


def install(folder: Path):
    wanted = {Path(name).stem: (slot, name) for _, slot, name in slots()}
    OUT.mkdir(parents=True, exist_ok=True)
    for src in sorted(folder.iterdir()):
        if not src.is_file() or src.name.startswith("."):
            continue
        match = wanted.get(src.stem)
        if not match:
            print(f"  skip     {src.name}: no slot with this name")
            continue
        slot, name = match
        ratio = (16, 9) if slot == "hero" else (4, 3)
        height = WIDTH * ratio[1] // ratio[0]
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            # Largest box of the slot's shape that the source can fill, capped
            # at the target size, so a small original is cropped but never
            # upscaled.
            w = min(WIDTH, im.width, im.height * ratio[0] // ratio[1])
            h = w * ratio[1] // ratio[0]
            if w < WIDTH:
                print(f"  warn     {src.name}: {im.width}x{im.height} is below {WIDTH}x{height}, installed at {w}x{h}")
            fitted = ImageOps.fit(im, (w, h), Image.LANCZOS)
            dest = OUT / name
            for quality in (82, 76, 70, 64, 58, 52):
                fitted.save(dest, "WEBP", quality=quality, method=6)
                if dest.stat().st_size <= MAX_BYTES:
                    break
            size = dest.stat().st_size
            flag = "ok      " if size <= MAX_BYTES else "warn    "
            note = "" if size <= MAX_BYTES else ", still over 250 KB at the lowest quality"
            print(f"  {flag} {src.name} -> {name} ({fitted.width}x{fitted.height}, q{quality}, {size // 1024} KB{note})")
    print()
    status()


if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == "--status":
        status()
    elif len(sys.argv) == 2:
        install(Path(sys.argv[1]))
    else:
        print(__doc__)
        sys.exit(1)
