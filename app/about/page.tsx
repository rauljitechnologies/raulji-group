import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { ServiceCards } from "@/components/shared/service-cards";
import { CtaBanner } from "@/components/shared/cta-banner";
import Image from "next/image";
import { SITE, LEADERSHIP, AUTHORITY_DISCLAIMER } from "@/lib/site";
import chairmanPhoto from "@/public/leadership/dharmendrasinh-raulji.jpg";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, personSchema, type Crumb } from "@/lib/schema";

/**
 * About Raulji Group (master rule 42).
 *
 * Leadership: the client confirmed on 2026-09-16 that Dharmendrasinh Raulji is
 * Chairman of Raulji Group and a Director of Raulji Technologies, so the name is
 * published here and recorded in LEADERSHIP in lib/site.ts.
 *
 * Still NOT confirmed, and must not come back without written approval:
 *
 *  - that the firm "grew out of the Raulji Brothers and Sons business". Both
 *    master documents name this exact statement as one that may not be published
 *    unless approved as official company history.
 *  - "Founder". The earlier copy said "Chairman and Founder"; the client's
 *    confirmation said Chairman. A founder claim is company history and needs
 *    its own confirmation (master rule 42).
 *
 * Also absent, deliberately: founding year, headcount, client numbers, offices
 * beyond Vadodara, and any description of the group as a legal holding company.
 */

