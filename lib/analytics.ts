"use client";

/**
 * Analytics event layer (spec sections 48 and 49).
 *
 * Event names match master rule 29 exactly, because the client reads them in
 * their own container and a renamed event is a silently broken report.
 *
 * Events are pushed to window.dataLayer so a tag manager container can route
 * them onward. page_view is not pushed here: the container emits it on load. Nothing here collects personal data: only the service, city and
 * page context needed to attribute a lead. Never pass a name, phone or email.
 */

import { CITY_INDEX } from "./city-index";

type EventName =
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "primary_cta_click"
  | "service_card_click"
  | "city_page_click"
  | "gujarat_page_click"
  | "location_drawer_open"
  | "technology_click"
  | "form_view"
  | "form_start"
  | "form_submit"
  | "form_error"
  /*
   * Fires when the business structure finder shows its result (technical audit
   * TF-15). The tool itself is a later release; the name is declared here now
   * so the container can be configured against the finished list rather than
   * being edited again when the tool ships.
   *
   * Note on naming: the audit calls the phone event `call_click`. This file
   * keeps `phone_click`, which is the name master rule 29 fixes and the name
   * the client's existing GTM container is already wired to. Renaming it
   * would silently zero an existing report, which is exactly what the note at
   * the top of this file warns about.
   */
  | "finder_complete"

  /* ---------------------------------------------------------------------
   * Added 2026-10-23 for the GA4 / GTM measurement plan.
   *
   * These are additions, not renames. The client's analytics brief proposed a
   * full rename of the taxonomy above -- click_phone for phone_click,
   * click_contact_cta for primary_cta_click, generate_lead in place of
   * form_submit. **The client was shown that the existing container
   * (GTM-MSW79R28) is wired to the current names and that renaming would read
   * zero on every existing trigger from the moment it deployed, and chose to
   * keep them.** So every name above is untouched and the brief's genuinely new
   * events are added alongside. docs/gtm-event-map.md records which brief name
   * maps to which existing event, so the container can be built from the brief
   * without guessing.
   * ------------------------------------------------------------------ */

  /**
   * The conversion. Fires once per enquiry the CRM has confirmed it stored,
   * new or duplicate, and never on a click, a form start, a validation
   * failure, a CRM failure or a page load.
   *
   * It does not replace `form_submit`, which the client's container already
   * counts; both fire on the same confirmed submission. `generate_lead` is the
   * GA4 recommended name and is the one to mark as the conversion in GA4,
   * because it is deduplicated on the server's own submission id -- see
   * `markLeadCounted`.
   */
  | "generate_lead"
  /** A registration or consulting service page was viewed. */
  | "view_service"
  /** A city or city + service page was viewed. */
  | "view_location_page"
  /** A blog article was viewed. */
  | "view_blog_article"
  /** A service was chosen in an enquiry form's "what do you need help with". */
  | "select_service"
  /** A step of the multi-step contact wizard was completed. */
  | "form_step_complete"
  /** Client-side validation rejected the form. Carries the field, never its value. */
  | "form_validation_error"
  /** The visitor pressed submit and the request is going out. Not a conversion. */
  | "form_submit_attempt"
  /** The submission failed. Carries a safe category, never the error text. */
  | "form_submission_error"
  /** A link to another domain was followed. */
  | "click_external_link";

/**
 * Which template the event happened on, derived from the path rather than
 * passed by the caller (technical audit TF-15 asks for `page_type` on every
 * event). Deriving it means a new call site cannot forget it and cannot spell
 * it differently, and the values stay consistent across the whole container.
 */
export type PageType =
  | "home"
  | "city_service"
  | "city"
  | "registration_service"
  | "service"
  | "service_hub"
  | "gujarat"
  | "blog_post"
  | "blog_index"
  | "compare"
  | "contact"
  | "faqs"
  | "about"
  | "legal"
  | "other";

const CITY_SLUGS = new Set(CITY_INDEX.map((c) => c.slug));

const REGISTRATION_SLUGS = new Set([
  "pvt-registration",
  "llp-registration",
  "partnership-registration",
  "proprietorship-registration",
]);

export function pageTypeFor(pathname: string): PageType {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "home";

  const [first, second] = parts;

  if (CITY_SLUGS.has(first)) return second ? "city_service" : "city";
  if (first === "gujarat") return "gujarat";
  if (first === "blog") return second ? "blog_post" : "blog_index";
  if (first === "services") {
    if (!second) return "service_hub";
    if (second === "business-registration" || second === "business-consulting") return "service_hub";
    return REGISTRATION_SLUGS.has(second) ? "registration_service" : "service";
  }
  if (first === "compare") return "compare";
  if (first === "contact") return "contact";
  if (first === "faqs") return "faqs";
  if (first === "about" || first === "team" || first === "our-clients") return "about";
  if (first === "privacy" || first === "terms" || first === "disclaimer" || first === "image-credits") {
    return "legal";
  }
  return "other";
}

/** The city slug when the path is a city or city + service page. */
function citySlugFor(pathname: string) {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && CITY_SLUGS.has(first) ? first : undefined;
}

export interface EventParams {
  /** Pvt Ltd, LLP, Partnership, Proprietorship, or unset. */
  registration_type?: string;
  /**
   * A named service that is not one of the four registration structures, e.g.
   * "Business consulting" or "Annual compliance".
   *
   * Separate from `registration_type` on purpose. That field is documented to
   * the client as the structure dimension and their reports segment on it, so
   * putting "Business consulting" in it would quietly corrupt a report rather
   * than extend one.
   */
  service?: string;
  city?: string;
  page?: string;
  source?: string;
  campaign?: string;
  label?: string;

