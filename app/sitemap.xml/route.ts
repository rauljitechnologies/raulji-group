/**
 * The sitemap index at /sitemap.xml (technical audit TF-04).
 *
 * app/sitemap.ts splits the site into named child sitemaps with
 * `generateSitemaps()`. Next 15 publishes those children at
 * /sitemap/<group>.xml but does not publish an index for them, so without this
 * route /sitemap.xml would 404: the one sitemap URL that is referenced from
 * robots.txt and already submitted in Search Console and Bing.
 *
 * Each child's `lastModified` is the newest entry inside it, taken from the
 * same function that builds the child, so the index can never disagree with
 * the files it points at.
 */
import { SITE } from "@/lib/site";
import sitemap, { SITEMAP_GROUPS } from "../sitemap";

export const revalidate = 3600;

function escape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const children = await Promise.all(
    SITEMAP_GROUPS.map(async (id) => {
      const entries = await sitemap({ id });
      const times = entries
        .map((e) => (e.lastModified ? new Date(e.lastModified).getTime() : NaN))
        .filter((n) => !Number.isNaN(n));
      return {
        loc: `${SITE.url}/sitemap/${id}.xml`,
        lastModified: times.length ? new Date(Math.max(...times)) : undefined,
      };
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children
  .map(
    (c) =>
      `  <sitemap>\n    <loc>${escape(c.loc)}</loc>${
        c.lastModified ? `\n    <lastmod>${c.lastModified.toISOString()}</lastmod>` : ""
      }\n  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
