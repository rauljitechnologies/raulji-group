import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Plus, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ClientWall } from "@/components/shared/client-wall";
import { ClientDirectory } from "@/components/shared/client-directory";
import { CLIENTS, CLIENT_COUNT, clientRows, countByBrand } from "@/lib/clients";
import { LEADERSHIP, SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  clientListSchema,
  faqSchema,
  graph,
  type Crumb,
} from "@/lib/schema";

export const revalidate = 3600;

export const metadata = pageMeta({
  // 155 characters. The previous one ran past 250 and was truncated in the
  // SERP halfway through the first company's name.
  title: "Our Clients | Raulji Group",
  description: `The ${CLIENT_COUNT} businesses Raulji Group works with, across both companies in the group: consulting and registration, and software, eCommerce and digital.`,
  path: "/our-clients/",
  ogHeadline: "The businesses we work with",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Our Clients", path: "/our-clients/" },
];

/**
 * One client wall for the whole group.
 *
 * The page is framed as Raulji Group's, not as one company's with a note
 * attached. The group runs two companies and a client of either is a client of
 * the group, so they share a single wall and a single list, and the services
 * section covers both. The brief keeps the Technologies catalogue on its own
 * domain (master rule 14), so what appears here is the short introduction the
 * rest of the site already uses, plus a link out.
 *
 * What the page will not do is pretend the two halves are equally represented.
 * The wall is currently all Technologies, because that is the only client list
 * the group publishes: consulting and registration work is confidential and no
 * client of it has been named anywhere. Adding invented names, or implying a
 * longer list by staying vague, is the thing master rule 13 exists to stop. The
 * data carries a `brand` on every client, so the moment a consulting list
 * exists those entries drop into the same wall, the same alphabetical list and
 * the same counts with no change here.
 *
 * Built to be quotable as well as readable. A logo wall is invisible to a
 * search engine and to an AI system: images carry no meaning, and the question
 * people actually ask ("who does Raulji Group work with?") has to be answered
 * somewhere in words. So the page carries a direct-answer block in plain
 * sentences, the full list as text, a visible FAQ, and an ItemList in JSON-LD
 * naming all 37 as organisations. Every one of those is the same set of facts,
 * stated for a different reader (master rules 20 and 21).
 *
 * Laid out to the "Raulji Our Clients" design (claude.ai/design); the header
 * and footer are the site-wide ones. The design's "Pan India" figure is shown
 * as "Across India", the wording the rest of the site uses.
 *
 * Nothing about sectors, revenue, results or client geography is asserted
 * anywhere. Those would all have been inferred from logo artwork rather than
 * confirmed by the client, and an inferred fact on a client page is a fake one
 * (master rule 13).
 */

const GROUP_SERVICES = [
  {
    name: "Raulji Consulting Services",
    role: "Consulting, registration and insurance",
    body: "The consulting and business-services arm of the group. It works with founders and owners on the decisions that come before paperwork, and then handles the paperwork.",
    services: [
      { name: "Business consulting", href: "/services/business-consulting/" },
      { name: "Business registration", href: "/services/business-registration/" },
      { name: "Annual compliance", href: "/services/pvt-compliance/" },
      { name: "Insurance services", href: "/services/insurance/" },
    ],
    cta: { label: "Explore Consulting", href: "/services/business-consulting/", external: false },
  },
  {
    name: "Raulji Technologies",
    role: "Software, eCommerce and digital",
    body: "The group's technology brand, on its own domain with its own team. It builds and runs the software, stores and digital presence behind the businesses on this wall.",
    services: [
      { name: "Software and web development", href: null },
      { name: "eCommerce and marketplaces", href: null },
      { name: "SEO and digital marketing", href: null },
      { name: "AI and digital transformation", href: null },
    ],
    cta: { label: "Explore Raulji Technologies", href: SITE.technologies, external: true },
  },
] as const;

/**
 * Written as answers, not as copy.
 *
 * Each one is a question a person actually types, answered in the first
 * sentence so it can be lifted whole into a snippet or an AI summary without
 * the rest of the page for context. Everything in them is already stated
 * elsewhere on this site; none of it is new, and none of it is a promise
 * (master rules 20, 21 and 34).
 */
const FAQS = [
  {
    q: "Who are Raulji Group's clients?",
    a: `Raulji Group works through two companies, and a client of either is a client of the group. The ${CLIENT_COUNT} businesses named on this page are clients of Raulji Technologies, the group's technology brand, on software, eCommerce, SEO and digital work. Consulting, registration and compliance clients are not named publicly.`,
  },
  {
    q: "Why are Raulji Group's consulting and registration clients not listed?",
    a: "Because that work is confidential by its nature. Which structure a business chose, what it was advised, and when it was registered are the client's information to disclose, not ours. We do not publish those names, and we do not publish a count of them either. If you want to know whether we have handled something close to your situation, ask us on a call and we will tell you.",
  },
  {
    q: "What does Raulji Group do for the businesses on this page?",
    a: "Raulji Technologies delivers their software and web development, eCommerce and marketplace work, SEO and digital marketing, and AI and digital transformation. Raulji Consulting Services covers the other half of the group: business consulting, company registration, annual compliance and insurance guidance.",
  },
  {
    q: "Can Raulji Group work with a business outside Gujarat?",
    a: `Yes. Company incorporation is filed online through the MCA portal and digital signatures are issued through remote verification, so the process does not depend on where the business is. Technology work is delivered remotely in the same way. The group is based in ${SITE.locality}, ${SITE.region}, and works with businesses across India.`,
  },
  {
    q: "How do I become a client of Raulji Group?",
    a: `Call ${SITE.phone.display} or send an enquiry, and describe what you are building. The first conversation is about what you actually need, which is often less than people expect. Our professional fee and the expected government fees are set out before any work begins, so nothing is filed or billed before you have agreed to it.`,
  },
];


const EYEBROW =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]";
const EYEBROW_DARK =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]";
const H2 =
  "text-balance text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#122640] sm:text-4xl lg:text-[2.75rem]";
