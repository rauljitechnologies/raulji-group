import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  ExternalLink,
  ListChecks,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";

import { ArticleBody } from "@/components/blog/article-body";
import { RichText } from "@/components/blog/rich-text";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { Section, SectionHeading } from "@/components/ui/section";
import { blogImage } from "@/lib/blog/images";
import { formatArticleDate, getRelated, tableOfContents, type Article } from "@/lib/blog";
import {
  abs,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  personSchema,
  type Crumb,
} from "@/lib/schema";
import { ogImageUrl } from "@/lib/seo";

/**
 * A guide from the 2026 Business Guide Series.
 *
 * Reading order is the shape of the page: what the article covers, then the
 * direct answer, then the body, then the questions people actually ask, then
 * the sources behind the factual claims, then where to go next. The contents
 * list sits in a sticky rail from lg up and collapses to nothing on a phone,
 * where it would push the first paragraph off the screen.
 *
 * The contact details come from the article's own author record rather than
 * from SITE, because the insurance guide carries a different name and a
 * different number by instruction.
 */
export function ArticlePage({ article }: { article: Article }) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: article.title, path: `/blog/${article.slug}/` },
  ];

  const image = blogImage(article.image);
  const contents = tableOfContents(article);
  const related = getRelated(article);
  const telHref = `tel:${article.author.phone.e164}`;

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          articleSchema({
            title: article.title,
            description: article.metaDescription,
            slug: article.slug,
            published: article.published,
            updated: article.updated,
            image: image ? abs(image.src.src) : ogImageUrl(article.title),
            author: article.author.name === "Raulji Group" ? "organization" : "chairman",
            category: article.category,
            keywords: [article.primaryKeyword, ...article.secondaryKeywords],
          }),
          // The FAQ questions below are visible on the page, which is the
          // condition attached to this rich result. Both are built from the
          // same `faqs` array, so they cannot drift apart.
          faqSchema(article.faqs),
          ...(article.author.name === "Raulji Group" ? [] : [personSchema()]),
        )}
      />

      <header className="border-b border-border bg-muted">
        <div className="container-wide py-10 md:py-14">
          <Breadcrumbs crumbs={crumbs} inline />

          <div className="mt-6 max-w-3xl">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold uppercase tracking-wider text-primary">
              <Link href="/blog/" className="hover:underline">
                {article.category}
              </Link>
              <span aria-hidden="true" className="text-border">
                /
              </span>
              {/* The series month is an editorial position, not a publication
                  date, and it is labelled as one. The real date is below. */}
              <span className="font-medium text-muted-foreground">
                2026 Business Guide Series: {article.seriesMonth}
              </span>
            </p>

            <h1 className="mt-4 text-[1.875rem] leading-[1.2] md:text-4xl md:leading-[1.15] lg:text-[2.75rem] lg:leading-[1.12]">
              {article.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" aria-hidden="true" />
                {article.author.name}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                Published{" "}
                <time dateTime={article.published}>{formatArticleDate(article.published)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                {article.readMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container-wide py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
          <article className="min-w-0 max-w-[46rem]">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 1024px) 46rem, 100vw"
                priority
                placeholder="blur"
                className="w-full rounded-2xl border border-border"
              />
            ) : null}

            {/* SXO: say what the reader is about to get before they scroll. */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                What this article covers
              </h2>
              <ul className="mt-4 space-y-2">
                {article.covers.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-[0.5625rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The direct answer, above the fold on a phone and quotable. */}
            <section
              aria-labelledby="key-takeaway"
              className="mt-8 rounded-2xl border-l-4 border-primary bg-accent/60 p-5 sm:p-6"
            >
              <h2
                id="key-takeaway"
                className="text-sm font-semibold uppercase tracking-wider text-primary"
              >
                {article.keyTakeaway.heading}
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-[1.7] text-secondary">
                <RichText text={article.keyTakeaway.body} />
              </p>
              {article.keyTakeaway.points?.length ? (
                <ul className="mt-4 space-y-2.5 border-t border-primary/20 pt-4">
                  {article.keyTakeaway.points.map((point, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed text-secondary/85">
                      <span
                        aria-hidden="true"
                        className="mt-[0.5625rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>
                        <RichText text={point} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>

            <ArticleBody blocks={article.body} />

            <section aria-labelledby="faqs" className="mt-14 border-t border-border pt-10">
              <h2 id="faqs" className="text-2xl md:text-[1.75rem]">
                Frequently asked questions
              </h2>
              <FaqAccordion
                faqs={article.faqs}
                idPrefix={`${article.slug}-faq`}
                className="mt-6 max-w-none"
              />
            </section>

            {article.sources.length ? (
              <section aria-labelledby="sources" className="mt-12 border-t border-border pt-8">
                <h2
                  id="sources"
                  className="text-sm font-semibold uppercase tracking-wider text-primary"
                >
                  Sources
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Official sources for the regulatory statements in this article. Each one notes
                  what it supports, so a claim can be checked against it.
                </p>
                <ul className="mt-4 space-y-3">
                  {article.sources.map((source) => (
                    <li key={source.url + source.label} className="text-sm leading-relaxed">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                      >
                        {source.label}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </a>
                      <span className="block text-muted-foreground">{source.supports}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {article.disclaimer ? (
              <p className="mt-8 rounded-xl border border-border bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-secondary">Disclaimer. </span>
                {article.disclaimer}
              </p>
            ) : null}

            {/* Byline block. One factual line of context, never a fabricated
                biography, and the contact number this article was assigned. */}
            <section
              aria-labelledby="author"
              className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6"
            >
              <h2 id="author" className="text-sm font-semibold uppercase tracking-wider text-primary">
                Written by
              </h2>
              <p className="mt-2 text-lg font-bold text-secondary">{article.author.name}</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">{article.author.context}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <a
                  href={telHref}
                  className="link-target inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {article.author.phone.display}
                </a>
                <Link
                  href="/contact/"
                  className="link-target inline-flex items-center gap-1.5 font-semibold text-secondary hover:text-primary"
                >
                  Contact Raulji Group
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </section>
          </article>

          {/* Contents rail. Hidden below lg, where it would sit between the
              reader and the first paragraph without earning the space. */}
          {contents.length ? (
            <aside className="hidden lg:block">
              {/* top-32 matches the 8rem `scroll-padding-top` in globals.css:
                  both clear the 109px sticky header with room to spare, where
                  the old top-28 left the rail 3px under it. */}
              <nav aria-label="On this page" className="sticky top-32">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  <ListChecks className="h-4 w-4" aria-hidden="true" />
                  On this page
                </p>
                <ol className="mt-4 space-y-1 border-l border-border">
                  {contents.map((entry) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {entry.text}
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 rounded-2xl border border-primary/25 bg-accent/50 p-5">
                  <p className="text-sm font-semibold leading-snug text-secondary">
                    Have a question about your own situation?
                  </p>
                  <a
                    href={telHref}
                    className="mt-3 flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {article.author.phone.display}
                  </a>
                  <Link
                    href="/contact/"
                    className="mt-2 flex min-h-[2.75rem] items-center justify-center rounded-xl border border-primary px-4 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Talk to an Expert
                  </Link>
                </div>
              </nav>
            </aside>
          ) : null}
        </div>
      </div>

      {/* Where to go next on the site. Named per article rather than generated,
          so nothing here is a link for the sake of a link. */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Next steps"
          title="Pages that go further on this"
          align="left"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {article.services.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-5"
              >
                <span className="font-bold text-secondary">{service.label}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.blurb}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Open
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {related.length ? (
        <Section>
          <SectionHeading
            eyebrow="Related reading"
            title="More from the 2026 Business Guide Series"
            align="left"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.slug}>
                <RelatedCard article={item} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Article-specific CTA, carrying this article's own contact number. */}
      <section className="bg-background pb-16 pt-4 md:pb-20 md:pt-8">
        <div className="container-wide">
          <div className="rounded-3xl border border-primary/25 bg-accent/50 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-14">
              <div>
                <h2 className="text-2xl leading-[1.25] md:text-3xl md:leading-[1.2]">
                  {article.cta.title}
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  {article.cta.body}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:w-[17rem]">
                <Link
                  href="/contact/"
                  className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-soft transition-shadow hover:shadow-elevated"
                >
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={`https://wa.me/${article.author.phone.e164.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-primary bg-card px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
                <p className="mt-1 text-center text-sm text-muted-foreground">
                  Or call{" "}
                  <a
                    href={telHref}
                    className="whitespace-nowrap font-semibold text-secondary hover:text-primary hover:underline"
                  >
                    {article.author.phone.display}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RelatedCard({ article }: { article: Article }) {
  const image = blogImage(article.image);
  return (
    <Link
      href={`/blog/${article.slug}/`}
      className="hover-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      {image ? (
        <Image
          src={image.src}
          alt=""
          aria-hidden="true"
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
          className="aspect-[16/9] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {article.category}
        </span>
        <span className="mt-2 font-bold leading-snug text-secondary">{article.title}</span>
        <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </span>
        <span className="mt-4 text-sm font-semibold text-primary">Read the guide &rarr;</span>
      </div>
    </Link>
  );
}
