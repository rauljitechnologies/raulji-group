#!/usr/bin/env node
/**
 * Content QA for the 2026 Business Guide Series.
 *
 * The brief attaches hard rules to this content: no em dash characters, no
 * banned marketing phrasing, no absolute claims in the insurance article, a
 * minimum FAQ count, unique metadata, a word count band, and internal links
 * that actually resolve. Those are exactly the things that a human reviewer
 * stops catching by the fourth article, so they are checked here instead.
 *
 * It reads the article sources as text rather than importing them, because
 * every piece of content in them is a string literal and text is enough. That
 * keeps the check free of the path aliases and next/image imports that would
 * otherwise need a bundler to run one assertion.
 *
 * Run:  node scripts/check-blog.mjs
 * Exit: 0 clean, 1 if anything failed.
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const ARTICLE_DIR = join(ROOT, "lib/blog/articles");

const errors = [];
const warnings = [];

const fail = (file, message) => errors.push(`${file}: ${message}`);
const warn = (file, message) => warnings.push(`${file}: ${message}`);

/** Phrases the brief names, plus the tells that go with them. */
const BANNED_PHRASES = [
  "in today's fast-paced world",
  "in today's rapidly evolving",
  "unlock your potential",
  "unlock your full potential",
  "empowering businesses",
  "seamless solution",
  "take your business to the next level",
  "your success is our success",
  "whether you're a startup or established enterprise",
  "in the ever-changing",
  "game-changer",
  "one-stop shop",
  "look no further",
];

/** Claims that must never appear anywhere, insurance or otherwise. */
const BANNED_CLAIMS = [
  "no. 1",
  "no.1",
  "number one provider",
  "best health insurance",
  "lowest premium",
  "guaranteed claim",
  "100% claim settlement",
  "no claim rejection",
  "guaranteed coverage",
  "100% success",
  "fastest in india",
  "most trusted",
];

/** Every internal path the site actually serves. */
function knownPaths() {
  const paths = new Set(["/"]);

  // Static app routes: any app/<dir>/page.tsx, one level and two levels deep.
  const appDir = join(ROOT, "app");
  for (const entry of readdirSync(appDir)) {
    const dir = join(appDir, entry);
    if (!statSync(dir).isDirectory()) continue;
    if (entry.startsWith("[") || entry === "api" || entry === "og") continue;
    if (existsSync(join(dir, "page.tsx"))) paths.add(`/${entry}/`);
    for (const sub of readdirSync(dir)) {
      const subdir = join(dir, sub);
      if (!statSync(subdir).isDirectory() || sub.startsWith("[")) continue;
      if (existsSync(join(subdir, "page.tsx"))) paths.add(`/${entry}/${sub}/`);
    }
  }

  // Data-driven routes, read from the same files the app reads.
  const collect = (file, re) => {
    const src = readFileSync(join(ROOT, file), "utf8");
    for (const m of src.matchAll(re)) paths.add(m[1]);
  };
  collect("lib/services.ts", /path:\s*"(\/[^"]+)"/g);
  collect("lib/secondary-services.ts", /path:\s*"(\/[^"]+)"/g);

  const cities = readFileSync(join(ROOT, "lib/cities.ts"), "utf8");
  for (const m of cities.matchAll(/slug:\s*"([a-z-]+)"/g)) paths.add(`/${m[1]}/`);

  return paths;
}

/** Extract every string literal, which is where all article content lives. */
function literals(src) {
  const out = [];
  for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) out.push(m[1]);
  return out;
}

const files = readdirSync(ARTICLE_DIR)
  .filter((f) => f.endsWith(".ts"))
  .sort();

if (files.length !== 9) {
  errors.push(`lib/blog/articles: expected 9 articles, found ${files.length}`);
}

const paths = knownPaths();
const seenTitles = new Map();
const seenDescriptions = new Map();
const seenSlugs = new Map();
const slugsInSeries = new Set();

// First pass: collect slugs so cross-article links can be validated.
for (const file of files) {
  const src = readFileSync(join(ARTICLE_DIR, file), "utf8");
  const slug = src.match(/\n\s*slug:\s*"([^"]+)"/)?.[1];
  if (slug) slugsInSeries.add(slug);
}
for (const slug of slugsInSeries) paths.add(`/blog/${slug}/`);

