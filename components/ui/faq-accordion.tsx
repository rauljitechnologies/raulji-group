import { Plus } from "lucide-react";

import type { FAQ } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * Native details/summary accordion.
 *
 * Chosen over a JS accordion deliberately: it is keyboard accessible and
 * screen-reader correct with no client bundle, and the answer text stays in the
 * DOM so the visible content matches the FAQPage schema (spec section 30).
 *
 * The control used to be a bare "+" character in the body font, sitting a long
 * way right of the question and nudged with a margin to look level. It read as
 * punctuation rather than something to press, and rotating it produced a small
 * "x" that reads as dismiss rather than collapse. It is now a bordered chip
 * that fills with brand blue when its row is open, which is the same affordance
 * the rest of the site uses for an active control.
 *
 * An open row is also distinguishable at a glance without the chip: the header
 * takes a muted ground and the answer is tied back to its question by a rule
 * down its left edge. Before this, an expanded answer was loose body copy with
 * nothing connecting it to what had been asked.
 *
 * Animation is limited to the chip. Native details cannot animate their own
 * height without script, and the brand rules ask for minimal motion rather than
 * for motion to be added (master rule 24).
 */
export function FaqAccordion({
  faqs,
  idPrefix = "faq",
  className,
}: {
  faqs: FAQ[];
  idPrefix?: string;
  /** For placements that are already inside a column, e.g. `max-w-none`. */
  className?: string;
}) {
  return (
    <div
      className={cn(
        // overflow-hidden so an open or hovered first/last row keeps the card's
        // corner radius instead of painting a square one over it.
        "mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      {faqs.map((faq, i) => (
        <details
          key={faq.q}
          // The tint goes on the row, not the header, so an open question and
          // its answer read as one block rather than a grey strip above white.
          className="group open:bg-muted/50"
          id={`${idPrefix}-${i + 1}`}
          name={idPrefix}
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left",
              "font-semibold text-secondary transition-colors hover:bg-muted/70 sm:px-6 sm:py-5",
              // Safari draws its own disclosure triangle and ignores list-none.
              "marker:hidden [&::-webkit-details-marker]:hidden",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
            )}
          >
            <span className="leading-snug">{faq.q}</span>
            <span
              aria-hidden="true"
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border",
                "bg-background text-primary transition-all duration-200",
                "group-hover:border-primary/40",
                "group-open:rotate-45 group-open:border-primary group-open:bg-primary",
                "group-open:text-primary-foreground",
              )}
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </summary>
          <div className="px-5 pb-6 sm:px-6">
            <p className="border-l-2 border-primary/50 pl-4 leading-relaxed text-muted-foreground">
              {faq.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
