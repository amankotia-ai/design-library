# Ruled — a study of grids

One buildless page with a visual research index, eight working principles, and six configurable mobile/desktop compositions. All 29 supplied X posts were retrieved through FXTwitter after direct X fetches returned 403. The research includes 55 photos and three videos, examined through image contact sheets and video frame samples. Reference media and source links are attributed to Bernardo Lickfold; visual observations are distinguished from inferred implementation tokens.

Serve `dist/` with any static web server. No install or build is required. The page supports filters, search, native modal media navigation, related recipe loading, grid overlays, image materials, surface, type, gutter and margin controls, comparison, and self-contained HTML downloads.

The eight rules are shared alignment, intentional offsets, image hierarchy, repeated ratios, stable frames, recomposition for mobile, deliberate horizontal bands, and complementary image/text rails. A four-column mobile overlay is explicitly visible in study 11; a twelve-column desktop overlay is visible in study 16. The 4px spacing base, 12-column desktop default, and exact margin/gutter settings are proposed demo tokens, not recovered CSS.

Demo imagery was created with the built-in Imagegen tool. Final images are in `dist/assets/portrait.webp`, `dist/assets/linen.webp`, and `dist/assets/landscape.webp`. Prompts are recorded in `research/image-prompts.txt`. Original generated PNGs remain in the local generated-images folder.

Browser validation: mobile 390px and desktop 1280px, six-column desktop layout, recipe switching, grid visibility, reference navigation, recipe handoff, search and filter counts, empty state and reset, and self-contained export. The expanded version adds a seven-study grid filter, two original before/after image comparisons, and split-feature and image/index recipes. JavaScript syntax and local media paths are also checked.

The composition lab uses a mathematical grid, calculated before rendering. Choose a 2, 4 or 8px base unit and a 4, 8 or 16-unit row module. Margins, gutters, column widths, typography line heights and block coordinates are whole base-unit multiples. Every content block occupies integer CSS grid columns and modular rows. Images crop to a height rounded up to a complete row. The canvas width is derived from `W = 2M + NC + (N-1)G`, with column width rounded down to a whole unit within the target width. The sidebar displays the actual result and coordinate equations. Preview zoom preserves the logical coordinate system. Exports include the same grid and responsive preview scaling. No guides are inferred from rendered content bounds.

`node tests/grid-math.test.cjs` checks combinations of units, modules, devices, column counts, recipes, offsets and spacing extremes for exact unit arithmetic, whole-row placement, bounds and unintended overlap.

## Reading layout

The surrounding page follows the article structure of https://emilkowal.ski/ui/you-dont-need-animations: a centered 644px reading column, 16px sans-serif body text with a 1.65 line height, modest headings, a nearly white surface, and rounded inset demos. All six recipes, grid calculations, 29 reference records, modal media navigation, source comparisons and export remain available. Advanced controls live in a native expandable Grid settings panel. The mathematical composition styles are isolated in `dist/composition.css`; self-contained exports include both stylesheets. The site uses system sans-serif fonts and does not redistribute the reference site's font files.

The reference index, top navigation, reference counts/link, and related-studies strip were removed at the user’s request. Reference data remains available to the principles and before/after evidence dialogs.

The principles section is presented as a flowing article with four full-width interactive examples: reveal the grid, change a column offset, compare image ratios, and recompose an image index for mobile. It replaces the numbered rules, separator rows, small side diagrams and token strip. These examples reuse the same mathematical layout engine as the playground and preserve image/text sizing across comparisons.

Typography uses proportional sans-serif for labels, formulas, code snippets, grid guides, demo metadata and source dialogs. Monospace font stacks are not used.
