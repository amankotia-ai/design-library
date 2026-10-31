# Independent QA — Blueprint / Signal Workshop

Reviewer: `/root/blueprint_qa`. Status: **passed within the scope below**. The reviewer did not create or edit implementation files.

Reviewed the current source and running preview, the original REA1440×857 reference, corrected1440×594 source crop, source-sized implementation hero, and final desktop/mobile captures. `qa.json` records exact hashes of11 implementation/index files and6 evidence files. Runtime and project copies match byte for byte.

## Delivered visual revision

- `evidence/blueprint/final-page-desktop.jpg`: CUA full-page capture from1440×900 viewport, actual image1440×2940.
- `evidence/blueprint/final-page-mobile.jpg`: CUA full-page capture from390×844 viewport, actual image390×3759.
- `evidence/blueprint/hero.png`: final REA source-sized implementation1440×594, compared visually with `public/references/blueprint/hero.png`.

Actual final images were inspected. The blue opening, white editor shell, contained artboard, control hierarchy, feature rhythm, FAQ, and footer form a coherent family. Mobile stacks the canvas and controls without horizontal overflow. Page scrollWidth equals viewport at1440,768,and390px. The hero study preserves its wording and overall geometry, but Inter metrics, approximate wordmark, and stronger/unfaded grid prevent a pixel-identity claim.

## Behavioral evidence

29 scoped checks passed, individually recorded in `qa.json`. Shape, both slider keys, variation, native color commits, reset, actual SVG download, and keyboard FAQ expansion were exercised. The SVG download is retained as `research/blueprint/qa-export.svg` (480×600,961 rectangles). Both collection selectors, dynamic System tokens, source provenance, Signal comparison/overlay, mobile open links, and standalone hero/footer navigation were exercised. Old hero and quote source comparisons still load at their recorded dimensions.

Expanding the first FAQ within the assembled iframe grows its outer height2929→3018px; the underlying body grows2928.48→3017.57px. This confirms the new observer handles disclosure expansion rather than clipping it. Final inspected browser error logs were empty.

## Limits

No blocking finding remains in this bounded review. This is not a cross-browser or screen-reader audit. It does not validate unseen Blueprint software, source mobile behavior, accounts, AI generation, or animation. The source-font, wordmark, and grid differences remain explicit.

CUA's direct `fill()` on native color inputs updated input values without committing React state. The reviewer therefore used actual native-picker keyboard interaction/commit and confirmed matching SVG fill values for both Paper and Ink; this adapter behavior is not reported as an application defect. Early parallel REA capture errors are historical evidence, not a successful run; final QA uses the clean hero result and independently captured final full-page images.
