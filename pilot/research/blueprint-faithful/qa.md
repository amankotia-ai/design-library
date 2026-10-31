# Independent QA — Blueprint complete source study

Reviewer: `/root/full_qa`. Status: **passed within declared scope**, 44 of 44 checks. The reviewer did not edit implementation.

## Delivered revision and evidence

Inspected the running page, all ten standalone section views, all eleven source comparison pairs, source crops, implementation files, and desktop/mobile captures. `qa.json` records 29 critical source hashes, project/runtime equality, and image/export hashes. At 1440×900 the assembled page measures 1440×8534. At 390×844 it measures 390×11958 with the complete first example prompt. Measured hero, showcase, comparison, features, pricing, FAQ, closing and footer positions/heights match the observed source contract. Desktop footer height is 350.5px; mobile footer height is 451px.

The last refinements were reviewed separately after the full captures. Standalone navigation retains the blue hero background, white action background and blue action text. Paragraph wrapping is `pretty`, matching the original `.s-sub` declaration. A standalone pricing overflow finding was fixed with a containing block for absolute screen-reader text: the collapsed page now has body/document scroll height 1342px and native maximum scroll 441.5px at a 900px viewport. Expanding still shows 19 total table rows (18 body rows), the Hide comparison label and a 688.828px comparison region; recollapse returns to zero height. Current `qa-final-header.jpg` and `qa-final-pricing-targeted.jpg` supersede those parts of the older full-capture review.

## Actual checks

All ten source sections and the assembled page render separately with Geist. Eleven carousel cards and thumbnails load. Five recovered programs—Isometric, ASCII, Cross Stitch, Letter Dash and Mirror Pixel—reached rendered ACK through native keyboard focus, produced visible output and cleaned up to zero live gallery frames after focus left. No preview error state was present.

Monthly/yearly prices and offer destinations, the comparison table, 16 native FAQs with Enter expansion, source service links, local footer anchors, library System metadata, all eleven comparison image pairs and opacity overlay were exercised. Native editor preset, shape, range keyboard input, color, folder, seed generation, pause, aspect format and actual PNG download were exercised. The red/cream source preset appears in the inspected 1120×1400 PNG export. Auth, new-tool, checkout and remix destinations were inspected without submitting external forms.

The recovered closing canvas initialized when visible, displayed source texture phases and accepted native keyboard editing without replacing the edited text. Focus exposes the complete first observed source example. Desktop and mobile had no horizontal overflow. Inspected warning/error logs were empty. Temporary viewport overrides were reset.

## Visual comparison

I inspected source hero/editor, gallery, the seven-card feature mosaic, pricing, FAQ, closing texture and footer, then the local output and exported imagery. Geometry, type and asset relationships follow the source. The recorded desktop JPEG pair yields zero mean RGB difference in the hero and closed FAQ regions and about 0.005/255 in pricing. Feature animation, canvas, video, typewriter and texture phases are not synchronized. These figures establish only the result for that recorded image pair, not universal pixel equality. Region bounds, values and exact input hashes are in `evidence/blueprint-faithful/qa-pixel-comparison.json`.

## Scope limits

This is Chromium/CUA review, not cross-browser or screen-reader certification. Five gallery programs were exercised at runtime; the remaining six are not individually claimed as exercised by this reviewer. Source service accounts, checkout, backend generation and feedback handling remain outside the local reconstruction. Source feature illustrations remain illustrations. Mobile closing height varies with typing/erasing state, so the final capture uses the complete first prompt. The full captures predate only the final reset-specificity, standalone-header and standalone-pricing refinements; targeted captures and UI checks cover those affected areas. No blocking finding remains within this scope.

## Final recovered motion module review

Two targeted checks supersede the affected feature/FAQ motion scope of the original review. The recovered seven-card feature module preserves section height 1708.9453125px at desktop and 3242.7734375px at mobile, with no mobile horizontal overflow. Visible Contour illustration frames 4.555 seconds apart show changed art scale/contrast/brightness and all three slider fills. Actual screenshots were saved and inspected. Pointer dragging was not exercised.

All 16 FAQ summaries remain native. Keyboard Enter produced intermediate opening height 12.984px/opacity 0.191, settling at 68.1875px and section height 1309.1875px. Closing produced height 44.328px/opacity 0.650 and the closing state, then restored the original 1241px section. The isolated delivered source uses 320ms opening and 260ms closing WebAnimations. CUA’s read-only DOM does not expose `getAnimations()`, so direct animation-handle introspection is not claimed. Console warnings/errors were empty. The new motion module plus changed static, commerce and parts files match runtime hashes. Earlier full captures predate this motion refinement; `qa-features-motion-a.jpg`, `qa-features-motion-b.jpg` and `qa-faq-source-animation.jpg` document the current affected output.

## Final isolated preview adapter review

Two targeted checks cover the last standalone-only changes. At a 1440×595 viewport the isolated hero body is 595.1484375px, document scroll height is 595px and native maximum scroll is zero. Source pseudo overflow is clipped and the 8px opening gap remains; no blue scroll tail appears.

At 1440×900 the isolated editor body is 754px. Its white device frame starts at y8, with height 746px. The restored source blue grid/fade occupies the original first 300px desktop and 200px mobile. The local x20/y20 pixel equals the original assembled reference x20/y615 pixel, RGB36/74/245; the surrounding 11×11 patch has zero mean RGB difference. The offscreen hero is aria-hidden and inert, its content has hidden visibility, and its heading is absent from the actual accessibility tree. Mobile and desktop have no horizontal overflow. The mobile body is 864.59375px at 390×844. Actual screenshots were saved and inspected, warning/error logs were empty, and viewport overrides were reset. Only the wrapper and scoped reset hashes changed; unaffected prior checks retain their original scope.

## Final embedded editor height review

Check44 verifies the actual library desktop preview after the final embed-only adapter. Its iframe has inline width1440px/height754px; the embedded body and showcase each measure754px, with a700px editor window and an empty `data-source-embed` marker. The standalone view still measures754px at1440×900 and has no embed marker. The CSS rule applies only to the marked editor at widths761px and above, leaving the previously tested mobile output outside its selector. The library screenshot `qa-library-editor-embed-final.jpg` was saved and visually inspected. Only wrapper/reset hashes changed, and both match runtime. Prior43 checks retain their unaffected scope. Viewport overrides were reset.
