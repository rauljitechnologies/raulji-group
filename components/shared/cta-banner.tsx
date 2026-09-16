"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SITE, telHref, whatsappHref } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * Conversion block at the foot of every major page (spec section 26):
 * Start Your Business, Talk to an Expert, Call.
 *
 * Deliberately light rather than a dark band: sitting directly above the dark
 * footer, a dark CTA read as one oversized footer and stopped looking like page
 * content.
 *
 * Laid out as copy on the left and a stacked action column on the right. It
 * used to centre everything in a 42rem column inside a 76rem panel, so the
 * panel was mostly empty air, and the three actions sat in one row as two
 * buttons plus a bare text link, which left the row visually unbalanced and the
 * phone number looking like an afterthought. Now the panel is filled, the two
 * buttons are the same width, and the phone number is a labelled line under
 * them instead of a third pseudo-button.
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
    <section className="bg-background pb-16 pt-4 md:pb-20 md:pt-8">
      <div className="container-wide">
        <div className="rounded-3xl border border-primary/25 bg-accent/50 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-14">
            <div>
              <h2 className="text-2xl leading-[1.25] md:text-3xl md:leading-[1.2]">{title}</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{body}</p>
            </div>

            <div className="flex flex-col gap-3 md:w-[17rem]">
              <Link
                href="/contact/"
                onClick={() => track("primary_cta_click", params)}
                className="brand-gradient inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-7 font-semibold text-primary-foreground shadow-soft transition-shadow hover:shadow-elevated"
              >
                Start Your Business
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", params)}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-primary bg-card px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Talk to an Expert
              </a>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Or call{" "}
                <a
                  href={telHref}
                  onClick={() => track("phone_click", params)}
                  className="whitespace-nowrap font-semibold text-secondary hover:text-primary hover:underline"
                >
                  {SITE.phone.display}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
