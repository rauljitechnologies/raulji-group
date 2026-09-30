import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CircleCheck,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  TriangleAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { resolvePhoto } from "@/components/ui/service-hero-image";
import { VersusComparison } from "@/components/pages/service-visuals";
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
  FaqList,
  GuideCards,
  H2,
  H2_DARK,
  SECTION,
  SectionHead,
} from "@/components/pages/service-kit";
import { PageFx } from "@/components/shared/page-fx";
import { DocChecklist, ProcessTabs } from "@/components/shared/registration-interactive";
import type { ComparisonRow } from "@/lib/comparison";
import { CITY_SERVICES, CITY_SERVICE_SLUGS } from "@/lib/city-services";
import { getCity } from "@/lib/cities";
import type { ImageSlot } from "@/lib/images";
import { SERVICES, STEP_ACTOR, getService, type RegistrationService } from "@/lib/services";
import { STRUCTURE_META } from "@/lib/structure-meta";
import {
  AUTHORITY_DISCLAIMER,
  SITE,
  TIMELINE_DISCLAIMER,
  mailHref,
  telHref,
  whatsappHref,
} from "@/lib/site";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, type Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";
import benefitsPhoto from "@/public/photos/registration/benefits.webp";
import enquiryPhoto from "@/public/photos/registration/enquiry.webp";
import processPhoto from "@/public/photos/services-hub/registration.webp";
import ctaPhoto from "@/public/photos/services-hub/consulting.webp";
import { H1 } from "@/lib/typography";

/**
 * Registration service page: Private Limited, LLP, Partnership, Proprietorship.
 *
 * Laid out to the "Raulji Private Limited" design (claude.ai/design), applied
 * to all four structures at the owner's request on 2026-10-01, photographs and
 * motion included. The design's own sections come in its order; the sections
 * the brief requires and the design did not draw (quick answer, cost
 * breakdown, timeline split, next steps, mistakes, comparison, guides) are
 * kept and restyled to match, at the owner's request the same day.
 *
 * Every sentence comes from that structure's entry in lib/services.ts, not
 * from the design's copy of it, so no two pages carry the same text and the
 * reviewed wording stands. Two things the design drew for Private Limited
 * only are generalised here: the liability-shield figure, which for a firm
 * and a proprietorship shows no shield because there is none, and the
 * package card, which for the two structures without a published fee shows a
 * quote prompt instead of a price. The design's per-step day ranges are left
 * out: only the overall estimate is published (master rule 13).
 *
 * Rules applied throughout: no outcome guarantees, no invented figures, prices
 * only where already published, and the authority's role kept visibly separate
 * from ours (brief section 2, master rule 13).
 */

/** How each structure is named inside a question heading. */
const NOUN: Record<string, string> = {
  "pvt-registration": "a Private Limited Company",
  "llp-registration": "an LLP",
  "partnership-registration": "a Partnership Firm",
  "proprietorship-registration": "a Sole Proprietorship",
};

/** Comparison table column per structure, in lib/comparison.ts. */
const COMPARISON_KEY: Record<string, keyof Omit<ComparisonRow, "feature">> = {
  "pvt-registration": "pvt",
  "llp-registration": "llp",
  "partnership-registration": "partnership",
  "proprietorship-registration": "proprietorship",
};

/** The drawn panel for each structure, for the comparison header. */
const PANEL: Record<string, ImageSlot> = {
  "pvt-registration": "pvtStructure",
  "llp-registration": "llpStructure",
  "partnership-registration": "partnershipStructure",
  "proprietorship-registration": "proprietorshipStructure",
};

/** Where the annual compliance that follows registration is covered, where we offer it. */
const COMPLIANCE_PAGE: Record<string, { href: string; label: string }> = {
  "pvt-registration": { href: "/services/pvt-compliance/", label: "Private Limited annual compliance" },
  "llp-registration": { href: "/services/llp-compliance/", label: "LLP annual compliance" },
};

/**
 * "How it is structured": the figure and the two lines beside it, per
 * structure. The liability facts are the ones in lib/comparison.ts.
 */
const STRUCTURE_VIEW: Record<
  string,
  {
    intro: string;
    tagline: string;
    owners: string;
    count: number;
    shield: boolean;
    entity: string;
    identity: string;
    liability: string;
  }
