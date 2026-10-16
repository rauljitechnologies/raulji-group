#!/usr/bin/env node
/**
 * Submits changed URLs to IndexNow after a deploy (technical audit TF-06).
 *
 * What counts as changed: the sitemap manifest records the last modification
 * date of every URL's content files, so this compares those dates against the
 * last successful submission recorded in .indexnow-state.json and submits only
 * what moved. Submitting the whole site on every deploy is what gets a host
 * rate limited, and it tells the engines nothing.
 *
 * Nothing is submitted unless --yes is passed: this posts the site's URLs to a
 * third-party service, so it must be a deliberate step in the deploy, never a
 * side effect of running a script locally. Without --yes it prints what it
 * would send and exits 0.
 *
 * Run:  node scripts/indexnow-ping.mjs            (dry run, prints the list)
 *       node scripts/indexnow-ping.mjs --yes      (submits)
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const STATE = join(ROOT, ".indexnow-state.json");
const SUBMIT = process.argv.includes("--yes");

const HOST = "www.raulji.com";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

/** Read the key the same way lib/indexnow.ts does, without importing TS. */
function readKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY;
  const src = readFileSync(join(ROOT, "lib/indexnow.ts"), "utf8");
  const match = src.match(/INDEXNOW_KEY = process\.env\.INDEXNOW_KEY \?\? "([0-9a-f]+)"/);
  if (!match) throw new Error("could not read INDEXNOW_KEY from lib/indexnow.ts");
  return match[1];
}

const manifest = JSON.parse(readFileSync(join(ROOT, "lib/generated/sitemap-manifest.json"), "utf8"));
const previous = existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : { submitted: {} };

/*
 * Only routes and articles carry per-URL dates in the manifest. The
 * data-driven location and service URLs share their data file's date, so they
 * are submitted when that file changes, which is the right granularity: a
 * change to lib/cities.ts does change all 33 city pages.
 */
const dates = new Map();
for (const route of manifest.routes) dates.set(`https://${HOST}${route.path}`, route.lastModified);
for (const [slug, date] of Object.entries(manifest.articles ?? {})) {
  dates.set(`https://${HOST}/blog/${slug}/`, date);
}

const changed = [...dates.entries()].filter(([url, date]) => previous.submitted[url] !== date);

if (!changed.length) {
  console.log("IndexNow: nothing changed since the last submission.");
  process.exit(0);
}

console.log(`IndexNow: ${changed.length} changed URL(s)`);
for (const [url] of changed) console.log(`  ${url}`);

if (!SUBMIT) {
  console.log("\nDry run. Re-run with --yes to submit.");
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: readKey(),
    keyLocation: `https://${HOST}/${readKey()}.txt`,
    urlList: changed.map(([url]) => url),
  }),
});

console.log(`IndexNow responded ${response.status} ${response.statusText}`);
if (response.status !== 200 && response.status !== 202) {
  console.error(await response.text());
  process.exit(1);
}

const submitted = { ...previous.submitted };
for (const [url, date] of changed) submitted[url] = date;
writeFileSync(STATE, `${JSON.stringify({ submitted, at: new Date().toISOString() }, null, 2)}\n`);
console.log(`Recorded ${changed.length} submission(s) in .indexnow-state.json`);
