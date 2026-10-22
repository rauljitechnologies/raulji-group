# Production checklist

Run top to bottom. Every box has a command or a specific thing to look at —
nothing here is "check it looks fine".

[deployment.md](deployment.md) holds the Vercel and DNS specifics and stays
the single deployment runbook; this file is the gate in front of it.

It lived at `DEPLOYMENT.md` in the repo root until 2026-10-18 and moved here
so that every document the client's prompt asks for sits under `docs/`. It was
**moved, not copied.** There is still exactly one deployment runbook: two of
them drift apart, and a stale runbook is what caused the analytics problem
recorded in [analytics-events.md](analytics-events.md). Audit entries dated
before the move still refer to it by its old name.

## 1. Local verification — all four must pass

```bash
nvm use                 # Node 22+. @supabase/supabase-js requires >=22.
npm ci
npm run typecheck       # tsc --noEmit
npm run lint            # eslint .
npm test                # vitest run -- 79 tests, no network
npm run build           # check:slugs + sitemap manifest, then seo:validate
npm run check:blog      # 0 errors (word-count warnings are acceptable)
```

- [ ] `test` exits 0 — the lead pipeline's CRM response handling, email
      templates, escaping and secret-exposure checks
- [ ] `typecheck` exits 0
- [ ] `lint` exits 0 — if it asks "How would you like to configure ESLint?",
      `eslint.config.mjs` is missing and the step will hang in CI
- [ ] `build` ends with `seo-validate: ... Passed.`
- [ ] `check:blog` reports 0 errors

`seo-validate` fails the build on a duplicate title, a duplicate description,
or a sitemap URL with no prerendered page behind it. A green build is
therefore already proof of those three.

## 2. Local production smoke test

```bash
npm start &   # or PORT=3100 npm start
```

- [ ] `/` returns 200
- [ ] `curl -sL -o /dev/null -w '%{num_redirects} %{http_code}\n' localhost:3000/services/legal/` → `1 200`
- [ ] `/rentals/` → 410
- [ ] `/services/land-investment/` → 410
- [ ] `/no-such-page/` → 404 (not 200 with the homepage)
- [ ] `/robots.txt` → 200, and `Disallow: /api/` present
- [ ] `/sitemap.xml` → 200, 4 child sitemaps, 95 URLs between them
- [ ] `/og/?title=Test` → 200, `image/png`
- [ ] Security headers present on a page response: `X-Content-Type-Options`,
      `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`,
      `Strict-Transport-Security`, `Content-Security-Policy-Report-Only`

## 3. Lead path — the one that costs money when it breaks

- [ ] `RAULJI_CRM_API_KEY` is set in Vercel **Production**
- [ ] **The old CRM key has been rotated.** A previous build shipped a live key
      in client-side JavaScript, so treat the old one as public.
- [ ] Submit one real test enquiry through the live form and confirm it arrives
      in the CRM. Use obviously-test details and delete the record afterwards.
- [ ] Confirm the validation messages are sentences, not `Required`
- [ ] Confirm a failed submission still shows the phone number as a fallback
- [ ] `EMAIL_PROVIDER_API_KEY`, `EMAIL_FROM_ADDRESS` and `RAULJI_ADMIN_EMAILS`
      are set in Vercel **Production**
- [ ] **`admin@raulji.com` is verified with the email provider** — SPF and DKIM
      published for `raulji.com`, domain showing verified. Without this both
      enquiry emails fail while leads still capture, so the symptom is silence,
      not an error the visitor sees.
- [ ] Customer confirmation arrives at the submitted address
- [ ] Admin notification arrives at **both** recipients, with the CRM lead id
      and the created/updated line populated
- [ ] The CRM's real lead-id field is one `extractLeadId` recognises — if the
      admin email says "Not returned by the CRM" on a real lead, add it to
      `lib/crm/lead-client.ts`
- [ ] Function logs show `lead_crm_captured` and `lead_emails`, and contain no
      name, phone, email or message

> **Known gap, needs a decision.** If the CRM is down or the key is wrong, the
> API returns 500 and the lead is **lost** — there is no fallback capture. The
> visitor is shown the phone number, so it is not silent, but a lead that does
> not call is gone. Options, cheapest first: (a) accept it and watch
> `form_error` in GA4, (b) add an email fallback via a provider, (c) write
> failed payloads to Supabase, which is already a dependency. Nothing here is
> implemented yet.
>
> **Note on (b), now that email exists.** The provider added on 2026-10-22 is
> only wired to fire *after* confirmed capture, which is deliberate: an email
> sent on CRM failure would be a second place a lead can live, and the brief is
> explicit that a pending-enquiry workflow must not claim capture. Turning it
> into a fallback is a small change to `app/api/lead/route.ts` and a decision
> about who owns the resulting inbox — it is not wired up by default.

## 4. Analytics — silent failure is the default

See [analytics-implementation.md](analytics-implementation.md) for the full
setup, [gtm-event-map.md](gtm-event-map.md) for the tags and triggers, and
[analytics-testing.md](analytics-testing.md) for what to check in DebugView.

- [ ] **GA4 is configured in exactly ONE place.** Either a GA4 Configuration
      tag in `GTM-MSW79R28` (recommended) **or**
      `NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-SK8N5N3WE2`. Both at once sends two
      `page_view` events per visit and inflates sessions, users and engagement
      rate, with no warning anywhere in GA4. Load the homepage in GTM Preview
      and count: one.
- [ ] **`generate_lead` is marked as the conversion in GA4**, not
      `form_submit`. Both fire on the same confirmed submission; only
      `generate_lead` is deduplicated on the server submission id.
