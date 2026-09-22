import { SERVICES } from "./services";
import { SITE } from "./site";

export interface NavLink {
  name: string;
  href?: string;
  description?: string;
  external?: boolean;
  /** Opens the shared location drawer instead of navigating (master rule 18). */
  action?: "locations";
}

export interface NavGroup {
  name: string;
  /** Group heading links here when it has a page of its own. */
  href?: string;
  /**
   * Empty means this is a plain top-level link rather than a dropdown. Used for
   * Consulting, which is the primary focus of the group and should be one click
   * from anywhere rather than buried in a menu.
   */
  links: NavLink[];
  /** Shown as a promoted panel inside the mega menu. */
  feature?: { title: string; body: string; href: string; cta: string };
}

/**
 * Header navigation (master rule 16, and rule 33 of the development brief).
 *
 * Six items including Contact, which is the most the row holds at 1024px
 * alongside the logo and the CTA. Two rules shaped the ordering:
 *
 *  - Consulting is the primary focus of the group, so it is a top-level link
 *    rather than an entry inside a Services menu.
 *  - Raulji Technologies sits under Group as a brand relationship, not as a
 *    services dropdown, because its catalogue lives on its own domain.
 *
 * Land Investment, Rentals and Finance are deliberately absent: discontinued or
 * not Phase 1, and they must not appear in the header, footer or sitemap.
 * Insurance is absent too, since it is not a Phase 1 service.
 */
export const NAV: NavGroup[] = [
  {
    name: "Group",
    href: "/about/",
    links: [
      { name: "About Raulji Group", href: "/about/", description: "Who we are and how we work" },
      { name: "Our Team", href: "/team/", description: "The people handling your work" },
      {
        name: "Our Clients",
        href: "/our-clients/",
        description: "The businesses the group has worked with",
      },
      {
        name: "Raulji Technologies",
        href: SITE.technologies,
        description: "Software, AI and digital transformation, on our technology brand",
        external: true,
      },
    ],
  },
  {
    name: "Consulting",
    href: "/services/business-consulting/",
    links: [],
  },
  {
    name: "Services",
    href: "/services/",
    links: [
      {
        name: "Business Registration",
        href: "/services/business-registration/",
        description: "How to choose between the four structures",
      },
      ...SERVICES.map((s) => ({
        name:
          s.shortName === "Private Limited"
            ? "Private Limited Company"
            : s.name.replace(" Registration", ""),
        href: s.path,
        description: s.cardBlurb,
      })),
      { name: "All Services", href: "/services/", description: "Everything the group offers" },
    ],
    feature: {
      title: "Not sure which structure fits?",
      body: "Compare all four side by side on liability, compliance, tax and funding before you commit.",
      href: "/compare/",
      cta: "Compare structures",
    },
  },
  {
    name: "Gujarat",
    href: "/gujarat/",
    links: [
      {
        name: "Business Registration Across Gujarat",
        href: "/gujarat/",
        description: "Coverage across all 33 districts",
      },
      {
        name: "Find Your City",
        description: "Search every city and town we have a page for",
        action: "locations",
      },
    ],
  },
  {
    name: "Resources",
    links: [
      {
        name: "Business Guides",
        href: "/blog/",
        description: "Structures, registration, documents and the MCA process, explained",
      },
      {
        name: "Compare Business Structures",
        href: "/compare/",
        description: "Private Limited vs LLP vs Partnership vs Proprietorship",
      },
      { name: "FAQs", href: "/faqs/", description: "Answers to the questions we are asked most" },
    ],
  },
];

/** Master rule 22: this is the primary call to action across the site. */
export const PRIMARY_CTA = { name: "Talk to an Expert", href: "/contact/" };