const CONTAINER = "mx-auto max-w-[1240px] px-5 sm:px-8";
const SECTION = "py-16 md:py-24 lg:py-28";

function Dash() {
  return <span className="h-0.5 w-7 bg-[#329fd2]" aria-hidden="true" />;
}

const WHATSAPP_HREF = `https://wa.me/${SITE.phone.whatsapp}?text=${encodeURIComponent(
  "Hello Raulji Group, I would like to talk to your team.",
)}`;

export default function OurClientsPage() {
  const rows = clientRows(2);
  const alphabetical = [...CLIENTS]
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))
    .map(({ slug, name, logo }) => ({ slug, name, logo }));
  const consultingClients = countByBrand("Raulji Consulting Services");

  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          clientListSchema(CLIENTS, {
            path: "/our-clients/",
            logoPath: (slug) => `/clients/${slug}.webp`,
          }),
          // Valid because every one of these questions is on the page, visible,
          // with the same answer text (master rule 20).
          faqSchema(FAQS),
        )}
      />

      {/* Hero. */}
      <section
        aria-labelledby="cl-h"
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
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-12 pt-6 sm:px-8 md:gap-14 md:pb-20 md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-[5.5rem]">
            <div className="flex min-w-0 flex-col gap-[1.375rem]">
              <p className={EYEBROW_DARK}>
                <Dash />
                Our Clients
              </p>
              <h1
                id="cl-h"
                className="text-balance text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl xl:text-[4.5rem]"
              >
                The businesses <span className="text-[#7cc8ec]">we work with.</span>
              </h1>
              <p className="max-w-[37.5rem] text-pretty text-base leading-[1.75] text-[#c9d6e3] sm:text-lg">
                Raulji Group works through two companies, and a client of either is a client of the
                group. This is the whole wall in one place: businesses named publicly, with the
                work delivered by Raulji Technologies.
              </p>
              <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#all"
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]"
                >
                  See Every Client
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <TrackedLink
                  href="/contact/"
                  event="primary_cta_click"
                  params={{ label: "our-clients-hero" }}
                  className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-white/40 px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2] hover:bg-[#329fd2] hover:text-[#0c1a2d]"
                >
                  Talk to an Expert
                </TrackedLink>
              </div>
            </div>
            <dl className="flex min-w-0 flex-col gap-px overflow-hidden rounded-md border border-white/[0.12] bg-white/[0.12]">
              <div className="flex flex-col-reverse gap-1.5 bg-[#122640] px-[1.875rem] py-7">
                <dt className="text-sm text-[#c9d6e3]">Businesses named publicly as clients of the group</dt>
                <dd className="text-[4rem] font-extrabold leading-[0.9] tracking-[-0.04em] tabular-nums text-white sm:text-[6.5rem]">
                  {CLIENT_COUNT}
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-px">
                {[
                  ["2", "Group companies"],
                  ["Across India", "Delivered remotely"],
                ].map(([value, text]) => (
                  <div
                    key={text}
                    className="flex flex-col-reverse bg-[#0c1a2d] px-6 py-5 transition-colors duration-300 hover:bg-[#16304f]"
                  >
                    <dt className="text-[0.8125rem] text-[#c9d6e3]">{text}</dt>
                    <dd className="text-2xl font-extrabold text-white sm:text-[1.875rem]">{value}</dd>
                  </div>
                ))}
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* The wall, straight after the masthead: it is why anyone opens this page. */}
      <section
        aria-label="Client logos"
        className="flex flex-col gap-4 overflow-hidden border-b border-[#e3e9ef] bg-[#f4f7fa] py-7 md:py-11"
      >
        <ClientWall rows={rows} />
        <p className={`${CONTAINER} w-full text-center text-xs text-[#5b6778]`}>
          Logos are the property of their respective owners and are shown to identify the
          businesses the group has worked with.
        </p>
      </section>

      {/*
        The direct answer, in sentences. A wall of images says nothing to a
        search engine or an AI system, and "who does Raulji Group work with" is
        the question this page exists to answer.
      */}
      <section aria-labelledby="who-h" className={SECTION}>
        <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW}>
              <Dash />
              Who we work with
            </p>
            <h2 id="who-h" className={H2}>
              Founders and owners across India, on both sides of the group.
            </h2>
            <p className="text-pretty text-base leading-[1.8]">
              <strong className="text-[#122640]">Raulji Group</strong> is a consulting-focused
              business group based in {SITE.locality}, {SITE.region}, made up of two companies:{" "}
              <strong className="text-[#122640]">Raulji Consulting Services</strong>, which handles
              business consulting, company registration, annual compliance and insurance, and{" "}
              <strong className="text-[#122640]">Raulji Technologies</strong>, which handles
              software, eCommerce, SEO and digital work on its own domain.
            </p>
            <p className="text-pretty text-base leading-[1.8]">
              {CLIENT_COUNT} businesses are named publicly as clients of the group, all of them
              through Raulji Technologies. Consulting and registration clients are not named,
              because that work is confidential. The group is not limited to Gujarat: incorporation
              is filed online through the MCA portal and technology work is delivered remotely.
            </p>
          </div>
          <aside className="flex min-w-0 flex-col gap-4 rounded-md bg-[#122640] p-7 text-white transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(18,38,64,0.6)] sm:p-10">
            <ShieldCheck className="h-[2.125rem] w-[2.125rem] text-[#7cc8ec]" strokeWidth={1.4} aria-hidden="true" />
            <h3 className="text-xl font-bold text-white">About this wall</h3>
            <p className="text-[0.9375rem] leading-[1.7] text-[#c9d6e3]">
              {consultingClients === 0
                ? "Consulting, registration and compliance work is confidential by nature, so we do not publish the names of businesses we have advised or registered. That is a choice about disclosure, not a measure of the work."
                : "It covers both companies in the group. Consulting and registration work is confidential by its nature, so only clients who have agreed to be named appear here."}
            </p>
            <TrackedLink
              href="/contact/"
              event="primary_cta_click"
              params={{ label: "our-clients-about-wall" }}
              className="inline-flex min-h-[2.75rem] items-center gap-2 self-start text-[0.9375rem] font-semibold text-[#7cc8ec] hover:text-white hover:underline"
            >
              Ask us directly
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </aside>
        </div>
      </section>

      {/* The group's services, both companies side by side. */}
      <section aria-labelledby="do-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>
                <Dash />
                Under Raulji Group
              </p>
              <h2 id="do-h" className={H2}>
                What the group does for them.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base leading-[1.7] lg:justify-self-end">
              Two companies, one group. Most clients start on one side and end up using the other,
              which is the practical reason they sit under one roof.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {GROUP_SERVICES.map((brand) => {
              const ctaClass =
                "mt-1.5 inline-flex min-h-[3.25rem] items-center gap-2 self-start rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0] hover:shadow-[0_10px_22px_-10px_rgba(26,124,176,0.6)]";
              return (
                <article
                  key={brand.name}
                  className="flex flex-col gap-[1.125rem] rounded-md border border-[#e3e9ef] bg-white p-7 transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-[#329fd2] hover:shadow-[0_24px_48px_-26px_rgba(18,38,64,0.4)] sm:p-11"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1a7cb0]">
                    {brand.role}
                  </p>
                  <h3 className="text-[1.625rem] font-extrabold tracking-[-0.01em] text-[#122640]">
                    {brand.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-[1.7]">{brand.body}</p>
                  <ul className="flex flex-col border-t border-[#eef2f6]">
                    {brand.services.map((service) => (
                      <li
                        key={service.name}
                        className="flex items-center gap-3 border-b border-[#eef2f6] py-[0.8125rem] text-[0.9375rem] font-semibold text-[#122640]"
                      >
                        <Check className="h-4 w-4 shrink-0 text-[#329fd2]" strokeWidth={2.4} aria-hidden="true" />
                        {service.href ? (
                          <TrackedLink
                            href={service.href}
                            event="service_card_click"
                            params={{ label: "our-clients-services", service: service.name }}
                            className="transition-colors hover:text-[#1a7cb0] hover:underline"
                          >
                            {service.name}
                          </TrackedLink>
                        ) : (
                          // Technologies' catalogue lives on its own domain, so
                          // its lines are named and not linked (master rule 14).
                          <span>{service.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {brand.cta.external ? (
                    <TrackedLink
                      href={brand.cta.href}
                      event="technology_click"
                      params={{ label: "our-clients-services" }}
                      external
                      className={ctaClass}
                    >
                      {brand.cta.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </TrackedLink>
                  ) : (
                    <Link href={brand.cta.href} className={ctaClass}>
                      {brand.cta.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* The same clients as text and tiles, searchable. */}
      <section id="all" aria-labelledby="all-h" className={`scroll-mt-28 ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-7`}>
          <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>
                <Dash />
                In full
              </p>
              <h2 id="all-h" className={H2}>
                Every client, alphabetically.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base leading-[1.7] lg:justify-self-end">
              The same businesses as above, written out so the list can be read and searched rather
              than watched.
            </p>
          </div>
          <ClientDirectory clients={alphabetical} />
        </div>
      </section>

      {/* Questions, with the answer in the first sentence of each. */}
      <section aria-labelledby="faq-h" className={`bg-[#0c1a2d] text-white ${SECTION}`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW_DARK}>
              <Dash />
              Questions
            </p>
            <h2
              id="faq-h"
              className="text-[1.75rem] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[2.5rem]"
            >
              Working with Raulji Group.
            </h2>
            <p className="text-[0.9375rem] leading-[1.7] text-[#c9d6e3]">
              What people ask before they get in touch.
            </p>
            <div className="mt-2.5 flex items-center gap-3.5 border-t border-white/[0.14] pt-5">
              <Image
                src={LEADERSHIP.chairman.photo}
                alt=""
                width={52}
                height={52}
                className="h-[3.25rem] w-[3.25rem] rounded-full border-2 border-[#329fd2] object-cover object-[center_20%]"
              />
              <p className="text-sm leading-[1.45] text-[#c9d6e3]">
                <strong className="text-white">{LEADERSHIP.chairman.name}</strong>
                <br />
                {LEADERSHIP.chairman.roles[0]}
              </p>
            </div>
          </div>
          <div className="flex min-w-0 flex-col border-t border-white/[0.14]">
            {FAQS.map((item) => (
              <details key={item.q} className="group border-b border-white/[0.14]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-[4px] py-[1.375rem] transition-[padding,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-[#329fd2]/[0.08] hover:px-3.5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-semibold leading-[1.4] text-white">{item.q}</h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/30 text-[#7cc8ec] transition-transform duration-200 group-open:rotate-45"
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-[0.9375rem] leading-[1.7] text-[#d5e0ea]">{item.a}</p>
              </details>
            ))}
            {/* Internal linking (master rule 19). */}
            <p className="mt-8 text-sm leading-relaxed text-[#c9d6e3]">
              More about the group on{" "}
              <Link href="/about/" className="font-semibold text-[#7cc8ec] hover:text-white hover:underline">
                About Raulji Group
              </Link>{" "}
              and{" "}
              <Link href="/team/" className="font-semibold text-[#7cc8ec] hover:text-white hover:underline">
                the team
              </Link>
              . If you are registering a business, start with{" "}
              <Link
                href="/services/business-registration/"
                className="font-semibold text-[#7cc8ec] hover:text-white hover:underline"
              >
                business registration
              </Link>{" "}
              or{" "}
              <TrackedLink
                href="/gujarat/"
                event="gujarat_page_click"
                params={{ label: "our-clients" }}
                className="font-semibold text-[#7cc8ec] hover:text-white hover:underline"
              >
                our coverage across Gujarat
              </TrackedLink>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA. */}
      <section aria-labelledby="cta-h" className="px-5 py-14 sm:px-8 md:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-16 gap-y-7 rounded-md bg-[#122640] p-8 text-white sm:p-12 lg:p-16">
          <div className="flex flex-[1_1_27.5rem] flex-col gap-3.5">
            <h2
              id="cta-h"
              className="text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.75rem]"
            >
              Want your business on this wall?
            </h2>
            <p className="max-w-[35rem] text-base leading-[1.7] text-[#d5e0ea]">
              Tell us what you are building. Whether it starts as a structure decision, a
              registration or a piece of software, the conversation begins the same way.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <TrackedLink
              href="/contact/"
              event="primary_cta_click"
              params={{ label: "our-clients-footer-cta" }}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]"
            >
              Start Your Business
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href={WHATSAPP_HREF}
              external
              event="whatsapp_click"
              params={{ label: "our-clients-footer-cta" }}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#329fd2] hover:text-[#0c1a2d]"
            >
              WhatsApp Us
            </TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
