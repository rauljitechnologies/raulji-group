import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";

/**
 * Branded Open Graph card. Always shows "Raulji Group" plus the page headline,
 * so a shared link is readable rather than a generic stock image.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title")?.slice(0, 120) ?? SITE.tagline;
  const title = rawTitle.trim() || SITE.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #192A42 0%, #0F1B2B 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 14,
              height: 56,
              borderRadius: 7,
              background: "linear-gradient(180deg, #3199D4 0%, #1F6FA8 100%)",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#FFFFFF", fontSize: 38, fontWeight: 700, letterSpacing: -0.5 }}>
              Raulji Group
            </span>
            <span style={{ color: "#8FB6D4", fontSize: 20 }}>raulji.com</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#FFFFFF",
            fontSize: title.length > 62 ? 58 : 70,
            fontWeight: 700,
            lineHeight: 1.14,
            letterSpacing: -1.5,
            maxWidth: 1010,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#8FB6D4", fontSize: 24 }}>
          {/*
            Consulting first, then registration. This strap read "Business
            registration across Gujarat", which is the one claim the rest of the
            site spends its homepage correcting: the group is consulting-led and
            is not Gujarat-only (master rule 5 and 39). The OG card is the
            description that travels furthest, into shares, previews and AI
            summaries, so a contradiction here undoes the positioning everywhere
            else (brief section 10).
          */}
          <span style={{ display: "flex" }}>Business consulting and business registration</span>
          <span style={{ display: "flex", color: "#3199D4" }}>|</span>
          <span style={{ display: "flex" }}>{SITE.phone.display}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
