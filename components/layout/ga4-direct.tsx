import Script from "next/script";
import { ga4MeasurementId } from "@/lib/tags";

/**
 * Direct GA4 gtag.js — an opt-in escape hatch, OFF by default.
 *
 * **The recommended path is GA4 inside GTM, not this.** The container
 * (GTM-MSW79R28) is already installed and already gated by Consent Mode, and
 * every custom event this site pushes -- generate_lead, view_service,
 * form_step_complete and the rest -- needs a GTM tag to reach GA4 anyway. A
 * GA4 Configuration tag in the container gives you page views *and* those
 * events. This component gives you page views only.
 *
 * It exists for one situation: the measurement ID is known and GA4 needs to
 * start collecting before anyone has time to configure the container.
 *
 * ## Enabling this and GTM's GA4 tag at the same time double-counts everything
 *
 * Both would send their own `page_view` for the same visit, so sessions, users
 * and engagement rates all inflate, and GA4 gives no warning. So:
 *
 *   - NEXT_PUBLIC_GA4_MEASUREMENT_ID set  -> GTM must have NO GA4 Configuration
 *     tag. Custom events will not reach GA4 until you add event tags.
 *   - GA4 configured inside GTM           -> leave NEXT_PUBLIC_GA4_MEASUREMENT_ID
 *     unset. This is the recommended end state.
 *
 * Exactly one of the two. docs/analytics-implementation.md carries the GTM
 * steps and docs/gtm-event-map.md the tag and trigger list.
 *
 * Consent: nothing special is needed here. The Consent Mode v2 defaults run
 * `beforeInteractive` from app/layout.tsx, ahead of this script, and gtag.js
 * honours them natively — so with the denied default in place this collects
 * only cookieless pings until the visitor accepts.
 *
 * The measurement ID is public by design, exactly like the GTM container ID: it
 * is visible in the page source of every site using GA4. It is not a secret and
 * NEXT_PUBLIC_ is correct for it.
 */
export function Ga4Direct() {
  const measurementId = ga4MeasurementId();
  if (!measurementId) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(measurementId)});`}
      </Script>
    </>
  );
}
