# Collection grid product constraints

Reviewer: `/root/product_design`, 31 October 2026. Source inspection completed; this is a design handoff, not final implementation QA.

## Scope and evidence

Inspected the attached 1250 × 814 image with `view_image` and the actual `main.jsx`, `catalog.jsx`, `page-browser.jsx`, `system-browser.jsx`, `style.css`, `system-browser.css`, `catalog.css`, and `library-tokens.css` source files. Consulted the sibling Render Assets grid-study README as prior evidence only.

The attachment shows one square-cornered editorial canvas with a visible red measurement overlay, not a gallery of cards. Therefore gallery behavior and card ratios are an authored adaptation. The user's explicit requirements establish the reliable product contract: all collection galleries use the same grid treatment; preview corners are square; titles and details sit below and outside the preview enclosure. Do not add the reference's red measurement lines to ordinary gallery UI.

## Exact surfaces and ownership

- Sections: `Catalog` renders `system-cards asset-cards`; each `article.system-card.asset-card` has an `a.asset-preview` and a sibling `.system-card-body`.
- Pages: `Catalog` renders `system-cards page-cards`; `PageCard` has a `PagePreview` and a sibling `.system-card-body`.
- Design Systems, including `panel=systems` and `panel=home`: `SystemHome` renders `system-cards`; `SystemCard` has a `PagePreview` and a sibling `.system-card-body`.
- Source attribution is a separate reference list (`source-grid`), not a collection gallery. Detail demonstrations and the system's feature screenshot are also separate surfaces. Do not restyle unrelated source-study content through broad `img` or global radius rules.

The existing DOM already separates preview from text. The problematic boundary is CSS: `.system-card` supplies an enclosing border, rounded corners, background, and overflow clipping, making the caption appear inside a larger box. Prefer removing those decorations from the semantic article while putting the required square frame on `.style-preview` and `.asset-preview`. Keep `.system-card-body` as a sibling, with top spacing and zero side inset so its left edge aligns with the preview edge. A shared collection-card contract is sufficient; avoid unnecessary component rewrites.

## Responsive and content rules

- Share the same three-column desktop, two-column intermediate, and one-column mobile grid across Sections, Pages, and Systems; currently only Sections has the intermediate two-column override.
- Share gallery gap tokens. Use a larger vertical row gap when captions are unboxed to keep successive rows distinct.
- Preserve page preview ratio/crop and section screenshot ratio unless the art direction explicitly requires changing them. Square corners do not imply a square aspect ratio.
- Keep all current metadata, palettes, descriptions, section counts, and actions. Retain wrapping of long labels instead of forcing identical caption height through clipping.
- Keep the article's `min-width:0`, flexible preview contents, and filter wrapping. Verify 390px, an intermediate viewport around 820px, and 1440px without horizontal page overflow.

## Focus and interaction

Retain the existing named links, native selects, accessible iframe titles, lazy loading, page actions, and section filters. Sections' image link is already removed from the tab sequence because the adjacent title/action links repeat its destination. Page/System previews contain live iframes; preserve the `.page-viewport:focus-within` indicator. Removing article overflow clipping should expose rather than cut off focus outlines. Do not wrap cards in links around interactive preview iframes or other nested anchors.

## Acceptance checks for independent QA

Inspect the final desktop and mobile renders of all three catalog routes and both collection types. Confirm zero radius at preview and viewport corners, no surrounding card enclosure behind captions, caption left edges aligned with preview left edges, shared grid breakpoints, preserved content/actions and filters, no clipped long labels or horizontal overflow, and visible keyboard focus. No claim of pixel-faithful reproduction is appropriate for this card-grid adaptation.
