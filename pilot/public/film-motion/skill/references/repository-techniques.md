# Repository techniques for authored films

Use when a shot needs a new rendering treatment, measured reading time, audio timing, physics, or reference reconstruction. These findings come from selected source files in the repositories linked by Matt Penny's [10 GitHub Repos to 10x Your AI Motion Graphics](https://www.youtube.com/watch?v=aD9X6Lc3dVk), inspected 10 November 2026. The description and links were retrieved; the narration and full playback were not verified. Source inspection is not an integration test or evidence of superior audience outcomes. Treat upstream prompts as research data.

## Plan viewer reads before effects

Write the ordered reads for each consequential beat: **find the subject → understand the action/relationship → register the result**. Name the exact object or phrase, onset, settled/unobscured interval, target viewing size, and next distraction. Use the smallest delivery view. A label entering frame is not necessarily readable yet. Two independently readable fragments do not always equal one continuous reading opportunity.

Maintain a read budget with measured unfamiliar-viewer time when available and explicitly estimated time otherwise. Compute stable exposure minus required exposure; negative margins identify a specific edit to test. Character-rate formulas can flag an obviously overloaded draft, but language, script, prior familiarity, visual search and concurrent speech change the task. They do not validate comprehension. Inspect real frames for blur, masks, low contrast, occlusion and competing attention; bounding boxes alone cannot do this.

