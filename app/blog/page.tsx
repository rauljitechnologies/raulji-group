import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { BlogIndex, type BlogCard } from "@/components/blog/blog-index";
import { ARTICLES, activeCategories, formatArticleDate } from "@/lib/blog";
import { blogImage } from "@/lib/blog/images";
import { getPublishedPosts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { abs, breadcrumbSchema, graph, type Crumb } from "@/lib/schema";
import { SITE } from "@/lib/site";

// Rebuild hourly so anything published through Supabase appears without a
// redeploy. The nine guides are compiled in and do not need it.
export const revalidate = 3600;

export const metadata = pageMeta({
  title: "Business Guides and Insights | Raulji Group",
  description:
    "Practical guides on choosing a business structure, company and LLP registration, documents, the MCA process, starting a business in Gujarat, and health insurance, from Raulji Group.",
  path: "/blog/",
  ogHeadline: "Guides on registering and running a business in India",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog/" },
];

export default async function BlogPage() {
  /*
   * Every guide, in the listing, in editorial order.
   *
   * There used to be a "Start here" band above this that promoted one article
   * in a half-page card with its own image and CTA, and that article was then
   * filtered out of the grid below. Two things were wrong with it. A reader
   * scanning for a specific subject had to read the promoted card first and
   * then look for their subject in a grid that was missing one guide, with
   * nothing saying where it had gone; and the promoted card pushed the actual
   * listing, with its filter and search, below the fold on every screen size.
   *
   * The client asked for the featured block to go and for the listing to show
   * everything, which is also the right call for a nine-article index: the
   * grid is small enough to scan whole, and the filter and search are the
   * navigation, not a hand-picked starting point.
   */
  const guides: BlogCard[] = ARTICLES.map(
    (article) => {
      const image = blogImage(article.image);
      return {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        seriesMonth: article.seriesMonth,
        published: article.published,
        publishedLabel: formatArticleDate(article.published),
        readLabel: `${article.readMinutes} min read`,
        image: image ? { src: image.src, alt: image.alt } : null,
        // Built here rather than in the browser: title, excerpt, category and
        // keywords, which is the coverage the brief asks search to have.
        haystack: [
          article.title,
          article.excerpt,
          article.category,
          article.primaryKeyword,
          ...article.secondaryKeywords,
        ]
          .join(" ")
          .toLowerCase(),
      };
    },
  );

  /* Anything published through Supabase before the series existed. It keeps
     appearing in the listing and stays searchable; it simply has no featured
     image or series month of its own. */
  const legacy = await getPublishedPosts();
  const legacyCards: BlogCard[] = legacy
    .filter((post) => !ARTICLES.some((article) => article.slug === post.slug))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? "",
      category: post.category ?? "Business Registration",
      seriesMonth: null,
      published: post.created_at,
      publishedLabel: formatArticleDate(post.created_at),
      readLabel: post.read_time ?? "Article",
      image: null,
      haystack: [post.title, post.excerpt ?? "", post.category ?? ""].join(" ").toLowerCase(),
    }));

  const cards = [...guides, ...legacyCards];
  const categories = [
    ...new Set([...activeCategories(), ...legacyCards.map((card) => card.category)]),
  ];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          /* The series as a machine-readable list. Nothing is asserted here
             beyond what the page shows: nine named guides, in order, each at
             its own URL. */
          {
            "@type": "Blog",
            "@id": `${SITE.url}/blog/#blog`,
            url: abs("/blog/"),
            name: "Raulji Group business guides",
            description:
              "Guides on business structures, registration, the MCA process and related subjects, written by Raulji Group.",
            publisher: { "@id": `${SITE.url}/#organization` },
            inLanguage: "en-IN",
            blogPost: ARTICLES.map((article) => ({
              "@type": "BlogPosting",
              headline: article.title,
              description: article.metaDescription,
              url: abs(`/blog/${article.slug}/`),
              datePublished: article.published,
              dateModified: article.updated,
              articleSection: article.category,
            })),
          },
        )}
      />

      {/*
        The masthead.

        With the promoted article gone this is the whole of the page above the
        listing, so it does the work that card was doing: it says what the
        series is, how much of it there is, and what a reader is entitled to
        expect from it, before they start scanning titles.

        Every figure in the strip is counted from the article data rather than
        written down, so none of it can drift as guides are added, and none of
        it is a claim that would need verifying (master rule 13). An earlier
        draft of this strip said every guide names its sources. That holds for
        the nine series articles, where `sources` is part of the article model,
        but `cards` also carries legacy posts published through Supabase, which
        have no such guarantee, so the statement would have been asserting
        something about content this page cannot check. It is replaced with the
        series length, which is a fact about a set that is defined here.
      */}
      <PageHeader
        crumbs={crumbs}
        eyebrow="Business guides"
        title="Guides on registering and running a business"
        lead="Written by the people who prepare the filings, checked against the official sources, and kept to what we can actually stand behind."
      >
        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {(
            [
              ["Guides published", `${cards.length}`],
              ["Subjects covered", `${categories.length}`],
              ["2026 Business Guide Series", `${ARTICLES.length} parts`],
            ] as const
          ).map(([term, value]) => (
            <div key={term} className="bg-card px-5 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {term}
              </dt>
              <dd className="mt-1.5 font-semibold text-secondary">{value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Section tone="muted">
        <SectionHeading
          title="All guides"
          lead="The 2026 Business Guide Series, planned as a nine-part calendar from January to September. The month shown on each guide is its position in that series; every guide carries its real publication date. Filter by subject or search the full text of every title, summary and keyword."
          align="left"
        />
        <BlogIndex articles={cards} categories={categories} />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Related topics"
          title="If you would rather go straight to the detail"
          align="left"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/services/business-registration/",
              label: "Business Registration",
              blurb: "All four structures, with process, documents and cost.",
            },
            {
              href: "/compare/",
              label: "Compare the structures",
              blurb: "Private Limited, LLP, Partnership and Proprietorship, side by side.",
            },
            {
              href: "/gujarat/",
              label: "Gujarat",
              blurb: "Registration support across all 33 districts.",
            },
            {
              href: "/faqs/",
              label: "FAQs",
              blurb: "The questions we are asked most, answered briefly.",
            },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <span className="flex items-center gap-1.5 font-bold text-secondary">
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {link.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner />
    </>
  );
}
