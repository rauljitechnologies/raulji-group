"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CONSENT_BANNER_ID,
  consentBannerRevealScript,
  readConsent,
  updateConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Consent banner for Google Consent Mode v2.
 *
 * Shown only when a container is configured and the visitor has not answered.
 * Everything is denied until they do -- see lib/consent.ts for why that is the
 * default and what it costs.
 *
 * Three choices, not two. "Analytics only" exists because the two permissions
 * genuinely differ for this business: knowing which service pages produce
 * enquiries needs analytics storage, and needs nothing to do with advertising.
 * Raulji Group is not running Google Ads today, so an accept-all button would
 * take a permission that is not yet used for anything.
 *
 * Accessibility (master rule 26, WCAG 2.2 AA):
 *  - `role="dialog"` with `aria-modal={false}`: it is a dialog, but it does
 *    NOT trap focus or block the page. A cookie notice that traps focus stops
 *    a keyboard user reading the privacy policy it points at, which is the one
 *    thing they may need before deciding.
 *  - Labelled by its own heading, described by its body text.
 *  - All three buttons are real buttons, in the tab order, at >= 44px.
 *  - Escape dismisses as "denied", the safe direction, and is announced in the
 *    text so it is not a hidden gesture.
 *  - Mounted last in <body> (see app/layout.tsx) though visually fixed to the
 *    bottom of the viewport, so a screen reader reaches the skip link, the
 *    header and the page content before this -- nobody is made to hear a
 *    cookie notice before they reach the page.
 *  - No layout shift: it is `position: fixed` and outside document flow.
 *
 * Rendering (audit SAI-04 and SAI-15, 23 Oct 2026):
 *  - It is always in the server HTML, with `hidden`, and the inline script
 *    after it unhides it during parsing when there is no stored choice. It
 *    used to mount only after hydration, about three seconds into a throttled
 *    phone load, which made it the page's LCP element on most templates.
 *    `hidden` keeps it out of the accessibility tree and off screen for
 *    anyone who has already answered.
 *  - Below `sm` the three buttons share one row, and the padding is tighter.
 *    Stacked, they made the banner 55% of a 375x667 screen and 68% of a
 *    320x568 one, covering the whole hero heading. The wording is unchanged.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const headingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // The reveal script has already unhidden the server markup when there is
    // no stored choice; this brings React's state into line with it.
    if (readConsent() === null) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") decide("denied");
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  function decide(choice: ConsentChoice) {
    writeConsent(choice);
    updateConsent(choice);
    setVisible(false);
  }

  return (
    <>
      <div
        id={CONSENT_BANNER_ID}
        hidden={!visible}
        // The reveal script may remove `hidden` before hydration; the effect
        // above then sets the same value, so the difference is expected.
        suppressHydrationWarning
        role="dialog"
        aria-modal={false}
        aria-labelledby="consent-heading"
        aria-describedby="consent-body"
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#2a3f5c] bg-[#0c1a2d] text-white shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.5)]"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-4 sm:gap-5 sm:px-8 sm:py-5 lg:flex-row lg:items-center lg:gap-10 lg:py-6">
          <div className="flex min-w-0 flex-col gap-1.5">
            <p id="consent-heading" ref={headingRef} className="text-[0.9375rem] font-bold">
              Cookies and measurement
            </p>
            <p id="consent-body" className="max-w-[58rem] text-[0.8125rem]/[1.6] leading-[1.6] text-[#c9d6e3]">
              We would like to measure how people find and use this site, so we can
              tell which pages genuinely help. Nothing is measured until you
              choose. We never send your name, phone number, email or enquiry
              message to any analytics service. Read our{" "}
              <Link href="/privacy/" className="font-semibold text-white underline underline-offset-2">
                privacy policy
              </Link>
              . Pressing Escape declines.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:gap-2.5 lg:flex-none">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#5b6f88] px-2 text-center text-[0.8125rem] leading-tight font-semibold text-white sm:px-5 sm:text-[0.875rem] transition duration-200 hover:border-white hover:bg-white/10"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide("analytics_only")}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#329fd2] px-2 text-center text-[0.8125rem] leading-tight font-semibold text-white sm:px-5 sm:text-[0.875rem] transition duration-200 hover:bg-[#329fd2] hover:text-[#0c1a2d]"
            >
              Analytics only
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-[4px] bg-white px-2 text-center text-[0.8125rem] leading-tight font-bold text-[#122640] sm:px-5 sm:text-[0.875rem] transition duration-200 hover:bg-[#e8f5fb]"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: consentBannerRevealScript() }} />
    </>
  );
}
