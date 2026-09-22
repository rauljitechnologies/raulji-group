import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";
import { getArticle } from "@/lib/blog";
import { blogImage } from "@/lib/blog/images";

/**
 * Guides promoted from a pillar page back into the blog.
 *
 * The internal link plan runs both ways: the guides link down into the service
 * pages, and the pillars link back up to the guides that actually help someone
 * on that page. Placement is deliberate rather than automatic. A pillar names
 * the two or three guides worth reading from there, and nothing more, because
 * a block that links to all nine from everywhere is a sitemap, not a
 * recommendation.
 *
 * Slugs that do not resolve are dropped, so a renamed article cannot leave a
 * dead link behind on a service page.
 */
export function GuideLinks({
  slugs,
  title = "Guides worth reading first",
  eyebrow = "From the blog",
  lead,
  tone = "muted",
}: {
  slugs: string[];
  title?: string;
  eyebrow?: string;
  lead?: string;
  tone?: "default" | "muted";
}) {
  const articles = slugs
    .map((slug) => getArticle(slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));

  if (!articles.length) return null;

  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} align="left" />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const image = blogImage(article.image);
          return (
            <li key={article.slug}>
              <Link
                href={`/blog/${article.slug}/`}
                className="hover-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                {image ? (
                  <Image
                    src={image.src}
                    alt=""
                    aria-hidden="true"
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
                    className="aspect-[16/9] w-full object-cover"
                  />
                ) : null}
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {article.category}
                  </span>
                  <span className="mt-2 font-bold leading-snug text-secondary">
                    {article.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read the guide
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
