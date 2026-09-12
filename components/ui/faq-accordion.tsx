import type { FAQ } from "@/lib/services";

/**
 * Native details/summary accordion.
 *
 * Chosen over a JS accordion deliberately: it is keyboard accessible and
 * screen-reader correct with no client bundle, and the answer text stays in the
 * DOM so the visible content matches the FAQPage schema (spec section 30).
 */
export function FaqAccordion({ faqs, idPrefix = "faq" }: { faqs: FAQ[]; idPrefix?: string }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
      {faqs.map((faq, i) => (
        <details key={faq.q} className="group" id={`${idPrefix}-${i + 1}`} name={idPrefix}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left font-semibold text-secondary marker:hidden hover:bg-muted/60 sm:px-6">
            <span>{faq.q}</span>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-xl leading-none text-primary transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-5 pb-6 text-muted-foreground sm:px-6">
            <p className="leading-relaxed">{faq.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
