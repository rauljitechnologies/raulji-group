# Lead pipeline — CRM capture, customer confirmation, admin notification

**Built 2026-10-22/23.** What happens between a visitor pressing *Get Business
Guidance* and the team reading the enquiry, what is proven, and what is still
waiting on credentials.

Related: [deployment.md](deployment.md) for the environment ·
[production-checklist.md](production-checklist.md) for the launch gate ·
[analytics-events.md](analytics-events.md) for the dataLayer events.

## The pipeline

```
browser  ──POST /api/lead/──▶  route.ts
                                 │ 1 rate limit        (by IP, two tiers)
                                 │ 2 size limit        (16 KB, before parse)
                                 │ 3 same-site check   (Sec-Fetch-Site / Origin)
                                 │ 4 validate          (zod, friendly sentences)
                                 │ 5 honeypot          (answered as success)
                                 │
                                 ├─6─▶ lib/crm/lead-client.ts
                                 │        POST {base}/public/leads
                                 │        X-API-Key: <server-only>
                                 │        └── the ONLY thing that decides success
                                 │
                                 ├──── response to the visitor ────▶
                                 │
                                 └─7─▶ after(): lib/email/lead-emails.ts
                                          ├── customer confirmation (if address given)
                                          └── admin notification   (both recipients)
```

**The one rule that matters.** `success: true` is returned if and only if the
CRM confirmed it stored the enquiry. Email delivery sits *downstream of the
response*, in `after()`, so no email failure can turn a captured lead into a
visible failure, and no email success can make an uncaptured one look fine.

## Files

| File | Role |
| --- | --- |
| `lib/crm/lead-client.ts` | The only module that talks to the CRM. Typed payload, and a `CrmResult` union that distinguishes every failure mode. |
| `lib/email/provider.ts` | Transport. Resend's REST API over `fetch` — no new dependency. Swapping provider is this one file. |
| `lib/email/lead-emails.ts` | Both templates and the dispatcher. All interpolation goes through `esc()`. |
| `lib/attribution.ts` | Client-side capture of UTM/gclid from the landing URL and GA ids from GA's own cookies. |
| `components/layout/attribution-capture.tsx` | Mounts that capture in the root layout, so an ad landing is recorded before the visitor reaches a form. |
| `app/api/lead/route.ts` | Orchestration, validation, abuse controls, logging. |

## Why an HTTP 200 is not a captured lead

The CRM answers `201 + success:true` for a new lead and `200 + success:true +
duplicate:true` when the enquiry is recorded against an existing one. It can
also answer `200` with `success:false`, and a proxy or gateway in front of it
can answer `200` with HTML. So the status line alone is not the answer:

| CRM response | `CrmResult` | Visitor sees |
| --- | --- | --- |
| 201, `success:true` | `created` | Success |
| 200, `success:true`, `duplicate:true` | `duplicate` | Success — "your enquiry has been received", never "a second lead was created" |
| 200, `success:false` | `unavailable` | Retryable failure |
| 200, unparseable body | `unavailable` | Retryable failure |
| 400 / 422 | `rejected` | Generic failure + phone number |
| 401 / 403 | `unauthorised` | Generic failure + phone number. **Never mentions a key.** |
| 429 | `rate_limited` | "try again in a minute" |
| 5xx, or connection refused | `unavailable` | Retryable failure |
| **timeout or abort** | **`unconfirmed`** | **"We could not confirm your enquiry was received. Please call … rather than submitting again, so we do not create a duplicate."** |
| no API key on the deployment | `misconfigured` | Generic failure + phone number; redacted config error in the log |

### The `unconfirmed` case, and why it does not say "try again"

A timeout happens *after* the request left the process, so the CRM may well
have stored the lead. Reporting success would be a lie; inviting a resubmit
would push the visitor into creating a duplicate for an enquiry that probably
already exists. So it says neither, and asks them to call. That is the brief's
rule against blindly retrying a non-idempotent submission, expressed in the
copy rather than in a retry loop — there is no automatic retry anywhere in this
pipeline, deliberately.

## Field mapping

Both forms (`LeadForm` on the homepage, service, city, Gujarat and compare
pages; `ContactWizard` on `/contact/`) post the same payload to the same route,
so there is one integration to test. Observed on the wire against a mock CRM:

