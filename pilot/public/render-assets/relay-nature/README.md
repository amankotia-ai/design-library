# Relay nature compositions

Two additional fictional Relay proof shots at **3840 × 2160**, with exact existing high-density UI captures composited over real licensed photography. Relay and its values are illustrative; no real product repository was supplied.

- **06 — Forest:** Complete dashboard, framed left to preserve the misty light opening at right.
- **07 — Coast:** Large assistant card, framed right to preserve the tree, horizon and golden grasses at left.

The UI is opaque and matte, with a subtle edge shadow. There are no reflections, added decorative shapes, external marketing headlines, AI-generated UI, generative extensions, or raster upscaling. Source-resolution demand and deterministic repeat capture checks are recorded in each report.

## Edit and export

Each portable shot folder contains `composition.html` (self-contained preview), `template.json` (geometry), `brand.json` (replaceable assets), `scene.json` (resolved layer sources), an `assets` folder, the PNG, thumbnail and technical report. Background and UI are separate layers. Geometry uses a 1920 × 1080 logical canvas, exported at 2×.

Open `composition.html` to preview. Edit a copy of `template.json` and `brand.json`, then render with the installed product-screen-compositions renderer:

```sh
node /Users/abhishekmankotia/.codex/skills/product-screen-compositions/scripts/render.mjs template.json brand.json new-output
```

The renderer requires its installed Playwright/Chromium runtime. Maintain source aspect ratios and sufficient raster density. Adapt layout for another output ratio; do not stretch this landscape render. A new export requires a new visual review.

Clean 4K background plates are included separately. Exact native detail crops and the current team review records are also included.

## Photography credits

- Forest: [Sebastian Unrau on Unsplash](https://unsplash.com/photos/trees-on-forest-with-sun-rays-sp-p7uuT0tw), downloaded at 6000 × 4000.
- Coast: [Daniel Akselrod on Unsplash](https://unsplash.com/photos/grassy-cliff-overlooking-a-calm-ocean-at-sunset-thc9qSpsuFI), native 4128 × 6192; intentionally cropped to landscape at 60% vertical position.

Both sources are provided under the [Unsplash License](https://unsplash.com/license). See `photo-provenance.json` for source addresses and exact downloads. Inter's font license is included in the source package.
