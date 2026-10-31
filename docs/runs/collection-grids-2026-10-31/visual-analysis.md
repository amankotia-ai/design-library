# Collection grid visual analysis

Role: visual analyst; agent `/root/visual_analysis`.
Mode: original library-system adaptation informed by the user's screenshot, not source reproduction.
Inspected: attached Screenshot 2026-10-31 at 3.00.08 AM.png through `view_image`, plus `pilot/src/system-browser.css`, `catalog.css`, and `library-tokens.css`.

## Observed reference geometry

- Raster is 1250 × 814. The white stage is approximately x26–1230, y34–789; all four corners are square.
- The inner composition begins about x47, y55, with roughly 21px inset from the white stage. The usable width is about 1161px.
- Twelve vertical guide columns share a common horizontal origin. Horizontal major rules repeat at approximately 34px in this displayed raster. Fine red rules are diagnostic guides in the reference, not evidence of a desired production card ornament.
- Text, image position and bottom caption have common guide alignments. The reference contains a missing image icon and visible alt text; do not copy that unavailable-media state into the library.
- This screenshot shows a single hero/study, not a multi-card collection. It provides no evidence for an exact card-column count, row gap, mobile layout or below-preview metadata spacing.

## Current implementation versus request

The library collection cards share `.system-card` with a 1px outer border, 12px radius, clipped overflow and surface background. Metadata sits in `.system-card-body` with 20px horizontal padding, so preview and details read as one boxed object. Section previews use 16:10; system and page previews use 9:10. Existing desktop column count is three with 24px gaps; mobile is one column. Only the section grid currently changes to two columns at intermediate width.

## Adaptation constraints

1. Make the card article a transparent, borderless, non-clipping layout wrapper. Keep the framed visual treatment on the preview only.
2. Give `.style-preview` and `.asset-preview` explicit zero corner radius. Preserve rectangular aspect ratios; 'no rounding' does not establish a square aspect ratio.
3. Place headings, descriptive copy and links in the existing sibling body beneath the preview. Remove its horizontal inset so captions align with the preview's left/right bounds. A modest shared top gap is inferred implementation guidance, not a recovered measurement.
4. Use one shared collection-grid column/gap rule across Sections, Pages and Design Systems. Preserve all current page/section destinations and accessible links.
5. Do not alter embedded source study CSS, copy, photography or hero grid behavior. No font identification is needed: the library's existing Geist family is retained.
6. Mobile and intermediate-column behavior remain authored adaptations, evaluated for legibility and overflow rather than claimed source fidelity.
