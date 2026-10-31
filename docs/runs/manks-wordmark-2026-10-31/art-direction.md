# Personal wordmark: art direction

Reviewer: `/root/typography_art`. Inspected the actual supplied Belmonte Ballpoint screenshot, generated `pilot/public/assets/of-manks-signature.png`, final brand crops at 1440/390/320px, `home-390.png`, and the relevant markup/CSS.

## Findings

- The generated “of Manks” keeps the reference's saturated red, joined casual handwriting, rounded stroke ends, uneven character rhythm, and tall ascenders. It is an original lettering interpretation; no exact Belmonte font recovery or identical glyph construction is implied.
- The lettering reads as “of Manks” in all three crops. The small “of” is distinct from the capital M. The k ascender and final s remain legible at the narrowest size.
- The signature's scale is subordinate to the Geist Serif name but large enough to read. Its loose red strokes provide the intended handwritten addition without overtaking the black name or striped mark.
- Desktop spacing separates the name and signature clearly. At 390px the entire logo remains on one row, with navigation on the established second row. The 320px optical reduction preserves the lockup and avoids visible clipping or collisions in the inspected crop.
- The .22px optical stroke makes the Serif wordmark slightly firmer while retaining its hairline contrast and open counters. This is a documented visual adjustment to Regular, not a genuine Medium font weight.
- In the complete 390px home render, the red signature remains contained in the header and does not compete with the collection previews or move the content hierarchy.

## Status

No blocking art-direction issue found in the inspected revision. Preserve the current proportions and spacing. No optional polish requested. Independent QA must separately verify actual font rendering, overflow, and unchanged study typography.

Reviewed source SHA-256: `library-tokens.css` = `9e801699c0d89ebb9948833740fa08fe9204d161f074c4a92856dcf51c9f7407`; `main.jsx` = `a5e245509986ba00ff75d415988ee4507848754bf646970eaa10f93660b876b3`; signature asset = `0493cd53b2a3ad58c56c020d5b4e2ce7c7d1c9075faa4c82b22fc426508f7066`.
