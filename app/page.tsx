import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock,
  CloudCog,
  Factory,
  FileCheck2,
  Landmark,
  Layers3,
  MapPinned,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  UserCheck,
  Wallet,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ServiceCards } from "@/components/shared/service-cards";
import { CityGrid } from "@/components/shared/city-grid";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { CtaBanner } from "@/components/shared/cta-banner";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { HOME_FAQS } from "@/lib/home-faqs";
import { SERVICES } from "@/lib/services";
import { SITE, TIMELINE_DISCLAIMER } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { faqSchema, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Company Registration & Business Services in Gujarat | Raulji Group",
  description:
    "Start your business with Private Limited, LLP, Partnership Firm or Proprietorship registration support from Raulji Group, across Gujarat and India.",
  path: "/",
  ogHeadline: "We Don't Just Build Businesses. We Build Futures.",
});

const WHY_US = [
  {
    icon: UserCheck,
    title: "Structure advice before anything is filed",
    body: "We start by understanding what you are building, because the wrong structure is expensive to undo. If a proprietorship is genuinely right for you, we will say so rather than sell you a company.",
  },
  {
    icon: FileCheck2,
    title: "Documentation handled end to end",
    body: "Digital signatures, name approval, drafting, filing and responding to Registrar queries are all handled by our team. You supply documents once and we work from there.",
  },
  {
    icon: Wallet,
    title: "Costs confirmed in writing first",
    body: "Our professional fee and the expected government fees are set out before any filing begins, so you are not discovering charges midway through.",
  },
  {
    icon: MapPinned,
    title: "Gujarat-wide, without needing an office everywhere",
    body: "Incorporation is filed online and digital signatures are issued through remote verification, so we work with businesses across all 33 districts from our base in Vadodara.",
  },
  {
    icon: Clock,
    title: "Honest timelines",
    body: "We tell you what usually happens and what can delay it. Government processing is outside anyone's control, and we would rather set expectations than miss them.",
  },
  {
    icon: ShieldCheck,
    title: "Clear about what we are",
    body: "We are a private firm that prepares and files applications on your behalf. We are not a government body, and approval always rests with the relevant authority.",
  },
];

const HOW_IT_WORKS = [
  {
    title: "Tell us what you are starting",
    body: "A short conversation about the business, who is involved and whether outside investment is likely. That is usually enough to narrow the structure to one or two options.",
  },
  {
    title: "Choose the structure",
    body: "We set out what each option means for your liability, your annual compliance and your tax position, along with the expected cost, and you decide.",
  },
  {
    title: "Send your documents",
    body: "We give you a checklist specific to the structure you have chosen. Documents can be sent digitally and we verify them before anything is filed.",
  },
  {
    title: "We file and follow through",
    body: "Digital signatures, name approval, drafting and the statutory filings are handled by our team, including responding to any Registrar query or resubmission request.",
  },
  {
    title: "You receive your registration",
    body: "You get the incorporation certificate or registration documents, and guidance on the immediate next steps such as opening a current account and the first statutory filings.",
  },
];

