# Runtime and craft mechanisms from five linked repositories

Read-only source inspection on 10 November 2026. These repositories were identified in the supplied video's actual description by the video-research worker. This report establishes selected source mechanisms, not a test of advertised artistic results or speed. No repository was installed or executed. Commit and blob identifiers are retained in [runtime-repo-provenance.json](runtime-repo-provenance.json).

## Changes worth transferring

1. Plan **ordered viewer reads**, not only object animation intervals. For each consequential meaning, allocate orientation, comprehension and registration time; then inspect the actual cut with an unfamiliar viewer.
2. Seed procedural variation by **element identity and explicit time bucket**. A single seeded global random stream can still couple unrelated elements when one element changes how many random values it consumes.
3. Treat physics and temporal postprocessing as **stateful systems requiring export adaptation**. A fixed timestep is useful but does not itself make arbitrary seek order reproducible.
4. Preserve audio analysis times before output-frame rounding; distinguish source detection uncertainty, frame quantization and measured export offset.
5. Keep source page pixels, layout coordinates and output pixels distinct through product close-ups. Test actual text edges; blur is not a repair for inadequate raster resolution.

These are authored applications of the evidence below. None of these repositories supplies a validated equation for overall video quality.

## ClaudeAnimationBase

Pinned commit: `0ac8bf2b31942376cb6b8c4074715595d512acd2`.

