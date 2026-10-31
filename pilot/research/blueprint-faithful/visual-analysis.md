# Blueprint full-page visual analysis

Analyst: /root/full_visual · 30 October 2026. Mode: faithful source reproduction; no original-system expansion is assessed here.

## Actual inspection and evidence quality

I inspected the initial actual1440×8534 desktop and390×11909 mobile image files with the image tool. Most lower content in those initial captures was blank because the source had not completed reveal/lazy states. That blank space is not a valid reproduction target. I reported this and the separately truncated200011-character global DOM HTML to the implementation owner.

I then inspected the refreshed, visible desktop image at /tmp/blueprint-faithful-intake/source-desktop.jpg, SHA-256 7f659d6324f3d53678d842302d90a6c5bda0b350234bbb923452fb04add197c6. I additionally generated and actually inspected full-resolution desktop crops: hero-editor.png (y0,h1400), gallery-compare.png (y1500,h1800), features.png (y3350,h1550), pricing.png (y5070,h1180), and faq-final.png (y6400,h1800), all in that temporary intake directory. These are crops of the source screenshot, not generated interpretations. The parent owns copying retained reference files into the project.

Read evidence: metrics-desktop.json, metrics-mobile.json, public source CSS from the asset bundle, complete per-section HTML in sections.json, and asset-bundle.json. CSS establishes precise declared values; screenshot observations establish the visible composition. The global source.html ends with [Truncated] midway through comparison markup and cannot establish the rest of the page; use per-section captures instead.

**Mobile visual limit:** the original mobile full capture I inspected was largely unrevealed. Its hero/editor envelope and footer were visible, but it cannot certify full lower-page appearance. The mobile dimensions below come from actually observed DOM metrics and source CSS, not invented visual recovery. A fresh settled mobile image still needs inspection before a full mobile visual pass.

## Shared protected inputs

- Exact source family is Geist, with Geist Mono for metadata and miniature illustrations. Public font files were recovered:605ce01b664af129-s.p.0wgildi0cnwt9.woff2 (Geist) and07a39a8a4660cc7c-s.p.0r6juujl39pe6.woff2 (Geist Mono). Inter is not an acceptable1:1 substitute now that these files are available.
- Source body is13px Geist with normal line-height; .landing sets14px and retains normal line-height. The existing library body16px/1.65 must not leak into the source view. Preserve explicit line heights on headings/body subcopy and default normal where source uses it.
- Source light tokens: blue#104bff, logo tile#4976ff, background#f7f7f8, panel#fff, raised/stage#f2f2f4, shell/pricing band#eeeff1, main text#18181b, secondary#3f3f46, muted#5f5f68, faint#71717a, rule#e4e4e7.
- Desktop outer wrap1200px with24px padding: visible content x144..1296 at1440px. Main rhythm is256px gap/128px section padding. Blue surfaces use12px page inset and28px radius. Grid is32px, subtle white5% lines; the hero has the actual radial fading overlay.
- Mobile at390px uses16px wrap padding,8px blue inset,20px radius. At≤900px the gap becomes184px and section padding92px. Preserve the source breakpoints at1080,900,and600px rather than transplanting Signal Workshop's different rules.
- Source logo is the actual wide inline SVG wordmark, including bracket tile and path lettering. The recovered inline SVG is available; no glyph/text approximation is justified.

## Desktop source geometry

Measurements are CSS px from1440×900 source viewport, document height8534. Sticky header's captured DOM y6248 reflects scroll state; its normal-flow position is top0 and height60. Fractional coordinates should be preserved through CSS, with rounding within1px at image boundaries.

