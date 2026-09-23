"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { BrandImage } from "@/components/ui/brand-image";
import type { ImageSlot } from "@/lib/images";
import { track } from "@/lib/analytics";

/*
 * One visual per structure, replacing the four lucide icons these cards used
 * to carry (design brief section 9).
 *
 * The icons were a building, two people, a handshake and a person. They marked
 * the cards as four different things without ever saying how the four differ,
 * which is the only question a reader on this row is actually asking. Each
 * panel now draws the distinguishing feature: share units, a liability shield,
 * a deed, one undivided owner. The brief's own instruction here was not to
 * produce four generic document images, and that is the trap these avoid.
 */
const CARD_IMAGES: Record<string, ImageSlot> = {
  "pvt-registration": "pvtStructure",
  "llp-registration": "llpStructure",
  "partnership-registration": "partnershipStructure",
  "proprietorship-registration": "proprietorshipStructure",
};

/** The four Phase 1 service cards (spec section 21). */
export function ServiceCards({ city }: { city?: string }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map((service) => {
        const slot = CARD_IMAGES[service.slug];
        return (
          <li key={service.slug}>
            <Link
              href={service.path}
              onClick={() =>
                track("service_card_click", { registration_type: service.shortName, city })
              }
              className="hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
            >
              {slot ? (
                <BrandImage
                  slot={slot}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 100vw"
                  aspect="aspect-[4/3]"
                  className="rounded-none border-0 border-b border-border"
                />
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg">{service.shortName}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.cardBlurb}
                </p>
              {/*
                No price on these cards. Only two of the four structures have a
                published starting figure, so a price line here compared four
                services on a number that exists for half of them, and the
                homepage is not a pricing page (master rule 12). The starting
                fee, what it covers and what is statutory all live on each
                service page, which is where a price can be stated properly.

                The CTA row keeps a reserved height because the labels wrap onto
                one or two lines depending on the service name; without it each
                card put its link at a different height from the card beside it.
              */}
                <span className="mt-5 inline-flex min-h-[2.75rem] items-start gap-1.5 text-sm font-semibold text-primary">
                  {service.cardCta}
                  <ArrowRight
                    className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
