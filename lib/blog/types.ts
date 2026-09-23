/**
 * The article content model.
 *
 * Articles are written as typed data rather than as a string of HTML or
 * Markdown, for three reasons that matter to this site specifically:
 *
 *  - Structure is the point. AEO and GEO work asks for direct answers,
 *    definitions, comparison tables and FAQs that a machine can lift cleanly.
 *    A `table` block renders a real <table> with a scroll container on mobile
 *    and nothing else; a `quickAnswer` always lands above the fold. None of
 *    that survives a prose blob split on blank lines, which is what the blog
 *    rendered before.
 *  - The same data feeds the page and the schema. FAQ questions render from
 *    `faqs` and FAQPage is built from `faqs`, so the two cannot drift apart,
 *    which is the condition Google attaches to the rich result.
 *  - It is reviewable. Every factual claim in an article sits next to the
 *    source that supports it, in the repository, in a diff.
 *
 * House rule from the brief, applied throughout: no em dash characters in any
 * article text. `scripts/check-blog.mjs` fails the build if one appears.
 */

import type { FAQ } from "@/lib/services";

/**
 * Inline markup allowed inside any `text` field.
 *
 * Deliberately tiny: `[label](/path/)` for a link and `**text**` for emphasis.
 * Nothing else. A full Markdown parser would let an author reach for headings,
 * images and raw HTML inside a paragraph, which is exactly the unstructured
 * content this model exists to prevent.
 */
export type RichText = string;

export type Block =
  /** Body paragraph. The default. */
  | { kind: "p"; text: RichText }
  /** Section heading. Question-shaped wherever the topic allows (AEO). */
  | { kind: "h2"; text: string; id: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: RichText[]; ordered?: boolean }
  /**
   * A real table. Renders as a table on desktop and stays a table on mobile
   * inside a horizontal scroll container, because collapsing a four-way
   * structure comparison into stacked cards loses the comparison.
   */
  | {
      kind: "table";
      caption?: string;
      columns: string[];
      rows: RichText[][];
      /** Repeat the first column as a row header. Used by comparison tables. */
      rowHeader?: boolean;
    }
  /**
   * The direct answer to the heading above it, pulled out so an answer engine
   * does not have to find it inside a paragraph.
   */
  | { kind: "answer"; text: RichText }
  /** A practical example drawn from the kind of work the group actually does. */
  | { kind: "example"; title: string; text: RichText }
  /** Something the reader can get wrong and pay for. */
  | { kind: "warning"; title: string; text: RichText }
  /** Neutral aside: a definition, a clarification, a pointer to a source. */
  | { kind: "note"; title: string; text: RichText }
  /** A checklist the reader can work through. */
  | { kind: "checklist"; title: string; items: RichText[] }
  /** An ordered process with a title and an explanation per step. */
  | { kind: "steps"; items: { title: string; body: RichText }[] }
  /** Internal links placed mid-article, where the reader needs them. */
  | { kind: "links"; title: string; items: { href: string; label: string; blurb: string }[] };

export interface Source {
  label: string;
  url: string;
  /** What this source supports, so a reviewer can check the claim against it. */
  supports: string;
}

export interface ArticleAuthor {
  name: string;
  /** Displayed contact for this article. Most carry the group line. */
  phone: { display: string; e164: string };
  /** One line of context. Never a fabricated biography (master rule 13). */
  context: string;
}

export interface Article {
  slug: string;
  /** Visible H1. */
  title: string;
  /** <title>. Ends with the brand, per the site convention. */
  metaTitle: string;
  metaDescription: string;
  /** Card and opening standfirst. */
  excerpt: string;
  category: Category;
  /**
   * The month this article was planned for in the 2026 Business Guide Series.
   *
   * Editorial only, and labelled as such on the page. The brief is explicit
   * that a January slot must not be presented as a January publication date
   * when the article was written in September, so `published` below carries
   * the real date and this carries the series position.
   */
  seriesMonth: string;
  /** Real publication date, ISO. Never backdated. */
  published: string;
  updated: string;
  readMinutes: number;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  author: ArticleAuthor;
  /** Key for the featured image in lib/blog/images.ts. */
  image: string;
  /** Shown as "What this article covers". SXO: tell the reader before they scroll. */
  covers: string[];
  /** The direct answer to the article's title question, above the fold. */
  keyTakeaway: { heading: string; body: RichText; points?: RichText[] };
  body: Block[];
  faqs: FAQ[];
  /** Slugs of genuinely related articles. The cluster map lives in index.ts. */
  related: string[];
  /** Service pages this article should send a reader to, in order. */
  services: { href: string; label: string; blurb: string }[];
  sources: Source[];
  /** Shown above the author card on legal, regulatory and insurance articles. */
  disclaimer?: string;
  cta: { title: string; body: string };
}

export const CATEGORIES = [
  "Business Registration",
  "Company Registration",
  "Business Consulting",
  "Entrepreneurship",
  "Gujarat Business",
  "Insurance Awareness",
] as const;

export type Category = (typeof CATEGORIES)[number];
