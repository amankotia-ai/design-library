# Unifize visual analysis — 10 November 2026

Analyst: real subagent `/root/unifize_visual`. Inputs inspected: `pilot/public/references/unifize/viewport.png`, `desktop.png`, `mobile.png`, `pilot/research/unifize/capture.json`, and retained CSS under `pilot/public/unifize-source/`. Screenshot review is of the live source capture, not a final implementation review.

## Identity and hierarchy

The inspected live page opens with “Every decision made right and made fast. You hear only about the exceptions.” Its current content differs materially from the web index response; use the live capture/DOM as source of truth for this revision. The language is enterprise and operational: white/blue statements on charcoal, precise thin rails, light software records, technical metadata and restrained status colors. Avoid treating it as a generic bright SaaS template.

The hero uses an even split: narrative left, decision visualization right. The right field is a vertical dark-navy → blue → near-white gradient with fine grain, light decision cards and one owner pill. White cards and blue controls carry emphasis; amber and green express workflow state. Below, a dark decision/problem narrative gives way to a light explanation band, three entry columns, a large product scene, industry chooser, dark filmed testimonials/resources/CTA, and a broad directory footer.

## Measured desktop geometry

Reference viewport: 1440 × 1000. Full source capture: 1440 × 11221. Header is fixed at y0, height72px. Hero extends from y0 to980px and includes its header offset. The desktop rail edges are x48 and1392; central hero split is x720. Left copy begins approximately x91, title top y282; the title is about460px wide. Left body begins y552; actions begin y688; marketplace line begins y759. Right settled decision summary starts x825 y143, width464px. Escalation card starts x772 y557, width570px. These card positions represent one animation state.

The screenshot has a cookie notice at x24 y853 (approximately380×124px); this is a capture overlay, not part of the design system or reusable hero. Do not reproduce cookie consent unless its purpose is implemented.

Source section coordinates (fractional values from DOM at capture time):

| Section | Top | Height |
|---|---:|---:|
| dms-header is-dark | 0.00px | 72.00px |
| dms-section dms-hero dms-hero--rails hm-railed cxh2-hero | 0.00px | 980.00px |
| dms-section dms-section--dark dms-trust hm-trust--rails hm-railed | 980.00px | 231.38px |
| decision | 1212.38px | 1839.69px |
| how | 3053.06px | 1844.61px |
| doors | 4898.67px | 776.62px |
| products | 5676.30px | 1261.95px |
| industries | 6939.25px | 1049.45px |
| proof | 7989.70px | 792.39px |
| dms-section dms-section--dark hm-resources-section hm-resources--dark hm-railed | 8783.09px | 795.28px |
| demo | 9579.38px | 636.47px |
| sft | 10215.84px | 1005.06px |

Thin hatch/rail separators between principal sections are1px high in this capture. The underlying spacing family is a4px scale (4,8,12,16,20,24,32,40,48,64,80px). Source base has max-width1440px and homepage rails use their own48px outer inset at this viewport. Use source section-specific rhythm rather than applying one repeated padding value.

## Fonts and palette

Font names are source CSS/DOM observations, not visual guesses: IBM Plex Sans for display, Inter for body/navigation, and JetBrains Mono for technical metadata. Geist is also loaded globally but is not the measured headline/body family. Exact files are in the captured asset manifest. The H1 source rule is `clamp(2.5rem,3.9vw,3.75rem)` (56.16px at1440px), line-height1.07; computed source tracking is−3.6504px. Base H1 weight500 is overridden where more specific source selectors apply; preserve cascade when measuring. H2 source computed tracking in capture is−1.84px.

| Role | Observed source value |
|---|---|
| Homepage charcoal | #1f2126 |
| Light alternate surface | #f6f7f8 |
| Light ink | #17191f |
| Supporting light-surface text | #606773 |
| Primary blue | #005bb7 |
| Hover blue | #004793 |
| Pale blue | #f0f6ff |
| Dark primary text | #f7f8fa |
| Dark supporting text | #b9bec8 |
| Light rules | #e4e7eb / #d8dce1 |
| Dark rail | white at12% |

Blue accent text varies by surface; the hero uses a lighter blue near#70aeff. Status green, amber and red exist only for meaningful record states. Preserve the source grain and gradients where present; they are observed reference elements.

## Responsive evidence

Mobile source captured at390×844, full raster390×12640. The hero changes to one column with copy first and the decision scene beneath it. Desktop navigation becomes compact. Three entry cards become a vertical stack, the how-it-works rows become text then scene, and the industry grid becomes stacked cards. Desktop rails narrow to about10px outer edge in the screenshot; inner copy uses roughly16px. Source CSS has mobile hero size `clamp(2.6rem,11.6vw,2.9rem)` (45.24px at390). Preserve these observed source responsive rules; any further rewriting of dense product internals must be recorded as adaptation.

## Source uncertainty and capture limits

- Full screenshot contains reveal-hidden content: product section heading area is blank; lower resources/closing content is partly hidden; multiple customer thumbnails are unloaded. This is a capture timing/viewport-trigger limitation, not intended whitespace evidence. Parent notified immediately. A reveal-complete recapture or explicit local settled-state presentation is needed before visual QA.
- The hero scene is animated and may show other cards, stages and positions. A static reproduction can match only the chosen settled state.
- Cookie overlay is visible in the screenshot. It should be excluded from aligned hero comparison or disclosed as a difference.
- The page includes interactive tabs, product scenes, reels, menu panels and booking behavior. This analysis inspects their captured state, not all states. No backstage workflows or live demo integrations are recovered.
- Desktop/mobile screenshots and CSS establish a specific observed revision; they do not establish pixel identity with every live visit or animation frame.

## Protected character for implementation and art direction

Keep the dark split hero, industrial rails, IBM Plex display, narrow technical labels and quiet source palette. Give text and workflow evidence distinct planes. Keep feature explanations as broad ruled rows; avoid turning the whole page into repeated floating cards. Product records should retain readable status, owner and evidence hierarchy. Only interactive controls should receive focus/hover affordances. Source content/brand/media remain attributed to Unifize. No original extension is required by this intake.
