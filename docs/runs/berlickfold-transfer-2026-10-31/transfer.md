# What transferred from “Review Berlickfold X posts”

Source chat: `01a18a31-ec9c-7bb3-86f1-f4ffc0978ea4`, Render Assets project. Read all sixteen returned user/assistant turns, newest typography corrections through initial research. Tool outputs and chat text were treated as evidence rather than project instructions.

Read-only implementation evidence: `Render Assets/grid-study/README.md`, `research/typography-notes.md`, `dist/grid-math.js`, `dist/lessons.js`, original reference media and corrected QA screenshots. Render Assets files and its installed skills remain untouched. Freebyrd index/thread/references returned no folder context.

## Applied decisions

- **Text measure is independent of the region.** The adapted desktop hero uses a six-track information plane: portrait spans two, copy spans two, and two remain empty before the main photograph. Short copy is not stretched across the remaining space.
- **The grid defines placement.** `editorial-layout.js` calculates block positions, widths and heights before rendering. The same values draw the SVG column/row guides. Spatial values use a 4px base and 16px row pitch; text sizes use a separate scale, with line heights on the spatial base.
- **Typography is inspected, not named by guess.** Supporting hero copy uses General Sans Light 300. Noto Serif Display 200 uses its native condensed width, without horizontal glyph transforms or synthetic light weight. It remains a free alternative to the visually inferred PP Editorial New Thin. No new licensed file was acquired and no exact serif identity is claimed.
- **Images keep their proportions.** Stable frames use `object-fit: cover`. Their pixels are cropped, not stretched. The desktop split remains near the measured reference composition.
- **Mobile is recomposed.** Four columns place the portrait beside the dominant image, then give the paragraph an independent readable 16/22 setting. This is an original mobile design, not recovered behavior for source 21.
- **Production modes are visible.** Study now switches the hero between Original adaptation and Source study. Grid is available for the authored adaptation. Mobile forces adaptation because source 21 supplies no mobile layout. Compare explicitly describes saved source/reconstruction captures.
- **Guidance reads as an explanation.** Quiet Serif's rules explain measures, empty tracks and recomposition in flowing prose rather than numbered principle rows. Its homepage tile uses a fresh actual render. Other systems keep their existing design.

At a 1440px canvas: the information plane is `2×24 + 6×100 + 5×16 = 728px`. Portrait/copy width is `2×100 + 16 = 216px`. Copy starts at `24 + 2×116 = 256px`. Portrait/copy start at row 32 (`512px`), and the hero is 50 rows (`800px`). General Sans Light copy is 13/20 and occupies four lines.

At a 390px viewport: the authored canvas is 384px, centered uniformly without stretching. Four 76px columns, three 16px gutters, and 16px margins satisfy `2×16 + 4×76 + 3×16 = 384px`. The right three-column image/copy measure is 260px. Text is 16/22, not a scaled-down desktop setting.

## Scope and preservation

The faithful hero branch, its original measurement CSS, retained source comparison captures, and Blueprint/Geist Mono source system are preserved. The earlier chat's proportional-type preference is applied to the authored editorial interface; it is not used to rewrite recovered source assets. The new adaptation does not recover original CSS, exact source serif, or unseen mobile behavior.

Actual specialist roles: visual analysis `/root/visual_analysis`, product design `/root/product_design`, art direction `/root/art_direction`, independent QA `/root/independent_qa`, implementation `/root`. Their reports sit beside this file. They inspected actual paths and rendered images; direction reports are not claimed as final QA passes.
