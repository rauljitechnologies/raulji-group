/**
 * Services that exist on the live site and are kept for their SEO value, but are
 * deliberately NOT Phase 1 focus (spec sections 4, 5, 20 and 43).
 *
 * They stay reachable from /services/ and the sitemap, and are kept out of the
 * primary navigation so the registration services carry the hierarchy.
 *
 * Land Investment and Rentals are absent on purpose: both are discontinued.
 * Land Investment 301s to /services/, Rentals returns 410.
 */

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
}

export const SECONDARY_SERVICES: SecondaryService[] = [
  {
    slug: "consulting",
    path: "/services/consulting/",
    name: "Business Consulting",
    h1: "Business Consulting Services",
    title: "Business Consulting Services | Raulji Group",
    metaDescription:
      "Business consulting from Raulji Group: structure selection, startup setup, process and growth advisory for businesses in Gujarat and India.",
    group: "Advisory",
    intro:
      "Advisory work for businesses that are past the registration stage and deciding what to do next: how to structure operations, where the obligations sit, and what has to be in place before growth is workable.",
    includes: [
      "Choosing and reviewing the right business structure",
      "Setting up a new business from scratch, end to end",
      "Reviewing existing registrations and licences for gaps",
      "Documentation and process review",
      "Guidance on statutory obligations attached to your activity",
    ],
  },
  {
    slug: "legal",
    path: "/services/legal/",
    name: "Legal & Compliance",
    h1: "Legal and Compliance Support",
    title: "Legal & Compliance Support | Raulji Group",
    metaDescription:
      "Legal and compliance support from Raulji Group, including agreement drafting, statutory filings and compliance reviews for businesses in Gujarat.",
    group: "Compliance",
    intro:
      "Support with the documents and filings that follow registration, from partnership deeds and commercial agreements to the statutory filings an entity carries year on year.",
    includes: [
      "Partnership deed and LLP Agreement drafting",
      "Commercial agreement drafting and review",
      "Statutory filing calendars and reminders",
      "Compliance reviews for existing entities",
      "Coordination with professionals where certification is required",
    ],
    note: "We are not a law firm and do not provide representation before courts or tribunals. Where a matter requires an advocate, a chartered accountant or a company secretary, we say so and coordinate rather than act outside our remit.",
  },
  {
    slug: "finance",
    path: "/services/finance/",
    name: "Finance Advisory",
    h1: "Finance and Accounting Advisory",
    title: "Finance & Accounting Advisory | Raulji Group",
    metaDescription:
      "Finance and accounting advisory from Raulji Group: bookkeeping support, GST and tax filing coordination, and financial documentation for businesses in Gujarat.",
    group: "Advisory",
    intro:
      "Help with the financial side of running a registered business: keeping books in order, meeting return deadlines, and having documentation ready when a bank or a buyer asks for it.",
    includes: [
      "Bookkeeping and accounting support",
      "GST registration and return filing coordination",
      "Income tax return coordination",
      "Financial documentation for bank and lender requirements",
      "Guidance on record-keeping obligations",
    ],
    note: "Tax outcomes depend on your specific facts and on the law as it applies at the time. We do not guarantee any tax position or assessment outcome.",
  },
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
  },
  {
    slug: "gst-din-mca",
    path: "/services/gst-din-mca/",
    name: "GST, DIN and MCA Services",
    h1: "GST, DIN and MCA Filing Support",
    title: "GST, DIN & MCA Filing Support | Raulji Group",
    metaDescription:
      "Support with GST registration and returns, DIN and DSC applications, and MCA filings for companies and LLPs in Gujarat and India.",
    group: "Compliance",
    intro:
      "The individual registrations and filings that sit around an entity: GST, director identification, digital signatures and the various MCA forms an entity has to file as it changes.",
    includes: [
      "GST registration and return filing",
      "Director Identification Number applications and KYC",
      "Class 3 Digital Signature Certificate issuance and renewal",
      "MCA filings for changes in directors, registered office or capital",
      "Charge creation and satisfaction filings",
      "Udyam (MSME) registration",
    ],
  },
];

export function getSecondaryService(slug: string) {
  return SECONDARY_SERVICES.find((s) => s.slug === slug);
}

export const SECONDARY_SLUGS = SECONDARY_SERVICES.map((s) => s.slug);
