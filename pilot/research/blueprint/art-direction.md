# Signal Workshop — art direction

Run: blueprint-001 · 2026-10-30. Art director: `/root/blueprint_art`.

## Evidence inspected

I inspected `public/references/blueprint/desktop.png` at 1440 × 857 using `view_image`, and read the preserved `landing-styles.css`. The screenshot is the actual REA observation of https://blueprint.page/. This is a direction pass, not a rendered-implementation review. The visual-analysis and product-design handoffs were not yet present when this pass began; numerical values below are independently supported by the screenshot and source CSS.

## Character and intended use

**Signal Workshop** is a bright, practical system for creative software and small interactive tools. A saturated blue drafting surface introduces the idea; a quiet, rounded workspace lets the tool become the evidence. Large centered sans-serif typography gives way to compact, useful controls. A specimen may carry a strong second color, while interface accents stay blue.

The important relationship is the open, confident hero against the enclosed editor. Expanding the system into generic blue cards would lose that relationship. Prefer a few large surfaces, direct language, and visible product behavior.

## Two production modes

### Faithful hero study

Compare only the preserved 1440 × 594 hero crop, ending exactly where the device begins. The 1440 × 857 source includes an animated editor and is not a valid hero-only comparison without cropping.

Protect the measured structure: 12px page inset, 32px grid, 1200px outer wrap with 24px inner padding, 60px header, centered offer near y132, headline around y198–328, lede around y366–408, CTA row y448–490, and note near y508. The headline uses 76px/.98 source sizing, max-width 900px; lede uses 18px/1.55 and max-width 600px. Source headline tracking is -.045em. These are source-study measurements, not defaults for every new section.

Source CSS establishes blue `#104bff` and logo-tile blue `#4976ff`. The screenshot contains faint grid lines that soften toward the bottom. Preserve their subtlety; the grid is context, not foreground decoration. The exact source radial fade need not be extended into original sections.

The source exposes Geist/Geist Mono. Existing Inter is a declared substitute, so matching font metrics or pixel identity is not established. A recreated logo is an approximation. Source animated tool internals and behavior are not recovered by a passive screenshot. Keep these limits visible in study notes.

### Original system expansion

Original text, interaction, pattern algorithm, mobile composition, feature layout, FAQ content, and footer are authored work. Label them as expansion, and review against this direction rather than claiming recovery of unseen Blueprint layouts or software.

## Shared system contract

- **Color:** blue `#104bff` for hero and primary actions; white for headline and raised editor surfaces; pale neutral workspace; near-black text. Use yellow/black only inside the generated art specimen. Do not scatter yellow across navigation, labels, or feature decoration.
- **Typography:** reuse available Inter for legible sans-serif interface and display text. Source-study font substitution is explicit. Reserve large display type for hero and a single substantial section heading; use smaller 13–16px control and supporting text. Monospace may label settings or output metadata sparingly.
- **Geometry:** content aligns to the measured 1152px inner width on desktop. Hero and editor share a centerline. Editor exterior corners are generous; controls use smaller radii. Internal spacing should create panels, not a dense nest of borders.
- **Rhythm:** expansive hero breathing room, then tighter workbench spacing. Original sections should have clear pauses, around 80–128px on desktop as content permits; mobile uses less while keeping hierarchy.
- **Grid:** 32px hero grid at low contrast. Keep it inside the blue field. A CSS or SVG grid is a reconstruction detail, not a reason to add gradients elsewhere.
- **Motion:** no decorative motion is needed. Pattern updates can be immediate. If motion is later introduced, it requires explicit scope and reduced-motion behavior.

## Section family

1. **Centered introduction:** original product name and copy in the source-derived composition. One clear primary action leads to the working tool, with a secondary route to explanation or examples. The separate faithful study alone carries the attributed source copy.
2. **Pattern workshop:** a white browser-like shell over pale workspace, a clearly bounded yellow/black artboard, and a compact controls panel. Controls must alter the output. Show actual functional actions such as regenerate, reset, or export; do not imply accounts, sharing, billing, or AI generation without implementation.
3. **Feature section:** open typographic heading plus a small set of useful capabilities. Keep visual hierarchy sober; detail should explain actual functionality. A small specimen can repeat the pattern language without becoming an ornamental dashboard.
4. **FAQ:** quiet divided rows with readable questions and native accessible disclosure behavior. Use real limitations and workflow answers. The FAQ should not compete with the tool.
5. **Footer:** simple closing surface, recognizable system/product identity, useful anchors, and a source/study link where appropriate. Do not invent operational service claims or imply association with Blueprint.
6. **Assembled page:** hero → tool → features → FAQ → footer. The hero-to-workspace overlap is the distinctive composition. On narrow screens, content stacks and the controls remain fully reachable.

## Review gates

Faithful review must use the same 1440 × 594 crop and record deviations, especially Inter wrapping, logo approximation, text geometry, grid, and CTA placement. A subjective resemblance is not pixel equivalence.

Expansion review must inspect delivered desktop and mobile screenshots plus the actual controls. Success means that blue surface, type hierarchy, workspace proportions, and specimen framing feel coherent, while all actions have honest effects. At mobile widths, inspect title wraps, full CTA labels, artboard visibility, control labels, disclosure rows, and absence of horizontal page overflow. A mobile layout is an adaptation even if Blueprint also happens to behave similarly.

Independent QA must review the final revision. This direction document does not constitute a QA pass or certify a rendered implementation.
