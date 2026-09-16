import Link from "next/link";
import { ArrowRight, CheckCircle2, MinusCircle } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { LeadForm } from "@/components/forms/lead-form";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  pillarServiceSchema,
  type Crumb,
} from "@/lib/schema";
import type { FAQ } from "@/lib/services";

/**
 * Business Consulting pillar (master rule 8 and 12).
 *
 * This is the primary positioning page for the group, so it has to do two jobs
 * that usually pull against each other: rank for consulting intent, and be
 * honest about a service whose scope is genuinely bounded. The approach here is
 * to describe the work concretely and to state the boundary explicitly, rather
 * than use the interchangeable consulting language that makes these pages
 * indistinguishable from one another.
 *
 * Deliberately absent: client counts, engagement numbers, sector "expertise"
 * claims, methodology trademarks, and any published fee. Consulting fees depend
 * on scope and no figure is verified, so none is shown.
 */

const PATH = "/services/business-consulting/";

export const metadata = pageMeta({
  title: "Business Consulting Services | Raulji Group",
  description:
    "Business consulting from Raulji Group: structure, planning, growth and operational guidance for founders and business owners in Gujarat and across India.",
  path: PATH,
  ogHeadline: "Business Consulting Services",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
  { name: "Business Consulting", path: PATH },
];

/**
 * What the consulting work actually covers.
 * Each area names the decision it helps with, because "strategy consulting" on
 * its own tells a reader nothing about whether to call.
 */
const AREAS = [
  {
    title: "Business structure and restructuring",
    body: "Whether to operate as a proprietorship, a partnership firm, an LLP or a company, and when an existing business has outgrown the structure it started with. This is the decision that is most expensive to reverse later, because changing structure usually means fresh registrations, new bank mandates and moving contracts across.",
    question: "Am I set up in the right form for what I am now doing?",
  },
  {
    title: "Business planning",
    body: "Turning an intention into a plan with an order to it: what has to be registered, what has to be in place before you take on customers or staff, what the running obligations will be, and roughly what each stage costs. Useful before you commit money, and often before you commit to a structure.",
    question: "What has to happen, and in what order?",
  },
  {
    title: "Growth and expansion planning",
    body: "What changes when a business adds a location, a second line of activity, a partner or outside investment. The practical questions are usually about ownership, control, documentation and which obligations get triggered at what size.",
    question: "What breaks if we grow, and what should we fix first?",
  },
  {
    title: "Operational and process guidance",
    body: "Reviewing how a business currently runs day to day, where records and approvals are being kept informally, and which of those gaps will cause a real problem later, at a bank, in a tender, in a due-diligence exercise or at an assessment.",
    question: "Where are we exposed because something is only in someone's head?",
  },
  {
    title: "Review of existing registrations and documentation",
    body: "Looking over what a business already holds, registrations, licences, deeds and agreements, to identify what is missing, what has lapsed, and what does not match how the business actually operates. Mismatches between paperwork and reality are common and easy to fix early.",
    question: "Does our paperwork still describe our actual business?",
  },
  {
    title: "Business advisory for owners",
    body: "Working through a specific decision with someone outside the business: a partner joining or leaving, splitting activities across entities, formalising an arrangement that has been informal, or deciding whether a plan is worth the compliance it brings with it.",
    question: "We have a decision to make and want a second view on it.",
  },
];

const WHO_ITS_FOR = [
  {
    title: "First-time founders",
    body: "People who know what they want to build but have not set up a business before, and want the structure decision made once rather than corrected later.",
  },
  {
    title: "Existing small and medium businesses",
    body: "Businesses that have been running for a while, often successfully, on arrangements that were never formalised, and now need the paperwork to catch up with the operation.",
  },
  {
    title: "Family businesses",
    body: "Businesses where ownership, roles and money have historically been handled by understanding rather than by document, and where the next generation or a new partner makes that untenable.",
  },
  {
    title: "Businesses preparing for a change",
    body: "Owners about to take on investment, add a partner, open a second location or separate one activity from another, who want to understand the consequences before committing.",
  },
];

const PROCESS = [
  {
    title: "First conversation",
    body: "You tell us what the business does now and what you are trying to do next. This is a conversation, not a form. It is usually enough to establish whether we are the right people to help and what the actual question is, which is not always the one you called about.",
  },
  {
    title: "Understanding the current position",
    body: "We look at what already exists: the structure, registrations, key documents and how the business is actually operating. Nothing useful can be recommended without this, and it is where most of the surprises turn up.",
  },
  {
    title: "Options, with consequences",
    body: "We set out the routes available and what each one costs you, in money, in compliance load and in flexibility given up. We will tell you when the simpler option is the better one.",
  },
  {
    title: "A plan you can act on",
    body: "An order of work with the decisions marked, so you know what has to be settled by you and what we can carry out. Where a step needs a chartered accountant, a company secretary or an advocate, it is named as such.",
  },
  {
    title: "Carrying it out",
    body: "Where the plan involves work we do, such as registration or MCA filings, we handle it. Where it does not, we hand over something specific enough for someone else to act on.",
  },
];

/**
 * The boundary, stated plainly (master rule 4 and 12).
 * A consulting page that claims no limits is the least credible kind, and this
 * section prevents enquiries we would have to turn away.
 */
const NOT_OUR_REMIT = [
  "We are not a law firm. We do not appear before courts or tribunals and do not provide legal representation.",
  "We are not auditors and do not issue audit reports, certifications or valuations.",
  "We do not give investment, securities or insurance advice, and we do not recommend financial products.",
  "We are not a government department and have no affiliation with the Ministry of Corporate Affairs or any other authority.",
  "We do not guarantee outcomes that rest with an authority, a bank, a lender or an investor.",
];

const FAQS: FAQ[] = [
  {
    q: "What does business consulting actually mean at Raulji Group?",
    a: "It means working through a specific business decision with you and then setting out what to do about it. In practice most engagements start with one of four questions: which structure to use, what has to be in place before starting, what changes if the business grows, or whether the existing paperwork still matches the business. It is advisory work on practical questions, not a generic management programme.",
  },
  {
    q: "Do I need consulting if I only want a company registered?",
    a: "Not necessarily. If you already know the structure you want and why, you can go straight to the relevant registration page and we will file it. Consulting is worth the time when the structure decision is genuinely open, when you have partners or investors involved, or when you are changing something about a business that already exists.",
  },
  {
    q: "How much does business consulting cost?",
    a: "It depends on scope, because a single structure decision and a full review of an operating business are not comparable pieces of work. We quote after the first conversation, once we know what is actually involved. We do not publish a standard consulting fee, because any figure we published would be wrong for most enquiries.",
  },
  {
    q: "Will you tell me not to register a company?",
    a: "Yes, when that is the right answer. A company carries statutory audit from its first financial year and annual ROC filings regardless of turnover. For a business that is one person with modest revenue and no plan to raise investment, that cost often buys nothing. We would rather say so than sell a structure you will want to unwind.",
  },
  {
    q: "Do you work with businesses outside Gujarat?",
    a: "Yes. Consulting conversations happen by phone and video, and incorporation and MCA filings are online, so location does not limit the work. We are based in Vadodara and our published city pages cover Gujarat, which is the market we know in the most detail.",
  },
  {
    q: "What should I have ready for the first conversation?",
    a: "Nothing formal. It helps if you can describe what the business does or will do, who is involved and in what proportion, and what prompted the enquiry now. If the business already exists, knowing its current structure and which registrations it holds saves a round of questions.",
  },
];

export default function BusinessConsultingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          pillarServiceSchema({
            name: "Business Consulting",
            description:
              "Advisory work for founders and business owners on business structure, planning, growth and operations, delivered by Raulji Consulting Services.",
            path: PATH,
            serviceType: "Business consulting",
            offerings: AREAS.map((area) => area.title),
          }),
          faqSchema(FAQS),
        )}
      />
      <Breadcrumbs crumbs={crumbs} />

      {/* Hero. Text-led, with the positioning line carried as a standfirst
          rather than as decorative oversized type. */}
      <section className="pb-14 pt-8 md:pb-16">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Raulji Consulting Services
              </p>
              <h1 className="mt-3 text-balance text-3xl leading-tight md:text-4xl lg:text-5xl">
                Business Consulting Services
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-xl leading-relaxed text-secondary">
                Clearer decisions. Stronger business direction.
              </p>
              <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                Consulting is the primary focus of Raulji Group. Most of what we are asked is some
                version of the same question: given what I am trying to build, what should I actually
                do next? The answer usually depends on details a generic answer cannot account for,
                which is why it starts with a conversation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#enquiry"
                  className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-soft"
                >
                  Discuss Your Business
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services/business-registration/"
                  className="inline-flex min-h-[3.25rem] items-center justify-center rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Business Registration
                </Link>
              </div>
            </div>

            <dl className="rounded-2xl border border-border bg-muted p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                At a glance
              </p>
              <div className="mt-5 space-y-4 text-sm">
                {[
                  ["Delivered by", "Raulji Consulting Services, part of Raulji Group"],
                  ["Typical starting point", "A structure, planning or growth decision"],
                  ["Fees", "Quoted after the first conversation, once scope is known"],
                  ["Works with", "Founders, small and medium businesses, family businesses"],
                  ["Based in", `${SITE.locality}, ${SITE.region}. Working across India.`],
                ].map(([term, desc]) => (
                  <div key={term} className="border-l-2 border-primary/30 pl-4">
                    <dt className="font-semibold text-secondary">{term}</dt>
                    <dd className="mt-0.5 leading-relaxed text-muted-foreground">{desc}</dd>
                  </div>
                ))}
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* What we advise on. A numbered reference list rather than icon cards, so
          it does not repeat the homepage's visual pattern. */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="What we advise on"
          title="Six kinds of question we are usually brought in on"
          lead="These are the areas we actually work in. If your question is outside them, we will say so rather than take the engagement."
          align="left"
        />
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {AREAS.map((area, i) => (
            <li key={area.title} className="bg-card p-6 sm:p-7">
              <p className="text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg">{area.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{area.body}</p>
              <p className="mt-4 border-l-2 border-primary/40 pl-3 text-sm italic text-secondary">
                &ldquo;{area.question}&rdquo;
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Who it is for. */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading eyebrow="Who it is for" title="Who we work with" align="left" />
          <div className="divide-y divide-border">
            {WHO_ITS_FOR.map((item) => (
              <div key={item.title} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How the work runs. */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="How we work"
          title="What an engagement looks like"
          lead="Five stages, though small questions often stop at the third. There is no obligation to continue past the first conversation."
          align="left"
        />
        <ol className="space-y-px overflow-hidden rounded-2xl border border-border bg-border">
          {PROCESS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 bg-card p-6 sm:flex-row sm:gap-6 sm:p-7">
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-primary"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* The boundary. */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Scope"
              title="What is outside our remit"
              lead="Knowing where a firm stops is more useful than a list of everything it claims to do. Where a matter needs a different professional, we say so and coordinate rather than work beyond what we are."
              align="left"
            />
          </div>
          <ul className="space-y-4">
            {NOT_OUR_REMIT.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                <MinusCircle className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Where consulting leads. Internal linking (master rule 19). */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Related services"
          title="Where a consulting conversation usually leads"
          lead="Most engagements end in one of these, and you can go straight to any of them if you already know what you need."
          align="left"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={service.path}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <h3 className="text-base font-bold text-secondary">{service.shortName}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.cardBlurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[
            ["Business Registration overview", "/services/business-registration/"],
            ["Compare all four structures", "/compare/"],
            ["Business registration across Gujarat", "/gujarat/"],
            ["All services", "/services/"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className="link-target gap-1.5 font-semibold text-primary hover:underline"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Lead generation, on the page rather than only at the foot. */}
      <Section id="enquiry">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Talk to our team"
              title="Start with the question you actually have"
              lead="Describe the situation in a few lines. If consulting is not what you need, we will point you to the page that is."
              align="left"
            />
          </div>
          <LeadForm
            defaultRegistrationType="Business Consulting"
            heading="Get business guidance"
            lead="Tell us about the business and what you are deciding. We will come back to you on the details you provide."
          />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="FAQs" title="Business consulting questions" />
        <FaqAccordion faqs={FAQS} idPrefix="consulting-faq" />
      </Section>

      <CtaBanner
        title="Not sure which service you need?"
        body="Tell us what the business is doing and what you are trying to decide. We will tell you which part of this actually applies to you."
        registrationType="Business Consulting"
      />
    </>
  );
}
