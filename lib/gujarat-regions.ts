/**
 * Gujarat's regions, for the Gujarat hub's city finder.
 * Kept out of the client component so server code can read them too.
 */

export const REGIONS = ["Central", "South", "Saurashtra", "Kutch", "North"] as const;
export type Region = (typeof REGIONS)[number];

export function regionLabel(region: Region) {
  return region === "Kutch" || region === "Saurashtra" ? region : `${region} Gujarat`;
}

/**
 * Region for each of Gujarat's 33 districts, for the city finder's filter.
 * Plain geography, grouped the way the "Raulji Gujarat" design groups them.
 */
export const DISTRICT_REGION: Record<string, Region> = {
  Ahmedabad: "Central", Anand: "Central", "Chhota Udaipur": "Central", Dahod: "Central",
  Gandhinagar: "Central", Kheda: "Central", Mahisagar: "Central", Panchmahal: "Central",
  Vadodara: "Central",
  Bharuch: "South", Dang: "South", Narmada: "South", Navsari: "South", Surat: "South",
  Tapi: "South", Valsad: "South",
  Amreli: "Saurashtra", Bhavnagar: "Saurashtra", Botad: "Saurashtra", "Devbhumi Dwarka": "Saurashtra",
  "Gir Somnath": "Saurashtra", Jamnagar: "Saurashtra", Junagadh: "Saurashtra", Morbi: "Saurashtra",
  Porbandar: "Saurashtra", Rajkot: "Saurashtra", Surendranagar: "Saurashtra",
  Kutch: "Kutch",
  Aravalli: "North", Banaskantha: "North", Mehsana: "North", Patan: "North", Sabarkantha: "North",
};


export interface RegionSummary {
  region: Region;
  /** Gujarat districts in this region. */
  districts: number;
  /** City pages in this region, which is what the city finder lists. */
  cityPages: number;
}

/**
 * Per-region counts for the Gujarat hub's region cards.
 *
 * The cards sit directly under "33 districts served", so they read as its
 * breakdown, and their number has to count districts. They used to count city
 * pages instead (10 Central, 6 South, 10 Saurashtra, 2 Kutch, 5 North), which
 * also totals 33 by coincidence, and showed Kutch, a single district, as "2"
 * (re-verification of 23 Oct 2026). Clicking a card filters the finder, which
 * lists city pages, so that count is carried too and shown beside it.
 *
 * No fallback region: a district missing from DISTRICT_REGION is dropped from
 * every count, and tests/seo-ai-audit.test.ts fails on it, rather than being
 * quietly filed under Central.
 */
export function regionSummary(
  districts: readonly string[],
  cityDistricts: readonly string[],
): RegionSummary[] {
  return REGIONS.map((region) => ({
    region,
    districts: districts.filter((d) => DISTRICT_REGION[d] === region).length,
    cityPages: cityDistricts.filter((d) => DISTRICT_REGION[d] === region).length,
  }));
}
