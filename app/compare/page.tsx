import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { CtaBanner } from "@/components/shared/cta-banner";
import { LeadForm } from "@/components/forms/lead-form";
import { SERVICES, type FAQ } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, type Crumb } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Pvt Ltd vs LLP vs Partnership vs Proprietorship | Raulji Group",
  description:
    "Compare Private Limited Company, LLP, Partnership Firm and Proprietorship on liability, compliance, tax and funding before you register.",
  path: "/compare/",
  ogHeadline: "Choose the Right Business Structure",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Compare Business Structures", path: "/compare/" },
];

const DECISION_POINTS = [
  {
    q: "Will you have co-owners?",
    a: "If you are the only owner, a proprietorship is the only one of the four open to you without bringing someone else in, because a partnership firm, an LLP and a Private Limited Company all require at least two people. A One Person Company exists as a separate route for single founders who want a corporate structure, and is worth asking about if limited liability matters to you but you have no co-founder.",
  },
  {
    q: "Do you intend to raise outside investment?",
    a: "If yes, a Private Limited Company is effectively the only workable answer. It is the only one of the four that can issue equity shares, create an ESOP pool and take money on a priced or convertible basis. Founders who start as an LLP to save on compliance and then raise funding usually have to pay to convert, which costs more than incorporating correctly at the start.",
  },
  {
    q: "How much liability does the business carry?",
    a: "This is the question most people underweight. In a proprietorship and a partnership firm, liability is unlimited and personal: business debts reach your own assets. In an LLP and a Private Limited Company it is confined to the entity. If you handle other people's goods or money, hold hazardous material, borrow significantly, or employ people, that difference is real rather than theoretical.",
  },
  {
    q: "How much annual compliance can you carry?",
    a: "A Private Limited Company needs a statutory audit and annual ROC filings from its first year, whether or not it traded. An LLP files Form 8 and Form 11 annually regardless of activity. A partnership firm and a proprietorship have no ROC filings at all. For a seasonal or very small business, that recurring cost can outweigh the benefits of incorporating.",
  },
  {
    q: "What do your customers and lenders expect?",
    a: "Frequently this settles the matter before you weigh anything else. Large industrial buyers, government tenders and many overseas customers require a registered entity they can verify, and some specify a company rather than an LLP. Check the vendor or tender requirements of the customers you actually intend to serve before you register.",
  },
];

const COMPARE_FAQS: FAQ[] = [
  {
    q: "Which is better, a Private Limited Company or an LLP?",
    a: "Neither is better in the abstract. A Private Limited Company can issue equity and is what investors expect, but it carries a statutory audit from its first year and more ongoing filing. An LLP has lighter compliance and flexible profit sharing, but cannot raise equity. If funding is in your plan, choose the company; if the business will be owned and run by the same small group, the LLP usually costs less to maintain.",
  },
  {
    q: "Is a partnership firm or an LLP better for two people starting a business?",
    a: "An LLP, in most cases, for one reason: liability. In a partnership firm both partners are personally liable without limit, including for each other's acts in the firm's name. In an LLP each partner's liability is capped at their agreed contribution and they are not liable for another partner's wrongful acts. The trade-off is two annual ROC filings that a partnership firm does not have.",
  },
  {
    q: "Can I start as a proprietorship and change later?",
    a: "Yes, and many businesses do. A proprietor can incorporate a company or an LLP and transfer the business into it, or bring in a partner to form a partnership. Conversion is not free: it means new registrations, a new bank account, new GST registration and updating vendor and customer records. That is an argument for thinking it through at the start, not for avoiding a proprietorship if it genuinely fits now.",
  },
  {
    q: "Which structure has the lowest tax?",
    a: "There is no single answer, because it depends on your income level and the nature of the business. A proprietorship is taxed at individual slab rates, which can be lower than corporate rates at modest income and higher at large income. Firms and LLPs are taxed at the rate applicable to firms. A company is taxed at corporate rates, but dividends are then taxable for the shareholder. Tax should inform the decision rather than drive it.",
  },
  {
    q: "Which structure is fastest to set up?",
    a: "A proprietorship, because there is nothing to incorporate. Udyam registration is usually same-day, and you can trade as soon as the applicable registrations and a current account are in place. A partnership deed can be executed within a few days. An LLP commonly takes around 7 to 10 working days and a Private Limited Company around 7 to 12, subject to government processing.",
  },
];

export default function ComparePage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(COMPARE_FAQS))} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="pb-12 pt-8">
        <div className="container-wide max-w-4xl">
          <h1 className="text-3xl leading-tight md:text-4xl lg:text-5xl">
            Choose the Right Business Structure
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Private Limited Company, LLP, Partnership Firm and Proprietorship differ in ways that are
            expensive to reverse: who is liable, what you must file every year, how you are taxed and
            whether you can ever raise equity. Here is the comparison, and the questions that usually
            settle it.
          </p>
        </div>
      </section>

      <Section>
        <ComparisonTable />
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Five questions that usually decide it"
          lead="Work through these in order. By the end, the field is normally down to one or two options."
        />
        <ol className="mx-auto max-w-3xl space-y-6">
          {DECISION_POINTS.map((point, i) => (
            <li key={point.q} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-start gap-3 text-lg">
                <span className="brand-gradient inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                {point.q}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{point.a}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading
          title="Read about each structure in detail"
          lead="Eligibility, documents, process, cost and the obligations that follow."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={service.path}
                className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="text-lg">{service.shortName}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.definition}
                </p>
                <span className="mt-4 text-sm font-semibold text-primary">{service.cardCta} &rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-3xl">Still not sure?</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Tell us what you are building, who is involved and whether investment is likely. That is
              usually enough for us to narrow it to one option and explain why.
            </p>
          </div>
          <LeadForm
            defaultRegistrationType="Not sure yet, help me choose"
            heading="Help me choose a structure"
          />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQs" title="Comparing business structures" />
        <FaqAccordion faqs={COMPARE_FAQS} idPrefix="compare-faq" />
      </Section>

      <CtaBanner />
    </>
  );
}
