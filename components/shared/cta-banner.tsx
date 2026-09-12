"use client";

import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SITE, telHref, whatsappHref } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * Conversion block used at the foot of every major page (spec section 26):
 * Start Your Business, Talk to an Expert, Call.
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

  return (
    <section className="section-padding bg-secondary text-secondary-foreground">
      <div className="container-wide text-center">
        <h2 className="mx-auto max-w-2xl text-3xl text-secondary-foreground md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-secondary-foreground/70">{body}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact/"
            onClick={() => track("start_business_click", { registration_type: registrationType, city, label: "cta_banner" })}
            className="brand-gradient inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-elevated sm:w-auto"
          >
            Start Your Business
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { registration_type: registrationType, city, label: "cta_banner" })}
            className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-secondary-foreground/25 px-7 font-semibold text-secondary-foreground hover:bg-secondary-foreground/10 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Talk to an Expert
          </a>
          <a
            href={telHref}
            onClick={() => track("phone_click", { registration_type: registrationType, city, label: "cta_banner" })}
            className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl px-7 font-semibold text-secondary-foreground hover:text-primary sm:w-auto"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
