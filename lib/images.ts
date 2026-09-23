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
import insurance from "@/public/photos/raulji-group-insurance.webp";
import compliance from "@/public/photos/raulji-group-compliance.webp";
import hero from "@/public/photos/raulji-group-hero.webp";
import pvtStructure from "@/public/photos/private-limited-company-registration.webp";
import llpStructure from "@/public/photos/llp-registration-india.webp";
import partnershipStructure from "@/public/photos/partnership-firm-registration.webp";
import proprietorshipStructure from "@/public/photos/proprietorship-registration.webp";

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
  /*
   * The hero, 16:9.
   *
   * This is the only slot that takes `priority`, because it is the only one
   * above the fold. It is the same drawing as `structure` rendered at 16:9
   * rather than the 21:9 file cropped to fit: object-cover on the wide version
   * cuts its caption off the left edge.
   */
  hero: {
    src: hero,
    alt: "Raulji Group drawn as one group holding two brands, Raulji Consulting Services and Raulji Technologies, kept separate because they do different work",
    placeholder: false,
  },
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
  /** Wide band, 21:9. The four structures a business can register as. */
  registration: {
    src: registration,
    alt: "The four registration structures side by side: Private Limited, LLP, Partnership and Proprietorship, each with less annual filing than the last",
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
    alt: "raulji.com and rauljitechnologies.com drawn as two separate sites with one link between them",
    placeholder: false,
  },
  enquiry: {
    src: enquiry,
    alt: "Tell Raulji Group what you are building",
    placeholder: false,
  },
  insurance: {
    src: insurance,
    alt: "Insurance cover drawn over a business, arranged by Raulji Group and underwritten by the insurer",
    placeholder: false,
  },
  compliance: {
    src: compliance,
    alt: "One financial year with its filing dates marked on it",
    placeholder: false,
  },

  /*
   * One panel per registration structure, for the cards on the homepage.
   *
   * The design brief asks for four distinct visuals here and says explicitly
   * that four generic document images would be wrong. It is right, and the
   * cards were worse than that: four lucide icons, which told a reader the
   * structures differ without ever saying how.
   *
   * Each panel draws the single thing that separates its structure from the
   * other three, and the alt text describes the drawing rather than repeating
   * the service name the card heading already carries.
   */
  pvtStructure: {
    src: pvtStructure,
    alt: "A company boundary drawn around a grid of share units, some issued and some not, showing ownership divided into transferable shares",
    placeholder: false,
  },
  llpStructure: {
    src: llpStructure,
    alt: "Two partners standing behind an arc, showing partners whose liability is capped",
    placeholder: false,
  },
  partnershipStructure: {
    src: partnershipStructure,
    alt: "Two partners joined by lines running down to a signed deed between them, and no liability shield",
    placeholder: false,
  },
  proprietorshipStructure: {
    src: proprietorshipStructure,
    alt: "A single owner inside one unbroken ring, showing a person and a business that are the same legal entity",
    placeholder: false,
  },
} as const satisfies Record<string, BrandImageEntry>;

export type ImageSlot = keyof typeof IMAGES;
