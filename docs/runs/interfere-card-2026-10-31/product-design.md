# Interfere card product design

Reviewer: /root/product_design. Inspected actual user screenshot `Screenshot 2026-10-31 at 4.01.36 AM.png` (3024 × 1964) and current `/tmp/design-library-pilot-runtime/src/system-preview.jsx`, `system-preview.css`, `system-preview-tokens.css`, and `system-browser.css`. Scope: Interfere design-system specimen only.

## What the card must communicate

The preview is a static specimen of typography, neutral palette, and issue-oriented components. The external card title remains its navigation link. Keep one `role="img"` and one useful accessible label on the preview; mark the decorative internal specimen `aria-hidden="true"`. Add no functional links, tabs, buttons, or focus targets inside the image role. Static labels should not suggest a usable app surface.

## Observed issue and concrete layout

The screenshot shows the issue receipt ending well above the bottom edge, with a substantial unused dark strip below it. The current `padding:24px`, `gap:20px`, `Aa:72px`, phrase `22px`, palette `10px`, and issue text `10–13px` remain fixed while the preview itself changes size. This makes the specimen's density vary between columns and leaves it weaker than the adjacent scaled specimen.

Retain the shared 9:10 card ratio. Use an internal full-height grid with `grid-template-rows:1fr auto auto`, about `6.5cqw` padding and `4cqw` major gaps. The upper row should contain a Typography/Inter heading, Aa plus a small alphabet/numerals specimen on the same baseline, and the two-line phrase. Use Aa around 24–25cqw, the phrase around 5.6–6cqw, labels around 2.8cqw, and utility/numeric content around 2.6–3cqw. The middle row contains labeled equal-width palette samples, using the existing exact four neutral colors. The final row is the issue receipt, anchored at the lower inset instead of leaving empty space after it.

Keep the receipt content bounded: event label and timestamp, one concise issue title, one status/priority line, and optionally a short second timeline event if the art direction requires evidence of progression. Do not add invented metrics, extra miniature controls, or filler text solely to consume space. Use a fine rule, small status dot, and restrained corner radius consistent with the actual Interfere language.

## Responsive contract

- Desktop: the existing three-column grid defines card width. Scale all internal type, gaps, swatches, and receipt spacing against that card's inline container size. Keep the same composition across cards.
- Tablet: retain the existing two-column grid at 701–900px. No Interfere-specific viewport breakpoint is needed: card-relative units grow with the card, preserving its proportions.
- Mobile: the existing one-column grid at 700px and below supplies more width. Preserve the same specimen hierarchy and lower anchoring; do not introduce extra sections. At 320px viewport, the two-line phrase and issue title must fit without horizontal clipping.

## Acceptance evidence

Capture the actual delivered Interfere card at desktop three columns, tablet two columns, and mobile one column. Confirm the lower receipt finishes near the same proportional bottom inset in all three; labels remain present; palette columns remain even; long issue text cannot overflow its container; the outer title link remains the only navigation target associated with the card. This report is a design recommendation and does not constitute independent QA of a future revision.
