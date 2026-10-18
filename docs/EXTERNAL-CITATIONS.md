# External citations

Every outbound link to a government or statutory source, where it appears, and
when it was last checked. Required by the technical audit (TF-13): a citation
that no longer opens is worse than no citation, because it is the thing a
reader clicks to verify a legal claim.

**How to check:** open each URL in a real browser, not with `curl`. Two of the
three hosts block automated requests, so a non-200 from a script proves nothing
about whether a person can open the page.

**If a link is dead or moved:** replace it with the current official page. If no
replacement exists, remove the link and keep the sentence. Never leave a dead
citation in place, and never swap in an unofficial mirror.

## Status

Last automated attempt: 2026-10-16, from the build environment (firewalled).
No URL below has been opened in a browser yet; that check is outstanding.

| URL | Used on | Automated result | Browser check | Action |
| --- | --- | --- | --- | --- |
| `https://www.mca.gov.in/` | `app/page.tsx`, and `lib/blog/articles/`: `structure-guide.ts`, `registration-mistakes.ts`, `pvt-vs-llp.ts`, `gujarat-business-setup.ts`, `documents-required.ts`, `choose-business-structure.ts` | 403 Forbidden | outstanding | Keep if it opens. mca.gov.in returns 403 to any non-browser client, including a script sending a browser user-agent, so a 403 here is expected and is not evidence the page is down. |
| `https://www.mca.gov.in/content/dam/mca-aem-forms/instructionkits/Instruction%20Kit_SPICe+Part%20A.pdf` | `mca-process.ts`, `documents-required.ts` | 403 Forbidden | outstanding | If the PDF has moved, link the current SPICe+ instruction-kit page on mca.gov.in rather than a deep PDF path, which is the part that moves. |
| `https://www.mca.gov.in/content/dam/mca/pdf/SPICEplus-and-linked-filings-FAQs-V3-20230122.pdf` | `mca-process.ts` | 403 Forbidden | outstanding | Same. `V3-20230122` in the filename means this one is version-stamped and will eventually 404; prefer the FAQ landing page. |
| `https://www.indiacode.nic.in/handle/123456789/15202` | `gujarat-business-setup.ts` | Connection timeout | outstanding | Timed out from the build network, which is firewalled, so this is not proof the site is down. If it is dead, replace with the same Act's current India Code page. |
| `https://www.indiacode.nic.in/handle/123456789/2400` | `structure-guide.ts`, `partnership-vs-proprietorship.ts` | Connection timeout | outstanding | Same. This handle is the Indian Partnership Act, 1932. |
| `https://pmjay.gov.in/` | `health-insurance-panchmahal.ts`, `health-insurance-kantadi.ts`, `health-insurance-jambughoda.ts` | Connection timeout | outstanding | Same. If dead, replace with the current official PM-JAY site. |

## Statutory claims and their sources

Legal statements the site makes, with what was checked and when. Reviewed
**2026-10-18**. These are claims in body copy, not outbound links, so they are
not covered by the table above — but they age the same way, and two of them
had already gone stale by more than four years before this review.

| Claim as the site states it | Source | Status |
| --- | --- | --- |
| The board appoints the first auditor within 30 days of incorporation | Companies Act 2013, s.139(6) | **Verified.** Statutory and unambiguous. |
| Statutory audit applies to a Private Limited Company from its first financial year regardless of turnover | Companies Act 2013, s.139 / s.143 | **Verified.** |
| Form INC-20A declaring commencement of business within 180 days | Companies Act 2013, s.10A | **Verified.** |
| Late ROC filing by a **company** attracts a fee for each day of delay | Companies Act 2013, s.403 | **Verified.** ₹100/day for AOC-4 and MGT-7 still applies. Unchanged by the LLP rules below. |
| LLP Form 11 due 30 May; Form 8 due 30 October | LLP Act 2008 / LLP Rules 2009 r.24–25 (60 days from FY end; 30 days from end of six months) | **Verified.** |
| LLP late filing attracts an additional fee that increases with the delay | LLP (Second Amendment) Rules 2022, **G.S.R. 173(E) dated 4 March 2022**, in force 1 April 2022 | **Corrected 2026-10-18.** See below. |
| LLP audit required where turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh | LLP Rules 2009, r.24(8) | **Flagged for professional review.** See below. |
| Form ADT-1 filed for the first auditor | Companies (Audit and Auditors) Rules 2014, r.4(2) | **Corrected 2026-10-18.** See below. |

### Corrected: the LLP late-filing fee was described as uncapped

Until 31 March 2022 a late LLP Form 8 or Form 11 attracted a flat ₹100 per day
with no ceiling. G.S.R. 173(E) replaced that from 1 April 2022 with an
additional fee set as a multiple of the normal filing fee, rising in bands with
the length of the delay, with a per-day element only once the delay passes 360
days.

Fifteen places on the site still described the old regime — "no upper limit",
"uncapped daily late fees", "a per-day penalty that keeps accruing". That was
wrong by more than four years, on commercial pages, about a cost figure.

The replacement wording says only that the fee **increases with the length of
the delay**. That is true under the banded regime, and it stays true if the
bands are amended again. The site deliberately does **not** state the
multipliers or the ₹ amounts: secondary sources disagree on the detail, and a
number the site cannot source is a number it should not print (master rule 12).

### Corrected: ADT-1 was presented as the first auditor's appointment route

The site said the first auditor "must be appointed within 30 days **through
Form ADT-1**". Two problems. The appointment is made by the board, by
resolution — ADT-1 is a notice to the Registrar, not the appointment. And
r.4(2) of the Companies (Audit and Auditors) Rules 2014 ties that notice to
s.139(1), the AGM appointment; it does not refer to s.139(6), which governs the
first auditor. Filing ADT-1 for a first auditor is widely treated as prudent
practice rather than an express statutory duty, and the position is
unsettled.

The 30-day deadline is real and is kept. What changed is that the site no
longer asserts a filing obligation the rules do not clearly impose. ADT-1 now
appears once, in `lib/secondary-services.ts`, describing what Raulji Group
files as part of its compliance service — a description of our own work, not a
statement of the client's legal duty.

### Flagged, not changed: the LLP audit threshold reading

Rule 24(8) exempts an LLP "whose turnover does not exceed... forty lakh rupees,
**or** whose contribution does not exceed twenty-five lakh rupees". Read
literally, the exemption applies if *either* limit is respected, so an audit
would be required only where turnover exceeds ₹40 lakh **and** contribution
exceeds ₹25 lakh. Most professional firms state the opposite — audit required
if *either* is exceeded — and that is what the site says.

This is a genuine interpretational split, not a drafting slip on our side, so
it is **not** something to resolve by picking the reading we prefer. The site
keeps the conservative version, which errs toward more compliance and is the
safer thing to tell a prospective client. **It needs sign-off from a practising
CA or CS before the next content review**, and if they take the literal
reading, the wording appears in `lib/comparison.ts`, `lib/services.ts`,
`lib/city-services.ts`, `lib/secondary-services.ts` and four blog articles.

## Re-check schedule

Check every citation at each quarterly content review, and whenever an article
that carries one is edited. Record the date in the Browser check column above.
