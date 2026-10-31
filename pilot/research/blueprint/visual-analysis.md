# Blueprint visual analysis

Run: `blueprint-2026-10-30`. Analyst: `/root/blueprint_visual`. Mode: source-sized visual study first, original system expansion separately. I inspected the actual PNG with `view_image`; this is not a completed-implementation review.

## Evidence

- Source: https://blueprint.page/, captured 2026-10-30.
- Actual inspected image: `public/references/blueprint/desktop.png`, **1440 × 857**. The viewport is 857px high even though the browser launch requested a 1000px window; compare at the actual image dimensions.
- REA screenshot Evidence: `ev_ece54c60806598980d30297945adb307f415a7cdf99a49ee0888ac4c742b53eb`.
- REA inspection Evidence: `ev_2724b364dc68d666c74e22d5688613c984e7b83dddd3d100f655ddbc35fe2f55`.
- Public HTML/CSS retained in `research/blueprint/page.html`, `source-*.css`, and readable `landing-styles.css`. CSS facts below are declarations in that saved source, not computed-layout measurements.

## Observed composition and source CSS

| Property | Evidence / measurement |
| --- | --- |
| Outer field | Blue extends from x12 through x1427. Off-white side strips are 12px wide. Declared brand `#104bff`; tile `#4976ff`. |
| Grid | 32px square line grid over blue. Source uses white at about 5% opacity and a radial fade. It is secondary texture, not a separate foreground asset. |
| Content width | `.l-wrap`: 1200px max, 24px inner padding. At 1440px that gives inner x144 to x1296, width1152. Screenshot header logo starts x144; device aligns to x144 and x1296. |
| Header | 60px tall. Logo approximately x144/y17, 117×26px. Links on one line. Sign-in and white Start free button sit at the right. Source navigation uses 13px text; button height32/radius8. |
| Offer | Centered capsule approximately x582/y132, 276×28px. Small white tag sits within translucent blue-white capsule. Source `.l-launch` has top margin−24/bottom28. |
| Headline | Visible white glyphs approximately x324..1116/y198..326. Two lines: “The fastest way to make” / “a generative design tool.” Source h1 maximum900px, 76px size at desktop, line-height.98, weight500, tracking−.045em, margin-bottom22. The screenshot visually depends on this tight tracking. |
| Supporting copy | Two centered lines around y367 and y395. Source max600px, size18/line-height1.55, white at80%, margin-bottom32. |
| Actions | Top y448, height42. Primary x533..765 (232px minimum); secondary x775..907 (about132px); 10px gap. White filled primary, transparent secondary with pale inset border. Both radius10px. |
| Supporting note | Centered y508..520, size13px, white at70%, top margin16. |
| Product frame | Top y594. White browser frame width1152 with outer corner radius about28px. Title bar40px. Three gray dots at x162/180/198, size11px, gap7. Center address chip width136/height24. |
| Nested editor | Inner shell starts about x150/y635. Shell `#eeeff1` in light theme; white panels. Desktop source declares 290px side panels and flexible center. Rounded nested panels use14px radii and8px gaps. |
| Product artwork | Yellow/black optical stripe pattern visible in center, around x544/y739. Artwork is live generated content; this viewport catches one moment. It is not an interchangeable stock photograph. |

Font is **Geist** in the public source `@font-face` declarations, variable weights100–900, with separate Geist Mono for selected utility text. This establishes the declared family, not successful downloaded-font identity in every runtime. Existing Inter would be a disclosed substitute, not an exact recovery. There is no raster hero image required: the identity is typography, grid field, nested UI, and generated artwork.

## Protected character

Keep the saturated blue as a large continuous plane; keep the headline centered and tightly composed; let the product frame begin below the concise offer/heading/lede/actions stack; align header and frame to the same wide content edges. The yellow artwork is a deliberate secondary palette inside the neutral editor, not another page accent. White button fill provides the main call-to-action contrast. Gray panels should be visibly nested without heavy floating-card effects.

## Bounded reproduction contract

A defensible first faithful target is the **desktop masthead and hero through the note**, measured within the 1440×857 capture, with device-frame top at y594 retained as a composition anchor. Compare aligned at1440px. Reproduce source wording only as visibly attributed study content. Source logo should be attributed study content or explicitly replaced; do not present replacement typography as recovered identity.

If including the editor, label it a bounded visual reconstruction: the first visible pixels can be compared, but the image does not establish all hidden panel content, rendering algorithm, export behavior, or full editor source. A static/generated replacement cannot prove matching live behavior. Avoid reporting a numerical whole-image fidelity score for animated content without controlling its frame.

## Original expansion contract

A new system may translate the measured language to realistic original product content: blue grid-centered hero, neutral nested workspace demo, repeatable feature rows/cards, clear plan or workflow comparison, and a concise blue or neutral closing section. Components should share tokens for the blue, neutral shell, typography, spacing, panel radius, button hierarchy, and border treatment; section layouts/content remain independent. Original demo controls should produce visible local changes and state their scope honestly.

The source CSS contains breakpoints900px and600px. It declares a smaller hero and vertical action stack below600px, and a reorganized editor below900px. This analyst has **not visually inspected a mobile source capture**. Any delivered mobile layout must be reviewed as an adaptation; CSS declarations alone do not prove every mobile runtime state.

## Limits and open verification

- Only the first857px of the source were visually reviewed here; below-fold features, pricing, FAQ, and footer have no source screenshot review in this pass.
- Artwork animation moment and complete tool algorithm are unavailable from this capture. Do not claim recovered generative behavior.
- Public source declarations expose font URLs, but no font licensing file was inspected here. Any substitution or acquisition needs its own provenance.
- Source app login, sharing, billing, and export flows were not exercised.
- The source has animation/reveal behaviors; this study does not require copying them. A still study should remain stable for comparison.
- Implementation review and independent QA are pending. This document establishes reference observations only.
