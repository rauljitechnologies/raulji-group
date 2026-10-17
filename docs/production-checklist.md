# Production checklist

Run top to bottom. Every box has a command or a specific thing to look at —
nothing here is "check it looks fine".

`DEPLOYMENT.md` at the repo root holds the Vercel and DNS specifics and stays
the single deployment runbook; this file is the gate in front of it. There is
deliberately no `docs/deployment.md`: two runbooks drift apart, and a stale
runbook is what caused the analytics problem recorded in
[analytics-events.md](analytics-events.md).

## 1. Local verification — all four must pass

```bash
nvm use                 # Node 22+. @supabase/supabase-js requires >=22.
npm ci
npm run typecheck       # tsc --noEmit
npm run lint            # eslint .
npm run build           # check:slugs + sitemap manifest, then seo:validate
npm run check:blog      # 0 errors (word-count warnings are acceptable)
```

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

> **Known gap, needs a decision.** If the CRM is down or the key is wrong, the
> API returns 500 and the lead is **lost** — there is no fallback capture. The
> visitor is shown the phone number, so it is not silent, but a lead that does
> not call is gone. Options, cheapest first: (a) accept it and watch
> `form_error` in GA4, (b) add an email fallback via a provider, (c) write
> failed payloads to Supabase, which is already a dependency. Nothing here is
> implemented yet.

## 4. Analytics — silent failure is the default

- [ ] `NEXT_PUBLIC_GTM_ID=GTM-MSW79R28` is set in Vercel **Production**
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

## 7. Post-deploy

- [ ] Note the previous deployment ID in Vercel for rollback
- [ ] Re-run section 2 against `https://www.raulji.com`
- [ ] Check Vercel function logs for errors on `/api/lead`
- [ ] Confirm images are sharp on a real phone, not just a desktop browser

## 8. Rollback

Vercel keeps every deployment. To roll back: **Deployments → the last known
good one → Promote to Production**. No build is needed and it takes effect in
seconds.

There is no database migration in this project and no build-time state, so a
rollback is a pure code revert. The two things that do **not** roll back with
it are environment variables and the GTM container configuration — both are
changed outside the repo, so if a deploy was accompanied by an env change,
reverse that by hand as well.

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
