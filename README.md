# Graynote Labs website

Static site for [graynote.io](https://graynote.io/). Two pages: the home page, and [/bryan](https://graynote.io/bryan), which is the page the QR code on Bryan’s card opens.

Astro builds a static site. There is no client-side framework, no CMS, and no tracking.

## Run it locally

```bash
npm install
npm run dev
```

The dev server prints a local URL. `npm run build` writes the site to `dist/`, and `npm run preview` serves that folder.

## Pages

| URL | File |
|---|---|
| `/` | `src/pages/index.astro` |
| `/bryan` | `src/pages/bryan.astro` |
| `/bryan.vcf` | `public/bryan.vcf` |

`/bryan` is built as `bryan.html` (no directory index) so the host can serve it without redirecting to `/bryan/`. Keep that URL stable: it is the QR code target, and it should stay indexable.

## Ventures

The Ventures section is wired up and stays off the page until there is something to show. Add an entry to the array in `src/data/ventures.ts`:

```ts
export const ventures = [
  { initial: "V", name: "Venture name", line: "One line about what it is." },
];
```

The section renders only when that array is not empty. `href` is optional; a card with a link darkens slightly on hover.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds the site and deploys `dist/` to GitHub Pages. It runs on every push to `main`, and it can be started by hand with **Run workflow**.

The workflow uses `actions/upload-pages-artifact` and `actions/deploy-pages`. It does not change repository settings. Before the first deploy, set the Pages source to **GitHub Actions** (Settings → Pages). The custom domain comes from `public/CNAME` (`graynote.io`), which is copied into the build.

`_design/` is the design handoff. It stays in the repo and is not part of the Pages artifact.

## Fonts

Montserrat Medium (500) and Bold (700) are self-hosted from `public/fonts/` (SIL Open Font License, see `public/fonts/OFL.txt`). Body text is 500. Headings, labels, and buttons are 700.
