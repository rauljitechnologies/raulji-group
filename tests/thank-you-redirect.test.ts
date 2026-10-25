import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CONFIRMATION_BODY, CONFIRMATION_HEADING, THANK_YOU_PATH } from "@/lib/thank-you";
import manifest from "@/lib/generated/sitemap-manifest.json";

/**
 * The standard success flow: every public enquiry form confirms, converts once
 * and redirects to /thank-you/.
 *
 * Three things are checked here, because three things could each break it
 * silently:
 *
 *  1. `recordLeadSuccess` fires exactly one `generate_lead` per confirmed
 *     enquiry, and none at all for a honeypot submission.
 *  2. /thank-you/ is noindex, out of the sitemap, and pushes no analytics of
 *     its own -- so a refresh, a bookmark or a shared link cannot add a lead.
 *  3. Both form components route to the shared constant, from the branch where
 *     the API confirmed capture, and neither of them pushes `generate_lead`
 *     by hand any more.
 *
 * The browser-level behaviour -- that the router actually navigates, that the
 * panel is announced -- is checked in a real browser and recorded in
 * docs/form-inventory.md. These tests hold the contract underneath it.
 */

const LEAD_FORM = readFileSync("components/forms/lead-form.tsx", "utf8");
const WIZARD = readFileSync("components/forms/contact-wizard.tsx", "utf8");
const THANK_YOU_PAGE = readFileSync("app/thank-you/page.tsx", "utf8");

