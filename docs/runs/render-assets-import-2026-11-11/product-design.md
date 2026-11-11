# Product design review

Reviewer: `/root/render_product_design`. Review mode: archival integration and responsive collection design. This is a planning review of local project evidence, not an independent acceptance of the delivered UI.

## Evidence inspected

Read the Design Library README, team workflow, import brief, `pilot/src/main.jsx` route/header contract and `pilot/src/film-library.jsx` collection/detail patterns. Read Render Assets `output/showcases/README.md`, `output/expanded-showcases/README.md`, `output/aster-and-oak-4k/README.md` and `output/sidequest-app-mockups/README.md`. Opened the actual `output/showcases/preview.jpg`: the fourteen images span brand title, device, metal badge, apparel, social/profile and graphic card treatments. A directory listing confirms existing downloadable top-level packs.

## Information architecture

Use **Renders & Mockups** as the collection label. Treat these as reusable assets and composition examples, alongside website design systems rather than pretending they are complete website systems. A family-level card prevents dozens of blank plates from overwhelming the existing collection.

Useful categories are **Brand showcases**, **Product screens**, **Mockup templates**, and **Grid & layout**. Derive only categories actually represented by the delivered entries. Use the existing collection heading, search, category select, entry count and card language. Card preview should show the actual work, followed by human-readable name, category and one-sentence purpose.

The detail route needs: title, useful summary, large image with uncropped inspection, a visible list of included files/outputs, usage or constraints, exact original file dimensions where verified, download/open actions, and provenance/source links. Native links and select/search controls are sufficient; no new modal or custom keyboard interaction is necessary. Empty results need a clear filters action. Unknown entries need a return link.

For grid work, open the existing working archive or a retained local copy and link to the current Quiet Serif collection as appropriate. Do not recast that research as a newly completed system. Preserve source attribution and font uncertainty in its evidence.

## Canonical choices and boundaries

- ASTER & OAK final 4K pack is the successor to earlier brand tests. Five lossless 3840 × 2160 PNGs have newly rebuilt text/artwork, but photographic blanks began at 1672 × 941 and were resampled. Describe as 4K exports, with this detail retained in usage/provenance.
- Sidequest app mockups include two final 1449 × 1085 compositions plus editable SVG/1170 × 2532 screen art and packed Blender scenes. This is a fixed-camera photographic composition; people, lighting and device are baked into the source.
- Original showcases contain 14 blank PNG plates and five extra editable 3D approximation stages. Numbered photo scenes are 2.5D templates, not recovered 3D geometry.
- Expanded showcases contain 30 final blank plates, with dimensions varying by source ratio. Full-canvas artwork overlay is not automatically aligned to each package/fabric face.
- Existing packs observed: `showcases-template-pack.zip`, `new-blank-plates.zip`, `mobile-seven-templates.zip`, `vadim-showcase-plates.zip`, `sidequest-app-mockups.zip`, `oak-retail-five-plates.zip`, and versioned product-render skill archives. Verify file sizes before bundling large archives. Retain old packs but prefer final recorded versions in the browser.

## Responsive and acceptance constraints

Cards must stack at mobile widths; uncropped contact sheets can be letterboxed rather than stretched. Use optimized preview images without changing the downloadable original. Dimensions in text refer to originals, not the preview JPEG. Controls need visible labels, at least 44px height and focus states from the existing library. A fifth nav link must wrap or otherwise fit at 390px; do not permit page overflow.

Acceptance: collection reachable through header; deep links work after refresh; search and category combine; clear filters works; preview URLs and download links resolve under `/design-library/`; image aspect ratios stay intact; each detail has a clear return action; originals in Render Assets remain unchanged. QA/experiments/duplicate folders should remain in internal inventory rather than being presented as distinct finished work.

## Open review

Implementation preview was not available during this planning pass. Product behavior, navigation wrapping, browser links and delivered revision remain for the independent QA pass.
