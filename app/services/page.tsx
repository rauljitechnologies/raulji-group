import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { ServiceCards } from "@/components/shared/service-cards";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SECONDARY_SERVICES } from "@/lib/secondary-services";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

/**
 * Services hub.
 *
 * Its job is routing, not selling: name each pillar, say who it is for in one
 * line, and link on. The two pillars now have pages of their own, so this page
 * deliberately stopped being the registration overview it used to be. That
 * content lives at /services/business-registration/ and duplicating it here
 * would put two of our own pages in front of the same query.
 */

export const metadata = pageMeta({
  title: "Our Services | Raulji Group",
  description:
    "Business consulting, business registration and the compliance support that follows, from Raulji Group in Vadodara. Working across Gujarat and India.",
  path: "/services/",
  ogHeadline: "Our Services",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
];

/** The two pillars, in priority order (master rule 39). */
const PILLARS = [
  {
    eyebrow: "Primary focus",
    name: "Business Consulting",
    href: "/services/business-consulting/",
    body: "Advisory work on the decisions that come before paperwork: which structure fits, what has to be in place before you start, what changes if the business grows, and whether the existing setup still matches how the business actually operates.",
    points: [
      "Business structure and restructuring",
      "Business planning",
      "Growth and expansion planning",
      "Operational and process guidance",
    ],
    cta: "Explore Business Consulting",
  },
  {
    eyebrow: "Main commercial service",
    name: "Business Registration",
    href: "/services/business-registration/",
    body: "Registration and MCA filing support for the four Indian business structures. We handle digital signatures, name approval, drafting and the statutory filings, including any Registrar query along the way.",
    points: [
      "Private Limited Company",
      "Limited Liability Partnership",
      "Partnership Firm",
      "Proprietorship",
    ],
    cta: "Explore Business Registration",
  },
];

const GROUPS = ["Compliance", "Advisory", "Technology"] as const;

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Raulji Group"
        title="Our Services"
        lead="Two things sit at the centre of what the group does: advising on business decisions, and getting businesses correctly registered. Everything else on this page supports one of those two."
      />

      {/* The two pillars. */}
      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 sm:p-9"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {pillar.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl md:text-[1.75rem]">{pillar.name}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{pillar.body}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-secondary">
                {pillar.points.map((point) => (
                  <li key={point} className="border-l-2 border-primary/30 pl-3">
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={pillar.href}
                className="mt-8 inline-flex min-h-[3rem] items-center gap-2 self-start rounded-xl border-2 border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {pillar.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* Straight to the four structures, for visitors who already know. */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Register a business"
          title="The four structures"
          lead="Each page covers who the structure suits, eligibility, documents, the filing process and cost."
          align="left"
        />
        <ServiceCards />
        <p className="mt-8">
          <Link href="/compare/" className="link-target font-semibold text-primary hover:underline">
            Compare all four side by side
          </Link>
        </p>
      </Section>

      {/* Preserved services. Lower in the page because they are not Phase 1. */}
      <Section>
        <SectionHeading
          eyebrow="Supporting services"
          title="What comes after registration"
          lead="Once an entity exists it carries obligations. These pages cover the recurring work, and remain here for businesses that came looking for them."
          align="left"
        />
        <div className="space-y-10">
          {GROUPS.map((group) => {
            const items = SECONDARY_SERVICES.filter((s) => s.group === group);
            if (!items.length) return null;
            return (
              <div key={group}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {group}
                </h3>
                <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={service.path}
                        className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                      >
                        <h4 className="text-base font-bold text-secondary">{service.name}</h4>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {/* First sentence only. The trailing stop is stripped before
                              one is added back, because an intro that is a single
                              sentence already ends in one and was rendering "made..". */}
                          {service.intro.split(". ")[0].replace(/\.$/, "")}.
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          Learn more
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Technology gateway. An introduction and a link out, never a duplicate
          catalogue (master rule 14). */}
      <Section tone="muted">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Separate brand
            </p>
            <h2 className="mt-2 text-2xl">Technology, software and AI</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Technology and digital work is delivered by Raulji Technologies, the group&rsquo;s
              technology brand. Its full service catalogue lives on its own website rather than
              here.
            </p>
          </div>
          <a
            href={SITE.technologies}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[3.25rem] shrink-0 items-center justify-center gap-2 rounded-xl bg-secondary px-7 font-semibold text-secondary-foreground hover:bg-secondary/90"
          >
            Explore Raulji Technologies
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Section>

      <CtaBanner
        title="Not sure which service applies to you?"
        body="Describe what the business does and what you are trying to decide. We will tell you which of these is actually relevant."
      />
    </>
  );
}
