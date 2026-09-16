/**
 * Services that exist on the live site and are kept for their SEO value, but are
 * deliberately NOT Phase 1 focus (spec sections 4, 5, 20 and 43).
 *
 * They stay reachable from /services/ and the sitemap, and are kept out of the
 * primary navigation so the registration services carry the hierarchy.
 *
 * Land Investment and Rentals are absent on purpose: both are discontinued.
 * Land Investment 301s to /services/, Rentals returns 410.
 *
 * Business Consulting is absent for a different reason: it was promoted out of
 * this file into a full pillar page at /services/business-consulting/, because
 * consulting is the primary focus of the group and the compact template here
 * could not carry it. /services/consulting/ 301s to the pillar. Do not re-add a
 * consulting entry here; it would create two pages for the same intent.
 */

import type { ImageSlot } from "@/lib/images";

export interface SecondaryService {
  slug: string;
  path: string;
  name: string;
  h1: string;
  title: string;
  metaDescription: string;
  group: "Advisory" | "Compliance" | "Technology";
  intro: string;
  /** What the service actually covers. No outcome guarantees. */
  includes: string[];
  note?: string;
  /**
   * The panel this page shows. These pages are compact by design, and the left
   * column runs out well before the enquiry form beside it does, which left a
   * blank half-page on every one of them. One image per service closes it.
   * Pages in the same group share a panel; nothing here is drawn twice for the
   * sake of having a different picture.
   */
  image: ImageSlot;
}

/*
 * Confirmed by the client on 2026-09-16: Legal & Compliance, Finance Advisory
 * and GST/DIN/MCA are not Raulji Group services. Their entries are removed
 * here, which takes them out of /services/, the sitemap and every internal
 * link at once, and next.config.ts redirects the three URLs.
 *
 * Nothing else in this list was touched: insurance, IT, digital and the two
 * compliance pages stay live on the client's instruction.
 */
export const SECONDARY_SERVICES: SecondaryService[] = [
  {
    slug: "insurance",
    path: "/services/insurance/",
    name: "Insurance Services",
    h1: "Business Insurance Advisory",
    title: "Business Insurance Advisory | Raulji Group",
    metaDescription:
      "Business insurance advisory from Raulji Group covering commercial, property, health and motor cover, with claims support for businesses in Gujarat.",
    group: "Advisory",
    intro:
      "Advisory on the cover a business carries, which matters most for structures where liability is not capped, and support when a claim has to be made.",
    includes: [
      "Reviewing what cover a business activity actually needs",
      "Commercial and property insurance guidance",
      "Health and group cover for employees",
      "Motor and transit cover",
      "Support through the claims process",
    ],
    note: "Policy terms, premiums and claim outcomes are set by the insurer, not by us. We help you understand and arrange cover; we do not underwrite it.",
    image: "insurance",
  },
  {
    slug: "it",
    path: "/services/it/",
    name: "IT & Digital Solutions",
    h1: "IT and Digital Solutions",
    title: "IT & Digital Solutions | Raulji Group",
    metaDescription:
      "IT and digital solutions for businesses. Software, web, AI and digital transformation are delivered through Raulji Technologies.",
    group: "Technology",
    intro:
      "Technology work is delivered through our separate technology brand, Raulji Technologies. This page remains for businesses that came here looking for it.",
    includes: [
      "Website and web application development",
      "Mobile applications",
      "Business software and automation",
      "AI and data work",
      "Cloud and infrastructure support",
    ],
    note: "Technology services are offered through Raulji Technologies at rauljitechnologies.com.",
    image: "technologies",
  },
  {
    slug: "digital",
    path: "/services/digital/",
    name: "Digital Marketing",
    h1: "Digital Marketing Services",
    title: "Digital Marketing Services | Raulji Group",
    metaDescription:
      "Digital marketing, SEO and branding services. Delivered through Raulji Technologies, the technology and digital brand of Raulji Group.",
    group: "Technology",
    intro:
      "Marketing and brand work is delivered through Raulji Technologies. This page remains for businesses that came here looking for it.",
    includes: [
      "Search engine optimisation",
      "Paid search and social campaigns",
      "Brand identity and design",
      "Content and social media",
      "Analytics and reporting",
    ],
    note: "Digital marketing services are offered through Raulji Technologies at rauljitechnologies.com.",
    image: "technologies",
  },
  {
    slug: "pvt-compliance",
    path: "/services/pvt-compliance/",
    name: "Private Limited Company Compliance",
    h1: "Private Limited Company Annual Compliance",
    title: "Private Limited Company Annual Compliance | Raulji Group",
    metaDescription:
      "Annual compliance support for Private Limited Companies: AOC-4, MGT-7A, director KYC, auditor appointment and board meeting records.",
    group: "Compliance",
    intro:
      "A Private Limited Company carries statutory obligations from the day it is incorporated, whether or not it has traded. This covers the recurring filings that follow.",
    includes: [
      "Annual financial statement filing in Form AOC-4",
      "Annual return filing in Form MGT-7A for small companies",
      "First auditor appointment through Form ADT-1",
      "Commencement of business declaration in Form INC-20A",
      "Director KYC through Form DIR-3 KYC",
      "Board meeting and minute record-keeping",
    ],
    note: "Statutory audit is required for a Private Limited Company from its first financial year regardless of turnover. Late ROC filing attracts additional fees that accrue over time.",
    image: "compliance",
  },
  {
    slug: "llp-compliance",
    path: "/services/llp-compliance/",
    name: "LLP Compliance",
    h1: "LLP Annual Compliance",
    title: "LLP Annual Compliance | Raulji Group",
    metaDescription:
      "LLP annual compliance support: Form 11 annual return, Form 8 statement of account and solvency, and audit thresholds explained.",
    group: "Compliance",
    intro:
      "An LLP must file with the Registrar of Companies every year, including in a year with no business activity. These are the filings involved.",
    includes: [
      "Form 11 annual return, due by 30 May each year",
      "Form 8 statement of account and solvency, due by 30 October",
      "Form 3 filing for any change to the LLP Agreement",
      "Form 4 filing for admission, retirement or change of partners",
      "Designated partner KYC",
    ],
    note: "Audit is required where turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh. Late filing of Form 8 or Form 11 attracts a per-day penalty that continues to accrue until the filing is made.",
    image: "compliance",
  },
];

export function getSecondaryService(slug: string) {
  return SECONDARY_SERVICES.find((s) => s.slug === slug);
}

export const SECONDARY_SLUGS = SECONDARY_SERVICES.map((s) => s.slug);
