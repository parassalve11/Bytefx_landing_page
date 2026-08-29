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

| Token | Value | Use |
|---|---|---|
| `brand` | `#1356BE` | text, icons, hairlines, decorative bars |
| `brand-solid` | `#1356BE` | **fills that carry white type** |
| `go` | `#4CD201` | primary CTA fill |
| `on-go` | `#01061A` | type on green |
| `go-600` | `#3CA800` | green text on a `go-50` tint |
| `ink` | `#01061A` | headings |
| `body` / `muted` | `#47536B` / `#8794A8` | paragraphs / eyebrows |
| `line` / `line-strong` | `#E3E9F2` / `#CBD5E5` | hairlines |
| `canvas` / `surface` | `#FFFFFF` / `#FFFFFF` | page / anything on top of it |
| `alt` / `sunken` | `#F7F9FC` / `#F1F4F9` | alternating bands / inset panels |
| `shell` | `#01061A` | drawer scrims and isolated dark panels |
| `warn-50` / `warn-600` | `#FFF4E5` / `#B45309` | advisory notices |
| `up` / `down` | `#16A34A` / `#DC2626` | market data only |

Typeface is **Poppins** 300–700 via `next/font/google`.

Three rules that carry most of the look:

1. **Nothing sits above the H2.** The kicker line every section used to carry
   ("Markets", "Funding", "Mobile"…) restated the heading directly underneath
   it, so it was a word of chrome on every screen — removed, along with the
   category line on each market tile ("EQUITIES" over "Stocks"). The `eyebrow`
   class stays for labels *inside* a card or table (Min. deposit, Watchlist,
   Method / Withdrawal); that is a different job.
2. **Sections alternate white / `bg-alt`,** broken by the two saturated bands.
   That alternation is the rhythm — no dividers. Adding a section means
   re-checking the run.
