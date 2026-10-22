import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Static guarantees that the CRM and email credentials cannot reach a browser.
 *
 * These are source-level checks, which catch the mistake that actually happens:
 * someone adds a NEXT_PUBLIC_ prefix to make a value "available on the client",
 * or imports a server module into a client component and pulls the key into the
 * bundle with it. A build-output scan with a sentinel key is run separately and
 * recorded in the report -- it needs a full build, which does not belong inside
 * a unit test run.
 */

const SECRET_VARS = ["RAULJI_CRM_API_KEY", "EMAIL_PROVIDER_API_KEY"];
const SERVER_ONLY_MODULES = ["lib/crm/lead-client", "lib/email/provider", "lib/email/lead-emails"];

function grep(pattern: string, paths: string[]): string[] {
  try {
    return execFileSync("grep", ["-rnE", pattern, ...paths], { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
  } catch {
    // grep exits 1 when there are no matches.
    return [];
  }
}

const sources = ["app", "lib", "components"];

describe("secrets are server-only", () => {
  for (const name of SECRET_VARS) {
    it(`${name} is never prefixed NEXT_PUBLIC_`, () => {
      expect(grep(`NEXT_PUBLIC_${name}`, [...sources, ".env.example"])).toEqual([]);
    });

    it(`${name} is read only in server modules`, () => {
      const hits = grep(`process\\.env\\.${name}`, sources);
      expect(hits.length).toBeGreaterThan(0);
      for (const hit of hits) {
        const file = hit.split(":")[0];
        const source = readFileSync(file, "utf8");
        expect(source.startsWith('"use client"'), `${file} is a client component`).toBe(false);
      }
    });
  }

  it("no client component imports a server-only module", () => {
    const clientFiles = grep('^"use client"', sources).map((hit) => hit.split(":")[0]);
    expect(clientFiles.length).toBeGreaterThan(0);
    for (const file of clientFiles) {
      const source = readFileSync(file, "utf8");
      for (const mod of SERVER_ONLY_MODULES) {
        expect(source, `${file} imports ${mod}`).not.toContain(`@/${mod}`);
      }
    }
  });

  it("the browser only ever posts to our own route, never to the CRM", () => {
    const clientFiles = grep('^"use client"', sources).map((hit) => hit.split(":")[0]);
    for (const file of clientFiles) {
      const source = readFileSync(file, "utf8");
      expect(source, `${file} references the CRM host`).not.toContain("crm.raulji.com");
      expect(source, `${file} sends an API key header`).not.toContain("X-API-Key");
    }
  });

  it(".env.example carries placeholders, not values", () => {
    const env = readFileSync(".env.example", "utf8");
    for (const name of [...SECRET_VARS, "RAULJI_ADMIN_EMAILS", "EMAIL_FROM_ADDRESS"]) {
      expect(env, `${name} missing from .env.example`).toContain(name);
    }
    // No line may assign something that looks like a real credential.
    for (const line of env.split("\n")) {
      const [key, value] = line.split("=");
      if (!value || line.trimStart().startsWith("#")) continue;
      if (SECRET_VARS.includes(key.trim())) {
        expect(value.trim(), `${key} looks like a real value`).toMatch(/^(|replace_with_[a-z_]+)$/);
      }
    }
  });
});
