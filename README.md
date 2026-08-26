# ByteFX landing — redesign v2

A ground-up rebuild of the bytefx.com homepage, following `../plan.md`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Stack

- **Next.js 16** (App Router, Turbopack) — the page prerenders fully static
- **JavaScript / JSX only** — no TypeScript
- **Tailwind CSS v4** — tokens are CSS-first in `app/globals.css` under `@theme`. There is **no `tailwind.config.js`**; adding one will not be read.
- `motion/react` for animation, `lucide-react` for icons, `cn()` in `lib/utils.js`

## Design system

Brand values sampled from the live site, not guessed:

| Token | Light | Dark | Use |
|---|---|---|---|
| `brand` | `#1356BE` | `#6AA4FF` | text, icons, hairlines, decorative bars |
| `brand-solid` | `#1356BE` | `#2461C9` | **fills that carry white type** |
| `go` | `#4CD201` | `#4CD201` | primary CTA fill |
| `on-go` | `#01061A` | `#01061A` | type on green — never inverts |
| `go-600` | `#3CA800` | `#77E63A` | green text on a `go-50` tint |
| `ink` | `#01061A` | `#EAF0FA` | headings |
| `body` / `muted` | `#47536B` / `#8794A8` | `#A3B1C7` / `#7385A0` | paragraphs / eyebrows |
| `line` / `line-strong` | `#E3E9F2` / `#CBD5E5` | `#202A3D` / `#2E3B53` | hairlines |
| `canvas` / `surface` | `#FFFFFF` / `#FFFFFF` | `#070C17` / `#111A2C` | page / anything on top of it |
| `alt` / `sunken` | `#F7F9FC` / `#F1F4F9` | `#0B1120` / `#121B2C` | alternating bands / inset panels |
| `shell` | `#01061A` | `#030711` | footer plinth and drawer scrims — dark in **both** themes |
| `warn-50` / `warn-600` | `#FFF4E5` / `#B45309` | `#3A2A10` / `#F0B45F` | advisory notices |
| `up` / `down` | `#16A34A` / `#DC2626` | `#2ECC71` / `#F26363` | market data only |

Typeface is **Poppins** 300–700 via `next/font/google`.

Three rules that carry most of the look:

1. **Every section gets an eyebrow above the H2.** `Section` handles it.
2. **Sections alternate white / `bg-alt`.** That alternation is the rhythm — no dividers. Adding a section means re-checking the run.
3. **Never a blue→green gradient on text.** Blue and green have separate jobs.
   `text-gradient-brand` is display headings only — at most one per section.
   The metrics strip deliberately does *not* use it.

All numbers use `.tnum` (tabular figures) so prices never jitter.

### Dark mode

Light is the default and the OS setting is **not** consulted — this is a
marketing site and the light palette is the brand's. Dark is opt-in via the
navbar switch (`components/ui/theme-toggle.jsx`).

The whole mechanism is one attribute: `data-theme="light" | "dark"` on
`<html>`, written before first paint by the inline script in `app/layout.jsx`
(the pattern from `next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`).
`@custom-variant dark` in `globals.css` keys off that attribute, so there is
never a media query and a class disagreeing about the current theme. The
toggle renders both icons and lets CSS pick the visible one — no client state,
so no hydration mismatch and no flash of the wrong icon. All routes stay
statically prerendered.

Every themed value is a bare custom property on `:root` / `:root[data-theme="dark"]`,
mapped onto Tailwind names through `@theme inline`. **Ordinary surface work
therefore needs no `dark:` variant** — `text-ink`, `bg-surface`, `border-line`
flip on their own. Three things do need care:

- **Fills that carry white type** use `brand-solid`, not `brand`. `brand`
  lightens in dark mode (good for text, wrong for a fill).
- **Anything dark in both themes** — the footer, drawer scrims — uses `shell`,
  not `ink`. `ink` inverts.
- **Third-party marks with fixed colours** (Visa blue, Apple Pay black, the
  navy bank glyph, the app QR code) sit on a white puck in both themes rather
  than being recoloured. See `pay-puck` in `globals.css`.

Treatments that bake in literal colours — `platinum-plate`, `band-brand`,
`card-frame`, `coin`, `arc-wash` — get dark overrides in the unlayered block at
the foot of `globals.css`, which beats the `@utility` output without any
specificity games.

## Layout

```
app/
  globals.css        design tokens (@theme) + utilities + reduced-motion killswitch
  layout.jsx         Poppins, metadata
  page.jsx           section order — the comments there are load-bearing
components/
  ui/                primitives: section, button, reveal, count-up,
                     accordion, tabs, navbar-menu, glowing-effect
  site/              the 16 page sections
lib/utils.js         cn()
```

## Icons

Instrument marks are **real logos**, not generic glyphs — that was a specific
client requirement and it is what the original page did too.

- `components/ui/brand-icons.jsx` — 19 brand marks extracted at build time from
  `simple-icons` (CC0). Apple, NVIDIA, Tesla, Google, Meta, Bitcoin, Ethereum,
  Tether, Visa, Mastercard, Apple Pay, and the socials.
- `components/ui/flag-icons.jsx` — country flags from `country-flag-icons`
  (MIT), used for paired FX discs (EUR/USD renders as an EU disc behind a US
  disc).
- `components/ui/asset-icon.jsx` — `InstrumentIcon` maps a symbol to the right
  mark. Add new instruments there so the ticker, bento and watchlist can never
  disagree.

