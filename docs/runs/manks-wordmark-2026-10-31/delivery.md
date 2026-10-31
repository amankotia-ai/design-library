# Delivered revision

Library headings and navbar name use official self-hosted Geist Serif Regular. Library body, navigation, controls, and bold emphasis use self-hosted Geist Sans Variable; explicit bold is 700. Shared font tokens remain separate from section layout and content. Faithful studies and type specimens retain their individual system fonts.

The navbar name now has a subtle 0.22px optical stroke for the requested heavier appearance. This is not a real Medium font weight. The appended red “of Manks” is an original generated transparent PNG based on the supplied handwriting reference, rather than an exact font recovery. It is part of the same home link with an accessible text alternative. See asset-provenance.md for the full generation prompt and method.

## Evidence

- Visual analyst: `/root/typography_visual`; actual source screenshot inspected, red measured, character and scale notes in visual-analysis.md.
- Product designer: `/root/typography_product`; single-link semantics, readable alternate text, and narrow viewport criteria in product-review.md.
- Art director: `/root/typography_art`; inspected actual generated asset, three logo crops and mobile page, found no blocking issue. Source hashes in art-direction.md.
- Independent QA: `/root/typography_qa`; passed the delivered source hashes, 16 panel/viewport combinations, actual custom font rendering, exact accessible name, transparency, and preserved study fonts. Actual reference and delivered desktop/tablet/mobile/narrow images inspected. Details in qa.md.
- Parent implementation: `/root`; changed only library typography tokens, navbar markup and local font/signature assets. Other concurrent palette changes were preserved.
- Captures: home and brand crops at 1440, 768, 390, and 320px. Signature source is 2079 × 756 RGBA with preserved transparency.
- Automated browser verification: all four library panels at 1440/768/390/320px; actual CDP-reported custom fonts, Serif weight 400, Sans bold 700, native controls, zero horizontal overflow/page errors, representative study fonts preserved. Full evidence in ../geist-typography-2026-10-31/verification.json.
- Build and existing checks passed in `/tmp/design-library-pilot-runtime`, the established local runtime mirror. `main.jsx`, `library-tokens.css`, and generated asset match the workspace source. Preview: http://127.0.0.1:5175/ . Workspace Vite had filesystem timeouts, so the verified established runtime was used.
- Revision hashes: revision-sha256.txt. No source changes after art review except documentation and refreshed verification captures.

No exact Belmonte recovery or true Medium Geist Serif weight is claimed. No unresolved blocking findings. Completed at 02:23 IST within the new addition's 20-minute budget.
