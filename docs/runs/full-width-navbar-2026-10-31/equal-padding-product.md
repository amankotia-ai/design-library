# Equal navbar padding — product constraints

Reviewer: `/root/product_design`. Read current shared header DOM and `style.css`, `library-tokens.css`, `system-browser.css`, and `catalog.css`.

User followup: equal navbar top and side padding.

Use one shared `--library-header-inset` token at 32px on desktop and 24px through 700px. Both header `padding-top` and `padding-inline` consume that token. Remove route-specific top-padding literals from `.library-home .article-header`; they already happen to match those values but would leave two sources of truth. The base header `min-height:103px` must become zero, because surplus flex cross-axis space can offset the branding below the intended top inset. Preserve existing bottom margins, logo geometry, mobile two-row layout, native links, active state and content widths.

Acceptance: computed top/left/right header padding is equal at 320, 390, 768 and 1440px on catalog and detail routes. Brand sits at the intended top content inset without extra free flex height; links remain aligned with branding on desktop and occupy the existing second row on mobile. No horizontal overflow or focus clipping. On a detail route, the optional pilot notice precedes the header: the intended top inset is measured from the header box, not the document origin. Its presence should not require another layout change.

This is a minimal responsive layout adjustment; no new behavior or animation is needed. Final rendered validation belongs to independent QA.
