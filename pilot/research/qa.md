# Independent QA — pilot 001

Reviewer: actual independent agent `/root/independent_qa`, 2026-10-30. This agent did not create the application, design direction, or source analysis. Status: **changes requested** for QA-01 below, pending exact-revision recheck.

Directly inspected final representative hero, desktop, mobile and tablet PNGs with `view_image`; compared actual source crop, original source21, and original source17. Browser checks used Chromium/Playwright against `http://127.0.0.1:5175`. The authoritative runtime checkout is `/tmp/design-library-pilot-runtime`, used while project Documents files had cloud materialization stalls. Initial tested source and screenshot hashes are recorded in `qa-revision-initial.json`; behavior observations are in `qa-behavior.json`.

## Required correction

**QA-01 / preview section switching / parent owner.** `PreviewFrame` retains `contentHeight` when the selected section or device changes. Its iframe inherits that old height; `documentElement.scrollHeight` cannot shrink below the iframe viewport, so switching from the assembled page to Footer leaves a 2350px iframe around a 562.8px body. This creates about1787px of blank canvas. Success condition: switching page→footer→hero and desktop↔mobile sizes the iframe to the current content; isolate viewport state with a component key and measure the natural body/root height, then recheck. This issue affects the library viewer, not the assembled page's responsive layout.

## Passed observations, within scope

- At320,390,768,769,1024,1440px, assembled page and library document widths matched the viewport, with no broken images or uncaught JavaScript errors.
- Sources and System each expose one descriptive h1. Original images loaded at2350 and3044 native pixels; source attribution and limitations are reachable.
- Native section/device controls selected the expected routes: mobile hero adaptation and source-sized desktop reproduction. Comparison images both load at2030px; overlay75% sets implemented-image opacity0.25.
- Standalone Footer contains `#top`, and Back to top scrolls to0. All assembled same-page anchor targets exist; Articles reaches `#notes`.
- Eleven actionable keyboard stops checked have visible2px solid focus outlines and a logical order. The twelfth stop enters the iframe; no claim is made that this is an actionable control with an author outline.
- A read-only browser stress test using a long feature heading and fifteen repeated body sentences reflowed at390px without horizontal overflow. Application source was not modified for that test.
- The corrected faithful body has four lines and source-like line endings. Split, photographic crop, title anchor and lower portrait preserve the source's hierarchy. This is a geometry/fidelity study with explicitly substituted type, simplified guides, and screenshot-derived photographs; no pixel-identity finding is made.
- The original feature/footer and mobile adaptation remain coherent with the declared editorial system, without fabricated testimonials or client outcomes. Their source and demo disclosures are visible.

## Limits

This is one-browser pilot QA, not an exhaustive browser, screen-reader, or publication-rights audit. Full-page images were scaled by the inspection tool for composition review; the source-sized hero was inspected at its supplied raster. Font glyph differences and simplified grid strokes remain documented approximations. A changed source revision or capture requires affected recheck; no final pass applies to uninspected revisions.
