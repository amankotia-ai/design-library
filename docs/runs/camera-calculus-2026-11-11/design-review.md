# Camera calculus design review

Reviewer: `/root/design_qa`. Mode: original system expansion in the existing Film & Motion collection. No application source edited by this reviewer.

## Baseline evidence inspected

Actual images opened with `view_image`:

- `studies-polish/evidence/camera-parallax-final-desktop.png`
- `studies-polish/evidence/camera-parallax-final-mobile.png`
- `motion-calculus/evidence/bezier-paths-desktop.png`

The camera example already has a paper architectural scene with red near objects, two neutral deeper layers, a clear optical center, a compact plot, and three inputs. The current Bézier workbench establishes the appropriate playback, elapsed-time, easing and duration controls. Desktop retains an editorial explanation column beside the experiment. Mobile stacks content and places controls in two columns.

## Product and art direction

- Retain the existing architectural scene, serif headings, paper workbench, thin rules and single red accent.
- Match Bézier's opt-in, once-only playback and elapsed-time scrub placement. Include start/end camera position, easing, duration, focal length and near depth controls.
- Separate camera motion in world units/s from projected layer motion in graphic px/s. Label signed quantities as velocity, not speed.
- Plot the three layers' signed projected velocity against physical seconds, with corresponding color labels. Keep camera position, velocity and acceleration in readable live definitions rather than adding competing plots.
- Per-layer measurements should include both projected velocity and acceleration with explicit units.
- State the model boundary next to equations: static scene coordinates X, fixed focal length f and fixed positive depth Z; lateral translation only. Positive camera movement produces negative screen movement.
- Comparison presets should isolate an input where practical and name any reversal explicitly. Identical camera start/end positions should read stationary with exact zero projected velocity and acceleration.
- Changing easing, duration, start/end, geometry, presets, reset or scrub must pause playback. A native easing selector needs an explicit stop/remount mechanism.
- Keep mobile controls readable and usable; established small SVG axis labels are supplementary to readable numeric output outside the plot.

These constraints were sent to the parent and UI implementer before final implementation. Final code, behavior, rendered output and exact revision review will be recorded in `QA.md`.
