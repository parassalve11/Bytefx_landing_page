import Image from "next/image";
import { Linkedin } from "lucide-react";
import { BrandGlyph } from "@/components/ui/brand-icons";

const COLUMNS = [
  {
    title: "Markets",
    links: [
      { label: "Forex", href: "/markets/forex" },
      { label: "Crypto", href: "/markets/crypto" },
      { label: "Stocks", href: "/markets/stocks" },
      { label: "Commodities", href: "/markets/commodities" },
      { label: "Indices", href: "/markets/indices" },
    ],
  },
  {
    title: "Links",
    links: [
      { label: "Account Types", href: "/#accounts" },
      { label: "Partnership", href: "/#partnership" },
      { label: "Tools", href: "/tools" },
      { label: "Why ByteFX", href: "/company/why-bytefx" },
      { label: "Trust & Security", href: "/company/trust-security" },
      { label: "Getting Started", href: "/getting-started" },
      { label: "Support", href: "/support" },
      { label: "Company", href: "/company" },
    ],
  },
];

const COMPANY = [
  {
    label: "Registered address",
    value:
      "Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia.",
  },
  {
    label: "Physical address",
    value: "Office No. 1, Rodney Quay, Rodney Bay, Gros Islet, Saint Lucia.",
  },
  { label: "Registration No.", value: "2025-00893" },
  { label: "Global support", value: "+1-758-572-0353", href: "tel:+17585720353" },
  { label: "Email", value: "support@bytefx.com", href: "mailto:support@bytefx.com" },
];

const LEGAL = [
  {
    title: "Risk Warning",
    body: "Trading Forex, CFDs, and other leveraged financial instruments involves a high level of risk and may not be suitable for all investors. Fully understand the risks involved and ensure that you can afford to sustain a complete loss of your invested capital.",
  },
  {
    title: "Legal Disclaimer",
    body: "The information on this website is general. ByteFX Capital Ltd. cannot be held liable for its relevance or accuracy. We do not provide investment advice. Review our Terms & Conditions for details.",
  },
  {
    title: "Restricted Jurisdictions",
    body: "Services are not offered to residents of the UAE, India, USA, China, Iran, North Korea, and other sanctioned regions.",
  },
];

const POLICIES = [
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Risk Disclosure", href: "/legal/risk" },
  { label: "AML Policy", href: "/legal/aml" },
  { label: "Legal & Compliance", href: "/legal" },
];

/* Real brand marks, except LinkedIn which simple-icons no longer ships. */
const SOCIALS = [
  { label: "X", href: "https://x.com", brand: "x" },
  { label: "Instagram", href: "https://instagram.com", brand: "instagram" },
  { label: "Telegram", href: "https://telegram.org", brand: "telegram" },
  { label: "YouTube", href: "https://youtube.com", brand: "youtube" },
  { label: "WhatsApp", href: "https://wa.me/17585720353", brand: "whatsapp" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-shell text-white">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr]">
          {/* Brand ------------------------------------------------- */}
          <div>
            <Image
              src="/assets/Logo.png"
              alt="ByteFX"
              width={132}
              height={30}
              className="h-[30px] w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-[14.5px] text-[#9FAABD]">
              Discover your trading edge.
            </p>
            <ul className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 text-[#9FAABD] transition-colors hover:border-white/30 hover:text-white"
                    >
                      {s.brand ? (
                        <BrandGlyph name={s.brand} className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Link columns ------------------------------------------ */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[11px] font-semibold tracking-[0.08em] text-white/50 uppercase">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14.5px] text-[#C3CCDA] transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Company ----------------------------------------------- */}
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.08em] text-white/50 uppercase">
              Company
            </h2>
            <dl className="mt-4 space-y-3">
              {COMPANY.map((c) => (
                <div key={c.label}>
                  <dt className="text-[11.5px] text-white/45">{c.label}</dt>
                  <dd className="text-[13.5px] leading-relaxed text-[#C3CCDA]">
                    {c.href ? (
                      <a href={c.href} className="transition-colors hover:text-white">
                        {c.value}
                      </a>
                    ) : (
                      c.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Legal --------------------------------------------------- */}
        <div className="mt-12 space-y-4 border-t border-white/10 pt-8">
          {LEGAL.map((l) => (
            <p
              key={l.title}
              className="max-w-4xl text-[12.5px] leading-[1.6] text-[#9FAABD]"
            >
              <span className="font-semibold text-[#C3CCDA]">{l.title}:</span>{" "}
              {l.body}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12.5px] text-[#9FAABD]">
            &copy; 2021-2026 ByteFX Capital Ltd. Built for the modern trader.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {POLICIES.map((p) => (
              <li key={p.label}>
                <a
                  href={p.href}
                  className="text-[12.5px] text-[#9FAABD] transition-colors hover:text-white"
                >
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
