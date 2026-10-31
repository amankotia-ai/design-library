# Product review — page-driven cards

Reviewer: `/root/product_design`. Source inspected: `pilot/src/page-shells.js`, `page-browser.jsx`, `catalog.jsx`, `main.jsx`, and `catalog.css`. No application edits.

The user's correction is authoritative: **“the preview shoulnt be complete pages, the content has to be driven by pages.”** This supersedes my earlier recommendation that the catalog image show the complete page through its footer.

## Content contract

- `Catalog` uses `pageShells` as the Pages inventory, filters by each page's `systemId`, and passes the actual `page` to `PageCard`. This is correct.
- The page owns its stable ID, display name, type, description, ordered section IDs, and preview. Cards use those fields directly. Its design system supplies only associated system name, provenance, and system destination.
- Existing records are Portfolio homepage and Creative tool landing page. Their identities describe complete page compositions. Title and action destinations use the actual page ID. The source already does this correctly.
- Page-detail headings and descriptions use the same registry, so the card and destination agree.
- Keep the prior compact visual preview: tall 9:10 crop of the page's opening, three columns on desktop, one on narrow screens. This is a visual preview of a complete shell; it does not need to expose all content in its thumbnail.
- A static full-page capture may remain the asset if it is cropped into the bounded preview. Preview alt text should describe the visible opening instead of claiming the footer is visible.
- Preserve page-specific section counts (8 / 10) and Blueprint's source-study disclosure. Preserve native filtering and full-page Open page destinations.

Status: source content contract confirmed. Compact visual restoration is implementation work; rendered verification and independent QA are separate.
