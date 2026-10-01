import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { HighlightComparison } from "@/components/shared/registration-tools";
import { LeadForm } from "@/components/forms/lead-form";
import { CITIES, getCity } from "@/lib/cities";
import { CITY_INDEX } from "@/lib/city-index";
import { CITY_SERVICE_SLUGS, CITIES_WITH_SERVICE_PAGES } from "@/lib/city-services";
import { CITY_CARD_PHOTOS, CITY_PAGE_PHOTOS, CITY_PLACE_PHOTOS } from "@/lib/city-photos";
import { coverScale, coverWidth, scaleSizes } from "@/lib/image-sizes";
import { SERVICES } from "@/lib/services";
import { STRUCTURE_META } from "@/lib/structure-meta";
import { SITE, telHref, whatsappHref, TIMELINE_DISCLAIMER } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  citySeoServiceSchema,
  faqSchema,
  graph,
  type Crumb,
} from "@/lib/schema";
import { H1, H2 } from "@/lib/typography";

/**
 * Root-level city pages: /godhra/, /ahmedabad/ and so on.
 *
 * One city, one page, covering all four registration structures. No district
 * nesting (master rule 17). Laid out to the "Raulji Ahmedabad" design; cities
 * with photographs of the place (lib/city-photos.ts) get the photographic
 * hero, strip and area cards, the rest the same sections without them.
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

const EYEBROW =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]";
const EYEBROW_DARK =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]";
const CONTAINER = "mx-auto max-w-[1240px] px-5 sm:px-8";
const SECTION = "py-16 md:py-24 lg:py-28";
const H3_BAND = "text-balance text-[1.375rem] font-bold leading-[1.2] tracking-[-0.01em] sm:text-[1.75rem]";
const BTN_LIGHT =
  "inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]";
const BTN_OUTLINE =
  "inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#329fd2] hover:text-[#0c1a2d]";
const PHOTO = "object-cover";

/**
 * The environment grid has fixed heights (18.75rem, sm 22rem, lg 26.25rem),
 * with the first photograph spanning both rows and taking 1.4fr of the width.
 * Widths are the widest each column gets at that breakpoint.
 */
function environmentSizes(image: { width: number; height: number }, tall: boolean): string {
  return tall
    ? `(min-width: 1024px) ${coverWidth(image, 420, 400)}px, (min-width: 640px) ${coverWidth(image, 352, 560)}px, ${coverWidth(image, 300, 370)}px`
    : `(min-width: 1024px) ${coverWidth(image, 204, 280)}px, (min-width: 640px) ${coverWidth(image, 170, 400)}px, ${coverWidth(image, 144, 270)}px`;
}

function Dash() {
  return <span className="h-0.5 w-7 bg-[#329fd2]" aria-hidden="true" />;
}

