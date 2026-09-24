"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { REGIONS, regionLabel, type Region } from "@/lib/gujarat-regions";
import { SITE, telHref } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * The Gujarat hub's city finder, from the "Raulji Gujarat" design: a search
 * over city and district names, region chips, and the city cards.
 *
 * Every city is in the server-rendered HTML; the filters only narrow it.
 * The hero's region cards live in a different part of the page, so they talk
 * to this component through a window event rather than shared state.
 */

export interface FinderCity {
  slug: string;
  name: string;
  district: string;
  region: Region;
}

const REGION_EVENT = "gujarat-region";

export function GujaratCityFinder({ cities }: { cities: FinderCity[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "All">("All");

  useEffect(() => {
    function onRegion(event: Event) {
      const detail = (event as CustomEvent<Region>).detail;
      setRegion(detail);
      setQuery("");
    }
    window.addEventListener(REGION_EVENT, onRegion);
    return () => window.removeEventListener(REGION_EVENT, onRegion);
  }, []);

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () =>
      cities.filter(
        (c) =>
          (region === "All" || c.region === region) &&
          (!q || c.name.toLowerCase().includes(q) || c.district.toLowerCase().includes(q)),
      ),
    [cities, region, q],
  );

  const label =
    shown.length === 0
      ? "No matching city page"
      : `${shown.length} ${shown.length === 1 ? "city" : "cities"}${region !== "All" ? ` in ${regionLabel(region)}` : ""}${q ? ` matching “${query.trim()}”` : ""}`;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#e3e9ef] bg-[#f4f7fa] p-4">
        <div className="relative max-w-[23.75rem] flex-[1_1_16.25rem]">
          <label htmlFor="city-search" className="sr-only">
            Search city or district
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-[#1a7cb0]"
            strokeWidth={2}
            aria-hidden="true"
          />
          <input
            id="city-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search city or district"
            className="h-12 w-full rounded-[4px] border border-[#cfd9e3] bg-white pl-[2.625rem] pr-3.5 text-[0.9375rem] text-[#122640] transition hover:border-[#329fd2] focus:border-[#329fd2] focus:shadow-[0_0_0_3px_rgba(50,159,210,0.18)] focus:outline-none"
          />
        </div>
        <div role="group" aria-label="Filter by region" className="flex flex-wrap gap-2">
          {(["All", ...REGIONS] as const).map((item) => {
            const on = region === item;
            const count = item === "All" ? cities.length : cities.filter((c) => c.region === item).length;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={on}
                onClick={() => setRegion(item)}
                className={cn(
                  "flex min-h-[2.625rem] items-center gap-2 rounded-full border-[1.5px] px-4 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2]",
                  on ? "border-[#122640] bg-[#122640] text-white" : "border-[#cfd9e3] bg-white text-[#122640]",
                )}
              >
                {item}
                <span className="text-[0.6875rem] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="text-sm font-semibold text-[#122640]">
        {label}
      </p>

      {shown.length === 0 ? (
        <div className="flex flex-col items-center gap-2.5 rounded-lg border border-dashed border-[#cfd9e3] p-8 text-center">
          <p className="text-base font-semibold text-[#122640]">No city page yet, but we can still help.</p>
          <a
            href={telHref}
            onClick={() => track("phone_click", { label: "gujarat_city_finder_empty" })}
            className="text-[0.9375rem] font-semibold text-[#1a7cb0] hover:underline"
          >
            Call {SITE.phone.display}
          </a>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((city) => (
            <li key={city.slug} className="flex min-w-0">
              <Link
                href={`/${city.slug}/`}
                onClick={() => track("city_page_click", { city: city.name, label: "gujarat_city_finder" })}
                className="group flex flex-1 flex-col gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-5 py-[1.125rem] transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:border-[#329fd2] hover:shadow-[0_18px_36px_-22px_rgba(18,38,64,0.4)]"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-[1.0625rem] font-bold text-[#122640]">{city.name}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#e8f5fb] text-[#1a7cb0] transition-colors group-hover:bg-[#122640] group-hover:text-white"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </span>
                <span className="text-[0.8125rem] text-[#5b6778]">
                  {city.district} district · {regionLabel(city.region)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** The hero's region cards. Each one filters the finder and scrolls to it. */
export function RegionCards({ counts }: { counts: { region: Region; count: number }[] }) {
  return (
    <>
      {counts.map(({ region, count }) => (
        <button
          key={region}
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent(REGION_EVENT, { detail: region }));
            document.getElementById("cities")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex flex-col gap-1 rounded-md border border-white/[0.12] bg-white/[0.04] px-[1.125rem] py-4 text-left text-white transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:border-white hover:bg-white hover:text-[#122640]"
        >
          <span className="text-[1.375rem] font-extrabold">{count}</span>
          <span className="text-[0.8125rem] font-semibold opacity-85">{regionLabel(region)}</span>
        </button>
      ))}
    </>
  );
}
