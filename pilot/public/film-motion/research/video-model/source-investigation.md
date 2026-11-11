# Video and repository investigation — 2026-11-10

This is a source inspection, not a validation of the video's performance claims or a full visual/audio review. No upstream installers, runtime code, MCP setup, or media-generation commands were executed.

## Supplied video and coverage

- [10 GitHub Repos to 10x Your AI Motion Graphics](https://www.youtube.com/watch?v=aD9X6Lc3dVk), **Matt Penny | Applied AI**.
- Duration from YouTube player metadata: **784 seconds (13:04)**. Published **2026-11-09** (metadata timestamp `2026-11-09T10:40:22-08:00`).
- The public watch HTML and embedded `ytInitialPlayerResponse` were retrieved. The exact title, description, creator, duration, publication metadata, links, and chapter starts are stored in `sources/video-metadata.json`; the original response and HTML are alongside it.
- Web fetch returned a cache miss; shell access succeeded with approved network escalation. The public English caption URL returned an empty body. The transcript endpoint linked in the page returned `FAILED_PRECONDITION`; the error is preserved in `sources/transcript-response.json`. **No transcript, normal-speed viewing, sound review, or source-frame analysis was completed.** Do not attribute detailed spoken advice to the author from this study.
- Description chapter starts: 0:00 intro, 0:44 repo 1, 2:34 repo 2, 4:00 repo 3, 4:53 repo 4, 7:04 repo 5, 8:13 repo 6, 8:58 repo 7, 9:56 repo 8, 10:49 repo 9, 11:38 repo 10. These labels contain no repo names; the ordering below follows the description, not independent verification of spoken chapter content.

The description links **11 repositories**, grouping the two prompt packs under one entry:

1. [Lemo Opuscar](https://github.com/lemomo-ai/lemo-opuscar)
2. [Three.js](https://github.com/mrdoob/three.js)
3. [pixelfx](https://github.com/patch-gg/pixelfx)
4. [Blender MCP](https://github.com/ahujasid/mcp-for-blender)
5. [Awesome Opus 5.5 Videos](https://github.com/yihui-dev/awesome-opus5-5-videos) and [Opus Video Prompts](https://github.com/joeseesun/opus-video-prompts)
6. [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase)
7. [React Three Rapier](https://github.com/pmndrs/react-three-rapier)
8. [React Postprocessing](https://github.com/pmndrs/react-postprocessing)
9. [librosa](https://github.com/librosa/librosa)
10. [Video ShotCraft](https://github.com/Vincentwei1021/video-shotcraft)

The sections below cover five repositories; the other six were delegated for parallel source inspection. `sources/repository-manifest-research.json` pins the five reviewed revisions and inspected file blobs. Files are research snapshots, not installed dependencies. GitHub connector reads succeeded for repository roots, contents, commits, trees and blob URLs; its advertised `/readme` route rejected the URL, so explicit README blob URLs were used.

## Lemo Opuscar

Revision: [`9eb7739a0fca4c6990fe966cb8b87b1930f7193a`](https://github.com/lemomo-ai/lemo-opuscar/tree/9eb7739a0fca4c6990fe966cb8b87b1930f7193a).

Inspected README, `DIRECTOR.md`, `TECHNIQUE.md`, `core/render/readcheck.mjs`, `core/render/video.mjs`, and `styles/swiss-motion/STYLE.md`. The README describes 66 styles at this revision; only the Swiss Motion style document was inspected deeply, and none of the 66 films was visually reviewed here.

**Verified mechanisms:**

- [Technique](https://github.com/lemomo-ai/lemo-opuscar/blob/9eb7739a0fca4c6990fe966cb8b87b1930f7193a/TECHNIQUE.md) separates time-addressed picture, word timings, music, sound events and subtitles while giving them a shared timeline. It supplies a readiness flag and seeded rendering contract, and distinguishes stepped character animation from smooth camera/light movement.
- [Read checker](https://github.com/lemomo-ai/lemo-opuscar/blob/9eb7739a0fca4c6990fe966cb8b87b1930f7193a/core/render/readcheck.mjs) consumes declared text IDs, full strings and bounding boxes over time. It measures the first continuous fully in-frame interval, resets identity when text changes, reports never-fully-visible blocks, and distinguishes failure to inspect from a pass.
- Its reading budget is `max(min_seconds, CJK_chars / cjk_rate + other_nonspace_chars / latin_rate + pad)`. The defaults are production heuristics, **not empirically established universal reading speeds**.
- The [Swiss style](https://github.com/lemomo-ai/lemo-opuscar/blob/9eb7739a0fca4c6990fe966cb8b87b1930f7193a/styles/swiss-motion/STYLE.md) describes identity through material, color logic, type, motion, camera grammar and sound. It connects specific camera moves to narrative functions and treats signature transformations as choices related to the subject.
- The director document asks that a new film differ from the style's demonstration in story structure, opening, signature shot, camera path, score and ending. This is a useful anti-copying review dimension, although its required numeric count is a local convention.

**Useful adaptation for our skill:**

1. Add a reusable style contract that distinguishes stable identity from this film's story and shot plan. Name the material logic, dominant motion grammar, camera functions, sound palette and one possible signature transformation; prove it with actual images and motion.
2. Track text and product proof as explicit visibility intervals. Count readable time only after required content has appeared and settled, and before it becomes obscured, too small or blurred. Check every delivery aspect.
3. Keep the reading budget configurable by audience, language, typography, familiarity and complexity. It is a diagnostic lower bound to test on viewers, not a creativity score.
4. Retain one clock and event map across picture, speech, effects and music. Quantify synchronization only for events deliberately paired; an intentional J/L cut or syncopation is not an error.

**Limits:** The read checker tests declared geometry, not pixel-level visibility. It does not detect alpha, occlusion, contrast, motion blur or incomplete typewriter appearance; it can begin timing before text is actually readable. Metadata must not be mistaken for observed comprehension. We do not import fixed counts of camera moves, silences or effects, a universal ranking of sound over story, arbitrary approval gates, blanket restrictions on tools, or unrelated geographic/political mandates. These are upstream author choices, not evidence of what makes all films good.

**Reuse:** README distinguishes MIT code/docs from CC BY 4.0 demo films/stills and excludes six specified narration tracks from that film license. This research borrows mechanisms with attribution and does not redistribute those assets into the skill.

## pixelfx

Revision: [`044e12a45dc9cc312cec50ee606dfc98afe5adc2`](https://github.com/patch-gg/pixelfx/tree/044e12a45dc9cc312cec50ee606dfc98afe5adc2).

Inspected README, `src/core/fx.js`, `src/core/sim.js`, and `src/core/painter.js`.

**Verified mechanisms:**

- Pure effects accept time as input; simulated effects maintain particle state. [The instance wrapper](https://github.com/patch-gg/pixelfx/blob/044e12a45dc9cc312cec50ee606dfc98afe5adc2/src/core/fx.js) accumulates `t` and divides each update duration into `ceil(dt * 120)` substeps. This is **at most a 1/120-second integration step**, not automatically the same fixed-step sequence for all callers.
- Effect coordinates are local; the painter places, rotates and mirrors them. Palette ramps can be remapped, and separate color and additive-light buffers preserve a deliberate pixel-art look.
- Sprite-sheet export records frames, durations, pivots and loop metadata. That is a useful interchange route when the destination renderer should not host live simulation.

**Useful adaptation:** Use this only where pixel or game-like treatment serves the product story. Preserve pivot, palette, layer order and alpha handling. For export use a pure time function, a baked sequence, or reset plus a specified fixed-step replay with tested seek behavior.

**Critical limit:** A seed and a small step do not establish arbitrary seeking or identical results under differing `dt` partitions. The wrapper is stateful, has no seek/reset method in the inspected instance API, and does not prove cross-platform bitwise determinism. Existing film exporter invariants still apply. No runtime test was performed here.

**Reuse:** Code/effects are MIT; README points to `NOTICE.md` for upstream attributions and excludes the gallery's Patch Pixel font. Do not assume every bundled asset shares the code license.

## Blender MCP

Revision: [`2e4b0bc294694b1570d76ed01be657c22e6d02a0`](https://github.com/ahujasid/mcp-for-blender/tree/2e4b0bc294694b1570d76ed01be657c22e6d02a0).

Inspected README, `src/blender_mcp/guides/animation.md`, and `src/blender_mcp/safe_mode.py`. This is a bridge to a live Blender application, not a video renderer already available in this project.

**Verified mechanisms:**

- The documented `look` tool can return viewport/camera views, multiple angles and animation frame strips. The [animation guide](https://github.com/ahujasid/mcp-for-blender/blob/2e4b0bc294694b1570d76ed01be657c22e6d02a0/src/blender_mcp/guides/animation.md) recommends reviewing popping, intersection, foot sliding and loop seams through time.
- It documents version-aware access to animation curves and direct property keyframing. That supports an explicit shot/frame contract rather than reliance on UI context.
- Code execution runs inside Blender. The [safe-mode source](https://github.com/ahujasid/mcp-for-blender/blob/2e4b0bc294694b1570d76ed01be657c22e6d02a0/src/blender_mcp/safe_mode.py) is opt-in validation, not evidence that arbitrary scripts or assets are harmless.

**Useful adaptation:** Choose Blender when an actual shot requires geometry, materials, rigging or simulation that the existing browser route cannot deliver adequately. Preserve a local editable scene, bake required simulations, align frame rate/range/camera with the film contract, and inspect multi-angle construction plus final-camera temporal strips. A single attractive screenshot does not establish movement quality.

**Operational limit:** No Blender application, add-on, server or asset provider was installed/configured/tested in this study. Current README describes minimal usage telemetry by default and richer prompt/code/screenshot/trajectory collection only after opt-in, with a full disable option. If adopting this connector later, inspect that actual setup rather than silently installing it as part of generic filmmaking.

## Prompt collections

### Awesome Opus 5.5 Videos

Revision: [`92aee2f586ac0715cb3cbcb6384834f98a33383d`](https://github.com/yihui-dev/awesome-opus5-5-videos/tree/92aee2f586ac0715cb3cbcb6384834f98a33383d). Inspected README, tree and `prompts/alex-prompter-997524.md`.

README describes 703 prompt entries and 418 remakes at this revision, while explicitly noting that some entries contain partial prompts or only the original post. A [sample business-explainer entry](https://github.com/yihui-dev/awesome-opus5-5-videos/blob/92aee2f586ac0715cb3cbcb6384834f98a33383d/prompts/alex-prompter-997524.md) specifies a causal problem/mechanism/proof structure and labels the remake stack. That stack is metadata about the remake, not necessarily the original implementation.

### Opus Video Prompts

Revision: [`7977c807781d4ba7c235247b8899a72575a30d00`](https://github.com/joeseesun/opus-video-prompts/tree/7977c807781d4ba7c235247b8899a72575a30d00). Inspected README, tree and prompt files 14 and 15.

- [SaaS launch prompt](https://github.com/joeseesun/opus-video-prompts/blob/7977c807781d4ba7c235247b8899a72575a30d00/prompts/14-saas-launch-real-assets.md) explicitly marks its source text as truncated. It cannot be treated as a complete reproducible recipe.
- [UI morph prompt](https://github.com/joeseesun/opus-video-prompts/blob/7977c807781d4ba7c235247b8899a72575a30d00/prompts/15-ui-morph-loop.md) describes a persistent container, separate internal content timing, direct cursor manipulation, time-addressed spring responses, beat planning and matching loop endpoints. Its fixed tempo, scene count, color restrictions and always-on-beat activity are a particular treatment, not a quality law.

**Useful adaptation:** Store reference origin, original versus remake, prompt completeness, claimed stack versus observed/source-inspected stack, and actual visual/audio coverage. Extract a testable mechanism, then create an original result around the user's product. These collections are discovery corpora, not a labeled training set or controlled evidence that a tool, prompt length, model or visual effect causes quality. Selection favors shared successes and provides no failure denominator. Do not derive success probabilities or universal weights from their examples.

## Implications for the mathematical model

These repositories add **observable production variables and engineering constraints**; they do not provide a validated formula for greatness.

- Separate the latent judgment of a good film from proxies: text visible long enough, intended cues aligned, stable seeking, coherent treatment, and correct export. A film can pass all those checks and still be forgettable.
- Model audience, goal, platform, duration and prior familiarity explicitly. A story-first explainer and a silent motion loop should not receive the same target weights.
- A useful readability diagnostic is `available readable seconds / required reading budget`; preserve the budget assumptions, content identity and limiting interval. Do not infer comprehension from that ratio alone.
- A useful timing diagnostic is error relative to the **declared intended cue plus intentional offset**. Do not reward every cut for landing on a beat or penalize planned silence.
- Engineering feasibility belongs in a gate or constraint: a non-repeatable simulation, cropped proof, false product claim or broken export cannot be compensated for by more bloom, particles or music.
- Begin with hypotheses and explicit uncertainty. Calibrate against blinded human pairwise preferences and separate comprehension/recall/action outcomes, using held-out films and creators. Include unsuccessful and quiet/editorial videos as well as polished viral samples.

The additions recommended here are original synthesis from inspected source mechanisms. They should improve what the director checks and measures without turning one repository's style into the mandatory look of every film.
