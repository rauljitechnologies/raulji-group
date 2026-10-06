/**
 * Attribution for the photographs on this site that require it.
 *
 * Most of the photography here is Unsplash, whose licence asks for no credit.
 * The Rajkot city photographs are the exception: Unsplash has nothing of the
 * city, so they come from Wikimedia Commons under Creative Commons BY-SA.
 * That licence does require credit, and it requires any adaptation to be
 * disclosed — each of these was resized, cropped to the layout and re-encoded
 * as WebP, so the note below says so.
 *
 * Keep this in step with lib/city-photos.ts: a Commons photograph added there
 * without an entry here is published without the attribution its licence
 * requires.
 */
export interface ImageCredit {
  /** The file's title on the source site. */
  title: string;
  /** The photographer, as the source credits them. */
  author: string;
  /** Where the photograph is used on this site. */
  usedOn: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
}

export const IMAGE_CREDITS: ImageCredit[] = [
  {
    title: "Rajkot from a kite",
    author: "KAP Jasa",
    usedOn: "Rajkot — page hero and photograph strip",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rajkot_from_a_kite.jpg",
  },
  {
    title: "High street — 150 ft Ring road Rajkot",
    author: "Viralmkothari",
    usedOn: "Rajkot — photograph strip, business environment, city card",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:High_street_-_150_ft_Ring_road_Rajkot.jpg",
  },
  {
    title: "Watson Museum",
    author: "Sneha N Shetty",
    usedOn: "Rajkot — photograph strip and business environment",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Watson_Museum.jpg",
  },
  {
    title: "Aji Dem Rajkot",
    author: "Jashu Ram",
    usedOn: "Rajkot — photograph strip",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Aji_Dem_Rajkot_-_panoramio.jpg",
  },
  {
    title: "Beautiful sky of Rajkot city",
    author: "Sejal Patel 1",
    usedOn: "Rajkot — closing call to action",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Beautiful_sky_of_Rajkot_city.jpg",
  },
];
