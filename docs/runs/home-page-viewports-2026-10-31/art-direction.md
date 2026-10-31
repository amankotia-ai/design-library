# Live page viewport art direction

Reviewer: /root/cleanup_art_direction. Inspected the actual user crop `Screenshot 2026-10-31 at 1.53.40 AM.png`, current `pilot/src/system-browser.jsx` / `system-browser.css`, this run's brief and visual/product analysis. This is direction before implementation, not a delivered-output review.

The supplied crop has preview artwork meeting the outer card edges, so the page and its container are hard to distinguish. Retain the outer card and place each actual assembled page inside a quiet inset viewport. The page must have visible neutral surround on every side, including above and below.

Use the existing `--library-wash` as the stage fill, 16px stage padding, and a 1.4 stage aspect ratio. Center a width-100%, 16:10 viewport in that space; use a 1px `--library-rule` border, 6px radius, white background, and only a small shadow (`0 1px 2px #0000000d`). Clip the inset viewport at its own radius and retain the outer card's existing border/radius and lower preview/body divider. The wash, border and slight depth together give sufficient frame/content distinction without browser decoration.

Display each correct assembled page from its top at the same fixed 1440×900 desktop layout, scaled to fit its inset. Keep document content scrollable inside this bounded window; do not expand the card to full-page height. Preserve the neutral surround as an easy outer-page scroll surface. Retain the current three-column/stacked grid, homepage header gap, heading, card metadata, palette and actions. No new toolbar, address, dots, captions, labels, or ornaments.

Use the same 16px surround on mobile for a stable visual contract. At tablet widths the inset will be small, so preserve the existing title and Explore actions as the comfortable entry points. Verify all three current desktop/mobile frames rather than relying on the old raster output: correct page top, consistent scale, all-sided surround, stable geometry, bounded independent scroll, and no outer overflow.
