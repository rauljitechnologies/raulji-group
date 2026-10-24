import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { SECONDARY_SERVICES } from "@/lib/secondary-services";
import { CITIES } from "@/lib/cities";
import { getCityServiceParams } from "@/lib/city-services";
import { getPublishedPosts } from "@/lib/content";
import { ARTICLES, ARTICLE_SLUGS } from "@/lib/blog";
import manifest from "@/lib/generated/sitemap-manifest.json";

export const revalidate = 3600;

/**
 * The sitemap: one file at /sitemap.xml, assembled without a hand-maintained
 * URL list.
 *
 *  - Static pages come from lib/generated/sitemap-manifest.json, which
 *    scripts/gen-sitemap-manifest.mjs builds from app/ before every build. A
 *    new page.tsx is included automatically; one marked `noindex` is not.
 *  - Data-driven pages (services, cities, city + service, articles) are
 *    expanded from the same data that generates them, so a new entry there is
 *    included automatically too.
 *  - Every lastModified is a real date: the last commit to the files a page's
 *    content comes from, an article's `updated` date, or a Supabase post's
 *    `updated_at`. Nothing is stamped with the time the sitemap was built.
 *
 * Every URL here is a 200 with a self-referencing canonical and trailing slash.
 * Discontinued URLs are absent because their pages are gone: /rentals/ and
 * /services/land-investment/ are route handlers returning 410, not pages.
 *
 * One flat sitemap, by client instruction of 2026-10-24. This was previously
 * split by `generateSitemaps()` into /sitemap/core.xml, /sitemap/services.xml,
 * /sitemap/locations.xml and /sitemap/blog.xml, with a hand-written index
 * route at /sitemap.xml, because technical audit TF-04 wanted Search Console
 * to report index coverage per group. At ~100 URLs the split was never about
 * the 50,000-URL limit, and the sitemaps protocol does not require an index
 * below that, so a single file is valid and is what the client asked for.
 *
 * What the change costs, recorded so the decision is not lost: Search Console
 * now reports coverage for the whole site in one row, so a figure like
 * "Discovered - currently not indexed: 37" no longer says which kind of page
 * is being skipped. If that question comes back, the per-group breakdown is
 * the reason to re-split — not the URL count.
 *
 * The four child URLs 301 to /sitemap.xml (next.config.ts), so the submissions
 * already made in Search Console and Bing do not start answering 404.
 */

type Entry = MetadataRoute.Sitemap[number];
type Freq = NonNullable<Entry["changeFrequency"]>;

/**
 * Priority and change frequency for the static pages that need something
 * other than the default. Consulting is the group's primary focus and
 * registration its main commercial pillar, so both carry the highest
 * priority of any service URL.
 */
const STATIC: Record<string, { changeFrequency: Freq; priority: number }> = {
  "/": { changeFrequency: "weekly", priority: 1 },
  "/services/business-consulting/": { changeFrequency: "monthly", priority: 0.95 },
  "/services/business-registration/": { changeFrequency: "monthly", priority: 0.95 },
  "/gujarat/": { changeFrequency: "monthly", priority: 0.9 },
  "/services/": { changeFrequency: "monthly", priority: 0.8 },
  "/compare/": { changeFrequency: "monthly", priority: 0.8 },
  "/contact/": { changeFrequency: "yearly", priority: 0.8 },
  "/faqs/": { changeFrequency: "monthly", priority: 0.7 },
  "/about/": { changeFrequency: "yearly", priority: 0.6 },
  "/our-clients/": { changeFrequency: "monthly", priority: 0.6 },
  "/blog/": { changeFrequency: "weekly", priority: 0.6 },
  "/team/": { changeFrequency: "monthly", priority: 0.5 },
  "/privacy/": { changeFrequency: "yearly", priority: 0.2 },
  "/terms/": { changeFrequency: "yearly", priority: 0.2 },
  "/disclaimer/": { changeFrequency: "yearly", priority: 0.2 },
};

/** For a page added later and not listed above. */
const DEFAULT_STATIC = { changeFrequency: "monthly" as Freq, priority: 0.6 };

const files = manifest.files as Record<string, string>;
const articleDates = manifest.articles as Record<string, string>;

/** The latest of several dates, ignoring any that are missing. */
function latest(...dates: (string | Date | undefined | null)[]) {
  const times = dates.filter(Boolean).map((d) => new Date(d!).getTime());
  return times.length ? new Date(Math.max(...times)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${SITE.url}${path}`;

  // The guides. An article's date is the later of its editorial `updated`
  // date and its last commit, so an edit counts even if `updated` was not
  // bumped. Higher priority than the legacy posts, because these are the
  // pages built to rank and to carry the internal links into the pillars.
  const guides: Entry[] = ARTICLES.map((article) => ({
    url: url(`/blog/${article.slug}/`),
    lastModified: latest(article.updated, articleDates[article.slug]),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts = await getPublishedPosts();
  const blog: Entry[] = posts
    // A Supabase row sharing a slug with a guide resolves to the guide, so it
    // must not be emitted twice.
    .filter((post) => !ARTICLE_SLUGS.includes(post.slug))
    .map((post) => ({
      url: url(`/blog/${post.slug}/`),
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  // The blog index changes whenever anything it lists changes.
  const newestPost = latest(...guides.map((g) => g.lastModified), ...blog.map((b) => b.lastModified));

  const pages: Entry[] = manifest.routes.map((route) => ({
    url: url(route.path),
    lastModified: route.path === "/blog/" ? latest(route.lastModified, newestPost) : new Date(route.lastModified),
    ...(STATIC[route.path] ?? DEFAULT_STATIC),
  }));

  // Phase 1 focus: the four registration services carry the highest priority.
  const registration: Entry[] = SERVICES.map((service) => ({
    url: url(service.path),
    lastModified: latest(files["lib/services.ts"]),
    changeFrequency: "monthly",
    priority: 0.95,
  }));

  // Preserved from the previous site, deliberately lower priority.
  const secondary: Entry[] = SECONDARY_SERVICES.map((service) => ({
    url: url(service.path),
    lastModified: latest(files["lib/secondary-services.ts"]),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const cities: Entry[] = CITIES.map((city) => ({
    url: url(`/${city.slug}/`),
    lastModified: latest(files["lib/cities.ts"]),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Twenty city + service pages: five priority cities x four structures. Lower
  // priority than the service pages they support, because those are the pages we
  // want ranking for the non-geographic query.
  const cityServices: Entry[] = getCityServiceParams().map((param) => ({
    url: url(`/${param.city}/${param.service}/`),
    lastModified: latest(files["lib/city-services.ts"], files["lib/cities.ts"]),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  /*
   * One list, in a deliberate order: the static pages by priority, then
   * services, locations and the blog. Crawlers do not read the order as a
   * ranking signal, but a human opening the file sees the site's shape, and a
   * stable order keeps the diff between two builds readable.
   *
   * Deduplicated by URL, so a page reachable from two of the sources above
   * (a static route that is also a data-driven one, say) is emitted once.
   */
  const all: Entry[] = [
    ...pages.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0)),
    ...registration,
    ...secondary,
    ...cities,
    ...cityServices,
    ...guides,
    ...blog,
  ];

  const seen = new Set<string>();
  return all.filter((entry) => !seen.has(entry.url) && seen.add(entry.url));
}
