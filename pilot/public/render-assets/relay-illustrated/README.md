# Two calibrated product-layout examples

Two finished fictional Relay compositions, exported at **3840 × 2160**. The backgrounds were created with **Codex built-in imagegen**, per the user's instruction. Exact high-density UI is composited separately with the product-screen-compositions HTML renderer.

1. **Painted meadow:** large near-square account-intelligence panel on the right, soft painted wildflowers/sky on the left, thin tinted translucent perimeter around fully opaque UI.
2. **Editorial canopy:** large assistant card on the left; dense matte illustrated foliage and a visible path/figures at the right. A proposed editorial interpretation, not a copy of Union's identity or an assertion of approved favourite-style fidelity.

Relay and all values are illustrative fixtures; no real product repo was supplied. Identity, font and captures were reused from the existing proposed Relay system. Background artwork and composition geometry were newly created.

## Resolution disclosure

The original generated backgrounds are **1672 × 941**. The final composites enlarge that artwork approximately **2.30×** to fill the canvas. Background texture is consequently softer at100%. The UI uses unchanged 3040 × 2600 and2640 × 2080 captures and is displayed below native size. These are4K exports with enlarged backgrounds, **not native4K generated artwork**. Reports retain the exact enlargement warnings and independent review records acknowledge them.

## Reuse

Each portable shot folder includes a self-contained `composition.html`, `scene.json`, `brand.json`, `template.json`, `assets/`, PNG, thumbnail and technical report. Open the HTML to preview. Geometry and asset selection remain separate. To re-render with the installed skill runtime:

```sh
node /Users/abhishekmankotia/.codex/skills/product-screen-compositions/scripts/render.mjs scene.json brand.json new-output
```

Keep the original capture ratio when changing window dimensions; fit frame and artwork placement accordingly. The meadow's perimeter alpha belongs only to the outer shape, never the UI. Another export aspect ratio needs a separate composition and review.

Original artwork, original UI source captures/HTML, prompts, specialist handoffs, technical reports and exact-file review records are included. Audit paths in the handoffs describe the original workspace; the portable shot folders themselves contain all assets needed to reproduce their exports. Review records establish the checked export, not user aesthetic approval. No external generation service output is used in either deliverable.
