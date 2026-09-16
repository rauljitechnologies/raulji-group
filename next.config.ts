import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // The live site canonicalises every URL to a trailing slash. Keeping that form
  // means existing indexed URLs and backlinks land on a 200 with no redirect hop.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // statusCode 301 rather than `permanent: true`, which emits 308. Both are
    // treated as permanent by search engines, but 301 is what the existing
    // redirect map and analytics expect. Destinations carry the trailing slash
    // so no redirect chains into a second hop.
    return [
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
      // Discontinued. /services/ is the closest genuinely relevant destination.
      {
        source: "/services/land-investment",
        destination: "/services/",
        statusCode: 301,
      },
      // Previous services overview, folded into /services/.
      {
        source: "/industries",
        destination: "/services/",
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
        ],
      },
    ];
  },
};

export default nextConfig;
