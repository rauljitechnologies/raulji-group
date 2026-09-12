import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight, Phone, Building2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { CityGrid } from "@/components/shared/city-grid";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { CtaBanner } from "@/components/shared/cta-banner";
import { LeadForm } from "@/components/forms/lead-form";
import { CITIES, CITY_SLUGS, getCity } from "@/lib/cities";
import { SERVICES } from "@/lib/services";
import { SITE, telHref, TIMELINE_DISCLAIMER } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  citySeoServiceSchema,
  faqSchema,
  graph,
  type Crumb,
} from "@/lib/schema";

/**
 * Root-level city pages: /godhra/, /ahmedabad/ and so on.
 *
 * One city, one page, covering all four registration structures. No service x
 * city URLs and no district nesting (spec sections 11 and 51).
 *
 * dynamicParams is false so an unknown root path 404s instead of rendering an
 * empty city page. The previous site returned 200 with homepage content for
 * every unknown path, which Google reads as a soft 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return pageMeta({
    title: city.seoTitle,
    description: city.metaDescription,
    path: `/${city.slug}/`,
    ogHeadline: `Business Registration in ${city.name}`,
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Gujarat", path: "/gujarat/" },
    { name: city.name, path: `/${city.slug}/` },
  ];

  const nearby = city.nearby.map((s) => getCity(s)).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          faqSchema(city.faqs),
          ...SERVICES.map((service) => citySeoServiceSchema(city, service)),
        )}
      />
      <Breadcrumbs crumbs={crumbs} />

      {/* Hero */}
      <section className="pb-14 pt-8 md:pb-20">
        <div className="container-wide">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {city.district} district, Gujarat
          </p>
          <h1 className="max-w-4xl text-3xl leading-tight md:text-4xl lg:text-5xl">
            Business Registration Services in {city.name}, Gujarat
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{city.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#enquiry"
              className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-elevated"
            >
              Start Your Business
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

          <ul className="mt-8 flex flex-wrap gap-2">
            {city.sectors.map((sector) => (
              <li
                key={sector}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Registration services, framed for this city */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Your options"
          title={`Registration services for businesses in ${city.name}`}
          lead="All four structures are available. Which one suits you depends on who owns the business, how much liability it carries, and whether you will raise outside money."
          align="left"
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <li key={service.slug} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl">
                <Link href={service.path} className="hover:text-primary hover:underline">
                  {service.name}
                </Link>
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{service.definition}</p>
              <p className="mt-4 text-sm font-semibold text-secondary">Suitable for</p>
              <ul className="mt-2 space-y-1.5">
                {service.suitableFor.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={service.path}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {service.cardCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Local business context */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <h2 className="text-3xl">The business environment in {city.name}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{city.economy}</p>

            <h3 className="mt-10 text-xl">What this usually means for structure</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{city.structureNote}</p>

            <p className="mt-8 rounded-xl border border-border bg-muted p-5 text-sm leading-relaxed text-muted-foreground">
              Raulji Group operates from {SITE.locality}, Gujarat, and serves {city.name} remotely.
              We do not maintain an office in {city.name}. Company and LLP incorporation is filed
              online with the Registrar of Companies and digital signatures are issued through video
              and Aadhaar-based verification, so the process does not require you to travel.{" "}
              {TIMELINE_DISCLAIMER}
            </p>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
                Business areas in and around {city.name}
              </h3>
              <ul className="mt-4 space-y-2">
                {city.businessAreas.map((area) => (
                  <li key={area} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            {nearby.length ? (
              <div className="rounded-2xl bg-accent p-6">
                <h3 className="text-lg text-accent-foreground">Nearby markets</h3>
                <p className="mt-2 text-sm text-accent-foreground/80">
                  Businesses in {city.name} often trade with these markets. We cover each of them.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {nearby.map((n) => (
                    <li key={n.slug}>
                      <Link
                        href={`/${n.slug}/`}
                        className="inline-flex rounded-lg bg-card px-3 py-1.5 text-sm font-medium text-secondary hover:text-primary"
                      >
                        {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg">Contact</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-secondary">Phone</dt>
                  <dd>
                    <a href={telHref} className="link-target text-primary hover:underline">
                      {SITE.phone.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-secondary">Email</dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`} className="link-target text-primary hover:underline">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-secondary">Hours</dt>
                  <dd className="text-muted-foreground">{SITE.hours.display}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      {/* Comparison */}
      <Section tone="muted">
        <SectionHeading
          title="Compare the four structures"
          lead="The same comparison applies wherever you are in Gujarat. These are the differences that matter most."
        />
        <ComparisonTable />
      </Section>

      {/* Enquiry */}
      <Section id="enquiry">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-3xl">Register your business in {city.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Tell us what you are starting and we will come back to you on which structure fits,
              what documents you need and what it will cost.
            </p>
          </div>
          <LeadForm
            defaultCity={city.name}
            heading={`Business registration enquiry, ${city.name}`}
            lead="We will respond with what applies to your specific business."
          />
        </div>
      </Section>

      {/* City FAQs */}
      <Section tone="muted">
        <SectionHeading eyebrow="FAQs" title={`Business registration in ${city.name}`} />
        <FaqAccordion faqs={city.faqs} idPrefix={`${city.slug}-faq`} />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          More general questions are answered in the{" "}
          <Link href="/faqs/" className="font-semibold text-primary hover:underline">
            full FAQ library
          </Link>
          .
        </p>
      </Section>

      {/* Other cities */}
      <Section>
        <SectionHeading
          title="Other cities we cover in Gujarat"
          lead="Each has its own page with local business context."
        />
        <CityGrid slugs={CITY_SLUGS} exclude={city.slug} showDistrict />
        <p className="mt-8 text-center">
          <Link href="/gujarat/" className="link-target font-semibold text-primary hover:underline">
            See full Gujarat coverage &rarr;
          </Link>
        </p>
      </Section>

      <CtaBanner
        title={`Start your business in ${city.name}`}
        body="We will confirm the structure, the documents and the cost before anything is filed."
        city={city.name}
      />
    </>
  );
}
