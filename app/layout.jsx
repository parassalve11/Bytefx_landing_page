import { Poppins } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AtlasChat } from "@/components/site/AtlasChat";

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
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Chrome lives here, not in the pages: the announcement bar, the sticky navbar,
 * the footer and the Atlas assistant are identical on the landing page and
 * every sub-page, and the navbar's scroll/menu state survives client-side
 * navigation this way.
 *
 * `AtlasChat` renders last so its fixed launcher is the final thing in the
 * stacking context — it has to sit over the footer as well as the page.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
        <AtlasChat />
      </body>
    </html>
  );
}
