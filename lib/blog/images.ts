import type { StaticImageData } from "next/image";

import chooseStructure from "@/public/blog/choosing-a-business-structure-india.webp";
import pvtVsLlp from "@/public/blog/private-limited-company-vs-llp.webp";
import partnershipVsProprietorship from "@/public/blog/partnership-firm-vs-proprietorship.webp";
import documents from "@/public/blog/company-registration-documents.webp";
import mistakes from "@/public/blog/business-registration-mistakes.webp";
import gujarat from "@/public/blog/starting-a-business-in-gujarat.webp";
import mcaProcess from "@/public/blog/mca-company-incorporation-process.webp";
import structureGuide from "@/public/blog/business-structure-comparison-guide.webp";
import healthInsurance from "@/public/blog/health-insurance-policy-india.webp";
import hiPanchmahal from "@/public/blog/health-insurance-panchmahal-gujarat.webp";
import hiGodhra from "@/public/blog/health-insurance-godhra-gujarat.webp";
import hiHalol from "@/public/blog/health-insurance-halol-gujarat.webp";
import hiKalol from "@/public/blog/health-insurance-kalol-gujarat.webp";
import hiJambughoda from "@/public/blog/health-insurance-jambughoda-panchmahal.webp";
import hiVillagesGodhra from "@/public/blog/health-insurance-villages-godhra-panchmahal.webp";
import hiKakanpur from "@/public/blog/health-insurance-kakanpur-panchmahal.webp";
import hiTuwa from "@/public/blog/health-insurance-tuwa-panchmahal.webp";
import hiKantadi from "@/public/blog/health-insurance-kantadi-panchmahal.webp";

/**
 * Featured images for the 2026 Business Guide Series.
 *
 * One per article, 1200x675, drawn by `scripts/gen-blog-images.py` in the same
 * house style as the rest of the site's panels. Dimensions come from the
 * imported file, so nothing shifts as they load.
 *
 * Alt text describes what is actually drawn, not the article's keywords. These
 * are diagrams, and the alt text says so: a reader using a screen reader should
 * learn what the picture shows, which is the only reason it is there.
 *
 * Filenames are descriptive because they are public URLs and they are what an
 * image search sees. They deliberately do not repeat the whole article title.
 */
export interface BlogImage {
  src: StaticImageData;
  alt: string;
}

export const BLOG_IMAGES = {
  "choose-structure": {
    src: chooseStructure,
    alt: "Diagram of one decision point branching into four routes, each ending in a card with fewer rules than the last, representing the four business structures and their falling compliance load",
  },
  "pvt-vs-llp": {
    src: pvtVsLlp,
    alt: "Diagram of two panels side by side: a grid of share units on the left for a Private Limited Company, and two partners joined by a line on the right for an LLP",
  },
  "partnership-vs-proprietorship": {
    src: partnershipVsProprietorship,
    alt: "Diagram of one owner on the left and two joined owners on the right, each under an open dashed arc showing that liability is unlimited in both",
  },
  documents: {
    src: documents,
    alt: "Diagram of five document rows, four marked with a tick and one marked with a cross, representing the document that comes back for resubmission",
  },
  mistakes: {
    src: mistakes,
    alt: "Diagram of a filing sent from a form to the registry and a dashed return arrow labelled resubmission coming back to it",
  },
  gujarat: {
    src: gujarat,
    alt: "Diagram of two stacked bands: a continuous national layer above and a Gujarat layer below with separate segments filled, representing the state registrations that sit under a central process",
  },
  "mca-process": {
    src: mcaProcess,
    alt: "Diagram of three stages, name then filing then certificate, with a dashed loop running back from the filing stage to the name stage",
  },
  "structure-guide": {
    src: structureGuide,
    alt: "Diagram of a four column comparison matrix with a header row and five rows of cells, representing the structures compared across ownership, liability, management, compliance and funding",
  },
  "health-insurance": {
    src: healthInsurance,
    // The supplied artwork replaced the original timeline diagram, and the alt
    // text had not followed it. It now describes what is actually shown.
    alt: "Illustration of a man at a desk with a laptop beside the title Health Insurance Policy Guide in India, with icons for policy types, coverage, features to compare and the claim process",
  },
  // The Panchmahal health insurance cluster, drawn by scripts/gen-health-images.py.
  "health-insurance-panchmahal": {
    src: hiPanchmahal,
    alt: "Diagram of a district hub labelled Panchmahal linked to four towns, Godhra, Halol, Kalol and Jambughoda, with a route onward to Vadodara",
  },
  "health-insurance-godhra": {
    src: hiGodhra,
    alt: "Diagram comparing a family floater, one shared sum insured across four family members, with individual policies giving each member a separate sum insured",
  },
  "health-insurance-halol": {
    src: hiHalol,
    alt: "Diagram of an employee covered by both an employer group policy that ends with the job and a personal policy that continues beyond it",
  },
  "health-insurance-kalol": {
    src: hiKalol,
    alt: "Timeline diagram of health insurance waiting periods marked at 30 days, the specific illness period, 36 months and the 60-month moratorium",
  },
  "health-insurance-jambughoda": {
    src: hiJambughoda,
    alt: "Diagram of a route from a home in a forested area to a network hospital in a larger town, with a branch to a reimbursement claim backed by bills and reports",
  },
  "health-insurance-villages-godhra": {
    src: hiVillagesGodhra,
    alt: "Diagram of the steps to buy a health policy: choose, proposal form, KYC, payment and the policy document, followed by a 30-day free look window",
  },
  "health-insurance-kakanpur": {
    src: hiKakanpur,
    alt: "Diagram of a three-generation household split into a family floater for the couple and children and a separate policy for the grandparents",
  },
  "health-insurance-tuwa": {
    src: hiTuwa,
    alt: "Diagram of a hospital bill divided into the part a health policy pays and the part the family pays, such as co-payment and non-medical items",
  },
  "health-insurance-kantadi": {
    src: hiKantadi,
    alt: "Diagram of an older parent's policy showing a declared condition, its waiting period up to 36 months, and cover beginning after it",
  },
} as const satisfies Record<string, BlogImage>;

export type BlogImageKey = keyof typeof BLOG_IMAGES;

export function blogImage(key: string): BlogImage | null {
  return (BLOG_IMAGES as Record<string, BlogImage>)[key] ?? null;
}
