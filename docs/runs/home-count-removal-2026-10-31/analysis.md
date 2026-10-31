# Homepage count removal

Reviewer: /root/cleanup_analysis, combined visual/product/art direction pass for a single explicit deletion. Inspected the actual user attachment `Screenshot 2026-10-31 at 1.48.20 AM.png` with view_image and current `pilot/src/system-browser.jsx`.

The attachment isolates only “2 visual languages · 3 collections,” matching the span inside `.catalog-heading`. Remove that span and its now-unused local `visualLanguageCount` import and span-only styling. Keep the “Design systems” H1, all three cards and their metadata/actions, and the newly increased header separation.

Acceptance: count text and its empty wrapper are absent from homepage DOM at desktop/mobile; one H1 remains; cards and heading keep their existing positions and spacing, allowing only removal of the secondary count line's own footprint on narrow screens. No changes to system registry counts or other pages.
