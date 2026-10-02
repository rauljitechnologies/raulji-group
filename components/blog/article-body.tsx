import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { HealthInsuranceCta } from "@/components/blog/health-insurance-cta";
import { RichText } from "@/components/blog/rich-text";
import type { Block } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Renders an article body from its blocks, in the "Raulji Blog Detail"
 * design (claude.ai/design): 17px body copy at 1.8, navy headings, 8px
 * radii, one blue accent, and callouts as a pale blue panel rather than a
 * different colour per type.
 *
 * Every block type here earns its place by doing something a paragraph cannot:
 * a table stays a table on a phone inside its own scroll container, an answer
 * block puts the direct response to a heading where an answer engine will find
 * it, a checklist is a list of things to do rather than a list of things that
 * are true. Anything that is only prose is a paragraph.
 *
 * Headings carry scroll-mt so the fixed header never covers the one you jumped
 * to from the contents list.
 */
export function ArticleBody({
  blocks,
  healthCta,
}: {
  blocks: Block[];
  /** The article's `healthCta`, passed through for `insuranceCta` blocks. */
  healthCta?: { location: string; trackingLabel: string };
}) {
  return (
    <div className="flex flex-col gap-[1.375rem] text-[1.0625rem] leading-[1.8] text-[#3a4656]">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} healthCta={healthCta} />
      ))}
    </div>
  );
}

const H2 =
  "mt-6 scroll-mt-32 text-balance text-[1.625rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#122640] md:text-[2rem]";
const PANEL = "rounded-lg border border-[#bcd9ea] bg-[#f4f9fc] px-5 py-5 sm:px-[1.625rem] sm:py-[1.375rem]";
const EYEBROW = "text-xs font-bold uppercase tracking-[0.12em] text-[#1a7cb0]";

function BlockView({
  block,
  healthCta,
}: {
  block: Block;
  healthCta?: { location: string; trackingLabel: string };
}) {
  switch (block.kind) {
    case "insuranceCta":
      return healthCta ? (
        <HealthInsuranceCta
          variant="inline"
          location={healthCta.location}
          trackingLabel={healthCta.trackingLabel}
        />
      ) : null;

    case "h2":
      return (
        <h2 id={block.id} className={H2}>
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="mt-2 text-lg font-bold leading-snug text-[#122640] md:text-xl">{block.text}</h3>
      );

    case "p":
      return (
        <p className="text-pretty">
          <RichText text={block.text} />
        </p>
      );

    case "answer":
      /* The direct answer to the heading above, pulled out so a reader, and an
         answer engine, can lift it without reading the section. */
      return (
        <div className="rounded-lg bg-[#f4f7fa] px-5 py-5 sm:px-7 sm:py-6">
          <p className="text-base font-medium leading-[1.7] text-[#122640]">
            <RichText text={block.text} />
          </p>
        </div>
      );

    case "list":
      return block.ordered ? (
        <ol className="flex list-decimal flex-col gap-2.5 pl-[1.375rem] marker:font-semibold marker:text-[#1a7cb0]">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <RichText text={item} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="flex list-disc flex-col gap-2.5 pl-[1.375rem] marker:text-[#329fd2]">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );

    case "table":
      return <TableBlock block={block} />;

    case "steps":
      return (
        <ol className="flex flex-col border-t border-[#e3e9ef]">
          {block.items.map((step, i) => (
            <li key={step.title} className="flex gap-4 border-b border-[#e3e9ef] py-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#122640] text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold leading-snug text-[#122640]">{step.title}</h3>
                <p className="mt-1.5 text-base leading-[1.7]">
                  <RichText text={step.body} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "checklist":
      return (
        <div className="rounded-lg border border-[#e3e9ef] px-5 py-5 sm:px-[1.625rem] sm:py-6">
          <p className="text-[0.9375rem] font-bold text-[#122640]">{block.title}</p>
          <ul className="mt-4 flex flex-col gap-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-base leading-[1.65]">
                <span
                  aria-hidden="true"
                  className="mt-[0.1875rem] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f5fb]"
                >
                  <Check className="h-3 w-3 text-[#1a7cb0]" strokeWidth={3} />
                </span>
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "example":
      return <Callout eyebrow="Example" title={block.title} text={block.text} />;

    case "warning":
      return <Callout eyebrow="Watch out" title={block.title} text={block.text} />;

    case "note":
      return <Callout eyebrow="Note" title={block.title} text={block.text} />;

    case "links":
      return (
        <aside className="rounded-lg border border-[#e3e9ef] px-5 py-5 sm:px-[1.625rem] sm:py-6">
          <p className={EYEBROW}>{block.title}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-lg border border-[#e3e9ef] bg-white px-4 py-3.5 transition-colors duration-200 hover:border-[#329fd2]"
                >
                  <span className="flex items-center gap-1.5 text-[0.9375rem] font-bold leading-snug text-[#122640]">
                    {item.label}
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-[#1a7cb0] transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 text-sm leading-relaxed">{item.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      );
  }
}

/** The design's one callout: a pale blue panel with a bold title. */
function Callout({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <aside className={cn(PANEL, "flex flex-col gap-2")}>
      <p className={EYEBROW}>{eyebrow}</p>
      <p className="text-[0.9375rem] font-bold leading-snug text-[#122640]">{title}</p>
      <p className="text-[0.9375rem] leading-[1.7]">
        <RichText text={text} />
      </p>
    </aside>
  );
}

/**
 * A comparison table.
 *
 * Stays a table at every width rather than collapsing into cards on a phone,
 * because a four-way structure comparison read column by column is not the
 * same information. It scrolls inside its own container, the container is
 * focusable and labelled so a keyboard user can reach the scroll, and the
 * first column sticks so the row you are reading stays identified as you move
 * across. The page itself never scrolls sideways.
 */
function TableBlock({ block }: { block: Extract<Block, { kind: "table" }> }) {
  return (
    <figure className="my-2">
      <div
        tabIndex={0}
        role="region"
        aria-label={block.caption ?? "Comparison table"}
        className="overflow-x-auto rounded-lg border border-[#e3e9ef]"
      >
        <table className="w-full min-w-[38.75rem] border-collapse text-left text-sm leading-[1.55]">
          <thead>
            <tr className="bg-[#122640] text-white">
              {block.columns.map((column, i) => (
                <th
                  key={i}
                  scope="col"
                  className={cn(
                    "px-4 py-3.5 align-bottom font-semibold",
                    i === 0 && block.rowHeader && "sticky left-0 z-10 bg-[#122640]",
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, r) => {
              /* The zebra stripe is computed rather than written as `even:`,
                 because the sticky first column paints its own opaque
                 background over the row's and the two have to agree. */
              const zebra = r % 2 === 1 ? "bg-[#f9fbfc]" : "bg-white";
              return (
                <tr key={r} className={cn("border-t border-[#e3e9ef]", zebra)}>
                  {row.map((cell, c) =>
                    c === 0 && block.rowHeader ? (
                      <th
                        key={c}
                        scope="row"
                        className={cn("sticky left-0 z-10 px-4 py-3.5 align-top font-bold text-[#122640]", zebra)}
                      >
                        <RichText text={cell} />
                      </th>
                    ) : (
                      <td key={c} className="px-4 py-3.5 align-top">
                        <RichText text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {block.caption ? (
        <figcaption className="mt-2.5 text-[0.8125rem] text-[#5b6778]">{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}
