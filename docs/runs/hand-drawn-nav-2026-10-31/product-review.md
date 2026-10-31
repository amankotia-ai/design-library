# Product contract: selected navbar underline

Reviewer: `/root/typography_product`. Inspected current `main.jsx`, `catalog.css`, hover/focus rules in `style.css`, typography tokens, and the actual supplied screenshot. This is a preimplementation contract, not final QA.

- Preserve native anchors, URLs, labels, and the existing `aria-current="page"` state. The selected state applies to Sections, Pages, and Design Systems across catalog and detail routes exactly as today; the stroke is decorative and must add no accessible text.
- Scope the stroke to `.article-header nav a[aria-current=page]`. Use an absolutely positioned `::after` with a local SVG alpha mask, shared `--library-handwritten-ink: #f60f30` token, and `pointer-events:none`. The token belongs with shared library tokens; shape/placement belongs with navbar layout.
- Replace the active link’s `text-decoration`, including its hover state. The existing `.article-header nav a:hover` rule can otherwise draw a second straight underline over the red stroke. Inactive link hover may retain the current straight underline; the handwritten stroke denotes selection only.
- Make the pseudo-element width track the text/link width so the longest label, `Design Systems`, gets one continuous line and `Pages` gets a short one. Prefer a simple gently irregular stroke without a fixed-size brush blob that becomes disproportionate on short text. Keep it inside the 36px desktop/40px mobile link area with clear separation from letter descenders.
- Do not add padding, borders, font-weight changes, animation, transitions, or dimensions that change selected-versus-unselected link geometry. Preserve existing wrapping, min-height, header spacing, click targets, and the wordmark/signature.
- Keep the existing `:focus-visible` outline and its offset. The decorative mask must neither cover the focus outline nor replace it; keyboard users should still see which link currently has focus independently of the selected page.
- Provide a usable selected indication in forced-colors mode if the masked background is suppressed; retaining an explicit current-color underline in that mode is sufficient.

## Final acceptance

Review each selected tab at desktop, 390px, and 320px. Confirm exactly one red pen stroke under the selected label, no second line on hover/focus, no inactive red strokes, preserved keyboard focus and links, no geometry/layout shift, and no horizontal overflow. Record final source hashes and actual screenshots for independent QA. Shared red sampling is an observed match to the supplied logo; the new stroke is an original vector interpretation, not recovered lettering.
