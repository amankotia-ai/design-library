# Source 17: testimonial study

Visual analyst: `/root/testimonial_visual`. Run: `testimonial-001`, 2026-10-30. Inspected `public/references/17-testimonial.jpg` through `view_image` at the native 3044 × 1760 resolution, then sampled raster geometry and colors with Pillow. Reviewed existing `src/sections.jsx` and `src/tokens.css`. No implementation edited by this analyst.

## Observed source

The screenshot presents a single horizontal testimonial card on a visible column grid. The surrounding gray and white surfaces are presentation framing, not proven website chrome. The portrait is grayscale and full bleed; the quote surface is a continuous very pale gray plane, with neither rounded corners nor shadow. The large narrow serif and deliberately small author line supply the hierarchy.

| Element | Native source bounds / observation |
| --- | --- |
| Full source | 3044 × 1760 |
| Gray presentation surround | approximately #ececec |
| White grid canvas | x322–2721, y352–1407, approximately 2400 × 1056 |
| Testimonial card | x551–2493, y518–1241, 1943 × 724 |
| Portrait | x551–1129, y518–1241, 579 × 724, aspect approximately 4:5 |
| Quote plane | x1130–2493, y518–1241, 1364 × 724, typical fill #f6f6f6 |
| Quote ink | starts about x1364; four dark-ink row bands: y644–718, 724–798, 804–878, 885–957 |
| Quote cadence | about 80px per line, with four fixed lines in this raster |
| Author ink | begins about x1365, y1077; uppercase narrow monospaced appearance |
| Organization | below author at about y1101; much lighter gray |
| Attribution rule | x1331, y1077–1114, about 1 × 38px |

Recommended aligned source crop, using exclusive right/bottom coordinates: **[551, 518, 2494, 1242]**, output **1943 × 724**. This excludes screenshot framing while retaining the complete card. Existing `practice.webp` was recorded with crop [550,518,1129,1242], 579 × 724; it is effectively the same portrait but starts one pixel earlier and ends one pixel earlier. Either retain this disclosed existing crop or create a separate exact portrait derivative; do not call the one-pixel variant identical.

Inside the cropped card, the portrait occupies 29.80% of the width and the quote panel 70.20%. Quote ink begins around x813/y126; the corresponding text box probably starts several pixels above its first ink. The quote is approximately 234px from the quote-panel left edge. Attribution text starts around x814/y559; its rule sits around x780/y559. The available quote region ends well before the panel right edge, producing roughly 250px of white space.

The four visible quote lines are:

> “The final film and image
> series not only elevated our
> campaign, it redefined how
> our audience perceives us.”

Source attribution reads “DANIEL MOREAU - CREATIVE LEAD” and “AETHER APPAREL CO.” Those are text in the design reference, not a verified endorsement of this project.

## Inferences and unavailable inputs

- Source serif identification is unconfirmed. Its very thin strokes, compressed forms, and low line spacing are observed; a font name is not recoverable from this raster alone. A starting estimate is 82px font size with 80px line height, then adjust from source-sized captures.
- Existing `--serif: Editorial` resolves to Noto Serif Display with an extra-condensed width and weight 200. Use it as the explicitly disclosed shared-system substitute, not as an identified source font. The source quote may be less condensed than the hero setting; compare at native dimensions before choosing its width.
- The author line appears monospaced rather than the existing General Sans; a system monospace is an inferred substitute. Author font size is approximately 20px (dark ink height14px), line height24px. Second-line low contrast is observed but should not be copied into the accessible adaptation.
- Original photograph, original website, font files, unseen interaction, and mobile behavior are unavailable. There is no evidence for a carousel, slider, or animation.
- Faint grid marks cross the presentation frame. Keep them in the preserved reference; reproducing that framing is a separate exercise from the bounded card.

## Faithful reproduction contract

Render a standalone 1943 × 724 card with the measured portrait/panel split and fixed quote/attribution placements above. Compare the implementation screenshot with the aligned crop at exactly those dimensions. Keep the source text only inside the labeled reference study; disclose that it is source artwork text. Match visible geometry before making responsive changes. Geometry and crop can be measured; source typography remains approximate. Do not claim pixel identity.

The standalone study needs no new action controls and no speculative behavior. Keep source comparisons outside the card so the study image does not gain unobserved chrome.

## Original editorial expansion contract

Use a responsive portrait/pull-quote section, still with continuous square-edged image and paper planes, thin condensed serif, and small subordinate metadata. Share tokens with Hero, Feature, and Footer. Keep section layout separate from token definitions and pass content through a data object.

For the assembled sample page, use clearly illustrative editorial content rather than implying a real client endorsement. At desktop, preserve the 30/70 split and generous text inset while allowing wrapping. At mobile, stack portrait and quote, reduce the serif to a readable roughly 36–44px, give the quote 20–24px side padding, and retain legible metadata contrast. This is original responsive behavior. A portrait may fill the available width or narrower image column, but must avoid a tiny unreadable scaled desktop card.

The existing Feature already uses the same image, so a full-page assembly should avoid mechanically repeating it immediately without purpose. A separately browsable testimonial section adds useful taxonomy even if the first assembled page omits it or uses a differently framed original quote section. Product and art direction should resolve that assembly choice.

## Review evidence needed

Capture source-sized study, adapted desktop, and 390px mobile. Compare native geometry and line breaks separately from the original adaptation. Verify no unintended clipping, metadata contrast, and explicit study labeling. This analysis is a handoff, not a passed review of an implementation.
