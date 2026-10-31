# Content alignment correction

Product constraints by `/root/product_design`, 31 October 2026. Inspected current `library-tokens.css`, `catalog.css`, `system-browser.css`, and `style.css`; source handoff only.

The current header uses `--library-header-inset:24px` on desktop and 16px at or below 700px. The content uses a separate `--library-page-gutter:32px` desktop and 24px mobile value. This creates an 8px inset mismatch on each side at both sizes, consistent with the parent's runtime geometry report.

Set `--library-page-gutter:var(--library-header-inset)` and remove the independent mobile page-gutter declaration. Keep the existing header as the authority because the user's correction concerns content alignment with the actual navbar. Current `.library .reading-column` and notice-wrapper declarations already consume the content token, so no per-panel layout changes are needed.

Expected geometry: at 1440px, header and content inner edges x=24 and x=1416; at 390px, x=16 and x=374. All six panel families should agree: Sections, Pages, Systems, library detail, system detail, sources. Check both first and last content edges; text glyph bounds alone are insufficient because letter shapes can have intrinsic side bearings.

Preserve the current navbar appearance, collection-column breakpoints, preview frames/captions, and independent source documents. Verify no horizontal page overflow after widening the content by16px overall. Final runtime and visual inspection should validate the delivered revision, since this report does not claim a rendered pass.
