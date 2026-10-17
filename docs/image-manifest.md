# Image manifest

Generated from `public/` on 2026-10-17 by walking the directory and reading
each file's real dimensions with `sharp`. 188 files, 11.4 MB on disk.

## Source and licence policy

| Class | Where it applies | Licence record |
|---|---|---|
| Brand asset | Logo, favicons, Apple touch icon | Client-supplied, Raulji Group's own mark |
| Client-supplied photograph | `leadership/` portrait | Supplied by the client 2026-10-02, used with permission |
| Client logos | `clients/` | Supplied by the client for the `/our-clients/` wall |
| Unsplash | Most site and city photography | Unsplash Licence — no attribution required |
| Wikimedia Commons, CC BY-SA 4.0 | Rajkot, Godhra, Dwarka, Junagadh city photography | **Attribution required.** Recorded in `lib/image-credits.ts` and published at `/image-credits/` |
| Drawn panel | `raulji-group-*.webp` panels | Rendered by `scripts/gen-panels.py`, this project's own artwork |
| Vector | `maps/*.svg` | This project's own artwork |

No image on this site is an AI-generated depiction of a person, an office, a
team or a client. The drawn panels are line artwork that illustrate what the
page already says, and their alt text describes the drawing rather than
implying a photograph — see the note at the top of `lib/images.ts`.

**Before adding an image:** if its licence or source is unknown, it does not
ship. A Commons photograph added to `lib/city-photos.ts` without a matching
entry in `lib/image-credits.ts` is published without the attribution its
licence requires.

## Technical standards applied

- Every raster file is WebP, with four exceptions: `favicon.ico`,
  `favicon.png` and `apple-touch-icon.png`, which need their own formats, and
  the client's leadership portrait, which is a JPEG.
- Served through `next/image`, which re-encodes to AVIF with WebP fallback at
  quality 70 (`next.config.ts`).
- `deviceSizes` is capped at 1920: nothing is laid out wider than that, so the
  2048 and 3840 rungs only ever made a phone download a desktop file.
- Intrinsic width and height come from the static import, so no image shifts
  the layout as it loads (CLS).
- `priority` is set on the homepage hero only — the one above-the-fold LCP
  image. Everything else lazy-loads.
- Alt text describes the image's purpose. Decorative images carry `alt=""`.
- Vector maps are plain `<img>`: the optimiser does not rasterise SVG, so
  routing one through it adds a hop and returns the same bytes.

