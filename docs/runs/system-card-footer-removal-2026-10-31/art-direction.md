# Art direction: system-card footer removal

Actual art director: `/root/art_direction`. Inspected the supplied 3.14.16 AM screenshot with `view_image` and this run’s visual-analysis and product-design reports.

Confirmed scope: remove the entire SystemCard footer, including its divider, section count, and “Explore system ↗” action. Delete that row’s markup rather than globally hiding `.card-bottom`, which is also used by other card types. Do not leave an empty footer container or footer-sized residual gap.

Retain the palette swatches and typography label visible above the divider. Preserve the system title link as the navigation affordance, together with preview and metadata. The final card should end naturally with its palette/type information; no replacement separator, count, or action is needed.

This direction is limited to system cards and is not delivered-output QA. Independent QA should confirm the final desktop/mobile cards and title-link navigation at the implementation revision.
