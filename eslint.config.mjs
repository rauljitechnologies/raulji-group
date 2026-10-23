import { FlatCompat } from "@eslint/eslintrc";

/**
 * ESLint, flat config, for Next 15 + ESLint 9.
 *
 * Before this file existed, `npm run lint` had no configuration to read, so
 * `next lint` fell through to its interactive "How would you like to configure
 * ESLint?" prompt. That is harmless at a terminal and fatal in CI or a
 * deployment pipeline, where nothing answers the prompt and the step hangs
 * until it is killed. Linting was therefore not actually part of the
 * verification pipeline, despite being wired into package.json.
 *
 * `next/core-web-vitals` carries the rules that matter to this project's
 * performance work (it is the one that flags a raw <img> in place of
 * next/image, and a missing `sizes` on a `fill` image). `next/typescript`
 * layers on the TypeScript rules; `npm run typecheck` still does the type
 * checking itself.
 */
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  {
    // Build output, dependencies and the generated sitemap manifest. Linting
    // generated files reports problems nobody can fix at the source.
    // `.next-*` covers any NEXT_DIST_DIR build (next.config.ts) and the stale
    // `.next-verify` / `.next-root-owned-old` folders; `.cache/` holds an old
    // build whose generated types failed `npm run lint` with 12 errors on a
    // working copy that had one (audit of 23 Oct 2026). Both are gitignored.
    ignores: [
      ".next/**",
      ".next-*/**",
      ".cache/**",
      "node_modules/**",
      "next-env.d.ts",
      "lib/generated/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
