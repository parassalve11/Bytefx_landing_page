"use client";

import React, { useId, useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, href = "#", children }) => {
  const open = active === item;
  const hasChildren = Boolean(children);
  const triggerRef = useRef(null);
  const panelId = useId();

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setActive(null);
    }
  };

  const handleKeyDown = (event) => {
    if (!hasChildren) return;

    if (event.key === "ArrowDown" && event.target === triggerRef.current) {
      event.preventDefault();
      setActive(item);
      requestAnimationFrame(() => {
        document.getElementById(panelId)?.querySelector("a[href]")?.focus();
      });
      return;
    }

    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      triggerRef.current?.focus();
      setActive(null);
    }
  };

  return (
    <div
      onMouseEnter={() => setActive(item)}
      onFocusCapture={() => hasChildren && setActive(item)}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
      className="relative"
    >
      <motion.a
        ref={triggerRef}
        href={href}
        aria-haspopup={hasChildren ? "true" : undefined}
        aria-expanded={hasChildren ? open : undefined}
        aria-controls={hasChildren ? panelId : undefined}
        transition={{ duration: 0.3 }}
        className={cn(
          "flex cursor-pointer items-center gap-1 py-2 text-[15px] font-medium transition-colors",
          open ? "text-brand" : "text-ink hover:text-brand"
        )}
      >
        {item}
        {children ? (
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              open && "rotate-180"
            )}
            strokeWidth={2.5}
          />
        ) : null}
      </motion.a>

      {children && active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {open && (
            <div className="absolute top-full left-1/2 z-20 -translate-x-1/2 pt-6">
              <motion.div
                id={panelId}
                role="group"
                aria-label={`${item} links`}
                transition={transition}
                layoutId="active"
                className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lg"
              >
                <motion.div layout className="h-full w-max p-5">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, className, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn("flex items-center gap-7", className)}
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ children, className, ...rest }) => {
  return (
    <a
      {...rest}
      className={cn(
        "block rounded-lg px-2 py-1.5 text-[14.5px] text-body transition-colors hover:bg-brand-50 hover:text-brand",
        className
      )}
    >
      {children}
    </a>
  );
};

/**
 * Light-mode rework of Aceternity's ProductItem: the "src" image slot is
 * replaced by an icon tile so the menu never depends on remote screenshots.
 */
export const ProductItem = ({ title, description, href, icon, accent = "blue" }) => {
  return (
    <a
      href={href}
      className="group flex gap-3 rounded-xl p-2.5 transition-colors hover:bg-alt"
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors",
          accent === "green"
            ? "border-go-50 bg-go-50 text-go-600"
            : "border-brand-50 bg-brand-50 text-brand"
        )}
      >
        {icon}
      </span>
      <span className="block">
        <span className="block text-[14.5px] font-semibold text-ink group-hover:text-brand">
          {title}
        </span>
        <span className="mt-0.5 block max-w-[15rem] text-[13px] leading-snug text-muted">
          {description}
        </span>
      </span>
    </a>
  );
};