## City photography (49 files, 4.9 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `photos/cities/ahmedabad/atal-bridge.webp` | 1200x1598 | webp | 70 kB | no |
| `photos/cities/ahmedabad/iim-vastrapur.webp` | 1200x900 | webp | 88 kB | no |
| `photos/cities/ahmedabad/old-city-rooftops.webp` | 1600x556 | webp | 157 kB | no |
| `photos/cities/ahmedabad/sabarmati-riverfront.webp` | 1920x1440 | webp | 61 kB | no |
| `photos/cities/dwarka/beach.webp` | 1000x1241 | webp | 110 kB | **yes — CC BY-SA** |
| `photos/cities/dwarka/boat-and-gulls.webp` | 1920x1441 | webp | 143 kB | **yes — CC BY-SA** |
| `photos/cities/dwarka/boats-at-anchor.webp` | 1000x750 | webp | 35 kB | **yes — CC BY-SA** |
| `photos/cities/dwarka/fishing-boats.webp` | 1200x800 | webp | 82 kB | **yes — CC BY-SA** |
| `photos/cities/dwarka/jetty.webp` | 1400x1049 | webp | 116 kB | **yes — CC BY-SA** |
| `photos/cities/dwarka/lighthouse.webp` | 1200x800 | webp | 113 kB | **yes — CC BY-SA** |
| `photos/cities/dwarka/sudama-setu-street.webp` | 900x1600 | webp | 118 kB | **yes — CC BY-SA** |
| `photos/cities/dwarka/sudarshan-setu.webp` | 1000x1228 | webp | 117 kB | **yes — CC BY-SA** |
| `photos/cities/dwarka/temple-spire.webp` | 1600x2134 | webp | 139 kB | **yes — CC BY-SA** |
| `photos/cities/dwarka/temple-street.webp` | 1000x1778 | webp | 185 kB | **yes — CC BY-SA** |
| `photos/cities/enquiry.webp` | 1200x800 | webp | 42 kB | no |
| `photos/cities/faqs.webp` | 1000x667 | webp | 44 kB | no |
| `photos/cities/gandhinagar/barrage.webp` | 1000x750 | webp | 99 kB | no |
| `photos/cities/gandhinagar/carved-relief.webp` | 1000x667 | webp | 128 kB | no |
| `photos/cities/gandhinagar/gift-city.webp` | 1920x1080 | webp | 166 kB | no |
| `photos/cities/gandhinagar/roundabout.webp` | 1000x753 | webp | 57 kB | no |
| `photos/cities/gandhinagar/shopfronts.webp` | 1000x774 | webp | 105 kB | no |
| `photos/cities/gandhinagar/skyline-sunset.webp` | 1400x934 | webp | 35 kB | no |
| `photos/cities/gandhinagar/sun-over-tower.webp` | 1920x2880 | webp | 31 kB | no |
| `photos/cities/gandhinagar/tower-sunset.webp` | 1000x667 | webp | 20 kB | no |
| `photos/cities/godhra/bus-stand.webp` | 1800x1013 | webp | 97 kB | **yes — CC BY-SA** |
| `photos/cities/godhra/jain-temple.webp` | 1600x1067 | webp | 186 kB | **yes — CC BY-SA** |
| `photos/cities/godhra/nehru-park.webp` | 1440x810 | webp | 166 kB | **yes — CC BY-SA** |
| `photos/cities/godhra/railway-junction.webp` | 1920x1080 | webp | 106 kB | **yes — CC BY-SA** |
| `photos/cities/godhra/ramsagar-lake.webp` | 1920x1080 | webp | 91 kB | **yes — CC BY-SA** |
| `photos/cities/junagadh/mahabat-maqbara.webp` | 800x449 | webp | 45 kB | **yes — CC BY-SA** |
| `photos/cities/office-cabin.webp` | 1000x638 | webp | 66 kB | no |
| `photos/cities/office-desks.webp` | 1000x666 | webp | 32 kB | no |
| `photos/cities/office-open-plan.webp` | 1000x667 | webp | 62 kB | no |
| `photos/cities/office-workstations.webp` | 1000x667 | webp | 50 kB | no |
| `photos/cities/rajkot/aji-dam.webp` | 1800x1197 | webp | 44 kB | **yes — CC BY-SA** |
| `photos/cities/rajkot/city-aerial.webp` | 1920x1080 | webp | 173 kB | **yes — CC BY-SA** |
| `photos/cities/rajkot/high-street-ring-road.webp` | 1920x1080 | webp | 136 kB | **yes — CC BY-SA** |
| `photos/cities/rajkot/skyline-dusk.webp` | 1920x1080 | webp | 34 kB | **yes — CC BY-SA** |
| `photos/cities/rajkot/watson-museum.webp` | 1440x960 | webp | 195 kB | **yes — CC BY-SA** |
| `photos/cities/remote.webp` | 1000x565 | webp | 47 kB | no |
| `photos/cities/structure-llp.webp` | 1000x562 | webp | 84 kB | no |
| `photos/cities/structure-partnership.webp` | 1000x667 | webp | 64 kB | no |
| `photos/cities/structure-proprietorship.webp` | 1000x667 | webp | 66 kB | no |
| `photos/cities/structure-pvt.webp` | 1000x668 | webp | 67 kB | no |
| `photos/cities/vadodara/heritage-facade.webp` | 1000x1333 | webp | 196 kB | no |
| `photos/cities/vadodara/heritage-mural.webp` | 1000x1333 | webp | 196 kB | no |
| `photos/cities/vadodara/laxmi-vilas-palace.webp` | 1920x1080 | webp | 193 kB | no |
| `photos/cities/vadodara/palace-domes.webp` | 1440x809 | webp | 174 kB | no |
| `photos/cities/vadodara/palace-monochrome.webp` | 1920x1280 | webp | 183 kB | no |

