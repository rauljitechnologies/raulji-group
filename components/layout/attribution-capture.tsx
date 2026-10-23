"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

/**
 * Captures campaign parameters from the landing URL once per navigation.
 *
 * It lives in the root layout rather than in the forms because of the gap
 * between arrival and enquiry: a visitor lands on an ad URL carrying
 * `?utm_source=...&gclid=...`, browses to a service page, and only then fills
 * the form -- by which point the query string is long gone. Capturing here, on
 * arrival, is the only way the attribution that actually applied to the visit
 * reaches the CRM.
 *
 * Renders nothing. `captureAttribution` writes to sessionStorage only when
 * parameters are genuinely present, so a clean URL is a no-op and never
 * overwrites what an earlier page in the same tab recorded.
 */
function Capture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttribution();
    // Re-run on navigation: a client-side route change to a URL with campaign
    // parameters is still an arrival as far as attribution is concerned.
  }, [pathname, searchParams]);

  return null;
}

/**
 * `useSearchParams` opts a component into client-side rendering, which would
 * otherwise force every statically generated page in the layout to deopt. The
 * Suspense boundary keeps that contained to this component, which renders
 * nothing anyway.
 */
export function AttributionCapture() {
  return (
    <Suspense fallback={null}>
      <Capture />
    </Suspense>
  );
}
