/**
 * Google Consent Mode v2 state.
 *
 * Why denied-by-default. Raulji Group's market is India, so the Digital
 * Personal Data Protection Act 2023 is the regime that applies rather than the
 * GDPR, and its requirements are not identical. **Nothing in this file decides
 * what the law requires** -- that is for the business and its advisers. What it
 * does is make the safe posture the default: no analytics or advertising
 * storage until the visitor agrees, which satisfies the stricter reading of
 * either regime and can be relaxed later without touching any call site.
 *
 * The cost is real and was accepted deliberately: GA4 will record less than it
 * would with consent granted on load, because visitors who never answer the
 * banner stay denied. A measurement drop after this ships is the design
 * working, not a regression.
 *
 * Consent Mode is Google's own mechanism, so GTM and GA4 understand it without
 * configuration: tags gated on `analytics_storage` simply do not fire, and
 * Google's cookieless pings still allow modelled reporting.
 */

export const CONSENT_KEY = "raulji.consent.v1";

/** The four signals Consent Mode v2 defines, plus the two Google requires. */
export interface ConsentState {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
}

export const DENIED: ConsentState = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

export const GRANTED: ConsentState = {
  analytics_storage: "granted",
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
};

/**
 * Analytics only: the middle choice.
 *
 * Offered because the two genuinely differ for this business. Measuring which
 * service pages produce enquiries needs `analytics_storage`; it does not need
 * advertising storage or personalisation, and a visitor who is willing to be
 * counted is not thereby willing to be retargeted. Collapsing them into one
 * accept-all button would take a permission that is not needed yet -- Raulji
 * Group is not running Google Ads today.
 */
export const ANALYTICS_ONLY: ConsentState = {
  analytics_storage: "granted",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

export type ConsentChoice = "granted" | "analytics_only" | "denied";

export interface StoredConsent {
  choice: ConsentChoice;
  /** ISO date, so a stale consent can be re-asked for if policy changes. */
  at: string;
}

export function stateFor(choice: ConsentChoice): ConsentState {
  if (choice === "granted") return GRANTED;
  if (choice === "analytics_only") return ANALYTICS_ONLY;
  return DENIED;
}

/** The stored decision, or null when the visitor has not answered. */
export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const { choice, at } = parsed as StoredConsent;
    if (choice !== "granted" && choice !== "analytics_only" && choice !== "denied") return null;
    return { choice, at: typeof at === "string" ? at : new Date().toISOString() };
  } catch {
    // Private mode or blocked storage. Treated as "has not answered", which
    // leaves the denied default in place -- the safe direction to fail.
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): StoredConsent {
  const record: StoredConsent = { choice, at: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    /* the update below still applies for this page view */
  }
  return record;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Tell Google about a decision.
 *
 * Pushed in gtag's own array form rather than through a helper, because this
 * has to work whether or not GTM has finished loading: `dataLayer` is an array
 * Google drains on load, so a push that happens first is honoured, and one that
 * happens later is applied immediately.
 */
export function updateConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["consent", "update", stateFor(choice)] as unknown as Record<string, unknown>);
  // A named event so a container can trigger on the decision itself.
  window.dataLayer.push({ event: "consent_update", consent_choice: choice });
}

/**
 * The inline script that sets the defaults.
 *
 * This must execute **before** the GTM container loads, or tags can fire in the
 * gap between page load and the first consent signal -- which is the whole
 * failure this is meant to prevent. It is a string rather than a module because
 * it has to be inlined in the document head with `beforeInteractive`.
 *
 * A previously stored decision is applied in the same script, so a returning
 * visitor who already accepted is not measured as denied for the first moments
 * of every page view.
 */
/** The banner's element id, shared by the component and the reveal script. */
export const CONSENT_BANNER_ID = "consent-banner";

/**
 * Unhides the server-rendered consent banner during HTML parsing, before
 * first paint, when the visitor has not answered.
 *
 * The banner used to mount after hydration. On a throttled phone that was
 * about three seconds after first paint, and as the largest text block on
 * screen it became the page's LCP element (audit SAI-04: mobile LCP 3.8-3.9s,
 * render delay 81-84%). Rendered hidden on the server and revealed here, it
 * paints with the page instead.
 *
 * Mirrors readConsent() exactly: a stored, valid choice keeps it hidden;
 * anything else -- nothing stored, unreadable JSON, an unknown choice, or
 * storage blocked -- shows it. The component's own effect then reaches the
 * same answer, so React's state agrees with what is on screen.
 */
export function consentBannerRevealScript(): string {
  return `(function(){var b=document.getElementById(${JSON.stringify(CONSENT_BANNER_ID)});if(!b)return;try{var r=localStorage.getItem(${JSON.stringify(CONSENT_KEY)});if(r){var c=JSON.parse(r);c=c&&c.choice;if(c==='granted'||c==='analytics_only'||c==='denied')return;}}catch(e){}b.hidden=false;})();`;
}

export function consentBootstrapScript(): string {
  return `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  try {
    var raw = localStorage.getItem(${JSON.stringify(CONSENT_KEY)});
    if (raw) {
      var choice = JSON.parse(raw).choice;
      var granted = ${JSON.stringify(GRANTED)};
      var analyticsOnly = ${JSON.stringify(ANALYTICS_ONLY)};
      if (choice === 'granted') gtag('consent', 'update', granted);
      else if (choice === 'analytics_only') gtag('consent', 'update', analyticsOnly);
    }
  } catch (e) {}
})();`.trim();
}
