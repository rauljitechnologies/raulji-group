import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Layers,
  Settings2,
  TrendingUp,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ServiceCards } from "@/components/shared/service-cards";
import { PopularCities } from "@/components/shared/popular-cities";
import { LeadForm } from "@/components/forms/lead-form";
import { JsonLd } from "@/components/ui/json-ld";
import { BrandImage } from "@/components/ui/brand-image";
import type { ImageSlot } from "@/lib/images";
import { getArticle } from "@/lib/blog";
import { HOME_ANSWERS } from "@/lib/home-faqs";
import { SERVICES } from "@/lib/services";
import { SITE, telHref, mailHref } from "@/lib/site";
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

/**
 * The Group of Companies (master rule 6).
 *
 * Exactly two brands, because exactly two are verified. Raulji Consulting
 * Services is a business identity inside raulji.com and deliberately has no
 * invented domain of its own. Raulji Technologies keeps its own site and its
 * own service catalogue; this site introduces it and links out, nothing more.
 */
const GROUP_BRANDS: {
  name: string;
  role: string;
  body: string;
  points: string[];
  href: string;
  cta: string;
  external: boolean;
  image: ImageSlot;
}[] = [
  {
    name: "Raulji Consulting Services",
    role: "Business consulting and registration",
    body: "The consulting and business-services arm of the group. It works with founders and business owners on the decisions that come before paperwork: which structure fits, what the obligations will be, and what has to be in place before the business can grow.",
    points: [
      "Business consulting and structure advisory",
      "Company and business registration support",
      "MCA filing support for incorporation",
    ],
    href: "/services/business-consulting/",
    cta: "Explore Consulting",
    external: false,
    image: "consulting",
  },
  {
    name: "Raulji Technologies",
    role: "Technology, AI and digital solutions",
    body: "The group's technology brand, covering software, AI and digital transformation work. It operates on its own website, where the full technology service catalogue lives.",
    points: [
      "Software and web application development",
      "AI and digital transformation",
      "Cloud and technology consulting",
    ],
    href: SITE.technologies,
    cta: "Visit Raulji Technologies",
    external: true,
    image: "technologies",
  },
];

/**
 * The three guides linked from the homepage.
 *
 * Chosen by slug, not by date. A "latest three" list would eventually put the
 * insurance guide on a homepage whose whole argument is consulting and
 * registration, and the point of this band is to answer the question a visitor
 * arrives with: which structure, Private Limited or LLP, and what changes in
 * Gujarat. A slug that stops resolving is dropped rather than rendered dead.
 */
const HOME_GUIDES = [
  "how-to-choose-business-structure-india-2026",
  "private-limited-company-vs-llp",
  "starting-business-gujarat-registration-guide",
]
  .map((slug) => getArticle(slug))
  .filter((article): article is NonNullable<typeof article> => article !== null)
  .map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
  }));

/**
 * Why businesses work with Raulji Group.
 *
 * Four, not the six this carried before, and titled with the four headings the
 * design brief names. Six cards ran to two uneven rows and repeated the page:
 * one was the phone number, which the contact band below already gives, and
 * another was the Gujarat coverage, which has a whole section of its own.
 *
 * The bodies are unchanged in substance. Every one is something a reader can
 * hold us to afterwards, which is the only kind of reason that belongs here:
 * no client counts, no ratings, no awards, no success rates, no "No. 1" or
 * "most trusted" (master rule 13, brief section 32).
 */
