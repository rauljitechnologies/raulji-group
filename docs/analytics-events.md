# Analytics events

The authoritative list of the events this site pushes onto `window.dataLayer`.
Checked against the `EventName` union in `lib/analytics.ts` on 2026-10-17.

> **Why this file exists.** `DEPLOYMENT.md` used to list three event names the
> site has never pushed — `lead_form_submit`, `lead_form_error` and
> `start_business_click`. A GTM container configured from that list would have
> shown **zero conversions** on the primary conversion trigger while every
> other report looked healthy, because a Custom Event trigger on a name
> nothing fires simply never matches. If the container was built before
> 17 Oct 2026, check its triggers against the table below.

## How the layer works

`lib/analytics.ts` exports one function, `track(event, params)`. It pushes a
single object per event and collects no personal data — never a name, a phone
number or an email address, only the service, city and page context needed to
attribute a lead.

GTM is loaded by `components/layout/analytics.tsx`, gated on
`NEXT_PUBLIC_GTM_ID`. **With that variable unset, no container loads and
nothing is recorded**, while the page looks and behaves completely normally.
That is the single most likely way for this site to go live with no analytics
at all, so `DEPLOYMENT.md` carries a `curl` check for it.

## Events

Configure each as a **Custom Event** trigger in GTM, matching the name exactly.

| Event | Fires when | Notes |
|---|---|---|
| `form_submit` | **The API has accepted a lead.** | **Primary conversion.** Fires after the `/api/lead/` response reports success, not on button click, so it is a real submission rather than an intent signal. Suppressed when the honeypot was filled, so trapped bots do not inflate the count. |
| `form_error` | A submission was rejected or the network failed | Pair with `form_submit` to watch the failure rate. A rise here is a lost-lead signal, not a traffic problem. |
| `form_view` | The enquiry form scrolls into view | Fires once per page, via `IntersectionObserver`. The denominator for form conversion rate. |
| `form_start` | The visitor types into the first field | Fires once. `form_view` → `form_start` → `form_submit` is the form funnel. |
| `primary_cta_click` | A primary call-to-action is clicked | The site's most-fired event. **Not a conversion** — an intent signal. |
| `phone_click` | A `tel:` link is clicked | Counts intent to call, not a connected call. |
| `whatsapp_click` | A `wa.me` link is clicked | Counts the handoff to WhatsApp; what happens in WhatsApp is invisible to the site. |
| `email_click` | A `mailto:` link is clicked | |
| `service_card_click` | A service card is clicked | Carries `service` or `registration_type`. |
| `city_page_click` | A link to a city page is clicked | Carries `city`. |
| `gujarat_page_click` | A link to `/gujarat/` is clicked | |
| `technology_click` | A link out to Raulji Technologies is clicked | Measures interest in the separate technology brand. |
| `location_drawer_open` | The "Explore All Locations" drawer is opened | |
| `finder_complete` | The business-structure finder shows a result | **Declared but not yet fired.** The tool is a later release; the name is reserved now so the container can be configured once. Expect no data until it ships. |

`page_view` is deliberately **not** pushed by the app. GTM emits it on
container load; pushing one as well would double-count every page.

## Parameters on every event

| Parameter | Source | Always present |
|---|---|---|
| `event` | The name from the table above | yes |
| `page` | Path, from the caller or `location.pathname` | yes |
| `page_type` | Derived from the path by `pageTypeFor()` | yes |
| `source` | Caller, else `utm_source` | when known |
| `campaign` | Caller, else `utm_campaign` | when known |
| `city` | Caller's display name ("Surat"), else derived from the path | on location pages |
| `registration_type` | Pvt Ltd, LLP, Partnership, Proprietorship | on registration contexts |
| `service` | A named non-registration service | on those contexts |
| `label` | Free-text placement label, e.g. `home_presence` | sometimes |

`page_type` is derived rather than passed, so a new call site cannot forget it
or spell it differently. Values: `home`, `city`, `city_service`,
`registration_service`, `service`, `service_hub`, `gujarat`, `blog_index`,
`blog_post`, `compare`, `contact`, `faqs`, `about`, `legal`, `other`.

`registration_type` and `service` are separate on purpose. The client's reports
segment on `registration_type` as the *structure* dimension, so putting
"Business consulting" in it would quietly corrupt an existing report rather
than extend one.

## Naming note

The Oct 2026 technical audit calls the phone event `call_click`. This site
keeps **`phone_click`**, which is the name master rule 29 fixes and the name
the client's container is already wired to. Renaming it would silently zero an
existing report.

## Defining a conversion

Only `form_submit` is a completed enquiry. `primary_cta_click`,
`phone_click` and `whatsapp_click` are **intent** signals: counting any of
them as a lead overstates performance, which is the specific mistake to avoid
when the goal is measuring real client acquisition.

A phone or WhatsApp enquiry is a genuine lead that the website cannot observe,
so the website's recorded conversion count is a **floor**, not a total. Closing
that gap needs attribution outside the site:

1. Ask every caller where they heard about Raulji Group, and record it in the
   CRM against the same service and city dimensions used here.
2. Compare CRM lead volume against `form_submit` + `phone_click` +
   `whatsapp_click` monthly. A large, stable gap is the phone channel; a
   sudden gap is usually a broken form.

## Interim workflow while there is no CRM integration for attribution

The lead API forwards to the CRM but does not write back a lead ID, so the site
cannot tell which enquiries became clients. Until that exists:

- Treat `form_submit` as "enquiries received", from GA4.
- Treat CRM stage changes as "quotation sent" and "paying client", from the CRM.
- Join the two by hand monthly on phone number. It is coarse, but it is the
  only honest way to get a cost-per-client figure without new engineering.

Do not add a `qualified_lead` or `paying_client` event to the site. The browser
cannot know either fact, so any such event would be a guess recorded as data.
