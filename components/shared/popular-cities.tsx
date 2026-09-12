"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { POPULAR_CITIES } from "@/lib/city-index";
import { LocationDrawerTrigger } from "@/components/shared/location-drawer";
import { track } from "@/lib/analytics";

/**
 * Eight markets plus a drawer trigger (spec section 13).
 *
 * Deliberately not the full city list: thirty-odd links in a block was the
 * problem this replaces. Everything else is one tap away in the shared drawer.
 */
export function PopularCities() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {POPULAR_CITIES.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/${city.slug}/`}
              onClick={() => track("city_page_click", { city: city.name, label: "home_popular" })}
              className="hover-lift flex min-h-[3.5rem] items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-secondary hover:border-primary hover:bg-accent"
            >
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{city.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <LocationDrawerTrigger
          source="home_popular_cities"
          className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary hover:bg-primary hover:text-primary-foreground sm:w-auto"
        >
          View All Locations
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </LocationDrawerTrigger>
        <Link
          href="/gujarat/"
          className="inline-flex min-h-[3.25rem] w-full items-center justify-center px-5 font-semibold text-primary hover:underline sm:w-auto"
        >
          Gujarat coverage overview
        </Link>
      </div>
    </div>
  );
}
