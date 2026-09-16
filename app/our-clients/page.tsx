import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { ClientWall } from "@/components/shared/client-wall";
import { CtaBanner } from "@/components/shared/cta-banner";
import { CLIENTS, CLIENT_COUNT, clientRows, countByBrand } from "@/lib/clients";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export const metadata = pageMeta({
  title: "Our Clients | Raulji Group",
  description:
    "The businesses Raulji Group works with, across both companies in the group: consulting, registration and insurance through Raulji Consulting Services, and software, eCommerce and digital through Raulji Technologies.",
  path: "/our-clients/",
  ogHeadline: "The businesses we work with",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Our Clients", path: "/our-clients/" },
];

/**
 * One client wall for the whole group.
 *
 * The page is framed as Raulji Group's, not as one company's with a note
 * attached. The group runs two companies and a client of either is a client of
 * the group, so they share a single wall and a single list, and the services
 * section covers both. The brief keeps the Technologies catalogue on its own
 * domain (master rule 14), so what appears here is the short introduction the
 * rest of the site already uses, plus a link out.
 *
 * What the page will not do is pretend the two halves are equally represented.
 * The wall is currently all Technologies, because that is the only client list
 * the group publishes: consulting and registration work is confidential and no
 * client of it has been named anywhere. Adding invented names, or implying a
 * longer list by staying vague, is the thing master rule 13 exists to stop. The
 * data carries a `brand` on every client, so the moment a consulting list
 * exists those entries drop into the same wall, the same alphabetical list and
 * the same counts with no change here.
 */

const GROUP_SERVICES = [
  {
    name: "Raulji Consulting Services",
    role: "Consulting, registration and insurance",
    body: "The consulting and business-services arm of the group. It works with founders and owners on the decisions that come before paperwork, and then handles the paperwork.",
    services: [
      { name: "Business consulting", href: "/services/business-consulting/" },
      { name: "Business registration", href: "/services/business-registration/" },
      { name: "Annual compliance", href: "/services/pvt-compliance/" },
      { name: "Insurance services", href: "/services/insurance/" },
    ],
    cta: { label: "Explore Consulting", href: "/services/business-consulting/", external: false },
  },
  {
    name: "Raulji Technologies",
    role: "Software, eCommerce and digital",
    body: "The group's technology brand, on its own domain with its own team. It builds and runs the software, stores and digital presence behind the businesses on this wall.",
    services: [
      { name: "Software and web development", href: null },
      { name: "eCommerce and marketplaces", href: null },
      { name: "SEO and digital marketing", href: null },
      { name: "AI and digital transformation", href: null },
    ],
    cta: { label: "Explore Raulji Technologies", href: SITE.technologies, external: true },
  },
] as const;

export default function OurClientsPage() {
  const rows = clientRows(3);
  const alphabetical = [...CLIENTS].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );
  const consultingClients = countByBrand("Raulji Consulting Services");
  // The brand tag distinguishes nothing while every row carries the same one:
  // 37 identical labels read as clutter, not as information. It appears the
  // moment the wall holds both companies.
  const showBrandTag = consultingClients > 0 && consultingClients < CLIENT_COUNT;

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Raulji Group"
        title="The businesses we work with"
        lead={`Raulji Group works through two companies, and a client of either is a client of the group. This is the whole wall in one place: ${CLIENT_COUNT} businesses across retail and marketplaces, manufacturing, fashion and safety, in India, the Gulf, the United Kingdom and East Africa.`}
      />

      {/* The wall, straight after the masthead. It is the reason anyone opens
          this page, so nothing is put in front of it. */}
      <Section className="pb-0">
        <ClientWall rows={rows} />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Logos are the property of their respective owners and are shown to identify the businesses
          the group has worked with.
        </p>
      </Section>

      {/* The group's services, both companies side by side. This is the part
          that makes the page a Raulji Group page rather than a logo wall. */}
      <Section>
        <SectionHeading
          eyebrow="Under Raulji Group"
          title="What the group does for them"
          lead="Two companies, one group. Most clients start on one side and end up using the other, which is the practical reason they sit under one roof."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {GROUP_SERVICES.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {brand.role}
              </p>
              <h3 className="mt-2 text-2xl">{brand.name}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{brand.body}</p>

              <ul className="mt-6 space-y-3">
                {brand.services.map((service) => (
                  <li key={service.name} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {service.href ? (
                      <Link
                        href={service.href}
                        className="leading-relaxed text-secondary hover:text-primary hover:underline"
                      >
                        {service.name}
                      </Link>
                    ) : (
                      // Technologies' catalogue lives on its own domain, so its
                      // lines are named and not linked into pages that do not
                      // exist here (master rule 14).
                      <span className="leading-relaxed text-muted-foreground">{service.name}</span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                {brand.cta.external ? (
                  <a
                    href={brand.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {brand.cta.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={brand.cta.href}
                    className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-elevated"
                  >
                    {brand.cta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Which half of the group the wall currently represents. Said once,
            plainly, rather than left for the reader to work out. */}
        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-muted p-6 text-sm leading-relaxed text-muted-foreground">
          {consultingClients === 0 ? (
            <>
              <strong className="font-semibold text-secondary">About this wall.</strong> The
              businesses named above are clients of Raulji Technologies. Consulting, registration
              and compliance work is confidential by its nature and we do not publish the names of
              the businesses we have advised or registered, so they are not on the wall. That is a
              choice about disclosure, not a measure of the work.{" "}
              <Link href="/contact/" className="font-semibold text-primary hover:underline">
                Ask us directly
              </Link>{" "}
              if you want to know whether we have handled something close to your situation.
            </>
          ) : (
            <>
              <strong className="font-semibold text-secondary">About this wall.</strong> It covers
              both companies in the group. Consulting and registration work is confidential by its
              nature, so only clients who have agreed to be named appear here.
            </>
          )}
        </p>
      </Section>

      {/* The same clients as text. The wall is the picture; this is the part a
          screen reader lands on and the part that gets indexed. The brand tag
          is what makes the two companies legible in one list. */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="In full"
          title="Every client, alphabetically"
          lead="The same businesses as above, written out, so the list can be read and searched rather than watched."
        />
        <ul className="mx-auto grid max-w-5xl gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {alphabetical.map((client) => (
            <li
              key={client.slug}
              className="flex items-baseline justify-between gap-4 border-b border-border/70 py-3"
            >
              <span className="text-secondary">{client.name}</span>
              {showBrandTag ? (
                <span
                  className={cn(
                    "shrink-0 text-xs font-semibold uppercase tracking-wider",
                    client.brand === "Raulji Technologies"
                      ? "text-muted-foreground"
                      : "text-primary",
                  )}
                >
                  {client.brand === "Raulji Technologies" ? "Technologies" : "Consulting"}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        {showBrandTag ? (
          <p className="mx-auto mt-8 max-w-5xl text-sm text-muted-foreground">
            Tagged by the company in the group that delivered the work.
          </p>
        ) : null}
      </Section>

      <CtaBanner
        title="Want your business on this wall?"
        body="Tell us what you are building. Whether it starts as a structure decision, a registration or a piece of software, the conversation begins the same way."
      />
    </>
  );
}
