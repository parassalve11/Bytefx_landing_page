/**
 * Hero — intentionally blank.
 *
 * Deferred by the client and by plan.md phase 5: the hero should inherit the
 * page's visual language once the rest is settled, not define it. The band is
 * kept (with the arc wash and a placeholder marker) so the page does not read
 * as broken and so the section's slot in the scroll is visible.
 *
 * When it is designed: green primary CTA, blue secondary, one two-tone or
 * gradient accent phrase in the H1, and a real product panel on the right.
 */
export function Hero() {
  return (
    <section
      aria-label="Hero — in design"
      className="arc-wash relative border-b border-line"
    >
      <div className="container-x flex min-h-[220px] items-center justify-center py-20 md:min-h-[300px]">
        <p className="eyebrow select-none">Hero — in design</p>
      </div>
    </section>
  );
}
