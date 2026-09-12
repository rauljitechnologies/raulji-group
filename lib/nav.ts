import { SERVICES } from "./services";
import { SITE } from "./site";

export interface NavLink {
  name: string;
  href?: string;
  description?: string;
  external?: boolean;
  /** Opens the shared location drawer instead of navigating (spec section 23). */
  action?: "locations";
}

export interface NavGroup {
  name: string;
  /** Group heading links here when it has a page of its own. */
  href?: string;
  links: NavLink[];
  /** Shown as a promoted panel inside the mega menu. */
  feature?: { title: string; body: string; href: string; cta: string };
}

/**
 * Phase 1 navigation (spec section 24).
 *
 * Land Investment and Rentals are deliberately absent: both are discontinued and
 * must not appear in the header, footer, sitemap or any internal link.
 * Compliance and technology services are intentionally not top-level items.
 */
export const NAV: NavGroup[] = [
  {
    name: "About",
    href: "/about/",
    links: [
      { name: "About Raulji Group", href: "/about/", description: "Who we are and how we work" },
      { name: "Our Team", href: "/team/", description: "The people handling your registration" },
    ],
  },
  {
    name: "Business Registration",
    href: "/services/",
    links: SERVICES.map((s) => ({
      name: s.shortName === "Private Limited" ? "Private Limited Company" : s.name.replace(" Registration", ""),
      href: s.path,
      description: s.cardBlurb,
    })),
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
      { name: "Blog", href: "/blog/", description: "Notes on registration and running a business" },
      { name: "Compare Business Structures", href: "/compare/", description: "Pvt Ltd vs LLP vs Partnership vs Proprietorship" },
      { name: "FAQs", href: "/faqs/", description: "Answers to the questions we are asked most" },
    ],
  },
  {
    name: "Technology & AI",
    links: [
      {
        name: "Explore Raulji Technologies",
        href: SITE.technologies,
        description: "Software, AI and digital transformation, on our technology brand",
        external: true,
      },
    ],
  },
];

export const PRIMARY_CTA = { name: "Start Your Business", href: "/contact/" };