  /* --- Added 2026-10-23. Attribution and form context for the GA4 plan. --- */

  /**
   * Which form the event came from. `form_id` is the stable machine name
   * ("lead_form", "contact_wizard"); `form_name` is what a report reads.
   */
  form_id?: string;
  form_name?: string;
  /** Wizard step number, 1-based, for `form_step_complete`. */
  form_step?: number;
  /**
   * The field that failed validation, for `form_validation_error`. The field
   * NAME only -- never the value the visitor typed, which is their own data.
   */
  error_field?: string;
  /**
   * A bounded category for `form_submission_error`, never the error message:
   * message text can quote the payload back. See `errorCategory`.
   */
  error_category?: string;
  /**
   * The server's submission id, echoed from /api/lead/. Used to deduplicate
   * `generate_lead`. Server-generated and carries nothing personal.
   */
  submission_id?: string;
  /** Whether the CRM recorded this against an existing lead. */
  lead_duplicate?: boolean;
  /** Human-readable service name, for the new view_/select_ events. */
  service_name?: string;
  /** City display name, for view_location_page. */
  city_name?: string;
  /** An accurate internal form/campaign label. Never invented. */
  lead_source?: string;
  /** Destination host, for click_external_link. */
  link_domain?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * URL query keys we are willing to copy into the dataLayer.
 *
 * An allow-list, not a filter. Copying the whole query string would forward
 * whatever happens to be on the URL -- an email in a `?email=` parameter, a
 * token, a referral code with someone's name in it -- straight into analytics.
 * These eleven are the campaign and click identifiers and nothing else.
 */
const ALLOWED_QUERY_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

/**
 * `generate_lead` must fire once per confirmed enquiry.
 *
 * React Strict Mode double-invokes effects, a re-render can re-run a handler,
 * and a visitor who refreshes a success state should not be counted twice. So
 * the conversion is keyed on the submission id the API returns -- which is
 * server-generated, carries nothing personal, and is unique per accepted
 * submission -- and the ids already counted are held in sessionStorage so they
 * survive a remount within the tab.
 *
 * Returns true the first time an id is seen and false afterwards, so the call
 * site reads `if (markLeadCounted(id)) track("generate_lead", ...)`.
 *
 * When storage is unavailable it falls back to an in-memory set, which still
 * covers the re-render and double-invoke cases -- the ones that actually
 * happen -- and simply cannot survive a reload.
 */
const countedLeads = new Set<string>();
const COUNTED_KEY = "raulji.leads.counted.v1";

export function markLeadCounted(submissionId: string): boolean {
  if (!submissionId) return false;
  if (countedLeads.has(submissionId)) return false;
  countedLeads.add(submissionId);
  try {
    const raw = sessionStorage.getItem(COUNTED_KEY);
    const seen = raw ? (JSON.parse(raw) as string[]) : [];
    if (seen.includes(submissionId)) return false;
    // Bounded: a tab will not legitimately produce many enquiries.
    sessionStorage.setItem(COUNTED_KEY, JSON.stringify([...seen, submissionId].slice(-20)));
  } catch {
    /* in-memory set above is the fallback */
  }
  return true;
}

/**
 * A bounded category for a failed submission.
 *
 * Never the server's message. Those sentences are written for the visitor and
 * can include the phone number, and an error body from further upstream can
 * quote the payload back. A fixed vocabulary also keeps the GA4 report
 * groupable instead of producing one row per wording.
 */
export function errorCategory(status: number | null): string {
  if (status === null) return "network";
  if (status === 429) return "rate_limited";
  if (status === 413) return "too_large";
  if (status === 403) return "rejected_origin";
  if (status === 400) return "validation";
  if (status >= 500) return "server";
  return "unknown";
}

export function track(event: EventName, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const url = new URL(window.location.href);
  const path = params.page ?? url.pathname;
  /*
   * `city` is derived from the path as a fallback only. A caller that knows
   * the city passes its display name ("Surat"), which is what the client's
   * reports segment on; the derived value is the slug, used only so an event
   * on a location page is never missing the dimension entirely.
   */
  const city =
    params.city ??
    CITY_INDEX.find((c) => c.slug === citySlugFor(path))?.name ??
    undefined;
  /*
   * Campaign parameters, from the allow-list only. Read from the current URL
   * so they are genuinely present rather than remembered or inferred: an event
   * on a page with no campaign on it carries no campaign fields at all, which
   * is what the brief's "do not fabricate attribution" requires.
   */
  const campaignParams: Record<string, string> = {};
  for (const key of ALLOWED_QUERY_KEYS) {
    const value = url.searchParams.get(key);
    if (value) campaignParams[key] = value.slice(0, 200);
  }

  window.dataLayer.push({
    event,
    page: path,
    page_type: pageTypeFor(path),
    /*
     * GA4's own parameter names, alongside the site's existing `page`. The
     * client's container reads `page`; GA4 reports read these. Both are sent
     * rather than one renamed, for the same reason the event names were kept.
     *
     * page_location is the href with the query string stripped back to the
     * allow-listed keys, so a stray `?email=` on a URL cannot ride along into
     * analytics inside the page location itself.
     */
    page_location: `${url.origin}${path}${
      Object.keys(campaignParams).length ? `?${new URLSearchParams(campaignParams)}` : ""
    }`,
    page_title: document.title || undefined,
    page_referrer: document.referrer || undefined,
    source: params.source ?? campaignParams.utm_source ?? undefined,
    campaign: params.campaign ?? campaignParams.utm_campaign ?? undefined,
    ...campaignParams,
    ...params,
    city,
  });
}
