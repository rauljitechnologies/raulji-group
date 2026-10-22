# Analytics testing — plan and actual results

**Run 2026-10-23** against a local production build (`npm run build && npm
start`) with `NEXT_PUBLIC_GTM_ID=GTM-MSW79R28` and
`NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-SK8N5N3WE2`, plus 106 automated tests.

**No event has reached GA4.** There is no GTM or GA4 account access from this
environment, so nothing below was observed in DebugView or in a GA4 report, and
nothing claims otherwise. Every result is either an automated test, an assertion
against rendered HTML, or a dataLayer push observed in a real runtime.

Each of the brief's 15 test cases is listed with what was actually done.

## Automated suite

```
npm test
  tests/analytics.test.ts         11 passed
  tests/consent.test.ts           16 passed
  tests/attribution.test.ts        8 passed
  tests/crm-lead-client.test.ts   14 passed
  tests/lead-route.test.ts        29 passed
  tests/lead-emails.test.ts       21 passed
  tests/secret-exposure.test.ts    7 passed
  ---------------------------------------------
  7 files, 106 tests, 0 failed
```

## The brief's 15 cases

| # | Case | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Homepage page view | **PARTIALLY VERIFIED** | The site pushes no `page_view` by design; GA4 emits it. Verified that the container and gtag load with the right IDs and that the consent defaults precede both. Not observed in GA4. |
| 2 | Client-side route changes | **PARTIALLY VERIFIED** | `PageViewEvents` re-runs on `usePathname` change and is deduped per path; unit-tested via `pageTypeFor` across 10 routes. `page_view` on navigation is GA4 enhanced measurement's job and is unverified without GA4 access. |
| 3 | Service page view | **VERIFIED (dataLayer)** | `pageTypeFor("/services/llp-registration/")` → `registration_service` → `view_service` with `service_name`. |
| 4 | Location page view | **VERIFIED (dataLayer)** | `/surat/` → `city` → `view_location_page` with `city_name`; `/surat/llp-registration/` → `city_service`, adds `service_name`. |
| 5 | Contact CTA | **VERIFIED (code path)** | `primary_cta_click` via `TrackedLink`, unchanged and already in the container. |
| 6 | Phone, email, WhatsApp clicks | **VERIFIED (code path)** | `phone_click`, `email_click`, `whatsapp_click` unchanged. WhatsApp additionally fires `click_external_link` with `link_domain` — host only, so the prefilled message in the `wa.me` query string is not forwarded. |
| 7 | Form start | **VERIFIED (code path)** | `form_start` on first field interaction, once per form, guarded by a ref. |
| 8 | Form validation error | **VERIFIED** | `form_validation_error` carries `error_field` only. A test asserts no field *value* is in the payload. |
| 9 | CRM-confirmed successful lead | **VERIFIED (dataLayer, mock CRM)** | Against a mock CRM returning 201 + `success:true`: route returned `{success:true,duplicate:false,requestId}`, and `generate_lead` fires on exactly that branch. |
| 10 | Duplicate enquiry response | **VERIFIED (dataLayer, mock CRM)** | Second submission, same phone → CRM 200 + `duplicate:true` → `{success:true,duplicate:true}`. Still converts, with `lead_duplicate: true`. |
| 11 | CRM failure | **VERIFIED** | Five CRM failure shapes (200-with-`success:false`, 400, 401, 429, 500) plus timeout and connection error: all return `success:false`, so `generate_lead` cannot fire. Asserted in `tests/lead-route.test.ts`. |
| 12 | Blocked GTM or analytics script | **VERIFIED** | `track()` creates `dataLayer` if absent, returns early with no `window`, never throws. Consent helpers swallow every storage error. A test runs `track()` with no globals at all. |
| 13 | Consent behaviour | **PARTIALLY VERIFIED** | 16 tests on the state machine and the bootstrap script; the denied-by-default signals and script ordering verified in rendered HTML. **Not clicked in a browser**, and not observed gating a real GA4 tag. |
| 14 | Event deduplication | **VERIFIED** | `markLeadCounted` returns true once per submission id, false after, survives a module reset via `sessionStorage`, still dedups in-memory when storage is blocked, and refuses an empty id rather than counting an unidentified conversion. |
| 15 | Mobile navigation and form interaction | **NOT VERIFIED** | Needs a device. The forms' markup (labels, `aria-invalid`, `aria-describedby`, `role="alert"`) is unchanged by this work; the consent banner is new and has not been rendered at any width. |

