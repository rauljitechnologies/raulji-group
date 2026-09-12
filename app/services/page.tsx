import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { ServiceCards } from "@/components/shared/service-cards";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SECONDARY_SERVICES } from "@/lib/secondary-services";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Business Registration Services | Raulji Group",
  description:
    "Private Limited, LLP, Partnership Firm and Proprietorship registration from Raulji Group, with compliance and advisory support across Gujarat.",
  path: "/services/",
  ogHeadline: "Business Registration Services",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
];

const GROUPS = ["Compliance", "Advisory", "Technology"] as const;

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="pb-12 pt-8">
        <div className="container-wide max-w-4xl">
          <h1 className="text-3xl leading-tight md:text-4xl lg:text-5xl">
            Business Registration Services
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Raulji Group helps entrepreneurs and businesses choose the right structure and register
            it properly. Registration is what we lead with, and the compliance and advisory work that
            follows is here too.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Start here"
          title="Business registration"
          lead="The four structures a business in India can start with. Each page covers who it suits, eligibility, documents, process and cost."
          align="left"
        />
        <ServiceCards />
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Not sure which one you need?"
          lead="Liability, compliance load and whether you can raise equity are the differences that matter most."
        />
        <ComparisonTable />
        <p className="mt-8 text-center">
          <Link href="/compare/" className="link-target font-semibold text-primary hover:underline">
            Read the full comparison guide &rarr;
          </Link>
        </p>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="After registration"
          title="Compliance and advisory support"
          lead="Once an entity exists it carries obligations. These are the services that keep it in good standing."
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
                        className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-5"
                      >
                        <h4 className="text-base font-bold text-secondary">{service.name}</h4>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {service.intro.split(". ")[0]}.
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

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Technology, software and AI work is delivered through our separate brand,{" "}
          <a
            href={SITE.technologies}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Raulji Technologies
          </a>
          .
        </p>
      </Section>

      <CtaBanner />
    </>
  );
}
