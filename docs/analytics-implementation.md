# Analytics implementation — GA4, GTM, consent and CRM-confirmed conversion

**Built 2026-10-23.** What is in the code, what is verified, and the exact
manual steps left — which are all of the GTM container work, because there is
no GTM or GA4 account access from this environment.

Related: [gtm-event-map.md](gtm-event-map.md) is the tag and trigger list ·
[analytics-testing.md](analytics-testing.md) is the test plan and its results ·
[analytics-events.md](analytics-events.md) is the generated event list ·
[lead-pipeline.md](lead-pipeline.md) is the CRM integration the conversion
depends on.

## IDs

| | |
| --- | --- |
| GTM container | **`GTM-MSW79R28`** — supplied by the owner, already installed, env-gated on `NEXT_PUBLIC_GTM_ID` |
| GA4 measurement ID | **`G-SK8N5N3WE2`** — raulji.com web data stream, supplied by the owner 2026-10-23 |
| Google Ads | **none.** Not supplied, not guessed. No conversion ID or label anywhere in the repository |

Neither ID is a secret: both appear in the page source of every site that uses
them, which is why `NEXT_PUBLIC_` is correct for both and is not a leak.

## What was inspected

| | Finding |
| --- | --- |
| Framework | Next.js 15.5 App Router, static-first. Client-side navigation via `pushState`. |
| Existing GTM | One container, `GTM-MSW79R28`, in `components/layout/analytics.tsx`, env-gated. Correct snippet, `afterInteractive`, with the documented `noscript` iframe. **No duplicate.** |
| Existing GA4 | **None.** No measurement ID and no `gtag` anywhere before this round. |
| Conflicting scripts | None found. |
| Consent | **None.** No banner, no Consent Mode, no cookie notice. |
| Existing dataLayer events | 14, in the `EventName` union, documented and wired to the container. |
| CRM integration | `POST /api/lead/` → `lib/crm/lead-client.ts`. Server-side, key never in the browser. Built the previous day. |
| Thank-you route | **None.** Both forms swap to an inline success panel; there is no URL to load. That removes a whole class of false conversion. |
| Deployment | Vercel per the runbook. `vercel whoami` → logged out. |

## The naming decision, and why nothing was renamed

The brief asked for a full rename of the event taxonomy. **It was not applied,
by the owner's decision**, because `GTM-MSW79R28` is already wired to the
current names: every existing trigger would have stopped matching the moment a
rename deployed, and the reports would have read zero with nothing to indicate
why. Master rule 29 also fixes the names, and the 15 Oct 2026 audit had already
asked for `call_click` and been declined on the same grounds.

So the 14 existing events are untouched and ten new ones were added alongside.
[gtm-event-map.md](gtm-event-map.md) maps the brief's vocabulary onto the actual
event names so the container can still be built straight from the brief.

The one place this matters for reporting: **mark `generate_lead` as the GA4
conversion, not `form_submit`.** Both fire on the same confirmed submission, but
only `generate_lead` is deduplicated on the server's submission id.

## Consent Mode v2 — denied by default

The owner chose the strict posture. `lib/consent.ts` and
`components/layout/consent-banner.tsx`.

**Defaults, set before anything else runs:**

```
analytics_storage:  denied
ad_storage:         denied
ad_user_data:       denied
ad_personalization:  denied
wait_for_update:    500
```

**Ordering is the whole design.** The defaults are an inline
`beforeInteractive` script in `app/layout.tsx` — not in `<Analytics />`, because
the App Router only honours that strategy from the root layout. They must be in
`dataLayer` before the container loads, or tags can fire in the window between
page load and the first consent signal, which is the exact failure the defaults
exist to close. Verified in rendered HTML: the inline defaults sit at byte 6657
and there is **no executing `<script src=".../gtag/js">` or `gtm.js` ahead of
them** — both are injected after hydration.

A stored decision is re-applied inside the same script, so a returning visitor
who already accepted is not measured as denied for the first moments of every
page view.

