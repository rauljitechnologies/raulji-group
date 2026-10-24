import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // The live site canonicalises every URL to a trailing slash. Keeping that form
  // means existing indexed URLs and backlinks land on a 200 with no redirect hop.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    /*
     * The crawl of 15 Oct 2026 found every image being fetched at w=3840
     * (TF-08), because that is the largest entry in Next's default
     * deviceSizes ladder and it appears in every srcset. Nothing on this site
     * is laid out wider than 1920 CSS pixels, so the 2048 and 3840 candidates
     * were only ever a way for a high-DPR phone to download a desktop file.
     * Capping the ladder removes them from every srcset at once.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    /*
     * AVIF first, WebP as the fallback. The earlier note here was right that
     * at the *default* quality of 75 the optimiser encodes AVIF at an
     * effective quality of 47 and softens photographic detail. That is a
     * quality problem, not a format problem, and the fix is the explicit
     * quality below rather than dropping the format: at quality 70 AVIF holds
     * detail and still lands well under the WebP byte count. Browsers that do
     * not accept AVIF are served WebP from the same srcset.
     */
    formats: ["image/avif", "image/webp"],
    /*
     * The audit asks for quality 70 (TF-08). There is no `defaultQuality`
     * option; `qualities` is the allow-list, and when an <Image> passes no
     * `quality` prop the optimiser picks the allowed value nearest 75. With a
     * single entry that is unambiguous, so 70 becomes the effective default
     * for every image on the site. No component passes `quality` explicitly,
     * and if one ever needs to, its value has to be added here or the build
     * fails loudly rather than silently falling back to 75.
     */
    qualities: [70],
  },
  async redirects() {
    // statusCode 301 rather than `permanent: true`, which emits 308. Both are
    // treated as permanent by search engines, but 301 is what the existing
    // redirect map and analytics expect. Destinations carry the trailing slash
    // so no redirect chains into a second hop.
    return [
      /*
       * The sitemap was four child sitemaps behind an index at /sitemap.xml
       * (technical audit TF-04) until the client asked for a single flat file
       * on 2026-10-24. /sitemap.xml still answers 200 -- it is now the
       * sitemap itself rather than an index of others -- but the four child
       * URLs no longer exist, and both Search Console and Bing have them on
       * record from the earlier submission. A 301 to the one sitemap is what
       * the sitemaps protocol expects a moved sitemap to do, and it keeps a
       * crawler that still holds a child URL from recording a 404 against
       * the site. Remove these once Search Console shows no child sitemap.
       */
      {
        source: "/sitemap/:group(core|services|locations|blog).xml",
        destination: "/sitemap.xml",
        statusCode: 301,
      },
      // /rent and /rent/* are leftovers of the discontinued rentals business.
      // Unlike /rentals/, which still carries a 410 explainer, these paths were
      // never a real service URL, so they go straight to the homepage.
      {
        source: "/rent",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/rent/:path*",
        destination: "/",
        statusCode: 301,
      },
      // /services/land-investment/ answers 410 from its own route handler
      // (app/services/land-investment/route.ts), per technical audit TF-02.
      // It is deliberately absent from this list.
      /*
       * Services Raulji Group does not provide, confirmed by the client on
       * 2026-09-16. They pointed at the homepage until the technical audit of
       * 15 Oct 2026 (TF-02) reassigned them to the nearest relevant page:
       * /services/legal/ to the registration pillar, which covers the MCA
       * filing work those queries are usually after, and /services/finance/
       * to the services hub. That is also what master rules 15 and 37 ask for,
       * since a redirect to a page that does not answer the original query is
       * commonly treated as a soft 404 and passes little of the old page's
       * value.
       *
       * /services/gst-din-mca/ still goes to the homepage: the audit does not
       * list it, so the client's 2026-09-16 instruction stands for that one.
       */
      {
        source: "/services/legal",
        destination: "/services/business-registration/",
        statusCode: 301,
      },
      {
        source: "/services/finance",
        destination: "/services/",
        statusCode: 301,
      },
      {
        source: "/services/gst-din-mca",
        destination: "/",
        statusCode: 301,
      },
      // Previous services overview, folded into /services/. The technical audit
      // (TF-20) says to remove this rule when the new /industries/ hub ships,
      // so that the URL serves the hub instead of redirecting away from it.
      {
        source: "/industries",
        destination: "/services/",
        statusCode: 301,
      },
      // The year in this slug dated the post and would have to change every
      // January. The post now lives at the yearless slug (audit TF-02); the
      // old URL had 2 impressions and is the one Google still knows.
      {
        source: "/blog/how-to-choose-business-structure-india-2026",
        destination: "/blog/how-to-choose-business-structure-india/",
        statusCode: 301,
      },
      // Legacy slug consolidated into the Phase 1 registration page.
      {
        source: "/services/company-registration",
        destination: "/services/pvt-registration/",
        statusCode: 301,
      },
      // Consulting was promoted from a compact secondary page to the primary
      // pillar. Same intent, more content, so a 301 rather than a 410.
      {
        source: "/services/consulting",
        destination: "/services/business-consulting/",
        statusCode: 301,
      },
      // /services/ was the registration overview before the dedicated pillar
      // existed. Both URLs are kept: /services/ is now the whole-catalogue hub,
      // so these are aliases people and old links may still use.
      {
        source: "/services/registration",
        destination: "/services/business-registration/",
        statusCode: 301,
      },
      {
        source: "/business-registration",
        destination: "/services/business-registration/",
        statusCode: 301,
      },
      {
        source: "/business-consulting",
        destination: "/services/business-consulting/",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      /*
       * The machine-readable routes, locked down (owner report of 2026-10-24).
       *
       * A `<script id="datalayer-checker-script">` was seen inside
       * /sitemap.xml. It is not in the response: the bytes Vercel serves
       * contain only urlset, url, loc and lastmod, verified against the
       * official schema and fetched both as a browser and as Googlebot. It
       * came from a dataLayer-inspector browser extension, which appends a
       * script tag into whatever document is open -- Chrome's XML viewer
       * included -- so it shows up when the file is inspected in that browser
       * and nowhere else. No crawler sees it.
       *
       * Nothing server-side can stop an extension mutating the DOM after
       * delivery; that is the user's own browser. What this header does is
       * make such a script inert: an extension injecting into the main world
       * does so with a script tag, and a tag is subject to the document's CSP,
       * so `script-src 'none'` stops it executing. Enforced, not report-only,
       * because there is no legitimate script on these routes to break.
       *
       * Deliberately narrow: no `default-src`, so the browser's own XML
       * stylesheet still renders the file readably for a human. Crawlers
       * ignore CSP when parsing a sitemap, so none of this can affect
       * indexing. `X-Content-Type-Options: nosniff` on the rule below already
       * stops the XML being re-interpreted as HTML.
       */
      {
        source: "/:path(sitemap.xml|robots.txt)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "script-src 'none'",
              "object-src 'none'",
              "base-uri 'none'",
              "form-action 'none'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          /*
           * Content-Security-Policy, report-only to begin with (audit TF-12).
           *
           * Report-only is deliberate: an enforced policy that misses one host
           * silently breaks analytics or the enquiry form, and the audit asks
           * for two clean weeks before enforcement. Switch the key to
           * "Content-Security-Policy" once the reports are clean; nothing else
           * needs to change.
           *
           * What each directive is for on this site:
           *  - script-src: Google Tag Manager, which loads GA4 inside itself.
           *    'unsafe-inline' is required by the GTM bootstrap snippet and by
           *    Next's inline hydration scripts.
           *  - img-src: data: covers the blur placeholders Next inlines;
           *    www.googletagmanager.com and *.google-analytics.com cover
           *    measurement pixels.
           *  - connect-src: GA4 sends its hits by fetch/beacon.
           *  - frame-src: the GTM noscript iframe.
           *  - style-src 'unsafe-inline': Tailwind is compiled to a stylesheet,
           *    but Next emits inline style attributes for next/image sizing.
           *  - frame-ancestors 'self' mirrors the X-Frame-Options above.
           * There is no map embed and no third-party form, so no host is
           * allowed for either. WhatsApp and tel: links are navigations, not
           * subresources, so they need no directive.
           */
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://*.googletagmanager.com",
              "font-src 'self' data:",
              "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
              "frame-src https://www.googletagmanager.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              /*
               * No `upgrade-insecure-requests` while this header is report-only.
               * Browsers ignore that directive in a report-only policy and log
               * a console error on every page saying so (Lighthouse
               * "errors-in-console", audit of 23 Oct 2026). HSTS above already
               * keeps every request on HTTPS. Add it back in the same commit
               * that switches the key to the enforced header.
               */
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
