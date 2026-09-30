import Link from "next/link";
import { ArrowRight, CircleCheck, MinusCircle } from "lucide-react";
import { BrandImage } from "@/components/ui/brand-image";
import { JsonLd } from "@/components/ui/json-ld";
import {
  PhotoFigure,
  ServiceHeroImage,
  resolvePhoto,
} from "@/components/ui/service-hero-image";
import { LeadershipFigure, ProcessVisual } from "@/components/pages/service-visuals";
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
  LIFT,
  SECTION,
  SectionHead,
  ServiceHero,
} from "@/components/pages/service-kit";
import type { ImageSlot } from "@/lib/images";
import { SERVICES } from "@/lib/services";
import { AUTHORITY_DISCLAIMER, SITE } from "@/lib/site";
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

/** The direct answer at the top of the page (service-page brief, section 17). */
const QUICK_ANSWER =
  "Business consulting at Raulji Group is advisory work on specific business decisions: which structure to use, what has to be in place before starting, what changes as the business grows, and whether existing paperwork still matches how the business operates. It starts with a conversation about your situation and ends with a plan you can act on. Where the plan involves registration or MCA filings, we carry them out.";

const PANEL: Record<string, ImageSlot> = {
  "pvt-registration": "pvtStructure",
  "llp-registration": "llpStructure",
  "partnership-registration": "partnershipStructure",
  "proprietorship-registration": "proprietorshipStructure",
};

const GUIDES = [
  "how-to-choose-business-structure-india-2026",
  "business-structure-guide-new-entrepreneurs-india",
  "common-business-registration-mistakes-india",
];