## Rendered-HTML assertions

Against `curl localhost:3000/` on a build with both IDs set:

| Check | Result |
| --- | --- |
| Consent `default` present with all four signals denied | **PASS** |
| `wait_for_update` present | **PASS** |
| Consent defaults before the `gtm.js` loader | **PASS** (6657 vs 126403) |
| No executing `<script src=".../gtag/js">` ahead of the defaults | **PASS** — zero such tags in server HTML; `afterInteractive` injects after hydration |
| Exactly one `gtm.js` loader | **PASS** |
| Exactly one `gtag('config')` | **PASS** |
| `GTM-MSW79R28` present | **PASS** |
| `G-SK8N5N3WE2` present | **PASS** |
| No CRM key, no `crm.raulji.com` | **PASS** |
| No email provider key, no `api.resend.com` | **PASS** |
| Consent banner in server HTML | **Absent, by design** — `useEffect`-gated so it does not flash to visitors who already decided |

Two earlier checks reported FAIL and were **my assertions being wrong, not
defects**: `gtag/js?id=` appears twice in the HTML, once as a
`<link rel="preload">` (a fetch hint that does not execute) and once inside
Next's RSC flight payload. Neither is an executing script.

## Live runtime, against mocks

A mock CRM on :3999 and a mock email provider on :3998, with the real
production build:

```
POST /api/lead/  (first)   -> 200 {"success":true,"duplicate":false,"requestId":"lead_…"}
POST /api/lead/  (repeat)  -> 200 {"success":true,"duplicate":true,"requestId":"lead_…"}
log: lead_crm_captured  crmStatus=created    leadId=lead_new_1       duplicate=false
log: lead_crm_captured  crmStatus=duplicate  leadId=lead_existing_1  duplicate=true
log: lead_emails        customer=sent        admin=sent
```

The `requestId` in those responses is what `generate_lead` deduplicates on.

## What the owner must confirm in the browser

Nothing below can be done from here. In GTM Preview, then GA4 DebugView:

1. **One `page_view` per page, not two.** The single most likely misconfiguration.
   Load the homepage and count. Two means GA4 is configured in both GTM and
   `NEXT_PUBLIC_GA4_MEASUREMENT_ID`.
2. **Before accepting consent**, `analytics_storage` reads `denied` in the GTM
   Preview consent tab, and GA4 tags either do not fire or send cookieless
   pings.
3. **After Accept all**, a `consent_update` event appears with
   `consent_choice: granted`, and tags begin firing.
4. **After Analytics only**, `analytics_storage` is `granted` while all three
   ad signals stay `denied`.
5. **`generate_lead` appears exactly once** per confirmed submission, with
   `submission_id` populated. Submit twice with the same phone and confirm the
   second fires with `lead_duplicate: true` — and that neither submission
   produced two events.
6. **No PII in any payload.** Expand each event in DebugView and confirm no
   name, phone, email or message text.
7. **A failed submission fires `form_submission_error`** with an
   `error_category`, and **no** `generate_lead`. Easiest reproduction: unset
   `RAULJI_CRM_API_KEY` in a preview deployment.
8. **Mobile.** The banner at 320, 375 and 414 px: three buttons reachable, not
   covering the mobile action bar or the form submit button, dismissible by
   keyboard.

## Note on DebugView versus reports

DebugView shows events arriving within seconds. Standard GA4 reports lag up to
24–48 hours and apply their own processing, so **an event seen in DebugView is
not yet an event you can report on.** Do not treat the two as interchangeable,
and do not mark a conversion as working on DebugView evidence alone — confirm it
in the Conversions report the following day.
