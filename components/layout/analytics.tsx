import Script from "next/script";

/**
 * Google Tag Manager container, loaded only when one is configured.
 *
 * The rest of the site already pushes the events master rule 29 asks for onto
 * window.dataLayer. Until a container is loaded, those pushes go nowhere, which
 * is why this exists. It is gated on an environment variable for two reasons:
 *
 *  - master rule 27 asks for minimal third-party scripts, and a container the
 *    client has not set up yet is pure cost with no benefit
 *  - it keeps development and preview builds free of production tracking
 *
 * Set NEXT_PUBLIC_GTM_ID to the container ID (GTM-XXXXXXX) to switch it on. The
 * ID is public by nature: it appears in the page source on every site that uses
 * GTM, so NEXT_PUBLIC_ is correct here and is not a leak.
 *
 * strategy="afterInteractive" keeps it off the critical path, so it does not
 * compete with the LCP element for bandwidth (master rule 32).
 */
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;

  return (
    <>
      {/* dataLayer has to exist before the container script runs, because the
          site's own track() calls may fire before GTM finishes loading. */}
      <Script id="gtm-datalayer" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>
      <Script id="gtm-loader" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      {/* The noscript iframe is part of GTM's documented install. It is inert for
          anyone with JavaScript enabled. */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
