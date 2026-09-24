import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Compass,
  FileText,
  Lightbulb,
  Plus,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { HighlightComparison, StructureFinder } from "@/components/shared/registration-tools";
import { getArticle } from "@/lib/blog";
import { POPULAR_CITIES } from "@/lib/city-index";
import { SERVICES, type FAQ } from "@/lib/services";
import { AUTHORITY_DISCLAIMER, LEADERSHIP, TIMELINE_DISCLAIMER, whatsappHref } from "@/lib/site";
import { STRUCTURE_META } from "@/lib/structure-meta";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  pillarServiceSchema,
  type Crumb,
} from "@/lib/schema";

/**
 * Business Registration pillar (master rule 13).
 *
 * This page's one job is to get a visitor to the right structure page. It is an
 * overview and a navigation hub, not a fifth service page, so it deliberately
 * does not repeat eligibility lists, document lists or pricing tables that the
 * four detail pages already carry. Duplicating them here would compete with
 * those pages in search and give the reader two places to check.
 *
 * Laid out to the "Raulji Business Registration" design (claude.ai/design);
 * the header and footer are the site-wide ones. The comparison table reads
 * from lib/comparison.ts, the site's reviewed wording, rather than the
 * design's shortened copy. The design's "Reviewed by Dharmendrasinh Raulji"
 * line on the structure finder is left out: no such review is on record.
 */

const PATH = "/services/business-registration/";

