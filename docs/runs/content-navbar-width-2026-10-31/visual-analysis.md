# Content/navbar alignment visual analysis

Role: visual analyst; `/root/visual_analysis`.
Mode: original library shell adaptation.
Inspected current delivered grid screenshot `../collection-grids-2026-10-31/qa-sections-1440.png` with view_image and runtime `src/style.css`, `system-browser.css`, `catalog.css`.

## Observed

At 1440px, navbar's brand mark starts at x32 and right navigation ends at about x1408. Main content begins at x152 and ends at x1288. The first preview and Sections heading share x152; filters end at x1288. The 120px mismatch on each side comes from the 1184px max-width wrapper (including 24px inset), while the navbar occupies the viewport with 32px inset.

## Constraints

- Align the main content's outer left/right edges to x32/x1408 at 1440, preserving the current 24px grid column gap and caption-under-preview treatment.
- Shared `--library-page-gutter` at 32px desktop / 24px at <=700px is appropriate. Apply it to both navbar and `.library .reading-column`.
- The wrapper needs `width:100%; max-width:none; margin:0; padding-inline:var(--library-page-gutter)`. Reset the mobile legacy `.reading-column` 24px margin to avoid double gutters and horizontal overflow.
- Avoid double navbar padding if the header is still nested in the reading wrapper; it is currently a sibling in the produced screenshot's full-width layout, so inspect actual DOM after edits.
- Keep header vertical spacing, filters, breakpoints, image crops, preview aspect ratios and source iframe documents unchanged.
- Wider desktop text lines in detail views are a consequence of the explicit all-content width request. Preserve any existing paragraph/specimen local max-width where it expresses content structure.
- Validation: compare navbar and content bounding edges at 1440, 900 and 390px; require no horizontal document overflow and no unchanged max-width cap on any library route. This is authored responsive behavior, not recovered reference behavior.