## Client logos (37 files, 0.1 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `clients/africa-fashion-house.webp` | 280x116 | webp | 3 kB | no |
| `clients/al-maha-optical.webp` | 280x116 | webp | 4 kB | no |
| `clients/aljazira-supermarket.webp` | 280x116 | webp | 3 kB | no |
| `clients/arkarise.webp` | 280x116 | webp | 4 kB | no |
| `clients/auriga.webp` | 280x116 | webp | 3 kB | no |
| `clients/bangpromo.webp` | 280x116 | webp | 5 kB | no |
| `clients/bratz.webp` | 280x116 | webp | 3 kB | no |
| `clients/buykriya.webp` | 280x116 | webp | 3 kB | no |
| `clients/car-decor.webp` | 280x116 | webp | 2 kB | no |
| `clients/cybermart.webp` | 280x116 | webp | 5 kB | no |
| `clients/faye.webp` | 280x116 | webp | 3 kB | no |
| `clients/future-roots.webp` | 280x116 | webp | 4 kB | no |
| `clients/goodees.webp` | 280x116 | webp | 5 kB | no |
| `clients/indian-beautiful-art.webp` | 280x116 | webp | 3 kB | no |
| `clients/knectt.webp` | 280x116 | webp | 3 kB | no |
| `clients/modern-fabrics.webp` | 280x116 | webp | 4 kB | no |
| `clients/myesuq.webp` | 280x116 | webp | 4 kB | no |
| `clients/nateeva.webp` | 280x116 | webp | 3 kB | no |
| `clients/nobaj.webp` | 280x116 | webp | 2 kB | no |
| `clients/nxtby.webp` | 280x116 | webp | 3 kB | no |
| `clients/only-for-organic.webp` | 280x116 | webp | 2 kB | no |
| `clients/orgo-manya.webp` | 280x116 | webp | 2 kB | no |
| `clients/power.webp` | 280x116 | webp | 2 kB | no |
| `clients/promomilia.webp` | 280x116 | webp | 3 kB | no |
| `clients/prozo.webp` | 280x116 | webp | 3 kB | no |
| `clients/regal-fabric-gallery.webp` | 280x116 | webp | 2 kB | no |
| `clients/s3-buy.webp` | 280x116 | webp | 2 kB | no |
| `clients/sbl-mobile-tyres.webp` | 280x116 | webp | 8 kB | no |
| `clients/shelf-additions.webp` | 280x116 | webp | 4 kB | no |
| `clients/smp-global-stone.webp` | 280x116 | webp | 4 kB | no |
| `clients/sure-safety.webp` | 280x116 | webp | 3 kB | no |
| `clients/synergy.webp` | 280x116 | webp | 3 kB | no |
| `clients/the-dj-shop.webp` | 280x116 | webp | 3 kB | no |
| `clients/unicore.webp` | 280x116 | webp | 3 kB | no |
| `clients/wayuvega.webp` | 280x116 | webp | 4 kB | no |
| `clients/wear91.webp` | 280x116 | webp | 2 kB | no |
| `clients/woodminium.webp` | 280x116 | webp | 4 kB | no |

