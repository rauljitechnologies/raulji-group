import type { StaticImageData } from "next/image";

import structure from "@/public/photos/raulji-group-structure.webp";
import office from "@/public/photos/raulji-group-office.webp";
import consulting from "@/public/photos/raulji-group-business-consulting.webp";
import registration from "@/public/photos/raulji-group-company-registration.webp";
import meeting from "@/public/photos/raulji-group-client-meeting.webp";
import documents from "@/public/photos/raulji-group-documents.webp";
import gujarat from "@/public/photos/raulji-group-gujarat.webp";
import technologies from "@/public/photos/raulji-technologies.webp";
import enquiry from "@/public/photos/raulji-group-enquiry.webp";

/**
 * The image slots from the plan in AUDIT.md.
 *
 * These are drawn artwork: a navy field, brand line work, the Raulji mark and
 * a line of type. Finished pieces, not grey boxes waiting to be filled, so the
 * pages read as designed rather than unbuilt.
 *
 * An illustrated photographic style was tried for the two place slots and
 * dropped: drawn skylines read as cheap next to the rest of the page, and a
 * full width dark band on the group's own introduction carried more visual
 * weight than an illustration should. `scripts/gen-panels.py` renders every
 * slot, so any of them can be redrawn at any size.
 *
 * They are also not photographs, and nothing about them pretends otherwise.
 * Each one draws something the page is already saying (a building elevation
 * over "Vadodara, Gujarat", a decision splitting into structures over
 * "Business consulting"), and the alt text describes what is actually on
 * screen. That is the line the brand rules draw: no invented offices, no stock
 * people, nothing presented as Raulji Group that is not (master rule 1).
 *
 * Real photography still beats them and should replace them slot by slot. The
 * handover is a file swap, not a code change: drop the photograph into
 * `public/photos/` under the same filename and update the alt text to describe
 * the photograph.
 *
 * `placeholder` stays in the type for anything added later that is a genuine
 * stand-in. Flagged entries render a visible marker and never take `priority`.
 */
export interface BrandImageEntry {
  src: StaticImageData;
  alt: string;
  placeholder: boolean;
}

export const IMAGES = {
  /** Wide band, 21:9. The group and the two brands it runs. */
  structure: {
    src: structure,
    alt: "Raulji Group and its two brands, Raulji Consulting Services and Raulji Technologies",
    placeholder: false,
  },
  office: {
    src: office,
    alt: "Raulji Group, Vadodara, Gujarat",
    placeholder: false,
  },
  consulting: {
    src: consulting,
    alt: "Business consulting at Raulji Group: clearer decisions",
    placeholder: false,
  },
  registration: {
    src: registration,
    alt: "Company registration handled by Raulji Group",
    placeholder: false,
  },
  meeting: {
    src: meeting,
    alt: "Talk to the Raulji Group team",
    placeholder: false,
  },
  documents: {
    src: documents,
    alt: "The documents a business registration needs",
    placeholder: false,
  },
  gujarat: {
    src: gujarat,
    alt: "Raulji Group works across Gujarat, filing online from Vadodara",
    placeholder: false,
  },
  technologies: {
    src: technologies,
    alt: "Raulji Technologies, the group's separate technology brand",
    placeholder: false,
  },
  enquiry: {
    src: enquiry,
    alt: "Tell Raulji Group what you are building",
    placeholder: false,
  },
} as const satisfies Record<string, BrandImageEntry>;

export type ImageSlot = keyof typeof IMAGES;
