import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  MapPinned,
  MessageSquare,
  Phone,
  ShieldCheck,
  UserCheck,
  Wallet,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ServiceCards } from "@/components/shared/service-cards";
import { PopularCities } from "@/components/shared/popular-cities";
import { BusinessJourney } from "@/components/shared/business-journey";
import { GroupDiagram } from "@/components/shared/group-diagram";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { HOME_FAQS } from "@/lib/home-faqs";
import { SERVICES } from "@/lib/services";
import { SITE, telHref, TIMELINE_DISCLAIMER } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { faqSchema, graph, homeServiceListSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Company Registration & Business Services in Gujarat | Raulji Group",
  description:
    "Raulji Group helps entrepreneurs choose and register the right business structure with Private Limited, LLP, Partnership and Proprietorship registration support across Gujarat.",
  path: "/",
  ogHeadline: "We Don't Just Build Businesses. We Build Futures.",
});

/**
 * Why businesses choose Raulji Group (spec section 10).
 * Practical proof only. No client counts, no ratings, no "No. 1" claims.
 */
const WHY_US = [
  {
    icon: UserCheck,
    title: "Structure before filing",
    body: "We start by understanding what you are building, because the wrong structure is expensive to undo. If a proprietorship is genuinely right for you, we will say so rather than sell you a company.",
  },
  {
    icon: FileCheck2,
    title: "A clear process",
    body: "You know what happens from the first conversation through to filing. Digital signatures, name approval, drafting and Registrar queries are handled by our team once your documents are in.",
  },
  {
    icon: Wallet,
    title: "Transparent communication",
    body: "Our professional fee and the expected government fees are set out before any filing begins, so you are not discovering charges midway through.",
  },
  {
    icon: MapPinned,
    title: "Gujarat-wide support",
    body: "Incorporation is filed online and digital signatures are issued through remote verification, so we work with businesses across all 33 districts from our base in Vadodara. We do not claim an office in every city.",
  },
  {
    icon: MessageSquare,
    title: "Human support",
    body: `You can reach the people doing the work. Call ${SITE.phone.display} during ${SITE.hours.display.toLowerCase()}, or email ${SITE.email}.`,
  },
  {
    icon: ShieldCheck,
    title: "Clear about what we are",
    body: "We are a private firm that prepares and files applications on your behalf. We are not a government body, and approval always rests with the relevant authority.",
  },
];

/**
 * Group brands (spec sections 6 and 26).
 * Only verified brands appear here. No invented subsidiaries, and no claim of a
 * holding-company structure, which is not legally confirmed.
 */
