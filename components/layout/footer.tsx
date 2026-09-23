"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE, telHref, mailHref, AUTHORITY_DISCLAIMER } from "@/lib/site";
import { LocationDrawerTrigger } from "@/components/shared/location-drawer";
import { track } from "@/lib/analytics";

/**
 * Corporate footer (spec sections 16-20, 43, 44, 47).
 *
 * Kept deliberately short: brand and contact, three link columns, one locations
 * row, one legal line. No city list (it lives in the shared drawer), no address
 * or opening-hours block (those are on /contact/ and in the Organization
 * schema), and no separate technology band.
 *
 * Rentals and Land Investment are discontinued and must not be linked here.
 */

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

/*
 * Two link columns, between the brand block and the contact block.
 *
 * The design brief's section 28 asks for four columns: brand, services, group,
 * contact. That is one fewer link column than this footer had, and the naive
 * reading of it drops Compare and FAQs entirely, which would cost the footer
 * two internal links for no reason.
 *
 * So the Resources column is dissolved rather than deleted, into the column
 * each of its links actually belongs in: comparing the four structures is part
 * of choosing a service, and the guides and FAQs are things the group
 * publishes. Nothing that was linked before is unlinked now.
 */
const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Services",
    links: [
      // Consulting leads, because it is the primary focus of the group.
      { name: "Business Consulting", href: "/services/business-consulting/" },
      { name: "Business Registration", href: "/services/business-registration/" },
      ...SERVICES.map((service) => ({
        name: service.shortName === "Private Limited" ? "Private Limited Company" : service.name,
        href: service.path,
      })),
      { name: "Compare Business Structures", href: "/compare/" },
      { name: "All Services", href: "/services/" },
    ],
  },
  {
    heading: "Group",
    links: [
      { name: "About Raulji Group", href: "/about/" },
      { name: "Our Team", href: "/team/" },
      { name: "Our Clients", href: "/our-clients/" },
      { name: "Gujarat", href: "/gujarat/" },
      // /blog/ is the guides index. The brief lists "Blog" and "Business
      // Guides" as separate entries, but a second link to the same URL is a
      // duplicate rather than a resource.
      { name: "Business Guides", href: "/blog/" },
      { name: "FAQs", href: "/faqs/" },
      // The group relationship lives here, not in a band of its own.
      { name: "Raulji Technologies", href: SITE.technologies, external: true },
      { name: "Contact", href: "/contact/" },
    ],
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { name: "Privacy Policy", href: "/privacy/" },
  { name: "Terms of Service", href: "/terms/" },
  { name: "Disclaimer", href: "/disclaimer/" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Raulji Group
      </h2>

      <div className="container-wide py-10 lg:py-12">
        {/* Desktop 4-column / tablet 2-column / mobile accordion (spec section 20) */}
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          {/*
            Column 1: who the group is (brief section 28).

            The contact details used to sit here too, which left the brand
            column carrying three unrelated jobs and no actual description of
            the business. They now have a column of their own at the end, and
            this one says what Raulji Group is before the link columns start
            listing what it sells.
          */}
          <div>
            <p className="text-lg font-bold">{SITE.name}</p>
            <p className="mt-1.5 text-sm font-semibold leading-snug text-primary">{SITE.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-secondary-foreground/70">
              A consulting-focused business group working with entrepreneurs and business owners on
              structure, registration and the decisions that come before either.
            </p>
            <p className="mt-4 border-l-2 border-primary/40 pl-3 text-sm leading-snug text-secondary-foreground/80">
              Leadership Built on Relationships. Trust Built for the Long Term.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <FooterColumn key={column.heading} column={column} />
          ))}

          {/* Column 4: contact (brief section 28). */}
          <div>
            <p className="text-sm font-semibold text-secondary-foreground">Contact</p>
            <address className="mt-3 flex flex-col gap-1 text-sm not-italic">
              <a
                href={telHref}
                onClick={() => track("phone_click", { label: "footer" })}
                className="flex min-h-[2rem] items-center gap-2.5 text-secondary-foreground/70 hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <a
                href={mailHref}
                onClick={() => track("email_click", { label: "footer" })}
                className="flex min-h-[2rem] items-center gap-2.5 text-secondary-foreground/70 hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.email}
              </a>
              <span className="flex min-h-[2rem] items-start gap-2.5 text-secondary-foreground/70">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.locality}, {SITE.region}, India
              </span>
            </address>
            <p className="mt-2 text-sm text-secondary-foreground/60">{SITE.hours.display}</p>

            <Link
              href="/contact/"
              onClick={() => track("primary_cta_click", { label: "footer" })}
              className="mt-4 inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Talk to Our Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Locations, without the city list (spec sections 43, 44) */}
        <div className="mt-8 flex flex-col gap-3 border-t border-secondary-foreground/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-secondary-foreground/70">
            Business registration support for entrepreneurs across Gujarat.
          </p>
          <LocationDrawerTrigger
            source="footer"
            className="inline-flex min-h-[2.75rem] shrink-0 items-center gap-2 rounded-xl border border-primary px-5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Explore All Locations
          </LocationDrawerTrigger>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-secondary-foreground/10 pt-5 text-xs text-secondary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-target hover:text-primary hover:underline">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kept: we must not be mistaken for a government body (spec section 36). */}
        <p className="mt-4 text-xs leading-relaxed text-secondary-foreground/45">
          {AUTHORITY_DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}

