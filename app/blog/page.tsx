import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { BlogIndex, type BlogCard } from "@/components/blog/blog-index";
import { ARTICLES, activeCategories, formatArticleDate } from "@/lib/blog";
import { blogImage } from "@/lib/blog/images";
import { getPublishedPosts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { abs, breadcrumbSchema, faqSchema, graph, type Crumb } from "@/lib/schema";
import { LEADERSHIP, SITE, telHref } from "@/lib/site";

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

/**
 * Quick answers, from the "Raulji Blog v2" design.
 *
 * Each answer is a one-paragraph summary of the guide it links to, and says
 * nothing the guide does not. They render as disclosure rows whose text is in
 * the HTML whether open or closed, so the FAQPage schema built from this list
 * matches what is on the page.
 */
const QUICK_ANSWERS = [
  {
    q: "Which business structure should I choose in India?",
    a: "It is usually settled by liability and compliance rather than tax. A Private Limited Company suits businesses planning to raise investment; an LLP suits partner-run firms wanting limited liability with lighter compliance; a Partnership or Proprietorship is simplest but carries unlimited personal liability.",
    slug: "how-to-choose-business-structure-india-2026",
    link: "How to choose the right structure",
  },
  {
    q: "What is the difference between a Private Limited Company and an LLP?",
    a: "Both offer limited liability and a separate legal entity. They differ in ownership, management, annual filings and the ability to take equity investment: only a Private Limited Company can issue shares to investors.",
    slug: "private-limited-company-vs-llp",
    link: "Private Limited vs LLP",
  },
  {
    q: "Is company registration different in Gujarat?",
    a: "Incorporation is a central government process and works the same everywhere in India. What is local to Gujarat is stamp duty, the Registrar of Firms for partnerships, professional tax and the Shops and Establishments Act.",
    slug: "starting-business-gujarat-registration-guide",
    link: "Starting a business in Gujarat",
  },
  {
    q: "Why do company registrations get delayed?",
    a: "Most delays are document problems, such as mismatched names or addresses, unclear proofs, or a missing NOC for the registered office, rather than government delays.",
    slug: "documents-required-company-registration-india",
    link: "Documents required for registration",
  },
].filter((item) => ARTICLES.some((article) => article.slug === item.slug));

const RELATED = [
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
];

const WHATSAPP_HREF = `https://wa.me/${SITE.phone.whatsapp}?text=${encodeURIComponent(
  "Hello Raulji Group, I would like help choosing and registering a business structure.",
)}`;

/** The byline photo for a card: the Chairman's portrait, or the group mark. */
function authorFor(name: string) {
  return {
    name,
    photo: name === LEADERSHIP.chairman.name ? LEADERSHIP.chairman.photo : "/favicon.png",
  };
}

export default async function BlogPage() {
  /*
   * Every guide, in the listing, in editorial order. The design's "Start
   * here" card repeats the first guide in the hero, but the grid still lists
   * all of them, so nothing is filtered out of the listing to make room.
   */
  const guides: BlogCard[] = ARTICLES.map((article) => {
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
      author: authorFor(article.author.name),
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
  });

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
      author: authorFor(SITE.name),
      haystack: [post.title, post.excerpt ?? "", post.category ?? ""].join(" ").toLowerCase(),
    }));

  const cards = [...guides, ...legacyCards];
  const categories = [
    ...new Set([...activeCategories(), ...legacyCards.map((card) => card.category)]),
  ];

  /*
   * The masthead strip. Every figure is counted from the article data rather
   * than written down, so none of it can drift and none of it is a claim that
   * needs verifying (master rule 13). The design's "33 Gujarat districts
   * served" is not a count of anything on this page, so it is not here.
   */
  const lastUpdated = ARTICLES.map((article) => article.updated).sort().at(-1);
  const stats = [
    { value: `${cards.length}`, label: "Guides published" },
    { value: `${categories.length}`, label: "Subjects covered" },
    { value: `${ARTICLES.length}`, label: "Parts in the 2026 series" },
    ...(lastUpdated
      ? [
          {
            value: new Date(lastUpdated).toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
            }),
            label: "Last updated",
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white text-[#3a4656]">
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
          faqSchema(QUICK_ANSWERS),
        )}
      />

      <BlogIndex
        articles={cards}
        categories={categories}
        crumbs={crumbs}
        stats={stats}
        featured={guides[0] ?? null}
      />

      {/* Still deciding. The Chairman's name and title are confirmed in lib/site.ts. */}
      <section aria-labelledby="exp-h" className="px-5 pb-14 sm:px-8 md:pb-24">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-stretch overflow-hidden rounded-md border border-[#e3e9ef] bg-[#f4f7fa] transition duration-[400ms] hover:border-[#cfe6f3] hover:shadow-[0_30px_60px_-36px_rgba(18,38,64,0.35)]">
          <div className="relative min-h-[17.5rem] flex-[1_1_100%] bg-[#122640] sm:flex-[0_1_18.75rem]">
            <Image
              src={LEADERSHIP.chairman.photo}
              alt={`${LEADERSHIP.chairman.name}, ${LEADERSHIP.chairman.roles[0]}`}
              fill
              sizes="(min-width: 640px) 18.75rem, 100vw"
              className="object-cover object-[center_20%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(12,26,45,0.92),rgba(12,26,45,0))] px-5 py-[1.125rem] text-white">
              <p className="text-base font-bold">{LEADERSHIP.chairman.name}</p>
              <p className="text-[0.8125rem] text-[#c9d6e3]">{LEADERSHIP.chairman.roles[0]}</p>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_26rem] flex-col justify-center gap-[1.125rem] p-7 sm:p-10 lg:p-[3.25rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]">
              Still deciding?
            </p>
            <h2
              id="exp-h"
              className="text-balance text-2xl/[1.18] font-bold leading-[1.18] tracking-[-0.02em] text-[#122640] sm:text-[2.125rem]"
            >
              The guides explain the options. A conversation settles which one is yours.
            </h2>
            <p className="max-w-[35rem] text-[0.9375rem] leading-[1.7]">
              Leadership built on relationships. Trust built for the long term. Speak to the team
              that prepares the filings, before anything is submitted.
            </p>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/contact/"
                event="primary_cta_click"
                params={{ label: "blog_still_deciding" }}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0] hover:shadow-[0_10px_22px_-10px_rgba(26,124,176,0.6)]"
              >
                Talk to an Expert
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <Link
                href="/compare/"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#122640] px-5 text-[0.9375rem] font-semibold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#122640] hover:text-white"
              >
                Compare Structures
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick answers. */}
      <section aria-labelledby="ans-h" className="bg-[#0c1a2d] py-14 text-white md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-[5.5rem]">
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]">
              Quick answers
            </p>
            <h2
              id="ans-h"
              className="text-balance text-[1.75rem] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[2.5rem]"
            >
              The short version, before you read the guides.
            </h2>
            <p className="text-[0.9375rem] leading-[1.7] text-[#c9d6e3]">
              Direct answers to the questions we are asked most. Each links to the guide that
              explains it in full.
            </p>
            <div className="mt-2.5 flex flex-col gap-1.5 border-t border-white/[0.14] pt-5 text-[0.8125rem] text-[#c9d6e3]">
              <p>
                <strong className="text-white">Written by</strong> {SITE.name}
              </p>
              <p>
                <strong className="text-white">Sources</strong> Named at the foot of every guide
              </p>
              {lastUpdated ? (
                <p>
                  <strong className="text-white">Last updated</strong>{" "}
                  <time dateTime={lastUpdated}>{formatArticleDate(lastUpdated)}</time>
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex min-w-0 flex-col border-t border-white/[0.14]">
            {QUICK_ANSWERS.map((item) => (
              <details key={item.q} className="group border-b border-white/[0.14]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-[4px] py-[1.375rem] transition-[padding,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-[#329fd2]/[0.08] hover:px-3.5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-semibold leading-[1.4] text-white">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/30 text-[#7cc8ec] transition-transform duration-200 group-open:rotate-45"
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <div className="flex flex-col gap-3 pb-6 pr-12">
                  <p className="text-[0.9375rem] leading-[1.7] text-[#d5e0ea]">{item.a}</p>
                  <Link
                    href={`/blog/${item.slug}/`}
                    className="self-start text-sm font-semibold text-[#7cc8ec] hover:text-white hover:underline"
                  >
                    Read: {item.link} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related topics. */}
      <section aria-labelledby="rel-h" className="pt-14 md:pt-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-5 sm:px-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]">
              Related topics
            </p>
            <h2
              id="rel-h"
              className="text-[1.625rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#122640] sm:text-[2.25rem]"
            >
              If you would rather go straight to the detail.
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map((link) => (
              <li key={link.href} className="flex">
                <Link
                  href={link.href}
                  className="flex flex-1 flex-col gap-2.5 rounded-md border border-[#e3e9ef] bg-white px-6 py-[1.625rem] transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:border-[#329fd2] hover:bg-[#f4fafd] hover:shadow-[0_16px_32px_-18px_rgba(18,38,64,0.3)]"
                >
                  <span className="flex items-center justify-between gap-3 text-[1.0625rem] font-bold text-[#122640]">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="flex h-[1.875rem] w-[1.875rem] flex-none items-center justify-center rounded-full bg-[#e8f5fb] text-[#1a7cb0]"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                  <span className="text-sm/[1.6] leading-[1.6]">{link.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA. */}
      <section aria-labelledby="cta-h" className="px-5 py-14 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-x-16 gap-y-7 rounded-md bg-[#122640] p-8 text-white sm:p-12 lg:grid-cols-2 lg:p-16">
          <div className="flex flex-col gap-3.5">
            <h2
              id="cta-h"
              className="text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.75rem]"
            >
              Ready to start your business?
            </h2>
            <p className="max-w-[32.5rem] text-base/[1.7] leading-[1.7] text-[#d5e0ea]">
              Tell us what you are building and we will help you choose the right structure before
              anything is filed.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3.5 lg:justify-self-end">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/contact/"
                event="primary_cta_click"
                params={{ label: "blog_footer_cta" }}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]"
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={WHATSAPP_HREF}
                external
                event="whatsapp_click"
                params={{ label: "blog_footer_cta" }}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition-colors hover:bg-[#329fd2]"
              >
                WhatsApp an Expert
              </TrackedLink>
            </div>
            <p className="text-sm text-[#c9d6e3]">
              Or call{" "}
              <TrackedLink
                href={telHref}
                event="phone_click"
                params={{ label: "blog_footer_cta" }}
                className="font-semibold text-white hover:text-[#7cc8ec] hover:underline"
              >
                {SITE.phone.display}
              </TrackedLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