**Three choices, not two.** Decline · Analytics only · Accept all. The middle
one exists because the permissions genuinely differ here: knowing which service
pages produce enquiries needs `analytics_storage` and has nothing to do with
advertising, and Raulji Group is not running Google Ads today — so an
accept-all-or-nothing banner would take a permission that is not used for
anything yet.

**On the law.** Raulji Group's market is India, so the **DPDP Act 2023** is the
regime that applies rather than the GDPR, and the requirements are not
identical. Nothing in this implementation decides what the law requires — that
is for the business and its advisers. What it does is make the safe posture the
default, satisfying the stricter reading of either regime, and relaxable later
without touching a single call site. **The privacy policy has not been reviewed
or updated against this implementation** — see Open below.

**The cost was accepted deliberately.** GA4 will record less than it would with
consent granted on load, because visitors who never answer the banner stay
denied. A measurement drop after this ships is the design working, not a
regression. Google's cookieless pings still allow modelled reporting.

Failure direction: corrupt stored JSON, an unrecognised choice, blocked
`localStorage` and private browsing all read as *unanswered*, which leaves
everything denied. Tested.

## GA4: in GTM, or direct — exactly one

The owner supplied the measurement ID as a raw `gtag.js` snippet. **It was not
pasted in as given**, because gtag.js alongside a GTM container that also has a
GA4 Configuration tag sends two `page_view` events per visit, inflating
sessions, users and engagement rate with no warning anywhere in GA4 — which the
brief itself warns about.

Instead there are two mutually exclusive paths:

