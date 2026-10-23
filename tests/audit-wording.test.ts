import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { STRUCTURE_META } from "@/lib/structure-meta";
import { COMPARISON_ROWS } from "@/lib/comparison";
import { CITIES, GUJARAT_DISTRICTS } from "@/lib/cities";
import { getArticle } from "@/lib/blog";

/**
 * Regression tests for the website audit of 24 Oct 2026
 * (docs/website-audit-no-analytics.md). Each guards a finding confirmed on
 * production.
 */

function grep(pattern: string): string[] {
  try {
    return execFileSync("grep", ["-rnE", pattern, "app", "lib", "components", "public/llms.txt"], { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
}

describe("WA-02: a proprietorship's setup time is not Udyam's processing time", () => {
  it("the structure chip does not present Udyam's time as the proprietorship's", () => {
    expect(STRUCTURE_META["proprietorship-registration"].time).not.toMatch(/udyam/i);
  });

  it("the comparison table says a proprietorship has no incorporation step", () => {
    const row = COMPARISON_ROWS.find((r) => r.feature === "Typical setup time");
    expect(row?.proprietorship).toMatch(/^No incorporation/);
  });

  it("no source text uses the old shorthand", () => {
    expect(grep("Udyam often same day|Udyam is usually same-day")).toEqual([]);
  });
});

describe("WA-03: GST timing follows Rule 9, not an unsourced 7 to 15 days", () => {
  it("no source text gives GST registration 7 to 15 working days", () => {
    expect(grep("7 to 15 working days")).toEqual([]);
  });
});

describe("WA-04: the ADT-1 note does not attribute an unsourced position to MCA", () => {
  it("the post-incorporation guide states the rule, not an MCA 'indication'", () => {
    const text = JSON.stringify(getArticle("after-company-incorporation-compliance-checklist")!.body);
    expect(text).not.toMatch(/Ministry of Corporate Affairs has indicated/);
    expect(text).toMatch(/Rule 4\(2\)/);
  });
});

describe("WA-05: the Gujarat page keeps service coverage and city-page coverage apart", () => {
  const withPage = GUJARAT_DISTRICTS.filter((d) => CITIES.some((c) => c.district === d));

  it("not every district has a city page, so the two numbers genuinely differ", () => {
    expect(GUJARAT_DISTRICTS).toHaveLength(33);
    expect(withPage.length).toBeLessThan(GUJARAT_DISTRICTS.length);
  });

  it("the page computes the city-page district count rather than restating 33", () => {
    const src = readFileSync("app/gujarat/page.tsx", "utf8");
    expect(src).toContain("DISTRICTS_WITH_CITY_PAGE");
    expect(src).not.toMatch(/dedicated pages for \{CITY_SLUGS\.length\} of the/);
  });
});
