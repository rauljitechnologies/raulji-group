# Deployment — Vercel

## 1. Environment variables

In Vercel → Project → Settings → Environment Variables:

- `RAULJI_CRM_API_KEY` — **rotate this in the CRM first.** The old key was public.
- `RAULJI_CRM_BASE` — optional
- `SUPABASE_URL`, `SUPABASE_ANON_KEY` — optional, for blog and team

## 2. Domain

Point `www.raulji.com` at Vercel and redirect the apex to it, matching the
current canonical host. Cloudflare currently fronts the domain: if it stays in
front, set SSL to Full (strict) and avoid a second redirect layer, since
trailing-slash handling is already done by the app.

## 3. Verify after the first deploy

```bash
curl -sI https://www.raulji.com/services/land-investment/ | head -2   # 301 -> /services/
curl -sI https://www.raulji.com/rentals/                  | head -1   # 410
curl -sI https://www.raulji.com/no-such-page/             | head -1   # 404
curl -s  https://www.raulji.com/sitemap.xml | grep -c '<loc>'         # 58
```

Then submit a test through the contact form and confirm the lead lands in the CRM.

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
GTM) and create triggers on these custom events:

`lead_form_submit` (primary conversion), `phone_click`, `email_click`,
`whatsapp_click`, `start_business_click`, `service_card_click`,
`city_page_click`, `form_view`, `form_start`, `lead_form_error`.

Each carries `registration_type`, `city`, `page`, `source` and `campaign` where
applicable, so leads can be attributed to a service and a city.

## 6. Things to do before launch

- [ ] Rotate the CRM API key
- [ ] Confirm the four "verified" facts still hold: ₹9,999, ₹7,999, Mon–Sat 9–7,
      Vadodara
- [ ] Decide whether the Supabase-backed `/admin` CMS moves here or stays on the
      old app
- [ ] Confirm partnership and proprietorship pricing, if you want prices shown
