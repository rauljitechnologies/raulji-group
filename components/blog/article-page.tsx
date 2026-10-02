import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Phone } from "lucide-react";

import { ArticleBody } from "@/components/blog/article-body";
import { HealthInsuranceCta } from "@/components/blog/health-insurance-cta";
import { RichText } from "@/components/blog/rich-text";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { blogImage } from "@/lib/blog/images";
import { ARTICLES, formatArticleDate, getRelated, tableOfContents, type Article } from "@/lib/blog";
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
import { LEADERSHIP, SITE, whatsappHref } from "@/lib/site";
import chairmanPhoto from "@/public/leadership/dharmendrasinh-raulji.jpg";
import ctaPhoto from "@/public/photos/faqs/cta.webp";

/**
 * An article, laid out to the "Raulji Blog Detail" design (claude.ai/design).
 *
 * Reading order is the design's: a pale header band with the breadcrumb,
 * category, title, standfirst and byline; the featured image; then the body in
 * a 740px column beside a sticky contents rail; then the questions, further
 * reading and a closing call to action. The site header, footer and mobile
 * bar are the site-wide ones.
 *
 * Where the design's sample content would have been invented here it is left
 * out or replaced with the article's own data: the byline is the article's real
 * author (the business guides are by Raulji Group, not by a person), the image
 * is the article's own rather than a stock photograph, there are no keyword
 * "tags", and the rail card makes no promise about call length. The image keeps
 * its 16:9 frame because the artwork carries type that a 21:9 crop would cut.
 *
 * Health insurance articles close on the health insurance route (Dharmendrasinh
 * Raulji, by WhatsApp or phone); every other article closes on the group route.
 */

const H2_SECTION =
  "text-balance text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#122640] md:text-[2.5rem]";