export const metadata = pageMeta({
  title: "About Raulji Group | Business Consulting & Solutions",
  description:
    "Raulji Group is a consulting-focused business group in Vadodara, working with businesses on structure, registration and growth across Gujarat and India.",
  path: "/about/",
  ogHeadline: "About Raulji Group",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
];

const PRINCIPLES = [
  {
    title: "The decision comes before the paperwork",
    body: "Most registration problems start with the wrong structure, not the wrong form. We spend time on that decision before anything gets filed, and we will tell you when the simpler option is the right one.",
  },
  {
    title: "Say what is actually true",
    body: "We do not publish client counts, ratings, awards or claims we cannot evidence, and we do not promise government approval or a guaranteed timeline. Processing times depend on the Registrar, not on us.",
  },
  {
    title: "Costs up front, in writing",
    body: "Our professional fee and the expected government charges are confirmed before work begins, so you are not discovering charges after the process has started. We do not describe anything as all inclusive unless it is.",
  },
  {
    title: "Stay inside our remit",
    body: "Where a matter needs an advocate, a chartered accountant or a company secretary, we say so and coordinate rather than work beyond what we are qualified to do.",
  },
  {
    title: "One point of contact",
    body: "You deal with the same people through the process rather than being handed between desks, and you can call the number on this page during business hours.",
  },
  {
    title: "Long-term over transactional",
    body: "A registration is one piece of work. The reason we lead with consulting is that the businesses we are most useful to are the ones we keep talking to after the certificate arrives.",
  },
];

const BRANDS = [
  {
    name: "Raulji Consulting Services",
    body: "The consulting and business-services arm of the group, covering business advisory, structure decisions, registration and MCA filing support. It operates as part of Raulji Group, on this website.",
    href: "/services/business-consulting/",
    cta: "Explore Consulting",
    external: false,
  },
  {
    name: "Raulji Technologies",
    body: "The group's technology brand, covering software, AI and digital transformation. It runs on its own domain with its own team and its own service catalogue.",
    href: SITE.technologies,
    cta: "Visit Raulji Technologies",
    external: true,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), personSchema())} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="pb-12 pt-8">
        <div className="container-wide max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            The Raulji Group
          </p>
          <h1 className="mt-3 text-balance text-3xl leading-tight md:text-4xl lg:text-5xl">
            About Raulji Group
          </h1>
          <p className="mt-5 text-xl font-semibold text-secondary">
            Leadership Built on Relationships. Trust Built for the Long Term.
          </p>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Raulji Group is a consulting-focused business group based in {SITE.locality},{" "}
            {SITE.region}. We work with entrepreneurs and business owners on the practical decisions
            that shape a business: how it should be structured, what has to be registered, and what
            needs to be in place before it grows.
          </p>
        </div>
      </section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <h2 className="text-3xl">What the group does</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              The group exists to answer a question most founders ask too late: given what I am
              actually building, what should I do next? Sometimes the answer is a Private Limited
              Company. Often it is something simpler, and saying so is part of the job.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              In practice the work divides into two. Consulting covers the decisions: structure,
              planning, growth, and reviewing whether an existing business is set up the way it now
              operates. Registration covers the execution: digital signatures, name approval,
              drafting, and the MCA filings that follow, including any Registrar query.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We are based in {SITE.locality} and work across Gujarat and the rest of India.
              Incorporation is filed online and identity verification is done remotely, so we do not
              need a local office to work with a business, and we do not claim to have one.
            </p>
            <p className="mt-8 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
              {AUTHORITY_DISCLAIMER}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7">
            <h2 className="text-xl">At a glance</h2>
            <dl className="mt-6 space-y-4 text-sm">
              {[
                ["Based in", `${SITE.locality}, ${SITE.region}, India`],
                ["Working across", "Gujarat and the rest of India"],
                ["Primary focus", "Business consulting and advisory"],
                [
                  "Main commercial service",
                  "Private Limited, LLP, Partnership Firm and Proprietorship registration",
                ],
                ["Also", "Compliance filings, GST support and MCA filing support"],
                ["Technology brand", "Raulji Technologies, on its own domain"],
                ["Hours", SITE.hours.display],
                ["Contact", `${SITE.phone.display} and ${SITE.email}`],
              ].map(([term, desc]) => (
                <div key={term} className="border-l-2 border-primary/30 pl-4">
                  <dt className="font-semibold text-secondary">{term}</dt>
                  <dd className="mt-0.5 leading-relaxed text-muted-foreground">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Leadership. A named, accountable person with a real photograph, which
          is what separates a company page from a template (master rule 35). No
          quotation is attributed to him: the client has not supplied a
          statement, and inventing one would be a fabricated claim. */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
          <figure className="mx-auto w-full max-w-[16rem] lg:mx-0 lg:max-w-none">
            <Image
              src={chairmanPhoto}
              alt={`${LEADERSHIP.chairman.name}, ${LEADERSHIP.chairman.roles[0]}`}
              placeholder="blur"
              sizes="(min-width: 1024px) 17rem, 16rem"
              className="aspect-[4/5] w-full rounded-2xl border border-border object-cover object-top"
            />
          </figure>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Leadership
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">{LEADERSHIP.chairman.name}</h2>
            <ul className="mt-3 space-y-0.5">
              {LEADERSHIP.chairman.roles.map((role) => (
                <li key={role} className="text-base font-medium text-muted-foreground">
                  {role}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                The same person leads both brands, which is why the group can take a business
                question end to end rather than handing it between firms. A structure decision, the
                registration that follows from it and the technology a business needs afterwards are
                usually the same conversation held three times.
              </p>
              <p>
                It is also why the group is deliberately small. You deal with the people doing the
                work, and the person accountable for it is named on this page.
              </p>
            </div>
            <p className="mt-7">
              <Link href="/team/" className="link-target font-semibold text-primary hover:underline">
                Meet the wider team
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* Group of Companies (master rule 6). */}
      <Section>
        <SectionHeading
          eyebrow="Our Group of Companies"
          title="Two brands under one group"
          lead="They are kept separate because they do different work and are bought by different people. Mixing them would make both harder to understand."
          align="left"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {BRANDS.map((brand) => (
            <article key={brand.name} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-xl">{brand.name}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{brand.body}</p>
              <Link
                href={brand.href}
                target={brand.external ? "_blank" : undefined}
                rel={brand.external ? "noopener noreferrer" : undefined}
                className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                {brand.cta}
                {brand.external ? (
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How we work"
          title="Six things we hold to"
          lead="Registration is a regulated process with no shortcuts in it. What we can control is how clearly it is handled."
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((item) => (
            <li key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          title="What we help you register"
          lead="Four structures, and a straight answer on which one fits."
        />
        <ServiceCards />
        <p className="mt-8 text-center">
          <Link href="/team/" className="link-target font-semibold text-primary hover:underline">
            Meet the team
          </Link>
          <span className="mx-3 text-border" aria-hidden="true">
            |
          </span>
          <Link
            href="/services/business-consulting/"
            className="link-target font-semibold text-primary hover:underline"
          >
            Business consulting
          </Link>
        </p>
      </Section>

      <CtaBanner />
    </>
  );
}
