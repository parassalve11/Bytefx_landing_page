import { Poppins } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://www.bytefx.com"),
  title: {
    default: "ByteFX | Trading Platform for Forex, Crypto, Indices & Stocks",
    template: "%s | ByteFX",
  },
  description:
    "Trade 150+ instruments with leverage up to 1:2000, spreads from 0.0 pips and ~20ms execution. Standard, Pro and Raw accounts on MetaTrader 5.",
  openGraph: {
    title: "ByteFX | Discover your trading edge",
    description:
      "150+ instruments. Leverage up to 1:2000. Spreads from 0.0 pips. ~20ms execution.",
    type: "website",
  },
};

export const viewport = {
  // Kept media-free on purpose: ThemeToggle rewrites this tag whenever the
  // resolved theme changes, so a manual override still tints the address bar.
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Resolves the theme before the browser paints. Runs synchronously in <head>,
 * so there is never a flash of the wrong palette on a hard load.
 *
 * Light is the default and the OS setting is deliberately not consulted: this
 * is a marketing site, the light palette is the brand's, and a visitor on a
 * dark-mode laptop should still land on the page as designed. Dark is opt-in
 * via the navbar switch, and only an explicit stored choice turns it on.
 */
const THEME_SCRIPT = `(function(){try{if(localStorage.getItem("bytefx:theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}})()`;

/**
 * Chrome lives here, not in the pages: the announcement bar, the sticky navbar
 * and the footer are identical on the landing page and every sub-page, and the
 * navbar's scroll/menu state survives client-side navigation this way.
 */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={poppins.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
