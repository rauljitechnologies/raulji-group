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

## Re-check schedule

Check every citation at each quarterly content review, and whenever an article
that carries one is edited. Record the date in the Browser check column above.
