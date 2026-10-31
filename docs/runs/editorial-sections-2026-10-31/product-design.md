# Product design — editorial section expansion

Reviewer: `/root/product_design`. Mode: original system expansion, 31 October 2026. Read current `pilot/src/sections.jsx`, `data.js`, `main.jsx`, and Render Assets `grid-study/dist/app.js`, `grid-math.js`, and relevant research records in `data.js`. Source inspection only; final rendered revision needs independent QA.

## Job and boundary

Show more working examples of the same editorial language while making Luca Rossi’s illustrative portfolio useful to browse. Current assembled page contains Hero, Feature, Quote and Footer. Add four distinct section functions and include every section in both the assembled page and the existing Study section selector. Keep all existing IDs and source-study routes stable. Each new entry uses `systemId: editorial-01` and `mode: Original system expansion`. New sections have no source-comparison capture and must not enable Compare.

## Four component contracts

### Selected image index — `image-index`

Purpose: scan a small body of work before reading a project. Four image figures with short title/category/year captions. Desktop: four equal image spans; mobile: two columns, retaining paired scanning rather than forcing a single tall list. Use portrait or square frames with uniform scaling and crops, never stretched images. Each tile is a real anchor to a corresponding project/material/notes section on the assembled page; standalone rendering uses `/?view=page#anchor` rather than dead local fragments. Do not use blank links or pretend each crop is a different client commission. Caption reused photographs as studies or details.

Suggested four entries: Coastal campaign; Portrait study; Material & light; On composition. These are illustrative editorial study labels, not verified project/client claims. Existing campaign, portrait and practice imagery can supply the first entries; any imported sibling generated linen/landscape images require explicit provenance and must not be labeled recovered photography.

Reference relationship: Render Assets image-index recipe; research study 7 (two-column mobile catalogue) and study 2 (restrained image-index frame). Borrow the layout principle, not source copy or an unbuilt modal.

### Project detail pair — `project-detail`

Purpose: read context while comparing a primary frame and close detail. Desktop: independent narrow copy/metadata rail, a real empty column, and two adjacent image regions sharing top and bottom edges. Proposed metadata: Study / Coastal campaign; Focus / Gesture and natural light; Format / Image series; Year / 2026. Avoid invented location, client, metrics or commissioning history.

Mobile: a 3/1 or similar main/detail image pair first, then description and a compact definition list below. Keep the two images visibly related and use distinct object positions rather than duplicating an identical crop. Copy has its own bounded width and does not consume the empty separation. Use a normal heading and `dl`; no control is necessary when there is no action.

Reference relationship: Render Assets project recipe and study 16, “Structure before imagery” (`https://x.com/berlickfold/status/2033943094652019066`). This is an original project section inspired by information/photo grouping, not a source reproduction.

### Split material feature — `split-material`

Purpose: explain how texture and light inform the practice. Desktop: short copy above the dominant right-hand image; serif heading and small detail meet that image on one horizontal band. This must differ materially from the existing Feature (offset portrait + process notes), rather than repeating it with changed text. A square/tall large frame plus a narrower detail is sufficient; no commerce, prices, bag, sizes or fake purchase action.

Mobile: full-width heading, offset readable copy, narrow detail beside the larger image, caption after both. Use real body text such as: “A fold changes when the light moves. This study follows those changes, from the full form to the small irregularities at its edge.” Label this illustrative study copy. Keep any generated linen image disclosure in source metadata, with a concise visible study caption.

Reference relationship: Render Assets split recipe. Its hinge aligns heading, detail and primary photograph. Record exact source studies only after actual visual inspection; do not claim a measured match from recipe code alone.

### Image + numbered index — `image-rail`

Purpose: browse three observations on process. A compact image area and numbered text list stay related across desktop and mobile. Suggested items: 01 Observe / light and gesture; 02 Compose / edges and intervals; 03 Refine / deliberate crop. These describe the current practice, not fabricated articles.

One meaningful interaction: native buttons change the selected item, active image, heading and short description together. Use `aria-pressed` and a stable image frame; selected state uses weight/underline plus color, so it remains clear without color. Avoid custom tabs or arrow-key logic. Keep all three buttons keyboard reachable with native focus; no autoswap or animation. A stable text area may use a minimum height to avoid page jumping. At 390px, keep image and numbered list side by side when legible; allow the description below the list instead of shrinking text.

Reference relationship: Render Assets rail recipe and study 29, “Images beside an index” (`https://x.com/berlickfold/status/1921501628307222909`). The source shows active list styling; actual selection behavior is authored here, not recovered.

## Assembled page and navigation

Recommended order: Hero → Selected image index → Project detail pair → existing Feature → Split material feature → Quote → Image + numbered index → Footer. This moves from overview, to project reading, to practice, to supporting observations, then contact. Vary the vertical rhythm and image proportions; four identical card grids would erase the section differences.

Use meaningful unique anchors: `work` at Selected image index, `campaign` at Project detail pair, `about` at existing Feature, `material` at Split feature, `notes` at Image + numbered index, `contact` at Footer. Existing Feature currently owns `work`, and practice-notes owns `notes`: remove/reassign those element IDs if the new page sections take them. Ensure there is one instance of each anchor. Existing standalone component links must target the assembled page when necessary.

Section labels form a coherent visible sequence; do not leave the old Footer “03” after adding several numbered sections. Either renumber all original page sections or use descriptive eyebrow labels without ordinal claims. Preserve source hero content and attribution.

## Browser and evidence integration

The registry controls names and inventory counts, so add each entry once and derive counts. Register direct `?view=` rendering for all four. The Study frame must measure their real heights, show desktop and 390px responsive views, and open the selected section correctly. The editorial article’s prose currently says hero/feature/quote/footer only; update it to name the expanded functions and source/expansion boundary accurately. Update assembled-page layout metadata, disclosure and system evidence copy.

Keep each section’s source relationship in data/documentation with original post URLs and local asset provenance. Original expansions are valid without a falsely precise source comparison. Source hero/quote evidence remains untouched. Do not write into Render Assets.

## Acceptance checks

- All four new views load directly and appear once in the selector and system inventory.
- Assembled page contains all four and the original sections with unique anchors.
- Index links and hero navigation reach real content; rail buttons update image and copy together.
- Desktop spacing preserves independent text measures and actual blank tracks; mobile recomposes without overflow or tiny type.
- Images crop uniformly without distortion; reused/generated/reference assets are labeled accurately.
- Source reconstruction and comparison still work only where genuine source captures exist.
- Independent QA inspects the delivered source and screenshots, including a changed rail selection, at desktop and mobile.

Status: proposal complete; no implementation or final QA pass claimed.
