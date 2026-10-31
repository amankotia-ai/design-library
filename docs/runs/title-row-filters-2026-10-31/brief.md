# Title-row catalog filters
Start:2026-10-30 21:02:35 UTC /31 October02:32:35 IST.
Deadline:2026-10-30 21:22:35 UTC /31 October02:52:35 IST. Budget20minutes.
Scope: Move Sections/Pages filters into title row, right-aligned in count position; remove header result count. Preserve native labels/dropdown appearance/filter handlers and restored page-card components. On mobile wrap filters below title.
Mode: existing UI layout correction; no reference-site reconstruction or system expansion.
Completion: Desktop title/select control row aligned, controls meet catalog right edge, no count element; Pages one filter, Sections two; filtered clear action fits; responsive no overflow; source page cards unchanged; build + independent rendered QA.
Sources: supplied Screenshot 2026-10-31 at2.31.16AM.png, prior run after-sections-desktop.png, catalog.jsx/css.
Freebyrd index/thread/references: no folder context.
Visual analysis /root/visual_analysis: actual screenshot inspected, preserve220px×36px controls +16px gap, labels above; right edge x1288 matches existing grid edge and old count; title aligns with control row.
Product design /root/product_design: existing catalog-filters moves inside catalog-heading; remove count rather than replace it; keep handlers/URL/clear semantics and DOM order; no card markup changes.
Art direction and independent QA pending.
Art direction /root/art_direction confirmed actual prior screenshot and source: title aligned with36px control row, labels above, group right edge at grid edge, wrap intact below title when needed.
Implemented only catalog.jsx/css. Removed header count markup/styles; moved existing filter group into heading. Desktop right-aligned; mobile below title; existing native dropdown styles/handlers unchanged. Shared SystemCard and live page previews were not edited.
Final validation: build passed. Parent browser checks confirmed title/select center alignment and group/grid right edge equality, count removed, filtering/empty/clear functional, no overflow at320/390/701/768px. Independent QA /root/independent_qa passed final two-file hashes and visually inspected actual desktop/mobile renders, including active Clear and live page cards. See validation.json, independent-qa.md and delivered-sha256.txt. No blocking findings or required unfinished items.
