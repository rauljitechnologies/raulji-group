import type { StaticImageData } from "next/image";

import structurePvt from "@/public/photos/cities/structure-pvt.webp";
import structureLlp from "@/public/photos/cities/structure-llp.webp";
import structurePartnership from "@/public/photos/cities/structure-partnership.webp";
import structureProprietorship from "@/public/photos/cities/structure-proprietorship.webp";
import remote from "@/public/photos/cities/remote.webp";
import enquiry from "@/public/photos/cities/enquiry.webp";
import faqs from "@/public/photos/cities/faqs.webp";
import officeDesks from "@/public/photos/cities/office-desks.webp";
import officeWorkstations from "@/public/photos/cities/office-workstations.webp";
import officeOpenPlan from "@/public/photos/cities/office-open-plan.webp";
import officeCabin from "@/public/photos/cities/office-cabin.webp";

import ahdRiverfront from "@/public/photos/cities/ahmedabad/sabarmati-riverfront.webp";
import ahdRooftops from "@/public/photos/cities/ahmedabad/old-city-rooftops.webp";
import ahdIim from "@/public/photos/cities/ahmedabad/iim-vastrapur.webp";
import ahdAtal from "@/public/photos/cities/ahmedabad/atal-bridge.webp";

import vadPalace from "@/public/photos/cities/vadodara/laxmi-vilas-palace.webp";
import vadDomes from "@/public/photos/cities/vadodara/palace-domes.webp";
import vadMural from "@/public/photos/cities/vadodara/heritage-mural.webp";
import vadFacade from "@/public/photos/cities/vadodara/heritage-facade.webp";
import vadMonochrome from "@/public/photos/cities/vadodara/palace-monochrome.webp";

import gnrGift from "@/public/photos/cities/gandhinagar/gift-city.webp";
import gnrRoundabout from "@/public/photos/cities/gandhinagar/roundabout.webp";
import gnrRelief from "@/public/photos/cities/gandhinagar/carved-relief.webp";
import gnrBarrage from "@/public/photos/cities/gandhinagar/barrage.webp";
import gnrSkyline from "@/public/photos/cities/gandhinagar/skyline-sunset.webp";
import gnrTower from "@/public/photos/cities/gandhinagar/tower-sunset.webp";
import gnrShopfronts from "@/public/photos/cities/gandhinagar/shopfronts.webp";
import gnrSun from "@/public/photos/cities/gandhinagar/sun-over-tower.webp";

import dwkSpire from "@/public/photos/cities/dwarka/temple-spire.webp";
import dwkStreet from "@/public/photos/cities/dwarka/temple-street.webp";
import dwkBoats from "@/public/photos/cities/dwarka/fishing-boats.webp";
import dwkLighthouse from "@/public/photos/cities/dwarka/lighthouse.webp";
import dwkSetu from "@/public/photos/cities/dwarka/sudarshan-setu.webp";
import dwkJetty from "@/public/photos/cities/dwarka/jetty.webp";
import dwkSudama from "@/public/photos/cities/dwarka/sudama-setu-street.webp";
import dwkBeach from "@/public/photos/cities/dwarka/beach.webp";
import dwkAnchor from "@/public/photos/cities/dwarka/boats-at-anchor.webp";
import dwkGulls from "@/public/photos/cities/dwarka/boat-and-gulls.webp";

import jndMaqbara from "@/public/photos/cities/junagadh/mahabat-maqbara.webp";

/**
 * Photographs for the city pages, taken from the "Raulji Ahmedabad" design
 * (claude.ai/design) at the owner's request, 2026-10-01.
 *
 * They are Unsplash photographs, not photographs of Raulji Group, so they are
 * self-hosted rather than hotlinked and the alt text describes the scene,
 * never "our office" or "our team". Master rule 1 prefers real photography;
 * swap a file under public/photos/cities/ when it exists.
 *
 * Two sets:
 * - CITY_PAGE_PHOTOS and OFFICE are generic office and meeting photography,
 *   so they say nothing about any particular place. The area cards use them
 *   as the design does; the alt text describes the room, never the area.
 * - CITY_PLACE_PHOTOS is photography of the city itself. Only a city with real
 *   photographs of the place gets an entry; the page renders its photo-free
 *   layout for the rest rather than borrowing another city's skyline.
 */