export const metadata = pageMeta({
  title: "Business Registration Services in India | Raulji Group",
  description:
    "Compare and register the four Indian business structures with Raulji Group: Private Limited, LLP, Partnership Firm and Proprietorship. MCA filing support.",
  path: PATH,
  ogHeadline: "Business Registration Services",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
  { name: "Business Registration", path: PATH },
];

/**
 * The four questions that settle the structure decision in practice.
 * Written as decision criteria rather than benefits, because a visitor on this
 * page has not chosen yet and a list of benefits per structure does not help
 * them compare.
 */
const DECIDING_FACTORS = [
  {
    title: "Who carries the liability",
    body: "In a proprietorship and a partnership firm there is no separation between the business and the people behind it, so business debts reach personal assets. A company and an LLP are separate legal entities, and liability is limited to what is unpaid on shares or agreed as contribution. This is usually the single most important difference.",
  },
  {
    title: "Whether you need to raise equity",
    body: "Only a company can issue equity shares. If priced funding rounds, convertible instruments or an ESOP pool are part of the plan, the Private Limited Company is the structure that supports them. An LLP or a firm would need to be converted first, which costs time and money.",
  },
  {
    title: "How much compliance you can carry",
    body: "A company has statutory audit from its first financial year and annual ROC filings regardless of turnover. An LLP's audit obligation starts above prescribed thresholds. A partnership firm and a proprietorship carry the least. Compliance is an annual running cost, not a one-time one.",
  },
  {
    title: "How many people are involved",
    body: "A proprietorship is one person by definition. A partnership firm, an LLP and a private company each need at least two. If ownership is likely to change hands, a company handles that through share transfer without disturbing the business itself.",
  },
];

/**
 * What the group actually does in a registration engagement.
 * Phrased as work performed, not outcomes promised (master rule 4).
 */
const WHAT_WE_HANDLE = [
  "Working out which structure fits before anything is filed",
  "Digital Signature Certificates for the proposed directors, partners or proprietor",
  "Name availability checking and the name reservation application",
  "Drafting the constitutional documents: MOA and AOA, LLP Agreement or partnership deed",
  "Preparing and filing the incorporation forms on the MCA portal",
  "Responding to Registrar queries and resubmission requests",
  "Handing over the certificate and the documents a bank will ask for",
];

const FAQS: FAQ[] = [
  {
    q: "Which business structure should I register?",
    a: "It depends mainly on four things: whether you need liability separated from your personal assets, whether you will raise equity funding, how much annual compliance you can carry, and how many people are involved. A Private Limited Company suits businesses planning to raise investment. An LLP suits professional or partner-run firms that want limited liability with less compliance. A partnership firm suits a small joint business operating on trust. A proprietorship suits one person testing an idea or running a modest business.",
  },
  {
    q: "Is Raulji Group part of the MCA or a government body?",
    a: "No. Raulji Group is a private business-services firm. We prepare and file applications with the Ministry of Corporate Affairs and other authorities on your behalf, and we provide MCA filing support, but we have no government affiliation and no influence over approvals. Every approval rests with the relevant authority.",
  },
  {
    q: "Can I register a business without visiting your office?",
    a: "Yes. Company and LLP incorporation is filed online through the MCA portal, and Digital Signature Certificates are issued using video and Aadhaar-based verification. Documents can be shared electronically. We are based in Vadodara and work with businesses across Gujarat and the rest of India on this basis.",
  },
  {
    q: "How long does business registration take?",
    a: "It varies by structure and by how complete the documentation is. A proprietorship's constituent registrations are the quickest, a partnership deed can be executed quickly, and company and LLP incorporation depends on name approval and Registrar processing. Each service page carries an estimate for that structure. " + TIMELINE_DISCLAIMER,
  },
  {
    q: "Can I change my business structure later?",
    a: "Yes, but it is work rather than a switch. Converting a firm or an LLP into a company, or changing between structures, means fresh registrations, a new PAN and TAN in most cases, new bank mandates, and moving contracts, licences and GST registration across. That is why the initial decision is worth getting right.",
  },
  {
    q: "What does registration cost in total?",
    a: "There are two separate amounts: our professional fee, and the government and statutory charges, which include stamp duty that varies by state and by capital. We publish our professional fee for Private Limited and LLP registration on their service pages. Government charges are quoted separately before filing, because they depend on your specific details. We do not describe any package as all inclusive.",
  },
];

const STAGES: { key: string; title: string; body: string; icon: LucideIcon }[] = [
  {
    key: "Idea",
    title: "You know what you want to build",
    body: "A conversation about the business, who is involved and whether outside investment is likely.",
    icon: Lightbulb,
  },
  {
    key: "Choose",
    title: "Pick the structure deliberately",
    body: "What each option means for liability, compliance and tax, with the expected cost before anything is filed.",
    icon: Compass,
  },
  {
    key: "Register",
    title: "Documents and filings handled",
    body: "Digital signatures, name approval, drafting and statutory filings, including any Registrar query.",
    icon: FileText,
  },
  {
    key: "Start",
    title: "Open for business",
    body: "Your certificate and registration documents, plus next steps such as opening a current account.",
    icon: CircleCheck,
  },
  {
    key: "Grow",
    title: "The structure keeps working",
    body: "As the business grows, the group helps with what the structure requires next.",
    icon: TrendingUp,
  },
];

const GUIDES = [
  "how-to-choose-business-structure-india-2026",
  "business-structure-guide-new-entrepreneurs-india",
  "documents-required-company-registration-india",
]
  .map((slug) => getArticle(slug))
  .filter((article): article is NonNullable<typeof article> => article !== null);

const EYEBROW =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]";
const EYEBROW_DARK =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]";
const H2 =
  "text-balance text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#122640] sm:text-4xl lg:text-[2.75rem]";
const H2_DARK =
  "text-balance text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.75rem]";
const CONTAINER = "mx-auto max-w-[1240px] px-5 sm:px-8";
const SECTION = "py-16 md:py-24 lg:py-28";
const LIFT =
  "transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-[#329fd2] hover:shadow-[0_24px_48px_-26px_rgba(18,38,64,0.4)]";

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
      {lead ? <p className="max-w-[30rem] text-base leading-[1.7] lg:justify-self-end">{lead}</p> : null}
    </div>
  );
}

