# Interfere system card — visual analysis

Analyst: actual specialist `/root/visual_analysis`. Bounded scope: the Interfere specimen card on Design Systems. Original system expansion; source homepage remains outside scope. Input screenshot `Screenshot 2026-10-31 at 4.01.36 AM.png` was opened and inspected at its supplied3024×1964 resolution (tool display resized1971×1280). Source files inspected: `/tmp/design-library-pilot-runtime/src/system-preview.jsx`, `system-preview.css`, `system-preview-tokens.css`. This is analysis, not independent QA or a source-page edit.

## Concrete findings

1. The Interfere card uses fixed24px padding,72px Aa,22px phrase and10–11px utility type. Neighboring specimens scale padding and type with container width. This is visible in the supplied screenshot: its Aa is markedly smaller than Steel's; content is compressed toward the top with an unassigned dark area below. The problem will change with grid width because fixed sizes do not retain composition ratios.
2. Steel and the earlier specimens have three clearly identified ingredient groups, Typography01 / Palette02 / Elements03. Interfere instead has a combined “Typography / Inter” label, an unlabeled divider/palette and a floating issue box. A viewer has less help comparing the same ingredients across systems.
3. The same dark card should keep its own character. The existing issue card gives it a useful product-specific subject, but its subdued arrow, generic status dot and short body do not demonstrate the dense, fine-rule application language seen in the source. It reads like one generic notification inside a specimen instead of a compact piece of the issue workspace.
4. Contrast in the card is restrained and appropriate to Interfere. The four neutral swatches, dark ground and white type are coherent. Adding a large decorative gradient, bright arbitrary accent or extra brand illustration would dilute this. Source hero ambient color belongs around a large product proof, not automatically in a small ingredients card.

## Scalable target geometry

Retain the9:10 aspect ratio and the existing library preview border. Use the same6.5cqw inset and4cqw group gap as neighboring specimens; this produces shared content axes while allowing Interfere's actual typography and issue content to distinguish it.

| Element | Target relative geometry | Reason |
| --- | --- | --- |
| Section labels |2.8cqw; label left,01/02/03 right | Equal comparison language with neighboring cards |
| Aa |24–25cqw,1.0 line height, InterVariable450–500 | Restore comparable letterform emphasis without inventing a different type style |
| Alphabet/numerals |3.2–3.6cqw; paired on right | Demonstrates Inter's small text as well as large forms; aligns with shared specimen structure |
| Phrase |6–7cqw,1.05–1.12 line height; two controlled lines | Keep “See the signal. / Understand the issue.” readable at each catalog width |
| Palette | Four equal columns;2cqw gap;6–8cqw swatch height;2.6cqw names | All four neutrals stay one coherent row instead of wrapping |
| Issue surface | Entire available inner width;1px fine rule;1.5–2cqw radius;2.5–3cqw inset | Looks like Interfere's contained product surfaces rather than a large soft generic card |
| Issue title |3.2–3.6cqw,500 | Primary object in the element sample |
| Issue metadata |2.5–2.8cqw | Readable status/time; can use a small timeline marker and a thin vertical connector |

Treat these as authored card targets, not measurements recovered from the homepage. The source homepage measured InterVariable56/56 hero type,15/24 body and28/36 section headings; these values establish weight, density and hierarchy but should not be transplanted as fixed sizes into catalog cards.

## Hierarchy and responsive criteria

The main subject is Inter's letterforms and restrained dark palette; the issue element proves how the system handles real product detail. Keep all three groups visible, use shared axes, and let the type region absorb flexible space. The issue surface should end near the same bottom inset as other specimens. Do not leave a large arbitrary void beneath a short surface. The existing four swatches can supply all color; a source-like small status accent is optional only if it clarifies the element state.

Check actual rendered card widths around280,400 and600px, plus the full library grid on390px and1440px viewports. Require: label rhythm comparable to neighbors, phrase without accidental extra lines, no overflow/clipping, all palette labels visible, and no stray controls or new interaction. Preserve accessible image semantics and a descriptive specimen label. Final QA must inspect the delivered revision after any correction; this report does not certify the implementation.

## Limits

The supplied screenshot is a catalog view, not a source homepage reference. Homepage character is grounded in the source captures inspected during the prior Interfere analysis, especially the dark1280×720 REA frame and1440×900 source view. A fresh attempt to reopen the earlier cloud-backed source PNG stalled during this bounded pass; it was not represented as a new inspection. Font licensing and source asset behavior are not new scope here.
