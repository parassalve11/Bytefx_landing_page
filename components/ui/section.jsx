import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * Every section gets an eyebrow above the H2 — that plus the white/alt
 * alternation is the page's entire hierarchy system. No dividers needed.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  bg = "white",
  aside,
  className,
  headerClassName,
  children,
}) {
  // A saturated band inverts the whole header, so resolve it once here.
  const onDark = bg === "brand";

  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        bg === "alt" && "bg-alt",
        bg === "wash" && "arc-wash",
        onDark && "band-brand relative overflow-hidden text-white",
        className
      )}
    >
      {onDark && (
        <div className="band-grid pointer-events-none absolute inset-0 opacity-70" />
      )}

      <div className="container-x relative">
        {(eyebrow || title || lead) && (
          <div
            className={cn(
              "mb-10 md:mb-14",
              align === "center" && "mx-auto max-w-2xl text-center",
              aside && "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
              headerClassName
            )}
          >
            <div className={cn(align === "center" ? "" : "max-w-2xl")}>
              {eyebrow && (
                <p className={cn("eyebrow", onDark && "text-white/60")}>
                  {eyebrow}
                </p>
              )}
              {title && (
                <Reveal
                  as="h2"
                  className={cn("h-section mt-3", onDark && "text-white")}
                >
                  {title}
                </Reveal>
              )}
              {lead && (
                <Reveal
                  as="p"
                  delay={0.05}
                  className={cn(
                    "mt-4 text-[16.5px] leading-relaxed text-balance-i",
                    onDark ? "text-white/80" : "text-body"
                  )}
                >
                  {lead}
                </Reveal>
              )}
            </div>
            {aside && <div className="shrink-0">{aside}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, className }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
