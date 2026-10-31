# Art direction — compact catalog dropdowns

Reviewer: `/root/art_direction`. Inspected actual supplied desktop crop at `/Users/abhishekmankotia/Desktop/Screenshot2026-10-31at3.19.24AM.png` (1126 ×162) and current `pilot/src/catalog.jsx`, `catalog.css`, and shared controls in `style.css`. No UI edits by this reviewer.

The screenshot shows excess horizontal space between labels and the trailing chevrons. Existing catalog CSS forces220px selects, then full-width controls on narrow viewports. Remove those catalog-specific forced widths and allow native intrinsic width (`width:auto`), retaining enough room for the longest option and chevron. Intrinsic widths are preferable to a smaller arbitrary fixed width that could clip longer available options.

Catalog labels should remain compact (`flex:0 1 auto`, `min-width:0`) and controls should wrap as a group when space is insufficient. Remove the mobile `flex:1 1 100%` label rule and mobile select `width:100%`; preserve container width/max-width safeguards to prevent horizontal overflow. Retain the existing title-row alignment and wrap behavior at desktop; on mobile the compact filters can remain in their own row.

Preserve36px control height, existing left/right padding, native select behavior, pill radius, border, transparent fill, type size, chevron, focus treatment and16px inter-control gap. Change the catalog controls only; the detail-page `.system-switch` has its own context and should retain its width rules.

Review success: Sections and Pages filters are visibly narrower while every option remains readable. Narrow viewports wrap rather than stretch or overflow. Filtering, URL persistence and keyboard focus remain intact. Cards, page content and navigation are outside this change.
