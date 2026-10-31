# Independent QA: compact dropdowns

Reviewer: `/root/independent_qa`. **Passed for this CSS correction.** No blocking findings; no UI files changed.

Delivered `pilot/src/catalog.css` SHA-256 independently verified: `c15002818d536009a4c722f4b8044c01414c6f0f184807d1d3c667481a60c819`. Canonical bytes equal the running `/tmp/design-library-pilot-runtime` copy. Live app http://127.0.0.1:5173.

Visually inspected actual supplied screenshot `/Users/abhishekmankotia/Desktop/Screenshot 2026-10-31 at 3.19.24 AM.png` and delivered `sections-1440.png` / `sections-320.png`. The large empty space in the supplied fields is removed. Current controls remain legible, rounded and36pxhigh; mobile shows compact left-aligned fields rather than full-width fields. Card/gallery presentation remains outside this narrow change.

Own Playwright/Chromium script `/tmp/qa-compact-dropdowns.mjs`, evidence `qa-checks.json` and `qa-sections-320.png`:

- At1440/768/390/320px, Section type measures134px, Design system131px, Page type125px. All remain36pxhigh with unchanged pill radius.
- Measured every option using the actual computed font, plus both field paddings and borders. Widest required widths are133.09/130.74/124.68px respectively, fitting rendered controls including reserved chevron padding.
- No horizontal document overflow at tested sizes. Controls remain on one row where space allows and CSS keeps wrapping available.
- Longest section choice Calls to action and Blueprint system filtering work together; reload persists and Clear filters restores18sections.
- Landing page selection/reload/clear works in Pages and restores2pages.
- Native Section type select takes keyboard focus and matches focus-visible after Tab/Shift+Tab. Existing native keyboard behavior is retained.
- Detail-page Design system switch remains220×36px at desktop, unaffected by catalog narrowing.
- No JavaScript page errors.

Parent reports build/project checks passing. Native OS popup arrow selection is not re-tested by this CSS-only review.
