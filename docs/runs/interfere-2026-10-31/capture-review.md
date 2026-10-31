# Recreation capture and source comparison

Actual analyst `/root/visual_analysis`, 31 October2026. This is a source comparison by the analyst, not the independent QA pass. Captured output is identified by the REA evidence ID below and the captured screenshot files; subsequent relevant edits require affected captures/reviews to be refreshed. A source hash inventory was attempted but its filesystem reads stalled, so no hash result is asserted here.

## Capture method and outputs

The existing isolated CDP9341 Chromium was used through a new localhost target; the source target and older Steel target were preserved. The user explicitly requested REA. Actual REA `capture-web-screenshot` was run against the recreated page with1440×900 viewport and dark preference. Full wrapper: `rea-recreated-desktop.json`, evidence `ev_7fe85bc442c23305bb60596ddd122a35d85e829b6c486153537bcae67cd72800`.

Supplementary CDP captures, with fonts and images ready and reduced motion enabled: `recreated-desktop-top.png`1440×900; `recreated-desktop-full.png`1440×7286; `recreated-mobile-top.png`390×844; `recreated-mobile-full.png`390×9089. Source and recreated geometry JSON preserve actual `innerWidth`/`innerHeight`, so screen sizing is measured rather than assumed. `capture-metrics.json` retains page and section dimensions and image load results.

Eleven separate1440×900 section thumbnails were captured from actual `/interfere/<id>.html` routes: header, hero, trust, overview, testimonial, monitoring, triage, resolution, security, releases and footer. They are saved in `pilot/public/previews/interfere/` and duplicated into `/tmp/design-library-pilot-runtime/public/previews/interfere/`.

## Findings from inspected images

Desktop top, desktop full and mobile top recreation were visually inspected against source images. The hero's exact type wraps, margin, gradient ambience, product shell, dense columns and dark surface hierarchy are retained. At both viewports, all14 visible heading bounds match source within0.01px. Desktop page height7286px and mobile9089px match source; neither viewport has document-level horizontal overflow. All measured `<img>` assets load. Details are in `geometry-comparison.json`.

Visible deliberate differences: application avatar photographs are replaced by initials; mobile menu icon differs slightly from the two-line source icon. Testimonial text is fully visible in the reconstruction; the earlier source full-page screenshot captured only an intermediate text reveal. Partner strip horizontal position also differs by animation time. These frame/state differences must not be presented as pixel identity. Visual measurements establish representative geometry, not service behavior or interaction correctness. Source navigation, keyboard and library catalog behavior need independent QA.
