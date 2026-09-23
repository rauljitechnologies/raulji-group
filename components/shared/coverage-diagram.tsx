/**
 * How the group reaches a business anywhere in the state.
 *
 * Not a map. An accurate Gujarat outline would need boundary data we do not
 * hold, and an approximated one would be wrong in a way readers here would
 * notice. This draws the thing that is actually true and is what the copy
 * says: the work is filed through the MCA portal from Vadodara, and the
 * markets sit around that, at no particular distance from it, because filing
 * online makes distance irrelevant.
 *
 * Built in brand colours as inline SVG rather than sourced imagery: the brand
 * rules rule out stock photography, and there is no photograph of "statewide
 * coverage" that would not be a stock office picture (master rule 1).
 */

const BLUE = "hsl(199 64% 51%)";
const NAVY = "hsl(216 48% 18%)";
const MUTED = "hsl(216 20% 46%)";

/** Positions are composition, not geography, and are deliberately even. */
const MARKETS = [
  "Ahmedabad",
  "Surat",
  "Rajkot",
  "Gandhinagar",
  "Bhavnagar",
  "Jamnagar",
  "Bharuch",
  "Anand",
];

export function CoverageDiagram({ className }: { className?: string }) {
  const cx = 190;
  const cy = 190;
  const radius = 132;

  return (
    <svg
      viewBox="-46 0 472 380"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="cd-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={BLUE} />
          <stop offset="100%" stopColor={NAVY} />
        </linearGradient>
        <pattern id="cd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={NAVY} strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="-46" y="0" width="472" height="380" rx="24" fill="url(#cd-grid)" />

      {/* Two rings, drawn only to hold the markets at an even distance. */}
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke={BLUE} strokeOpacity="0.2" />
      <circle
        cx={cx}
        cy={cy}
        r={radius - 46}
        fill="none"
        stroke={BLUE}
        strokeOpacity="0.14"
        strokeDasharray="4 6"
      />

      {MARKETS.map((market, i) => {
        const angle = (i / MARKETS.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const isRight = Math.cos(angle) > 0.1;
        const isCentreColumn = Math.abs(Math.cos(angle)) <= 0.1;
        return (
          <g key={market}>
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={BLUE}
              strokeOpacity="0.28"
              strokeWidth="1.5"
            />
            <circle cx={x} cy={y} r="6" fill={BLUE} />
            <circle cx={x} cy={y} r="11" fill={BLUE} fillOpacity="0.15" />
            <text
              x={isCentreColumn ? x : isRight ? x + 16 : x - 16}
              y={isCentreColumn ? (Math.sin(angle) > 0 ? y + 24 : y - 16) : y + 4}
              textAnchor={isCentreColumn ? "middle" : isRight ? "start" : "end"}
              fill={MUTED}
              fontSize="12"
              fontWeight="600"
            >
              {market}
            </text>
          </g>
        );
      })}

      {/* Vadodara, where the work is actually done. */}
      <circle cx={cx} cy={cy} r="54" fill="url(#cd-core)" />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">
        Vadodara
      </text>
      <text
        x={cx}
        y={cy + 15}
        textAnchor="middle"
        fill="#fff"
        fillOpacity="0.85"
        fontSize="11"
      >
        Filed online
      </text>
    </svg>
  );
}
