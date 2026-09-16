import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { ClientWall } from "@/components/shared/client-wall";
import { CtaBanner } from "@/components/shared/cta-banner";
import { CLIENTS, CLIENT_COUNT, clientRows } from "@/lib/clients";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

export const revalidate = 3600;

export const metadata = pageMeta({
  title: "Our Clients | Raulji Group",
  description:
    "The businesses Raulji Group works with, in one place. Retail, manufacturing, fashion, safety and marketplace brands in India, the Gulf, the UK and East Africa.",
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
 * The brief keeps Raulji Technologies on its own domain and forbids copying its
 * service catalogue here (master rule 14). Its client list is a different
 * thing: these are the group's clients, and the group is what raulji.com is
 * for, so they belong in one place. The page still says which company did the
 * work, and links out rather than restating what Technologies does.
 *
 * Every name and logo comes from the wall Technologies already publishes. No
 * count, testimonial, rating or outcome is stated anywhere on this page,
 * because none of those is verified (master rule 13). The one number shown is
 * counted from the list itself.
 */
export default function ClientsPage() {
  const rows = clientRows(3);
  const alphabetical = [...CLIENTS].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Raulji Group"
        title="The businesses we work with"
        lead={`Raulji Group runs two companies, and between them they have delivered work for ${CLIENT_COUNT} businesses: retailers and marketplaces, manufacturers, fashion labels and safety suppliers, in India, the Gulf, the United Kingdom and East Africa.`}
      />

      {/* The wall itself, straight after the masthead. It is the reason anyone
          opens this page, so nothing is put in front of it. */}
      <Section className="pb-0">
        <ClientWall rows={rows} />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Logos are the property of their respective owners and are shown to identify the businesses
          the group has worked with.
        </p>
      </Section>

      {/* Which company did the work. The group runs two, they do different
          things, and a client wall that blurs them would be the one thing on
          this page that is not straightforwardly true. */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h2 className="text-2xl md:text-3xl">Who did the work</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Every business on this wall was delivered by{" "}
              <strong className="font-semibold text-secondary">Raulji Technologies</strong>, the
              group&rsquo;s technology brand, on software, eCommerce, SEO and digital work. It
              operates on its own domain with its own team, and its full service catalogue lives
              there rather than here.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Raulji Consulting Services covers the other half of the group: business consulting,
              company registration, compliance and insurance. That work is confidential by its
              nature and we do not publish the names of the businesses we have structured or
              registered, so you will not find them on this page. If you want to know whether we
              have handled something close to your situation, ask us directly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-elevated"
              >
                Talk to an Expert
              </Link>
              <a
                href={SITE.technologies}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Explore Raulji Technologies
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <dl className="h-fit divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {[
              ["Businesses on this wall", String(CLIENT_COUNT)],
              ["Delivered through", "Raulji Technologies"],
              ["Work covered", "Software, eCommerce, SEO and digital"],
              ["Consulting and registration clients", "Not published, by choice"],
            ].map(([label, value]) => (
              <div key={label} className="px-6 py-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1.5 font-semibold text-secondary">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* The same clients as text. The wall is the picture; this is the part a
          screen reader lands on and the part that gets indexed. */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="In full"
          title="Every client, alphabetically"
          lead="The same businesses as above, written out, so the list can be read and searched rather than watched."
        />
        <ul className="mx-auto grid max-w-5xl gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {alphabetical.map((client) => (
            <li
              key={client.slug}
              className="border-b border-border/70 py-3 text-secondary last:border-0"
            >
              {client.name}
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title="Want your business on this wall?"
        body="Tell us what you are building. Whether it starts as a structure decision, a registration or a piece of software, the conversation begins the same way."
      />
    </>
  );
}
