# Lighter preview container borders

Start: 2026-10-30 21:51:23 UTC (2026-10-31 03:21:23 IST).
Deadline: 2026-10-30 22:11:23 UTC (03:41:23 IST).
Scope: lighten the home catalog preview container borders shown in the supplied screenshot.
Mode: original system refinement; no source reproduction or reference-page edits.
Completion criteria: visibly softer container outlines; unchanged widths, layout and preview content; rendered evidence and independent review of delivered revision.
Freebyrd index, thread and references returned no context for this folder.

Specialists: visual_review (visual analysis), product_review (product design). Art direction: visual_review (separate follow-up pass). Independent QA: border_qa.

Visual analysis: visual_review inspected actual attachment and source; identified nested preview frames.
Product design: product_review independently inspected attachment and source; recommended dedicated preview token to preserve global dividers.
Art direction: visual_review performed separate pass consuming product findings; approved #edede9 on both frame selectors.
Implementation: added --library-preview-rule:#edede9 and applied only to .style-preview and .page-viewport. Runtime mirrored to existing localhost:5175 preview.
Evidence: before screenshots use a controlled #e7e7e3 border override on current output; after screenshots use delivered CSS. These are not original pre-edit captures. Desktop1482×1000; mobile390×844. Browser computed styles verify visible border color change and identical geometry/background/width values. The zero-width bottom border retains currentColor in delivered CSS.
Validation: Vite production build passed in existing runtime. No behavior changes or new tests. Independent QA: border_qa, passed; inspected current source hashes, desktop/mobile renders and comparison metrics. See qa.md.

library-tokens.css SHA256: 924aa0e9fb318ea667509d82f5ef0df4635e1c2409b4d21b2256e794af47fc0a

system-browser.css SHA256: efe823a78025237fe40a43a9ade161ab7ae662b854f0bc9173b182b53cf33bb4
