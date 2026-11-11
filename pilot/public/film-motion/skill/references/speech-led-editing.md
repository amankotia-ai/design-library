# Edit from speech and footage

Use for founder/product reels, a presenter-led explanation, or a film built around supplied voiceover. Keep the product proof and creative review contract. This workflow does not require a particular aspect ratio, fast-cut style, glass treatment, tool vendor or synthetic presenter.

Source: kaye.creatives' [Claude Motion tutorial](https://www.youtube.com/watch?v=FJZkfjM8WhI) and its [creator-published breakdown and downloadable skills](https://higgsfield.ai/@kaye_creatives/blogs/claude-motion), retrieved 10 November 2026. Selected sources from `talking-head-reels` and `voiceover-glass-reel` were read, not installed or executed. The recommendations below adapt their useful mechanisms to this skill's existing frame clock and evidence requirements.

One useful case occurs around [10:28–10:38](https://www.youtube.com/watch?v=FJZkfjM8WhI&t=628): the automatic transcript records criticism of small central type and a visual entrance trailing the voiceover. A sampled frame near 10:30 independently shows small text within a large dark field. This motivates inspecting focal scale and meaningful arrival, even when word timing is numerically aligned. It does not establish a universal entrance speed; transcript timing is approximate and normal-speed playback was not reviewed in this study.

## Choose the starting material

- **Existing presenter footage:** select the take and preserve the speaker's intended meaning, delivery, usable pauses and audio/video synchronization. Build the speech edit first, then plan when the face, relevant B-roll, actual product state or explanatory graphic should carry the idea.
- **Voiceover without footage:** time the actual recording and develop the visual argument from its phrases. Select product proof, explanatory relationships and useful contrasts. Do not assume every sentence needs a new generated clip or every noun needs literal illustration.

In both routes, use a short representative passage to test the actual typography, footage treatment, semantic picture/speech relationship and readable result before generating a whole asset set. Give the passage a clear acceptance question and retain its source version.

## Maintain source time and edited-program time

Preserve original recordings and a source transcript. Record each retained source span with source in/out, program placement and declared speed. Build the program transcript and all word/cue timings from that edit map. A pause removed before a sentence changes every later program timestamp; captions or visual cues still using source time will drift.

For an unretimed retained segment, `program_time = program_start + source_time − source_start`. With constant speed `v` measured in source seconds per program second, divide the source offset by `v`. Splices and speed changes require piecewise mappings. Convert to output frames using the declared rational frame rate and keep rounding explicit. A source word crossing a removed boundary needs inspection; clipping its metadata into a segment does not prove intact speech.

Use stable word-occurrence IDs tied to the transcript revision, not an unversioned word position or the first occurrence of a repeated phrase. Keep the source span and mapped program span with each word anchor. If the transcript or speech edit changes, regenerate affected timings and reconcile captions, picture events and audio cues before continuing.

The inspected `talking-head-reels/scripts/cut_pauses.py` writes a retained-segment map and a retimed program-word list. Its energy-based pause detection, punctuation estimates and short fades are implementation choices. Preserve intentional breath, emphasis and silence; listen to cut boundaries. Existing [signal-versus-ASR checks](elevenlabs-production.md#audit-cuts-against-signal-not-only-asr-endpoints) still apply.

## Describe what the picture does for the phrase

For a consequential phrase, record the intended relation: demonstrates a mechanism, supplies evidence, explains a relationship, provides context, supports a deliberate metaphor, or leaves attention on the speaker. Name the visual event and the viewer's expected takeaway. Record any misleading or unrelated interpretation as a review issue.

A subtitle echo, matching noun or nearby B-roll timestamp is not semantic proof. A presenter can be the appropriate visual without an insert. Use actual product states for factual capability claims; a generated scene may illustrate an idea without establishing the claim. Essential figures and labels must agree with the spoken scope and units.

Align the relevant event to an authored speech anchor and lead/lag window. An anticipatory picture, J/L cut or delayed reveal can be intentional. Judge its meaning at normal speed and then inspect frame timing. Do not force every cut onto a word onset or music beat. See [speech-edit-model.md](speech-edit-model.md) for the proposed alignment annotations and diagnostic equations.

## Keep the edit addressable

Keep one authoritative edit decision list with stable beat/shot IDs, source ranges, program ranges, word anchors, exact copy, asset versions, visual relation, focal action, sound cues and readable destination. Treat the original file, selected excerpt and final timeline position as different identities.

Preserve editable text, layout and camera parameters. When a defect is precise, such as an off-center word, apply a bounded parameter change through the available source or native editor and record it. A chat interface does not remove the value of direct control; keep those corrections reproducible in the authoritative project.

For a revision such as “the example arrives after the sentence it explains,” identify the beat and dependency first. Change the shot, timing or asset that causes the issue; preserve unrelated accepted choices. Render the changed beat with both neighboring joins and caption/audio context before the full cut. Recheck the whole edit after integration because a local timing change can alter later cues and the story's rhythm. A text revision may invalidate glyph layout, proof timing and voice alignment even when the surrounding asset is unchanged.

The inspected skills use a per-beat EDL and a word-indexed `story.json` to make such edits addressable. Their renderer choices differ: one uses Python/FFmpeg/libass; the other authors a native After Effects project. Borrow the contract without silently changing this skill's renderer. Source formats, plugins, fonts, export settings and native application access still need an actual compatibility test.

## Specify footage exhaustion and generated-host limits

When a clip is too short, choose an explicit remedy: a different source span, a longer asset, a purposeful cut, an approved hold/loop, or declared retiming that preserves the meaning. Record speed and inspect audio/visual consequences. Do not silently slow a real demonstration, speaker or physical action to fill a slot. The inspected talking-head renderer's `src_time` contains an automatic slowdown; it is not adopted as a default here.

If a generated host is requested, separate transcript/audio alignment from visible lip synchronization and identity continuity. The inspected voiceover tool aligns generated audio using text matches and onset correlation. Those measurements cannot establish the mouth's visual timing, facial continuity or natural performance. Preserve the real voice unless replacement is requested, and inspect the actual generated video before accepting it.

## Preserve deterministic rendering

The inspected talking-head renderer creates a seeded mutable random generator per renderer instance and consumes it for grain while rendering frames. Workers create separate instances. That can be repeatable for a fixed execution schedule without satisfying arbitrary frame order or worker-count invariance. Do not import its determinism claim into this skill without testing the actual route.

Derive procedural variation from absolute frame/time plus stable element identity, or bake it. Keep decoded-video seeking and temporal-effect history explicit. Compare repeated, shuffled and chunk-boundary frames before using a new renderer. See [repository-techniques.md](repository-techniques.md).

## Evaluate the cut and the workflow separately

First judge the actual picture, speech, proof and audience task. Then record active human work, elapsed wait, renderer/model runtime, incurred spend, number of corrective iterations and collateral defects. Compare tools using the same starting assets, brief, output count, duration, viewing conditions and acceptance standard. A fast draft, many variants, or a creator's selected before/after demonstration does not establish higher artistic quality or retention.

Do not adopt this source's fixed visual-change intervals, breath-removal preferences, flash frequency, typography, aspect/fps choices, host duration, glass treatment or loudness targets as universal rules. A numerical preset can be a useful starting value for its own treatment; it remains a choice to test against the current material.
