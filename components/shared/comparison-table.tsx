import Link from "next/link";
import { COMPARISON_ROWS } from "@/lib/comparison";
import { SERVICES } from "@/lib/services";

/**
 * Structure comparison (spec sections 21, 39).
 *
 * Two renderings of the same data, because a five-column table cannot be made
 * readable at 320px without shrinking the text past the point of usefulness:
 *
 *  - md and up: the full side-by-side table, scrolling inside its own container
 *    with the feature column pinned so the row label never scrolls away.
 *  - below md: one two-column table per structure, feature against value.
 *
 * Both are real `<table>` elements with `<th scope>`, not divs. Only one is in
 * the accessibility tree at a time, so a screen reader never reads it twice.
 */
export function ComparisonTable() {
  return (
    <>
      {/* Tablet and desktop */}
      <div
        className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block"
        tabIndex={0}
        role="region"
        aria-label="Business structure comparison, scrollable"
      >
        <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparison of Private Limited Company, LLP, Partnership Firm and Proprietorship
          </caption>
          <thead>
            <tr className="border-b border-border bg-muted">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-muted px-5 py-4 font-semibold text-secondary"
              >
                Feature
              </th>
              {SERVICES.map((service) => (
                <th
                  key={service.slug}
                  scope="col"
                  className="px-5 py-4 font-semibold text-secondary"
                >
                  <Link
                    href={service.path}
                    className="link-target hover:text-primary hover:underline"
                  >
                    {service.shortName}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.feature} className="align-top">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-5 py-4 font-semibold text-secondary"
                >
                  {row.feature}
                </th>
                <td className="px-5 py-4 leading-relaxed text-muted-foreground">{row.pvt}</td>
                <td className="px-5 py-4 leading-relaxed text-muted-foreground">{row.llp}</td>
                <td className="px-5 py-4 leading-relaxed text-muted-foreground">
                  {row.partnership}
                </td>
                <td className="px-5 py-4 leading-relaxed text-muted-foreground">
                  {row.proprietorship}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per structure */}
      <div className="space-y-4 md:hidden">
        {SERVICES.map((service) => {
          const key = COLUMN_KEY[service.slug as keyof typeof COLUMN_KEY];
          return (
            <div
              key={service.slug}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="border-b border-border bg-muted px-4 py-3.5">
                <Link
                  href={service.path}
                  className="link-target text-base font-bold text-secondary hover:text-primary hover:underline"
                >
                  {service.shortName}
                </Link>
              </div>
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">{service.shortName} at a glance</caption>
                <tbody className="divide-y divide-border">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="align-top">
                      <th
                        scope="row"
                        className="w-2/5 px-4 py-3.5 font-semibold text-secondary"
                      >
                        {row.feature}
                      </th>
                      <td className="px-4 py-3.5 leading-relaxed text-muted-foreground">
                        {row[key]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
}

/** Maps a service slug to its column in COMPARISON_ROWS. */
const COLUMN_KEY = {
  "pvt-registration": "pvt",
  "llp-registration": "llp",
  "partnership-registration": "partnership",
  "proprietorship-registration": "proprietorship",
} as const;