> = {
  "pvt-registration": {
    intro:
      "Registering a Private Limited settles three things at once: who owns the business, who is responsible for running it, and how far personal liability reaches if something goes wrong. Eligibility, documents and annual compliance all follow from that.",
    tagline: "Directors run it. Shareholders own it. The two can be the same people.",
    owners: "SHAREHOLDERS",
    count: 4,
    shield: true,
    entity: "Private Limited Company",
    identity: "Separate legal entity",
    liability: "Liability limited to unpaid share capital",
  },
  "llp-registration": {
    intro:
      "Registering an LLP settles who the partners are, which of them are designated partners answerable for its filings, and how far personal liability reaches. Eligibility, documents and annual compliance all follow from that.",
    tagline: "Partners own and run it. Designated partners answer for its compliance.",
    owners: "PARTNERS",
    count: 3,
    shield: true,
    entity: "Limited Liability Partnership",
    identity: "Separate legal entity",
    liability: "Liability limited to the agreed contribution",
  },
  "partnership-registration": {
    intro:
      "A partnership firm is its partners, working together under a deed. The deed settles who contributes what, who shares the profit and who decides, but nothing separates the business from the people behind it.",
    tagline: "The partners own and run it, and carry its debts personally.",
    owners: "PARTNERS",
    count: 3,
    shield: false,
    entity: "Partnership Firm",
    identity: "Not a separate legal entity",
    liability: "Partners’ liability is unlimited and joint",
  },
  "proprietorship-registration": {
    intro:
      "A proprietorship is one person trading under a business name. Nothing separates the business from its owner, so registering one is about the tax and trade registrations the activity needs, not about creating an entity.",
    tagline: "One owner, one legal person, no separation between the two.",
    owners: "PROPRIETOR",
    count: 1,
    shield: false,
    entity: "Sole Proprietorship",
    identity: "The same legal person as the owner",
    liability: "The owner’s liability is unlimited",
  },
};

/** Benefit card icons, in the order each structure lists its benefits. */
const BENEFIT_ICONS: LucideIcon[] = [Building2, ShieldCheck, RefreshCw, TrendingUp, BadgeCheck, Users];

/** Design photographs, used until a structure's own photograph for that scene exists. */
const PHOTOS: Record<"benefits" | "process" | "enquiry" | "cta", { src: StaticImageData; alt: string }> = {
  benefits: { src: benefitsPhoto, alt: "A group seated around a long boardroom table with laptops" },
  process: { src: processPhoto, alt: "Two professionals talking over a laptop" },
  enquiry: { src: enquiryPhoto, alt: "Two people shaking hands across a desk" },
  cta: { src: ctaPhoto, alt: "A presenter speaking to a group seated around a boardroom table" },
};

/** Slow zoom on hover, as in the design. The parent carries `group`. */
const ZOOM = "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]";
const CARD_LIFT =
  "transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-[#329fd2] hover:shadow-[0_24px_48px_-26px_rgba(18,38,64,0.4)]";
