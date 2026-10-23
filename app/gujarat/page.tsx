import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, FileText, Globe, MapPin, Plus, Users, type LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { LeadForm } from "@/components/forms/lead-form";
import { HighlightComparison } from "@/components/shared/registration-tools";
import { GujaratCityFinder, RegionCards } from "@/components/shared/gujarat-city-finder";
import { DISTRICT_REGION, REGIONS } from "@/lib/gujarat-regions";
import { getArticle } from "@/lib/blog";
import { coverScale, scaleSizes } from "@/lib/image-sizes";
import { CITIES, CITY_SLUGS, GUJARAT_DISTRICTS } from "@/lib/cities";
import { SERVICES } from "@/lib/services";
import { STRUCTURE_META } from "@/lib/structure-meta";
import { SITE, TIMELINE_DISCLAIMER, telHref, whatsappHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, type Crumb } from "@/lib/schema";
import type { FAQ } from "@/lib/services";
import { H1, H2 } from "@/lib/typography";
import { CITY_CARD_PHOTOS, CITY_PAGE_PHOTOS, CITY_PLACE_PHOTOS, type Photo } from "@/lib/city-photos";

export const metadata = pageMeta({
  /*
   * Retitled 2026-10-22 against the Search Console period 14-20 Oct 2026. The
   * page took 76 impressions at an average position of 53.57 and no clicks,
   * and the queries bringing it up were structure + state ones -- "partnership
   * firm registration in Gujarat", "firm registration Gujarat", "LLP
   * registration in Gujarat". The old title and description led with district
   * coverage ("All 33 Districts", "Find your district's page"), which answers a
   * navigational query, not those. The district coverage is still on the page,
   * in the hero stat and the districts section; it is no longer what the title
   * is about. Proprietorship drops out of the title at 60 characters and stays
   * in the description.
   */
  title: "Company, LLP & Firm Registration in Gujarat | Raulji Group",
  description:
    "Register a Pvt Ltd company, LLP, partnership firm or proprietorship in Gujarat. What is filed centrally, what is state-level, and how to choose a structure.",
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
    /*
     * Added 2026-10-22. "Online registration of partnership firm in Gujarat"
     * is one of the priority queries in the 14-20 Oct 2026 Search Console
     * period. The honest answer distinguishes the MCA filings, which are fully
     * online, from Registrar of Firms procedure, which is set by the state.
     * It deliberately does NOT claim that Gujarat's Registrar of Firms accepts
     * online applications: that has not been verified against a state source,
     * and it is recorded as unverified in docs/seo-improvement-audit.md.
     */
    q: "Can a partnership firm be registered online in Gujarat?",
    a: "Company and LLP incorporation is genuinely online end to end, filed with the Registrar of Companies through the MCA portal. Partnership firm registration is a different thing: the firm is created by the partners' deed, and registering it is done with the Registrar of Firms for Gujarat under state procedure rather than as an MCA filing. The parts we handle for you \u2014 drafting the deed, the stamp duty position, assembling the partners' documents and the firm's PAN application \u2014 are handled remotely wherever you are in the state. We confirm the Registrar of Firms' current procedure and the applicable stamp duty before anything is executed, rather than quoting a process that may have moved.",
  },
  {
    q: "What is the difference between firm registration and company registration in Gujarat?",
    a: "They are two separate systems. Registering a company, or an LLP, means incorporating a new legal entity under central law, filed with the Registrar of Companies, which issues a Certificate of Incorporation. Registering a firm means recording an existing partnership \u2014 one already created by the partners' deed \u2014 with the Registrar of Firms for the state. A company exists because it was incorporated. A firm exists because the partners agreed, and registration adds the ability to enforce contracts in court under section 69 of the Indian Partnership Act, 1932. The liability position differs too: a company's shareholders are liable only for what is unpaid on their shares, while a firm's partners are personally liable without limit.",
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

const STATE_FACTS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Filed online, statewide",
    body: "Company and LLP incorporation goes through the MCA portal, so your location in Gujarat does not affect the process or the timeline.",
    icon: Globe,
  },
  {
    title: "One state for GST",
    body: "All of Gujarat is a single GST state, so one registration covers multiple locations within it, with additional places of business declared.",
    icon: FileText,
  },
  {
    title: "Partnership firms are state-level",
    body: "Partnership firm registration is with the Registrar of Firms for Gujarat, and stamp duty on the deed is set by the state.",
    icon: Users,
  },
  {
    title: `Based in ${SITE.locality}`,
    body: `We operate from ${SITE.locality} and serve the rest of the state remotely. We do not claim offices we do not have.`,
    icon: MapPin,
  },
];

