# Emil article visual analysis

Analyst: real specialist `/root/emil_visual_analysis`, 2026-10-30. Inspected `reference-crop.png`, the full `reference-desktop.png`, and `computed-styles.json`, extracted from the live reference at `https://emilkowal.ski/ui/you-dont-need-animations`. This is visual analysis, not a final implementation review.

## Measured constraints

- Desktop capture viewport is 1440px wide. The article and author header share x=398 and width=644px, ending x=1042: a centered 644px reading column.
- Body background is `rgb(253,253,252)` / `#fdfdfc`. Body copy and headings use `rgb(33,32,28)` / `#21201c`. Quiet captions use `rgb(130,130,124)` / `#82827c`.
- The loaded font is exposed as `Sans, "Sans Fallback"`. Its underlying font identity/license has not been established by the supplied extraction. An available similar sans must remain a stated substitution; do not copy a font URL from the site without checking redistribution rights.
- Standard reading paragraphs are 16px with 26.4px line-height (1.65), normal letter-spacing, and 26px bottom margin. Lines carry about 75–85 characters in the reference, depending on wording.
- Header is a plain two-line identity block, 16px / 24px; it begins y=117 and is 40px high. Its bottom margin is 128px. First reading paragraph begins y=285. The name is darker, the role quieter. There is no oversized page title in the visible opening.
- Section headings are 16px / 24px, visually medium weight, with no display font or large scale jump. In the first section, heading top is y≈577, paragraph top y≈621 (20px gap after heading line). Whitespace establishes hierarchy.
- First media plane begins x398,y≈706, width644,height320. Rounded corners are visually about12px. It is inset within the same reading edges. The reference does not widen demos beyond the reading column.
- Media caption is centered,12px /16px, with16px top and32px bottom margin. Other demo captions follow the same quiet treatment.
- Subsequent interactive examples occupy white or faintly neutral rounded planes with a very light hairline border. Controls are small and local to the example; no persistent side rail or application dashboard frame surrounds the article.
- Top announcement is a distinct full-width faint band with its contents aligned to the reading column. It is specific promotional content, not a necessary structural feature of the library adaptation.

## Translation to Design Library

1. Replace the broad workbench and large marketing heading with one644px reading flow. Keep a small two-line Design Library identity and a long breathing gap before the introduction.
2. Present the pilot as an article with short prose, modest section headings, and working section previews inside rounded inset demonstration surfaces. All preview controls stay local to their demo.
3. Retain the underlying editorial study rendering, source media, provenance, original-extension labels, source-sized comparison, desktop/mobile options and working destinations. The new article chrome must not recolor or restyle the iframe content.
4. Keep Sources/System as quiet text navigation or article sections, not a large app navigation bar. Use restrained underlined text links for secondary actions.
5. At narrow widths, reduce outer margins and let the column be fluid while maintaining16px reading type. Do not shrink a644px article canvas into the viewport. Embedded desktop examples can scale independently and remain clearly labeled as previews.
6. No new motion is warranted by the visual reference request. Preserve immediate control feedback and visible keyboard focus.

## Limits

Only the supplied desktop capture and computed desktop geometry were inspected. Mobile layout values are an authored adaptation until separately observed. Demo corner radius is visually estimated because the supplied selector list captured the internal button rather than the rounded outer media wrapper. The source font family alias is observed, not an identified font. REA provenance is handled separately by the parent; these measurements came from the supplied actual browser extraction and images.
