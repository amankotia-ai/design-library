# Art direction — Render Assets import

Reviewer: `/root/render_art_direction`. Scope: archival presentation rules, not new render production.

## Evidence inspected

Actual images viewed with `view_image`:

- `../Render Assets/output/arco-tech-brand/final-preview.jpg`: four finished ARCO scenes: timber-desk phone, auditorium display, campaign cards, laptop sticker. Warm photographic surfaces, cobalt/lime artwork.
- `../Render Assets/output/aster-and-oak-4k/final-contact-preview.jpg`: five finished coffee/identity shots. Deep green/cream/copper artwork; pouch, card, sachet, identity/profile, and held-profile compositions.
- `../Render Assets/output/showcases/preview.jpg`: fourteen blank mixed presentation templates including device, textile, metal, profile/social, and graphic stages.
- `../Render Assets/output/expanded-showcases/preview.jpg`: thirty more blank templates across packaging, merchandise, stationery, signage and devices.

Read current `pilot/src/catalog.css`, `pilot/src/system-browser.css`, and the import brief. Product handoff supplied by parent: use named families and functional categories; metadata dimensions must describe downloadable originals; fixed-camera 2.5D plates must not be called editable geometry.

## Presentation contract

1. Retain the Design Library shell, typography, neutral background, shared spacing and border tokens. Avoid introducing a competing brand around the archive.
2. Use the canonical final contact sheets as family covers. Preserve every panel with `object-fit: contain`; neutral 16:10 card frames are appropriate. Do not crop a pack to one arbitrary corner or add color overlays.
3. Lead with the recognizable branded examples ARCO, ASTER & OAK, and Sidequest when available, then show blank template packs and screen compositions. Categories carry function; titles carry the work's name.
4. Show individual finished scenes at useful width on each detail page. A dense contact sheet is adequate as a collection cover but cannot be the only detailed view.
5. Keep the asset's original color, contrast, and composition. ARCO's blue/lime and ASTER & OAK's green/copper are artwork, not collection accent tokens.
6. Use concise metadata outside images: family category, item count, format, measured dimensions, meaningful download/open links. Do not invent font recovery, editable geometry, 4K photographic detail, or review status.
7. At narrow widths keep one card column, full-width previews, and wrapped metadata/actions. Long family names and source paths must not force horizontal overflow.
8. Native blank plates, branded composites, downloadable editable artwork, and grid exploration tools remain distinct useful content types. Preserve provenance and older revision details internally rather than adding production-mode labels to cards.

## Limits

This pass inspects source artwork and defines presentation constraints. It is not independent QA of the delivered website revision. Parent must provide the implemented gallery/detail output for an independent QA pass.
