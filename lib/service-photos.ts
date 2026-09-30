import type { ImageSlot } from "@/lib/images";

/**
 * Photographs for the service pages (service-page brief, sections 8 to 14, and
 * the image-rich update that followed it).
 *
 * Each page tells its service as a sequence of scenes, and each scene has a
 * fixed place in the layout:
 *
 *   hero          beside the H1
 *   intro         beside the quick answer ("What is ...?")
 *   audience      beside "Who can consider ...?"
 *   benefits      above the structure figure, beside the benefits
 *   documents     beside "Information you may need"
 *   considerations beside "Common mistakes to avoid"
 *   after         beside "What happens after registration?"
 *
 * The consulting page uses its own scene names; see its entry.
 *
 * A slot renders only when its file exists in public/photos/services/, checked
 * at build time. Until then the section falls back to its text-only layout,
 * except the hero, which shows the page's drawn panel. So the handover is a
 * file drop and a rebuild, and no page ever shows a grey placeholder or a
 * stock picture standing in for one.
 *
 * The enquiry section on every page uses the Chairman's photograph instead of
 * a generated "consultant" scene, because the brief's own priority is real
 * Raulji photography first, and generated people may never stand in for the
 * team (master rule 1).
 *
 * Generation prompts and the delivery spec: docs/SERVICE-IMAGE-BRIEF.md.
 * Alt text describes the scene, not keywords. Rewrite it if the photograph
 * supplied differs from the concept.
 */
export interface ServicePhoto {
  /** Filename inside public/photos/services/. Unique across the site. */
  file: string;
  alt: string;
  /** The concept, for whoever produces the image. */
  prompt: string;
}

export interface ServicePhotoSet {
  /** Drawn panel shown in the hero until the hero photograph exists. */
  fallback: ImageSlot;
  photos: Record<string, ServicePhoto>;
}

export const SERVICE_PHOTO_DIR = "photos/services";

/** Appended to every prompt so the set reads as one visual system. */
export const HOUSE_STYLE =
  "Photorealistic premium editorial photograph, authentic Indian business setting, natural daylight, realistic skin texture and natural expressions, clean composition, subtle navy blue and white tones. No text, no logos, no certificates, no government or MCA marks, no seals or stamps, no readable documents, no handshake, no posed group smiles, no futuristic or holographic effects.";

