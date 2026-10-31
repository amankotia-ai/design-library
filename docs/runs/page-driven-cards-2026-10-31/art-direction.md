# Art direction — page-driven compact cards

Reviewer: `/root/art_direction`. Inspected the actual original screenshot and current `pilot/src/page-browser.jsx`, `page-shells.js`, `catalog.jsx`, and preview CSS. No UI edits by this reviewer.

The user's correction supersedes the prior direction for full-height previews: “the preview shoulnt be complete pages, the content has to be driven by pages”.

Restore the original visual composition: preview above metadata, tall9:10 crop with existing neutral inset and border, three-column desktop grid and one column on mobile. Preserve the original preview scale and top crop; do not shrink the complete image into the frame or stretch it. Existing full-page screenshot assets may remain as the source of a width100%, natural-height image inside the clipped preview.

Keep the page registry as the data source. Titles identify the actual page (Portfolio homepage / Creative tool landing page); type, concise description, ordered composition/count, preview and links come from each page record. The system name is a subordinate association. Count derives from `page.sectionIds` and actions route via `page.id`. Do not restore palette/type metadata as the primary card identity: that describes the system rather than the page.

The preview asset alt should describe the visible opening preview rather than claim that the complete page is visible. A compact preview provides recognition; Preview shell and Open page expose the actual complete composition.

Success: the delivered card returns to the original compact screenshot proportions and hierarchy while its text, image and destinations remain driven by the page. Independent QA must inspect the corrected output; earlier full-height QA does not validate it.
