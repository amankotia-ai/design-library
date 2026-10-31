# Product design constraints

Reviewer: /root/product_design. Inspected current `pilot/src/catalog.jsx` and `pilot/src/system-browser.jsx`. Scope is the requested dropdown treatment and restoration of earlier tall Pages cards. No UI source changes made by this reviewer.

- Reuse the existing `system-switch` native-select appearance through a shared styling class. Retain explicit label text, native keyboard behavior, focus treatment, current value, and filtering handlers. This is a style change; `systemId`, `type`, query-parameter synchronization, and Clear filters behavior remain intact.
- Pages should render one existing tall card per matching assembled page, using `CollectionPagePreview`: the live full-page preview, family, system name, palette, typography, and section count. Reuse that card markup through one shared `SystemCard` component so Pages and Design Systems have the same card construction.
- Context controls destination and action text: Pages cards open `?panel=pages&section=<page id>` and say “Preview page”; Design Systems cards retain their current system-detail destination and “Explore system” action. A Pages action must not unexpectedly open the system explanation.
- Keep the two cards named Quiet Serif and Blueprint, rather than adding “page” to their display titles. Keep Blueprint’s source-study disclosure where already present. The card count remains a section count (8 and 10), while the catalog heading counts matching pages.
- Do not render the old static `.asset-preview`, layout description, or section-type footer alongside the restored tall Pages card. Sections cards remain unchanged.
- System filtering should show two Pages cards for All design systems and one for either named system. Changing Pages filters must not add a section-type parameter. The all-systems default and existing clear action remain available.
- Verify both Pages cards open the correct page detail, then verify the Design Systems cards still open system detail. Check mobile wrapping and that the shared select appearance does not force the existing 220px desktop width into narrow filter rows.

Status: constraints delivered; delivered-revision QA pending.
