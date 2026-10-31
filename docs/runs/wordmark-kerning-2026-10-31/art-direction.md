# Wordmark kerning: art direction

Reviewer: `/root/typography_art`. Inspected actual `native-comparison.png`, `before-name-2x.png`, final `name-1440-2x.png`, the three final 2× brand crops, visual/product reports, and source. Also inspected fresh live brand captures at device scale 1 for 1440/390/320px, so the judgment includes actual navbar sizes rather than enlargement alone.

## Visible result

- Removing the blanket compression improves the rhythm through both words. The final wordmark reads as continuous typesetting while retaining enough separation between the small lowercase forms.
- De/es: the adjacent rounded forms are evenly paced without excessive white. si/ig: the i reads independently rather than being squeezed between the neighboring curves. gn remains a close, characteristic ear/serif relationship but is less dense than the earlier tracked result; it does not create an apparent extra letter at normal size.
- The natural word break is clear and proportionate to the internal spacing. Li/ib remain coherent despite the different upper/lower negative spaces. br has enough clearance to separate the b shoulder and r. ra/ar preserve the r overhang rather than becoming mechanically equal gaps. The slightly tightened ry keeps the ending attached without a collision.
- The optical weight and glyph shapes remain consistent with the preceding Geist Serif wordmark. No segment appears separately scaled, raised, lowered, or heavier than its neighbors.
- The red signature retains its established baseline, enlarged size, and close clear gap. All three complete lockups remain visually balanced. The 21.5px narrow wordmark is a small fitting adaptation and still reads clearly in the 320px live capture.

## Status and revision

No blocking art-direction finding in the inspected result. No further pair changes requested. This approves the visual spacing; independent QA must separately confirm the live-text/accessibility and exact layout measurements.

- `brand-wordmark.jsx` SHA-256: `546d8a511c3894c2009167c32c1402079487b5b5808694bc4cdf5623372d61eb`.
- `library-tokens.css` SHA-256: `6386c4040366c61be2ebf969c53b1d0a603258c91a4577be0f9cc106fad7eb1b`.
