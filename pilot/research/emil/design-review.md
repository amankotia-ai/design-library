# Emil reference direction and review

Role: actual specialist `/root/emil_design_review`, product/art direction. Scope: library browser chrome and presentation; no application edits. Date: 2026-10-30.

## Directly inspected evidence

- Actual source screenshot `research/emil/reference-crop.png`.
- Browser-derived `research/emil/computed-styles.json`, target `https://emilkowal.ski/ui/you-dont-need-animations`.
- Current `src/main.jsx` and current library layout structure.

## Observed properties

The source body is `rgb(253,253,252)` (`#fdfdfc`). At a 1440px viewport, the reading column starts x398 and spans 644px. Its plain two-line author header begins y117 and is 40px high; the recorded header has 128px bottom margin. Prose is 16px with 26.4px line height and a 26px paragraph margin. Small section headings use 16px/24px and a moderately stronger weight. Text is warm near-black `rgb(33,32,28)` (`#21201c`). Rounded inset media has approximately 12px corners in the directly inspected screenshot. The source font is a custom `Sans` family with `Sans Fallback`; this is not a recovered identification of a distributable font.

## Translation to Design Library

Use a centered reading column with a plain Design Library masthead and quiet inline Library/Sources/System navigation. Replace the large dashboard-style title and sidebar with prose introducing the working study, then a modest heading and an inset working preview. The selected hero, feature, footer, assembled page, device controls and comparison controls remain real. They can live in the demo surface, using native labeled controls and a compact wrap-friendly toolbar. Place explanation and source caveats below the relevant demo as ordinary reading text.

The portfolio's existing typography, imagery and geometry stay inside its iframe. Applying the article font or page-width rule inside these samples would invalidate the measured source reproduction. Style browser chrome with an explicit existing-font substitute, such as self-hosted Inter; do not silently redistribute the reference's custom webfont.

Keep header/intro space generous at desktop, then reduce top spacing on narrow screens. At 390px, give the reading column 20px side margins; controls must wrap without producing horizontal document overflow. A desktop preview may scale within its inset; a mobile preview must fit the available inset width while retaining its own authored390px layout. Source/System pages should inherit the same narrow reading surface, modest headings, and prose rhythm.

## Product constraints

- Preserve all existing attribution, source-image links, system tokens, section routes, device modes and hero comparison.
- Keep a real h1 per panel even when visually modest.
- Keep native buttons' visible focus and aria-pressed states.
- Key PreviewFrame by selected section/device and measure natural body height to resolve the previously identified stale iframe-height issue.
- Retain separate labels for faithful source reproduction and original expansion.
- No animation is necessary to adopt this still-reference visual direction.

## Review status

Direction complete from actual source inspection. Rendered revision review pending parent handoff. This document does not assert independent QA or a delivered-revision pass.
