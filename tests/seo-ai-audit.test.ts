import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import nextConfig from "@/next.config";
import { ARTICLE_SLUGS } from "@/lib/blog";
import { SECONDARY_SERVICES } from "@/lib/secondary-services";
import { SERVICE_OPTION_GROUPS } from "@/components/forms/lead-form";
import { NEEDS } from "@/components/forms/contact-wizard";
import { CITIES, GUJARAT_DISTRICTS } from "@/lib/cities";
import { DISTRICT_REGION, regionSummary } from "@/lib/gujarat-regions";

/**
 * Regression tests for the fixes made in the SEO / AI search audit of
 * 23 Oct 2026 (docs/seo-ai-audit-report.md). Each block names the issue ID in
 * docs/seo-ai-issue-tracker.md that it guards.
 *
 * The fixes that only a browser can confirm -- the homepage overflow at
 * 768-870px, the <dl> structure, the /compare/ heading text -- are checked
 * against the built pages and recorded in docs/seo-ai-validation-evidence.md.
 */

function grep(pattern: string, paths: string[]): string[] {
  try {
    return execFileSync("grep", ["-rniE", pattern, ...paths], { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
  } catch {
    return []; // grep exits 1 when nothing matches
  }
}

describe("SAI-07: report-only CSP carries no directive browsers ignore", () => {
  it("has no upgrade-insecure-requests while the policy is report-only", async () => {
    const rules = await nextConfig.headers!();
    const headers = rules.flatMap((rule) => rule.headers);
    const reportOnly = headers.find((h) => h.key === "Content-Security-Policy-Report-Only");
    expect(reportOnly).toBeDefined();
    expect(reportOnly!.value).not.toContain("upgrade-insecure-requests");
  });
});

describe("SAI-09: llms.txt matches the site", () => {
  const llms = readFileSync("public/llms.txt", "utf8");
  const paths = [...llms.matchAll(/https:\/\/www\.raulji\.com(\/[^\s)]*)/g)].map((m) => m[1]);

  it("links no URL that redirects", async () => {
    const redirects = await nextConfig.redirects!();
    const sources = redirects.map((r) => r.source.replace(/\/$/, ""));
    const stale = paths.filter((p) => sources.includes(p.replace(/\/$/, "")));
    expect(stale).toEqual([]);
  });

  it("links only blog posts that exist", () => {
    const blog = paths
      .map((p) => p.match(/^\/blog\/([^/]+)\/$/)?.[1])
      .filter((slug): slug is string => Boolean(slug));
    expect(blog.filter((slug) => !ARTICLE_SLUGS.includes(slug))).toEqual([]);
  });

  it("lists every published blog post", () => {
    const missing = ARTICLE_SLUGS.filter((slug) => !llms.includes(`/blog/${slug}/`));
    expect(missing).toEqual([]);
  });
});

describe("SAI-05: enquiry forms offer every rule-23 option", () => {
  const leadOptions = SERVICE_OPTION_GROUPS.flatMap((g) => g.options);

  it("the enquiry form offers Insurance", () => {
    expect(leadOptions).toContain("Insurance");
  });

  it("the contact wizard sends the same Insurance value", () => {
    expect(NEEDS.map((n) => n.value)).toContain("Insurance");
  });

  it("every secondary page preselects an option the form actually has", () => {
    for (const service of SECONDARY_SERVICES) {
      if (service.formOption) expect(leadOptions).toContain(service.formOption);
    }
    expect(SECONDARY_SERVICES.find((s) => s.slug === "insurance")?.formOption).toBe("Insurance");
  });
});

describe("SAI-08: text colours meet WCAG AA on the site's light backgrounds", () => {
  it("does not use #1a7cb0, which measured 4.15-4.29:1 on #e8f5fb and #f4f7fa", () => {
    expect(grep("#1a7cb0", ["app", "components"])).toEqual([]);
  });

  it("uses #9aa7b5 (2.45:1 on white) for text only where it is hidden as decoration", () => {
    const visible = grep("text-\\[#9aa7b5\\]", ["app", "components"]).filter(
      (line) => !line.includes('aria-hidden="true"'),
    );
    expect(visible).toEqual([]);
  });
});

describe("SAI-11: the post-build validator checks the build it follows", () => {
  it("reads NEXT_DIST_DIR rather than a hard-coded .next", () => {
    const run = spawnSync(process.execPath, ["scripts/seo-validate.mjs"], {
      encoding: "utf8",
      env: { ...process.env, NEXT_DIST_DIR: ".next-does-not-exist" },
    });
    expect(run.status).toBe(1);
    expect(run.stderr).toContain(".next-does-not-exist/server/app");
  });
});

describe("SAI-26: the Gujarat region cards break down the districts headline", () => {
  const summary = regionSummary(GUJARAT_DISTRICTS, CITIES.map((c) => c.district));

  it("maps every Gujarat district, and only those, to a region", () => {
    expect(Object.keys(DISTRICT_REGION).sort()).toEqual([...GUJARAT_DISTRICTS].sort());
  });

  it("places every city page in a known district", () => {
    expect(CITIES.filter((c) => !GUJARAT_DISTRICTS.includes(c.district)).map((c) => c.slug)).toEqual([]);
  });

  it("counts districts, so the cards add up to the headline", () => {
    expect(summary.reduce((n, r) => n + r.districts, 0)).toBe(GUJARAT_DISTRICTS.length);
    // Kutch is one district with two city pages (Bhuj, Gandhidham); the old
    // cards showed it as 2.
    expect(summary.find((r) => r.region === "Kutch")).toMatchObject({ districts: 1, cityPages: 2 });
  });

  it("still carries the city-page count the finder shows on click", () => {
    expect(summary.reduce((n, r) => n + r.cityPages, 0)).toBe(CITIES.length);
  });
});
