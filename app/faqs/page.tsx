import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardList, Columns3, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { BTN_GHOST_DARK, BTN_LIGHT, CARD, Dash, EYEBROW, EYEBROW_DARK, H2, H2_DARK } from "@/components/pages/service-kit";
import { FaqExplorer, type FaqGroup } from "@/components/shared/faq-explorer";
import { SERVICES } from "@/lib/services";
import { GENERAL_FAQS } from "@/lib/home-faqs";
import { FAQ_LINKS, FAQ_RESOURCES, FAQ_TOPICS } from "@/lib/faq-page";
import { SITE, whatsappHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, type Crumb } from "@/lib/schema";
import cta from "@/public/photos/faqs/cta.webp";
import { H1 } from "@/lib/typography";

/**
 * The FAQ library.
 *
 * The questions and answers are the site's own, from lib/home-faqs.ts and each
 * service in lib/services.ts, so the wording here cannot drift from the
 * homepage or the service pages. lib/faq-page.ts holds only what this page
 * adds: topic introductions, search keywords and the next-step links.
 *
 * Motion is CSS only (the `.faq-*` classes in globals.css): a 12px fade-up on
 * the hero, a fade on the topic strip, a scroll-in rise on the resource cards
 * and a height transition on the accordion. It used the shared PageFx layer
 * until 2026-10, whose drifting glows, cursor spotlight and 1.1s headline
 * reveal were more movement than a reference page needs (master rule 24).
 *
 * No response time is promised anywhere on the page: none is verified
 * (master rule 23).
 */

const PATH = "/faqs/";

export const metadata = pageMeta({
  title: "Business Registration FAQs India | Raulji Group",
  description:
    "Find clear answers to common business registration questions in India, including Private Limited Company, LLP, Partnership and Proprietorship registration, documents, costs and compliance.",
  path: PATH,
  ogHeadline: "Business Registration FAQs",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "FAQs", path: PATH },
];

const RESOURCE_ICONS = { registration: ClipboardList, compare: Columns3, guides: BookOpen } as const;

const CTA_ALT = "Two colleagues reviewing papers and a laptop at a table";

function groupFor(id: string, href: string | null, faqs: { q: string; a: string }[]): FaqGroup {
  const topic = FAQ_TOPICS[id]!;
  return {
    id,
    href,
    title: topic.title,
    sub: topic.sub,
    blurb: topic.blurb,
    icon: topic.icon,
    keywords: topic.keywords,
    faqs: faqs.map((f) => ({ ...f, link: FAQ_LINKS[id]?.[f.q] })),
  };
}

export default function FaqsPage() {
  const groups: FaqGroup[] = [
    groupFor("general", null, GENERAL_FAQS),
    ...SERVICES.map((service) => groupFor(service.slug, service.path, service.faqs)),
  ];

  // Schema carries every Q&A on the page, all of which is in the HTML.
  const allFaqs = groups.flatMap((g) => g.faqs);

  const stats = [
    { value: String(allFaqs.length), label: "Questions" },
    { value: String(groups.length), label: "Topics" },
    { value: String(SERVICES.length), label: "Business structures" },
    { value: "India", label: "Business guidance" },
  ];

  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(allFaqs))} />

      <FaqExplorer
        groups={groups}
        breadcrumbs={
          <div className="faq-fade [&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
        }
        heroCopy={
          <>
            <p className={`faq-rise ${EYEBROW_DARK}`}>
              <Dash />
              Raulji Group · FAQ Library
            </p>
            <h1 id="faq-h1" className={`faq-rise ${H1} text-white [--d:80ms]`}>
              Business registration, <span className="text-[#7cc8ec]">answered plainly.</span>
            </h1>
            <p className="faq-rise max-w-[40rem] text-pretty text-base leading-[1.75] text-[#c9d6e3] [--d:160ms] sm:text-lg/[1.75]">
              Clear answers to common questions about business structures, registration, documents,
              costs, compliance and getting started in India.
            </p>
          </>
        }
        stats={
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1">
                <dt className="text-[0.8125rem] font-medium text-[#c9d6e3]">{s.label}</dt>
                <dd className="text-[1.75rem] font-bold leading-none tracking-[-0.02em] text-white sm:text-[2rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Where to go next: overview → comparison → guides. */}
      <section aria-labelledby="res-h" className="border-t border-[#e3e9ef] bg-[#f4f7fa] py-16 md:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-5 sm:px-8">
          <div className="flex max-w-[40rem] flex-col gap-3.5">
            <p className={EYEBROW}>
              <Dash />
              Keep reading
            </p>
            <h2 id="res-h" className={H2}>
              Explore Business Resources
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
            {FAQ_RESOURCES.map((r) => {
              const Icon = RESOURCE_ICONS[r.icon];
              return (
                <li key={r.href} className="faq-reveal">
                  <Link
                    href={r.href}
                    className={`${CARD} group flex h-full flex-col gap-4 p-6 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#329fd2] hover:shadow-[0_18px_36px_-28px_rgba(18,38,64,0.45)] sm:p-7`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e8f5fb]">
                      <Icon className="h-5 w-5 text-[#1a7cb0]" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="flex flex-1 flex-col gap-2">
                      <span className="text-lg font-bold text-[#122640]">{r.title}</span>
                      <span className="text-[0.9375rem] leading-[1.65] text-[#4a5668]">{r.body}</span>
                    </span>
                    <ArrowRight
                      className="h-5 w-5 text-[#1a7cb0] transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Closing CTA. */}
      <section aria-labelledby="cta-h" className="bg-[#f4f7fa] px-5 pb-16 sm:px-8 md:pb-24">
        <div className="faq-reveal mx-auto flex max-w-[1176px] flex-wrap items-stretch overflow-hidden rounded-lg bg-[#122640] text-white">
          <figure className="relative m-0 min-h-[240px] flex-[1_1_20rem] bg-[#1b3350]">
            <Image
              src={cta}
              alt={CTA_ALT}
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </figure>
          <div className="flex min-w-0 flex-[1.6_1_28rem] flex-col justify-center gap-6 p-7 sm:p-12 lg:p-14">
            <div className="flex flex-col gap-3.5">
              <h2 id="cta-h" className={H2_DARK}>
                Still have a business question?
              </h2>
              <p className="max-w-[35rem] text-base leading-[1.7] text-[#d5e0ea]">
                Every business is different. Tell us what you&apos;re trying to set up or change, and
                we&apos;ll point you toward the relevant structure, process or service.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/contact/"
                event="primary_cta_click"
                params={{ label: "faqs_footer" }}
                className={BTN_LIGHT}
              >
                Talk to an Expert
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={whatsappHref("Hello Raulji Group, I have a question about business registration.")}
                external
                event="whatsapp_click"
                params={{ label: "faqs_footer" }}
                className={BTN_GHOST_DARK}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Us
              </TrackedLink>
              <TrackedLink
                href={`tel:${SITE.phone.e164}`}
                event="phone_click"
                params={{ label: "faqs_footer" }}
                className={BTN_GHOST_DARK}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {SITE.phone.display}
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
