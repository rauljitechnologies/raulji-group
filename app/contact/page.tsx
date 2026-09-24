import Image from "next/image";
import { ArrowRight, Check, Mail, MapPin, MessageCircle, Phone, Plus, type LucideIcon } from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ContactWizard, OpenStatus } from "@/components/forms/contact-wizard";
import { POPULAR_CITIES } from "@/lib/city-index";
import { SITE, LEADERSHIP, telHref, mailHref, whatsappHref, AUTHORITY_DISCLAIMER } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, type Crumb } from "@/lib/schema";

/**
 * Contact, built to the "Raulji Contact" design (claude.ai/design). The header
 * and footer are the site-wide ones.
 *
 * Left out of the design's copy, because master rule 23 says not to promise
 * response times unless verified and nothing here has been: "Reply within one
 * working day", "usually replies within the hour", the day-by-day timings on
 * the next-steps cards and the "How quickly will you reply?" question. Also
 * out: "Free first consultation" (unconfirmed; "No obligation" is the site's
 * existing, confirmed wording) and the languages card (unconfirmed). The quote
 * beside the Chairman's name is shown as the group's line, not as his words.
 */

export const metadata = pageMeta({
  title: "Contact Raulji Group | Start Your Business Registration",
  description:
    "Talk to Raulji Group about registering a Private Limited Company, LLP, Partnership Firm or Proprietorship. Call +91 8511187689 or email admin@raulji.com.",
  path: "/contact/",
  ogHeadline: "Start Your Business",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact/" },
];

const PROMISES = ["No obligation", "Fees confirmed in writing", "Nothing filed until you say so"];

const JOURNEY = [
  { label: "You", title: "Send your enquiry", body: "Tell us what you are starting. Three short steps." },
  { label: "Us", title: "Advisory call", body: "We understand your plans, partners and timeline." },
  {
    label: "In writing",
    title: "Written recommendation",
    body: "Structure, document checklist and the cost, before anything is filed.",
  },
  {
    label: "When you’re ready",
    title: "We file and support",
    body: "Registration handled end to end, then ongoing compliance.",
  },
];

const FAQS = [
  {
    q: "Is there any obligation?",
    a: "No. The first conversation is about what you actually need. Nothing is filed or billed until you agree to it.",
  },
  {
    q: "Do I need to visit your office?",
    a: `No. Registration is filed online and identity verification is done remotely. If you would rather meet in person in ${SITE.locality}, call ahead so we can confirm a time.`,
  },
  {
    q: "What will it cost?",
    a: "Our professional fee and the expected government charges are confirmed in writing before any work begins, based on the structure and state you choose.",
  },
  {
    q: "Do you work with businesses outside Gujarat?",
    a: `Yes. Company incorporation is filed online, so the process does not depend on where the business is. We are based in ${SITE.locality}, ${SITE.region}, and work with businesses across India.`,
  },
];

const EYEBROW =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]";
const H2 =
  "text-balance text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#122640] sm:text-4xl lg:text-[2.75rem]";
const CONTAINER = "mx-auto max-w-[1240px] px-5 sm:px-8";
const SECTION = "py-16 md:py-24 lg:py-28";

function Dash() {
  return <span className="h-0.5 w-7 bg-[#329fd2]" aria-hidden="true" />;
}

