# Art direction — system browser

Reviewer: /root/art_direction. Original system expansion of the browser; source section renderings remain unchanged.

## Inspected evidence

Inspected the actual pixels of `pilot/public/evidence/hero-faithful.png` (2030 × 1128), `pilot/public/evidence/blueprint-hero.png` (1440 × 594), and `pilot/public/evidence/blueprint-full/editor.png` (1440 × 754), and the existing `main.jsx` / `style.css`.

Observed: the editorial hero balances very slender condensed serif lines and large unfilled planes against dominant, saturated photography. Its main split is close to equal width; a smaller inset image and text occupy a secondary lower row. The Signal study is centered, white sans on a cobalt modular grid, with paired actions. The Blueprint editor uses a quiet three-part gray workspace framing yellow/black generative art, bounded by a cobalt stage. These are visible traits, not user taste claims.

## Naming decision

Use **Serif Editorial**, **Cobalt Workshop**, and **Blueprint Source Study** as display names. The convention is visual identifier + system character for original systems; source proper name + Source Study for a faithful reconstruction. Keep IDs stable. Store family and mode in separate fields, never inside an opaque collection number. Retain former names as aliases in detail metadata so existing project notes remain legible.

Serif Editorial directly names the typography that makes the first system recognizable. Cobalt Workshop names both its anchoring color and editor/canvas purpose. Blueprint Source Study makes attribution and faithful mode visible before opening. It is related evidence for Cobalt Workshop, not a third unrelated visual style.

## Homepage composition

Use three equal cards in the existing neutral library shell. A consistent approximately 16:10 image stage sits first, followed by family/mode, display name, one concrete visual-signature sentence, section count, and one primary Open system link. Avoid separate CTA buttons for tokens, preview, and studies on every tile: system detail can carry those paths. Each tile needs a real capture of its own implementation, not a synthetic illustration.

Use the full editorial hero capture as a contained image so the split and serif/photo balance survive. Use the blue hero capture for Cobalt Workshop. Use the editor capture for Blueprint Source Study: repeating the blue hero would conceal its source-study distinction and make the two tiles look interchangeable. Card image backgrounds can reflect each captured surface; surrounding chrome stays neutral. No new decorative accent is needed.

## System insight hierarchy

1. What defines it: one visual signature tied to the capture.
2. Choose it for / use caution: concrete content and product fit, labelled design guidance rather than proven outcomes.
3. Composition rules: type hierarchy, source of color, spacing/density, image treatment, interface framing.
4. Extend it: actionable invariants and what a new section may vary.
5. Evidence and limits: source measured vs inferred, font substitutions, original mobile behavior, source service boundaries.
6. Tokens and specimens: retain existing technical detail after the decision guidance.

The editorial guidance should preserve empty planes, thin serif hierarchy, deliberate photographic crops, and restrained UI color. Cobalt guidance should distinguish blue announcement surfaces from quiet working canvases and treat art color as content. Source-study guidance should explain what can be learned from the reconstructed page and explicitly avoid presenting unseen application behavior as recovered.

## Review status

Direction supplied before implementation. This is not a passed review of the eventual delivered UI; independent QA must inspect that revision.