const CHECK = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#329fd2"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="mt-0.5 flex-none"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export function RegistrationServicePage({ service }: { service: RegistrationService }) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: service.name, path: service.path },
  ];

  const noun = NOUN[service.slug] ?? service.shortName;
  const meta = STRUCTURE_META[service.slug];
  const view = STRUCTURE_VIEW[service.slug];
  const compliance = COMPLIANCE_PAGE[service.slug];
  const trackParams = { registration_type: service.shortName };
  const rootId = `svc-${service.slug}`;

  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const other = getService(service.compareWith);
  const ownKey = COMPARISON_KEY[service.slug];
  const otherKey = other ? COMPARISON_KEY[other.slug] : undefined;

  // A structure's own photograph for a scene, once supplied, replaces the design's.
  const benefitsOwn = resolvePhoto(service.slug, "benefits");

  /**
   * City pages that exist for this structure. Derived from the data so it can
   * never link to a page that does not exist.
   */
  const localPages = CITY_SERVICES.filter((entry) => entry.service === service.slug)
    .map((entry) => {
      const city = getCity(entry.city);
      if (!city) return null;
      return { path: `/${entry.city}/${CITY_SERVICE_SLUGS[entry.service]}/`, name: city.name };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const glance: [string, string][] = [
    ["Governing law", service.law],
    ["Registered with", service.authority],
    ["Owners", meta?.owners ?? ""],
    ["Owner liability", meta?.liability ?? ""],
    ["Typical timeline", service.timelineEstimate],
    [
      "Professional fee",
      service.pricing
        ? `${service.pricing.amount}, plus government fees and stamp duty`
        : "Quoted after we understand your business",
    ],
  ];

  return (
    <div id={rootId} className="bg-white text-[#3a4656]">
      <JsonLd
        data={graph(serviceSchema(service), breadcrumbSchema(crumbs), faqSchema(service.faqs))}
      />
      <PageFx rootId={rootId} />
      <div
        data-progress
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#1a7cb0,#329fd2)]"
      />

      {/* 1. Hero, with the package card. */}
      <section
        aria-labelledby="service-h1"
        className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24"
      >
        <div
          data-orb="1"
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[38.75rem] w-[38.75rem] rounded-full bg-[radial-gradient(circle,rgba(50,159,210,0.32),rgba(50,159,210,0)_65%)]"
        />
        <div
          data-orb="2"
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-52 -left-44 h-[26.25rem] w-[26.25rem] rounded-full bg-[radial-gradient(circle,rgba(26,124,176,0.28),rgba(26,124,176,0)_65%)]"
        />
        <div
          data-dots
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(50,159,210,0.22)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,transparent_30%,#000_100%)]"
        />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 md:gap-12 md:pb-24 md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div data-hero-copy className="flex min-w-0 flex-col gap-5">
              <p className={EYEBROW_DARK}>
                <Dash />
                {service.eyebrow}
              </p>
              <h1
                id="service-h1"
                className={`${H1} text-white`}
              >
                {service.h1} <span className="text-[#7cc8ec]">in India</span>
              </h1>
              <p className="max-w-[36rem] text-pretty text-base leading-[1.75] text-[#c9d6e3] sm:text-lg/[1.75]">
                {service.heroSub}
              </p>
              <div className="max-w-[36rem] rounded-r-md border-l-2 border-[#329fd2] bg-white/[0.04] px-[1.125rem] py-4">
                <p className="text-sm leading-[1.65] text-[#d5e0ea]">
                  <strong className="text-white">What it is.</strong> {service.definition}
                </p>
              </div>
              <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <TrackedLink
                  href="#enquiry"
                  event="primary_cta_click"
                  params={{ label: "service_hero", ...trackParams }}
                  className={`${BTN_LIGHT} hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]`}
                >
                  Start Your Business
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href={telHref}
                  event="phone_click"
                  params={{ label: "service_hero", ...trackParams }}
                  className={`${BTN_GHOST_DARK} hover:-translate-y-0.5`}
                >
                  Call {SITE.phone.display}
                </TrackedLink>
                <TrackedLink
                  href={whatsappHref(`Hello Raulji Group, I would like to know more about ${service.name}.`)}
                  external
                  event="whatsapp_click"
                  params={{ label: "service_hero", ...trackParams }}
                  className="inline-flex min-h-[3.25rem] items-center px-2 text-[0.9375rem] font-semibold text-white hover:text-[#7cc8ec] hover:underline"
                >
                  WhatsApp
                </TrackedLink>
              </div>
              <p className="max-w-[36rem] text-[0.8125rem] leading-[1.6] text-[#9fb3c8]">
                <strong className="text-white">Typical timeline:</strong> {service.timelineEstimate.charAt(0).toLowerCase()}
                {service.timelineEstimate.slice(1)}. {TIMELINE_DISCLAIMER}
              </p>
            </div>

            <aside
              data-hero-index
              aria-labelledby="pk-h"
              className="min-w-0 overflow-hidden rounded-lg bg-white text-[#3a4656] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]"
            >
              <div className="flex flex-col gap-2 border-b border-[#eef2f6] px-7 pb-[1.375rem] pt-[1.625rem]">
                <p id="pk-h" className="text-xs font-bold tracking-[0.1em] text-[#1a7cb0]">
                  {service.shortName.toUpperCase()} PACKAGE
                </p>
                {service.pricing ? (
                  <>
                    <p className="flex items-baseline gap-2.5">
                      <span className="text-5xl font-extrabold leading-none tracking-[-0.03em] text-[#122640]">
                        {service.pricing.amount}
                      </span>
                      <span className="text-[0.8125rem] text-[#5b6778]">one-time professional fee</span>
                    </p>
                    <p className="text-[0.8125rem] leading-[1.55] text-[#5b6778]">
                      {service.pricing.note.replace(/^One-time professional fee\.\s*/, "")}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[1.75rem] font-extrabold leading-tight tracking-[-0.02em] text-[#122640]">
                      Quoted for your business
                    </p>
                    <p className="text-[0.8125rem] leading-[1.55] text-[#5b6778]">
                      The registrations a {service.shortName.toLowerCase()} needs depend on its activity,
                      so we confirm the professional fee and the expected government charges in
                      writing before anything is filed.
                    </p>
                  </>
                )}
              </div>
              <ul className="flex flex-col gap-[0.6875rem] px-7 py-5">
                {(service.pricing?.includes ?? service.whatWeHandle).map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm font-medium leading-[1.45] text-[#122640]">
                    {CHECK}
                    {item}
                  </li>
                ))}
              </ul>
              <div className="px-7 pb-7">
                <TrackedLink
                  href="#enquiry"
                  event="primary_cta_click"
                  params={{ label: "service_package", ...trackParams }}
                  className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0] hover:shadow-[0_10px_22px_-10px_rgba(26,124,176,0.6)]"
                >
                  {service.pricing ? "Get started" : "Ask for a quote"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 2. Quick answer and the facts at a glance (brief sections 17, 19, 20). */}
      <section aria-labelledby="what-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16`}>
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW}>
              <Dash />
              Quick answer
            </p>
            <h2 id="what-h" className={H2}>
              What is {noun}?
            </h2>
            <p className="text-[1.0625rem] leading-[1.8] text-[#26354a]">{service.quickAnswer}</p>
            <div className="mt-2 rounded-lg border-l-4 border-[#329fd2] bg-[#f4f9fc] p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#122640]">Key takeaways</h3>
              <ul className="mt-4 space-y-3">
                {service.takeaways.map((item) => (
                  <li key={item} className="flex gap-3 leading-[1.6]">
                    <CircleCheck className="mt-0.5 h-5 w-5 flex-none text-[#1a7cb0]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside aria-labelledby="glance-h" className={`${CARD} h-fit p-7`}>
            <h3 id="glance-h" className="text-sm font-bold uppercase tracking-[0.1em] text-[#122640]">
              {service.shortName} at a glance
            </h3>
            <dl className="mt-5 divide-y divide-[#eef2f6]">
              {glance.map(([term, value]) => (
                <div key={term} className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-sm text-[#5b6778]">{term}</dt>
                  <dd className="text-[0.9375rem] font-semibold leading-[1.5] text-[#122640]">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-[1.6] text-[#5b6778]">{TIMELINE_DISCLAIMER}</p>
          </aside>
        </div>
      </section>

      {/* 3. How it is structured. */}
      {view ? (
        <section aria-labelledby="st-h" className={`bg-[#f4f7fa] ${SECTION}`}>
          <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
            <div className="flex min-w-0 flex-col gap-[1.125rem]">
              <p className={EYEBROW}>
                <Dash />
                How it is structured
              </p>
              <h2 id="st-h" className={H2}>
                Who owns it, who runs it, and who carries the risk.
              </h2>
              <p className="text-base leading-[1.75]">{view.intro}</p>
              <p className="border-t border-[#dde4ec] pt-4 text-[1.0625rem] font-bold text-[#122640]">
                {view.tagline}
              </p>
            </div>
            <figure
              role="img"
              aria-label={`Diagram: ${view.owners.toLowerCase()} above ${
                view.shield ? "a liability shield" : "no liability shield"
              }; the ${view.entity} below. ${view.identity}. ${view.liability}.`}
              className="m-0 flex min-w-0 flex-col gap-3.5 rounded-lg bg-white p-6 sm:p-10"
            >
              <p className="text-center text-[0.6875rem] font-bold tracking-[0.14em] text-[#5b6778]">
                {view.owners}
              </p>
              <div className="flex justify-center gap-3 sm:gap-[1.125rem]">
                {Array.from({ length: view.count }, (_, k) => (
                  <span
                    key={k}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-[#cfd9e3] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#329fd2] sm:h-[3.75rem] sm:w-[3.75rem]"
                  >
                    <Users className="h-[1.375rem] w-[1.375rem] text-[#122640]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                ))}
              </div>
              <div aria-hidden="true" className="flex h-[22px] justify-center gap-10 sm:gap-[4.375rem]">
                {Array.from({ length: Math.min(view.count, 3) }, (_, k) => (
                  <span key={k} className="w-[1.5px] bg-[#cfd9e3]" />
                ))}
              </div>
              {view.shield ? (
                <div className="rounded-md bg-[linear-gradient(90deg,#329fd2,#1a7cb0)] p-3 text-center text-xs font-extrabold tracking-[0.16em] text-white shadow-[0_12px_24px_-14px_rgba(26,124,176,0.8)]">
                  LIABILITY SHIELD
                </div>
              ) : (
                <div className="rounded-md border-[1.5px] border-dashed border-[#cfd9e3] p-3 text-center text-xs font-extrabold tracking-[0.16em] text-[#8795a6]">
                  NO LIABILITY SHIELD
                </div>
              )}
              <div className="mt-1.5 flex flex-col gap-1.5 rounded-md bg-[#122640] p-6 text-center text-white">
                <p className="text-xl font-extrabold">{view.entity}</p>
                <p className="text-sm font-semibold text-[#7cc8ec]">{view.identity}</p>
                <p className="text-[0.8125rem] text-[#c9d6e3]">{view.liability}</p>
              </div>
            </figure>
          </div>
        </section>
      ) : null}

      {/* 4. Who it suits, and where it does not. */}
      <section aria-labelledby="fit-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="Is it right for you?"
            id="fit-h"
            title={`Who should choose ${service.shortName}, and where it may not fit.`}
            lead="Worth weighing before you commit, because changing structure later is not free."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <article data-spot="light" className={`${CARD} flex flex-col gap-5 p-7 sm:p-9`}>
              <p className="flex items-center gap-3 text-lg font-bold text-[#122640]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f5fb]">
                  <CircleCheck className="h-[1.125rem] w-[1.125rem] text-[#1a7cb0]" aria-hidden="true" />
                </span>
                A good fit for
              </p>
              <ul className="flex flex-col gap-3.5">
                {service.suitableFor.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-[1.6]">
                    {CHECK}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article data-spot="light" className={`${CARD} flex flex-col gap-5 p-7 sm:p-9`}>
              <p className="flex items-center gap-3 text-lg font-bold text-[#122640]">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fdf3e7] text-base font-extrabold text-[#b36b12]"
                >
                  !
                </span>
                Where it may not fit
              </p>
              <ul className="flex flex-1 flex-col gap-3.5">
                {service.limitations.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-[1.6]">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#b36b12]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/compare/" className="self-start text-sm font-bold text-[#1a7cb0] hover:underline">
                Compare with the other structures <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Benefits, with a photograph tile. */}
      <section aria-labelledby="bn-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead eyebrow="Benefits" id="bn-h" title={`Why founders choose ${service.shortName}.`} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <li key={benefit.title} data-spot="light" className={`${CARD} ${CARD_LIFT} flex flex-col gap-3.5 p-7`}>
                  <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#122640]">
                    <Icon className="h-6 w-6 text-[#7cc8ec]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-[#122640]">{benefit.title}</h3>
                  <p className="text-[0.9375rem] leading-[1.7]">{benefit.body}</p>
                </li>
              );
            })}
            <li className="group relative min-h-[16rem] overflow-hidden rounded-lg bg-[#1b3350]">
              <Image
                src={benefitsOwn?.src ?? PHOTOS.benefits.src}
                alt={benefitsOwn?.alt ?? PHOTOS.benefits.alt}
                fill
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
                className={ZOOM}
              />
            </li>
          </ul>
        </div>
      </section>

      {/* 6. Eligibility and the document checklist (brief section 30). */}
      <section
        id="documents"
        aria-labelledby="el-h"
        className={`scroll-mt-24 bg-[#0c1a2d] text-white ${SECTION}`}
      >
        <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16`}>
          <div className="flex min-w-0 flex-col gap-6">
            <p className={EYEBROW_DARK}>
              <Dash />
              Eligibility
            </p>
            <h2 id="el-h" className={H2_DARK}>
              What you need to qualify.
            </h2>
            <ol className="flex flex-col">
              {service.eligibility.map((item, k) => (
                <li key={item} className="flex gap-4 border-t border-white/[0.12] py-4 text-[0.9375rem] leading-[1.65] text-[#d5e0ea]">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#329fd2]/20 text-xs font-bold text-[#7cc8ec]">
                    {k + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <p className="text-[0.8125rem] leading-[1.6] text-[#9fb3c8]">
              Requirements vary with the people involved and the premises. We confirm the exact
              list before anything is prepared.
            </p>
          </div>
          <DocChecklist docs={service.documents} structure={service.shortName} />
        </div>
      </section>

      {/* 7. Process, as tabs. */}
      <section id="process" aria-labelledby="pr-h" className={`scroll-mt-24 ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="The process"
            id="pr-h"
            title={`${service.shortName} registration, step by step.`}
            lead={`${service.process.length} stages, what happens at each, and who acts. Select a step to see the detail.`}
          />
          <ProcessTabs
            steps={service.process.map((s) => ({ ...s, actor: STEP_ACTOR[s.title] }))}
            media={
              <div className="group relative aspect-[16/7] overflow-hidden bg-[#1b3350]">
                <Image
                  src={PHOTOS.process.src}
                  alt={PHOTOS.process.alt}
                  fill
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  className={ZOOM}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent"
                />
              </div>
            }
          />
        </div>
      </section>

      {/* 8. Timeline, split into our part and the authority's (brief section 29). */}
      <section aria-labelledby="time-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
          <div className="flex flex-col gap-4">
            <p className={EYEBROW}>
              <Dash />
              Timeline
            </p>
            <h2 id="time-h" className={H2}>
              How long does registration take?
            </h2>
            <p className="text-lg font-semibold leading-[1.5] text-[#122640]">{service.timelineEstimate}.</p>
            <p className="text-sm leading-[1.7]">An estimate, not a commitment. {TIMELINE_DISCLAIMER}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div data-spot="light" className={`${CARD} p-6`}>
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-[#1a7cb0]">Our part</h3>
              <p className="mt-3 leading-[1.7]">{service.timeline.ours}</p>
            </div>
            <div data-spot="light" className={`${CARD} p-6`}>
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-[#5b6778]">
                The authority&rsquo;s part
              </h3>
              <p className="mt-3 leading-[1.7]">{service.timeline.authority}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. What we handle, what you provide, and the government process (brief section 5). */}
      <section aria-labelledby="hd-h" className={SECTION}>
        <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16`}>
          <div className="flex min-w-0 flex-col gap-6">
            <p className={EYEBROW}>
              <Dash />
              What we handle
            </p>
            <h2 id="hd-h" className={H2}>
              Every filing, from signature to certificate.
            </h2>
            <ul className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {service.whatWeHandle.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] font-medium leading-[1.55] text-[#122640]">
                  {CHECK}
                  {item}
                </li>
              ))}
            </ul>
            {service.customerProvides.length ? (
              <div className="mt-2 rounded-lg border border-[#e3e9ef] p-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#122640]">What you provide</h3>
                <ul className="mt-4 space-y-2.5">
                  {service.customerProvides.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] leading-[1.6]">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#329fd2]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <aside className="flex min-w-0 flex-col gap-4 rounded-lg bg-[#122640] p-7 text-[#c9d6e3] sm:p-9">
            <h3 className="text-xl font-bold text-white">How the government process works</h3>
            <p className="text-sm font-semibold text-[#7cc8ec]">{service.authority}</p>
            <p className="text-[0.9375rem] leading-[1.7]">{service.governmentProcess}</p>
            <p className="border-t border-white/[0.14] pt-4 text-[0.8125rem] leading-[1.6] text-[#9fb3c8]">
              {AUTHORITY_DISCLAIMER}
            </p>
          </aside>
        </div>
      </section>

      {/* 10. Cost (brief section 28, master rule 12). */}
      <section aria-labelledby="cost-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="Pricing"
            id="cost-h"
            title="What makes up the total."
            lead="Two kinds of money are involved: our professional fee, and the government and state charges we do not set. Nothing on this page is an all-inclusive price."
          />
          <div className={`${CARD} overflow-hidden`}>
            <dl className="divide-y divide-[#eef2f6]">
              {service.costs.map((line) => (
                <div key={line.item} className="grid gap-1 px-6 py-5 sm:grid-cols-[16rem_1fr] sm:gap-8 sm:px-8">
                  <dt>
                    <span className="block font-semibold text-[#122640]">{line.item}</span>
                    <span className="block text-xs text-[#5b6778]">Set by {line.setBy}</span>
                  </dt>
                  <dd className="text-[0.9375rem] leading-[1.6]">{line.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-[#e3e9ef] bg-[#f9fbfc] px-6 py-4 text-sm leading-[1.6] text-[#5b6778] sm:px-8">
              We confirm the full expected amount, split this way, in writing before any filing begins.
            </p>
          </div>
        </div>
      </section>

      {/* 11. After registration. */}
      <section aria-labelledby="after-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="Next steps"
            id="after-h"
            title="What happens after registration?"
            lead="Registration starts the obligations rather than ending them. These are the ones that follow for this structure."
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.afterRegistration.map((step, i) => (
              <li key={step.title} data-spot="light" className={`${CARD} ${CARD_LIFT} flex flex-col gap-3 p-6`}>
                <span className="text-xs font-bold tracking-[0.08em] text-[#1a7cb0]">STEP {i + 1}</span>
                <h3 className="text-[1.0625rem] font-bold leading-[1.35] text-[#122640]">{step.title}</h3>
                <p className="text-sm leading-[1.7]">{step.body}</p>
              </li>
            ))}
          </ol>
          {compliance ? (
            <Link
              href={compliance.href}
              className="inline-flex min-h-[2.75rem] items-center gap-1.5 self-start font-semibold text-[#1a7cb0] hover:underline"
            >
              See {compliance.label} support
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </section>

      {/* 12. Common mistakes and considerations. */}
      <section aria-labelledby="mist-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="Important considerations"
            id="mist-h"
            title="Common mistakes to avoid."
            lead={`The problems we see most often with ${noun}, and how to avoid each one.`}
          />
          <ul className="grid gap-5 md:grid-cols-2">
            {service.considerations.map((item) => (
              <li key={item.title} data-spot="light" className={`${CARD} flex gap-4 p-6`}>
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#fdf3e7]">
                  <TriangleAlert className="h-5 w-5 text-[#b36b12]" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-bold text-[#122640]">{item.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-[1.7]">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 13. Head-to-head comparison (brief section 27). No winner is declared. */}
      {other && ownKey && otherKey ? (
        <section aria-labelledby="cmp-h" className={SECTION}>
          <div className={`${CONTAINER} flex flex-col gap-8`}>
            <SectionHead
              eyebrow="Comparison"
              id="cmp-h"
              title={`${service.shortName} vs ${other.shortName}`}
              lead={service.compareNote}
            />
            <VersusComparison
              a={{ key: ownKey, name: service.shortName, panel: PANEL[service.slug] }}
              b={{ key: otherKey, name: other.shortName, panel: PANEL[other.slug] }}
            />
          </div>
        </section>
      ) : null}

      {/* 14. Enquiry (brief sections 32 and 33). */}
      <section
        id="enquiry"
        aria-labelledby="eq-h"
        className={`scroll-mt-24 bg-[#f4f7fa] ${SECTION}`}
      >
        <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16`}>
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW}>
              <Dash />
              Talk to us
            </p>
            <h2 id="eq-h" className={H2}>
              Talk to us about {service.shortName}.
            </h2>
            <p className="text-base leading-[1.7]">
              Send your details and we will come back to you on what your business actually needs,
              what it will cost, and how long it is likely to take.
            </p>
            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[5rem_1fr]">
              <dt className="font-semibold text-[#122640]">Phone</dt>
              <dd>
                <TrackedLink
                  href={telHref}
                  event="phone_click"
                  params={{ label: "service_enquiry", ...trackParams }}
                  className="font-semibold text-[#1a7cb0] hover:underline"
                >
                  {SITE.phone.display}
                </TrackedLink>
              </dd>
              <dt className="font-semibold text-[#122640]">Email</dt>
              <dd>
                <TrackedLink
                  href={mailHref}
                  event="email_click"
                  params={{ label: "service_enquiry", ...trackParams }}
                  className="font-semibold text-[#1a7cb0] hover:underline"
                >
                  {SITE.email}
                </TrackedLink>
              </dd>
              <dt className="font-semibold text-[#122640]">Hours</dt>
              <dd>{SITE.hours.display}</dd>
            </dl>
            <div className="group relative mt-2 aspect-[16/10] overflow-hidden rounded-lg bg-[#1b3350]">
              <Image
                src={PHOTOS.enquiry.src}
                alt={PHOTOS.enquiry.alt}
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                className={ZOOM}
              />
            </div>
          </div>
          <div className="rounded-lg bg-white shadow-[0_30px_60px_-36px_rgba(18,38,64,0.45)]">
            <LeadForm
              defaultRegistrationType={service.shortName}
              heading={`${service.name} enquiry`}
              lead="We will get back to you with what applies to your business specifically."
              className="rounded-lg border-0"
            />
          </div>
        </div>
      </section>

      {/* 15. FAQs. Same array feeds the FAQPage schema above. */}
      <section aria-labelledby="faq-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              FAQs
            </p>
            <h2 id="faq-h" className={H2}>
              {service.shortName} questions, answered.
            </h2>
            <Link href="/faqs/" className="self-start text-[0.9375rem] font-semibold text-[#1a7cb0] hover:underline">
              All FAQs <span aria-hidden="true">→</span>
            </Link>
          </div>
          <FaqList faqs={service.faqs} />
        </div>
      </section>

      {/* 16. By location, and the other structures (brief sections 34 and 35). */}
      <section aria-labelledby="ct-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-16`}>
          {localPages.length ? (
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div className="flex flex-col gap-3.5">
                <p className={EYEBROW}>
                  <Dash />
                  By location
                </p>
                <h2 id="ct-h" className="text-balance text-2xl font-bold leading-[1.2] text-[#122640] sm:text-[2rem]">
                  {service.shortName} registration in your city.
                </h2>
                <p className="leading-[1.7]">
                  Not listed?{" "}
                  <TrackedLink
                    href="/gujarat/"
                    event="gujarat_page_click"
                    params={{ label: "service_local", ...trackParams }}
                    className="font-semibold text-[#1a7cb0] hover:underline"
                  >
                    We work across Gujarat
                  </TrackedLink>
                  , and the process is the same wherever you are.
                </p>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {localPages.map((page) => (
                  <li key={page.path} className="flex">
                    <TrackedLink
                      href={page.path}
                      event="city_page_click"
                      params={{ city: page.name, label: "service_local", ...trackParams }}
                      className="flex min-h-[3.5rem] flex-1 items-center justify-between gap-3 rounded-md border border-[#e3e9ef] bg-white px-5 transition duration-200 hover:translate-x-1 hover:border-[#122640]"
                    >
                      <span className="flex flex-col">
                        <span className="font-bold text-[#122640]">{page.name}</span>
                        <span className="text-xs text-[#5b6778]">{page.name} district</span>
                      </span>
                      <span aria-hidden="true" className="text-[#1a7cb0]">
                        →
                      </span>
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2 id="ct-h" className="sr-only">
              Other structures
            </h2>
          )}

          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-[#122640] sm:text-[1.75rem]">Considering other structures?</h2>
                <p className="leading-[1.7]">
                  If this one does not look like the right fit, these are the alternatives. For a
                  decision that is still open, start with{" "}
                  <Link href="/services/business-consulting/" className="font-semibold text-[#1a7cb0] hover:underline">
                    business consulting
                  </Link>
                  .
                </p>
              </div>
              <Link href="/compare/" className="text-[0.9375rem] font-semibold text-[#1a7cb0] hover:underline">
                Compare all four side by side <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="grid gap-5 md:grid-cols-3">
              {others.map((item) => {
                const m = STRUCTURE_META[item.slug];
                const Icon = m?.icon;
                return (
                  <li key={item.slug} className="flex">
                    <TrackedLink
                      href={item.path}
                      event="service_card_click"
                      params={{ label: "service_related", registration_type: item.shortName }}
                      className={`flex flex-1 flex-col gap-3 p-7 ${CARD} ${CARD_LIFT}`}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f5fb]">
                        {Icon ? <Icon className="h-6 w-6 text-[#122640]" strokeWidth={1.6} aria-hidden="true" /> : null}
                      </span>
                      <span className="text-lg font-bold text-[#122640]">{item.shortName}</span>
                      <span className="flex-1 text-sm leading-[1.6]">{m?.body ?? item.cardBlurb}</span>
                      <span className="text-sm font-bold text-[#1a7cb0]">
                        Explore {item.shortName} Registration <span aria-hidden="true">→</span>
                      </span>
                    </TrackedLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 17. Guides (brief section 37). */}
      <section aria-labelledby="gd-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="Related guides"
            id="gd-h"
            title="Read before you decide."
            lead="Longer guides on the same decision, written for someone choosing rather than buying."
          />
          <GuideCards slugs={service.guides} />
        </div>
      </section>

      {/* 18. Closing CTA. */}
      <section aria-labelledby="cta-h" className="px-5 pb-14 sm:px-8 md:pb-24">
        <div
          data-spot="dark"
          className="mx-auto flex max-w-[1176px] flex-wrap items-stretch overflow-hidden rounded-lg bg-[#122640] text-white"
        >
          <figure className="group relative m-0 min-h-[260px] flex-[1_1_20rem] bg-[#1b3350]">
            <Image
              src={PHOTOS.cta.src}
              alt={PHOTOS.cta.alt}
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className={ZOOM}
            />
          </figure>
          <div className="flex min-w-0 flex-[1.6_1_28rem] flex-col justify-center gap-6 p-8 sm:p-14">
            <div className="flex flex-col gap-3.5">
              <h2 id="cta-h" className={H2_DARK}>
                Start your {service.shortName} registration.
              </h2>
              <p className="max-w-[35rem] text-base leading-[1.7] text-[#d5e0ea]">
                Tell us about the business and we will confirm the structure, the documents and the
                cost before anything is filed.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="#enquiry"
                event="primary_cta_click"
                params={{ label: "service_footer", ...trackParams }}
                className={cn(BTN_LIGHT, "hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]")}
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={whatsappHref(`Hello Raulji Group, I would like to talk about ${service.shortName}.`)}
                external
                event="whatsapp_click"
                params={{ label: "service_footer", ...trackParams }}
                className={cn(BTN_GHOST_DARK, "hover:-translate-y-0.5")}
              >
                Talk to an Expert
              </TrackedLink>
            </div>
            <p className="text-sm text-[#c9d6e3]">
              Or call{" "}
              <TrackedLink
                href={telHref}
                event="phone_click"
                params={{ label: "service_footer", ...trackParams }}
                className="font-semibold text-white hover:underline"
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