export default function ContactPage() {
  const channels: {
    key: string;
    value: string;
    note: string;
    href: string;
    icon: LucideIcon;
    event: "phone_click" | "whatsapp_click" | "email_click";
    external?: boolean;
  }[] = [
    {
      key: "Call us",
      value: SITE.phone.display,
      note: SITE.hours.display,
      href: telHref,
      icon: Phone,
      event: "phone_click",
    },
    {
      key: "WhatsApp",
      value: `Message ${SITE.phone.display}`,
      note: "The easiest way to share documents",
      href: whatsappHref(
        "Hello Raulji Group, I would like help choosing and registering a business structure.",
      ),
      icon: MessageCircle,
      event: "whatsapp_click",
      external: true,
    },
    {
      key: "Email",
      value: SITE.email,
      note: "For documents and longer questions",
      href: mailHref,
      icon: Mail,
      event: "email_click",
    },
  ];

  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(FAQS))} />

      {/* Hero. The form below overlaps its lower edge, so it carries extra bottom padding. */}
      <section
        aria-labelledby="ct-h"
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
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-7 px-5 pb-[8.75rem] pt-6 sm:px-8 md:gap-11 md:pb-[12.5rem] md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
          <div className="flex max-w-[47.5rem] flex-col gap-5">
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]">
              <Dash />
              Start your business
            </p>
            <h1
              id="ct-h"
              className="text-balance text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl xl:text-[4.5rem]"
            >
              Let&rsquo;s talk about <span className="text-[#7cc8ec]">what you&rsquo;re building.</span>
            </h1>
            <p className="max-w-[38.75rem] text-pretty text-base leading-[1.75] text-[#c9d6e3] sm:text-lg">
              Tell us what you are starting and we will come back to you on which structure fits,
              what documents you need and what it will cost. No obligation, and nothing gets filed
              until you say so.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-white">
              {PROMISES.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#329fd2]" strokeWidth={2.4} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The form and the direct channels, lifted over the hero's edge. */}
      <section aria-label="Enquiry" className="relative -mt-[7.5rem] pb-16 md:-mt-[10.625rem] md:pb-24 lg:pb-28">
        <div className={`${CONTAINER} grid items-start gap-7 lg:grid-cols-[1.6fr_1fr]`}>
          <div className="min-w-0">
            <ContactWizard />
          </div>

          <aside className="flex min-w-0 flex-col gap-4">
            <div className="flex flex-col gap-[1.125rem] rounded-lg bg-white p-[1.625rem] shadow-[0_30px_70px_-40px_rgba(12,26,45,0.5),0_0_0_1px_rgba(18,38,64,0.06)]">
              <div className="flex items-center gap-3.5">
                <Image
                  src={LEADERSHIP.chairman.photo}
                  alt=""
                  width={60}
                  height={60}
                  className="h-[3.75rem] w-[3.75rem] rounded-full border-2 border-[#329fd2] object-cover object-[center_20%]"
                />
                <div>
                  <p className="text-base font-bold text-[#122640]">{LEADERSHIP.chairman.name}</p>
                  <p className="text-[0.8125rem]">{LEADERSHIP.chairman.roles[0]}</p>
                </div>
              </div>
              <p className="text-[0.9375rem] font-medium leading-[1.6] text-[#122640]">
                You deal with the people doing the work, and the person accountable for it is named
                here.
              </p>
              <OpenStatus />
            </div>

            {channels.map(({ key, value, note, href, icon: Icon, event, external }) => (
              <TrackedLink
                key={key}
                href={href}
                external={external}
                event={event}
                params={{ label: "contact_channels" }}
                className="flex items-center gap-4 rounded-lg border border-[#e3e9ef] bg-white px-[1.375rem] py-5 transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:translate-x-1 hover:border-[#329fd2] hover:shadow-[0_16px_32px_-20px_rgba(18,38,64,0.4)]"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#122640]">
                  <Icon className="h-[1.375rem] w-[1.375rem] text-white" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#1a7cb0]">{key}</span>
                  <span className="text-base font-bold text-[#122640] [overflow-wrap:anywhere]">{value}</span>
                  <span className="text-[0.8125rem] text-[#5b6778]">{note}</span>
                </span>
                <ArrowRight className="h-4 w-4 flex-none text-[#329fd2]" aria-hidden="true" />
              </TrackedLink>
            ))}

            <p className="rounded-lg bg-[#f4f7fa] p-5 text-xs leading-[1.6] text-[#5b6778]">
              {AUTHORITY_DISCLAIMER}
            </p>
          </aside>
        </div>
      </section>

      {/* What happens next. */}
      <section aria-labelledby="next-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <p className={EYEBROW}>
                <Dash />
                What happens next
              </p>
              <h2 id="next-h" className={H2}>
                From enquiry to registered, clearly.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base leading-[1.7] lg:justify-self-end">
              No pressure and no surprises. You know the structure, the documents and the cost
              before anything is filed.
            </p>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((item, i) => (
              <li
                key={item.title}
                className="flex flex-col gap-3.5 rounded-md border border-[#e3e9ef] bg-white px-6 py-7 transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-[#329fd2] hover:shadow-[0_24px_48px_-26px_rgba(18,38,64,0.4)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#122640] text-[0.9375rem] font-extrabold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-bold text-[#1a7cb0]">{item.label}</span>
                </div>
                <h3 className="text-lg font-bold text-[#122640]">{item.title}</h3>
                <p className="text-sm leading-[1.65]">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where we are. */}
      <section aria-labelledby="where-h" className={SECTION}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              Where we are
            </p>
            <h2 id="where-h" className={H2}>
              {SITE.locality}, {SITE.region}, working across India.
            </h2>
            <p className="text-base leading-[1.75]">
              Registration is filed online, so you do not need to visit us. If you would rather meet
              in person, call ahead so we can confirm a time.
            </p>
            <dl className="mt-2 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-[#e3e9ef] px-5 py-[1.125rem]">
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#1a7cb0]">Business hours</dt>
                <dd className="mt-1.5 text-[0.9375rem] font-semibold leading-normal text-[#122640]">
                  {SITE.hours.display}
                  <br />
                  <span className="font-normal text-[#5b6778]">Sunday closed</span>
                </dd>
              </div>
              <div className="rounded-md border border-[#e3e9ef] px-5 py-[1.125rem]">
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#1a7cb0]">Based in</dt>
                <dd className="mt-1.5 text-[0.9375rem] font-semibold leading-normal text-[#122640]">
                  <address className="not-italic">
                    {SITE.locality}, {SITE.region}, India
                  </address>
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-[#122640]">
              Where we work in Gujarat
            </p>
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {POPULAR_CITIES.map((city) => (
                <li key={city.slug} className="flex min-w-0">
                  <TrackedLink
                    href={`/${city.slug}/`}
                    event="city_page_click"
                    params={{ city: city.name, label: "contact_where" }}
                    className="group flex flex-1 items-center justify-between gap-2 rounded-md border border-[#e3e9ef] px-3 py-4 text-sm sm:gap-2.5 sm:px-[1.125rem] sm:text-[0.9375rem] font-semibold text-[#122640] transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:border-[#122640] hover:bg-[#122640] hover:text-white"
                  >
                    <span className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-[#329fd2]" strokeWidth={2} aria-hidden="true" />
                      {city.name}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </TrackedLink>
                </li>
              ))}
            </ul>
            <TrackedLink
              href="/gujarat/"
              event="gujarat_page_click"
              params={{ label: "contact_where" }}
              className="inline-flex min-h-[2.75rem] items-center gap-1.5 self-start text-sm font-semibold text-[#1a7cb0] hover:underline"
            >
              All 33 districts
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Quick answers. */}
      <section aria-labelledby="faq-h" className={`bg-[#0c1a2d] text-white ${SECTION}`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]">
              <Dash />
              Before you enquire
            </p>
            <h2
              id="faq-h"
              className="text-[1.75rem] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[2.5rem]"
            >
              Quick answers.
            </h2>
            <a
              href="#lead-form"
              className="mt-2 inline-flex min-h-[3.25rem] items-center gap-2 self-start rounded-[4px] bg-white px-[1.375rem] text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb]"
            >
              Start your enquiry
              <ArrowRight className="h-4 w-4 -rotate-90" aria-hidden="true" />
            </a>
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
          </div>
        </div>
      </section>
    </div>
  );
}
