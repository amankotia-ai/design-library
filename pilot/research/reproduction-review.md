# Representative hero reproduction review

Reviewer: actual visual analyst `/root/visual_analysis`. This is a specialist comparison, not independent QA. Inspected actual source crop `public/references/hero-source.png` and actual rendered `evidence/hero-faithful.png` at2030×1128 with `view_image`. Also read current `src/sections.css`, `src/tokens.css`, `src/sections.jsx`, and `src/data.js`.

Reviewed render SHA256: `5999b91c3eb0275d8131119b1890be23853da035158a5cf1a6cb1f5657020daf`.
Source crop SHA256: `e1bd44f0f35246390c80d5756fb0e493bcc8c3453f0da63e98e798a6d6ed92e8`.

Status: **changes requested**, limited to body-copy rhythm before proceeding with representative acceptance.

## Required correction

F1 — `src/sections.css`, `.faithful .hero-copy`. Current General Sans20px wraps into five lines, ending “presence.” alone. Source has four lines, ending at≈y826 with the final line “and natural presence.” Current copy extends to≈y857. Keep measured origin x362/y718 and30px line-height. Reduce faithful body type to approximately18px (`.887cqw` at2030px) as a font-substitution compensation, preserving current≈306px text width; then capture and visually confirm four lines. If that setting does not reproduce the four-line rhythm, prefer a small measured adjustment to the text width rather than altering the copy. Owner: implementation parent. Success condition: four lines and final ink baseline≈823–826; no isolated fifth line.

## Accepted with explicit limits

- Split and photo: major photo composition agrees with source; current seam is approximately1px left of measured source x1029, insignificant for this pilot. The photography is correctly preserved as a screenshot derivative, not regenerated.
- Portrait: correct source crop, size, origin, and bottom alignment visually agree. Sharp rectangular geometry retained.
- Headline: position, overall hierarchy, line break, and fine condensed character agree sufficiently for a declared font substitution. Current width is slightly narrower than source, and glyph details (particularly Q tail) differ. This is Noto Serif Display, not recovered PP Editorial New. No pixel-identity claim.
- Header and bottom metadata: placement and content agree; General Sans wordmark and utility links have wider metrics and subtly different glyph shapes than the source. Font substitution is documented.
- Background and guides: near-white surface agrees. Current single-line repeated guide treatment simplifies the source's paired column edges/gutters. Treat as an approximated visible grid, not recovered authored CSS.

Mobile and original feature/footer were not reviewed in this comparison. No final independent-QA status is established here. A revised hero capture invalidates the render-specific status above until rechecked.
