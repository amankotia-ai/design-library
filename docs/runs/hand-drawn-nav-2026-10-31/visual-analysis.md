# Selected navigation stroke: visual contract

Reviewer: `/root/typography_visual`. Inspected actual user screenshot `Screenshot 2026-10-31 at 2.50.18 AM.png` and actual `pilot/public/assets/of-manks-signature.png` in the image viewer.

## Actual reference observations

- The supplied navigation image has three labels, with “Pages” selected in dark ink. Its current straight black underline approximately follows the word width and sits close beneath the text; the correction should replace this marker without changing the label's spacing or baseline.
- The existing red signature uses thick connected pen lettering with rounded ends, gently varying pressure, a rightward energy, and small natural edge irregularities. It is smooth enough to read as handwriting, rather than a scratchy brush, zigzag, decorative flourish, or rough distressed texture.
- Use the parent's measured dominant opaque signature ink `#f60f30` as the shared UI red. It is more appropriate to match the installed logo than the earlier screenshot's median compressed red.

## Stroke contract

- One continuous near-horizontal mark, with a shallow asymmetric bend or drift of approximately 0.5–0.8px vertically at actual UI size. Avoid a repeated sine wave, double underline, long swash, or dramatic upward angle.
- Visible thickness around 1.8–2.3px for this compact navigation. Keep the center slightly fuller and taper the first/last 5–10% subtly; the visual should recall a single quick pen movement rather than a uniform CSS border.
- Length approximately 100% of the selected label's ink width, with up to 1px overshoot per side if needed. This retains the reference's compact indicator rather than introducing a broad highlight bar.
- Keep around 4–6px clear distance from the label's baseline/body to the highest edge of the stroke; check the “g” descender in “Design Systems” so the line does not collide with it. A consistently reserved line box/offset is preferable to per-label positioning.
- Use a simple code-native SVG path or filled narrow silhouette. Keep overall height ~4–5px so its small irregularity has room, but judge the rendered visible ink, not the SVG viewport. Preserve any border-box dimensions and prevent layout movement on active-state changes.
- Match `#f60f30` flat ink at full opacity. No gradients, glow, shadow, animation, or added texture are warranted at this scale.

## Review limits

This is original UI expansion using the installed signature's visual character; the reference screenshot does not show a recovered red hand-drawn marker. Review each label selected at desktop and mobile, including the longest label, preserve native `aria-current`, and check keyboard focus independently of the decorative stroke. This analysis does not claim final-revision QA.
