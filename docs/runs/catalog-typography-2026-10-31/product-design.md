# Product design constraints

Reviewer: `/root/product_design`. Mode: original library UI refinement. Status: recommendations delivered; final output review remains independent QA's responsibility.

Inspected the user's screenshot with `view_image`, plus `pilot/src/catalog.css`, `pilot/src/library-tokens.css`, and `docs/team-workflow.md`. `catalog.jsx` was requested but its filesystem read did not return during this pass; structural claims below are limited to the screenshot and CSS.

## Finding

The catalog's section title and item titles share a serif face with nearly equal visual size. The CSS sets the section title to 24px and asset card titles to 21px. This three-pixel distinction is too subtle for their different roles. The item's system label, title, layout description and footer are spread across a tall caption block, which weakens the connection between the information and its preview.

## Recommended contract

- Keep the section title at 24px, with its existing heading semantics and location.
- Use 18px / 1.3 for item titles. Preserve the existing serif family and regular weight.
- Compact the caption rhythm: 12px from preview to system label; 6px from label to title; 6px from title to description; 12px from description to divider; 8px from divider to footer.
- Keep descriptions readable at the existing 12px and 1.6 line height. Do not truncate realistic layout descriptions.
- Use shared neutral library tokens for typography and caption rhythm. Do not change the typography inside design-system previews.
- Preserve the existing grid, preview aspect ratios, image crops, filters and navigation.

These values are proposed product/design choices, not recovered measurements from an external reference.

## Acceptance criteria

At desktop width, the section title clearly outranks card titles while each item title remains the main identifier within its own card. System label, title and description read as one group. The footer stays visually secondary and easy to locate.

At the existing mobile breakpoint, preserve the same hierarchy and caption rhythm. Long titles and descriptions may wrap naturally; there must be no clipping or horizontal overflow. Do not reduce interactive target sizes when reducing visual spacing. Confirm that card links, filter controls and keyboard focus remain usable.

The parent should hand independent QA the final CSS revision plus desktop and mobile captures. This report does not claim that the delivered revision has passed visual or interaction QA.