## City card thumbnails (26 files, 0.4 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `photos/cities/cards/amreli.webp` | 320x320 | webp | 12 kB | no |
| `photos/cities/cards/anand.webp` | 320x320 | webp | 17 kB | no |
| `photos/cities/cards/ankleshwar.webp` | 320x320 | webp | 21 kB | no |
| `photos/cities/cards/bharuch.webp` | 320x320 | webp | 16 kB | no |
| `photos/cities/cards/bhavnagar.webp` | 320x320 | webp | 14 kB | no |
| `photos/cities/cards/bhuj.webp` | 320x320 | webp | 8 kB | no |
| `photos/cities/cards/botad.webp` | 320x320 | webp | 2 kB | no |
| `photos/cities/cards/dahod.webp` | 320x320 | webp | 29 kB | no |
| `photos/cities/cards/gandhidham.webp` | 320x320 | webp | 12 kB | no |
| `photos/cities/cards/halol.webp` | 320x320 | webp | 12 kB | no |
| `photos/cities/cards/himmatnagar.webp` | 320x320 | webp | 18 kB | no |
| `photos/cities/cards/jamnagar.webp` | 320x320 | webp | 15 kB | no |
| `photos/cities/cards/jhalod.webp` | 320x320 | webp | 13 kB | no |
| `photos/cities/cards/kalol.webp` | 320x320 | webp | 20 kB | no |
| `photos/cities/cards/mehsana.webp` | 320x320 | webp | 14 kB | no |
| `photos/cities/cards/modasa.webp` | 320x320 | webp | 5 kB | no |
| `photos/cities/cards/morbi.webp` | 320x320 | webp | 9 kB | no |
| `photos/cities/cards/nadiad.webp` | 320x320 | webp | 10 kB | no |
| `photos/cities/cards/navsari.webp` | 320x320 | webp | 6 kB | no |
| `photos/cities/cards/palanpur.webp` | 320x320 | webp | 3 kB | no |
| `photos/cities/cards/patan.webp` | 320x320 | webp | 33 kB | no |
| `photos/cities/cards/porbandar.webp` | 320x320 | webp | 6 kB | no |
| `photos/cities/cards/surat.webp` | 320x320 | webp | 20 kB | no |
| `photos/cities/cards/surendranagar.webp` | 320x320 | webp | 10 kB | no |
| `photos/cities/cards/valsad.webp` | 320x320 | webp | 21 kB | no |
| `photos/cities/cards/vapi.webp` | 320x320 | webp | 21 kB | no |

## Site photography (25 files, 1.2 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `photos/faqs/cta.webp` | 1600x1067 | webp | 96 kB | no |
| `photos/home-companyConsulting.webp` | 1200x801 | webp | 45 kB | no |
| `photos/home-companyTech.webp` | 1200x850 | webp | 14 kB | no |
| `photos/home-consulting.webp` | 1200x800 | webp | 38 kB | no |
| `photos/home-cta.webp` | 1600x1067 | webp | 195 kB | no |
| `photos/home-editorial.webp` | 1800x1202 | webp | 132 kB | no |
| `photos/home-hero.webp` | 1600x1067 | webp | 199 kB | no |
| `photos/llp-registration-india.webp` | 800x600 | webp | 12 kB | no |
| `photos/partnership-firm-registration.webp` | 800x600 | webp | 12 kB | no |
| `photos/private-limited-company-registration.webp` | 800x600 | webp | 12 kB | no |
| `photos/proprietorship-registration.webp` | 800x600 | webp | 17 kB | no |
| `photos/raulji-group-business-consulting.webp` | 1200x800 | webp | 24 kB | no |
| `photos/raulji-group-client-meeting.webp` | 1200x800 | webp | 19 kB | no |
| `photos/raulji-group-company-registration.webp` | 1600x686 | webp | 31 kB | no |
| `photos/raulji-group-compliance.webp` | 1200x800 | webp | 18 kB | no |
| `photos/raulji-group-documents.webp` | 1200x800 | webp | 15 kB | no |
| `photos/raulji-group-enquiry.webp` | 1200x800 | webp | 16 kB | no |
| `photos/raulji-group-gujarat.webp` | 1600x900 | webp | 29 kB | no |
| `photos/raulji-group-hero.webp` | 1200x675 | webp | 27 kB | no |
| `photos/raulji-group-insurance.webp` | 1200x800 | webp | 22 kB | no |
| `photos/raulji-group-office.webp` | 1200x900 | webp | 15 kB | no |
| `photos/raulji-group-structure.webp` | 1800x771 | webp | 41 kB | no |
| `photos/raulji-technologies.webp` | 1200x800 | webp | 19 kB | no |
| `photos/registration/benefits.webp` | 1600x1068 | webp | 117 kB | no |
| `photos/registration/enquiry.webp` | 1600x1066 | webp | 57 kB | no |

