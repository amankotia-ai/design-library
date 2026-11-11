---
name: software-film-director
description: Direct and produce software brand launches, feature films, and video sales letters in editorial or high-motion treatments, from reference study and story through frame-addressable animation, sound, finishing, and review. Use for complete product films or substantial film revisions, not ordinary website microinteractions.
---

# Software film director

Make the audience care about a specific change, show credible product proof, and give that change a distinctive visual world. Treat story, graphic design, camera, motion, sound, and finishing as one edit. This is our personal internal Claude/Codex production workflow and evidence library; it does not fine-tune a model or guarantee artistic quality.

## Resolve the brief and duration

Reuse supplied material and previous decisions. Establish the product, intended audience, distribution context, desired action, central benefit, evidence, brand assets, and constraints. Ask only material unresolved questions, bundled concisely. Never fabricate product capabilities, testimonials, metrics, customer logos, or urgency. Label concept UI when a viewer could mistake it for a shipped capability.

Honor any duration or range the creator specifies. Otherwise recommend a duration from the audience's familiarity, the film's goal and placement, the proof/argument required, and the actual narration/readability budget. Explain the reason and proceed with a clearly stated working duration; do not make the user choose an arbitrary runtime before useful work begins. Do not silently default every film to 15, 30, or 60 seconds. Revise the recommendation when the timed read or animatic shows the argument needs more or less room. Longer VSLs require sustained argument and proof, not stretched launch montage.

Choose one dominant direction using [directions.md](references/directions.md):

- **Editorial:** authored layouts, typography, deliberate cuts, stillness, tactile or photographic material, and lucid proof. Motion can be expressive; quiet does not mean unfinished.
- **High motion:** identity-led transformations, spatial staging, rhythmic density changes, decisive camera moves, and designed sound. Readable destinations remain essential.

Either direction can serve a brand launch, feature highlight, or VSL. A hybrid needs a stated reason and a shared visual system. Do not confuse treatment with video purpose.

## Direct a coordinated team

Read [team-and-handoffs.md](references/team-and-handoffs.md). Use the actual role prompts in `agents/roles/` for director, reference analyst, story strategist, art direction, UI, motion, cinematography, assets, editing, narration, sound, compositing/color, rendering, and independent review. One active host director owns integration. Delegate bounded jobs to real agents/CLI workers when available; record sequential role passes honestly when unavailable. Delegate goals and interfaces, not isolated stylistic guesses. Assign file ownership and one authoritative timeline.

The team covers art direction, story/editing, UI design, motion, cinematography, narration/audio, rendering/compositing, and review. Every consequential choice has an owner, a purpose, an implementation, and an inspection point. Parallelize independent work; integrate through shared shot IDs, tokens, assets, and explicit entrance/exit states. A reviewer can stop delivery for an observed defect, not rewrite the film by preference alone.

Use [cli-collaboration.md](references/cli-collaboration.md) and `scripts/film_team.py` to dispatch parallel stage waves through Claude Opus 5.5 (`claude-opus-5-5`) and Codex Sol 6.1 (`gpt-6.1-sol`). Claude-led work gets Codex critiques; Codex-led work gets Claude critiques. Run fresh second opinions at direction/storyboard and actual rendered-cut stages, with additional external tests for consequential uncertainties. Keep exact model IDs, source packets, actual image inputs, dependency handoffs and execution receipts. The user authorizes this normal personal cross-service workflow; do not create repeated permission gates. If a service fails, preserve the failure and continue independent work without inventing its review or silently switching models. Only the host director integrates shared files.

## Make contact sheets throughout

Use the [Stageshow-informed framing pass](references/stageshow-framing.md) before detailed product UI and choreography. Art/UI/camera agents compose the focal object, recognizable context, action/overlay envelope and settled result at actual delivery sizes. Record the crop and protected proof in the shot contract; inspect opening, busiest/open-overlay and poster frames plus aspect variants before polishing motion. Apply the pass in both film directions.

