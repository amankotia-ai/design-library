# Product design pass

- Reviewer: `/root/specimen_product`.
- Inspected actual image: `docs/runs/design-systems-default-2026-10-31.png` (1280 × 720).
- Inspected source: `pilot/src/system-browser.jsx`, `system-browser.css`, `page-browser.jsx`, `catalog.css`, and system registry in `data.js`. There is no `page-browser.css`; its page-card rules live in `catalog.css`.

## Observations

Both system cards currently render the same `PagePreview` component used by `PageCard`. The visible distinction is only heading/metadata. The miniature full page implies browsing an assembled site and lets nested iframe interactions compete with the outer library.

## Bounded recommendation

Add a separate `SystemPreview` used only by `SystemCard`; keep `PagePreview` and page records unchanged. Make it a self-contained static specimen board at the existing card aspect ratio. Prioritize a prominent type sample, a labeled palette strip, and two representative component forms. It should contain no long page sequence, miniature navigation, or scrollable iframe.

- Quiet Serif: very light condensed serif title plus General Sans utility/body; neutral paper/ink/rule palette; fine rule and a small image/caption composition or editorial text-link treatment. Preserve open space and asymmetry. Do not make every sample a rounded widget.
- Blueprint: Geist headline with Geist Mono detail; blue/paper/ink palette; rounded action specimen and a small parameter or tool surface. Use the blue surface and grid as system traits rather than another landing-page hero.
- Labels may be useful system vocabulary such as Typography, Palette and Components. Avoid provenance or production-mode badges.
- Keep the existing system name link as the canonical keyboard action; optionally make the visual area an additional pointer link with `tabIndex={-1}` and `aria-hidden="true"`. Do not introduce nested anchors or focusable demo controls.
- Samples of actions/fields should be spans/divs, not real buttons or inputs. A whole board may use `role="img"` with a concise accessible description of type, color and UI character; hide decorative sample children from assistive technology in that case. Preserve readable system name/font metadata outside the board.

## Acceptance criteria

At 1280/1440px and 390px: system boards unmistakably show a type/palette/component composition, pages retain actual page previews, both card names open their system detail, and no board or page develops horizontal overflow. At 768px, two-column cards must retain the large type, palette and one component without relying on fine text. Avoid essential copy below 11px; decorative microtext need not carry product meaning. Keep shared tokens independent of layout CSS. No new animation or modal behavior is needed.

This is a product recommendation, not delivered-output QA.
