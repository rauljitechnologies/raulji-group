"use client";

import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SITE, telHref, whatsappHref } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * Conversion block at the foot of every major page (spec section 26):
 * Start Your Business, Talk to an Expert, Call.
 *
 * Deliberately light. It used to be a dark `bg-secondary` band, which sat
 * directly above the equally dark footer with no seam between them, so the two
 * read as one oversized footer and the CTA stopped looking like page content.
 * A contained card on a light section keeps it unmistakably part of the page.
 */
export function CtaBanner({
  title = "Ready to start your business?",
  body = "Tell us what you are building and we will help you choose the right structure before anything is filed.",
  registrationType,
  city,
}: {
  title?: string;
  body?: string;
  registrationType?: string;
  city?: string;
}) {
  const wa = whatsappHref(
    registrationType
      ? `Hello Raulji Group, I would like to talk about ${registrationType}${city ? ` in ${city}` : ""}.`
      : "Hello Raulji Group, I would like help choosing and registering a business structure.",
  );

  const params = { registration_type: registrationType, city, label: "cta_banner" };

  return (
    <section className="bg-background pb-16 pt-4 md:pb-24 md:pt-8">
      <div className="container-wide">
        <div className="brand-gradient-soft rounded-3xl border border-primary/20 px-6 py-12 text-center sm:px-10 md:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">{body}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact/"
              onClick={() => track("start_business_click", params)}
              className="brand-gradient inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-elevated sm:w-auto"
            >
              Start Your Business
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", params)}
              className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-primary bg-card px-7 font-semibold text-primary hover:bg-primary hover:text-primary-foreground sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Talk to an Expert
            </a>
            <a
              href={telHref}
              onClick={() => track("phone_click", params)}
              className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl px-7 font-semibold text-secondary hover:text-primary sm:w-auto"
            >
              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="whitespace-nowrap">Call {SITE.phone.display}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
