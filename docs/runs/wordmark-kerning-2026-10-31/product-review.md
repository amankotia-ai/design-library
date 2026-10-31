# Product contract: wordmark kerning

Reviewer: `/root/typography_product`. Inspected the actual `native-comparison.png`, current `main.jsx`, `style.css`, `library-tokens.css`, and live Chromium at 320/390/1440px after font loading. Contract only; final kerning is pending visual review.

## Preserve

Keep the wordmark as live text, the full brand as one home link named `Design Library of Manks`, the current Serif font/size/optical weight, handwriting dimensions, optical baseline offsets, and effective 4px gap after the wordmark. Limit changes to character spacing within `Design Library`; do not compensate by moving or resizing the handwriting.

## Implementation constraints

- Begin from the font’s native shaping and apply only visually justified pair adjustments. Uniformly equal bounding-box gaps are not a useful target for curved, diagonal, and serif forms; assess perceived space at actual navbar sizes as well as an enlarged crop.
- The existing `.library-brand span` rule makes descendant spans block-level and applies a font-size/color. Any new glyph wrappers require explicit inline behavior plus inherited font, size, weight, color, line-height, and zero margins. Preserve a real space between the words for text selection and naming.
- Browser proof is necessary before using wrappers. A temporary DOM experiment measured native continuous text versus one span per character with inherited styles. At 28px, continuous text was 184.30px; inline wrappers were 184.41px; inline-block wrappers were 178.67px. The latter changes the shaping/spacing substantially before any optical adjustment. At 22px, those widths were 144.81/144.89/140.39px. Do not assume per-character boxes preserve Geist’s pair behavior.
- If a controlled glyph-position approach is chosen, derive the starting positions from native browser shaping, then document per-pair deltas. Ensure the wordmark’s layout width covers the final visible glyph advance; transforms alone can leave the signature at the wrong distance. Verify live selectable text and the accessible link name after the change.

## Narrow-width budget

At 320px, the brand currently measures **265.66px** within **272px** usable width. Removing all custom tracking/word spacing yields **272.81px**, which exceeds that inner width by 0.81px even though it need not cause document scrolling. Therefore native defaults alone are not a complete mobile fix. With the other brand dimensions preserved, the 22px wordmark must be at most **144px** wide to fit, preferably below **143.5px** for some reserve. Apply small justified pair adjustments with an aggregate reduction of at least about 1.5px from the native 144.81px width, then measure the final brand rather than inferring its fit from CSS.

## Final acceptance

Inspect final crops at 28px desktop, 24px mobile, and 22px narrow; verify no collisions or distracting spacing, the current baseline and 4px signature gap, fit inside the 272px narrow content width, the complete one-line name, and exactly one accessible `Design Library of Manks` home link. Final source hashes and captures must match the independent QA revision.
