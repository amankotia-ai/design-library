# Art direction — four Quiet Serif layouts

Reviewer: `/root/art_direction`. Original system expansion, target1440/390. Pre-implementation direction, not final output approval.

## Evidence

Read `brief.md`; visual-analysis and product-design files were not yet present when this review began. Visually inspected the actual sibling reference files `ref-16-1.webp`, `ref-23-2.webp`, `ref-07-1.webp`, and `ref-29-1.webp`. All are consulted as design evidence, not as permission to claim exact reproduction or source typography recovery.

## Shared contract

Keep Quiet Serif's existing paper/ink/rule colors, Noto Serif Display native extra-condensed200, and General Sans300. Retain proportional sans captions and controls. The references provide composition; typography and original generated photographs belong to this system expansion. Do not introduce cards, rounding, shadows or decorative per-item icons. Place content on declared grid tracks, leave real unused tracks where the composition calls for them, and use narrow independent text measures. Image sizes may differ while crop remains uniform and deliberate; never stretch a photograph to force a shared height.

## ProjectPair — ref16

Observed reference: narrow information region and two tall image planes in a3/5/4 family, with a substantial empty upper area above the explanatory text. Metadata follows in thin ruled rows. The images share a top edge and stage height while their widths differ.

Contract: left three tracks contain compact copy and metadata; the next five and final four contain complementary photographs. Lower-align the copy group instead of filling the empty upper region with a huge heading. Keep title or section index separate from the paragraph's measure. The two photos must feel like one project at different distances, rather than unrelated catalogue items. On390, recompose copy first, then dominant and supporting images in an intentional vertical order; do not shrink the desktop12-track tableau.

## PhotoIndex — ref07

Observed reference: two equal portrait-format images per row, generous vertical separation between rows, and captions split between a small ordinal and a right-aligned project name/category. The right-hand reference pane is a project-detail presentation, not evidence that every gallery item opens a modal.

Contract: use equal image columns with light caption treatment, not boxed text cards. Use a bounded initial set so the assembled page stays legible. Make whole items anchors only when they point to actual project sections with matching IDs. On390, two columns can survive if captions wrap naturally at readable size; otherwise recompose to one column without changing image aspect. No synthetic modal is needed.

## SplitMaterial — ref23

Observed reference: a single strong horizontal hinge aligns the large left headline, a small supporting image near the middle, and the top of the large right image. A short paragraph occupies a narrow rail directly above the large image. Large upper and lower empty planes carry the composition.

Contract: preserve this hinge and the two image roles. The large image owns roughly the right half; the small image is an inset, not an equal tile. Use a concise Noto headline within Quiet Serif, explicitly an original typography transfer because the source uses condensed sans. Keep copy narrow, aligned with the large-image edge, and do not stretch it across the half-width. On390, recompose headline/copy followed by the image pairing; preserve a clear shared alignment and distinct scale instead of reproducing desktop voids as long blank scrolling.

## ImageRail — ref29

Observed reference: a40/60 image/index split, stacked portrait images, a numbered list whose first row is dark and others muted, and extensive empty area between navigation and content. The screenshot alone does not establish hover, click or scroll behavior.

Contract: author an explicit interactive interpretation. Native buttons select actual available images; active image, heading and descriptive copy update as one state. Use `aria-pressed`, visible focus and a stable image container so selection does not move the list. Active ink and secondary readable muted text are sufficient; do not add filled pills. At390 retain a roughly40/60 rail only if long names wrap within the right region without overflow; the image should remain substantial. Do not invent14 choices to resemble the source when only a few assets exist.

## Assembled page

Give each section its own semantic heading and stable anchor. Distinguish the narrow text+large pair, equal catalogue rhythm, horizontal hinge and interactive rail through composition, rather than four versions of the same title-over-image pattern. Generated imagery and new copy must be described as original study material, not a recovered commission. Existing faithful hero and comparison assets remain untouched.

## Review criteria

At1440, inspect alignments, true empty tracks, narrow text measures and distinct image scale. At390, inspect reading order, text/caption wrapping, no overflow and undistorted crops. Exercise all catalogue anchors and every rail selection with keyboard. Independent QA must inspect the delivered revision before a pass is recorded.
