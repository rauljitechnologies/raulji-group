import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, FileText, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { StructureFigure, STRUCTURE_BY_SLUG } from "@/components/shared/structure-diagram";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { LeadForm } from "@/components/forms/lead-form";
import { CtaBanner } from "@/components/shared/cta-banner";
import {
  getCityService,
  getCityServiceParams,
  getSiblingCityServices,
} from "@/lib/city-services";
import { SITE, TIMELINE_DISCLAIMER, AUTHORITY_DISCLAIMER } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  cityServiceSchema,
  faqSchema,
  graph,
  type Crumb,
} from "@/lib/schema";

/**
 * City + service pages: /ahmedabad/llp-registration/ and the other nineteen.
 *
 * Only the twenty pairings in lib/city-services.ts exist. dynamicParams is false,
 * so /godhra/llp-registration/ and every other combination 404s rather than
 * rendering a page assembled by template. That is the whole safeguard against
 * this becoming a doorway-page system, and it should not be relaxed.
 *
 * The page leads with content written for this city and this structure. The
 * shared factual material, documents and process, is summarised here because the
 * brief requires a visitor to find it, and links to the service page for the full
 * version rather than reproducing it five times over.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getCityServiceParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city, service } = await params;
  const found = getCityService(city, service);
  if (!found) return {};

  return pageMeta({
    title: found.entry.title,
    description: found.entry.metaDescription,
    path: found.path,
    ogHeadline: found.entry.h1,
  });
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const found = getCityService(citySlug, serviceSlug);
  if (!found) notFound();

  const { entry, city, service, path } = found;
  const siblings = getSiblingCityServices(citySlug, entry.service);
  const structure = STRUCTURE_BY_SLUG[service.slug];

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Gujarat", path: "/gujarat/" },
    { name: city.name, path: `/${city.slug}/` },
    { name: service.shortName, path },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          cityServiceSchema({
            city,
            service,
            path,
            description: entry.localContext[0],
          }),
          faqSchema(entry.faqs),
        )}
      />
      <Breadcrumbs crumbs={crumbs} />

      {/* Hero. */}
      <section className="pb-12 pt-8">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {city.name}, {city.district} district
              </p>
              <h1 className="mt-4 text-balance text-[1.875rem] leading-[1.2] md:text-4xl md:leading-[1.15] lg:text-[2.75rem] lg:leading-[1.15]">
                {entry.h1}
              </h1>
              <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted-foreground">
                {entry.localContext.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#enquiry"
                  className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-soft"
                >
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={service.path}
                  className="inline-flex min-h-[3.25rem] items-center justify-center rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Full {service.shortName} guide
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                At a glance
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                {(
                  [
                    ["Structure", service.shortName],
                    ["Location served", `${city.name}, ${city.district} district, Gujarat`],
                    [
                      "Our professional fee",
                      service.pricing
                        ? `${service.pricing.amount} plus government fees`
                        : "Quoted on enquiry, as it depends on your details",
                    ],
                    ["Estimated timeline", service.timelineEstimate],
                    ["Filed from", `${SITE.locality}, ${SITE.region}, working remotely`],
                  ] as const
                ).map(([term, desc]) => (
                  <div key={term} className="border-l-2 border-primary/30 pl-4">
                    <dt className="font-semibold text-secondary">{term}</dt>
                    <dd className="mt-0.5 leading-relaxed text-muted-foreground">{desc}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                {TIMELINE_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who, locally, with the structure itself drawn alongside. These pages
          argued about liability and ownership in prose with nothing to look at;
          the figure is the same thing at a glance. */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Who it suits here"
              title={`${service.shortName} in ${city.name}: who it tends to be right for`}
              align="left"
            />
            {structure ? <StructureFigure kind={structure} className="hidden lg:block" /> : null}
          </div>
          <ul className="space-y-3.5">
            {entry.whoLocally.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-secondary">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {structure ? <StructureFigure kind={structure} className="lg:hidden" /> : null}
        </div>
      </Section>

      {/* Local considerations. The substance of the page. */}
      <Section>
        <SectionHeading
          eyebrow="Local considerations"
          title={`What is worth checking in ${city.name}`}
          lead="These are the points that actually differ by market, rather than the general features of the structure."
          align="left"
        />
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {entry.localFactors.map((factor, i) => (
            <li key={factor.title} className="bg-card p-6 sm:p-7">
              <p className="text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg">{factor.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{factor.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Documents and process. Summarised, with the full version one click away,
          so the same lists are not reproduced across five city pages. */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl md:text-3xl">Documents you will need</h2>
            <ul className="mt-6 space-y-2.5">
              {service.documents.map((doc) => (
                <li key={doc} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl">How the process runs</h2>
            <ol className="mt-6 space-y-4">
              {service.process.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-primary"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-secondary">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-7">
              <Link
                href={service.path}
                className="link-target font-semibold text-primary hover:underline"
              >
                Full eligibility, documents and pricing for {service.shortName}
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* FAQs, written for this city and this structure. */}
      <Section>
        <SectionHeading
          eyebrow="FAQs"
          title={`${service.shortName} in ${city.name}: common questions`}
        />
        <FaqAccordion faqs={entry.faqs} idPrefix={`${city.slug}-${entry.service}-faq`} />
      </Section>

      {/* Lead form, pre-filled for this city and structure. */}
      <Section tone="muted" id="enquiry">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Talk to our team"
              title={`Registering in ${city.name}?`}
              lead="Tell us what the business does and who is involved. If another structure fits better, we will say so rather than process what you asked for."
              align="left"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {AUTHORITY_DISCLAIMER}
            </p>
          </div>
          <LeadForm
            defaultRegistrationType={service.shortName}
            defaultCity={city.name}
            heading={`${service.shortName} enquiry, ${city.name}`}
            lead="Your city and the structure are already filled in. Add your details and anything else we should know."
          />
        </div>
      </Section>

      {/* Internal linking: the other three structures here, then the city and the
          pillar pages (master rule 19). */}
      <Section>
        <SectionHeading
          eyebrow="Other options"
          title={`Other structures in ${city.name}`}
          lead="Most people arriving on this page are still comparing. These cover the same ground for the other three structures."
          align="left"
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {siblings.map((sibling) => (
            <Link
              key={sibling.path}
              href={sibling.path}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <h3 className="text-base font-bold text-secondary">
                {sibling.shortName} in {city.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {sibling.localContext[0].split(". ")[0]}.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read more
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-8 text-sm">
          {[
            [`Business registration in ${city.name}`, `/${city.slug}/`],
            [service.name, service.path],
            ["Compare all four structures", "/compare/"],
            ["Business registration overview", "/services/business-registration/"],
            ["Business consulting", "/services/business-consulting/"],
            ["Gujarat coverage", "/gujarat/"],
            ["Contact us", "/contact/"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="link-target font-semibold text-primary hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title={`Registering a ${service.shortName.toLowerCase()} business in ${city.name}?`}
        body="Tell us what you are setting up and we will confirm whether this is the right structure before anything is filed."
        registrationType={service.shortName}
        city={city.name}
      />
    </>
  );
}
