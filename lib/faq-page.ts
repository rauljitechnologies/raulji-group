/**
 * What the /faqs/ page adds around the questions themselves.
 *
 * The questions and answers are not here. They stay in lib/home-faqs.ts and
 * on each service in lib/services.ts, because the homepage and the service
 * pages render the same wording and carry the same FAQPage schema. This file
 * only holds what the FAQ library needs on top: how each topic is introduced,
 * the extra words its search should answer to, and where an answer can
 * usefully send the reader next.
 *
 * Every href below is a route that exists in this repository. Check any new
 * one against app/ and lib/blog/articles before adding it.
 */

export type FaqIcon = "general" | "pvt" | "llp" | "partnership" | "proprietorship";

export interface FaqTopic {
  title: string;
  /** Kicker above the heading. */
  sub: string;
  /** One line under the heading saying what the questions cover. */
  blurb: string;
  icon: FaqIcon;
  /**
   * Words a reader might search that do not appear in the questions' own
   * text, such as "pvt ltd" for a Private Limited answer that never says it.
   * Matched against every question in the topic.
   */
  keywords: string;
}

/** Keyed by the group id: "general", or a service slug. */
export const FAQ_TOPICS: Record<string, FaqTopic> = {
  general: {
    title: "General",
    sub: "All structures",
    blurb: "What Raulji Group does, choosing a structure, timelines, cost and changing structure later.",
    icon: "general",
    keywords: "raulji group about services choose structure",
  },
  "pvt-registration": {
    title: "Private Limited Company",
    sub: "Companies Act, 2013",
    blurb: "Questions about directors, documents, incorporation, capital, costs and compliance.",
    icon: "pvt",
    keywords: "private limited company pvt ltd incorporation roc mca spice",
  },
  "llp-registration": {
    title: "LLP",
    sub: "Limited Liability Partnership",
    blurb: "Partners and designated partners, the LLP Agreement, documents, process and annual filings.",
    icon: "llp",
    keywords: "llp limited liability partnership fillip roc mca",
  },
  "partnership-registration": {
    title: "Partnership Firm",
    sub: "Indian Partnership Act, 1932",
    blurb: "The partnership deed, registration, documents, liability, conversion and tax.",
    icon: "partnership",
    keywords: "partnership firm deed registrar of firms",
  },
  "proprietorship-registration": {
    title: "Proprietorship",
    sub: "Sole proprietorship",
    blurb: "Legal status, which registrations apply, GST, documents, bank accounts, tax and conversion.",
    icon: "proprietorship",
    keywords: "proprietorship sole proprietor udyam msme",
  },
};

/**
 * The chips under the search box. `label` is what the chip says and what goes
 * into the search box; every one of them matches existing answers.
 */
export const POPULAR_SEARCHES = ["Documents", "Cost", "GST", "Directors", "Conversion"];

/**
 * Words that should find each other in search. A reader who types "cost"
 * wants the answers that talk about fees, and "conversion" should find
 * "converted". Kept short on purpose: a long synonym list turns every search
 * into "everything".
 */
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  cost: ["fee", "price"],
  costs: ["fee", "price"],
  fee: ["cost"],
  fees: ["cost"],
  price: ["fee", "cost"],
  pricing: ["fee", "cost"],
  conversion: ["convert"],
  convert: ["conversion"],
  documents: ["document", "proof"],
  document: ["proof"],
  time: ["working days", "how long"],
  timeline: ["working days", "how long"],
  "pvt": ["private limited"],
  msme: ["udyam"],
  udyam: ["msme"],
};

/**
 * Where an answer can send the reader for more: topic id → exact question
 * wording → link. Scoped by topic because several topics ask the same
 * question ("What documents are required?") and the right next page differs.
 *
 * Shown as one line under the answer, never edited into the answer itself, so
 * the answer text stays identical to the service pages and to the FAQPage
 * schema. A question whose wording changes simply loses its link; nothing
 * breaks. Deliberately few: each is the single most useful next page for that
 * question, following FAQ → guide → service → contact.
 */
export const FAQ_LINKS: Record<string, Record<string, { href: string; label: string }>> = {
  general: {
    "What business registration services does Raulji Group provide?": {
      href: "/services/business-registration/",
      label: "See the business registration overview",
    },
    "Which business structure should I choose?": {
      href: "/compare/",
      label: "Compare the four structures side by side",
    },
    "What does registration cost?": {
      href: "/services/pvt-registration/",
      label: "See what the Private Limited package includes",
    },
    "Do I need to visit your office to register a business?": {
      href: "/contact/",
      label: "Contact Raulji Group",
    },
    "Can I change my business structure later?": {
      href: "/blog/how-to-choose-business-structure-india-2026/",
      label: "Read the guide to choosing a business structure",
    },
  },
  "pvt-registration": {
    "What documents are required?": {
      href: "/blog/documents-required-company-registration-india/",
      label: "Read the full documents checklist",
    },
  },
  "llp-registration": {
    "How is an LLP different from a Private Limited Company?": {
      href: "/blog/private-limited-company-vs-llp/",
      label: "Read Private Limited Company vs LLP",
    },
  },
  "partnership-registration": {
    "Is partnership registration mandatory?": {
      href: "/services/partnership-registration/",
      label: "Learn more about Partnership Firm registration",
    },
  },
  "proprietorship-registration": {
    "Who should choose a proprietorship?": {
      href: "/blog/partnership-vs-proprietorship-india/",
      label: "Read Partnership vs Proprietorship",
    },
  },
};

/** The resource cards after the questions. */
export const FAQ_RESOURCES = [
  {
    href: "/services/business-registration/",
    title: "Business Registration",
    body: "The four structures Raulji Group registers, what each involves and where to start.",
    icon: "registration",
  },
  {
    href: "/compare/",
    title: "Compare Business Structures",
    body: "Private Limited, LLP, Partnership and Proprietorship side by side on liability, compliance, tax and funding.",
    icon: "compare",
  },
  {
    href: "/blog/",
    title: "Business Guides",
    body: "Longer explanations of structures, documents and the MCA registration process.",
    icon: "guides",
  },
] as const;