/**
 * Collapsed accordion on mobile, always expanded from md up (spec section 20).
 *
 * Native `<details>` rather than a JS accordion: correct keyboard and
 * screen-reader behaviour for free, and the links stay in the DOM for crawlers
 * whether or not the section is open.
 *
 * It renders closed so a phone gets a short footer, and `useFooterColumnState`
 * opens it at md up after hydration. Doing that in an effect rather than in the
 * markup keeps the server and client HTML identical; CSS cannot do it, because
 * the content of a closed `<details>` is hidden by the UA in a way no stylesheet
 * reliably overrides across engines.
 */
function FooterColumn({ column }: { column: { heading: string; links: FooterLink[] } }) {
  const ref = useExpandedOnDesktop();

  return (
    <nav aria-label={column.heading} className="border-b border-secondary-foreground/10 md:border-0">
      <details ref={ref} className="group">
        <summary className="flex min-h-[2.75rem] cursor-pointer list-none items-center justify-between text-sm font-semibold text-secondary-foreground marker:hidden md:pointer-events-none md:min-h-0 md:cursor-default">
          {column.heading}
          <span
            aria-hidden="true"
            className="text-lg leading-none text-primary transition-transform group-open:rotate-45 md:hidden"
          >
            +
          </span>
        </summary>
        <ul className="pb-3 text-sm md:mt-3 md:pb-0">
          {column.links.map((link) => (
            <li key={`${column.heading}-${link.name}`}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={
                  // Master rule 29 names these two specifically. Everything else
                  // in the footer is ordinary navigation and stays untracked.
                  link.href === "/gujarat/"
                    ? () => track("gujarat_page_click", { label: "footer" })
                    : link.href === SITE.technologies
                      ? () => track("technology_click", { label: "footer" })
                      : undefined
                }
                className="inline-flex min-h-[2.25rem] items-center gap-1.5 text-secondary-foreground/70 hover:text-primary hover:underline md:min-h-[1.875rem]"
              >
                {link.name}
                {link.external ? <ArrowUpRight className="h-3 w-3" aria-hidden="true" /> : null}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}

/**
 * Keeps a `<details>` open whenever the viewport is md or wider, and closed
 * again when it drops back to a phone, so the footer is short on mobile without
 * the desktop layout ever showing a collapsed column.
 */
function useExpandedOnDesktop() {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      if (ref.current) ref.current.open = query.matches;
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return ref;
}
