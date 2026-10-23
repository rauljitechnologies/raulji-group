import { gtmContainerId } from "@/lib/tags";

/**
 * The Google Tag Manager `noscript` fallback, immediately after the opening
 * `<body>` tag, exactly where Google's install instructions put it.
 *
 * **The container bootstrap is not here.** It sits as high in `<head>` as
 * possible, in `app/layout.tsx`, together with the Consent Mode v2 defaults
 * that must precede it -- see the comment there for why the order matters and
 * why both have to be declared from the root layout. This component is the
 * second half of the same install, split only because the two halves belong in
 * different places in the document.
 *
 * Until 2026-10-23 this component carried the bootstrap too, loaded
 * `afterInteractive` from the top of the body. That worked, but it was not the
 * placement Google documents, and the client's GA4 property was reporting no
 * data collection -- so the install was brought in line with the instructions
 * while the real cause was fixed in lib/tags.ts.
 *
 * Renders nothing when no container is configured. The site still pushes its
 * events onto `window.dataLayer`; they simply have nowhere to go.
 */
export function Analytics() {
  const gtmId = gtmContainerId();
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