const GUIDES = [
  "starting-business-gujarat-registration-guide",
  "how-to-choose-business-structure-india",
  "common-business-registration-mistakes-india",
]
  .map((slug) => getArticle(slug))
  .filter((article): article is NonNullable<typeof article> => article !== null);

/*
 * Photographs from the "Raulji Gujarat v2" design. All of them are already
 * self-hosted for the city pages (lib/city-photos.ts), so this page adds no
 * new files. The city finder's card photos come from CITY_CARD_PHOTOS; see
 * the note there on which ones are confirmed as the named city.
 */
const AHD = CITY_PLACE_PHOTOS.ahmedabad;
const VAD = CITY_PLACE_PHOTOS.vadodara;
const GALLERY: { city: string; slug: string; caption: string; photo: Photo }[] = [
  { city: "Ahmedabad", slug: "ahmedabad", caption: "Gujarat\u2019s largest commercial centre", photo: AHD.hero },
  { city: "Vadodara", slug: "vadodara", caption: "Where Raulji Group is based", photo: VAD.hero },
  { city: "Ahmedabad", slug: "ahmedabad", caption: "Startups to trading families", photo: AHD.gallery[3] },
  { city: "Vadodara", slug: "vadodara", caption: "Engineering and process industry", photo: VAD.environment[1] },
];
const PHOTO = "object-cover";

const EYEBROW =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1872a3]";
const EYEBROW_DARK =
  "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7cc8ec]";
const CONTAINER = "mx-auto max-w-[1240px] px-5 sm:px-8";
const SECTION = "py-16 md:py-24 lg:py-28";
const LIFT =
  "transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-[#329fd2] hover:shadow-[0_24px_48px_-26px_rgba(18,38,64,0.4)]";

/** Inline prose link, so contextual links read as links inside body copy. */
const INLINE_LINK = "font-semibold text-[#1872a3] underline-offset-4 hover:underline";

/*
 * Who actually registers each structure. Added 2026-10-22: the Search Console
 * period 14-20 Oct 2026 shows /gujarat/ surfacing for "partnership firm
 * registration in Gujarat", "firm registration Gujarat" and "LLP registration
 * in Gujarat" at an average position of 53.57 with no clicks, and the page had
 * no state-level answer to any of them -- only a card link out to the service
 * page. Partnership firm registration is the one genuinely state-level step of
 * the four, so it belongs on the state page rather than only on the central
 * service page.
 *
 * Facts: companies and LLPs are filed with the Registrar of Companies through
 * the MCA portal, and the filing office for Gujarat is at Ahmedabad.
 * Partnership firms register with the Registrar of Firms at state level under
 * the Indian Partnership Act, 1932, where registration is optional (s.58) and
 * non-registration carries the s.69 bar on suing to enforce a contract. All of
 * these are recorded in docs/legal-content-review.md.
 */
const WHERE_REGISTERED: {
  structure: string;
  href: string;
  authority: string;
  level: string;
}[] = [
  {
    structure: "Private Limited Company",
    href: "/services/pvt-registration/",
    authority: "Registrar of Companies, through the MCA portal",
    level: "Central",
  },
  {
    structure: "LLP",
    href: "/services/llp-registration/",
    authority: "Registrar of Companies, through the MCA portal",
    level: "Central",
  },
  {
    structure: "Partnership Firm",
    href: "/services/partnership-registration/",
    authority: "Registrar of Firms for Gujarat",
    level: "State",
  },
  {
    structure: "Proprietorship",
    href: "/services/proprietorship-registration/",
    authority: "No incorporation filing. GST or Udyam where they apply",
    level: "Activity-based",
  },
];

