"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { CalendarDays, Clock, Search, X } from "lucide-react";

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
  haystack: string;
}

/**
 * The listing: category filter, search, and the grid.
 *
 * A client component for the filtering only. Every card is a plain link and
 * the whole set is in the initial HTML, so the page is complete and crawlable
 * before any JavaScript runs; the filter narrows what is already there rather
 * than fetching anything.
 */
export function BlogIndex({
  articles,
  categories,
}: {
  articles: BlogCard[];
  categories: string[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const leadSlug = articles[0]?.slug;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((article) => {
      if (category && article.category !== category) return false;
      if (!q) return true;
      return article.haystack.includes(q);
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          <FilterChip active={category === null} onClick={() => setCategory(null)}>
            All guides
          </FilterChip>
          {categories.map((item) => (
            <FilterChip
              key={item}
              active={category === item}
              onClick={() => setCategory(category === item ? null : item)}
            >
              {item}
            </FilterChip>
          ))}
        </div>

        <div className="relative lg:w-72 lg:shrink-0">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor="blog-search" className="sr-only">
            Search the guides
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the guides..."
            className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-10 text-sm text-secondary placeholder:text-muted-foreground focus-visible:border-primary"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-secondary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>
      </div>

      <p aria-live="polite" className="mt-5 text-sm text-muted-foreground">
        {visible.length === articles.length
          ? `${articles.length} guides`
          : `${visible.length} of ${articles.length} guides`}
        {category ? ` in ${category}` : ""}
      </p>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <p className="font-semibold text-secondary">Nothing matched that.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Try a different term, or clear the filters to see every guide. If you have a specific
            question,{" "}
            <Link href="/contact/" className="font-semibold text-primary hover:underline">
              ask us directly
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <li key={article.slug}>
              {/*
                The first card of the unfiltered set loads eagerly. The promoted
                article above this listing used to be the page's largest
                contentful paint and carried `priority`; with it gone, the lead
                card's image is what the browser paints first, and without this
                it would be lazily fetched like the eight below it.

                Keyed to the first article rather than to the first visible one
                so filtering does not move `priority` onto a different image
                mid-session, which would start a fresh high-priority fetch every
                time a chip is pressed.
              */}
              <ArticleCard article={article} priority={article.slug === leadSlug} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-[2.5rem] items-center rounded-xl border px-4 text-sm font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-secondary hover:border-primary/50 hover:bg-accent/50",
      )}
    >
      {children}
    </button>
  );
}

function ArticleCard({ article, priority }: { article: BlogCard; priority?: boolean }) {
  return (
    <article className="hover-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {article.image ? (
        <Link href={`/blog/${article.slug}/`} tabIndex={-1} aria-hidden="true">
          <Image
            src={article.image.src}
            alt=""
            sizes="(min-width: 1024px) 24rem, (min-width: 768px) 45vw, 100vw"
            priority={priority}
            placeholder="blur"
            className="aspect-[16/9] w-full object-cover"
          />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {article.category}
        </p>
        <h3 className="mt-2 text-lg leading-snug">
          <Link href={`/blog/${article.slug}/`} className="hover:text-primary">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={article.published}>{article.publishedLabel}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {article.readLabel}
          </span>
          {article.seriesMonth ? (
            <span className="rounded-md bg-muted px-2 py-0.5 font-medium">
              {article.seriesMonth}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
