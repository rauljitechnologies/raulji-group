import Link from "next/link";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SERVICES } from "@/lib/services";
import { GENERAL_FAQS } from "@/lib/home-faqs";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, type Crumb } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Business Registration FAQs | Raulji Group",
  description:
    "Answers on Private Limited, LLP, Partnership Firm and Proprietorship registration in India: eligibility, documents, process, cost and timelines.",
  path: "/faqs/",
  ogHeadline: "Business Registration FAQs",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "FAQs", path: "/faqs/" },
];

export default function FaqsPage() {
  const sections = [
    { id: "general", heading: "General", faqs: GENERAL_FAQS, href: null as string | null },
    ...SERVICES.map((service) => ({
      id: service.slug,
      heading: service.name,
      faqs: service.faqs,
      href: service.path,
    })),
  ];

  // Schema carries every Q&A on the page, all of which is visible.
  const allFaqs = sections.flatMap((section) => section.faqs);

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(allFaqs))} />
      <PageHeader
        crumbs={crumbs}
        title="Business Registration FAQs"
        lead="The questions we are asked most about registering and running a business in India, grouped by structure."
      >
        <nav aria-label="FAQ sections" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-[2.5rem] items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-secondary hover:border-primary hover:text-primary"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {sections.map((section, i) => (
        <Section key={section.id} id={section.id} tone={i % 2 === 1 ? "muted" : "default"}>
          <div className="mx-auto mb-8 max-w-3xl">
            <h2 className="text-2xl md:text-3xl">{section.heading}</h2>
            {section.href ? (
              <p className="mt-2">
                <Link
                  href={section.href}
                  className="link-target text-sm font-semibold text-primary hover:underline"
                >
                  Read the full {section.heading} page &rarr;
                </Link>
              </p>
            ) : null}
          </div>
          <FaqAccordion faqs={section.faqs} idPrefix={`${section.id}-faq`} />
        </Section>
      ))}

      <CtaBanner
        title="Question not answered here?"
        body="Call us or send a message. We will tell you what applies to your business specifically, before you commit to anything."
      />
    </>
  );
}
