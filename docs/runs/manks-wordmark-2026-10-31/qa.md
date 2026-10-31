# Independent QA

Status: passed for the inspected revision. Reviewer: `/root/typography_qa`. Reviewed 2026-10-31, approximately 02:22 IST. No blocking findings.

## Revision inspected

- `pilot/src/library-tokens.css`: `9e801699c0d89ebb9948833740fa08fe9204d161f074c4a92856dcf51c9f7407`
- `pilot/src/main.jsx`: `a5e245509986ba00ff75d415988ee4507848754bf646970eaa10f93660b876b3`
- `pilot/public/assets/of-manks-signature.png`: `0493cd53b2a3ad58c56c020d5b4e2ce7c7d1c9075faa4c82b22fc426508f7066`

## Actual inspection

Read implementation, brief, and asset provenance. Viewed the user's Belmonte Ballpoint reference screenshot, all four home captures (1440, 768, 390, 320), and logo crops at 1440, 390, 320. Independently rendered and viewed Study, Sources, and System at 390px; retained captures are `qa-library-390.png`, `qa-sources-390.png`, and `qa-system-390.png`.

The wordmark remains on one line at all inspected widths. The red “of Manks” lettering is legible, separated from the black text, and fits the mark/text grouping. Navigation has room at desktop/tablet sizes and its own row on mobile. No clipping or collision is visible in the inspected output. Palette overlap is an unrelated concurrent change and was not treated as a typography finding.

## Independent browser checks

Ran all four library panels at 1440, 768, 390, and 320px on the current runtime at `http://127.0.0.1:5175`. Evidence: `qa-checks.json` (16 checks).

- No horizontal overflow or browser page errors; the signature loaded at every panel/width.
- Header link is found by the exact accessible name “Design Library of Manks”; its destination remains `/`. The decorative icon has empty alt and the signature alt supplies the new words.
- Library heading families/weights are Geist Serif 400. Library body and controls use Geist Sans.
- Independently queried Chrome's rendered fonts: logo and heading resolve to custom `GeistSerif-Regular`; a temporary bold probe resolves to custom `Geist-Bold`, weight 700. Probe was removed with its browser session and never persisted to source.
- Signature is a 2079 × 756 PNG with alpha. Canvas pixel inspection counted 1,249,102 fully transparent pixels and 322,622 pixels with ink; there is no opaque rectangular background.
- Rechecked preserved typography: editorial page heading and Quiet Serif specimen remain `Editorial`; Blueprint page heading remains its source Geist, and its specimen remains `BlueprintGeist`.

## Limits

The heavier navbar wordmark is a 0.22px optical stroke on the actual Regular font, not a newly recovered Medium weight. The red signature is original generated lettering approximating the supplied handwriting style; it does not embed the commercial Belmonte font. These limitations are accurately recorded in the brief and provenance. The parent separately reports that build and existing project checks passed; this review's independent evidence concerns source, rendered output, fonts, fit, and accessible link naming. Future changes to the inspected source/assets invalidate affected review claims.
