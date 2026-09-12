"use client";

import Link from "next/link";
import { Building2, Users, Handshake, User, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { track } from "@/lib/analytics";

const ICONS = {
  "pvt-registration": Building2,
  "llp-registration": Users,
  "partnership-registration": Handshake,
  "proprietorship-registration": User,
} as const;

/** The four Phase 1 service cards (spec section 21). */
export function ServiceCards({ city }: { city?: string }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map((service) => {
        const Icon = ICONS[service.slug as keyof typeof ICONS];
        return (
          <li key={service.slug}>
            <Link
              href={service.path}
              onClick={() =>
                track("service_card_click", { registration_type: service.shortName, city })
              }
              className="hover-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg">{service.shortName}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.cardBlurb}
              </p>
              {service.pricing ? (
                <p className="mt-4 text-sm font-semibold text-secondary">
                  From {service.pricing.amount}
                  <span className="font-normal text-muted-foreground"> + government fees</span>
                </p>
              ) : null}
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {service.cardCta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