Contact sheets/frame layouts are required production artifacts. Read [contact-sheets.md](references/contact-sheets.md) and use `scripts/contact_sheet.py` for labeled sheets and exact cell manifests. Produce and inspect them for references, the complete storyboard, style frames/assets, animatic, shot/transition work, proof holds, finishing, final decoded export, and every delivery variant. They must identify shot, frame/PTS, source type, stage and revision. Use actual rendered/decoded frames after implementation begins; keep schematics clearly identified in planning material. Give the same sheet revision to both services and record which cells each role inspected. Refresh affected sheets after changes. Sheet creation is not inspection, and sheets do not replace original-speed playback, native-size detail or audio listening. Every non-brief CLI stage requires sheet image inputs; missing sheets leave that visual pass pending.

## Study references before borrowing

For this collection read [reference-library.md](references/reference-library.md), then only the studies relevant to the brief. User comments are taste evidence; frame observations are source evidence; suggested GSAP/shader/3D construction is implementation inference. Keep them separate. Borrow mechanisms and reasoning, not another brand's identity or unlicensed assets.

For creator-led cinematic references, use [creator-craft.md](references/creator-craft.md): Gawx's dated process explanations and two consecutive-frame film studies, plus adjacent creator/process and forum research. Develop a causal argument, motivated coverage, intentional visual/sound density and stable product proof. Preserve the distinction between direct frames, maker statements, community guesses and proposed software applications; no creator name, LUT or effect stack substitutes for a direction.

For new reference media follow [reference-analysis.md](references/reference-analysis.md). Inventory every linked asset, including multiple clips in one post and image-only posts. Index the complete decoded timeline, map all shots, inspect dense transition windows at native frame cadence, and review original-speed playback and sound where available. Save source timestamps, decoded indices, review scope, and uncertainty. Contact sheets alone do not establish motion feel, audio quality, or every-frame visual review.

Use `scripts/analyze_video.py SOURCE NEW_OUTPUT` for a complete decoded-frame index and every-frame thumbnail sheets. `--step N` produces a sampled study and must be labeled as such. Use `--start-frame A --end-frame B` for dense windows; end is exclusive. The helper needs Python 3, FFmpeg, and ffprobe; it performs extraction, not visual analysis. Track inaccessible sources rather than inventing a breakdown.

## Build one coherent film

Apply the [creative quality gate](references/creative-quality.md) before full production: compare actual finished candidate images with the selected references, distinguish schematics from finished art, and prove a real demanding motion passage. Hold a weak core image even when text fits, the renderer passes and both services agree. The director owns artistic acceptance; the gate does not invent another user-permission step or require a particular effect or 3D route.

For a new tool, procedural treatment or reference reconstruction, consult [repository-techniques.md](references/repository-techniques.md). Plan ordered viewer reads, preserve settled exposure, make sound cues explicit, and choose direct sampling, baked state or reset/replay for stateful effects. The linked repository research establishes mechanisms and limits; it does not make every tool a dependency or every upstream style rule a requirement.

1. **Find the argument.** Read [story-and-sound.md](references/story-and-sound.md). Write the audience's starting belief, the desired ending belief, the obstacle, the product mechanism, the proof, and the action. Select the ending before elaborating the middle. Connect beats causally; each shot changes understanding, emotion, or evidence.
2. **Make direction concrete.** Define a visual thesis, palette roles, typography, composition, material/lighting, motion vocabulary, camera rules, sound palette, and deliberate exclusions. Show an ordered style-frame sheet plus a demanding transition/proof layout. Get the other service's independent critique. Treat user review as useful direction, not an invented approval requirement for every reversible step.
3. **Plan the edit.** Follow [production-contract.md](references/production-contract.md). Use stable shot IDs and half-open frame ranges. Lay out every beat/shot in a storyboard contact sheet; specify action, result, readable hold, exact copy, camera, transition, sound, assets, and acceptance. Keep factual uncertainty visible. Time real narration early; do not fit speech after final animation. For connected ElevenLabs narration/music/SFX/captions, read [elevenlabs-production.md](references/elevenlabs-production.md): preserve the user's v4 preference, discover current voices/models, retain actual takes/receipts, and audit audio edits separately from ASR word counts.
   For supplied presenter footage or voiceover, use [speech-led-editing.md](references/speech-led-editing.md): preserve a source-to-program time map, version word anchors, give the picture a defined relationship to each consequential phrase, and revise through stable beat IDs.
