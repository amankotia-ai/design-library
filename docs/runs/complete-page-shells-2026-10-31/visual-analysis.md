# Visual analysis — complete page shells

Reviewer: `/root/visual_analysis`. Inspected the actual supplied screenshot (3024 × 1964 original, displayed resized), `pilot/src/catalog.jsx`, `pilot/src/system-browser.jsx`, and `pilot/src/system-browser.css`. No application source changed by this reviewer.

Observed: Pages currently duplicates the Design Systems cards. Two tall neutral framed cards show Quiet Serif and Blueprint, the system names, font and palette metadata, and section counts. The live previews clip at a fixed 9:10 aspect ratio. Quiet Serif cuts inside its project section; Blueprint cuts before its gallery, pricing, FAQ, CTA and footer. Neither preview communicates the complete top-to-footer composition. The screenshot is evidence of current state, not a requested new visual language.

Recommended minimum product correction:

- Give Pages a dedicated page entry and preview rather than the `SystemCard` page boolean. A page is an assembled sequence with a purpose; its system is associated metadata.
- Preserve the existing quiet border, rounded outer frame, neutral inset and serif card title. The user did not request a visual restyle.
- Show the assembled page from navigation through footer inside the page preview. A full-page image or a correctly height-measured live frame can establish the complete silhouette. Fit the whole page without distortion or a concealed crop. Readable inspection remains available through opening the complete page.
- Use page-purpose names such as portfolio home and creative-tool landing page; show Quiet Serif / Blueprint as the system label. Keep source-study disclosure for Blueprint and explicit original-expansion status where useful.
- Full-page content must remain available at normal readable scale through the page action. Preserve existing tall cropped previews in Design Systems, which have a different job.
- On narrow screens, keep a single card per row and filter above. Do not squeeze full-page silhouettes into side-by-side mobile columns.

Inference/limit: The short request does not specify that every page section must be legible at thumbnail size. Fitting a roughly 8,500px page into a card necessarily makes text small; this is a silhouette preview with a full-size inspection destination. The attached image establishes library styling, not source-page pixel fidelity.

Acceptance: Pages visibly contains complete-page previews and page-specific entries; no clipping before footer; page action opens complete usable composition; Systems preserves its current behavior. Independent QA of the delivered revision remains required.
