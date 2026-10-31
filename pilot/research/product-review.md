# Product review — pilot 01

Reviewer: `/root/product_design`. Role: product designer. Date: 2026-10-30. Status: **changes requested** for two bounded navigation/semantics issues. This is a creator's product review, not independent QA.

## Evidence inspected

Visually inspected `evidence/page-desktop.png`, `page-mobile.png`, `page-tablet.png`, `library-desktop.png`, plus current `src/main.jsx`, `src/sections.jsx`, `src/sections.css`. Reviewed working preview at http://127.0.0.1:5175/ using Playwright Chromium. Original reference images had been inspected during product constraints.

Reviewed source SHA-256:

- `main.jsx`: `319e41b4d0f9a3bb34284dac3ca11c39cf1ef756fe7389c7a7da201222cbf5b1`
- `sections.jsx`: `fb851d1168d41c803077905ce5f13f6e7120443ca8c2245ad930240ec338b8bf`
- `sections.css`: `55cf794c9c99dcd57bd8351b124f15d3da89fa5c1919ed67d4ae00e22926af9c`

Reviewed capture SHA-256:

- `page-desktop.png`: `0cfb7ed95268817cb44b8d7b94dea0480c2111761b8dd7e62c62b465531b9704`
- `page-mobile.png`: `35e6c9b9285f18182bfc46e996b2f884e15cf0ea3773c6964cca2091923eba31`
- `page-tablet.png`: `94d0e2c4e3b2c59fd47a404352c0601b915b44516a413793fe12c0836b57e716`
- `library-desktop.png`: `ada42c1c37585b69abdb5cd5107216b2da69f0ee7c8303aba7018144523d0457`

## Observed strengths

The feature and footer maintain the source's editorial hierarchy, image planes, serif contrast and quiet utility text. Their original copy describes an illustrative study and does not invent customers or business outcomes. The standalone page includes source attribution and explicitly labels the feature, footer and mobile behavior as original extensions. The library separates section function, layout and style and makes sources available through a persistent primary control.

The mobile page genuinely reflows: header, title, portrait/description, campaign image, original feature, and footer form a clear sequence. The feature is readable without requiring a miniature desktop canvas. The tablet layout is conservative and long but coherent. No content clipping was visible in the four supplied captures.

## Required findings

| ID | Location | Finding | Owner / correction | Success criterion |
| --- | --- | --- | --- | --- |
| PD-01 | Standalone `/?view=footer`, Footer Back to top | Link points to `#top` but no element with that ID exists on this route. It happens to remain at scroll zero in the short desktop page, but does not provide its promised target. | Parent: add `id="top"` to standalone wrapper or use an explicit assembled-page target. | In standalone footer, `document.querySelector('#top')` exists when local anchor is used; link scrolls to the actual route's top. |
| PD-02 | Sources and System library panels | Switching panels removes the library h1 and leaves each panel's main title as h2. The active document has no primary heading. | Parent: render active panel title as h1 and keep subordinate titles h2/h3. | Each panel has one descriptive h1 while preserving visible styling and reasonable hierarchy. |

## Advisory

Mobile hero body is 14px/20px; the proposed product contract recommended 16px body. It is readable in the inspected capture, but 16px/22px would improve reading comfort. Apply only to authored responsive adaptation, not the isolated faithful source study. Footer utility links have small visual line boxes; generous hit padding would help touch use without changing typographic scale.

## Behavior checked

- At 390px library width, selected Hero and Mobile, then opened Compare, selected Overlay and changed the native range to 75%; controls updated correctly.
- Source images completed loading with native widths 2350 and 3044. Source and System panels did not cause document overflow at 390px.
- Portfolio Articles anchor resolves to the real `#notes` target. Assembled-page Back to top resolves and scrolls to zero. No broken same-page hash links on assembled page.
- Checked assembled-page widths 390, 768 and 1440: document width equaled viewport width, hero fit viewport, and all three photographic images loaded.
- First twelve keyboard stops in library were logical (brand, main panel controls, open page, section choices, evidence, viewport buttons), each with visible solid focus outline.
- No uncaught browser page errors during these checks.

## Limits and next review

No screen-reader test, exhaustive browser matrix, pixel-fidelity approval or production publishing claim is made here. Parent has been notified of required fixes. Source changes invalidate affected review evidence; recheck the fixed revision before final acceptance. Independent QA is a separate required pass.
