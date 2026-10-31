# Conversion homepage study — 31 October 2026

## Brief and scope

Run window: 03:51–04:11 Asia/Kolkata. Reconstruct the supplied public homepage as a shared design system, individually browsable sections and an assembled landing page. Reference-sized reproduction is the first target; the 390px layout is evaluated separately. This is a reference study, not an assertion of pixel identity or recovery of the service.

## Evidence and roles

- Source: https://conversion.ai/; desktop first fold 1280 × 720 and mobile first fold 390 × 844 under `public/references/conversion/`. The full desktop capture is 1280 × 9712; dynamic media frames may differ between captures.
- Visual analyst `/root/visual_analysis`: inspected live desktop/mobile, saved screenshots and collected source media. Desktop measurements: 38px announcement, 62px navigation, 48px gutters, 64px / 67px hero and 40px / 44px section headings. Mobile observed at 390px with 24px gutters and stacked content.
- Product designer `/root/product_design`: mapped the homepage to the registry, page shell and eleven sections, and separated service behavior from the study.
- Art director `/root/art_direction`: documented warm paper, restrained blue actions, serif/sans pairing, pastel product panels, and dark security section; verified public font and asset URLs.
- Implementation `/root`: isolated tokens, composable section markup, page routing, library metadata, screenshots, and responsive rules.
- Independent QA `/root/qa`: inspected the source and the rendered study; reviewed the final interaction revision and the subsequent comparison integration. Functional checks passed for system/page/section routes, mobile menu, agent example selection, checked links, desktop comparison and mobile comparison disabling. At 390px the inspected page had no horizontal overflow. QA did not certify complete source fidelity.

## Recovery and limits

Family and TWK Lausanne fonts, six customer SVG marks, three textures, and hero/testimonial posters are source assets. The wordmark symbol and remaining customer marks are approximations. The hero uses a static poster; product demos, context diagram, platform tiles, security graphics, resource layout, mobile navigation, and footer are simplified authoring. Agent buttons switch illustrative static states; no live application or backend is recovered. Links use source destinations where checked. Mobile is a responsive reconstruction informed by the observed source, with remaining hero spacing differences.

REA's earlier `rea-cdp-browser` provider was not available in this session; the reference was inspected with the available browser. Freebyrd index, thread, and references returned no matching folder-specific context. Source identity, copy, claims and media remain attributable to Conversion, and publication rights have not been established.

## Review and validation

The first desktop fold has an aligned reference/implementation comparison in the page detail. The comparison covers only 1280 × 720; it does not certify lower-page fidelity. Section thumbnails are rendered captures, and the mobile capture is separate evidence.

Independent QA found inconsistent agent example metadata, incorrect context CTA, nonworking feature and article links, and malformed Solutions links. These were corrected and rechecked. QA also found a three-line mobile source headline versus two lines in the first implementation; the wrap was corrected, though mobile spacing remains approximate. Lower sections are materially shorter and less detailed than the source; security illustrations, a resource image, some footer links and exact logo artwork remain unfinished for a more faithful reconstruction.

Reviewed SHA-256: `study.js` 3bbf01687e5e0aafaef06fe5a68c7dc45f17cfe713cf285d1f8bdf3307589fca; `style.css` 2feb32c95f4cea979277c1d8f243359361fb8527c650a00243f82e5cb60c4d40; `data.js` af1af5df714c33a6c649f7743e90062f55742db4cdf28cbe2c21c33db0c0b801; `main.jsx` 1a67ab1ed1a7eee048b21a691e9297eb961050c9e8e39d8482609fc676eed443; `conversion.jsx` bc91f924570719a68736a5213f5bce16e7d2b8e219890778ebef5f579cc9b40e.

A Vite production build passed in an isolated local runtime with copied source and dependencies because iCloud-dataless files stalled the workspace runtime. The repository-wide check passed early registry and Blueprint checks but stopped on the separately developed Plasticity system's missing `mode` metadata in that runtime; this run does not claim a full repository check pass. The original workspace build also stalled on iCloud placeholders. No deployment was requested.
