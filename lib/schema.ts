/**
 * JSON-LD builders (spec sections 36, 37, 38, 64).
 *
 * Rules applied:
 *  - Only verified facts. No founding date, employee count, awards, ratings,
 *    aggregate reviews or social profiles, because none of those are confirmed.
 *  - FAQPage is emitted only where the same Q&A is visible on the page.
 *  - BreadcrumbList must match the breadcrumb the user can actually see.
 */

import { SITE, LEADERSHIP } from "./site";
import { SERVICES, type RegistrationService } from "./services";
import type { City } from "./cities";

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function abs(path: string) {
  return `${SITE.url}${path}`;
}

/**
 * The two brands the group presents, as schema.org Brand nodes.
 *
 * `brand` is used deliberately in place of `subOrganization`, `parentOrganization`
 * or `department`. Those assert a corporate relationship between registered
 * entities, and no such structure has been verified (master rule 13, brief
 * section 1: do not claim holding company or group-of-companies legal status).
 * `brand` asserts only what the site already says in plain words on the
 * homepage: Raulji Group maintains these two brands.
 *
 * This is what lets an answer engine separate the three names it will otherwise
 * conflate, which is the whole point of brief section 9: Raulji Group is the
 * group, Raulji Consulting Services is the consulting and business-services
 * brand on this site, Raulji Technologies is the technology brand on its own
 * domain.
 */
function brandNodes() {
  return [
    {
      "@type": "Brand",
      "@id": `${SITE.url}/#consulting-brand`,
      name: "Raulji Consulting Services",
      description:
        "The consulting and business-services brand of Raulji Group, covering business consulting, business structuring and company and business registration support.",
      url: `${SITE.url}/services/business-consulting/`,
    },
    {
      "@type": "Brand",
      "@id": `${SITE.url}/#technologies-brand`,
      name: "Raulji Technologies",
      description:
        "The technology brand of Raulji Group, covering software, AI and digital transformation work. It operates on its own website.",
      url: SITE.technologies,
    },
  ];
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    slogan: SITE.tagline,
    /*
     * The real logo file, at its real dimensions. Without this an Organization
     * node gives a search or AI system no image to attach to the entity, which
     * is one of the few structured-data omissions that costs something visible.
     */
    logo: {
      "@type": "ImageObject",
      url: abs("/raulji-group-logo.png"),
      width: 1920,
      height: 511,
    },
    brand: brandNodes(),
    /*
     * Topics the group actually works in, named as they are named on the
     * service pages. Nothing aspirational: every entry below has a page behind
     * it (brief section 10, topical relationships).
     */
    knowsAbout: [
      "Business consulting",
      "Business structuring",
      "Business registration in India",
      "Private Limited Company registration",
      "Limited Liability Partnership registration",
      "Partnership firm registration",
      "Proprietorship registration",
    ],
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

/**
 * Service node scoped to a city page. No local address is claimed.
 *
 * `url` overrides the target for the five cities that have a dedicated page per
 * structure, so the structured data points where the visible links point.
 */
export function citySeoServiceSchema(
  city: City,
  service: RegistrationService,
  url?: string,
) {
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
    url: abs(url ?? service.path),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  published: string;
  updated?: string;
  image?: string;
  /**
   * Named author, where the article carries one.
   *
   * Defaults to the organisation. The health insurance guide is bylined to the
   * Chairman personally, and the Person node already exists in the graph
   * (personSchema), so this points at it by @id rather than restating a name
   * that could drift from the visible byline.
   */
  author?: "organization" | "chairman";
  /** Section, matching the visible category. */
  category?: string;
  keywords?: string[];
}) {
  const node: Record<string, unknown> = {
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: abs(`/blog/${post.slug}/`),
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(`/blog/${post.slug}/`) },
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    author:
      post.author === "chairman" ? { "@id": `${SITE.url}/#chairman` } : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en-IN",
  };

  if (post.image) node.image = post.image;
  if (post.category) node.articleSection = post.category;
  if (post.keywords?.length) node.keywords = post.keywords.join(", ");

  return node;
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

