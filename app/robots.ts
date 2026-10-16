import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /*
         * Only the lead endpoint is closed. /og was disallowed here too, which
         * was wrong: every page's og:image and twitter:image points at /og/,
         * and a crawler that honours robots.txt will not fetch a blocked image.
         * Google needs to fetch it to show a large image preview, so blocking
         * it quietly cost the site its social and search previews. It is a
         * generated PNG, not a crawlable page, and nothing links to it, so it
         * will not be indexed as a document on its own.
         */
        disallow: ["/api/"],
      },
    ],
    /*
     * The sitemap index. Next builds it at /sitemap.xml from the groups in
     * app/sitemap.ts and it points at each child sitemap, so one line here
     * covers them all (technical audit TF-04). /_next/ is deliberately not
     * disallowed: Google needs the CSS and JS to render the page.
     */
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
