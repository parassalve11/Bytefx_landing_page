"use client";

import { useCallback, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEME_KEY = "bytefx:theme";

const CANVAS = { light: "#ffffff", dark: "#070c17" };

function syncMeta(theme) {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", CANVAS[theme] ?? CANVAS.light);
}

/**
 * Light/dark switch.
 *
 * The resolved theme lives in one place — the `data-theme` attribute on
 * <html>, written before first paint by the inline script in app/layout.jsx.
 * This button only ever flips that attribute and records the choice, which is
 * why it renders *both* icons and lets CSS pick: no client state means no
 * hydration mismatch and no first-paint flicker of the wrong icon.
 *
 * Light is the default for everyone; the OS preference is not consulted, so
 * dark only ever appears because someone pressed this button.
 */
export function ThemeToggle({ className }) {
  useEffect(() => {
    syncMeta(
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light"
    );
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    syncMeta(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked — the choice lasts for this page view, which is fine */
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      title="Toggle dark mode"
      aria-label="Toggle dark mode"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-line text-body transition-colors hover:border-line-strong hover:text-ink",
        className
      )}
    >
      <Sun className="h-[17px] w-[17px] dark:hidden" strokeWidth={2} />
      <Moon className="hidden h-[17px] w-[17px] dark:block" strokeWidth={2} />
    </button>
  );
}
