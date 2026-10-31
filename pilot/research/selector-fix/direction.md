# Collection selector — scoped direction

Specialist: `/root/selector_direction` · 30 October 2026.
Scope: visual analysis, product constraints and art direction for the existing library collection select. No implementation edits or independent QA were performed by this specialist.

## Inspected evidence

Viewed the actual user attachment:
`/var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_yHMDcU/Screenshot 2026-10-30 at 6.52.57 PM.png`.

Read the selector markup in `pilot/src/main.jsx` and the `.system-switch` rules in the current CSS files. The parent had already moved revised shell rules from `blueprint.css` into `style.css` when this inspection occurred. The revised code is an implementation input, not a rendered result inspected in this pass.

## Visual analysis

The attachment shows a rounded bordered control, Quiet Direction label, and native-looking downward chevron. The text has a generous left inset while the chevron sits nearer the right border. A large empty interval separates label and arrow. This creates a generic operating-system field appearance alongside the library's restrained controls.

The image is a retina crop. Parent measurement establishes the original control at152 ×34.5 CSS pixels with12px text; the approximately304 ×68 image footprint does not establish24px rendered type. The user has not described a behavioral failure. Treat appearance, spacing and predictable arrow placement as the bounded inferred correction; do not claim the collection switch was broken.

## Product constraints

Keep the existing native `select`, its `aria-label="Design system"`, options and change handler. Native keyboard opening, arrow selection, Enter confirmation and focus behavior should remain browser-owned. This correction does not justify a custom listbox, popup, focus manager, or new dependency.

Both Quiet Direction and Signal Workshop must remain readable and selectable. On switch, preserve existing behavior: choose the new collection's assembled page, clear comparison, and keep device choice. The existing Collection label and compact navigation remain intact.

## Art direction

Use explicit12px LibrarySans typography,20px line height and36px control height. Set a restrained neutral surface and a one-pixel border consistent with the library shell. Use12px left padding and a decorative12px chevron centered vertically with12px right inset; reserve enough text-side padding to prevent overlap. Disable native appearance while retaining native select semantics. The decorative arrow must not become a separate interactive element.

A176px desktop width accommodates both current names without allowing the control to dominate the row. Preserve full-width stacking on mobile. Keep the focus-visible outline clear and the hover change subtle. Place library shell selector rules in `style.css` so they do not depend on loading a particular design-system component stylesheet.

## Acceptance for the delivered revision

Independent QA should inspect the rendered control in desktop and mobile context, confirm36px height and12px type, ensure one chevron with consistent inset, verify both names fit, and exercise keyboard collection selection. Check visible focus and absence of horizontal overflow. A final screenshot and source hashes should identify the corrected revision.

Status: direction supplied. Rendered appearance and working behavior remain for independent QA; this note is not a pass of the delivered output.

## Delivered control visual review

Reviewer: `/root/selector_direction`. **Passed for the inspected desktop rest and keyboard-focus states.** This section supersedes the direction-only status for those image states.

I inspected the actual files with `view_image`:

| Image | Observed state | SHA-256 |
| --- | --- | --- |
| `evidence/selector-fix/selector-desktop-rest.jpg` | Quiet Direction, at rest | `95c553f841e8e2e3eb86efd0c033a4ace8076dbef21897155f98c2699ff28969` |
| `evidence/selector-fix/selector-desktop.jpg` | Quiet Direction, keyboard focus | `62e3b02e3d42609d9f31388646831f5f54ae09d6f1d5531c39a09684a4b01df8` |

The at-rest control has restrained type, a quiet neutral surface and border, and one small chevron with a balanced inset from the right edge. Quiet Direction fits on one line with clear space before the arrow. The control appears compact and visually consistent with the intended 176 ×36px treatment; the screenshot alone is not a separate CSS geometry measurement.

The focused image shows a clear dark outline outside the rounded control with separation from the border. Neither label nor arrow is clipped by that outline. This confirms the visible focus state, not independent execution of keyboard interactions by this reviewer. The current CSS retains the native select element and uses the library's focus-visible outline; the visible outline should not be described as an unmodified operating-system focus ring.

Implementation hashes inspected: `src/style.css` → `95612609d29d2a5d6e2036109f9db0645239d27c009cc951c6abe888d4ce75da`; `src/blueprint.css` → `59a06f91427524cf907e81134f1f65a4e4d8579521a710375fde57aa419ad2c8`.

The parent relayed independent QA measurements of176 ×36px desktop and342 ×36px at390px viewport, with no mobile overflow and successful native collection switching. Those behavior and measurement claims belong to independent QA. A mobile screenshot was not yet present when this scoped review was written, so this pass does not claim independent mobile image inspection. No blocking visual finding remains in the desktop states inspected.
