# Independent wordmark QA

Passed. Reviewer: `/root/typography_qa`. No blocking findings.

Inspected the actual before crop, native comparison, final name crops at 1440/390/320, brand crops at 1440/768/390/320, and the readable 320px page capture. The final spacing is more open and even than the prior globally tightened wordmark. Selected pair corrections remain subtle at navbar scale. Letterforms and descenders are intact; optical baseline alignment with the signature remains convincing. No visible clipping or collision.

Independently checked the live current homepage at 1440, 768, 390, and 320px. Evidence: `qa-checks.json`.

- Chrome rendered-font inspection resolves the SVG lettering to custom `GeistSerif-Regular`, 14 glyphs, weight 400.
- The SVG contains one live text node with all 14 characters. Browser range selection returns the exact copyable string “Design Library.”
- Actual `dx` sequence is `0 0 0 0 4 12 0 0 0 0 4 0 0 -6`, matching the requested selected-pair implementation. Native font kerning remains enabled and the prior global word/letter spacing is overridden only for the wordmark.
- Compared character positions against a temporary native clone with no `dx`. Browser rendering introduces small fractional rounding in addition to the requested offsets: maximum discrepancy from the intended cumulative correction is about 0.11 CSS px across the four sizes. This is below a visible blocking defect; the output should not be described as exact pure translations at every display size.
- The home link has exactly the accessible name “Design Library of Manks.” The red image loaded at each width. Layout gap remains 4px; measured text bounding-box separation is approximately 3.30–3.45px, with no collision. Signature transforms remain 2px desktop/tablet and 1px mobile/narrow.
- No horizontal overflow at the four widths. SVG overflow is visible, so the glyph descenders are not clipped by the one-em viewport. At 320px the 21.5px wordmark fits beside the signature and navigation occupies its own row.

## Inspected SHA-256

- `pilot/src/brand-wordmark.jsx`: `546d8a511c3894c2009167c32c1402079487b5b5808694bc4cdf5623372d61eb`
- `pilot/src/library-tokens.css`: `6386c4040366c61be2ebf969c53b1d0a603258c91a4577be0f9cc106fad7eb1b`
- `pilot/src/main.jsx`: `e0210715c6df9741c268e2c65a7f6358d164520daa4cfd93230e952441caa44b`

Scope is the shared navbar wordmark, font rendering, copyable text, accessibility, fit, and signature alignment. The concurrent catalog/navigation redesign is outside this review. Temporary browser probes were removed; no implementation edits were made.
