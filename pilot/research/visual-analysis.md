# Pilot 001 — visual analysis

Analyst: actual specialist agent `/root/visual_analysis`. Inspected the three original JPEGs with `view_image`, then measured pixel coordinates from RGB decodes of the JPEGs. This is an analysis handoff, not a completed implementation review.

## Source set and attribution

- Bernardo Lickfold, “grid vs final result,” https://x.com/berlickfold/status/2021190651505680513. Preserved originals: `public/references/21-grid.jpg` and `21-final.jpg`, each 2350 × 2700. Local provenance: sibling Render Assets `grid-study/research/21-{1,2}.jpg` and its post record.
- Bernardo Lickfold, “Testimonial card,” https://x.com/berlickfold/status/2028922909201195269. Preserved original: `public/references/17-testimonial.jpg`, 3044 × 1760. Local provenance: sibling Render Assets `grid-study/research/17-1.jpg` and its post record.

These are design-study sources. The photos, LOEWE identity, Luca Rossi identity, and quotation in the references are not newly licensed library content or evidence of a real client relationship. The source photo crops are appropriate only inside an attributed faithful study; generic components must accept replaceable image/content inputs. Do not invent testimonial endorsements for the original expansion.

## Faithful mode: 21 hero

The black outer area is staging, not website chrome. Measured website bounds in the original are **x=160, y=786, width=2030, height=1128**. Coordinates below are relative to that website origin unless called native. JPEG antialiasing introduces approximately 1–2 px uncertainty at boundaries.

| Property | Observed raster measurement | Implementation implication / inference |
| --- | --- | --- |
| Stage | approximately #111111 | Outside website; omit from page layout, retain in original source viewer |
| Website surface | sample #f8f8fa | Shared cool off-white token; grid strokes differ slightly |
| Split | photo starts native x≈1189, relative x1029 | 50.69% text / 49.31% image, not an exactly equal split |
| Primary photo | native crop x1189,y786,w1001,h1128 | Retain exact screenshot crop as a derivative asset; no original separate photo supplied |
| Outer text inset | x28–32 | ~28px at measured native section width; may scale proportionally for reproduction |
| Wordmark ink | x30,y34,w105,h14 | Text is LUCA ROSSI; estimated sans20px, actual font unconfirmed |
| Nav ink | right edge x1000, top y34 | Work / Articles / About / Contact, right aligned; about35px row spacing; estimated20px type |
| Headline ink | x32,y361 to x497,y529 | Strong Form, / Quiet Direction. Fine, condensed high contrast serif. Estimated88px font /84px line-height. Ink bounds are measured; CSS metrics inferred |
| Small portrait | x28,y718,w306,h382 | Exact derivative native crop x188,y1504,w306,h382. Ratio1:1.248; sharp corners |
| Description ink | x362,y718,w298,h108 | Four lines,30px row steps; estimated20px sans /30px line-height |
| Year ink | x363,y1085,w42,h15 | 2026, baseline aligned with Next Project |
| Next Project ink | x900,y1085,w99,h19 | Right edge approximately999px |

Source copy: “Work shaped by light, body language, / and the space between gesture and / pose, focusing on quiet movement, / and natural presence.” Line breaks are observed, not editorial changes.

The source shows a column system in both final and grid frames. It visibly has six repeated columns on the left, with the portrait occupying about two columns and copy beginning in the next. A twelve-column page model is supported by the full grid source; exact authored CSS column/gutter values are unavailable. Vertical boundaries at native x188,493,522,1160 and1188 are useful implementation anchors. There is no rounded card, cast shadow, gradient, button pill, entrance motion, or decorative illustration.

### Exactness limits

The display font was visually inferred in prior research as PP Editorial New Thin. No licensed source file exists here. Use the already available **Noto Serif Display at weight200 and native width62.5** as an explicit intentional alternative, not a recovered font. Do not horizontally transform glyphs to fake a font. General Sans Light/Regular is the available sans alternative; source sans identification is unconfirmed for this screenshot. Image files are screenshot crops, not separate full-resolution originals. Minor baked-in source guides/JPEG edge artifacts remain in derivative assets. Mobile behavior, hover states, interactions, and content beyond the visible section are unseen.

Source-sized comparison must use a **2030 ×1128 CSS-pixel viewport at DPR1** and an aligned source crop. Measure split, portrait, title origin, and copy origin separately from typography mismatch. A screenshot with substituted fonts must not be described as pixel-identical.

## Related reference: 17 testimonial

The source has a white horizontal canvas inside light-gray staging. Approximate white canvas native bounds x322,y352,w2400,h1056. A grayscale portrait at approximatelyx550,y518,w580,h724 adjoins a pale-gray text plane stretching to≈x2494. The quote is a large fine serif with four tight lines, offset well inside the plane. Small source attribution rests below it. Twelve faint columns remain visible.

Transfer to the original feature section: keep an image/text relationship, a large quiet serif, restrained metadata, generous inset spacing, common column anchors, square corners, and a near-white surface. Do **not** carry the source quotation or fictional endorsement into a purported real studio page. An original descriptive statement or process explanation is appropriate. The source's testimonial function and its image/quote layout must remain separate catalog fields.

## Original expansion and responsive criteria

- Shared style: cool off-white, near-black text, thin condensed serif display + unobtrusive sans copy, fine alignment guides, strong photography, minimal controls.
- Hero adaptation: preserve hierarchy and source imagery while recomposing into a single reading sequence on narrow widths. Keep the full title readable; do not simply shrink the desktop2030px composition into a mobile viewport.
- Original feature: use offset image and substantial explanatory copy; reuse source alignment logic without implying a recovered unseen section.
- Original footer: generous serif invitation, small navigation/credits, thin dividing rule; retain rectangular geometry and restrained density.
- Responsive outputs are adaptations, with their own check at390px and narrow320px. Source fidelity is assessed only at the measured desktop size.

## Status

Analysis complete. Implementation visual comparison pending. No final art-direction or independent-QA pass is asserted by this file.
