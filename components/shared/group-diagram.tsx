/**
 * Hero visual (spec section 4).
 *
 * A restrained architectural figure rather than stock photography: one group
 * mark at the top, four structural pillars beneath it rising left to right, and
 * a horizon line. It reads as Group -> Businesses -> Growth -> Future without
 * illustration cliches, ships as inline SVG with no JS or image request, and
 * costs nothing in LCP.
 *
 * Decorative: labelled aria-hidden, because the same relationship is stated in
 * the hero copy and in the sections below.
 */
export function GroupDiagram({ className }: { className?: string }) {
  const pillars = [
    { x: 24, height: 96, label: "Private Limited" },
    { x: 96, height: 128, label: "LLP" },
    { x: 168, height: 160, label: "Partnership" },
    { x: 240, height: 200, label: "Proprietorship" },
  ];

  return (
    <svg
      viewBox="0 0 340 340"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id="rg-pillar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="hsl(199 64% 51%)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="hsl(199 64% 51%)" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="rg-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(199 64% 51%)" />
          <stop offset="100%" stopColor="hsl(216 48% 18%)" />
        </linearGradient>
        <pattern id="rg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M20 0H0V20"
            fill="none"
            stroke="hsl(216 48% 18%)"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="340" height="340" fill="url(#rg-grid)" rx="24" />

      {/* The group mark: one square, rotated, holding the structure together. */}
      <g transform="translate(170 62)">
        <rect
          x="-30"
          y="-30"
          width="60"
          height="60"
          rx="14"
          transform="rotate(45)"
          fill="url(#rg-core)"
        />
        <rect
          x="-46"
          y="-46"
          width="92"
          height="92"
          rx="20"
          transform="rotate(45)"
          fill="none"
          stroke="hsl(199 64% 51%)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
      </g>

      {/* Connectors from the group mark down to each structure. */}
      <g stroke="hsl(199 64% 51%)" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
        {pillars.map((pillar) => (
          <path
            key={pillar.label}
            d={`M170 122 V 148 H ${pillar.x + 26} V ${300 - pillar.height}`}
          />
        ))}
      </g>

      {/* Four structures, rising towards the future. */}
      {pillars.map((pillar) => (
        <g key={pillar.label}>
          <rect
            x={pillar.x}
            y={300 - pillar.height}
            width="52"
            height={pillar.height}
            rx="10"
            fill="url(#rg-pillar)"
            stroke="hsl(199 64% 51%)"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <circle cx={pillar.x + 26} cy={300 - pillar.height} r="4" fill="hsl(199 64% 51%)" />
        </g>
      ))}

      <line
        x1="12"
        y1="300"
        x2="328"
        y2="300"
        stroke="hsl(216 48% 18%)"
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