export const SERVICE_PHOTOS: Record<string, ServicePhotoSet> = {
  "pvt-registration": {
    fallback: "pvtStructure",
    photos: {
      hero: {
        file: "private-limited-company-registration-india.webp",
        alt: "Indian entrepreneurs discussing private limited company registration",
        prompt:
          "Two or three Indian entrepreneurs discussing the formation of a private limited company with a business consultant in a modern Indian office. Documents, a laptop and a notebook lie naturally on the table. Thoughtful, professional, discussing company structure and ownership.",
      },
      intro: {
        file: "private-limited-company-founders-ownership.webp",
        alt: "A small founding team discussing how ownership of their company will be divided",
        prompt:
          "A small Indian founding team of three in their late twenties around a table, one sketching a simple ownership split on a notepad while the others look on. Early-stage office, whiteboard softly out of focus.",
      },
      audience: {
        file: "private-limited-company-startup-team-planning.webp",
        alt: "A growing startup team planning expansion around a meeting table",
        prompt:
          "A growing Indian startup team of four or five planning expansion in a bright meeting room, one person presenting from a laptop screen that is not readable, the others engaged. Real working atmosphere, not posed.",
      },
      benefits: {
        file: "private-limited-company-directors-meeting.webp",
        alt: "Company founders discussing management and growth at a board table",
        prompt:
          "Two founders and an adviser at a small board table discussing management and growth, papers and a tablet in front of them. Calm, serious, established company feel.",
      },
      documents: {
        file: "private-limited-company-incorporation-documents.webp",
        alt: "Incorporation paperwork organised in folders on a desk beside a laptop",
        prompt:
          "Overhead view of an organised desk: labelled folders, a small stack of identity and address papers with nothing readable, a laptop and a pen. Tidy and methodical, suggesting documents being prepared for company registration.",
      },
    },
  },
  "llp-registration": {
    fallback: "llpStructure",
    photos: {
      hero: {
        file: "llp-registration-india.webp",
        alt: "Business partners discussing LLP registration",
        prompt:
          "Two Indian professionals, a man and a woman in their thirties, discussing forming an LLP at a wooden table in a small professional services office. Laptop and pen nearby. Collaborative and careful.",
      },
      intro: {
        file: "llp-partners-business-agreement.webp",
        alt: "Two partners reading through the terms of their business agreement",
        prompt:
          "Two Indian partners reading through a printed agreement together, one pointing to a clause, the other considering it. Close to medium shot, focus on the discussion rather than the paper.",
      },
      audience: {
        file: "llp-professional-services-partners.webp",
        alt: "Partners in a professional services firm reviewing work together",
        prompt:
          "Partners in an Indian consultancy or accounting practice reviewing client work together at a shared desk, bookshelves and files behind them. Professional services atmosphere.",
      },
      documents: {
        file: "llp-registration-documents.webp",
        alt: "A partner arranging the documents needed to register an LLP",
        prompt:
          "A partner's hands arranging a neat set of folders and papers into order beside a laptop, nothing readable. Suggests preparing documents for registration.",
      },
    },
  },
  "partnership-registration": {
    fallback: "partnershipStructure",
    photos: {
      hero: {
        file: "partnership-firm-registration-india.webp",
        alt: "Two business partners planning a new venture together",
        prompt:
          "Two Indian business partners in their forties planning a new venture in the back office of a trading business, shelves of stock softly out of focus. A notebook and ledger on the desk. Practical and familiar with each other.",
      },
      intro: {
        file: "partnership-firm-partners-roles.webp",
        alt: "Partners discussing how responsibilities will be divided between them",
        prompt:
          "Two partners standing at a shop counter or workshop bench discussing who will handle what, one gesturing towards the premises. Everyday Indian small-business setting.",
      },
      benefits: {
        file: "partnership-deed-review.webp",
        alt: "Business partners reviewing their partnership deed before signing",
        prompt:
          "Two partners seated side by side reviewing a printed deed before signing, pen in hand, nothing readable on the paper. Serious, considered moment.",
      },
      documents: {
        file: "partnership-firm-registration-documents.webp",
        alt: "Documents for a partnership firm organised on an office desk",
        prompt:
          "An office desk with a neat set of folders, a closed file and a laptop, arranged for a registration application. No readable text.",
      },
      considerations: {
        file: "partnership-profit-sharing-planning.webp",
        alt: "Partners working through profit sharing and responsibilities on paper",
        prompt:
          "Two partners working through figures on a notepad and calculator, discussing how profits and duties will be shared. Close shot of hands and faces, warm office light.",
      },
    },
  },
  "proprietorship-registration": {
    fallback: "proprietorshipStructure",
    photos: {
      hero: {
        file: "proprietorship-registration-india.webp",
        alt: "Indian entrepreneur planning a proprietorship business",
        prompt:
          "A single Indian entrepreneur in their late twenties planning a new business at a desk in a small, tidy workspace, writing in a notebook next to a laptop and phone. Focused and optimistic.",
      },
      intro: {
        file: "sole-proprietor-working-independently.webp",
        alt: "A business owner working independently in their own shop",
        prompt:
          "An Indian business owner working alone in their own small shop or studio, attending to the business. Independent, capable, everyday setting.",
      },
      audience: {
        file: "proprietorship-small-business-owner.webp",
        alt: "A small business owner serving a customer at their counter",
        prompt:
          "An Indian small-business owner at their counter, mid-conversation with a customer who is seen from behind. Local retail or service business, natural light.",
      },
      documents: {
        file: "proprietorship-registration-documents.webp",
        alt: "An owner organising the papers needed for their business registrations",
        prompt:
          "A proprietor at a desk sorting a small folder of papers beside a phone and laptop, nothing readable. Simple and organised.",
      },
      after: {
        file: "proprietorship-business-planning-finances.webp",
        alt: "A business owner reviewing their finances and plans for the months ahead",
        prompt:
          "A business owner reviewing figures on a laptop with a notebook open beside it, in the evening after work, thoughtful. Home office or back office.",
      },
    },
  },
  "business-consulting": {
    fallback: "consulting",
    photos: {
      hero: {
        file: "business-consulting-india.webp",
        alt: "Indian entrepreneur discussing business strategy with a consultant",
        prompt:
          "An Indian business owner in conversation with an experienced consultant across a meeting table in a modern office. The consultant sketches options on a notepad. Calm, advisory rather than sales-driven.",
      },
      planning: {
        file: "business-consulting-strategy-discussion.webp",
        alt: "A consultant and a business owner working through a plan on paper",
        prompt:
          "A consultant and an owner leaning over a sheet of paper, working through the order of a plan, arrows and boxes sketched but not readable.",
      },
      structure: {
        file: "business-consulting-structure-options.webp",
        alt: "A founder comparing business structure options laid out on the table",
        prompt:
          "A founder looking at several printed option sheets laid side by side on a table, weighing them up, a consultant beside them. Wide shot suitable for a banner crop.",
      },
      registration: {
        file: "business-consulting-registration-explained.webp",
        alt: "A consultant explaining the registration steps to a client",
        prompt:
          "A consultant explaining steps to a client using a laptop turned towards them, screen not readable. Clear, patient explanation.",
      },
      growth: {
        file: "business-consulting-growth-planning.webp",
        alt: "A business team discussing plans to expand",
        prompt:
          "A small Indian business team of three or four discussing expansion around a table with a floor plan or map, engaged and practical.",
      },
      decision: {
        file: "business-consulting-founder-decision.webp",
        alt: "A founder reviewing a business plan before making a decision",
        prompt:
          "A founder alone at a desk reviewing a printed business plan, pen in hand, considering a decision. Quiet, focused.",
      },
    },
  },
};
