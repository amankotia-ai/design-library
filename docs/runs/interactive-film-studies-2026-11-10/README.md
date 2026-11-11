# Interactive film mathematics

Eight additional interactive studies extend Film & Motion. The existing scene calculus remains available, giving nine mathematical examples and 81 library entries. Each new study uses exported pure functions for its visual and measured results; equations and assumptions remain visible.

| Entry ID | Concept | Visible consequence |
|---|---|---|
| spring-motion | Underdamped oscillator and analytic derivatives | Displaced mass, settling curve, velocity and acceleration |
| bezier-paths | Cubic Bézier geometry and parameter derivatives | Control polygon, tangent, path and speed curve |
| camera-parallax | Pinhole projection and sensitivities | Depth layers shift by different amounts under one camera move |
| framing-crop | Cover fit, anchor offset and rectangle intersection | Source crop, delivery frame and retained protected area |
| speech-timing | Source-to-program affine time map and frame quantization | Retained word, picture cue, offset and trimmed-away anchor |
| reading-window | Interval intersection and declared reading budget | Caption, stable window, assumed requirement and deficit |
| sound-mixing | Decibel conversion, sine addition and finite-window integral | Raw/clipped waveform, amplitude bound, sampled peak and exact RMS |
| sampling-aliasing | Frequency folding and discrete sample identity | Original/aliased orbits and coincident sampled positions |

Open `?panel=film&entry=<entry-id>`. The example selector links all nine studies. The Mathematics topic in Film & Motion lists the same entries. Relevant production guides now link to their corresponding experiments. New study References tabs offer the actual executable mathematical modules as downloads.

## Scope and implementation

These are authored mathematical teaching models inspired by [The Calculus of Interfaces](https://calculus-of-interfaces.vercel.app/). The Design Systems collection/detail layout, type, spacing and library tokens are retained. Mobile experiments adapt to their actual pane width. No arbitrary-video compiler, artistic-quality predictor or empirically validated reading law is claimed.

Spring derivatives have time units; Bézier derivatives explicitly use the path parameter. Perspective uses positive depth and lateral camera translation. Crop percentages measure rectangle area. Speech anchors and reading rates are authored inputs. Sound RMS integrates the declared finite signal window; sampled peaks are labeled as samples. Aliasing is ideal point sampling without a shutter/exposure filter.

Implementation owners: `/root/quality_model_design` (motion, path, camera and crop); `/root/repo_runtime_review` (timing, reading, signals and sampling, with product/art-direction review); `/root` (shared UI, registry, data, related links, browser tests and guarded delivery). `/root/independent_final_qa` inspected the reference and performed independent final review of source, equations and 21 screenshots. See `QA.md` for exact scope and hashes.

## Validation

- Eleven motion/geometry mathematical checks and nineteen timing/signal checks.
- Existing fourteen scene-calculus checks and the library content checks.
- Route/source integrity checks ensure downloadable functions match the executed files.
- Browser checks changed a meaningful control in all eight studies and verified both metrics and visuals changed. Nine math cards, the study selector, relevant-guide links, eight Markdown downloads and two source modules were checked.
- Desktop 1440px, mobile 390px and a 900px tablet example were captured; no page errors or document-width overflow were found.
- Independent review passed against the source hashes in `browser-check.json`.

The project budget began 14:13:44 UTC and ends 14:33:44 UTC. This run performs one implementation and independent review pass. It preserves existing uncommitted work and adds a new run-evidence folder; it does not commit, push or deploy the site. The local preview remains available for the user at port 5178.
