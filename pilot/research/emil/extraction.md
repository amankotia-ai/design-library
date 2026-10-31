# Emil article reference extraction

Reference: https://emilkowal.ski/ui/you-dont-need-animations
Captured: 2026-10-30. Mode: adapt the reading layout to the Design Library browser; preserve the editorial section components.

REA used the existing checkout at `/Users/abhishekmankotia/Documents/ChatGPT/Panorama/rea-reference`, origin `https://github.com/morluto/rea.git`, revision `fb28ec1537e2d02aaca96325483c849c5c8ade6f`. No setup or cross-project modifications were made. CLI ran with bundled Node24.19.0 against a dedicated headless Chromium instance at loopback CDP9333.

Commands: `list-browser-targets`, `inspect-web-page --observation-ms 1000 --include-accessibility-text`, and `capture-web-screenshot`. Full Evidence wrappers are retained in `rea-targets.json`, `rea-inspection.json`, and `rea-screenshot.json`. `rea-reference.png` is decoded directly from REA's screenshot artifact.

REA inspection evidence: `ev_c1980d7a349f8068dd018e5c124b6615004c3a8abece285ff48f11e94613ad89`.
REA screenshot evidence: `ev_2e1c03a310e9a4dc7c4b04a59ddd830f163d13ea588a8a01e62854214c31d4f0`.

REA supplied passive page structure, accessibility, resource metadata, and the observed screenshot. The complementary `computed-styles.json` was extracted using a separate read-only browser evaluation; it is not a REA result. This distinction is intentional because REA's passive DOM capture does not expose arbitrary computed CSS values.

Measured implementation inputs:644px column (x398 at1440),16px text/26.4px line-height,26px prose gap,#fdfdfc background,#21201c prose ink,16px/24px modest section headings,128px masthead-to-content gap,~12px demo radius. The source's font is exposed as a custom `Sans` alias. LibrarySans uses existing OFL Inter as an explicit substitute. The source's private font file was not copied. Mobile geometry is authored adaptation.

The source article copy, author identity, advertisements, and animation demos are not reproduced. The new text describes this library and its actual pilot. No animation was introduced.

REA limitations: capture is bounded to the page origin and attach window; scripts/storage/body data not selected remain policy filtered. The inspected screenshot and DOM do not establish original application source or unseen behavior.
