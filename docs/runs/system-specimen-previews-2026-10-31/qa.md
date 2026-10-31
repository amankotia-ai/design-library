# Independent specimen QA

Reviewer: `/root/specimen_qa`. Status: **passed** for distinct system-card previews. No blocking defects found; no implementation edits made.

Inspected the parent desktop render, actual live IAB output at 1280 × 850 and 768 × 850, and the full 390px mobile render. Inspected source, matching runtime files, font paths, accessible output, and live DOM geometry. The final system cards show large letterforms, registered palettes and representative elements; Pages retains assembled sites.

- System home: zero iframes and zero focusable controls inside specimen boards. Each board is exposed as one descriptively labeled image. Both system name links were clicked and opened their matching system detail.
- Fit: no horizontal overflow at 1280, 768 or 390px. Board widths/heights were 393/437px, 350/389px, and 356/396px respectively. Content scroll height equaled client height in every board. Element samples ended inside the card with roughly 24–27px remaining below; no clipping seen.
- Visual character: Quiet Serif retains the light condensed serif, open paper, fine rules and sharp portrait crop. Blueprint retains blue, sans/mono contrast and rounded pale forms. All element samples are visible at tested sizes.
- Assets: portrait loaded with natural width 579px. Computed display type is `Editorial` and `SpecimenGeist`; retained Geist/Mono font files exist. Rendered letterforms were visually inspected. The read-only browser font-set API did not support iteration, so no direct font-load status claim is made.
- Pages: clicked its navigation link; live page contained two page iframe previews (`/?view=page&embed=1` and `/?view=blueprint-page&embed=1`), zero system boards and no horizontal overflow at 1280px. Actual page rendering inspected and captured. Console warning/error log was empty during the bounded session.
- Temporary viewport override reset after review.

## Evidence

- `qa-1280.png`: independently captured desktop output.
- `qa-768.png`: tablet output.
- `qa-390.png`: complete mobile output, inspected with image viewer.
- `qa-pages.png`: retained page previews.

## Exact reviewed revision

Source and `/tmp/design-library-pilot-runtime/src/` copies matched:

| File | SHA256 |
| --- | --- |
| `system-browser.jsx` | `b82bc0bd02aeb88e09e5f5b9f30773ee45d87a67d347bea6882d4d28898abe2a` |
| `system-preview.jsx` | `9d6b531d74f396a3d8f5cc10b83a6963231a276221ed73cdbb3647cbd316bc56` |
| `system-preview.css` | `d3812c77967e46b216ec486d6bfc4e7e76f66f52f2be4b730557a0f6546d2bf9` |
| `system-preview-tokens.css` | `95c856725220c483377b310ce7b50fa7e9336592af801d34dfaaae833a3ea4d1` |

Limits: bounded preview review; no exhaustive page interaction audit, alternate browser, physical touch or screen-reader session. Build/check success was reported by parent and not rerun by QA. Microtext is subordinate and scales with the static graphic; meaningful system name/font metadata remains outside it.
