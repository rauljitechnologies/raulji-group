import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * The masthead every inner page starts with: breadcrumb trail, optional
 * eyebrow, H1 and lead, in one banded block.
 *
 * It exists because each page had been building its own, and they had drifted
 * into `container-wide max-w-4xl` on a single element. `container-wide` already
 * centres a 80rem column, so narrowing the same element to 56rem kept the
 * centring and pushed the H1 about 170px in from the page gutter, while the
 * breadcrumbs above it and every section below it stayed at the gutter. The
 * page title ended up as the one thing on the page that was not aligned to
 * anything.
 *
 * Here the container and the measure are separate elements: the block starts at
 * the gutter like everything else, and the text still wraps at a readable
 * width.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Anything that belongs in the header band: jump links, a CTA row, a badge. */
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-border bg-muted">
      <div className="container-wide pb-10 pt-28 md:pb-14 md:pt-32">
        <Breadcrumbs crumbs={crumbs} inline />

        <div className="mt-6 max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
          ) : null}
          <h1
            className={cn(
              "text-[1.875rem] leading-[1.2] md:text-4xl md:leading-[1.15] lg:text-5xl lg:leading-[1.1]",
              eyebrow && "mt-4",
            )}
          >
            {title}
          </h1>
          {lead ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{lead}</p>
          ) : null}
        </div>

        {children}
      </div>
    </header>
  );
}
