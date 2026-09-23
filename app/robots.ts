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
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
