import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircleCheck, Info } from "lucide-react";
import { BrandImage } from "@/components/ui/brand-image";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { LeadForm } from "@/components/forms/lead-form";
import {
  BTN_GHOST_DARK,
  BTN_LIGHT,
  CARD,
  CONTAINER,
  Dash,
  EYEBROW,
  EYEBROW_DARK,
  GuideCards,
  H2,
  H2_DARK,
  LIFT,
  SECTION,
  SectionHead,
  ServiceHero,
} from "@/components/pages/service-kit";
import type { SecondaryService } from "@/lib/secondary-services";
import { SERVICES } from "@/lib/services";
import { STRUCTURE_META } from "@/lib/structure-meta";
import { AUTHORITY_DISCLAIMER, SITE, telHref } from "@/lib/site";
import { breadcrumbSchema, graph, pillarServiceSchema, type Crumb } from "@/lib/schema";

/**
 * Compact template for the supporting services: insurance advisory, the two
 * annual compliance pages, and the two technology pages kept for their
 * indexed URLs.
 *
 * Same design system as the registration pages (components/pages/service-kit),
 * but deliberately shorter: these pages answer "do you do this, and what does
 * it cover", then route readers to the enquiry or to the registration
 * structures. Padding them to the length of a registration page would be
 * writing for word count (master rule 21).
 *
 * Technology pages carry no enquiry form and no Service schema: the work is
 * delivered by Raulji Technologies on its own domain, and claiming it as a
 * raulji.com service in structured data would contradict the page (master
 * rule 14).
 */
