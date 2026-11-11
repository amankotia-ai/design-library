# Motion calculus continuation

The existing Film & Motion collection now connects geometry, timing and physical derivatives in its two motion studies. The nine-study inventory and established Design Library layout are retained.

- Spring motion compares underdamped, critical and overdamped returns. The solution is stable close to critical damping and reports analytic position, velocity and acceleration with explicit initial conditions.
- Bézier paths compose a geometric curve with linear, cubic or quintic easing. Duration controls physical velocity and acceleration through the chain rule. Equal-time dots, the speed plot, numerical results and playback use the same pure model.
- Three comparison presets, reset, manual seeking and single-pass playback work in both studies. Parameter changes pause the clock. There is no automatic playback.
- Collection thumbnails, study descriptions, guides, executable downloads and manifest hashes reflect the extended models.

## Preview

[Paths, tangents & speed](http://127.0.0.1:5183/design-library/?panel=film&entry=bezier-paths)

[Spring motion & damping](http://127.0.0.1:5183/design-library/?panel=film&entry=spring-motion)

The preview is served from `../studies-polish/pilot` during this run. The reviewed files are delivered to `/Users/abhishekmankotia/Documents/ChatGPT/Design Library/pilot` by the guarded sync script. No commit or deployment is included.

## Validation

54 mathematical checks pass: 14 scene-calculus, 21 motion/geometry and 19 timing/signal checks. The motion checks include finite-difference derivatives, initial conditions, differential-equation residuals, continuity near critical damping, energy behavior, easing endpoints and duration scaling. Library inventory, nine routes and downloadable math parity pass.

Production build passes; existing client-directive and chunk-size warnings remain. The first build overlapped with the UI agent's build in the same output folder; the final isolated build succeeded and is recorded in `evidence/build.log`.

`evidence/browser-check.json` records six preset comparisons, resets, playback/pause/scrub, easing-change pause, once-only completion, duration scaling and 17 screenshots at 1440, 768 and 390 pixels. No page errors or page-width overflow were recorded. Source hashes identify the reviewed revision. The first browser attempt could not launch inside the sandbox; the successful check ran with scoped escalation. A test-input formatting issue was corrected before the passing run.

`evidence/QA.md` is the independent visual and behavioral review. `evidence/qa-independent.json` records the reviewer's separately executed browser checks.

The model derivatives apply inside the active journey; endpoint values are one-sided. These timing curves do not produce constant arc-length speed. Measurements describe authored geometry and timing, not audience response or artistic quality.
