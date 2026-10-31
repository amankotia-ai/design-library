# Interfere preview card refresh

The card now shows the retained Inter and Heldane typefaces together, keeps the existing two-line phrase, labels Typography/Palette/Elements consistently with the catalog, and anchors the issue panel within proportional lower padding. All sizing follows the card width; the same composition works at300,360and600px and in the actual catalog. Source page layout and service behavior are unchanged.

Source is split into interfere-preview.jsx (static accessible specimen) and interfere-preview.css (card layout). Font faces and palette tokens live in system-preview-tokens.css. The shared preview router delegates only Interfere to the new component. Concurrent Signal Serif updates were retained.

Actual comparison: before-after.png. Catalog capture: catalog-after.png. Independent review: qa.md and qa-*.png. Exact current project hashes: revision.json. The production build passed. No new dependencies or motion were added.
