"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { Search, X } from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";
import heroPhoto from "@/public/photos/home-editorial.webp";

/**
 * Serialisable shape of an article for the listing.
 *
 * Deliberately not the full Article: the index does not need the body, and
 * shipping every article's block data to the browser to power a filter would
 * be an absurd trade. `haystack` is built on the server from title, excerpt,
 * category and keywords.
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

const ALL = "All guides";

/** Guides shown on arrival, the one automatic top-up on scroll, and each button press. */
const FIRST = 9;
const STEP = 3;

/**
 * The blog masthead and listing, built to the "Raulji Blog Listing" design
 * (claude.ai/design): a dark photographic hero with a "Start here" card, then
 * topic pills over a three-column grid.
 *
 * Kept from the version before it: a search box on the filter row, because
 * with more than a dozen guides the pills alone are not enough. Changed from
 * the design's sample data: card dates are real publication dates, not the
 * series month (which is an editorial position), and the hero chips are counts
 * from the data plus the real last-updated month, not "Updated monthly".
 *
 * Every card is a plain link and the whole set is in the initial HTML, so the
 * page is complete and crawlable before any JavaScript runs; the filter only
 * narrows what is already there.
 */
export function BlogIndex({
  articles,
  categories,
  crumbs,
  chips,
  featured,
}: {
  articles: BlogCard[];
  categories: string[];
  crumbs: Crumb[];
  /** Short facts for the hero, each counted or dated from the data. */
  chips: string[];
  featured: BlogCard | null;
}) {
  const [category, setCategoryState] = useState(ALL);
  const [query, setQueryState] = useState("");
  /*
   * How many cards are shown. 9 on arrival; the first time the reader scrolls
   * to the end of the grid, 3 more appear by themselves; after that a "Load
   * more" button adds 3 at a time. A new topic or search starts again at 9.
   *
   * Every card is still rendered into the HTML, the rest carrying `hidden`,
   * so every guide stays linked from this page for crawlers and the list
   * works without JavaScript for anyone who searches it.
   */
  const [limit, setLimit] = useState(FIRST);
  const [autoLoaded, setAutoLoaded] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const reset = () => {
    setLimit(FIRST);
    setAutoLoaded(false);
  };
  const setCategory = (value: string) => {
    setCategoryState(value);
    reset();
  };
  const setQuery = (value: string) => {
    setQueryState(value);
    reset();
  };

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visible = articles.filter(
    (a) => (category === ALL || a.category === category) && terms.every((t) => a.haystack.includes(t)),
  );
  const filtered = category !== ALL || terms.length > 0;
  const shown = Math.min(limit, visible.length);
  const more = visible.length - shown;
  const countLabel =
    (shown < visible.length ? `${shown} of ` : "") +
    `${visible.length} ${visible.length === 1 ? "guide" : "guides"}` +
    (category !== ALL ? ` in ${category}` : "") +
    (terms.length ? ` matching “${query.trim()}”` : "");

  const viewAll = () => {
    setCategoryState(ALL);
    setQueryState("");
    reset();
  };

  // The one automatic top-up, when the end of the grid scrolls into view.
  useEffect(() => {
    const el = sentinel.current;
    if (!el || autoLoaded || more <= 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLimit((l) => l + STEP);
          setAutoLoaded(true);
        }
      },
      { rootMargin: "0px 0px 200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoLoaded, more]);

  const loadMore = () => {
    const first = shown;
    setLimit((l) => l + STEP);
    // Move focus to the first newly shown guide, so keyboard and screen-reader
    // users land on the new content rather than staying on the button.
    window.setTimeout(() => {
      listRef.current?.querySelectorAll<HTMLAnchorElement>("li:not([hidden]) > a")[first]?.focus();
    }, 30);
  };

  return (
    <>
      {/* Hero. */}
      <section aria-labelledby="blog-h" className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24">
        <Image
          src={heroPhoto}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,26,45,.97)_0%,rgba(12,26,45,.9)_50%,rgba(12,26,45,.6)_100%)]"
        />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 md:gap-14 md:pb-24 md:pt-8">
          <div className="text-[0.8125rem] [&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#7d90a8]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>

          <div className="flex flex-wrap items-end gap-x-20 gap-y-10">
            <div className="flex min-w-0 flex-[1.3_1_28.75rem] flex-col gap-[1.375rem]">
              <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]">
                <span className="h-0.5 w-7 bg-[#329fd2]" aria-hidden="true" />
                Raulji Business Guides · 2026 Series
              </p>
              <h1
                id="blog-h"
                className="text-balance text-[2.375rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4rem]"
              >
                Know what to file <span className="text-[#7cc8ec]">before you file it.</span>
              </h1>
              <p className="max-w-[36.25rem] text-pretty text-base leading-[1.75] text-[#d5e0ea] md:text-lg/[1.75]">
                Plain-language guides on choosing a business structure, registering it and staying compliant in
                India and Gujarat, plus health insurance guides for Panchmahal. Written by the people who handle the
                filings.
              </p>
              <ul className="mt-1.5 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <li key={chip} className="rounded-full border border-white/[0.28] px-3.5 py-2 text-[0.8125rem] font-semibold">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            {featured ? (
              <Link
                href={`/blog/${featured.slug}/`}
                className="group flex min-w-0 max-w-[28.75rem] flex-[1_1_21.25rem] flex-col overflow-hidden rounded-lg bg-white text-[#122640] transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
              >
                {featured.image ? (
                  <Image
                    src={featured.image.src}
                    alt={featured.image.alt}
                    sizes="(min-width: 768px) 28.75rem, 100vw"
                    placeholder="blur"
                    className="aspect-[16/9] w-full bg-[#1b3350] object-cover"
                  />
                ) : null}
                <div className="flex flex-col gap-2.5 px-[1.375rem] pb-[1.375rem] pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1a7cb0]">
                    Start here{featured.seriesMonth ? " · Part 1" : ""}
                  </p>
                  <p className="text-pretty text-xl font-bold leading-[1.3]">{featured.title}</p>
                  <p className="line-clamp-2 text-sm leading-[1.6] text-[#3a4656]">{featured.excerpt}</p>
                  <p className="mt-1 text-sm font-bold text-[#1a7cb0]">
                    Read the guide{" "}
                    <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Listing. */}
      <section id="guides" aria-label="All guides" className="scroll-mt-28 pb-14 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
              {[ALL, ...categories].map((label) => {
                const on = label === category;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setCategory(label)}
                    className={cn(
                      "min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors duration-200",
                      on
                        ? "border-[#122640] bg-[#122640] text-white"
                        : "border-[#cfd9e3] bg-white text-[#122640] hover:border-[#329fd2]",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="flex h-11 w-full items-center gap-2 rounded-full border border-[#cfd9e3] bg-white pl-4 pr-1.5 focus-within:border-[#329fd2] lg:max-w-[17.5rem]">
              <Search className="h-4 w-4 flex-none text-[#1a7cb0]" aria-hidden="true" />
              <label htmlFor="guide-search" className="sr-only">
                Search the guides
              </label>
              <input
                id="guide-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides"
                className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm text-[#122640] outline-none placeholder:text-[#6b7a8c] [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[#3a4656] hover:bg-[#eef2f6]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p aria-live="polite" className="text-sm text-[#5b6778]">
              Showing {countLabel}
            </p>
            {filtered ? (
              <button type="button" onClick={viewAll} className="text-sm font-bold text-[#1a7cb0] hover:text-[#122640]">
                View all guides <span aria-hidden="true">→</span>
              </button>
            ) : null}
          </div>

          {visible.length ? (
            <>
              <ul ref={listRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((card, i) => (
                  <li key={card.slug} hidden={i >= shown} className="flex [&[hidden]]:hidden">
                    <GuideCard card={card} />
                  </li>
                ))}
              </ul>
              <div ref={sentinel} aria-hidden="true" className="h-px" />
              {autoLoaded && more > 0 ? (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={loadMore}
                    className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] border-[1.5px] border-[#122640] bg-white px-7 text-[0.9375rem] font-semibold text-[#122640] transition-colors duration-200 hover:bg-[#122640] hover:text-white"
                  >
                    Load more guides
                    <span className="text-sm font-medium opacity-70">({more} more)</span>
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[#cfd9e3] px-6 py-14 text-center">
              <p className="text-lg font-bold text-[#122640]">No guide matches that yet.</p>
              <button type="button" onClick={viewAll} className="text-sm font-bold text-[#1a7cb0] hover:underline">
                View all guides →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function GuideCard({ card }: { card: BlogCard }) {
  return (
    <Link
      href={`/blog/${card.slug}/`}
      className="group flex flex-1 flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#329fd2] hover:shadow-[0_18px_36px_-28px_rgba(18,38,64,0.45)]"
    >
      <div className="aspect-[16/9] bg-[#1b3350]">
        {card.image ? (
          <Image
            src={card.image.src}
            alt=""
            aria-hidden="true"
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-[1.375rem] pb-6 pt-5">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1a7cb0]">{card.category}</p>
        <h2 className="text-pretty text-[1.1875rem] font-bold leading-[1.35] text-[#122640]">{card.title}</h2>
        <p className="line-clamp-3 text-[0.9375rem] leading-[1.65] text-[#3a4656]">{card.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[#eef2f6] pt-3.5">
          <span className="text-[0.8125rem] text-[#5b6778]">
            <time dateTime={card.published}>{card.publishedLabel}</time> · {card.readLabel}
          </span>
          <span className="text-sm font-bold text-[#1a7cb0]">
            Read guide{" "}
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
