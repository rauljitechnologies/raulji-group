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

import rjkAerial from "@/public/photos/cities/rajkot/city-aerial.webp";
import rjkHighStreet from "@/public/photos/cities/rajkot/high-street-ring-road.webp";
import rjkWatson from "@/public/photos/cities/rajkot/watson-museum.webp";
import rjkAjiDam from "@/public/photos/cities/rajkot/aji-dam.webp";
import rjkSkyline from "@/public/photos/cities/rajkot/skyline-dusk.webp";

import cardAmreli from "@/public/photos/cities/cards/amreli.webp";
import cardAnand from "@/public/photos/cities/cards/anand.webp";
import cardAnkleshwar from "@/public/photos/cities/cards/ankleshwar.webp";
import cardBharuch from "@/public/photos/cities/cards/bharuch.webp";
import cardBhavnagar from "@/public/photos/cities/cards/bhavnagar.webp";
import cardBhuj from "@/public/photos/cities/cards/bhuj.webp";
import cardBotad from "@/public/photos/cities/cards/botad.webp";
import cardDahod from "@/public/photos/cities/cards/dahod.webp";
import cardGandhidham from "@/public/photos/cities/cards/gandhidham.webp";
import cardGodhra from "@/public/photos/cities/cards/godhra.webp";
import cardHalol from "@/public/photos/cities/cards/halol.webp";
import cardHimmatnagar from "@/public/photos/cities/cards/himmatnagar.webp";
import cardJamnagar from "@/public/photos/cities/cards/jamnagar.webp";
import cardJhalod from "@/public/photos/cities/cards/jhalod.webp";
import cardKalol from "@/public/photos/cities/cards/kalol.webp";
import cardMehsana from "@/public/photos/cities/cards/mehsana.webp";
import cardModasa from "@/public/photos/cities/cards/modasa.webp";
import cardMorbi from "@/public/photos/cities/cards/morbi.webp";
import cardNadiad from "@/public/photos/cities/cards/nadiad.webp";
import cardNavsari from "@/public/photos/cities/cards/navsari.webp";
import cardPalanpur from "@/public/photos/cities/cards/palanpur.webp";
import cardPatan from "@/public/photos/cities/cards/patan.webp";
import cardPorbandar from "@/public/photos/cities/cards/porbandar.webp";
import cardSurat from "@/public/photos/cities/cards/surat.webp";
import cardSurendranagar from "@/public/photos/cities/cards/surendranagar.webp";
import cardValsad from "@/public/photos/cities/cards/valsad.webp";
import cardVapi from "@/public/photos/cities/cards/vapi.webp";

import csHero from "@/public/photos/city-services/hero-industry.webp";
import csCta from "@/public/photos/city-services/cta-skyline.webp";
import csMarket from "@/public/photos/city-services/market-fabrication.webp";
import csSuits from "@/public/photos/city-services/suits-engineers.webp";
import csDocuments from "@/public/photos/city-services/documents.webp";
import csVendorForm from "@/public/photos/city-services/check-vendor-form.webp";
import csAudit from "@/public/photos/city-services/check-audit.webp";
import csIndustrialUnit from "@/public/photos/city-services/check-industrial-unit.webp";
import csPartners from "@/public/photos/city-services/check-partners.webp";
import csLlp from "@/public/photos/city-services/structure-llp.webp";
import csPartnership from "@/public/photos/city-services/structure-partnership.webp";
import csProprietorship from "@/public/photos/city-services/structure-proprietorship.webp";

/**
 * Photographs for the city pages, taken from the "Raulji Ahmedabad" design
 * (claude.ai/design) at the owner's request, 2026-10-01.
 *
 * They are Unsplash photographs, not photographs of Raulji Group, so they are
 * self-hosted rather than hotlinked and the alt text describes the scene,
 * never "our office" or "our team". Master rule 1 prefers real photography;
 * swap a file under public/photos/cities/ when it exists.
 *
 * Rajkot is the exception to the sentence above. Unsplash has nothing of the
 * city, so its five photographs come from Wikimedia Commons under CC BY-SA and
 * were resized, cropped and converted to WebP here. That licence requires the
 * photographer to be credited and the adaptation disclosed, which is what
 * lib/image-credits.ts and /image-credits/ exist for. Add a Commons photograph
 * to this file only together with its entry there.
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
  /*
   * Rajkot. The aerial is the establishing shot, as the rooftops are for
   * Ahmedabad: the city reads as the dense low-rise engineering town the page
   * describes rather than as a skyline. The business areas are the industrial
   * estates on the city's edge, which have no usable photography, so they take
   * the generic office interiors the other cities use.
   */
  rajkot: {
    hero: { src: rjkAerial, alt: "Aerial view across central Rajkot" },
    gallery: [
      { src: rjkAerial, alt: "Aerial view across central Rajkot", caption: "Saurashtra's engineering centre" },
      {
        src: rjkHighStreet,
        alt: "Apartment and commercial towers on the 150 Feet Ring Road, Rajkot",
        caption: "150 Feet Ring Road",
      },
      {
        src: rjkWatson,
        alt: "The stone facade of the Watson Museum, Rajkot",
        caption: "Watson Museum, Jubilee Garden",
      },
      {
        src: rjkAjiDam,
        alt: "A wading bird on the water at Aji Dam at sunset",
        caption: "Aji Dam, west of the city",
      },
    ],
    environment: [
      {
        src: rjkHighStreet,
        alt: "Apartment and commercial towers on the 150 Feet Ring Road, Rajkot",
      },
      { src: rjkWatson, alt: "The stone facade of the Watson Museum, Rajkot" },
      OFFICE.desks,
    ],
    cta: rjkSkyline,
    areas: [
      { kind: "Industrial estate", photo: OFFICE.openPlan },
      { kind: "Industrial estate", photo: OFFICE.cabin },
      { kind: "Commercial", photo: OFFICE.desks },
      { kind: "Commercial", photo: OFFICE.workstations },
      { kind: "Manufacturing", photo: OFFICE.boardroom },
    ],
  },
};

