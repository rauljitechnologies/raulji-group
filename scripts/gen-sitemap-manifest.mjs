#!/usr/bin/env node
/**
 * Builds lib/generated/sitemap-manifest.json, which app/sitemap.ts reads.
 *
 * Two jobs:
 *
 *  1. Route discovery. Every app/**\/page.tsx with only static segments is a
 *     URL, so a new page is in the sitemap the moment it exists, with no list
 *     to update. Dynamic routes ([city], [slug]) are left to sitemap.ts, which
 *     expands them from the data that generates them. A page whose metadata
 *     sets `noindex: true` is left out, because a sitemap should only list
 *     pages that want to be indexed.
 *
 *  2. Real modification dates. Each URL's date is the last commit that touched
 *     the files its content comes from: the page itself plus the data modules
 *     it imports from lib/. Shared helpers (seo, schema, utils and so on) are
 *     ignored, or one change to a helper would mark every page as modified.
 *
 * Why a generated file rather than reading git inside sitemap.ts: the sitemap
 * also revalidates at runtime, where neither the source files nor git exist.
 *
 * Shallow clones. Vercel builds from a shallow clone, where every file older
 * than the clone depth appears to have been changed by the oldest commit it
 * has. Dates from such a boundary commit are not trusted; the date already in
 * the committed manifest is kept instead. That is why the manifest is
 * committed, and why every local `npm run build` refreshes it.
 *
 * Run:  node scripts/gen-sitemap-manifest.mjs   (runs automatically as prebuild)
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "lib/generated/sitemap-manifest.json");

/** lib/ modules that are plumbing, not page content. */
const HELPERS = new Set([
  "lib/utils.ts",
  "lib/seo.ts",
  "lib/schema.ts",
  "lib/typography.ts",
  "lib/analytics.ts",
  "lib/site.ts",
  "lib/image-sizes.ts",
  "lib/nav.ts",
]);

/** Data files behind the dynamic routes sitemap.ts expands. */
const DATA_FILES = [
  "lib/services.ts",
  "lib/secondary-services.ts",
  "lib/cities.ts",
  "lib/city-services.ts",
];

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { routes: [], files: {}, articles: {} };
const previousRoute = new Map(previous.routes.map((r) => [r.path, r.lastModified]));
const now = new Date().toISOString();

// --- git ------------------------------------------------------------------

function git(...args) {
  try {
    return execFileSync("git", ["-c", `safe.directory=${ROOT.replace(/\/$/, "")}`, ...args], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

const hasGit = git("rev-parse", "--is-inside-work-tree") === "true";
const shallowFile = hasGit ? git("rev-parse", "--git-path", "shallow") : null;
const boundary = new Set(
  shallowFile && existsSync(join(ROOT, shallowFile))
    ? readFileSync(join(ROOT, shallowFile), "utf8").split(/\s+/).filter(Boolean)
    : [],
);

/**
 * The last change to any of `files`, or `fallback` when git cannot say.
 * Uncommitted edits count as changed now, so a local build reflects them.
 */
function lastModified(files, fallback) {
  if (!hasGit) return fallback ?? now;
  if (git("status", "--porcelain", "--", ...files)) return now;
  const line = git("log", "-1", "--format=%H %cI", "--", ...files);
  if (!line) return fallback ?? now;
  const [hash, date] = line.split(" ");
  if (boundary.has(hash)) return fallback ?? date;
  return new Date(date).toISOString();
}

// --- routes ---------------------------------------------------------------

function pages(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      // Dynamic segments are expanded from data in sitemap.ts; api and og are
      // not pages; _private folders are not routable.
      if (entry.startsWith("[") || entry.startsWith("_") || entry === "api" || entry === "og") continue;
      out.push(...pages(full));
    } else if (entry === "page.tsx" || entry === "page.ts" || entry === "page.jsx" || entry === "page.js") {
      out.push(full);
    }
  }
  return out;
}

/** app/(group)/about/page.tsx → /about/ */
function toPath(file) {
  const segments = relative(join(ROOT, "app"), file)
    .split(sep)
    .slice(0, -1)
    .filter((s) => !(s.startsWith("(") && s.endsWith(")")));
  return segments.length ? `/${segments.join("/")}/` : "/";
}

/** The page file plus the lib/ data modules it imports directly. */
function contentFiles(file) {
  const src = readFileSync(file, "utf8");
  const deps = [relative(ROOT, file)];
  for (const m of src.matchAll(/from\s+"@\/(lib\/[^"]+)"/g)) {
    for (const ext of [".ts", ".tsx", "/index.ts"]) {
      const candidate = `${m[1]}${ext}`;
      if (existsSync(join(ROOT, candidate))) {
        if (!HELPERS.has(candidate)) deps.push(candidate);
        break;
      }
    }
  }
  return deps;
}

const routes = pages(join(ROOT, "app"))
  .filter((file) => !/noindex:\s*true/.test(readFileSync(file, "utf8")))
  .map((file) => {
    const path = toPath(file);
    return { path, lastModified: lastModified(contentFiles(file), previousRoute.get(path)) };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

// --- data files and articles ----------------------------------------------

const files = Object.fromEntries(
  DATA_FILES.map((f) => [f, lastModified([f], previous.files?.[f])]),
);

const articleDir = join(ROOT, "lib/blog/articles");
const articles = Object.fromEntries(
  readdirSync(articleDir)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => {
      const src = readFileSync(join(articleDir, f), "utf8");
      const slug = src.match(/\n\s*slug:\s*"([^"]+)"/)?.[1];
      return slug ? [slug, lastModified([`lib/blog/articles/${f}`], previous.articles?.[slug])] : null;
    })
    .filter(Boolean),
);

// Only rewrite when something changed, so a build does not leave a diff behind.
const next = { routes, files, articles };
const strip = (m) => JSON.stringify({ routes: m.routes, files: m.files, articles: m.articles });
if (strip(next) !== strip(previous)) {
  mkdirSync(join(ROOT, "lib/generated"), { recursive: true });
  writeFileSync(OUT, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`sitemap manifest: ${routes.length} pages, ${Object.keys(articles).length} articles (updated)`);
} else {
  console.log(`sitemap manifest: ${routes.length} pages, ${Object.keys(articles).length} articles (unchanged)`);
}