3. **Headings are solid.** No gradient on text, and no two-tone accent phrase
   — no coloured word inside a sentence at all. Reference is
   [xtb.com](https://www.xtb.com/int), whose headings carry entirely on size,
   weight and tight tracking. Size and weight are the hierarchy; colour goes
   on CTAs, market data and icons.

   This replaced a blue→green `text-gradient-brand` accent on eight headings
   and a blue-word/green-word pair on three more. **The utilities were deleted
   from `globals.css`, not just unused** — `text-gradient-brand`,
   `text-brand-blue` and `text-brand-green` no longer exist, so the treatment
   cannot creep back one span at a time. The old metrics strip always set its
   figures in solid `ink`; the rest of the page now matches it rather than the
   other way round.

All numbers use `.tnum` (tabular figures) so prices never jitter.

### The saturated band

`Section` takes `bg="brand"` — the deep blue `band-brand`, used once on the
landing page (the platforms section) to break the light run so the page is not
one long scroll of white.

Anything placed on it must use fixed-colour classes (`text-white`,
`border-white/20`, `bg-white/8`, the white `pay-puck`) rather than surface
tokens — `text-ink` on a deep blue band is near-black on near-black.

**Known rhythm bug:** `AccountTypes` and `MobileApp` are both `bg="alt"` and
sit adjacent, so the alternation flattens across two full sections. A band
between them was tried and removed (see Platforms below); if it is ever
fixed, flipping one of the two to white is the cheaper move.

A lime `band-go` was tried for the mobile section and removed — that section is
back on `bg-alt`. Worth knowing if it is ever revisited: white on `#4CD201` is
2.3:1 and fails outright, so a green band has to carry near-black type
(`on-go`), and deepening the green enough to carry white stops it reading as
the brand green at all.

### Light only

**The site has no dark mode, and adding one back is a real piece of work
rather than a flag.** The `data-theme` attribute, the pre-paint resolver
script in `app/layout.jsx`, `@custom-variant dark`, the whole
`:root[data-theme="dark"]` token block, twelve unlayered dark overrides for
the treatments that bake in literal colours (`coin`, `band-brand`,
`arc-wash`, `platinum-*`, `plate-well`, `pay-puck`, `::selection`) and
`components/ui/theme-toggle.jsx` were all removed together. Restoring the
toggle without restoring those overrides gives you a half-inverted page.

What survives, and is worth keeping: every themed value is still a bare
custom property on `:root` mapped onto Tailwind names through `@theme
inline`. So `text-ink`, `bg-surface` and `border-line` remain the single
source of truth for a colour, and a palette change is still a one-line edit.
There is no `dark:` utility anywhere in the tree — the one that existed
(`dark:brightness-[1.55]` on the stocks mark in `Markets.jsx`) went with it.

`brand` and `brand-solid` are now the same hue. They are kept as two names
because they mean two different things at the call site, and collapsing them
would lose that.

## Layout

```
app/
  globals.css        design tokens (@theme) + utilities + reduced-motion killswitch
  layout.jsx         Poppins, metadata
  page.jsx           section order — the comments there are load-bearing
components/
  ui/                primitives: section, button, reveal, count-up,
                     accordion, tabs, navbar-menu, glowing-effect
  site/              the page sections
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
(1.3 MB), `forex_video.mp4` (2.3 MB) and `mt5_logo.png` (2.1 MB, a marketing
composite rather than a mark) are still in `public/assets` and still ship. Delete them once you are happy with the derived versions.

## Trading conditions: the metallic carousel

`components/site/Conditions.jsx`, directly under Markets. Replaces
`MetricsStrip`, which is deleted.

The strip rendered the same five numbers as hairline-separated columns. That
was right when it sat directly under the hero and had to stay quiet; as a
section in its own right it read as a footer that had drifted up the page.
These are the five things somebody actually compares between brokers, so they
now get room to be compared — and they sit under Markets rather than under the
hero, because the numbers land better once the reader knows what is traded.

**Reference** is XTB's "Choose your way to understand the market" carousel,
saved at `ref/image.png`. Borrowed: the shape of the interaction, and the idea
that the product art carries the card. Like that reference, all five cards now
share one quiet platinum surface; the numbers and metallic artwork provide the
visual differences instead of unrelated background colours.

### Geometry — measured, not guessed

`ref/image.png` was measured directly rather than eyeballed. The card is
**711 × 314 in an 869-wide frame**:

| Property | Reference | Here |
| --- | --- | --- |
| Card width | 82% of frame | `lg:w-[82%]` |
| Card aspect | 2.26 : 1 | `lg:min-h-[460px]` |
| Art width | ~44% of card | `lg:max-w-[400px]` |
| Next card | peeks at the right edge | same, a consequence of 82% |

The first attempt used `(100%-2rem)/2.4` — a 41% card with 240px art, **less
than half the reference in both dimensions**, which is why it read as a tile
rather than a panel. **If this is re-tuned, keep the card near 82% and the art
above 360px.** The size is the design; shrink either and it stops being this
section.

### Platinum fills

Every card uses the same light platinum gradient from `globals.css`. Dark copy
is shared across the run, including a stronger label tint for readable
contrast.

A narrow highlight crosses a card once when it becomes active or when an
inactive card is hovered. It does not loop, sits behind all content and artwork,
and is removed entirely under reduced motion. The carousel remains the source
of interaction; the sheen is only a quiet response to that state.

**The cursor** is the pill under the track. The active card is a bar rather
than a dot, so it reads as a position along a run instead of five equal
options. It advances every 2s (`DWELL_MS`) and pauses on hover, focus or
touch. **Scroll-snap does the actual paging** — the track is a plain
scrollable region that works with trackpad, swipe, scrollbar and keyboard
whether or not the JS runs, and the cursor is a control over that rather than
a replacement for it. Scroll position is the source of truth for which card is
*shown* (via `IntersectionObserver`), so a manual swipe and an automatic
advance update the cursor through the same path and cannot disagree.
Auto-advance never runs under reduced motion.

**Why the run has a second piece of state.** At the original 5s dwell the
timer could simply read the observed index and add one. At 2s it cannot: the
smooth scroll is usually still in flight when the next tick fires, and the
last-to-first wrap scrolls back across cards 3, 2 and 1, so the observer
reports each of them in turn and a `+1` on the observed index would reverse
the run mid-wrap. `targetRef` holds where the run is heading and `settledRef`
records whether the scroller has arrived; the timer advances the target, and
the observer only re-seats the target once it has caught up — which is what a
genuine user swipe does. The order is therefore always 0→1→2→3→4→0.

**Assets.** The five renders were supplied as 1254px PNGs totalling 8.35 MB.
They are converted to 620px WebP (358 KB total, a 23× saving) and the
component references the `.webp` files. **The source PNGs in
`public/assets/2nd_section/` are now unused and still ship — delete them once
the section is approved.** Re-run the conversion if a render is ever replaced;
620px covers a 2× DPR at the ~240px they display at.

### The terms grid underneath

Four hairline-framed cells below the carousel (`TERMS`), each a **bold**
one-line statement with a supporting sentence and a green rule that extends on
hover: no internal deposit fee, negative balance protection, segregated client
funds, one balance across every market.

The carousel prints the numbers — 1:2000, 0.1 pips, 150+, ~20ms, 24/6. The
grid prints the terms those numbers sit inside, which is the other half of the
same question and reads badly as a sixth card. It is a grid rather than more
cards precisely because these are flat statements with no artwork and no
sequence: nothing here needs to be paged through.

**Nothing in it is a new claim.** All four lines already appear on the site —
three in `WhyByteFX.jsx` (which is not rendered on the landing page, so there
is no on-page repetition) and one in the instruments card copy. Do not add a
fifth line here that is not substantiated somewhere else first.

It reflows 1 → 2 → 4 columns, and the cell borders are switched per breakpoint
(`sm:[&:nth-child(-n+2)]:border-b`, `sm:[&:nth-child(odd)]:border-r`,
`xl:border-b-0!`) so the frame stays a single hairline lattice at every width
rather than leaving a stray edge.

## Platforms: MT5 and TradingView

`PlatformSwitch`, **inside** `components/site/MobileApp.jsx` — not a section
of its own, and it should stay that way.

The two are not alternatives, they are two front ends on one balance, and the
mobile band is already making exactly that argument ("one account, every
device"). Two logos do not need a section to repeat it. Picking one swaps the
line underneath, so the whole thing stays two rows tall however many platforms
are listed. Real tabs — click, arrow keys, Home/End — not hover, which would
put the copy out of reach on touch.

**It sits directly under the device shot,** above the feature grid. The
cluster shows the account on tablet, phone and laptop; this is the line that
says which front ends those are. Separating them put a features grid and two
store badges between the claim and its evidence.

**Atlas AI was a third tab here and has been removed.** The switcher's whole
claim is "the same account opens in all of these", and Atlas is not a place
you open an account — it is an assistant. It now lives in its own launcher;
see "Atlas AI" below. Do not put it back.

The marks are real product art in `public/assets/mobile-section/`
(`meta-treader.png`, `treadingview.png`, `atlas.png`), each on a white
`pay-puck` — TradingView's near-black wordmark has no other ground it reads
on. Note the filenames are misspelled as delivered; they are referenced as-is
rather than renamed, so fix them in one place if at all.

**Do not rebuild this as a band section.** It was tried during this pass — a
full `bg="brand"` section above the mobile band — and removed: it duplicated
a component that already existed, with worse marks (lucide placeholders,
because neither MetaTrader nor TradingView is in simple-icons and
`mt5_logo.png` is a marketing composite rather than a cutout).

## The two Aceternity components

Both were shipped as TSX and are **converted to JSX and re-tuned for light mode** here:

- `components/ui/navbar-menu.jsx` — the stock component is a floating dark pill; this is a full-width sticky header. `ProductItem`'s remote-image slot became an icon tile so the menu never depends on a CDN. The `layoutId="active"` shared-layout animation is preserved.
- `components/ui/glowing-effect.jsx` — the stock conic gradient (pink/gold/olive/slate) is swapped for the brand hues. **Currently unused:** the Markets bento was its only host and that section now carries its own platinum treatment instead. Kept because it is the intended showpiece for whichever section claims one next.

## ByteFX × Thailand

`components/site/Thailand.jsx`, between funding and the final CTA. The page's
one saturated, photographic moment.

**It is an IB incentive campaign, not a market-entry section.** An Introducing
Broker whose referred clients trade 500 lots earns five nights in Thailand.
That makes it the last surviving piece of the Partnership section it replaced
("Grow with ByteFX", deleted this pass) — which is why both CTAs point at
`/partnership` and not `/signup`. The audience is brokers; sending them to the
retail signup form would be the wrong door.

The two numbers *are* the offer, so they are set as the section's largest
non-heading type rather than buried in a paragraph. Everything else is
scaffolding around them.

**The lockup sits above the H2, breaking the section rule on purpose.** That
rule exists because every section used to carry a kicker restating the heading
underneath it — a word of chrome on every screen. This is not that: it is a
campaign lockup carrying the brand mark, and the H2 below says something
completely different. Do not reintroduce a text kicker elsewhere on the
strength of this one.

**The logo is the real `Logo.png`, on a white plate.** It sets "Byte" in brand
blue (`#1357BD`), which on this scrim is about 1.6:1 and unreadable. Rather
than recolour the mark, it sits on a `pay-puck` — the same treatment the
funding section gives Visa, Apple Pay and the app QR code, and for the same
reason: a fixed-colour mark gets the ground it was drawn for instead of being
repainted to suit the surface. A knockout variant was built during this pass
and deleted; the plate is the better answer and it is already the house
pattern.

**The terms are incomplete.** The qualifying period, which account types count
toward the 500 lots, whether the five nights include flights, and the campaign
end date are all unspecified. The disclaimer in the component is deliberately
generic — do not ship it as the full terms.

**The image is natural, not architectural** — Mu Ko Ang Thong National Marine
Park. The prize is a holiday, so it should look like one; a Bangkok skyline
was used first and rejected for reading as a business district.

That swap also dropped a licence problem. The skyline shot was CC BY-**SA**,
whose share-alike clause is a poor fit for a commercial site. This one is
© Vyacheslav Argenberg, plain [CC BY
4.0](https://creativecommons.org/licenses/by/4.0/) via Wikimedia Commons, so
**attribution is the only condition** — but it is a condition, not a caption.
Do not remove the credit line, and do not swap the image without replacing the
credit to match.

**It is a bright image**, unlike the dusk skyline it replaced — turquoise
water across two thirds of the frame. White type therefore depends entirely on
the scrim, which is heavier than it would need to be over a darker photograph.
Check any replacement against the copy before swapping it in.

The master is downscaled to 2200px / q72 progressive JPEG (312 KB) and served
through `next/image` with `sizes="100vw"`; it is deliberately not `priority`,
because it sits six sections down and must not compete with the hero for LCP.

**Removed with it:** the `Partnership` and `Community` components are gone,
and the four `"/#partnership"` anchors in `Navbar.jsx` (nav list, menu item,
two `ProductItem`s) plus the one in `Footer.jsx` now point at `/partnership`.
**That route does not exist yet** — and this section now sends traffic to it
twice more, so it is the single most load-bearing gap on the page.

## The hero

The band is one claim, two buttons and three chips on a blue field, with a
slow orbit of instrument discs behind it. Nothing else is allowed in the
frame: `Ticker` streams live quotes directly beneath it, `Conditions` prints
1:2000, 0.1 pips, 150+, ~20ms and 24/6, and `FinalCta` closes with the risk
warning — so the hero's only job is to state the claim and get out of the way.

Three sections below it dictate the shape:

| Section | What it already owns | What the hero therefore cannot do |
| --- | --- | --- |
| `Conditions` | 1:2000, 0.1 pips, 150+, ~20ms, 24/6 | Restate the numbers |
| `Ticker` | Live streaming quotes | Carry a second live price widget 900px above the first |
| `FinalCta` | "Start trading in under five minutes", risk warning | Be a CTA block. Labels match deliberately — they bookend the page |

### The background

The same treatment as the **"ByteFX Enhanced Trading Tools" card** in
`TradingShowcase`: `linear-gradient(150deg, #2f66d1, #0c2c78)` under a 42px
white grid at 16%. The stops and the grid pitch are the card's own, lifted
into `globals.css` as `hero-tools` / `hero-tools-grid` so the two surfaces
cannot drift apart — **change one and you change both.** Over them sit
`hero-scrim` (contrast for the white type) and `hero-bloom` (one green light
low in the frame, so the CTA is not the only green pixel on a screen of blue).

The grid is masked to an ellipse rather than the card's horizontal fade.
Full-bleed, a horizontally-masked grid cuts off hard against the navbar at the
top and against the white `Ticker` at the foot.

`hero-scrim` is two gradients because one cannot do both jobs: a centre radial
that pulls the middle of the frame down so the H1 clears contrast over the
lighter end of the gradient and over any disc passing behind it, and a linear
that darkens top and bottom — the top so the navbar's white pill has something
to sit on, the bottom so the band meets the white `Ticker` without a bright
seam. It is tinted `#04123a`, not near-black; a neutral scrim greys the blue
out and the band stops matching the tools card.

**This replaced a full-bleed aurora photograph** (`public/assets/hero/aurora.jpg`,
still in the repo and now unused — delete it once this is approved). The
photograph was a licensed stock frame with nothing to do with the product, it
cost ~440 KB on the LCP element, and it needed a heavy scrim to keep the H1
legible. The gradient costs nothing and is on-brand by construction.

This is still the only dark band on the site. Everything below is the white /
`alt` alternation, and the hard edge at the foot of this section is the page's
first and strongest contrast — do not soften it with a border.

### The orbit

React Bits' `OrbitImages` (`components/ui/OrbitImages.jsx`), with two local
changes:

1. `"use client"` and `useReducedMotion` — the motion contract says every loop
   stops under `prefers-reduced-motion`, and an orbit that never stops is
   exactly what that rule exists for. It parks the discs where they are rather
   than hiding them, so the composition still holds.
2. An optional `items` prop. Upstream only orbits `<img>` URLs; the hero
   orbits the site's own `InstrumentIcon` coin discs, which are components,
   not files. `images` behaves exactly as upstream when `items` is absent.

Two counter-rotating ellipses at different radii — one ring reads as a
carousel, two read as depth. Eight instruments covering every asset class the
eyebrow names: three majors, both metals, both crypto and one index. The ring
is the product line, not abstract decoration.

It sits **between the grid and the scrim**, so the scrim's centre radial dims
whichever disc is passing behind the headline and leaves the ones out at the
edges bright. That is the whole reason the copy stays readable with objects
moving under it. The layer is `aria-hidden` in the component and
`pointer-events-none` here: nothing in it is reachable or announced.

`InstrumentIcon` is sized by its `size` prop, not by CSS — `PairCoin` builds a
fixed pair of overlapping flag discs and ignores width utilities entirely — so
the rings pick a named size (`lg` is ~56px, `md` is ~44px) and `itemSize` is
set to leave a margin around it. The glass ring behind each disc is
`.hero-orbit` in `OrbitImages.css`; it goes *behind* the coin rather than
around it, because the coin already carries its own gradient, rim light and
drop shadow.

**Open:** there is no regulator chip. ByteFX Capital Ltd's licence entity and
number need the same compliance sign-off the Trust items are badged for. Add
it to `CHIPS` in `Hero.jsx` once legal confirms — the row is built for four
and currently carries three. The withdrawal-speed line was cut from the lead
copy for the same reason.

## Atlas AI

`components/site/AtlasChat.jsx`, mounted in `app/layout.jsx` so it is on every
page. A launcher pinned to the **bottom-left** of the viewport that opens a
chat panel above itself.

Bottom-left on purpose: bottom-right is where scroll and cookie furniture
goes, and on mobile the right thumb rest is already the busiest corner. It
carries its label ("Ask Atlas AI") on desktop — an unlabelled circle in a
corner is a guess. The panel header uses `hero-tools`, the same gradient as
the hero band and the tools card, so it reads as part of the site rather than
a bolted-on third-party bubble.

**Matching is by word prefix, not substring.** This is the one piece of
`AtlasChat` that is easy to get wrong and was in fact got wrong first time: a
plain `includes` check answered "what is your refund policy" with the
deposit-methods line, because "refund" contains "fund". `prefixMatcher`
anchors each phrase to the start of a word, so `fund` still catches "funding"
and "funds" while "refund" falls through to the fallback — which is where a
question this table cannot answer belongs. Keep that property when you add
entries, and prefer stems (`trade`, `spread`, `fee`) over whole words.

**It is a scripted assistant, not a model.** There is no Atlas endpoint yet.
`KNOWLEDGE` is a lookup table over facts already printed elsewhere on this
site — the account specs in `AccountTypes`, the numbers in `Conditions`, the
funding line in `Funding`, the platforms in `MobileApp`. It invents nothing,
and when a question does not match it says so and hands off to `/support`
rather than guessing. Nothing is persisted and nothing leaves the browser.

The header badge reads **"Scripted demo"** and must keep reading it until this
is wired to a real model. When the endpoint lands: replace `answerFor()` with
the request, keep `KNOWLEDGE` as the seeded suggestions, drop the badge.

Escape closes it, the input takes focus on open, the transcript is a
`role="log"` with `aria-live="polite"`, and the panel footer says in plain
words that the answers are scripted and are not financial advice.

## Motion contract

- Section entry: `opacity 0→1, y 24→0`, 0.5s, `[0.22,1,0.36,1]`, `once: true`. Use `Reveal` / `RevealGroup` + `RevealItem`.
- Two signature moments only: the ticker's tick-flash, and the phone parallax in the mobile section.
- `prefers-reduced-motion: reduce` disables every reveal, counter, marquee and parallax — enforced both in `globals.css` and per-component via `useReducedMotion()`. Keep it that way.

## Before this goes live

- **`/partnership` does not exist**, and it is now the page's main conversion
  target. Seven links point at it: four in `Navbar.jsx`, one in `Footer.jsx`,
  and both CTAs in the Thailand IB campaign. Build the route before ship.
- **The Thailand campaign terms are incomplete.** Qualifying period, eligible
  account types, whether flights are included, and the end date are all
  unspecified; the disclaimer in `Thailand.jsx` is a placeholder, not the
  terms. See “ByteFX × Thailand”.
- The hero ships without a **regulator trust chip** and without a
  withdrawal-speed claim; both need compliance sign-off. See “The hero”.
- Items badged **LEGAL REVIEW** in the Trust section, and the withdrawal
  windows in `Funding.jsx`, need compliance sign-off. The marketing reference
  for the funding section prints INSTANT on crypto/USDT withdrawals; the live
  site says ~1 hour. The conservative number ships — flip it only on sign-off.
- **Delete `public/assets/2nd_section/image{1..5}.png`** (8.35 MB) once the
  conditions carousel is approved — the component uses the `.webp` versions
  and the PNGs ship for nothing.
- WebTrader and phone screens are hand-built placeholders; swap for real product captures.
- `components/site/Ticker.jsx` runs a simulated feed. Replace `useSimulatedFeed` with the real socket; the contract is `{ symbol, price, change }`.
- Platform capability lines in `MobileApp.jsx`'s `PLATFORMS` are written from
  what each platform does generally, not from an integration spec. Confirm the
  TradingView broker link.
- **Atlas AI answers are a scripted lookup table**, not a model, and the panel
  says so on its header badge and in its footer. Wire `answerFor()` to the
  real endpoint and drop the badge before anyone treats it as support. Have
  compliance read `KNOWLEDGE` first — it restates account, spread, leverage
  and funding terms in a conversational voice, which is a different review
  surface from the same facts in a spec table.
- **Delete `public/assets/hero/aurora.jpg`** (440 KB) once the new hero band
  is approved — nothing references it any more.
- Mobile has been audited statically but not viewed on a device. Check 390 / 768 / 1024.
  The funding rail (hub + connector fan) is `lg:` and up only; below that the
  method list carries the section on its own.
- **Seen rendered at ~1440 only.** The hero band, the orbit, the terms grid,
  the two-tab platform switcher and the Atlas panel have all been looked at in
  a browser and behave. Confirmed live: the carousel advances on 2s and wraps
  forwards from the last card to the first (forced to index 4, the next
  reading was index 1, i.e. 4 → 0 → 1), and Atlas returns the fallback for
  "what is your refund policy" rather than the funding answer.
- **Mobile has still not been viewed.** The verification browser was running
  at ~33% page zoom, so a 390px window still laid out as desktop and the
  narrow breakpoints could not be exercised. Check 390 / 768 before ship — in
  particular the hero orbit against the copy column, where the ellipse is
  sized off `min(1500px, 168vw)` and has only been reasoned about below
  `sm`, and the Atlas panel, which is `w-[min(370px,calc(100vw-2rem))]`.
- Still unverified by eye: the white type and logo plate over the Ang Thong
  photo, and the Atlas launcher against the footer at the very bottom of the
  page.
- The Markets video has not been watched playing in a browser — the verification tab was backgrounded throughout, and Chrome will not decode media there. Wiring, poster, encode and first frame are all confirmed; **watch it loop once** before shipping.
