# Art direction — Berlickfold learning transfer

Reviewer: `/root/art_direction`. Pre-implementation guidance only; no claim of final UI review.

## Evidence inspected

Read task brief, product-design handoff, sibling `grid-study/research/typography-notes.md`, and current `sections.jsx` / `sections.css`. `visual-analysis.md` was not yet available when this pass began; the parent supplied its relevant body-copy finding. Visually inspected actual `pilot/public/references/hero-source.png`, `pilot/public/previews/quiet-serif.png`, and sibling `grid-study/qa/free-serif-corrected.png`.

Observed: the source hero and current preview already preserve the dominant near-half-width photo, an inset portrait, a very narrow serif heading, and large unused planes. The current original preview paragraph occupies five lines; the supplied source occupies four, with lighter-looking text and a more compact measure. The sibling corrected example demonstrates separate image roles, a narrow upper text rail, and substantial real space between content groups; its large textile image is not stretched to fit a symmetrical card.

## Direction

Retain image split and deliberate crop. Apply the transfer to the **original adaptation** through an explicit grid, independent text measures, lighter proportional body text, and a mobile recomposition. Preserve faithful source output and its existing direct route. The practical lesson is placement and restraint; adding visible grid lines alone would not demonstrate it.

A useful inferred model for the source's left panel is six columns: at the 2030px source width, roughly 28px inset, 28px gutter, and 139px column. Two columns produce the portrait width near306px; the next two begin near362px and support the copy rail; the final two remain empty before the dominant image begins near1029px. This is a measured candidate model, not proof of the author's CSS. If used for the original adaptation, the same declared tracks must position content and draw the guides. Preserve unused tracks as actual layout space.

The heading, paragraph and navigation require independent measures. Do not use one common half-page text box or justified distribution. Keep the available Noto Serif Display at native extra-condensed width and weight200, without transforms. General Sans300 is supported as the strongest tested free body match in sibling research, still not an author-confirmed identification. At1440px, approximately .887cqw gives a12.8px desktop body size; use source-sized rendered wrapping as the decision test. Mobile should remain16/22 or comparably readable and follow the existing four-column content order, rather than shrink desktop metrics.

Keep interface and metadata proportional sans-serif. A bounded editorial quote-caption change from Courier to the shared sans is consistent with the transferred lesson. Do not remove Blueprint's source-specific mono face.

## Inspection experience

Show Source study / Original adaptation explicitly, and label mobile as an original adaptation. A Grid control reveals/hides guides without changing dimensions or crops. Caption the six-track model as inferred/authored. Make the adjacent lesson explain portrait2 + copy2 + empty2 in the left panel, with its arithmetic derived from the same values as the rendered layout. One compact working example is preferable to decorative diagrams or a large new teaching section.

Keep source comparison separate from live adaptation: retained captures must be described as captured reconstructions. The open-view route must carry the current mode. No source or preview replacement is needed merely to make the new grid lesson look different.

## Acceptance direction

At equal desktop dimensions, check body weight and four-line wrapping; preserve heading/photo hierarchy and unused rail. With guides on/off, confirm identical content geometry. At390px, inspect readable body text, four-column recomposition, no stretched images and no overflow. Independent QA must inspect the delivered revision, because this direction does not constitute a passed implementation review.
