# Product design constraints

Reviewer: `/root/product_design`. Mode: original library UI refinement. Inspected the user's screenshot ending `3.16.07 AM.png` with `view_image` and the current runtime `library-tokens.css`.

The screenshot shows the page title competing with the logo. Current tokens confirm a 28px catalog title and 18px card title. The parent reports logo sizes of 28px desktop, 24px mobile, and 21.5px narrow mobile; retain those brand sizes.

## Recommendation

Use a 22px page title and 16px item title on desktop; 20px page title and 16px item title on mobile. The resulting three-level hierarchy is logo, page, then item. A 20px mobile page title with an 18px item title leaves only a two-pixel distinction and risks repeating the initial hierarchy complaint. Sixteen-pixel item titles remain appropriate readable identifiers above the existing 11–12px metadata.

Suggested line heights are 28px desktop page, 26px mobile page, and 22px item. Preserve existing font families and regular heading weight.

Limit implementation to neutral library catalog-title/card-title tokens and their existing breakpoint overrides. Preserve the compact caption spacing already delivered, the removed system-card footer, preview document typography, grid geometry, logo geometry, navigation and filters. This is a deliberate refinement, not an external reference reconstruction.

## Acceptance

- Inspect Design Systems, Sections and Pages at desktop and mobile widths: the brand visibly outranks the page title, which visibly outranks item titles.
- Confirm natural wrapping for the longest title and no clipping or horizontal overflow.
- Keep title links and heading semantics intact, and confirm the system-card count/divider/Explore footer has not returned.
- Final visual/interaction review must inspect the delivered revision; this report is a product recommendation, not a QA pass.