/**
 * The client wall as a machine-readable list (master rule 20).
 *
 * A CollectionPage whose mainEntity is an ItemList of the businesses named on
 * the page, each one an Organization. This is what lets a search or AI system
 * read the wall as 37 named entities instead of 37 logo images, which is the
 * whole point of publishing it.
 *
 * What is deliberately absent matters as much. No Review, no AggregateRating,
 * no testimonial, no outcome and no relationship claim beyond the fact that
 * each is named on this page: none of that is verified, and structured data is
 * exactly where an unverified claim does the most damage (master rule 13).
 * Each client carries its name and the logo file this site serves, nothing
 * else, and `provider` points at the group so the relationship is stated once,
 * in the page copy, rather than asserted per client in markup.
 */
export function clientListSchema(
  clients: { slug: string; name: string }[],
  { path, logoPath }: { path: string; logoPath: (slug: string) => string },
) {
  return {
    "@type": "CollectionPage",
    "@id": `${abs(path)}#clients`,
    url: abs(path),
    name: "Clients of Raulji Group",
    description:
      "Businesses named publicly as clients of Raulji Group, delivered through its two companies, Raulji Consulting Services and Raulji Technologies.",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      name: "Businesses Raulji Group has worked with",
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: clients.length,
      itemListElement: clients.map((client, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Organization",
          name: client.name,
          logo: abs(logoPath(client.slug)),
        },
      })),
    },
  };
}

/**
 * Service node for a pillar page that is not one of the four registration
 * structures, so it carries no Offer. Consulting fees depend on scope and no
 * figure is published, and inventing one to satisfy schema would be fake
 * structured data.
 */
export function pillarServiceSchema({
  name,
  description,
  path,
  serviceType,
  offerings,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  /** Named sub-services. Every one must be genuinely offered. */
  offerings?: string[];
}) {
  const node: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    description,
    url: abs(path),
    serviceType,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
  };

  if (offerings?.length) {
    node.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name,
      itemListElement: offerings.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    };
  }

  return node;
}

/**
 * Service node for a city + service page.
 *
 * Distinct from citySeoServiceSchema, which is used on a city page where the
 * canonical target is the service page. Here the city + service page is itself
 * the canonical URL for this pairing, so url and @id point at it.
 *
 * No local address or local branch is asserted. Raulji Group works from Vadodara
 * and areaServed is how the geographic relationship is expressed.
 */
export function cityServiceSchema({
  city,
  service,
  path,
  description,
}: {
  city: City;
  service: RegistrationService;
  path: string;
  description: string;
}) {
  const node: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name: `${service.name} in ${city.name}`,
    description,
    url: abs(path),
    serviceType: service.name,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${city.district} district, Gujarat`,
      },
    },
  };

  if (service.pricing) {
    node.offers = {
      "@type": "Offer",
      priceCurrency: "INR",
      price: service.pricing.amount.replace(/[^\d]/g, ""),
      description: service.pricing.note,
      url: abs(path),
    };
  }

  return node;
}


/**
 * The Chairman, as a Person node.
 *
 * Worth emitting because master rule 26 asks for clear entity information: a
 * named officer linked to both group brands is how a search or AI system
 * establishes that Raulji Group and Raulji Technologies are related rather than
 * coincidentally similar names.
 *
 * jobTitle carries both roles as one string rather than being split across
 * schema properties. The precise encoding (OrganizationRole) buys nothing here
 * and risks misstating the relationship; a plain, accurate title does not.
 *
 * Nothing is asserted that the client has not confirmed: no founding claim, no
 * biography, no social profiles, no awards.
 */
export function personSchema() {
  const { chairman } = LEADERSHIP;
  return {
    "@type": "Person",
    "@id": `${SITE.url}/#chairman`,
    name: chairman.name,
    jobTitle: chairman.jobTitle,
    image: abs(chairman.photo),
    worksFor: [
      { "@id": ORG_ID },
      { "@type": "Organization", name: "Raulji Technologies", url: SITE.technologies },
    ],
  };
}