function installBrowser(href = "https://www.raulji.com/contact/") {
  const store = new Map<string, string>();
  const url = new URL(href);
  const dataLayer: Record<string, unknown>[] = [];
  vi.stubGlobal("window", {
    location: { href, origin: url.origin, pathname: url.pathname },
    dataLayer,
  });
  vi.stubGlobal("document", { title: "Contact", referrer: "", cookie: "" });
  vi.stubGlobal("sessionStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  });
  return dataLayer;
}

let leadSuccess: typeof import("@/lib/lead-success");

beforeEach(async () => {
  vi.resetModules();
  leadSuccess = await import("@/lib/lead-success");
});

afterEach(() => vi.unstubAllGlobals());

const confirmed = {
  formId: "lead_form",
  formName: "Enquiry form",
  sourcePage: "/vadodara/",
  registrationType: "LLP",
  city: "Vadodara",
  submissionId: "lead_abc123",
  duplicate: false,
};

const leadEvents = (dataLayer: Record<string, unknown>[]) =>
  dataLayer.filter((e) => e.event === "generate_lead");

describe("recordLeadSuccess: one confirmed enquiry, one conversion", () => {
  it("pushes exactly one generate_lead", () => {
    const dataLayer = installBrowser();
    expect(leadSuccess.recordLeadSuccess(confirmed)).toBe(true);
    expect(leadEvents(dataLayer)).toHaveLength(1);
    expect(dataLayer.filter((e) => e.event === "form_submit")).toHaveLength(1);
  });

  it("does not push a second one for the same submission id", () => {
    const dataLayer = installBrowser();
    leadSuccess.recordLeadSuccess(confirmed);
    expect(leadSuccess.recordLeadSuccess(confirmed)).toBe(false);
    expect(leadSuccess.recordLeadSuccess(confirmed)).toBe(false);
    expect(leadEvents(dataLayer)).toHaveLength(1);
  });

  it("counts two genuinely different submissions", () => {
    const dataLayer = installBrowser();
    leadSuccess.recordLeadSuccess(confirmed);
    leadSuccess.recordLeadSuccess({ ...confirmed, submissionId: "lead_def456" });
    expect(leadEvents(dataLayer)).toHaveLength(2);
  });

  it("converts a duplicate lead, flagged as one", () => {
    const dataLayer = installBrowser();
    leadSuccess.recordLeadSuccess({ ...confirmed, duplicate: true });
    expect(leadEvents(dataLayer)[0].lead_duplicate).toBe(true);
  });

  it("fires nothing at all for a honeypot submission", () => {
    const dataLayer = installBrowser();
    expect(
      leadSuccess.recordLeadSuccess({ ...confirmed, honeypot: "http://spam.example" }),
    ).toBe(false);
    expect(dataLayer).toHaveLength(0);
  });

  it("refuses to convert without a server submission id", () => {
    const dataLayer = installBrowser();
    expect(leadSuccess.recordLeadSuccess({ ...confirmed, submissionId: undefined })).toBe(false);
    expect(leadEvents(dataLayer)).toHaveLength(0);
  });

  it("carries the form identity and no personal field", () => {
    const dataLayer = installBrowser();
    leadSuccess.recordLeadSuccess(confirmed);
    const event = leadEvents(dataLayer)[0];
    expect(event.form_id).toBe("lead_form");
    expect(event.form_name).toBe("Enquiry form");
    expect(event.registration_type).toBe("LLP");
    expect(event.submission_id).toBe("lead_abc123");
    // Nothing a visitor typed about themselves may appear anywhere in the push.
    const serialised = JSON.stringify(event);
    for (const key of ["name", "phone", "email", "message", "businessName"]) {
      expect(serialised).not.toContain(`"${key}"`);
    }
  });

  it("is the only module in the codebase that pushes generate_lead", () => {
    const helper = readFileSync("lib/lead-success.ts", "utf8");
    expect(helper).toContain('track("generate_lead"');
    for (const [name, src] of [
      ["lead-form.tsx", LEAD_FORM],
      ["contact-wizard.tsx", WIZARD],
      ["app/thank-you/page.tsx", THANK_YOU_PAGE],
    ] as const) {
      expect(src, name).not.toContain('track("generate_lead"');
    }
  });
});

describe("both forms redirect to the one thank-you page", () => {
  it("agree on the path, from the shared constant", () => {
    expect(THANK_YOU_PATH).toBe("/thank-you/");
    for (const [name, src] of [
      ["lead-form.tsx", LEAD_FORM],
      ["contact-wizard.tsx", WIZARD],
    ] as const) {
      expect(src, name).toContain('from "@/lib/thank-you"');
      expect(src, name).toContain("router.push(THANK_YOU_PATH)");
      // The literal must not be retyped anywhere: a typo in one copy is a
      // dead redirect nothing else would catch.
      expect(src, name).not.toContain('"/thank-you/"');
    }
  });

  it("records the conversion before navigating, and only on confirmed capture", () => {
    for (const [name, src] of [
      ["lead-form.tsx", LEAD_FORM],
      ["contact-wizard.tsx", WIZARD],
    ] as const) {
      const confirmedBranch = src.indexOf("if (result.success) {");
      const record = src.indexOf("recordLeadSuccess({");
      const push = src.indexOf("router.push(THANK_YOU_PATH)");
      expect(confirmedBranch, name).toBeGreaterThan(-1);
      expect(record, name).toBeGreaterThan(confirmedBranch);
      expect(push, name).toBeGreaterThan(record);
      // One redirect per form, and it is inside that branch -- the failure
      // branches below it reset the form and stay on the page.
      expect(src.split("router.push(").length - 1, name).toBe(1);
      const failureBranch = src.indexOf("inFlightRef.current = false;\n        setStatus(");
      expect(push, name).toBeLessThan(failureBranch);
    }
  });

  it("passes the honeypot through, so a bot is redirected but never converts", () => {
    for (const [name, src] of [
      ["lead-form.tsx", LEAD_FORM],
      ["contact-wizard.tsx", WIZARD],
    ] as const) {
      expect(src, name).toMatch(/honeypot: (payload\.hp_note|hpNote),/);
    }
  });
});

describe("/thank-you/ cannot be mistaken for a conversion", () => {
  it("is noindex, in the form the sitemap generator reads", () => {
    // scripts/gen-sitemap-manifest.mjs drops any page matching this.
    expect(THANK_YOU_PAGE).toMatch(/noindex:\s*true/);
  });

  it("is not in the sitemap manifest", () => {
    expect(manifest.routes.map((r) => r.path)).not.toContain(THANK_YOU_PATH);
  });

  it("is not disallowed in robots.txt, so the noindex can be read", async () => {
    const robots = (await import("@/app/robots")).default();
    const disallow = robots.rules;
    expect(JSON.stringify(disallow)).not.toContain("thank-you");
  });

  it("claims its own canonical and declines indexing", async () => {
    const { metadata } = await import("@/app/thank-you/page");
    expect(metadata.alternates?.canonical).toBe("https://www.raulji.com/thank-you/");
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("has a title and description inside the limits seo-validate enforces", async () => {
    const { metadata } = await import("@/app/thank-you/page");
    const title = (metadata.title as { absolute: string }).absolute;
    expect(title.length).toBeGreaterThanOrEqual(30);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(metadata.description!.length).toBeGreaterThanOrEqual(120);
    expect(metadata.description!.length).toBeLessThanOrEqual(160);
  });

  it("renders one h1, the master-rule-23 confirmation, and no lead event", async () => {
    installBrowser("https://www.raulji.com/thank-you/");
    const Page = (await import("@/app/thank-you/page")).default;
    const html = renderToStaticMarkup(createElement(Page));

    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain(CONFIRMATION_HEADING);
    expect(html).toContain(CONFIRMATION_BODY);
    // No analytics is pushed by rendering the page.
    expect(window.dataLayer).toHaveLength(0);
    expect(html).not.toContain("generate_lead");
    /*
     * No internal link carries a query string. The only `?` in an href on
     * this page is the WhatsApp prefill, which is an external link with a
     * fixed message that names nobody.
     */
    const internalQueries = [...html.matchAll(/href="(\/[^"]*)"/g)].filter((m) =>
      m[1].includes("?"),
    );
    expect(internalQueries).toHaveLength(0);
    // Every image rule in seo-validate is satisfied by there being no <img>.
    expect(html).not.toContain("<img");
  });

  it("names a route no city slug can take", () => {
    const slugs = readFileSync("lib/city-index.ts", "utf8");
    expect(slugs).not.toContain('slug: "thank-you"');
  });
});
