#!/usr/bin/env node
/**
 * Build-time guard: no city or town slug may collide with a static top-level
 * route (technical audit TF-01, implementation prompt Step 1).
 *
 * /{city}/ is a root-level dynamic segment, so a city slug of "services" or
 * "glossary" would be shadowed by the static folder of the same name. The page
 * would silently disappear: no 404, no build error, just a URL serving the
 * wrong thing. The reserved list is read from app/ rather than hard-coded, so a
 * folder added later is covered without anyone remembering to update it.
 *
 * Also checks the city x service segments against the same list, since those
 * sit one level down under the same dynamic route.
 *
 * Run:  node scripts/check-reserved-slugs.mjs   (runs automatically as prebuild)
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Top-level folders in app/ that own a real URL segment. */
function reservedSegments() {
  return readdirSync(join(ROOT, "app"), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    // [city] and [service] are the dynamic segments themselves; _folders and
    // route groups are not routable; api and og are not pages but they do own
    // their path, so they stay in the list.
    .filter((n) => !n.startsWith("[") && !n.startsWith("_") && !n.startsWith("("));
}

/** Slugs from a data file, read as text so this stays a plain Node script. */
function slugsFrom(file, pattern) {
  const src = readFileSync(join(ROOT, file), "utf8");
  return [...src.matchAll(pattern)].map((m) => m[1]);
}

const reserved = new Set([
  ...reservedSegments(),
  // Reserved ahead of the routes being built, so a city can never claim them.
  "compliance",
  "tools",
  "glossary",
  "industries",
  "gu",
]);

const citySlugs = slugsFrom("lib/city-index.ts", /\{\s*slug:\s*"([^"]+)"/g);
const serviceSegments = slugsFrom("lib/city-services.ts", /^\s*"[a-z-]+":\s*"([a-z-]+)",$/gm);

const errors = [];

for (const slug of citySlugs) {
  if (reserved.has(slug)) {
    errors.push(`city slug "${slug}" collides with the static route /${slug}/`);
  }
}
for (const segment of serviceSegments) {
  if (reserved.has(segment)) {
    errors.push(`city x service segment "${segment}" collides with the static route /${segment}/`);
  }
}

const duplicates = citySlugs.filter((s, i) => citySlugs.indexOf(s) !== i);
for (const slug of new Set(duplicates)) {
  errors.push(`city slug "${slug}" appears more than once in lib/city-index.ts`);
}

if (errors.length) {
  console.error("reserved-slug check failed:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `reserved-slug check: ${citySlugs.length} city slugs and ${serviceSegments.length} service segments clear of ${reserved.size} reserved segments`,
);
