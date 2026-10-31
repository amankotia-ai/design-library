# Product constraints

Reviewer: `/root/product_design`. Inspected the user's screenshot ending `3.14.16 AM.png` with `view_image` and `/private/tmp/design-library-pilot-runtime/src/system-browser.jsx`, lines 31–36.

The screenshot identifies the entire system-card footer: divider, section count and “Explore system” link. Remove `.card-bottom` from `SystemCard` only. This matches the requested visible removal while avoiding changes to section/page card footers that share the class.

Keep the system name's existing linked `h2`; it remains the clear navigation route to the system. Preserve preview, metadata and palette/type information. Do not leave a replacement count, divider or empty footer container.

Acceptance: both design-system cards lose this footer at desktop and mobile widths; both system-title links still navigate correctly. Confirm that the removed markup does not leave a residual footer-sized gap. Final visual/interaction QA belongs to the independent reviewer.
