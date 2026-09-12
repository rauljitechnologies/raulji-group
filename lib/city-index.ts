/**
 * Lightweight city index for client components (spec section 37).
 *
 * `lib/cities.ts` carries the full editorial payload for every city page: intro,
 * economy, business areas, structure notes and FAQs. That file is ~100 KB and
 * belongs on the server only. Any client component that imported it pulled the
 * whole thing into the shared JS bundle, which is exactly what section 37 rules
 * out for the homepage.
 *
 * This file holds only what a client needs to render a link: slug, name and
 * district. `assertCityIndexIsComplete()` is called from `lib/cities.ts` so the
 * two can never drift without the build failing.
 */

export interface CityIndexEntry {
  slug: string;
  name: string;
  district: string;
}

export const CITY_INDEX: readonly CityIndexEntry[] = [
  { slug: "ahmedabad", name: "Ahmedabad", district: "Ahmedabad" },
  { slug: "amreli", name: "Amreli", district: "Amreli" },
  { slug: "anand", name: "Anand", district: "Anand" },
  { slug: "ankleshwar", name: "Ankleshwar", district: "Bharuch" },
  { slug: "bharuch", name: "Bharuch", district: "Bharuch" },
  { slug: "bhavnagar", name: "Bhavnagar", district: "Bhavnagar" },
  { slug: "bhuj", name: "Bhuj", district: "Kutch" },
  { slug: "botad", name: "Botad", district: "Botad" },
  { slug: "dahod", name: "Dahod", district: "Dahod" },
  { slug: "dwarka", name: "Dwarka", district: "Devbhumi Dwarka" },
  { slug: "gandhidham", name: "Gandhidham", district: "Kutch" },
  { slug: "gandhinagar", name: "Gandhinagar", district: "Gandhinagar" },
  { slug: "godhra", name: "Godhra", district: "Panchmahal" },
  { slug: "halol", name: "Halol", district: "Panchmahal" },
  { slug: "himmatnagar", name: "Himmatnagar", district: "Sabarkantha" },
  { slug: "jamnagar", name: "Jamnagar", district: "Jamnagar" },
  { slug: "jhalod", name: "Jhalod", district: "Dahod" },
  { slug: "junagadh", name: "Junagadh", district: "Junagadh" },
  { slug: "kalol", name: "Kalol", district: "Gandhinagar" },
  { slug: "mehsana", name: "Mehsana", district: "Mehsana" },
  { slug: "modasa", name: "Modasa", district: "Aravalli" },
  { slug: "morbi", name: "Morbi", district: "Morbi" },
  { slug: "nadiad", name: "Nadiad", district: "Kheda" },
  { slug: "navsari", name: "Navsari", district: "Navsari" },
  { slug: "palanpur", name: "Palanpur", district: "Banaskantha" },
  { slug: "patan", name: "Patan", district: "Patan" },
  { slug: "porbandar", name: "Porbandar", district: "Porbandar" },
  { slug: "rajkot", name: "Rajkot", district: "Rajkot" },
  { slug: "surat", name: "Surat", district: "Surat" },
  { slug: "surendranagar", name: "Surendranagar", district: "Surendranagar" },
  { slug: "vadodara", name: "Vadodara", district: "Vadodara" },
  { slug: "valsad", name: "Valsad", district: "Valsad" },
  { slug: "vapi", name: "Vapi", district: "Valsad" },
];

/**
 * The eight markets shown on the homepage before the drawer opens
 * (spec section 13). Everything else lives behind "View All Locations".
 */
export const POPULAR_CITY_SLUGS = [
  "ahmedabad",
  "vadodara",
  "surat",
  "rajkot",
  "gandhinagar",
  "anand",
  "bharuch",
  "godhra",
] as const;

export const POPULAR_CITIES: readonly CityIndexEntry[] = POPULAR_CITY_SLUGS.map(
  (slug) => CITY_INDEX.find((c) => c.slug === slug)!,
);

export function findCityBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return CITY_INDEX.find((c) => c.slug === slug);
}

/** Cities grouped by first letter, for the drawer's alphabetical list. */
export function groupCitiesByLetter(cities: readonly CityIndexEntry[]) {
  const groups = new Map<string, CityIndexEntry[]>();
  for (const city of cities) {
    const letter = city.name[0]!.toUpperCase();
    const bucket = groups.get(letter);
    if (bucket) bucket.push(city);
    else groups.set(letter, [city]);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

/**
 * Build-time guard. Called from the server-only city data module so a city added
 * to one file and not the other fails the build rather than shipping a dead link.
 */
export function assertCityIndexIsComplete(
  cities: readonly { slug: string; name: string; district: string }[],
) {
  const indexed = new Map(CITY_INDEX.map((c) => [c.slug, c]));
  for (const city of cities) {
    const entry = indexed.get(city.slug);
    if (!entry) {
      throw new Error(`CITY_INDEX is missing "${city.slug}". Add it to lib/city-index.ts.`);
    }
    if (entry.name !== city.name || entry.district !== city.district) {
      throw new Error(`CITY_INDEX entry for "${city.slug}" does not match lib/cities.ts.`);
    }
    indexed.delete(city.slug);
  }
  if (indexed.size > 0) {
    throw new Error(
      `CITY_INDEX has entries with no city page: ${[...indexed.keys()].join(", ")}.`,
    );
  }
}