export interface Photo {
  src: StaticImageData;
  alt: string;
}

export const CITY_PAGE_PHOTOS = {
  structures: {
    "pvt-registration": {
      src: structurePvt,
      alt: "A group seated around a long boardroom table with laptops",
    },
    "llp-registration": {
      src: structureLlp,
      alt: "Colleagues applauding a presenter in a meeting room",
    },
    "partnership-registration": {
      src: structurePartnership,
      alt: "A presenter speaking to a group around a meeting table",
    },
    "proprietorship-registration": {
      src: structureProprietorship,
      alt: "A small private office with a desk and a shelf of files",
    },
  } as Record<string, Photo>,
  remote: { src: remote, alt: "An open-plan office reception with a lounge area" },
  enquiry: { src: enquiry, alt: "Two people shaking hands across a desk" },
  faqs: { src: faqs, alt: "Two men discussing something on a tablet" },
} satisfies Record<string, Photo | Record<string, Photo>>;

export interface CityPlacePhotos {
  /** Behind the hero, and first in the strip under it. */
  hero: Photo;
  /** The strip under the hero: four photographs with a caption each. */
  gallery: (Photo & { caption: string })[];
  /** Beside "The business environment": one tall, two short. */
  environment: [Photo, Photo, Photo];
  /** Behind the closing call to action. Decorative. */
  cta: StaticImageData;
  /**
   * One per entry in the city's `businessAreas`, in the same order, with the
   * kind of area it is. A missing entry renders a text-only card.
   */
  areas: ({ kind: string; photo: Photo } | undefined)[];
}

/** Generic office interiors, used on the business-area cards. */
const OFFICE = {
  desks: { src: officeDesks, alt: "A modern office with desks and ergonomic chairs" },
  workstations: { src: officeWorkstations, alt: "An office floor with a row of workstations" },
  openPlan: { src: officeOpenPlan, alt: "An open office with desks and plants" },
  cabin: { src: officeCabin, alt: "An office with workstations and a glass-walled cabin" },
  boardroom: CITY_PAGE_PHOTOS.structures["pvt-registration"],
} satisfies Record<string, Photo>;

const DWK_STREET: Photo = { src: dwkStreet, alt: "Pilgrims crowding a temple street in Dwarka" };
const DWK_SETU: Photo = { src: dwkSetu, alt: "Sudarshan Setu, the cable-stayed bridge to Beyt Dwarka" };
const DWK_BEACH: Photo = { src: dwkBeach, alt: "A sandy beach with the lighthouse in the distance" };

const riverfront: Photo = {
  src: ahdRiverfront,
  alt: "The Sabarmati riverfront at dusk with the city skyline",
};
const rooftops: Photo = { src: ahdRooftops, alt: "Aerial view across Ahmedabad's rooftops" };
const iim: Photo = { src: ahdIim, alt: "Brick corridor at IIM Ahmedabad, Vastrapur" };

