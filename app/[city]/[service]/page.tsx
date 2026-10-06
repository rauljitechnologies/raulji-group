import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { LeadForm } from "@/components/forms/lead-form";
import { STRUCTURE_BY_SLUG, STRUCTURE_FACTS } from "@/components/shared/structure-diagram";
import {
  getCityService,
  getCityServiceParams,
  getSiblingCityServices,
} from "@/lib/city-services";
import { CITY_SERVICE_PHOTOS } from "@/lib/city-photos";
import { coverScale, scaleSizes } from "@/lib/image-sizes";
import {
  SITE,
  LEADERSHIP,
  telHref,
  mailHref,
  whatsappHref,
  TIMELINE_DISCLAIMER,
  AUTHORITY_DISCLAIMER,
} from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  cityServiceSchema,
  faqSchema,
  graph,
  type Crumb,
} from "@/lib/schema";
import { H1, H2, H2_DARK } from "@/lib/typography";

/**
 * City + service pages: /vadodara/private-limited-company-registration/ and
 * the other nineteen.
 *
 * Only the twenty pairings in lib/city-services.ts exist. dynamicParams is
 * false, so /godhra/llp-registration/ and every other combination 404s rather
 * than rendering a page assembled by template. That is the whole safeguard
 * against this becoming a doorway-page system, and it should not be relaxed.
 *
 * Laid out to the "Raulji Vadodara Private Limited" design (claude.ai/design),
 * which shares its design language with the city pages: the #0c1a2d
 * photographic hero, #122640 navy bands, the #329fd2 rule above each eyebrow,
 * and 4px buttons. The design is one page but this route serves all twenty, so
 * every string below is read from lib/city-services.ts and lib/services.ts
 * rather than written into the markup; the four structures differ enough in
 * wording that STRUCTURE_PHRASES carries the few headings that cannot be built
 * from a service name alone.
 *
 * The page leads with content written for this city and this structure. The
 * shared factual material, documents and process, is summarised here because
 * the brief requires a visitor to find it, and links to the service page for
 * the full version rather than reproducing it five times over.
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

/* The design language, shared with app/[city]/page.tsx. */
const EYEBROW =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]";
const EYEBROW_DARK =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]";
const CONTAINER = "mx-auto max-w-[1240px] px-5 sm:px-8";
const SECTION = "py-16 md:py-24 lg:py-28";
const BTN_LIGHT =
  "inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]";
const BTN_OUTLINE =
  "inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#329fd2] hover:text-[#0c1a2d]";
const PHOTO = "object-cover";

/**
 * The design names the structure in running prose in four places, and none of
 * them can be built from the service record: `name` is title case ("LLP
 * Registration") and lower-casing it gives "llp registration", while
 * `shortName` ("LLP", "Private Limited") does not take an article the same way.
 * Four entries is cheaper than contorting the headings around the data.
 */
const STRUCTURE_PHRASES: Record<
  string,
  { market: string; registering: string; lowerName: string }
> = {
  "pvt-registration": {
    market: "register a company",
    registering: "a company",
    lowerName: "private limited company registration",
  },
  "llp-registration": {
    market: "register an LLP",
    registering: "an LLP",
    lowerName: "LLP registration",
  },
  "partnership-registration": {
    market: "register a partnership firm",
    registering: "a partnership firm",
    lowerName: "partnership firm registration",
  },
  "proprietorship-registration": {
    market: "set up as a proprietor",
    registering: "a proprietorship",
    lowerName: "proprietorship registration",
  },
};

/** The short rule the design sets above every eyebrow. */
function Dash() {
  return <span className="h-0.5 w-7 bg-[#329fd2]" aria-hidden="true" />;
}

