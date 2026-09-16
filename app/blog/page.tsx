import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getPublishedPosts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";
import { SITE, telHref } from "@/lib/site";

// Rebuild hourly so new posts appear without a redeploy.
export const revalidate = 3600;

export const metadata = pageMeta({
  title: "Business Registration Blog | Raulji Group",
  description:
    "Notes on choosing a business structure, company and LLP registration, documents, process and compliance in India, from the Raulji Group team.",
  path: "/blog/",
  ogHeadline: "Notes on registering and running a business",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog/" },
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Blog"
        title="Notes on registering and running a business"
        lead="Practical writing on business structures, registration and the obligations that follow, from the people who handle the filings."
      />

      <Section>
        {posts.length === 0 ? (
          /* Nothing published yet, so the block sends people to the pages that
             do answer the question instead of sitting as a centred card alone
             in the middle of the page. */
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl">No posts published yet</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              We are working on the first set of guides. In the meantime the service pages cover
              process, documents and costs in detail, and you can call{" "}
              <a href={telHref} className="font-semibold text-primary hover:underline">
                {SITE.phone.display}
              </a>{" "}
              with a specific question.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/services/business-registration/", label: "Business Registration" },
                { href: "/compare/", label: "Compare the four structures" },
                { href: "/faqs/", label: "Frequently asked questions" },
                { href: "/services/business-consulting/", label: "Business Consulting" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-[3.25rem] items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:bg-accent"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <article className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  {post.category ? (
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {post.category}
                    </p>
                  ) : null}
                  <h2 className="mt-2 text-lg">
                    <Link href={`/blog/${post.slug}/`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                    </span>
                    {post.read_time ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.read_time}
                      </span>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CtaBanner />
    </>
  );
}
