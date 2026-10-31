# Independent Steel QA

Reviewer: `/root/steel_qa`. Status: **passed within the declared scope, with documented limits**. Reviewed 2026-10-30T22:25:01.968Z.

The reviewer independently inspected actual source images, current rendered desktop/mobile output, the open mobile menu, the source globe capture, use-case disclosure layout, and final system/section/source catalog images. The review ran against isolated `http://127.0.0.1:5177`; source hashes matched before and after the final audit. Exact hashes are in `qa.json` and raw browser evidence in `qa-final.json`. Earlier failed/invalidation evidence remains in `qa-first-pass.md`.

## Passing evidence

-37 route/viewport checks:9 main routes plus14 section routes at1440px and390px. The assembled page was also checked at768px. All Steel sections rendered; no observed page errors, failed400+ asset responses, broken images or horizontal overflow.
- Desktop hero uses source Schengen at60px, ending y500 with36px announcement; observed source intro/terminal geometry is retained. Mobile uses40px headline and301px hero,20px gutters, recovered terminal scenes after stacked CTAs.
- Seven native FAQ disclosures exist; Enter opens the focused summary and reveals its answer. Clipboard action writes real text. Desktop Resources displays links. The mobile menu has an opaque surface, displays links and closes to `hidden=true/display:none`.
- Library system/page/section/source routes resolve Steel while retaining the other four currently registered systems. All14 section thumbnails load; standalone captures avoid the earlier sticky-navigation artifacts.
- Page-detail iframe height13643px matches its document height13643px, with fixed500px desktop reference hero. The full preview is reachable in its scrollable stage.
- Use cases provide12 native disclosures as an explicitly documented adaptation. Globe artwork is recovered as source captures for desktop/mobile, replacing the blank canvas.

## Non-blocking findings

1. The Steel system-card palette wraps four swatches over two rows, and the lower parameter specimen is partly cropped. This affects a decorative specimen; the actual page and reusable sections remain available.
2. Footer layout copy says “purple wordmark” while current recovered artwork is red. Remove the color adjective in a later copy correction; no source art replacement is needed.

## Limits

This is a Chromium review of the Steel addition, not a pixel-identity claim or a complete regression review of the other systems. Product scenes/globe are settled illustrations; the hero program is retained, and the use-case layout is adapted. Desktop source total height changes with that adaptation. Source captures include A/B headline variants; this reconstruction fixes variantA. Source redistribution rights remain unverified. Steel account, billing, infrastructure and external-service actions are not reproduced. Parent reports the broad metadata check is blocked by unrelated Salesloft.mode metadata; this report does not claim that check passed.

## Final synchronized revision addendum

The final common main/data synchronization preserves concurrent systems and adds the Steel hero comparison. Independent recheck passed Steel System, Sources, hero Compare (both valid images), and the opened page-detail notes. The initially CSS-hidden notes were corrected by changing only the notes wrapper class; the current screenshot `qa/final-steel-notes.png` visibly shows Steel references and limits. Final main/data/steel.jsx hashes and the unchanged stylesheet hashes are recorded in `qa-addendum.json` and supersede those entries in the earlier full audit. No new browser errors were observed. The original37-route audit remains applicable to unchanged Steel page/section behavior.
