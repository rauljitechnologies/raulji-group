# Raulji.com audit, 2026-09-16

Audit of the live implementation against the client's final website update
instruction. Measured, not assumed: every page in `sitemap.xml` (79 URLs) was
fetched and parsed for status, title, description, canonical, H1 count, OG
image, schema types, image count, missing alt text, em dashes and word count.

Reproduce with `scratchpad/audit.mjs` against a running dev server.

## What the site already is

| | |
| --- | --- |
| URLs in sitemap | 79, all returning 200 |
| Homepage | 1 |
| Service pages | 15 |
| City pages | 33 |
| City + service pages | 20 (5 cities x 4 structures) |
| Other (about, team, blog, contact, faqs, compare, gujarat, legal) | 10 |

Schema in use: Organization, WebSite, ItemList, Service, FAQPage,
BreadcrumbList, Person. No review or rating schema anywhere, which is correct.

## KEEP (verified, no change needed)

1. **Technical SEO baseline.** No duplicate titles. No duplicate descriptions.
   Every page has a canonical, an OG image, exactly one H1 and breadcrumbs.
   No page under 400 words. No image missing alt text. No non-200 in the
   sitemap. Brief section 23 and 41 are already satisfied.
2. **URL architecture.** Trailing slash is consistent and enforced in
   `next.config.ts`. The legacy redirect map is in place (`/rent`, `/rent/*`,
   `/services/land-investment`, `/industries`, `/services/company-registration`,
   `/services/consulting`, `/services/registration`, `/business-registration`,
   `/business-consulting`), and `/rentals/` returns 410 with an explainer.
3. **The pages brief section 18 asks us to create already exist**:
   `/services/partnership-registration/` and
   `/services/proprietorship-registration/`, both with unique content
   (2452 and 2407 words), plus `/services/business-registration/` (2730) and
   `/services/business-consulting/` (1997).
4. **All 20 priority city pages from brief section 20 exist**, plus 13 more.
5. **All 20 city + service pages from brief section 21 exist**, for the five
   cities the client approved, each with hand written local content.
6. **Contact details are correct and verified** everywhere: +91 8511187689 and
   admin@raulji.com. No invented office address. No old email addresses.
7. **The enquiry form already collects exactly the fields brief section 11
   asks for**: service required, name, phone, email, city, message. It has
   labels, inline validation, error and success states, a honeypot, and
   `form_view` / `form_start` / `form_submit` tracking with lead source and
   page.
8. **Analytics events** cover page_view, primary_cta_click, phone_click,
   email_click, whatsapp_click, form events, service_card_click,
   city_page_click, gujarat_page_click and technology_click.
9. **No fake social proof anywhere.** No counters, testimonials, reviews,
   awards, client logos or statistics. Nothing to remove.

## IMPROVE

1. **The image system. This is the real gap and it matches what the client
   is reacting to.** 77 of 79 pages carry no image other than the header logo.
   Only `/about/` and `/team/` have a second image, the Chairman photograph.
   Six pages carry inline SVG figures (homepage hero, the four registration
   pages, `/compare/`, `/gujarat/`). Everything else is text, icons and rules.
   See "Image plan" below.
3. **Homepage length.** 1804 words. Brief section 7 wants it shorter and more
   focused. The sections are the ones the brief lists, so the work is trimming
   copy inside sections rather than removing sections.
4. **Service cards are visually identical** (brief section 8 asks for subtle
   differentiation inside one design system).
5. **Business journey** exists as `business-journey.tsx` but is text heavy.
   Brief section 9 wants a cleaner visual treatment.
6. **City pages average 2494 words** with no visual break. They are the
   longest pages on the site and the most text heavy.

## CREATE

1. **Image plan and the slots to hold it.** See below. Nothing can be filled
   with real photography until the client supplies photographs.
2. **Structure figures on the city + service pages**, which currently repeat
   the registration argument in prose with no visual.
3. **A process figure** for the registration journey, replacing text-heavy
   step lists on the service pages.

## REMOVE (done)

`/services/legal/`, `/services/finance/` and `/services/gst-din-mca/`, on the
client's confirmation that Raulji Group does not provide them. Removing the
entries from `lib/secondary-services.ts` takes them out of `/services/`, the
sitemap and every internal link in one move. Sitemap: 79 URLs down to 76.

No fake claims, invented data or placeholder content was found anywhere, so
there was nothing else to remove.

## REDIRECT (done)

The three removed URLs 301 to the homepage, per the client's instruction. See
the note under VERIFY. Nothing else was renamed, and the existing redirect map
is unchanged.

