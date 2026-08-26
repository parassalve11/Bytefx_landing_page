"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BarChart3,
  Bitcoin,
  Building2,
  ChevronDown,
  CircleDollarSign,
  Flame,
  Gem,
  Globe,
  LifeBuoy,
  LineChart,
  Mail,
  Menu as MenuIcon,
  Monitor,
  Newspaper,
  Rocket,
  Scale,
  Users,
  X,
} from "lucide-react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const MARKETS = [
  {
    title: "Forex",
    href: "/markets/forex",
    icon: <Globe className="h-4 w-4" strokeWidth={2} />,
    description: "70+ major, minor and exotic currency pairs.",
  },
  {
    title: "Crypto",
    href: "/markets/crypto",
    icon: <Bitcoin className="h-4 w-4" strokeWidth={2} />,
    description: "Round-the-clock exposure to 25+ digital assets.",
    accent: "green",
  },
  {
    title: "Stocks",
    href: "/markets/stocks",
    icon: <Building2 className="h-4 w-4" strokeWidth={2} />,
    description: "500+ share CFDs from US, EU and UK exchanges.",
  },
  {
    title: "Commodities",
    href: "/markets/commodities",
    icon: <Gem className="h-4 w-4" strokeWidth={2} />,
    description: "Gold, silver and the softs, with swap-free options.",
    accent: "green",
  },
  {
    title: "Indices",
    href: "/markets/indices",
    icon: <BarChart3 className="h-4 w-4" strokeWidth={2} />,
    description: "12+ global benchmarks including US30 and NAS100.",
  },
  {
    title: "Energy",
    href: "/markets/energy",
    icon: <Flame className="h-4 w-4" strokeWidth={2} />,
    description: "WTI, Brent and natural gas on tight spreads.",
    accent: "green",
  },
];

const ACCOUNTS = [
  {
    title: "Standard",
    href: "/account-types#standard",
    icon: <CircleDollarSign className="h-4 w-4" strokeWidth={2} />,
    description: "From $20. Zero commission, variable spreads.",
  },
  {
    title: "Pro",
    href: "/account-types#pro",
    icon: <LineChart className="h-4 w-4" strokeWidth={2} />,
    description: "From $2,000. Spreads from 1.0 pips.",
  },
  {
    title: "Raw",
    href: "/account-types#raw",
    icon: <Scale className="h-4 w-4" strokeWidth={2} />,
    description: "From $25,000. Raw spreads from 0.0 pips.",
  },
  {
    title: "Demo",
    href: "/account-types#demo",
    icon: <Monitor className="h-4 w-4" strokeWidth={2} />,
    description: "Live prices, virtual funds, no risk.",
    accent: "green",
  },
];

const SUPPORT = [
  {
    title: "Getting started",
    href: "/getting-started",
    icon: <Rocket className="h-4 w-4" strokeWidth={2} />,
    description: "Sign up, verify, fund and trade in four steps.",
  },
  {
    title: "FAQ",
    href: "/support",
    icon: <LifeBuoy className="h-4 w-4" strokeWidth={2} />,
    description: "Deposits, leverage and platforms, answered.",
    accent: "green",
  },
  {
    title: "Contact us",
    href: "/company/contact",
    icon: <Mail className="h-4 w-4" strokeWidth={2} />,
    description: "Chat and email, 24 hours a day, six days a week.",
  },
];

/* Landing-page sections are addressed as /#id so they also resolve from sub-pages. */
const MOBILE_NAV = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Why ByteFX", href: "/company/why-bytefx" },
  { label: "Trust & Security", href: "/company/trust-security" },
  { label: "Markets", href: "/#markets" },
  { label: "Account Types", href: "/#accounts" },
  { label: "Partnership", href: "/#partnership" },
  { label: "Tools", href: "/tools" },
  { label: "Getting started", href: "/getting-started" },
  { label: "Support", href: "/support" },
];

