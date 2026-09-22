import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { BlogIndex, type BlogCard } from "@/components/blog/blog-index";
import {
  ARTICLES,
  FEATURED_SLUG,
  activeCategories,
  formatArticleDate,
  getArticle,
} from "@/lib/blog";
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
  const featured = getArticle(FEATURED_SLUG);
  const featuredImage = featured ? blogImage(featured.image) : null;

  const guides: BlogCard[] = ARTICLES.filter((article) => article.slug !== FEATURED_SLUG).map(
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

      <PageHeader
        crumbs={crumbs}
        eyebrow="Business guides"
        title="Guides on registering and running a business"
        lead="Written by the people who prepare the filings, checked against the official sources, and kept to what we can actually stand behind."
      />

      {featured && featuredImage ? (
        <Section>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Start here
          </p>
          <div className="mt-5 grid gap-8 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2 lg:gap-0">
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              sizes="(min-width: 1024px) 38rem, 100vw"
              priority
              placeholder="blur"
              className="aspect-[16/9] w-full object-cover lg:h-full"
            />
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {featured.category}
              </p>
              <h2 className="mt-3 text-2xl leading-snug md:text-3xl">
                <Link href={`/blog/${featured.slug}/`} className="hover:text-primary">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={featured.published}>
                    {formatArticleDate(featured.published)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {featured.readMinutes} min read
                </span>
              </div>
              <Link
                href={`/blog/${featured.slug}/`}
                className="brand-gradient mt-7 inline-flex min-h-[3rem] w-fit items-center gap-2 rounded-xl px-6 font-semibold text-primary-foreground shadow-soft"
              >
                Read the guide
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Section>
      ) : null}

      <Section tone="muted">
        <SectionHeading
          title="All guides"
          lead="The 2026 Business Guide Series, planned as a nine-part calendar from January to September. The month shown on each guide is its position in that series; every guide carries its real publication date."
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
