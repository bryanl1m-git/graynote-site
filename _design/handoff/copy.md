# Graynote – Website · final copy

Copied character for character from the Figma file on 4 Oct 2026, including apostrophes and line breaks.
Source frames: Home – Desktop 1440 (6:2), Home – Mobile 390 (6:142), Bryan – Mobile 390 (8:257), Bryan – Desktop 1440 (8:146).
Desktop and mobile use the same words. The only differences are the manual line breaks noted below.

> **Apostrophes:** body copy uses the curly ’ (U+2019). The two **Let's talk** labels (header link and CTA button) use a straight ' (U+0027) in Figma. That's probably just a slip, and I'd suggest `Let’s talk` with a curly apostrophe. Bryan should confirm before the site ships.
> **Caps:** section labels and venture names are written in sentence case and shown in capitals with `text-transform: uppercase`. Keep the source text in sentence case for screen readers.

---

## Page 1 · Home (`https://graynote.io/`)

### Header
| Element | Copy | Link |
|---|---|---|
| Logo (SVG, alt text below) | Graynote Labs | `https://graynote.io/` (on `/` itself it can be `/`) |
| Link | Let's talk | `mailto:bryan.lim@graynote.io` |

### Hero
- **ΛO mark:** decorative only (`aria-hidden="true"`)
- **Headline (h1):** We play in the gray, so you don’t have to.
  - Desktop 1440 line breaks: `We play in the gray,` / `so you don’t have to.`
  - Mobile 390 line breaks: `We play in` / `the gray, so` / `you don’t` / `have to.`
  - Don't hard-code these breaks. Use `text-wrap: balance` and `have&nbsp;to.` (see BUILD_NOTES §2). That reproduces both layouts exactly.
- **Subline:** Messy problems in, clear results out.

### How we work
- **Section label:** How we work
- **Paragraph** (Bryan's edit, same in both frames):

  Graynote takes on all kinds of work, and treats every piece the same way. We listen first, work out what the thing really needs, then see it through, quietly and properly, until it’s done. Most of it starts with someone or something we already know. We’d like to keep it that way.

### Ventures (built, **hidden**; the text is placeholder until the first venture launches)
- **Section label:** Ventures
- **Heading:** A few things of our own.
- **Cards** (placeholders only, so don't publish these):
  | Mark initial | Name | Line |
  |---|---|---|
  | V | Venture one | One line about it. Placeholder copy. |
  | N | New venture | One line about it. Placeholder copy. |
  | X | Experiment X | One line about it. Placeholder copy. |

### Call to action
- **Section label:** Next
- **Heading:** Got something in mind?
  - Mobile 390 line break: `Got something` / `in mind?` (it wraps there naturally at 32px; no `<br>` needed)
- **Subline:** Start with an email. We’ll take it from there.
- **Button:** Let's talk → `mailto:bryan.lim@graynote.io`

### Footer
- Logo (light, alt "Graynote Labs")
- bryan.lim@graynote.io → `mailto:bryan.lim@graynote.io`
- © 2026 Graynote Labs  *(the year is static in Figma; render it from the current year)*

---

## Page 2 · Bryan (`https://graynote.io/bryan`, the page the business-card QR code opens)

### Top bar
| Element | Copy | Link |
|---|---|---|
| Mobile: ΛO mark / Desktop: full logo | (alt "Graynote Labs") | `https://graynote.io/` |
| Greeting | Nice to meet you | (none) |

### Profile
- **Photo:** `img/bryan-photo-400.jpg` / `-800.jpg` (alt: "Bryan Lim")
- **Name (h1):** Bryan Lim
- **Title:** Wordsmith
- **Bio:** Paint the World

### Contact buttons (in this order)
| # | Label | Detail (sub-label) | Link | Style |
|---|---|---|---|---|
| 1 | Save contact | Add to your phone (vCard) | `https://graynote.io/bryan.vcf` (file in this package: `bryan.vcf`) | Primary (charcoal) |
| 2 | WhatsApp | 010-220 1674 | `https://wa.me/60102201674` | Tonal (light gray) |
| 3 | Email | bryan.lim@graynote.io | `mailto:bryan.lim@graynote.io` | Tonal |
| 4 | LinkedIn | linkedin.com/in/bryan-lsw | `https://www.linkedin.com/in/bryan-lsw/` | Tonal |

### Footer
- Logo (light)
- Visit graynote.io → → `https://graynote.io/`
- © 2026 Graynote Labs

---

## All link targets

| Target | Used by |
|---|---|
| `mailto:bryan.lim@graynote.io` | Home header "Let's talk", Home CTA button, Home footer email, /bryan Email button |
| `https://wa.me/60102201674` | /bryan WhatsApp button |
| `https://www.linkedin.com/in/bryan-lsw/` | /bryan LinkedIn button |
| `/bryan.vcf` (`https://graynote.io/bryan.vcf`) | /bryan Save contact button |
| `https://graynote.io/` | Logos on both pages, /bryan footer "Visit graynote.io →" |

External links (WhatsApp, LinkedIn) can open in a new tab with `rel="noopener"`. On /bryan, consider keeping them in the same tab, because people arrive from a phone camera and a new tab can feel jumpy. mailto and vCard links stay in the same tab.

## Meta copy (suggested; not in Figma)
See BUILD_NOTES §9.
