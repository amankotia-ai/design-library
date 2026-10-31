# Restore existing dropdown and page cards
Start: 2026-10-30 20:58:35 UTC /31 October02:28:35 IST.
Deadline: 2026-10-30 21:18:35 UTC /31 October02:48:35 IST.
Budget:20minutes, scope expected substantially smaller.
Mode: faithful reuse of existing library UI components, not source-site reproduction.
User request: use attached Quiet Serif dropdown and restore earlier page preview cards.
Scope: reuse existing system-switch dropdown style for catalog filters; restore Pages to existing tall live page preview, palette/type metadata and card proportions; page actions continue to target page detail. Preserve three-destination navigation and Sections gallery behavior.
Completion: Shared native dropdown appearance matches existing control; tall live page cards render and filter; desktop/mobile and keyboard checks; existing Systems cards preserved; independent QA tied to source hashes.
Source: supplied dropdown screenshot (578×178, appears2×), previous run before-desktop.png, source system-browser.jsx/css and style.css.
Freebyrd index/thread/references: no folder context.

## Implementation and evidence
Existing SystemCard extracted from SystemHome without changing its visuals. Pages and Design Systems share this card, including live CollectionPagePreview, palette, typography, family and section inventory. Pages changes only destination/action to page preview. Original preview geometry remains9:10 at the existing3-column desktop/1-column mobile widths.
The existing .system-switch select appearance and hover rules now also apply to .library-select. Native filtering behavior is preserved. Catalog filters stack on mobile to preserve their full values. No shared design tokens or reference-preview styles changed.
Specialists: /root/visual_analysis, /root/product_design, /root/art_direction. Actual supplied screenshot and earlier rendered cards inspected. Freebyrd has no matching project context.
Parent validation passed: two live page cards, aspect ratio, restored palette/type/count, Pages destination, Systems action preservation, original/filter dropdown computed styles equal, filtering and320/390px layout. No JavaScript errors. See validation.json and screenshots. Build passed.
Independent review pending until independent-qa.md is written against delivered-sha256.txt.

## Final review
Independent QA /root/independent_qa passed the delivered hashes. Actual desktop and320/390px renders inspected; shared control styles, live page previews, metadata, filtering, clear/reload, routes and native keyboard focus verified. Headless macOS OS-popup arrow selection is unconfirmed; no custom keyboard behavior was introduced. No blocking findings or required unfinished work. npm run check also passed. See independent-qa.md.
