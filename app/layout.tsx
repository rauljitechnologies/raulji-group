import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { Analytics } from "@/components/layout/analytics";
import { Ga4Direct } from "@/components/layout/ga4-direct";
import { AttributionCapture } from "@/components/layout/attribution-capture";
import { PageViewEvents } from "@/components/layout/page-view-events";
import { ConsentBanner } from "@/components/layout/consent-banner";
import { RouteProgress } from "@/components/layout/route-progress";
import { LocationDrawerProvider } from "@/components/shared/location-drawer";
import { JsonLd } from "@/components/ui/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { consentBootstrapScript } from "@/lib/consent";
import { gtmContainerId } from "@/lib/tags";

/*
 * Plus Jakarta Sans, the typeface of the Raulji design files (claude.ai/design).
 * Self-hosted by next/font, so there is no request to Google at runtime and no
 * layout shift while it loads. Only the weights the design uses.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Raulji Group | Business Consulting & Solutions",
    template: "%s | Raulji Group",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: `${SITE.url}/` }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: true, email: true, address: false },
  /*
   * All three files are the Raulji mark cut from the real logo.
   *
   * /favicon.ico is listed explicitly and first because browsers, feed
   * readers and link-preview crawlers request that path by convention
   * whether or not it is declared, and whatever answers there is what shows
   * in the tab. Declaring only the PNG left that request to whatever file
   * happened to sit at /favicon.ico.
   */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "256x256" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#192A42",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /*
   * Google Tag Manager, installed the way Google's own instructions specify:
   * the container bootstrap in <head>, and the noscript iframe immediately
   * after the opening <body> tag (that half is in <Analytics />, the first
   * thing in the body).
   *
   * ## Why these are raw <script> tags in an explicit <head>
   *
   * `next/script` with `strategy="beforeInteractive"` was tried first and does
   * not put anything in <head> in the App Router: it queues the script through
   * `self.__next_s` and it lands early in <body>, run by Next's own bootstrap.
   * That executes before hydration and would have been functionally fine, but
   * it is not the placement Google documents, and GA4 was already reporting no
   * data collection -- not a moment to deviate from the documented install and
   * then have to argue about whether the deviation mattered.
   *
   * Rendering <head> explicitly in the root layout does work, and was checked
   * for the thing that could plausibly break: Next still emits exactly one
   * <head>, and the title, description, canonical, Open Graph, Twitter and all
   * four JSON-LD blocks are all present and correct, with `seo-validate`
   * passing on 95 pages.
   *
   * Order is load bearing and must not be swapped:
   *
   *   1. consent defaults   -- every signal denied
   *   2. container bootstrap
   *
   * The Consent Mode v2 defaults have to be in `dataLayer` before the container
   * initialises, or tags can fire in the window between page load and the first
   * consent signal, which is the whole failure the defaults exist to close.
   * Google documents the same ordering. lib/consent.ts explains the
   * denied-by-default posture.
   *
   * Cost against LCP is small and was weighed, because <head> is the one place
   * a bad script really hurts: both of these are inline, with no network
   * request of their own, and the gtm.js the bootstrap injects is `async`, so
   * nothing here blocks the parser or competes with the LCP image. That is what
   * makes Google's documented placement affordable (master rule 27).
   *
   * Both are gated on there being a container at all: no container means
   * nothing is measured, so there is nothing to withhold consent from and no
   * banner is shown. lib/tags.ts explains when an ID resolves.
   */
  const gtmId = gtmContainerId();

  return (
    <html lang="en-IN" className={jakarta.variable}>
      {gtmId ? (
        <head>
          <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentBootstrapScript() }} />
          {/*
            eslint-disable-next-line @next/next/next-script-for-ga --
            The rule wants `next/script` for an inline Google tag. That is the
            right default and it was the first implementation here, but in the
            App Router `beforeInteractive` queues the script into <body> via
            `self.__next_s` rather than placing it in <head>, which is not the
            install Google documents. The deviation is deliberate; see the
            comment at the top of this component.
          */}
          <script
            id="gtm-bootstrap"
            dangerouslySetInnerHTML={{
              /*
               * Google's container snippet, with one addition: the
               * `__rauljiGtm` guard. The snippet is not idempotent on its own,
               * and an inline script in a React tree could in principle run a
               * second time if the node were recreated rather than hydrated in
               * place. gtm.js does detect a repeat load of the same container,
               * so the practical damage would be limited to a duplicate
               * `gtm.start` push -- but "limited" is not "none", and the guard
               * costs one property. Everything after it is Google's snippet
               * verbatim, including `j.async=true`, which is what keeps this
               * off the critical path despite sitting in <head>.
               */
              __html: `(function(w,d,s,l,i){if(w.__rauljiGtm)return;w.__rauljiGtm=1;w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        </head>
      ) : null}
      <body>
        {/* The GTM noscript iframe, immediately after the opening <body> tag as
            Google's instructions specify. The container bootstrap itself is in
            <head> above. */}
        <Analytics />
        {/*
          Direct GA4, opt-in and off unless NEXT_PUBLIC_GA4_MEASUREMENT_ID is
          set. Use it OR a GA4 Configuration tag inside GTM, never both: each
          sends its own page_view and GA4 gives no warning when they double up.
          See components/layout/ga4-direct.tsx.
        */}
        <Ga4Direct />
        {/* Records campaign parameters from the landing URL for the enquiry
            forms. Renders nothing. */}
        <AttributionCapture />
        {/* view_service / view_location_page / view_blog_article on arrival and
            on each client-side navigation. Deliberately does not push
            page_view -- GA4 emits that itself. Renders nothing. */}
        <PageViewEvents />
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {/* Feedback for the page switch, above the header and the in-page
            scroll progress bars. Renders nothing until a navigation actually
            takes long enough to need it. */}
        <RouteProgress />
        {/* One location drawer for the whole site (spec section 44). */}
        <LocationDrawerProvider>
          <Header />
          <main id="main" className="mobile-bar-gutter">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </LocationDrawerProvider>
        {/*
          Consent banner, last in the body on purpose. It is visually fixed to
          the bottom of the viewport, but DOM order is what a screen reader
          follows, so putting it here means the skip link, the header and the
          page content all come first -- a visitor is not made to hear a cookie
          notice before they reach the page. It does not trap focus, so the
          privacy policy it links to stays reachable before deciding.

          Gated on the same variable as the container and the consent defaults:
          no container, nothing measured, so nothing to ask permission for.
        */}
        {gtmId ? <ConsentBanner /> : null}
      </body>
    </html>
  );
}
