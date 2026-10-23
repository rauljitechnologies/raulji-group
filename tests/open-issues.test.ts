import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CONSENT_BANNER_ID, CONSENT_KEY, consentBannerRevealScript, readConsent } from "@/lib/consent";
import { ConsentBanner } from "@/components/layout/consent-banner";

/**
 * Regression tests for the open-issues pass of 23 Oct 2026
 * (docs/seo-ai-issue-tracker.md, SAI-04, SAI-15 and SAI-27).
 *
 * The banner's paint timing and its height on a phone are checked in a real
 * browser and recorded in the tracker; these tests hold the contract that
 * makes them possible.
 */

type Storage = { getItem: (k: string) => string | null };

/** Runs the reveal script against a fake banner and storage, returns `hidden`. */
function reveal(storage: Storage | "throws", bannerPresent = true): boolean | null {
  const banner = bannerPresent ? { hidden: true } : null;
  const document = { getElementById: (id: string) => (id === CONSENT_BANNER_ID ? banner : null) };
  const localStorage =
    storage === "throws"
      ? {
          getItem: () => {
            throw new Error("SecurityError");
          },
        }
      : storage;
  new Function("document", "localStorage", consentBannerRevealScript())(document, localStorage);
  return banner ? banner.hidden : null;
}

const stored = (value: string | null): Storage => ({ getItem: (k) => (k === CONSENT_KEY ? value : null) });

const CASES: [string, Storage | "throws", boolean][] = [
  ["nothing stored", stored(null), false],
  ["granted", stored(JSON.stringify({ choice: "granted", at: "2026-10-23" })), true],
  ["analytics only", stored(JSON.stringify({ choice: "analytics_only" })), true],
  ["denied", stored(JSON.stringify({ choice: "denied" })), true],
  ["unknown choice", stored(JSON.stringify({ choice: "maybe" })), false],
  ["unreadable JSON", stored("{not json"), false],
  ["JSON null", stored("null"), false],
  ["storage blocked", "throws", false],
];

describe("SAI-04: the consent banner is revealed before first paint", () => {
  afterEach(() => vi.unstubAllGlobals());

  for (const [name, storage, staysHidden] of CASES) {
    it(`${name}: ${staysHidden ? "stays hidden" : "is shown"}, as readConsent() decides`, () => {
      expect(reveal(storage)).toBe(staysHidden);
      // The component's effect uses readConsent(); both must agree, or React
      // would hide a banner the script showed (or the reverse).
      vi.stubGlobal("window", {});
      vi.stubGlobal("localStorage", storage === "throws" ? { getItem: () => { throw new Error("x"); } } : storage);
      expect(readConsent() !== null).toBe(staysHidden);
    });
  }

  it("does nothing when the banner is not on the page", () => {
    expect(() => reveal(stored(null), false)).not.toThrow();
  });

  it("is in the server HTML, hidden, with the reveal script after it", () => {
    const html = renderToStaticMarkup(createElement(ConsentBanner));
    const banner = html.indexOf(`id="${CONSENT_BANNER_ID}"`);
    const script = html.indexOf("<script>");
    expect(banner).toBeGreaterThan(-1);
    expect(html.slice(0, script)).toMatch(new RegExp(`<div id="${CONSENT_BANNER_ID}" hidden=""`));
    expect(script).toBeGreaterThan(banner);
  });
});

describe("SAI-15: the banner's buttons share one row on a phone", () => {
  it("uses a three-column grid below sm and the original row from sm up", () => {
    const html = renderToStaticMarkup(createElement(ConsentBanner));
    expect(html).toContain("grid grid-cols-3 gap-2 sm:flex sm:flex-row");
    // Same three choices, same order, wording unchanged.
    expect([...html.matchAll(/<button[^>]*>([^<]+)<\/button>/g)].map((m) => m[1])).toEqual([
      "Decline",
      "Analytics only",
      "Accept all",
    ]);
  });
});

describe("SAI-27: text fields are 16px on phones so iOS does not zoom on focus", () => {
  const FIELDS: [string, RegExp][] = [
    ["components/forms/lead-form.tsx", /const fieldClass =\s*"([^"]+)"/],
    ["components/forms/contact-wizard.tsx", /const inputClass =\s*"([^"]+)"/],
    ["components/shared/gujarat-city-finder.tsx", /id="city-search"[\s\S]*?className="([^"]+)"/],
    ["components/blog/blog-index.tsx", /id="guide-search"[\s\S]*?className="([^"]+)"/],
  ];
  for (const [file, pattern] of FIELDS) {
    it(file, () => {
      const classes = readFileSync(file, "utf8").match(pattern)?.[1] ?? "";
      // The unprefixed (mobile) size must be text-base; any smaller size has
      // to carry a breakpoint prefix.
      const unprefixedSizes = classes.split(/\s+/).filter((c) => /^text-(xs|sm|base|\[[\d.]+rem\])$/.test(c));
      expect(unprefixedSizes).toEqual(["text-base"]);
    });
  }
});
