# Product review: signature scale

Reviewer: `/root/typography_product`. Status: passed for this CSS-only scale change.

Inspected the actual `brand-320.png`, `brand-390.png`, and `brand-1440.png` captures, current source, and live Chromium at http://127.0.0.1:5175 after fonts settled. The larger handwriting now has a comparable visible height to the Serif name and remains a distinct red signature.

- 320px: complete brand measures **269.66px** inside **272px** usable width (24px side padding), leaving **2.34px**. Its right edge is 293.66px against the content edge at 296px. No clipping or horizontal document overflow; signature is 88 × 32px.
- 390px: brand is 296.17px within 342px; signature is 96 × 35px. Desktop 1440px: brand is 335.20px; signature is 104 × 38px. Navigation remains separate from the brand at each width.
- The existing single home link retains the exact accessible name **Design Library of Manks** at all three widths (one matching link each). The text plus image `alt="of Manks"` supplies that name once; no markup change was required.

Reviewed revision SHA-256:

- `pilot/src/library-tokens.css`: `40898bd7dd6de7db33e8fa761aed945db5279ef482bd2d861de3a8a6312adb97`
- `pilot/src/main.jsx`: `7e2066ca82e13cf0dbea08ba706b8c9694bd9607f67223e57d456dbd8d5db903`

No source edits or additional features requested. The 320px fit has a small but positive margin with the loaded official font; do not enlarge the narrow breakpoint further without remeasurement.
