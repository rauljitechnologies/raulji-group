# Form inventory and the standard success flow

**Written 2026-10-25**, for the change that gave every public enquiry form one
success flow: confirm → count once → redirect to `/thank-you/`.

The authority is the code. `components/forms/lead-form.tsx`,
`components/forms/contact-wizard.tsx`, `lib/lead-success.ts`,
`lib/thank-you.ts` and `app/thank-you/page.tsx` are the five files that
implement it; if this file disagrees with them, they are right.

---

## 1. Every form on the site

The whole project was swept for `<form>`, `onSubmit`, `action=`, `FormData`,
`"use server"`, `<input>`, `<select>`, `<textarea>`, and for the third-party
form services a site like this often picks up (Formspree, HubSpot, Netlify
Forms, Typeform, Tally, Jotform, Google Forms, Web3Forms) and for `<iframe>`
embeds. **There are no server actions, no native non-JS form posts and no
third-party form service anywhere in the project.** Everything that collects a
lead is one of two React components posting JSON to one route.

### Lead-generating forms — all covered

| # | Form | Pages it appears on | Component | Submission | Success | Error | Redirect | Tracking |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Enquiry form | `/` | `LeadForm` (`components/forms/lead-form.tsx`) | `fetch` POST `/api/lead/` | Panel, then `/thank-you/` | Inline `role="alert"`, stays on page | ✅ `router.push` | `generate_lead`, `form_id: lead_form` |
| 2 | Enquiry form | `/gujarat/` | `LeadForm` | same | same | same | ✅ | same |
| 3 | Enquiry form | `/compare/` | `LeadForm` | same | same | same | ✅ | same |
| 4 | Enquiry form | `/services/business-consulting/` | `LeadForm` | same | same | same | ✅ | same |
| 5 | Enquiry form | `/services/pvt-registration/`, `/llp-registration/`, `/partnership-registration/`, `/proprietorship-registration/` | `LeadForm` via `components/pages/registration-service.tsx` | same | same | same | ✅ | same |
| 6 | Enquiry form | `/services/insurance/`, `/it/`, `/digital/`, `/pvt-compliance/`, `/llp-compliance/` | `LeadForm` via `components/pages/secondary-service.tsx` | same | same | same | ✅ | same |
| 7 | Enquiry form | All 33 city pages, `/{city}/` | `LeadForm` via `app/[city]/page.tsx` | same | same | same | ✅ | same |
| 8 | Enquiry form | All 20 city × service pages, `/{city}/{service}/` | `LeadForm` via `app/[city]/[service]/page.tsx` | same | same | same | ✅ | same |
| 9 | Contact wizard | `/contact/` | `ContactWizard` (`components/forms/contact-wizard.tsx`) | `fetch` POST `/api/lead/` | Panel, then `/thank-you/` | Inline `role="alert"`, returns to step 3 | ✅ `router.push` | `generate_lead`, `form_id: contact_wizard` |

That is **two components, one endpoint, nine distinct call sites, 67 URLs**.
Both components were already posting to the same route with the same payload,
validation, honeypot and rate limit, which is why one flow could be applied
without touching lead delivery.

### Inputs that are not forms — deliberately untouched

Each of these is a search or filter box with no `<form>`, no submit and no
network call. None of them collects a lead, so none of them redirects or fires
a conversion.

| Input | File | What it is |
| --- | --- | --- |
| City search | `components/shared/location-drawer.tsx` | Filters the location drawer |
| City search | `components/shared/gujarat-city-finder.tsx` | Filters the Gujarat city list |
| FAQ search | `components/shared/faq-explorer.tsx` | Filters FAQs |
| Article search | `components/blog/blog-index.tsx` | Filters the blog index |
| Client search | `components/shared/client-directory.tsx` | Filters `/our-clients/` |

