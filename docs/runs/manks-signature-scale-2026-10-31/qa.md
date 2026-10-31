# Independent signature-scale QA

Status: passed. Reviewer: `/root/typography_qa`.

Inspected current `pilot/src/library-tokens.css`, header markup in `pilot/src/main.jsx`, actual new logo crops at 1440/390/320px, and the 320px page capture. Independently rendered the current homepage at 1440, 768, 390, and 320px; evidence is `qa-checks.json` and `qa-top-320.png`.

The red “of Manks” is visibly larger and now has comparable presence beside “Design Library.” It stays on the same line without colliding with the black text or exceeding the viewport. At 320px the brand ends within the 24px right gutter and navigation remains on a separate row. The 320px viewport capture was inspected at readable scale, not only through the reduced full-page image.

Independent browser checks passed at all four widths: signature loaded; no horizontal overflow; logo name remains “Design Library of Manks” on one home link; font stays Geist Serif 400 with the prior 0.22px optical stroke; black wordmark remains readable. Expected signature dimensions are 104 × 38px desktop/tablet, 96 × 35px mobile, and 88 × 32px narrow mobile. Font files and the signature asset are unchanged from the prior independent QA.

## Inspected revision

- `pilot/src/library-tokens.css`: `40898bd7dd6de7db33e8fa761aed945db5279ef482bd2d861de3a8a6312adb97`
- `pilot/src/main.jsx`: `7e2066ca82e13cf0dbea08ba706b8c9694bd9607f67223e57d456dbd8d5db903`
- `pilot/public/assets/of-manks-signature.png`: `0493cd53b2a3ad58c56c020d5b4e2ce7c7d1c9075faa4c82b22fc426508f7066`

The homepage/navigation content has changed concurrently since the preceding run; this verdict covers the requested signature scale, current header fit, image loading, and accessible home link. It does not claim a full product review of that separate redesign. No source edits were made by this reviewer. No blocking findings.
