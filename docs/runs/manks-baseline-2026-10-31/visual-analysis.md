# Wordmark baseline and spacing assessment

Reviewer: `/root/typography_visual`. Inspected actual `manks-signature-scale-2026-10-31/brand-1440.png`, `brand-390.png`, and `brand-320.png`.

- The red script reads slightly high against the serif lowercase body. Judge its baseline from the connected “Manks” body rather than the “f” descender or capital M ascender; those naturally cross the writing line.
- A 2px downward correction at desktop and 1px at mobile is proportionate to the actual optical mismatch. The supplied measurements support this: serif baselines 61/49.5/48px versus estimated script body baselines 59/49/47px.
- The current gap makes the final serif “y” and the red “of” feel crowded because both have projecting strokes. Increasing the post-name gap from 8px to 12px desktop and 10px mobile adds a clearer pause without disconnecting the coauthor signature.
- Preserve the existing enlarged signature dimensions, red and drawing. Align the actual ink; do not force the image box's bottom to the type baseline.
- The narrow 320px layout is close to its width limit. The proposed 2px extra gap nominally fits the measured 2.34px reserve, leaving only ~0.34px. Confirm no clipping/scroll overflow in a fresh actual 320px render and preserve its 24px outer gutter; tiny narrow-only fit adjustment is preferable to compromising the requested desktop gap.

This assesses the pre-correction crops and proposed correction. Independent QA must inspect the delivered CSS revision.