export function Navbar() {
  const [active, setActive] = useState(null);
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 bg-transparent px-3 pt-2 sm:px-4 sm:pt-3"
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[var(--container)] items-center justify-between gap-4 rounded-2xl border px-2 backdrop-blur-xl backdrop-saturate-150 transition-[height,background-color,border-color,box-shadow] duration-300 ease-out sm:px-4 xl:gap-6 xl:px-5",
          stuck
            ? "h-16 border-line/60 bg-surface/85 shadow-[0_12px_36px_-12px_rgba(1,6,26,0.24)]"
            : "h-[72px] border-line/80 bg-surface/95 shadow-[0_10px_30px_-16px_rgba(1,6,26,0.3)]"
        )}
      >
        <a href="/" className="flex shrink-0 items-center" aria-label="ByteFX home">
          <Image
            src="/assets/Logo.png"
            alt="ByteFX"
            width={132}
            height={30}
            priority
            className="h-[26px] w-auto md:h-[30px]"
          />
        </a>

        {/* Seven top-level items need ~755px; below xl the row cannot hold them
            alongside the logo and auth cluster, so the drawer takes over there. */}
        <Menu setActive={setActive} className="hidden gap-7 xl:flex">
          <MenuItem setActive={setActive} active={active} item="Home" href="/" />

          <MenuItem setActive={setActive} active={active} item="Company" href="/company">
            <div className="flex w-56 flex-col">
              <HoveredLink href="/company/about">About ByteFX</HoveredLink>
              <HoveredLink href="/company/why-bytefx">Why ByteFX</HoveredLink>
              <HoveredLink href="/company/trust-security">
                Trust &amp; Security
              </HoveredLink>
              <HoveredLink href="/company/legal">Legal &amp; Compliance</HoveredLink>
              <HoveredLink href="/company/contact">Contact us</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Markets" href="/#markets">
            <div className="grid w-[34rem] grid-cols-2 gap-1">
              {MARKETS.map((m) => (
                <ProductItem key={m.title} {...m} />
              ))}
            </div>
          </MenuItem>

          <MenuItem
            setActive={setActive}
            active={active}
            item="Account Types"
            href="/#accounts"
          >
            <div className="grid w-[34rem] grid-cols-2 gap-1">
              {ACCOUNTS.map((a) => (
                <ProductItem key={a.title} {...a} />
              ))}
            </div>
          </MenuItem>

          <MenuItem
            setActive={setActive}
            active={active}
            item="Partnership"
            href="/#partnership"
          >
            <div className="w-64">
              <ProductItem
                title="Introducing Broker"
                href="/#partnership"
                icon={<Users className="h-4 w-4" strokeWidth={2} />}
                description="Commission per lot, paid daily."
              />
              <ProductItem
                title="Affiliate"
                href="/#partnership"
                icon={<Globe className="h-4 w-4" strokeWidth={2} />}
                description="CPA on every qualified referral."
                accent="green"
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Tools" href="/tools">
            <div className="grid w-[30rem] grid-cols-2 gap-1">
              <ProductItem
                title="Economic calendar"
                href="/tools/calendar"
                icon={<Newspaper className="h-4 w-4" strokeWidth={2} />}
                description="Every release that moves price."
                accent="green"
              />
              <ProductItem
                title="Trading calculators"
                href="/tools/calculators"
                icon={<Scale className="h-4 w-4" strokeWidth={2} />}
                description="Margin, pip value and swaps."
              />
              <ProductItem
                title="Market news"
                href="/tools/news"
                icon={<LineChart className="h-4 w-4" strokeWidth={2} />}
                description="Daily analysis from our desk."
                accent="green"
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Support" href="/support">
            <div className="w-64">
              {SUPPORT.map((s) => (
                <ProductItem key={s.title} {...s} />
              ))}
            </div>
          </MenuItem>
        </Menu>

        <div className="flex items-center gap-2 xl:gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="hidden items-center gap-1 rounded-full px-2 py-1.5 text-[13.5px] font-medium text-body transition-colors hover:text-ink xl:flex"
          >
            EN
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
          <a
            href="/login"
            className="hidden text-[14.5px] font-semibold text-ink transition-colors hover:text-brand sm:block"
          >
            Log in
          </a>
          <Button href="/signup" size="sm" className="hidden sm:inline-flex">
            Sign up
          </Button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-ink xl:hidden"
          >
            <MenuIcon className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-shell/45 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-surface shadow-xl">
            <div className="flex h-20 items-center justify-between border-b border-line px-5">
              <Image
                src="/assets/Logo.png"
                alt="ByteFX"
                width={120}
                height={27}
                className="h-[26px] w-auto"
              />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-ink"
                >
                  <X className="h-5 w-5" strokeWidth={2.2} />
                </button>
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              {MOBILE_NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3.5 text-[16px] font-medium text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="grid gap-3 border-t border-line px-5 py-5">
              <Button href="/signup" size="md" arrow>
                Open live account
              </Button>
              <Button href="/login" variant="ghost" size="md">
                Log in
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