export function SecondaryServicePage({ service }: { service: SecondaryService }) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: service.name, path: service.path },
  ];

  const isTechnology = service.group === "Technology";
  const trackParams = { service: service.name };

  const schema = isTechnology
    ? graph(breadcrumbSchema(crumbs))
    : graph(
        breadcrumbSchema(crumbs),
        pillarServiceSchema({
          name: service.name,
          description: service.intro,
          path: service.path,
          serviceType: service.name,
        }),
      );

  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd data={schema} />

      <ServiceHero
        crumbs={crumbs}
        eyebrow={service.group}
        title={service.h1}
        lead={service.intro}
        actions={
          isTechnology ? (
            <TrackedLink
              href={SITE.technologies}
              external
              event="technology_click"
              params={{ label: "secondary_hero", ...trackParams }}
              className={BTN_LIGHT}
            >
              Explore Raulji Technologies
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          ) : (
            <>
              <TrackedLink
                href="#enquiry"
                event="primary_cta_click"
                params={{ label: "secondary_hero", ...trackParams }}
                className={BTN_LIGHT}
              >
                Get Business Guidance
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={telHref}
                event="phone_click"
                params={{ label: "secondary_hero", ...trackParams }}
                className={BTN_GHOST_DARK}
              >
                Call {SITE.phone.display}
              </TrackedLink>
            </>
          )
        }
        media={
          <BrandImage
            slot={service.image}
            sizes="(min-width: 1024px) 36rem, 100vw"
            aspect="aspect-[3/2]"
            priority
            className="border-white/10"
          />
        }
      />

      {/* What it covers. */}
      <section aria-labelledby="cov-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16`}>
          <div className="flex min-w-0 flex-col gap-4">
            <p className={EYEBROW}>
              <Dash />
              Scope
            </p>
            {/* On a technology page the list describes another brand's work,
                so the heading has to say so (master rule 14). */}
            <h2 id="cov-h" className={H2}>
              {isTechnology ? "What Raulji Technologies covers" : "What this covers"}
            </h2>
            {service.note ? (
              <p className="mt-2 flex gap-3 rounded-lg border border-[#e3e9ef] bg-[#f4f7fa] p-5 text-[0.9375rem] leading-[1.7]">
                <Info className="mt-0.5 h-5 w-5 flex-none text-[#1a7cb0]" aria-hidden="true" />
                <span>{service.note}</span>
              </p>
            ) : null}
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className={`${CARD} flex gap-3 p-5`}>
                <CircleCheck className="mt-0.5 h-5 w-5 flex-none text-[#1a7cb0]" aria-hidden="true" />
                <span className="leading-[1.6] text-[#26354a]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Guides, only where one genuinely covers the same ground. */}
      {service.guides?.length ? (
        <section aria-labelledby="gd-h" className={`bg-[#f4f7fa] ${SECTION}`}>
          <div className={`${CONTAINER} flex flex-col gap-10`}>
            <SectionHead
              eyebrow="Related guide"
              id="gd-h"
              title="Read this before you decide"
              lead="A longer guide on the same subject, written for someone making the decision rather than buying a service."
            />
            <GuideCards slugs={service.guides} />
          </div>
        </section>
      ) : null}

      {/* Registration structures: where most enquiries actually start. */}
      <section aria-labelledby="reg-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="Business registration"
            id="reg-h"
            title="Registering a business?"
            lead={
              <>
                Each structure page covers who it suits, documents, process and cost. Not sure
                which applies?{" "}
                <Link href="/compare/" className="font-semibold text-[#1a7cb0] hover:underline">
                  Compare all four
                </Link>
                .
              </>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((item) => (
              <li key={item.slug} className="flex">
                <TrackedLink
                  href={item.path}
                  event="service_card_click"
                  params={{ label: "secondary_structures", registration_type: item.shortName }}
                  className={`flex flex-1 flex-col gap-2 p-6 ${CARD} ${LIFT}`}
                >
                  <span className="text-lg font-bold text-[#122640]">{item.shortName}</span>
                  <span className="flex-1 text-sm leading-[1.6]">
                    {STRUCTURE_META[item.slug]?.body ?? item.cardBlurb}
                  </span>
                  <span className="mt-2 text-sm font-bold text-[#1a7cb0]">
                    Explore Service <span aria-hidden="true">→</span>
                  </span>
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close: an enquiry for our own services, a gateway for technology. */}
      {isTechnology ? (
        <section aria-labelledby="tech-h" className="px-5 pb-16 sm:px-8 md:pb-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-6 rounded-lg bg-[#122640] p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="tech-h" className="text-2xl font-bold leading-[1.2] text-white sm:text-[1.75rem]">
                Technology is a separate brand
              </h2>
              <p className="mt-3 leading-[1.7] text-[#c9d6e3]">
                Software, AI and digital work is delivered through Raulji Technologies, on its own
                website with its own team. Raulji.com covers business consulting and registration.
              </p>
            </div>
            <TrackedLink
              href={SITE.technologies}
              external
              event="technology_click"
              params={{ label: "secondary_footer", ...trackParams }}
              className={BTN_LIGHT}
            >
              Go to rauljitechnologies.com
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </section>
      ) : (
        <section
          id="enquiry"
          aria-labelledby="enq-h"
          className={`scroll-mt-24 bg-[#0c1a2d] text-white ${SECTION}`}
        >
          <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
            <div className="flex min-w-0 flex-col gap-5">
              <p className={EYEBROW_DARK}>
                <Dash />
                Enquiry
              </p>
              <h2 id="enq-h" className={H2_DARK}>
                Tell us what you need
              </h2>
              <p className="text-lg leading-[1.7] text-[#c9d6e3]">
                A few lines about the business is enough. We will come back to you on the details
                you provide.
              </p>
              <p className="rounded-[4px] border border-white/[0.12] px-4 py-3.5 text-[0.8125rem] leading-[1.6] text-[#9fb3c8]">
                {AUTHORITY_DISCLAIMER}
              </p>
            </div>
            <div className="text-[#3a4656]">
              <LeadForm
                heading={`${service.name} enquiry`}
                lead="Tell us what you need and we will come back to you."
                className="rounded-lg border-0"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
