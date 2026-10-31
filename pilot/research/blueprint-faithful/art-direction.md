# Blueprint full landing reconstruction — art direction

Reviewer / implementer: `/root/full_art`. Date: 30 October 2026. Mode: faithful source reconstruction. This is distinct from the earlier original Signal Workshop expansion.

## Actual reference inspection

I inspected the settled 1440 × 8534 desktop JPEG and legible source crops `gallery-compare.png` and `features.png` in `/tmp/blueprint-faithful-intake/` with the image tool. The settled desktop shows the full page, including its blue opening, editor, examples rail, blue comparison band, seven feature cards, pale pricing band, FAQ, blue final prompt, and compact footer. I also inspected the initial 390 × 11909 mobile JPEG. That initial mobile file has blank reveal/lazy regions and a partly loaded editor; it is not sufficient visual evidence for the finished lower-page mobile composition. The parent is acquiring a settled mobile reference. Mobile CSS and recorded geometry are observed inputs, but they do not substitute for inspecting the settled image.

The source assets and settled HTML fragments provide exact Geist faces, the actual inline SVG wordmark, source feature illustrations, source colors and class geometry. Those should replace the earlier substitute-font / approximate-mark hero. Do not continue using Inter for this source-study family, and do not describe the separate original expansion as the 1:1 reference.

## Protected visual contracts

- Keep the source’s `#104bff` blue and `#4976ff` logo tile, low-contrast 32px grid, soft neutral `#f7f7f8` page and white panels. Preserve the original grid fade and source gradients where used. The new requirement explicitly calls for source reproduction.
- Desktop uses a 1200px outer wrap with 24px inner padding, giving x144–1296 content edges at 1440px. The header is 60px tall. Hero blue is inset 12px and retains its 28px lower corners.
- The hero is the source’s 76px / .98 Geist 500 display with -.045em tracking. Main section headings use 44px / 1.05 Geist 500 with -.035em tracking. Body and small UI should come from the preserved source cascade, not the library shell’s 16px / 1.65 reading style.
- The current Geist-based desktop hero section ends at y587.148. Its device begins y595.148 after 8px showcase padding. At 1440 × 900, the device is 746px tall: 40px browser bar + 700px window + 6px bottom padding. Earlier 594px Inter study boundaries are historical.
- Editor and examples belong to the same `.l-showcase > .l-wrap`. The examples heading is deliberately separated from the device by the source’s 256px rhythm. Do not wrap them as unrelated compact cards.
- The examples section is a full-bleed horizontal rail, not a grid inside the narrow content area. Source desktop cards are 272px with 12px gaps and masked rail edges; partial cards at the viewport edges are intentional. Mobile uses the source’s smaller card basis and horizontal scrolling. Native page-width overflow must still be absent.
- Preserve the comparison’s blue rounded band, asymmetric prompt/Claude/Blueprint columns, exact text and original comparison posters/videos. Its visible video frame is time dependent; compare layout and the same paused frame rather than pretending arbitrary moving frames are pixel equivalent.
- Preserve all seven feature illustrations and the source mosaic: wide delivery card + background generation; then three narrow cards; then reference image + wide versions. The actual miniature interface diagrams and art assets matter. Do not replace them with generic icons or a new list of design principles.
- Pricing retains the pale full-width band, exact three-plan geometry, highlighted Studio treatment, free strip, billing toggle, footnotes and expandable comparison table. The FAQ is the source’s split heading and sixteen native disclosure rows. The closing prompt uses the source blue field and pattern/canvas treatment. Footer wordmark, groups, status and legal links remain in their exact hierarchy.

## Static component ownership

`src/blueprint-faithful-static.jsx` exports `SourceHeader`, `SourceHero`, `SourceExamples`, `SourceComparison`, and `SourceFeatures`, plus the internal reusable `SourceMarkup` helper. It preserves the settled source fragments supplied by the parent rather than claiming recovery of the original Next application. The helper’s `display: contents` wrapper adds no layout box. The parent owns the source CSS cascade, live editor, shared show-case wrapper, and library registry. The product specialist owns pricing, FAQ, final prompt and footer.

`SourceExamples` renders only the children after the editor, beginning at `.examples-head`, unless `standalone` is requested. In the assembled page use the common source showcase/wrap around the editor and examples. The local carousel starts at its beginning; next/previous buttons, horizontal snapping, edge masks and disabled states update from native scroll position. Mouse dragging is supported on the non-interactive card surface, while touch uses native scrolling. The two arrow controls remain keyboard reachable, an intentional accessibility improvement with no visual change.

The source header changes from hero to neutral tone while scrolling. Comparison videos play when visible, pause offscreen and use their posters when reduced motion is requested. Feature CSS animation remains source derived and pauses while the visual is offscreen. The original source’s motion timelines contain time-varying states, so fixed-frame comparison must be explicit.

## Known boundaries and pending checks

Remix actions route to the actual source service’s login with the associated public project as the return target. Authenticated remix server actions and tool creation are not recreated or claimed. The original source forms’ `javascript:throw` React fallback actions are replaced with valid destinations and handled locally; they are not executed as preserved application code. This is a page-study behavior boundary, not a claim of backend identity.

At implementation time the first six gallery thumbnails were preserved, while five offscreen cards still contained source lazy placeholders. Those must be replaced with their actual source thumbnails before final all-carousel fidelity is claimed. The parent is acquiring them. Blank lazy placeholders are not a valid completed 1:1 rebuild.

Final review must inspect the delivered desktop and settled mobile revisions. Compare source-sized section crops and geometry, including the shared showcase start, gallery rail baseline, comparison width, feature card heights, pricing state, FAQ rows, final prompt and footer. Check that the preserved source styles load only in source-study documents and do not recolor the Design Library shell or Quiet Direction. This direction document is not an independent QA pass and does not establish pixel identity.
