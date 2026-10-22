/**
 * The two emails one confirmed enquiry produces, and the dispatcher that sends
 * them.
 *
 * Both are built here rather than in the API route so they can be unit-tested
 * without a request, and so the escaping rule has one home. Every dynamic value
 * in an HTML body goes through `esc()`. The customer controls their own name,
 * business name, city and message, so an unescaped template would let a
 * submitted `<script>` or a broken-out attribute reach the admin's inbox -- the
 * admin notification is the more sensitive of the two, because it is the one
 * that carries attacker-controlled text to a trusted reader.
 *
 * Contact details come from `SITE`, which master rule 13 makes the only source
 * of verified business facts. Nothing here promises a response time: the
 * business has not approved one, so the wording says the team will review and
 * follow up, and no more.
 */

import { SITE } from "@/lib/site";
import { adminRecipients, sendEmail, type EmailResult } from "./provider";

/** HTML-escape a value for interpolation into element text or an attribute. */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** The enquiry, as the emails need it. Already validated and normalised. */
export interface LeadEmailInput {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  businessName?: string;
  service?: string;
  message?: string;
  pageUrl?: string;
  pageName?: string;
  attribution?: Record<string, string>;
  leadId: string | null;
  duplicate: boolean;
  requestId: string;
}

const BRAND = "#122640";
const ACCENT = "#1a7cb0";

function shell(heading: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(heading)}</title></head>
<body style="margin:0;padding:24px 12px;background:#f4f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#3a4656;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e3e9ef;border-radius:8px;">
<tr><td style="padding:28px 32px 20px;border-bottom:3px solid ${ACCENT};">
<div style="font-size:19px;font-weight:800;color:${BRAND};letter-spacing:-0.01em;">${esc(SITE.name)}</div>
<div style="font-size:12px;color:#5b6778;margin-top:4px;">${esc(SITE.tagline)}</div>
</td></tr>
<tr><td style="padding:28px 32px 32px;font-size:15px;line-height:1.65;">${bodyHtml}</td></tr>
<tr><td style="padding:18px 32px 24px;border-top:1px solid #eef2f6;font-size:12px;line-height:1.6;color:#5b6778;">
${esc(SITE.name)} &middot; ${esc(SITE.locality)}, ${esc(SITE.region)}<br>
<a href="tel:${esc(SITE.phone.e164)}" style="color:${ACCENT};text-decoration:none;">${esc(SITE.phone.display)}</a> &middot;
<a href="mailto:${esc(SITE.email)}" style="color:${ACCENT};text-decoration:none;">${esc(SITE.email)}</a><br>
${esc(SITE.hours.display)}
</td></tr></table></body></html>`;
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:7px 14px 7px 0;vertical-align:top;font-size:13px;color:#5b6778;white-space:nowrap;">${esc(label)}</td><td style="padding:7px 0;vertical-align:top;font-size:14px;color:${BRAND};font-weight:600;">${esc(value)}</td></tr>`;
}

const footerText = `${SITE.name}
${SITE.locality}, ${SITE.region}
${SITE.phone.display} | ${SITE.email}
${SITE.hours.display}`;

/* ---------------------------------------------------------------- customer */

export function customerEmail(lead: LeadEmailInput): { subject: string; html: string; text: string } {
  const service = lead.service?.trim();
  const serviceLine = service
    ? `You told us you need help with <strong style="color:${BRAND};">${esc(service)}</strong>.`
    : `You did not pick a specific service, which is fine &mdash; we will work out what you need when we speak.`;

  const html = shell(
    "We have received your enquiry",
    `<p style="margin:0 0 16px;">Dear ${esc(lead.name)},</p>
<p style="margin:0 0 16px;">Thank you for contacting ${esc(SITE.name)}. This email confirms that your enquiry has reached us.</p>
<p style="margin:0 0 16px;">${serviceLine}</p>
<p style="margin:0 0 16px;">A member of our team will review what you have sent and follow up using the details you provided. If your matter is urgent, calling is the fastest route &mdash; <a href="tel:${esc(SITE.phone.e164)}" style="color:${ACCENT};font-weight:600;text-decoration:none;">${esc(SITE.phone.display)}</a>.</p>
<p style="margin:0 0 16px;">There is nothing you need to do in the meantime, and no need to submit the form again.</p>
<p style="margin:24px 0 0;font-size:13px;color:#5b6778;">${esc(SITE.name)} is a private business-services firm. We are not a government department and are not affiliated with the Ministry of Corporate Affairs, the GST department or any other authority.</p>`,
  );

  const text = `Dear ${lead.name},

Thank you for contacting ${SITE.name}. This email confirms that your enquiry has reached us.

${service ? `You told us you need help with: ${service}` : "You did not pick a specific service, which is fine - we will work out what you need when we speak."}

A member of our team will review what you have sent and follow up using the details you provided. If your matter is urgent, calling is the fastest route - ${SITE.phone.display}.

There is nothing you need to do in the meantime, and no need to submit the form again.

${SITE.name} is a private business-services firm. We are not a government department and are not affiliated with the Ministry of Corporate Affairs, the GST department or any other authority.

--
${footerText}`;

  return { subject: `We’ve received your enquiry | ${SITE.name}`, html, text };
}

