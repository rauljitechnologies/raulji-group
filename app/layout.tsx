import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { Analytics } from "@/components/layout/analytics";
import { RouteProgress } from "@/components/layout/route-progress";
import { LocationDrawerProvider } from "@/components/shared/location-drawer";
import { JsonLd } from "@/components/ui/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

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
  return (
    <html lang="en-IN" className={jakarta.variable}>
      <body>
        {/* Google Tag Manager. Placed first, immediately after the opening
            <body> tag, as GTM's own install instructions specify. The
            container itself is loaded afterInteractive, so this position
            costs nothing against LCP. */}
        <Analytics />
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
      </body>
    </html>
  );
}
