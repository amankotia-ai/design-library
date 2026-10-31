# Shared navbar and content width

Product review by `/root/product_design`, 31 October 2026. Source inspection handoff; final rendered QA remains separate.

## Contract

Apply the user's shared-width request to the Design Library shell: Sections, Pages, Design Systems, collection details, source attribution, and system details. The header is already outside `.reading-column` and spans the viewport with 32px desktop and 24px mobile horizontal padding. The content remains limited by the base 644px reading column and catalog-specific 1184px rule.

Use one shared page-gutter token, 32px above the current 700px breakpoint and 24px at or below it. The shell header and `.library .reading-column` must use that token. Remove content max-width, centered margin, and competing horizontal padding. `width:100%;max-width:none;margin:0;padding-inline:var(--library-page-gutter)` is the intended shell contract; ensure it wins against `.library-home .reading-column` and its media rules. The content's usable inner width then equals the header's usable inner width.

The pilot notice is also shell content. Its inner wrapper currently retains a 644px maximum; align its text/dismiss control to the same gutter if the user means all page content, preserving the full-bleed notice background. Include the footer and collection switch in the shared alignment through their existing reading-column parent.

Do not change the source-site documents rendered by `?view=` or their iframe widths; they are independent preview content. Preserve the collection grids' shared columns, square previews, external captions, existing horizontal and vertical gaps, filters, links, and focus behavior. Do not add a new narrow wrapper around each catalog or detail main region, because that would undo the requested alignment.

## Acceptance evidence

- At 1440px: header brand left edge, content heading/preview left edge, and notice text left edge sit at x=32; content's right edge is viewport width minus 32.
- At 390px: corresponding edges sit at x=24 and viewport width minus 24; navigation/filter wrapping remains usable.
- Check Sections, Pages, Systems, one library detail, one system detail, and one sources route. Verify no page-level horizontal overflow and that controls remain visible.
- Longer prose naturally becomes wider under this explicit request. Text-measure refinements are outside this bounded width change unless an actual overflow defect requires correction.
