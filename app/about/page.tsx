import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { ServiceCards } from "@/components/shared/service-cards";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SITE, AUTHORITY_DISCLAIMER } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

export const metadata = pageMeta({
  title: "About Raulji Group | Business Registration Support in Gujarat",
  description:
    "Raulji Group helps businesses across Gujarat choose the right structure and register it properly. Based in Vadodara. Call +91 8511187689.",
  path: "/about/",
  ogHeadline: "About Raulji Group",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
];

const PRINCIPLES = [
  {
    title: "The structure decision comes first",
    body: "Most registration problems start with the wrong structure, not the wrong paperwork. We spend time on that decision before anything gets filed, and we will tell you when the simpler option is the right one.",
  },
  {
    title: "Say what is actually true",
    body: "We do not publish client counts, ratings or claims we cannot evidence, and we do not promise government approval or a guaranteed timeline. Processing times depend on the Registrar, not on us.",
  },
  {
    title: "Costs up front, in writing",
    body: "Our professional fee and the expected government charges are confirmed before work begins, so you are not discovering charges after the process has started.",
  },
  {
    title: "One point of contact",
    body: "You deal with the same people through the process rather than being handed between desks, and you can call us directly on the number on this page.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="pb-12 pt-8">
        <div className="container-wide max-w-4xl">
          <p className="mb-4 inline-flex rounded-full border border-primary/25 bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            About Raulji Group
          </p>
          <h1 className="text-3xl leading-tight md:text-4xl lg:text-5xl">
            About Raulji Group
          </h1>
          <p className="mt-5 text-xl font-semibold text-secondary">{SITE.tagline}</p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Raulji Group is a business-services firm based in {SITE.locality}, Gujarat, working with
            entrepreneurs and businesses across the state. Our focus is business registration:
            helping you choose between a Private Limited Company, an LLP, a partnership firm and a
            proprietorship, and then handling the documentation and filings that follow.
          </p>
        </div>
      </section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Who we are</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Raulji Group operates under the leadership of Chairman and Founder Dharmendrasinh
              Raulji. The firm grew out of the Raulji Brothers and Sons business, and today works
              with businesses across Gujarat on registration, compliance and the practical questions
              that come with running a registered entity.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Technology, software and AI work is delivered through our separate brand,{" "}
              <a
                href={SITE.technologies}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Raulji Technologies
              </a>
              , which runs on its own domain with its own team.
            </p>
            <p className="mt-8 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
              {AUTHORITY_DISCLAIMER}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7">
            <h2 className="text-xl">At a glance</h2>
            <dl className="mt-6 space-y-4 text-sm">
              {[
                ["Based in", `${SITE.locality}, ${SITE.region}, India`],
                ["Serving", "All 33 districts of Gujarat, and businesses across India"],
                ["Focus", "Private Limited, LLP, Partnership Firm and Proprietorship registration"],
                ["Also", "Compliance filings, GST, and business advisory"],
                ["Hours", SITE.hours.display],
                ["Contact", `${SITE.phone.display} · ${SITE.email}`],
              ].map(([term, desc]) => (
                <div key={term} className="border-l-2 border-primary/30 pl-4">
                  <dt className="font-semibold text-secondary">{term}</dt>
                  <dd className="mt-0.5 text-muted-foreground">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="How we work"
          title="Four things we hold to"
          lead="Registration is a regulated process with no shortcuts. What we can control is how clearly it is handled."
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {PRINCIPLES.map((item) => (
            <li key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="What we help you register"
          lead="Four structures, and a clear answer on which one fits."
        />
        <ServiceCards />
        <p className="mt-8 text-center">
          <Link href="/team/" className="link-target font-semibold text-primary hover:underline">
            Meet the team &rarr;
          </Link>
        </p>
      </Section>

      <CtaBanner />
    </>
  );
}