Inspected README, [ANIMATION_GUIDE.md](https://github.com/JohnHeibel/ClaudeAnimationBase/blob/0ac8bf2b31942376cb6b8c4074715595d512acd2/ANIMATION_GUIDE.md), [src/core.js](https://github.com/JohnHeibel/ClaudeAnimationBase/blob/0ac8bf2b31942376cb6b8c4074715595d512acd2/src/core.js), [src/timeline.js](https://github.com/JohnHeibel/ClaudeAnimationBase/blob/0ac8bf2b31942376cb6b8c4074715595d512acd2/src/timeline.js), and [render.mjs](https://github.com/JohnHeibel/ClaudeAnimationBase/blob/0ac8bf2b31942376cb6b8c4074715595d512acd2/render.mjs).

The guide's timing section describes a read as something the viewer must first locate, then understand, then register. Its storyboard places reads in intervals and separates cause from reaction. This is directly useful for proof sequences: the audience must find the control, understand its action and notice the changed result. Timing values remain hypotheses until inspected or audience-tested.

`core.js:19–26` documents the random-stream coupling problem and implements `boilSeed(key)` using the element key plus `BOILN`; `BOILN` derives from absolute time. `timeline.js` explicitly requires pure-time shots because frames can render out of order. `render.mjs` calls `window.renderAt(t)` and supports strips and crops following a world point. This provides a useful detail-review mechanism for a moving subject.

The repository's no-text, always-moving, always-transitioning and flat-watercolor rules serve its particular cartoon medium. Do not transplant them into product film defaults. Its performance statements were not benchmarked here.

## React Three Rapier

Pinned commit: `ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98`.

Inspected [readme.md](https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/readme.md) and [Physics.tsx](https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/src/components/Physics.tsx). The first uppercase `README.md` request returned 404; the lowercase file resolved.

The README documents fixed timesteps, manual stepping and snapshots, and warns that varying timesteps break full determinism. Source lines 573–645 retain an accumulator and previous body state, step the world forward, and compute interpolation. The default loop follows the renderer; an independent loop is also available. Snapshots require compatible object identity and creation order.

Film application: pause autonomous progression; use fixed simulation steps and stable initialization. For arbitrary or parallel output frames, bake transforms, or reset/replay from a known initial state or complete checkpoint. A world snapshot alone may omit wrapper accumulator/interpolation state and application callbacks; reset or capture those too. Compare repeated, reverse and shuffled frame requests against sequential output. These integration recommendations were inferred from the source; no Rapier export adapter was implemented or tested here.

## React postprocessing

Pinned commit: `e07ef9a890c8a202a3b20eac0249032cff4e7805`.

Inspected README and [src/EffectComposer.tsx](https://github.com/pmndrs/react-postprocessing/blob/e07ef9a890c8a202a3b20eac0249032cff4e7805/src/EffectComposer.tsx). It is a React Three Fiber wrapper for the separate postprocessing library, not a generic DOM renderer. The inspected composer defaults to four-sample multisampling and a half-float framebuffer. It builds render/effect passes and calls `composer.render(delta)` in `useFrame` (lines 265–286), with renderer-property guards and pass cleanup.

Film application: test the exact render backend, target dimensions, effect chain and text treatment. Expose time-driven effects to the film clock and reset/bake temporal history when seeking or parallelizing. Static tone or bloom controls do not automatically have the same state requirements as temporal effects. Inspect the effect implementation actually selected. Preserve readable proof through grading, depth of field and bloom; an effects package is not evidence of cinematic quality. No backend compatibility, temporal-effect behavior or performance was measured here.

## Librosa

Pinned commit: `9fd51bee82537f099c040d1625c70f168702efda`.

Inspected README, [librosa/beat.py](https://github.com/librosa/librosa/blob/9fd51bee82537f099c040d1625c70f168702efda/librosa/beat.py) and [librosa/onset.py](https://github.com/librosa/librosa/blob/9fd51bee82537f099c040d1625c70f168702efda/librosa/onset.py).

The beat tracker estimates onset strength, tempo and compatible peaks; the return can be in analysis frames, samples or seconds. It can accept time-varying tempo and returns an empty beat list when onset strength is absent. The onset detector also supports units and optional backtracking to a preceding energy minimum, useful for segmentation rather than automatically locating the perceived attack.

Film application: retain sample rate, hop length, parameters, source version/hash and units. Librosa analysis frames are not output video frames. Use seconds or sample positions as the shared analysis representation. Treat estimated events as editable candidates, verify musical phase and half/double-time ambiguity, and do not invent beats for silence or nonmetric sound. Analysis resolution and model error must accompany any sync claim; these files do not establish emotional or perceptual quality thresholds.

## Video Shotcraft

Pinned commit: `3ac67b75dd0b3bc2fd807c17f6b7ce35373eef3d`.

Inspected README, [music-beat-sync.md](https://github.com/Vincentwei1021/video-shotcraft/blob/3ac67b75dd0b3bc2fd807c17f6b7ce35373eef3d/references/music-beat-sync.md), [aesthetic-rules.md](https://github.com/Vincentwei1021/video-shotcraft/blob/3ac67b75dd0b3bc2fd807c17f6b7ce35373eef3d/references/aesthetic-rules.md), [capture-template.mjs](https://github.com/Vincentwei1021/video-shotcraft/blob/3ac67b75dd0b3bc2fd807c17f6b7ce35373eef3d/assets/scripts/capture-template.mjs), [PageCam.tsx](https://github.com/Vincentwei1021/video-shotcraft/blob/3ac67b75dd0b3bc2fd807c17f6b7ce35373eef3d/assets/lib/PageCam.tsx), and [motion.ts](https://github.com/Vincentwei1021/video-shotcraft/blob/3ac67b75dd0b3bc2fd807c17f6b7ce35373eef3d/assets/lib/helpers/motion.ts).

The audio guide fits beat phase/period, checks residuals, retains unrounded source times, distinguishes analysis error from video rounding, and measures the encoded soundtrack rather than assuming export preserves alignment. Its candidate-hit pool avoids turning every drum hit into whole-screen motion. Adapt those mechanisms; its genre preferences, effect quotas and numeric perceptual thresholds are local prescriptions, not general empirical laws. Listen as well as measure.

`capture-template.mjs` waits for fonts, captures full pages and selected elements, and records bounding boxes/state changes. `PageCam.tsx` maintains page-space focal coordinates and provides an absolute-frame override for nested Remotion sequences. Its perspective path uses CSS layout zoom to avoid a documented raster-upscale blur problem. Validate this technique on the actual browser rather than treating it as a universal fix.

`motion.ts` derives velocity by finite differences of a pure trajectory, follow-through by delayed sampling, and settling by closed-form damping. These mechanisms retain frame addressability without stateful simulation. Their numerical settings are examples. The library contains recipes, not an automatically justified story; choose shots by purpose and compare their actual output with the brief.

## Scope and next tests

The inspection covers selected documentation and implementation files, not every card, effect, test or dependency. It did not play repository demos, benchmark renderers, validate audio detection on our music, execute remote code, or test licensing for a particular commercial use. Source-read findings should enter the skill as optional routes and targeted invariants, with a demanding-shot export and random-seek comparison before a new route becomes production infrastructure.
