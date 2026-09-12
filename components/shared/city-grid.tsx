"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { CITIES, FEATURED_CITY_SLUGS, type City } from "@/lib/cities";
import { track } from "@/lib/analytics";

/** City cards linking to root-level city URLs (spec section 23). */
export function CityGrid({
  slugs = FEATURED_CITY_SLUGS,
  exclude,
  showDistrict = false,
}: {
  slugs?: readonly string[];
  exclude?: string;
  showDistrict?: boolean;
}) {
  const cities = slugs
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter((c): c is City => Boolean(c) && c!.slug !== exclude);

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {cities.map((city) => (
        <li key={city.slug}>
          <Link
            href={`/${city.slug}/`}
            onClick={() => track("city_page_click", { city: city.name })}
            className="flex min-h-[3.25rem] items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-secondary transition-colors hover:border-primary hover:bg-accent"
          >
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="flex flex-col">
              {city.name}
              {showDistrict && city.district !== city.name ? (
                <span className="text-xs font-normal text-muted-foreground">
                  {city.district} district
                </span>
              ) : null}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
