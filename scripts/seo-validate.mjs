#!/usr/bin/env node
/**
 * Post-build SEO validation (implementation prompt Step 11, technical audit
 * "ongoing monitoring"). Runs against the built output in .next and exits
 * non-zero on any failure, so CI can block a deploy.
 *
 * It reads the prerendered HTML rather than crawling a running server, so it
 * needs no network and catches a regression before anything is deployed.
 * Checks that genuinely need a live host (HTTP status codes, redirect hops,
 * HTTP/2, Lighthouse, Search Console) are out of scope here and listed in the
 * audit's manual checklist instead.
 *
 * Wired as `postbuild`, so a failing check fails the build and blocks the
 * deploy, which is what the audit asks for. Set SEO_VALIDATE=off to downgrade
 * every failure to a warning: an escape hatch for an urgent deploy that does
 * not need a code change, and one that is visible in the build log.
 *
 * Run:  node scripts/seo-validate.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
/*
 * The same dist directory next.config.ts builds into. This was hard-coded to
 * .next, so a build run with NEXT_DIST_DIR set was followed by a validation of
 * whatever stale output happened to be in .next -- a pass that said nothing
 * about the build just made (audit of 23 Oct 2026).
 */
const DIST = process.env.NEXT_DIST_DIR ?? ".next";
const APP = join(ROOT, DIST, "server/app");
const SITE = "https://www.raulji.com";
const KB = 1024;

if (!existsSync(APP)) {
  console.error(`seo-validate: no build found at ${DIST}/server/app. Run \`npm run build\` first.`);
  process.exit(1);
}

/*
 * Reviewed exceptions. Each one is a decision someone made on the record, not
 * a check being quietly loosened, so each carries its reason and the rule it
 * is an exception to. A page not on this list has to pass.
 */
const EXCEPTIONS = {
  "/_not-found/": {
    title: "The 404 page is not an indexable URL; it has no canonical and needs no keyword.",
    description: "Same: the body text is the useful part, not a SERP snippet.",
    canonical: "A 404 must not claim a canonical.",
    breadcrumb: "No position in the site tree to describe.",
  },
  "/privacy/": {
    title: 'Legal page. "Privacy Policy | Raulji Group" is the complete, correct name at 29 chars; padding it to reach 30 would be keyword filler. Recorded as acceptable in the metadata sheet of 15 Oct 2026.',
  },
  "/disclaimer/": {
    title: "Legal page, same reason as /privacy/. Recorded as acceptable in the metadata sheet.",
  },
  "/image-credits/": {
    description: "noindex utility page (master rule 20, audit TF-18). The sheet records it as the one description deliberately under 120 chars.",
    breadcrumb: "noindex; kept out of the site tree.",
  },
  /*
   * The homepage exception for a 165-character description is gone: rule 5
   * was changed on 2026-10-18 and the description is now 155 characters, so
   * the page passes the ordinary 120-160 check and should be held to it.
   */
};

const excepted = (path, check) => Boolean(EXCEPTIONS[path]?.[check]);

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

/* ------------------------------------------------------------------ pages */

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

