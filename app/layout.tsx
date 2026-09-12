import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { JsonLd } from "@/components/ui/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  // Only the weights the design actually uses, to keep the font payload small.
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Company Registration & Business Services in Gujarat | Raulji Group",
    template: "%s | Raulji Group",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: `${SITE.url}/` }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: true, email: true, address: false },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
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
    <html lang="en-IN" className={inter.variable}>
      <body>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="mobile-bar-gutter">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
