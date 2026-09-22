import type { Article, Block, Category } from "./types";
import { CATEGORIES } from "./types";

import { chooseBusinessStructure } from "./articles/choose-business-structure";
import { pvtVsLlp } from "./articles/pvt-vs-llp";
import { partnershipVsProprietorship } from "./articles/partnership-vs-proprietorship";
import { documentsRequired } from "./articles/documents-required";
import { registrationMistakes } from "./articles/registration-mistakes";
import { gujaratBusinessSetup } from "./articles/gujarat-business-setup";
import { mcaProcess } from "./articles/mca-process";
import { structureGuide } from "./articles/structure-guide";
import { healthInsurance } from "./articles/health-insurance";

export type { Article, Block, Category, Source, ArticleAuthor } from "./types";
export { CATEGORIES } from "./types";

/**
 * The 2026 Business Guide Series.
 *
 * Nine articles planned as a January to September calendar and written as one
 * body of work. The order here is the editorial order, which is also the order
 * the cluster was designed in: the structure guides first, then documents and
 * process, then the location and reference pieces, then insurance.
 *
 * On dates. Every article carries its real publication date. The brief asked
 * for a January to September series and was explicit that the months must not
 * be presented as publication history, so the month lives in `seriesMonth` and
 * is labelled on the page as the series position. Nothing here is backdated.
 */
export const ARTICLES: Article[] = [
  chooseBusinessStructure,
  pvtVsLlp,
  partnershipVsProprietorship,
  documentsRequired,
  registrationMistakes,
  gujaratBusinessSetup,
  mcaProcess,
  structureGuide,
  healthInsurance,
];

/**
 * The article promoted at the top of /blog/.
 *
 * The comprehensive structure guide, because it is the piece that answers the
 * widest question and links out to the most of the rest.
 */
export const FEATURED_SLUG = "business-structure-guide-new-entrepreneurs-india";

const BY_SLUG = new Map(ARTICLES.map((article) => [article.slug, article]));

export function getArticle(slug: string) {
  return BY_SLUG.get(slug) ?? null;
}

export const ARTICLE_SLUGS = ARTICLES.map((article) => article.slug);

/**
 * Related articles for the foot of a post.
 *
 * Resolved from the slugs each article names rather than computed from
 * categories, because the brief specifies the cluster explicitly and a
 * category match would pair articles that do not actually help each other.
 * A slug that does not resolve is dropped rather than rendered as a dead link.
 */
export function getRelated(article: Article): Article[] {
  return article.related
    .map((slug) => BY_SLUG.get(slug))
    .filter((item): item is Article => Boolean(item) && item!.slug !== article.slug);
}

/** Categories that actually have articles, in the canonical order. */
export function activeCategories(): Category[] {
  return CATEGORIES.filter((category) =>
    ARTICLES.some((article) => article.category === category),
  );
}

export function articlesByCategory(category: Category) {
  return ARTICLES.filter((article) => article.category === category);
}

/** Long-form date, matching the format used elsewhere on the site. */
export function formatArticleDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Headings that carry an id, for the in-page contents list.
 *
 * Built from the body rather than maintained separately, so the contents can
 * never list a section that is not there.
 */
export function tableOfContents(article: Article) {
  return article.body
    .filter((block): block is Extract<Block, { kind: "h2" }> => block.kind === "h2")
    .map((block) => ({ id: block.id, text: block.text }));
}