/* ------------------------------------------------------------------- admin */

export function adminEmail(lead: LeadEmailInput): { subject: string; html: string; text: string } {
  const service = lead.service?.trim() || "Not specified";
  const details: [string, string][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "Not provided"],
    ["City", lead.city || "Not provided"],
    ...(lead.state ? ([["State", lead.state]] as [string, string][]) : []),
    ...(lead.businessName ? ([["Business", lead.businessName]] as [string, string][]) : []),
    ["Service", service],
  ];

  const crmRows: [string, string][] = [
    ["CRM lead ID", lead.leadId ?? "Not returned by the CRM"],
    ["Lead record", lead.duplicate ? "Updated an existing lead (duplicate enquiry)" : "New lead created"],
    ["Page", lead.pageName ? `${lead.pageName} (${lead.pageUrl ?? "-"})` : lead.pageUrl ?? "Not recorded"],
    ["Request ID", lead.requestId],
  ];

  const attribution = Object.entries(lead.attribution ?? {});

  const html = shell(
    "New website enquiry",
    `<p style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${ACCENT};">New website enquiry</p>
<h1 style="margin:0 0 20px;font-size:21px;font-weight:800;color:${BRAND};letter-spacing:-0.01em;">${esc(service)}</h1>
${
  lead.duplicate
    ? `<p style="margin:0 0 20px;padding:10px 14px;background:#fff8e6;border-left:3px solid #d89b1c;font-size:13px;">This enquiry was recorded against an <strong>existing</strong> CRM lead. It is not a new contact.</p>`
    : ""
}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0 0 20px;">${details.map(([l, v]) => row(l, v)).join("")}</table>
<div style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#5b6778;">Message</div>
<div style="margin:0 0 22px;padding:12px 14px;background:#f4f7fa;border:1px solid #e3e9ef;border-radius:4px;font-size:14px;line-height:1.65;white-space:pre-wrap;">${lead.message ? esc(lead.message) : "<em style=\"color:#5b6778;\">No message provided.</em>"}</div>
<div style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#5b6778;">CRM</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0 0 20px;">${crmRows.map(([l, v]) => row(l, v)).join("")}</table>
${
  attribution.length
    ? `<div style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#5b6778;">Campaign</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0 0 20px;">${attribution.map(([l, v]) => row(l, v)).join("")}</table>`
    : `<p style="margin:0 0 20px;font-size:13px;color:#5b6778;">No campaign or UTM parameters were present on the visit.</p>`
}
${lead.email ? `<p style="margin:0;font-size:13px;color:#5b6778;">Reply to this email to answer ${esc(lead.name)} directly.</p>` : ""}`,
  );

  const text = `NEW WEBSITE ENQUIRY - ${service}
${lead.duplicate ? "\nNOTE: recorded against an EXISTING CRM lead, not a new contact.\n" : ""}
${details.map(([l, v]) => `${l}: ${v}`).join("\n")}

Message:
${lead.message || "No message provided."}

CRM:
${crmRows.map(([l, v]) => `${l}: ${v}`).join("\n")}

Campaign:
${attribution.length ? attribution.map(([l, v]) => `${l}: ${v}`).join("\n") : "No campaign or UTM parameters were present on the visit."}

--
${footerText}`;

  return { subject: `New Website Enquiry — ${service} — ${SITE.name}`, html, text };
}

/* -------------------------------------------------------------- dispatcher */

export interface LeadEmailDispatch {
  customer: EmailResult | { status: "skipped"; detail: string };
  admin: EmailResult;
}

/**
 * Send both emails for a lead the CRM has already confirmed.
 *
 * Called only after capture, and deliberately independent of the HTTP response:
 * neither result can turn a captured lead into a failure for the visitor. Both
 * are sent concurrently and both outcomes are returned so the caller can log
 * them.
 *
 * The customer email is skipped, not failed, when no address was given -- the
 * email field is optional on both forms.
 */
export async function dispatchLeadEmails(lead: LeadEmailInput): Promise<LeadEmailDispatch> {
  const admins = adminRecipients();

  const customerTask = async (): Promise<LeadEmailDispatch["customer"]> => {
    if (!lead.email) return { status: "skipped", detail: "no customer email provided" };
    const { subject, html, text } = customerEmail(lead);
    return sendEmail({ to: [lead.email], subject, html, text });
  };

  const adminTask = async (): Promise<EmailResult> => {
    if (!admins.length) {
      return { status: "misconfigured", detail: "RAULJI_ADMIN_EMAILS is not set" };
    }
    const { subject, html, text } = adminEmail(lead);
    // replyTo is the only place a submitted address is used as a header, and it
    // is a reply target, never the sender.
    return sendEmail({ to: admins, subject, html, text, replyTo: lead.email });
  };

  const [customer, admin] = await Promise.all([customerTask(), adminTask()]);
  return { customer, admin };
}
