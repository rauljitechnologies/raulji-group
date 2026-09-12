import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
