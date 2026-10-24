"use client";

import { useEffect, useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { REGIONS, regionLabel, type Region, type RegionSummary } from "@/lib/gujarat-regions";
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
  /** Only for cities with a confirmed photograph of the place. Decorative. */
  photo?: StaticImageData;
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
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3.5">
        {/*
          A visible label, as in v3. It replaced an `sr-only` label beside a
          magnifier icon, where the placeholder then had to repeat the label
          text to say anything at all -- so the field told a sighted user what
          to type only in grey placeholder text that vanishes on the first
          keystroke. The placeholder now carries an example instead, which is
          the thing a label cannot say.
        */}
        <label
          htmlFor="city-search"
          className="flex max-w-[26.25rem] flex-[1_1_17.5rem] flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#122640]"
        >
          Search city or district
          <input
            id="city-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Surat, Kutch"
            className="rounded-[4px] border border-[#cfd9e3] bg-white px-3.5 py-[0.8125rem] text-base font-normal text-[#122640] transition hover:border-[#329fd2] focus:border-[#329fd2] focus:shadow-[0_0_0_3px_rgba(50,159,210,0.18)] focus:outline-none sm:text-[0.9375rem]"
          />
        </label>
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
          <p className="text-base font-semibold text-[#122640]">
            No city page matches that search. Call us and we will answer directly.
          </p>
          <a
            href={telHref}
            onClick={() => track("phone_click", { label: "gujarat_city_finder_empty" })}
            className="text-[0.9375rem] font-semibold text-[#1872a3] hover:underline"
          >
            Call {SITE.phone.display}
          </a>
        </div>
      ) : (
        /*
         * v3's city card: a 16:10 photograph across the top of the card with
         * the name and district beneath it, in an auto-filling grid.
         *
         * This is the part of the section that was never converted. Commit
         * 39d6c64 moved the finder onto the light grey band "as in v3" and
         * left the cards as they were: a 72px-wide photo strip down the left
         * of a horizontal row, which is why the section still read as the old
         * design next to everything around it.
         *
         * The photograph is the point of these cards -- it is what tells
         * someone they are looking at their own city -- and at 72px wide it
         * was too small to be recognisable. Every one of the 33 cities has a
         * confirmed photograph of the place (CITY_CARD_PHOTOS), so no card
         * falls back to an empty box; the navy behind the image is what shows
         * while the blur placeholder resolves.
         *
         * `loading="lazy"` is next/image's default without `priority`, which
         * is what v3 asks for: the section sits well below the fold, so none
         * of these 33 images competes with the hero for LCP (master rule 27).
         */
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,13.75rem),1fr))] gap-4">
          {shown.map((city) => (
            <li key={city.slug} className="flex min-w-0">
              <Link
                href={`/${city.slug}/`}
                onClick={() => track("city_page_click", { city: city.name, label: "gujarat_city_finder" })}
                className="group flex flex-1 flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-white transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:border-[#329fd2] hover:shadow-[0_18px_36px_-22px_rgba(18,38,64,0.4)]"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-[#1b3350]">
                  {city.photo ? (
                    <Image
                      src={city.photo}
                      alt=""
                      fill
                      /*
                       * Derived from the grid, not guessed. The container is
                       * 1240px wide with clamp(20px,4vw,32px) of padding, the
                       * gap is 16px and each column is at least 220px, so
                       * `auto-fill` gives 2 columns from a ~496px viewport, 3
                       * from ~752px, 4 from ~992px and 5 at 1240px and up,
                       * where a card settles at 222px. Each entry below is the
                       * card width in that band. Getting this wrong is not
                       * cosmetic: too small and the photo is upscaled and
                       * blurry, too large and every phone downloads a desktop
                       * file, which is the fault TF-08 found across the site.
                       */
                      sizes="(min-width: 1240px) 14rem, (min-width: 992px) 25vw, (min-width: 752px) 30vw, (min-width: 496px) 46vw, 92vw"
                      placeholder="blur"
                      className="object-cover photo-zoom"
                    />
                  ) : null}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-[0.1875rem] px-4 pb-4 pt-3.5">
                  <h3 className="text-base font-bold text-[#122640]">{city.name}</h3>
                  <span className="text-[0.8125rem] text-[#5b6778]">
                    {city.district} district · {regionLabel(city.region)}
                  </span>
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
/**
 * The breakdown under "33 districts served". The large number is districts, to
 * match that headline; the line under it is how many city pages the finder
 * will show when the card is clicked. See regionSummary() for why both.
 */
export function RegionCards({ counts }: { counts: RegionSummary[] }) {
  return (
    <>
      {counts.map(({ region, districts, cityPages }) => (
        <button
          key={region}
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent(REGION_EVENT, { detail: region }));
            document.getElementById("cities")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex flex-col gap-1 rounded-md border border-white/[0.12] bg-white/[0.04] px-[1.125rem] py-4 text-left text-white transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:border-white hover:bg-white hover:text-[#122640]"
        >
          <span className="text-[1.375rem] font-extrabold">
            {districts}
            <span className="sr-only">{districts === 1 ? " district in" : " districts in"}</span>
          </span>
          <span className="text-[0.8125rem] font-semibold opacity-85">{regionLabel(region)}</span>
          <span className="text-xs opacity-75">
            {cityPages} {cityPages === 1 ? "city page" : "city pages"}
          </span>
        </button>
      ))}
    </>
  );
}
