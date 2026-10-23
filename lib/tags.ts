/**
 * Google tag identifiers.
 *
 * Neither value is a secret: both appear in the page source of every site that
 * uses them. They live here rather than being read inline so the resolution
 * rule below has one home, and so `app/layout.tsx` and
 * `components/layout/analytics.tsx` cannot disagree about whether a container
 * is configured -- if they did, the consent defaults and the container they
 * gate would come apart, which is the one failure that must not happen.
 *
 * ## Why production has a fallback and nothing else does
 *
 * The container was installed env-gated on `NEXT_PUBLIC_GTM_ID`, and the
 * variable was never set in Vercel, so the live site has been loading no
 * container at all -- which is what GA4 is reporting when it says "Data
 * collection isn't active for your website". The page looks and behaves
 * completely normally with no container, so there was no visible symptom.
 *
 * The fix is not to hardcode the ID everywhere: that would make every preview
 * deployment and every developer's `npm run dev` push traffic into the client's
 * production property, and preview traffic in a real analytics property is
 * worse than no traffic, because it looks like demand.
 *
 * So the rule is: an explicit `NEXT_PUBLIC_GTM_ID` always wins, and when it is
 * absent the known container is used **only on a Vercel production
 * deployment**. Previews, local development and any other host still get
 * nothing unless the variable is set deliberately.
 *
 * `VERCEL_ENV` is read at build time in a server component, which is why it
 * does not need a `NEXT_PUBLIC_` prefix.
 */

/** The client's container, confirmed by the owner. Public by design. */
export const GTM_CONTAINER_ID = "GTM-MSW79R28";

/**
 * The raulji.com GA4 web data stream, confirmed by the owner 2026-10-23.
 * Stream ID 16183950335.
 *
 * Exported for documentation and for the opt-in direct-gtag path. **It is not
 * used by default**: GA4 belongs in a tag inside the container, because two
 * Google tags for the same property send two `page_view` events per visit.
 */
export const GA4_MEASUREMENT_ID = "G-SK8N5N3WE2";

/** True on a Vercel production deployment, not on a preview. */
function isVercelProduction(): boolean {
  return process.env.VERCEL_ENV === "production";
}

/**
 * The container to load, or undefined to load none.
 *
 * Call this from server components only. Returning undefined is a supported
 * state, not an error: with no container the site still pushes its events onto
 * `window.dataLayer`, they simply have nowhere to go, and no consent banner is
 * shown because nothing is being measured.
 */
export function gtmContainerId(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (explicit) return explicit;
  return isVercelProduction() ? GTM_CONTAINER_ID : undefined;
}

/**
 * The measurement ID for the direct gtag.js path, or undefined.
 *
 * Deliberately has **no** production fallback. Unlike the container, a second
 * Google tag is actively harmful: if the container also carries a GA4
 * Configuration tag, both send `page_view` and every session, user and
 * engagement figure inflates with no warning anywhere in GA4. So this one only
 * ever switches on when someone sets it on purpose.
 */
export function ga4MeasurementId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || undefined;
}
