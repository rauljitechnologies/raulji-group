# GTM event map

Every dataLayer event the site pushes, what it means, what it carries, and the
GTM tag and trigger to build for it.

**Generated against `lib/analytics.ts` on 2026-10-23.** The `EventName` union in
that file is the only authority; if the two disagree, the code is right and this
file is stale.

- **GTM container:** `GTM-MSW79R28`
- **GA4 measurement ID:** `G-SK8N5N3WE2` (raulji.com web data stream)
- **Primary conversion:** `generate_lead`

## Read this first: the brief's names are not these names

The analytics brief of 2026-10-23 proposed renaming the existing taxonomy —
`click_phone` for `phone_click`, `click_contact_cta` for `primary_cta_click`,
`generate_lead` replacing `form_submit`. **The client was shown that
`GTM-MSW79R28` is already wired to the current names, that every existing
trigger would stop matching the moment a rename deployed, and that master rule
29 fixes them — and chose to keep them.** There is precedent: the 15 Oct 2026
audit asked for `call_click` and the same decision was taken then.

So nothing was renamed, and the brief's genuinely new events were added
alongside. This table maps the brief's vocabulary onto what the code actually
pushes, so a container can be built from the brief without guesswork:

| Brief name | Actual event | Note |
| --- | --- | --- |
| `click_phone` | `phone_click` | Unchanged. Already in the container. |
| `click_email` | `email_click` | Unchanged. |
| `click_whatsapp` | `whatsapp_click` | Unchanged. Also fires `click_external_link`. |
| `click_contact_cta` | `primary_cta_click` | Unchanged. |
| `form_validation_error` | `form_validation_error` | New, as named. |
| `form_submit_attempt` | `form_submit_attempt` | New, as named. |
| `form_submission_error` | `form_submission_error` | New. `form_error` also still fires. |
| `generate_lead` | `generate_lead` | New. **Does not replace `form_submit`** — both fire on the same confirmed submission. Mark `generate_lead` as the GA4 conversion, not `form_submit`, because only `generate_lead` is deduplicated on the server's submission id. |
| `page_view` | *not pushed by the site* | GA4 emits it. See the duplication note below. |

## Parameters on every event

`track()` adds these to every push, so no tag needs to collect them per-event:

| Field | Meaning |
| --- | --- |
| `event` | The event name. |
| `page` | Pathname. The field the existing container reads. |
| `page_type` | Template, derived from the path: `home`, `city`, `city_service`, `registration_service`, `service`, `service_hub`, `gujarat`, `blog_post`, `blog_index`, `compare`, `contact`, `faqs`, `about`, `legal`, `other`. Derived rather than passed, so a new call site cannot forget it or spell it differently. |
| `page_location` | Absolute URL, **query string reduced to the allow-list below**. |
| `page_title`, `page_referrer` | From `document`. |
| `city` | Display name when known, else derived from the path. |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid` | **Only when present on the current URL.** Never defaulted, never remembered, never invented. A page with no campaign on it carries no campaign fields at all. |
| `source`, `campaign` | Legacy aliases the existing container reads. |

### The query allow-list is a safety control, not a convenience

`lib/analytics.ts` copies **only** those six keys from the URL, and
`page_location` is rebuilt from them rather than taken from `location.href`.
Forwarding the whole query string would send whatever happens to be on the URL
into analytics — an address in a `?email=` parameter, a token, a referral code
with someone's name in it. A test asserts that a URL carrying
`?email=…&token=secret` produces a payload containing neither, including inside
`page_location`.

## Events

### Engagement

| Event | Fires when | Extra fields |
| --- | --- | --- |
| `view_service` | A service or service-hub page is viewed, on arrival and on client-side navigation | `service_name` |
| `view_location_page` | A city or city × service page is viewed | `city_name`, `service_name` on a city × service page |
| `view_blog_article` | A blog article is viewed | `label` (article slug) |
| `service_card_click` | A service card is followed | `registration_type`, `label` |
| `city_page_click` | A city link is followed | `city`, `label` |
| `gujarat_page_click` | The Gujarat hub is linked to | `label` |
| `technology_click` | Raulji Technologies is linked to | `label` |
| `location_drawer_open` | The location drawer is opened | — |
| `click_external_link` | Any outbound link is followed | `link_domain` (**host only** — never the href, which on a `wa.me` link carries the prefilled message in its query string) |
| `finder_complete` | The structure finder shows a result. **The tool has not shipped**; the name is declared so the container can be built once | — |

### Contact

| Event | Fires when | Extra fields |
| --- | --- | --- |
| `phone_click` | A `tel:` link is followed | `label` |
| `email_click` | A `mailto:` link is followed | `label` |
| `whatsapp_click` | A WhatsApp link is followed | `label` |
| `primary_cta_click` | A primary CTA is followed | `label` |

### Form funnel

Both enquiry forms carry `form_id` and `form_name`: `lead_form` / "Enquiry
form" (homepage, service, city, Gujarat, compare) and `contact_wizard` /
"Contact wizard" (`/contact/`). Both record the conversion and then redirect
to `/thank-you/`; the full list of call sites is in
[form-inventory.md](form-inventory.md).

| Event | Fires when | Extra fields |
| --- | --- | --- |
| `form_view` | The form scrolls into view, once | `registration_type`, `city` |
| `form_start` | First interaction with any field | `registration_type`, `city` |
| `select_service` | A service is chosen | `service_name`, `registration_type`, `form_step` (wizard) |
| `form_step_complete` | A wizard step is passed | `form_step` |
| `form_validation_error` | Client-side validation rejects a step | `error_field` — **field names only, never values.** A validation event is exactly where a half-typed email would otherwise leak into analytics |
| `form_submit_attempt` | Submit pressed, request going out. **Not a conversion** | `registration_type` |
| `form_submit` | CRM-confirmed. Existing event, kept | `registration_type`, `city` |
| **`generate_lead`** | **CRM-confirmed. The conversion** | `submission_id`, `lead_duplicate`, `lead_source`, `registration_type`, `city` |
| `form_error` | Submission failed. Existing event, kept | `registration_type` |
| `form_submission_error` | Submission failed | `error_category` — one of `network`, `validation`, `rate_limited`, `too_large`, `rejected_origin`, `server`, `unknown`. **Never the server's message**, which is written for the visitor and can quote the payload back |

### Consent

| Event | Fires when | Extra fields |
| --- | --- | --- |
| `consent_update` | The visitor answers the banner | `consent_choice`: `granted`, `analytics_only` or `denied` |

## `generate_lead` — the rules

**It fires if and only if `/api/lead/` returned `success: true`,** which that
route returns if and only if the CRM confirmed it stored the enquiry — HTTP 201
with `success: true`, or HTTP 200 with `success: true` and `duplicate: true`.
See [lead-pipeline.md](lead-pipeline.md).

It therefore cannot fire on: a CTA click · a form start · a validation failure ·
a submit attempt · any CRM failure · a 200 that carried `success: false` · a
page load of any kind.

**Including a load of /thank-you/.** Since 2026-10-25 every form redirects
there on a confirmed submission, and that page is the obvious place to put a
conversion tag — so, explicitly: do not. The event is pushed by the form,
from the branch where the API confirmed capture, *before* the route changes
(`lib/lead-success.ts`, the only module allowed to push it). A tag on the
thank-you page view would instead count a refresh, a back-button return, a
bookmark, a shared link and a direct visit as new leads. The page pushes
nothing of its own; `docs/form-inventory.md` records the browser run that
proves it.

**Deduplication.** The route returns a server-generated `requestId`;
`markLeadCounted()` records the ids already counted in `sessionStorage` and
returns false for a repeat, so a re-render, a React Strict Mode double-invoke or
a remount within the tab cannot count one enquiry twice. The id carries nothing
personal. When storage is blocked it falls back to an in-memory set, which still
covers the re-render cases — the ones that actually happen.

**Duplicates still convert.** A repeat enquiry recorded against an existing CRM
lead is a real enquiry, so it fires `generate_lead` with
`lead_duplicate: true`. Segment on that field rather than suppressing it.

**A honeypot submission never converts.** The API answers a honeypot
`{success:true}` so the bot learns nothing; both forms skip `form_submit` and
`generate_lead` on that path.

## Tags, triggers and variables to build

None of this has been created — there is no GTM API access from here. Nothing
below has been imported or published.

### Variables — Data Layer Variable, one per field

`page`, `page_type`, `page_location`, `page_title`, `page_referrer`, `city`,
`city_name`, `service`, `service_name`, `registration_type`, `label`,
`form_id`, `form_name`, `form_step`, `error_field`, `error_category`,
`submission_id`, `lead_duplicate`, `lead_source`, `link_domain`, `source`,
`campaign`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`,
`utm_content`, `gclid`, `consent_choice`.

