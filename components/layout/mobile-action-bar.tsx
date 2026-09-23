"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SITE, telHref, whatsappHref } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { findCityBySlug } from "@/lib/city-index";
import { track } from "@/lib/analytics";

/**
 * Fixed mobile action bar (spec section 25). Rendered once, in the root layout.
 * The footer carries `.mobile-bar-gutter` so the bar never covers content.
 */
export function MobileActionBar() {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);

  const service = SERVICES.find((s) => pathname.startsWith(s.path.replace(/\/$/, "")));
  const city = findCityBySlug(segments[0]);

  const context = service
    ? `${service.name}`
    : city
      ? `business registration in ${city.name}`
      : null;

  const wa = whatsappHref(
    context
      ? `Hello Raulji Group, I would like to know more about ${context}.`
      : "Hello Raulji Group, I would like help choosing and registering a business structure.",
  );

  const params = { registration_type: service?.shortName, city: city?.name, label: "mobile_bar" };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
      <div className="grid grid-cols-3">
        <a
          href={telHref}
          onClick={() => track("phone_click", params)}
          className="flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 border-r border-border text-xs font-semibold text-secondary"
        >
          <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
          Call
          <span className="sr-only">Raulji Group on {SITE.phone.display}</span>
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", params)}
          className="flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 border-r border-border text-xs font-semibold text-secondary"
        >
          <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
          WhatsApp
        </a>
        <Link
          href="/contact/"
          onClick={() => track("primary_cta_click", params)}
          className="brand-gradient flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 text-xs font-semibold text-primary-foreground"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          Start Business
        </Link>
      </div>
    </div>
  );
}
