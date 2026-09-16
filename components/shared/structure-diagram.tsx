/**
 * How each business structure is put together: who owns it, who runs it, and
 * where personal liability stops.
 *
 * Built rather than sourced. The brand rules rule out stock photography and
 * generic illustration (master rule 1), and a photograph of an office would say
 * nothing about a structure anyway. These carry the one thing a reader is
 * actually trying to work out on these pages, so they earn their place instead
 * of decorating it.
 *
 * Inline SVG: no image request, nothing to lazy-load, no layout shift, and the
 * colours follow the brand tokens. Decorative by default — every relationship
 * drawn here is also stated in the copy beside it — so it is aria-hidden unless
 * a `title` is passed.
 */

import { cn } from "@/lib/utils";

const NAVY = "hsl(216 48% 18%)";
const BLUE = "hsl(199 64% 51%)";
const MUTED = "hsl(216 20% 46%)";

export type StructureKind = "pvt" | "llp" | "partnership" | "proprietorship";

/** Maps the four registration slugs onto the four figures. */
export const STRUCTURE_BY_SLUG: Record<string, StructureKind> = {
  "pvt-registration": "pvt",
  "llp-registration": "llp",
  "partnership-registration": "partnership",
  "proprietorship-registration": "proprietorship",
};

const FIGURES: Record<
  StructureKind,
  {
    /** Owner row: what the owners are called and how many are drawn. */
    owners: { label: string; count: number };
    /** The entity in the middle. */
    entity: { label: string; sub: string };
    /** Whether a liability shield is drawn between owners and the entity. */
    shield: string | null;
    /** The line under the figure. */
    note: string;
  }
> = {
  pvt: {
    owners: { label: "Shareholders", count: 3 },
    entity: { label: "Private Limited Company", sub: "Separate legal entity" },
    shield: "Liability limited to unpaid share capital",
    note: "Directors run it. Shareholders own it. The two can be the same people.",
  },
  llp: {
    owners: { label: "Partners", count: 2 },
    entity: { label: "LLP", sub: "Separate legal entity" },
    shield: "Liability limited to agreed contribution",
    note: "Partners both own and run it, under the LLP agreement.",
  },
  partnership: {
    owners: { label: "Partners", count: 2 },
    entity: { label: "Partnership Firm", sub: "Not a separate legal entity" },
    shield: null,
    note: "Partners are personally liable for the firm's debts, jointly and severally.",
  },
  proprietorship: {
    owners: { label: "Proprietor", count: 1 },
    entity: { label: "The business", sub: "Same person in law" },
    shield: null,
    note: "The owner and the business are one. Personal assets are not separated.",
  },
};

export function StructureDiagram({
  kind,
  className,
  title,
}: {
  kind: StructureKind;
  className?: string;
  /** Pass to expose the figure to assistive technology instead of hiding it. */
  title?: string;
}) {
  const figure = FIGURES[kind];
  const owners = Array.from({ length: figure.owners.count });
  const width = 360;
  const ownerWidth = 84;
  const gap = 16;
  const rowWidth = owners.length * ownerWidth + (owners.length - 1) * gap;
  const rowStart = (width - rowWidth) / 2;

  return (
    <svg
      viewBox="0 0 360 256"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}

      <defs>
        <linearGradient id={`sd-entity-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={BLUE} />
          <stop offset="100%" stopColor={NAVY} />
        </linearGradient>
      </defs>

      {/* Owners */}
      <text
        x={width / 2}
        y="18"
        textAnchor="middle"
        fill={MUTED}
        fontSize="11"
        fontWeight="600"
        letterSpacing="1.2"
      >
        {figure.owners.label.toUpperCase()}
      </text>

      {owners.map((_, i) => {
        const x = rowStart + i * (ownerWidth + gap);
        return (
          <g key={i}>
            <rect
              x={x}
              y="32"
              width={ownerWidth}
              height="48"
              rx="12"
              fill="hsl(199 64% 95%)"
              stroke={BLUE}
              strokeOpacity="0.45"
            />
            {/* A person mark, drawn as a figure rather than a face: this is a
                role in a structure, not a photograph of anybody. */}
            <circle cx={x + ownerWidth / 2} cy="50" r="7" fill={BLUE} />
            <path
              d={`M${x + ownerWidth / 2 - 12} 70 a12 12 0 0 1 24 0 z`}
              fill={BLUE}
              fillOpacity="0.8"
            />
          </g>
        );
      })}

      {/* Connectors from each owner into the entity */}
      {owners.map((_, i) => {
        const x = rowStart + i * (ownerWidth + gap) + ownerWidth / 2;
        return (
          <path
            key={i}
            d={`M${x} 80 C ${x} 110, ${width / 2} 110, ${width / 2} 140`}
            fill="none"
            stroke={BLUE}
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeDasharray={figure.shield ? undefined : "5 4"}
          />
        );
      })}

      {/* Liability shield, where one exists */}
      {figure.shield ? (
        <>
          <line
            x1="40"
            y1="122"
            x2="320"
            y2="122"
            stroke={BLUE}
            strokeOpacity="0.6"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <rect x="120" y="110" width="120" height="24" rx="12" fill="hsl(199 64% 95%)" />
          <text
            x={width / 2}
            y="126"
            textAnchor="middle"
            fill="hsl(199 64% 35%)"
            fontSize="11"
            fontWeight="700"
          >
            LIABILITY SHIELD
          </text>
        </>
      ) : null}

      {/* The entity */}
      <rect
        x="60"
        y="140"
        width="240"
        height="72"
        rx="18"
        fill={`url(#sd-entity-${kind})`}
      />
      <text x={width / 2} y="172" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700">
        {figure.entity.label}
      </text>
      <text
        x={width / 2}
        y="192"
        textAnchor="middle"
        fill="#fff"
        fillOpacity="0.85"
        fontSize="12"
      >
        {figure.entity.sub}
      </text>

      {/* What the absence or presence of the shield means */}
      <text
        x={width / 2}
        y="240"
        textAnchor="middle"
        fill={MUTED}
        fontSize="12"
        fontWeight="600"
      >
        {figure.shield ?? "No liability shield"}
      </text>

    </svg>
  );
}

/**
 * The figure with its caption. The caption is real HTML rather than SVG text so
 * it wraps, scales and is selectable like the rest of the page copy.
 */
export function StructureFigure({
  kind,
  className,
}: {
  kind: StructureKind;
  className?: string;
}) {
  const figure = FIGURES[kind];
  return (
    <figure className={cn("rounded-2xl border border-border bg-card p-5 sm:p-6", className)}>
      <StructureDiagram kind={kind} className="h-auto w-full" />
      <figcaption className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
        {figure.note}
      </figcaption>
    </figure>
  );
}
