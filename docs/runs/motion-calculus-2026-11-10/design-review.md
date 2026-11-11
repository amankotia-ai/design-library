# Motion calculus design review

Reviewer: `/root/design_qa`. Mode: original system expansion within the existing Film & Motion collection. No application source edited by this reviewer.

## Evidence inspected

Actual screenshots inspected with `view_image`:

- `studies-polish/evidence/spring-motion-final-desktop.png`
- `studies-polish/evidence/bezier-paths-final-desktop.png`
- `studies-polish/evidence/bezier-paths-final-mobile.png`

Read the project AGENTS, README and specialist workflow, and the existing study layout, playback, range, plot and mathematical source. Freebyrd access remained pending in the parent run; no bookmark preference is inferred.

## Observed visual system

Desktop uses a broad explanation column and a larger experiment column. Serif headings, body sans, thin neutral rules, muted descriptions, red controls and the pale workbench are established. The primary equation separates comparisons from the scene. At 390px, detail content becomes a single stack; the two-column control grid and 44px touch buttons must continue to fit. SVG labels are small at mobile sizes, so essential state needs readable surrounding text.

## Product and art direction

- Keep the current layout and palette. Introduce no production-mode badges or unrelated decorative animation.
- Spring comparisons should clearly name underdamped, critically damped and overdamped regimes. Retain fixed natural frequency for comparison. Explain that critical damping avoids overshoot under the declared initial conditions; any fastest-return statement must state its assumptions.
- Bézier comparison presets should preserve geometry so easing is the isolated changed variable. Keep user-controlled shape exploration available separately.
- Separate clock progress `s=t/T` from path parameter `u=E(s)`. Display speed in graphic px/s and acceleration in graphic px/s²; plot speed against physical seconds.
- A geometric tangent can remain visible at an eased stationary endpoint, but must be labeled as a path tangent rather than velocity.
- Keep optional, once-only playback; changes of easing, duration, presets, reset or manual scrub must pause playback. Native easing selectors need an explicit pause mechanism, because the current shared context pauses range inputs automatically but does not wrap native select changes.
- Prefer a concise common spring ODE above the scene and the selected regime's equation below it. Avoid squeezing a large piecewise formula into the primary equation slot.

These constraints were sent to the parent and the motion UI implementer before final implementation. Final implementation and behavioral QA are recorded separately in `QA.md` after the current source and output are available.
