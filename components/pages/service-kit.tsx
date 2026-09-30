import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getArticle } from "@/lib/blog";
import { blogImage } from "@/lib/blog/images";
import type { FAQ } from "@/lib/services";
import type { Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { H1, H2, H2_DARK } from "@/lib/typography";

/**
 * The service-page design system (service-page brief, section 15).
 *
 * Tokens and pieces lifted from the Business Registration pillar, which was the
 * first page built to the "Raulji" design, so the structure pages, the
 * consulting pillar, the services hub and the compact service pages all read as
 * one site: navy hero, 4px controls, 8px cards, one blue accent, a dash before
 * every eyebrow. Colour values are the pillar's, written out rather than mapped
 * to theme tokens, because that is how the pillar and the homepage set them and
 * two sources for the same blue is how they drift.
 */

export const CONTAINER = "mx-auto max-w-[1240px] px-5 sm:px-8";
export const SECTION = "py-16 md:py-24";
export const EYEBROW =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]";
export const EYEBROW_DARK =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]";
export { H2, H2_DARK };
export const CARD = "rounded-lg border border-[#e3e9ef] bg-white";
export const LIFT =
  "transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:border-[#329fd2] hover:shadow-[0_20px_40px_-26px_rgba(18,38,64,0.4)]";

const BTN =
  "inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] px-6 text-[0.9375rem] transition duration-200";
/** Primary on a dark band. */
export const BTN_LIGHT = `${BTN} bg-white font-bold text-[#122640] hover:bg-[#e8f5fb]`;
/** Secondary on a dark band. */
export const BTN_GHOST_DARK = `${BTN} border-[1.5px] border-[#329fd2] font-semibold text-white hover:bg-[#329fd2] hover:text-[#0c1a2d]`;
/** Primary on a light band. */
export const BTN_NAVY = `${BTN} bg-[#122640] font-semibold text-white hover:bg-[#1a7cb0]`;
/** Secondary on a light band. */
export const BTN_OUTLINE = `${BTN} border-[1.5px] border-[#122640] font-semibold text-[#122640] hover:bg-[#122640] hover:text-white`;

export function Dash() {
  return <span className="h-0.5 w-7 flex-none bg-[#329fd2]" aria-hidden="true" />;
}

export function SectionHead({
  eyebrow,
  title,
  id,
  lead,
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  id: string;
  lead?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("grid items-end gap-x-16 gap-y-4 lg:grid-cols-2", className)}>
      <div className="flex min-w-0 flex-col gap-3.5">
        <p className={dark ? EYEBROW_DARK : EYEBROW}>
          <Dash />
          {eyebrow}
        </p>
        <h2 id={id} className={dark ? H2_DARK : H2}>
          {title}
        </h2>
      </div>
      {lead ? (
        <p
          className={cn(
            "max-w-[32rem] text-base leading-[1.7] lg:justify-self-end",
            dark ? "text-[#c9d6e3]" : "text-[#4a5668]",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Service hero (brief section 7): breadcrumb, category label, H1, a short
 * value proposition and two actions on the left; a large image on the right.
 * Nothing else goes in it. Pricing, timelines and definitions all have their
 * own sections below, where they can be read properly.
 */
export function ServiceHero({
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  media,
  footnote,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  actions: React.ReactNode;
  media?: React.ReactNode;
  footnote?: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="service-h1"
      className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(50,159,210,0.26),rgba(50,159,210,0)_65%)]"
      />
      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 md:gap-12 md:pb-20 md:pt-8">
        <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
          <Breadcrumbs crumbs={crumbs} inline />
        </div>
        <div
          className={cn(
            "grid items-center gap-10 lg:gap-16",
            media ? "lg:grid-cols-[1.05fr_1fr]" : "max-w-3xl",
          )}
        >
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW_DARK}>
              <Dash />
              {eyebrow}
            </p>
            <h1
              id="service-h1"
              className={`${H1} text-white`}
            >
              {title}
            </h1>
            <p className="max-w-[36rem] text-pretty text-base leading-[1.75] text-[#c9d6e3] sm:text-lg/[1.75]">
              {lead}
            </p>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
            {footnote ? <div className="text-sm text-[#9fb3c8]">{footnote}</div> : null}
          </div>
          {media ? <div className="min-w-0">{media}</div> : null}
        </div>
      </div>
    </section>
  );
}

/**
 * FAQ list. Native details/summary, so it opens with the keyboard and works
 * without JavaScript. Every question here is also in the FAQPage schema, and
 * nothing is in the schema that is not visible here.
 */
export function FaqList({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="flex min-w-0 flex-col border-t border-[#dde4ec]">
      {faqs.map((item) => (
        <details key={item.q} className="group border-b border-[#dde4ec]">
          <summary className="flex min-h-[3rem] cursor-pointer list-none items-center justify-between gap-5 rounded-[4px] py-5 transition-colors hover:bg-[#f4fafd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#329fd2] [&::-webkit-details-marker]:hidden">
            <h3 className="text-[1.0625rem] font-semibold leading-[1.4] text-[#122640]">{item.q}</h3>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#cfd9e3] text-[#1a7cb0] transition-transform duration-200 group-open:rotate-45"
            >
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="pb-6 pr-2 text-[0.9375rem] leading-[1.75] text-[#3a4656] sm:pr-12">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

/**
 * Related guides with their featured image. Slugs that do not resolve are
 * dropped, so a renamed article cannot leave a dead card behind. The image is
 * decorative here: the card's title already says what the guide is.
 */
export function GuideCards({ slugs }: { slugs: string[] }) {
  const articles = slugs
    .map((slug) => getArticle(slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));
  if (!articles.length) return null;

  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {articles.map((article) => {
        const image = blogImage(article.image);
        return (
          <li key={article.slug} className="flex">
            <Link
              href={`/blog/${article.slug}/`}
              className={`flex flex-1 flex-col overflow-hidden ${CARD} ${LIFT}`}
            >
              {image ? (
                <Image
                  src={image.src}
                  alt=""
                  sizes="(min-width: 768px) 24rem, 100vw"
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : null}
              <span className="flex flex-1 flex-col gap-2.5 p-6">
                <span className="text-xs font-bold uppercase tracking-[0.06em] text-[#1a7cb0]">
                  {article.category}
                </span>
                <span className="text-lg font-bold leading-[1.35] text-[#122640]">
                  {article.title}
                </span>
                <span className="flex-1 text-sm leading-[1.6] text-[#4a5668]">
                  {article.excerpt}
                </span>
                <span className="text-sm font-bold text-[#1a7cb0]">
                  Read the guide <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