export default function BusinessRegistrationPage() {
  const structures = SERVICES.map((service) => ({
    slug: service.slug,
    name: service.shortName,
    href: service.path,
  }));

  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          pillarServiceSchema({
            name: "Business Registration",
            description:
              "Registration and MCA filing support for the four Indian business structures: Private Limited Company, LLP, Partnership Firm and Proprietorship.",
            path: PATH,
            serviceType: "Business registration",
            offerings: SERVICES.map((service) => service.name),
          }),
          faqSchema(FAQS),
        )}
      />

      {/* Hero. */}
      <section
        aria-labelledby="br-h"
        className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[38.75rem] w-[38.75rem] rounded-full bg-[radial-gradient(circle,rgba(50,159,210,0.32),rgba(50,159,210,0)_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-52 -left-44 h-[26.25rem] w-[26.25rem] rounded-full bg-[radial-gradient(circle,rgba(26,124,176,0.28),rgba(26,124,176,0)_65%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(rgba(50,159,210,0.22)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(90deg,transparent_30%,#000_100%)]"
        />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 md:gap-14 md:pb-24 md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div className="flex min-w-0 flex-col gap-[1.375rem]">
              <p className={EYEBROW_DARK}>
                <Dash />
                Business Registration
              </p>
              <h1
                id="br-h"
                className="text-balance text-[2.375rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl xl:text-[4.125rem]"
              >
                Register the right business structure,{" "}
                <span className="text-[#7cc8ec]">the first time.</span>
              </h1>
              <p className="max-w-[36.25rem] text-pretty text-base leading-[1.75] text-[#c9d6e3] sm:text-lg">
                A business in India can be registered in four main forms. They differ in who carries
                the liability, how much annual compliance they attract, and whether the business can
                raise equity. We help you choose, then handle the filing end to end.
              </p>
              <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#finder"
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]"
                >
                  Find My Structure
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <TrackedLink
                  href="/contact/"
                  event="primary_cta_click"
                  params={{ label: "registration_hero" }}
                  className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#329fd2] hover:text-[#0c1a2d]"
                >
                  Talk to an Expert
                </TrackedLink>
              </div>
              <ul className="mt-1 flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-white">
                {["Structure advice first", "Fees confirmed in writing", "Filed online, anywhere in India"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CircleCheck className="h-4 w-4 text-[#329fd2]" strokeWidth={2.2} aria-hidden="true" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="flex min-w-0 flex-col gap-2.5">
              <p className="flex justify-between text-[0.6875rem] font-bold tracking-[0.14em] text-[#7cc8ec]">
                <span>MORE CONTROL &amp; SCALE</span>
                <span>SIMPLER</span>
              </p>
              {SERVICES.map((service) => {
                const meta = STRUCTURE_META[service.slug];
                const Icon = meta.icon;
                return (
                  <TrackedLink
                    key={service.slug}
                    href={service.path}
                    event="service_card_click"
                    params={{ label: "registration_hero", registration_type: service.shortName }}
                    className="group flex items-center gap-4 rounded-md border border-white/[0.12] bg-white/[0.04] px-[1.125rem] py-4 text-white transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:translate-x-1.5 hover:border-white hover:bg-white hover:text-[#122640]"
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#329fd2]/20">
                      <Icon className="h-5 w-5 text-[#7cc8ec]" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-bold">{service.shortName}</span>
                      <span className="block text-xs opacity-75">{meta.tag}</span>
                    </span>
                    <span className="flex gap-[3px]" role="img" aria-label={`Annual compliance ${meta.load} of 4`}>
                      {[1, 2, 3, 4].map((k) => (
                        <span
                          key={k}
                          className={
                            k <= meta.load
                              ? "h-[18px] w-1.5 rounded-sm bg-[#329fd2]"
                              : "h-[18px] w-1.5 rounded-sm bg-white/[0.18] group-hover:bg-[#122640]/15"
                          }
                        />
                      ))}
                    </span>
                  </TrackedLink>
                );
              })}
              <p className="text-xs text-[#c9d6e3]">Bars show annual compliance load.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The four structures, straight away. */}
      <section aria-labelledby="four-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="The four structures"
            id="four-h"
            title="Already know what you need? Go straight to it."
            lead="Each page covers eligibility, documents, the filing process and cost."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const meta = STRUCTURE_META[service.slug];
              const Icon = meta.icon;
              return (
                <li key={service.slug} className="flex">
                  <TrackedLink
                    href={service.path}
                    event="service_card_click"
                    params={{ label: "registration_cards", registration_type: service.shortName }}
                    className={`flex flex-1 flex-col gap-3.5 rounded-lg border border-[#e3e9ef] bg-white px-[1.625rem] py-[1.875rem] ${LIFT}`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5fb]">
                        <Icon className="h-[1.625rem] w-[1.625rem] text-[#122640]" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="rounded-[3px] bg-[#e8f5fb] px-2 py-1 text-xs font-bold text-[#1a7cb0]">
                        {meta.time}
                      </span>
                    </span>
                    <h3 className="text-[1.3125rem] font-extrabold text-[#122640]">{service.name}</h3>
                    <p className="flex-1 text-sm leading-[1.6]">{meta.body}</p>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t border-[#eef2f6] pt-3.5 text-[0.8125rem]">
                      <dt className="text-[#5b6778]">Liability</dt>
                      <dd className="font-semibold text-[#122640]">{meta.liability}</dd>
                      <dt className="text-[#5b6778]">Owners</dt>
                      <dd className="font-semibold text-[#122640]">{meta.owners}</dd>
                    </dl>
                    <span className="text-sm font-bold text-[#1a7cb0]">
                      Explore {service.shortName} <span aria-hidden="true">→</span>
                    </span>
                  </TrackedLink>
                </li>
              );
            })}
          </ul>
          <p className="text-[0.8125rem] text-[#5b6778]">
            Setup times are typical estimates with complete documents. {TIMELINE_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Structure finder. */}
      <section id="finder" aria-labelledby="fd-h" className={`scroll-mt-28 bg-[#122640] text-white ${SECTION}`}>
        <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW_DARK}>
              <Dash />
              Structure finder
            </p>
            <h2 id="fd-h" className={H2_DARK}>
              Three questions. One likely answer.
            </h2>
            <p className="text-base leading-[1.7] text-[#c9d6e3]">
              A quick starting point based on the factors that decide most structures. An advisor
              confirms it with you before anything is filed.
            </p>
            <p className="mt-2 border-t border-white/[0.14] pt-5 text-sm leading-[1.6] text-[#c9d6e3]">
              Not sure about an answer? That is a{" "}
              <Link
                href="/services/business-consulting/"
                className="font-semibold text-[#7cc8ec] hover:text-white hover:underline"
              >
                business consulting
              </Link>{" "}
              conversation rather than a filing question.
            </p>
          </div>
          <StructureFinder structures={structures} />
        </div>
      </section>

      {/* How to choose. */}
      <section aria-labelledby="dec-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="How to choose"
            id="dec-h"
            title="Four things that decide it."
            lead="Most structure decisions come down to these, in this order. If the first two point the same way, the choice is usually already made."
          />
          <ol className="grid gap-px overflow-hidden rounded-lg border border-[#e3e9ef] bg-[#e3e9ef] md:grid-cols-2 lg:grid-cols-4">
            {DECIDING_FACTORS.map((item, i) => (
              <li
                key={item.title}
                className="flex flex-col gap-3.5 bg-white px-7 py-8 transition-colors duration-300 hover:bg-[#f4fafd]"
              >
                <span
                  aria-hidden="true"
                  className="text-[2.75rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_#329fd2]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.1875rem] font-bold text-[#122640]">{item.title}</h3>
                <p className="text-sm leading-[1.7]">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Side by side. */}
      <section id="compare" aria-labelledby="cmp-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-8`}>
          <SectionHead
            eyebrow="Side by side"
            id="cmp-h"
            title="The four structures compared."
            lead="Liability, compliance load and whether equity can be issued are the differences that matter most in practice."
          />
          <HighlightComparison structures={structures} />
          <Link
            href="/compare/"
            className="inline-flex min-h-[2.75rem] items-center gap-1.5 self-start text-[0.9375rem] font-semibold text-[#1a7cb0] hover:underline"
          >
            Read the full comparison guide
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* How we work. */}
      <section aria-labelledby="proc-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-12`}>
          <SectionHead
            eyebrow="How we work"
            id="proc-h"
            title="From the first conversation to a registered business."
            lead="The same five stages apply whichever structure you choose. What changes is the filing in the middle."
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STAGES.map(({ key, title, body, icon: Icon }, i) => (
              <li
                key={key}
                className={`flex flex-col gap-3 rounded-lg border border-[#e3e9ef] bg-white px-[1.375rem] py-[1.625rem] ${LIFT}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.08em] text-[#1a7cb0]">STEP {i + 1}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#122640]">
                    <Icon className="h-[1.125rem] w-[1.125rem] text-white" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </div>
                <p className="text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-[#329fd2]">{key}</p>
                <h3 className="text-[1.0625rem] font-bold leading-[1.35] text-[#122640]">{title}</h3>
                <p className="text-sm leading-[1.65]">{body}</p>
              </li>
            ))}
          </ol>
          <p className="text-[0.8125rem] text-[#5b6778]">{TIMELINE_DISCLAIMER}</p>
        </div>
      </section>

      {/* What we handle. */}
      <section aria-labelledby="hdl-h" className={`bg-[#0c1a2d] text-white ${SECTION}`}>
        <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW_DARK}>
              <Dash />
              What we handle
            </p>
            <h2 id="hdl-h" className={H2_DARK}>
              Every filing that can go wrong, handled.
            </h2>
            <p className="text-base leading-[1.7] text-[#c9d6e3]">
              Registration involves a sequence of filings, each of which can be rejected for a
              formatting or documentation reason. This is the part we take on.
            </p>
            <p className="rounded-[4px] border border-white/[0.12] px-4 py-3.5 text-[0.8125rem] leading-[1.6] text-[#9fb3c8]">
              {AUTHORITY_DISCLAIMER}
            </p>
          </div>
          <ol className="flex min-w-0 flex-col border-t border-white/[0.14]">
            {WHAT_WE_HANDLE.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-[1.125rem] rounded-[4px] border-b border-white/[0.14] py-[1.125rem] text-base font-medium transition-[padding,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-[#329fd2]/[0.08] hover:pl-3.5"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-[1.5px] border-[#329fd2] text-xs font-bold text-[#7cc8ec]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where we work. Internal linking to Gujarat and city pages (master rule 19). */}
      <section aria-labelledby="guj-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              Where we work
            </p>
            <h2 id="guj-h" className={H2}>
              Registration support across Gujarat.
            </h2>
            <p className="text-base leading-[1.75]">
              Incorporation is filed through the MCA portal, so the process and the timeline are the
              same wherever you are. Our city pages cover the local business character of each
              market, which is the part that actually shapes the structure decision.
            </p>
            <TrackedLink
              href="/gujarat/"
              event="gujarat_page_click"
              params={{ label: "registration_where" }}
              className="inline-flex min-h-[3.25rem] items-center gap-2 self-start rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0] hover:shadow-[0_10px_22px_-10px_rgba(26,124,176,0.6)]"
            >
              Gujarat Coverage
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
          <ul className="grid min-w-0 grid-cols-2 content-start gap-2.5 sm:grid-cols-3">
            {POPULAR_CITIES.map((city) => (
              <li key={city.slug} className="flex min-w-0">
                <TrackedLink
                  href={`/${city.slug}/`}
                  event="city_page_click"
                  params={{ city: city.name, label: "registration_where" }}
                  className="flex flex-1 items-center justify-between gap-2 rounded-md border border-[#e3e9ef] px-3 py-4 text-sm sm:gap-2.5 sm:px-[1.125rem] sm:text-[0.9375rem] font-semibold text-[#122640] transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:border-[#122640] hover:bg-[#122640] hover:text-white"
                >
                  <span>{city.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs. */}
      <section aria-labelledby="faq-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              FAQs
            </p>
            <h2 id="faq-h" className={H2}>
              Business registration questions.
            </h2>
            <a
              href="#finder"
              className="mt-2 inline-flex min-h-[3.25rem] items-center gap-2 self-start rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0]"
            >
              Try the Structure Finder
              <ArrowRight className="h-4 w-4 -rotate-90" aria-hidden="true" />
            </a>
          </div>
          <div className="flex min-w-0 flex-col border-t border-[#dde4ec]">
            {FAQS.map((item) => (
              <details key={item.q} className="group border-b border-[#dde4ec]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-[4px] py-[1.375rem] transition-[padding,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-white hover:px-3.5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-semibold leading-[1.4] text-[#122640]">{item.q}</h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#cfd9e3] text-[#1a7cb0] transition-transform duration-200 group-open:rotate-45"
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

      {/* Guides. */}
      <section aria-labelledby="gd-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-8`}>
          <div className="flex flex-col gap-3.5">
            <p className={EYEBROW}>
              <Dash />
              From the blog
            </p>
            <h2 id="gd-h" className={H2}>
              Guides that go deeper.
            </h2>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {GUIDES.map((guide) => (
              <li key={guide.slug} className="flex">
                <Link
                  href={`/blog/${guide.slug}/`}
                  className={`flex flex-1 flex-col gap-3 rounded-lg border border-[#e3e9ef] bg-white px-[1.625rem] py-7 ${LIFT}`}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.04em] text-[#1a7cb0]">
                    {guide.category}
                  </span>
                  <span className="text-lg font-bold leading-[1.35] text-[#122640]">{guide.title}</span>
                  <span className="flex-1 text-sm leading-[1.6]">{guide.excerpt}</span>
                  <span className="text-sm font-bold text-[#1a7cb0]">
                    Read the guide <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA. */}
      <section aria-labelledby="cta-h" className="px-5 pb-16 sm:px-8 md:pb-24">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-stretch overflow-hidden rounded-lg bg-[#122640] text-white">
          <div className="relative min-h-[15rem] flex-[1_1_100%] bg-[#0c1a2d] sm:flex-[0_1_16.25rem]">
            <Image
              src={LEADERSHIP.chairman.photo}
              alt=""
              fill
              sizes="(min-width: 640px) 16.25rem, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <div className="flex min-w-0 flex-[1_1_27.5rem] flex-col justify-center gap-3.5 p-8 sm:p-12 lg:p-14">
          <h2
            id="cta-h"
            className="text-balance text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.5rem]"
          >
            Still deciding which structure to register?
          </h2>
          <p className="max-w-[35rem] text-base leading-[1.7] text-[#d5e0ea]">
            Tell us what the business does, who is involved and whether outside investment is
            likely. That is usually enough to narrow it to one option.
          </p>
          <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/contact/"
              event="primary_cta_click"
              params={{ label: "registration_footer_cta" }}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]"
            >
              Start Your Business
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href={whatsappHref(
                "Hello Raulji Group, I would like help choosing and registering a business structure.",
              )}
              external
              event="whatsapp_click"
              params={{ label: "registration_footer_cta" }}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#329fd2] hover:text-[#0c1a2d]"
            >
              WhatsApp an Expert
            </TrackedLink>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
