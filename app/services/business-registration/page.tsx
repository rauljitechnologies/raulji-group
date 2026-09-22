import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BrandImage } from "@/components/ui/brand-image";
import { JsonLd } from "@/components/ui/json-ld";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ServiceCards } from "@/components/shared/service-cards";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { BusinessJourney } from "@/components/shared/business-journey";
import { PopularCities } from "@/components/shared/popular-cities";
import { CtaBanner } from "@/components/shared/cta-banner";
import { GuideLinks } from "@/components/blog/guide-links";
import { SERVICES, type FAQ } from "@/lib/services";
import { AUTHORITY_DISCLAIMER, TIMELINE_DISCLAIMER } from "@/lib/site";
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

export default function BusinessRegistrationPage() {
  return (
    <>
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
      <Breadcrumbs crumbs={crumbs} />

      <section className="pb-12 pt-8">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Business Registration
            </p>
            <h1 className="mt-3 text-balance text-3xl leading-tight md:text-4xl lg:text-5xl">
              Business Registration Services in India
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              A business in India can be registered in four main forms. They differ in who carries
              the liability, how much annual compliance they attract, and whether the business can
              raise equity. This page covers how to choose between them and what registration
              involves. The detail for each one is on its own page.
            </p>
          </div>

          <BrandImage
            slot="registration"
            sizes="(min-width: 1024px) 76rem, 100vw"
            aspect="aspect-[21/9]"
            className="mt-10"
          />
        </div>
      </section>

      {/* The four structures, straight away. A visitor who already knows what
          they want should not have to read an overview first. The heading is not
          decoration: ServiceCards renders h3, so without an h2 here the page
          would skip a heading level. */}
      <Section className="pt-0">
        <h2 className="text-2xl md:text-3xl">The four structures</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          If you already know which one you need, go straight to it. Each page covers eligibility,
          documents, the filing process and cost.
        </p>
        <div className="mt-8">
          <ServiceCards />
        </div>
      </Section>

      {/* How to choose. */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="How to choose"
          title="Four things that decide it"
          lead="Most structure decisions come down to these, in this order. If the first two point the same way, the choice is usually already made."
          align="left"
        />
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {DECIDING_FACTORS.map((item, i) => (
            <li key={item.title} className="bg-card p-6 sm:p-7">
              <p className="text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg">{item.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          If the answer is not obvious from the four above, that is a consulting conversation rather
          than a filing question.{" "}
          <Link
            href="/services/business-consulting/"
            className="font-semibold text-primary hover:underline"
          >
            Business consulting
          </Link>{" "}
          covers the structure decision in more depth.
        </p>
      </Section>

      {/* Side by side. */}
      <Section>
        <SectionHeading
          title="The four structures side by side"
          lead="Liability, compliance load and whether equity can be issued are the differences that matter most in practice."
        />
        <ComparisonTable />
        <p className="mt-8 text-center">
          <Link href="/compare/" className="link-target font-semibold text-primary hover:underline">
            Read the full comparison guide
          </Link>
        </p>
      </Section>

      {/* What the process looks like. */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="How we work"
          title="From the first conversation to a registered business"
          lead="The same five stages apply whichever structure you choose. What changes is the filing in the middle."
        />
        <BusinessJourney />
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          {TIMELINE_DISCLAIMER}
        </p>
      </Section>

      {/* Scope of work. */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What we handle"
              title="What Raulji Group does"
              lead="Registration involves a sequence of filings, each of which can be rejected for a formatting or documentation reason. This is the part we take on."
              align="left"
            />
          </div>
          <div>
            <ul className="space-y-3.5">
              {WHAT_WE_HANDLE.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-secondary">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 rounded-2xl border border-border bg-muted p-5 text-sm leading-relaxed text-muted-foreground">
              {AUTHORITY_DISCLAIMER}
            </p>
          </div>
        </div>
      </Section>

      {/* Location entry point. Internal linking to Gujarat and city pages
          (master rule 19). */}
      <Section tone="muted">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Where we work
            </p>
            <h2 className="text-3xl md:text-4xl">Registration support across Gujarat</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Incorporation is filed through the MCA portal, so the process and the timeline are the
              same wherever you are. Our city pages cover the local business character of each
              market, which is the part that actually shapes the structure decision.
            </p>
            <Link
              href="/gujarat/"
              className="mt-7 inline-flex min-h-[3.25rem] items-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Gujarat Coverage
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <PopularCities />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQs" title="Business registration questions" />
        <FaqAccordion faqs={FAQS} idPrefix="registration-faq" />
      </Section>

      <GuideLinks
        slugs={[
          "how-to-choose-business-structure-india-2026",
          "business-structure-guide-new-entrepreneurs-india",
          "documents-required-company-registration-india",
        ]}
        title="Guides that go deeper than this page"
        lead="Longer reads on the decision itself, the full four-way comparison, and the paperwork it takes."
      />

      <CtaBanner
        title="Still deciding which structure to register?"
        body="Tell us what the business does, who is involved and whether outside investment is likely. That is usually enough to narrow it to one option."
      />
    </>
  );
}