const GROUP_COMPANIES = [
  {
    icon: CloudCog,
    title: "Raulji Technologies",
    body: "Cutting-edge IT solutions powering digital transformation across industries.",
    href: SITE.technologies,
    cta: "Explore IT Services",
    points: [
      "IT Services & Consulting",
      "Website & Web App Development",
      "Mobile App Development",
      "Cloud, DevOps & AI Solutions",
      "Digital Transformation",
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: "Raulji Consulting Services",
    body: "Comprehensive business advisory driving growth and operational excellence.",
    href: "/services/",
    cta: "Explore Consulting Services",
    points: [
      "Business Consulting & Strategy",
      "Business Registration & Structuring",
      "Insurance Consulting",
      "Accounting, Tax & Compliance",
      "Website Development for Businesses",
    ],
  },
];

const INDUSTRIES = [
  {
    icon: Rocket,
    title: "Startups",
    body: "Accelerating innovation with strategic guidance and technology solutions.",
  },
  {
    icon: Building2,
    title: "SMEs",
    body: "Empowering small and medium enterprises with scalable business systems.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    body: "Optimizing operations with digital transformation and compliance support.",
  },
  {
    icon: Landmark,
    title: "Real Estate",
    body: "Property insurance, structuring and practical legal advisory support.",
  },
  {
    icon: ShoppingBag,
    title: "Retail & E-commerce",
    body: "Driving growth with digital solutions and business consulting.",
  },
  {
    icon: Layers3,
    title: "Enterprise",
    body: "Enterprise-grade solutions for larger and multi-location organizations.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(faqSchema(HOME_FAQS))} />

      {/* 1. Hero */}
      <section className="brand-gradient-soft relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Business registration across Gujarat
            </p>
            <h1 className="text-4xl leading-[1.1] md:text-5xl lg:text-6xl">{SITE.tagline}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Raulji Group helps entrepreneurs and businesses choose the right business structure and
              get started with Private Limited Company, LLP, Partnership Firm and Proprietorship
              registration support across Gujarat and India.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="brand-gradient inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-xl px-8 font-semibold text-primary-foreground shadow-elevated"
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services/"
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 border-primary px-8 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Explore Registration Services
              </Link>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Private Limited &middot; LLP &middot; Partnership Firm &middot; Proprietorship
            </p>
          </div>
        </div>
      </section>


      {/* 2. Group companies */}
      <Section id="group-companies">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Raulji Group of Companies"
            title="Business, technology and consulting under one group"
            lead="Raulji Group is a diversified holding company delivering excellence across IT, consulting and legal services with a focus on long-term value creation."
            align="left"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {GROUP_COMPANIES.map((company) => {
              const isExternal = company.href.startsWith("http");
              return (
                <article
                  key={company.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-card"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                    <company.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl">{company.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{company.body}</p>
                  <ul className="mt-5 space-y-3 text-sm text-secondary">
                    {company.points.map((point) => (
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
                    href={company.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="mt-6 inline-flex min-h-[2.75rem] items-center gap-2 rounded-lg border border-primary px-4 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {company.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 3. Industries */}
      <Section id="industries" tone="muted">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Expertise Across Diverse Sectors"
          lead="Our deep industry knowledge enables us to deliver tailored solutions that address the unique challenges of each sector."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <li key={industry.title} className="rounded-2xl border border-border bg-card p-6">
              <industry.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg">{industry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{industry.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Four registration services */}
      <Section id="services">
        <SectionHeading
          eyebrow="Business Registration"
          title="Four ways to register your business"
          lead="Each structure changes your liability, your annual compliance and how you can raise money. Start with the one that matches how you intend to run the business."
        />
        <ServiceCards />
      </Section>

      {/* 5. Why choose Raulji Group */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why Raulji Group"
          title="Practical help, without the guesswork"
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

      {/* 6. How business registration works */}
      <Section>
        <SectionHeading
          eyebrow="The process"
          title="How business registration works"
          lead="The same five steps apply whichever structure you choose. What changes is the paperwork behind each one."
        />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {HOW_IT_WORKS.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="brand-gradient inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          {TIMELINE_DISCLAIMER}
        </p>
      </Section>

      {/* 7. Gujarat coverage */}
      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Gujarat coverage
            </p>
            <h2 className="text-3xl md:text-4xl">Business Registration Across Gujarat</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              From Ahmedabad and Vadodara to Surat, Rajkot, Godhra, Dahod, Anand and business
              communities across Gujarat, Raulji Group helps entrepreneurs explore the right business
              structure and registration pathway.
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
              Explore Gujarat Business Registration
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

      {/* 8. City-wise coverage */}
      <Section id="cities">
        <SectionHeading
          eyebrow="Local markets"
          title="Find Business Registration Support in Your City"
          lead="Each city page covers all four registration structures, with the local business context that tends to shape the decision."
        />
        <CityGrid />
        <p className="mt-8 text-center">
          <Link href="/gujarat/" className="link-target font-semibold text-primary hover:underline">
            See all cities and districts we cover &rarr;
          </Link>
        </p>
      </Section>

      {/* 9. Choose the right structure */}
      <Section tone="muted" id="compare">
        <SectionHeading
          eyebrow="Compare"
          title="Choose the Right Business Structure"
          lead="The differences that matter most are liability, compliance load and whether you can raise equity. Here they are side by side."
        />
        <ComparisonTable />
        <p className="mt-8 text-center">
          <Link href="/compare/" className="link-target font-semibold text-primary hover:underline">
            Read the full comparison guide &rarr;
          </Link>
        </p>
      </Section>

      {/* 10. FAQ */}
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

      {/* 11. Final CTA */}
      <CtaBanner />
    </>
  );
}
