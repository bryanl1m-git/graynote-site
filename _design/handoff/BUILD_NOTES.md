# Graynote – Website · build notes for Vee

Two pages: **`/`** (graynote.io) and **`/bryan`** (the page the QR code on Bryan's business card opens).
Bryan approved the design on 4 Oct 2026. It's meant to be quiet and confident, with a lot of white space, like his business card brought to life.
It's a static site: no CMS, no tracking scripts, no cookie banner needed.

| File | What it is |
|---|---|
| `tokens.css` | CSS custom properties: colours, spacing, radii, text styles, per-breakpoint type and layout roles |
| `tokens.json` | The same values as JSON (W3C design-tokens draft format), plus layout measurements |
| `copy.md` | All final copy, exactly as in Figma, plus every link target |
| `svg/` | Logo, ΛO monogram, icons and a favicon, all optimised with SVGO |
| `img/` | Bryan's photo with the tone treatment baked in (400 and 800px, JPG + WebP) |
| `bryan.vcf` | A ready-made vCard. Serve it at `/bryan.vcf` |
| `png/` | Fresh exports of the 4 page frames, for reference |

---

## 1. Font: Montserrat, not Gotham

The brand font is **Gotham** (Bold and Medium), but it wasn't available in Figma, so the whole design is set in **Montserrat** from Google Fonts. Build with Montserrat so the site matches the approved design. If Graynote licenses Gotham later, it's a one-line swap of `--font-family`, but the spacing has only been checked with Montserrat.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
```
The design uses only two weights: **500 (Medium)** for body text and **700 (Bold)** for headings, labels and buttons. No italics. Self-hosting the two woff2 files is fine too and saves a DNS lookup.

**Brand letterforms:** the logo's A is drawn as **Λ** (no crossbar) and its O is a **solid dot**. They live in the SVG logo and the ΛO monogram only. Don't try to imitate them in live text.

## 2. Page structure

### `/` (Home)
```html
<body>
  <div class="top">                          <!-- dot grid sits behind this whole block -->
    <header class="site-header">
      <a href="/" class="logo"><img src="/svg/graynote-labs-charcoal.svg" alt="Graynote Labs" width="152" height="36"></a>
      <a href="mailto:bryan.lim@graynote.io" class="link">Let's talk <svg …arrow-right/></a>
    </header>
    <section class="hero">
      <img src="/svg/ao-monogram-charcoal.svg" alt="" aria-hidden="true" class="ao">
      <h1>We play in the gray, so you don’t have&nbsp;to.</h1>
      <p class="hero-sub">Messy problems in, clear results out.</p>
    </section>
  </div>
  <main>
    <section class="row" aria-labelledby="how">           <!-- 1px rule on top -->
      <h2 id="how" class="label">How we work</h2>
      <p class="paragraph">Graynote takes on all kinds of work, …</p>
    </section>
    <section class="row ventures" id="ventures" hidden>…</section>   <!-- §6 -->
    <section class="row" aria-labelledby="next">
      <h2 id="next" class="label">Next</h2>
      <div class="cta">
        <p class="cta-heading">Got something in mind?</p>
        <p class="cta-sub">Start with an email. We’ll take it from there.</p>
        <a class="btn btn-primary" href="mailto:bryan.lim@graynote.io">Let's talk <svg …arrow-right/></a>
      </div>
    </section>
  </main>
  <footer class="site-footer"><div class="tab">
    <img src="/svg/graynote-labs-light.svg" alt="Graynote Labs" width="120" height="28">
    <div class="meta"><a href="mailto:bryan.lim@graynote.io">bryan.lim@graynote.io</a><span>© 2026 Graynote Labs</span></div>
  </div></footer>
</body>
```

### `/bryan`
This page was designed **mobile-first**, because most people open it on a phone right after scanning the card.
```html
<body class="bryan">
  <div class="top">                          <!-- dot grid behind everything above the footer -->
    <header class="top-bar">
      <a href="/"><!-- mobile: ΛO mark 44×19 · desktop: full logo 152×36 --></a>
      <span class="label">Nice to meet you</span>
    </header>
    <main class="card-column">              <!-- mobile: full width, 24px sides · desktop: 440px, centred -->
      <div class="profile">                 <!-- centred text -->
        <img class="avatar" src="/img/bryan-photo-400.jpg" srcset="/img/bryan-photo-400.jpg 400w, /img/bryan-photo-800.jpg 800w" sizes="136px" alt="Bryan Lim" width="136" height="136">
        <h1 class="name">Bryan Lim</h1>
        <span class="rule" aria-hidden="true"></span>   <!-- 48×3, #D5D5D5, radius 2 -->
        <p class="title">Wordsmith</p>
        <p class="bio">Paint the World</p>
      </div>
      <nav class="contacts" aria-label="Contact Bryan">
        <a class="contact contact--primary" href="/bryan.vcf" download>…Save contact / Add to your phone (vCard)</a>
        <a class="contact" href="https://wa.me/60102201674">…WhatsApp / 010-220 1674</a>
        <a class="contact" href="mailto:bryan.lim@graynote.io">…Email / bryan.lim@graynote.io</a>
        <a class="contact" href="https://www.linkedin.com/in/bryan-lsw/">…LinkedIn / linkedin.com/in/bryan-lsw</a>
      </nav>
    </main>
  </div>
  <footer class="site-footer"><!-- same footer, but the link reads "Visit graynote.io →" → https://graynote.io/ --></footer>
</body>
```
Contact button anatomy (each one is a single `<a>`): `[icon 24] [label (Button/M) over detail (Body/S), 4px apart] [arrow-up-right 20, pushed right]`. Padding is 16px 24px, gaps are 16px, radius is 12px, and the button is the full width of the column with 12px between buttons.
Icons: vCard → `icon-vcard.svg`, WhatsApp → `icon-whatsapp.svg`, Email → `icon-mail.svg`, LinkedIn → `icon-linkedin.svg`. Put them inline so `currentColor` works.

## 3. Breakpoints and what changes between 390 and 1440

The site is built **mobile-first**. The 390 design is the default. The 1440 design takes over at **`min-width: 1024px`**, which `tokens.css` already handles for the role variables. Content maxes out at **1312px**, centred. Above 1440, only the side margins grow.

| | Mobile (390 design, < 1024) | Desktop (1440 design, ≥ 1024) |
|---|---|---|
| Side padding | 24px | 64px |
| Header | 24px padding, logo 112×27 | 32px 64px padding, logo 152×36 |
| Hero padding | 96px top / 128px bottom, 24px gaps | 160px top and bottom, 32px gaps |
| ΛO mark in hero | 48×21 | 64×28 |
| Hero headline | 56px (Display/L metrics: lh 1.08, −0.025em) | 128px Display/XL (lh 1.0, −0.035em) |
| Between them | `--hero-size: clamp(3.5rem, 1.829rem + 6.857vw, 8rem)` scales from 56 → 128 | |
| Hero subline / paragraph | Body/M 18px | Body/L 24px |
| Section rows | Stacked: rule → 32px → label → 24px → content | Two columns: **352px** label column + **960px** content column. Rule → 64px → row |
| Section bottom padding | 96px | 128px |
| CTA heading | Heading/L 32px (wraps to "Got something / in mind?") | Display/L 64px, one line |
| CTA subline → button | 56px | 80px |
| Venture cards | 1 column, 24px gaps | Wrapping row of 3 (296px each in the 960 column), 24px gaps |
| Footer | Inset 16px, tab padding 48px 24px, stacked and centred (logo, then email and © 8px apart) | Inset 32px, tab padding 64px, logo left and meta right (32px gap) |
| /bryan column | Full width, padding 16px 24px 64px, 32px gaps, avatar 120 | 440px centred, padding 48px 0 128px, 48px gaps, avatar 136 |
| /bryan top bar | ΛO mark 44×19 | Full logo 152×36 |

**Hero line breaks.** Bryan asked that no word ever sit alone on a line. I tested this in Chrome at 390, 414, 430, 500, 600, 768, 900, 1023, 1024, 1100, 1200, 1280, 1366, 1440 and 1600px:
```css
.hero h1 { font-size: var(--hero-size); line-height: var(--hero-lh); letter-spacing: var(--hero-ls); text-wrap: balance; }
```
together with **`have&nbsp;to.`** in the markup. The result matches Figma exactly at 390 (`We play in / the gray, so / you don’t / have to.`) and at 1440 (`We play in the gray, / so you don’t have to.`). Between those widths it gives three lines (`We play in the / gray, so you / don’t have to.`). Without the `&nbsp;`, `text-wrap: pretty` left "to." alone on a line at 1280. Browsers without `text-wrap: balance` still get the `&nbsp;` protection.

## 4. Dot-grid background

It's a subtle grid of `#D5D5D5` dots, 2.6px across and 24px apart, with the first dot centre 12px from the top-left corner. The grid fades out towards the bottom. It sits behind the header and hero on Home (the `.top` block), and behind everything above the footer on /bryan. It's purely decorative.

```css
.top { position: relative; isolation: isolate; }
.top::before {
  content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background-image: radial-gradient(circle at center, var(--dot-color) var(--dot-size), transparent calc(var(--dot-size) + 0.5px));
  background-size: var(--dot-pitch) var(--dot-pitch);
  background-position: 0 0;
  /* Figma: white overlay 0% → 35% at 55% → 100% at the bottom = this mask: */
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgb(0 0 0 / .65) 55%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, rgb(0 0 0 / .65) 55%, transparent 100%);
}
```
On high-density screens the 1.3px radius renders as a crisp dot. If dots look blurry on 1x screens, round `--dot-size` to `1.5px`. The pattern is identical on mobile and desktop (no scaling). It's a `::before` pseudo-element, so screen readers ignore it.

## 5. Interaction states (hover / pressed)

Figma's prototype switches states instantly. On the web, use a short transition: `transition: background-color var(--duration-fast) var(--ease-standard)`. Show **pressed** with `:active`. Figma has no focus state, so I'm recommending one: `:focus-visible { outline: 2px solid var(--color-border-strong); outline-offset: 3px; }`, using `#E6E6E6` for the outline in the footer. On touch devices, wrap hover styles in `@media (hover: hover)` so states don't stick after a tap.

| Component | Default | Hover | Pressed (`:active`) |
|---|---|---|---|
| **Button / Primary** (Home CTA "Let's talk") | bg `#333333`, text `#FFFFFF`, Button/M, padding 16px 32px, radius 12, label + arrow-right 20 (12px gap) | bg `#4D4D4E` | bg `#1F1F1F` |
| **Button / Secondary** (in the component library, not used on the pages yet) | bg `#FFFFFF`, 1.5px `#333333` border, text `#333333` | bg `#E6E6E6` | bg `#D5D5D5` |
| **Button / Link** (header "Let's talk") | text `#333333` + arrow-right 20, 8px gap, no underline | underline, 1.5px thick, 4px offset (my suggestion; see note) | opacity 0.6 |
| **ContactButton / Primary** (Save contact) | bg `#333333`, label `#FFFFFF`, detail `#E6E6E6`, white icons | bg `#4D4D4E` | bg `#1F1F1F` |
| **ContactButton / Tonal** (WhatsApp, Email, LinkedIn) | bg `#E6E6E6`, label `#333333`, detail `rgb(51 51 51 / .72)` | bg `#D5D5D5` | bg `#C9C9C9` |
| **Footer links** (email, "Visit graynote.io →") | `#E6E6E6`, Body/S | underline (my suggestion; Figma has no hover state) | opacity 0.6 (suggestion) |
| **Logo** | n/a | none | none |
| **VentureCard** | static, `#E6E6E6`, radius 24 | none for now (if cards ever link somewhere, use bg `#D5D5D5`) | n/a |

Note: in Figma, the Link **hover** variant looks exactly like Default (only Pressed changes, to opacity 0.6). The underline on hover is **my recommendation for the code**. I tried to add it in Figma, but the change spread to every Button variant. I reverted it, so the Figma file is exactly as Bryan approved it.

## 6. Ventures section (built, hidden by default)

This section will hold future sub-brands and ventures. Bryan hasn't decided when the first one launches. It's already in both Home frames, **hidden**, between "How we work" and the CTA. To add a venture, you just add a card. Show the section once there's at least one real venture, and keep it hidden while there are none.

```html
<section class="row ventures" id="ventures" aria-labelledby="ventures-label" hidden>
  <h2 id="ventures-label" class="label">Ventures</h2>
  <div class="ventures-body">                                  <!-- 48px gap desktop / 32px mobile -->
    <p class="section-heading">A few things of our own.</p>   <!-- Heading/L -->
    <ul class="venture-grid" role="list">
      <li>
        <article class="venture-card">
          <span class="venture-mark" aria-hidden="true">V<i class="dot"></i></span>
          <div class="venture-text">
            <h3 class="venture-name">Venture name</h3>       <!-- Label/Venture: 16px Bold, uppercase, 0.14em -->
            <p class="venture-line">One line about what it is.</p>   <!-- Body/S, muted -->
          </div>
        </article>
      </li>
      <!-- one <li> per venture -->
    </ul>
  </div>
</section>
```
```css
.venture-grid { display: grid; gap: 24px; grid-template-columns: 1fr; list-style: none; padding: 0; margin: 0; }
@media (min-width: 1024px) { .venture-grid { grid-template-columns: repeat(3, 1fr); } }
.venture-card { background: var(--color-bg-subtle); border-radius: var(--radius-lg); padding: 32px;
  display: flex; flex-direction: column; align-items: flex-start; gap: 32px; height: 100%; }
.venture-text { display: flex; flex-direction: column; gap: 8px; }
.venture-mark { width: 56px; height: 56px; border-radius: var(--radius-md); background: var(--color-bg-inverse); color: var(--color-text-inverse-muted);
  display: inline-flex; align-items: center; justify-content: center; gap: 3px; font: 700 24px/1 var(--font-family); }
.venture-mark .dot { width: 17px; height: 17px; border-radius: 50%; background: currentColor; }   /* the "O" of ΛO */
```
The **mark** follows the ΛO idea: the venture's initial, then a solid dot, light gray on charcoal. If a venture has its own logo, swap it into the 56×56 tile.
Ideally the cards come from a small data array (`[{ initial, name, line, href? }]`), and the section renders only when that array isn't empty.
The cards in Figma (Venture one / New venture / Experiment X) and the white "PLACEHOLDER" tag are **examples only**. Don't ship them. The "Future: Ventures" frame shows them in use.

## 7. vCard (`/bryan.vcf`)

`bryan.vcf` in this package is ready to use. It's vCard 3.0, the format iOS and Android import most reliably, with CRLF line endings, long lines folded, and a 256px JPEG photo embedded (12 KB in total).

| Field | Value |
|---|---|
| N / FN | Lim;Bryan / Bryan Lim |
| TITLE | Wordsmith |
| ORG | Graynote Labs |
| EMAIL (work) | bryan.lim@graynote.io |
| TEL (cell) | +60 10-220 1674 *(shown on the page in local format as 010-220 1674)* |
| URL | https://graynote.io/bryan |
| LinkedIn | https://www.linkedin.com/in/bryan-lsw/ (as a labelled URL, plus `X-SOCIALPROFILE`) |
| PHOTO | Embedded base64 JPEG, with the same tone treatment as the site |

Serve it with these headers:
```
Content-Type: text/vcard; charset=utf-8
Content-Disposition: attachment; filename="bryan-lim.vcf"
```
On iOS Safari, tapping the link opens the "Create New Contact" sheet straight away. Test once on a real iPhone and a real Android phone. If you rebuild the file, keep the photo under about 100 KB, because some Android contact apps reject large photos.

## 8. Photo

`img/bryan-photo-400.jpg` / `-800.jpg` (and `.webp` versions) are a 1:1 head-and-shoulders crop with the Figma tone treatment **baked in**: saturation −25% and contrast +3% (PIL `Color 0.75` then `Contrast 1.03`). That way the browser doesn't need CSS filters. I compared my version against Figma's own render: the average difference is about 2.5 out of 255 per channel, versus 8.6 with no treatment, so it matches.
Show it as a circle (`border-radius: 50%`) with a **4px `#E6E6E6` ring**: `border: 4px solid var(--color-border-subtle); box-sizing: border-box;`. It's 120px on mobile and 136px on desktop. The 400px file covers both sizes on 2x screens, and the 800px file covers 3x phones. `img/bryan-photo.jpg` is the same image as the 800px file, under a plain name.

## 9. Suggested meta and OG tags

```html
<!-- / -->
<title>Graynote Labs</title>
<meta name="description" content="We play in the gray, so you don’t have to. Messy problems in, clear results out.">
<link rel="canonical" href="https://graynote.io/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Graynote Labs">
<meta property="og:title" content="Graynote Labs">
<meta property="og:description" content="We play in the gray, so you don’t have to.">
<meta property="og:url" content="https://graynote.io/">
<meta property="og:image" content="https://graynote.io/og-image.png">   <!-- 1200×630, not designed yet -->
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<!-- Also add a 180×180 apple-touch-icon PNG made from svg/favicon.svg -->

<!-- /bryan -->
<title>Bryan Lim · Graynote Labs</title>
<meta name="description" content="Bryan Lim, Wordsmith at Graynote Labs. Save my contact, or reach me on WhatsApp, email or LinkedIn.">
<link rel="canonical" href="https://graynote.io/bryan">
<meta property="og:type" content="profile">
<meta property="og:title" content="Bryan Lim · Graynote Labs">
<meta property="og:description" content="Wordsmith. Paint the World.">
<meta property="og:url" content="https://graynote.io/bryan">
<meta property="og:image" content="https://graynote.io/img/bryan-photo-800.jpg">
<meta name="twitter:card" content="summary">
```
The meta copy above is my suggestion and isn't in Figma, so Bryan should OK it. There's no OG share image for Home yet. A plain 1200×630 white card with the logo and the headline, on the dot grid, would fit the site.
`/bryan` should be indexable and should not redirect, because the business-card QR code points at it.

## 10. Figma links

File: **Graynote – Website**, https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe (Backup team)

| Frame | Link |
|---|---|
| Home – Desktop 1440 | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=6-2 |
| Home – Mobile 390 | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=6-142 |
| Bryan – Mobile 390 | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=8-257 |
| Bryan – Desktop 1440 | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=8-146 |
| Future: Ventures | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=9-290 |
| Copy options (headline history) | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=9-365 |
| Components page | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=1-2 |
| Button set | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=3-51 |
| ContactButton set | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=3-130 |
| VentureCard | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=3-136 |
| Header / Footer sets | https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=4-189 · https://www.figma.com/design/ZAgMPeBA5JsYnn8TQqvqSe?node-id=4-226 |

In Figma, colours, spacing and radii are Figma **variables** (collections Primitives / Color / Spacing), and the type is Figma **text styles**. Dev Mode will show the same names that `tokens.css` uses.

## 11. SVG notes

- `graynote-labs.svg` and `ao-monogram.svg` use `fill="currentColor"`. Inline them and set `color`. The `-charcoal` / `-light` files have the colour baked in, for `<img>` use.
- The icons (Lucide: arrow-right, arrow-up-right, mail, contact-round → `icon-vcard`; Simple Icons: WhatsApp, LinkedIn) are 24×24 and use `currentColor`. The arrows display at 20px, the contact icons at 24px. Stroke icons use a 2px stroke.
- **Licences:** Lucide is ISC. Simple Icons is CC0, but the WhatsApp and LinkedIn marks belong to their owners, so use them only as plain links to those services.
- `favicon.svg` is a light ΛO on a charcoal rounded square.
- The logo viewBoxes don't start at 0 0 (they keep the original artwork coordinates). That's harmless, so leave it.

## 12. Accessibility checklist

- One `h1` per page (the hero headline / "Bryan Lim").
- **Contrast:** every text colour pair passes WCAG AA. `#333333` on white: 12.6:1. `#E6E6E6` on `#333333`: 10.1:1. **Muted text** (`--color-text-muted`) is **`#333333B8`** (72% charcoal, `rgb(51 51 51 / 0.72)`), which renders as **`#6C6C6C` on white (5.3:1)** and **`#656565` on the `#E6E6E6` contact buttons (4.7:1)**. Bryan approved this on 4 Oct 2026, replacing the earlier 64% value, which failed AA at 4.1:1 and 3.8:1. Keep it as the alpha value rather than a solid hex. A solid `#6C6C6C` would only reach 4.2:1 on the gray buttons.
- Icons inside labelled links get `aria-hidden="true"`.
- Respect `prefers-reduced-motion` (there's almost no motion anyway).
- Tap targets on /bryan are 78px tall and full width.