function SectionHead({
  eyebrow,
  title,
  id,
  lead,
}: {
  eyebrow: string;
  title: string;
  id: string;
  lead?: string;
}) {
  return (
    <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
      <div className="flex flex-col gap-3.5">
        <p className={EYEBROW}>
          <Dash />
          {eyebrow}
        </p>
        <h2 id={id} className={H2}>
          {title}
        </h2>
      </div>
      {lead ? (
        <p className="max-w-[30rem] text-base/[1.7] lg:justify-self-end">{lead}</p>
      ) : null}
    </div>
  );
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

  const place = CITY_PLACE_PHOTOS[city.slug];
  /** Vadodara, where the team works. Every other city is served remotely. */
  const isHome = city.name === SITE.locality;
  const nearby = city.nearby.map((s) => getCity(s)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const others = CITY_INDEX.filter((c) => c.slug !== city.slug);
  const whatsapp = whatsappHref(
    `Hello Raulji Group, I would like to know more about business registration in ${city.name}.`,
  );

  /**
   * Five priority cities have a dedicated page per structure. Where they exist,
   * this page links to them rather than to the generic service page, so the
   * local page is the one that receives the local intent instead of competing
   * with it (master rule 19).
   */
  const hasServicePages = CITIES_WITH_SERVICE_PAGES.includes(city.slug);
  const serviceHref = (slug: string) =>
    hasServicePages && slug in CITY_SERVICE_SLUGS
      ? `/${city.slug}/${CITY_SERVICE_SLUGS[slug as keyof typeof CITY_SERVICE_SLUGS]}/`
      : undefined;

  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          faqSchema(city.faqs),
          ...SERVICES.map((service) =>
            citySeoServiceSchema(city, service, serviceHref(service.slug)),
          ),
        )}
      />

      {/* Hero. */}
      <section
        aria-labelledby="city-h"
        className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24"
      >
        {place ? (
          <>
            <Image
              src={place.hero.src}
              alt=""
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              className={PHOTO}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,26,45,.96)_0%,rgba(12,26,45,.88)_45%,rgba(12,26,45,.45)_100%)]"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-56 h-[38.75rem] w-[38.75rem] rounded-full bg-[radial-gradient(circle,rgba(50,159,210,0.32),rgba(50,159,210,0)_65%)]"
          />
        )}
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 md:gap-14 md:pb-24 md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#7d90a8]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div className="flex min-w-0 flex-col gap-[1.375rem]">
              <p className={EYEBROW_DARK}>
                <Dash />
                {city.district} district, Gujarat{isHome ? " · Our home city" : ""}
              </p>
              <h1 id="city-h" className={`${H1} text-white`}>
                Business registration services in{" "}
                <span className="text-[#7cc8ec]">{city.name}.</span>
              </h1>
              <p className="max-w-[38.75rem] text-pretty text-base/[1.75] text-[#d5e0ea] sm:text-lg/[1.75]">
                {city.intro}
              </p>
              <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#enquiry" className={BTN_LIGHT}>
                  Start Your Business
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <TrackedLink
                  href={telHref}
                  event="phone_click"
                  params={{ label: `city_hero_${city.slug}` }}
                  className={BTN_OUTLINE}
                >
                  Call {SITE.phone.display}
                </TrackedLink>
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-3.5 rounded-lg border border-white/[0.16] bg-[rgba(12,26,45,0.72)] px-6 py-[1.375rem]">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7cc8ec]">
                Key sectors in {city.name}
              </p>
              <ul className="flex flex-wrap gap-2">
                {city.sectors.map((sector) => (
                  <li
                    key={sector}
                    className="rounded-full border border-white/[0.28] px-3.5 py-2 text-[0.8125rem] font-semibold"
                  >
                    {sector}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The city in pictures. */}
      {place ? (
        <section aria-label={`${city.name} in pictures`} className="pt-5 md:pt-8">
          <ul className={`${CONTAINER} grid grid-cols-2 gap-3 lg:grid-cols-4`}>
            {place.gallery.map((g) => (
              <li
                key={g.caption}
                className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#1b3350]"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes={scaleSizes("(min-width: 1024px) 300px, 50vw", coverScale(g.src, 4 / 3))}
                  placeholder="blur"
                  className={PHOTO}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,26,45,0)_45%,rgba(12,26,45,.85)_100%)]"
                />
                <p className="absolute inset-x-4 bottom-3.5 text-[0.8125rem] font-bold leading-[1.35] text-white sm:text-sm">
                  {g.caption}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Registration services, framed for this city. */}
      <section id="structures" aria-labelledby="opt-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="Your options"
            id="opt-h"
            title={`Registration services for businesses in ${city.name}.`}
            lead="All four structures are available. Which one suits you depends on who owns the business, how much liability it carries, and whether you will raise outside money."
          />
          <ul className="grid gap-5 lg:grid-cols-2">
            {SERVICES.map((service) => {
              const local = serviceHref(service.slug);
              const photo = CITY_PAGE_PHOTOS.structures[service.slug];
              return (
                <li
                  key={service.slug}
                  className="flex flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-white transition-colors hover:border-[#329fd2] sm:flex-row"
                >
                  <div className="relative min-h-[12.5rem] bg-[#e8f5fb] sm:w-[40%] sm:flex-none">
                    {photo ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        // The strip is narrow but stretches to the card's text, so
                        // object-cover draws the landscape photograph several times
                        // wider than the strip. Measured, not the strip width.
                        sizes="(min-width: 1024px) 1080px, (min-width: 640px) 900px, 100vw"
                        placeholder="blur"
                        className={PHOTO}
                      />
                    ) : null}
                    <span className="absolute left-3.5 top-3.5 rounded-[3px] bg-white px-2.5 py-1 text-xs font-bold text-[#122640]">
                      {STRUCTURE_META[service.slug]?.time}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-3 px-6 py-[1.625rem]">
                    <h3 className="text-xl font-extrabold leading-[1.25] text-[#122640]">
                      <Link href={local ?? service.path} className="hover:text-[#1a7cb0]">
                        {service.name} in {city.name}
                      </Link>
                    </h3>
                    <p className="text-sm/[1.65]">{service.definition}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#5b6778]">
                      Suitable for
                    </p>
                    <ul className="flex flex-1 flex-col gap-2">
                      {service.suitableFor.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm/[1.5] text-[#122640]">
                          <Check
                            className="mt-[3px] h-4 w-4 flex-none text-[#329fd2]"
                            strokeWidth={2.6}
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-x-[1.125rem] gap-y-2 border-t border-[#eef2f6] pt-3.5">
                      <Link
                        href={local ?? service.path}
                        className="inline-flex min-h-[2.75rem] items-center text-sm font-bold text-[#1a7cb0] hover:text-[#122640] hover:underline"
                      >
                        {local ? `${service.shortName} in ${city.name}` : service.cardCta}{" "}
                        <span aria-hidden="true">&nbsp;→</span>
                      </Link>
                      {local ? (
                        <Link
                          href={service.path}
                          className="inline-flex min-h-[2.75rem] items-center text-[0.8125rem] text-[#5b6778] hover:text-[#1a7cb0] hover:underline"
                        >
                          Or the general guide
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Local business context. */}
      <section aria-labelledby="env-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-10 md:gap-14`}>
          <div className={`grid items-center gap-10 ${place ? "lg:grid-cols-[1fr_1.2fr] lg:gap-20" : ""}`}>
            <div className="flex min-w-0 flex-col gap-[1.125rem]">
              <p className={EYEBROW}>
                <Dash />
                Local context
              </p>
              <h2 id="env-h" className={H2}>
                The business environment in {city.name}.
              </h2>
              <p className={`text-base/[1.75] ${place ? "" : "max-w-3xl"}`}>{city.economy}</p>
            </div>
            {place ? (
              <div className="grid h-[18.75rem] min-w-0 grid-cols-[1.4fr_1fr] grid-rows-2 gap-3 sm:h-[22rem] lg:h-[26.25rem]">
                {place.environment.map((photo, i) => (
                  <div
                    key={photo.alt}
                    className={`relative overflow-hidden rounded-lg bg-[#1b3350] ${i === 0 ? "row-span-2" : ""}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={environmentSizes(photo.src, i === 0)}
                      placeholder="blur"
                      className={PHOTO}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="grid gap-6 rounded-lg bg-[#122640] p-7 text-white sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:p-11">
            <h3 className={`${H3_BAND} text-white`}>What this usually means for structure</h3>
            <p className="min-w-0 text-base/[1.75] text-[#d5e0ea]">{city.structureNote}</p>
          </div>
        </div>
      </section>

      {/* Business areas. */}
      <section aria-labelledby="area-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-9`}>
          <SectionHead
            eyebrow="Where we work"
            id="area-h"
            title={`Business areas in and around ${city.name}.`}
            lead={
              isHome
                ? "From the GIDC estates to the city's commercial roads, this is our home market."
                : (city.areasLead ??
                  `We serve businesses across the city and its industrial belt, remotely, from ${SITE.locality}.`)
            }
          />
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-4">
            {city.businessAreas.map((area, i) => {
              const extra = place?.areas[i];
              return (
                <li
                  key={area}
                  className="flex flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-white"
                >
                  {extra ? (
                    <div className="relative aspect-[4/3] bg-[#e8f5fb]">
                      <Image
                        src={extra.photo.src}
                        alt={extra.photo.alt}
                        fill
                        sizes="(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw"
                        placeholder="blur"
                        className={PHOTO}
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-1.5 px-[1.125rem] pb-5 pt-[1.125rem]">
                    <span className="text-xs font-bold text-[#1a7cb0]">
                      {String(i + 1).padStart(2, "0")}
                      {extra ? ` · ${extra.kind}` : ""}
                    </span>
                    <h3 className="text-base font-bold leading-[1.35] text-[#122640]">{area}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Served remotely, nearby markets, contact. */}
      <section aria-labelledby="rem-h" className="pb-16 md:pb-24 lg:pb-28">
        <div className={`${CONTAINER} grid gap-5 lg:grid-cols-[1.6fr_1fr]`}>
          <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-[#f4f7fa] sm:flex-row">
            <div className="relative min-h-[13.75rem] bg-[#e8f5fb] sm:w-[40%] sm:flex-none">
              <Image
                src={CITY_PAGE_PHOTOS.remote.src}
                alt={CITY_PAGE_PHOTOS.remote.alt}
                fill
                sizes="(min-width: 640px) 840px, 100vw"
                placeholder="blur"
                className={PHOTO}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3.5 p-6 sm:p-9">
              {isHome ? (
                <>
                  <h2 id="rem-h" className={`${H3_BAND} text-[#122640]`}>
                    Based in {SITE.locality}. Meet us, or work entirely online.
                  </h2>
                  <p className="text-[0.9375rem] leading-[1.75]">
                    Raulji Group operates from {SITE.locality}, Gujarat, Monday to Saturday between
                    9:00 AM and 7:00 PM. Call or email to arrange a time before visiting, so the right
                    person is available and you know which documents to bring. Company and LLP
                    incorporation is filed online with the Registrar of Companies and digital
                    signatures are issued through video and Aadhaar-based verification, so a visit
                    is optional.
                  </p>
                </>
              ) : (
                <>
                  <h2 id="rem-h" className={`${H3_BAND} text-[#122640]`}>
                    Served from {SITE.locality}. No travel needed.
                  </h2>
                  <p className="text-[0.9375rem] leading-[1.75]">
                    Raulji Group operates from {SITE.locality}, Gujarat, and serves {city.name}{" "}
                    remotely. We do not maintain an office in {city.name}. Company and LLP
                    incorporation is filed online with the Registrar of Companies and digital
                    signatures are issued through video and Aadhaar-based verification, so the
                    process does not require you to travel.
                  </p>
                </>
              )}
              <p className="text-[0.8125rem] leading-[1.65] text-[#5b6778]">{TIMELINE_DISCLAIMER}</p>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            {nearby.length ? (
              <div className="flex flex-col gap-3.5 rounded-lg border border-[#e3e9ef] p-6">
                <h3 className="text-[1.0625rem] font-bold text-[#122640]">Nearby markets</h3>
                <p className="text-sm/[1.6]">
                  Businesses in {city.name} often trade with these markets. We cover each of them.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {nearby.map((n) => (
                    <li key={n.slug}>
                      <TrackedLink
                        href={`/${n.slug}/`}
                        event="city_page_click"
                        params={{ city: n.name, label: `nearby_${city.slug}` }}
                        className="flex min-h-[2.75rem] items-center rounded-full border border-[#cfd9e3] px-[0.9375rem] text-sm font-semibold text-[#122640] transition-colors hover:border-[#122640] hover:bg-[#122640] hover:text-white"
                      >
                        {n.name}
                      </TrackedLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <dl className="grid grid-cols-[auto_1fr] gap-x-[1.125rem] gap-y-3 rounded-lg border border-[#e3e9ef] p-6 text-sm">
              <dt className="text-[#5b6778]">Phone</dt>
              <dd>
                <TrackedLink
                  href={telHref}
                  event="phone_click"
                  params={{ label: `city_contact_${city.slug}` }}
                  className="font-bold text-[#122640] hover:text-[#1a7cb0] hover:underline"
                >
                  {SITE.phone.display}
                </TrackedLink>
              </dd>
              <dt className="text-[#5b6778]">Email</dt>
              <dd>
                <TrackedLink
                  href={`mailto:${SITE.email}`}
                  event="email_click"
                  params={{ label: `city_contact_${city.slug}` }}
                  className="font-bold text-[#122640] hover:text-[#1a7cb0] hover:underline"
                >
                  {SITE.email}
                </TrackedLink>
              </dd>
              <dt className="text-[#5b6778]">Hours</dt>
              <dd className="font-semibold text-[#122640]">{SITE.hours.display}</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* Comparison. */}
      <section id="compare" aria-labelledby="cmp-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-8`}>
          <SectionHead
            eyebrow="Side by side"
            id="cmp-h"
            title="Compare the four structures."
            lead="The same comparison applies wherever you are in Gujarat. These are the differences that matter most."
          />
          <HighlightComparison
            structures={SERVICES.map((service) => ({
              slug: service.slug,
              name: service.shortName,
              href: service.path,
            }))}
          />
        </div>
      </section>

      {/* Enquiry. The site-wide LeadForm, so leads reach the CRM unchanged. */}
      <section id="enquiry" aria-labelledby="enq-h" className={`scroll-mt-28 ${SECTION}`}>
        <div className={`${CONTAINER} grid items-stretch gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              Start in {city.name}
            </p>
            <h2 id="enq-h" className={H2}>
              Register your business in {city.name}.
            </h2>
            <p className="text-base/[1.75]">
              Tell us what you are starting and we will come back to you on which structure fits,
              what documents you need and what it will cost.
            </p>
            <div className="relative mt-2 min-h-[15rem] flex-1 overflow-hidden rounded-lg bg-[#1b3350]">
              <Image
                src={CITY_PAGE_PHOTOS.enquiry.src}
                alt={CITY_PAGE_PHOTOS.enquiry.alt}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                placeholder="blur"
                className={PHOTO}
              />
            </div>
          </div>
          <LeadForm
            defaultCity={city.name}
            heading={`Business registration enquiry, ${city.name}`}
            lead="We will respond with what applies to your specific business."
            className="rounded-lg border-0 shadow-[0_30px_70px_-40px_rgba(12,26,45,0.45),0_0_0_1px_rgba(18,38,64,0.08)]"
          />
        </div>
      </section>

      {/* City FAQs. */}
      <section aria-labelledby="faq-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              FAQs
            </p>
            <h2 id="faq-h" className={H2}>
              Business registration in {city.name}.
            </h2>
            <div className="relative mt-2 hidden aspect-[4/3] overflow-hidden rounded-lg bg-[#1b3350] lg:block">
              <Image
                src={CITY_PAGE_PHOTOS.faqs.src}
                alt={CITY_PAGE_PHOTOS.faqs.alt}
                fill
                sizes="360px"
                placeholder="blur"
                className={PHOTO}
              />
            </div>
            <p className="text-sm/[1.6]">
              More general questions are answered in the{" "}
              <Link href="/faqs/" className="font-bold text-[#1a7cb0] hover:text-[#122640] hover:underline">
                full FAQ library
              </Link>
              .
            </p>
          </div>
          <div className="flex min-w-0 flex-col border-t border-[#dde4ec]">
            {city.faqs.map((item) => (
              <details key={item.q} className="group border-b border-[#dde4ec]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-[4px] py-[1.375rem] transition-[padding,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-white hover:px-3.5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-semibold leading-[1.4] text-[#122640]">{item.q}</h3>
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

      {/* Other cities. */}
      <section aria-labelledby="oc-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-7`}>
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>
                <Dash />
                Across Gujarat
              </p>
              <h2 id="oc-h" className={H2}>
                Other cities we cover in Gujarat.
              </h2>
            </div>
            <TrackedLink
              href="/gujarat/"
              event="gujarat_page_click"
              params={{ label: `city_others_${city.slug}` }}
              className="inline-flex min-h-[2.75rem] items-center text-[0.9375rem] font-bold text-[#1a7cb0] hover:text-[#122640] hover:underline"
            >
              See full Gujarat coverage <span aria-hidden="true">&nbsp;→</span>
            </TrackedLink>
          </div>
          <ul className="grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(11.875rem,1fr))]">
            {others.map((c) => {
              const photo = CITY_CARD_PHOTOS[c.slug];
              return (
                <li key={c.slug} className="flex">
                  <TrackedLink
                    href={`/${c.slug}/`}
                    event="city_page_click"
                    params={{ city: c.name, label: `city_others_${city.slug}` }}
                    className="group flex flex-1 overflow-hidden rounded-md border border-[#e3e9ef] bg-white transition-colors hover:border-[#329fd2] hover:bg-[#f4f9fc]"
                  >
                    {photo ? (
                      <span className="relative w-10 flex-none overflow-hidden bg-[#e8f5fb] sm:w-14">
                        <Image
                          src={photo.src}
                          alt=""
                          fill
                          sizes={`${coverWidth(photo.src, 88, 56)}px`}
                          placeholder="blur"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                    ) : null}
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px] px-3 py-3.5 sm:px-4">
                      <span className="text-sm font-bold text-[#122640] [overflow-wrap:anywhere] sm:text-[0.9375rem]">
                        {c.name}
                      </span>
                      <span className="text-xs text-[#5b6778]">
                        {c.district === c.name ? "Gujarat" : `${c.district} district`}
                      </span>
                    </span>
                  </TrackedLink>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Closing CTA. */}
      <section aria-labelledby="cta-h" className="px-5 pb-16 sm:px-8 md:pb-24">
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-lg bg-[#0c1a2d] text-white">
          {place ? (
            <>
              <Image
                src={place.cta}
                alt=""
                fill
                sizes={`(min-width: 1240px) 1240px, (min-width: 640px) 100vw, ${coverWidth(place.cta, 420, 375)}px`}
                placeholder="blur"
                className={PHOTO}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,26,45,.95)_0%,rgba(12,26,45,.82)_55%,rgba(12,26,45,.4)_100%)]"
              />
            </>
          ) : null}
          <div className="relative flex max-w-[40rem] flex-col gap-4 px-7 py-10 sm:px-14 sm:py-[4.5rem]">
            <h2
              id="cta-h"
              className="text-balance text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.625rem]"
            >
              Start your business in {city.name}.
            </h2>
            <p className="text-base/[1.7] text-[#d5e0ea]">
              We will confirm the structure, the documents and the cost before anything is filed.
            </p>
            <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/contact/"
                event="primary_cta_click"
                params={{ label: `city_footer_cta_${city.slug}` }}
                className={BTN_LIGHT}
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={whatsapp}
                external
                event="whatsapp_click"
                params={{ label: `city_footer_cta_${city.slug}` }}
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
                params={{ label: `city_footer_cta_${city.slug}` }}
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
