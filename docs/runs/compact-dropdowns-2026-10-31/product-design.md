# Product constraints — compact dropdowns

Reviewer: `/root/product_design`. Inspected the supplied screenshot `/Users/abhishekmankotia/Desktop/Screenshot 2026-10-31 at 3.19.24 AM.png` using the image viewer and `catalog.jsx`, `catalog.css`, `style.css`, and `system-browser.css`. No UI edits.

The screenshot shows excess horizontal space between short filter values and trailing chevrons. Catalog CSS fixes each select at 220px, then forces each label and select to fill the row below 700px.

- Let catalog selects use native intrinsic width (`width:auto`) so the longest option plus existing text and chevron insets determine the control width. Do not shrink padding or type to achieve the width reduction.
- Preserve existing 36px height, 12px text, 12px leading inset, 36px trailing inset, chevron, pill border, hover, and focus treatment.
- Use compact, non-growing filter labels on narrow screens. Allow the filter row to wrap naturally, preserving gaps and a maximum width of 100%, instead of forcing every select to full width.
- Keep options legible without clipping. Validate Section type with Calls to action and Product demos, Design system with its default label and Quiet Serif, and Page type with Landing page.
- Keep Clear filters visible and independently usable when active; wrap it to the next row when necessary.
- Preserve native select semantics, accessible labels, filtering, URL persistence, and clearing. This is a width/layout correction.
- Apply to catalog filters. The detail-view collection switch is a separate layout and is not shown in the user's screenshot.

Review criteria: desktop controls are visibly narrower than their prior 220px width; longest displayed values do not collide with chevrons; narrow layouts wrap without page overflow; focus remains visible; filter results and Clear filters still work.

Status: constraints delivered. Rendered QA remains separate.
