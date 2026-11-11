# Independent final QA — Film & Motion

Status: **Passed within the reviewed scope.** No blocking visual or reported behavioral defects found.

Reviewer: `/root/independent_final_qa`, independent of the collection, lab and routing implementation owners. This review used actual saved screenshots, current source excerpts and the root agent’s browser automation report; the reviewer did not personally interact with the live browser. No app files were changed.

## Observations

- The collection retains the Design Systems three-column grid, specimen proportions, serif headings, neutral surfaces, thin rules and shared header. Mobile stacks the title, download actions and filters without visible crowding or horizontal clipping.
- The detail pages retain the established left reading column and right preview pane. At 1440px both reference and film detail report preview x 614, width 802. The corrected header starts at the top; the stray footer is absent.
- The guide reader shows readable hierarchy, restored list markers and inline links. The 390px guide adaptation remains legible.
- The calculus page visibly connects a scene, scrubber, parameters and mathematical quantities. The 900px pane stacks controls as its actual width narrows. The mobile lab fits its pane; longer content uses the declared scrollable area.
- The displayed default exposure interval 1.996–2.004s preserves uncertainty. The source explicitly scopes safety to the protected result box across 360–1280px width, fixed 540px height and current time. Exposure applies to the exact edit at the selected viewport. Real-arithmetic, text shaping, occlusion and comprehension limits are documented; no universal quality prediction or arbitrary-film compiler is claimed.

## Behavioral evidence reviewed

`browser-check.json` reports search/reset, collection navigation and browser history, exact-cut undefined derivative, finite smoothed derivative, a moving-proof violation, settled safety, contents navigation and references. It records 73 successful document downloads and the skill ZIP 200, no page errors, and no document horizontal overflow at 1440, 900 or 390px. This review verifies the report and screenshots, not an independent rerun of those interactions. The 14 mathematical checks are separately recorded by the implementation owner; this is not a new mathematical proof or full accessibility audit.

## Actual images inspected

- `systems-desktop.png`
- `system-detail-desktop.png`
- `film-collection-desktop.png`
- `film-collection-mobile.png`
- `film-calculus-desktop.png`
- `film-calculus-tablet.png`
- `film-calculus-mobile-lab.png`
- `film-guide-desktop.png`
- `film-guide-mobile.png`

## Frozen revision

All seven SHA-256 values were independently compared with the current source files and match the browser report.

- `src/main.jsx`: `d563693173464534bd550aaa379256520a402f302e32302c8c01c664ddf64b07`
- `src/film-library.jsx`: `28c4d9c1c90bebf6c7a275c92ed59f8f74f2d5d67b71c78ce6a500be7b0207e6`
- `src/film-library.css`: `1902a00ec166f4ab95464fdbe8c59bfad8eb866ead4a5994901c982d2ba95f8f`
- `src/film-lab.jsx`: `310b106fb8f39428f8644cf2f9668b1e1e9ed003feba958b5bad8ebed9341494`
- `src/film-lab.css`: `59019f32040c9346c915d01757d13283a6cfb5bbd4b762bed8e3ee67f1932a2e`
- `src/film-math.js`: `aa620fd6abdd639b855d60e92f3132afe085fee4e2696f6c0eb48587da9d4561`
- `src/film-data.json`: `4297c57ca5b0534b75d52ac28e151410fe5a3243c0041d3838a301ee010e9267`

Review covers the stated screenshots and recorded controls. It does not establish every source-document claim, screen-reader behavior, all copy lengths, all viewports, actual audience comprehension, or publication rights. Any subsequent affected source change invalidates the corresponding part of this review.
