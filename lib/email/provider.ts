/**
 * Transactional email transport.
 *
 * The repository had no email provider and no SMTP integration before this, so
 * one had to be chosen. This talks to **Resend**'s REST API over `fetch`:
 *
 *   POST https://api.resend.com/emails     header: Authorization: Bearer <key>
 *
 * Why an HTTP API and not SMTP: no dependency. Nodemailer would be a new
 * runtime dependency and a TCP connection out of a serverless function, which
 * is the awkward case for both cold starts and Vercel's network egress. This
 * adds no package at all.
 *
 * Swapping provider is this one file. `sendEmail` is the only surface the rest
 * of the codebase uses, and nothing above it knows which provider is behind it
 * -- the message shape (from/to/subject/html/text) is common to every
 * transactional provider. To move to Postmark or SES, rewrite `deliver` below
 * and leave everything else alone.
 *
 * Server-only. `EMAIL_PROVIDER_API_KEY` is read inside the function, never at
 * module scope, and must never be given a NEXT_PUBLIC_ prefix.
 */

export interface EmailMessage {
  to: string[];
  subject: string;
  html: string;
  /** Always set. A transactional email without a text part looks like spam. */
  text: string;
  replyTo?: string;
}

export type EmailResult =
  | { status: "sent"; id: string | null }
  /** No API key, or no verified From address, on this deployment. */
  | { status: "misconfigured"; detail: string }
  /** Provider rejected or was unreachable. Never retried in-request. */
  | { status: "failed"; detail: string };

const DEFAULT_ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = 10_000;

/**
 * Where messages are posted. Defaults to Resend and almost never needs setting.
 *
 * It is overridable for two real reasons: moving to a provider with a
 * compatible JSON shape needs no code change, and the integration can be
 * verified end to end against a local mock before live credentials and domain
 * verification exist -- which is the state this was built in. It is not a
 * secret, so it carries no NEXT_PUBLIC_ risk, but it is still read server-side
 * only because nothing in the browser sends email.
 */
function endpoint(): string {
  return process.env.EMAIL_PROVIDER_ENDPOINT?.trim() || DEFAULT_ENDPOINT;
}

/**
 * The verified sender. A visitor can never influence this: it comes from the
 * environment only, and `replyTo` is where the customer's own address goes, so
 * replying to an admin notification reaches the customer without ever letting
 * the form choose the From header.
 */
export function fromAddress(): string | null {
  const value = process.env.EMAIL_FROM_ADDRESS?.trim();
  return value || null;
}

/**
 * Admin notification recipients, parsed from a comma-separated list.
 *
 * Filtered to things that look like addresses, so a stray comma or a trailing
 * separator in the environment variable cannot turn into an empty recipient and
 * a provider-side 400 that looks like an outage.
 */
export function adminRecipients(): string[] {
  return (process.env.RAULJI_ADMIN_EMAILS ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter((address) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address));
}

async function deliver(message: EmailMessage, from: string, apiKey: string): Promise<EmailResult> {
  try {
    const response = await fetch(endpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) {
      /*
       * Provider error bodies can echo the payload, which here contains the
       * customer's name, address and message. Only the status is kept: enough
       * to tell a bad key (401) from a bounce (422) from an outage (5xx),
       * without copying personal data into the logs.
       */
      return { status: "failed", detail: `provider responded ${response.status}` };
    }

    const body = (await response.json().catch(() => null)) as { id?: unknown } | null;
    return { status: "sent", id: typeof body?.id === "string" ? body.id : null };
  } catch (error) {
    const name = error instanceof Error ? error.name : "error";
    return { status: "failed", detail: name === "TimeoutError" ? "provider timeout" : "provider unreachable" };
  }
}

/**
 * Send one message. Never throws, and never reports success it cannot see:
 * the only `sent` path is a 2xx from the provider.
 *
 * Note what this does and does not prove. A `sent` result means the provider
 * accepted the message for delivery -- not that it reached an inbox. Nothing in
 * this codebase may describe it as delivered.
 */
export async function sendEmail(message: EmailMessage): Promise<EmailResult> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const from = fromAddress();
  if (!apiKey) return { status: "misconfigured", detail: "EMAIL_PROVIDER_API_KEY is not set" };
  if (!from) return { status: "misconfigured", detail: "EMAIL_FROM_ADDRESS is not set" };
  if (!message.to.length) return { status: "misconfigured", detail: "no recipients configured" };
  return deliver(message, from, apiKey);
}
