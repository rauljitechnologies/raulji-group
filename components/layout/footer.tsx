"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { CITIES, FEATURED_CITY_SLUGS } from "@/lib/cities";
import { SERVICES } from "@/lib/services";
import { SITE, telHref, mailHref, AUTHORITY_DISCLAIMER } from "@/lib/site";
import { track } from "@/lib/analytics";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

/**
 * Footer (spec section 41).
 * Rentals and Land Investment are discontinued and must not be linked here.
 */
const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Raulji Group",
    links: [
      { name: "About", href: "/about/" },
      { name: "Team", href: "/team/" },
      { name: "Contact", href: "/contact/" },
      { name: "Industries We Serve", href: "/#industries" },
    ],
  },
  {
    heading: "Registration Services",
    links: SERVICES.map((s) => ({ name: s.shortName, href: s.path })),
  },
  {
    heading: "Popular Gujarat Pages",
    links: [
      { name: "Gujarat Business Registration", href: "/gujarat/" },
      ...FEATURED_CITY_SLUGS.slice(0, 8).map((slug) => {
        const city = CITIES.find((item) => item.slug === slug);
        return { name: city ? city.name : slug, href: `/${slug}/` };
      }),
    ],
  },
  {
    heading: "Resources",
    links: [
      { name: "Blog", href: "/blog/" },
      { name: "Compare Business Structures", href: "/compare/" },
      { name: "FAQs", href: "/faqs/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy/" },
      { name: "Terms of Service", href: "/terms/" },
      { name: "Disclaimer", href: "/disclaimer/" },
    ],
  },
];

const GROUP_COMPANY_CARDS = [
  {
    name: "Raulji Technologies",
    body: "IT services, websites, web apps, mobile apps, cloud, DevOps and AI solutions.",
    href: SITE.technologies,
    external: true,
  },
  {
    name: "Raulji Consulting Services",
    body: "Business consulting, registration, insurance, accounting, tax and compliance support.",
    href: "/services/",
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground" aria-labelledby="footer-heading">
      <div className="container-wide py-12 sm:py-14 lg:py-16">
        <div className="grid gap-7 border-b border-secondary-foreground/10 pb-9 md:grid-cols-[0.9fr_1.1fr] md:items-start lg:gap-10 lg:pb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Group of Companies
            </p>
            <h2 id="footer-heading" className="mt-3 text-2xl leading-tight text-secondary-foreground sm:text-3xl md:text-2xl lg:text-3xl">
              {SITE.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/70">
              A diversified holding company delivering practical business, technology and consulting
              services for long-term value creation.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Link
                href="/contact/"
                onClick={() => track("start_business_click", { label: "footer_group_intro" })}
                className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Talk to Raulji Group
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {GROUP_COMPANY_CARDS.map((company) => (
              <FooterCompanyCard key={company.name} company={company} />
            ))}
          </div>
        </div>

        <div className="grid gap-8 pt-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.25fr_repeat(5,minmax(0,1fr))] lg:gap-10 lg:pt-10">
          <div className="max-w-sm sm:col-span-2 md:col-span-3 lg:col-span-1">
            <p className="text-lg font-bold">{SITE.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/70">
              {SITE.description}
            </p>

            <address className="mt-5 grid gap-2.5 text-sm not-italic sm:grid-cols-2 lg:block lg:space-y-2.5">
              <a
                href={telHref}
                onClick={() => track("phone_click", { label: "footer" })}
                className="flex min-h-[1.75rem] items-center gap-2.5 hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <a
                href={mailHref}
                onClick={() => track("email_click", { label: "footer" })}
                className="flex min-h-[1.75rem] items-center gap-2.5 hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.email}
              </a>
              <p className="flex items-center gap-2.5 text-secondary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.locality}, {SITE.region}, India
              </p>
              <p className="flex items-center gap-2.5 text-secondary-foreground/70">
                <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.hours.display}
              </p>
            </address>
          </div>

          {COLUMNS.map((col) => (
            <FooterColumn key={col.heading} column={col} />
          ))}
        </div>

        <nav
          aria-label="Local Business Registration Pages"
          className="mt-10 border-t border-secondary-foreground/10 pt-7 lg:mt-12 lg:pt-8"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-secondary-foreground">
              Local Business Registration Pages
            </h2>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {FEATURED_CITY_SLUGS.map((slug) => {
              const city = CITIES.find((item) => item.slug === slug);
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}/`}
                    className="flex min-h-[2.5rem] items-center rounded-lg border border-secondary-foreground/10 bg-secondary-foreground/5 px-3 text-secondary-foreground/75 hover:border-primary/40 hover:bg-secondary-foreground/10 hover:text-primary"
                  >
                    {city ? city.name : slug}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="mt-8 rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-4 text-xs leading-relaxed text-secondary-foreground/60">
          {AUTHORITY_DISCLAIMER}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-secondary-foreground/10 pt-6 text-center text-xs text-secondary-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>
            Technology, software and AI services are offered through{" "}
            <a
              href={SITE.technologies}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Raulji Technologies
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCompanyCard({
  company,
}: {
  company: { name: string; body: string; href: string; external?: boolean };
}) {
  return (
    <Link
      href={company.href}
      target={company.external ? "_blank" : undefined}
      rel={company.external ? "noopener noreferrer" : undefined}
      className="group flex min-h-[8.5rem] gap-4 rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-4 transition-colors hover:border-primary/50 hover:bg-secondary-foreground/10 sm:block sm:p-5"
    >
      <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" aria-hidden="true" />
      <div>
        <h3 className="text-base text-secondary-foreground sm:mt-4">{company.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-secondary-foreground/65">{company.body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
        Explore services
        {company.external ? (
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </span>
      </div>
    </Link>
  );
}

function FooterColumn({ column }: { column: { heading: string; links: FooterLink[] } }) {
  return (
    <nav className="rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-4 lg:border-0 lg:bg-transparent lg:p-0" aria-label={column.heading}>
      <h2 className="text-sm font-semibold text-secondary-foreground">{column.heading}</h2>
      <ul className="mt-3 space-y-2 text-sm lg:mt-4 lg:space-y-2.5">
        {column.links.map((link) => (
          <li key={`${column.heading}-${link.href}`}>
            <FooterTextLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterTextLink({ link }: { link: FooterLink }) {
  return (
    <Link
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-[2rem] items-center gap-1.5 text-secondary-foreground/70 hover:text-primary hover:underline"
    >
      {link.name}
      {link.external ? <ExternalLink className="h-3 w-3" aria-hidden="true" /> : null}
    </Link>
  );
}
