import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Building2,
  Check,
  ClipboardList,
  Code2,
  Compass,
  FileText,
  Handshake,
  Layers,
  Link2,
  Mail,
  MapPin,
  MessagesSquare,
  Phone,
  Route,
  Scale,
  Settings2,
  ShieldCheck,
  Target,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import heroPhoto from "@/public/photos/home-hero.webp";
import companyConsultingPhoto from "@/public/photos/home-companyConsulting.webp";
import companyTechPhoto from "@/public/photos/home-companyTech.webp";
import consultingPhoto from "@/public/photos/home-consulting.webp";
import editorialPhoto from "@/public/photos/home-editorial.webp";
import ctaPhoto from "@/public/photos/home-cta.webp";
import { TrackedLink } from "@/components/ui/tracked-link";
import { LeadForm } from "@/components/forms/lead-form";
import { JsonLd } from "@/components/ui/json-ld";
import { LocationDrawerTrigger } from "@/components/shared/location-drawer";
import { getArticle } from "@/lib/blog";
import { HOME_ANSWERS } from "@/lib/home-faqs";
import { POPULAR_CITIES } from "@/lib/city-index";
import { SERVICES } from "@/lib/services";
import { SITE, LEADERSHIP, telHref, mailHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { faqSchema, graph, homeServiceListSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Raulji Group | Business Consulting & Solutions",
  /* The description the design brief specifies at its section 18, verbatim. */
  description:
    "Raulji Group helps entrepreneurs and businesses with business consulting, registration, business structuring and related business solutions across Gujarat and India.",
  path: "/",
  ogHeadline: "We Don't Just Build Businesses. We Build Futures.",
});

/*
 * Homepage body, built to the "Raulji Home" design (claude.ai/design).
 *
 * The header and footer are the site-wide ones and are not part of this file.
 *
 * The layout, section order and visual language follow the design. Its
 * placeholder content was not carried over where it breaks the master rules:
 *
 * - "500+ Businesses Supported" and "9+ Years of Experience" are unverified
 *   (master rule 13). The key-facts band keeps its shape but states only
 *   verified facts, with no count-up animation.
 * - The design's phone number, email and hours were placeholders. The real
 *   ones come from SITE.
 * - "Response within one working day", "Free first consultation" and the
 *   language list are unverified promises (master rule 23), so they are gone.
 * - GST, legal and documentation services were removed from the group's
 *   offering on 2026-09-16 (master rule 15), so the journey band and the
 *   consulting list describe what the group actually does.
 * - Photographs are the ones the design specifies, self-hosted as WebP in
 *   /public/photos/home-*.webp at the client's request (2026-09-24). Alt text
 *   describes what is in each photograph and does not present it as a Raulji
 *   Group office or team. The leadership portrait is the client-supplied
 *   photograph from lib/site.ts.
 * - The India map is a static SVG in /public/maps rather than a live d3 map,
 *   and it marks only the headquarters: the design's arcs to ten cities
 *   implied client coverage nobody has verified.
 */

/* Colours from the design, all inside the brand palette (master rule 24). */
const EYEBROW = "text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]";
const H2 =
  "text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#122640] sm:text-4xl/[1.12] lg:text-[2.75rem]";
const BTN_DARK =
  "inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-[#122640] px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-[#0c1a2d]";
const BTN_OUTLINE =
  "inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] border-[1.5px] border-[#122640] px-6 text-[0.9375rem] font-semibold text-[#122640] transition-colors hover:bg-white";
const CONTAINER = "mx-auto max-w-[1240px] px-5 sm:px-8";
const SECTION = "py-16 md:py-24 lg:py-28";

const HERO_POINTS = [
  { label: "Business Consulting", icon: Compass },
  { label: "Business Registration", icon: Building2 },
  { label: "Insurance Services", icon: ShieldCheck },
  { label: "Technology & Digital", icon: Code2 },
];

/** Verified facts only, in the design's key-figures band. */
const KEY_FACTS = [
  { value: `${SITE.locality}, ${SITE.region}`, label: "Headquarters", icon: MapPin },
  { value: "Gujarat & India", label: "Where we work", icon: Route },
  { value: "Consulting-led", label: "How we approach a business", icon: Compass },
  { value: "Two brands", label: "Consulting and technology", icon: Layers },
];

