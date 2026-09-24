"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import {
  ArrowRight,
  Building2,
  Compass,
  FileText,
  MapPin,
  Search,
  ShieldCheck,
  TrendingUp,
  X,
  type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Serialisable shape of an article for the listing.
 *
 * Deliberately not the full Article: the index does not need the body, and
 * shipping 18,000 words of block data to the browser to power a filter over
 * nine cards would be an absurd trade. `haystack` is built on the server from
 * title, excerpt, category and keywords, which is what the brief asks search
 * to cover.
 */
export interface BlogCard {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  seriesMonth: string | null;
  published: string;
  publishedLabel: string;
  readLabel: string;
  image: { src: StaticImageData; alt: string } | null;
  /** The article's real byline, so a card never credits the wrong person. */
  author: { name: string; photo: string };
  haystack: string;
}

const TOPIC_ICONS: Record<string, LucideIcon> = {
  "Business Registration": Building2,
  "Company Registration": FileText,
  "Business Consulting": Compass,
  Entrepreneurship: TrendingUp,
  "Gujarat Business": MapPin,
  "Insurance Awareness": ShieldCheck,
};

const POPULAR = ["LLP", "Documents", "Gujarat", "Incorporation"];

/**
 * The blog masthead, topic browser and listing, built to the "Raulji Blog v2"
 * design (claude.ai/design).
 *
 * One client component because the hero search, the popular-search chips, the
 * topic cards and the grid all share one filter state. Every card is a plain
 * link and the whole set is in the initial HTML, so the page is complete and
 * crawlable before any JavaScript runs; the filter narrows what is already
 * there rather than fetching anything.
 *
 * Hover effects are CSS only. The design drives them from React state, which
 * would re-render the grid on every mouse move for no visible gain.
 */
