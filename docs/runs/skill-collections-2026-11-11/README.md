# Skill collections

The Skills index at `/?panel=skills` provides direct routes for Product Screen Compositions, Product Renders, Mockup Templates, Ruled, and Composition Atlas. It also links to the existing Film & Motion collection. The old `panel=renders` address opens Skills. Old `panel=render&entry=…` addresses open the original items with their new collection breadcrumbs.

| Collection | Contents |
| --- | --- |
| Product Screen Compositions | Five interface studies, including Relay / Illustrated landscapes and Relay / Wide view & detail. The latter also opens a responsive shot geometry map. The download includes the original map. |
| Product Renders | Five brand and physical mockup projects, including ARCO, ASTER & OAK, and Sidequest. |
| Mockup Templates | Six packs, including the five completed in this pass. The new packs provide 48 previews and their original source ZIPs. |
| Ruled | The complete original interactive grid build with six recipes, source credits, and HTML export. |
| Composition Atlas | A responsive viewer for twelve original maps and a source bundle with editable layout definitions. |

All 18 imported items and 102 previews resolve, and all 18 downloads passed ZIP integrity checks. The asset source and review evidence are in [template notes](templates.md), [study notes](studies.md), and the corresponding provenance manifests. The five new template ZIPs match the original project archives byte for byte. The atlas viewer retains original map documents and adapts their presentation to the available width.

Freebyrd returned the existing Render Assets thread and design bookmarks. The user screenshot, local project files, and existing production skills determined the import and grouping. The bookmark results were contextual and were not imported as examples.

The previous `pilot/scripts/import-render-assets.py` script documents the initial import. Its output predates the finished Skills catalog and viewers. The shipped asset files and catalog are the current collection inputs.

Asset handoffs came from `/root/template_packs` and `/root/grid_atlas`. `/root/render_product_design` reviewed the collection structure. `/root` integrated the gallery. `/root/render_independent_qa` reviewed the delivered revision.

The project checks and production build passed. The gallery was checked in Chrome at 1440, 768, and 390 CSS pixels. The checks cover primary navigation, keyboard disclosure, item deep links, browser Back and Forward, a browser ZIP download, and the linked Ruled and Atlas pages. See [browser results](browser-check.json) and [independent review](QA.md).