function Dash() {
  return <span className="h-0.5 w-7 bg-[#329fd2]" aria-hidden="true" />;
}

function SectionHead({
  eyebrow,
  title,
  id,
  lead,
  dark,
}: {
  eyebrow: string;
  title: string;
  id: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
      <div className="flex flex-col gap-3.5">
        <p className={dark ? EYEBROW_DARK : EYEBROW}>
          <Dash />
          {eyebrow}
        </p>
        <h2 id={id} className={dark ? H2.replace("text-[#122640]", "text-white") : H2}>
          {title}
        </h2>
      </div>
      {lead ? (
        <p
          className={`max-w-[30rem] text-base/[1.7] leading-[1.7] lg:justify-self-end ${dark ? "text-[#c9d6e3]" : ""}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export default function GujaratPage() {
  const finderCities = [...CITIES]
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      district: c.district,
      region: DISTRICT_REGION[c.district] ?? "Central",
      photo: CITY_CARD_PHOTOS[c.slug]?.src,
    }));
  const regionCounts = REGIONS.map((region) => ({
    region,
    count: finderCities.filter((c) => c.region === region).length,
  }));
  const structures = SERVICES.map((service) => ({
    slug: service.slug,
    name: service.shortName,
    href: service.path,
  }));

  return (
    <div className="bg-white text-[#3a4656]">
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(GUJARAT_FAQS))} />

      {/* Hero. */}
      <section
        aria-labelledby="gj-h"
        className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24"
      >
        <Image
          src={AHD.environment[0].src}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className={PHOTO}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,26,45,.96)_0%,rgba(12,26,45,.88)_50%,rgba(12,26,45,.6)_100%)]"
        />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 md:gap-14 md:pb-24 md:pt-8">
          <div className="[&_a:hover]:text-white [&_a]:text-[#c9d6e3] [&_li]:text-[#c9d6e3] [&_span[aria-current]]:font-semibold [&_span[aria-current]]:text-white [&_svg]:text-[#5b6f88]">
            <Breadcrumbs crumbs={crumbs} inline />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div className="flex min-w-0 flex-col gap-[1.375rem]">
              <p className={EYEBROW_DARK}>
                <Dash />
                Gujarat
              </p>
              <h1
                id="gj-h"
                className={`${H1} text-white`}
              >
                Register a company, LLP or partnership firm{" "}
                <span className="text-[#7cc8ec]">anywhere in Gujarat.</span>
              </h1>
              <p className="max-w-[36.25rem] text-pretty text-base/[1.75] leading-[1.75] text-[#c9d6e3] sm:text-lg/[1.75]">
                Raulji Group supports entrepreneurs and businesses across Gujarat with Private
                Limited Company, LLP, Partnership Firm and Proprietorship registration. Companies and
                LLPs are incorporated centrally through the MCA; partnership firms are registered with
                the Registrar of Firms for Gujarat, which is the one step that is genuinely state-level.
                We work from {SITE.locality}, with dedicated pages for {CITY_SLUGS.length} of the
                state&rsquo;s main business markets.
              </p>
              <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#enquiry"
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]"
                >
                  Start Your Business
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#cities"
                  className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#329fd2] hover:text-[#0c1a2d]"
                >
                  Find Your City
                </a>
              </div>
            </div>
            <div className="grid min-w-0 grid-cols-2 gap-2.5">
              <div className="col-span-2 flex items-baseline gap-3.5 rounded-md border border-white/[0.12] bg-[#122640] px-6 py-[1.375rem]">
                <span className="text-[3.5rem] font-extrabold leading-[0.9] tracking-[-0.04em] sm:text-[5.25rem]">
                  {GUJARAT_DISTRICTS.length}
                </span>
                <span className="text-sm/[1.4] leading-[1.4] text-[#c9d6e3]">
                  districts served,
                  <br />
                  one online process
                </span>
              </div>
              <RegionCards counts={regionCounts} />
            </div>
          </div>
        </div>
      </section>

      {/* Gujarat in pictures. */}
      <section aria-label="Gujarat in pictures" className="pt-5 md:pt-8">
        <ul className={`${CONTAINER} grid grid-cols-2 gap-3 lg:grid-cols-4`}>
          {GALLERY.map((g) => (
            <li key={g.caption}>
              <TrackedLink
                href={`/${g.slug}/`}
                event="city_page_click"
                params={{ city: g.city, label: "gujarat_gallery" }}
                className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-[#1b3350] outline-offset-2 hover:outline hover:outline-2 hover:outline-[#329fd2]"
              >
                <Image
                  src={g.photo.src}
                  alt={g.photo.alt}
                  fill
                  sizes={scaleSizes("(min-width: 1024px) 300px, 50vw", coverScale(g.photo.src, 4 / 3))}
                  placeholder="blur"
                  className={`${PHOTO} photo-zoom`}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,26,45,0)_40%,rgba(12,26,45,.88)_100%)]"
                />
                <span className="absolute inset-x-4 bottom-3.5 flex flex-col gap-0.5 text-white">
                  <span className="text-[0.9375rem] font-extrabold sm:text-base">
                    {g.city} <span aria-hidden="true">→</span>
                  </span>
                  <span className="hidden text-[0.8125rem] text-[#d5e0ea] sm:block">{g.caption}</span>
                </span>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </section>

      {/* The four structures. */}
      <section aria-labelledby="four-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="The four structures"
            id="four-h"
            title="Four structures, available anywhere in Gujarat."
            lead="The choice is the same across the state. What changes is which one suits the business you are actually building."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const meta = STRUCTURE_META[service.slug];
              const Icon = meta.icon;
              const photo = CITY_PAGE_PHOTOS.structures[service.slug];
              return (
                <li key={service.slug} className="flex">
                  <TrackedLink
                    href={service.path}
                    event="service_card_click"
                    params={{ label: "gujarat_cards", registration_type: service.shortName }}
                    className={`flex flex-1 flex-col gap-3.5 overflow-hidden rounded-lg border border-[#e3e9ef] bg-white px-[1.625rem] pb-[1.875rem] ${LIFT}`}
                  >
                    <span className="relative -mx-[1.625rem] mb-1 block aspect-video bg-[#e8f5fb]">
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                          placeholder="blur"
                          className={PHOTO}
                        />
                      ) : null}
                    </span>
                    <span className="flex items-center justify-between gap-2">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5fb]">
                        <Icon className="h-[1.625rem] w-[1.625rem] text-[#122640]" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="rounded-[3px] bg-[#e8f5fb] px-2 py-1 text-xs font-bold text-[#1872a3]">
                        {meta.time}
                      </span>
                    </span>
                    <h3 className="text-[1.3125rem] font-extrabold text-[#122640]">{service.name}</h3>
                    <p className="flex-1 text-sm/[1.6] leading-[1.6]">{meta.body}</p>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t border-[#eef2f6] pt-3.5 text-[0.8125rem]">
                      <dt className="text-[#5b6778]">Liability</dt>
                      <dd className="font-semibold text-[#122640]">{meta.liability}</dd>
                      <dt className="text-[#5b6778]">Owners</dt>
                      <dd className="font-semibold text-[#122640]">{meta.owners}</dd>
                    </dl>
                    <span className="text-sm font-bold text-[#1872a3]">
                      Explore {service.shortName} <span aria-hidden="true">→</span>
                    </span>
                  </TrackedLink>
                </li>
              );
            })}
          </ul>
          <p className="text-[0.8125rem] text-[#5b6778]">
            Setup times are typical estimates with complete documents. {TIMELINE_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* How we work across the state. */}
      <section aria-labelledby="st-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              How we work across the state
            </p>
            <h2 id="st-h" className={H2}>
              Same process in Bhuj as in Vapi.
            </h2>
            <p className="text-base/[1.75] leading-[1.75]">
              Incorporating a company or an LLP is a central, online process. Applications are filed
              with the Registrar of Companies through the MCA portal, and digital signatures are
              issued through video and Aadhaar-based verification. A business anywhere in Gujarat
              goes through exactly the same steps on the same timeline. Our{" "}
              <Link href="/services/business-registration/" className={INLINE_LINK}>
                business registration
              </Link>{" "}
              pillar sets out that process in full.
            </p>
            <p className="text-base/[1.75] leading-[1.75]">
              Registering a partnership firm is the exception, and it is handled by the state rather
              than the MCA. That is covered in the next section.
            </p>
            <p className="text-base/[1.75] leading-[1.75]">
              What is genuinely local is the context around the decision: what your customers expect,
              what a lender will ask for, and how much liability the business carries. That is what
              our city pages cover.
            </p>
            <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-lg bg-[#e8f5fb]">
              <Image
                src={CITY_PAGE_PHOTOS.remote.src}
                alt={CITY_PAGE_PHOTOS.remote.alt}
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                placeholder="blur"
                className={PHOTO}
              />
            </div>
          </div>
          <ul className="grid min-w-0 gap-4 sm:grid-cols-2">
            {STATE_FACTS.map(({ title, body, icon: Icon }) => (
              <li
                key={title}
                className={`flex flex-col gap-3 rounded-lg border border-[#e3e9ef] bg-white px-6 py-[1.625rem] ${LIFT}`}
              >
                <span className="flex h-[2.875rem] w-[2.875rem] items-center justify-center rounded-full bg-[#e8f5fb]">
                  <Icon className="h-[1.375rem] w-[1.375rem] text-[#1872a3]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="text-[1.0625rem] font-bold text-[#122640]">{title}</h3>
                <p className="text-sm/[1.65] leading-[1.65]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        * State-level registration. Added 2026-10-22 from the Search Console
        * period 14-20 Oct 2026: three of the six priority queries are
        * partnership/firm + Gujarat queries, and this page ranked ~53.57 for
        * them with nothing on it that answered them. Every statement here is
        * already carried elsewhere on the site and is recorded in
        * docs/legal-content-review.md; none of it is new law.
        */}
      <section id="state-level" aria-labelledby="sl-h" className={`scroll-mt-28 ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-11`}>
          <SectionHead
            eyebrow="State-level registration"
            id="sl-h"
            title="Partnership firms are registered in Gujarat, not centrally."
            lead="Company and LLP incorporation is central, and a proprietorship has no incorporation at all. Partnership firms are the exception, and they are why a state page has something of its own to say."
          />
          <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div className="flex min-w-0 flex-col gap-[1.125rem]">
              <p className="text-base/[1.75] leading-[1.75]">
                A{" "}
                <Link href="/services/pvt-registration/" className={INLINE_LINK}>
                  Private Limited Company
                </Link>{" "}
                and an{" "}
                <Link href="/services/llp-registration/" className={INLINE_LINK}>
                  LLP
                </Link>{" "}
                are incorporated under central law and filed with the Registrar of Companies through
                the MCA portal. The Registrar&rsquo;s office for this state sits in Ahmedabad, which
                makes no difference to how the filing is processed, because it is done online. A{" "}
                <Link href="/services/proprietorship-registration/" className={INLINE_LINK}>
                  proprietorship
                </Link>{" "}
                has no incorporation filing at all; what it has instead are the activity-based
                registrations that apply to it, such as GST or Udyam.
              </p>
              <p className="text-base/[1.75] leading-[1.75]">
                A{" "}
                <Link href="/services/partnership-registration/" className={INLINE_LINK}>
                  partnership firm
                </Link>{" "}
                works differently. The firm is created by the partners&rsquo; deed under the Indian
                Partnership Act, 1932, and registering it is done with the Registrar of Firms for
                Gujarat &mdash; a state office under state procedure, not an MCA filing. That is why
                a firm registers in the state where it carries on business, and why the step does not
                look like incorporation.
              </p>
              <h3 className="mt-2 text-[1.1875rem] font-bold text-[#122640]">
                Registration is optional. Section 69 is why firms do it anyway.
              </h3>
              <p className="text-base/[1.75] leading-[1.75]">
                Under the Act, registering the firm is optional. What makes it worth doing is section
                69: an unregistered firm cannot file a suit to enforce a right arising from a contract
                against a third party, and a partner cannot sue the firm or the other partners on the
                partnership contract. In plain terms, if a customer does not pay, an unregistered firm
                has no contractual route to court. For a firm selling on credit &mdash; which covers a
                great many trading firms in this state &mdash; that is a practical restriction rather
                than a theoretical one.
              </p>
              <h3 className="mt-2 text-[1.1875rem] font-bold text-[#122640]">
                Stamp duty on the deed is set by the state
              </h3>
              <p className="text-base/[1.75] leading-[1.75]">
                The deed must be executed on stamp paper of the value prescribed in Gujarat, and the
                amount varies with the capital or contribution involved. Because stamp duty is set at
                state level it is the same in Bhuj as in Vapi, but it is not the same as in a
                neighbouring state. The firm also applies for its own PAN, which a bank will ask for
                before opening a current account.
              </p>
              <p className="text-[0.9375rem] leading-[1.7] text-[#5b6778]">
                Registrar of Firms procedure and timelines are set by the state and are not the same
                as an MCA filing, so we confirm the current procedure and the applicable stamp duty
                before anything is executed. {TIMELINE_DISCLAIMER}
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-4 rounded-lg border border-[#e3e9ef] bg-[#f4f7fa] p-6 sm:p-8">
              <h3 className="text-[1.0625rem] font-bold text-[#122640]">
                Who registers each structure
              </h3>
              <dl className="flex flex-col divide-y divide-[#dde4ec]">
                {WHERE_REGISTERED.map((row) => (
                  <div key={row.structure} className="flex flex-col gap-1.5 py-3.5 first:pt-0 last:pb-0">
                    <dt className="flex flex-wrap items-center gap-2">
                      <Link href={row.href} className={`text-[0.9375rem] ${INLINE_LINK}`}>
                        {row.structure}
                      </Link>
                      <span className="rounded-[3px] bg-white px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-[#1872a3]">
                        {row.level}
                      </span>
                    </dt>
                    <dd className="text-sm/[1.6] leading-[1.6]">{row.authority}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#enquiry"
                className="mt-1 inline-flex min-h-[2.75rem] items-center gap-1.5 self-start text-[0.9375rem] font-bold text-[#122640] hover:text-[#1872a3] hover:underline"
              >
                Not sure which one applies to you?
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local markets. */}
      <section id="cities" aria-labelledby="ct-h" className={`scroll-mt-28 ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-7`}>
          <SectionHead
            eyebrow="Local markets"
            id="ct-h"
            title="Find your city."
            lead="Each page covers all four registration structures alongside the local business context that tends to shape the decision."
          />
          <GujaratCityFinder cities={finderCities} />
        </div>
      </section>

      {/* All 33 districts. */}
      <section aria-labelledby="ds-h" className={`relative overflow-hidden bg-[#0c1a2d] text-white ${SECTION}`}>
        <Image src={AHD.cta} alt="" fill sizes="100vw" placeholder="blur" className={PHOTO} />
        <div aria-hidden="true" className="absolute inset-0 bg-[rgba(12,26,45,.9)]" />
        <div className={`${CONTAINER} relative flex flex-col gap-8`}>
          <SectionHead
            dark
            eyebrow="All 33 districts"
            id="ds-h"
            title="Every district, served on the same terms."
            lead="Linked districts have one or more dedicated city pages. If yours is not linked, it does not mean we cannot help; call and we will answer directly."
          />
          <ul className="flex flex-wrap gap-2.5">
            {GUJARAT_DISTRICTS.map((district) => {
              const city = CITIES.find((c) => c.district === district);
              const pill =
                "flex min-h-[2.75rem] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2] hover:bg-[#329fd2] hover:text-[#0c1a2d]";
              return (
                <li key={district}>
                  {city ? (
                    <TrackedLink
                      href={`/${city.slug}/`}
                      event="city_page_click"
                      params={{ city: city.name, label: "gujarat_districts" }}
                      className={`${pill} border-white/[0.28] text-white`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#329fd2]" aria-hidden="true" />
                      {district}
                    </TrackedLink>
                  ) : (
                    <TrackedLink
                      href={telHref}
                      event="phone_click"
                      params={{ label: `gujarat_district_${district}` }}
                      className={`${pill} border-white/[0.12] text-[#9fb3c8]`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/25" aria-hidden="true" />
                      {district}
                      <span className="sr-only">: no city page yet, call {SITE.phone.display}</span>
                    </TrackedLink>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="max-w-3xl text-sm/[1.625] leading-relaxed text-[#9fb3c8]">
            We publish a city page only where there is something genuinely local to say about doing
            business there. Unlinked districts call {SITE.phone.display}.
          </p>
        </div>
      </section>

      {/* Comparison. */}
      <section id="compare" aria-labelledby="cmp-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} flex flex-col gap-8`}>
          <SectionHead
            eyebrow="Side by side"
            id="cmp-h"
            title="Choose the right business structure."
            lead="Liability, compliance load and whether you can raise equity are the differences that matter most."
          />
          <HighlightComparison structures={structures} />
          <Link
            href="/compare/"
            className="inline-flex min-h-[2.75rem] items-center gap-1.5 self-start text-[0.9375rem] font-semibold text-[#1872a3] hover:underline"
          >
            Read the full comparison guide
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Enquiry. The site-wide LeadForm, so leads reach the CRM unchanged. */}
      <section id="enquiry" aria-labelledby="enq-h" className={`scroll-mt-28 ${SECTION}`}>
        <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              Start your business in Gujarat
            </p>
            <h2 id="enq-h" className={H2}>
              Tell us where you are and what you are starting.
            </h2>
            <p className="text-base/[1.75] leading-[1.75]">
              We will come back to you on the structure, the documents and the cost.
            </p>
            <ul className="mt-2 flex flex-col gap-3">
              {["No obligation", "Fees confirmed in writing", "No travel needed, filed online"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[0.9375rem] font-semibold text-[#122640]">
                  <Check className="h-[1.125rem] w-[1.125rem] text-[#329fd2]" strokeWidth={2.4} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <TrackedLink
              href={telHref}
              event="phone_click"
              params={{ label: "gujarat_enquiry" }}
              className="mt-2 inline-flex min-h-[2.75rem] items-center self-start text-[0.9375rem] font-bold text-[#122640] hover:text-[#1872a3] hover:underline"
            >
              Prefer to talk? {SITE.phone.display}
            </TrackedLink>
            <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-lg bg-[#1b3350]">
              <Image
                src={CITY_PAGE_PHOTOS.enquiry.src}
                alt={CITY_PAGE_PHOTOS.enquiry.alt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                placeholder="blur"
                className={PHOTO}
              />
            </div>
          </div>
          <LeadForm
            heading="Gujarat business registration enquiry"
            className="rounded-lg border-0 shadow-[0_40px_90px_-40px_rgba(12,26,45,0.45),0_0_0_1px_rgba(18,38,64,0.06)]"
          />
        </div>
      </section>

      {/* FAQs. */}
      <section aria-labelledby="faq-h" className={`bg-[#f4f7fa] ${SECTION}`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-[5.5rem]`}>
          <div className="flex min-w-0 flex-col gap-[1.125rem]">
            <p className={EYEBROW}>
              <Dash />
              FAQs
            </p>
            <h2 id="faq-h" className={H2}>
              Registering a business in Gujarat.
            </h2>
            <a
              href="#enquiry"
              className="mt-2 inline-flex min-h-[3.25rem] items-center gap-2 self-start rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1872a3]"
            >
              Send an Enquiry
              <ArrowRight className="h-4 w-4 rotate-90" aria-hidden="true" />
            </a>
            <div className="relative mt-2 hidden aspect-[4/3] overflow-hidden rounded-lg bg-[#1b3350] lg:block">
              <Image
                src={CITY_PAGE_PHOTOS.faqs.src}
                alt={CITY_PAGE_PHOTOS.faqs.alt}
                fill
                sizes="360px"
                placeholder="blur"
                className={PHOTO}
              />
            </div>
          </div>
          <div className="flex min-w-0 flex-col border-t border-[#dde4ec]">
            {GUJARAT_FAQS.map((item) => (
              <details key={item.q} className="group border-b border-[#dde4ec]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-[4px] py-[1.375rem] transition-[padding,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-white hover:px-3.5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-semibold leading-[1.4] text-[#122640]">{item.q}</h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#cfd9e3] text-[#1872a3] transition-transform duration-200 group-open:rotate-45"
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-[0.9375rem] leading-[1.75]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Guides. */}
      <section aria-labelledby="gd-h" className={SECTION}>
        <div className={`${CONTAINER} flex flex-col gap-8`}>
          <div className="flex flex-col gap-3.5">
            <p className={EYEBROW}>
              <Dash />
              From the blog
            </p>
            <h2 id="gd-h" className={H2}>
              Reading for a business starting in Gujarat.
            </h2>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {GUIDES.map((guide) => (
              <li key={guide.slug} className="flex">
                <Link
                  href={`/blog/${guide.slug}/`}
                  className={`flex flex-1 flex-col gap-3 rounded-lg border border-[#e3e9ef] bg-white px-[1.625rem] py-7 ${LIFT}`}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.04em] text-[#1872a3]">
                    {guide.category}
                  </span>
                  <span className="text-lg/[1.35] font-bold leading-[1.35] text-[#122640]">{guide.title}</span>
                  <span className="flex-1 text-sm/[1.6] leading-[1.6]">{guide.excerpt}</span>
                  <span className="text-sm font-bold text-[#1872a3]">
                    Read the guide <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA. */}
      <section aria-labelledby="cta-h" className="px-5 pb-16 sm:px-8 md:pb-24">
        <div className="mx-auto flex max-w-[1240px] flex-col overflow-hidden rounded-lg bg-[#122640] text-white md:flex-row">
          <div className="relative min-h-[16.25rem] bg-[#1b3350] md:w-[42%] md:flex-none">
            <Image
              src={CITY_PAGE_PHOTOS.structures["partnership-registration"].src}
              alt={CITY_PAGE_PHOTOS.structures["partnership-registration"].alt}
              fill
              sizes="(min-width: 768px) 520px, 100vw"
              placeholder="blur"
              className={PHOTO}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-3.5 p-8 sm:p-12 lg:p-14">
            <h2
              id="cta-h"
              className="text-balance text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.5rem]"
            >
              Still deciding which structure to register?
            </h2>
            <p className="max-w-[35rem] text-base/[1.7] leading-[1.7] text-[#d5e0ea]">
              Tell us what the business does, who is involved and whether outside investment is
              likely. That is usually enough to narrow it to one option.
            </p>
            <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/contact/"
                event="primary_cta_click"
                params={{ label: "gujarat_footer_cta" }}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-[0.9375rem] font-bold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f5fb] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]"
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={whatsappHref(
                  "Hello Raulji Group, I would like help choosing and registering a business structure.",
                )}
                external
                event="whatsapp_click"
                params={{ label: "gujarat_footer_cta" }}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#329fd2] hover:text-[#0c1a2d]"
              >
                WhatsApp an Expert
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
