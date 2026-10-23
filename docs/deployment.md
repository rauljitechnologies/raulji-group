# Deployment — Vercel

## 1. Environment variables

In Vercel → Project → Settings → Environment Variables:

- `RAULJI_CRM_API_KEY` — **rotate this in the CRM first.** The old key was public.
- `RAULJI_CRM_BASE` — optional. Defaults to `https://crm.raulji.com/api/v1`.
- `EMAIL_PROVIDER_API_KEY` — transactional email (Resend). Server-only.
- `EMAIL_FROM_ADDRESS` — `admin@raulji.com`. **Must be verified with the
  provider first**: publish SPF and DKIM for `raulji.com` and wait for the
  domain to show as verified, or the provider rejects the sender and both
  enquiry emails fail. Leads are still captured if it does — the emails sit
  downstream of the CRM — but nobody is notified, so do this before launch.
- `RAULJI_ADMIN_EMAILS` — `admin@raulji.com,toyuvrajraulji@gmail.com`
- `EMAIL_PROVIDER_ENDPOINT` — leave unset in production
- `SUPABASE_URL`, `SUPABASE_ANON_KEY` — optional, for blog and team
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager container, `GTM-MSW79R28`.
  Required for analytics on the live site: without it the app still pushes
  its events onto `dataLayer`, but no container loads to route them.

  > **It is a build-time variable, not a runtime one.** `NEXT_PUBLIC_*` values
  > are inlined by Next.js when `npm run build` runs, so adding this variable
  > to an already-built deployment does nothing until the project is **rebuilt
  > and redeployed**. Setting it in Vercel and clicking through without a
  > redeploy leaves analytics silently dead, and the page gives no visible sign
  > of it. Verified 2026-10-22: a build with the variable set inlines
  > `GTM-MSW79R28` into the prerendered HTML; a build without it emits no
  > container at all. If you change it, redeploy.

## 2. Domain

Point `www.raulji.com` at Vercel and redirect the apex to it, matching the
current canonical host. Cloudflare currently fronts the domain: if it stays in
front, set SSL to Full (strict) and avoid a second redirect layer, since
trailing-slash handling is already done by the app.

## 2b. Deploy order — preview before production

Not yet exercised: this repository has never been deployed from here.
`vercel whoami` reports logged out and there is no `.vercel/` directory, so
every step below is written to be followed, not reported as done.

```bash
vercel login
vercel link                 # once, to bind this directory to the project
vercel                      # preview deployment, prints a URL
```

Against the **preview URL**, run the whole of section 3 below plus:

```bash
P=https://<preview-url>
for u in / /gujarat/ /services/ /contact/ /ahmedabad/ /surat/ /vadodara/ /godhra/ \
         /services/pvt-registration/ /services/llp-registration/; do
  printf '%-42s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code}' "$P$u")"
done                                                    # all 200

# The 2026-10-22 state-level section must be present and the title must be the
# new one, not the district-directory wording it replaced.
curl -s "$P/gujarat/" | grep -c 'Partnership firms are registered in Gujarat'  # 1
curl -s "$P/gujarat/" | grep -o '<title>[^<]*'                                 # Company, LLP & Firm...
```

Check the Vercel build log and the function logs for the lead route before
promoting. Then:

```bash
vercel --prod
```

Promote **only** when every check above passes on the preview. Rollback is
Vercel → Deployments → the previous production deployment → *Promote*, so
confirm there is a known-good deployment to roll back to before promoting the
first time — on a first-ever deploy there is not, which is a reason to be
unhurried about it.

After promoting, re-run section 3 against `https://www.raulji.com` as the
post-deployment smoke test, and submit one real enquiry through the live form
to confirm it reaches the CRM.

## 3. Verify after the first deploy

