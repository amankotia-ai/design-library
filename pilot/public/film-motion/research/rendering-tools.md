# Rendering, motion-tool and finishing research

Research date: 6 November 2026. This is a source investigation and an implementation recommendation, not a renderer benchmark. No final film or GPU speed comparison was rendered in this study.

## What was inspected

| Tool | Authoritative source | Snapshot | Inspection |
|---|---|---|---|
| REA | [morluto/rea](https://github.com/morluto/rea) | `0beedcd712e39a7d93e4558ee56fd596eaa22838`, package 6.8.0 | Public source cloned; pinned CLI acquired in a temporary cache and run on selected HyperFrames engine files. |
| HyperFrames | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | `4935d6736b64ed3dd68524c1cb2c7f011171baef`, engine/core/producer/CLI 0.9.17 | Public source cloned; seek, capture, blur, encoding and GPU encoder source read. |
| FFrames | [dmtrKovalenko/fframes](https://github.com/dmtrKovalenko/fframes) | `49b76066abbc95f5c77ce7755f478e0bfcefc9f2`, workspace/editor 1.4.1 | Source-only checkout; selected JS editor analyzed with REA; Rust renderer source traced directly. |
| wgpu | [gfx-rs/wgpu](https://github.com/gfx-rs/wgpu) | Current upstream README/docs, not a pinned build | Native API/backend capabilities checked. |
| Stageshow | [benjitaylor/skills](https://github.com/benjitaylor/skills/tree/299140fafd08df55a9c234e610c3f64af3f45531/stageshow) | SKILL 1.1.1, commit `299140f` | Entrypoint, framing, craft, motion and rehearsal read; [production integration](../skills/software-film-director/references/stageshow-framing.md). |
| Emil Kowalski skills | [emilkowalski/skills](https://github.com/emilkowalski/skills) | `main` retrieved | README, `animate` and `choreograph` inspected as research data. |

The initial REA search result was a fork, `watsontree/REA`. Following its upstream link identified `morluto/rea`; that is the repository used. The user supplied only the name REA, so this is an explicit, well-supported interpretation rather than a claim about an exact URL they provided. No agent configuration or global skill was installed.

## Actual architecture and routing

| Concern | HyperFrames | FFrames | Decision for the film skill |
|---|---|---|---|
| Authoring | HTML/CSS/media with seekable animation adapters, including GSAP | Rust frame functions producing SVG-like `svgr!` trees | Use the representation that can faithfully express the shot and be revised quickly. |
| Main 2D raster path | Headless Chrome driven by Puppeteer/CDP | Built-in CPU rasterizer or optional Skia GPU backend | Browser GPU use does not make HyperFrames a native wgpu renderer. Skia GPU does not mean wgpu either. |
| Frame clock | Page protocol `window.__hf.seek(time, options)` and capture synchronization | Explicit `Frame` input to `Video::render_frame` | Every authored state must seek correctly in arbitrary order. Use deterministic asset versions, fonts and seeds. |
| Capture/export | Browser screenshots/BeginFrame; FFmpeg encoding and audio mixing | libav/FFmpeg frame and media pipeline | Rendering and encoding are separate costs. Report both. |
| 3D | Three.js or other web content behind the seek protocol | Optional `fframes_three_d`, with CPU rasterizer and native wgpu path | Use actual geometry only when parallax, occlusion, reflection or lighting changes tell the story. |
| Real product UI | Browser-native layout has a natural fidelity advantage | UI needs to be authored as supported SVG/text/images or supplied layers | Do not promise a free DOM-to-wgpu conversion. Verify text shaping, masks, filters and layout. |
| Appropriate first use | Product UI films, GSAP choreography, brand type and browser graphics | Vector-led films, large repeated graphics, Rust-native pipelines, selected GPU 3D | Prototype the hardest shot before moving the entire film to a new backend. |

Primary evidence: [HyperFrames core adapters](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/packages/core/README.md), [engine services](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/packages/engine/README.md), [FFrames renderer overview](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/AGENTS.md), [FFrames 3D crate](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-three-d/src/lib.rs).

### HyperFrames call path and relevant implementation details

The high-level producer compiles/probes media, prepares audio, chooses a capture plan, captures/encodes and assembles. It supports streaming and disk routes; more workers are not always faster because browser instances compete for memory, GPU and encoding throughput. [Producer pipeline](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/packages/producer/README.md).

The engine's `seekPageTimeline` forwards the time to the page's `__hf.seek` and checks for pending page composition. Separate completion/readiness work matters for asynchronous images, nested animation runtimes and GPU canvases. A screenshot taken before this work completes can be sharp and still be the wrong frame. [Frame capture source, around line 3359](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/packages/engine/src/services/frameCapture.ts#L3359).

The screenshot service contains both `HeadlessExperimental.beginFrame` and `Page.captureScreenshot` paths. Backend choice depends on platform/capture requirements. Do not assume the BeginFrame path shown in a short README is used for every platform and format. [Screenshot service](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/packages/engine/src/services/screenshotService.ts#L148).

True capture motion blur samples subframes across an exposure window and accumulates them. This covers rotation, scale, opacity and child animation, unlike duplicated offset layers. Current options include sample count, shutter angle/phase and `srgb` or `linear` blending; defaults are an artistic implementation choice, not a universal cinema standard. This multiplies capture work and must be included in performance tests. [Motion-blur source](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/packages/engine/src/services/motionBlur.ts#L1).

Hardware encoder detection probes NVENC, VideoToolbox, VAAPI, QSV and AMF, with software fallbacks elsewhere. A working hardware encoder accelerates compression; it does not remove browser layout, paint, screenshot transfer or source video decoding. [GPU encoder source](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/packages/engine/src/utils/gpuEncoder.ts#L14), [encoder arguments](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/packages/engine/src/services/chunkEncoder.ts#L283).

### FFrames GPU paths

FFrames exposes CPU and Skia rendering separately. Optional 3D uses a scene graph with a camera, meshes and materials. Its native wgpu path targets Vulkan, Metal or DX12; the documented default remains a CPU rasterizer, with CPU fallback when a usable GPU is unavailable. The wgpu feature is not evidence that every SVG operation is executed by wgpu. [3D implementation contract](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-three-d/src/lib.rs#L1).

The Skia frame exporter negotiates three paths: hardware frames, GPU pixel conversion with readback, or CPU conversion after RGBA readback. Its `path()` method exposes which route was chosen. Hardware-frame acceptance checks the requested stream format; an alpha, 10-bit or 4:4:4 request cannot silently become an 8-bit 4:2:0 stream. [Frame export source](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-skia-renderer/src/frame_export/mod.rs#L12).

Shared GPU resources are an explicit integration, not a consequence of using two GPU libraries. The inspected backend modules include Vulkan/wgpu sharing. VideoToolbox and Vulkan Video hardware-frame paths have their own capabilities. Verify the exact combination of platform, features, driver, codec and pixel format before promising zero readback. [Backend contracts](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-skia-renderer/src/backends/mod.rs#L1).

### FFrames direct Rust source trace

This is direct source reading, separate from REA's JavaScript analysis. `Video::render_frame` is documented as pure because concurrent frame rendering is allowed. `compile-time-svgtree` enables prebuilt trees/static-subtree hashes; the Skia backend requires it. This can avoid parsing and rerasterizing unchanged structure, but scene-specific savings still require measurement. [Core pipeline](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes/src/lib.rs#L6).

The native backend interface separates single-frame previews, encoder input negotiation and per-thread frame renderers. The frame exporter makes the negotiated route observable. The `metal` implementation explicitly delegates hardware frame negotiation to VideoToolbox. Vulkan/wgpu interop opens the same native Vulkan device for both libraries, including required extensions/features. This is concrete interop code; enabling a generic wgpu feature on an unrelated Metal setup is not equivalent. [Backend trait](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes/src/renderer/render_backend.rs#L11), [Metal negotiation](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-skia-renderer/src/backends/metal.rs#L155), [Vulkan/wgpu sharing](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-skia-renderer/src/backends/vulkan_wgpu.rs#L1).

The inspected 3D GPU code uploads rigid meshes once, but deforms skinned/morphed meshes on the CPU and streams vertices. Its documented sequence is shadow maps, optional reflections, geometry/particles into a 4x-MSAA HDR target, depth of field, temporal accumulation, then bloom and tone mapping into premultiplied sRGB pixels. Source constants identify `Rgba16Float` intermediate color and an `Rgba8Unorm` output. This provides a useful implemented finishing reference without implying arbitrary export HDR precision. [GPU passes and formats](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-three-d/src/gpu/mod.rs#L1).

The browser player calls `Wasm.controller.render_frame(BigInt(frame))`; the Rust WASM bridge then calls the video's frame function and returns SVG text. That preview route is distinct from the native Skia/encoder route. [Player calls](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-editor/src/Player.bs.js#L270), [Rust bridge](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-editor-controller/src/wasm_editor.rs#L318).

## REA execution and evidence limits

The actual CLI was pinned to `rea-agents@6.8.0` and run with an isolated Node 24.22.1 runtime. The host default was Node 20.20.0, below REA's declared engine range. REA's source and CLI help were checked before selecting a static analysis command. No target application or native binary was executed by the static analysis.

Selected HyperFrames engine sources were `frameCapture.ts`, `screenshotService.ts`, `motionBlur.ts`, `streamingEncoder.ts`, `chunkEncoder.ts` and `gpuEncoder.ts`. REA parsed six files, visited 34,344 AST nodes and reported no parse failures. The final invocation exited 0 with no semantic retention truncation. This is deliberately scoped evidence: 255 inventoried files were outside scope and conservative semantic unknowns remain. The graph explicitly reports partial coverage. A summary view's complete-within-view status does not mean complete repository analysis.

Final artifacts: `research/rea-evidence/hyperframes-engine-clean.bundle.json` contains the exported evidence; `hyperframes-engine-clean.summary.json` is the compact summary and `hyperframes-engine-clean.progress.jsonl` records progress. Two earlier attempts remain for diagnosis: the sandbox first blocked Swift's default module cache, then allowed analysis/export but prevented cleanup process-table inspection. The final run used REA's source-exposed `REA_DARWIN_MODULE_CACHE_PATH` override under `/private/tmp` and approved process-table access; it completed cleanly. No sandbox failure was treated as evidence about the renderer. Earlier capped evidence is retained separately and is superseded by the clean run.

FFrames REA coverage was restricted to five JS/TS editor files: `src/WasmController.bs.js`, `src/Player.bs.js`, `src/services/AnimationRuntime.bs.js`, `src/services/VideoFrameDecoder.ts` and `src/services/VideoFrameBufferManager.ts`. It parsed all five, visited 4,095 AST nodes, reported no parse failures and no semantic retention truncation, and exited 0. Thirty-nine files were excluded. The generated `WasmController.bs.js` is empty because its type/extern declarations compile away; the real declaration was read in `WasmController.res`, and the actual call appears in `Player.bs.js`. The corresponding Rust bridge and native renderer were read directly, not analyzed by REA's JavaScript lane. Saved evidence: `research/rea-evidence/fframes-editor.bundle.json`, `.summary.json` and `.progress.jsonl`.

Bounded follow-up traces were also saved. The application-feature string traces returned no matches for the chosen seeds; this is not evidence that the APIs are absent. The FFrames semantic property query found the `render_frame` property but retained three relevant unknowns and no traversed relations, so it does not resolve the native implementation. HyperFrames' literal semantic query had no retained seed match and reported partial status. Those limits are why the architecture conclusions above also cite the actual source functions. `research/rea-provenance.json` gives a compact manifest of snapshots, coverage and artifacts.

REA identifies static observations and conservative relationships. It does not measure speed, prove pixel fidelity or establish runtime execution. FFrames' Rust renderer source must be traced as Rust, not passed to a JavaScript analyzer and described as analyzed. A future compiled binary investigation would require an appropriate native provider and a separate concrete question; it is unnecessary for understanding available open source.

## Proposed native wgpu rendering design

### Using the existing tools before building a renderer

These are source-verified entry points, not commands executed as a film benchmark here. Check current local help and pin the selected version in the generated project. Framework initialization can add its own skills; inspect those changes rather than silently importing their workflow into this skill.

For HyperFrames 0.9.17, create a project with `npx hyperframes@0.9.17 init my-video`; inside it, use `npx hyperframes@0.9.17 preview` and `npx hyperframes@0.9.17 render -o output.mp4`. Use its `doctor`, `info`, and `benchmark` commands to inspect the environment and test the selected composition. Those commands still exercise Chrome/FFmpeg, not a native wgpu renderer. [Pinned CLI guide](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/packages/cli/README.md).

FFrames' source documents `cargo install --locked cargo-fframes`, then `cargo fframes new my-video`. Inspect `cargo fframes new --help` for backend/template/format/fps options and preserve the generated lockfile. Inside the generated project, `cargo run --release -- timeline`, `inspect`, `frame`, `strip`, `audio analyze`, `preview`, and `render` are available through its CLI. `inspect` uses a sampling cadence by default; it is not an every-frame pixel review. [Pinned usage guide](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/README.md).

For native FFrames 3D, the inspected 1.4.1 feature/API shape is:

```toml
# Merge with the generated project's selected backend/CLI/codec features.
fframes = { version = "=1.4.1", features = ["3d", "wgpu"] }
```

```rust
use fframes::three_d::Renderer;
let renderer = Renderer::new(1920, 1080).gpu();
let actually_on_gpu = renderer.uses_gpu(); // record this, not only requested features
```

This is an API sketch read from source, not a compiled example in this project. These features enable the 3D wgpu route; they do not by themselves select Skia for the surrounding 2D tree, grant zero-copy encoder interop, or prevent CPU fallback. With the feature enabled, `Renderer::new` already requests GPU rendering; `.gpu()` makes that intent explicit and `uses_gpu()` distinguishes a usable device. Render scene/camera state from absolute time, insert the resulting image into the SVG tree, and keep critical UI in its intended color path. For a shared-texture route, use the supported backend's shared device; independently creating another GPU device does not establish compatible texture sharing. [Feature definitions](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes/Cargo.toml#L65), [Renderer API](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/fframes-three-d/src/render/mod.rs#L146).

Start by rendering the hardest actual shot and logging the negotiated drawing/export/encoder paths. Compare that output and iteration time with the browser route before committing the whole film.

This section is an engineering recommendation, not an implemented renderer in this project. wgpu is a cross-platform graphics API, not a video encoder, font engine, DOM renderer or automatic cinematic finish. It supports native Vulkan/Metal/D3D12/OpenGL and browser WebGPU/WebGL routes, with differing capabilities. [wgpu upstream](https://github.com/gfx-rs/wgpu/blob/trunk/README.md).

If a native renderer becomes justified, use this shape:

1. Ingest and validate media once. Cache fonts, shaping results, glyph atlases, vector tessellation, decoded image textures and immutable geometry. Keep exact UI type and colors as test fixtures.
2. Evaluate a stateless scene from frame index, rational frame rate, seed and immutable edit data. Evaluate fractional times for motion blur. Store shot IDs and transition boundaries, not only an accumulating animation clock.
3. Keep the GPU device, queue, pipelines, bind groups and resource pools alive. Reuse buffers and update only changing transforms/uniforms. Instance repeated objects when their draw order and masks permit it.
4. Render layers with explicit color space and alpha conventions. If scene lighting and bloom require it, use a floating-point linear working buffer. Keep display-referred UI layers out of a lighting tone map that would recolor the product.
5. Apply only the passes selected by the art direction. Mask-aware blur, bloom and depth effects need their own quality budget. Composite text and critical UI at a stage that preserves intended legibility.
6. Prefer verified native texture-to-encoder interop where the device and codec support it. Otherwise use a bounded asynchronous staging-buffer ring, handle row padding correctly, remove padding for the encoder and preserve frame ordering. A GPU shader followed by a synchronous readback on every frame can erase the benefit.
7. Overlap evaluation, GPU drawing, readback and encoding within bounded memory. Measure each stage; stop adding workers when contention makes throughput worse.
8. Preserve an image-sequence or suitable intermediate route for finishing. Encode distribution copies from the approved master and verify the actual decoded pixels and audio.

Before choosing this design, compare the cost of building text/layout, effects, video decode and cross-platform encoder interop with using an existing FFrames backend or a hybrid pipeline. A high-quality single film rarely justifies implementing all of these systems from scratch.

## Benchmark protocol before claiming fastest

Use the same visible content, fonts, assets, duration, frame rate and final quality target across backends. Include at least: (a) dense UI typography, masks and translucent panels; (b) vector type and repeated geometry; (c) image/stop-motion collage; (d) genuine 3D materials and camera; (e) decoded video plus audio. Keep 1080p and 4K results separate.

Record machine, OS, CPU/GPU, RAM/VRAM, driver, AC/battery state, tool commits, build profile, browser version, codec, pixel format, quality settings, worker count, cache state, temporal samples and the actual negotiated GPU/encoder path. Warm shader/pipeline/font caches for warm tests; include dependency acquisition and Rust compilation in a separate cold-start measure. Do not hide setup cost inside one tool and exclude it from another.

Run repeated warm trials, report median and spread plus cold startup, total wall time, sustained output fps, peak memory and output size. Separately measure decode, evaluation, rasterization, transfer and encode when instrumentation exists. Use an image-sequence or lossless common encode to isolate raster cost; use matched delivery quality to compare end-to-end time. A hardware encode at a different quality setting is not a fair renderer comparison.

Quality gates: no missing glyphs/media, matching layout and alpha, correct duration/frame count and audio sync, no unseeded drift, readable proof holds, no boundary discontinuities. Random-order frame seeks must match sequential renders within a declared pixel tolerance. Publish failures and fallback paths alongside successes. Existing repository demo timing is an upstream claim for its specific scene and hardware, not a universal speed result.

## Finish is an authored treatment

These are proposed recipes to test with actual style frames and encoded playback. They are not findings from inaccessible reference videos.

| Treatment | Build decisions made before animation | Motion/time treatment | Finish and rejection checks |
|---|---|---|---|
| Editorial paper/collage | Limited palette, photographed or generated cutouts, paper scale, deliberate type grid, coherent edge/shadow language | Stepped holds, deliberate pose replacement, selective smooth camera; optional texture registration drift | Grain belongs to surfaces, not a global dirt overlay. Shadows must share a light. Reject unreadable copy and cutouts that visibly change identity. |
| Clean editorial UI | Real product tokens, expressive crop, bold negative space, one focal operation, restrained backgrounds | Object continuity, typographic cuts, pauses on proof | Preserve native UI colors and text sharpness. Reject decorative blur/glow that muddies evidence. |
| High-motion graphic | Small vocabulary of scale, masks, matched shapes and directional flows; contrast planned per beat | Acceleration/deceleration selected for mass and intent; transitions hand off a persistent anchor | Use temporal blur only on travel where it adds continuity. Reject every element moving equally, repeated whips and joins that hide weak ideas. |
| Cinematic material | Real geometry, intentional lens/framing, motivated light, coherent roughness and reflections | Dolly/truck/orbit tied to reveal and depth, not continuous aimless rotation | Control highlights before bloom; depth of field only where depth and focus serve the shot. Keep product proof sharp. Reject clipping, plastic generic materials and inconsistent lighting. |
| Stop motion | Consistent asset camera, silhouette, light, shadow and palette across poses | Explicit exposure cadence and hold frames independent of export fps | Crisp pose changes may need zero motion blur. Reject accidental interpolation and unstable product marks. |

A useful pass order for a lit scene is lighting/exposure, material and shadow review, depth/velocity effects, glow, grading/tone mapping, compositing of protected UI/type, grain/dither if selected, resize and encode. This is a recipe, not a universal ordering law; a deliberately photographic UI-in-world shot may need a different order. State the chosen order in the look specification.

Subframe sampling example: for output fps F, frame f, shutter angle theta, phase phi and N samples, sample time is `f/F + phi/(360F) + (k+0.5)*theta/(360FN)`. Clamp or deliberately resolve samples at shot boundaries so an unplanned adjacent scene does not ghost into the cut. This math does not substitute for normal-speed review. Sharp holds and blurred travel can coexist by layer or exposure schedule.

Delivery decisions include aspect ratios, safe areas, codec/pixel format, color metadata, audio target and captions. An 8-bit browser screenshot encoded into a 10-bit container does not acquire additional source precision. Alpha, HDR and hardware encode routes must be tested as exact combinations. Judge gradients, small saturated text, thin strokes, noise and motion after the platform encode because compression changes them.

## Learning from the two supplied skill repositories

**Stageshow:** its useful unit is a miniature product story with a focal object, caused action and visible payoff. Keep enough product structure to be recognizable while simplifying nonessential detail. Frame the action before building every screen. Preserve the trigger, cursor destination, overlay and result throughout motion; crop filler rather than meaningful words. Use a poster frame after the action lands. Those principles transfer to film. Its hero-loop lengths, crop percentages and web-card defaults are medium-specific examples; they do not decide launch-film duration or force every software shot into a card. [Entrypoint](https://github.com/benjitaylor/skills/blob/main/stageshow/SKILL.md), [framing](https://github.com/benjitaylor/skills/blob/main/stageshow/references/framing.md), [motion](https://github.com/benjitaylor/skills/blob/main/stageshow/references/motion.md).

**Emil Kowalski:** assign moving elements different jobs, remove motion that weakens hierarchy and sequence only when order carries meaning. Treat cause, consequence and interruption explicitly in real interactive UI. Match easing to the action: a decisive entrance, a controlled relocation, a constant conveyor. These are useful reasons for choices. The repository's frequent-use UI timing rules are not film pacing limits, and its property restrictions are not a ban on carefully authored cinematic masks, lens motion or layout animation in offline exports. [Animate](https://github.com/emilkowalski/skills/blob/main/skills/animate/SKILL.md), [choreograph](https://github.com/emilkowalski/skills/blob/main/skills/choreograph/SKILL.md).

The skill should cite and synthesize these sources, not silently install them as dependencies or inherit their unrelated response protocols. Stageshow is MIT with its own third-party notices; Emil's repository is MIT. HyperFrames is Apache-2.0; FFrames and REA identify MIT. Preserve required notices when redistributing source or substantial portions. Media, fonts, model outputs, FFmpeg build options and dependencies have their own terms; a framework license is not a license to all reference assets. [Stageshow license](https://github.com/benjitaylor/skills/blob/main/stageshow/LICENSE), [Emil license](https://github.com/emilkowalski/skills/blob/main/LICENSE), [HyperFrames license](https://github.com/heygen-com/hyperframes/blob/4935d6736b64ed3dd68524c1cb2c7f011171baef/LICENSE), [FFrames license](https://github.com/dmtrKovalenko/fframes/blob/49b76066abbc95f5c77ce7755f478e0bfcefc9f2/LICENSE.txt), [REA license](https://github.com/morluto/rea/blob/0beedcd712e39a7d93e4558ee56fd596eaa22838/LICENSE).


## Claude Code packaging verification

Official Claude Code documentation confirms `/skill-name` invocation and automatic use when relevant. The official platform guide explicitly lists `.claude/skills/<name>/SKILL.md` for a project and `~/.claude/skills/<name>/SKILL.md` for personal skills. These locations are filesystem-based and do not require API upload. Checked 6 November 2026. [Claude Code skills](https://code.claude.com/docs/en/skills), [platform overview, Claude Code section](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#claude-code).