## Blog hero images (23 files, 2.4 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `blog/business-registration-mistakes.webp` | 1600x900 | webp | 150 kB | no |
| `blog/business-registration-options-godhra.webp` | 1200x675 | webp | 32 kB | no |
| `blog/business-structure-comparison-guide.webp` | 1600x900 | webp | 126 kB | no |
| `blog/choosing-a-business-structure-india.webp` | 1600x900 | webp | 131 kB | no |
| `blog/company-registration-documents.webp` | 1600x900 | webp | 123 kB | no |
| `blog/company-registration-godhra.webp` | 1200x675 | webp | 26 kB | no |
| `blog/health-insurance-godhra-gujarat.webp` | 1600x900 | webp | 148 kB | no |
| `blog/health-insurance-halol-gujarat.webp` | 1600x900 | webp | 101 kB | no |
| `blog/health-insurance-jambughoda-panchmahal.webp` | 1600x900 | webp | 130 kB | no |
| `blog/health-insurance-kakanpur-panchmahal.webp` | 1600x900 | webp | 125 kB | no |
| `blog/health-insurance-kalol-gujarat.webp` | 1600x900 | webp | 125 kB | no |
| `blog/health-insurance-kantadi-panchmahal.webp` | 1600x900 | webp | 105 kB | no |
| `blog/health-insurance-panchmahal-gujarat.webp` | 1600x900 | webp | 140 kB | no |
| `blog/health-insurance-policy-india.webp` | 1600x900 | webp | 144 kB | no |
| `blog/health-insurance-tuwa-panchmahal.webp` | 1600x900 | webp | 99 kB | no |
| `blog/health-insurance-villages-godhra-panchmahal.webp` | 1600x900 | webp | 132 kB | no |
| `blog/llp-registration-godhra-gujarat.webp` | 1200x675 | webp | 25 kB | no |
| `blog/mca-company-incorporation-process.webp` | 1600x900 | webp | 149 kB | no |
| `blog/partnership-firm-vs-proprietorship.webp` | 1600x900 | webp | 136 kB | no |
| `blog/private-limited-company-registration-godhra.webp` | 1200x675 | webp | 25 kB | no |
| `blog/private-limited-company-vs-llp.webp` | 1600x900 | webp | 121 kB | no |
| `blog/starting-a-business-in-godhra.webp` | 1200x675 | webp | 23 kB | no |
| `blog/starting-a-business-in-gujarat.webp` | 1600x900 | webp | 142 kB | no |

## City x service photography (12 files, 0.9 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `photos/city-services/check-audit.webp` | 1100x619 | webp | 43 kB | no |
| `photos/city-services/check-industrial-unit.webp` | 1100x619 | webp | 114 kB | no |
| `photos/city-services/check-partners.webp` | 1100x619 | webp | 44 kB | no |
| `photos/city-services/check-vendor-form.webp` | 1100x619 | webp | 23 kB | no |
| `photos/city-services/cta-skyline.webp` | 1920x840 | webp | 120 kB | no |
| `photos/city-services/documents.webp` | 1200x750 | webp | 55 kB | no |
| `photos/city-services/hero-industry.webp` | 1920x840 | webp | 163 kB | no |
| `photos/city-services/market-fabrication.webp` | 1400x1050 | webp | 109 kB | no |
| `photos/city-services/structure-llp.webp` | 1100x688 | webp | 110 kB | no |
| `photos/city-services/structure-partnership.webp` | 1100x688 | webp | 34 kB | no |
| `photos/city-services/structure-proprietorship.webp` | 1100x688 | webp | 86 kB | no |
| `photos/city-services/suits-engineers.webp` | 1200x825 | webp | 62 kB | no |

