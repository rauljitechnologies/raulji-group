import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  GitCompareArrows,
  HelpCircle,
  Mail,
  MapPinned,
  MessageSquare,
  Phone,
} from "lucide-react";
import { TrackedLink } from "@/components/ui/tracked-link";
import { pageMeta } from "@/lib/seo";
import { SITE, mailHref, telHref, whatsappHref } from "@/lib/site";
import { CONFIRMATION_BODY, CONFIRMATION_HEADING, NEXT_STEPS, THANK_YOU_PATH } from "@/lib/thank-you";
import { H1, H2 } from "@/lib/typography";

/**
 * The single confirmation page every public enquiry form redirects to once
 * /api/lead/ has confirmed the CRM stored the enquiry.
 *
 * ## noindex, and out of the sitemap
 *
 * `noindex: true` is both halves of that: it writes the robots directive, and
 * scripts/gen-sitemap-manifest.mjs skips any page whose source sets it, so the
 * URL never reaches /sitemap.xml. robots.txt is deliberately left alone --
 * disallowing the path would stop a crawler fetching the page and therefore
 * stop it ever reading the noindex directive, which is the opposite of what we
 * want. Nothing links here from the header, the footer or any page body, so
 * the only way in is a submitted form or a typed URL.
 *
 * ## Why there is no analytics on this page
 *
 * Not one lead event fires here, by design. `generate_lead` is pushed by the
 * form, from the branch where the API confirmed capture (lib/lead-success.ts),
 * before the route changes. A page that counted its own view as a conversion
 * would count a refresh, a back-button return, a bookmark and a shared link as
 * new leads -- which is exactly the failure mode the brief names. The only
 * events on this page are the ordinary contact-click events on the buttons
 * below, which are not conversions anywhere.
 *
 * ## Why it carries no name and no query string
 *
 * See lib/thank-you.ts. The URL is the same for every form and every visitor,
 * so nothing a visitor typed can end up in browser history, a referrer header
 * or an analytics hit. That costs the page the "Thank you, Priya" greeting the
 * contact form used to show, and that is the right trade.
 */
export const metadata = pageMeta({
  title: "Enquiry Received | Raulji Group",
  description:
    "Your enquiry has reached the Raulji Group team. Here is what happens next, how to reach us in the meantime, and where to read more while you wait.",
  path: THANK_YOU_PATH,
  ogHeadline: "Enquiry received",
  noindex: true,
});

/** Where someone who has just enquired might usefully go next. */
const READING: { icon: typeof Compass; title: string; body: string; href: string }[] = [
  {
    icon: Compass,
    title: "Business consulting",
    body: "How we work through structure, planning and growth questions before anything is filed.",
    href: "/services/business-consulting/",
  },
  {
    icon: Building2,
    title: "Business registration",
    body: "Private Limited, LLP, Partnership and Proprietorship, and what each one actually involves.",
    href: "/services/business-registration/",
  },
  {
    icon: GitCompareArrows,
    title: "Compare the four structures",
    body: "Liability, compliance, tax and funding, side by side, so the call we have is a shorter one.",
    href: "/compare/",
  },
  {
    icon: MapPinned,
    title: "Gujarat coverage",
    body: "How we support businesses across the state, from our base in Vadodara.",
    href: "/gujarat/",
  },
  {
    icon: HelpCircle,
    title: "Frequently asked questions",
    body: "The questions founders ask us most about documents, timelines and cost.",
    href: "/faqs/",
  },
  {
    icon: MessageSquare,
    title: "Business guides",
    body: "Written explanations of the decisions behind choosing and running a structure.",
    href: "/blog/",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <section className="border-b border-border bg-muted pb-12 pt-28 sm:pt-32 md:pb-16 md:pt-36">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-sm font-semibold text-primary">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Enquiry received
            </p>
            <h1 className={`mt-6 ${H1}`}>{CONFIRMATION_HEADING}</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {CONFIRMATION_BODY} If your matter is urgent, call us rather than waiting.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href={telHref}
                event="phone_click"
                params={{ label: "thank_you_hero" }}
                className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-soft"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone.display}
              </TrackedLink>
              <TrackedLink
                href={whatsappHref(
                  "Hello Raulji Group, I have just sent an enquiry through your website.",
                )}
                event="whatsapp_click"
                params={{ label: "thank_you_hero" }}
                external
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Continue on WhatsApp
              </TrackedLink>
            </div>

            <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>Our office hours are {SITE.hours.display}.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className={H2}>What happens next</h2>
            <p className="mt-4 text-base/[1.75] leading-[1.75] text-muted-foreground">
              Three steps, in this order. Nothing is filed, signed or paid for until you have the
              recommendation in writing and you tell us to go ahead.
            </p>
          </div>

          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {NEXT_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-bold text-primary"
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14 md:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className={H2}>While you wait</h2>
            <p className="mt-4 text-base/[1.75] leading-[1.75] text-muted-foreground">
              None of this is required reading. It is simply what people usually want to know
              before the first conversation.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {READING.map((item) => (
              <li key={item.href}>
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
                    Read more
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

      <section className="py-14 md:py-20">
        <div className="container-wide">
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl md:text-2xl">Something to add to your enquiry?</h2>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                Send it over and we will read it alongside what you have already told us. There is
                no need to fill the form in again.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <TrackedLink
                href={mailHref}
                event="email_click"
                params={{ label: "thank_you_footer" }}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl bg-secondary px-6 font-semibold text-secondary-foreground hover:bg-secondary/90"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {SITE.email}
              </TrackedLink>
              <Link
                href="/contact/"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-xl border-2 border-primary px-6 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Contact page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
