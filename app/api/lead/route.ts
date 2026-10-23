import { after, NextResponse } from "next/server";
import { z } from "zod";
import { SITE } from "@/lib/site";
import { isCaptured, submitLead, type CrmLeadPayload, type CrmResult } from "@/lib/crm/lead-client";
import { dispatchLeadEmails, type LeadEmailInput } from "@/lib/email/lead-emails";

/**
 * Lead submission endpoint. The only route that writes to the CRM.
 *
 * The CRM API key lives in RAULJI_CRM_API_KEY on the server and is never sent to
 * the browser. The previous build shipped a live key in client-side JavaScript,
 * which made it readable by anyone who opened the bundle.
 *
 * Shape of the pipeline, in order, because the order is the design:
 *
 *   1. rate limit        -> cheap, before any parsing
 *   2. size limit        -> before reading the body
 *   3. same-site check   -> rejects cross-origin posts when the browser says so
 *   4. validate          -> friendly sentences, never Zod's own wording
 *   5. honeypot          -> answered as success so the bot learns nothing
 *   6. CRM submit        -> the only thing that decides success
 *   7. emails, after()   -> post-response, and cannot affect step 6
 *
 * Step 6 is the whole point: `success: true` is returned if and only if the CRM
 * confirmed it stored the enquiry, as a new lead or against an existing one.
 * Email delivery is deliberately downstream of the response and can never turn a
 * captured lead into a visible failure, nor a failed capture into a success.
 */

export const runtime = "nodejs";

/** Largest body we will read. A valid enquiry is well under 4 KB. */
const MAX_BODY_BYTES = 16_384;

const CALL_TO_ACTION = `Please call ${SITE.phone.display}.`;

const required = (message: string) => ({
  required_error: message,
  invalid_type_error: message,
});

const LeadSchema = z.object({
  name: z
    .string(required("Please enter your name"))
    .trim()
    .min(2, "Please enter your name")
    .max(100),
  // Indian mobile numbers, with or without a +91 or 0 prefix.
  phone: z
    .string(required("Please enter your mobile number"))
    .trim()
    .transform((v) => v.replace(/[\s()-]/g, ""))
    .refine((v) => /^(\+?91|0)?[6-9]\d{9}$/.test(v), "Please enter a valid 10-digit mobile number"),
  email: z
    .union([z.string().trim().email("Please enter a valid email address"), z.literal("")])
    .optional(),
  /** Business or company name, or the proposed name (master rule 23). Optional. */
  businessName: z.string().trim().max(120, "Please shorten the business name to 120 characters").optional(),
  city: z.string().trim().max(80).optional(),
  registrationType: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  sourcePage: z.string().trim().max(200).optional(),
  /**
   * Campaign and analytics identifiers captured in the browser from the landing
   * URL and from Google Analytics' own first-party cookies (lib/attribution.ts).
   * Every key is optional and absent when it was not genuinely present, so none
   * of these may be defaulted here either.
   */
  utm_source: z.string().trim().max(200).optional(),
  utm_medium: z.string().trim().max(200).optional(),
  utm_campaign: z.string().trim().max(200).optional(),
  utm_term: z.string().trim().max(200).optional(),
  utm_content: z.string().trim().max(200).optional(),
  gclid: z.string().trim().max(200).optional(),
  ga_client_id: z.string().trim().max(60).optional(),
  ga_session_id: z.string().trim().max(40).optional(),
  ga_session_number: z.string().trim().max(10).optional(),
  // Honeypot. Deliberately permissive: a value is handled below by silently
  // accepting, rather than rejected here, so a bot learns nothing from the error.
  //
  // It used to be called `company`, which browsers autofill with the visitor's
  // employer, so a real lead could be dropped as spam. It is now `hp_note`, a
  // name no autofill profile maps to, and `company` is still honoured as a trap
  // for any page loaded before the rename.
  hp_note: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
});

/**
 * Best-effort in-memory rate limit. Serverless instances are not shared, so this
 * throttles the common case rather than guaranteeing a global limit. Put a WAF
 * rule in front of this route if abuse becomes a real problem.
 */
