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
  | "finder_complete";

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
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
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
  window.dataLayer.push({
    event,
    page: path,
    page_type: pageTypeFor(path),
    source: params.source ?? url.searchParams.get("utm_source") ?? undefined,
    campaign: params.campaign ?? url.searchParams.get("utm_campaign") ?? undefined,
    ...params,
    city,
  });
}
