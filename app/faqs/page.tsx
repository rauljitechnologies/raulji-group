import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { BTN_GHOST_DARK, BTN_LIGHT, Dash, EYEBROW_DARK, H2_DARK } from "@/components/pages/service-kit";
import { FaqExplorer, type FaqGroup } from "@/components/shared/faq-explorer";
import { PageFx } from "@/components/shared/page-fx";
import { SERVICES } from "@/lib/services";
import { GENERAL_FAQS } from "@/lib/home-faqs";
import { SITE, whatsappHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, type Crumb } from "@/lib/schema";
import cta from "@/public/photos/faqs/cta.webp";

/**
 * FAQs, laid out to the "Raulji FAQs" design (claude.ai/design), photograph
 * and motion included; the header, footer and mobile bar are the site-wide
 * ones.
 *
 * The questions and answers are the site's own, from lib/home-faqs.ts and each
 * service in lib/services.ts, not the design's copy of them. The design had
 * drifted from the reviewed wording in two answers, dropping the names of the
 * authorities Raulji Group is not affiliated with. Its empty-search line "we
 * reply within one working day" is also left out: no response time is
 * verified (master rule 23).
 */

const PATH = "/faqs/";
const ROOT_ID = "faqs-page";

export const metadata = pageMeta({
  title: "Business Registration FAQs | Raulji Group",
  description:
    "Answers on Private Limited, LLP, Partnership Firm and Proprietorship registration in India: eligibility, documents, process, cost and timelines.",
  path: PATH,
  ogHeadline: "Business Registration FAQs",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "FAQs", path: PATH },
];

/** Topic heading and kicker per structure, as the design labels them. */
const GROUP_META: Record<string, Pick<FaqGroup, "title" | "sub" | "icon">> = {
  "pvt-registration": { title: "Private Limited Company", sub: "Registration", icon: "pvt" },
  "llp-registration": { title: "LLP", sub: "Limited Liability Partnership", icon: "llp" },
  "partnership-registration": { title: "Partnership Firm", sub: "Partnership Registration", icon: "partnership" },
  "proprietorship-registration": { title: "Proprietorship", sub: "Sole Proprietorship", icon: "proprietorship" },
};

const CTA_ALT = "Two colleagues reviewing papers and a laptop at a table";

export default function FaqsPage() {
  const groups: FaqGroup[] = [
    { id: "general", title: "General", sub: "All structures", href: null, icon: "general", faqs: GENERAL_FAQS },
    ...SERVICES.map((service) => ({
      id: service.slug,
      title: GROUP_META[service.slug]?.title ?? service.name,
      sub: GROUP_META[service.slug]?.sub ?? "Registration",
      icon: GROUP_META[service.slug]?.icon ?? "general",
      href: service.path,
      faqs: service.faqs,
    })),
  ];

  // Schema carries every Q&A on the page, all of which is in the HTML.
  const allFaqs = groups.flatMap((g) => g.faqs);

  return (
    <div id={ROOT_ID} className="bg-white text-[#3a4656]">
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(allFaqs))} />
      <PageFx rootId={ROOT_ID} revealFrom={2} />
      <div
        data-progress
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#1a7cb0,#329fd2)]"
      />

      <FaqExplorer
        groups={groups}
        breadcrumbs={
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
        }
        heroCopy={
          <>
            <p className={EYEBROW_DARK}>
              <Dash />
              {allFaqs.length} answers · {groups.length} topics
            </p>
            <h1
              id="faq-h1"
              className="text-balance text-[2.375rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-[3.25rem] xl:text-[4.125rem]"
            >
              Business registration, <span className="text-[#7cc8ec]">answered plainly.</span>
            </h1>
            <p className="max-w-[38.75rem] text-pretty text-base leading-[1.75] text-[#c9d6e3] sm:text-lg/[1.75]">
              The questions we are asked most about registering and running a business in India,
              grouped by structure.
            </p>
          </>
        }
        aside={
          <div className="mt-2.5 flex flex-col gap-2.5 rounded-lg bg-[#f4f7fa] p-5">
            <p className="text-[0.9375rem] font-bold text-[#122640]">Still choosing a structure?</p>
            <p className="text-sm leading-[1.6]">
              See all four side by side on liability, compliance, tax and funding.
            </p>
            <Link href="/compare/" className="self-start text-sm font-bold text-[#1a7cb0] hover:underline">
              Compare structures <span aria-hidden="true">→</span>
            </Link>
          </div>
        }
      />

      {/* Closing CTA. */}
      <section aria-labelledby="cta-h" className="px-5 pb-14 sm:px-8 md:pb-24">
        <div
          data-spot="dark"
          className="mx-auto flex max-w-[1176px] flex-wrap items-stretch overflow-hidden rounded-lg bg-[#122640] text-white"
        >
          <figure className="relative m-0 min-h-[260px] flex-[1_1_20rem] bg-[#1b3350]">
            <Image
              src={cta}
              alt={CTA_ALT}
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </figure>
          <div className="flex min-w-0 flex-[1.6_1_28rem] flex-col justify-center gap-6 p-8 sm:p-14">
            <div className="flex flex-col gap-3.5">
              <h2 id="cta-h" className={H2_DARK}>
                Question not answered here?
              </h2>
              <p className="max-w-[35rem] text-base leading-[1.7] text-[#d5e0ea]">
                Call us or send a message. We will tell you what applies to your business
                specifically, before you commit to anything.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/contact/"
                event="primary_cta_click"
                params={{ label: "faqs_footer" }}
                className={`${BTN_LIGHT} hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]`}
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={whatsappHref("Hello Raulji Group, I have a question about business registration.")}
                external
                event="whatsapp_click"
                params={{ label: "faqs_footer" }}
                className={`${BTN_GHOST_DARK} hover:-translate-y-0.5`}
              >
                WhatsApp an Expert
              </TrackedLink>
            </div>
            <p className="text-sm text-[#c9d6e3]">
              Or call{" "}
              <TrackedLink
                href={`tel:${SITE.phone.e164}`}
                event="phone_click"
                params={{ label: "faqs_footer" }}
                className="font-semibold text-white hover:underline"
              >
                {SITE.phone.display}
              </TrackedLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
