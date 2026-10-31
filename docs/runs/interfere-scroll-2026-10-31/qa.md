# Independent QA — Interfere preview scrolling
Reviewer: actual independent agent /root/independent_qa. Reviewed23:00–23:03UTC,31October2026IST. Scope: direct-source change in PagePreview only. No implementation edits. Current visible runtime full-file and PagePreview-only digests are in qa-revision.json; unrelated concurrent SystemPanel changes are excluded.

## Result
Core scrolling fix passed independent pointer and keyboard reachability checks. Outer-page scroll stability has a stated automation limitation below; it is not certified by this pass.

Actual tested URL: http://127.0.0.1:5202/?panel=system&section=interfere-page in Chrome controlled through CUA. The real interactive iframe now points to /interfere/page.html, with one source document viewport1706px high and full scrollHeight7286px. This replaces the recursively expanded page wrapper.

Native pointer scroll over the visible preview advanced the inner source from0→1722→2583. Content visibly changed through overview, testimonial and feature scenes. After clicking source background, End reached source scrollTop5580 (7286−1706), visibly exposing closing CTA and final footer; Home returned source scrollTop0 and hero. A later pointer scroll0→861 again exposed lower overview/testimonial content. The native preview scrollbar traverses the complete page rather than stopping at the initial hero.

Keyboard navigation inside the iframe works: Enter on Product summary opened its native disclosure, showing Engineers, Designers, Product Managers and Customer Support links. qa-keyboard-navigation.png preserves this actual state. Original source service links were not followed.

The Pages catalog Interfere thumbnail retains /?view=interfere-page&embed=1 and inert, aria-hidden=true,tabindex=-1; every inspected Pages iframe retains the same inert attributes. Standalone /?view=interfere-page still renders /interfere/page.html at7286px full height. Independently addressable /?view=interfere-security still renders /interfere/security.html at296px. Thus the special direct URL is limited to interactive Interfere PagePreview.

## Validation limit
CUA’s Chrome native scroll wrapper produced small outer-page drift while inner scrolling succeeded: after initial bring-into-view, outerY191.5→200 alongside inner0→861. Keyboard/pointer calls also showed small outer offsets during source focus/settling. This pass does not claim a stationary outer page. The parent separately reports an actual IAB check with outerY157.5 unchanged while source0→1440; that is parent evidence, not invented independent evidence. No source change outside the one conditional iframe URL was identified that establishes this Chrome automation drift as a newly introduced defect. Boundary chaining was not claimed or tested. A subsequent narrow pass at390×844 confirmed directsource preview with no page-wide overflow (document width390), displayed frame322px wide, source viewport2746px high, full source7286px, and pointer inner scroll0→844. Actual qa-narrow-pointer.png saved; viewport reset afterward.
