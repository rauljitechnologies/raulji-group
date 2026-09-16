import Link from "next/link";
import { Check, X, FileText, ArrowRight, Phone, MessageCircle, Info, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { StructureFigure, STRUCTURE_BY_SLUG } from "@/components/shared/structure-diagram";
import { CITY_SERVICES, CITY_SERVICE_SLUGS } from "@/lib/city-services";
import { getCity } from "@/lib/cities";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { CtaBanner } from "@/components/shared/cta-banner";
import { LeadForm } from "@/components/forms/lead-form";
import type { RegistrationService } from "@/lib/services";
import { getService } from "@/lib/services";
import { SITE, telHref, whatsappHref, TIMELINE_DISCLAIMER, AUTHORITY_DISCLAIMER } from "@/lib/site";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, type Crumb } from "@/lib/schema";

export function RegistrationServicePage({ service }: { service: RegistrationService }) {

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: service.name, path: service.path },
  ];

  const related = service.related
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const wa = whatsappHref(`Hello Raulji Group, I would like to know more about ${service.name}.`);

  /**
   * City pages that exist for this specific structure. Derived from the data
   * rather than hardcoded, so it stays correct if the permitted city list ever
   * changes and never links to a page that does not exist.
   */
  const structure = STRUCTURE_BY_SLUG[service.slug];
  const localPages = CITY_SERVICES.filter((entry) => entry.service === service.slug)
    .map((entry) => {
      const city = getCity(entry.city);
      if (!city) return null;
      return {
        path: `/${entry.city}/${CITY_SERVICE_SLUGS[entry.service]}/`,
        cityName: city.name,
        district: city.district,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <JsonLd
        data={graph(serviceSchema(service), breadcrumbSchema(crumbs), faqSchema(service.faqs))}
      />
      <Breadcrumbs crumbs={crumbs} />

      {/* Hero */}
      <section className="pb-14 pt-8 md:pb-20">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {service.eyebrow}
            </p>
            <h1 className="mt-4 text-[1.875rem] leading-[1.2] md:text-4xl md:leading-[1.15] lg:text-5xl lg:leading-[1.1]">
              {service.h1}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{service.heroSub}</p>

            {/* Plain-language definition, kept near the top so it is easy to cite. */}
            <div className="mt-7 rounded-2xl border-l-4 border-primary bg-accent/60 p-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                What it is
              </p>
              <p className="mt-2 leading-relaxed text-secondary">{service.definition}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#enquiry"
                className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 font-semibold text-primary-foreground shadow-elevated"
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={telHref}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-primary px-6 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {SITE.phone.display}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 font-semibold text-secondary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>

            <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-secondary">Typical timeline:</strong>{" "}
                {service.timelineEstimate}. {TIMELINE_DISCLAIMER}
              </span>
            </p>
          </div>

          {/* Pricing, only where it is published. Otherwise a quote CTA. */}
          <div>
            {service.pricing ? (
              <div className="rounded-2xl border border-border bg-card p-7">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {service.name} package
                </p>
                <p className="mt-3 text-4xl font-bold text-secondary">{service.pricing.amount}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.pricing.note}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {service.pricing.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#enquiry"
                  className="brand-gradient mt-7 flex min-h-[3rem] items-center justify-center rounded-xl px-6 font-semibold text-primary-foreground"
                >
                  Get started
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-7">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  What it costs
                </p>
                <p className="mt-3 text-2xl font-bold leading-snug text-secondary">
                  Quoted after we understand your business
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {service.shortName} setup cost depends on which registrations your specific
                  activity actually needs, and on state charges such as stamp duty. Rather than
                  publish a figure that may not apply to you, we confirm the professional fee and the
                  expected government charges in writing before anything is filed.
                </p>
                <Link
                  href="#enquiry"
                  className="brand-gradient mt-7 flex min-h-[3rem] items-center justify-center rounded-xl px-6 font-semibold text-primary-foreground"
                >
                  Request a quote
                </Link>
                <a
                  href={telHref}
                  className="mt-3 flex min-h-[3rem] items-center justify-center gap-2 rounded-xl border border-border px-6 font-semibold text-secondary hover:border-primary hover:text-primary"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {SITE.phone.display}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/*
        How the structure is put together. The page explains liability and
        ownership in prose either side of this; the figure is the same thing at
        a glance, which is what most readers came for.
      */}
      {structure ? (
        <Section>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                How it is structured
              </p>
              <h2 className="mt-4 text-2xl md:text-3xl">
                Who owns it, who runs it, and who carries the risk
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Registering a {service.shortName} settles three things at once: who owns the
                business, who is responsible for running it, and how far personal liability
                reaches if something goes wrong. Most of what follows on this page &mdash;
                eligibility, documents, annual compliance &mdash; follows from that.
              </p>
            </div>
            <StructureFigure kind={structure} />
          </div>
        </Section>
      ) : null}

      {/* Who should choose this */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Who should choose {service.shortName}?</h2>
            <ul className="mt-6 space-y-3">
              {service.suitableFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl">Where it may not fit</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Worth weighing before you commit, because changing structure later is not free.
            </p>
            <ul className="mt-6 space-y-3">
              {service.limitations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="mt-1 h-5 w-5 shrink-0 text-destructive/70" aria-hidden="true" />
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionHeading title={`Benefits of ${service.shortName}`} align="left" />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {service.benefits.map((benefit) => (
            <li key={benefit.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg">{benefit.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Eligibility + documents */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Eligibility</h2>
            <ul className="mt-6 space-y-3">
              {service.eligibility.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl">Documents required</h2>
            <ul className="mt-6 grid gap-2.5">
              {service.documents.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading
          title={`${service.shortName} registration process`}
          lead="Step by step, and what happens at each stage."
          align="left"
        />
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <ProcessTimeline steps={service.process} />
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg">What Raulji Group handles</h3>
              <ul className="mt-4 space-y-2.5">
                {service.whatWeHandle.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-accent p-6">
              <h3 className="text-lg text-accent-foreground">How the government process works</h3>
              <p className="mt-3 text-sm leading-relaxed text-accent-foreground/85">
                {service.governmentProcess}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Enquiry form */}
      <Section tone="muted" id="enquiry">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-3xl">Talk to us about {service.shortName}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Send your details and we will come back to you on what your business actually needs,
              what it will cost, and how long it is likely to take.
            </p>
            <dl className="mt-8 space-y-4 text-sm">
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
            <p className="mt-8 rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
              {AUTHORITY_DISCLAIMER}
            </p>
          </div>
          <LeadForm
            defaultRegistrationType={service.shortName}
            heading={`${service.name} enquiry`}
            lead="We will get back to you with what applies to your business specifically."
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading
          eyebrow="FAQs"
          title={`${service.shortName} questions, answered`}
        />
        <FaqAccordion faqs={service.faqs} idPrefix={`${service.slug}-faq`} />
      </Section>

      {/* Local pages for this structure. Completes the link graph: the service
          page points down to the five city pages, and each of those points back
          here for the full guide (master rule 19). */}
      {localPages.length ? (
        <Section>
          <SectionHeading
            eyebrow="By location"
            title={`${service.shortName} registration in your city`}
            lead="These pages cover the same structure with the local business context that tends to shape the decision."
            align="left"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {localPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span className="flex items-center gap-2 text-base font-bold text-secondary">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {page.cityName}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {page.district} district
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Not listed?{" "}
            <Link href="/gujarat/" className="font-semibold text-primary hover:underline">
              We cover all 33 districts of Gujarat
            </Link>
            , and the process is the same wherever you are.
          </p>
        </Section>
      ) : null}

      {/* Related structures */}
      <Section tone="muted">
        <SectionHeading
          title="Considering other structures?"
          lead="If this one does not look like the right fit, these are the alternatives."
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.path}
                className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="text-lg">{item.shortName}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.cardBlurb}
                </p>
                <span className="mt-4 text-sm font-semibold text-primary">
                  {item.cardCta} &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/compare/" className="font-semibold text-primary hover:underline">
            Compare all four structures side by side &rarr;
          </Link>{" "}
          <span className="text-muted-foreground">or see</span>{" "}
          <Link href="/gujarat/" className="font-semibold text-primary hover:underline">
            registration support across Gujarat &rarr;
          </Link>
        </p>
      </Section>

      <CtaBanner
        title={`Start your ${service.shortName} registration`}
        body="Tell us about the business and we will confirm the structure, the documents and the cost before anything is filed."
        registrationType={service.shortName}
      />

    </>
  );
}