/**
 * Photographs on the city cards: the Gujarat hub's city finder and the
 * "Other cities" list at the foot of every city page. Decorative (alt="").
 *
 * Ahmedabad, Vadodara, Gandhinagar, Junagadh, Dwarka and Rajkot use photographs
 * checked as showing that city. Every other city uses the "Raulji Gujarat
 * v2" design's pick, at the owner's request (2026-10-01), knowing that some
 * of those do not show the named city (Surat, Godhra, Patan, Kalol and
 * Amreli among them). Replace a file under public/photos/cities/cards/ with
 * a real photograph of that city when one is available.
 */
export const CITY_CARD_PHOTOS: Record<string, Photo> = {
  ahmedabad: CITY_PLACE_PHOTOS.ahmedabad.hero,
  vadodara: CITY_PLACE_PHOTOS.vadodara.gallery[0],
  gandhinagar: CITY_PLACE_PHOTOS.gandhinagar.hero,
  junagadh: { src: jndMaqbara, alt: "Mahabat Maqbara, Junagadh" },
  dwarka: CITY_PLACE_PHOTOS.dwarka.gallery[2],
  rajkot: CITY_PLACE_PHOTOS.rajkot.gallery[1],
  amreli: { src: cardAmreli, alt: "" },
  anand: { src: cardAnand, alt: "" },
  ankleshwar: { src: cardAnkleshwar, alt: "" },
  bharuch: { src: cardBharuch, alt: "" },
  bhavnagar: { src: cardBhavnagar, alt: "" },
  bhuj: { src: cardBhuj, alt: "" },
  botad: { src: cardBotad, alt: "" },
  dahod: { src: cardDahod, alt: "" },
  gandhidham: { src: cardGandhidham, alt: "" },
  godhra: { src: cardGodhra, alt: "" },
  halol: { src: cardHalol, alt: "" },
  himmatnagar: { src: cardHimmatnagar, alt: "" },
  jamnagar: { src: cardJamnagar, alt: "" },
  jhalod: { src: cardJhalod, alt: "" },
  kalol: { src: cardKalol, alt: "" },
  mehsana: { src: cardMehsana, alt: "" },
  modasa: { src: cardModasa, alt: "" },
  morbi: { src: cardMorbi, alt: "" },
  nadiad: { src: cardNadiad, alt: "" },
  navsari: { src: cardNavsari, alt: "" },
  palanpur: { src: cardPalanpur, alt: "" },
  patan: { src: cardPatan, alt: "" },
  porbandar: { src: cardPorbandar, alt: "" },
  surat: { src: cardSurat, alt: "" },
  surendranagar: { src: cardSurendranagar, alt: "" },
  valsad: { src: cardValsad, alt: "" },
  vapi: { src: cardVapi, alt: "" },
};

/**
 * Photographs for the city + service pages (/vadodara/private-limited-company-
 * registration/ and the other nineteen), taken from the "Raulji Vadodara
 * Private Limited" design (claude.ai/design).
 *
 * The design is one page, but the route that renders it is shared by all
 * twenty pairings, so these are the slots the layout has rather than anything
 * specific to Vadodara. `factors` is positional: every entry in
 * lib/city-services.ts carries exactly four localFactors, and these sit
 * alongside them in order.
 *
 * Unsplash again, so self-hosted rather than hotlinked, and the alt text
 * describes the scene only. The design captioned two of these as Vadodara and
 * one as "a Raulji Group advisor"; they are stock photographs of neither, and
 * the same files are served on the Surat and Rajkot pages, so the claims are
 * dropped here (master rule 1 and 13). The enquiry slot reuses the city
 * pages' photograph rather than adding a near-duplicate of it.
 */
export const CITY_SERVICE_PHOTOS = {
  /** Behind the hero and the closing call to action. Decorative. */
  hero: csHero,
  cta: csCta,
  market: {
    src: csMarket,
    alt: "Fabrication work in progress at an engineering workshop",
  },
  suits: { src: csSuits, alt: "Engineers reviewing plant instrumentation" },
  documents: {
    src: csDocuments,
    alt: "Identity and address documents laid out for a company filing",
  },
  enquiry: CITY_PAGE_PHOTOS.enquiry,
  /** One per localFactors entry, in the order they are written. */
  factors: [
    { src: csVendorForm, alt: "A vendor registration form being read through" },
    { src: csAudit, alt: "Annual accounts and audit papers on a desk" },
    { src: csIndustrialUnit, alt: "An industrial unit on a manufacturing estate" },
    { src: csPartners, alt: "Two business partners shaking hands" },
  ] satisfies Photo[],
  /** The "other structures" cards, by service slug. */
  structures: {
    "pvt-registration": CITY_PAGE_PHOTOS.structures["pvt-registration"],
    "llp-registration": { src: csLlp, alt: "Business partners in a meeting" },
    "partnership-registration": { src: csPartnership, alt: "A machining workshop" },
    "proprietorship-registration": {
      src: csProprietorship,
      alt: "A one-person workspace with a desk and laptop",
    },
  } as Record<string, Photo>,
};
