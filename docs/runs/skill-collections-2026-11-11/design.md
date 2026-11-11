# Skill collection design

Reviewed by `/root/render_product_design` on 11 November 2026. The revised brief and existing gallery files identify the pictured Relay studies. I opened the imported illustrated-landscape and viewport-geometry previews and the original Composition Atlas preview.

## Navigation and assignment

Use **Skills** as a library index with peer destinations. Preserve **Film & Motion** in the main navigation and link its existing collection from Skills. Within Skills, each destination has a direct URL and uses the main header with Skills active. Use the existing editorial heading, card, metadata and back-link patterns. List each destination once. Keep old `panel=render&entry=…` links working, with the entry returning to its new parent collection. Route the old `panel=renders` destination to Skills.

| Destination | Contents and cover direction |
| --- | --- |
| Product Renders | ARCO, ASTER & OAK, Sidequest, Field & Daybreak, Grove tote. Lead with physical surfaces or finished brand artwork. Sidequest uses fixed photographic phone placement, with a fitted screenshot as replaceable artwork. |
| Product Screen Compositions | Relay & Morrow, Relay / Five compositions, Relay / Forest & coast, Relay / Illustrated landscapes, Relay / Wide view & detail. Use the painted Relay landscape with the full white account panel as the collection cover. The viewport study can keep its geometry map and include the finished wide and detail exports in its entry. |
| Mockup Templates | Presentation templates and the five pending packs. A blank scene with a clearly visible artwork surface communicates what the pack supplies. |
| Ruled | Open the buildless grid study, preview an actual configured layout, and make the original study files downloadable. Existing Quiet Serif material is related reading. |
| Composition Atlas | Open the atlas, preview its twelve layout maps and supply the associated schematics. The atlas describes geometry and placeholders. |
| Film & Motion | Existing collection at its current destination. |

Each index card needs a name, short description and a preview of actual work. Each detail needs an understandable output count, descriptive preview captions, format and file size for downloads, and provenance in the existing notes area. Use original file dimensions only where verified. A peer collection with a few families can use a simple gallery, since its top-level collection already performs the main categorization.

## Source locations and visual constraints

- `/Users/abhishekmankotia/.codex/skills/product-renders/SKILL.md` and `references/blender-usage.md` distinguish replaceable artwork, photo plates and editable 3D stages. `/Users/abhishekmankotia/.codex/skills/product-screen-compositions/SKILL.md`, `references/viewport-and-shot.md` and `assets/shot-profiles.json` describe real viewport capture and placement.
- `Render Assets/grid-study/dist/` is the buildless Ruled study. Its README describes six recipes, modular row and column calculations, before/after evidence, and HTML export. Preserve the original interaction and attribution in the served copy. The current page intentionally keeps reference records in evidence dialogs.
- `Render Assets/output/art-direction-calibration/template-atlas.html` and `template-atlas.png` are the original atlas and its 3840 × 2160 overview. The twelve labels cover large app, tinted perimeter, paired feature panels, illustrated feature, cropped grain-flow window, two macro orientations, content-height section, inset, focal card, art tiles and brand/product board. The original four-column overview has dense labels. At narrow widths provide readable text in the surrounding library, with an uncropped overview and a separate full-size link. Associated files live under `schematics/`, including a later portrait correction.
- I inspected `pilot/public/render-assets/relay-illustrated/cover.jpg` (1200 × 675). Its illustrated hills, flowers and full dashboard panel show two independent layers, making the intended capture treatment legible. `relay-viewport/cover.jpg` (1200 × 675) has geometry diagrams for 82%, 92% and 112% UI widths. Those are shot presets in the source diagram. Keep their explanatory labels with the preview. The original example distinguishes the planned full-app capture from the two shipped corrections.

## Acceptance targets

- At desktop and 390px mobile, Skills leads to each peer collection. Skills and Film & Motion remain distinct, and the primary header can wrap without page overflow. New collections and old item links work on refresh and with browser Back.
- Relay entries are present in Product Screen Compositions, with matching detail breadcrumbs. Product Renders and Mockup Templates retain their own assets and downloads.
- Ruled loads under `/design-library/` and can switch a recipe, toggle the grid, and export HTML. Composition Atlas opens with visible named layouts and a source bundle. On mobile, the page can reach the preview and download without horizontal page scroll.
- Artwork and grid captures preserve aspect ratio. File downloads resolve under the deployed base path. A reviewer can distinguish a preview image, a final file, and an interactive study.

This design review preceded implementation. Independent browser review of the delivered revision is still required.
