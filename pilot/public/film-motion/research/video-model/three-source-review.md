# Three.js source review — 10 November 2026

Source linked by the description of Matt Penny's [10 GitHub Repos to 10x Your AI Motion Graphics](https://www.youtube.com/watch?v=aD9X6Lc3dVk). Scope: direct source reading, no installation, renderer execution, frame comparison or benchmark.

Repository: [mrdoob/three.js](https://github.com/mrdoob/three.js), commit `4f8dd20f891df6660f8b0319529b953a5a5f1f48`. GitHub connector retrieved HEAD and then the following files at that exact revision. Copies are retained in `sources/three-*.js`.

| Source | Observed implementation | Transfer to this skill |
|---|---|---|
| [AnimationMixer.js](https://github.com/mrdoob/three.js/blob/4f8dd20f891df6660f8b0319529b953a5a5f1f48/src/animation/AnimationMixer.js) | `update(deltaTime)` accumulates time; `setTime(time)` zeros mixer/action times and calls update. Input is scaled by `timeScale`. | Prefer explicit frame-derived time for clip sampling, fix timeScale, and test action state, loop/finish flags and callbacks under repeated/reverse seeks. `setTime` alone does not prove every surrounding scene deterministic. |
| [Timer.js](https://github.com/mrdoob/three.js/blob/4f8dd20f891df6660f8b0319529b953a5a5f1f48/src/core/Timer.js) | Constructor/reset use `performance.now`; update accepts an explicit timestamp but otherwise uses wall time; visibility handling can alter deltas. | Do not let a live browser timer own the offline film clock. Derive scene state from the requested output frame. |
| [EffectComposer.js](https://github.com/mrdoob/three.js/blob/4f8dd20f891df6660f8b0319529b953a5a5f1f48/examples/jsm/postprocessing/EffectComposer.js) | `render(deltaTime)` updates its timer and uses the timer delta when deltaTime is omitted; passes receive the chosen delta. | Pass controlled time, but also audit/reset temporal passes or replay their history. A fixed delta passed during arbitrary frame jumps is not equivalent to reconstructing that history. |

Recommendation is implementation reasoning from selected source, not an executed proof. Library features improve the available production routes; they supply no audience-quality coefficients. Preserve the existing native browser fallback and add optional 3D only for a shot whose meaning benefits from depth, occlusion, light or material.
