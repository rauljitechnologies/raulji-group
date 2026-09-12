/**
 * JSON-LD builders (spec sections 36, 37, 38, 64).
 *
 * Rules applied:
 *  - Only verified facts. No founding date, employee count, awards, ratings,
 *    aggregate reviews or social profiles, because none of those are confirmed.
 *  - FAQPage is emitted only where the same Q&A is visible on the page.
 *  - BreadcrumbList must match the breadcrumb the user can actually see.
 */

import { SITE } from "./site";
import { SERVICES, type RegistrationService } from "./services";
import type { City } from "./cities";

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function abs(path: string) {
  return `${SITE.url}${path}`;
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone.e164,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone.e164,
      email: SITE.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "gu", "hi"],
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(service: RegistrationService) {
  const node: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${abs(service.path)}#service`,
    name: service.name,
    description: service.definition,
    url: abs(service.path),
    serviceType: service.name,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
  };

  // Price is published only where it is already published on the site.
  if (service.pricing) {
    node.offers = {
      "@type": "Offer",
      priceCurrency: "INR",
      price: service.pricing.amount.replace(/[^\d]/g, ""),
      description: service.pricing.note,
      url: abs(service.path),
    };
  }

  return node;
}

/** Service node scoped to a city page. No local address is claimed. */
export function citySeoServiceSchema(city: City, service: RegistrationService) {
  return {
    "@type": "Service",
    name: `${service.name} in ${city.name}`,
    description: service.definition,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${city.district} district, Gujarat`,
      },
    },
    url: abs(service.path),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  published: string;
  updated?: string;
  image?: string;
}) {
  return {
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: abs(`/blog/${post.slug}/`),
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(post.image ? { image: post.image } : {}),
  };
}

/** Wrap nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

/**
 * Homepage ItemList of the Phase 1 services (spec section 30).
 *
 * Makes the group identity and its four current services explicit for search
 * engines and AI systems, using only facts already stated on the page. No
 * subsidiaries, founding date, employee count, awards or social profiles are
 * asserted, because none of those are verified (spec section 31).
 */
export function homeServiceListSchema() {
  return {
    "@type": "ItemList",
    "@id": `${SITE.url}/#services`,
    name: "Business registration services offered by Raulji Group",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.definition,
        url: abs(service.path),
        provider: { "@id": ORG_ID },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Gujarat" },
          { "@type": "Country", name: "India" },
        ],
      },
    })),
  };
}
