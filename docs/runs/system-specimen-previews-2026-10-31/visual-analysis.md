# Visual analysis

Analyst: `/root/specimen_visual`. Inspected the actual images with `view_image`:

- `docs/runs/design-systems-default-2026-10-31.png` (1280 × 720 browser output).
- `pilot/public/previews/quiet-serif.png` (1440 × 930 rendered hero).
- `pilot/public/evidence/blueprint-full/editor.png` (1440 × 754 rendered editor).

Also inspected `pilot/src/data.js`, `pilot/src/system-browser.jsx`, and `pilot/src/system-browser.css`.

## Observed

The two current system cards contain miniature assembled pages. At the inspected browser size, their dominant cues are the same hero and following sections that identify Pages. Typography becomes very small; system colors and shape rules are only implicit. The caption already supplies the system name, family, small palette circles, and font names.

Quiet Serif has a very light condensed serif, compact sans-serif utility text, sharp rectangular image crops, fine rules, pale paper, and dark ink. Photography supplies the color. Its visual character depends on large empty areas and an asymmetric relationship between type and image.

Blueprint has a substantial vivid-blue field, rounded pale component surfaces, sans-serif interface labels, a restrained mono layer, and a modular editor. Yellow artwork is content, not one of the registered system palette colors; adding yellow as a system accent would misrepresent the registered palette.

## Specimen direction

Keep the shared outer card proportions and existing captions. Replace the page viewport with a compact specimen sheet containing three distinct scales: a dominant typographic sample, a palette strip, and one small collection of representative component shapes. Use actual DOM type and colors so the specimen reads clearly at card size.

- Quiet Serif: paper background; large two-line serif sample with enough empty space to preserve its lightness; a small General Sans line or alphabet; asymmetric bottom composition with a modest photographic crop and a thin-rule text/link specimen. Do not build a miniature hero or stack multiple page sections.
- Blueprint: Geist headline or large `Aa` pair; a blue surface with pale rounded field/chip/action specimens; Geist Mono numerals or a small technical label. Use a solid blue field and real border geometry rather than a decorative gradient or unrelated illustration.
- The palette strip can use registered `system.swatches`; typography samples should come from registered `specimen`/`typeLabel` content. Avoid repeating the same font names both large inside and below the card.
- Keep the displayed specimen content non-interactive; do not make control-shaped examples focusable. The card’s existing system link remains the navigation action.

## Evidence limits

These are authored system overview compositions, not recovered source layouts. Quiet Serif's Noto Serif Display is a declared free substitute for the inferred source serif; General Sans is supported by prior visual identification. Blueprint source font files are retained in the project. No new font identification or claim of pixel identity is made here. Responsive specimen arrangements must be verified on final rendered output.
