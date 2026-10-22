import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Tag ID resolution.
 *
 * The behaviour that matters: a production deployment gets the container
 * without anyone having to remember an environment variable -- which is why
 * the live site was collecting nothing -- while previews and local development
 * still get nothing, because preview traffic in a real analytics property is
 * worse than no traffic.
 */

let mod: typeof import("@/lib/tags");

async function load() {
  vi.resetModules();
  mod = await import("@/lib/tags");
  return mod;
}

afterEach(() => vi.unstubAllEnvs());

describe("gtmContainerId", () => {
  it("uses an explicit NEXT_PUBLIC_GTM_ID above everything else", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-EXPLICIT");
    vi.stubEnv("VERCEL_ENV", "production");
    expect((await load()).gtmContainerId()).toBe("GTM-EXPLICIT");
  });

  it("falls back to the known container on a Vercel production deployment", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    vi.stubEnv("VERCEL_ENV", "production");
    const m = await load();
    expect(m.gtmContainerId()).toBe(m.GTM_CONTAINER_ID);
    expect(m.GTM_CONTAINER_ID).toBe("GTM-MSW79R28");
  });

  it("loads nothing on a preview deployment", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    vi.stubEnv("VERCEL_ENV", "preview");
    expect((await load()).gtmContainerId()).toBeUndefined();
  });

  it("loads nothing locally", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    vi.stubEnv("VERCEL_ENV", "");
    expect((await load()).gtmContainerId()).toBeUndefined();
  });

  it("still honours an explicit id on a preview, for deliberate testing", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-MSW79R28");
    vi.stubEnv("VERCEL_ENV", "preview");
    expect((await load()).gtmContainerId()).toBe("GTM-MSW79R28");
  });

  it("treats a whitespace-only value as unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "   ");
    vi.stubEnv("VERCEL_ENV", "preview");
    expect((await load()).gtmContainerId()).toBeUndefined();
  });
});

describe("ga4MeasurementId", () => {
  it("has NO production fallback, because a second Google tag double-counts", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA4_MEASUREMENT_ID", "");
    vi.stubEnv("VERCEL_ENV", "production");
    expect((await load()).ga4MeasurementId()).toBeUndefined();
  });

  it("switches on only when set deliberately", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA4_MEASUREMENT_ID", "G-SK8N5N3WE2");
    expect((await load()).ga4MeasurementId()).toBe("G-SK8N5N3WE2");
  });

  it("records the owner's measurement id as a constant for documentation", async () => {
    expect((await load()).GA4_MEASUREMENT_ID).toBe("G-SK8N5N3WE2");
  });
});