```bash
# Discontinued services. land-investment became a 410 in the Oct 2026 audit
# (TF-02); it is no longer a redirect.
curl -sI https://www.raulji.com/services/land-investment/ | head -1   # 410
curl -sI https://www.raulji.com/rentals/                  | head -1   # 410
curl -sI https://www.raulji.com/no-such-page/             | head -1   # 404

# Reassigned, one hop each (not the homepage any more).
curl -sI https://www.raulji.com/services/legal/   | grep -i location  # /services/business-registration/
curl -sI https://www.raulji.com/services/finance/ | grep -i location  # /services/

# /sitemap.xml is a sitemap *index*: 4 child sitemaps, 95 URLs between them.
curl -s https://www.raulji.com/sitemap.xml | grep -c '<loc>'          # 4
for s in core services locations blog; do
  printf '%s: ' "$s"
  curl -s "https://www.raulji.com/sitemap/$s.xml" | grep -c '<loc>'
done                                            # 15, 9, 53, 18 = 95

# Analytics. Empty output means NEXT_PUBLIC_GTM_ID is not set in Vercel and
# nothing is being recorded, which the page gives no visible sign of.
curl -s https://www.raulji.com/ | grep -c googletagmanager              # non-zero
```

Then submit a test through the contact form and confirm, in order:

1. The form shows the success panel (which means the CRM answered `success: true`).
2. The lead appears in the CRM, and whether it was created or matched an existing
   contact.
3. **The CRM's lead-id field name.** `extractLeadId` reads several plausible
   shapes and returns `null` if none matches, which makes the admin email say
   "Not returned by the CRM". If it says that on a real lead, add the actual
   field to `lib/crm/lead-client.ts`.
4. The customer confirmation arrives at the submitted address.
5. The admin notification arrives at **both** configured recipients, with the
   CRM lead id and the created/updated line filled in.
6. The function logs show `lead_crm_captured` then `lead_emails` with both
   statuses `sent`, and contain no name, phone, email or message.

Use obviously-test details and delete the CRM record afterwards. See
[lead-pipeline.md](lead-pipeline.md) for what each failure mode looks like.

## 4. Search Console

1. Submit `https://www.raulji.com/sitemap.xml`.
2. Use **Removals** for `/rentals/` to speed up de-indexing (the 410 handles it
   either way).
3. Watch **Pages** for the first two weeks: the 33 city pages are new URLs and
   will take time to be discovered and indexed.
4. Request indexing for the four registration pages first, as they are the
   Phase 1 commercial targets.

## 5. Analytics

The site pushes events to `window.dataLayer`. Add a GTM container (or GA4 via
GTM) and create Custom Event triggers on the names in
**[docs/analytics-events.md](docs/analytics-events.md)**, which is generated
against the `EventName` union in `lib/analytics.ts` and is the only list that
matches the code.

> **This section previously listed three names the site has never pushed**:
> `lead_form_submit`, `lead_form_error` and `start_business_click`. The real
> names are `form_submit`, `form_error` and `primary_cta_click`. A container
> configured from the old list would have recorded **zero conversions** on the
> primary conversion trigger, with every other report looking healthy, so
> check any container built before 17 Oct 2026 against the generated list.

The primary conversion is **`form_submit`**. Note that `form_submit` fires when
the API accepts the lead, not when the button is clicked, so it is a real
submission rather than an intent signal.

Each event carries `page`, `page_type`, `source` and `campaign`, plus
`registration_type`, `service` and `city` where applicable, so a lead can be
attributed to a service and a city.

`page_view` is deliberately **not** pushed by the app: GTM emits it on
container load, and pushing a second one would double-count every page.

## 6. Things to do before launch

- [ ] Rotate the CRM API key
- [ ] Confirm the four "verified" facts still hold: ₹9,999, ₹7,999, Mon–Sat 9–7,
      Vadodara
- [ ] Decide whether the Supabase-backed `/admin` CMS moves here or stays on the
      old app
- [ ] Confirm partnership and proprietorship pricing, if you want prices shown