| Region | Document y | Height | Protected structure |
| --- | ---: | ---: | --- |
| Navigation | 0 | 60 | Logo, Examples/Tools/Features/Pricing/FAQ, Sign in,32px Start free |
| Hero | 60 | 527.148 | Launch pill, centered two-line heading, lede, paired CTAs, free-credit note |
| Showcase including examples | 587.148 | 1711.078 | Editor device followed by256px pause, example heading/rail and Try it free |
| Comparison blue band | 2298.227 | 974.758 | White heading, subcopy, prompt card plus Claude/Blueprint video cards, CTA |
| Features | 3272.984 | 1708.945 | Section heading/subcopy, seven-card illustration mosaic, CTA |
| Pricing | 4981.930 | 1341.953 | Gray band, yearly/monthly control,3plans,free row,facts/comparison control |
| FAQ | 6323.883 | 1241 | White band, one-third title/two-thirds16closed question rows |
| Closing prompt | 7564.883 | 618.5 | Inset halftone blue background, centered prompt card and input |
| Footer | 8183.383 | ~350.617 | Actual .sf footer, brand/status left,three link groups right,copyright rule |

### Hero and editor

The headline box is x270,y189.398,w900,h148.953; type50076px/74.48px with source tracking-.045em and22px bottom margin. Lede is18px/1.55,max600; source buttons42px high, main min-width232,10px gap. Header nav13px, wordmark26px high. Offer pill is near y132.

The showcase8px top padding puts the device at y595.148 for the measured current page, rather than assuming the older594px crop is an exact new-page boundary. Editor outer width1152,height746:40px device bar,700px inner window at900px viewport,6px bottom pad. White rounded device has a light URL capsule and three small gray dots. Inner shell is pale gray, with left chat and right controls. Main desktop column contract is290px / flexible stage /290px; side panels remain distinct white surfaces, not a single generic control card. Artboard is yellow/black,4:5, with pause/format/export bar below it. Recovered live source tool may change pattern frame; geometry and initial settings must be compared separately from animation pixels.

### Examples and comparison

Examples heading top1597.148; type44px/46.2px,max640. Body subcopy16px/25.6px. Example cards are272px wide with12px gaps,14px shell radii,6px inset,4:3 media,9px media radius, title/caption and30px Open/Remix actions. Rail is full viewport width with content inset144px and edge fades;36px circular arrows sit above its right edge. The refreshed screenshot has a partially visible Circuit card at left, indicating a nonzero rail position. Source/local rail scrollLeft must be normalized together for a meaningful comparison.

Comparison is blue with the exact32px grid, x12,w1416,r28. Heading uses44px/46.2px and wraps after One in the measured640px box. Row has ratios .82:1:1,12px gap. Prompt panel is translucent blue; two white16px-radius cards show actual source comparison media at16:10 plus three ruled benefit rows. Public poster assets are available; video URLs are /compare/claude-opart.webm/mp4 and /compare/blueprint-opart.webm/mp4. Animated frames cannot be judged with an arbitrary full-page pixel-difference score.

### Feature mosaic

The actual screenshot shows seven source illustrations, not abstract icons or generic panels. Desktop three-column grid has12px gaps; row1 delivery/sharing spans2 columns and background-generation occupies1; row2 controls,export,canvas are3single columns; row3 image-reference occupies1 and versions spans2. White cards14px radius,8px inner padding,248px-high illustration surfaces with9px radius,15px headings and14px body copy. Preserve the exact mini UI, SVG outlines, recovered image crops and source type treatment. Each illustration has its own loop/state; compare a declared state or tolerate only the animated interior region while keeping shell geometry fixed.

The protected illustration subjects are: sharing/public-link/password/client tool; background tab/server generation; contour presets/control rail; ASCII export/recording; multi-format pixel-art frames; image-reference prompt; and cross-stitch version history. Closing source labels and Client portal coming soon are part of the source card content.

### Pricing, FAQ, closing prompt and footer

Pricing heading max640,44px/46.2px. Control has5px outer padding and32px desktop options. Plans are3equal columns with12px gaps,16px radii,28px padding. Studio has the recommended badge and raised fill. Source yearly state displays15.83/40.83/115.83 monthly equivalents; source per-year bills/credits and feature rows must remain attributed captured content. Prices44px/1 with tabular numerals; labels16px. Free row and facts row span all columns. Compare-all-plans is a36px control; expanded table is another required state, not shown in baseline capture.

