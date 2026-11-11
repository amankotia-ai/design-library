# Viewport-first layout correction

The rejected examples used isolated panels at52–53%of the canvas width and independent side placements. These proofs instead use actual desktop runtime captures and one calculation that drives both map and final scene.

- **Wide:** actual1440×900CSSviewport; UI82%ofcanvas width, full frame visible. Thin perimeter derived from the UI rectangle. Focal12CSSpx text displays13.12px when the4Kimage is viewed at1920pxwide.
- **Close-up:** actual1440×842DOMshell from that same1440×900viewport, enlarged112%. A registered protected-left anchor solves position to retain heading, full chart, entire selected-account card and key selected-row fields. The viewport has not become a narrow app layout. Focal12CSSpx text displays17.92px at1920pxviewwidth.

The map's full-app-window profile is a planned1536×864capture example, explicitly labeled as not executed. Actual captures, calculations, exact protected regions and render reports accompany the two executed examples. Placeholder map and render consume the same calculated rectangles; a later scene shift/resize/rotation/opacity change fails validation. A changed source PNG or calculation also fails.

The calculator is installed in the product-screen-compositions skill as `scripts/calculate-shot.mjs`, with profiles in `assets/shot-profiles.json`. It validates capture kind, CSSviewport, CSS/raster/DPR consistency, width/height feasibility, protected crop, native density and text presentation size. It does not infer all meaningful UI or guarantee taste; visual review caught a partially cut secondary card, and that entire card was added to protected evidence before this version.

Run:

```sh
node /Users/abhishekmankotia/.codex/skills/product-screen-compositions/scripts/calculate-shot.mjs shot-input.json layout-calculation.json
node /Users/abhishekmankotia/.codex/skills/product-screen-compositions/scripts/calculate-shot.mjs --apply template.json layout-calculation.json scene.json
```

Portable render folders include `scene.json`, `brand.json`, `layout-calculation.json`, exact hashed assets, self-containedHTML, PNG and report. Re-render with the installed renderer. Detailed skill guidance is in `references/viewport-and-shot.md`.

Relay remains a fictional fixture with illustrative data. Source HTML was adapted to fluid actual viewport sizing and legible12CSSpx table text; no real product repo was supplied. The same two original Codex-generated background images were reused, not regenerated. They are1672×941, enlarged about2.30× for3840×2160composites; native dense UI captures are not enlarged beyond their source detail. These are4Kexports, not native4Kgenerated artwork. Earlier rejected geometry remains historical and is superseded here.