for (const file of files) {
  const src = readFileSync(join(ARTICLE_DIR, file), "utf8");
  const text = literals(src).join(" ");
  const lower = text.toLowerCase();

  // --- House rules -------------------------------------------------------
  if (src.includes("\u2014")) {
    const line = src.split("\n").findIndex((l) => l.includes("\u2014")) + 1;
    fail(file, `em dash character found on line ${line}. The brief forbids it.`);
  }
  if (/&mdash;/i.test(src)) fail(file, "&mdash; entity found. The brief forbids em dashes.");

  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) fail(file, `banned phrase: "${phrase}"`);
  }
  for (const claim of BANNED_CLAIMS) {
    if (lower.includes(claim)) fail(file, `banned claim: "${claim}"`);
  }

  // --- Metadata ----------------------------------------------------------
  const slug = src.match(/\n\s*slug:\s*"([^"]+)"/)?.[1];
  const metaTitle = src.match(/metaTitle:\s*\n?\s*"([^"]+)"/)?.[1];
  const metaDescription = src.match(/metaDescription:\s*\n?\s*"([^"]+)"/)?.[1];

  if (!slug) fail(file, "no slug");
  if (!metaTitle) fail(file, "no metaTitle");
  if (!metaDescription) fail(file, "no metaDescription");

  for (const [value, map, label] of [
    [slug, seenSlugs, "slug"],
    [metaTitle, seenTitles, "metaTitle"],
    [metaDescription, seenDescriptions, "metaDescription"],
  ]) {
    if (!value) continue;
    if (map.has(value)) fail(file, `duplicate ${label}, also in ${map.get(value)}`);
    else map.set(value, file);
  }

  if (metaTitle && metaTitle.length > 70) {
    warn(file, `metaTitle is ${metaTitle.length} chars, likely truncated in results`);
  }
  if (metaDescription) {
    if (metaDescription.length < 70) warn(file, `metaDescription is only ${metaDescription.length} chars`);
    if (metaDescription.length > 170) {
      warn(file, `metaDescription is ${metaDescription.length} chars, likely truncated`);
    }
  }

  // --- Structure ---------------------------------------------------------
  const faqCount = (src.match(/\n\s{6}q:\s*"/g) ?? []).length;
  if (faqCount < 5) fail(file, `only ${faqCount} FAQs, the brief asks for at least 5`);

  const h2Ids = [...src.matchAll(/kind:\s*"h2",\s*id:\s*"([^"]+)"/g)].map((m) => m[1]);
  const dupeIds = h2Ids.filter((id, i) => h2Ids.indexOf(id) !== i);
  if (dupeIds.length) fail(file, `duplicate heading ids: ${[...new Set(dupeIds)].join(", ")}`);
  if (h2Ids.length < 5) warn(file, `only ${h2Ids.length} H2 sections`);

  if (!/sources:\s*\[\s*\{/.test(src)) fail(file, "no sources listed");
  if (!/disclaimer:/.test(src)) warn(file, "no disclaimer");

  // --- Word count --------------------------------------------------------
  /* Only the prose a reader actually reads: the key takeaway, the body and
     the FAQ answers. Metadata, keywords, source descriptions and the service
     blurbs are not article length and counting them inflates every figure by
     several hundred words. */
  const prose = src.slice(
    src.indexOf("keyTakeaway:"),
    src.indexOf("\n  related:") === -1 ? src.length : src.indexOf("\n  related:"),
  );
  const words = literals(prose).join(" ").split(/\s+/).filter(Boolean).length;
  const isInsurance = slug === "health-insurance-policy-guide-india";
  const [min, max] = isInsurance ? [1800, 2300] : [1500, 2500];
  if (words < min) fail(file, `${words} words, below the ${min} target`);
  else if (words > max) warn(file, `${words} words, above the ${max} target`);

  // --- Internal links ----------------------------------------------------
  const internal = new Set();
  for (const m of src.matchAll(/\]\((\/[^)\s]*)\)/g)) internal.add(m[1]);
  for (const m of src.matchAll(/href:\s*"(\/[^"]*)"/g)) internal.add(m[1]);
  for (const href of internal) {
    if (!href.endsWith("/")) fail(file, `internal link without trailing slash: ${href}`);
    else if (!paths.has(href)) fail(file, `internal link to a path that does not exist: ${href}`);
  }

  // --- Related cluster ---------------------------------------------------
  const relatedBlock = src.match(/\n\s*related:\s*\[([\s\S]*?)\]/)?.[1] ?? "";
  const related = [...relatedBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  for (const target of related) {
    if (!slugsInSeries.has(target)) fail(file, `related slug does not exist: ${target}`);
    if (target === slug) fail(file, "article lists itself as related");
  }
  if (slug !== "health-insurance-policy-guide-india" && related.length < 2) {
    fail(file, `only ${related.length} related articles, the cluster expects at least 2`);
  }

  // --- Publication date --------------------------------------------------
  const published = src.match(/published:\s*"([^"]+)"/)?.[1];
  if (published && new Date(published) > new Date()) {
    fail(file, `published date is in the future: ${published}`);
  }

  // --- Featured image ----------------------------------------------------
  const imageKey = src.match(/\n\s*image:\s*"([^"]+)"/)?.[1];
  const imagesSrc = readFileSync(join(ROOT, "lib/blog/images.ts"), "utf8");
  if (imageKey && !imagesSrc.includes(`"${imageKey}"`) && !imagesSrc.includes(`\n  ${imageKey}:`)) {
    fail(file, `featured image key not registered in lib/blog/images.ts: ${imageKey}`);
  }
}

// Every image registered must exist on disk at 16:9.
const imagesSrc = readFileSync(join(ROOT, "lib/blog/images.ts"), "utf8");
for (const m of imagesSrc.matchAll(/from "@\/public(\/blog\/[^"]+)"/g)) {
  const file = join(ROOT, "public", m[1]);
  if (!existsSync(file)) errors.push(`lib/blog/images.ts: missing image file public${m[1]}`);
}

for (const message of warnings) console.log(`warn  ${message}`);
for (const message of errors) console.log(`FAIL  ${message}`);

console.log(
  `\n${files.length} articles checked. ${errors.length} error${errors.length === 1 ? "" : "s"}, ${warnings.length} warning${warnings.length === 1 ? "" : "s"}.`,
);

process.exit(errors.length ? 1 : 0);