const WHY_US = [
  {
    number: "01",
    title: "Clear guidance",
    body: "We start by understanding what you are building, because the wrong structure is expensive to undo. If a proprietorship is genuinely right for you, we will say so rather than sell you a company.",
  },
  {
    number: "02",
    title: "A structured process",
    body: "You know what happens from the first conversation through to filing. Digital signatures, name approval, drafting and Registrar queries are handled by our team once your documents are in.",
  },
  {
    number: "03",
    title: "Transparent communication",
    body: "Our professional fee and the expected government fees are set out before any filing begins, and enquiries are answered by the team handling the file rather than passed down a queue.",
  },
  {
    number: "04",
    title: "Business-focused support",
    body: "We are a private business-services firm that prepares and files applications on your behalf. We say what we can do, and we say where our remit ends: approval always rests with the relevant authority.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(homeServiceListSchema(), faqSchema(HOME_ANSWERS))} />

      {/*
        1. Hero. Text left, image right (brief section 15).

        The right-hand column used to be an inline SVG hidden below `md`, so a
        phone got a headline, a paragraph and two buttons on an empty field. It
        is now a real 16:9 image that renders at every width, and it is the only
        image on the page that takes `priority`, because it is the only one
        above the fold.

        No phone number here (master rule 8, brief section 15): the hero's job
        is positioning and one clear next step, and a phone number in it turns
        the page into an advertisement. Contact details sit in the header, the
        lead section and the footer, where people look for them.
      */}
      <section className="relative border-b border-border bg-muted pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="container-wide">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-primary">
                The Raulji Group
              </p>
              {/* Two-tone headline: the promise in navy, the payoff in brand
                  blue. The wording is fixed by master rule 4, and these are two
                  flat brand colours rather than a gradient, which the design
                  rules rule out. The second sentence is display-size, so the
                  blue clears the WCAG contrast bar for large text. */}
              <h1 className="text-[2.5rem] leading-[1.12] sm:text-5xl sm:leading-[1.1] lg:text-6xl lg:leading-[1.05]">
                <span className="block text-balance">{SITE.taglineParts[0]}</span>
                <span className="block text-balance text-primary">{SITE.taglineParts[1]}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Raulji Group is a consulting-focused business group. We help entrepreneurs and
                business owners make informed decisions, set up the right structure, and deal with
                the practical problems that come with running a business.
              </p>

              {/* Both hero CTAs report. The header, footer, mobile bar and CTA
                  banners already fired primary_cta_click, so the one CTA the
                  most people see was the only one missing from the funnel. */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  href="/services/"
                  event="service_card_click"
                  params={{ label: "home_hero_services" }}
                  className="brand-gradient inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-xl px-8 font-semibold text-primary-foreground shadow-soft"
                >
                  Explore Our Services
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href="/contact/"
                  event="primary_cta_click"
                  params={{ label: "home_hero" }}
                  className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 border-primary px-8 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Talk to Our Team
                </TrackedLink>
              </div>

              <p className="mt-9 border-l-2 border-primary/40 pl-4 text-sm font-medium text-secondary">
                Leadership Built on Relationships. Trust Built for the Long Term.
              </p>
            </div>

            <BrandImage
              slot="hero"
              sizes="(min-width: 1024px) 40rem, 100vw"
              aspect="aspect-[16/9]"
              priority
              className="shadow-card"
            />
          </div>
        </div>
      </section>

      {/*
        2. Our Group. Two large cards, each with its own visual.

        The two cards were previously identical slabs of text distinguished only
        by their heading, which is the one thing this section exists to prevent:
        a reader should be able to tell the consulting brand from the technology
        brand before reading a word.
      */}
      <Section id="group">
        <SectionHeading
          eyebrow="Our Group"
          title="One group, two distinct business focuses"
          lead="Knowing which part of the group you need is usually the fastest route to a useful answer."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {GROUP_BRANDS.map((brand) => (
            <article
              key={brand.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
            >
              <BrandImage
                slot={brand.image}
                sizes="(min-width: 1024px) 34rem, (min-width: 640px) 90vw, 100vw"
                aspect="aspect-[4/3]"
                className="rounded-none border-0 border-b border-border"
              />
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {brand.role}
                </p>
                <h3 className="mt-3 text-2xl md:text-[1.75rem]">{brand.name}</h3>
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
                {/* Only the outbound brand link is tracked (master rule 29 asks
                    for technology_click). The consulting link is ordinary
                    internal navigation and needs no event. */}
                {brand.external ? (
                  <TrackedLink
                    href={brand.href}
                    external
                    event="technology_click"
                    params={{ label: "home_brand_card" }}
                    className="mt-8 inline-flex min-h-[3rem] items-center gap-2 self-start rounded-xl border-2 border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {brand.cta}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                ) : (
                  <Link
                    href={brand.href}
                    className="mt-8 inline-flex min-h-[3rem] items-center gap-2 self-start rounded-xl border-2 border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {brand.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/*
        3. About Raulji Group. Image left, text right.

        Deliberately the mirror of the hero above and of the consulting band
        below, so the page alternates rather than running the same column order
        down its whole length (brief section 14).

        No quotation is attributed to anyone here. Inventing words for a real
        named person is the worst version of a fake claim, and the client has
        not supplied a statement (master rule 4 and 13). The Chairman's
        photograph and the Person structured data live on /about/, which is
        where the leadership section is.
      */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <BrandImage
            slot="office"
            sizes="(min-width: 1024px) 34rem, 100vw"
            aspect="aspect-[4/3]"
            className="order-2 shadow-card lg:order-1"
          />

          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              About Raulji Group
            </p>
            <h2 className="mt-4 text-[1.75rem] leading-[1.25] sm:text-3xl md:text-4xl lg:text-[2.5rem]">
              <span className="block">Leadership Built on Relationships.</span>
              <span className="block">Trust Built for the Long Term.</span>
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.75] text-secondary md:text-lg">
              Raulji Group works with people who are starting or running a business and need a
              straight answer about what to do next. That might be choosing between a company and
              an LLP, getting an incorporation filed correctly, or working out what a business
              needs in place before it takes on staff or investment.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Consulting sits at the centre of how the group works. Registration and filing are
              services we deliver, but the decision that comes first matters more, and it is the
              part most founders get advice on too late.
            </p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {(
                [
                  ["Based in", `${SITE.locality}, ${SITE.region}`],
                  ["Working across", "Gujarat and India"],
                  ["Leads with", "Business consulting"],
                ] as const
              ).map(([term, value]) => (
                <div key={term} className="bg-card px-5 py-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {term}
                  </dt>
                  <dd className="mt-1.5 font-semibold text-secondary">{value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/about/"
              className="mt-8 inline-flex min-h-[3rem] items-center gap-2 font-semibold text-primary hover:underline"
            >
              Learn About Raulji Group
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      {/*
        4. What we do. Consulting, which is the primary focus of the group
        (master rule 8), introduced rather than catalogued (master rule 7).
      */}
      <Section id="services">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What We Do
            </p>
            <h2 className="mt-4 text-[1.75rem] leading-[1.25] sm:text-3xl md:text-4xl lg:text-[2.5rem]">
              <span className="block">Clearer Decisions.</span>
              <span className="block">Stronger Business Direction.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Consulting is the primary focus of Raulji Group. Before anything is filed, it is
              worth being certain the structure matches what you are actually building.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We only take on consulting work in areas where we can actually help. Where a matter
              needs an advocate, a chartered accountant or a company secretary, we say so and
              coordinate rather than work outside our remit.
            </p>
            <Link
              href="/services/business-consulting/"
              className="mt-8 inline-flex min-h-[3.25rem] items-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore Business Consulting
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {[
              {
                icon: Compass,
                label: "Business strategy and planning",
                body: "Where the business is going, and what has to be true for it to get there.",
              },
              {
                icon: Layers,
                label: "Business structuring",
                body: "Choosing a structure, or changing one that no longer fits.",
              },
              {
                icon: TrendingUp,
                label: "Growth and expansion planning",
                body: "The order things should happen in, so a plan does not stall on something avoidable.",
              },
              {
                icon: Settings2,
                label: "Operational guidance",
                body: "How the business runs day to day, reviewed by people who have seen it done badly.",
              },
            ].map(({ icon: Icon, label, body }) => (
              <li key={label} className="bg-card px-6 py-7">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-4 font-semibold leading-snug text-secondary">{label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/*
        5. Business registration. Four cards, each with the visual that says how
        its structure differs from the other three (brief section 9).
      */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Business Registration"
          title="Choose the Right Structure for Your Business"
          lead="The right structure depends on ownership, liability, investment plans and how you intend to operate. Each page below covers eligibility, documents, process and cost."
        />
        <ServiceCards />
        <p className="mt-8 text-center">
          <Link
            href="/services/business-registration/"
            className="link-target font-semibold text-primary hover:underline"
          >
            Business Registration overview
          </Link>
          <span className="mx-3 text-border" aria-hidden="true">
            |
          </span>
          <Link href="/compare/" className="link-target font-semibold text-primary hover:underline">
            Compare all four structures
          </Link>
        </p>
        {/*
          Where the rules actually come from (brief sections 20 and 21).

          The page says several times that incorporation is filed through the
          MCA, and nothing on it pointed at the MCA. Naming the authority and
          linking to it is the difference between describing a government
          process and appearing to be its source. One outbound link to the
          primary regulator is worth more to an answer engine weighing whether
          to trust this page than another internal link would be.
        */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Company and LLP incorporation is filed with the Registrar of Companies under the Ministry
          of Corporate Affairs. Current forms, fees and rules are published by the MCA at{" "}
          <a
            href="https://www.mca.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            mca.gov.in
          </a>
          . Raulji Group prepares and files these applications on your behalf and is not a
          government body.
        </p>
      </Section>

      {/* 6. Why Raulji Group. Four reasons, numbered (brief section 10). */}
      <Section>
        <SectionHeading
          eyebrow="Why Raulji Group"
          title="Why Businesses Work With Us"
          lead="Setting up a business is a process with a lot of small decisions in it. Our job is to make sure the ones that matter are made deliberately."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((item) => (
            <li
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
            >
              <span aria-hidden="true" className="text-2xl font-bold tabular-nums text-primary/35">
                {item.number}
              </span>
              <h3 className="mt-4 text-lg leading-snug">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/*
        7. Gujarat. Large image, short text, eight markets and the drawer.

        Never a full city list on the homepage (master rule 7 and 18): the rest
        of the cities are one tap away behind "Explore All Locations".
      */}
      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <BrandImage
            slot="gujarat"
            sizes="(min-width: 1024px) 36rem, 100vw"
            aspect="aspect-[16/9]"
            className="shadow-card"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Where We Work
            </p>
            <h2 className="mt-4 text-[1.75rem] leading-[1.25] sm:text-3xl md:text-4xl">
              Business Support Across Gujarat
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Incorporation is filed online, so where you are does not change the process or the
              timeline. What changes is the local context: what a ginning firm in Surendranagar
              needs is not what a software startup in Ahmedabad needs.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Gujarat is the market we know best, and we work with businesses across the rest of
              India from our base in Vadodara.
            </p>
            <TrackedLink
              href="/gujarat/"
              event="gujarat_page_click"
              params={{ label: "home_coverage" }}
              className="mt-7 inline-flex min-h-[3.25rem] items-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Gujarat Coverage
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
        <div className="mt-10">
          <PopularCities />
        </div>
      </Section>

      {/*
        8. Insights.

        The homepage linked to every service pillar, the Gujarat hub and the
        comparison page, and to none of the nine guides. The guides are the part
        of this site that answers the question a visitor is usually still
        holding when they arrive.
      */}
      <Section>
        <SectionHeading
          eyebrow="Insights"
          title="Guides for people deciding what to register"
          lead="Written to answer the question rather than to rank for it. Each one names its sources."
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {HOME_GUIDES.map((guide) => (
            <li key={guide.slug} className="h-full">
              <Link
                href={`/blog/${guide.slug}/`}
                className="hover-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {guide.category}
                </p>
                <h3 className="mt-3 text-lg leading-snug">{guide.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {guide.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read the guide
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/blog/" className="link-target font-semibold text-primary hover:underline">
            All business guides
          </Link>
        </p>
      </Section>

      {/*
        9. Lead generation.

        The eight-question accordion that used to sit beside this form is gone.
        The design brief lists a large FAQ among the things that belong on a
        dedicated page rather than the homepage, and asks instead for short
        answer blocks. Three remain, rendered open rather than collapsed: an
        answer engine and a reader in a hurry both do better with the text on
        the page than behind a disclosure control. All eight still render on
        /faqs/, and the FAQPage schema here is built from exactly these three,
        so the markup matches what is visible.
      */}
      <Section tone="muted" id="enquiry">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Talk to Our Team
          </p>
          <h2 className="mt-4 text-[1.75rem] leading-[1.25] sm:text-3xl md:text-4xl">
            Tell us what you are trying to do
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A short description of your situation is enough to start. If you are not sure which
            structure or service you need, say so and we will work through it with you.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <BrandImage
              slot="meeting"
              sizes="(min-width: 1024px) 34rem, 100vw"
              aspect="aspect-[3/2]"
              className="shadow-card"
            />

            <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
              <div className="bg-card px-5 py-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Call
                </dt>
                <dd className="mt-1.5">
                  <a href={telHref} className="font-semibold text-primary hover:underline">
                    {SITE.phone.display}
                  </a>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {SITE.hours.display}
                  </span>
                </dd>
              </div>
              <div className="bg-card px-5 py-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </dt>
                <dd className="mt-1.5">
                  <a href={mailHref} className="font-semibold text-primary hover:underline">
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 space-y-5">
              {HOME_ANSWERS.map((answer) => (
                <div key={answer.q}>
                  <h3 className="text-base font-bold leading-snug text-secondary">{answer.q}</h3>
                  <p className="mt-1.5 border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground">
                    {answer.a}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              More questions are answered in the{" "}
              <Link href="/faqs/" className="font-semibold text-primary hover:underline">
                full FAQ library
              </Link>{" "}
              and on the pages for{" "}
              {SERVICES.map((service, i) => (
                <span key={service.slug}>
                  <Link href={service.path} className="text-primary hover:underline">
                    {service.shortName}
                  </Link>
                  {i < SERVICES.length - 1 ? (i === SERVICES.length - 2 ? " and " : ", ") : "."}
                </span>
              ))}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <LeadForm
              heading="Get business guidance"
              lead="Send us the details and a member of the Raulji Group team will get back to you."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
