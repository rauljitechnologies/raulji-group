# Service page photography brief

Shot list for the service pages, generated from `lib/service-photos.ts`,
which is the source of truth. If this file and that one disagree, that one
wins.

25 photographs across five pages. Each has a fixed place in the layout. A
slot appears only once its file exists in `public/photos/services/`, and until
then its section uses the text layout. The one exception is the hero, which
shows the page's drawn panel. The handover is a file drop and a rebuild, with
no code change.

## Priority, from the client's brief

1. Real Raulji Group photography.
2. Real licensed professional photography.
3. AI-generated supporting visuals.

The enquiry section on every service page already uses the Chairman's real
photograph, so there are no generated "consultant" scenes in this list. If a
real photograph of any scene below exists, use it instead and rewrite the alt
text to describe it.

## Rules for every image

- Never present anyone shown as a Raulji Group employee, director or client.
- No certificates, MCA or government logos, seals, stamps or readable
  documents. No fake government offices.
- No handshakes, posed group smiles, skyscrapers, keyboard or laptop
  close-ups, holograms or cartoon styling.
- No text in the image.
- Every image is different. Do not reuse a photograph across two slots.

**Open decision:** `CLAUDE.md` rule 1 still says not to use AI-generated people.
The client's service-page brief asks for them. Update rule 1 once the client
confirms, so the two instructions stop disagreeing.

## House style

Add this to every prompt so the set reads as one visual system:

> Photorealistic premium editorial photograph, authentic Indian business setting, natural daylight, realistic skin texture and natural expressions, clean composition, subtle navy blue and white tones. No text, no logos, no certificates, no government or MCA marks, no seals or stamps, no readable documents, no handshake, no posed group smiles, no futuristic or holographic effects.

## Delivery spec

| | |
| --- | --- |
| Format | WebP, quality about 80. Next.js serves AVIF and WebP at responsive widths from this one file |
| Hero | 1600 x 900 px (16:9) |
| Everything else | 1600 x 1200 px (4:3). Two slots are shown at 4:5 and one at 21:9, so keep the subject centred with space around it |
| Weight | Under 250 KB each |
| Folder | `public/photos/services/`, under the exact filename below |

## Installing

Name each raw image after its filename below, with any extension (`.png` and
`.jpg` are fine), put them all in one folder, and run:

    python3 scripts/install-service-photos.py path/to/folder

It crops each image to its slot's shape, resizes it to 1600 px wide, compresses
it to WebP under 250 KB, and writes it into `public/photos/services/`. It never
upscales a small original, and it warns if one is below size. It does not check
what an image shows, so every image still needs a review against the rules
above. Run `--status` to see which slots are filled.

## Shot list

### Private Limited Company (`/services/pvt-registration/`)
1. **private-limited-company-registration-india.webp**  
   Placement: Beside the H1 (16:9, loads first)  
   Alt: Indian entrepreneurs discussing private limited company registration  
   Prompt: Two or three Indian entrepreneurs discussing the formation of a private limited company with a business consultant in a modern Indian office. Documents, a laptop and a notebook lie naturally on the table. Thoughtful, professional, discussing company structure and ownership.
2. **private-limited-company-founders-ownership.webp**  
   Placement: Beside the quick answer  
   Alt: A small founding team discussing how ownership of their company will be divided  
   Prompt: A small Indian founding team of three in their late twenties around a table, one sketching a simple ownership split on a notepad while the others look on. Early-stage office, whiteboard softly out of focus.
3. **private-limited-company-startup-team-planning.webp**  
   Placement: Beside "Who can consider...?" (shown 4:5)  
   Alt: A growing startup team planning expansion around a meeting table  
   Prompt: A growing Indian startup team of four or five planning expansion in a bright meeting room, one person presenting from a laptop screen that is not readable, the others engaged. Real working atmosphere, not posed.
4. **private-limited-company-directors-meeting.webp**  
   Placement: Above the structure figure, beside the benefits  
   Alt: Company founders discussing management and growth at a board table  
   Prompt: Two founders and an adviser at a small board table discussing management and growth, papers and a tablet in front of them. Calm, serious, established company feel.
5. **private-limited-company-incorporation-documents.webp**  
   Placement: Beside "Information you may need"  
   Alt: Incorporation paperwork organised in folders on a desk beside a laptop  
   Prompt: Overhead view of an organised desk: labelled folders, a small stack of identity and address papers with nothing readable, a laptop and a pen. Tidy and methodical, suggesting documents being prepared for company registration.

### LLP (`/services/llp-registration/`)
6. **llp-registration-india.webp**  
   Placement: Beside the H1 (16:9, loads first)  
   Alt: Business partners discussing LLP registration  
   Prompt: Two Indian professionals, a man and a woman in their thirties, discussing forming an LLP at a wooden table in a small professional services office. Laptop and pen nearby. Collaborative and careful.
7. **llp-partners-business-agreement.webp**  
   Placement: Beside the quick answer  
   Alt: Two partners reading through the terms of their business agreement  
   Prompt: Two Indian partners reading through a printed agreement together, one pointing to a clause, the other considering it. Close to medium shot, focus on the discussion rather than the paper.
8. **llp-professional-services-partners.webp**  
   Placement: Beside "Who can consider...?" (shown 4:5)  
   Alt: Partners in a professional services firm reviewing work together  
   Prompt: Partners in an Indian consultancy or accounting practice reviewing client work together at a shared desk, bookshelves and files behind them. Professional services atmosphere.
