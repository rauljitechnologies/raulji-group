import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Clock, User } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getPostBySlug, getPublishedPosts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.meta_title ?? post.title;
  return pageMeta({
    title,
    description: post.meta_description ?? post.excerpt ?? "",
    path: `/blog/${post.slug}/`,
    ogHeadline: post.title,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: `/blog/${post.slug}/` },
  ];

  const published = new Date(post.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          articleSchema({
            title: post.title,
            description: post.meta_description ?? post.excerpt ?? "",
            slug: post.slug,
            published: post.created_at,
            updated: post.updated_at,
          }),
        )}
      />
      <PageHeader crumbs={crumbs} eyebrow={post.category ?? undefined} title={post.title} />

      <article className="container-wide py-12 md:py-16">
        <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-5 border-b border-border pb-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4" aria-hidden="true" />
            {post.author ?? "Raulji Group"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <time dateTime={post.created_at}>{published}</time>
          </span>
          {post.read_time ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.read_time}
            </span>
          ) : null}
        </div>

        {post.excerpt ? (
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        ) : null}

        {post.content ? (
          <div className="prose prose-slate mt-8 max-w-none prose-headings:text-secondary prose-a:text-primary">
            {post.content.split(/\n{2,}/).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        ) : null}

          <p className="mt-12 border-t border-border pt-8">
            <Link href="/blog/" className="font-semibold text-primary hover:underline">
              &larr; Back to all posts
            </Link>
          </p>
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