const WINDOW_MS = 60_000;
/** Total requests per minute, including ones that fail validation. Stops floods. */
const MAX_REQUESTS = 20;
/** Valid submissions per minute. A retyped phone number should not count here. */
const MAX_SUBMISSIONS = 5;

const requestHits = new Map<string, number[]>();
const submitHits = new Map<string, number[]>();

function overLimit(store: Map<string, number[]>, ip: string, max: number) {
  const now = Date.now();
  const recent = (store.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  store.set(ip, recent);
  if (store.size > 5000) store.clear();
  return recent.length > max;
}

/** Replace control and format characters so nothing odd reaches the CRM. */
function clean(value?: string) {
  if (!value) return undefined;
  return value.replace(/\p{C}/gu, " ").replace(/\s+/g, " ").trim() || undefined;
}

/**
 * Reject a cross-site POST when the browser tells us it is one.
 *
 * `Sec-Fetch-Site` is sent by every current browser and is the reliable signal;
 * `Origin` is the fallback. A request with neither header is allowed through,
 * because that is a non-browser client (curl, a monitoring probe, the test
 * suite) rather than a forged cross-origin submission -- CSRF needs a browser to
 * carry it, and a header-less client is not one. The rate limit and honeypot
 * still apply to it.
 */
function crossSite(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return true;

  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const host = new URL(origin).host;
    const self = request.headers.get("host");
    // SITE.url covers the canonical production host; `host` covers previews and
    // localhost, where the deployment hostname is not known ahead of time.
    return host !== self && host !== new URL(SITE.url).host;
  } catch {
    return true;
  }
}

