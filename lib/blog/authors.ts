import type { ArticleAuthor } from "./types";
import { SITE, LEADERSHIP } from "@/lib/site";

/**
 * Article bylines.
 *
 * Two, and only two. The brief assigns the business articles to Raulji Group on
 * the main line, and the health insurance article to Dharmendrasinh Raulji on a
 * separate mobile number.
 *
 * `context` is one factual line each. No invented biography, no credentials, no
 * years of experience, no client counts (master rule 13). If a real biography is
 * confirmed later it belongs on /team/ first, and can be referenced from here.
 */

export const GROUP_AUTHOR: ArticleAuthor = {
  name: SITE.name,
  phone: { display: SITE.phone.display, e164: SITE.phone.e164 },
  context:
    "Raulji Group prepares and files business registrations and advises on the structure behind them. These guides are written by the people who handle the filings.",
};

/**
 * The insurance byline. The number here is deliberately different from the
 * group line and is used on the health insurance article only.
 */
export const INSURANCE_AUTHOR: ArticleAuthor = {
  name: LEADERSHIP.chairman.name,
  phone: { display: "+91 9558855668", e164: "+919558855668" },
  context:
    "Dharmendrasinh Raulji is Chairman of Raulji Group and handles its insurance advisory enquiries directly.",
};