export default function BusinessConsultingPage() {
  const glance: [string, string][] = [
    ["Delivered by", "Raulji Consulting Services, part of Raulji Group"],
    ["Typical starting point", "A structure, planning or growth decision"],
    ["Fees", "Quoted after the first conversation, once scope is known"],
    ["Works with", "Founders, small and medium businesses, family businesses"],
    ["Based in", `${SITE.locality}, ${SITE.region}. Working across India.`],
  ];
  const trackParams = { service: "Business Consulting" };

  // Scenes from lib/service-photos.ts. Each renders only once its file exists,
  // and its section falls back to the text layout until then.
  const photo = {
    planning: resolvePhoto("business-consulting", "planning"),
    structure: resolvePhoto("business-consulting", "structure"),
    growth: resolvePhoto("business-consulting", "growth"),
    registration: resolvePhoto("business-consulting", "registration"),
    decision: resolvePhoto("business-consulting", "decision"),
  };
  const split = "(min-width: 1024px) 30rem, 100vw";

  return (
    <div className="bg-white text-[#3a4656]">
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

      <ServiceHero
        crumbs={crumbs}
        eyebrow="Raulji Consulting Services"
        title="Business Consulting Services"
        lead="Clearer decisions. Stronger business direction. Most of what we are asked is some version of one question: given what I am trying to build, what should I actually do next?"
        actions={
          <>
            <TrackedLink
              href="#enquiry"
              event="primary_cta_click"
              params={{ label: "consulting_hero", ...trackParams }}
              className={BTN_LIGHT}
            >
              Get Business Guidance
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <a href="#how" className={BTN_GHOST_DARK}>
              How We Work
            </a>
          </>
        }
        media={<ServiceHeroImage slug="business-consulting" />}
      />

      {/* Quick answer and the facts at a glance. */}
      <section aria-labelledby="what-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16`}>
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW}>
              <Dash />
              Quick answer
            </p>
            <h2 id="what-h" className={H2}>
              What does business consulting involve?
            </h2>
            <p className="text-[1.0625rem] leading-[1.8] text-[#26354a]">{QUICK_ANSWER}</p>
            <p className="leading-[1.7]">
              Consulting is the primary focus of Raulji Group. The answer usually depends on details
              a generic answer cannot account for, which is why it starts with a conversation rather
              than a package.
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
          {photo.planning ? <PhotoFigure photo={photo.planning} sizes={split} /> : null}
          <aside aria-labelledby="glance-h" className={`${CARD} h-fit p-7`}>
            <h3 id="glance-h" className="text-sm font-bold uppercase tracking-[0.1em] text-[#122640]">
              At a glance
            </h3>
            <dl className="mt-5 divide-y divide-[#eef2f6]">
              {glance.map(([term, value]) => (
                <div key={term} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="text-sm text-[#5b6778]">{term}</dt>
                  <dd className="text-[0.9375rem] font-semibold leading-[1.5] text-[#122640]">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
          </div>
        </div>
      </section>

      {/* What we advise on. */}
      <section aria-labelledby="areas-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="What we advise on"
            id="areas-h"
            title="Six kinds of question we are brought in on"
            lead="These are the areas we actually work in. If your question is outside them, we will say so rather than take the engagement."
          />
          {photo.structure ? (
            <PhotoFigure
              photo={photo.structure}
              sizes="(min-width: 1280px) 1176px, 100vw"
              aspect="aspect-[16/9] md:aspect-[21/9]"
            />
          ) : null}
          <ol className="grid gap-px overflow-hidden rounded-lg border border-[#e3e9ef] bg-[#e3e9ef] md:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area, i) => (
              <li key={area.title} className="flex flex-col gap-3 bg-white p-7">
                <span aria-hidden="true" className="text-sm font-bold text-[#329fd2]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-[#122640]">{area.title}</h3>
                <p className="flex-1 text-[0.9375rem] leading-[1.7]">{area.body}</p>
                <p className="border-l-2 border-[#329fd2] pl-3 text-sm italic text-[#122640]">
                  &ldquo;{area.question}&rdquo;
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it is for. */}
      <section aria-labelledby="who-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="Who it is for"
            id="who-h"
            title="Who we work with"
            lead="Owners making a decision that is expensive to reverse, whether the business is new or has been running for years."
          />
          <div
            className={
              photo.growth ? "grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10" : ""
            }
          >
          {photo.growth ? <PhotoFigure photo={photo.growth} sizes={split} aspect="aspect-[4/5]" /> : null}
          <ul className={`grid gap-5 sm:grid-cols-2 ${photo.growth ? "" : "lg:grid-cols-4"}`}>
            {WHO_ITS_FOR.map((item) => (
              <li key={item.title} className={`${CARD} flex flex-col gap-2.5 border-t-4 border-t-[#329fd2] p-6`}>
                <h3 className="text-lg font-bold text-[#122640]">{item.title}</h3>
                <p className="text-[0.9375rem] leading-[1.7]">{item.body}</p>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      {/* How an engagement runs. */}
      <section id="how" aria-labelledby="how-h" className={`scroll-mt-24 bg-[#0c1a2d] text-white ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-12`}>
          <SectionHead
            dark
            eyebrow="How we work"
            id="how-h"
            title="What an engagement looks like"
            lead="Five stages, though small questions often stop at the third. There is no obligation to continue past the first conversation."
          />
          <ProcessVisual steps={PROCESS} />
        </div>
      </section>

      {/* The boundary. */}
      <section aria-labelledby="scope-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 lg:gap-16`}>
          <div className="flex flex-col gap-4">
            <p className={EYEBROW}>
              <Dash />
              Scope
            </p>
            <h2 id="scope-h" className={H2}>
              What is outside our remit
            </h2>
            <p className="leading-[1.7]">
              Knowing where a firm stops is more useful than a list of everything it claims to do.
              Where a matter needs a different professional, we say so and coordinate rather than
              work beyond what we are.
            </p>
            {photo.decision ? <PhotoFigure photo={photo.decision} sizes={split} className="mt-4" /> : null}
          </div>
          <ul className="flex flex-col border-t border-[#e3e9ef]">
            {NOT_OUR_REMIT.map((item) => (
              <li key={item} className="flex gap-3 border-b border-[#e3e9ef] py-4 leading-[1.7]">
                <MinusCircle className="mt-1 h-4 w-4 flex-none text-[#5b6778]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where consulting leads (master rule 19). */}
      <section aria-labelledby="rel-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="Related services"
            id="rel-h"
            title="Where a consulting conversation usually leads"
            lead={
              <>
                Most engagements end in one of these structures. See the{" "}
                <Link href="/services/business-registration/" className="font-semibold text-[#1a7cb0] hover:underline">
                  business registration overview
                </Link>{" "}
                or{" "}
                <Link href="/compare/" className="font-semibold text-[#1a7cb0] hover:underline">
                  compare all four
                </Link>
                .
              </>
            }
          />
          {photo.registration ? (
            <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
              <PhotoFigure photo={photo.registration} sizes={split} />
              <p className="text-lg leading-[1.75] text-[#26354a]">
                When a conversation ends in a registration, the filing is handled by the same team
                that gave the advice, so the structure you agreed is the structure that gets filed.
              </p>
            </div>
          ) : null}
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <li key={service.slug} className="flex">
                <TrackedLink
                  href={service.path}
                  event="service_card_click"
                  params={{ label: "consulting_related", registration_type: service.shortName }}
                  className={`flex flex-1 flex-col overflow-hidden ${CARD} ${LIFT}`}
                >
                  <BrandImage
                    slot={PANEL[service.slug]}
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
                    aspect="aspect-[4/3]"
                    className="rounded-none border-0"
                  />
                  <span className="flex flex-1 flex-col gap-2 p-6">
                    <span className="text-lg font-bold leading-[1.3] text-[#122640]">{service.name}</span>
                    <span className="flex-1 text-sm leading-[1.6]">{service.cardBlurb}</span>
                    <span className="mt-2 text-sm font-bold text-[#1a7cb0]">
                      Explore Service <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </TrackedLink>
              </li>
            ))}
          </ul>
          <p className="text-[0.9375rem]">
            <CircleCheck className="mr-2 inline h-4 w-4 text-[#1a7cb0]" aria-hidden="true" />
            Consulting work across Gujarat:{" "}
            <TrackedLink
              href="/gujarat/"
              event="gujarat_page_click"
              params={{ label: "consulting_related" }}
              className="font-semibold text-[#1a7cb0] hover:underline"
            >
              business registration support in Gujarat
            </TrackedLink>
            .
          </p>
        </div>
      </section>

      {/* FAQs. */}
      <section aria-labelledby="faq-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16`}>
          <div className="flex min-w-0 flex-col gap-4">
            <p className={EYEBROW}>
              <Dash />
              FAQs
            </p>
            <h2 id="faq-h" className={H2}>
              Business consulting questions
            </h2>
          </div>
          <FaqList faqs={FAQS} />
        </div>
      </section>

      {/* Guides. */}
      <section aria-labelledby="gd-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="Related guides"
            id="gd-h"
            title="Read before the first conversation"
            lead="Guides on the decisions consulting most often covers."
          />
          <GuideCards slugs={GUIDES} />
        </div>
      </section>

      {/* Enquiry. */}
      <section id="enquiry" aria-labelledby="enq-h" className={`scroll-mt-24 bg-[#0c1a2d] text-white ${SECTION}`}>
        <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW_DARK}>
              <Dash />
              Talk to our team
            </p>
            <h2 id="enq-h" className={H2_DARK}>
              Start with the question you actually have
            </h2>
            <p className="text-lg leading-[1.7] text-[#c9d6e3]">
              Describe the situation in a few lines. If consulting is not what you need, we will
              point you to the page that is.
            </p>
            <LeadershipFigure className="mt-2" />
            <p className="rounded-[4px] border border-white/[0.12] px-4 py-3.5 text-[0.8125rem] leading-[1.6] text-[#9fb3c8]">
              {AUTHORITY_DISCLAIMER}
            </p>
          </div>
          <div className="text-[#3a4656]">
            <LeadForm
              defaultRegistrationType="Business Consulting"
              heading="Get business guidance"
              lead="Tell us about the business and what you are deciding. We will come back to you on the details you provide."
              className="rounded-lg border-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
