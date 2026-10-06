"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/*
 * Navigation feedback for client-side route changes.
 *
 * Next keeps the current page on screen while the next one loads, which is the
 * right behaviour for a corporate site — no skeleton flash, no layout blanking
 * — but it leaves a click with no acknowledgement. This is that
 * acknowledgement: a 3px bar in the brand gradient, matching the scroll
 * progress bar the Services and registration pages already carry, so the two
 * read as one piece of chrome rather than two different indicators.
 *
 * Deliberately quiet, per master rule 24 (minimal animation) and 27 (no heavy
 * animation for appearance):
 *
 *  - Nothing paints for the first SHOW_DELAY_MS. Most navigations here hit a
 *    prefetched static route and finish well inside that window, so the usual
 *    case is no bar at all rather than a flash.
 *  - While waiting the bar creeps towards CREEP_CEILING with a decelerating
 *    step, so it never implies a completion time the site cannot promise.
 *  - On arrival it completes and fades, rather than disappearing mid-run.
 *
 * Navigation start is read from the DOM (a left click on a same-origin link
 * that changes the path) and from `popstate` for back and forward. Nothing in
 * this codebase navigates through `useRouter`, so there is no third source.
 * Completion is the `usePathname()` change — `useSearchParams()` is avoided on
 * purpose, since reading it from the root layout would opt every statically
 * rendered page into client-side rendering.
 */

/** How long a navigation may take before the bar appears at all. */
const SHOW_DELAY_MS = 140;
/** Percentage the bar creeps to while the next route is still loading. */
const CREEP_CEILING = 92;
/** Interval between creep steps. */
const CREEP_STEP_MS = 160;
/** Fraction of the remaining distance each step covers. */
const CREEP_EASE = 0.14;
/** How long the finished bar takes to fade out. */
const FADE_MS = 280;
/*
 * A click can start a navigation that never changes the path: a route handler
 * that answers 410, a redirect to the page we are already on, a failed fetch.
 * Rather than leave the bar running, give up and hide it.
 */
const GIVE_UP_MS = 15_000;

const samePath = (a: string, b: string) => a.replace(/\/+$/, "") === b.replace(/\/+$/, "");

export function RouteProgress() {
  const pathname = usePathname();
  /** Bar width in percent, or null while idle — idle renders nothing at all. */
  const [width, setWidth] = useState<number | null>(null);
  const pending = useRef(false);
  const shown = useRef(false);
  const timers = useRef<number[]>([]);
  const creep = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    if (creep.current !== null) {
      window.clearInterval(creep.current);
      creep.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    if (!pending.current) return;
    pending.current = false;
    clearTimers();

    // Never shown: the route arrived inside SHOW_DELAY_MS. Stay invisible.
    if (!shown.current) {
      setWidth(null);
      return;
    }
    shown.current = false;
    setWidth(100);
    timers.current.push(window.setTimeout(() => setWidth(null), FADE_MS));
  }, [clearTimers]);

  const start = useCallback(() => {
    if (pending.current) return;
    pending.current = true;
    shown.current = false;
    clearTimers();
    setWidth(null);

    timers.current.push(
      window.setTimeout(() => {
        if (!pending.current) return;
        shown.current = true;
        setWidth(10);
        creep.current = window.setInterval(() => {
          setWidth((current) =>
            current === null ? null : current + (CREEP_CEILING - current) * CREEP_EASE,
          );
        }, CREEP_STEP_MS);
      }, SHOW_DELAY_MS),
    );

    timers.current.push(window.setTimeout(finish, GIVE_UP_MS));
  }, [clearTimers, finish]);

  // Arrival. Also runs on mount, where `pending` is false and this is a no-op.
  useEffect(() => {
    finish();
  }, [pathname, finish]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Left button only, and leave the browser's own shortcuts alone.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || anchor.hasAttribute("download")) return;
      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      // Skips tel:, mailto:, WhatsApp and the Raulji Technologies site, all of
      // which leave this document rather than switching page within it.
      if (url.origin !== window.location.origin) return;
      // An in-page anchor, or a link back to the page already open.
      if (samePath(url.pathname, window.location.pathname) && url.search === window.location.search)
        return;

      start();
    };

    const onPopState = () => start();

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, [start]);

  useEffect(() => clearTimers, [clearTimers]);

  if (width === null) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[210] h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-[linear-gradient(90deg,#1a7cb0,#329fd2)] transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${width}%`, opacity: width === 100 ? 0 : 1 }}
      />
    </div>
  );
}
