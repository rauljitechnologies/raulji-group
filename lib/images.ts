import type { StaticImageData } from "next/image";

import office from "@/public/photos/raulji-group-office.webp";
import consulting from "@/public/photos/raulji-group-business-consulting.webp";
import registration from "@/public/photos/raulji-group-company-registration.webp";
import meeting from "@/public/photos/raulji-group-client-meeting.webp";
import documents from "@/public/photos/raulji-group-documents.webp";
import gujarat from "@/public/photos/raulji-group-gujarat.webp";
import technologies from "@/public/photos/raulji-technologies.webp";
import enquiry from "@/public/photos/raulji-group-enquiry.webp";

/**
 * The photography slots from the image plan in AUDIT.md.
 *
 * Every entry currently points at a placeholder file that says so on its face.
 * They are here so the layouts can be reviewed with images in them, and so the
 * handover is a file swap rather than a code change: drop the real photograph
 * in `public/photos/` under the same filename, set `placeholder: false`, and
 * the site is done with it.
 *
 * `placeholder: true` is what stops a stand-in going out as if it were real.
 * Anything flagged renders a visible "Placeholder image" marker, is excluded
 * from OG images, and is never given `priority`, so it cannot quietly become
 * the thing a visitor or a search engine takes for a photograph of the
 * business. That is the line the brand rules draw: no invented offices, no
 * stock people, nothing presented as Raulji Group that is not (master rule 1).
 *
 * Alt text is written for the real photograph, not for the placeholder, so it
 * does not have to be revisited later.
 */
export interface BrandImageEntry {
  src: StaticImageData;
  alt: string;
  placeholder: boolean;
}

export const IMAGES = {
  office: {
    src: office,
    alt: "Raulji Group office in Vadodara",
    placeholder: true,
  },
  consulting: {
    src: consulting,
    alt: "A Raulji Group business consulting session",
    placeholder: true,
  },
  registration: {
    src: registration,
    alt: "Company registration documents being prepared at Raulji Group",
    placeholder: true,
  },
  meeting: {
    src: meeting,
    alt: "A client meeting at Raulji Group",
    placeholder: true,
  },
  documents: {
    src: documents,
    alt: "Incorporation documents prepared by Raulji Group",
    placeholder: true,
  },
  gujarat: {
    src: gujarat,
    alt: "Business district in Gujarat",
    placeholder: true,
  },
  technologies: {
    src: technologies,
    alt: "Raulji Technologies",
    placeholder: true,
  },
  enquiry: {
    src: enquiry,
    alt: "The Raulji Group team at work",
    placeholder: true,
  },
} as const satisfies Record<string, BrandImageEntry>;

export type ImageSlot = keyof typeof IMAGES;
