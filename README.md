# Raulji Group — raulji.com

Next.js 15 (App Router) rebuild of raulji.com, repositioned around Phase 1:
business registration for Gujarat.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
```

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `RAULJI_CRM_API_KEY` | yes, for the lead form | Server-only CRM key. **Never** prefix with `NEXT_PUBLIC_`. |
| `RAULJI_CRM_BASE` | no | CRM base URL. Defaults to `https://api.raulji.com/api/v1`. |
| `SUPABASE_URL` | no | Blog and team content. Unset renders the empty state. |
| `SUPABASE_ANON_KEY` | no | Read-only anon key, used server-side only. |

> The previous build hard-coded a live CRM key in client-side JavaScript
> (`src/lib/leadApi.ts`), so it was readable by anyone who opened the bundle.
> **Rotate that key in the CRM before launch.** Submissions now go through
> `POST /api/lead/`, which validates, rate-limits and forwards server-side.

## Architecture

```
app/
  page.tsx                    Homepage
  [city]/page.tsx             33 root-level city pages (/godhra/ etc.)
  gujarat/page.tsx            Gujarat hub
  services/page.tsx           Services hub
  services/[slug]/page.tsx    4 registration pages + 9 preserved legacy pages
  compare/  faqs/  about/  team/  contact/  blog/  privacy/  terms/  disclaimer/
  api/lead/route.ts           Server-side lead intake
  og/route.tsx                Generated 1200x630 OG cards
  rentals/route.ts            410 Gone (discontinued)
  sitemap.ts  robots.ts  not-found.tsx

lib/
  site.ts       Verified business facts. Single source of truth.
  services.ts   The 4 registration services
  cities.ts     City data model (spec section 67)
  comparison.ts Structure comparison rows
  secondary-services.ts  Legacy services preserved for SEO
  schema.ts     JSON-LD builders
  seo.ts        Canonical / OG / Twitter metadata
  analytics.ts  dataLayer events
```

### Adding a city

Append an entry to `CITIES` in `lib/cities.ts` and add the slug to
`FEATURED_CITY_SLUGS` if it should appear in the homepage grid. The page,
sitemap entry, schema and internal links follow automatically.

**Write genuinely local content.** `intro`, `economy`, `structureNote` and
`faqs` must not be a template with the city name swapped in — that is what turns
a location page into a doorway page. If there is nothing specific to say about a
town, do not add it.

## Content rules baked into this build

- No client counts, ratings, awards, founding dates or team-size claims. Any
  figure on the site must be verifiable.
- Pricing appears only where it is already published: Pvt Ltd ₹9,999, LLP ₹7,999.
  Partnership and Proprietorship carry a quote CTA instead.
- No guaranteed timelines or approval. `TIMELINE_DISCLAIMER` and
  `AUTHORITY_DISCLAIMER` in `lib/site.ts` carry the standard wording.
- No claimed local offices. Raulji Group is in Vadodara and serves the rest of
  the state remotely; city pages say so explicitly.

## URL handling

- Trailing slashes throughout, matching the existing live site.
- `/services/land-investment/` → 301 → `/services/` (discontinued)
- `/industries/` → 301 → `/services/`
- `/rentals/` → **410 Gone** (discontinued, no equivalent)
- Unknown paths → real 404. The previous site answered every unknown path with
  a 200 and the homepage, which search engines read as a soft 404.

## Not included

- The `/admin` blog CMS from the Vite app was not ported. The blog reads from
  the same Supabase tables, so the existing admin app still works against them.
