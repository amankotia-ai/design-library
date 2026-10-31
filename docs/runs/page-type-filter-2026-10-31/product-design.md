# Product constraints — Page type filter

Reviewer: `/root/product_design`. Inspected `pilot/src/catalog.jsx` and `page-shells.js`. No application edits.

The user's request changes the Pages dropdown to page type. The page registry already supplies `type`: Portfolio and Landing page.

- Pages shows one native select with the accessible label and default option **Page type**. Derive distinct options from `pageShells.map(page => page.type)`; do not hard-code system names or reuse the section taxonomy.
- Selecting Portfolio shows Portfolio homepage. Selecting Landing page shows Creative tool landing page. The all/default selection shows both existing page cards.
- Initialize Pages type from valid registry types in the `type` query parameter. Invalid values, including legacy section types, fall back to all.
- On Pages, ignore stale `system` query parameters. A hidden system constraint must not suppress a page after its type is selected. Pages updates write `panel=pages` and the selected `type` only.
- Show Clear filters when a page type is active. Clearing restores both cards and removes type and stale system constraints from the resulting URL.
- Keep Sections behavior unchanged: its Section type and Design system controls still filter their respective dimensions.
- Preserve native keyboard behavior, existing dropdown appearance, mobile full-width layout, page-driven card content, and compact cropped previews.

Review criteria: one Page type select on Pages; both type options return the correct card; selected state survives URL reload; stale system and invalid type do not hide all pages; Clear filters restores both; Sections still exposes and combines its two filters.

Status: constraints delivered. Implementation and independent rendered QA remain separate.
