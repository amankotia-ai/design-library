# Visual analysis — page-driven cards, compact previews

Reviewer: `/root/visual_analysis`. Actual evidence inspected: original user screenshot during previous task; current preceding delivery at `docs/runs/complete-page-shells-2026-10-31/pages-top-1440.png`; current `page-browser.jsx`, `page-shells.js`, `catalog.jsx` and `catalog.css`. No UI source edits by reviewer.

The user corrected the interpretation: “the preview shoulnt be complete pages, the content has to be driven by pages”. This supersedes the previous recommendation for a complete top-to-footer thumbnail. The previous full-length preview was an incorrect inference, not a requirement.

Keep the page registry and page-specific card content: actual page name and type, purpose description, system relation, declared composition count, preview-shell action and open-page action. These are driven by the page record, rather than duplicate design-system cards.

Restore the compact visual construction shown in the original screenshot: preview first, metadata below; fixed tall 9:10 preview; neutral inset/frame; original border/radius and serif heading. Restore the inherited three-column desktop grid with two populated entries, and one column on mobile. The current two-column, metadata-first, unconstrained full-length image construction makes cards much larger and is outside the corrected request.

A static full-page capture can remain the underlying asset, but the card viewport must crop it at the top. Set a fixed aspect ratio on the frame and use `object-fit: cover; object-position: top`, or equivalent height constraint. Do not fit the entire page into a miniature strip. The complete page remains available through the existing working page action.

Descriptions may add modest card-body height relative to the original system cards; keep their current small muted type. Do not restore font/palette rows merely to duplicate Design Systems. Preserve the new hand-drawn active tab underline and current filters, which are outside this correction.

Acceptance: compact cropped preview visibly precedes page-driven content; no full-page image extends cards; page shell names and composition counts stay specific to the registry; desktop three-column and mobile one-column geometry; existing actions still open complete shells. Independent delivered-revision QA remains required.
