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
