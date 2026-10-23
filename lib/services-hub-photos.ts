import type { StaticImageData } from "next/image";

import consulting from "@/public/photos/services-hub/consulting.webp";
import registration from "@/public/photos/services-hub/registration.webp";
import structures from "@/public/photos/services-hub/structures.webp";
import pvtCompliance from "@/public/photos/services-hub/pvt-compliance.webp";
import llpCompliance from "@/public/photos/services-hub/llp-compliance.webp";
import insurance from "@/public/photos/services-hub/insurance.webp";
import it from "@/public/photos/services-hub/it.webp";
import digital from "@/public/photos/services-hub/digital.webp";
import stage from "@/public/photos/services-hub/stage.webp";
import technology from "@/public/photos/services-hub/technology.webp";
import cta from "@/public/photos/services-hub/cta.webp";

/**
 * Photographs for the services hub, taken from the "Raulji Services" design
 * (claude.ai/design) at the owner's request, 2026-10-01.
 *
 * They are Unsplash photographs, not photographs of Raulji Group, so they are
 * self-hosted here rather than hotlinked and the alt text describes the scene,
 * never "our office" or "our team". Master rule 1 prefers real Raulji
 * photography; swap a file under public/photos/services-hub/ when it exists.
 */
export const HUB_PHOTOS = {
  consulting: {
    src: consulting,
    alt: "A presenter speaking to a group seated around a boardroom table with laptops",
  },
  registration: {
    src: registration,
    alt: "Two professionals talking over a laptop",
  },
  structures: {
    src: structures,
    alt: "A team seated at a long table listening to a colleague presenting",
  },
  pvtCompliance: { src: pvtCompliance, alt: "An office with desks and a glass-walled meeting room" },
  llpCompliance: { src: llpCompliance, alt: "A private office with a desk and shelves of files" },
  insurance: { src: insurance, alt: "An open-plan office with desks and chairs" },
  it: { src: it, alt: "A modern office workstation with ergonomic chairs" },
  digital: { src: digital, alt: "A person working on a laptop in an office lounge" },
  stage: { src: stage, alt: "Colleagues applauding a presenter in a meeting room" },
  technology: { src: technology, alt: "" },
  cta: { src: cta, alt: "An office with workstations and a meeting area" },
} as const satisfies Record<string, { src: StaticImageData; alt: string }>;

export type HubPhoto = keyof typeof HUB_PHOTOS;
