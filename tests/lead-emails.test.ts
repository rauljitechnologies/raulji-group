import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { adminEmail, customerEmail, dispatchLeadEmails, esc, type LeadEmailInput } from "@/lib/email/lead-emails";
import { adminRecipients } from "@/lib/email/provider";
import { SITE } from "@/lib/site";

const BASE: LeadEmailInput = {
  name: "Test Person",
  phone: "9876543210",
  email: "test.person@example.com",
  city: "Vadodara",
  businessName: "Test Trading Co",
  service: "LLP Registration",
  message: "Two partners, need help choosing.",
  pageUrl: "https://www.raulji.com/gujarat/",
  pageName: "/gujarat/",
  attribution: { utm_source: "google", gclid: "abc123" },
  leadId: "lead_555",
  duplicate: false,
  requestId: "lead_test_0001",
};

function configureProvider() {
  vi.stubEnv("EMAIL_PROVIDER_API_KEY", "test-email-key-not-real");
  vi.stubEnv("EMAIL_FROM_ADDRESS", "admin@raulji.com");
  vi.stubEnv("RAULJI_ADMIN_EMAILS", "admin@raulji.com,toyuvrajraulji@gmail.com");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("escaping", () => {
  it("escapes every HTML-significant character", () => {
    expect(esc(`<script>"x"&'y'</script>`)).toBe(
      "&lt;script&gt;&quot;x&quot;&amp;&#39;y&#39;&lt;/script&gt;",
    );
  });

  it("escapes attacker-controlled values in the admin email", () => {
    const html = adminEmail({
      ...BASE,
      name: `<img src=x onerror="alert(1)">`,
      businessName: `"><script>steal()</script>`,
      message: `<b>bold</b> & <i>italic</i>`,
    }).html;
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    /*
     * The escaped output does contain the literal text `onerror=`, inside
     * `onerror=&quot;alert(1)&quot;` -- which is inert, because both the
     * surrounding `<` and the quotes are entities, so it is text in a table
     * cell and not an attribute on an element. What must not appear is the
     * form that could execute: an `onerror` handler with a real quote able to
     * close out of the attribute it sits in.
     */
    expect(html).not.toContain('onerror="');
    expect(html).not.toContain("onerror='");
    expect(html).toContain("&lt;script&gt;steal()&lt;/script&gt;");
    expect(html).toContain("&lt;b&gt;bold&lt;/b&gt; &amp; &lt;i&gt;italic&lt;/i&gt;");
  });

  it("escapes attacker-controlled values in the customer email", () => {
    const html = customerEmail({ ...BASE, name: `<script>x</script>`, service: `</td><script>y</script>` }).html;
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});

describe("customer email", () => {
  it("names the selected service and promises no response time", () => {
    const { subject, html, text } = customerEmail(BASE);
    expect(subject).toBe(`We’ve received your enquiry | ${SITE.name}`);
    expect(html).toContain("LLP Registration");
    expect(text).toContain("LLP Registration");
    expect(text).toContain(SITE.phone.display);
    // No approved response-time commitment exists, so none may appear.
    expect(`${html} ${text}`).not.toMatch(/within \d+ (hour|business|working|day)/i);
    expect(`${html} ${text}`).not.toMatch(/\b24 hours\b/i);
  });

  it("copes with no service selected without inventing one", () => {
    const { html } = customerEmail({ ...BASE, service: undefined });
    expect(html).toContain("did not pick a specific service");
    expect(html).not.toContain("Not specified");
  });

  it("always carries a plain-text alternative", () => {
    expect(customerEmail(BASE).text.length).toBeGreaterThan(100);
    expect(customerEmail(BASE).text).not.toContain("<");
  });
});

describe("admin email", () => {
  it("includes every field the brief lists", () => {
    const { subject, html, text } = adminEmail(BASE);
    expect(subject).toBe(`New Website Enquiry — LLP Registration — ${SITE.name}`);
    for (const value of [
      "Test Person",
      "9876543210",
      "test.person@example.com",
      "Vadodara",
      "Test Trading Co",
      "LLP Registration",
      "Two partners, need help choosing.",
      "/gujarat/",
      "lead_555",
      "google",
      "abc123",
      "lead_test_0001",
    ]) {
      expect(html, `html missing ${value}`).toContain(value);
      expect(text, `text missing ${value}`).toContain(value);
    }
    expect(html).toContain("New lead created");
  });

  it("says a duplicate updated an existing lead rather than created one", () => {
    const { html, text } = adminEmail({ ...BASE, duplicate: true });
    expect(html).toContain("Updated an existing lead");
    expect(html).toContain("existing</strong> CRM lead");
    expect(text).toContain("EXISTING CRM lead");
    expect(text).not.toContain("New lead created");
  });

  it("says so plainly when the CRM returned no lead id", () => {
    expect(adminEmail({ ...BASE, leadId: null }).text).toContain("Not returned by the CRM");
  });

  it("says so plainly when there was no campaign, rather than inventing one", () => {
    const { html, text } = adminEmail({ ...BASE, attribution: {} });
    expect(html).toContain("No campaign or UTM parameters were present");
    expect(text).toContain("No campaign or UTM parameters were present");
  });

  it("never contains a secret", () => {
    configureProvider();
    const { html, text } = adminEmail(BASE);
    for (const secret of ["test-email-key-not-real", "RAULJI_CRM_API_KEY", "Bearer ", "X-API-Key"]) {
      expect(html).not.toContain(secret);
      expect(text).not.toContain(secret);
    }
  });
});

describe("admin recipients", () => {
  it("parses both configured addresses", () => {
    configureProvider();
    expect(adminRecipients()).toEqual(["admin@raulji.com", "toyuvrajraulji@gmail.com"]);
  });

  it("ignores blanks and malformed entries from a stray comma", () => {
    vi.stubEnv("RAULJI_ADMIN_EMAILS", "admin@raulji.com, ,not-an-email,  toyuvrajraulji@gmail.com ,");
    expect(adminRecipients()).toEqual(["admin@raulji.com", "toyuvrajraulji@gmail.com"]);
  });

  it("is empty, not guessed, when unset", () => {
    vi.stubEnv("RAULJI_ADMIN_EMAILS", "");
    expect(adminRecipients()).toEqual([]);
  });
});

describe("dispatchLeadEmails", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    configureProvider();
    fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_1" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
  });

  it("sends a customer confirmation and an admin notification to both recipients", async () => {
    const result = await dispatchLeadEmails(BASE);
    expect(result.customer.status).toBe("sent");
    expect(result.admin.status).toBe("sent");
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const bodies = fetchMock.mock.calls.map(([, init]) =>
      JSON.parse(String((init as RequestInit).body)) as Record<string, unknown>,
    );
    const customer = bodies.find((b) => Array.isArray(b.to) && (b.to as string[])[0] === BASE.email);
    const admin = bodies.find((b) => (b.to as string[]).includes("toyuvrajraulji@gmail.com"));

    expect(customer?.from).toBe("admin@raulji.com");
    expect(admin?.to).toEqual(["admin@raulji.com", "toyuvrajraulji@gmail.com"]);
    expect(admin?.from).toBe("admin@raulji.com");
    // The customer's address is a reply target, never the sender.
    expect(admin?.reply_to).toBe(BASE.email);
    for (const body of bodies) {
      expect(typeof body.text).toBe("string");
      expect(String(body.text).length).toBeGreaterThan(50);
    }
  });

  it("skips the customer email when no address was given, and still notifies admin", async () => {
    const result = await dispatchLeadEmails({ ...BASE, email: undefined });
    expect(result.customer.status).toBe("skipped");
    expect(result.admin.status).toBe("sent");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body)) as Record<string, unknown>;
    expect(body.to).toEqual(["admin@raulji.com", "toyuvrajraulji@gmail.com"]);
    expect(body.reply_to).toBeUndefined();
  });

  it("reports failure rather than success when the provider rejects", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 422 }));
    const result = await dispatchLeadEmails(BASE);
    expect(result.customer.status).toBe("failed");
    expect(result.admin.status).toBe("failed");
    expect(result.admin).toMatchObject({ detail: "provider responded 422" });
  });

  it("reports failure rather than success on a provider timeout", async () => {
    fetchMock.mockRejectedValue(Object.assign(new Error("t"), { name: "TimeoutError" }));
    const result = await dispatchLeadEmails(BASE);
    expect(result.admin).toEqual({ status: "failed", detail: "provider timeout" });
  });

  it("never puts personal data in a failure detail", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ message: `rejected ${BASE.email} ${BASE.phone}` }), { status: 422 }),
    );
    const result = await dispatchLeadEmails(BASE);
    const detail = "detail" in result.admin ? result.admin.detail : "";
    expect(detail).not.toContain(BASE.email!);
    expect(detail).not.toContain(BASE.phone);
  });

  it("is misconfigured, not sent, when the provider key is missing", async () => {
    vi.stubEnv("EMAIL_PROVIDER_API_KEY", "");
    const result = await dispatchLeadEmails(BASE);
    expect(result.customer.status).toBe("misconfigured");
    expect(result.admin.status).toBe("misconfigured");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("is misconfigured when no admin recipients are configured", async () => {
    vi.stubEnv("RAULJI_ADMIN_EMAILS", "");
    const result = await dispatchLeadEmails(BASE);
    expect(result.admin).toMatchObject({ status: "misconfigured" });
    // The customer still gets their confirmation.
    expect(result.customer.status).toBe("sent");
  });
});
