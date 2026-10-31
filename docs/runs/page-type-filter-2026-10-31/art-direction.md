# Art direction — page type filter

Reviewer: `/root/art_direction`. Inspected actual supplied Screenshot2026-10-31at2.54.53AM.png and current `pilot/src/catalog.jsx`, `page-shells.js`, and shared filter CSS. No UI edits by reviewer.

The requested change is the Pages filter's content and meaning. Keep one right-aligned existing pill select in the title row. Replace Design system with Page type in its default option and accessible label. Options come from the page registry's distinct `type` values: Portfolio and Landing page. Selected labels should match those page-type values.

Preserve existing220px desktop/full-width mobile sizing, border, pill radius, transparent surface, chevron, focus treatment and control alignment. Keep the current compact preview-first cards, page-driven text and existing navigation untouched. Do not add a second filter or restore system identity as the primary filtering axis.

Review success: default shows both page entries; either page type shows its matching page; Clear filters restores all pages. Selected type persists in the URL/reload. The Pages control retains the screenshot's visual treatment while Sections retains its own existing filters.
