/**
 * Raulji CRM lead provider.
 *
 * The only place in the codebase that talks to the CRM. Server-only: importing
 * this into a client component would pull `RAULJI_CRM_API_KEY` into the browser
 * bundle, so the module asserts it is on the server at call time and the key is
 * read inside the function rather than at module scope.
 *
 * Endpoint and schema are the CRM's own, as documented by the client:
 *   POST {base}/public/leads        header: X-API-Key
 *   201 + success:true              new lead created
 *   200 + success:true + duplicate  recorded against an existing lead
 *   400 / 401 / 429                 validation / bad key / rate limit
 *
 * The important rule here: an HTTP 200 is NOT a captured lead. Only a 200 or
 * 201 whose body confirms `success: true` counts, and everything else -- including
 * a 200 carrying `success: false` -- is a failure. The previous implementation
 * checked `response.ok && result?.success`, which was already right about this;
 * what it could not do was tell the caller *which* failure happened, so every
 * problem produced the same message and an ambiguous timeout was presented to
 * the visitor as "please try again".
 */

/** What the CRM is asked to store. Field names are the CRM's, not ours. */
export interface CrmLeadPayload {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  country?: string;
  service?: string;
  source?: string;
  notes?: string;
  message?: string;
  lead_source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  ga_client_id?: string;
  ga_session_id?: string;
  ga_session_number?: string;
  page_url?: string;
  page_name?: string;
  customFields?: Record<string, string>;
}

/**
 * The outcome of one submission attempt, as a discriminated union.
 *
 * `unconfirmed` is the one that matters most and the reason this is a union at
 * all. A timeout or abort happens *after* the request left this process, so the
 * CRM may well have stored the lead. That is not a failure we may retry and not
 * a success we may report: it is genuinely unknown, and the caller has to say so.
 */
export type CrmResult =
  | { status: "created"; leadId: string | null; duplicate: false }
  | { status: "duplicate"; leadId: string | null; duplicate: true }
  /** CRM rejected the payload. Our bug or a field it would not accept. */
  | { status: "rejected"; httpStatus: number }
  /** Key missing, wrong or revoked. Never surfaced to the visitor as such. */
  | { status: "unauthorised" }
  /** CRM's own rate limit, not ours. */
  | { status: "rate_limited" }
  /** Reached the CRM and it failed, or never connected. Safe to submit again. */
  | { status: "unavailable"; httpStatus?: number }
  /** Sent, never answered. May or may not have been stored. Do not retry blindly. */
  | { status: "unconfirmed" }
  /** No API key on this deployment. A configuration fault, not a visitor fault. */
  | { status: "misconfigured" };

export const CRM_TIMEOUT_MS = 15_000;

function crmBase() {
  /*
   * Default corrected 2026-10-22 from `https://api.raulji.com/api/v1`, which is
   * not a host the CRM answers on. The client's integration brief gives
   * `https://crm.raulji.com/api/v1`. Still overridable, so a staging CRM does
   * not need a code change.
   */
  return (process.env.RAULJI_CRM_BASE ?? "https://crm.raulji.com/api/v1").replace(/\/+$/, "");
}

/**
 * Pull the CRM's identifier for the lead out of the response.
 *
 * The exact field name is not documented in the brief, so this looks in the
 * shapes a REST API of this kind plausibly uses and returns `null` when none of
 * them is present. **It never invents one.** A null id means the admin email
 * says the id was not returned, which is accurate and checkable, rather than
 * printing something that looks like an id and is not.
 */
export function extractLeadId(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const root = body as Record<string, unknown>;
  const data = (root.data ?? root.lead ?? root.result) as Record<string, unknown> | undefined;
  const candidates = [
    root.id,
    root.leadId,
    root.lead_id,
    data?.id,
    data?.leadId,
    data?.lead_id,
    (data?.lead as Record<string, unknown> | undefined)?.id,
  ];
  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return null;
}

function isDuplicate(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const root = body as Record<string, unknown>;
  if (root.duplicate === true) return true;
  const data = root.data as Record<string, unknown> | undefined;
  return data?.duplicate === true;
}

/**
 * Submit one lead. Never throws: every failure mode comes back as a `CrmResult`
 * so the route cannot accidentally treat an exception as a success.
 */
export async function submitLead(
  payload: CrmLeadPayload,
  options: { timeoutMs?: number; fetchImpl?: typeof fetch } = {},
): Promise<CrmResult> {
  const apiKey = process.env.RAULJI_CRM_API_KEY;
  if (!apiKey) return { status: "misconfigured" };

  const doFetch = options.fetchImpl ?? fetch;
  let response: Response;
  try {
    response = await doFetch(`${crmBase()}/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(options.timeoutMs ?? CRM_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    /*
     * Timeout and abort mean the request was already on the wire, so the lead
     * may exist. Anything else -- DNS, refused connection, TLS -- means it never
     * arrived, which is safely retryable.
     */
    const name = error instanceof Error ? error.name : "";
    if (name === "TimeoutError" || name === "AbortError") return { status: "unconfirmed" };
    return { status: "unavailable" };
  }

  if (response.status === 401 || response.status === 403) return { status: "unauthorised" };
  if (response.status === 429) return { status: "rate_limited" };

  const body = (await response.json().catch(() => null)) as unknown;
  const confirmed =
    Boolean(body) &&
    typeof body === "object" &&
    (body as Record<string, unknown>).success === true;

  if (response.status === 201 || response.status === 200) {
    // A 200 or 201 without `success: true` is not a captured lead, whatever the
    // status line says. This is the check the brief singles out.
    if (!confirmed) return { status: "unavailable", httpStatus: response.status };
    const leadId = extractLeadId(body);
    return isDuplicate(body)
      ? { status: "duplicate", leadId, duplicate: true }
      : { status: "created", leadId, duplicate: false };
  }

  if (response.status === 400 || response.status === 422) {
    return { status: "rejected", httpStatus: response.status };
  }
  return { status: "unavailable", httpStatus: response.status };
}

/** True when the CRM has confirmed the enquiry is stored, new or duplicate. */
export function isCaptured(result: CrmResult): result is Extract<
  CrmResult,
  { status: "created" | "duplicate" }
> {
  return result.status === "created" || result.status === "duplicate";
}
