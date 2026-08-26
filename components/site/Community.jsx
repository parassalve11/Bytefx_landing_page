import { ArrowUpRight, Instagram, MessageCircle, Send } from "lucide-react";
import { Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * Plan section 12, Option B. Option A (Trustpilot/Google testimonials) needs
 * real, attributable reviews — we have none, and invented testimonials are a
 * compliance risk. This ships the channel cards instead and retires the
 * ghost-avatar cloud entirely.
 *
 * TODO: add real member counts once marketing confirms them. Do not estimate.
 */
const CHANNELS = [
  {
    name: "Telegram",
    icon: Send,
    copy: "Daily market open notes, economic calendar flags and platform status.",
    action: "Join the channel",
    href: "https://t.me/",
    accent: "blue",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    copy: "Reach an account manager directly, in the app you already use.",
    action: "Message support",
    href: "https://wa.me/17585720353",
    accent: "green",
  },
  {
    name: "Instagram",
    icon: Instagram,
    copy: "Setups, platform tips and what the desk is watching this week.",
    action: "Follow ByteFX",
    href: "https://instagram.com/",
    accent: "blue",
  },
];

export function Community() {
  return (
    <Section
      id="community"
      align="center"
      title={
        <>
          Never <span className="text-gradient-brand">trade alone.</span>
        </>
      }
      lead="Market notes before the open, a real person when something needs fixing, and a room full of traders working the same sessions you are."
    >
      <RevealGroup className="grid gap-4 md:grid-cols-3">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          const green = c.accent === "green";
          return (
            <RevealItem key={c.name}>
              <a
                href={c.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
              >
                <span
                  className={
                    green
                      ? "flex h-12 w-12 items-center justify-center rounded-xl bg-go-50 text-go-600"
                      : "flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand"
                  }
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold text-ink">
                  {c.name}
                </h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-body">
                  {c.copy}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
                  {c.action}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </span>
              </a>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
