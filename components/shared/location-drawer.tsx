"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search, X } from "lucide-react";
import {
  CITY_INDEX,
  POPULAR_CITIES,
  groupCitiesByLetter,
  type CityIndexEntry,
} from "@/lib/city-index";
import { track } from "@/lib/analytics";

/**
 * One location experience, shared by the homepage and the footer
 * (spec sections 13, 14, 15, 44).
 *
 * A single drawer instance lives in the root layout. Any trigger anywhere on the
 * page opens it through `useLocationDrawer()`, so there is never a second copy of
 * the city list in the DOM and never a giant list in the footer.
 *
 * Accessibility (spec section 38): role="dialog" with aria-modal, focus moved to
 * the search field on open, focus trapped inside while open, Escape and
 * click-outside to close, focus returned to whatever opened it, and the body
 * scroll locked underneath.
 */

interface LocationDrawerContext {
  open: (source?: string) => void;
}

const Ctx = createContext<LocationDrawerContext | null>(null);

export function useLocationDrawer() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useLocationDrawer must be used inside <LocationDrawerProvider>");
  }
  return ctx;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function LocationDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((source?: string) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setIsOpen(true);
    track("location_drawer_open", { label: source });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to the control that opened the drawer.
    triggerRef.current?.focus?.();
    triggerRef.current = null;
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <LocationDrawer isOpen={isOpen} onClose={close} />
    </Ctx.Provider>
  );
}

function normalise(value: string) {
  return value.toLowerCase().trim();
}

function LocationDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const headingId = "location-drawer-heading";

  // Navigating to a city closes the drawer.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escape to close, Tab cycles inside the panel.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen, onClose]);

  // Lock the page behind the drawer and focus the search field.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => searchRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  // Reset the search when the drawer is dismissed.
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const matches = useMemo(() => {
    const q = normalise(query);
    if (!q) return CITY_INDEX;
    return CITY_INDEX.filter(
      (city) => normalise(city.name).includes(q) || normalise(city.district).includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => groupCitiesByLetter(matches), [matches]);
  const searching = query.trim().length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] lg:flex lg:justify-end">
      <button
        type="button"
        aria-label="Close locations"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-secondary/60 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="absolute inset-0 flex h-full flex-col bg-card shadow-elevated lg:relative lg:inset-auto lg:h-full lg:w-[34rem] lg:border-l lg:border-border"
      >
        <div className="shrink-0 border-b border-border px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Local business registration
              </p>
              <h2 id={headingId} className="mt-1.5 text-xl">
                Find your city
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="-mr-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-secondary hover:bg-muted"
            >
              <span className="sr-only">Close locations</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative mt-4">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your city or town..."
              aria-label="Search your city or town"
              autoComplete="off"
              className="min-h-[3rem] w-full rounded-xl border border-border bg-background pl-11 pr-4 text-secondary placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
            {searching
              ? `${matches.length} ${matches.length === 1 ? "location" : "locations"} found`
              : `${CITY_INDEX.length} locations across Gujarat`}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 sm:px-6">
          {!searching ? (
            <section className="mb-7">
              <h3 className="text-sm font-semibold text-secondary">Popular business markets</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2.5">
                {POPULAR_CITIES.map((city) => (
                  <li key={city.slug}>
                    <CityLink city={city} source="drawer_popular" variant="card" />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {matches.length === 0 ? (
            <p className="rounded-xl border border-border bg-muted px-4 py-5 text-sm leading-relaxed text-muted-foreground">
              No page yet for &ldquo;{query.trim()}&rdquo;. We still work with businesses across all
              33 districts, because incorporation is filed online. Call{" "}
              <a href="tel:+918511187689" className="font-semibold text-primary hover:underline">
                +91 8511187689
              </a>{" "}
              or see{" "}
              <Link href="/gujarat/" className="font-semibold text-primary hover:underline">
                Gujarat coverage
              </Link>
              .
            </p>
          ) : (
            <div className="space-y-6">
              {grouped.map(([letter, cities]) => (
                <section key={letter}>
                  <h3 className="sticky top-0 -mx-1 bg-card py-1 text-sm font-bold text-primary">
                    {letter}
                  </h3>
                  <ul className="mt-1 divide-y divide-border">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <CityLink city={city} source="drawer_list" variant="row" />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-border bg-muted px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
          <Link
            href="/gujarat/"
            className="flex min-h-[3rem] items-center justify-center rounded-xl border-2 border-primary px-5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Gujarat business registration overview
          </Link>
        </div>
      </div>
    </div>
  );
}

function CityLink({
  city,
  source,
  variant,
}: {
  city: CityIndexEntry;
  source: string;
  variant: "card" | "row";
}) {
  const className =
    variant === "card"
      ? "flex min-h-[3rem] items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 text-sm font-semibold text-secondary hover:border-primary hover:bg-accent"
      : "flex min-h-[3rem] items-center justify-between gap-3 px-1 text-sm text-secondary hover:text-primary";

  return (
    <Link
      href={`/${city.slug}/`}
      onClick={() => track("city_page_click", { city: city.name, label: source })}
      className={className}
    >
      {variant === "card" ? (
        <>
          <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {city.name}
        </>
      ) : (
        <>
          <span className="font-medium">{city.name}</span>
          {city.district !== city.name ? (
            <span className="text-xs text-muted-foreground">{city.district} district</span>
          ) : null}
        </>
      )}
    </Link>
  );
}

/** Button that opens the shared drawer. Used on the homepage and in the footer. */
export function LocationDrawerTrigger({
  children,
  className,
  source,
}: {
  children: React.ReactNode;
  className?: string;
  source: string;
}) {
  const { open } = useLocationDrawer();
  return (
    <button type="button" onClick={() => open(source)} className={className}>
      {children}
    </button>
  );
}
