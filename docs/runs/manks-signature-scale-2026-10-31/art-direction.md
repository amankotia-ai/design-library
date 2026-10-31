# Signature scale correction: art review

Reviewer: `/root/typography_art`. Inspected the supplied 02:21 screenshot, previous `manks-wordmark-2026-10-31/brand-1440.png`, new brand crops at 1440/390/320px, the new full mobile render, and current CSS.

- The larger signature has visibly more presence than the prior crop and sits more evenly with the black name. The handwriting stays secondary in width while its ascenders now share more of the wordmark's vertical span.
- “of Manks” remains readable in all three new crops. The original red color and letterforms are unchanged.
- No overlap or collision appears between the black name and red signature, or between the name and striped mark. At 320px, the complete lockup remains one line without visible clipping.
- The proportional mobile reductions preserve the same balance rather than compressing or distorting the lettering. No additional art correction is required.

Status: no blocking art-direction finding for this scale correction. Reviewed `library-tokens.css` SHA-256: `40898bd7dd6de7db33e8fa761aed945db5279ef482bd2d861de3a8a6312adb97`. Independent QA remains responsible for final layout/overflow behavior.
