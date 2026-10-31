# Visual analysis — Pages page-type filter

Reviewer: `/root/visual_analysis`. Inspected the actual supplied screenshot `/var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_2qgzjm/Screenshot 2026-10-31 at 2.54.53 AM.png` and current `pilot/src/catalog.jsx` / `page-shells.js`. No UI source changes by this reviewer.

Observed: Pages has the corrected compact preview-first cards, page-purpose titles, type labels Portfolio and Landing page, composition metadata and page actions. The lone top-right dropdown still says Design system and is backed by system IDs. The request is specifically to make that dropdown filter by page type.

Pass constraints:

- Keep the existing native select appearance, dimensions, chevron, focus treatment, alignment and mobile full-width stacking.
- Replace Pages label/default/accessible name with Page type. Derive its options from pageShells.type, currently Portfolio and Landing page.
- Selecting Portfolio must retain only Portfolio homepage; selecting Landing page must retain only Creative tool landing page. Default returns both. Clear restores the unfiltered state.
- Keep a reloadable URL representation for page type and do not continue applying an invisible system filter on Pages.
- Preserve page cards, preview cropping, typography, descriptions, actions, navigation underline and grid geometry. Sections retains its existing section-type and design-system filters.

This is a semantic/filter behavior correction, not a visual redesign. Independent QA should inspect actual select options and filtered results plus desktop/mobile layout on the delivered revision.
