# Navbar/content alignment correction

Visual analyst: `/root/visual_analysis`.
Scope: bounded correction to library shell gutter; no source-preview or card-design change.
Inspected: current runtime `src/library-tokens.css`, `style.css`, `system-browser.css`. Current browser edge measurements were independently supplied by parent and are attributed as such, not claimed as my screenshot capture.

## Evidence and cause

Current root tokens specify `--library-header-inset:24px` and `--library-page-gutter:32px`. Mobile changes header inset to16px but independently changes page gutter to24px. Consequently the content is8px narrower on both edges at both breakpoints. Parent measured1440px: brand left24, navbar right1416, gallery left32, gallery right1408. The earlier32px navbar assumption has been superseded by current runtime evidence.

## Correction contract

Set `--library-page-gutter:var(--library-header-inset)` once in the root tokens. Remove the independent mobile page-gutter value, letting the alias resolve to the current16px header inset. Preserve the full-width reading-column wrapper and use its existing page-gutter consumption. Do not change header spacing to match an obsolete content value.

Expected geometry: at1440px, content spans24–1416. At390px, content spans16–374. Existing preview containers, metadata alignment and grid gaps remain intact. The shared variable ensures subsequent header inset changes also update content alignment.

Review actual delivered desktop and mobile screenshots plus bounding rectangles after the correction. Require zero horizontal document overflow and matching brand/content left and navbar/content right edges on collection routes. Embedded source documents remain unaffected.
