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
  | "form_error";

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
  window.dataLayer.push({
    event,
    page: params.page ?? url.pathname,
    source: params.source ?? url.searchParams.get("utm_source") ?? undefined,
    campaign: params.campaign ?? url.searchParams.get("utm_campaign") ?? undefined,
    ...params,
  });
}
