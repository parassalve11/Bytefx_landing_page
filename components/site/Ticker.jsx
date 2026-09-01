"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const SYMBOLS = [
  { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
  { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100 Index" },
  { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
  { proName: "BITSTAMP:BTCUSD", title: "BTC/USD" },
  { proName: "BITSTAMP:ETHUSD", title: "ETH/USD" },
  { proName: "OANDA:XAUUSD", description: "Gold" },
  { proName: "FX:GBPUSD", title: "GBP/USD" },
  { proName: "FX:USDJPY", title: "USD/JPY" },
];

function buildWidgetUrl(theme) {
  const config = {
    symbols: SYMBOLS,
    showSymbolLogo: true,
    colorTheme: theme,
    isTransparent: false,
    displayMode: "regular",
    width: "100%",
    height: 46,
    utm_source: "www.bytefx.com",
    utm_medium: "widget",
    utm_campaign: "ticker-tape",
    "page-uri": "www.bytefx.com/",
  };

  return `https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#${encodeURIComponent(
    JSON.stringify(config)
  )}`;
}

export function Ticker() {
  const hostRef = useRef(null);
  const [theme, setTheme] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      setTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "180px 0px" }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const src = useMemo(() => (theme ? buildWidgetUrl(theme) : null), [theme]);

  return (
    <section
      ref={hostRef}
      aria-labelledby="live-market-prices"
      className="tradingview-ticker-shell relative z-10 w-full"
    >
      <h2 id="live-market-prices" className="sr-only">
        Live global market prices
      </h2>
      <div className="tradingview-ticker-glass h-[48px] w-full overflow-hidden">
        {visible && src ? (
          <iframe
            key={theme}
            title="Live global market prices by TradingView"
            src={src}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="block h-[48px] w-full border-0"
          />
        ) : (
          <div className="h-[48px] w-full" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
