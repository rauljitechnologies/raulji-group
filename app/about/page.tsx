import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  Code2,
  Compass,
  Lightbulb,
  Link2,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { SITE, LEADERSHIP, AUTHORITY_DISCLAIMER, telHref } from "@/lib/site";
import chairmanPhoto from "@/public/leadership/dharmendrasinh-raulji.jpg";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, personSchema, type Crumb } from "@/lib/schema";

/**
 * About Raulji Group (master rule 42), built to the "Raulji About" design
 * (claude.ai/design). The header and footer are the site-wide ones.
 *
 * Leadership: the client confirmed on 2026-09-16 that Dharmendrasinh Raulji is
 * Chairman of Raulji Group and a Director of Raulji Technologies, so the name is
 * published here and recorded in LEADERSHIP in lib/site.ts.
 *
 * The design's layout is followed section by section. Its content was not
 * carried over where it states something unconfirmed or already ruled out:
 *
 *  - "Founded by Raulji Brothers & Sons". Master rule 7 forbids it unless it is
 *    approved as official company history, and it has not been.
 *  - "Parent holding company". The group's legal status is not confirmed
 *    (see lib/schema.ts), so the diagram labels the group, not a legal form.
 *  - Finance & Investment Consulting, Legal Advisory and GST support. The
 *    client confirmed on 2026-09-16 these are not Raulji Group services
 *    (master rule 15). The four areas shown are the confirmed ones.
 *  - The Social Impact section (food donation drives, educational support).
 *    Unverified activity claims (master rule 13). Restore it once the client
 *    confirms the programmes in writing.
 *  - The quotation attributed to the Chairman. No words are put in a named
 *    person's mouth; the brand philosophy is shown as the group's line.
 *  - The vision's "global leader among holding companies", for both reasons
 *    above. The vision keeps the design's intent without the claim.
 *
 * Also absent, deliberately: founding year, headcount, client numbers and
 * offices beyond Vadodara.
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

const EYEBROW =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]";
const EYEBROW_DARK =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]";
const H2 =
  "text-balance text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#122640] sm:text-4xl/[1.12] lg:text-[2.75rem]";
const CONTAINER = "mx-auto max-w-[1240px] px-5 sm:px-8";
const SECTION = "py-16 md:py-24 lg:py-28";
const LIFT =
  "transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-[#329fd2] hover:shadow-[0_24px_48px_-26px_rgba(18,38,64,0.4)]";

function Dash() {
  return <span className="h-0.5 w-7 bg-[#329fd2]" aria-hidden="true" />;
}

const EXPERTISE = [
  {
    title: "Business Consulting",
    body: "Strategy, planning, structuring and growth decisions, made before anything is filed.",
    icon: Compass,
    href: "/services/business-consulting/",
  },
  {
    title: "Business Registration & Compliance",
    body: "Private Limited, LLP, Partnership and Proprietorship registration, and the annual filings that follow.",
    icon: Building2,
    href: "/services/business-registration/",
  },
  {
    title: "Insurance Services",
    body: "Business and personal cover, arranged with the insurer, with the terms explained before you buy.",
    icon: ShieldCheck,
    href: "/services/insurance/",
  },
  {
    title: "Technology & Digital",
    body: "Software, AI and digital transformation, delivered through Raulji Technologies.",
    icon: Code2,
    href: SITE.technologies,
    external: true,
  },
];

const GLANCE: [string, string][] = [
  ["Based in", `${SITE.locality}, ${SITE.region}, India`],
  ["Working across", "Gujarat and the rest of India"],
  ["Primary focus", "Business consulting and advisory"],
  ["Registration", "Private Limited, LLP, Partnership Firm and Proprietorship"],
  ["Also", "Private Limited and LLP compliance, and insurance"],
  ["Technology brand", "Raulji Technologies, on its own domain"],
  ["Hours", SITE.hours.display],
];

const BRANDS = [
  {
    name: "Raulji Consulting Services",
    tag: "Consulting",
    body: "The consulting and business-services arm of the group, covering business advisory, structure decisions, registration and MCA filing support. It operates as part of Raulji Group, on this website.",
    href: "/services/business-consulting/",
    cta: "Explore Consulting",
    icon: Briefcase,
    external: false,
  },
  {
    name: "Raulji Technologies",
    tag: "Technology",
    body: "The group's technology brand, covering software, AI and digital transformation. It runs on its own domain with its own team and its own service catalogue.",
    href: SITE.technologies,
    cta: "Visit Raulji Technologies",
    icon: Code2,
    external: true,
  },
];

const VALUES = [
  { title: "Leadership", body: "Clear thinking that guides growth.", icon: Award },
  { title: "Trust", body: "Transparent and ethical working relationships.", icon: ShieldCheck },
  { title: "Innovation", body: "Practical, future-focused solutions.", icon: Lightbulb },
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

const STRUCTURES = [
  {
    title: "Private Limited",
    body: "For businesses seeking a scalable corporate structure.",
    href: "/services/pvt-registration/",
    icon: Briefcase,
  },
  {
    title: "LLP",
    body: "For businesses structured around partners with limited liability.",
    href: "/services/llp-registration/",
    icon: Link2,
  },
  {
    title: "Partnership",
    body: "For businesses formed by partners under a partnership deed.",
    href: "/services/partnership-registration/",
    icon: Users,
  },
  {
    title: "Proprietorship",
    body: "For individuals starting and operating a business on their own.",
    href: "/services/proprietorship-registration/",
    icon: User,
  },
];

const MARQUEE = ["Leadership", "Trust", "Innovation", "Integrity", "Relationships"];

const WHATSAPP_HREF = `https://wa.me/${SITE.phone.whatsapp}?text=${encodeURIComponent(
  "Hello Raulji Group, I would like to talk to your team.",
)}`;

export default function AboutPage() {
  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd data={graph(breadcrumbSchema(crumbs), personSchema())} />

      {/* Hero. */}
      <section
        aria-labelledby="about-h"
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
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 md:gap-14 md:pb-[6.5rem] md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div className="flex min-w-0 flex-col gap-[1.375rem]">
              <p className={EYEBROW_DARK}>
                <Dash />
                The Raulji Group
              </p>
              <h1
                id="about-h"
                className="text-balance text-[2.375rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl/[1.04] xl:text-[4.125rem]"
              >
                Leadership Built on Relationships.{" "}
                <span className="text-[#7cc8ec]">Trust Built for the Long Term.</span>
              </h1>
              <p className="max-w-[36.25rem] text-pretty text-base/[1.75] leading-[1.75] text-[#c9d6e3] sm:text-lg/[1.75]">
                Raulji Group is a consulting-focused business group based in {SITE.locality},{" "}
                {SITE.region}. We work with entrepreneurs and business owners on the practical
                decisions that shape a business: how it should be structured, what has to be
                registered, and what needs to be in place before it grows.
              </p>
              <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  href="/contact/"
                  event="primary_cta_click"
                  params={{ label: "about_hero" }}
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]"
                >
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <a
                  href="#companies"
                  className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-white/40 px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2] hover:bg-[#329fd2] hover:text-[#0c1a2d]"
                >
                  Our Group Companies
                </a>
              </div>
            </div>

            {/* The group diagram. Labels only what is confirmed: one group, two brands. */}
            <figure className="relative m-0 min-w-0">
              <span
                aria-hidden="true"
                className="absolute inset-[-14px_14px_14px_-14px] rounded-md border-[1.5px] border-[#329fd2]/50"
              />
              <div
                role="img"
                aria-label="Raulji Group structure: one group with two brands, Raulji Consulting Services and Raulji Technologies"
                className="relative flex flex-col gap-5 rounded-md border border-white/[0.12] bg-[#122640] p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-9"
              >
                <div className="flex items-center gap-4 rounded-[4px] bg-white px-5 py-[1.125rem]">
                  <Image
                    src="/raulji-group-logo.png"
                    alt=""
                    width={150}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <div>
                    <p className="text-xs font-bold tracking-[0.1em] text-[#1a7cb0]">RAULJI GROUP</p>
                    <p className="text-[0.8125rem] text-[#3a4656]">
                      {SITE.locality}, {SITE.region}
                    </p>
                  </div>
                </div>
                <div aria-hidden="true" className="mx-[24%] -my-2 grid h-[22px] grid-cols-2">
                  <span className="rounded-tl-[4px] border-l-[1.5px] border-t-[1.5px] border-[#329fd2]" />
                  <span className="rounded-tr-[4px] border-r-[1.5px] border-t-[1.5px] border-[#329fd2]" />
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    ["Raulji Consulting Services", "Consulting & registration"],
                    ["Raulji Technologies", "Software, AI & digital"],
                  ].map(([name, role]) => (
                    <div
                      key={name}
                      className="flex flex-col gap-1 rounded-[4px] bg-white px-4 py-3.5 transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.5)]"
                    >
                      <p className="text-[0.9375rem] font-bold text-[#122640]">{name}</p>
                      <p className="text-xs font-semibold text-[#1a7cb0]">{role}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 border-t border-white/[0.12] pt-[1.125rem]">
                  <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#7cc8ec]">
                    GROUP EXPERTISE
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Business Consulting", "Business Registration", "Insurance", "Technology"].map(
                      (chip) => (
                        <span
                          key={chip}
                          className="rounded-[14px] border border-white/[0.22] px-[0.6875rem] py-1.5 text-xs font-semibold text-white transition-colors hover:border-[#329fd2] hover:bg-[#329fd2] hover:text-[#0c1a2d]"
                        >
                          {chip}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </figure>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-md border border-white/[0.12] bg-white/[0.12] grid-cols-2 lg:grid-cols-4">
            {[
              ["2", "Group brands"],
              [`${EXPERTISE.length}`, "Areas of expertise"],
              ["33", "Gujarat districts covered"],
              [`${SITE.hours.days.length}`, "Days a week, 9 AM to 7 PM"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="flex flex-col-reverse gap-1 bg-[#0c1a2d] px-[1.625rem] py-[1.375rem] transition-colors duration-300 hover:bg-[#16304f]"
              >
                <dt className="text-[0.8125rem] text-[#c9d6e3]">{label}</dt>
                <dd className="text-[1.875rem] font-extrabold tabular-nums tracking-[-0.03em] text-white sm:text-[2.625rem]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Values marquee. Decorative, so hidden from assistive tech; it stops
          for anyone who asks the system for reduced motion. */}
      <section
        aria-label="Our values"
        className="overflow-hidden border-b border-[#e3e9ef] bg-white py-7 md:py-11"
      >
        <div
          aria-hidden="true"
          className="flex w-max animate-[about-marquee_36s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-6 whitespace-nowrap pr-6 text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.03em] md:gap-11 md:pr-11 md:text-[5.25rem]"
            >
              {MARQUEE.map((word, i) => (
                <span key={word} className="flex items-center gap-6 md:gap-11">
                  <span
                    className={
                      i % 2 === 1
                        ? "text-transparent [-webkit-text-stroke:1.5px_#122640]"
                        : "text-[#122640]"
                    }
                  >
                    {word}
                  </span>
                  <span className="h-3.5 w-3.5 flex-none rotate-45 bg-[#329fd2]" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes about-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </section>

      {/* Who we are. */}
      <section aria-labelledby="who-h" className={SECTION}>
        <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-5">
            <p className={EYEBROW}>
              <Dash />
              Who we are
            </p>
            <h2 id="who-h" className={H2}>
              A consulting-led group built for long-term value.
            </h2>
            <p className="text-pretty text-base/[1.8] leading-[1.8]">
              The group exists to answer a question most founders ask too late: given what I am
              actually building, what should I do next? Sometimes the answer is a Private Limited
              Company. Often it is something simpler, and saying so is part of the job.
            </p>
            <p className="text-pretty text-base/[1.8] leading-[1.8]">
              Based in {SITE.locality}, we work with entrepreneurs and business owners across Gujarat
              and the rest of India. Incorporation is filed online and identity verification is done
              remotely, so we do not need a local office to work with a business, and we do not
              claim to have one.
            </p>
            <p className="rounded-[4px] bg-[#f4f7fa] px-[1.125rem] py-4 text-sm/[1.7] leading-[1.7]">
              {AUTHORITY_DISCLAIMER}
            </p>
          </div>
          <aside
            aria-labelledby="glance-h"
            className="min-w-0 overflow-hidden rounded-md border border-[#e3e9ef]"
          >
            <h3
              id="glance-h"
              className="bg-[#122640] px-6 py-4 text-[0.8125rem] font-bold tracking-[0.12em] text-white"
            >
              AT A GLANCE
            </h3>
            <dl>
              {GLANCE.map(([term, value]) => (
                <div
                  key={term}
                  className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-t border-[#eef2f6] px-6 py-3.5 transition-colors first:border-t-0 hover:bg-[#f4fafd] sm:grid-cols-[8.125rem_minmax(0,1fr)]"
                >
                  <dt className="text-[0.8125rem] text-[#5b6778]">{term}</dt>
                  <dd className="text-sm/[1.5] font-semibold leading-normal text-[#122640]">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Areas of expertise. */}
      <section aria-labelledby="svc-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>
                <Dash />
                Our group services
              </p>
              <h2 id="svc-h" className={H2}>
                Four areas of expertise. One accountable group.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base/[1.7] leading-[1.7] lg:justify-self-end">
              Each area brings its own depth, while the group keeps strategy, execution and support
              connected from the first conversation onwards.
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERTISE.map((item, i) => {
              const Icon = item.icon;
              const body = (
                <>
                  <span className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5fb]">
                      <Icon className="h-[1.625rem] w-[1.625rem] text-[#1a7cb0]" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="text-[0.8125rem] font-bold text-[#9aa7b5]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="flex items-center gap-1.5 text-[1.1875rem] font-bold leading-[1.3] text-[#122640]">
                    {item.title}
                    {item.external ? <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
                  </h3>
                  <p className="text-[0.9375rem] leading-[1.65]">{item.body}</p>
                </>
              );
              const cls = `flex flex-1 flex-col gap-[1.125rem] rounded-md border border-[#e3e9ef] bg-white px-7 py-8 ${LIFT}`;
              return (
                <li key={item.title} className="flex">
                  {item.external ? (
                    <TrackedLink
                      href={item.href}
                      external
                      event="technology_click"
                      params={{ label: "about_expertise" }}
                      className={cls}
                    >
                      {body}
                    </TrackedLink>
                  ) : (
                    <Link href={item.href} className={cls}>
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Leadership. A named, accountable person with a real photograph. */}
      <section aria-labelledby="lead-h" className={SECTION}>
        <div className={`${CONTAINER} grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-[5.5rem]`}>
          <figure className="relative m-0 mx-auto w-full max-w-[28.75rem] pb-[18px] pr-[18px]">
            <span
              aria-hidden="true"
              className="absolute inset-[18px_0_0_18px] rounded-md border-[1.5px] border-[#329fd2]"
            />
            <div className="group relative aspect-[4/5] overflow-hidden rounded-md bg-[#122640]">
              <Image
                src={chairmanPhoto}
                alt={`${LEADERSHIP.chairman.name}, ${LEADERSHIP.chairman.roles[0]}`}
                placeholder="blur"
                fill
                sizes="(min-width: 768px) 28rem, 90vw"
                className="object-cover object-[center_20%] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
              />
            </div>
          </figure>
          <div className="flex min-w-0 flex-col gap-[1.375rem]">
            <p className={EYEBROW}>
              <Dash />
              Leadership
            </p>
            <h2
              id="lead-h"
              className="text-[2.125rem] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#122640] sm:text-5xl/[1.06] lg:text-[3.375rem]"
            >
              {LEADERSHIP.chairman.name}
            </h2>
            <ul className="flex flex-wrap gap-2.5">
              {LEADERSHIP.chairman.roles.map((role, i) => (
                <li
                  key={role}
                  className={
                    i === 0
                      ? "rounded-[3px] bg-[#122640] px-3.5 py-2 text-[0.8125rem] font-bold text-white"
                      : "rounded-[3px] bg-[#e8f5fb] px-3.5 py-2 text-[0.8125rem] font-bold text-[#1a7cb0]"
                  }
                >
                  {role}
                </li>
              ))}
            </ul>
            <p className="text-pretty text-[1.0625rem] leading-[1.75]">
              The same person leads both brands, which is why the group can take a business question
              end to end rather than handing it between firms. A structure decision, the registration
              that follows from it and the technology a business needs afterwards are usually the
              same conversation held three times.
            </p>
            <p className="text-pretty text-base/[1.75] leading-[1.75]">
              It is also why the group is deliberately personal. You deal with the people doing the
              work, and the person accountable for it is named on this page.
            </p>
            <div className="mt-1.5 border-t border-[#e3e9ef] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5b6778]">
                The group&rsquo;s philosophy
              </p>
              <p className="mt-2 text-[1.1875rem] font-semibold leading-normal text-[#122640]">
                {SITE.taglineParts[0]}{" "}
                <span className="text-[#1a7cb0]">{SITE.taglineParts[1]}</span>
              </p>
            </div>
            <Link
              href="/team/"
              className="inline-flex min-h-[3.25rem] items-center gap-2 self-start rounded-[4px] border-[1.5px] border-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#122640] hover:text-white hover:shadow-[0_10px_22px_-12px_rgba(18,38,64,0.6)]"
            >
              Meet the Wider Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Group of companies (master rule 6). */}
      <section
        id="companies"
        aria-labelledby="co-h"
        className={`scroll-mt-28 bg-[#0c1a2d] text-white ${SECTION}`}
      >
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW_DARK}>
                <Dash />
                Our group of companies
              </p>
              <h2
                id="co-h"
                className="text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl/[1.12] lg:text-[2.75rem]"
              >
                Two brands under one group.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base/[1.7] leading-[1.7] text-[#c9d6e3] lg:justify-self-end">
              Kept separate because they do different work for different buyers, and connected
              because the same leadership stands behind both.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {BRANDS.map((brand) => {
              const Icon = brand.icon;
              const ctaClass =
                "inline-flex min-h-[3rem] items-center gap-2 self-start rounded-[4px] border-[1.5px] border-[#329fd2] px-5 text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#329fd2] hover:text-[#0c1a2d]";
              return (
                <article
                  key={brand.name}
                  className="flex flex-col gap-[1.125rem] rounded-md border border-white/[0.14] bg-white/[0.03] p-7 transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-[#329fd2] hover:bg-[#329fd2]/[0.08] sm:p-11"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#329fd2]/[0.18]">
                      <Icon className="h-6 w-6 text-[#7cc8ec]" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#7cc8ec]">
                      {brand.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-[-0.01em] text-white">{brand.name}</h3>
                  <p className="flex-1 text-[0.9375rem] leading-[1.7] text-[#c9d6e3]">{brand.body}</p>
                  {brand.external ? (
                    <TrackedLink
                      href={brand.href}
                      external
                      event="technology_click"
                      params={{ label: "about_brand_card" }}
                      className={ctaClass}
                    >
                      {brand.cta}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </TrackedLink>
                  ) : (
                    <Link href={brand.href} className={ctaClass}>
                      {brand.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core values, vision and mission. */}
      <section aria-labelledby="val-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <div className="flex max-w-[40rem] flex-col gap-3.5">
            <p className={EYEBROW}>
              <Dash />
              Our core values
            </p>
            <h2 id="val-h" className={H2}>
              What guides every decision we make.
            </h2>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {VALUES.map(({ title, body, icon: Icon }) => (
              <li key={title} className="flex">
                <article
                  className={`flex flex-1 flex-col gap-4 rounded-md border border-[#e3e9ef] bg-white px-[1.875rem] py-9 ${LIFT}`}
                >
                  <Icon className="h-[2.125rem] w-[2.125rem] text-[#1a7cb0]" strokeWidth={1.4} aria-hidden="true" />
                  <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-[#122640]">{title}</h3>
                  <p className="text-[0.9375rem] leading-[1.65]">{body}</p>
                </article>
              </li>
            ))}
          </ul>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="flex flex-col gap-4 rounded-md bg-[#122640] p-7 text-white transition duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(18,38,64,0.6)] sm:p-12">
              <p className="text-xs font-bold tracking-[0.14em] text-[#7cc8ec]">OUR VISION</p>
              <p className="text-pretty text-xl/[1.4] font-semibold leading-[1.4] sm:text-[1.625rem]">
                To be the group businesses rely on for the long term, helping them flourish through
                clear guidance and practical innovation.
              </p>
            </article>
            <article className="flex flex-col gap-4 rounded-md bg-[#e8f5fb] p-7 text-[#122640] transition duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(26,124,176,0.45)] sm:p-12">
              <p className="text-xs font-bold tracking-[0.14em] text-[#1a7cb0]">OUR MISSION</p>
              <p className="text-pretty text-xl/[1.4] font-semibold leading-[1.4] sm:text-[1.625rem]">
                To deliver sustainable success by fostering trust, promoting innovation and providing
                expert leadership across all business verticals.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How we work. */}
      <section aria-labelledby="how-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>
                <Dash />
                How we work
              </p>
              <h2 id="how-h" className={H2}>
                Six things we hold to.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base/[1.7] leading-[1.7] lg:justify-self-end">
              Registration is a regulated process with no shortcuts in it. What we can control is how
              clearly it is handled.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-md border border-[#e3e9ef] bg-[#e3e9ef] md:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((item, i) => (
              <li
                key={item.title}
                className="flex flex-col gap-3.5 bg-white px-7 py-8 transition-colors duration-300 hover:bg-[#f4fafd]"
              >
                <span className="text-[0.8125rem] font-extrabold tracking-[0.06em] text-[#329fd2]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg/[1.35] font-bold leading-[1.35] text-[#122640]">{item.title}</h3>
                <p className="text-[0.9375rem] leading-[1.65]">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we help you register. */}
      <section aria-labelledby="reg-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-10`}>
          <div className="flex max-w-[40rem] flex-col gap-3.5">
            <p className={EYEBROW}>
              <Dash />
              What we help you register
            </p>
            <h2 id="reg-h" className={H2}>
              Four structures, and a straight answer on which one fits.
            </h2>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STRUCTURES.map(({ title, body, href, icon: Icon }) => (
              <li key={href} className="flex">
                <TrackedLink
                  href={href}
                  event="service_card_click"
                  params={{ label: `about_${href.split("/")[2]}` }}
                  className={`flex flex-1 flex-col gap-3.5 rounded-md border border-[#e3e9ef] bg-white px-[1.625rem] py-[1.875rem] ${LIFT}`}
                >
                  <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#e8f5fb]">
                    <Icon className="h-6 w-6 text-[#122640]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="text-[1.1875rem] font-bold text-[#122640]">{title}</h3>
                  <p className="flex-1 text-sm/[1.6] leading-[1.6]">{body}</p>
                  <span className="text-sm font-semibold text-[#1a7cb0]">
                    Explore {title} <span aria-hidden="true">→</span>
                  </span>
                </TrackedLink>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            Not sure which fits?{" "}
            <Link href="/compare/" className="font-semibold text-[#1a7cb0] hover:underline">
              Compare all four structures
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Closing CTA. */}
      <section aria-labelledby="cta-h" className="px-5 pb-16 sm:px-8 md:pb-24">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-stretch overflow-hidden rounded-md bg-[#122640] text-white">
          <div className="relative min-h-[16.25rem] flex-[1_1_100%] bg-[#0c1a2d] sm:flex-[0_1_17.5rem]">
            <Image
              src={chairmanPhoto}
              alt=""
              placeholder="blur"
              fill
              sizes="(min-width: 640px) 17.5rem, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <div className="flex min-w-0 flex-[1_1_26rem] flex-col justify-center gap-4 p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]">
              We don&rsquo;t just build businesses
            </p>
            <h2
              id="cta-h"
              className="text-balance text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.75rem]"
            >
              We build futures. Let&rsquo;s build yours.
            </h2>
            <p className="max-w-[33.75rem] text-base/[1.7] leading-[1.7] text-[#d5e0ea]">
              Tell us what you are building and we will help you choose the right structure before
              anything is filed.
            </p>
            <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <TrackedLink
                href="/contact/"
                event="primary_cta_click"
                params={{ label: "about_footer_cta" }}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]"
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={WHATSAPP_HREF}
                external
                event="whatsapp_click"
                params={{ label: "about_footer_cta" }}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#329fd2] hover:text-[#0c1a2d]"
              >
                WhatsApp Us
              </TrackedLink>
              <TrackedLink
                href={telHref}
                event="phone_click"
                params={{ label: "about_footer_cta" }}
                className="inline-flex min-h-[2.75rem] items-center text-[0.9375rem] font-semibold text-white hover:text-[#7cc8ec] hover:underline"
              >
                {SITE.phone.display}
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
