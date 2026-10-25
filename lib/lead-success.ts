"use client";

/**
 * What happens the moment /api/lead/ confirms an enquiry, in one place.
 *
 * Both enquiry forms used to carry their own copy of this: the `form_submit`
 * push, the `markLeadCounted` guard, the `generate_lead` push with the same
 * eight fields, and the same comment explaining the honeypot. Two copies of a
 * conversion is how a funnel quietly splits in two -- one form gets a field the
 * other does not, or a later edit lands on one of them -- so the sequence lives
 * here and each form calls it once.
 *
 * It is also the only thing in the codebase allowed to push `generate_lead`.
 *
 * Deliberately does not navigate. The redirect to /thank-you/ is the caller's
 * job, because only the caller has the router, and because the conversion must
 * be recorded before the route changes rather than depending on it.
 */

import { markLeadCounted, track } from "./analytics";

export interface ConfirmedLead {
  /** Stable machine name of the form: "lead_form", "contact_wizard". */
  formId: string;
  /** What a report reads: "Enquiry form", "Contact wizard". */
  formName: string;
  /** Path the enquiry was sent from. Not personal; it is a page, not a person. */
  sourcePage: string;
  registrationType?: string;
  city?: string;
  /** The server's submission id, which is what the conversion is deduplicated on. */
  submissionId?: string;
  /** Whether the CRM recorded this against an existing lead. */
  duplicate?: boolean;
  /**
   * The honeypot field as submitted.
   *
   * A honeypot-tripped submission is answered `{ success: true }` on purpose,
   * so the bot cannot tell it was caught -- which means a bot reaches this
   * function. A human never fills a field positioned off-screen, so a value
   * here means no events at all. The response the bot received is untouched:
   * it learns nothing, and the conversion count stays clean.
   */
  honeypot?: string;
}

/**
 * Records a confirmed enquiry. Returns true when `generate_lead` was actually
 * pushed, which is false for a honeypot submission and false for a repeat of a
 * submission id already counted in this tab.
 *
 * Call it only where `/api/lead/` answered `success: true`. That response means
 * the CRM confirmed it stored the enquiry -- new or duplicate -- and it is the
 * only thing that may count as a conversion. See docs/lead-pipeline.md.
 */
export function recordLeadSuccess(lead: ConfirmedLead): boolean {
  if (lead.honeypot) return false;

  const registrationType = lead.registrationType || "Not specified";

  // The client's existing container already counts this one; it is kept
  // alongside `generate_lead` rather than replaced. See docs/gtm-event-map.md.
  track("form_submit", {
    registration_type: registrationType,
    city: lead.city || undefined,
  });

  /*
   * The conversion, and the only place it fires.
   *
   * Deduplicated on the server's own submission id, so a re-render, a React
   * Strict Mode double-invoke, a remount or a reload of the thank-you page
   * cannot count one enquiry twice. A duplicate enquiry recorded against an
   * existing lead is still a real enquiry, so it still converts;
   * `lead_duplicate` separates the two in reporting.
   */
  if (!markLeadCounted(lead.submissionId ?? "")) return false;

  track("generate_lead", {
    form_id: lead.formId,
    form_name: lead.formName,
    registration_type: registrationType,
    city: lead.city || undefined,
    submission_id: lead.submissionId,
    lead_duplicate: lead.duplicate ?? false,
    lead_source: `Website form (${lead.sourcePage})`,
  });
  return true;
}