const JOURNEY = [
  {
    title: "Consulting",
    body: "Which structure fits, and what has to be in place before anything is filed.",
    icon: Compass,
    href: "/services/business-consulting/",
  },
  {
    title: "Registration",
    body: "Private Limited, LLP, Partnership or Proprietorship.",
    icon: Building2,
    href: "/services/business-registration/",
  },
  {
    title: "Compliance",
    body: "Annual filings for Private Limited companies and LLPs.",
    icon: ClipboardList,
    href: "/services/pvt-compliance/",
  },
  {
    title: "Insurance",
    body: "Business and personal cover, arranged with the insurer.",
    icon: ShieldCheck,
    href: "/services/insurance/",
  },
  {
    title: "Technology",
    body: "Software, AI and digital work through Raulji Technologies.",
    icon: Code2,
    href: SITE.technologies,
    external: true,
  },
];

const COMPANIES = [
  {
    name: "Raulji Consulting Services",
    category: "Business Consulting",
    body: "The consulting and business-services arm of the group. It works with founders and business owners on the decisions that come before paperwork: which structure fits, what the obligations will be, and what has to be in place before the business can grow.",
    image: { src: companyConsultingPhoto, alt: "A bright, modern office interior" },
    href: "/services/business-consulting/",
    cta: "Explore Consulting",
    external: false,
  },
  {
    name: "Raulji Technologies",
    category: "Technology & Digital",
    body: "The group's technology brand, covering software and web application development, AI, cloud and digital transformation. It operates on its own website, where the full technology service catalogue lives.",
    image: { src: companyTechPhoto, alt: "A laptop glowing in a dark workspace" },
    href: SITE.technologies,
    cta: "Explore Raulji Technologies",
    external: true,
  },
];

/** Consulting areas from master rule 8. Nothing outside that list. */
const CONSULTING_AREAS = [
  { label: "Business Strategy", icon: Target },
  { label: "Business Planning", icon: FileText },
  { label: "Business Structuring", icon: Layers },
  { label: "Growth & Expansion Planning", icon: TrendingUp },
  { label: "Operational Guidance", icon: Settings2 },
  { label: "Business Advisory", icon: MessagesSquare },
];

/** One line per structure, drawn from the verified FAQ answers. */
const STRUCTURE_SUMMARY: Record<string, { body: string; icon: typeof Briefcase }> = {
  "pvt-registration": {
    body: "For founders planning to raise investment or issue shares.",
    icon: Briefcase,
  },
  "llp-registration": {
    body: "Two or more partners who want their liability capped.",
    icon: Link2,
  },
  "partnership-registration": {
    body: "Two or more people starting together under a partnership deed.",
    icon: Users,
  },
  "proprietorship-registration": {
    body: "A single owner starting small, with the least paperwork.",
    icon: User,
  },
};

const STEPS = [
  "Understand what you are building",
  "Advise on the right structure",
  "Prepare documents and file",
  "Follow through to approval",
  "Ongoing compliance support",
];

/*
 * Why Raulji Group. Six, as the design lays out, and every one something a
 * reader can hold us to afterwards: no client counts, ratings, awards or
 * "most trusted" (master rule 13).
 */
const WHY_US = [
  {
    title: "Clear guidance",
    body: "If a proprietorship is genuinely right for you, we will say so rather than sell you a company.",
    icon: Compass,
  },
  {
    title: "A structured process",
    body: "You know what happens from the first conversation through to filing.",
    icon: ClipboardList,
  },
  {
    title: "Transparent fees",
    body: "Our fee and the expected government fees are set out before any filing begins.",
    icon: Scale,
  },
  {
    title: "Straight about our remit",
    body: "Where a matter needs an advocate, CA or CS, we say so and coordinate.",
    icon: Check,
  },
  {
    title: "Long-term relationships",
    body: "The same team stays with you after registration, into compliance and growth.",
    icon: Handshake,
  },
  {
    title: "Business + technology",
    body: "Consulting here, and technology through Raulji Technologies, under one group.",
    icon: Code2,
  },
];

