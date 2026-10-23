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
// Second batch of business guides, 23 Oct 2026 (scripts/gen-blog-images-batch2.py).
import gstGujarat from "@/public/blog/gst-registration-gujarat.webp";
import udyamMsme from "@/public/blog/udyam-registration-msme.webp";
import gujaratShops from "@/public/blog/gujarat-shops-establishments-registration.webp";
import partnershipDeed from "@/public/blog/partnership-deed-checklist.webp";
import afterIncorporation from "@/public/blog/after-company-incorporation-checklist.webp";
// Third batch, 23 Oct 2026 (scripts/gen-blog-images-batch3.py).
import trademark from "@/public/blog/trademark-registration-india.webp";
import fssai from "@/public/blog/fssai-registration-food-licence.webp";
import iec from "@/public/blog/import-export-code-iec.webp";

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
    alt: "Diagram: one decision branching into four business structures, each with fewer rules",
  },
  "pvt-vs-llp": {
    src: pvtVsLlp,
    alt: "Diagram: a grid of shares for a Private Limited Company beside two joined partners for an LLP",
  },
  "partnership-vs-proprietorship": {
    src: partnershipVsProprietorship,
    alt: "Diagram: one owner and two joined owners, each under an open arc for unlimited liability",
  },
  documents: {
    src: documents,
    alt: "Diagram: five document rows, four ticked and one crossed as the one sent back for resubmission",
  },
  mistakes: {
    src: mistakes,
    alt: "Diagram: a filing going to the registry with a dashed resubmission arrow returning",
  },
  gujarat: {
    src: gujarat,
    alt: "Diagram: a continuous national layer above a Gujarat layer of separate state registrations",
  },
  "mca-process": {
    src: mcaProcess,
    alt: "Diagram: name, filing and certificate, with a dashed loop back from filing to name",
  },
  "structure-guide": {
    src: structureGuide,
    alt: "Diagram: a four column matrix comparing the structures across five rows",
  },
  "health-insurance": {
    src: healthInsurance,
    // The supplied artwork replaced the original timeline diagram, and the alt
    // text had not followed it. It now describes what is actually shown.
    alt: "Illustration: a man at a desk with a laptop, beside icons for cover, features and claims",
  },
  // The Panchmahal health insurance cluster, drawn by scripts/gen-health-images.py.
  "health-insurance-panchmahal": {
    src: hiPanchmahal,
    alt: "Diagram: Panchmahal linked to Godhra, Halol, Kalol and Jambughoda, with a route to Vadodara",
  },
  "health-insurance-godhra": {
    src: hiGodhra,
    alt: "Diagram: one shared family floater sum insured beside separate individual sums insured",
  },
  "health-insurance-halol": {
    src: hiHalol,
    alt: "Diagram: an employer group policy ending with the job beside a personal policy continuing",
  },
  "health-insurance-kalol": {
    src: hiKalol,
    alt: "Timeline: waiting periods at 30 days, the specific illness period, 36 months and 60 months",
  },
  "health-insurance-jambughoda": {
    src: hiJambughoda,
    alt: "Diagram: a route from a forested village to a network hospital, branching to a cash claim",
  },
  "health-insurance-villages-godhra": {
    src: hiVillagesGodhra,
    alt: "Diagram: choose, proposal form, KYC, payment, policy, then the 30-day free look window",
  },
  "health-insurance-kakanpur": {
    src: hiKakanpur,
    alt: "Diagram: a floater for the couple and children, with a separate policy for the grandparents",
  },
  "health-insurance-tuwa": {
    src: hiTuwa,
    alt: "Diagram: a hospital bill split into the part the policy pays and the part the family pays",
  },
  "health-insurance-kantadi": {
    src: hiKantadi,
    alt: "Diagram: a parent's declared condition, its waiting period up to 36 months, then cover",
  },
  "gst-gujarat": {
    src: gstGujarat,
    alt: "Diagram: GST thresholds, 40 lakh for goods and 20 lakh with services, and the state line",
  },
  "udyam-msme": {
    src: udyamMsme,
    alt: "Diagram: micro, small and medium categories nested on investment and turnover axes",
  },
  "gujarat-shops": {
    src: gujaratShops,
    alt: "Diagram: intimation below ten workers, registration from ten, both within 60 days",
  },
  "partnership-deed": {
    src: partnershipDeed,
    alt: "Diagram: two partners either side of a deed with twelve clause rows, ten agreed and two still open",
  },
  "after-incorporation": {
    src: afterIncorporation,
    alt: "Timeline: board and auditor by 30 days, share certificates by 2 months, INC-20A by 180 days",
  },
  trademark: {
    src: trademark,
    alt: "Timeline from filing to registration, with a four-month opposition window after advertisement",
  },
  fssai: {
    src: fssai,
    alt: "Diagram: FSSAI registration up to 1.5 crore, state licence to 50 crore, central licence above",
  },
  iec: {
    src: iec,
    alt: "Diagram: trade between India and the world, with IEC equal to PAN and the April to June update",
  },
} as const satisfies Record<string, BlogImage>;

export type BlogImageKey = keyof typeof BLOG_IMAGES;

export function blogImage(key: string): BlogImage | null {
  return (BLOG_IMAGES as Record<string, BlogImage>)[key] ?? null;
}