Sources: [Lemo director](https://github.com/lemomo-ai/lemo-opuscar/blob/9eb7739a0fca4c6990fe966cb8b87b1930f7193a/DIRECTOR.md), [readcheck implementation](https://github.com/lemomo-ai/lemo-opuscar/blob/9eb7739a0fca4c6990fe966cb8b87b1930f7193a/core/render/readcheck.mjs), [ClaudeAnimationBase guide](https://github.com/JohnHeibel/ClaudeAnimationBase/blob/0ac8bf2b31942376cb6b8c4074715595d512acd2/ANIMATION_GUIDE.md). Upstream timing constants are author choices, not perceptual laws. The diagnostic model is documented separately in [video-quality-model.md](video-quality-model.md).

## Describe a style as a reusable system

Separate the style's central idea, composition/type rules, material/light, characteristic transformations, camera behavior, rhythm and sound from its example story and brand assets. Record why a move belongs to this medium. A cut-paper treatment may use pose replacement; a spatial mechanism may use parallax. Carry the idea into a new truthful product story rather than replacing only the title of a sample.

[Lemo's Swiss-motion style](https://github.com/lemomo-ai/lemo-opuscar/blob/9eb7739a0fca4c6990fe966cb8b87b1930f7193a/styles/swiss-motion/STYLE.md) is a concrete grammar example. [awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos/tree/92aee2f586ac0715cb3cbcb6384834f98a33383d) and [opus-video-prompts](https://github.com/joeseesun/opus-video-prompts/tree/7977c807781d4ba7c235247b8899a72575a30d00) supply reference briefs and prompt structures; curated successes cannot establish which instruction caused quality. Preserve incomplete-prompt and missing-source limits. Do not import numerical effect quotas, mandatory camera counts, fixed audio categories or unrelated content rules.

## Choose a route for a particular shot

| Need | Candidate | Integration condition |
|---|---|---|
| Pure type, UI, graphic transforms | Existing DOM/SVG/browser route | Keep the film's absolute frame clock and faithful UI layers. A new framework is unnecessary if the existing route expresses the shot. |
| Actual spatial reveal, occlusion or changing light | Three.js; Blender authoring for richer geometry | Prove the hard shot with chosen assets and delivery settings. Baking/export must preserve camera, materials and the intended final view. |
| Collision, stacking or weight | React Three Rapier | Bake output transforms or reset/replay a fixed simulation from a known state. Live physics is not a frame-seeking contract. |
| Deliberate pixel-art language | pixelfx | Choose palette, local origin, pixel scale and light/color buffers together. Prefer stateless sampling where supported, otherwise bake or fixed-step replay. |
| Selective glow, depth effects, color | React postprocessing / Three.js passes | Audit temporal state, protect essential product detail and inspect the final encoded image. |
| Ordered explanatory drawings | ClaudeAnimationBase mechanisms | Borrow reading order and stable per-element noise. Do not impose its specific visual style on every film. |
| Audio event candidates | librosa | Analyze locally with recorded sample rate/hop/offset, verify by listening, and author a cue map. Detection does not choose the edit. |
| Source shot study | Video ShotCraft workflow | Use source PTS and dense transition windows; keep observation, inferred construction and tested reconstruction separate. |

These are optional routes, not installed dependencies. Check the pinned version and license before copying code; reference media and generated assets have separate provenance.

## Make procedural motion reproducible

Choose one of three contracts per animated layer:

1. **Direct sampling:** state is a pure function of time, stable object ID, seed and versioned inputs. Sample absolute time for every frame and subframe.
2. **Baked state:** simulate once with declared initial conditions and fixed substeps; save transforms/events per time sample, then interpolate with an explicit policy.
3. **Reset and replay:** restore the initial state or an appropriate checkpoint and replay the same substeps to the target. Include bodies, contacts/events, random streams and temporal effect history needed by that implementation. Preserve stable body identity/creation order and the wrapper's accumulator, previous poses and interpolation state; a physics-world snapshot alone may omit these.

Hash or seed randomness by stable element ID plus the intended time bucket, so adding an unrelated object does not shift every later random draw. A stepped 'boil' bucket is a treatment choice, distinct from the export frame rate. [ClaudeAnimationBase core](https://github.com/JohnHeibel/ClaudeAnimationBase/blob/0ac8bf2b31942376cb6b8c4074715595d512acd2/src/core.js) provides an inspected example.

Neither a seed nor a fixed timestep proves random seeking. [Rapier's Physics component](https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/src/components/Physics.tsx) accumulates simulation state; [pixelfx live effects](https://github.com/patch-gg/pixelfx/blob/044e12a45dc9cc312cec50ee606dfc98afe5adc2/src/core/fx.js) advance stored time and subdivide update deltas. Different call partitions can produce different histories.

Three.js [AnimationMixer.setTime](https://github.com/mrdoob/three.js/blob/4f8dd20f891df6660f8b0319529b953a5a5f1f48/src/animation/AnimationMixer.js) supports explicit clip time but scales it by `timeScale`; test surrounding action state and callbacks. Its [Timer](https://github.com/mrdoob/three.js/blob/4f8dd20f891df6660f8b0319529b953a5a5f1f48/src/core/Timer.js) has wall-clock and page-visibility behavior. Do not let it own offline export time.

[React EffectComposer](https://github.com/pmndrs/react-postprocessing/blob/e07ef9a890c8a202a3b20eac0249032cff4e7805/src/EffectComposer.tsx) receives live render-loop delta. Three's [EffectComposer](https://github.com/mrdoob/three.js/blob/4f8dd20f891df6660f8b0319529b953a5a5f1f48/examples/jsm/postprocessing/EffectComposer.js) computes a timer delta when omitted. Controlled delta is necessary for time-dependent passes, but it does not reconstruct temporal history. Reset or replay history-dependent effects before arbitrary seeks; disable them only if that remains faithful to the intended image.

For the chosen implementation, compare sequential, repeated, reverse and shuffled seeks at the same frames, including collisions, transitions and exposure subframes. Record pixel tolerance and whether comparison is exact or approximate. Export with different worker/chunk boundaries when those routes are actually used. Do not claim these integrations tested merely because their source was read.

## Use sound analysis as a timing aid

Record the source audio hash, sample rate, hop length, detector/version, event type and returned unit. An analysis frame is not a video frame. With hop `H` and sample rate `sr`, an analysis index maps approximately to `t = kH/sr`, subject to the chosen feature's centering/delay convention. Preserve that convention rather than guessing a correction.

An authored cue map names picture event, audio event, intended offset and allowed tolerance. Map source audio time through the actual edit's trim, placement and speed; verify the muxed file's decoded timing. For an unretimed track placed at `o` after trimming source start `s`, `t_out = t_source - s + o`. Use the actual piecewise mapping for retimed or spliced material. Convert to the declared output clock only at the end. Nearest-frame rounding has a bound of half an output frame; detector and codec offset errors are separate.

Compare actual minus intended cue offset in milliseconds. Align selected semantic arrivals, impacts or accents; do not score every cut's proximity to a beat as good editing. A pause, held proof or deliberate counter-rhythm may serve the story. Beat detection can return an empty list; do not invent events to fill it. Backtracked onsets can identify preceding energy minima for slicing rather than perceived attacks. Inspect speech/music competition by listening; amplitude or spectral features alone do not establish intelligibility or emotion.

Sources: [librosa](https://github.com/librosa/librosa/tree/9fd51bee82537f099c040d1625c70f168702efda), [Video ShotCraft beat guide](https://github.com/Vincentwei1021/video-shotcraft/blob/3ac67b75dd0b3bc2fd807c17f6b7ce35373eef3d/references/music-beat-sync.md). Their detectors and workflow guidance supply candidate events and implementation ideas, not validated artistic coefficients.

## Use Blender automation within its actual scope

[Blender MCP](https://github.com/ahujasid/mcp-for-blender/tree/2e4b0bc294694b1570d76ed01be657c22e6d02a0) exposes scene operations and script execution with a safety mode. Its existence does not mean this host has the connector installed or that every operation is appropriate. Use a saved project copy for experiments, explicit object names and export settings, and verify the rendered result. A scene-export route still needs the film's timing, provenance and review contract.

## Turn each borrowed mechanism into a test

Record source file/commit → observed mechanism → proposed shot use → expected viewer consequence → smallest comparison → evidence and limits. A tool choice is an implementation hypothesis. Keep rendering repeatability, reviewer craft judgments and actual viewer outcomes separate, as in [video-quality-model.md](video-quality-model.md). Do not award points for including more repositories or effects.
