# Visual analysis — library navigation

Analyst: `/root/visual_analysis`. Mode: original system expansion, not source reproduction. Inspected the actual supplied navigation crop and `before-desktop.png` (1440 × 1000), plus the running copy's `system-browser.css`, `style.css`, and `library-tokens.css`.

## Observed baseline

- Desktop content begins at x152 and ends at x1288: 1136px usable inside the existing 1184px wrapper with 24px inner padding.
- Header begins at y32. The mark is 36px square; the brand uses 28px type and 36px line-height. Its red handwritten signature is present in the rendered baseline and should survive.
- Navigation sits at the right edge near y51. CSS confirms 13px type, 20px line-height, 18px gaps; the active link is dark ink, other links muted. The user crop confirms the four current labels, but its magnification is not a source-size measurement of the app.
- Catalogue heading starts around y171; cards start at y214. Heading is 18px in Geist Serif. Two existing system cards occupy the first two of three equal columns, leaving the final column empty. Each card is about 363px wide, with 24px gap and 12px corners.
- System cards use real scaled page previews in tall 9:10 frames, followed by category, system name, palette/type and a plain text action. Their dominant colour comes from the previewed system, not the neutral library shell.
- Library shell uses Geist Sans for navigation/controls and Geist Serif Regular for headings. Neutral theme is separately defined in `library-tokens.css`; preview documents own their system fonts and colours.

## Guidance for the approved change

1. Keep this shell, logo/signature, type pairing, palette and card language. Replace the four unclear navigation labels with the approved three, using the existing active-link treatment.
2. Sections and Pages should present actual component/page imagery; retain the preview's own composition and typography. A section preview should show the selected section rather than a generic whole-page crop.
3. Use the existing content edges, 24px catalogue gaps, plain labels and native selection control style for filters. Filters should sit beside the catalogue they affect.
4. The longer Design Systems label still fits desktop's available header width. On small screens, let navigation wrap onto its own row, with sufficient space for all three labels; do not shrink them to fit beside the logo.
5. Preserve source versus original/adaptation labels within item details. The navigation reorganisation does not establish newly recovered fonts, assets, behaviour or fidelity.
6. Keep inner reference-section CSS and tokens unchanged. The screenshot checks for this task should cover the new library shell at desktop and mobile widths; existing source-sized fidelity claims remain outside this change.

No unavailable assets were needed for this navigation pass. The handwritten signature is observed in the rendered baseline; this note does not identify its original font or provenance.
