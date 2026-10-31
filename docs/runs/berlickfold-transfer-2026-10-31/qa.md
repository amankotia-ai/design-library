# Independent QA — Berlickfold learning transfer

Reviewer: `/root/independent_qa`, independent of this task's implementation and design specialists.
Status: **passed within the scope below**, 2026-10-31 IST (2026-10-30 UTC). Final affected source/runtime hashes and delivered capture hashes are recorded in `qa.json`.

## Evidence inspected

I inspected the actual source reference `pilot/public/references/hero-source.png`, the delivered desktop, mobile, tablet, medium-width and faithful-source hero captures, the grid overlay, desktop/mobile Study captures, assembled mobile page, and the refreshed Quiet Serif tile preview. I inspected the corrected adaptation caption at native readable size in `qa-adaptation-caption.png`. The relevant source includes the pure layout engine, adaptation component/styles, preserved source branch, Study controls/captions, and system guidance.

## Results

The independent script completed **608 assertions with zero failures and zero browser errors**: 532 parameterized mathematical assertions across 266 widths, plus 76 targeted geometry, browser, pixel, control, labeling, and revision assertions. `qa-check.mjs` and `qa.json` preserve the checks and actual measurements.

- The pure engine was swept from 280 through 2400px in 8px steps. Every sweep checked spatial bounds, the declared 4px unit / 16px pitch / 16px gutter, column sizing and shared portrait/copy track positions.
- Live 390, 768, 900, 1100, 1440 and 2030px views have no horizontal overflow, clipped heading box, out-of-bounds block, pairwise block overlap, or paragraph/footer collision. Both photographs use `object-fit: cover`. Grid SVG column positions and widths match the engine at every live width.
- At 1440px the adaptation is 1440×800; copy is at x256/y512 with width216. Computed copy typography is General Sans, weight300, 13px/20px and exactly four line boxes. The desktop has six left tracks: two for the portrait, two for copy, two reserved. Mobile uses four columns and actual 16px/22px copy; the inspected mobile capture is an authored composition with the smaller portrait beside the dominant image and paragraph below.
- The faithful live source branch remains 2030×1128. A fresh source screenshot has **zero changed RGBA channels** against the retained `public/evidence/hero-faithful.png`. This establishes preservation of the previous reconstruction, not exact recovery of the original reference's unidentified or unlicensed fonts.
- The refreshed homepage preview matches a fresh 1440×930 adaptation screenshot pixel for pixel and loads through the expected tile image path.
- `/?section=hero` starts in the live original adaptation. Keyboard Enter toggles the native Grid button and reveals the coordinate-derived SVG. Source mode opens the faithful branch and disables Grid. Mobile forces adaptation and disables the Source option. Compare shows two static images with saved-capture disclosure; its Open section link goes to faithful reconstruction. Corrected adaptation/source prefixes match their selected modes.
- Eleven affected source/CSS files match their retained runtime counterparts byte for byte. Final project source, preview image, retained faithful baseline, and delivered evidence image SHA-256 values are in `qa.json`.

## Finding and correction

The initial Study caption prefixed the original adaptation with `Faithful reproduction study`, inherited from section metadata. I reported the contradiction. The implementation owner changed the visible prefix to follow the active mode and updated assembled-page wording to say authored grid informed by the source. I verified the corrected text in the live DOM and actual caption image. The owner also aligned Compare's Open section link with its faithful saved-capture context; the final browser check passes. No blocking finding remains in this scope.

## Limits

This is a Chromium review of the requested transfer, source preservation, grid engine, previews and controls. The numeric sweep proves declared spatial invariants, not visual quality at every swept width; actual rendered inspection and DOM checks cover the six stated live widths. It is not cross-browser or screen-reader certification. The existing route dispatcher is retained, but unrelated Blueprint/Signal demos and all unchanged lower-page interactions were not revalidated. Source serif identity remains inferred, the free serif is an alternative, and photography remains raster crops. Changed affected source or captures invalidate their corresponding review scope.
