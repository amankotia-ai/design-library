# Finishing and review

Plan the finish while designing the image. Finishing cannot rescue weak hierarchy, unclear product proof, or unmotivated movement. Assign an intentional treatment per layer, then inspect the encoded result.

## Finish recipes as choices

| Treatment | Build from | Protect | Typical failure |
|---|---|---|---|
| Pristine product/editorial | Precise type, controlled palette, clean edges, restrained shadows | Native UI colors and readable text | Generic floating cards and excessive depth |
| Tactile print | Paper/fiber plate, restrained ink/registration texture, graphic lighting | Copy, contrast, material consistency | Noise pasted over everything |
| Photographic/cinematic | Chosen lens/framing, motivated light, coherent plates and grade | Authentic subject, highlight/shadow detail, product insert fidelity | Unrelated stock footage with a universal LUT |
| Luminous/spatial | Geometry/material, emissive sources, controlled bloom, atmosphere | Silhouette, blacks, stable exposure, UI proof | Bloom hiding edges; grey, crushed, or clipped image |
| Stop motion/cutout | Designed poses, stepped cadence, consistent shadow/material | Object identity and intentional holds | AI variation mistaken for craft |
| Technical/diagrammatic | Lines, labels, grids, clear relationships, precision | Hierarchy and truthful relationships | Decorative data with no meaning |

Choose a material or light behavior because it supports the visual thesis. A software screen may remain clean while its surrounding world is tactile or cinematic.

## Color pipeline

Declare source interpretation, working space/transfer, linear-light operations where needed, and delivery transform. Avoid silently treating log, linear, sRGB, Rec.709, and HDR content as interchangeable. Confirm whether alpha is premultiplied before compositing. Compare native product swatches through the actual render/composite/encode path; a darkened UI may be a transform/material error.

Use scopes alongside visual inspection for clipping, black level, contrast, and gamut excursions. Blackmagic's official training provides color-management and grading instruction; select the relevant manual/version when doing actual grading. [Official training](https://www.blackmagicdesign.com/products/davinciresolve/training). This skill does not bundle a calibrated display pipeline or prescribe an HDR transform.

The inherited browser exporter explicitly converts/tag SDR MP4 as limited-range BT.709 and encodes yuv420p. Test saturated accents, subtle gradients, fine lines, and type against the encoded output. Browser pixels and video pixels need not match without a defined transform. Deliver alpha or HDR only through a verified route; changing file extensions or tags is insufficient.

## Blur, texture, and optical effects

Temporal motion blur samples exposure over time. Its exposure duration is `shutterAngle / 360 / fps`; a 180° shutter is an aesthetic convention, not a universal requirement. A spatial blur on one frame is not equivalent. If using temporal samples, all systems must evaluate fractional time, including masks, camera, and media. Verify correct color/alpha averaging. The bundled exporter supports fractional still seeking but does not implement multi-sample temporal accumulation.

Use motion blur to integrate fast travel, then settle into crisp proof. Depth of field belongs to a depth model; avoid arbitrary blur that obscures necessary UI. Bloom, halation, lens distortion, chromatic aberration, vignette, grain, and dither are distinct effects. Define strength, spatial scale, layer scope, and temporal behavior instead of adding a generic “cinematic” stack.

Noise/grain should be seeded or temporally intentional; static noise may look stuck to the screen, while uncorrelated noise may shimmer. Texture size must suit the output resolution. Inspect compression because grain and gradients can substantially change encoded quality and bitrate. Do not claim these effects are implemented simply because a renderer can run shaders.

## Review in passes

Use the [required contact-sheet protocol](contact-sheets.md) and actual [independent-reviewer agent](../agents/roles/independent-reviewer.md). Review the same decoded-export sheet revision through both services before final integration. Include all shots, dense joins/proof, risky finishes and every aspect variant. Keep the full-file playback/audio checks below separate from image-only model critiques.

1. **Comprehension:** after a clean viewing, state the product promise, demonstrated mechanism, and intended action. Check where the argument depends on unexplained context.
2. **Art direction:** coherent palette, typography, composition, motif, material, image quality, and deliberate variation. Look for one weak generic shot disrupting the world.
3. **UI truth and readability:** accurate states, data continuity, useful crops, complete controls/labels, visible action/feedback/result. Review smallest intended display size and captions.
4. **Motion/camera:** original-speed pacing, attention path, acceleration/settle, motion hierarchy, anchors, occlusion, transition joins. Inspect consecutive frames when something pops or drifts.
5. **Audio:** actual listening, voice intelligibility, sync, music/sound arc, tails, clicks, peak/loudness measurement, caption correctness. A waveform review does not satisfy this pass.
6. **Technical delivery:** decode the final file, verify duration/frame count/timebase, dimensions, codec/pixel format/color tags, audio streams, beginning/end, missing assets and unintended black/duplicate frames. Intended holds are valid repeats; investigate before removing them.

Review with sound and muted where relevant. Inspect each transition before, during, and after; inspect the proof at rest. Sample encoded stills at risky frames, then play the film at original speed. Record each pass as performed, partial, or unavailable. Hash-based repeat-seek checks establish reproducibility for sampled states, not aesthetic quality.

## Prioritize findings

Fix factual misrepresentation, broken output, missing proof, unreadable essential text, and intelligibility first. Next fix distracting continuity/timing/hierarchy defects. Then refine texture, polish, and taste differences. Attach notes to actual shot/frame ranges and consequence. An average score cannot cancel a critical failure.

After a change, recheck affected joins/audio and whole-film pacing. Reframe/recompose alternate aspect ratios; automatic center crops can destroy the subject and text. Preserve safe areas for destination UI. Package revisioned source, assets, export, audio/captions, and technical/review manifest. Do not imply the distribution platform was tested unless it was.
