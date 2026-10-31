# Final product review — Signal Workshop

Reviewer: `/root/blueprint_product` · 2026-10-30
Status: **passed for screenshot and source review; no blocking finding**.

## What I inspected

Viewed actual final desktop and mobile images with the image tool:

- `evidence/blueprint/final-page-desktop.jpg`, 1440 × 2940.
- `evidence/blueprint/final-page-mobile.jpg`, 390 × 3759.

Read the delivered `src/main.jsx`, `src/blueprint.jsx`, `src/data.js`, `src/blueprint-tokens.css`, and independent QA's `research/blueprint/qa.md` against my earlier `product-design.md`. I did not drive the live UI or re-run the workshop and export. Runtime behavior below is explicitly attributed to `/root/blueprint_qa`.

## Findings

The assembled page reads as a coherent creative-software family. Its opening explains the idea, the workshop gives the artwork most of the space, and the parameter rail exposes a short set of actual settings. The live controls are present as native labeled selects, ranges, color inputs, and buttons. The SVG algorithm is local and deterministic in the inspected source; export uses the current settings. There are no fabricated account, credit, billing, sharing, or AI controls in the original expansion.

The desktop image shows the hero, canvas and controls as one composition, followed by an original three-column feature section, split FAQ, and blue footer. The mobile image stacks canvas and controls, keeps full-size controls, stacks the feature content, and retains clear FAQ rows and footer links. The artboard remains distinct from the interface palette. No new motion is introduced.

The source study and original expansion are separately addressable. Source wording and Blueprint name are confined to the faithful hero mode, whose comparison metadata records a bounded 1440 × 594 crop and discloses Inter, wordmark, and grid approximations. The assembled page uses original copy and explicit local-generator disclosure. The FAQ further distinguishes the original algorithm and mobile arrangement from the reference. No pixel-identity claim is made.

The registry retains Quiet Direction and its section IDs while adding Signal Workshop with its own stable ID, description, palette, type specimen, and rules. The persistent system select is available across Study, Sources and System. Source code filters section choices by the chosen system, selects that system's assembled page on switch, clears Compare, and preserves device choice. Comparison attribution reads the actual source author rather than assuming Bernardo Lickfold. Source descriptions now correctly include supplied public websites. The notice counts two systems and nine reusable sections, excluding assembled shells.

The original product contract's essential points are met in the inspected revision. The optional `?system=` shorthand was not implemented; direct `?section=signal-page` and component view links provide the entry points instead. This is not a blocking requirement.

## Runtime evidence from independent QA

`/root/blueprint_qa` records 29 scoped runtime checks in `qa.json`, including keyboard changes to the settings, committed native color input changes, variation, reset, an actual current-settings SVG download, keyboard FAQ expansion, collection switching, token display, original comparison links, and Signal comparison/overlay. Its report records no overflow at 390, 768, and 1440px, and confirms that opening a FAQ inside the assembled iframe grows the host frame. These are that reviewer's observed checks; this product pass does not claim independent reproduction of them.

## Limits

The screenshots reviewed are final 1440px and 390px renders. No 320px stress check, screen-reader audit, or cross-browser review is claimed by this product pass. Source font substitution and approximate grid/wordmark remain visible study limitations. The review does not establish behavior of Blueprint's unseen application, source mobile layout, account flows, or AI generation.

## Inspected revision

SHA-256:

| File | Hash |
| --- | --- |
| `src/main.jsx` | `573c2f72bb63bf2c26729349a351961a34dab691d851354ffde14b6a97bef3c3` |
| `src/blueprint.jsx` | `1f4f5f5fad510ba92705880e84efd20b994f4a0ce4731746b1447b612194b985` |
| `src/blueprint.css` | `3e09057e82287191c9a943ed6c92d5459614dcb6d8dc800912bb6eafb86894e4` |
| `src/blueprint-tokens.css` | `f4077bad406bff9d51d556f8cfa555d737b72de46e4dd9948c761cb2eec0bb6d` |
| `src/data.js` | `61d3b44bd58b56c426691efca9bd742cc4f8c4d1cca47e3ac55975652f71564b` |
| `evidence/blueprint/final-page-desktop.jpg` | `4e5a5a74d4368cd121de794c33d3cf457438b31828a75e2340730e6dc9b031a5` |
| `evidence/blueprint/final-page-mobile.jpg` | `ba876bbeeeb0080418c0a7e7ee39ca0d93c2f0e77a3d729515c380870b9094c4` |

Changed source or captures invalidate the affected parts of this review.
