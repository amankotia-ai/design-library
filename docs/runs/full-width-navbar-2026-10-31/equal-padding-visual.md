# Equal navbar padding: visual addendum

Actual visual analyst: `/root/visual_analysis`. Inspected current `pilot/src/style.css`, `system-browser.css`, and shared library tokens after the user's followup, “equal top and side padding.”

The full-width header already has 32px inline gutters on desktop and 24px on mobile. Catalog routes override its top padding to the same respective values, but detail routes retain base 63px desktop / 44px mobile top padding. The base 103px minimum height can add internal space even after top padding is reduced.

Recommend one shared header inset: 32px desktop, 24px at the existing 700px breakpoint, applied to both `padding-top` and `padding-inline` on `.article-header`. Put the shared value in `library-tokens.css` alongside library spacing inputs, consume it in `style.css`, remove the redundant route-specific top-padding declarations in `system-browser.css`, and set the base header minimum height to 0 so the brand begins at the requested inset. Leave bottom spacing, content container widths, brand, active underline, wrapping, and links unchanged.

Success criterion: computed top, left, and right padding are equal for Pages, Sections, Design Systems, and a detail route; screenshot comparison shows content remains centered. On a detail route, measure the inset from the navbar box below the existing notice, not from the viewport top across the notice.

This is an original spacing correction. No new screenshot target or mobile behavior was supplied.
