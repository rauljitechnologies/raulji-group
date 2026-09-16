import Link from "next/link";
import { Check, Info, ArrowRight, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { ServiceCards } from "@/components/shared/service-cards";
import { CtaBanner } from "@/components/shared/cta-banner";
import { LeadForm } from "@/components/forms/lead-form";
import type { SecondaryService } from "@/lib/secondary-services";
import { SITE, telHref } from "@/lib/site";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

/**
 * Compact template for services kept from the previous site.
 *
 * These pages exist to preserve indexed URLs and serve people who arrive
 * looking for them. They are deliberately lighter than the four registration
 * pages and route readers back to the Phase 1 services.
 */
export function SecondaryServicePage({ service }: { service: SecondaryService }) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: service.name, path: service.path },
  ];

  const isTechnology = service.group === "Technology";

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="pb-12 pt-8">
        <div className="container-wide max-w-4xl">
          <p className="mb-4 inline-flex rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {service.group}
          </p>
          <h1 className="text-3xl leading-tight md:text-4xl">{service.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{service.intro}</p>

          {isTechnology ? (
            <a
              href={SITE.technologies}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-gradient mt-7 inline-flex min-h-[3.25rem] items-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-elevated"
            >
              Explore Raulji Technologies
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#enquiry"
                className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-elevated"
              >
                Talk to an Expert
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={telHref}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {SITE.phone.display}
              </a>
            </div>
          )}
        </div>
      </section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            {/* On a technology page the list describes another brand's work, so
                the heading has to say so. Calling it "what this covers" implies
                raulji.com delivers it (master rule 14). */}
            <h2 className="text-2xl">
              {isTechnology ? "What Raulji Technologies covers" : "What this covers"}
            </h2>
            <ul className="mt-6 space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            {service.note ? (
              <p className="mt-8 flex items-start gap-2.5 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {service.note}
              </p>
            ) : null}
          </div>

          {!isTechnology ? (
            <div id="enquiry">
              <LeadForm
                heading={`${service.name} enquiry`}
                lead="Tell us what you need and we will come back to you."
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="text-xl">Technology is a separate brand</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Software, AI and digital work is delivered through Raulji Technologies, which
                operates on its own domain with its own team. Raulji.com covers business registration
                and business services.
              </p>
              <a
                href={SITE.technologies}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex font-semibold text-primary hover:underline"
              >
                Go to rauljitechnologies.com &rarr;
              </a>
            </div>
          )}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Start here"
          title="Registering a business?"
          lead="These four structures are where most businesses start. Each page covers eligibility, documents, process and cost."
        />
        <ServiceCards />
      </Section>

      <CtaBanner />
    </>
  );
}
