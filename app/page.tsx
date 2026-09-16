import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  FileCheck2,
  Layers,
  MapPinned,
  MessageSquare,
  Settings2,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Wallet,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ServiceCards } from "@/components/shared/service-cards";
import { PopularCities } from "@/components/shared/popular-cities";
import { GroupDiagram } from "@/components/shared/group-diagram";
import { LeadForm } from "@/components/forms/lead-form";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { HOME_FAQS } from "@/lib/home-faqs";
import { SERVICES } from "@/lib/services";
import { SITE, telHref, mailHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { faqSchema, graph, homeServiceListSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Raulji Group | Business Consulting & Solutions",
  description:
    "Raulji Group helps entrepreneurs and businesses with consulting, business registration and specialized services, with a focus on long-term growth.",
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
const GROUP_BRANDS = [
  {
    name: "Raulji Consulting Services",
    role: "Consulting and business services",
    body: "The consulting and business-services arm of the group. It works with founders and business owners on the decisions that come before paperwork: which structure fits, what the obligations will be, and what has to be in place before the business can grow.",
    points: [
      "Business consulting and structure advisory",
      "Company and business registration support",
      "MCA filing support for incorporation",
    ],
    href: "/services/business-consulting/",
    cta: "Explore Consulting",
    external: false,
  },
  {
    name: "Raulji Technologies",
    role: "Technology brand",
    body: "The group's technology brand, covering software, AI and digital transformation work. It operates on its own website, where the full technology service catalogue lives.",
    points: [
      "Software and web application development",
      "AI and digital transformation",
      "Cloud and technology consulting",
    ],
    href: SITE.technologies,
    cta: "Visit Raulji Technologies",
    external: true,
  },
];

/**
 * Why businesses choose Raulji Group (master rule 13).
 * Practical, checkable reasons only. No client counts, no ratings, no awards,
 * no "No. 1" or "most trusted" language.
 */
const WHY_US = [
  {
    icon: UserCheck,
    title: "Structure before filing",
    body: "We start by understanding what you are building, because the wrong structure is expensive to undo. If a proprietorship is genuinely right for you, we will say so rather than sell you a company.",
  },
  {
    icon: FileCheck2,
    title: "A process you can follow",
    body: "You know what happens from the first conversation through to filing. Digital signatures, name approval, drafting and Registrar queries are handled by our team once your documents are in.",
  },
  {
    icon: Wallet,
    title: "Fees stated upfront",
    body: "Our professional fee and the expected government fees are set out before any filing begins, so you are not discovering charges midway through.",
  },
  {
    icon: MapPinned,
    title: "Gujarat-wide, filed online",
    body: "Incorporation is filed through the MCA portal and digital signatures are issued through remote verification, so we work with businesses across all 33 districts from our base in Vadodara. We do not claim an office in every city.",
  },
  {
    icon: MessageSquare,
    title: "You reach the people doing the work",
    body: `Call ${SITE.phone.display} during ${SITE.hours.display.toLowerCase()}, or email ${SITE.email}. Enquiries are answered by the team handling the file.`,
  },
  {
    icon: ShieldCheck,
    title: "Clear about what we are",
    body: "We are a private business-services firm that prepares and files applications on your behalf. We are not a government body, and approval always rests with the relevant authority.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(homeServiceListSchema(), faqSchema(HOME_FAQS))} />

      {/*
        1. Hero.
        No phone number here (master rule 8): the hero's job is positioning and
        one clear next step, and a phone number in it turns the page into an
        advertisement. Contact details sit in the header, the lead section and
        the footer, where people look for them.
      */}
      <section className="relative border-b border-border bg-muted pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              {/* Plain eyebrow, not a pill. The bordered badge floating above
                  the headline was decoration rather than information, and it is
                  one of the stock marketing-template devices the brand rules
                  rule out (master rule 1). The wording stays because master
                  rule 4 specifies the eyebrow; only the ornament is gone, and
                  it now matches the eyebrow on every other section. */}
              <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-primary">
                Raulji Group
              </p>
              {/* Two-tone headline: the promise in navy, the payoff in brand
                  blue. The wording is untouched (master rule 4) and it is two
                  flat brand colours rather than a gradient, which the design
                  rules rule out. The second sentence is display-size, so the
                  blue clears the WCAG contrast bar for large text. */}
              <h1 className="text-4xl leading-[1.15] md:text-5xl md:leading-[1.12] lg:text-6xl lg:leading-[1.1]">
                <span className="block text-balance">{SITE.taglineParts[0]}</span>
                <span className="block text-balance text-primary">{SITE.taglineParts[1]}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Raulji Group is a consulting-focused business group. We help entrepreneurs and
                business owners make informed decisions, set up the right structure, and deal with
                the practical problems that come with running a business.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact/"
                  className="brand-gradient inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-xl px-8 font-semibold text-primary-foreground shadow-soft"
                >
                  Talk to Our Team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services/"
                  className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 border-primary px-8 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Explore Our Services
                </Link>
              </div>

              <p className="mt-9 border-l-2 border-primary/40 pl-4 text-sm font-medium text-secondary">
                Leadership Built on Relationships. Trust Built for the Long Term.
              </p>
            </div>

            <div className="relative mx-auto hidden w-full max-w-md md:block">
              <GroupDiagram className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Group of Companies (master rule 6). */}
      <Section id="group">
        <SectionHeading
          eyebrow="Our Group of Companies"
          title="Two brands, two distinct jobs"
          lead="Knowing which part of the group you need is usually the fastest route to a useful answer."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {GROUP_BRANDS.map((brand) => (
            <article
              key={brand.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 sm:p-9"
            >
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
              {/* Only the outbound brand link is tracked (master rule 29 asks for
                  technology_click). The consulting link is ordinary internal
                  navigation and needs no event. */}
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
            </article>
          ))}
        </div>
      </Section>

      {/*
        3. The Raulji Group.

        The Chairman's photograph used to anchor this band. The client moved it
        to /about/ (which already carries the leadership section), so this is
        now a two-column editorial block: argument on the left, supporting
        detail on the right, facts in a scannable strip underneath.

        The Person structured data moved with the photograph. Person markup on
        a page that no longer shows or names the person is a mismatch, and the
        about page already emits it.

        No quotation is attributed to the Chairman anywhere here. Inventing
        words for a real named person is the worst version of a fake claim, and
        the client has not supplied a statement (master rule 4 and 13).
      */}
      <Section tone="muted">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            The Raulji Group
          </p>
          {/* Two sentences, one per line from `sm` up. Left to wrap on its own
              the second sentence broke mid-phrase at some widths and sat on one
              line at others, so the lockup changed shape as the viewport moved.
              The leading is set once here rather than inherited from the size
              utility, which is what made the two lines crowd each other. */}
          <h2 className="mt-4 text-[1.75rem] leading-[1.3] sm:text-3xl sm:leading-[1.25] md:text-4xl lg:text-[2.5rem] lg:leading-[1.25]">
            <span className="block">Leadership Built on Relationships.</span>
            <span className="block">Trust Built for the Long Term.</span>
          </h2>
          <span
            aria-hidden="true"
            className="mt-7 block h-0.5 w-16 rounded-full bg-primary"
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* The opening paragraph is set larger and in the darker text colour,
              so the section has a clear entry point instead of an even wall.

              It was `text-xl` with `text-pretty`, which set it at 20px on a
              600px column — a short measure for that size — and left orphaned
              two-word lines at the end. Now 18px on a capped 34rem measure with
              open leading, which is the readable range for a lead paragraph. */}
          <p className="max-w-[34rem] text-[1.0625rem] leading-[1.75] text-secondary md:text-lg">
            Raulji Group works with people who are starting or running a business and need a
            straight answer about what to do next. That might be choosing between a company and
            an LLP, getting an incorporation filed correctly, or working out what a business needs
            in place before it takes on staff or investment.
          </p>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Consulting sits at the centre of how the group works. Registration and filing are
              services we deliver, but the decision that comes first matters more, and it is the
              part most founders get advice on too late.
            </p>
            <p>
              Raulji Group is a private business-services firm, not a government department. We
              say what we can do, and we say where our remit ends.
            </p>
          </div>
        </div>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {(
            [
              ["Based in", `${SITE.locality}, ${SITE.region}`],
              ["Working across", "Gujarat and the rest of India"],
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
          More about Raulji Group
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Section>

      {/*
        4. Business services overview. Introduces, does not catalogue (master
        rule 7).

        Rebuilt as a two-column block. It used to be a centred heading and lead
        sitting above left-aligned paragraphs and a vertically-centred tick
        list, so three different alignments stacked on top of each other and the
        list box floated in its own column with uneven space above and below.

        Now the argument runs down one column and the four consulting areas sit
        in a hairline grid in the other, the same device the group facts strip
        above uses. The four areas are unchanged: they are what the client has
        confirmed the group does, and nothing is added to fill the grid.
      */}
      <Section id="services">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Business Consulting
            </p>
            <h2 className="mt-4 text-[1.75rem] leading-[1.3] sm:text-3xl sm:leading-[1.25] md:text-4xl lg:text-[2.5rem] lg:leading-[1.25]">
              <span className="block">Clearer Decisions.</span>
              <span className="block">Stronger Business Direction.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Consulting is the primary focus of Raulji Group. Before anything is filed, it is
              worth being certain the structure matches what you are actually building.
            </p>
            <Link
              href="/services/business-consulting/"
              className="mt-8 inline-flex min-h-[3.25rem] items-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore Business Consulting
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Our consulting work is practical rather than theoretical. It covers business
                planning and structuring, reviewing how a business currently operates, and working
                out the order in which things should happen so that a growth plan does not stall on
                something avoidable.
              </p>
              <p>
                We only take on consulting work in areas where we can actually help. Where a matter
                needs an advocate, a chartered accountant or a company secretary, we say so and
                coordinate rather than work outside our remit.
              </p>
            </div>

            <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {[
                { icon: Compass, label: "Business strategy and planning" },
                { icon: Layers, label: "Business structuring and restructuring" },
                { icon: TrendingUp, label: "Growth and expansion planning" },
                { icon: Settings2, label: "Operational and process guidance" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3 bg-card px-5 py-5">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm font-semibold leading-snug text-secondary">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-14">
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
        </div>
      </Section>

      {/* 5. Why Raulji Group (master rule 13). */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why Raulji Group"
          title="Why Businesses Work With Us"
          lead="Setting up a business is a process with a lot of small decisions in it. Our job is to make sure the ones that matter are made deliberately."
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

      {/* 6. Gujarat and city entry point. Eight markets plus a drawer, never a
          full city list on the homepage (master rule 7 and 18). */}
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Where We Work
            </p>
            <h2 className="mt-4 text-[1.75rem] leading-[1.3] sm:text-3xl sm:leading-[1.25] md:text-4xl md:leading-[1.2]">
              India-wide, With Deep Coverage in Gujarat
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Incorporation is filed online, so where you are does not change the process or the
              timeline. What does change is the local context: what a ginning firm in Surendranagar
              needs is not what a software startup in Ahmedabad needs.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Gujarat is the market we know best. Our city pages cover the local business character
              of each place alongside the four registration structures.
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
          <PopularCities />
        </div>
      </Section>

      {/*
        7. Lead generation with the FAQs beside it (master rule 8 and 22).

        The FAQs used to be a separate full-width section below this one, which
        left the enquiry column with a tall empty run under the contact details
        while the form ran on beside it. Putting the two together fills that
        column with the content people actually read before they enquire, and
        the questions stay visible, so the FAQPage schema still matches what is
        on the page.

        The form is ordered first on small screens: stacked, the FAQs would
        otherwise push it a long way down the page.
      */}
      <Section tone="muted" id="enquiry">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Talk to Our Team
          </p>
          <h2 className="mt-4 text-[1.75rem] leading-[1.3] sm:text-3xl sm:leading-[1.25] md:text-4xl md:leading-[1.2]">
            Tell us what you are trying to do
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A short description of your situation is enough to start. If you are not sure which
            structure or service you need, say so and we will work through it with you.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
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
              <div className="bg-card px-5 py-4 sm:col-span-2 lg:col-span-1">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Based in
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {SITE.locality}, {SITE.region}. We work with businesses across the state and the
                  rest of India.
                </dd>
              </div>
            </dl>

            <h3 className="mt-10 text-xl">Questions we are asked most</h3>
            <FaqAccordion faqs={HOME_FAQS} idPrefix="home-faq" className="mt-4 max-w-none" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Looking for something more specific? See the{" "}
              <Link href="/faqs/" className="font-semibold text-primary hover:underline">
                full FAQ library
              </Link>{" "}
              or the individual pages for{" "}
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
