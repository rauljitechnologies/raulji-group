import type { Metadata } from "next";
import { SITE } from "./site";
import { abs } from "./schema";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path with leading and trailing slash, e.g. "/services/llp-registration/". */
  path: string;
  /** Headline drawn on the generated OG card. Defaults to the page title. */
  ogHeadline?: string;
  /** Explicit image URL, when a generated card is not wanted. */
  ogImage?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/** Branded 1200x630 card generated per page (spec section 39). */
export function ogImageUrl(headline: string) {
  return `${SITE.url}/og/?title=${encodeURIComponent(headline)}`;
}

/**
 * Single place where canonical, Open Graph and Twitter metadata are built,
 * so no page can ship without them (spec sections 31, 39, 40).
 */
export function pageMeta({
  title,
  description,
  path,
  ogHeadline,
  ogImage,
  type = "website",
  noindex = false,
}: PageMetaInput): Metadata {
  const url = abs(path);
  const image = ogImage ?? ogImageUrl(ogHeadline ?? title.replace(/\s*\|\s*Raulji Group\s*$/, ""));

  return {
    // Page titles already end in "| Raulji Group", so bypass the layout template
    // rather than have the brand appended a second time.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type,
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