FAQ uses column ratio1:2 with56px gap. Title44px/46.2px, body question16px, each summary20px vertical padding and12px plus glyph. All16rows are present in the actual capture. Preserve exact question order and answer text; do not reduce it to Signal Workshop's four questions. Native details/summary affordances and open-state geometry need separate behavior evidence.

Closing prompt is not a plain blue footer. The source has a dense blue-on-blue halftone canvas around a solid blue central card. Final stage88px vertical/24px horizontal padding; max720px content card,48px/40px/40px padding,20px radius and12px blue outline. Heading56px/56px; white input box max600,16px radius,36px circular send button. The captured example sentence is animated and visibly partial; choose and document a stable initial sentence rather than treating a half-typed frame as canonical copy.

Actual footer class is .sf and its stylesheet is1aep2ggrdsqqz.css. Do not apply the unused .l-foot legacy block from the landing sheet as if it were the observed footer. The screenshot has source SVG brand and tagline/status on left, Product/Help/Legal groups on right, then a full-width rule and copyright. Status can change remotely and is a snapshot state, not a reconstruction service-health guarantee.

## Observed mobile contract

At390×844 source viewport, document height11910 (captured image11909 due fractional rounding). Region y/height pairs: hero60/508.375; showcase568.375/1718;comparison2286.375/1590.016;features3876.391/3242.773;pricing7119.164/2576.938;FAQ9696.102/1273.5;closing10969.602/489;footer11458.602/451.

Source CSS hides desktop nav≤900, makes comparison/plans single-column, and makes FAQ one-column with32px gap. Feature grid becomes2columns≤1080 and1column≤600, visual surfaces232px high; wide spans reset. Hero≤600 has56px top/44px bottom padding,40px minimum headline,16px lede,stacked full-width CTAs. Editor becomes a grid of48px header/share row,stage,tabs44px,sheet240px,andcomposer; it is not the two-column desktop rail merely squeezed to390px. Source stage height is min(56svh,104vw); controls/chat/presets switch in the same sheet region. Mobile gallery cards are min(64%,240px) with16px rail inset,28px fade. Pricing options become44px tall with stacked subtitle text; plan padding22px. Final card is calc(100%-32px) with32px/18px/22px padding and18px radius. Footer stacks under its own .sf rules.

## Asset and state accounting

Actual exported bundle contains125files:4fonts,12stylesheets,18file-images,and91inlineSVGs. Native asset inventory initially omitted5blob carousel previews and0videos were exported. Parent subsequently recovered all5blob images via locator.downloadMedia and saved public/blueprint-source/gallery-0..4.png; gallery-files.json records them. This resolves the initial thumbnail gap. Video acquisition remains a parent-owned task; no claim of unavailable originals is justified before trying the observed public URLs.

Source reveal CSS uses data-rv=wait→in. Editor data-phase=pre/done controls opacity and panel entrances. Full-page captures must be made after all regions are visible, without reloading to top and resetting reveal state. Preserve source behavior or deliberately freeze it for measurement; do not turn the blank wait state into a static reconstructed page. Source animation regions, gallery scroll position, billing period, open FAQ rows and comparison-table state need declared capture state for aligned review.

## Acceptance gates for the faithful build

Use1440×900 and390×844 source-sized captures. Before subjective review, require exact heading wraps, source font files, section order, all seven illustrations and16FAQ rows, correct logo and source content. Static major edges and section y positions should match within1CSSpx rounding; a larger discrepancy needs an explained source state or correction. Reconstructed controls should preserve source dimensions and visible state, not merely expose equivalent features. Compare static geometry independently from moving pattern/video/halftone/mini-illustration pixels. All assets and substitutes must be enumerated; a reused bitmap crop is not recovered application code. This document is a visual intake and measured contract, not an implementation or final QA pass.
