import Link from "next/link";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { ServiceCards } from "@/components/shared/service-cards";
import { CityGrid } from "@/components/shared/city-grid";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { CtaBanner } from "@/components/shared/cta-banner";
import { LeadForm } from "@/components/forms/lead-form";
import { CITIES, CITY_SLUGS, GUJARAT_DISTRICTS } from "@/lib/cities";
import { SITE, TIMELINE_DISCLAIMER } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, type Crumb } from "@/lib/schema";
import type { FAQ } from "@/lib/services";

export const metadata = pageMeta({
  title: "Business Registration Services Across Gujarat | Raulji Group",
  description:
    "Private Limited, LLP, Partnership and Proprietorship registration support for businesses across all 33 districts of Gujarat. Raulji Group, Vadodara.",
  path: "/gujarat/",
  ogHeadline: "Business Registration Services Across Gujarat",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Gujarat", path: "/gujarat/" },
];

const GUJARAT_FAQS: FAQ[] = [
  {
    q: "Does it matter which part of Gujarat I register my business from?",
    a: "Not for the process. Company and LLP incorporation is filed online with the Registrar of Companies, and all of Gujarat falls under the same Registrar and the same GST state. Your registered office address determines where statutory correspondence is sent, not what you are allowed to do or how long registration takes. Partnership firm registration is handled by the Registrar of Firms for the state.",
  },
  {
    q: "Do I need to travel to Vadodara or Ahmedabad to register?",
    a: "No. Digital signatures are issued through video and Aadhaar-based verification, incorporation forms are filed online, and documents can be exchanged digitally. We work with businesses across the state from our base in Vadodara without requiring you to travel. You are welcome to meet us in person if you prefer.",
  },
  {
    q: "Does Raulji Group have offices in every city in Gujarat?",
    a: "No. We operate from Vadodara and serve the rest of Gujarat remotely. We would rather say that plainly than list offices we do not have. Because the registration process is filed online, working remotely makes no practical difference to the service or the timeline.",
  },
  {
    q: "Is stamp duty the same across Gujarat?",
    a: "Stamp duty is set at state level, so it is the same across Gujarat, but it differs from other states. It applies to incorporation documents, to the LLP Agreement and to a partnership deed, and the amount varies with the capital or contribution involved. We confirm the applicable figure before anything is executed.",
  },
  {
    q: "Which structure is most common among Gujarat businesses?",
    a: "It varies sharply by market rather than by the state as a whole. Partnership firms remain very common in trading centres such as Surat and the Saurashtra agricultural belt, LLPs are widespread among professional and partner-run firms, and Private Limited Companies dominate where founders intend to raise investment, particularly in Ahmedabad and the GIFT City corridor. Which is common matters much less than which is right for your business.",
  },
];

export default function GujaratPage() {
  const districtsWithPages = new Set(CITIES.map((c) => c.district));

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(GUJARAT_FAQS))} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="pb-14 pt-8 md:pb-20">
        <div className="container-wide">
          {/* Plain eyebrow rather than a pill badge, matching every other page
              (the client ruled the floating badge out on the homepage hero). */}
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Gujarat
          </p>
          <h1 className="mt-4 max-w-4xl text-[1.875rem] leading-[1.2] md:text-4xl md:leading-[1.15] lg:text-5xl lg:leading-[1.1]">
            Business Registration Services Across Gujarat
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Raulji Group supports entrepreneurs and businesses across Gujarat with Private Limited
            Company, LLP, Partnership Firm and Proprietorship registration. We work from Vadodara and
            serve all 33 districts, with dedicated pages for {CITY_SLUGS.length} of the state&rsquo;s
            main business markets.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#enquiry"
              className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-elevated"
            >
              Start Your Business
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#cities"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-xl border-2 border-primary px-7 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Find your city
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Registration services"
          title="Four structures, available anywhere in Gujarat"
          lead="The choice is the same across the state. What changes is which one suits the business you are actually building."
        />
        <ServiceCards />
      </Section>

      {/* How it works statewide */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">How we work across the state</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Incorporation in India is a central, online process. Applications are filed with the
              Registrar of Companies through the MCA portal, and digital signatures are issued
              through video and Aadhaar-based verification. That means a business in Bhuj and a
              business in Vapi go through exactly the same process on exactly the same timeline.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              What is genuinely local is the context around the decision: what your customers expect,
              what a lender will ask for, and how much liability the business carries. That is what
              our city pages cover, and it is the part worth a conversation.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">{TIMELINE_DISCLAIMER}</p>
          </div>
          <ul className="space-y-4">
            {[
              ["Filed online, statewide", "Company and LLP incorporation goes through the MCA portal, so your location in Gujarat does not affect the process or the timeline."],
              ["One state for GST", "All of Gujarat is a single GST state, so one registration covers multiple locations within it, with additional places of business declared."],
              ["Partnership firms are state-level", "Partnership firm registration is with the Registrar of Firms for Gujarat, and stamp duty on the deed is set by the state."],
              ["Based in Vadodara", `We operate from ${SITE.locality} and serve the rest of the state remotely. We do not claim offices we do not have.`],
            ].map(([title, body]) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-base">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Cities */}
      <Section tone="muted" id="cities">
        <SectionHeading
          eyebrow="Local markets"
          title="Cities and business markets across Gujarat"
          lead="Each page covers all four registration structures alongside the local business context that tends to shape the decision."
        />
        <CityGrid slugs={CITY_SLUGS} showDistrict />
      </Section>

      {/* Districts */}
      <Section>
        <SectionHeading
          title="All 33 districts of Gujarat"
          lead="We serve businesses across every district. Districts marked with a link have one or more dedicated city pages; the rest are served on the same terms."
        />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {GUJARAT_DISTRICTS.map((district) => {
            const cityInDistrict = CITIES.find((c) => c.district === district);
            return (
              <li key={district} className="text-sm">
                {districtsWithPages.has(district) && cityInDistrict ? (
                  <Link
                    href={`/${cityInDistrict.slug}/`}
                    className="link-target text-primary hover:underline"
                  >
                    {district}
                  </Link>
                ) : (
                  <span className="link-target text-muted-foreground">{district}</span>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          We publish a city page only where there is something genuinely local to say about doing
          business there. If your town is not listed, it does not mean we cannot help; it means we
          have not yet written a page worth reading about it. Call {SITE.phone.display} and we will
          answer directly.
        </p>
      </Section>

      {/* Comparison */}
      <Section tone="muted">
        <SectionHeading
          title="Choose the right business structure"
          lead="Liability, compliance load and whether you can raise equity are the differences that matter most."
        />
        <ComparisonTable />
        <p className="mt-8 text-center">
          <Link href="/compare/" className="link-target font-semibold text-primary hover:underline">
            Read the full comparison guide &rarr;
          </Link>
        </p>
      </Section>

      {/* Enquiry */}
      <Section id="enquiry">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-3xl">Start your business in Gujarat</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Tell us where you are and what you are starting. We will come back to you on the
              structure, the documents and the cost.
            </p>
          </div>
          <LeadForm heading="Gujarat business registration enquiry" />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="FAQs" title="Registering a business in Gujarat" />
        <FaqAccordion faqs={GUJARAT_FAQS} idPrefix="gujarat-faq" />
      </Section>

      <CtaBanner />
    </>
  );
}