/** .next/server/app/surat/llp-registration.html -> /surat/llp-registration/ */
function pathFor(file) {
  const rel = relative(APP, file).replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel}/`;
}

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const one = (re, html) => {
  const m = html.match(re);
  return m ? decode(m[1]) : undefined;
};

const pages = [];
for (const file of htmlFiles(APP)) {
  const html = readFileSync(file, "utf8");
  pages.push({
    path: pathFor(file),
    html,
    title: one(/<title>(.*?)<\/title>/s, html),
    description: one(/<meta name="description" content="(.*?)"/s, html),
    canonical: one(/<link rel="canonical" href="(.*?)"/s, html),
    robots: one(/<meta name="robots" content="(.*?)"/s, html),
    h1s: [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map((m) =>
      decode(m[1].replace(/<[^>]+>/g, "")).trim(),
    ),
    imgs: [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]),
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]),
  });
}

if (pages.length < 90) fail(`only ${pages.length} prerendered pages found; expected 90+`);

const titles = new Map();
const descriptions = new Map();

for (const p of pages) {
  const noindex = (p.robots ?? "").includes("noindex");

  if (!p.title) fail(`${p.path}: no <title>`);
  else {
    if ((p.title.length < 30 || p.title.length > 60) && !excepted(p.path, "title")) {
      fail(`${p.path}: title is ${p.title.length} chars, outside 30-60 — "${p.title}"`);
    }
    if (!noindex) {
      if (titles.has(p.title)) fail(`${p.path}: duplicate title, shared with ${titles.get(p.title)}`);
      else titles.set(p.title, p.path);
    }
  }

  if (!p.description) fail(`${p.path}: no meta description`);
  else {
    if (
      (p.description.length < 120 || p.description.length > 160) &&
      !excepted(p.path, "description")
    ) {
      fail(`${p.path}: description is ${p.description.length} chars, outside 120-160`);
    }
    if (!noindex) {
      if (descriptions.has(p.description)) {
        fail(`${p.path}: duplicate description, shared with ${descriptions.get(p.description)}`);
      } else descriptions.set(p.description, p.path);
    }
  }

  if (p.h1s.length !== 1) fail(`${p.path}: ${p.h1s.length} <h1> elements, expected exactly 1`);
  else if (p.h1s[0].length > 70) fail(`${p.path}: H1 is ${p.h1s[0].length} chars, over 70`);

  const expected = `${SITE}${p.path}`;
  if (!p.canonical) {
    if (!excepted(p.path, "canonical")) fail(`${p.path}: no canonical`);
  } else if (p.canonical !== expected) {
    fail(`${p.path}: canonical is ${p.canonical}, expected ${expected}`);
  }

  for (const tag of p.imgs) {
    const alt = tag.match(/\balt="([^"]*)"/);
    if (!alt) fail(`${p.path}: <img> with no alt attribute`);
    else if (decode(alt[1]).length > 100) {
      fail(`${p.path}: alt text is ${decode(alt[1]).length} chars, over 100`);
    }
    // A `fill` image is sized by CSS and carries no width/height by design.
    const sized = /\bwidth="/.test(tag) && /\bheight="/.test(tag);
    const filled = /position:absolute/.test(tag) || /object-fit/.test(tag);
    if (!sized && !filled) fail(`${p.path}: <img> with neither dimensions nor fill styling`);
  }

  if (/w=3840/.test(p.html)) fail(`${p.path}: still references w=3840`);

  for (const block of p.jsonLd) {
    try {
      JSON.parse(block);
    } catch {
      fail(`${p.path}: invalid JSON-LD`);
    }
  }
  if (p.path !== "/" && !noindex) {
    const types = p.jsonLd.flatMap((b) => {
      try {
        const parsed = JSON.parse(b);
        const nodes = Array.isArray(parsed) ? parsed : parsed["@graph"] ? parsed["@graph"] : [parsed];
        return nodes.map((n) => n["@type"]).flat();
      } catch {
        return [];
      }
    });
    if (!types.includes("BreadcrumbList") && !excepted(p.path, "breadcrumb")) {
      fail(`${p.path}: no BreadcrumbList JSON-LD`);
    }
  }
}

/* ---------------------------------------------------------------- sitemap */

/*
 * One sitemap at /sitemap.xml, built by app/sitemap.ts (client instruction of
 * 2026-10-24). This used to walk a sitemap index and four children under
 * app/sitemap/; the checks below are the same ones, against the single file.
 * A child sitemap left behind under app/sitemap/ is itself a failure: it would
 * mean generateSitemaps() came back and the index that used to point at the
 * children is gone, so nothing would reference them.
 */
const sitemapBody = join(APP, "sitemap.xml.body");
if (!existsSync(sitemapBody)) fail("no sitemap built at /sitemap.xml");

const staleDir = join(APP, "sitemap");
if (existsSync(staleDir) && readdirSync(staleDir).some((f) => f.endsWith(".xml.body"))) {
  fail("child sitemaps built under /sitemap/ but nothing indexes them");
}

const byPath = new Map(pages.map((p) => [p.path, p]));
let sitemapUrls = 0;

if (existsSync(sitemapBody)) {
  const xml = readFileSync(sitemapBody, "utf8");

  if (!xml.includes("<urlset")) fail("sitemap: not a <urlset> document");
  if (xml.includes("<sitemapindex")) fail("sitemap: still a sitemap index, expected a single urlset");
  if (!xml.includes("<lastmod>")) fail("sitemap: no lastmod dates");

  /*
   * Nothing but sitemap elements, ever.
   *
   * An owner report of 2026-10-24 described a <script id="datalayer-checker-script">
   * inside /sitemap.xml. It was not in the response -- it was a browser
   * extension injecting into Chrome's XML viewer after delivery -- but the
   * half hour spent proving that is reason enough to have the build assert it.
   * Any element outside the allow-list fails here, so a script tag, a stray
   * fragment of HTML or a future <changefreq> creeping back in is a red build
   * rather than something noticed in a browser weeks later.
   */
  const ALLOWED = new Set(["?xml", "urlset", "url", "loc", "lastmod"]);
  const found = new Set(
    [...xml.matchAll(/<\/?([a-zA-Z?!][^\s>/]*)/g)].map((m) => m[1].replace(/^[?!]?/, (c) => c)),
  );
  for (const el of found) {
    if (!ALLOWED.has(el)) fail(`sitemap: unexpected <${el}> element in the XML`);
  }

  // <changefreq> and <priority> were dropped on 2026-10-24: both are optional
  // and Google ignores them. Caught by the allow-list above; named here so a
  // failing build says why rather than just "unexpected".
  for (const dropped of ["changefreq", "priority"]) {
    if (found.has(dropped)) fail(`sitemap: <${dropped}> is no longer emitted; remove it from app/sitemap.ts`);
  }

  const seen = new Set();
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = m[1];
    sitemapUrls += 1;
    if (seen.has(url)) fail(`sitemap: ${url} listed more than once`);
    seen.add(url);
    if (!url.startsWith(SITE)) fail(`sitemap: ${url} is not on ${SITE}`);
    if (!url.endsWith("/")) fail(`sitemap: ${url} has no trailing slash`);
    const path = url.slice(SITE.length);
    const page = byPath.get(path);
    if (!page) {
      // Dynamically rendered pages are not prerendered to HTML; only flag a
      // path that matches no route at all.
      warn(`sitemap: ${path} has no prerendered HTML (dynamic route?)`);
    } else if ((page.robots ?? "").includes("noindex")) {
      fail(`sitemap: ${path} is noindex but listed`);
    }
  }
}

if (sitemapUrls < 90) fail(`sitemap lists ${sitemapUrls} URLs; expected 90+`);

/* ----------------------------------------------------------------- assets */

function* assetFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* assetFiles(full);
    else yield full;
  }
}

const IMAGE_EXT = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif", ".gif"]);
for (const file of assetFiles(join(ROOT, "public"))) {
  if (!IMAGE_EXT.has(extname(file).toLowerCase())) continue;
  const size = statSync(file).size;
  if (size > 200 * KB) {
    fail(`${relative(ROOT, file)} is ${(size / KB).toFixed(0)} KB, over the 200 KB budget`);
  }
}

/* ---------------------------------------------------------------- summary */

console.log(
  `seo-validate: ${pages.length} prerendered pages, ${sitemapUrls} sitemap URLs, ` +
    `${titles.size} unique titles, ${descriptions.size} unique descriptions`,
);
for (const w of warnings) console.warn(`  warn  ${w}`);
if (errors.length) {
  const off = process.env.SEO_VALIDATE === "off";
  console.error(`\n${errors.length} error(s)${off ? " (SEO_VALIDATE=off, not failing the build)" : ""}:`);
  for (const e of errors) console.error(`  - ${e}`);
  if (!off) process.exit(1);
}
console.log(warnings.length ? `\nPassed with ${warnings.length} warning(s).` : "\nPassed.");
