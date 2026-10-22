import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
   * The Consent Mode v2 defaults must be in dataLayer before the GTM container
   * loads, or tags can fire in the window between page load and the first
   * consent signal -- which is the whole failure the defaults exist to close.
   * That means `beforeInteractive`, and in the App Router that strategy is only
   * honoured from the root layout, which is why this lives here rather than
   * beside the container in <Analytics />.
   *
   * Gated on the same variable as the container: no container, nothing
   * measured, so nothing to withhold consent from and no banner shown.
   * lib/consent.ts explains the denied-by-default posture.
   */
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en-IN" className={jakarta.variable}>
      {gtmId ? (
        <Script id="consent-default" strategy="beforeInteractive">
          {consentBootstrapScript()}
        </Script>
      ) : null}
      <body>
        {/* Google Tag Manager. Placed first, immediately after the opening
            <body> tag, as GTM's own install instructions specify. The
            container itself is loaded afterInteractive, so this position
            costs nothing against LCP. */}
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
