"use client";

/**
 * Analytics event layer (spec sections 48 and 49).
 *
 * Events are pushed to window.dataLayer so a tag manager container can route
 * them onward. Nothing here collects personal data: only the service, city and
 * page context needed to attribute a lead. Never pass a name, phone or email.
 */

type EventName =
  | "cta_click"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "start_business_click"
  | "service_card_click"
  | "city_page_click"
  | "gujarat_page_click"
  | "form_view"
  | "form_start"
  | "lead_form_submit"
  | "lead_form_error";

export interface EventParams {
  /** Pvt Ltd, LLP, Partnership, Proprietorship, or unset. */
  registration_type?: string;
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