Both source packages are **devDependencies** — the marks are already inlined,
so nothing ships to the browser but the paths actually used. Re-run the
extraction only if a mark needs updating. Amazon, Microsoft and LinkedIn are
not in simple-icons v16 (trademark removals); LinkedIn falls back to lucide.

## Markets: the platinum bento

Five tiles on a six-column grid — Forex (4) + Indices (2), then Crypto,
Stocks and Metals & Energy (2 each). Reference: `references/market.png`.

**Where the platinum goes.** On the **tile**, not on the section and not in a
well behind each mark. The supplied marks are dark steel cut out on
transparency; on flat white they read as stickers, so they need a metal
surface, and a card is the right size for that surface. Flooding the whole
section instead drops a slab of mid-grey into a page whose entire hierarchy is
the white/alt alternation — so `platinum-wash` on the section is deliberately
only a whisper of the same cool cast. The three utilities are `platinum-plate`
(the tile), `platinum-grain` (milled micro-texture over it) and
`platinum-wash` (the section).

**Marks.** `indices.png`, `CrypoCurrency.png` and `gold_and_sliver.png` are
used as delivered. Two were not usable as delivered and were derived:

| Asset | Derived from | How |
| --- | --- | --- |
| `stocks_metal.png` | `company_stocks.png` | The five brand cards cut out and composited 3 + 2, then flattened to one steel tone with a top-lit ramp. Five brand palettes on a metal plate was the only thing in the section not sharing an art direction. |
| `forex_coins.mp4` + `.jpg` poster | `forex_video.mp4` | Watermark cropped, black studio backdrop luma-keyed out and re-composited onto the plate tone, audio stripped, re-encoded 2.3 MB → 601 KB. |

Recipe for the video, should the source ever be re-cut (needs `ffmpeg`):

```sh
ffmpeg -i forex_video.mp4   -filter_complex "[0:v]crop=544:486:0:0,format=rgba,lumakey=threshold=0.045:tolerance=0.075:softness=0.045[k];color=c=0xECEBE9:s=544x486[bg];[bg][k]overlay=shortest=1,hqdn3d=3:2:6:6,format=yuv420p"   -an -c:v libx264 -profile:v high -crf 33 -preset veryslow   -movflags +faststart forex_coins.mp4
ffmpeg -i forex_coins.mp4 -frames:v 1 -q:v 5 forex_coins_poster.jpg
```

H.264 carries no alpha, so the keyed clip is baked onto `#ECEBE9` and sits in
a recessed well of the same colour — that is why Forex is the one tile whose
mark does not float free. **That tone is baked into the video, so it cannot
follow the theme**: in dark mode Forex is a light media panel on a dark card,
framed deliberately (see `.plate-well` overrides in `globals.css`). To make it
go dark too, re-run the recipe above with `color=c=0x171D26` and swap the
source by theme — it needs `forex_video.mp4`, which is no longer in the repo. It is `preload="none"`, played and paused by an
IntersectionObserver, and never fetched at all under reduced motion, where the
poster is the whole story.

**Unused after this change** — `currency.png` (1.6 MB), `company_stocks.png`
(1.3 MB) and `forex_video.mp4` (2.3 MB) are still in `public/assets` and still
ship. Delete them once you are happy with the derived versions.

## The two Aceternity components

Both were shipped as TSX and are **converted to JSX and re-tuned for light mode** here:

- `components/ui/navbar-menu.jsx` — the stock component is a floating dark pill; this is a full-width sticky header. `ProductItem`'s remote-image slot became an icon tile so the menu never depends on a CDN. The `layoutId="active"` shared-layout animation is preserved.
- `components/ui/glowing-effect.jsx` — the stock conic gradient (pink/gold/olive/slate) is swapped for the brand hues. **Currently unused:** the Markets bento was its only host and that section now carries its own platinum treatment instead. Kept because it is the intended showpiece for whichever section claims one next.

## Motion contract

- Section entry: `opacity 0→1, y 24→0`, 0.5s, `[0.22,1,0.36,1]`, `once: true`. Use `Reveal` / `RevealGroup` + `RevealItem`.
- Two signature moments only: the ticker's tick-flash, and the phone parallax in the mobile section.
- `prefers-reduced-motion: reduce` disables every reveal, counter, marquee and parallax — enforced both in `globals.css` and per-component via `useReducedMotion()`. Keep it that way.

## Before this goes live

- The **hero is a placeholder** — designed last by intent (plan §11.6).
- Items badged **LEGAL REVIEW** in the Trust section, and the withdrawal
  windows in `Funding.jsx`, need compliance sign-off. The marketing reference
  for the funding section prints INSTANT on crypto/USDT withdrawals; the live
  site says ~1 hour. The conservative number ships — flip it only on sign-off.
- WebTrader and phone screens are hand-built placeholders; swap for real product captures.
- `components/site/Ticker.jsx` runs a simulated feed. Replace `useSimulatedFeed` with the real socket; the contract is `{ symbol, price, change }`.
- Mobile has been audited statically but not viewed on a device. Check 390 / 768 / 1024.
  The funding rail (hub + connector fan) is `lg:` and up only; below that the
  method list carries the section on its own.
- Dark mode has been walked through every route in a browser, but only at
  1440px. Re-check it at mobile widths on a real device.
- The Markets video has not been watched playing in a browser — the verification tab was backgrounded throughout, and Chrome will not decode media there. Wiring, poster, encode and first frame are all confirmed; **watch it loop once** before shipping.
