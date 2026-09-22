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
    alt: "Diagram of a policy document beside a timeline marked at 30 days, 36 months and 60 months, the waiting period and moratorium milestones in a health insurance policy",
  },
} as const satisfies Record<string, BlogImage>;

export type BlogImageKey = keyof typeof BLOG_IMAGES;

export function blogImage(key: string): BlogImage | null {
  return (BLOG_IMAGES as Record<string, BlogImage>)[key] ?? null;
}