export const CITY_PLACE_PHOTOS: Record<string, CityPlacePhotos> = {
  ahmedabad: {
    hero: riverfront,
    gallery: [
      { ...riverfront, caption: "Sabarmati Riverfront" },
      { ...rooftops, caption: "Gujarat's largest commercial centre" },
      { ...iim, caption: "Vastrapur and the startup belt" },
      {
        src: ahdAtal,
        alt: "Atal Foot Over Bridge lit up at night over the Sabarmati",
        caption: "Atal Bridge, Paldi",
      },
    ],
    environment: [rooftops, iim, OFFICE.desks],
    cta: ahdAtal,
    areas: [
      { kind: "Corporate", photo: OFFICE.desks },
      { kind: "Startups & services", photo: OFFICE.boardroom },
      { kind: "Commercial", photo: OFFICE.workstations },
      { kind: "Industrial", photo: OFFICE.openPlan },
      { kind: "Manufacturing", photo: OFFICE.cabin },
    ],
  },
  vadodara: {
    hero: { src: vadPalace, alt: "Laxmi Vilas Palace, Vadodara, across its lawns" },
    gallery: [
      { src: vadDomes, alt: "The domes of Laxmi Vilas Palace, Vadodara", caption: "Laxmi Vilas Palace" },
      {
        src: vadMural,
        alt: "A painted panel set into a carved heritage wall in Vadodara",
        caption: "A city of heritage and industry",
      },
      {
        src: vadFacade,
        alt: "A carved stone heritage facade in Vadodara",
        caption: "Where Raulji Group is based",
      },
      { ...OFFICE.desks, caption: "Engineering and IT services" },
    ],
    environment: [
      { src: vadDomes, alt: "The domes of Laxmi Vilas Palace, Vadodara" },
      { src: vadFacade, alt: "A carved stone heritage facade in Vadodara" },
      OFFICE.desks,
    ],
    cta: vadMonochrome,
    areas: [
      { kind: "Industrial", photo: OFFICE.openPlan },
      { kind: "Manufacturing", photo: OFFICE.cabin },
      { kind: "Chemicals", photo: OFFICE.workstations },
      { kind: "Commercial", photo: OFFICE.desks },
      { kind: "Services & startups", photo: OFFICE.boardroom },
    ],
  },
  gandhinagar: {
    hero: { src: gnrGift, alt: "Aerial view of the GIFT City towers, Gandhinagar" },
    gallery: [
      { src: gnrGift, alt: "Aerial view of the GIFT City towers, Gandhinagar", caption: "GIFT City IFSC" },
      { src: gnrRoundabout, alt: "A palm-lined roundabout in Gandhinagar", caption: "Gujarat\u2019s planned capital" },
      {
        src: gnrRelief,
        alt: "Carved stone figures on a heritage monument",
        caption: "Heritage around the capital",
      },
      { src: gnrBarrage, alt: "A river barrage with water flowing over rocks", caption: "The Ahmedabad corridor" },
    ],
    environment: [
      { src: gnrSkyline, alt: "Gandhinagar skyline silhouetted at sunset" },
      { src: gnrTower, alt: "A communications tower silhouetted against a sunset sky" },
      OFFICE.desks,
    ],
    cta: gnrSun,
    areas: [
      { kind: "Financial services", photo: { src: gnrGift, alt: "Aerial view of the GIFT City towers" } },
      { kind: "Commercial", photo: { src: gnrShopfronts, alt: "A row of shopfronts in a Gandhinagar commercial block" } },
      { kind: "IT & fintech", photo: OFFICE.desks },
      { kind: "Services & startups", photo: OFFICE.boardroom },
      { kind: "Corridor", photo: { src: gnrBarrage, alt: "A river barrage with water flowing over rocks" } },
    ],
  },
  dwarka: {
    hero: { src: dwkSpire, alt: "The spire of Dwarkadhish Temple with its flag" },
    gallery: [
      { ...DWK_STREET, caption: "A pilgrimage town" },
      { src: dwkBoats, alt: "Fishing boats moored in shallow blue water", caption: "Fishing on the coast" },
      { src: dwkLighthouse, alt: "Dwarka lighthouse above a rough sea", caption: "The Dwarka coastline" },
      { ...DWK_SETU, caption: "Linking the Okha belt" },
    ],
    environment: [
      { src: dwkJetty, alt: "A passenger boat leaving a jetty on the Gulf of Kutch" },
      { src: dwkSudama, alt: "A market street leading to the Sudama Setu footbridge, Dwarka" },
      DWK_BEACH,
    ],
    cta: dwkGulls,
    areas: [
      { kind: "Pilgrimage & retail", photo: DWK_STREET },
      { kind: "Port & fishing", photo: { src: dwkAnchor, alt: "Fishing boats at anchor near a port crane" } },
      { kind: "Hospitality", photo: DWK_BEACH },
      { kind: "District", photo: DWK_SETU },
    ],
  },
};

/**
 * Photographs on the city cards: the Gujarat hub's city finder and the
 * "Other cities" list at the foot of every city page. Only cities whose
 * photograph has been checked as showing that city get one; the design's
 * picks for the rest did not all show the city named on the card. Add a
 * city here only with a photograph of that city.
 */
export const CITY_CARD_PHOTOS: Record<string, Photo> = {
  ahmedabad: CITY_PLACE_PHOTOS.ahmedabad.hero,
  vadodara: CITY_PLACE_PHOTOS.vadodara.gallery[0],
  gandhinagar: CITY_PLACE_PHOTOS.gandhinagar.hero,
  junagadh: { src: jndMaqbara, alt: "Mahabat Maqbara, Junagadh" },
  dwarka: CITY_PLACE_PHOTOS.dwarka.gallery[2],
};
