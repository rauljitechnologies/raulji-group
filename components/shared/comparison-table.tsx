import Link from "next/link";
import { COMPARISON_ROWS } from "@/lib/comparison";
import { SERVICES } from "@/lib/services";

/**
 * Structure comparison (spec section 18).
 * Wide content scrolls inside its own container so the page body never scrolls
 * horizontally on a phone.
 */
export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
        <caption className="sr-only">
          Comparison of Private Limited Company, LLP, Partnership Firm and Proprietorship
        </caption>
        <thead>
          <tr className="border-b border-border bg-muted">
            <th scope="col" className="px-5 py-4 font-semibold text-secondary">
              Feature
            </th>
            {SERVICES.map((service) => (
              <th key={service.slug} scope="col" className="px-5 py-4 font-semibold text-secondary">
                <Link href={service.path} className="link-target hover:text-primary hover:underline">
                  {service.shortName}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {COMPARISON_ROWS.map((row) => (
            <tr key={row.feature} className="align-top">
              <th scope="row" className="px-5 py-4 font-semibold text-secondary">
                {row.feature}
              </th>
              <td className="px-5 py-4 leading-relaxed text-muted-foreground">{row.pvt}</td>
              <td className="px-5 py-4 leading-relaxed text-muted-foreground">{row.llp}</td>
              <td className="px-5 py-4 leading-relaxed text-muted-foreground">{row.partnership}</td>
              <td className="px-5 py-4 leading-relaxed text-muted-foreground">{row.proprietorship}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
