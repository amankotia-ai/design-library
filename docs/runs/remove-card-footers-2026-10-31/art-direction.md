# Art direction — remove card footer rows

Reviewer: `/root/art_direction`. Inspected both actual supplied crops from03:22:54 and03:23:02 and current `pilot/src/catalog.jsx`, `page-browser.jsx`, `catalog.css`, and shared card CSS. No UI edits by reviewer.

Remove the complete bottom footer blocks from Sections and Pages: the section category plus Preview action, and the Preview shell/Open page actions. The attached crops include the thin rule above each row, so remove that divider and the row's spacing together with its contents.

Titles already provide the destination link and should remain clickable. Keep the section layout description and page description as the last card content. Reset their bottom margins to zero so the deleted footer does not leave a reserved blank band. Preserve card metadata, system association, current preview treatment and grid row gap.

Do not change shared `.card-bottom` rules or SystemCard markup: Design Systems is outside the supplied removal scope. Scope any obsolete CSS removal to section/page footer rules.

Review success: Sections and Pages have no bottom categories/actions/dividers, no orphan footer-sized gap, and working title destinations. Design Systems retains its existing footer. Narrow and desktop layout remain intact.
