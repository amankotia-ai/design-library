# Visual analysis

Reviewer: `/root/typography_visual`. Inspected actual `before-desktop.png` (1440 × 1000) and `before-mobile.png` (390px wide), plus `pilot/src/style.css`, `system-browser.css`, and `library-tokens.css`.

## Observed

- Desktop library content starts at x=152; the navbar wordmark is 28px with a 36px square mark and 12px gap. The two collection cards sit in a three-column grid with an unused third column. This geometry is existing behavior, outside the typography change.
- Mobile has 24px outer gutters, a 24px wordmark alongside a 32px mark, and navigation on a second row. Card headings currently use 23px medium sans. Preserve these sizes, gutters, card shapes, imagery, and navigation wrapping unless an actual font-fit defect appears.
- The home heading “Design systems,” collection titles, wordmark, and navigation currently all read as sans. The requested Serif/Sans split therefore belongs to the library chrome, not the miniature site examples.
- Preview content visibly has independent type systems: narrow editorial serif for Quiet Serif and sans for Blueprint. Their font labels describe those systems and should remain unchanged.

## Application rules

- Define separate shared library heading/body font tokens. Load actual official WOFF2 files locally.
- Apply Geist Serif Regular (400) to library h1–h6 and `.library-brand .brand-name`; use Geist Sans for body, navigation, controls, and explicit bold emphasis.
- Override the current per-heading 500 weights within the library scope so regular Serif is not synthetically emboldened. Keep explicit strong/b emphasis at Sans 700.
- Avoid broad global heading rules that reach iframe studies or original-system specimens. Keep `.mini-specimen`, `.type-specimen`, `.source-specimen`, study components, and source assets on their existing fonts.
- Existing wordmark tracking is tuned to the old sans. Use Geist's native spacing as the initial replacement and visually inspect the two-word wordmark at both viewports.
- QA should confirm downloaded fonts actually render, not just computed family names; check the four panels, small-width navbar wrapping, card title fit, and absent horizontal overflow.

## Limits

This is pre-change analysis. No claim is made that the delivered revision has passed QA. Geist Serif is known from the official release to have only Regular weight; later visual inspection must judge its smaller heading sizes.