Also checked and not forms: the WhatsApp and `tel:` CTAs (`mobile-action-bar`,
`cta-banner`, `header`, `footer`, the blog's health-insurance CTA) are links.
They fire `phone_click` / `whatsapp_click`, which are not conversions anywhere.

---

## 2. What was changed

- **`app/thank-you/page.tsx` — new.** The one confirmation page. Confirmation,
  three next steps, six onward links, phone / WhatsApp / email. `noindex,
  nofollow`, self-canonical, and out of `/sitemap.xml` (the sitemap manifest
  generator drops any page whose source sets `noindex: true`). No query string
  and no name anywhere on the URL. robots.txt is **not** changed: disallowing
  the path would stop a crawler ever reading the noindex.
- **`lib/thank-you.ts` — new.** `THANK_YOU_PATH`, the master-rule-23
  confirmation sentence and the next-steps copy. One source for the page and
  both forms, so a typo cannot produce a dead redirect.
- **`lib/lead-success.ts` — new.** The confirmed-submission sequence, once:
  `form_submit`, then `generate_lead` behind the `markLeadCounted` dedup. Both
  forms call it; it is the only module in the codebase that pushes
  `generate_lead`, and a test asserts that.
- **`components/forms/lead-form.tsx`** and
  **`components/forms/contact-wizard.tsx`** — the duplicated conversion blocks
  were replaced by that one call, followed by `router.push(THANK_YOU_PATH)`.
  The wizard's old success panel (first-name greeting, next steps, WhatsApp
  link with the visitor's name prefilled, "send another enquiry") moved to the
  thank-you page, minus the name: a shared URL must not carry one.
- **`docs/gtm-event-map.md`** — the "there is no thank-you route" paragraph was
  wrong as of this change, and a page-view conversion trigger is now the
  obvious way to double-count, so both are addressed explicitly.

Nothing else moved. Validation, the honeypot, the same-site check, both rate
limits, the CRM client, the email dispatch, consent mode, the sitemap, robots
and every existing event name are exactly as they were.

### Why the conversion is not on the thank-you page

It is recorded in the form, from the branch where `/api/lead/` returned
`success: true`, and only then does the route change. A tag on the thank-you
page view would count a refresh, a back-button return, a bookmark, a shared
link and a direct visit as new leads. The page pushes nothing of its own.

Duplicate protection, in layers: an `inFlightRef` checked synchronously before
`fetch`; the submit button disabled; `markLeadCounted`, keyed on the server's
own `requestId` and held in `sessionStorage`, so a re-render, a Strict Mode
double-invoke or a remount cannot count twice; and the server's own
per-IP limit of five valid submissions a minute.

---

## 3. Test run — 2026-10-25

**Environment.** A local production build (`next start`) with
`RAULJI_CRM_BASE` and `EMAIL_PROVIDER_ENDPOINT` pointed at a mock server on
`127.0.0.1:4010`. **No test submission reached the production CRM at
crm.raulji.com or the real email provider**, and `NEXT_PUBLIC_GTM_ID` was
unset, so nothing reached the client's GTM container or GA4 either. Events
were read straight off `window.dataLayer`. Browser: Chromium via Playwright.
The mock could be switched between `created`, `duplicate` and `fail`.

### Automated tests — `npm test`, 188 passing

`tests/thank-you-redirect.test.ts` is new (18 tests): exactly one
`generate_lead` per confirmed enquiry; none for a repeat submission id; two for
two genuinely different ones; a duplicate converts and is flagged; nothing at
all for a honeypot; no conversion without a server submission id; no personal
field in the push; `lib/lead-success.ts` is the only module that pushes it;
both forms route to the shared constant from the confirmed branch, before the
failure branches; the page is noindex in the exact form the sitemap generator
reads, absent from the manifest, not blocked in robots.txt, self-canonical,
inside the title and description limits `seo-validate` enforces, renders one
`h1` and the rule-23 sentence, and pushes nothing when rendered.

### Browser run — 108 checks, all passing

Per form (nine call sites, one page each for the shared components):

| Check | Result |
| --- | --- |
| Valid submission → one redirect to `/thank-you/` | ✅ 9/9 forms |
| Valid submission → exactly one `generate_lead` | ✅ 9/9 |
| Conversion carries no name, phone, email or message | ✅ 9/9 |
| Thank-you page shows one `h1` with the rule-23 confirmation | ✅ 9/9 |
| Empty / invalid submission → no redirect, no conversion, one `form_validation_error` | ✅ 9/9 |
| CRM failure (mock 500 → route 502) → error shown, no redirect, no conversion | ✅ 9/9 |
| Refreshing `/thank-you/` → no conversion | ✅ 9/9 |

And the edge cases:

| Check | Result |
| --- | --- |
| Honeypot filled → still redirected (the bot learns nothing), no `form_submit`, no `generate_lead`, nothing reached the CRM | ✅ |
| Double-click on submit → one POST, one CRM write, one conversion | ✅ |
| Back after success → returns to the originating page, form empty, no second conversion, no second CRM write | ✅ |
| Duplicate CRM capture → converts once with `lead_duplicate: true` | ✅ |
| Direct visit to `/thank-you/` → no conversion; `noindex, nofollow`; absent from `/sitemap.xml`; not blocked in robots.txt | ✅ |
| Lead delivery intact → 18 submissions, one CRM POST each, payload unchanged, `lead_crm_captured` then `lead_emails` with customer and admin both `sent` | ✅ |
| `/thank-you/` at 320, 375, 390, 414, 768, 1024, 1280 and 1440px → no horizontal overflow; one `h1`, then `h2`, then `h3`; CTAs 52px tall | ✅ |
| First tab stop is the skip link; the confirmation panel is `role="status" aria-live="polite"` | ✅ |

### Not tested, and honestly

- **The production CRM and the real email provider.** Deliberate: the brief
  says not to send fake leads into them. The mock reproduces every response
  the client handles (201 created, 200 duplicate, 500, 401, 429, timeout),
  and `tests/crm-lead-client.test.ts` and `tests/lead-emails.test.ts` cover
  those paths directly. **One live submission on the deployed site, with the
  owner watching the CRM, is still the right final check** — and it is the only
  thing this run cannot stand in for.
- **The GTM container.** There is no GTM API access from this machine, so no
  tag, trigger or variable has been created, imported or published. The
  configuration below is what to build. With `NEXT_PUBLIC_GTM_ID` unset
  locally, what was verified is the dataLayer push, not GA4 receiving it.
- **Real devices.** The responsive checks are Chromium at those widths, not
  physical phones.
- **Screen readers.** Roles, labels, heading order and focus order were
  checked; no NVDA or VoiceOver pass was run.

---

## 4. GTM configuration

**Nothing below has been created.** No GTM API access from here.

The container is `GTM-MSW79R28`, GA4 is `G-SK8N5N3WE2`, and the full event
list with every parameter is in [gtm-event-map.md](gtm-event-map.md). This
section is only what the standard success flow needs.

### The conversion: one trigger, one tag

**Trigger** — Custom Event

| Field | Value |
| --- | --- |
| Trigger type | Custom Event |
| Event name | `generate_lead` |
| Use regex matching | **off** — exact match |
| This trigger fires on | All Custom Events |

No conditions. The site only pushes the event on a CRM-confirmed submission,
so a condition here could only ever remove real leads.

**Tag** — GA4 Event

| Field | Value |
| --- | --- |
| Tag type | Google Analytics: GA4 Event |
| Configuration | the container's GA4 Configuration tag (`G-SK8N5N3WE2`) |
| Event Name | `generate_lead` |
| Trigger | the Custom Event trigger above |
| Tag firing options | **Once per event** (the default; do not change to "unlimited") |

Event parameters, each a Data Layer Variable of the same name:

| Parameter | Variable | Why it is safe |
| --- | --- | --- |
| `form_id` | `{{dlv - form_id}}` | `lead_form` or `contact_wizard`. A bounded machine name. |
| `form_name` | `{{dlv - form_name}}` | "Enquiry form" or "Contact wizard". |
| `registration_type` | `{{dlv - registration_type}}` | A service name from a fixed list, or "Not specified". |
| `city` | `{{dlv - city}}` | A city from the site's own index. Not an address. |
| `submission_id` | `{{dlv - submission_id}}` | Server-generated id. The dedup key. Nothing personal. |
| `lead_duplicate` | `{{dlv - lead_duplicate}}` | Boolean. |
| `lead_source` | `{{dlv - lead_source}}` | `Website form (<path>)`. A page, not a person. |
| `page_type` | `{{dlv - page_type}}` | Which template converted. |
| `page_location`, `page_referrer`, `page_title` | the matching DLVs | `page_location`'s query string is already reduced to the six campaign keys. |

**Never add a parameter for** `name`, `phone`, `email`, `message` or
`businessName`. The site does not push them and nothing in GA4 should ask for
them.

Then in **GA4 → Admin → Events**, mark `generate_lead` as a key event. Mark
`generate_lead` and not `form_submit`: both fire on the same confirmed
submission, but only `generate_lead` is deduplicated on the submission id.

### What must not be built

| Do not create | Why |
| --- | --- |
| A Page View trigger on `/thank-you/` | The form has already pushed `generate_lead` before that page renders. It would double every lead, and count refreshes, bookmarks, shared links and direct visits. |
| A second conversion tag on `form_submit` | Same confirmed submission as `generate_lead`. Counting both doubles the figure. |
| A Click trigger on the "Get Business Guidance" button | Fires on intent. Counts validation failures and CRM failures as leads. |
| A Form Submission trigger | Never fires at all: both forms `preventDefault()` and post with `fetch`. |
| A second GTM container or a second GA4 Configuration tag | Already warned about in gtm-event-map.md — this is where duplicate `page_view` comes from. |
| A GA4 Configuration tag **and** `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Two Google tags for one stream. Pick one. |

### If a `form_success` event is ever required

The site does not push one and does not need to. If some external requirement
makes one necessary, add it as a **second trigger on the same single GA4 Event
tag** (Triggering → add trigger), so one submission still produces one
`generate_lead` hit. Do not create a second GA4 Event tag for it, and do not
map it to a second GA4 event name that also gets marked as a key event.

### Google Ads

Still not configured, and still not guessed at. When it is: **either** import
the GA4 `generate_lead` key event **or** add an Ads conversion tag to the
`generate_lead` trigger — not both. `ad_storage`, `ad_user_data` and
`ad_personalization` are denied by default, so an Ads tag will not fire until
the visitor accepts.

---

## 5. Before deploying

1. Build and validate: `npm run lint && npm run typecheck && npm test &&
   npm run build`. `seo-validate` runs as `postbuild` and passed on 106
   prerendered pages with 103 sitemap URLs — `/thank-you/` is one of the three
   prerendered pages correctly absent from the sitemap.
2. Confirm `/thank-you/` answers 200 and carries
   `<meta name="robots" content="noindex, nofollow">`.
3. Confirm `/sitemap.xml` does not contain `thank-you`.
4. Build the trigger and tag above in `GTM-MSW79R28`, preview the container,
   and submit **one real enquiry** with the owner watching the CRM: expect one
   lead, one `generate_lead` in GA4 DebugView, and one admin email.
5. Refresh `/thank-you/` in that preview session and confirm no second
   conversion.
