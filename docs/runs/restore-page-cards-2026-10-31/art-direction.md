# Art direction — restore page cards and dropdown

Reviewer: `/root/art_direction`. Inspected prior 1440 × 1000 `before-desktop.png`, the supplied Quiet Serif dropdown image, and this run's visual-analysis.md and product-design.md. Direction only; final rendered QA remains separate.

- Restore Pages with the shared existing SystemCard construction: tall 9:10 live assembled-page preview, 16px preview inset, neutral outer frame, family, system title, palette/type row, section count and trailing action. Preserve Quiet Serif and Blueprint display names and card ordering. This is the requested earlier card, not a new interpretation.
- The Pages context changes the destination and action text only: open its assembled page and label the action Preview page. Design Systems retains Explore system. Keep the underlying page-preview component, its scale and crop behavior identical so both destinations display the same visual card language.
- Do not combine restored Pages cards with the shallow static asset preview, layout-description footer or section-type metadata. Section cards are outside this correction.
- Match the attached dropdown through the existing system-switch native select styling: pale surface, thin neutral outline, modest rounded corners, regular dark text, muted trailing chevron and existing insets. The image is a magnified crop; retain the established 36px app control height rather than copying its enlarged screenshot dimensions.
- Share the select appearance without sharing a fixed desktop width. Filters stack and fill available width on narrow screens. Keep explicit labels, native keyboard behavior, current filtering actions and existing visible focus treatment.

Review success: desktop Pages shows the same tall cards as the earlier catalog; mobile retains their full-width one-column layout; Pages and Design Systems actions lead to their respective destinations; all catalog select borders, radius, surface, padding and chevrons match the existing select.