## Services hub photography (11 files, 1.2 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `photos/services-hub/consulting.webp` | 1600x1067 | webp | 112 kB | no |
| `photos/services-hub/cta.webp` | 1600x1067 | webp | 97 kB | no |
| `photos/services-hub/digital.webp` | 1600x904 | webp | 86 kB | no |
| `photos/services-hub/insurance.webp` | 1600x1067 | webp | 113 kB | no |
| `photos/services-hub/it.webp` | 1600x1065 | webp | 56 kB | no |
| `photos/services-hub/llp-compliance.webp` | 1600x1067 | webp | 135 kB | no |
| `photos/services-hub/pvt-compliance.webp` | 1600x1020 | webp | 128 kB | no |
| `photos/services-hub/registration.webp` | 1600x1067 | webp | 79 kB | no |
| `photos/services-hub/stage.webp` | 1600x900 | webp | 151 kB | no |
| `photos/services-hub/structures.webp` | 1600x1067 | webp | 115 kB | no |
| `photos/services-hub/technology.webp` | 1600x2220 | webp | 193 kB | no |

## Brand marks (3 files, 0.1 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `apple-touch-icon.png` | 180x180 | png | 5 kB | no |
| `favicon.png` | 256x256 | png | 9 kB | no |
| `raulji-group-logo.png` | 1920x511 | png | 53 kB | no |

## Leadership portrait (1 files, 0.1 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `leadership/dharmendrasinh-raulji.jpg` | 1000x1000 | jpeg | 140 kB | no |

## Maps (vector) (1 files, 0.0 MB)

| File | Dimensions | Format | Size | Attribution required |
|---|---|---|---|---|
| `maps/india-headquarters.svg` | —x— | svg | 25 kB | no |

## Largest files

Nothing exceeds 199 kB. The 17 files above 150 kB:

- 199 kB — `photos/home-hero.webp` (1600x1067)
- 196 kB — `photos/cities/vadodara/heritage-facade.webp` (1000x1333)
- 196 kB — `photos/cities/vadodara/heritage-mural.webp` (1000x1333)
- 195 kB — `photos/cities/rajkot/watson-museum.webp` (1440x960)
- 195 kB — `photos/home-cta.webp` (1600x1067)
- 193 kB — `photos/cities/vadodara/laxmi-vilas-palace.webp` (1920x1080)
- 193 kB — `photos/services-hub/technology.webp` (1600x2220)
- 186 kB — `photos/cities/godhra/jain-temple.webp` (1600x1067)
- 185 kB — `photos/cities/dwarka/temple-street.webp` (1000x1778)
- 183 kB — `photos/cities/vadodara/palace-monochrome.webp` (1920x1280)
- 174 kB — `photos/cities/vadodara/palace-domes.webp` (1440x809)
- 173 kB — `photos/cities/rajkot/city-aerial.webp` (1920x1080)
- 166 kB — `photos/cities/gandhinagar/gift-city.webp` (1920x1080)
- 166 kB — `photos/cities/godhra/nehru-park.webp` (1440x810)
- 163 kB — `photos/city-services/hero-industry.webp` (1920x840)
- 157 kB — `photos/cities/ahmedabad/old-city-rooftops.webp` (1600x556)
- 151 kB — `photos/services-hub/stage.webp` (1600x900)

## Known resolution gap

`photos/home-hero.webp` is 1600x1067. Its `sizes` declares a drawn width of
1180 CSS px on desktop, so a 2x-density display wants about 2360 px and
receives 1600 px — roughly 1.36x effective density rather than 2x. The
optimiser is behaving correctly and does not upscale; the source is simply
smaller than the largest useful rendition.

It is not blurry, but it is not fully retina-sharp either. The fix is a
re-export of the source at about 2400 px wide, dropped in at the same path.
No code change is needed. Every other photograph is drawn well inside its
source resolution.
