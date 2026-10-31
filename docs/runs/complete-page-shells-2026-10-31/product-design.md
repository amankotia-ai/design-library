# Product constraints — complete page shells

Reviewer: `/root/product_design`. Inspected the supplied 3024 × 1964 screenshot using the image viewer and current `catalog.jsx`, `system-browser.jsx`, `data.js`, and `sections.jsx`. No application edits made.

## Observations

The screenshot's Pages cards are visually identical to Design Systems cards: their titles are Quiet Serif and Blueprint; metadata emphasizes family, palette, and font pair. Their previews crop the opening and first following sections. The source already has complete assembled pages: EditorialPage contains Hero, PhotoIndex, ProjectPair, Feature, SplitMaterial, statement Quote, ImageRail, Footer, and study disclosure; Blueprint has its full ten-section source sequence. The problem is the catalog's representation rather than a missing assembly.

`Catalog` obtains page-like records from `sections`, then discards the matching record by passing only its system to `SystemCard`. `pageFor(system)` finds the first page within that system. This cannot faithfully represent two distinct shells in one system.

## Required behavior

- Represent each available complete shell as a page entry with its own identity, title, type, description, system ID, and ordered section IDs. Preserve the existing `page` and `blueprint-page` route IDs; no invented extra inventory is needed.
- Use a page-specific card that receives the actual page entry. Suggested visible titles are **Portfolio homepage** and **Creative tool landing page**, with **Quiet Serif** and **Blueprint** secondary metadata. The card should communicate the finished page's purpose and assembly rather than repeat palette and type-system details.
- Show the shell through its footer in the catalog preview. Fit the complete rendered page in a bounded tall frame with its proportions intact; center it rather than stretch it to fill. A whole-page thumbnail is for structure and sequence; a full-size live preview supplies reading and interaction.
- Preserve working page-detail URLs, desktop/mobile controls, and full-size Open page links. Catalog preview, title, and primary action should all target the same actual page record. The action can remain Preview page.
- Keep explicit source-study disclosure for Blueprint and original-expansion provenance for the editorial shell. Neither page is a verified service backend or universally deployable content kit.
- Filter Pages by the page entry's `systemId`, keep URL/reload/Clear filters behavior, and use a page-specific empty state. Sections and Design Systems remain their separate inventories.
- Keep existing native controls and keyboard focus conventions. If the thumbnail is a link, avoid an interactive embedded page underneath it stealing keyboard focus; use a static captured image or inert iframe preview.

## Review criteria

Both available cards have page-specific names and complete previews including footer. Both open their corresponding full assembled shell. System filtering returns the appropriate shell, and returning to all systems restores both. Narrow screens have no overflow. Existing Section and Design System destinations continue to work. One system can own multiple page entries without the cards all resolving to its first page.

Status: constraints delivered. Delivered-revision QA is separate and pending.
