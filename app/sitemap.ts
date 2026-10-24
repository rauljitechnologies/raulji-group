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
 *  - Every lastmod is a real date: the last commit to the files a page's
 *    content comes from, an article's `updated` date, or a Supabase post's
 *    `updated_at`. Nothing is stamped with the time the sitemap was built,
 *    which is what keeps lastmod worth reading rather than noise a crawler
 *    learns to ignore.
 *
 * Every URL here is a 200 with a self-referencing canonical and trailing slash.
 * Discontinued URLs are absent because their pages are gone: /rentals/ and
 * /services/land-investment/ are route handlers returning 410, not pages.
 *
 * `<loc>` and `<lastmod>` only, by client instruction of 2026-10-24.
 * `<changefreq>` and `<priority>` were emitted until then. Both are optional in
 * the protocol and Google has said publicly it ignores both; they were a
 * second set of numbers to keep in step with reality for no crawler benefit,
 * so they are gone and the file is now the minimum the standard asks for.
 *
 * One flat sitemap, same instruction. This was previously split by
 * `generateSitemaps()` into /sitemap/core.xml, /sitemap/services.xml,
 * /sitemap/locations.xml and /sitemap/blog.xml behind a hand-written index at
 * /sitemap.xml, because technical audit TF-04 wanted Search Console to report
 * index coverage per group. At ~100 URLs the split was never about the
 * 50,000-URL limit, and the protocol requires no index below that. The cost of
 * collapsing it: Search Console now reports coverage in one row, so a figure
 * like "Discovered - currently not indexed: 37" no longer says which kind of
 * page is being skipped. That question, not the URL count, is the reason to
 * re-split. The four child URLs 301 here (next.config.ts).
 */

type Entry = MetadataRoute.Sitemap[number];

/**
 * The order the static pages appear in. Crawlers do not read sitemap order as
 * a ranking signal, so this is for the human opening the file: it should read
 * as the shape of the business, consulting first (master rule 39). Anything
 * not listed keeps its alphabetical position from the manifest, after these.
 *
 * This replaced a map of per-page `priority` values, which is where the
 * ordering used to come from as a side effect of a field no longer emitted.
 */
const ORDER = [
  "/",
  "/services/business-consulting/",
  "/services/business-registration/",
  "/gujarat/",
  "/services/",
  "/compare/",
  "/contact/",
  "/faqs/",
  "/about/",
  "/our-clients/",
  "/blog/",
  "/team/",
  "/privacy/",
  "/terms/",
  "/disclaimer/",
];

const files = manifest.files as Record<string, string>;
const articleDates = manifest.articles as Record<string, string>;

/** The latest of several dates, ignoring any that are missing. */
function latest(...dates: (string | Date | undefined | null)[]) {
  const times = dates.filter(Boolean).map((d) => new Date(d!).getTime());
  return times.length ? new Date(Math.max(...times)) : undefined;
}

/**
 * A slug safe to put in a URL in an XML document.
 *
 * Everything else in this file comes from the repository, but a Supabase row's
 * slug is the one value that arrives from outside it, and it is concatenated
 * into a `<loc>`. Next's serialiser XML-escapes what it writes, so a slug
 * containing markup could not break out of the element -- but it would still
 * produce a `<loc>` that is not a URL this site serves, which is a malformed
 * entry Search Console would reject the file for. A slug is a slug: lowercase
 * letters, digits and hyphens. Anything else is a data problem, and the
 * sitemap is not the place to discover it, so the row is skipped and named in
 * the build log rather than emitted.
 */
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${SITE.url}${path}`;

  // The guides. An article's date is the later of its editorial `updated`
  // date and its last commit, so an edit counts even if `updated` was not
  // bumped.
  const guides: Entry[] = ARTICLES.map((article) => ({
    url: url(`/blog/${article.slug}/`),
    lastModified: latest(article.updated, articleDates[article.slug]),
  }));

  const posts = await getPublishedPosts();
  const blog: Entry[] = posts
    // A Supabase row sharing a slug with a guide resolves to the guide, so it
    // must not be emitted twice.
    .filter((post) => !ARTICLE_SLUGS.includes(post.slug))
    .filter((post) => {
      if (SAFE_SLUG.test(post.slug)) return true;
      console.error(`sitemap: skipping blog post with unusable slug ${JSON.stringify(post.slug)}`);
      return false;
    })
    .map((post) => ({
      url: url(`/blog/${post.slug}/`),
      lastModified: new Date(post.updated_at),
    }));

  // The blog index changes whenever anything it lists changes.
  const newestPost = latest(...guides.map((g) => g.lastModified), ...blog.map((b) => b.lastModified));

  const rank = (path: string) => {
    const i = ORDER.indexOf(path);
    return i === -1 ? ORDER.length : i;
  };

  // Copied before sorting: `manifest.routes` is an imported JSON module, and
  // sorting it in place would mutate a value other callers share.
  const pages: Entry[] = [...manifest.routes]
    .sort((a, b) => rank(a.path) - rank(b.path))
    .map((route) => ({
      url: url(route.path),
      lastModified:
        route.path === "/blog/" ? latest(route.lastModified, newestPost) : new Date(route.lastModified),
    }));

  const registration: Entry[] = SERVICES.map((service) => ({
    url: url(service.path),
    lastModified: latest(files["lib/services.ts"]),
  }));

  // Preserved from the previous site, and still offered.
  const secondary: Entry[] = SECONDARY_SERVICES.map((service) => ({
    url: url(service.path),
    lastModified: latest(files["lib/secondary-services.ts"]),
  }));

  const cities: Entry[] = CITIES.map((city) => ({
    url: url(`/${city.slug}/`),
    lastModified: latest(files["lib/cities.ts"]),
  }));

  // Twenty city + service pages: five priority cities x four structures
  // (master rule 17).
  const cityServices: Entry[] = getCityServiceParams().map((param) => ({
    url: url(`/${param.city}/${param.service}/`),
    lastModified: latest(files["lib/city-services.ts"], files["lib/cities.ts"]),
  }));

  /*
   * One list: the static pages in the order above, then services, locations
   * and the blog. Deduplicated by URL, so a page reachable from two of the
   * sources above is emitted once.
   */
  const all: Entry[] = [
    ...pages,
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