- [ ] `generate_lead` fires **once** per confirmed submission, with
      `submission_id` populated. Submit twice with the same phone: the second
      fires once with `lead_duplicate: true`.
- [ ] A failed submission fires `form_submission_error` with an
      `error_category` and **no** `generate_lead`
- [ ] Consent: before accepting, `analytics_storage` reads `denied` in GTM
      Preview. After "Analytics only", `analytics_storage` is `granted` while
      `ad_storage`, `ad_user_data` and `ad_personalization` stay `denied`
- [ ] No name, phone, email or message text in any DebugView payload
- [ ] The consent banner at 320/375/414 px does not cover the mobile action bar
      or the form submit button, and is dismissible by keyboard
- [ ] Internal traffic filter set in GA4 → Admin → Data Streams → Tag settings,
      so the team's own visits do not read as demand
- [ ] The privacy policy has been reviewed against the banner's wording and the
      DPDP position


- [ ] `NEXT_PUBLIC_GTM_ID=GTM-MSW79R28` is set in Vercel **Production**
- [ ] **It was set before the build that is currently live.** `NEXT_PUBLIC_*`
      is inlined by Next.js at build time, so setting it after a deploy changes
      nothing until you **redeploy**. Verified 2026-10-22: a build with the
      variable set inlines `GTM-MSW79R28` into the prerendered HTML; a build
      without it emits no container at all. If you add or change this value,
      trigger a fresh deployment.
- [ ] `curl -s https://www.raulji.com/ | grep -c googletagmanager` → non-zero.
      **Zero means nothing is being recorded**, and the page gives no sign of it.
- [ ] GTM triggers match [analytics-events.md](analytics-events.md) exactly.
      In particular the primary conversion is **`form_submit`**, not
      `lead_form_submit` — a container built from the pre-17-Oct-2026
      `DEPLOYMENT.md` would record zero conversions.
- [ ] GA4 shows `form_view`, `form_start`, `form_submit` after a test
      submission
- [ ] `page_view` is counted once per page, not twice (the app does not push
      it; GTM does)

## 5. Search Console

- [ ] Submit `https://www.raulji.com/sitemap.xml`
- [ ] Request indexing for the four registration pages first — they are the
      commercial targets
- [ ] Use **Removals** for `/rentals/` and `/services/land-investment/` to
      speed de-indexing (the 410s handle it either way)
- [ ] Watch **Pages** for two weeks: the city pages are new URLs and take time

## 6. Content and claims

- [ ] Prices still correct: Pvt Ltd ₹9,999, LLP ₹7,999
- [ ] Hours still correct: Mon–Sat, 9:00–19:00
- [ ] Phone `+91 8511187689` and `admin@raulji.com` still correct
- [ ] The insurance byline number `+91 9558855668` is still the right
      destination for insurance enquiries
- [ ] No invented client counts, awards, ratings or office addresses have crept
      in. There were none as of 2026-10-17.
- [ ] `/gujarat/` carries the 2026-10-22 state-level section and the new title:
      `curl -s .../gujarat/ | grep -c 'Partnership firms are registered in Gujarat'`
      → 1. That section states the Registrar of Firms position and s.69; if it
      is ever reworded, check it against
      [legal-content-review.md](legal-content-review.md) first.
- [ ] `/gujarat/` still does **not** claim that the Gujarat Registrar of Firms
      accepts online applications. That is unverified — see
      [seo-improvement-audit.md](seo-improvement-audit.md). If someone sources
      it, the FAQ "Can a partnership firm be registered online in Gujarat?" is
      where it belongs.

## 7. Post-deploy

- [ ] Note the previous deployment ID in Vercel for rollback
- [ ] Re-run section 2 against `https://www.raulji.com`
- [ ] Check Vercel function logs for errors on `/api/lead`
- [ ] Confirm images are sharp on a real phone, not just a desktop browser

## 8. Rollback

Vercel keeps every deployment. To roll back: **Deployments → the last known
good one → Promote to Production**. No build is needed and it takes effect in
seconds.

There is no database migration in this project, so a rollback is a pure code
revert. Two things do **not** roll back with it: the GTM container
configuration, and environment variables, both changed outside the repo. So if
a deploy was accompanied by an env change, reverse that by hand as well.

One subtlety, since it cuts the other way. `NEXT_PUBLIC_*` variables **are**
build-time state: their values are inlined into each build. Promoting an older
deployment therefore restores the value that was set when *that* build ran, not
the value currently in Vercel's settings. If `NEXT_PUBLIC_GTM_ID` was added
recently, rolling back past that point will also roll analytics back off, with
no warning.

## Deferred, with reasons

- **CSP is report-only.** Enforcing it needs two clean weeks of reports first;
  an enforced policy missing one host silently breaks analytics or the form.
  Switch the header key to `Content-Security-Policy` in `next.config.ts` once
  the reports are clean.
- **Two npm advisories remain** (1 moderate, 1 high), both in the postcss copy
  bundled inside Next itself (`node_modules/next/node_modules/postcss`,
  8.4.31). They are build-time only, not reachable by a visitor, and cannot be
  fixed without a major Next upgrade. `npm audit fix --force` would pull
  Next 16 and is not a patch-level change — do not run it as part of a
  routine deploy.
- **Hero image resolution.** `photos/home-hero.webp` is 1600 px wide but drawn
  at 1180 CSS px, so a 2x display gets ~1.36x density. Re-export at ~2400 px
  to the same path; no code change needed. See
  [image-manifest.md](image-manifest.md).
