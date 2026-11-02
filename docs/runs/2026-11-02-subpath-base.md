# Subpath base for GitHub Pages

- Start: 2026-11-02 14:49 IST. Deadline: 15:34 IST (45-minute budget, extended by the user for this job).
- Scope: serve the pilot from `/design-library/` instead of the domain root, ahead of renaming the repository from `amankotia-ai.github.io` to `design-library`. Set the Vite `base`, make asset paths and in-app links respect `import.meta.env.BASE_URL`, keep the query-string router under the base, and update scripts that assume the root. No commits, pushes or renames.
- Completion criteria: `npm run build` and `npm run check` pass; the built site, served under `/design-library/`, loads the home page, `?panel=sections`, `?panel=pages`, a system detail, `?view=salesloft-page` and other views without 404s or console errors; in-app links stay under the base; no root-relative references remain in `pilot/dist`; the dev server serves under the base.
- Connected context: Freebyrd's index returned only Portfolio threads (Committed locally, Expertise render, Gargoyle repo, Gargoyle card film); nothing specific to Design Library.

## Implementation

- `pilot/vite.config.js`: `base:'/design-library/'`.
- `pilot/src/base.js` (new): `withBase(path)` prefixes root-relative app paths and routes with `import.meta.env.BASE_URL` (falls back to `/` when Node imports data modules, so `scripts/check.mjs` still reads `public`+path); `rebase(value)` rewrites public-folder paths inside captured markup, CSS strings and parsed JSON.
- `pilot/src/*.js(x)`: 185 root-relative literals (assets, references, previews, evidence, iframe pages, `/?panel=…`, `/?view=…`, `/`) wrapped with `withBase`, including `pushState`/`replaceState`, `location.href` and the `location.pathname+location.search===url` comparison in `main.jsx`. JSON markup (`blueprint-source-parts.json`, `steel-source-parts.json`, `steel-mobile-parts.json`) and raw CSS (`conare-home-source-*.css?raw`) pass through `rebase`; `blueprint-source-styles.json` hrefs through `withBase`.
- Imported `src/*.css` is left to Vite, which prefixes `url(/…)` for public files (61 prefixed URLs in the built CSS, none unprefixed).
- `pilot/public/` (conversion, interfere, plasticity, steel-source, one blueprint-source CSS chunk): root-relative references made relative to the loading document or stylesheet, so they work at any base. `conversion/platform.html` texture custom properties also carry an inline `background-image`, because Chromium resolves a relative `url()` in a custom property against the stylesheet that uses it.
- `pilot/scripts/capture*.mjs`: default preview URL includes `/design-library`.

## Verification

- `npm run check` passes; `npm run build` passes (only the existing chunk-size and Radix "use client" warnings).
- Built `dist` served by `python3 -m http.server` from a directory with a `design-library` symlink to `dist`; headless Chromium (Playwright 1.64) loaded 18 URLs: home, `?panel=sections`, `?panel=pages`, `?panel=system&section=conare-page`, `?panel=system&section=blueprint-page`, `?panel=systems`, `?panel=sources&section=salesloft-page`, `?panel=sections&section=hero`, and `?view=` salesloft-page, page, blueprint-page, steel-page, conare-page, conare-evals-page, conversion-page, interfere-page, plasticity-page, mnh-page. No same-origin 404s, broken images, font load errors or page errors, except the pre-existing items below. Click-through of nav, cards, back links, brand link, history back/forward and Salesloft links kept every URL under `/design-library/`; clicking the active panel link left `history.length` unchanged.
- Dev server (`npm run dev`, port 5199): serves `http://127.0.0.1:5199/design-library/`, redirects `/?panel=sections` there, and six routes loaded clean.
- Independent QA (separate general-purpose agent `adda30e64250d1ea5`, read-only, inspected this revision): no blocking findings. It crawled 125 production URLs (all 110 `?view=` sections), 121 dev URLs and 24 at 390 px; notes recorded below.

## Pre-existing, unchanged

- `/demos/steel-site.jpg` and `/demos/shopping-assistant.jpg` posters in the steel JSON point at the source site's root; no such files exist in `public/`.
- `/_next/image?…` srcsets in `public/plasticity/page.html` and `testimonials.html`, `/fonts/…` in `conare-home-snapshots.json` and `/reset-password` links in interfere HTML are source-site paths with no local file.
- Interfere logs `<svg> attribute width: Expected length, "auto"`.
- iCloud has left conflict copies such as `dist/favicon 2.svg` in the local `dist`; CI builds a fresh `dist`.

## Status

Delivered at 15:26 IST, within the deadline. Not committed or pushed; repository not renamed.