4. **Choose the asset and render route.** Read [assets-and-compositing.md](references/assets-and-compositing.md) and [rendering-and-tools.md](references/rendering-and-tools.md). Use faithful product source layers where possible. Use generated stills/plates when helpful, with stable art direction and provenance; keep precise UI/type separate. Do not call a flat screenshot a separable 3D scene.
5. **Prove the hard part.** Implement the highest-risk shot at intended delivery scale. Produce actual departure/action/arrival/proof and consecutive transition sheets. Test text, masks, materials, particles, camera, alpha, and export. Select a renderer from measured quality and iteration cost. A wgpu backend is not evidence of fastest end-to-end delivery.
6. **Make a full rough cut.** Establish the complete story, real or explicitly temporary audio, and joins before polishing individual shots. Produce the complete cut sheet and dense join/proof sheets, then send actual artifacts to the opposite service for review/testing. Use [camera-and-motion.md](references/camera-and-motion.md). Work in shared tokens and clock; a shot worker cannot quietly change global pacing or brand rules.
7. **Finish and review.** Apply [finishing-and-review.md](references/finishing-and-review.md). Generate final sheets from the decoded encoded file and each aspect variant. Review them, the film at original speed, audio, and smallest target viewing size. Fix the weakest consequential beat and recheck its joins and the whole edit. Record what was actually reviewed.

## Implement with an explicit clock

The included browser starter is a fallback for DOM/CSS/SVG and optional Three.js. Initialize it with `node scripts/init_project.mjs /absolute/path/to/new-film`, then follow [runtime.md](references/runtime.md). It was inherited from the local cinematic-product-film skill; its simple calibration scene is not a creative template. Follow this skill's direction and reference library rather than importing the older collection's taste assumptions.

All visual state derives from absolute frame/time. Fonts and assets must be ready before capture. Random variation is seeded. Seeking out of order must reproduce state; callbacks, live physics, network content, wall-clock shaders, or independent animation loops cannot secretly advance the film. GSAP is an optional authoring route; pause the timeline, assign explicit state, seek from the render clock, and test reverse/random seeking. Use genuine depth only when the shot needs it.

The bundled exporter uses software WebGL capture and FFmpeg/libx264. It is not a wgpu renderer, a native GPU encoder, an audio mixer, an HDR pipeline, or a universal media decoder. Hyperframes/FFrames/native rendering are researched alternatives, not installed dependencies. Verify the installed version and actual supported route before use.

## Deliver and learn

When developing an executable mathematical model of video, use [film-calculus.md](references/film-calculus.md): one scene function drives the frame, derivatives, bounds and exposure integrals. Keep this separate from the optional craft rubric. When comparing revisions with that rubric, use [video-quality-model.md](references/video-quality-model.md) and `scripts/video_quality.py`. Keep required production gates, evidence-backed craft diagnostics and measured audience outcomes separate. A geometric aggregate is an explicitly uncalibrated heuristic; it cannot establish artistic acceptance, rescue failed proof, or predict retention/conversion. Record weakest consequential beats, readable-time margins, missing evidence and uncertainty. Do not require a score for every ordinary film task.

Deliver the playable export, editable project, selected local assets with provenance, mix/captions as requested, brief/script/shot plan, revisioned contact sheets/manifests, role/CLI handoffs and integrated decisions, render settings, and review notes. Report material missing reviews or unsupported exports plainly. Do not label a storyboard, silent animatic, or operational calibration as a finished film.

After a real film, preserve the accepted decisions and demonstrable corrections: source evidence, technique, when it worked, limits, and a tested implementation. Add a new rule only when it changes future decisions. Avoid turning every attractive example into a mandatory effect.
