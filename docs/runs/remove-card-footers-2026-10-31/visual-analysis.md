# Visual analysis — remove card footer rows

Reviewer: `/root/visual_analysis`. Inspected both actual supplied crops at `/var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_dxVnWL/Screenshot 2026-10-31 at 3.22.54 AM.png` and `/var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_MO39to/Screenshot 2026-10-31 at 3.23.02 AM.png`; current `catalog.jsx`, `page-browser.jsx`, `catalog.css`. No UI edits by reviewer.

Observed: first crop isolates Section-card footer rows containing Galleries/Projects and Preview links, with the top dividing rule. Second crop isolates the Page-card Preview shell / Open page links and top dividing rule. The instruction “remove these” therefore targets complete footer rows, not just arrow glyphs or one action.

Constraints:

- Remove entire `.card-bottom` markup from Section cards in Catalog and from PageCard, including category/action text and divider. Do not leave an empty bordered container.
- Preserve card headings as links to the same detail destinations. Keep remaining metadata, descriptions, previews and system links.
- Remove trailing margin reserved between the final layout/description paragraph and deleted row. Page description minimum height no longer needs to align a row and may be removed for natural card-body height.
- Preserve Design Systems cards and shared `.card-bottom` styling they still need. Restrict cleanup to now-unused Section/Page-specific footer rules.
- Preserve compact filter widths and unrelated ongoing style edits.

Acceptance: supplied rows and rules are absent on both catalogs; descriptions end naturally without a reserved action gap; title links still open the correct preview; Systems footer remains visible; desktop/mobile gallery geometry and filtering unchanged.
