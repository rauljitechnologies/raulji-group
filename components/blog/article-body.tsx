import Link from "next/link";
import { ArrowRight, Check, CircleAlert, Info, Lightbulb, Zap } from "lucide-react";

import { RichText } from "@/components/blog/rich-text";
import type { Block } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Renders an article body from its blocks.
 *
 * Every block type here earns its place by doing something a paragraph cannot:
 * a table stays a table on a phone inside its own scroll container, an answer
 * block puts the direct response to a heading where an answer engine will find
 * it, a checklist is a list of things to do rather than a list of things that
 * are true. Anything that is only prose is a paragraph.
 *
 * Jumping to a heading from the contents list is handled once, by the
 * `scroll-padding-top` on <html>, rather than per heading here.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-10">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2
          id={block.id}
          className="mt-14 border-t border-border pt-10 text-2xl leading-snug md:text-[1.75rem]"
        >
          {block.text}
        </h2>
      );

    case "h3":
      return <h3 className="mt-9 text-lg md:text-xl">{block.text}</h3>;

    case "p":
      return (
        <p className="mt-5 leading-[1.75] text-muted-foreground">
          <RichText text={block.text} />
        </p>
      );

    case "answer":
      /* The direct answer to the heading above. Visually the loudest thing in
         the body, because for most readers it is the whole reason they are
         here, and it is what an answer engine should lift. */
      return (
        <div className="mt-6 rounded-2xl border-l-4 border-primary bg-accent/60 p-5 sm:p-6">
          <p className="text-[0.9375rem] font-medium leading-[1.7] text-secondary">
            <RichText text={block.text} />
          </p>
        </div>
      );

    case "list":
      return block.ordered ? (
        <ol className="mt-5 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 leading-[1.75] text-muted-foreground">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent text-xs font-bold text-accent-foreground">
                {i + 1}
              </span>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="mt-5 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 leading-[1.75] text-muted-foreground">
              <span
                aria-hidden="true"
                className="mt-[0.6875rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return <TableBlock block={block} />;

    case "steps":
      return (
        <ol className="mt-6 space-y-4">
          {block.items.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="text-base leading-snug">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">
                  <RichText text={step.body} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "checklist":
      return (
        <div className="mt-6 rounded-2xl border border-border bg-muted/60 p-5 sm:p-6">
          <h3 className="text-base">{block.title}</h3>
          <ul className="mt-4 space-y-2.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-muted-foreground">
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "example":
      return (
        <Callout
          icon={<Lightbulb className="h-4 w-4" aria-hidden="true" />}
          eyebrow="Example"
          title={block.title}
          text={block.text}
          tone="example"
        />
      );

    case "warning":
      return (
        <Callout
          icon={<CircleAlert className="h-4 w-4" aria-hidden="true" />}
          eyebrow="Watch out"
          title={block.title}
          text={block.text}
          tone="warning"
        />
      );

    case "note":
      return (
        <Callout
          icon={<Info className="h-4 w-4" aria-hidden="true" />}
          eyebrow="Note"
          title={block.title}
          text={block.text}
          tone="note"
        />
      );

    case "links":
      return (
        <aside className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            {block.title}
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col rounded-xl border border-border px-4 py-3.5 transition-colors hover:border-primary/50 hover:bg-accent/40"
                >
                  <span className="flex items-center gap-1.5 font-semibold text-secondary">
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  </span>
                  <span className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      );
  }
}

function Callout({
  icon,
  eyebrow,
  title,
  text,
  tone,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  text: string;
  tone: "example" | "warning" | "note";
}) {
  return (
    <aside
      className={cn(
        "mt-7 rounded-2xl border p-5 sm:p-6",
        tone === "warning" && "border-destructive/25 bg-destructive/[0.04]",
        tone === "example" && "border-border bg-muted/70",
        tone === "note" && "border-primary/25 bg-accent/40",
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider",
          tone === "warning" ? "text-destructive/80" : "text-primary",
        )}
      >
        {icon}
        {eyebrow}
      </p>
      <h3 className="mt-2.5 text-base leading-snug">{title}</h3>
      <p className="mt-2 leading-relaxed text-muted-foreground">
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
    <figure className="mt-7">
      <div
        tabIndex={0}
        role="region"
        aria-label={block.caption ?? "Comparison table"}
        className="overflow-x-auto rounded-2xl border border-border"
      >
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-secondary text-secondary-foreground">
              {block.columns.map((column, i) => (
                <th
                  key={i}
                  scope="col"
                  className={cn(
                    "px-4 py-3 align-bottom font-semibold",
                    i === 0 && block.rowHeader && "sticky left-0 z-10 bg-secondary",
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
              const zebra = r % 2 === 1 ? "bg-muted/50" : "bg-card";
              return (
                <tr key={r} className={cn("border-t border-border", zebra)}>
                  {row.map((cell, c) =>
                    c === 0 && block.rowHeader ? (
                      <th
                        key={c}
                        scope="row"
                        className={cn(
                          "sticky left-0 z-10 px-4 py-3 align-top font-semibold text-secondary",
                          zebra,
                        )}
                      >
                        <RichText text={cell} />
                      </th>
                    ) : (
                      <td
                        key={c}
                        className="px-4 py-3 align-top leading-relaxed text-muted-foreground"
                      >
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
        <figcaption className="mt-2.5 text-sm text-muted-foreground">{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}
