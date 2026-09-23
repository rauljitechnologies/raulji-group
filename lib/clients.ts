import type { StaticImageData } from "next/image";

import africaFashionHouse from "@/public/clients/africa-fashion-house.webp";
import alMahaOptical from "@/public/clients/al-maha-optical.webp";
import alJazira from "@/public/clients/aljazira-supermarket.webp";
import arkarise from "@/public/clients/arkarise.webp";
import auriga from "@/public/clients/auriga.webp";
import bangpromo from "@/public/clients/bangpromo.webp";
import bratz from "@/public/clients/bratz.webp";
import buykriya from "@/public/clients/buykriya.webp";
import carDecor from "@/public/clients/car-decor.webp";
import cybermart from "@/public/clients/cybermart.webp";
import faye from "@/public/clients/faye.webp";
import futureRoots from "@/public/clients/future-roots.webp";
import goodees from "@/public/clients/goodees.webp";
import indianBeautifulArt from "@/public/clients/indian-beautiful-art.webp";
import knectt from "@/public/clients/knectt.webp";
import modernFabrics from "@/public/clients/modern-fabrics.webp";
import myesuq from "@/public/clients/myesuq.webp";
import nateeva from "@/public/clients/nateeva.webp";
import nobaj from "@/public/clients/nobaj.webp";
import nxtby from "@/public/clients/nxtby.webp";
import onlyForOrganic from "@/public/clients/only-for-organic.webp";
import orgoManya from "@/public/clients/orgo-manya.webp";
import powerlook from "@/public/clients/power.webp";
import promomilia from "@/public/clients/promomilia.webp";
import prozo from "@/public/clients/prozo.webp";
import regal from "@/public/clients/regal-fabric-gallery.webp";
import s3Buy from "@/public/clients/s3-buy.webp";
import sblMobileTyres from "@/public/clients/sbl-mobile-tyres.webp";
import shelfAdditions from "@/public/clients/shelf-additions.webp";
import smpGlobalStone from "@/public/clients/smp-global-stone.webp";
import sureSafety from "@/public/clients/sure-safety.webp";
import synergy from "@/public/clients/synergy.webp";
import theDjShop from "@/public/clients/the-dj-shop.webp";
import unicore from "@/public/clients/unicore.webp";
import wayuvega from "@/public/clients/wayuvega.webp";
import wear91 from "@/public/clients/wear91.webp";
import woodminium from "@/public/clients/woodminium.webp";

/**
 * Businesses the group has worked with.
 *
 * Every entry here is a real client with a real logo. The list and the logo
 * files come from the client wall Raulji Technologies publishes at
 * rauljitechnologies.com/clients/, which is the group's own site: nothing on
 * this page is invented, and no name has been added that the group does not
 * already publish (master rule 13).
 *
 * `brand` records which company in the group did the work, because the two do
 * different things and the page has to say which is which (master rule 14).
 * Every entry is currently Technologies. Consulting and registration client
 * work is not listed by name anywhere the group publishes, so it is not listed
 * here either; when that list exists, add those entries with
 * brand: "Raulji Consulting Services" and the page groups them on its own.
 *
 * Names follow the client's own logo where the published wall and the artwork
 * disagree, since the artwork is the verifiable one: "Powerlook" not "Power",
 * "Al Jazira Supermarkets" not "Aljaria Super Market", "Madhupur" not
 * "Madmupur".
 *
 * Logos are normalised to one white 280x116 tile each so the wall reads as a
 * set rather than as 37 differently sized cut-outs. They are flattened onto
 * white deliberately: several ship a baked-in white box that would otherwise
 * show as a pale rectangle sitting on the tile.
 */
export interface Client {
  slug: string;
  /** Legal or trading name, as the client's own logo sets it. */
  name: string;
  logo: StaticImageData;
  brand: "Raulji Technologies" | "Raulji Consulting Services";
}

