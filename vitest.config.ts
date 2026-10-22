import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/**
 * Test runner for the enquiry pipeline.
 *
 * The repository had no test runner before the CRM integration; Vitest was
 * added because the brief requires automated tests for the lead path and
 * because it reads this project's TypeScript and `@/` paths without a build
 * step or a Babel config.
 *
 * `environment: "node"` on purpose. Everything under test here is server code
 * -- the API route, the CRM client, the email templates -- so a DOM would add a
 * dependency and buy nothing. The component-level behaviour that genuinely
 * needs a browser (mobile layout, focus order) is checked against rendered HTML
 * and in a real browser instead, and is recorded as such in the report rather
 * than faked with jsdom.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // Rate limiting and the mocked module registry are per-file module state,
    // so files must not share a worker.
    isolate: true,
    restoreMocks: true,
    unstubEnvs: true,
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
});