| CRM field | Source |
| --- | --- |
| `name`, `phone`, `email`, `city` | Form fields, validated and normalised |
| `service` | "What do you need help with?" |
| `source` | Literal `WEBSITE_FORM` |
| `message` | The customer's own words, unprefixed |
| `notes` | Summary: business name, service, originating page, then the message |
| `lead_source` | `Website form (/path/)` |
| `page_url`, `page_name` | Absolute URL and path of the originating page |
| `utm_*`, `gclid`, `ga_client_id`, `ga_session_id`, `ga_session_number` | **Only when genuinely present.** See below. |
| `customFields` | `registrationType`, `businessName`, `sourcePage` |
| `state`, `country` | **Never sent.** Neither form asks. A guessed state is worse in a CRM than an empty one. |

### Attribution is captured, never invented

`lib/attribution.ts` reads campaign parameters from the landing URL and caches
them in `sessionStorage` for the tab, because a visitor who arrives on an ad URL
usually fills the form two pages later, by which point the query string is gone.
GA identifiers are parsed strictly out of GA's own `_ga` and `_ga_<container>`
cookies, and **a cookie that does not match the expected shape is dropped rather
than guessed at** — a malformed analytics id in a CRM is worse than an absent
one, because it looks like data and joins to nothing. Every field is omitted
when unavailable; none is defaulted to `""` or `"unknown"`.

## The two emails

Both are sent only after confirmed capture, both are HTML with a real
plain-text alternative, and every dynamic value is HTML-escaped.

**Customer confirmation** — subject `We’ve received your enquiry | Raulji
Group`. Thanks them, confirms receipt, names the service they chose (or says
plainly that they did not choose one), says the team will review and follow up,
carries the verified phone, email and hours from `SITE`, and repeats the
authority disclaimer. **It promises no response time**, because the business has
not approved one; a test asserts that no "within N hours/days" wording can creep
in. Skipped — not failed — when no address was given, since the email field is
optional on both forms.

**Admin notification** — subject `New Website Enquiry — [Service] — Raulji
Group`, to both configured recipients. Carries name, phone, email, city,
business, service, the message, the originating page, the campaign fields,
the CRM lead id, and whether the lead was **created or updated**, plus the
request id for log correlation. A duplicate is called out in a banner so nobody
treats a repeat enquiry as a new contact.

### Escaping is not decorative here

The admin notification carries attacker-controlled text to a trusted reader, so
it is the more sensitive of the two. Every interpolation goes through `esc()`,
and the tests submit `<img src=x onerror=...>` and `"><script>` as the name and
business name and assert the output contains no live element or handler.

### The From address cannot be influenced by a visitor

`from` comes from `EMAIL_FROM_ADDRESS` only. The customer's own address is used
as `Reply-To` on the admin notification, so replying reaches them directly —
there is no path by which form input reaches the `From` header, and no
arbitrary-recipient injection: admin recipients come from the environment and
are filtered to things that parse as addresses.

## Secrets

`RAULJI_CRM_API_KEY` and `EMAIL_PROVIDER_API_KEY` are read inside the functions
that use them, in server-only modules, never at module scope and never with a
`NEXT_PUBLIC_` prefix. Proven two ways:

- **Tests** assert no `NEXT_PUBLIC_` variant exists, that these are read only in
  files that are not `"use client"`, that no client component imports the
  server-only modules, and that no client file references the CRM host or sends
  an `X-API-Key` header.
- **A build with sentinel values** (`SENTINEL_CRM_KEY_…`, `SENTINEL_EMAIL_KEY_…`)
  produced zero matches in `.next/static` — and zero in `.next/server` too,
  because the keys are read at runtime rather than inlined. The same grep finds
  known client strings (`Get Business Guidance`, `/api/lead/`) twice each, so
  the check is not vacuous.

Logs carry the request id, the CRM status, the lead id and `hasEmail`, and
**never** the name, phone, email, message or any key. Provider error bodies can
echo the payload, so only the HTTP status is kept from them.

## Abuse controls

| Control | Detail |
| --- | --- |
| Rate limit | 20 requests and 5 valid submissions per IP per minute, in-memory. Per-instance, so it throttles the common case rather than guaranteeing a global limit — put a WAF rule in front if abuse becomes real. |
| Size limit | 16 KB, checked on `Content-Length` and again on the body, before parsing. |
| Same-site | `Sec-Fetch-Site` when present, `Origin` as fallback. A request with neither header is allowed: that is a non-browser client, and CSRF needs a browser. |
| Honeypot | `hp_note`, plus the legacy `company`. Answered `{success:true}` so the bot learns nothing; nothing reaches the CRM and no email is sent. |
| Double submit | Button `disabled` while submitting **and** a synchronous `inFlightRef`, because `disabled` depends on a re-render landing before the second click. The CRM's own duplicate handling is untouched — a visitor who genuinely enquires twice should still be recorded. |

