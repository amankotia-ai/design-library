# Product design constraints

Reviewer: `/root/typography_product`. Role: product design. Inspected `before-desktop.png` (1440 × 1000), `before-mobile.png` (390px wide, full page), `main.jsx`, `system-browser.jsx`, `style.css`, `system-browser.css`, and relevant editorial/Blueprint component boundaries. This is an implementation contract, not a review of the final revision.

## Observed structure

- The library chrome has a `.library` root. Standalone source and adapted sections use separate roots; page previews are iframes. Scope the font change to `.library` to preserve their existing typography and provenance claims.
- The wordmark text is `.library-brand .brand-name`; the striped brand mark is an SVG image. Change the text font only.
- Home uses a three-column grid with two occupied cards at desktop and one column at mobile. Keep widths, preview aspect ratio, spacing, and content unchanged.
- The desktop navigation shares the wordmark row; the 390px screenshot has navigation on a second row. Keep that wrap behavior and check 320px as a narrow-width edge case.
- The System panel contains `.type-specimen`/`.source-specimen`; the Study panel has `.mini-specimen`. These demonstrate the displayed systems and must retain their system fonts even though they sit inside `.library`.
- `.system-switch select` has an explicit `LibrarySans` family. A change to parent inheritance alone will leave this control in the previous font. Buttons, selects, and inputs should use the library Sans token.

## Required typography behavior

- Use distinct shared tokens for Geist Serif and Geist Sans; do not repurpose the editorial `--serif` and `--sans` tokens.
- Library h1–h6 and navbar wordmark: actual Geist Serif Regular, weight 400. Existing heading and wordmark rules request 500, so override or replace those weights as well as their family. Serif currently has only Regular; do not fabricate bold.
- Body, metadata, navigation, labels, and controls: Geist Sans with genuine 400/500/700 weight support. A variable Sans file is suitable.
- Explicit `strong` and `b` emphasis: Geist Sans at 700, including when nested inside a Serif heading. Keep semantic markup intact. No current bold fixture is required in the product UI; a temporary DOM probe can verify this rule without introducing user-facing demo copy.
- Preserve type-specimen families and their weight/stretch, and do not change reference font descriptions to Geist Serif.

## Asset and loading contract

- Self-host official `geist@1.9.0` WOFF2 files and retain the included OFL license. Record package version and origin with the assets.
- Use `font-display: swap` and appropriate fallback stacks; font registration or CSS declaration alone does not prove the face rendered.
- Verify successful local font requests and actual rendered font names via browser font inspection (or equivalent), with loading settled before screenshots.

## Completion criteria

1. Home, Study, Sources, and System headings and wordmark use Geist Serif Regular; body/navigation/controls use Geist Sans.
2. Actual regular and bold Sans glyphs render without synthetic bold or missing-font requests.
3. At 1440, 390, and 320px, no new horizontal overflow, logo clipping, navigation overlap, card-text collisions, or hidden controls occurs.
4. Editorial specimens and iframe/standalone source studies keep their original fonts. Source reproductions remain source reproductions.
5. Independent QA inspects final source hashes and captures; pending analysis is never reported as a final pass.
