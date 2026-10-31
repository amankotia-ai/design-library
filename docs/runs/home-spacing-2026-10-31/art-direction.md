# Homepage spacing art direction

Reviewer: /root/cleanup_art_direction. Inspected the actual user screenshot `Screenshot 2026-10-31 at 1.47.29 AM.png`, current `pilot/src/system-browser.css`, and this run's visual/product analysis.

Agree with increasing only the homepage `.article-header` bottom margin: 48px to 96px above 700px, and 32px to 64px at the existing mobile breakpoint. The screenshot's collection area begins fairly close to the header; doubling that separation creates the requested breathing room while retaining the clean catalog. Move its heading, count, and cards together.

Keep the heading-to-grid 20px gap, preview proportions, card padding, grid gaps, brand position, and navigation unchanged. Do not restore removed copy or insert a spacer element. This is a spacing adjustment to the library shell, not a system redesign.

Review the delivered desktop/mobile captures for the added 48px/32px separation, unchanged card internals, and no overflow. This direction is pre-implementation guidance; final output review remains independent QA's responsibility.