### Triggers — Custom Event, one per event name

One per row in the tables above. Use exact-match on the event name; do **not**
use a regex that could match two of them.

### Tags

| Tag | Type | Trigger | Notes |
| --- | --- | --- | --- |
| GA4 Configuration | GA4 Configuration | Initialization — All Pages | Measurement ID `G-SK8N5N3WE2`. **Only if `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is left unset** — see the duplication warning below. |
| GA4 Event — one per event | GA4 Event | The matching Custom Event trigger | Event name = the dataLayer event name. Map the parameters from the tables. |
| `generate_lead` | GA4 Event | Custom Event `generate_lead` | Mark **this** as the conversion in GA4 → Admin → Events. |

**Do not use generic Click or Form Submission triggers.** Both forms submit via
`fetch` and call `preventDefault()`, so no browser form-submit event is ever
emitted, and a generic click trigger would fire on intent rather than on
confirmed capture — which would count unconfirmed enquiries as conversions.
Every trigger above is a Custom Event on the site's own push.

**And do not add a Page View trigger on `/thank-you/`.** It is the one extra
trigger this container will be tempted into now that the redirect exists, and
it would double every lead: the form has already pushed `generate_lead` by the
time that page renders. It would also count refreshes and direct visits. If a
thank-you-page conversion is ever wanted *instead* of the dataLayer event, the
`generate_lead` tag has to be removed in the same change — never both.

## The duplicate `page_view` problem

Three things could each emit a `page_view`, and any two of them together
double-count every visit with no warning anywhere in GA4:

1. **The site does not push `page_view` at all.** Deliberate, and unchanged.
   `PageViewEvents` fires only the `view_*` events.
2. **GA4's own enhanced measurement** emits `page_view` on load and on each
   History Change. The App Router navigates with `pushState`, so this is what
   covers client-side route changes — no code and no extra tag.
3. **A GA4 Configuration tag in GTM** *and* `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   set would both load a Google tag for `G-SK8N5N3WE2`.

So: **configure GA4 in exactly one place.** Either a GA4 Configuration tag in
GTM (recommended — the container is already consent-gated, and every event
above needs GTM tags regardless), or `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, which
loads gtag.js directly and gives page views only. Never both.

## Google Ads

Not configured, and deliberately not guessed at. No conversion ID and no
conversion label exist in this repository, and none was supplied. When Ads is
connected, the choice is to **either** import the GA4 `generate_lead`
conversion **or** add an Ads conversion tag on the `generate_lead` trigger —
not both, or one lead counts twice. `ad_storage`, `ad_user_data` and
`ad_personalization` are denied by default, so an Ads tag will not fire until
the visitor accepts.