const GROUP_BRANDS = [
  {
    name: "Raulji Group",
    role: "Group identity",
    body: "The group platform connecting business services, registration support and growth-focused capabilities for entrepreneurs and businesses across Gujarat and India.",
    points: [
      "Business structure guidance before anything is filed",
      "Private Limited, LLP, Partnership and Proprietorship registration",
      "Local support across Gujarat's business markets",
    ],
    href: "/about/",
    cta: "About Raulji Group",
    external: false,
  },
  {
    name: "Raulji Technologies",
    role: "Technology brand",
    body: "Technology, software, AI and digital transformation solutions for businesses, delivered under the group's separate technology brand.",
    points: [
      "Software and web application development",
      "AI and digital transformation",
      "Cloud and technology consulting",
    ],
    href: SITE.technologies,
    cta: "Explore Raulji Technologies",
    external: true,
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(homeServiceListSchema(), faqSchema(HOME_FAQS))} />

      {/* 1. Corporate hero (spec sections 3, 4, 27) */}
      <section className="brand-gradient-soft relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Raulji Group
              </p>
              <h1 className="text-4xl leading-[1.1] md:text-5xl lg:text-6xl">{SITE.tagline}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Raulji Group brings business services, registration support and growth-focused
                solutions together under one group &mdash; helping entrepreneurs and businesses move
                from an idea to a stronger future.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact/"
                  className="brand-gradient inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-xl px-8 font-semibold text-primary-foreground shadow-elevated"
                >
                  Start Your Business
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#group"
                  className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 border-primary px-8 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Explore Our Group
                </Link>
                <a
                  href={telHref}
                  className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-xl px-6 font-semibold text-secondary hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  {SITE.phone.display}
                </a>
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                Private Limited &middot; LLP &middot; Partnership Firm &middot; Proprietorship
              </p>
            </div>

            <div className="relative mx-auto hidden w-full max-w-md md:block">
              <GroupDiagram className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Raulji Group of Companies (spec section 5) */}
      <Section id="group">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <SectionHeading
            eyebrow="Raulji Group of Companies"
            title="Building Businesses. Enabling Growth. Creating Long-Term Value."
            align="left"
          />
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Raulji Group is a group of businesses and brands focused on helping organizations
              start, operate and grow. The group brings business services, consulting and technology
              capabilities together under one identity, so a business does not have to assemble them
              from scratch.
            </p>
            <p>
              Today the group&rsquo;s main customer-facing service is business registration:
              helping founders choose the right structure and get it filed correctly. Technology,
              software and AI work is delivered separately, under{" "}
              <a
                href={SITE.technologies}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Raulji Technologies
              </a>
              .
            </p>
            <p className="text-base">
              We are based in {SITE.locality}, {SITE.region}, and work with businesses across the
              state. Raulji Group is a private business-services firm, not a government department.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Group brands (spec sections 6, 7, 26) */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Our Brands"
          title="One group, two distinct brands"
          lead="Each brand has its own focus. Knowing which one you need is usually the fastest way to get the right answer."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {GROUP_BRANDS.map((brand) => (
            <article
              key={brand.name}
              className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card sm:p-9"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {brand.role}
              </p>
              <h3 className="mt-3 text-2xl md:text-3xl">{brand.name}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{brand.body}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-secondary">
                {brand.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={brand.href}
                target={brand.external ? "_blank" : undefined}
                rel={brand.external ? "noopener noreferrer" : undefined}
                className="mt-8 inline-flex min-h-[3rem] items-center gap-2 self-start rounded-xl border-2 border-primary px-6 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                {brand.cta}
                {brand.external ? (
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </Link>
            </article>
          ))}
        </div>

        {/* Technology gateway only. Technology SEO stays on the technology site (spec section 7). */}
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg">Technology &amp; AI for Business Growth</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Explore technology, software, AI and digital transformation through Raulji
              Technologies.
            </p>
          </div>
          <a
            href={SITE.technologies}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[3rem] shrink-0 items-center justify-center gap-2 rounded-xl bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
          >
            Visit Raulji Technologies
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Section>

      {/* 4. Business registration (spec section 8) */}
      <Section id="services">
        <SectionHeading
          eyebrow="Start Your Business"
          title="Choose the Right Structure for Your Business"
          lead="The right business structure depends on ownership, liability, investment plans and how you intend to operate. Raulji Group helps you understand the options before you begin the registration process."
        />
        <ServiceCards />
      </Section>

      {/* 5. Why Raulji Group (spec section 10) */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why Raulji Group"
          title="Why Businesses Choose Raulji Group"
          lead="Registration is a process with a lot of small decisions in it. Our job is to make sure the ones that matter are made deliberately."
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item) => (
            <li key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. Business journey (spec section 11) */}
      <Section>
        <SectionHeading
          eyebrow="The Business Journey"
          title="From an idea to a business that keeps growing"
          lead="Raulji Group is not only processing a registration. We are helping entrepreneurs take the next business step."
        />
        <BusinessJourney />
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          {TIMELINE_DISCLAIMER}
        </p>
      </Section>

      {/* 7. Gujarat coverage (spec section 12) */}
      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Local Business Registration
            </p>
            <h2 className="text-3xl md:text-4xl">Business Registration Support Across Gujarat</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              From Ahmedabad, Vadodara and Surat to Godhra, Dahod, Anand, Bharuch and business
              communities across the state, Raulji Group helps entrepreneurs explore the right
              business structure and registration pathway.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Incorporation is filed online, so where you are in the state does not change the
              process or the timeline. What does change is the local context: what a ginning firm in
              Surendranagar needs is not what a software startup in Ahmedabad needs.
            </p>
            <Link
              href="/gujarat/"
              className="mt-7 inline-flex min-h-[3.25rem] items-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Explore Gujarat
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Coverage at a glance
            </p>
            <dl className="mt-5 space-y-4">
              {[
                ["All 33 districts", "Every district in Gujarat, with dedicated pages for the state's main business markets."],
                ["Filed online", "Company and LLP incorporation is filed with the Registrar of Companies through the MCA portal."],
                ["Remote verification", "Digital signatures are issued through video and Aadhaar-based verification, so no travel is needed."],
                ["Based in Vadodara", `${SITE.hours.display}. Call ${SITE.phone.display} or email ${SITE.email}.`],
              ].map(([term, desc]) => (
                <div key={term} className="border-l-2 border-primary/30 pl-4">
                  <dt className="font-semibold text-secondary">{term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* 8. Popular cities + location drawer (spec sections 13, 14, 15) */}
      <Section id="cities">
        <SectionHeading
          eyebrow="Popular Business Markets"
          title="Find Business Registration Support in Your City"
          lead="Each city page covers all four registration structures, with the local business context that tends to shape the decision."
        />
        <PopularCities />
      </Section>

      {/* 10. FAQ (spec section 36) */}
      <Section>
        <SectionHeading eyebrow="FAQs" title="Questions we are asked most" />
        <FaqAccordion faqs={HOME_FAQS} idPrefix="home-faq" />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Looking for something more specific? See the{" "}
          <Link href="/faqs/" className="font-semibold text-primary hover:underline">
            full FAQ library
          </Link>{" "}
          or the individual service pages for{" "}
          {SERVICES.map((service, i) => (
            <span key={service.slug}>
              <Link href={service.path} className="text-primary hover:underline">
                {service.shortName}
              </Link>
              {i < SERVICES.length - 1 ? (i === SERVICES.length - 2 ? " and " : ", ") : "."}
            </span>
          ))}
        </p>
      </Section>

    </>
  );
}