## Environment variables

Names only. Values belong in Vercel and `.env.local`, never in the repository.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RAULJI_CRM_API_KEY` | **yes** | CRM authentication. Server-only. **Rotate before launch** — a previous build shipped a key client-side. |
| `RAULJI_CRM_BASE` | no | Defaults to `https://crm.raulji.com/api/v1`. |
| `EMAIL_PROVIDER_API_KEY` | for email | Resend API key. Server-only. |
| `EMAIL_FROM_ADDRESS` | for email | Verified sender. `admin@raulji.com`. |
| `RAULJI_ADMIN_EMAILS` | for email | Comma-separated recipients. |
| `EMAIL_PROVIDER_ENDPOINT` | no | Defaults to Resend. Exists for provider migration and for verifying against a local mock. Leave unset in production. |

**Without the email variables the pipeline still works**: leads are captured and
the forms report success. The emails log as `misconfigured` and nothing is sent.
That is the intended degradation, not a silent failure — but it is silent *to
the visitor*, so the checklist has a box for it.

## What is proven, and what is not

**Verified** against a mock CRM and a mock email provider, in a real production
build (`npm run build && npm start`):

- 201 → `created`; a second submission with the same phone → 200 `duplicate:true`,
  still `success: true`, with the admin email saying "EXISTING CRM lead".
- The CRM received `POST /api/v1/public/leads` with `X-API-Key` present and
  every mapped field, including `utm_source` and `gclid` when supplied and
  absent when not.
- Both emails were accepted by the provider mock: the admin notification to
  `admin@raulji.com` and `toyuvrajraulji@gmail.com` with `reply_to` set to the
  customer, the confirmation to the customer with no `reply_to`, both from
  `admin@raulji.com`, both with HTML and text parts.
- An email provider returning 401 left the lead captured and the response a
  success, with the failure logged.
- 403 on a cross-site POST, 413 on an oversized body, 200 on a honeypot,
  friendly sentences on five invalid payloads, 429 after the burst limit.

**Not verified, and why:**

| Item | Status | Needs |
| --- | --- | --- |
| A real lead in the real CRM | **BLOCKED** | `RAULJI_CRM_API_KEY`. No live key exists here, so no request has ever been made to `crm.raulji.com`. |
| Real email delivery to an inbox | **BLOCKED** | `EMAIL_PROVIDER_API_KEY` and **domain verification** — SPF and DKIM for `raulji.com` published and the domain showing verified with the provider. Until then the provider rejects `admin@raulji.com` as a sender. |
| The CRM's actual lead-id field name | **NOT VERIFIED** | One real 201 body. `extractLeadId` reads several plausible shapes and returns `null` rather than inventing one; a null id makes the admin email say "Not returned by the CRM". Check this on the first real lead. |
| Mobile form usability, focus order | **PARTIALLY VERIFIED** | A device. Labels, `aria-invalid`, `aria-describedby` and `role="alert"` are present in the markup and unchanged by this work, but nothing was rendered on a phone. |
| Preview and production deployment | **BLOCKED** | `vercel whoami` → logged out. Nothing deployed. |

## Tests

`npm test` — 79 tests, 5 files, no network and no real provider.

| File | Covers |
| --- | --- |
| `tests/crm-lead-client.test.ts` | 201, 200-duplicate, 200-without-success, unparseable 200, 400, 401, 429, 5xx, timeout → `unconfirmed`, connection error → `unavailable`, missing key, lead-id extraction, key sent only as a header |
| `tests/lead-route.test.ts` | The pipeline end to end with mocked fetch: field mapping, emails after the response, UTM present/absent, every CRM failure producing no false success and no email, the timeout copy, validation sentences, oversized body, honeypot, rate limit, cross-site, log redaction |
| `tests/lead-emails.test.ts` | Escaping of hostile input, both templates, no response-time promise, duplicate wording, null lead id, no-campaign wording, recipient parsing, provider failure and timeout, PII kept out of failure details |
| `tests/attribution.test.ts` | Only-present-parameters, clean URL, no erasure on later pages, truncation, storage unavailable, GA cookie parsing, malformed cookies dropped |
| `tests/secret-exposure.test.ts` | No `NEXT_PUBLIC_` secret, server-only reads, no client import of server modules, no CRM host or API-key header in client code, `.env.example` holds placeholders |

Vitest was added for this work; the repository had no test runner. `environment:
"node"` — everything here is server code, so a DOM would add a dependency and
buy nothing.
