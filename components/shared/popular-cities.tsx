"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";
import { POPULAR_CITIES } from "@/lib/city-index";
import { LocationDrawerTrigger } from "@/components/shared/location-drawer";
import { track } from "@/lib/analytics";

/**
 * Eight markets plus a drawer trigger (spec section 13).
 *
 * Deliberately not the full city list: thirty-odd links in a block was the
 * problem this replaces. Everything else is one tap away in the shared drawer.
 *
 * Presented as one titled panel rather than loose chips with buttons floating
 * underneath. Both places this is used sit beside a text column that already
 * carries a "Gujarat Coverage" button, so the panel holds the two things that
 * are actually its own: the eight markets, and the way into the rest.
 */
export function PopularCities() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Popular locations
      </p>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {POPULAR_CITIES.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/${city.slug}/`}
              onClick={() => track("city_page_click", { city: city.name, label: "home_popular" })}
              className="group flex min-h-[3.25rem] items-center gap-2.5 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:bg-accent"
            >
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="flex-1">{city.name}</span>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>

      <LocationDrawerTrigger
        source="home_popular_cities"
        className="mt-5 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Explore All Locations
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </LocationDrawerTrigger>
    </div>
  );
}