export const CLIENTS: Client[] = [
  { slug: "africa-fashion-house", name: "Africa Fashion House", logo: africaFashionHouse, brand: "Raulji Technologies" },
  { slug: "al-maha-optical", name: "Al Maha Optical", logo: alMahaOptical, brand: "Raulji Technologies" },
  { slug: "aljazira-supermarket", name: "Al Jazira Supermarkets", logo: alJazira, brand: "Raulji Technologies" },
  { slug: "arkarise", name: "Arkarise", logo: arkarise, brand: "Raulji Technologies" },
  { slug: "auriga", name: "Auriga Rain Showers", logo: auriga, brand: "Raulji Technologies" },
  { slug: "bangpromo", name: "Bangpromo", logo: bangpromo, brand: "Raulji Technologies" },
  { slug: "bratz", name: "Bratz", logo: bratz, brand: "Raulji Technologies" },
  { slug: "buykriya", name: "BuyKriya", logo: buykriya, brand: "Raulji Technologies" },
  { slug: "car-decor", name: "Car Decor", logo: carDecor, brand: "Raulji Technologies" },
  { slug: "cybermart", name: "Cybermart", logo: cybermart, brand: "Raulji Technologies" },
  { slug: "faye", name: "Faye", logo: faye, brand: "Raulji Technologies" },
  { slug: "future-roots", name: "Future Roots", logo: futureRoots, brand: "Raulji Technologies" },
  { slug: "goodees", name: "Goodees", logo: goodees, brand: "Raulji Technologies" },
  { slug: "indian-beautiful-art", name: "Indian Beautiful Art", logo: indianBeautifulArt, brand: "Raulji Technologies" },
  { slug: "knectt", name: "Knectt", logo: knectt, brand: "Raulji Technologies" },
  { slug: "modern-fabrics", name: "Modern Fabrics", logo: modernFabrics, brand: "Raulji Technologies" },
  { slug: "myesuq", name: "MyesuQ", logo: myesuq, brand: "Raulji Technologies" },
  { slug: "nateeva", name: "Nateeva", logo: nateeva, brand: "Raulji Technologies" },
  { slug: "nobaj", name: "Nobaj", logo: nobaj, brand: "Raulji Technologies" },
  { slug: "nxtby", name: "nxtby.com", logo: nxtby, brand: "Raulji Technologies" },
  { slug: "only-for-organic", name: "Only For Organic Madhupur", logo: onlyForOrganic, brand: "Raulji Technologies" },
  { slug: "orgo-manya", name: "Orgo Manya", logo: orgoManya, brand: "Raulji Technologies" },
  { slug: "power", name: "Powerlook", logo: powerlook, brand: "Raulji Technologies" },
  { slug: "promomilia", name: "Promomilia", logo: promomilia, brand: "Raulji Technologies" },
  { slug: "prozo", name: "Prozo", logo: prozo, brand: "Raulji Technologies" },
  { slug: "regal-fabric-gallery", name: "Regal Fabric Gallery", logo: regal, brand: "Raulji Technologies" },
  { slug: "s3-buy", name: "S3 Buy", logo: s3Buy, brand: "Raulji Technologies" },
  { slug: "sbl-mobile-tyres", name: "SBL Mobile Tyres", logo: sblMobileTyres, brand: "Raulji Technologies" },
  { slug: "shelf-additions", name: "Shelf Additions", logo: shelfAdditions, brand: "Raulji Technologies" },
  { slug: "smp-global-stone", name: "SMP Global Stone", logo: smpGlobalStone, brand: "Raulji Technologies" },
  { slug: "sure-safety", name: "Sure Safety", logo: sureSafety, brand: "Raulji Technologies" },
  { slug: "synergy", name: "Synergy", logo: synergy, brand: "Raulji Technologies" },
  { slug: "the-dj-shop", name: "The DJ Shop", logo: theDjShop, brand: "Raulji Technologies" },
  { slug: "unicore", name: "Unicore Apparel", logo: unicore, brand: "Raulji Technologies" },
  { slug: "wayuvega", name: "Wayuvega", logo: wayuvega, brand: "Raulji Technologies" },
  { slug: "wear91", name: "Wear91", logo: wear91, brand: "Raulji Technologies" },
  { slug: "woodminium", name: "Woodminium", logo: woodminium, brand: "Raulji Technologies" },
];

/**
 * Counted from the list rather than written down, so the page can never claim
 * a number the wall does not actually show.
 */
export const CLIENT_COUNT = CLIENTS.length;

/** How many of the wall each company in the group accounts for. */
export function countByBrand(brand: Client["brand"]) {
  return CLIENTS.filter((c) => c.brand === brand).length;
}

/** Split into n roughly equal rows, in order, for the marquee. */
export function clientRows(count: number): Client[][] {
  const per = Math.ceil(CLIENTS.length / count);
  return Array.from({ length: count }, (_, i) => CLIENTS.slice(i * per, (i + 1) * per));
}
