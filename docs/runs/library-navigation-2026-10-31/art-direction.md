# Art direction contract

Reviewer: `/root/art_direction`. Inspected actual `before-desktop.png` (1440 × 1000), visual-analysis.md, product-design.md, and running source system-browser.jsx/css and library-tokens.css. Mode: original library-browser expansion. This is a pre-implementation direction pass, not final visual QA.

- Preserve the existing 36px mark, Design Library serif wordmark and red `of Manks` signature. Keep Geist Sans controls, Geist Serif headings, neutral library surfaces, rules, 12px corners and 24px desktop catalog gaps. Do not recolor the shell to match Blueprint.
- The header's only primary links are Sections, Pages, Design Systems, in that order. Preserve the observed dark-active/muted-inactive text treatment. Detail views keep their parent destination active. At narrow widths, place the full nav on a separate row; do not shrink labels or force the brand/signature into the same line as nav.
- Catalog hierarchy: destination heading, adjacent/next-row native labeled filters, actual preview, item name, system/type metadata, plain preview/open link. Match sibling SystemHome type and border treatments. Do not add decorative icon rows, hover lifts, gradients, new accent colors or pill badges.
- Section cards show the selected section's rendering. Page cards show the assembled page. The existing page-preview frame is suitable for Pages/Systems; section frames may be shorter so a hero, pricing or footer is recognizable without pretending to display the full page.
- Keep two systems' imagery and typography inside the preview document; browser typography and neutral tokens remain outside it. Do not stretch raster preview images. Content should stay top-aligned, with deliberate crops that preserve the identifying section composition.
- Detail pages lead with the chosen item's name, system, and working preview. Desktop/Mobile and Compare controls remain beside the preview. Research prose follows the working preview or sits in a labeled disclosure. Source-study attribution and reconstruction limits remain reachable and truthful.
- Mobile catalog uses one column, the existing 24px side padding and no horizontal overflow. Filters may wrap or stack with persistent labels. Card names may wrap; system/type metadata must not crowd the action.

Completion evidence for independent QA: desktop and mobile captures of Sections/Pages/Systems, details with correct active parent, filter states and empty result, plus unchanged standalone preview URLs. No new media or font assets are required; this change establishes no new source-fidelity claims.