/** Eyebrow and heading on the left, the standfirst right-aligned beside it. */
function SectionHead({
  eyebrow,
  title,
  id,
  lead,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  id: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
      <div className="flex flex-col gap-3.5">
        <p className={dark ? EYEBROW_DARK : EYEBROW}>
          <Dash />
          {eyebrow}
        </p>
        <h2 id={id} className={dark ? H2_DARK : H2}>
          {title}
        </h2>
      </div>
      {lead ? (
        <p
          className={`max-w-[30rem] text-base/[1.7] lg:justify-self-end ${
            dark ? "text-[#d5e0ea]" : ""
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/**
 * `pricing.note` opens with "One-time professional fee." and then says which
 * charges sit outside it. The fee itself is already stated in the sentence
 * before, so only the remainder is wanted.
 */
function feeDetail(note: string) {
  return note.replace(/^One-time professional fee\.\s*/, "") || note;
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
  const facts = STRUCTURE_FACTS[STRUCTURE_BY_SLUG[service.slug]];
  const phrases = STRUCTURE_PHRASES[service.slug];
  const photos = CITY_SERVICE_PHOTOS;

  /** Vadodara, where the team works. Every other city is served remotely. */
  const isHome = city.name === SITE.locality;
  const whatsapp = whatsappHref(
    `Hello Raulji Group, I would like to talk about ${service.shortName} in ${city.name}.`,
  );
  const track = `city_service_${city.slug}_${entry.service}`;

  /**
   * The h1 ends in " in <City>" for all twenty pairings, which the design sets
   * in #7cc8ec on the line below the rest of it.
   */
  const suffix = ` in ${city.name}`;
  const h1Head = entry.h1.endsWith(suffix) ? entry.h1.slice(0, -suffix.length) : entry.h1;
  const h1Tail = entry.h1.endsWith(suffix) ? suffix.trimStart() : null;

  /**
   * Cost and timeline, which the design puts in the FAQ list alongside the
   * three written for this city. Both are read from the service record, so the
   * answer here can never drift from the service page's own figures, and the
   * cost question is dropped for the two structures that have no fixed fee
   * rather than answered with a number (master rule 12).
   */
  const faqs = [
    ...entry.faqs,
    ...(service.pricing
      ? [
          {
            q: `How much does ${phrases.lowerName} cost in ${city.name}?`,
            a: `Our professional fee is ${service.pricing.amount}, charged once. ${feeDetail(
              service.pricing.note,
            )} We confirm the exact total before anything is filed.`,
          },
        ]
      : []),
    {
      q: `How long does ${phrases.lowerName} take in ${city.name}?`,
      a: `${service.timelineEstimate}. ${TIMELINE_DISCLAIMER}`,
    },
  ];

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Gujarat", path: "/gujarat/" },
    { name: city.name, path: `/${city.slug}/` },
    { name: service.shortName, path },
  ];

  const glance: [string, string][] = [
    ["Structure", service.shortName],
    ["Location served", `${city.name}, ${city.district} district, Gujarat`],
    [
      "Our professional fee",
      service.pricing
        ? `${service.pricing.amount} plus government fees`
        : "Quoted on enquiry, as it depends on your details",
    ],
    ["Estimated timeline", service.timelineEstimate],
    [
      "Filed from",
      isHome ? `${SITE.locality}, ${SITE.region}` : `${SITE.locality}, ${SITE.region}, working remotely`,
    ],
  ];

  const related: [string, string][] = [
    [`Business registration in ${city.name}`, `/${city.slug}/`],
    [service.name, service.path],
    ["Compare all four structures", "/compare/"],
    ["Business registration overview", "/services/business-registration/"],
    ["Business consulting", "/services/business-consulting/"],
    ["Gujarat coverage", "/gujarat/"],
    ["Contact us", "/contact/"],
  ];

  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          cityServiceSchema({
            city,
            service,
            path,
            description: entry.localContext[0],
          }),
          faqSchema(faqs),
        )}
      />

      {/* Hero. */}
      <section
        aria-labelledby="hero-h"
        className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24"
      >
        <Image src={photos.hero} alt="" fill priority sizes="100vw" placeholder="blur" className={PHOTO} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,26,45,.97)_0%,rgba(12,26,45,.9)_50%,rgba(12,26,45,.6)_100%)]"
        />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 md:gap-14 md:pb-24 md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#7d90a8]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div className="flex min-w-0 flex-col gap-[1.375rem]">
              <p className={EYEBROW_DARK}>
                <Dash />
                {city.name}, {city.district} district
                {isHome ? " · Our home city" : ""}
              </p>
              <h1 id="hero-h" className={`${H1} text-white`}>
                {h1Head}
                {h1Tail ? <span className="text-[#7cc8ec]"> {h1Tail}</span> : null}
              </h1>
              <p className="max-w-[38.75rem] text-pretty text-base/[1.75] text-[#d5e0ea] sm:text-lg/[1.75]">
                {entry.localContext[0]}
              </p>
              <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#enquiry" className={BTN_LIGHT}>
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link href={service.path} className={BTN_OUTLINE}>
                  Full {service.shortName} guide
                </Link>
              </div>
            </div>

            <dl className="flex min-w-0 flex-col rounded-lg border border-white/[0.16] bg-[rgba(12,26,45,0.78)] px-[1.625rem] py-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7cc8ec]">
                At a glance
              </p>
              {glance.map(([term, desc]) => (
                <div key={term} className="flex flex-col gap-[3px] border-t border-white/[0.12] py-3">
                  <dt className="text-xs text-[#9fb3c8]">{term}</dt>
                  <dd className="text-[0.9375rem] font-semibold leading-[1.45]">{desc}</dd>
                </div>
              ))}
              <p className="border-t border-white/[0.12] pt-3 text-xs leading-[1.55] text-[#9fb3c8]">
                {TIMELINE_DISCLAIMER}
              </p>
            </dl>
          </div>
        </div>
      </section>

      {/* The local market: the rest of the written local context. */}
      <section aria-labelledby="mkt-h" className={SECTION}>
        <div
          className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-[5.5rem]`}
        >
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW}>
              <Dash />
              The {city.name} market
            </p>
            <h2 id="mkt-h" className={H2}>
              Why businesses {phrases.market} in {city.name}.
            </h2>
            {entry.localContext.slice(1).map((para) => (
              <p key={para.slice(0, 40)} className="text-pretty text-[1.0625rem]/[1.8]">
                {para}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-lg bg-[#1b3350]">
            <Image
              src={photos.market.src}
              alt={photos.market.alt}
              fill
              sizes={scaleSizes(
                "(min-width: 1024px) 540px, (min-width: 640px) 100vw, 100vw",
                coverScale(photos.market.src, 4 / 3),
              )}
              placeholder="blur"
              className={PHOTO}
            />
          </div>
        </div>
      </section>

      {/* Who it suits here, with how the structure is put together beside it. */}
      <section aria-labelledby="who-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div
          className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-[5.5rem]`}
        >
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW}>
              <Dash />
              Who it suits here
            </p>
            <h2 id="who-h" className={H2}>
              {service.shortName} in {city.name}: who it tends to be right for.
            </h2>
            <ul className="mt-2 flex flex-col border-t border-[#dde4ec]">
              {entry.whoLocally.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-[#dde4ec] py-[1.125rem]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-px flex h-[1.625rem] w-[1.625rem] flex-none items-center justify-center rounded-full bg-[#e8f5fb] text-[0.8125rem] font-extrabold text-[#1a7cb0]"
                  >
                    ✓
                  </span>
                  <p className="text-base/[1.6] font-medium text-[#122640]">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg bg-[#1b3350]">
              <Image
                src={photos.suits.src}
                alt={photos.suits.alt}
                fill
                sizes={scaleSizes(
                  "(min-width: 1024px) 420px, 100vw",
                  coverScale(photos.suits.src, 16 / 11),
                )}
                placeholder="blur"
                className={PHOTO}
              />
            </div>
            {/* The same facts the structure diagram draws, stated in words. */}
            <div className="flex flex-col gap-3.5 rounded-lg bg-[#122640] p-[1.625rem] text-white">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7cc8ec]">
                How the structure works
              </p>
              <ul className="grid grid-cols-2 gap-2.5">
                {facts.roles.map((role) => (
                  <li key={role.label} className="rounded-md border border-white/[0.18] p-3.5">
                    <p className="text-xs text-[#9fb3c8]">{role.label}</p>
                    <p className="mt-1 text-[0.9375rem] font-bold">{role.does}</p>
                  </li>
                ))}
              </ul>
              <p className="rounded-md bg-[#329fd2] p-4 text-[#0c1a2d]">
                <strong className="block text-base font-extrabold">{facts.entity.label}</strong>
                <span className="mt-1 block text-sm font-semibold">
                  {facts.entity.sub}.{facts.shield ? ` ${facts.shield}.` : ""}
                </span>
              </p>
              <p className="text-sm italic leading-[1.6] text-[#d5e0ea]">{facts.caption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local considerations. The substance of the page. */}
      <section aria-labelledby="loc-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="Local considerations"
            id="loc-h"
            title={`What is worth checking before registering in ${city.name}.`}
            lead="These are the points that actually differ by market, rather than the general features of the structure."
          />
          {/* Always four, so a 2x2 rather than the design's auto-fit, which
              fits three across at 1240px and orphans the fourth. */}
          <ol className="grid gap-5 sm:grid-cols-2">
            {entry.localFactors.map((factor, i) => {
              const photo = photos.factors[i % photos.factors.length];
              return (
                <li
                  key={factor.title}
                  className="flex flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-white"
                >
                  <div className="relative aspect-[16/9] bg-[#1b3350]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={scaleSizes(
                        "(min-width: 1240px) 578px, (min-width: 640px) 48vw, 100vw",
                        coverScale(photo.src, 16 / 9),
                      )}
                      placeholder="blur"
                      className={PHOTO}
                    />
                  </div>
                  <div className="flex flex-col gap-3 px-6 pb-7 pt-6">
                    <p className="text-sm font-extrabold tracking-[0.04em] text-[#329fd2]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[1.1875rem] font-bold leading-[1.3] text-[#122640]">
                      {factor.title}
                    </h3>
                    <p className="text-[0.9375rem]/[1.7]">{factor.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Documents. Summarised, with the full version one click away, so the
          same lists are not reproduced across five city pages. */}
      <section aria-labelledby="doc-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div
          className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-[5.5rem]`}
        >
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW}>
              <Dash />
              Documents
            </p>
            <h2 id="doc-h" className={H2}>
              Documents required for {phrases.lowerName}.
            </h2>
            <p className="text-[1.0625rem]/[1.8]">
              These are needed for everyone named in the application, plus the registered office in{" "}
              {city.name}. Address papers that do not match are the most common reason a filing gets
              queried.
            </p>
            <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-lg bg-[#1b3350]">
              <Image
                src={photos.documents.src}
                alt={photos.documents.alt}
                fill
                sizes={scaleSizes(
                  "(min-width: 1024px) 480px, 100vw",
                  coverScale(photos.documents.src, 16 / 10),
                )}
                placeholder="blur"
                className={PHOTO}
              />
            </div>
          </div>
          <ol className="flex min-w-0 flex-col rounded-lg border border-[#e3e9ef] bg-white">
            {service.documents.map((doc, i) => (
              <li
                key={doc}
                className="flex items-start gap-4 border-b border-[#eef2f6] px-6 py-[1.125rem] last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 min-w-6 flex-none text-[0.8125rem] font-extrabold text-[#329fd2]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.9375rem]/[1.6] text-[#122640]">{doc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How the process runs. */}
      <section
        id="process"
        aria-labelledby="how-h"
        className={`scroll-mt-28 bg-[#122640] text-white ${SECTION}`}
      >
        <div className={`${CONTAINER} flex flex-col gap-12`}>
          <SectionHead
            dark
            eyebrow="The process"
            id="how-h"
            title={`How the process runs in ${city.name}.`}
            lead={`${service.process.length} stages. ${service.timelineEstimate}.`}
          />
          <ol className="grid gap-x-8 border-t border-white/[0.18] sm:grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))]">
            {service.process.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col gap-3.5 border-b border-white/10 pb-6 pt-7"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#329fd2] text-[0.9375rem] font-extrabold text-[#0c1a2d]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#7cc8ec]">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="text-[1.1875rem] font-bold leading-[1.3] text-white">{step.title}</h3>
                <p className="text-[0.9375rem]/[1.7] text-[#d5e0ea]">{step.body}</p>
              </li>
            ))}
          </ol>
          <Link href={service.path} className={`${BTN_OUTLINE} self-start`}>
            Full eligibility, documents and pricing for {service.shortName}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FAQs, written for this city and this structure. */}
      <section aria-labelledby="faq-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              FAQs
            </p>
            <h2 id="faq-h" className={H2}>
              {service.shortName} in {city.name}: common questions.
            </h2>
            <p className="text-sm/[1.6]">
              More general questions are answered in the{" "}
              <Link
                href="/faqs/"
                className="font-bold text-[#1a7cb0] hover:text-[#122640] hover:underline"
              >
                full FAQ library
              </Link>
              .
            </p>
          </div>
          <div className="flex min-w-0 flex-col border-t border-[#dde4ec]">
            {faqs.map((item) => (
              <details key={item.q} className="group border-b border-[#dde4ec]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-[4px] py-[1.375rem] transition-[padding,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-[#f4f7fa] hover:px-3.5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-semibold leading-[1.4] text-[#122640]">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#cfd9e3] bg-white text-[#1a7cb0] transition-transform duration-200 group-open:rotate-45"
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-[0.9375rem] leading-[1.75]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal linking: the other three structures here, then the city and
          the pillar pages (master rule 19). */}
      <section aria-labelledby="oth-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="Other options"
            id="oth-h"
            title={`Other business structures in ${city.name}.`}
            lead="Most people arriving on this page are still comparing. These cover the same ground for the other three structures."
          />
          <ul className="grid gap-5 sm:grid-cols-[repeat(auto-fit,minmax(min(100%,18.75rem),1fr))]">
            {siblings.map((sibling) => {
              const photo = photos.structures[sibling.service];
              return (
                <li key={sibling.path} className="flex">
                  <Link
                    href={sibling.path}
                    className="group flex flex-1 flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-white transition-colors hover:border-[#329fd2]"
                  >
                    <div className="relative aspect-[16/10] bg-[#1b3350]">
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes={scaleSizes(
                            "(min-width: 1240px) 390px, (min-width: 640px) 45vw, 100vw",
                            coverScale(photo.src, 16 / 10),
                          )}
                          placeholder="blur"
                          className="object-cover photo-zoom"
                        />
                      ) : null}
                      <span className="absolute left-3.5 top-3.5 rounded-full bg-white px-2.5 py-[5px] text-xs font-bold text-[#122640]">
                        {sibling.shortName}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5 px-[1.375rem] pb-6 pt-[1.375rem]">
                      <h3 className="text-[1.125rem] font-bold leading-[1.3] text-[#122640]">
                        {sibling.shortName} in {city.name}
                      </h3>
                      <p className="text-[0.9375rem]/[1.6]">
                        {sibling.localContext[0].split(". ")[0]}.
                      </p>
                      <p className="mt-auto border-t border-[#eef2f6] pt-3.5 text-sm font-bold text-[#1a7cb0]">
                        Read more <span aria-hidden="true">→</span>
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <nav aria-label="Related pages" className="flex flex-col gap-3.5">
            <h3 className="text-[0.9375rem] font-bold text-[#122640]">Related pages</h3>
            <ul className="flex flex-wrap gap-2.5">
              {related.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex min-h-[2.75rem] items-center rounded-full border border-[#dde4ec] bg-white px-4 text-sm font-semibold text-[#122640] transition-colors hover:border-[#122640] hover:bg-[#122640] hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Enquiry. The site-wide LeadForm, so leads reach the CRM unchanged. */}
      <section id="enquiry" aria-labelledby="enq-h" className={`scroll-mt-28 ${SECTION}`}>
        <div
          className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20`}
        >
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW}>
              <Dash />
              Talk to our team
            </p>
            <h2 id="enq-h" className={H2}>
              Registering in {city.name}?
            </h2>
            <p className="text-[1.0625rem]/[1.8]">
              Tell us what the business does and who is involved. If another structure fits better,
              we will say so rather than process what you asked for.
            </p>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#1b3350]">
              <Image
                src={photos.enquiry.src}
                alt={photos.enquiry.alt}
                fill
                sizes={scaleSizes(
                  "(min-width: 1024px) 480px, 100vw",
                  coverScale(photos.enquiry.src, 16 / 10),
                )}
                placeholder="blur"
                className={PHOTO}
              />
            </div>

            <figure className="m-0 flex items-center gap-[1.125rem] rounded-lg border border-[#e3e9ef] bg-white p-5">
              <Image
                src={LEADERSHIP.chairman.photo}
                alt=""
                width={76}
                height={76}
                className="h-[4.75rem] w-[4.75rem] flex-none rounded-full border-2 border-[#329fd2] object-cover object-[center_20%]"
              />
              <figcaption className="flex flex-col gap-1">
                <p className="text-base font-bold text-[#122640]">{LEADERSHIP.chairman.name}</p>
                <p className="text-[0.8125rem] text-[#5b6778]">{LEADERSHIP.chairman.roles[0]}</p>
                <p className="mt-1 text-sm leading-[1.55]">
                  {isHome
                    ? `Based in ${SITE.locality}. Meet us in person by appointment.`
                    : `Based in ${SITE.locality}, working with businesses in ${city.name}.`}
                </p>
              </figcaption>
            </figure>

            <ul className="flex flex-col gap-2 text-[0.9375rem]">
              <li>
                <TrackedLink
                  href={telHref}
                  event="phone_click"
                  params={{ label: track }}
                  className="font-bold text-[#122640] hover:text-[#1a7cb0] hover:underline"
                >
                  Call {SITE.phone.display}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={whatsapp}
                  external
                  event="whatsapp_click"
                  params={{ label: track }}
                  className="font-bold text-[#122640] hover:text-[#1a7cb0] hover:underline"
                >
                  WhatsApp us
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={mailHref}
                  event="email_click"
                  params={{ label: track }}
                  className="font-bold text-[#122640] hover:text-[#1a7cb0] hover:underline"
                >
                  {SITE.email}
                </TrackedLink>
              </li>
            </ul>

            <p className="text-sm leading-[1.6] text-[#5b6778]">{AUTHORITY_DISCLAIMER}</p>
          </div>

          <LeadForm
            defaultRegistrationType={service.shortName}
            defaultCity={city.name}
            heading={`${service.shortName} enquiry, ${city.name}`}
            lead="Your city and the structure are already filled in. Add your details and anything else we should know."
            className="rounded-lg border-0 shadow-[0_30px_70px_-40px_rgba(12,26,45,0.45),0_0_0_1px_rgba(18,38,64,0.08)]"
          />
        </div>
      </section>

      {/* Closing CTA. */}
      <section
        aria-labelledby="cta-h"
        className="relative overflow-hidden bg-[#0c1a2d] text-white"
      >
        <Image src={photos.cta} alt="" fill sizes="100vw" placeholder="blur" className={PHOTO} />
        <div aria-hidden="true" className="absolute inset-0 bg-[rgba(12,26,45,0.88)]" />
        <div
          className={`relative ${CONTAINER} flex flex-wrap items-center justify-between gap-7 py-14 sm:gap-12 md:py-[5.5rem]`}
        >
          <div className="flex min-w-0 flex-[1_1_32.5rem] flex-col gap-3.5">
            <h2
              id="cta-h"
              className="text-balance text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[2.5rem]"
            >
              Registering {phrases.registering} in {city.name}?
            </h2>
            <p className="text-[1.0625rem]/[1.7] text-[#d5e0ea]">
              Tell us what you are setting up and we will confirm whether this is the right
              structure before anything is filed.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/contact/"
                event="primary_cta_click"
                params={{ label: `${track}_footer` }}
                className={BTN_LIGHT}
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={whatsapp}
                external
                event="whatsapp_click"
                params={{ label: `${track}_footer` }}
                className={BTN_OUTLINE}
              >
                Talk to an Expert
              </TrackedLink>
            </div>
            <p className="text-sm text-[#c9d6e3]">
              Or call{" "}
              <TrackedLink
                href={telHref}
                event="phone_click"
                params={{ label: `${track}_footer` }}
                className="font-bold text-white hover:text-[#7cc8ec] hover:underline"
              >
                {SITE.phone.display}
              </TrackedLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
