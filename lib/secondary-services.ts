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
  /**
   * Heading above the "what it covers" list.
   *
   * It used to be the shared string "What this covers" (or "What Raulji
   * Technologies covers" on the two technology pages), which the crawl of
   * 15 Oct 2026 flagged as a generic duplicate H2 across 26 pages: a heading
   * that tells a reader, a search engine or an answer engine nothing about
   * which page it is on (audit TF-16). Required, so a new service cannot
   * reintroduce the generic version by omission.
   */
  coversHeading: string;
  /**
   * Heading above the four registration-structure cards. Previously the shared
   * "Registering a business?" on every secondary page, for the same reason.
   */
  registrationHeading: string;
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
  /**
   * Blog guides to promote from this page, by slug.
   *
   * Optional and usually absent. Only set it where a guide genuinely covers
   * the same ground, so the block is a recommendation rather than filler.
   */
  guides?: string[];
  /**
   * The enquiry form option this page preselects, from the "What do you need
   * help with?" list in components/forms/lead-form.tsx. Only set where an
   * option genuinely matches the page and the page carries the form: the
   * compliance pages have no matching option, and the two technology pages
   * hand off to Raulji Technologies instead of showing a form.
   */
  formOption?: string;
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
    title: "Business Insurance Advisory in Gujarat | Raulji Group",
    metaDescription:
      "Advice on commercial, property, health and motor insurance for Gujarat businesses, plus help when a claim is made. Talk to us before you buy or renew.",
    group: "Advisory",
    intro:
      "Advisory on the cover a business carries, which matters most for structures where liability is not capped, and support when a claim has to be made.",
    coversHeading: "What our business insurance advice covers",
    registrationHeading: "Registering a business? Start with the right structure",
    includes: [
      "Reviewing what cover a business activity actually needs",
      "Commercial and property insurance guidance",
      "Health and group cover for employees",
      "Motor and transit cover",
      "Support through the claims process",
    ],
    note: "Policy terms, premiums and claim outcomes are set by the insurer, not by us. We help you understand and arrange cover; we do not underwrite it.",
    image: "insurance",
    guides: ["health-insurance-policy-guide-india", "health-insurance-panchmahal-gujarat"],
    formOption: "Insurance",
  },
  {
    slug: "it",
    path: "/services/it/",
    name: "IT & Digital Solutions",
    h1: "IT and Digital Solutions",
    title: "IT & Software Solutions by Raulji Technologies | Vadodara",
    metaDescription:
      "Software, web, AI and digital transformation for businesses, delivered by Raulji Technologies, the technology brand of Raulji Group in Vadodara. Learn more.",
    group: "Technology",
    intro:
      "Technology work is delivered through our separate technology brand, Raulji Technologies. This page remains for businesses that came here looking for it.",
    coversHeading: "IT and software services from Raulji Technologies",
    registrationHeading: "Need a company registered before your software project?",
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
    title: "Digital Marketing, SEO & Branding | Raulji Technologies",
    metaDescription:
      "Digital marketing, SEO and branding for growing businesses, delivered through Raulji Technologies, the digital brand of Raulji Group in Vadodara.",
    group: "Technology",
    intro:
      "Marketing and brand work is delivered through Raulji Technologies. This page remains for businesses that came here looking for it.",
    coversHeading: "Digital marketing services from Raulji Technologies",
    registrationHeading: "Registering a business before you launch online?",
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
      "Stay compliant every year: AOC-4, MGT-7A, director KYC, auditor appointment and board records for your Private Limited Company. Ask for a compliance quote.",
    group: "Compliance",
    intro:
      "A Private Limited Company carries statutory obligations from the day it is incorporated, whether or not it has traded. This covers the recurring filings that follow.",
    coversHeading: "What Private Limited annual compliance covers",
    registrationHeading: "Not registered yet? Start with Private Limited registration",
    includes: [
      "Annual financial statement filing in Form AOC-4",
      "Annual return filing in Form MGT-7A for small companies",
      "First auditor appointment, with Form ADT-1 filed to notify the Registrar",
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
    title: "LLP Annual Compliance: Form 11 & Form 8 Filing | Raulji",
    metaDescription:
      "File your LLP's Form 11 annual return and Form 8 statement of account and solvency on time, and know when an audit applies. Get LLP compliance support.",
    group: "Compliance",
    intro:
      "An LLP must file with the Registrar of Companies every year, including in a year with no business activity. These are the filings involved.",
    coversHeading: "What LLP annual compliance covers",
    registrationHeading: "Not registered yet? Start with LLP registration",
    includes: [
      "Form 11 annual return, due by 30 May each year",
      "Form 8 statement of account and solvency, due by 30 October",
      "Form 3 filing for any change to the LLP Agreement",
      "Form 4 filing for admission, retirement or change of partners",
      "Designated partner KYC",
    ],
    note: "Audit is required where turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh. Late filing of Form 8 or Form 11 attracts an additional fee that steps up the longer the delay runs.",
    image: "compliance",
  },
];

export function getSecondaryService(slug: string) {
  return SECONDARY_SERVICES.find((s) => s.slug === slug);
}

export const SECONDARY_SLUGS = SECONDARY_SERVICES.map((s) => s.slug);
