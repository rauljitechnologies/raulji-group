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

