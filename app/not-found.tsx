import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Compass,
  GitCompareArrows,
  HelpCircle,
  MapPinned,
  MessageSquare,
  Phone,
} from "lucide-react";
import { ServiceCards } from "@/components/shared/service-cards";
import { SITE, telHref, mailHref, whatsappHref } from "@/lib/site";

/**
 * A real 404. The previous site answered every unknown path with a 200 and the
 * homepage, which search engines read as a soft 404 and which left visitors
 * unsure whether the page existed.
 *
 * Design follows master rule 24: one restrained band, flat surfaces, subtle
 * borders, no gradient washes, no floating decoration. A 404 is often a
 * visitor's first page, so its only job is to look like the rest of the site
 * and get them somewhere useful.
 */

/**
 * A 404 already returns a 404 status, so it will not be indexed on merit. The
 * explicit directive is kept anyway: it costs nothing and it covers the case
 * where this component is reached by a soft navigation rather than a hard 404.
 * follow stays true so the links out of here are still crawled.
 */
export const metadata = {
  title: { absolute: "Page not found | Raulji Group" },
  robots: { index: false, follow: true },
};

/** Where people who land here actually need to go. Consulting leads, because it
 * is the primary focus of the group. */
const DESTINATIONS = [
  {
    icon: Compass,
    title: "Business consulting",
    body: "Advice on structure, planning and growth, before anything gets filed.",
    href: "/services/business-consulting/",
  },
  {
    icon: Building2,
    title: "Business registration",
    body: "Private Limited, LLP, Partnership and Proprietorship, with what each one involves.",
    href: "/services/business-registration/",
  },
  {
    icon: GitCompareArrows,
    title: "Compare structures",
    body: "All four side by side on liability, compliance, tax and funding.",
    href: "/compare/",
  },
  {
    icon: MapPinned,
    title: "Gujarat coverage",
    body: "Registration support across all 33 districts, from our base in Vadodara.",
    href: "/gujarat/",
  },
  {
    icon: HelpCircle,
    title: "FAQs",
    body: "Answers to the questions founders ask us most before they file.",
    href: "/faqs/",
  },
];

export default function NotFound() {
  return (
    <>
      <section className="border-b border-border bg-muted py-12 md:py-16">
        <div className="container-wide">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Error 404
              </p>
              <h1 className="mt-3 text-balance text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl md:leading-[1.1]">
                We could not find that page
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                The link may be broken, the page may have moved, or the service may no longer be
                offered. Here is the quickest way back.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/"
                  className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-soft"
                >
                  Go to the homepage
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex min-h-[3.25rem] items-center justify-center rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>

            {/* Decoration only: the heading already states what happened, so the
                numeral stays out of the accessibility tree. Flat brand navy at
                low opacity rather than gradient text (master rule 24). */}
            <p
              aria-hidden="true"
              className="hidden select-none text-[9rem] font-extrabold leading-none tracking-tighter text-secondary/10 lg:block"
            >
              404
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl">Popular places on this site</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl">Were you looking to register a business?</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            These are the four structures we handle. Each page covers eligibility, documents and
            the filing process.
          </p>
          <div className="mt-8">
            <ServiceCards />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-wide">
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl md:text-2xl">Still cannot find it?</h2>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                Tell us what you were looking for and we will point you to the right page.{" "}
                {SITE.hours.display}.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <a
                href={telHref}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl bg-secondary px-6 font-semibold text-secondary-foreground hover:bg-secondary/90"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <a
                href={whatsappHref("Hi, I landed on a page that could not be found on raulji.com.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Prefer email?{" "}
            <a href={mailHref} className="font-semibold text-primary hover:underline">
              {SITE.email}
            </a>{" "}
            &middot; Or use the{" "}
            <Link href="/contact/" className="font-semibold text-primary hover:underline">
              contact form
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
