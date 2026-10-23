import { describe, expect, it } from "vitest";
import { ARTICLES, getArticle } from "@/lib/blog";
import { blogImage } from "@/lib/blog/images";
import { SERVICES } from "@/lib/services";
import { SECONDARY_SERVICES } from "@/lib/secondary-services";

/**
 * Regression tests for the second batch of business guides (23 Oct 2026) and
 * for the two factual corrections made to existing articles while checking
 * their sources. docs/blog-validation-report.md has the full record.
 */

const NEW_SLUGS = [
  "gst-registration-gujarat-guide",
  "udyam-registration-msme-india",
  "gujarat-shops-establishments-registration",
  "partnership-deed-checklist-india",
  "after-company-incorporation-compliance-checklist",
];

/** Every string an article renders, flattened, so claims can be searched. */
function text(article: (typeof ARTICLES)[number]): string {
  return JSON.stringify([article.keyTakeaway, article.body, article.faqs, article.covers, article.sources]);
}

describe("the five new guides are integrated", () => {
  for (const slug of NEW_SLUGS) {
    it(`${slug} is published with a registered image and real dates`, () => {
      const article = getArticle(slug);
      expect(article).not.toBeNull();
      expect(blogImage(article!.image)).not.toBeNull();
      expect(article!.published).toBe("2026-10-23");
      expect(article!.updated >= article!.published).toBe(true);
      expect(article!.faqs.length).toBeGreaterThanOrEqual(6);
      expect(article!.sources.length).toBeGreaterThan(0);
      expect(article!.disclaimer).toBeTruthy();
    });
  }

  it("titles, meta titles and meta descriptions stay unique across all articles", () => {
    for (const key of ["title", "metaTitle", "metaDescription"] as const) {
      const values = ARTICLES.map((a) => a[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("each new guide is linked back from at least one existing article or service page", () => {
    const fromArticles = ARTICLES.filter((a) => !NEW_SLUGS.includes(a.slug)).flatMap((a) => [
      // Only the first three related guides render (article-page.tsx).
      ...a.related.slice(0, 3),
      ...[...text(a).matchAll(/\/blog\/([a-z0-9-]+)\//g)].map((m) => m[1]),
    ]);
    const fromServices = [...SERVICES.flatMap((s) => s.guides), ...SECONDARY_SERVICES.flatMap((s) => s.guides ?? [])];
    for (const slug of NEW_SLUGS) {
      expect([...fromArticles, ...fromServices]).toContain(slug);
    }
  });
});

describe("rich text renders as intended", () => {
  it("no article nests a link inside bold, which the renderer shows as raw Markdown", () => {
    // components/blog/rich-text.tsx tokenises links and bold separately, so
    // **[label](url)** reaches the page as literal brackets and a bare URL. On
    // the Udyam guide that unbreakable URL also widened a 320px layout.
    // Checked per text field: across the joined JSON a match could start in
    // one field and end in another.
    const strings = (value: unknown): string[] =>
      typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
    // Pair the bold markers left to right, as the renderer does, and look for
    // a link inside a span. A link between two separate bold spans is fine.
    const linkInsideBold = (t: string) => [...t.matchAll(/\*\*(.+?)\*\*/g)].some((m) => /\]\(/.test(m[1]));
    const offenders = ARTICLES.filter((a) => strings([a.keyTakeaway, a.body, a.faqs]).some(linkInsideBold)).map(
      (a) => a.slug,
    );
    expect(offenders).toEqual([]);
  });
});

describe("corrections that must not regress", () => {
  it("no article gives a 30-day deadline for Gujarat shops and establishments registration", () => {
    // Sections 6 and 7 of the Gujarat Act give sixty days from commencing
    // business. Thirty days applies only to notifying closure.
    const pattern = /(shops? and establishments?[^.]{0,120}(30|thirty)[- ]days?|(30|thirty)[- ]day[^.]{0,40}shops? and establishments?)/i;
    const offenders = ARTICLES.filter((a) =>
      text(a)
        .split(/(?<=\.)\s/)
        // Sentences about closure, or that set the S&E deadline beside the
        // LLP's own 30-day Form 3 deadline, are correct and are excluded.
        .some((sentence) => pattern.test(sentence) && !/clos|Form 3|LLP agreement/i.test(sentence)),
    ).map((a) => a.slug);
    expect(offenders).toEqual([]);
  });

  it("no article describes director KYC as annual", () => {
    // DIR-3 KYC is once every three financial years from 31 March 2026.
    const offenders = ARTICLES.filter((a) => /annual (director |DIR-3 )?KYC|KYC obligation that follows every year/i.test(text(a))).map(
      (a) => a.slug,
    );
    expect(offenders).toEqual([]);
  });

  it("the GST guide does not offer a standalone GST service (master rule 15)", () => {
    const gst = getArticle("gst-registration-gujarat-guide")!;
    const offer = JSON.stringify([gst.cta, gst.services]);
    expect(offer).not.toMatch(/GST (registration|return)s? services?/i);
    expect(gst.services.map((s) => s.href)).toContain("/services/proprietorship-registration/");
  });
});