| | Recommended | Escape hatch |
| --- | --- | --- |
| **Setup** | GA4 Configuration tag inside `GTM-MSW79R28`, measurement ID `G-SK8N5N3WE2`. Leave `NEXT_PUBLIC_GA4_MEASUREMENT_ID` **unset**. | Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-SK8N5N3WE2`. GTM must then have **no** GA4 Configuration tag. |
| **Gets you** | Page views **and** all 24 custom events, once the event tags are built | Page views only. Custom events reach GA4 only when GTM event tags exist |
| **Why** | The container is already consent-gated, and every custom event needs a GTM tag regardless | GA4 starts collecting immediately, before anyone has time to configure the container |

`components/layout/ga4-direct.tsx` is the escape hatch, off unless the variable
is set. Both paths are consent-aware: the defaults run ahead of either.

**SPA route changes need no code.** GA4's enhanced measurement emits `page_view`
on load and on each History Change, and the App Router navigates with
`pushState`. The site deliberately pushes no `page_view` of its own —
`PageViewEvents` fires only `view_service`, `view_location_page` and
`view_blog_article`, which GA4 cannot derive on its own.

## Files

| File | Role |
| --- | --- |
| `lib/analytics.ts` | The event layer. `EventName` union (24), `EventParams`, `track()`, `markLeadCounted()`, `errorCategory()`, `pageTypeFor()`. |
| `lib/consent.ts` | Consent state, storage, `updateConsent()`, and the bootstrap script string. |
| `lib/attribution.ts` | UTM/gclid from the landing URL and GA ids from GA's cookies, for the **CRM** payload. Separate from the dataLayer path. |
| `app/layout.tsx` | Consent defaults (`beforeInteractive`), `<Analytics />`, `<Ga4Direct />`, `<AttributionCapture />`, `<PageViewEvents />`, `<ConsentBanner />` last in `<body>`. |
| `components/layout/analytics.tsx` | GTM container, env-gated. |
| `components/layout/ga4-direct.tsx` | Opt-in direct gtag.js. |
| `components/layout/consent-banner.tsx` | The banner. |
| `components/layout/page-view-events.tsx` | `view_*` events on arrival and navigation, deduped per path. |
| `components/ui/tracked-link.tsx` | Adds `click_external_link` to outbound links. |
| `components/forms/lead-form.tsx`, `contact-wizard.tsx` | The form funnel and `generate_lead`. |

## Privacy — what is and is not sent

**Never sent to GA4 or the dataLayer:** name, phone number, email address,
business name, enquiry message text, CRM lead id, or any API key. Enforced by
tests, not just by convention.

**Sent:** the service chosen, the city, the page and page type, campaign
parameters that were genuinely on the URL, the form id, a validation **field
name**, a bounded error **category**, and the server's submission id.

Three deliberate narrowings worth knowing about:

- **The query allow-list.** Only six keys are copied from the URL, and
  `page_location` is rebuilt from them rather than taken from `location.href`.
  A URL carrying `?email=…&token=secret` produces a payload containing neither.
- **`error_field`, not the value.** A validation event is exactly where a
  half-typed email would otherwise reach analytics.
- **`error_category`, not the message.** Server messages are written for the
  visitor and include the phone number; an upstream error body can quote the
  payload back. Seven fixed values instead.
- **`link_domain`, not the href.** A `wa.me` link carries the prefilled message
  in its query string.

## Safe when analytics is blocked

`track()` returns immediately when `window` is undefined, creates `dataLayer`
if absent, and never throws. With GTM blocked by an extension or a DNS filter,
pushes accumulate in a plain array and nothing breaks — the forms submit, the
CRM is written, the emails send. Consent helpers swallow every storage error.
There is no code path where an analytics failure can affect an enquiry.

## Remaining manual steps — all of the container work

**Nothing in GTM or GA4 has been created, imported or published.** No GTM API
access, no GA4 API access, no authorised browser session. In order:

1. **Decide the GA4 path** — a GA4 Configuration tag in GTM (recommended), or
   `NEXT_PUBLIC_GA4_MEASUREMENT_ID`. Not both.
2. **Set `NEXT_PUBLIC_GTM_ID=GTM-MSW79R28` in Vercel Production.** It is
   inlined at **build** time, so it needs a redeploy to take effect — setting it
   on a built deployment changes nothing and leaves analytics silently dead.
3. **Build the variables, triggers and tags** in
   [gtm-event-map.md](gtm-event-map.md).
4. **Mark `generate_lead` as a conversion** in GA4 → Admin → Events. Not
   `form_submit`.
5. **Enable GA4 consent settings** so tags respect Consent Mode, and confirm
   the GA4 Configuration tag has *Additional consent checks* appropriate to
   `analytics_storage`.
6. **Preview before publishing.** GTM Preview, then GA4 DebugView, against the
   plan in [analytics-testing.md](analytics-testing.md).
7. **Review the privacy policy** against the banner's wording and the DPDP
   position.
8. **Internal traffic filter** — add the office IP in GA4 → Admin → Data
   Streams → Tag settings, so the team's own visits do not look like demand.

## Open

| Item | Status | Needs |
| --- | --- | --- |
| GTM container configured and published | **BLOCKED** | GTM account access. Nothing created. |
| GA4 receiving events, DebugView confirmation | **BLOCKED** | A published container and GA4 access. No event has ever reached `G-SK8N5N3WE2` from this work. |
| `generate_lead` marked as a conversion | **BLOCKED** | GA4 access. |
| Consent banner rendered and clicked in a browser | **NOT VERIFIED** | A browser. The decision logic is unit-tested and the defaults are verified in the HTML, but the banner is `useEffect`-gated so it is absent from server HTML by design and nothing has rendered it. |
| Privacy policy reviewed against this | **NOT VERIFIED** | A content and legal pass. |
| Whether DPDP requires this consent flow at all | **NOT VERIFIED** | The business and its advisers. The strict posture was chosen so the answer can arrive late without rework. |
| Google Ads conversion | **BLOCKED** | An Ads account, conversion ID and label. None supplied; none invented. |
| Internal traffic filtering | **NOT VERIFIED** | GA4 access and the office IP. |
| Deployment | **BLOCKED** | `vercel whoami` → logged out. |
