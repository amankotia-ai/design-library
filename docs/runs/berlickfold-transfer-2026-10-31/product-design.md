# Product constraints — Berlickfold transfer

Role: `/root/product_design`. 31 October 2026. Read-only review of Render Assets `grid-study/README.md`, `research/typography-notes.md`, `dist/lessons.js`; current `pilot/src/main.jsx`, `system-browser.jsx`, `sections.jsx`, `sections.css`, `tokens.css`, `data.js`; visual inspection of `pilot/public/previews/quiet-serif.png`. This is product guidance before implementation, not a final revision pass.

## Job

A designer studying Quiet Serif should be able to reveal how its composition is built, distinguish a source reconstruction from an original adaptation, and learn how to extend it. The current preview changes mode implicitly: desktop Hero uses faithful geometry while mobile uses an adaptation, and “Compare” replaces the working preview with retained static captures. The preview does not expose either choice clearly. The hero’s always-present faint repeating background is not a usable inspection control and does not explain actual block coordinates.

## Tightly bounded changes

### 1. Explicit study mode

For the editorial hero, show a native select or clearly labeled two-button group: **Source study** / **Original adaptation**. Default desktop source-study behavior stays intact. Selecting adaptation must render `Hero faithful={false}`; it must not merely change a caption. Mobile is clearly labeled **Original adaptation** because source mobile behavior was not observed. The view-open URL must include the selected mode, and direct existing `?view=hero&mode=faithful` links retain their meaning. Restrict this behavior to supported editorial views rather than changing Blueprint source behavior.

Source comparison remains a distinct control: **Compare source**. Caption both retained images as **Original reference** / **Captured reconstruction**, with capture dimensions and font approximation. Do not imply a static stored image reflects subsequent live changes. If comparison is opened from adaptation mode, label the compared output as the source reconstruction or return to source-study mode visibly; never silently compare adaptation against unrelated faithful output.

### 2. Reveal the working structure

Add a **Grid** toggle beside viewport/mode controls on the editorial hero. Use `aria-pressed`; it changes actual overlay visibility, without replacing imagery or adjusting composition. Give the overlay `pointer-events:none` and hide it from assistive technology. One nearby text caption must explain what the lines represent, including proposed/inferred status.

The overlay must be calculated from the same declared coordinate model used to position the hero; no DOM-rectangle tracing and no generic 12-column drawing over absolute positions. Existing hero anchors include portrait x=1.38cqw, copy x=17.84cqw, image split x=50.689655% in faithful mode; these are implementation measurements, not proof of author CSS. A successful guide marks block boundaries, shared edges, text rail and reserved empty rail. Do not label a decorative repeating background as recovered source grid. On mobile, guides follow the actual four-column recomposition and its declared padding/gutters, rather than shrinking desktop coordinates.

Toggle on/off must keep stage width, height, scale, text measure and crop unchanged. The same stable preview frame is essential when moving between original/adapted or grid hidden/shown. For comparisons of different composition heights, reserve the maximum pair height (the existing Render Assets lessons engine does this) or state clearly when the view is independently scrollable. Do not stretch images to force equal heights.

### 3. More useful Quiet Serif guidance

Replace vague spacing advice with specific relationships in the registry’s existing insight fields:

- **Independent text measures:** the headline, description and navigation have distinct widths. Do not widen body copy to fill the available half-page.
- **An empty rail is structural:** leave a real unused column between the information group and the dominant photo. Negative space must survive adding longer copy, not disappear through justification.
- **Two image roles:** a contained portrait supports the text; the large photograph anchors the composition. Use uniform image scale and deliberate crop with `object-fit:cover`; never nonuniform stretch.
- **Thin type, honest provenance:** Noto Serif Display extra-condensed weight 200 is the selected free alternative. PP Editorial New Thin remains a visual inference, not an installed or licensed asset. General Sans Light was the strongest tested body match in the sibling research, not author-confirmed identification. Decide any body-weight change through source-sized review rather than silently declaring recovery.
- **Recompose on mobile:** place content in an intentional four-column reading order with usable text size. Desktop source geometry is not the mobile template.

Keep library controls and editorial metadata proportional sans-serif. Current quote caption uses `var(--mono)` mapped to Courier New; this conflicts with the transferred no-monospace lesson. A bounded correction is to use `var(--sans)` for the editorial caption while leaving Blueprint’s source-specific Geist Mono unchanged.

## Preservation

Keep system ID `editorial-01`, section IDs and working deep links, attribution, original-reference media, current homepage tiles and all source-mode boundaries. Do not propagate these editorial rules into Blueprint reconstruction. No new taxonomy or cross-project writes are needed. Changes to reference media or claims of perfect fidelity are outside scope.

## Acceptance evidence

Inspect desktop hero with Grid off/on at identical dimensions; verify guide edges come from shared geometry and preserve the empty information-to-photo rail. Inspect Original adaptation separately from faithful Source study. Inspect mobile at 390px for recomposition, no overflow and readable body measure. Exercise compare/open-view URLs and keyboard access. Review the delivered revision, not only old preview captures. Record observed geometry versus authored system decisions separately.
