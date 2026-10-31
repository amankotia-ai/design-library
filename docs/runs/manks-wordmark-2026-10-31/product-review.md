# Product contract: “of Manks” navbar signature

Reviewer: `/root/typography_product`, product design. Inspected the actual user reference at `/Users/abhishekmankotia/Desktop/Screenshot 2026-10-31 at 2.15.01 AM.png`, current `main.jsx`, `style.css`, `library-tokens.css`, and the run brief. Analysis only; final rendered revision is not yet reviewed.

- Keep one existing home link wrapping the mark, `Design Library`, and `of Manks`. The signature is part of the clickable brand, not a new interaction. The link must have an accessible name containing `Design Library of Manks`, with each phrase announced once. A text span provides this naturally; if the handwriting is an SVG or image, provide its text once using alt text or visually hidden text and hide decorative paths from assistive technology.
- Add a distinct `.brand-signature` sibling after `.brand-name`; do not place it inside the Serif span. Existing `.library-brand span` defaults make spans block-level and muted, so give the signature explicit inline/block behavior, red color, handwriting family or vector dimensions, weight, line-height, and spacing. Match the reference’s vivid red, irregular connected pen strokes, and slight forward slant. A substitute handwriting face is an approximation, not recovered lettering.
- Keep the existing Geist Serif wordmark and use only a subtle optical stroke if the parent chooses that treatment. Official Serif Regular has no next heavier released weight. Record this as an optical adjustment rather than an actual Medium font. Do not change headings or other Serif text.
- Preserve desktop alignment and the existing mobile navigation wrap. At 320px the library has 272px of content width after 24px side padding. The complete mark, gaps, Serif name, and signature must fit that budget; reduce signature size/gaps at the narrow breakpoint if required. Avoid shrinking all page typography or hiding the suffix. Keep the signature on the brand line when it fits, with no clipping or horizontal page scroll.
- Signature styling must not change keyboard focus visibility, home navigation, body/heading typography, or reference previews. Decorative slant should not enlarge the hit region beyond the usable header bounds.

## Review criteria

1. The navbar visibly reads `Design Library of Manks`, with the suffix in red handwriting and the Serif name subtly heavier.
2. Desktop and 390/320px captures show the complete signature without collisions or clipping; navigation remains readable and operable.
3. Keyboard focus covers the complete brand link, Enter returns home, and the accessible name announces both parts once.
4. Any chosen handwriting font is locally served with license/provenance; any drawn lettering is documented as an original interpretation of the reference.
5. Independent QA reviews the delivered revision and records its hashes. This contract does not count as final QA.
