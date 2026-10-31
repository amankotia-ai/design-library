# Signature scale assessment

Reviewer: `/root/typography_visual`. Inspected the user's actual `Screenshot 2026-10-31 at 2.21.03 AM.png` and the prior `manks-wordmark-2026-10-31/brand-1440.png` image.

- The reference screenshot and prior crop show the same relationship: the red signature has a visibly smaller letter body than the black serif name. Its tall ascenders approach the serif height, but the lowercase ink is lighter and shorter, so its overall optical weight is weaker.
- Increasing only the existing signature artwork is the appropriate focused correction. Keep its aspect ratio, red, connected pen lettering, and separation from the serif name. Do not compensate by stretching, adding stroke weight, or changing the black wordmark.
- Desktop 88×32 → 104×38 is an approximately 18% scale increase; mobile 82×30 → 96×35 is approximately 17%. Both are proportionate to the requested “slightly” larger relationship and should make the script's lowercase body read closer to the main name.
- The narrow 320px adaptation 76×28 → 88×32 increases about 16% while reserving more horizontal space. Inspect the complete logo against its actual container, because the two text components cannot wrap internally.
- Use the updated rendered brand crops for final assessment: the signature should look like an attached coauthor mark of comparable visual presence while remaining legible, with no collision or viewport overflow. Baseline/vertical alignment should be checked optically after scale changes; the image's transparent box is not the ink bounds.

This is the pre-change visual assessment. Delivered-revision QA is a separate pass.
