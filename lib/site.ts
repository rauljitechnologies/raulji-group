/**
 * Single source of truth for verified business facts.
 *
 * Everything in this file is either published on the existing raulji.com site or
 * supplied directly by the client. Nothing here is inferred. If a claim cannot be
 * verified it does not belong in this file and must not appear on the site.
 */

export const SITE = {
  name: "Raulji Group",
  /** Canonical origin. The live site canonicalises to the www host. */
  url: "https://www.raulji.com",
  tagline: "We Don't Just Build Businesses. We Build Futures.",
  description:
    "Business registration and business-growth support for entrepreneurs and businesses across Gujarat and India.",
  phone: {
    display: "+91 8511187689",
    /** E.164, for tel: links and schema. */
    e164: "+918511187689",
    /** Digits only, for wa.me links. */
    whatsapp: "918511187689",
  },
  email: "admin@raulji.com",
  locality: "Vadodara",
  region: "Gujarat",
  country: "IN",
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
    display: "Monday to Saturday, 9:00 AM to 7:00 PM",
  },
  /** Separate brand. Technology SEO is Phase 2 and lives on its own domain. */
  technologies: "https://rauljitechnologies.com/",
  ogImage: "/og/default.png",
} as const;

/**
 * Leadership. Confirmed by the client on 2026-09-16.
 *
 * Titles are recorded exactly as the client gave them. Note that "Founder" is
 * deliberately absent: an earlier version of the site said "Chairman and
 * Founder", the client's confirmation said Chairman only, and a founder claim
 * is company history that needs its own confirmation (master rule 42).
 *
 * `photo` is a PLACEHOLDER. It is the LinkedIn profile picture the client
 * supplied as a stand-in, and it is a casual photograph rather than a corporate
 * portrait. Replace the file at that path with the official photograph when it
 * arrives; nothing else needs to change, because the layout crops to 4:5 and
 * every use points at this one constant.
 */
export const LEADERSHIP = {
  chairman: {
    name: "Dharmendrasinh Raulji",
    roles: ["Chairman, Raulji Group", "Director, Raulji Technologies"],
    /** Single string form, for schema.org jobTitle. */
    jobTitle: "Chairman, Raulji Group and Director, Raulji Technologies",
    photo: "/leadership/dharmendrasinh-raulji.jpg",
    photoIsPlaceholder: true,
  },
} as const;

export const telHref = `tel:${SITE.phone.e164}`;
export const mailHref = `mailto:${SITE.email}`;

export function whatsappHref(message: string) {
  return `https://wa.me/${SITE.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Standard disclaimer wording. Raulji Group is a private firm, not an authority. */
export const TIMELINE_DISCLAIMER =
  "Estimated timelines can vary depending on documentation, government processing and other factors outside our control.";

export const AUTHORITY_DISCLAIMER =
  "Raulji Group is a private business-services firm. We are not a government department and are not affiliated with the Ministry of Corporate Affairs, the GST department or any other authority. We prepare and file applications on your behalf; approval rests with the relevant authority.";
