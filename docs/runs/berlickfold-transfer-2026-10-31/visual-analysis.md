# Berlickfold transfer: visual analysis

Specialist: `/root/visual_analysis`. Date: 2026-10-31. Pass: actual source/current image inspection and source-code analysis. This is not QA of the new delivered revision. Ownership: this file only; no source edits.

## Inspected evidence

- `pilot/public/references/hero-source.png`: 2030 × 1128 source hero.
- `pilot/public/previews/quiet-serif.png`: 1440 × 930 current preview; the hero occupies approximately the first 800px, followed by a blank page area.
- `../Render Assets/grid-study/qa/free-serif-corrected.png`: actual corrected free-serif split study, 626 × 504 raster.
- `../Render Assets/grid-study/research/typography-notes.md`.
- `../Render Assets/grid-study/dist/grid-math.js`.
- `pilot/src/sections.jsx`, `pilot/src/sections.css`, `pilot/src/tokens.css`.

## Source versus current

The source composition is a near equal split: its right photo begins near x1029/2030 (50.69%). Current preview right photo begins near x729/1440 (50.63%). Source height normalized uniformly to width1440 is 800.16px; current hero is approximately800px. Both observations support preserving the current overall split and aspect ratio at this size. The photo and portrait show no visible stretching in this capture. Continue using `object-fit:cover`, never nonuniform image transforms.

The source paragraph is four lines, beginning near x362,y718 in source pixels. At1440-width uniform scale that position is approximately x257,y509. The current paragraph begins near x257,y499 and wraps five lines. Current width is declared15.1cqw (217.44px at1440), so broadening its containing region is not the first correction. Its adapted font is `.985cqw` (14.18px at1440), weight400. Faithful source mode uses `.887cqw` (12.77px at1440). Adapted mode additionally anchors the paragraph using `bottom:calc(18.82cqw - 70px)`, so its top moves when its line count changes. Correct the type scale/weight and anchor to the composition grid; do not compensate by consuming the empty track or by moving images.

The current heading already uses self-hosted Noto Serif Display at native62.5% width and weight200. It is visibly slender and narrow. The source Q tail and other forms differ: this is a declared free alternative, not exact font recovery. Preserve native font width and avoid horizontal transforms. The typography study selected Noto after comparing several free candidates at equal capital height.

The source reserves a large blank region to the right of the compact paragraph and below the headline. Current preview preserves it. This empty area is a layout decision, not spare space that all text should fill.

## Transferable rules from Render Assets

1. Use General Sans Light300 for project/editorial paragraphs. Its identification is a visual inference, not author confirmation. The typography notes specify compact10/16 desktop design pixels in the project recipe and14/20 mobile; adapt this relationship to the current hero's declared coordinate space rather than applying those numbers as viewport-independent values.
2. Use Noto Serif Display extra-condensed62.5%, weight200, as an intentional free alternative. No synthetic light weight, horizontal stretching or copied foundry font files.
3. No monospace in the transferred original editorial language. Existing `--mono:'Courier New'` and its use in `.quote-faithful figcaption` belong to the old faithful-study implementation; adapted attribution should use General Sans. A separate faithful source mode must remain explicitly separate.
4. Text has a grid measure independent of the containing region. `grid-math.js` explicitly caps desktop body measure and reserves a real empty track between information and photographs. The parent implementation should preserve separation rather than allow a long line to consume it.
5. Uniform scale means one coordinate space for type, spacing and images. The existing adapted `min-height:680px`, viewport-based height, minimum type sizes and fixed bottom offsets can change composition at narrower desktop widths. Verify the transition around769px and at an intermediate desktop width, not only1440.
6. Mobile is a recomposition. Use a readable paragraph measure and a declared four-column layout with preserved image ratios; do not shrink the desktop screenshot. Existing final mobile override raises copy to16/22, contrary to the transferred14/20 reference recipe. The implementation should choose one coherent rule and verify it with actual content.

## Acceptance guardrails for the new adapted hero

- Preserve a narrow light serif with natural glyph proportions and General Sans300 body text.
- At1440, maintain near50.69/49.31 split, proportionate photography and generous negative space.
- Paragraph begins beside the portrait, with its own compact measure. If new original copy changes length, let rows accommodate it without widening into the reserved gap.
- Name header, paragraph, metadata and display type as separate roles; do not apply one font-size formula to all of them.
- Verify1440, an intermediate desktop,390 and a narrow mobile width. Check text/image collisions, clipped heading descenders, horizontal overflow, and photograph aspect ratios.
- Keep source-sized faithful reconstruction untouched; the new output is an original adaptation informed by the prior study and should be labelled accordingly.

## Limits

No live browser dimensions were measured in this specialist pass. Raster positions are approximate visual measurements supported by the declared CSS values. No claim of pixel identity or final implementation approval is made.