## VERIFY: answered by the client on 2026-09-16

1. **The eight questioned service URLs. Resolved.** Legal & Compliance,
   Finance Advisory and GST/DIN/MCA are not Raulji Group services. Their
   entries are removed from `lib/secondary-services.ts`, which takes them out
   of `/services/`, the sitemap and every internal link at once, and
   `next.config.ts` 301s all three to the homepage on the client's explicit
   instruction. Insurance, IT, Digital, Private Limited Compliance and LLP
   Compliance stay live, unchanged.

   Recorded for the record, not as a blocker: master rule 15 and 37, and the
   client's own brief at section 35, say not to redirect unrelated pages to
   the homepage. A redirect to a page that does not answer the original query
   is commonly treated as a soft 404 and passes little of the old page's
   value. The rule-consistent handling would be 410 for `/services/legal/`
   and `/services/finance/`, which have no successor, and 301 for
   `/services/gst-din-mca/` to `/services/business-registration/`, which
   covers MCA filing support. The client asked for the homepage. Changing it
   later is a one line change per URL.
2. **Header navigation. Resolved: keep the current nav** (Group, Consulting,
   Services, Gujarat, Resources, Contact), per master rule 16. Brief section
   29 does not apply.
3. **Enquiry button. Resolved: keep "Get Business Guidance"**, per master
   rule 23. Brief section 11's "Send Enquiry" does not apply.
4. **Photography. Still open.** Nothing else unblocks the image system.

## Image plan (brief sections 24 and 25)

Filenames and alt text are set now so the client can supply photographs
against a list rather than a description. Every slot renders nothing until a
real file exists: no placeholder, no stock, no AI generated people or offices.

| Slot | File | Alt text | Page |
| --- | --- | --- | --- |
| Group / corporate | `raulji-group-office.webp` | Raulji Group office in Vadodara | Home, About |
| Business consulting | `raulji-group-business-consulting.webp` | A Raulji Group consulting session | Consulting pillar |
| Company registration | `raulji-group-company-registration.webp` | Registration documents being prepared at Raulji Group | Registration pillar |
| Founder / leadership | `dharmendrasinh-raulji.jpg` (have) | Dharmendrasinh Raulji, Chairman | About, Team |
| Business meeting | `raulji-group-client-meeting.webp` | A client meeting at Raulji Group | Home, Contact |
| Documentation | `raulji-group-documents.webp` | Incorporation documents prepared by Raulji Group | Service pages |
| Gujarat business environment | `raulji-group-gujarat.webp` | Business district in Gujarat | Gujarat hub |
| Technology brand | `raulji-technologies.webp` | Raulji Technologies | Home group section |
| Lead generation | `raulji-group-enquiry.webp` | The Raulji Group team at work | Home enquiry |

What we need from the client, in order of value:

1. The Vadodara office, outside and inside.
2. The team working: a desk, a meeting, a document being signed.
3. The Chairman in a working setting, to sit alongside the existing portrait.
4. Any certificates or registrations that can be evidenced.

Until those arrive, visual weight is carried by figures built in the brand
palette that explain something real. That is a deliberate choice, not a
placeholder: master rule 1 and brief section 2 rule out stock photography, AI
generated offices and generic business people, which is the only other way to
fill these slots.

---

# Service pages audit, 2026-09-30

Scope: every URL under `/services/`, against the client's service inner-page
brief. Measured with `scratchpad/audit.mjs` (status, title, description,
canonical, robots, H1/H2, words, images, schema, claim scan) before and after,
and a DevTools-protocol check of horizontal overflow at 320, 375, 390, 414,
768, 1024, 1280 and 1440 px. Production build passes (93 static pages).

## Inventory and classification

