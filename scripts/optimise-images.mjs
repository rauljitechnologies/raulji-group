#!/usr/bin/env node
/**
 * Re-exports the source images in public/ to sane dimensions and weights
 * (technical audit TF-08).
 *
 * The problem the audit found was twofold. The source files are far larger
 * than any layout needs: the 18 blog hero images are 1,672 x 941 WebP encoded
 * at near-lossless quality, about 1.9 MB each, and 33 photographs are over
 * 200 KB. On top of that every image was being fetched at w=3840, so a phone
 * downloaded the largest rendition of an already oversized file. The w=3840
 * half is fixed in next.config (deviceSizes); this script fixes the sources.
 *
 * Targets, from the audit:
 *   blog heroes      1,600 px wide, under 150 KB
 *   everything else  at most 1,920 px wide, under 200 KB
 *
 * The script walks the quality down until a file is inside its budget rather
 * than guessing one number for every image, because the blog heroes are flat
 * line art (which compresses to a fraction of the budget) and the city
 * photographs are detailed (which does not). It never upscales, and it is
 * idempotent: a file already inside budget at the right width is left alone,
 * so it is safe to re-run after adding an image.
 *
 * Run:  node scripts/optimise-images.mjs [--dry]
 */

import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DRY = process.argv.includes("--dry");

const KB = 1024;

/** Budgets by location. The first matching prefix wins. */
const BUDGETS = [
  { prefix: "public/blog/", maxWidth: 1600, maxBytes: 150 * KB },
  { prefix: "public/", maxWidth: 1920, maxBytes: 200 * KB },
];

const EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg"]);

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) yield full;
  }
}

function budgetFor(rel) {
  return BUDGETS.find((b) => rel.startsWith(b.prefix));
}

/**
 * Encode to WebP, stepping the quality down until the result fits the budget.
 * Returns the buffer and the quality that produced it, or null if even the
 * lowest quality we are willing to ship cannot fit (reported, not forced).
 */
async function encode(input, width, maxBytes) {
  // Quality first, because dropping pixels is more visible than dropping
  // quality. Only when a detailed photograph still will not fit at the lowest
  // quality we are willing to ship does the width step down; 1,280 is still
  // wider than any slot this site renders an image into.
  for (const w of [width, Math.round(width * 0.9), Math.round(width * 0.8)]) {
    for (const quality of [82, 76, 70, 64, 58, 52]) {
      const buffer = await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toBuffer();
      if (buffer.byteLength <= maxBytes) return { buffer, quality, width: w };
    }
  }
  return null;
}

const results = { skipped: 0, rewritten: [], failed: [], saved: 0 };

for (const file of walk(join(ROOT, "public"))) {
  const rel = relative(ROOT, file).split("\\").join("/");
  const budget = budgetFor(rel);
  if (!budget) continue;

  const before = statSync(file).size;
  const meta = await sharp(file).metadata();
  const overWide = (meta.width ?? 0) > budget.maxWidth;
  const overWeight = before > budget.maxBytes;
  if (!overWide && !overWeight) {
    results.skipped += 1;
    continue;
  }

  const targetWidth = Math.min(meta.width ?? budget.maxWidth, budget.maxWidth);
  const encoded = await encode(file, targetWidth, budget.maxBytes);
  if (!encoded) {
    results.failed.push({ rel, before, width: meta.width });
    continue;
  }

  // A .png or .jpg source is re-encoded in place as WebP under the same stem;
  // the caller is responsible for updating the import. Reported either way.
  const ext = extname(rel).toLowerCase();
  const out = ext === ".webp" ? file : file.slice(0, -ext.length) + ".webp";

  if (!DRY) writeFileSync(out, encoded.buffer);
  results.rewritten.push({
    rel,
    out: relative(ROOT, out).split("\\").join("/"),
    before,
    after: encoded.buffer.byteLength,
    width: `${meta.width} -> ${encoded.width}`,
    quality: encoded.quality,
  });
  results.saved += before - encoded.buffer.byteLength;
}

for (const r of results.rewritten) {
  const note = r.rel === r.out ? "" : `  (was ${extname(r.rel)})`;
  console.log(
    `${(r.before / KB).toFixed(0).padStart(6)} KB -> ${(r.after / KB).toFixed(0).padStart(4)} KB  q${r.quality}  ${r.width.padEnd(14)} ${r.out}${note}`,
  );
}
for (const f of results.failed) {
  console.warn(`could not fit budget: ${f.rel} (${(f.before / KB).toFixed(0)} KB, ${f.width} px)`);
}
console.log(
  `\n${results.rewritten.length} re-exported, ${results.skipped} already inside budget, ${results.failed.length} over budget. Saved ${(results.saved / KB / KB).toFixed(1)} MB.${DRY ? " (dry run)" : ""}`,
);
