import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Lead submission endpoint.
 *
 * The CRM API key lives in RAULJI_CRM_API_KEY on the server and is never sent to
 * the browser. The previous build shipped a live key in client-side JavaScript,
 * which made it readable by anyone who opened the bundle.
 */

export const runtime = "nodejs";

const CRM_BASE = process.env.RAULJI_CRM_BASE ?? "https://api.raulji.com/api/v1";

const LeadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  // Indian mobile numbers, with or without a +91 or 0 prefix.
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s()-]/g, ""))
    .refine((v) => /^(\+?91|0)?[6-9]\d{9}$/.test(v), "Please enter a valid 10-digit mobile number"),
  email: z
    .union([z.string().trim().email("Please enter a valid email address"), z.literal("")])
    .optional(),
  city: z.string().trim().max(80).optional(),
  registrationType: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  sourcePage: z.string().trim().max(200).optional(),
  // Honeypot. Deliberately permissive: a value is handled below by silently
  // accepting, rather than rejected here, so a bot learns nothing from the error.
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

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (overLimit(requestHits, ip, MAX_REQUESTS)) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions. Please try again in a minute, or call +91 8511187689.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
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
  if (data.company) {
    return NextResponse.json({ success: true });
  }

  // Only genuine submissions count against the tighter limit.
  if (overLimit(submitHits, ip, MAX_SUBMISSIONS)) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions. Please try again in a minute, or call +91 8511187689.",
      },
      { status: 429 },
    );
  }

  const apiKey = process.env.RAULJI_CRM_API_KEY;
  if (!apiKey) {
    console.error("RAULJI_CRM_API_KEY is not configured; lead was not forwarded.");
    return NextResponse.json(
      { success: false, error: "We could not submit the form. Please call +91 8511187689." },
      { status: 500 },
    );
  }

  const notes = [
    data.registrationType ? `Registration type: ${data.registrationType}` : null,
    data.sourcePage ? `Submitted from: ${data.sourcePage}` : null,
    clean(data.message),
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch(`${CRM_BASE}/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
      body: JSON.stringify({
        name: clean(data.name),
        phone: data.phone,
        email: clean(data.email),
        city: clean(data.city),
        source: "WEBSITE_FORM",
        notes: notes || undefined,
        customFields: {
          registrationType: data.registrationType ?? "Not specified",
          sourcePage: data.sourcePage ?? "",
        },
      }),
      signal: AbortSignal.timeout(15_000),
    });

    const result = (await response.json().catch(() => null)) as { success?: boolean } | null;

    if (!response.ok || !result?.success) {
      return NextResponse.json(
        { success: false, error: "We could not submit the form. Please call +91 8511187689." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Network problem while submitting. Please try again or call +91 8511187689.",
      },
      { status: 502 },
    );
  }
}