/** Correlation id for the logs. Not a secret and not derived from the payload. */
function newRequestId(): string {
  return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * What the visitor is told for each way the CRM can fail.
 *
 * `unconfirmed` is the case worth reading carefully. The request reached the
 * CRM and never came back, so the lead may well be stored. Telling the visitor
 * to "try again" would invite a second identical submission for an enquiry that
 * probably already exists, so it asks them to call instead. That is the brief's
 * rule against blindly retrying a non-idempotent submission, expressed in the
 * copy rather than in a retry loop.
 */
function failureResponse(result: CrmResult, requestId: string) {
  const body = (error: string, status: number) =>
    NextResponse.json({ success: false, error, requestId }, { status });

  switch (result.status) {
    case "misconfigured":
    case "unauthorised":
      // Never says "API key" to the visitor. The detail is in the server log.
      return body(`We could not submit the form. ${CALL_TO_ACTION}`, 500);
    case "rate_limited":
      return body(`Too many submissions right now. Please try again in a minute, or call ${SITE.phone.display}.`, 429);
    case "rejected":
      return body(`We could not submit the form. ${CALL_TO_ACTION}`, 502);
    case "unconfirmed":
      return body(
        `We could not confirm your enquiry was received. Please call ${SITE.phone.display} rather than submitting again, so we do not create a duplicate.`,
        502,
      );
    default:
      return body(`Network problem while submitting. Please try again or call ${SITE.phone.display}.`, 502);
  }
}

export async function POST(request: Request) {
  const requestId = newRequestId();
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (overLimit(requestHits, ip, MAX_REQUESTS)) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many submissions. Please try again in a minute, or call ${SITE.phone.display}.`,
      },
      { status: 429 },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: "Request too large." }, { status: 413 });
  }

  if (crossSite(request)) {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 403 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    // Content-Length can be absent or wrong; this is the limit that actually holds.
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: "Request too large." }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot tripped: accept silently so the bot does not learn it was caught.
  // Nothing is sent to the CRM and no email goes out.
  if (data.hp_note || data.company) {
    return NextResponse.json({ success: true });
  }

  // Only genuine submissions count against the tighter limit.
  if (overLimit(submitHits, ip, MAX_SUBMISSIONS)) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many submissions. Please try again in a minute, or call ${SITE.phone.display}.`,
      },
      { status: 429 },
    );
  }

  const name = clean(data.name) ?? data.name;
  const email = clean(data.email);
  const city = clean(data.city);
  const businessName = clean(data.businessName);
  const service = clean(data.registrationType);
  const message = clean(data.message);
  const pageUrl = data.sourcePage ? new URL(data.sourcePage, SITE.url).toString() : undefined;

  const attribution = Object.fromEntries(
    (
      [
        ["utm_source", data.utm_source],
        ["utm_medium", data.utm_medium],
        ["utm_campaign", data.utm_campaign],
        ["utm_term", data.utm_term],
        ["utm_content", data.utm_content],
        ["gclid", data.gclid],
        ["ga_client_id", data.ga_client_id],
        ["ga_session_id", data.ga_session_id],
        ["ga_session_number", data.ga_session_number],
      ] as const
    ).flatMap(([key, value]) => {
      const cleaned = clean(value);
      return cleaned ? [[key, cleaned] as [string, string]] : [];
    }),
  );

  /*
   * `notes` keeps the human-readable summary the team already reads in the CRM,
   * and `message` carries the customer's own words on their own field so the CRM
   * can show them unprefixed. Both are sent: the brief allows either or both,
   * and dropping `notes` would lose the business name and page context for
   * anyone reading the lead in a list view.
   */
  const notes = [
    businessName ? `Business / company: ${businessName}` : null,
    service ? `Needs help with: ${service}` : null,
    pageUrl ? `Submitted from: ${pageUrl}` : null,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const payload: CrmLeadPayload = {
    name,
    phone: data.phone,
    email,
    city,
    // state/country are not asked for on either form. They are left unset rather
    // than guessed from the city: master rule 13, and a wrong state is worse in a
    // CRM than an empty one.
    service,
    source: "WEBSITE_FORM",
    notes: notes || undefined,
    message,
    lead_source: pageUrl ? `Website form (${data.sourcePage})` : "Website form",
    page_url: pageUrl,
    page_name: data.sourcePage,
    ...attribution,
    customFields: {
      registrationType: service ?? "Not specified",
      businessName: businessName ?? "",
      sourcePage: data.sourcePage ?? "",
    },
  };

  const result = await submitLead(payload);

  if (!isCaptured(result)) {
    /*
     * Structured, and deliberately free of the payload: no name, phone, email,
     * message or key. The request id is the join between this line, the response
     * the visitor received and the email log below.
     */
    console.error(
      JSON.stringify({
        event: "lead_crm_failed",
        requestId,
        crmStatus: result.status,
        httpStatus: "httpStatus" in result ? result.httpStatus : undefined,
        hasEmail: Boolean(email),
      }),
    );
    return failureResponse(result, requestId);
  }

  console.info(
    JSON.stringify({
      event: "lead_crm_captured",
      requestId,
      crmStatus: result.status,
      leadId: result.leadId,
      duplicate: result.duplicate,
      hasEmail: Boolean(email),
    }),
  );

  const emailInput: LeadEmailInput = {
    name,
    phone: data.phone,
    email,
    city,
    businessName,
    service,
    message,
    pageUrl,
    pageName: data.sourcePage,
    attribution,
    leadId: result.leadId,
    duplicate: result.duplicate,
    requestId,
  };

  /*
   * after() runs once the response has been sent, which is the right place for
   * this: the visitor is not kept waiting on two email round trips, and -- more
   * importantly -- nothing an email provider does can change what they were
   * told. On Vercel this is the supported way to do post-response work; a bare
   * floating promise would risk the function being frozen before it finished.
   */
  after(async () => {
    const emails = await dispatchLeadEmails(emailInput);
    const level = emails.admin.status === "sent" ? "info" : "error";
    const line = JSON.stringify({
      event: "lead_emails",
      requestId,
      leadId: result.leadId,
      customer: emails.customer.status,
      customerDetail: "detail" in emails.customer ? emails.customer.detail : undefined,
      admin: emails.admin.status,
      adminDetail: "detail" in emails.admin ? emails.admin.detail : undefined,
    });
    if (level === "error") console.error(line);
    else console.info(line);
  });

  /*
   * `duplicate` is returned for the client's own logging. The success copy the
   * forms show is the same either way -- "your enquiry has been received" -- which
   * is true for a duplicate and does not claim a second lead was created.
   */
  return NextResponse.json({ success: true, duplicate: result.duplicate, requestId });
}