export function ArticlePage({ article }: { article: Article }) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    ...(article.parent ? [{ name: article.parent.label, path: `/blog/${article.parent.slug}/` }] : []),
    { name: article.title, path: `/blog/${article.slug}/` },
  ];

  const image = blogImage(article.image);
  const contents = tableOfContents(article);
  const related = getRelated(article).slice(0, 3);
  const isPerson = article.author.name !== SITE.name;
  const telHref = `tel:${article.author.phone.e164}`;
  const healthCta = article.healthCta
    ? { location: article.healthCta.location, trackingLabel: `health_insurance_${article.slug}` }
    : undefined;

  // The series position, counted from the editorial order in lib/blog.
  const series = ARTICLES.filter((a) => a.seriesMonth);
  const part = series.findIndex((a) => a.slug === article.slug) + 1;

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
            author: isPerson ? "chairman" : "organization",
            category: article.category,
            keywords: [article.primaryKeyword, ...article.secondaryKeywords],
          }),
          // The FAQ questions below are visible on the page, which is the
          // condition attached to this rich result. Both are built from the
          // same `faqs` array, so they cannot drift apart.
          faqSchema(article.faqs),
          ...(isPerson ? [personSchema()] : []),
        )}
      />

      <article className="bg-white text-[#3a4656]">
        {/* Header band. */}
        <header className="border-b border-[#e3e9ef] bg-[#f4f7fa] pt-[5.5rem] sm:pt-24">
          <div className="mx-auto flex max-w-[55rem] flex-col gap-6 px-5 pb-10 pt-6 sm:px-8 md:pb-16 md:pt-8">
            <div className="text-[0.8125rem] [&_a]:text-[#5b6778] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-[#122640]">
              <Breadcrumbs crumbs={crumbs} inline />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em]">
              <Link
                href="/blog/"
                className="rounded-full border border-[#bcd9ea] bg-white px-3 py-1.5 text-[#1a7cb0] transition-colors duration-200 hover:border-[#329fd2] hover:text-[#122640]"
              >
                {article.category}
              </Link>
              {/* An editorial position, not a publication date; the real
                  date is in the byline below. */}
              {part > 0 ? (
                <span className="text-[#5b6778]">
                  Part {part} of the 2026 Guide Series
                </span>
              ) : null}
            </div>

            <h1 className="text-balance text-[2.125rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#122640] md:text-5xl lg:text-[3.5rem]">
              {article.title}
            </h1>

            <p className="text-pretty text-[1.0625rem] leading-[1.7] text-[#3a4656] md:text-[1.1875rem]">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-[#dde4ec] pt-5">
              <div className="flex items-center gap-3">
                <AuthorMark isPerson={isPerson} size={44} />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-bold text-[#122640]">{article.author.name}</p>
                  <p className="text-[0.8125rem] text-[#5b6778]">
                    {isPerson ? LEADERSHIP.chairman.roles[0] : `${SITE.locality}, ${SITE.region}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-[#5b6778]">
                <p>
                  Published <time dateTime={article.published}>{formatArticleDate(article.published)}</time>
                </p>
                {article.updated !== article.published ? (
                  <p>
                    Updated <time dateTime={article.updated}>{formatArticleDate(article.updated)}</time>
                  </p>
                ) : null}
                <p>{article.readMinutes} min read</p>
              </div>
            </div>
          </div>
        </header>

        {/* Featured image. */}
        {image ? (
          <div className="mx-auto max-w-[1240px] px-5 pt-7 sm:px-8 md:pt-12">
            <Image
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1080px) 1016px, calc(100vw - 2.5rem)"
              priority
              placeholder="blur"
              className="mx-auto w-full max-w-[63.5rem] rounded-lg"
            />
          </div>
        ) : null}

        {/* Contents rail and body. */}
        <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-5 py-10 sm:px-8 md:py-[4.5rem] xl:flex-row xl:items-start xl:gap-20">
          {contents.length ? (
            <aside aria-label="On this page" className="min-w-0 xl:sticky xl:top-28 xl:w-[16.25rem] xl:flex-none">
              {/* A collapsed list below xl, so it does not push the first
                  paragraph off a phone screen; open beside the text above. */}
              <details className="group rounded-lg border border-[#e3e9ef] xl:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-xs font-bold uppercase tracking-[0.12em] text-[#1a7cb0] [&::-webkit-details-marker]:hidden">
                  On this page
                  <span aria-hidden="true" className="text-lg leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <TocLinks contents={contents} className="px-4 pb-4" />
              </details>

              <div className="hidden flex-col gap-6 xl:flex">
                <nav className="flex flex-col gap-1">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1a7cb0]">On this page</p>
                  <TocLinks contents={contents} />
                </nav>
                {!healthCta ? (
                  <div className="flex flex-col gap-3 rounded-lg border border-[#e3e9ef] bg-white p-5">
                    <p className="text-[0.9375rem] font-bold leading-snug text-[#122640]">
                      Have a question about your own situation?
                    </p>
                    <p className="text-sm leading-[1.6]">
                      Tell us what you are setting up and we will point you to the structure and process that fits.
                    </p>
                    <TrackedLink
                      href="/contact/"
                      event="primary_cta_click"
                      params={{ label: `blog_rail_${article.slug}` }}
                      className="rounded-[4px] bg-[#122640] px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1a7cb0]"
                    >
                      Talk to an Expert <span aria-hidden="true">→</span>
                    </TrackedLink>
                  </div>
                ) : null}
              </div>
            </aside>
          ) : null}

          <div className="flex min-w-0 max-w-[46.25rem] flex-1 flex-col gap-[1.375rem]">
            {/* The direct answer, above the fold and quotable. */}
            <section aria-labelledby="key-takeaway" className="flex flex-col gap-3 rounded-lg bg-[#f4f7fa] px-5 py-6 sm:px-7">
              <h2 id="key-takeaway" className="text-xs font-bold uppercase tracking-[0.12em] text-[#1a7cb0]">
                {article.keyTakeaway.heading}
              </h2>
              <p className="text-base leading-[1.7] text-[#122640]">
                <RichText text={article.keyTakeaway.body} />
              </p>
              {article.keyTakeaway.points?.length ? (
                <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-[1.65] marker:text-[#329fd2]">
                  {article.keyTakeaway.points.map((point, i) => (
                    <li key={i}>
                      <RichText text={point} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>

            <ArticleBody blocks={article.body} healthCta={healthCta} />

            {/* Where to go next on the site, named per article. */}
            {article.services.length ? (
              <nav aria-labelledby="next-steps" className="mt-6 flex flex-col gap-4 border-t border-[#e3e9ef] pt-8">
                <h2 id="next-steps" className="text-xs font-bold uppercase tracking-[0.12em] text-[#1a7cb0]">
                  Next steps
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {article.services.map((service) => (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        className="group flex h-full flex-col gap-1 rounded-lg border border-[#e3e9ef] px-4 py-3.5 transition-colors duration-200 hover:border-[#329fd2]"
                      >
                        <span className="flex items-center gap-1.5 text-[0.9375rem] font-bold leading-snug text-[#122640]">
                          {service.label}
                          <ArrowRight
                            className="h-3.5 w-3.5 shrink-0 text-[#1a7cb0] transition-transform duration-200 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-sm leading-relaxed">{service.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            {article.sources.length ? (
              <section aria-labelledby="sources" className="flex flex-col gap-3 border-t border-[#e3e9ef] pt-8">
                <h2 id="sources" className="text-xs font-bold uppercase tracking-[0.12em] text-[#1a7cb0]">
                  Sources
                </h2>
                <ul className="flex flex-col gap-3">
                  {article.sources.map((source) => (
                    <li key={source.url + source.label} className="text-sm leading-relaxed">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-[#1a7cb0] hover:underline"
                      >
                        {source.label}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </a>
                      <span className="block text-[#5b6778]">{source.supports}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Byline: one factual line of context, never a fabricated
                biography, and the contact number this article was assigned. */}
            <section
              aria-labelledby="author"
              className="mt-4 flex flex-wrap items-start gap-5 rounded-lg border border-[#e3e9ef] p-6"
            >
              <AuthorMark isPerson={isPerson} size={64} />
              <div className="flex min-w-0 flex-[1_1_18rem] flex-col gap-1.5">
                <h2 id="author" className="text-xs font-bold uppercase tracking-[0.12em] text-[#1a7cb0]">
                  Written by
                </h2>
                <p className="text-[1.0625rem] font-bold text-[#122640]">{article.author.name}</p>
                <p className="text-[0.9375rem] leading-[1.65]">{article.author.context}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <a href={telHref} className="link-target gap-2 font-semibold text-[#1a7cb0] hover:underline">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {article.author.phone.display}
                  </a>
                  {isPerson ? (
                    <Link href="/team/" className="link-target gap-1.5 font-semibold text-[#122640] hover:text-[#1a7cb0]">
                      About {article.author.name.split(" ")[0]}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ) : (
                    <Link href="/about/" className="link-target gap-1.5 font-semibold text-[#122640] hover:text-[#1a7cb0]">
                      About Raulji Group
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </section>

            {article.disclaimer ? (
              <p className="text-[0.8125rem] leading-[1.6] text-[#5b6778]">{article.disclaimer}</p>
            ) : null}
          </div>
        </div>
      </article>

      {/* Questions. Native details: keyboard and screen-reader correct with no
          script, and every answer stays in the HTML for the FAQPage schema. */}
      {article.faqs.length ? (
        <section aria-labelledby="faqs" className="bg-[#f4f7fa] py-14 md:py-24">
          <div className="mx-auto flex max-w-[55rem] flex-col gap-7 px-5 sm:px-8">
            <h2 id="faqs" className={H2_SECTION}>
              Common questions
            </h2>
            <div className="flex flex-col border-t border-[#dde4ec]">
              {article.faqs.map((faq, i) => (
                <details key={faq.q} id={`faq-${i + 1}`} className="group border-b border-[#dde4ec]">
                  <summary className="group/q flex cursor-pointer list-none items-center justify-between gap-5 py-[1.375rem] [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[1.0625rem] font-semibold leading-[1.4] text-[#122640] transition-colors duration-200 group-hover/q:text-[#1a7cb0]">{faq.q}</h3>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#cfd9e3] bg-white text-lg text-[#1a7cb0] transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-6 pr-0 text-[0.9375rem] leading-[1.75] text-[#3a4656] sm:pr-12">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section aria-labelledby="rel-h" className="py-14 md:py-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <h2 id="rel-h" className={H2_SECTION}>
                Keep reading
              </h2>
              <Link href="/blog/" className="text-[0.9375rem] font-bold text-[#1a7cb0] hover:text-[#122640] hover:underline">
                All business guides <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="flex">
                  <RelatedCard article={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {healthCta ? (
        <HealthInsuranceCta variant="final" location={healthCta.location} trackingLabel={healthCta.trackingLabel} />
      ) : (
        <section aria-labelledby="cta-h" className="px-5 pb-14 sm:px-8 md:pb-24">
          <div className="cta-reveal relative mx-auto max-w-[1240px] overflow-hidden rounded-lg bg-[#0c1a2d] text-white">
            <Image src={ctaPhoto} alt="" aria-hidden="true" fill sizes="(min-width: 1240px) 1240px, 100vw" className="object-cover" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,26,45,.95)_0%,rgba(12,26,45,.86)_55%,rgba(12,26,45,.5)_100%)]"
            />
            <div className="relative flex max-w-[40rem] flex-col gap-4 px-7 py-10 sm:px-14 md:py-[4.5rem]">
              <h2 id="cta-h" className="text-balance text-[1.75rem] font-bold text-white leading-[1.1] tracking-[-0.02em] md:text-[2.625rem]">
                {article.cta.title}
              </h2>
              <p className="text-base leading-[1.7] text-[#d5e0ea]">{article.cta.body}</p>
              <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  href="/contact/"
                  event="primary_cta_click"
                  params={{ label: `blog_footer_${article.slug}` }}
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition-colors duration-200 hover:bg-[#e8f5fb]"
                >
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href={whatsappHref(`Hello Raulji Group, I have read "${article.title}" and have a question.`)}
                  external
                  event="whatsapp_click"
                  params={{ label: `blog_footer_${article.slug}` }}
                  className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-6 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-[#329fd2] hover:text-[#0c1a2d]"
                >
                  WhatsApp Us
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function TocLinks({ contents, className }: { contents: { id: string; text: string }[]; className?: string }) {
  return (
    <ol className={className}>
      {contents.map((entry) => (
        <li key={entry.id}>
          <a
            href={`#${entry.id}`}
            className="block border-l-2 border-[#e3e9ef] py-2 pl-3.5 text-sm leading-[1.45] text-[#3a4656] transition-colors duration-200 hover:border-[#329fd2] hover:text-[#122640]"
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** The author's photograph, or the group mark for articles by Raulji Group. */
function AuthorMark({ isPerson, size }: { isPerson: boolean; size: number }) {
  return isPerson ? (
    <Image
      src={chairmanPhoto}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      sizes={`${size}px`}
      className="flex-none rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <Image
      src="/favicon.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="flex-none rounded-full"
      style={{ width: size, height: size }}
    />
  );
}

function RelatedCard({ article }: { article: Article }) {
  const image = blogImage(article.image);
  return (
    <Link
      href={`/blog/${article.slug}/`}
      className="flex flex-1 flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-white transition-colors duration-200 hover:border-[#329fd2]"
    >
      {image ? (
        <Image
          src={image.src}
          alt=""
          aria-hidden="true"
          sizes="(min-width: 768px) 24rem, 100vw"
          className="aspect-[16/9] w-full bg-[#1b3350] object-cover"
        />
      ) : null}
      <div className="flex flex-col gap-2.5 px-[1.375rem] pb-6 pt-5">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1a7cb0]">{article.category}</p>
        <h3 className="text-pretty text-lg font-bold leading-[1.35] text-[#122640]">{article.title}</h3>
        <p className="text-[0.8125rem] text-[#5b6778]">{article.readMinutes} min read</p>
      </div>
    </Link>
  );
}