const PRESENCE = [
  { label: `Headquartered in ${SITE.locality}, ${SITE.region}`, icon: MapPin },
  { label: "Working with businesses across India", icon: Compass },
  { label: "Incorporation filed online, wherever you are", icon: FileText },
  { label: "Support for startups and growing businesses", icon: Users },
];

const CONTACT_POINTS = [
  "A straight answer on which structure fits",
  "Fees set out before any filing begins",
  "Enquiries handled by the team working on your file",
];

/**
 * The three guides linked from the homepage, chosen by slug rather than date
 * so the band always answers the question a visitor arrives with. A slug that
 * stops resolving is dropped rather than rendered dead.
 */
const HOME_GUIDES = [
  "how-to-choose-business-structure-india-2026",
  "private-limited-company-vs-llp",
  "starting-business-gujarat-registration-guide",
]
  .map((slug) => getArticle(slug))
  .filter((article): article is NonNullable<typeof article> => article !== null);

export default function HomePage() {
  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd data={graph(homeServiceListSchema(), faqSchema(HOME_ANSWERS))} />

      {/* 1. Hero. Text left on light grey, image right, full bleed. */}
      <section
        aria-labelledby="hero-h"
        className="grid overflow-hidden bg-[#f4f7fa] pt-[5.5rem] sm:pt-24 lg:grid-cols-2"
      >
        <div className="flex flex-col justify-center gap-7 px-5 py-12 sm:px-8 md:py-20 lg:py-24 lg:pl-[max(2rem,calc((100vw-1240px)/2+2rem))] lg:pr-14">
          <p className={EYEBROW}>Raulji Group</p>
          <h1
            id="hero-h"
            className="text-balance text-[2.375rem] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#122640] sm:text-5xl/[1.06] xl:text-[4rem]"
          >
            {SITE.taglineParts[0]} <span className="text-[#1a7cb0]">{SITE.taglineParts[1]}</span>
          </h1>
          <p className="max-w-[32.5rem] text-pretty text-base/[1.7] leading-[1.7] sm:text-lg/[1.7]">
            Raulji Group is a consulting-focused business group. We help entrepreneurs and business
            owners make informed decisions, set up the right structure, and move forward with
            clarity.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/contact/"
              event="primary_cta_click"
              params={{ label: "home_hero" }}
              className={BTN_DARK}
            >
              Talk to an Expert
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href="/services/"
              event="service_card_click"
              params={{ label: "home_hero_services" }}
              className={BTN_OUTLINE}
            >
              Explore Our Services
            </TrackedLink>
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#dde4ec] pt-6">
            {HERO_POINTS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[0.8125rem] font-medium text-[#122640]"
              >
                <Icon className="h-[1.125rem] w-[1.125rem] text-[#329fd2]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[20rem] bg-[#122640] sm:min-h-[28rem] lg:min-h-[40rem]">
          <Image
            src={heroPhoto}
            alt="Glass corporate office towers seen from street level against the sky"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,38,64,0)_55%,rgba(18,38,64,0.45))]"
          />
          <div className="absolute bottom-0 right-0 flex max-w-[18rem] flex-col gap-4 bg-[#122640] px-7 py-6 text-white sm:px-8 sm:py-7">
            <p className="text-base/[1.5] font-medium leading-normal sm:text-[1.0625rem]">
              Leadership Built on Relationships. Trust Built for the Long Term.
            </p>
            <span className="h-0.5 w-8 bg-[#329fd2]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 2. Key facts. The design's figures band, holding verified facts only. */}
      <section aria-label="Key facts" className="bg-[#122640] text-white">
        <dl className={`${CONTAINER} grid gap-6 py-8 sm:grid-cols-2 md:py-10 lg:grid-cols-4`}>
          {KEY_FACTS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4">
              <Icon
                className="h-8 w-8 shrink-0 text-[#329fd2]"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <div className="flex flex-col-reverse">
                <dt className="mt-0.5 text-sm text-[#c9d6e3]">{label}</dt>
                <dd className="text-xl font-bold tracking-[-0.01em] sm:text-[1.375rem]">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* 3. One group, end to end. */}
      <section aria-labelledby="e2e-h" className="pt-16 md:pt-24 lg:pt-28">
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>One Group. End to End.</p>
              <h2 id="e2e-h" className={`${H2} text-balance`}>
                From the First Decision to Growth,{" "}
                <span className="text-[#1a7cb0]">in One Place.</span>
              </h2>
            </div>
            <p className="text-pretty text-base/[1.7] leading-[1.7]">
              Raulji Group covers the business journey from the structure decision through
              registration, compliance and insurance, with technology through its sister brand. One
              group that knows your file, rather than a new vendor at every stage.
            </p>
          </div>
          <ol className="grid overflow-hidden rounded-md border border-[#e3e9ef] sm:grid-cols-2 lg:grid-cols-5">
            {JOURNEY.map((step, i) => {
              const last = i === JOURNEY.length - 1;
              const Icon = step.icon;
              const inner = (
                <>
                  <span className="flex items-center justify-between">
                    <Icon
                      className={`h-[1.625rem] w-[1.625rem] ${last ? "text-[#329fd2]" : "text-[#1a7cb0]"}`}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-xs font-bold tracking-[0.08em] ${last ? "text-[#329fd2]" : "text-[#1a7cb0]"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3
                    className={`flex items-center gap-1.5 text-[1.0625rem] font-bold leading-[1.3] ${last ? "text-white" : "text-[#122640]"}`}
                  >
                    {step.title}
                    {step.external ? (
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    ) : null}
                  </h3>
                  <p className="text-sm/[1.55] leading-[1.55]">{step.body}</p>
                </>
              );
              const cls = `flex h-full flex-col gap-3.5 px-6 py-7 transition-colors ${
                last
                  ? "bg-[#122640] text-[#d5e0ea] hover:bg-[#0c1a2d]"
                  : "bg-white hover:bg-[#fbfdfe]"
              }`;
              return (
                <li
                  key={step.title}
                  className="border-b border-[#e3e9ef] last:border-b-0 sm:border-r lg:border-b-0"
                >
                  {step.external ? (
                    <TrackedLink
                      href={step.href}
                      external
                      event="technology_click"
                      params={{ label: "home_journey" }}
                      className={cls}
                    >
                      {inner}
                    </TrackedLink>
                  ) : (
                    <Link href={step.href} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4. Our companies. The two verified brands of the group. */}
      <section id="group" aria-labelledby="co-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-12`}>
          <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>Our Group</p>
              <h2 id="co-h" className={H2}>
                Two Brands.
                <br />
                One Shared Vision.
              </h2>
            </div>
            <p className="text-pretty border-l-2 border-[#329fd2] pl-5 text-base/[1.7] leading-[1.7]">
              Raulji Group works through two brands, each focused on its own area, so you know
              which part of the group to speak to for a useful answer.
            </p>
          </div>
          <div className="grid gap-7 lg:grid-cols-2">
            {COMPANIES.map((c) => (
              <article
                key={c.name}
                className="flex flex-col overflow-hidden rounded-md border border-[#e3e9ef] bg-white transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_18px_40px_-18px_rgba(18,38,64,0.28)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#122640]">
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 38rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3.5 p-6 sm:p-9">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-[1.375rem] font-bold tracking-[-0.01em] text-[#122640]">
                      {c.name}
                    </h3>
                    <span className="rounded-[3px] bg-[#e8f5fb] px-2.5 py-1.5 text-xs font-semibold text-[#1a7cb0]">
                      {c.category}
                    </span>
                  </div>
                  <p className="flex-1 text-pretty text-[0.9375rem] leading-[1.7]">{c.body}</p>
                  {c.external ? (
                    <TrackedLink
                      href={c.href}
                      external
                      event="technology_click"
                      params={{ label: "home_brand_card" }}
                      className="mt-1.5 inline-flex min-h-[2.75rem] items-center gap-2 self-start text-[0.9375rem] font-semibold text-[#122640] hover:text-[#1a7cb0]"
                    >
                      {c.cta}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </TrackedLink>
                  ) : (
                    <Link
                      href={c.href}
                      className="mt-1.5 inline-flex min-h-[2.75rem] items-center gap-2 self-start text-[0.9375rem] font-semibold text-[#122640] hover:text-[#1a7cb0]"
                    >
                      {c.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What we do. Consulting, the primary focus (master rule 8). */}
      <section id="services" aria-labelledby="svc-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-2 lg:gap-20`}>
          <div className="relative order-2 aspect-[4/5] max-h-[40rem] w-full overflow-hidden rounded-md bg-[#122640] lg:order-1">
            <Image
              src={consultingPhoto}
              alt="A team working through ideas on sticky notes during a strategy session"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <p className={EYEBROW}>What We Do</p>
            <h2 id="svc-h" className={H2}>
              Clearer Decisions.
              <br />
              Stronger Business Direction.
            </h2>
            <p className="max-w-[33.75rem] text-pretty text-base/[1.7] leading-[1.7]">
              Consulting is the primary focus of Raulji Group. Before anything is filed, it is worth
              being certain the structure and the plan match what you are actually building.
            </p>
            <ul className="mt-3 grid gap-px overflow-hidden rounded-md border border-[#e3e9ef] bg-[#e3e9ef] sm:grid-cols-2">
              {CONSULTING_AREAS.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3.5 bg-white p-5 sm:p-[1.375rem]">
                  <Icon
                    className="h-[1.625rem] w-[1.625rem] shrink-0 text-[#1a7cb0]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="text-[0.9375rem] font-semibold leading-[1.35] text-[#122640]">
                    {label}
                  </h3>
                </li>
              ))}
            </ul>
            <Link href="/services/business-consulting/" className={`${BTN_DARK} mt-2 self-start`}>
              Explore Business Consulting
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Business registration. Four structures, each to its own page. */}
      <section id="registration" aria-labelledby="reg-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-12`}>
          <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>Business Registration</p>
              <h2 id="reg-h" className={H2}>
                Start Your Business
                <br />
                the Right Way.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="text-pretty text-base/[1.7] leading-[1.7]">
                The right structure depends on ownership, liability, investment plans and how you
                intend to operate. Each page covers eligibility, documents, process and cost.
              </p>
              <Link
                href="/services/business-registration/"
                className="inline-flex min-h-[2.75rem] items-center gap-2 text-[0.9375rem] font-semibold text-[#122640] hover:text-[#1a7cb0]"
              >
                View All Registration Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const summary = STRUCTURE_SUMMARY[service.slug];
              const Icon = summary?.icon ?? Building2;
              return (
                <li key={service.slug}>
                  <TrackedLink
                    href={service.path}
                    event="service_card_click"
                    params={{ label: `home_${service.slug}` }}
                    className="flex h-full flex-col gap-3.5 rounded-md border border-[#e3e9ef] bg-white px-7 py-8 transition duration-300 hover:-translate-y-[3px] hover:border-[#329fd2] hover:shadow-[0_16px_36px_-20px_rgba(18,38,64,0.35)]"
                  >
                    <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#e8f5fb]">
                      <Icon className="h-6 w-6 text-[#122640]" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <h3 className="mt-2 text-lg/[1.3] font-bold leading-[1.3] text-[#122640]">
                      {service.name}
                    </h3>
                    {summary ? (
                      <p className="text-[0.9375rem] leading-[1.6]">{summary.body}</p>
                    ) : null}
                    <span className="mt-auto pt-2 text-[0.8125rem] font-semibold text-[#1a7cb0]">
                      Learn more <span aria-hidden="true">→</span>
                    </span>
                  </TrackedLink>
                </li>
              );
            })}
          </ul>
          <p className="max-w-3xl text-sm/[1.625] leading-relaxed text-[#5b6778]">
            Company and LLP incorporation is filed with the Registrar of Companies under the
            Ministry of Corporate Affairs. Current forms, fees and rules are published at{" "}
            <a
              href="https://www.mca.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1a7cb0] hover:underline"
            >
              mca.gov.in
            </a>
            . Raulji Group prepares and files these applications on your behalf and is not a
            government body.{" "}
            <Link href="/compare/" className="font-semibold text-[#1a7cb0] hover:underline">
              Compare all four structures
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 7. How we work. */}
      <section id="process" aria-labelledby="pr-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-14`}>
          <div className="flex max-w-[40rem] flex-col gap-3.5">
            <p className={EYEBROW}>How We Work</p>
            <h2 id="pr-h" className={H2}>
              A Simple, Transparent Process.
            </h2>
            <p className="text-base/[1.7] leading-[1.7]">
              You know what happens at each stage. Approval always rests with the relevant
              authority; our job is to make sure what reaches them is complete and correct.
            </p>
          </div>
          <ol className="relative flex flex-col lg:grid lg:grid-cols-5">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-6 top-6 w-px bg-[#c9d6e3] lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-7 lg:h-px lg:w-auto lg:bg-[#122640]"
            />
            {STEPS.map((title, i) => (
              <li
                key={title}
                className="relative flex items-center gap-5 py-3 lg:flex-col lg:gap-4 lg:px-3 lg:py-0 lg:text-center"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#122640] bg-white text-sm font-bold text-[#122640] lg:h-14 lg:w-14 lg:text-[0.9375rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base/[1.4] font-semibold leading-[1.4] text-[#122640] lg:max-w-[11.25rem]">
                  {title}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Why Raulji Group. */}
      <section id="why" aria-labelledby="why-h" className={SECTION}>
        <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-2 lg:gap-20`}>
          <div className="flex flex-col gap-5 lg:sticky lg:top-32">
            <p className={EYEBROW}>Why Raulji Group</p>
            <h2 id="why-h" className={H2}>
              More Than Services.
              <br />A Long-Term Partner.
            </h2>
            <p className="max-w-[32.5rem] text-pretty text-base/[1.7] leading-[1.7]">
              Setting up and running a business involves a lot of small decisions. Our job is to make
              sure the ones that matter are made deliberately.
            </p>
            <TrackedLink
              href="/contact/"
              event="primary_cta_click"
              params={{ label: "home_why" }}
              className={`${BTN_DARK} mt-2 self-start`}
            >
              Discuss Your Business
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {WHY_US.map(({ title, body, icon: Icon }) => (
              <li
                key={title}
                className="flex flex-col gap-4 rounded-md border border-[#e3e9ef] px-6 py-7 transition-colors hover:border-[#329fd2]"
              >
                <Icon className="h-7 w-7 text-[#1a7cb0]" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="text-base/[1.35] font-bold leading-[1.35] text-[#122640]">{title}</h3>
                <p className="text-sm/[1.6] leading-[1.6]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        9. Leadership. Name and title are confirmed by the client (lib/site.ts).
        The paragraph is the group's statement, not a quotation: no words are
        put in a named person's mouth (master rule 13).
      */}
      <section aria-labelledby="lead-h" className="px-5 pb-16 sm:px-8 md:pb-24 lg:pb-28">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 border-t border-[#e3e9ef] pt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16 md:pt-20">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[25rem] pb-[18px] pr-[18px]">
            <span
              aria-hidden="true"
              className="absolute inset-[18px_0_0_18px] rounded-md border-[1.5px] border-[#329fd2]"
            />
            <div className="relative h-full w-full overflow-hidden rounded-md bg-[#122640]">
              <Image
                src={LEADERSHIP.chairman.photo}
                alt={`${LEADERSHIP.chairman.name}, ${LEADERSHIP.chairman.roles[0]}`}
                fill
                sizes="(min-width: 768px) 25rem, 90vw"
                className="object-cover object-[center_30%]"
              />
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <p className={EYEBROW}>Leadership</p>
            <h2
              id="lead-h"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#122640] sm:text-[2.75rem] lg:text-[3.5rem]"
            >
              Leadership Built on Relationships.{" "}
              <span className="text-[#1a7cb0]">Trust Built for the Long Term.</span>
            </h2>
            <p className="max-w-[37.5rem] text-pretty text-[1.0625rem] leading-[1.75]">
              Every engagement starts with understanding the person behind the business. Raulji
              Group is built to stay with a business beyond its first registration, into compliance
              and each stage of growth that follows.
            </p>
            <div className="flex max-w-[37.5rem] items-center gap-4 border-t border-[#e3e9ef] pt-5">
              <span className="h-0.5 w-10 shrink-0 bg-[#329fd2]" aria-hidden="true" />
              <p className="text-[0.9375rem]">
                <strong className="block text-[1.0625rem] font-bold text-[#122640]">
                  {LEADERSHIP.chairman.name}
                </strong>
                {LEADERSHIP.chairman.roles[0]}
              </p>
              <Link
                href="/about/"
                className="ml-auto inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-semibold text-[#122640] hover:text-[#1a7cb0]"
              >
                About Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Philosophy band. */}
      <section aria-label="Our philosophy" className="px-5 pb-16 sm:px-8 md:pb-24 lg:pb-28">
        <figure className="relative mx-auto flex min-h-[22.5rem] max-w-[1240px] items-center overflow-hidden rounded-md bg-[#122640] md:aspect-[21/9]">
          <Image
            src={editorialPhoto}
            alt="An open-plan office with a long meeting table and floor-to-ceiling windows"
            fill
            placeholder="blur"
            sizes="(min-width: 1240px) 1240px, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,26,45,0.88)_0%,rgba(12,26,45,0.55)_45%,rgba(12,26,45,0)_80%)]"
          />
          <figcaption className="relative flex flex-col gap-5 p-7 sm:p-12 lg:p-[4.5rem]">
            <span className="h-0.5 w-10 bg-[#329fd2]" aria-hidden="true" />
            <p className="text-[1.625rem] font-bold leading-[1.18] tracking-[-0.02em] text-white sm:text-[2.25rem] lg:text-[2.75rem]">
              Ideas for Business.
              <br />
              People for Growth.
              <br />
              <span className="text-[#7cc8ec]">A Better Tomorrow.</span>
            </p>
          </figcaption>
        </figure>
      </section>

      {/* 11. Presence. Gujarat as the home market, India-wide positioning. */}
      <section aria-labelledby="pres-h" className={`overflow-hidden bg-[#0c1a2d] text-white ${SECTION}`}>
        <div className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]">
              Where We Work
            </p>
            <h2
              id="pres-h"
              className="text-[1.875rem] text-white font-bold leading-[1.12] tracking-[-0.02em] sm:text-4xl/[1.12] lg:text-[2.75rem]"
            >
              Serving Businesses
              <br />
              Across Gujarat &amp; India.
            </h2>
            <p className="max-w-[30rem] text-base/[1.7] leading-[1.7] text-[#c9d6e3]">
              Incorporation is filed online, so where you are does not change the process. Gujarat
              is the market we know best, and we work with businesses across India from our base in{" "}
              {SITE.locality}.
            </p>
            <ul className="mt-3 flex flex-col border-t border-white/[0.12]">
              {PRESENCE.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-3.5 border-b border-white/[0.12] py-4 text-[0.9375rem] font-medium"
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#329fd2]" strokeWidth={1.6} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c9d6e3]">
                Popular locations
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {POPULAR_CITIES.map((city) => (
                  <li key={city.slug}>
                    <TrackedLink
                      href={`/${city.slug}/`}
                      event="city_page_click"
                      params={{ city: city.name, label: "home_presence" }}
                      className="inline-flex min-h-[2.5rem] items-center rounded-[4px] border border-white/20 px-3.5 text-sm font-medium text-white transition-colors hover:border-[#329fd2] hover:text-[#7cc8ec]"
                    >
                      {city.name}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/gujarat/"
                event="gujarat_page_click"
                params={{ label: "home_presence" }}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-semibold text-[#122640] transition-colors hover:bg-[#e8f5fb]"
              >
                Business Support in Gujarat
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <LocationDrawerTrigger
                source="home_presence"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] border-[1.5px] border-white/60 px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:border-white"
              >
                Explore All Locations
              </LocationDrawerTrigger>
            </div>
          </div>
          <div className="mx-auto aspect-[600/640] w-full max-w-[35rem]">
            {/* Static SVG, lazy-loaded: no map library or runtime fetch on the homepage. */}
            <img
              src="/maps/india-headquarters.svg"
              alt={`Map of India marking the Raulji Group headquarters in ${SITE.locality}, ${SITE.region}`}
              width={600}
              height={640}
              loading="lazy"
              decoding="async"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* 12. Insights, with three short answers (the FAQPage schema source). */}
      <section aria-labelledby="ins-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-12`}>
          <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>Insights</p>
              <h2 id="ins-h" className={H2}>
                Guides for People Deciding What to Register.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="text-pretty text-base/[1.7] leading-[1.7]">
                Written to answer the question rather than to rank for it. Each one names its
                sources.
              </p>
              <Link
                href="/blog/"
                className="inline-flex min-h-[2.75rem] items-center gap-2 text-[0.9375rem] font-semibold text-[#122640] hover:text-[#1a7cb0]"
              >
                All Business Guides
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {HOME_GUIDES.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/blog/${guide.slug}/`}
                  className="flex h-full flex-col gap-3.5 rounded-md border border-[#e3e9ef] bg-white px-7 py-8 transition duration-300 hover:-translate-y-[3px] hover:border-[#329fd2] hover:shadow-[0_16px_36px_-20px_rgba(18,38,64,0.35)]"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1a7cb0]">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    {guide.category}
                  </span>
                  <h3 className="text-lg/[1.3] font-bold leading-[1.3] text-[#122640]">{guide.title}</h3>
                  <p className="flex-1 text-[0.9375rem] leading-[1.6]">{guide.excerpt}</p>
                  <span className="pt-2 text-[0.8125rem] font-semibold text-[#1a7cb0]">
                    Read the guide <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid gap-8 border-t border-[#e3e9ef] pt-10 md:grid-cols-3">
            {HOME_ANSWERS.map((answer) => (
              <div key={answer.q}>
                <h3 className="text-base/[1.375] font-bold leading-snug text-[#122640]">{answer.q}</h3>
                <p className="mt-2 border-l-2 border-[#329fd2] pl-4 text-sm/[1.625] leading-relaxed">
                  {answer.a}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm">
            More questions are answered in the{" "}
            <Link href="/faqs/" className="font-semibold text-[#1a7cb0] hover:underline">
              full FAQ library
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 13. Final CTA with the consultation form (master rule 23). */}
      <section id="enquiry" aria-labelledby="cta-h" className="px-5 pb-16 sm:px-8 md:pb-24 lg:pb-28">
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-md bg-[#122640] text-white">
          <Image
            src={ctaPhoto}
            alt=""
            fill
            sizes="(min-width: 1240px) 1240px, 100vw"
            className="object-cover opacity-[0.12]"
          />
          <div className="relative grid items-start gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div className="flex flex-col gap-[1.125rem] pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]">
                Talk to an Expert
              </p>
              <h2
                id="cta-h"
                className="text-balance text-white text-[1.875rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl/[1.1] lg:text-5xl/[1.1]"
              >
                Let&rsquo;s Build Your Future Together.
              </h2>
              <p className="max-w-[30rem] text-pretty text-base/[1.7] leading-[1.7] text-[#d5e0ea]">
                Whether you are starting a new business, choosing a structure or planning the next
                stage, a short description of your situation is enough to start.
              </p>
              <ul className="mt-3 flex flex-col gap-3.5">
                {CONTACT_POINTS.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-[0.9375rem]">
                    <Check className="h-[1.125rem] w-[1.125rem] shrink-0 text-[#329fd2]" strokeWidth={2} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.14] pt-6 sm:flex-row sm:flex-wrap sm:gap-x-7">
                <TrackedLink
                  href={telHref}
                  event="phone_click"
                  params={{ label: "home_cta" }}
                  className="inline-flex min-h-[2.75rem] items-center gap-2.5 text-[0.9375rem] font-semibold text-white hover:text-[#7cc8ec]"
                >
                  <Phone className="h-[1.125rem] w-[1.125rem] text-[#329fd2]" strokeWidth={1.6} aria-hidden="true" />
                  {SITE.phone.display}
                </TrackedLink>
                <TrackedLink
                  href={mailHref}
                  event="email_click"
                  params={{ label: "home_cta" }}
                  className="inline-flex min-h-[2.75rem] items-center gap-2.5 text-[0.9375rem] font-semibold text-white hover:text-[#7cc8ec]"
                >
                  <Mail className="h-[1.125rem] w-[1.125rem] text-[#329fd2]" strokeWidth={1.6} aria-hidden="true" />
                  {SITE.email}
                </TrackedLink>
              </div>
              <p className="text-sm text-[#c9d6e3]">{SITE.hours.display}</p>
            </div>
            <LeadForm
              heading="Get Business Guidance"
              lead="Send us the details and a member of the Raulji Group team will get back to you."
              className="rounded-md border-0 text-[#3a4656] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