export function BlogIndex({
  articles,
  categories,
  crumbs,
  stats,
  featured,
}: {
  articles: BlogCard[];
  categories: string[];
  crumbs: Crumb[];
  stats: { value: string; label: string }[];
  featured: BlogCard | null;
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return articles.filter((article) => {
      if (category && article.category !== category) return false;
      return terms.every((term) => article.haystack.includes(term));
    });
  }, [articles, category, query]);

  const filtered = category !== null || query.trim() !== "";

  function toGrid() {
    // After the state update paints, so the grid is already the filtered one.
    window.setTimeout(() => {
      document.getElementById("guides")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  }

  function clear() {
    setCategory(null);
    setQuery("");
  }

  const q = query.trim();
  const resultLabel =
    visible.length === 0
      ? "0 guides"
      : `${visible.length} ${visible.length === 1 ? "guide" : "guides"}${category ? ` in ${category}` : ""}${q ? ` matching “${q}”` : ""}`;

  return (
    <>
      {/* Hero. */}
      <section
        aria-labelledby="blog-h"
        className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(rgba(50,159,210,0.22)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(90deg,transparent_30%,#000_100%)]"
        />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-12 pt-6 sm:px-8 md:gap-14 md:pb-[5.5rem] md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
            <div className="flex min-w-0 flex-col gap-[1.375rem]">
              <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]">
                <span className="h-0.5 w-7 bg-[#329fd2]" aria-hidden="true" />
                Raulji Business Guides
              </p>
              <h1
                id="blog-h"
                className="text-balance text-[2.375rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl xl:text-[4.125rem]"
              >
                Start right. <span className="text-[#7cc8ec]">File once.</span> Grow with clarity.
              </h1>
              <p className="max-w-[33.75rem] text-pretty text-base leading-[1.7] text-[#c9d6e3] sm:text-lg">
                Guides on registering and running a business in India, written by the people who
                prepare the filings and checked against the official sources.
              </p>

              <form
                role="search"
                className="relative mt-1.5 max-w-[33.75rem]"
                onSubmit={(event) => {
                  event.preventDefault();
                  toGrid();
                }}
              >
                <label htmlFor="blog-search" className="sr-only">
                  Search the guides
                </label>
                <Search
                  className="pointer-events-none absolute left-[1.125rem] top-1/2 h-5 w-5 -translate-y-1/2 text-[#1a7cb0]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search LLP, documents, Gujarat, incorporation..."
                  className="h-14 w-full rounded-[4px] border-0 bg-white pl-[3.125rem] pr-12 text-base text-[#122640] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] transition-shadow placeholder:text-[#5b6778] hover:shadow-[0_0_0_3px_rgba(50,159,210,0.35),0_20px_40px_-20px_rgba(0,0,0,0.5)] focus:shadow-[0_0_0_3px_rgba(50,159,210,0.5)] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[4px] text-[#5b6778] hover:bg-[#f4f7fa] hover:text-[#122640]"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Clear search</span>
                  </button>
                ) : null}
              </form>

              <div className="mt-1 flex items-center gap-3.5">
                <span className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full border-2 border-[#329fd2] bg-white">
                  <Image
                    src="/favicon.png"
                    alt=""
                    width={48}
                    height={48}
                    className="h-8 w-8 object-contain"
                  />
                </span>
                <p className="text-sm leading-[1.45] text-[#c9d6e3]">
                  Written by <strong className="text-white">the Raulji Group team</strong>
                  <br />
                  the people who handle the filings
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-[#c9d6e3]">
                Popular:
                {POPULAR.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setQuery(label);
                      setCategory(null);
                      toGrid();
                    }}
                    className="min-h-[2.25rem] rounded-2xl border border-white/[0.22] px-3 text-[0.8125rem] font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2] hover:bg-[#329fd2] hover:text-[#0c1a2d]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {featured ? (
              <article className="group relative min-w-0">
                <span
                  aria-hidden="true"
                  className="absolute inset-[-14px_14px_14px_-14px] rounded-md border-[1.5px] border-[#329fd2]/50 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-x-1.5 group-hover:translate-y-1.5"
                />
                <Link
                  href={`/blog/${featured.slug}/`}
                  className="relative block overflow-hidden rounded-md bg-[#122640] text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-1.5"
                >
                  {featured.image ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <Image
                        src={featured.image.src}
                        alt=""
                        priority
                        placeholder="blur"
                        sizes="(min-width: 1024px) 34rem, 100vw"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-3 bg-[#122640] px-[1.625rem] pb-[1.625rem] pt-6">
                    <div className="flex items-center gap-2.5 text-xs font-bold tracking-[0.06em]">
                      <span className="rounded-[3px] bg-[#329fd2] px-2 py-1 text-[#0c1a2d]">
                        START HERE
                      </span>
                      <span className="text-[#c9d6e3]">{featured.readLabel}</span>
                    </div>
                    <h2 className="text-balance text-xl font-bold leading-[1.25] text-white lg:text-2xl">
                      {featured.title}
                    </h2>
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#7cc8ec]">
                      Read the guide
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </article>
            ) : null}
          </div>

          <dl className="flex flex-wrap gap-x-12 gap-y-4 border-t border-white/[0.12] pt-7">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-row-reverse items-baseline justify-end gap-2.5">
                <dt className="text-[0.8125rem] text-[#c9d6e3]">{stat.label}</dt>
                <dd className="text-[1.75rem] font-extrabold tracking-[-0.02em]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Browse by topic. */}
      <section aria-labelledby="topic-h" className="pt-14 md:pt-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-5 sm:px-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]">
              Browse by topic
            </p>
            <h2
              id="topic-h"
              className="text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#122640] sm:text-[2.5rem]"
            >
              What are you working on?
            </h2>
          </div>
          <div
            role="group"
            aria-label="Filter by subject"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          >
            {categories.map((label) => {
              const on = category === label;
              const count = articles.filter((article) => article.category === label).length;
              const Icon = TOPIC_ICONS[label] ?? FileText;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setCategory(on ? null : label);
                    toGrid();
                  }}
                  className={cn(
                    "flex flex-col gap-3.5 rounded-md border p-4 text-left transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:border-[#329fd2] hover:shadow-[0_16px_32px_-18px_rgba(18,38,64,0.35)] sm:p-5",
                    on
                      ? "border-[#122640] bg-[#122640] text-white"
                      : "border-[#e3e9ef] bg-white text-[#122640]",
                  )}
                >
                  <span className="flex w-full items-center justify-between">
                    <span
                      className={cn(
                        "flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-full",
                        on ? "bg-[#329fd2]/20" : "bg-[#e8f5fb]",
                      )}
                    >
                      <Icon
                        className={cn("h-[1.375rem] w-[1.375rem]", on ? "text-[#7cc8ec]" : "text-[#1a7cb0]")}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>
                    <span className={cn("text-xs font-bold", on ? "text-[#c9d6e3]" : "text-[#5b6778]")}>
                      {count} {count === 1 ? "guide" : "guides"}
                    </span>
                  </span>
                  <span className="text-[0.9375rem] font-bold leading-[1.3]">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* All guides. */}
      <section
        id="guides"
        aria-labelledby="all-h"
        className="scroll-mt-28 pb-14 pt-12 md:pb-24 md:pt-[4.5rem]"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 sm:px-8">
          <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]">
                2026 Business Guide Series
              </p>
              <h2
                id="all-h"
                className="text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#122640] sm:text-[2.75rem]"
              >
                All guides
              </h2>
            </div>
            <p className="max-w-[32.5rem] text-pretty text-[0.9375rem] leading-[1.7] text-[#3a4656] lg:justify-self-end">
              A nine-part series, January to September. The month on each guide is its place in the
              series; every guide carries its real publication date.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3e9ef] pb-4">
            <p aria-live="polite" className="text-sm font-semibold text-[#122640]">
              {resultLabel}
            </p>
            {filtered ? (
              <button
                type="button"
                onClick={clear}
                className="min-h-[2.5rem] text-sm font-semibold text-[#1a7cb0] hover:underline"
              >
                Clear filters &times;
              </button>
            ) : null}
          </div>

          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-[#cfd9e3] p-10 text-center">
              <p className="text-base font-semibold text-[#122640]">No guides match that search.</p>
              <p className="text-sm text-[#3a4656]">
                Try a different term, or{" "}
                <Link href="/contact/" className="font-semibold text-[#1a7cb0] hover:underline">
                  ask us directly
                </Link>
                .
              </p>
              <button
                type="button"
                onClick={clear}
                className="mt-1 min-h-[2.75rem] rounded-[4px] border-[1.5px] border-[#122640] bg-white px-[1.125rem] text-sm font-semibold text-[#122640]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((article) => (
                <li key={article.slug} className="flex">
                  <ArticleCard article={article} />
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}

function ArticleCard({ article }: { article: BlogCard }) {
  const href = `/blog/${article.slug}/`;
  return (
    <article className="group relative flex flex-1 flex-col overflow-hidden rounded-md border border-[#e3e9ef] bg-white shadow-[0_1px_0_rgba(18,38,64,0.02)] transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-[#cfe6f3] hover:shadow-[0_24px_48px_-24px_rgba(18,38,64,0.4)]">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 h-[3px] w-0 bg-[#329fd2] transition-[width] duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:w-full"
      />
      {article.image ? (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[16/9] overflow-hidden bg-[#122640]"
        >
          <Image
            src={article.image.src}
            alt=""
            placeholder="blur"
            sizes="(min-width: 1024px) 24rem, (min-width: 768px) 45vw, 100vw"
            className="h-full w-full object-cover saturate-[.95] transition duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.07] group-hover:saturate-[1.1]"
          />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-[0.04em] text-[#1a7cb0]">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#329fd2]" aria-hidden="true" />
            {article.category}
          </span>
          {article.seriesMonth ? (
            <span className="font-semibold normal-case tracking-normal text-[#5b6778]">
              Series: {article.seriesMonth}
            </span>
          ) : null}
        </p>
        <h3 className="text-pretty text-[1.1875rem] font-bold leading-[1.3] text-[#122640]">
          <Link href={href} className="transition-colors group-hover:text-[#1a7cb0]">
            {article.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm leading-[1.65] text-[#3a4656]">{article.excerpt}</p>
        <div className="mt-1.5 flex items-center justify-between gap-3 border-t border-[#eef2f6] pt-3.5 text-xs text-[#3a4656]">
          <span className="flex items-center gap-2.5">
            <span className="flex h-[1.625rem] w-[1.625rem] flex-none items-center justify-center overflow-hidden rounded-full border border-[#e3e9ef] bg-white">
              <Image
                src={article.author.photo}
                alt=""
                width={26}
                height={26}
                className="h-full w-full object-cover object-[center_20%]"
              />
            </span>
            <span className="leading-[1.45]">
              <strong className="block font-semibold text-[#122640]">{article.author.name}</strong>
              <time dateTime={article.published}>{article.publishedLabel}</time>
              {" · "}
              {article.readLabel}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="flex h-[1.875rem] w-[1.875rem] flex-none items-center justify-center rounded-full bg-[#e8f5fb] text-[#1a7cb0] transition duration-300 group-hover:translate-x-0.5 group-hover:bg-[#122640] group-hover:text-white"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
