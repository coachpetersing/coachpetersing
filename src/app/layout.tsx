import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { homeTitle, homeDescription } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

// "Big Shoulders Display" now ships as the variable "Big Shoulders" family; the opsz axis
// is set to its display size in globals.css. Next has no metrics for it, so the fallbacks are
// set by hand: Impact is nearly the same width, and "Big Shoulders Fallback" (globals.css) is
// Arial or Roboto scaled to match, for phones without Impact. Together they keep the headline
// from shifting when the font loads.
const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Impact", "Big Shoulders Fallback", "sans-serif"],
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: site.url },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: homeDescription },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E1A12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Marks that JS is running so scroll reveals can start hidden. With JS off, everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-tan-400 px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {copy.nav.skip}
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <Analytics />
      </body>
    </html>
  );
}
