import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Compass,
  FileCheck,
  Megaphone,
  MonitorSmartphone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import {
  BTN_GHOST_DARK,
  BTN_LIGHT,
  CARD,
  CONTAINER,
  Dash,
  EYEBROW_DARK,
  FaqList,
  H2,
  H2_DARK,
  SECTION,
  SectionHead,
} from "@/components/pages/service-kit";
import { PageFx } from "@/components/shared/page-fx";
import { StagePicker, SupportingFilter, type Stage } from "@/components/shared/services-tools";
import { SECONDARY_SERVICES } from "@/lib/secondary-services";
import { SERVICES, type FAQ } from "@/lib/services";
import { HUB_PHOTOS, type HubPhoto } from "@/lib/services-hub-photos";
import { STRUCTURE_META } from "@/lib/structure-meta";
import { SITE, whatsappHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { abs, breadcrumbSchema, faqSchema, graph, ORG_ID, type Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { H1 } from "@/lib/typography";

/**
 * Services hub (service-page brief, section 48).
 *
 * Its job is routing, not selling: name each service, say who it is for in a
 * sentence, and link on. Detail lives on the service pages, and repeating it
 * here would put two of our own pages in front of the same query.
 *
 * Order follows master rule 39: consulting, then registration and its four
 * structures, then the supporting services, then the technology brand, which is
 * introduced and linked out rather than catalogued (master rule 14).
 *
 * A full clone of the "Raulji Services" design (claude.ai/design), photographs
 * and motion included, at the owner's request on 2026-10-01. The header,
 * footer and mobile bar are the site-wide ones. The photographs are the
 * design's Unsplash picks, self-hosted; see lib/services-hub-photos.ts.
 */

const PATH = "/services/";
const ROOT_ID = "services-hub";

export const metadata = pageMeta({
  title: "Our Services | Business Consulting & Registration | Raulji Group",
  description:
    "Business consulting, business registration and the compliance support that follows, from Raulji Group in Vadodara. Working across Gujarat and India.",
  path: PATH,
  ogHeadline: "Our Services",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: PATH },
];

/** The hero's "On this page" index. */
const AREAS: { name: string; tag: string; href: string; icon: LucideIcon }[] = [
  { name: "Business Consulting", tag: "Primary focus", href: "#core", icon: Compass },
  { name: "Business Registration", tag: "Four structures", href: "#structures", icon: FileCheck },
  { name: "Compliance", tag: "After registration", href: "#after", icon: CalendarCheck },
  { name: "Insurance Advisory", tag: "Cover and claims", href: "#after", icon: ShieldCheck },
  { name: "Technology", tag: "Raulji Technologies", href: "#tech", icon: MonitorSmartphone },
];

const CORE: {
  label: string;
  title: string;
  body: string;
  items: string[];
  href: string;
  cta: string;
  icon: LucideIcon;
  photo: HubPhoto;
  dark: boolean;
}[] = [
  {
    label: "PRIMARY FOCUS",
    title: "Business Consulting",
    body: "Advisory work on the decisions that come before paperwork: which structure fits, what has to be in place before you start, what changes if the business grows, and whether the existing setup still matches how the business actually operates.",
    items: [
      "Business structure and restructuring",
      "Business planning",
      "Growth and expansion planning",
      "Operational and process guidance",
    ],
    href: "/services/business-consulting/",
    cta: "Explore Business Consulting",
    icon: Compass,
    photo: "consulting",
    dark: true,
  },
  {
    label: "MAIN SERVICE",
    title: "Business Registration",
    body: "Registration and filing support for the four Indian business structures. We handle digital signatures, name approval, drafting and the statutory filings, including any Registrar query along the way.",
    items: ["Private Limited Company", "Limited Liability Partnership", "Partnership Firm", "Proprietorship"],
    href: "/services/business-registration/",
    cta: "Explore Business Registration",
    icon: FileCheck,
    photo: "registration",
    dark: false,
  },
];

/** Card copy, icon and photograph per supporting service, written for the card rather than cut from the page intro. */
const SUPPORTING: Record<string, { body: string; icon: LucideIcon; photo: HubPhoto }> = {
  "pvt-compliance": {
    body: "A Private Limited Company carries statutory obligations from the day it is incorporated, whether or not it has traded.",
    icon: CalendarCheck,
    photo: "pvtCompliance",
  },
  "llp-compliance": {
    body: "An LLP must file with the Registrar of Companies every year, including in a year with no business activity.",
    icon: CalendarCheck,
    photo: "llpCompliance",
  },
  insurance: {
    body: "Advisory on the cover a business carries, which matters most where liability is not capped, and support when a claim has to be made.",
    icon: ShieldCheck,
    photo: "insurance",
  },
  it: {
    body: "Technology work delivered through our separate technology brand, Raulji Technologies.",
    icon: MonitorSmartphone,
    photo: "it",
  },
  digital: {
    body: "Marketing and brand work delivered through Raulji Technologies.",
    icon: Megaphone,
    photo: "digital",
  },
};

const SUPPORTING_ORDER = ["pvt-compliance", "llp-compliance", "insurance", "it", "digital"];

const STAGES: Stage[] = [
  {
    label: "Starting out",
    sub: "No business registered yet",
    services: [
      { name: "Business Consulting", why: "Settle the structure before anything is filed.", href: "/services/business-consulting/" },
      { name: "Business Registration", why: "Register the structure you chose, end to end.", href: "/services/business-registration/" },
    ],
  },
  {
    label: "Just registered",
    sub: "Entity exists, obligations begin",
    services: [
      { name: "Private Limited Company Compliance", why: "Statutory obligations start on incorporation day.", href: "/services/pvt-compliance/" },
      { name: "LLP Compliance", why: "Annual filings, even in a year without trading.", href: "/services/llp-compliance/" },
      { name: "Insurance Services", why: "Cover matters most where liability is not capped.", href: "/services/insurance/" },
    ],
  },
  {
    label: "Growing",
    sub: "Expanding, hiring or raising",
    services: [
      { name: "Business Consulting", why: "Growth and expansion planning, and whether the setup still fits.", href: "/services/business-consulting/" },
      { name: "IT & Digital Solutions", why: "Systems that scale, via Raulji Technologies.", href: "/services/it/" },
      { name: "Digital Marketing", why: "Brand and marketing work, via Raulji Technologies.", href: "/services/digital/" },
    ],
  },
  {
    label: "Restructuring",
    sub: "Setup no longer fits the business",
    services: [
      { name: "Business Consulting", why: "Structure and restructuring advice.", href: "/services/business-consulting/" },
      { name: "Compare Business Structures", why: "See where your current structure sits against the others.", href: "/compare/" },
    ],
  },
];

const FAQS: FAQ[] = [
  {
    q: "Which Raulji Group service should I start with?",
    a: "If you have not registered yet, start with a consultation. Most businesses need structure advice before registration, and the conversation usually shows which of the other services, if any, are relevant.",
  },
  {
    q: "Do you only register businesses?",
    a: "No. Business consulting is the group’s primary focus. Registration is the main commercial service, and compliance, insurance advisory and technology work support businesses after they exist.",
  },
  {
    q: "Does a registered business have ongoing obligations?",
    a: "Yes. A Private Limited Company carries statutory obligations from the day it is incorporated, and an LLP files every year, even in a year with no business activity.",
  },
  {
    q: "Who delivers technology and digital marketing work?",
    a: "Raulji Technologies, the group’s separate technology brand. Its full service catalogue lives on its own website.",
  },
];

/** Slow zoom on hover, as in the design. The parent carries `group`. */
const ZOOM = "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]";

/** A design photograph filling a fixed-ratio box, so nothing shifts as it loads. */
function Photo({
  photo,
  sizes,
  className,
  decorative = false,
}: {
  photo: HubPhoto;
  sizes: string;
  className?: string;
  decorative?: boolean;
}) {
  const p = HUB_PHOTOS[photo];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image src={p.src} alt={decorative ? "" : p.alt} fill sizes={sizes} placeholder="blur" className={ZOOM} />
    </div>
  );
}

const CARD_LIFT =
  "transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-[#329fd2] hover:shadow-[0_24px_48px_-26px_rgba(18,38,64,0.4)]";

export default function ServicesPage() {
  const supporting = SUPPORTING_ORDER.map((slug) => SECONDARY_SERVICES.find((s) => s.slug === slug)).filter(
    (s): s is (typeof SECONDARY_SERVICES)[number] => Boolean(s && SUPPORTING[s.slug]),
  );
  const groups = [...new Set(supporting.map((s) => s.group))];

  const itemList = {
    "@type": "ItemList",
    "@id": `${abs(PATH)}#services`,
    name: "Raulji Group services",
    itemListElement: [
      ...CORE.map((c) => ({ name: c.title, path: c.href })),
      ...SERVICES.map((s) => ({ name: s.name, path: s.path })),
      ...supporting.map((s) => ({ name: s.name, path: s.path })),
    ].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: item.name,
        url: abs(item.path),
        provider: { "@id": ORG_ID },
      },
    })),
  };

  return (
    <div id={ROOT_ID} className="bg-white text-[#3a4656]">
      <JsonLd data={graph(breadcrumbSchema(crumbs), itemList, faqSchema(FAQS))} />
      <PageFx rootId={ROOT_ID} />
      <div
        data-progress
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#1a7cb0,#329fd2)]"
      />

      {/* Hero, with the page index on the right. */}
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
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 md:gap-14 md:pb-24 md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div data-hero-copy className="flex min-w-0 flex-col gap-5">
              <p className={EYEBROW_DARK}>
                <Dash />
                Our Services
              </p>
              <h1
                id="service-h1"
                className={`${H1} text-white`}
              >
                Advice first. <span className="text-[#7cc8ec]">Registration done right.</span>
              </h1>
              <p className="max-w-[36rem] text-pretty text-base leading-[1.75] text-[#c9d6e3] sm:text-lg/[1.75]">
                Two things sit at the centre of what the group does: advising on business decisions,
                and getting businesses correctly registered. Everything else on this page supports
                one of those two.
              </p>
              <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#stage"
                  className={`${BTN_LIGHT} hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]`}
                >
                  Find What Applies to Me
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <TrackedLink
                  href="/contact/"
                  event="primary_cta_click"
                  params={{ label: "services_hero" }}
                  className={`${BTN_GHOST_DARK} hover:-translate-y-0.5`}
                >
                  Talk to an Expert
                </TrackedLink>
              </div>
            </div>
            <nav data-hero-index aria-label="Service areas" className="flex min-w-0 flex-col gap-2.5">
              <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#7cc8ec]">ON THIS PAGE</p>
              {AREAS.map((area, k) => (
                <a
                  key={area.name}
                  href={area.href}
                  className="group flex items-center gap-4 rounded-md border border-white/[0.12] bg-white/[0.04] px-[1.125rem] py-4 text-white transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:translate-x-1.5 hover:border-white hover:bg-white hover:text-[#122640]"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#329fd2]/20">
                    <area.icon className="h-5 w-5 text-[#7cc8ec]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold">{area.name}</span>
                    <span className="block text-xs opacity-75">{area.tag}</span>
                  </span>
                  <span className="text-xs font-bold opacity-60" aria-hidden="true">
                    0{k + 1}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* The two core services. */}
      <section id="core" aria-labelledby="core-h" className={`scroll-mt-24 ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="The two core services"
            id="core-h"
            title="The decision, then the paperwork."
            lead="Consulting settles what the business should look like. Registration makes it official. Most clients start with one and end up needing both."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {CORE.map((c) => (
              <article
                key={c.title}
                data-spot={c.dark ? "dark" : "light"}
                className={`group flex flex-col overflow-hidden rounded-lg border transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(18,38,64,0.5)] ${
                  c.dark ? "border-[#122640] bg-[#122640] text-[#d5e0ea]" : "border-[#e3e9ef] bg-white text-[#3a4656]"
                }`}
              >
                <figure className="relative m-0">
                  <Photo
                    photo={c.photo}
                    sizes="(min-width: 1024px) 38rem, 100vw"
                    className="aspect-[16/9] bg-[#1b3350]"
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t to-transparent ${
                      c.dark ? "from-[#122640]" : "from-white"
                    }`}
                  />
                </figure>
                <div className="relative -mt-[30px] flex flex-1 flex-col gap-[1.125rem] px-7 pb-7 sm:px-10 sm:pb-10">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full border-[3px] ${
                        c.dark ? "border-[#122640] bg-[#1d3a5c]" : "border-white bg-[#e8f5fb]"
                      }`}
                    >
                      <c.icon
                        className={`h-7 w-7 ${c.dark ? "text-[#7cc8ec]" : "text-[#122640]"}`}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className={`rounded-[3px] border px-2.5 py-1.5 text-xs font-bold tracking-[0.08em] ${
                        c.dark ? "border-[#7cc8ec] text-[#7cc8ec]" : "border-[#1a7cb0] text-[#1a7cb0]"
                      }`}
                    >
                      {c.label}
                    </span>
                  </div>
                  <h3
                    className={`text-[1.625rem] font-extrabold tracking-[-0.02em] sm:text-[2rem] ${
                      c.dark ? "text-white" : "text-[#122640]"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className="text-pretty text-base leading-[1.7]">{c.body}</p>
                  <ul
                    className={`grid flex-1 content-start gap-x-5 gap-y-3 border-t pt-[1.125rem] sm:grid-cols-2 ${
                      c.dark ? "border-white/[0.14]" : "border-[#eef2f6]"
                    }`}
                  >
                    {c.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] font-medium leading-[1.45]">
                        <svg
                          width="16"
                          height="16"
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
                        {item}
                      </li>
                    ))}
                  </ul>
                  <TrackedLink
                    href={c.href}
                    event="service_card_click"
                    params={{ label: "services_core", service: c.title }}
                    className={`mt-1.5 inline-flex min-h-[3.25rem] items-center gap-2 self-start rounded-[4px] px-[1.375rem] text-[0.9375rem] font-bold transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.45)] ${
                      c.dark ? "bg-white text-[#122640]" : "bg-[#122640] text-white"
                    }`}
                  >
                    {c.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The four structures. */}
      <section id="structures" aria-labelledby="four-h" className={`scroll-mt-24 bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="Register a business"
            id="four-h"
            title="The four structures."
            lead="Each page covers who the structure suits, eligibility, documents, the filing process and cost."
          />
          <figure className="group relative m-0 overflow-hidden rounded-lg">
            <Photo
              photo="structures"
              sizes="(min-width: 1280px) 1176px, 100vw"
              className="aspect-[21/7] min-h-[220px] bg-[#e8f5fb]"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(12,26,45,0.9),rgba(12,26,45,0))] p-5 text-[1.0625rem] font-bold text-white sm:p-8 sm:text-[1.3125rem]">
              Limited or unlimited liability, one owner or many: the structure decides the rest.
            </figcaption>
          </figure>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const meta = STRUCTURE_META[service.slug];
              const Icon = meta?.icon;
              return (
                <li key={service.slug} className="flex">
                  <TrackedLink
                    href={service.path}
                    event="service_card_click"
                    params={{ label: "services_structures", registration_type: service.shortName }}
                    className={`flex flex-1 flex-col gap-3.5 px-[1.625rem] py-[1.875rem] ${CARD} ${CARD_LIFT}`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5fb]">
                        {Icon ? (
                          <Icon className="h-[1.625rem] w-[1.625rem] text-[#122640]" strokeWidth={1.6} aria-hidden="true" />
                        ) : null}
                      </span>
                      {meta ? (
                        <span className="flex gap-[3px]" role="img" aria-label={`Compliance ${meta.load} of 4`}>
                          {[1, 2, 3, 4].map((k) => (
                            <span
                              key={k}
                              className={`h-[18px] w-1.5 rounded-sm ${k <= meta.load ? "bg-[#329fd2]" : "bg-[#dde4ec]"}`}
                            />
                          ))}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-[1.3125rem] font-extrabold text-[#122640]">{service.shortName}</span>
                    <span className="flex-1 text-sm leading-[1.6]">{meta?.body ?? service.cardBlurb}</span>
                    <span className="text-sm font-bold text-[#1a7cb0]">
                      Explore {service.shortName} <span aria-hidden="true">→</span>
                    </span>
                  </TrackedLink>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-4">
            <p className="text-[0.8125rem] text-[#5b6778]">Bars show annual compliance load.</p>
            <Link href="/compare/" className="text-[0.9375rem] font-semibold text-[#1a7cb0] hover:underline">
              Compare all four side by side <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Supporting services. */}
      <section id="after" aria-labelledby="aft-h" className={`scroll-mt-24 ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-9`}>
          <SectionHead
            eyebrow="Supporting services"
            id="aft-h"
            title="What comes after registration."
            lead="Once an entity exists it carries obligations. These services cover the recurring work."
          />
          <SupportingFilter
            groups={groups}
            items={supporting.map((service) => {
              const card = SUPPORTING[service.slug];
              const Icon = card.icon;
              return {
                key: service.slug,
                group: service.group,
                card: (
                  <TrackedLink
                    href={service.path}
                    event="service_card_click"
                    params={{ label: "services_supporting", service: service.name }}
                    className={`group flex flex-1 flex-col overflow-hidden ${CARD} ${CARD_LIFT}`}
                  >
                    <Photo
                      photo={card.photo}
                      decorative
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
                      className="aspect-[16/9] bg-[#e8f5fb]"
                    />
                    <span className="relative -mt-6 flex flex-1 flex-col gap-3 px-[1.625rem] pb-7">
                      <span className="flex items-end justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-[#122640]">
                          <Icon className="h-[1.375rem] w-[1.375rem] text-white" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <span className="rounded-[3px] bg-[#e8f5fb] px-2 py-1 text-xs font-bold uppercase tracking-[0.04em] text-[#1a7cb0]">
                          {service.group}
                        </span>
                      </span>
                      <span className="text-[1.1875rem] font-bold text-[#122640]">{service.name}</span>
                      <span className="flex-1 text-sm leading-[1.65]">{card.body}</span>
                      <span className="text-sm font-bold text-[#1a7cb0]">
                        Learn more <span aria-hidden="true">→</span>
                      </span>
                    </span>
                  </TrackedLink>
                ),
              };
            })}
          />
        </div>
      </section>

      {/* Stage picker. */}
      <section id="stage" aria-labelledby="stg-h" className={`scroll-mt-24 bg-[#122640] text-white ${SECTION}`}>
        <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW_DARK}>
              <Dash />
              Where are you now?
            </p>
            <h2 id="stg-h" className={H2_DARK}>
              Not sure which service applies to you?
            </h2>
            <p className="text-base leading-[1.7] text-[#c9d6e3]">
              Pick the stage closest to yours. We will show what is usually relevant, and an
              advisor will tell you what actually is.
            </p>
            <figure className="group relative m-0 mb-3.5 mr-3.5 mt-3.5">
              <span
                data-parallax
                aria-hidden="true"
                className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-md border-[1.5px] border-[#329fd2]"
              />
              <Photo
                photo="stage"
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="aspect-[4/3] rounded-md bg-[#1b3350]"
              />
            </figure>
          </div>
          <StagePicker stages={STAGES} />
        </div>
      </section>

      {/* Technology gateway: an introduction and a link out (master rule 14). */}
      <section id="tech" aria-labelledby="tech-h" className="scroll-mt-24 px-5 pt-16 sm:px-8 md:pt-24">
        <div
          data-spot="dark"
          className="relative mx-auto flex max-w-[1176px] flex-wrap items-center justify-between gap-x-14 gap-y-7 overflow-hidden rounded-lg bg-[#0c1a2d] p-8 text-white sm:p-14"
        >
          <Image
            src={HUB_PHOTOS.technology.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 1176px, 100vw"
            className="object-cover opacity-[0.45]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,#0c1a2d_40%,rgba(12,26,45,0.6))]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(50,159,210,0.2)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,transparent_40%,#000_100%)]"
          />
          <div className="relative flex min-w-0 flex-[1_1_28rem] flex-col gap-3.5">
            <p className={EYEBROW_DARK}>
              <Dash />
              Separate brand
            </p>
            <h2 id="tech-h" className={H2_DARK}>
              Technology, software and AI.
            </h2>
            <p className="max-w-[36rem] text-base leading-[1.7] text-[#c9d6e3]">
              Technology and digital work is delivered by Raulji Technologies, the group&rsquo;s
              technology brand. Its full service catalogue lives on its own website.
            </p>
          </div>
          <TrackedLink
            href={SITE.technologies}
            external
            event="technology_click"
            params={{ label: "services_gateway" }}
            className={`relative ${BTN_LIGHT} hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]`}
          >
            Explore Raulji Technologies
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </section>

      {/* FAQs. */}
      <section aria-labelledby="faq-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]">
              <Dash />
              Quick answers
            </p>
            <h2 id="faq-h" className={H2}>
              Questions about our services.
            </h2>
            <Link href="/faqs/" className="self-start text-[0.9375rem] font-semibold text-[#1a7cb0] hover:underline">
              All FAQs <span aria-hidden="true">→</span>
            </Link>
          </div>
          <FaqList faqs={FAQS} />
        </div>
      </section>

      {/* Closing CTA. */}
      <section aria-labelledby="cta-h" className="px-5 pb-14 sm:px-8 md:pb-24">
        <div
          data-spot="dark"
          className="mx-auto flex max-w-[1176px] flex-wrap items-stretch overflow-hidden rounded-lg bg-[#122640] text-white"
        >
          <figure className="group relative m-0 min-h-[260px] flex-[1_1_20rem] bg-[#1b3350]">
            <Image
              src={HUB_PHOTOS.cta.src}
              alt={HUB_PHOTOS.cta.alt}
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              placeholder="blur"
              className={ZOOM}
            />
          </figure>
          <div className="flex min-w-0 flex-[1.6_1_28rem] flex-col justify-center gap-6 p-8 sm:p-14">
            <div className="flex flex-col gap-3.5">
              <h2 id="cta-h" className={H2_DARK}>
                Tell us what you are trying to decide.
              </h2>
              <p className="max-w-[35rem] text-base leading-[1.7] text-[#d5e0ea]">
                Describe what the business does. We will tell you which of these services is
                actually relevant, and which are not.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/contact/"
                event="primary_cta_click"
                params={{ label: "services_footer" }}
                className={`${BTN_LIGHT} hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]`}
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={whatsappHref(
                  "Hello Raulji Group, I would like to know which of your services applies to my business.",
                )}
                external
                event="whatsapp_click"
                params={{ label: "services_footer" }}
                className={`${BTN_GHOST_DARK} hover:-translate-y-0.5`}
              >
                WhatsApp an Expert
              </TrackedLink>
            </div>
            <p className="text-sm text-[#c9d6e3]">
              Or call{" "}
              <TrackedLink
                href={`tel:${SITE.phone.e164}`}
                event="phone_click"
                params={{ label: "services_footer" }}
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