9. **llp-registration-documents.webp**  
   Placement: Beside "Information you may need"  
   Alt: A partner arranging the documents needed to register an LLP  
   Prompt: A partner's hands arranging a neat set of folders and papers into order beside a laptop, nothing readable. Suggests preparing documents for registration.

### Partnership Firm (`/services/partnership-registration/`)
10. **partnership-firm-registration-india.webp**  
   Placement: Beside the H1 (16:9, loads first)  
   Alt: Two business partners planning a new venture together  
   Prompt: Two Indian business partners in their forties planning a new venture in the back office of a trading business, shelves of stock softly out of focus. A notebook and ledger on the desk. Practical and familiar with each other.
11. **partnership-firm-partners-roles.webp**  
   Placement: Beside the quick answer  
   Alt: Partners discussing how responsibilities will be divided between them  
   Prompt: Two partners standing at a shop counter or workshop bench discussing who will handle what, one gesturing towards the premises. Everyday Indian small-business setting.
12. **partnership-deed-review.webp**  
   Placement: Above the structure figure, beside the benefits  
   Alt: Business partners reviewing their partnership deed before signing  
   Prompt: Two partners seated side by side reviewing a printed deed before signing, pen in hand, nothing readable on the paper. Serious, considered moment.
13. **partnership-firm-registration-documents.webp**  
   Placement: Beside "Information you may need"  
   Alt: Documents for a partnership firm organised on an office desk  
   Prompt: An office desk with a neat set of folders, a closed file and a laptop, arranged for a registration application. No readable text.
14. **partnership-profit-sharing-planning.webp**  
   Placement: Beside "Common mistakes to avoid"  
   Alt: Partners working through profit sharing and responsibilities on paper  
   Prompt: Two partners working through figures on a notepad and calculator, discussing how profits and duties will be shared. Close shot of hands and faces, warm office light.

### Proprietorship (`/services/proprietorship-registration/`)
15. **proprietorship-registration-india.webp**  
   Placement: Beside the H1 (16:9, loads first)  
   Alt: Indian entrepreneur planning a proprietorship business  
   Prompt: A single Indian entrepreneur in their late twenties planning a new business at a desk in a small, tidy workspace, writing in a notebook next to a laptop and phone. Focused and optimistic.
16. **sole-proprietor-working-independently.webp**  
   Placement: Beside the quick answer  
   Alt: A business owner working independently in their own shop  
   Prompt: An Indian business owner working alone in their own small shop or studio, attending to the business. Independent, capable, everyday setting.
17. **proprietorship-small-business-owner.webp**  
   Placement: Beside "Who can consider...?" (shown 4:5)  
   Alt: A small business owner serving a customer at their counter  
   Prompt: An Indian small-business owner at their counter, mid-conversation with a customer who is seen from behind. Local retail or service business, natural light.
18. **proprietorship-registration-documents.webp**  
   Placement: Beside "Information you may need"  
   Alt: An owner organising the papers needed for their business registrations  
   Prompt: A proprietor at a desk sorting a small folder of papers beside a phone and laptop, nothing readable. Simple and organised.
19. **proprietorship-business-planning-finances.webp**  
   Placement: Beside "What happens after registration?"  
   Alt: A business owner reviewing their finances and plans for the months ahead  
   Prompt: A business owner reviewing figures on a laptop with a notebook open beside it, in the evening after work, thoughtful. Home office or back office.

### Business Consulting (`/services/business-consulting/`)
20. **business-consulting-india.webp**  
   Placement: Beside the H1 (16:9, loads first)  
   Alt: Indian entrepreneur discussing business strategy with a consultant  
   Prompt: An Indian business owner in conversation with an experienced consultant across a meeting table in a modern office. The consultant sketches options on a notepad. Calm, advisory rather than sales-driven.
21. **business-consulting-strategy-discussion.webp**  
   Placement: Beside the quick answer  
   Alt: A consultant and a business owner working through a plan on paper  
   Prompt: A consultant and an owner leaning over a sheet of paper, working through the order of a plan, arrows and boxes sketched but not readable.
22. **business-consulting-structure-options.webp**  
   Placement: Wide banner above the six advice areas (21:9 on desktop)  
   Alt: A founder comparing business structure options laid out on the table  
   Prompt: A founder looking at several printed option sheets laid side by side on a table, weighing them up, a consultant beside them. Wide shot suitable for a banner crop.
23. **business-consulting-registration-explained.webp**  
   Placement: Above the related structure cards  
   Alt: A consultant explaining the registration steps to a client  
   Prompt: A consultant explaining steps to a client using a laptop turned towards them, screen not readable. Clear, patient explanation.
24. **business-consulting-growth-planning.webp**  
   Placement: Beside "Who we work with" (shown 4:5)  
   Alt: A business team discussing plans to expand  
   Prompt: A small Indian business team of three or four discussing expansion around a table with a floor plan or map, engaged and practical.
25. **business-consulting-founder-decision.webp**  
   Placement: Beside "What is outside our remit"  
   Alt: A founder reviewing a business plan before making a decision  
   Prompt: A founder alone at a desk reviewing a printed business plan, pen in hand, considering a decision. Quiet, focused.

## What stays drawn

The process timeline, the "information you may need" cards, the comparison,
and the structure figures are built components rather than photographs,
because a photograph cannot show an order of steps or a side-by-side
difference. The compact pages (insurance, compliance, technology) keep their
drawn panels, which the brief does not ask to replace.
