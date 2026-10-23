import { describe, expect, it } from "vitest";
import { ARTICLES, getArticle } from "@/lib/blog";
import { blogImage } from "@/lib/blog/images";

/**
 * Regression tests for the third batch of guides (23 Oct 2026): trademark,
 * FSSAI and Import Export Code. docs/five-blog-validation-report.md has the
 * full record.
 */

const NEW_SLUGS = [
  "trademark-registration-india-guide",
  "fssai-registration-food-licence-india",
  "import-export-code-iec-guide",
];

const strings = (value: unknown): string[] =>
  typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];

const prose = (slug: string) => {
  const a = getArticle(slug)!;
  return strings([a.keyTakeaway, a.body, a.faqs, a.cta, a.services]).join("\n");
};

describe("the three new guides are integrated", () => {
  for (const slug of NEW_SLUGS) {
    it(`${slug} is published with a registered image, real dates, FAQs, sources and a disclaimer`, () => {
      const a = getArticle(slug);
      expect(a).not.toBeNull();
      expect(blogImage(a!.image)).not.toBeNull();
      expect(a!.published).toBe("2026-10-23");
      expect(a!.faqs.length).toBeGreaterThanOrEqual(6);
      expect(a!.sources.length).toBeGreaterThan(0);
      expect(a!.disclaimer).toBeTruthy();
    });
  }

  it("each is linked from at least one other article", () => {
    const inbound = ARTICLES.filter((a) => !NEW_SLUGS.includes(a.slug)).flatMap((a) => [
      // Only the first three related guides render (article-page.tsx).
      ...a.related.slice(0, 3),
      ...[...strings([a.body, a.faqs]).join(" ").matchAll(/\/blog\/([a-z0-9-]+)\//g)].map((m) => m[1]),
    ]);
    for (const slug of NEW_SLUGS) expect(inbound).toContain(slug);
  });
});

describe("FSSAI limits are the ones in force from 1 April 2026", () => {
  it("no article presents the superseded ₹12 lakh or ₹20 crore limits as current", () => {
    // FSSAI order of 13 March 2026: registration up to ₹1.5 crore, state
    // licence to ₹50 crore, central above. The FSSAI guide may mention the old
    // figures only to say they no longer apply.
    const offenders = ARTICLES.flatMap((a) =>
      strings([a.keyTakeaway, a.body, a.faqs])
        .filter((t) => /FSSAI|food licen/i.test(t) && /(12 lakh|20 crore)/.test(t) && !/no longer|earlier|older|previous|old /i.test(t))
        .map((t) => `${a.slug}: ${t.slice(0, 80)}`),
    );
    expect(offenders).toEqual([]);
  });

  it("the FSSAI guide states the 2026 thresholds", () => {
    const text = prose("fssai-registration-food-licence-india");
    for (const figure of ["₹1.5 crore", "₹50 crore", "1 April 2026"]) expect(text).toContain(figure);
  });
});

describe("no unsupported service or outcome claims", () => {
  it("none of the three says Raulji Group files these applications", () => {
    for (const slug of NEW_SLUGS) {
      const text = prose(slug);
      expect(text).not.toMatch(/\bwe (will )?(file|apply for|register) (your )?(trade ?mark|FSSAI|IEC|import export code)/i);
      expect(text).toMatch(/do not file/i);
    }
  });

  it("the trademark guide never promises registration or a timeline", () => {
    const text = prose("trademark-registration-india-guide");
    expect(text).not.toMatch(/guaranteed (registration|approval)|registered within \d+/i);
    expect(text).toMatch(/no one can guarantee|cannot guarantee|can anyone guarantee/i);
  });
});
