import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/schema";

/**
 * Visible breadcrumb. The trail passed here is the same array used to build
 * BreadcrumbList schema, so the two can never drift apart (spec section 38).
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-wide pt-28 md:pt-32">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {i > 0 ? (
                <ChevronRight className="h-4 w-4 shrink-0 text-border" aria-hidden="true" />
              ) : null}
              {isLast ? (
                <span
                  aria-current="page"
                  className="inline-flex min-h-[1.75rem] items-center py-1 font-medium text-secondary"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="inline-flex min-h-[1.75rem] items-center py-1 hover:text-primary hover:underline"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