| URL | Action | Why |
| --- | --- | --- |
| `/services/` | IMPROVE | Rebuilt as a visual hub: image cards for the two pillars and four structures, supporting services, technology gateway. ItemList schema added. |
| `/services/business-consulting/` | IMPROVE | Rebuilt in the Raulji design. Quick answer, hero image slot, related guides added. Content arrays unchanged. |
| `/services/business-registration/` | KEEP | Already rebuilt to the Raulji design on 2026-09-24. No change. |
| `/services/pvt-registration/` | IMPROVE | Full redesign to brief section 6. See below. URL unchanged. |
| `/services/llp-registration/` | IMPROVE | As above. URL unchanged. |
| `/services/partnership-registration/` | IMPROVE | As above. |
| `/services/proprietorship-registration/` | IMPROVE | As above. |
| `/services/insurance/` | KEEP, restyled | Client-confirmed service. Compact template restyled; Service schema added; broken guide link fixed. |
| `/services/pvt-compliance/` | KEEP, restyled | Client-confirmed. Linked from the Pvt Ltd page's "after registration" section. |
| `/services/llp-compliance/` | KEEP, restyled | Client-confirmed. Linked from the LLP page's "after registration" section. |
| `/services/it/` | KEEP (flag) | Client said keep on 2026-09-16. Overlaps Raulji Technologies (master rule 14); a 301 to rauljitechnologies.com is the rule-consistent option if the client revisits. |
| `/services/digital/` | KEEP (flag) | As `/services/it/`. |
| `/services/legal/`, `/finance/`, `/gst-din-mca/` | REDIRECT (unchanged) | 301 to `/` on the client's instruction. The 410 / relevant-301 alternative is recorded above. |
| `/services/land-investment/` | REDIRECT (unchanged) | 301 to `/services/`. |
| `/services/company-registration/`, `/consulting/`, `/registration/` | REDIRECT (unchanged) | 301 to the matching pages. |

Slash-less legacy URLs take two hops (308 to add the slash, then 301). Harmless,
noted for completeness.

## What changed on the four structure pages

Hero with image, then: quick answer and key takeaways, at-a-glance facts,
who it suits and where it does not, structure figure with benefits, visual
process (horizontal on desktop, vertical on mobile), who does what (Raulji
Group, the customer, the authority), requirements and document cards, a
mid-page "compare structures" CTA, cost broken down by who sets each charge,
timeline split into our part and the authority's, what happens after
registration, common mistakes, a two-way comparison table, FAQs, related
structures with panels, related guides, Gujarat city links, and the enquiry
form.

All new copy is per structure in `lib/services.ts`; none of it is shared
between pages. H1s drop "in India" per brief section 24; titles keep it.

## Needs human verification

1. **Prices.** ₹9,999 (Pvt Ltd) and ₹7,999 (LLP) are carried over from the
   live site. Confirm they are current, and whether the package covers more
   than two directors or partners.
2. **Tax on the professional fee.** The cost tables say any applicable tax is
   shown in the written quote. Confirm that is how quotes are issued, and
   whether GST applies to the fee.
3. **Written quote before filing.** The pages say the full expected amount is
   confirmed in writing before filing. Confirm this is the practice.
4. **Timelines.** 7 to 12 days (Pvt Ltd), 7 to 10 (LLP), Udyam same day and
   GST 7 to 15 are carried over. Keep them only if they reflect recent cases.
5. **Hero photography.** The brief asks for AI-generated people; master rule 1
   forbids them. See `docs/SERVICE-IMAGE-BRIEF.md`. Until files arrive, the
   drawn panels show.
6. **`/services/it/` and `/services/digital/`.** Keep, or 301 to
   rauljitechnologies.com.

## Found outside this scope

- **Blog image alt text is now wrong.** `lib/blog/images.ts` describes diagrams
  ("Diagram of two panels side by side..."), but the files were replaced with
  photographs on 2026-09-24. Screen readers and image search get a description
  of a picture that is not there.
- **Blog images are about 2 MB each.** next/image resizes them at request time,
  but the source files should be compressed to a few hundred KB.
- **Local builds need Node 20.9+.** `sharp` 0.35 in the lockfile refuses Node
  18, so on this machine `next build` fails on any statically imported image.
- **Header at 1024 px.** The "Talk to an Expert" button sits about 5 px from the
  right edge.

## Image-rich update, 2026-09-30

Service pages now carry photo slots through the page, not only in the hero,
plus four drawn components that explain what a photograph cannot:

- **Process timeline:** icons, step numbers, and a chip on every step saying
  who acts (our work, the authority's decision, or the customer's step).
- **Information you may need:** documents and details grouped into Identity,
  Personal address, Business information, Ownership information, Registered
  office or premises, and Other.
- **Versus comparison:** ownership, management, liability, compliance,
  funding and typical use, side by side with no winner marked. It replaces the
  table.
- **Leadership figure:** the Chairman's real photograph, named, beside every
  enquiry form. The brief puts real photography first, so no generated
  "consultant" image stands in here.

There are 25 photo slots (`lib/service-photos.ts`, shot list in
`docs/SERVICE-IMAGE-BRIEF.md`). None has a file yet. Layout was verified with
labelled test images in every slot at 320 to 1440 px, with no horizontal
overflow. The test images were then removed.
