/**
 * The site's type scale, taken from the homepage (app/page.tsx) so every page
 * sets its headings the same way. Plus Jakarta Sans is loaded once in
 * app/layout.tsx; these set the size, weight, line-height and tracking on top
 * of it.
 *
 * Colour is left to the caller for H1, because it sits on a light hero on the
 * homepage and a navy hero everywhere else.
 */

/** Page title. One per page. */
export const H1 =
  "text-balance text-[2.375rem] font-extrabold leading-[1.06] tracking-[-0.025em] sm:text-5xl/[1.06] xl:text-[4rem]";

/**
 * Page title for long headlines, such as blog articles, where the full H1
 * size would wrap to four or five lines. Same weight and tracking, smaller.
 */
export const H1_LONG =
  "text-balance text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.025em] sm:text-4xl/[1.12] lg:text-[2.75rem]";

/** Section heading. */
export const H2 =
  "text-balance text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#122640] sm:text-4xl/[1.12] lg:text-[2.75rem]";
export const H2_DARK =
  "text-balance text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl/[1.12] lg:text-[2.75rem]";

/** Eyebrow above a heading. */
export const EYEBROW_TEXT = "text-xs font-semibold uppercase tracking-[0.14em]";

/** The paragraph under a page title. */
export const LEAD = "text-pretty text-base/[1.7] sm:text-lg/[1.7]";
