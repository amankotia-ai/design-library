# ElevenLabs production

Use this reference when connected ElevenLabs tools will supply narration, music, sound effects or transcription. This personal workflow prefers the connected plugin and the user's requested **ElevenLabs v4 narration** when the live tools support it. It does not require ElevenLabs for an explicitly silent film or replace another provider the user selects.

Operational lessons below were observed on **6 November 2026** while making the skill's capability film. Refresh tools, available models, parameter schemas and voices in each production session. Tool names here describe capabilities; actual namespaces, defaults and availability can change. Do not treat this dated observation as a current product catalog.

## Discover before spending

Prefer the plugin's core speech generator for narration and transcription tool for captions. Use the flow generator or add/configure/run route for music and SFX when no dedicated core tool covers them. Read the connected creative-studio guidance when available. State the film goal in the tool's context field.

Inspect available flow node types and the effective model's guide/schema before setting model parameters. The discovery list and mutation schema can disagree. In this production, discovery advertised `eleven_music_v2_5`, while the create/update/generate tools accepted music IDs only through `eleven_music_v2`. We used supported Music v2 and recorded the gap; narration used the explicitly requested `eleven_v4`. Recheck rather than preserving that workaround forever. Do not force a rejected ID, bypass a tool schema, silently change a requested model, or describe a fallback as the newest model.

Call the current voice-list tool. Select an exact returned voice ID whose language, accent, character and use fit the film; record ID, display name and lookup result. A library label such as “professional and warm” is selection evidence, not proof that a take sounds natural. The capability film selected Lyn Gardez from a live lookup; that voice is an example, not a mandatory default or a reusable ID to recall without checking.

## Lock the words and identify the actual take

Generate from the director's locked performance script. Preserve its spoken words verbatim; propose material edits to the director before generation. Keep pronunciations and performance directions separate from claims. Tool prompt fields for speech contain the spoken text and supported delivery tags, not scene descriptions.

For v4, inspect its current guide: this production used a leading `[warmly]` tag and natural punctuation. Tags affect delivery and may persist until another tag. Use only supported controls; the v4 tool exposed no numeric speed parameter. Do not invent `voice_settings` for an exposed interface that lacks them or switch to an older model to obtain a control. Preserve a natural read and adjust the edit when possible.

Create one flow first when media will be related, connected or transcribed downstream; reuse its ID. Nodes from separate flows cannot be wired together. Preserve flow, node, session and generation IDs. When choosing among takes, add the selected **generation** as a static asset node for transcription or composition; a generation node's current output may point to a different take later.

Use the variation count required by the live workflow or requested by the user. Record the returned actual count, completion/failure state and cost receipt. The capability film's speech call omitted the count and produced two takes despite documentation advertising a different default. Do not report an assumed count or start extra paid work merely to make that assumption true. A generation call starts a new chargeable run; it is not a status query or a free retry. Estimate substantial unplanned batches when useful, within the user's existing authorization.

When a native result view tracks completion, let it do so. If no view renders, follow the tool's documented completion/status route using the returned sessions. Retrieve completed off-screen results through the supported result/asset route when needed for assembly. A failure, empty result or slow run is not permission to repeat a paid generation unnoticed. Record a deliberate new attempt and why it is needed before starting one.

## Let the recorded read set the edit

Measure the actual selected file with ffprobe. Word-count arithmetic is provisional. Map phrases to shot IDs, spoken start/end, image action, proof hold and gaps. Preserve meaningful pauses and image-only moments. If paragraph separation helps the edit, retain the complete natural source and record every source in/out and destination position; do not time-stretch the voice to rescue an overfilled script.

Request transcription of the selected source take with word timings when available. Compare the transcript with the locked script, including names and technical terms. Exclude a verified non-speech control token from captions if the service returns it as metadata; do not indiscriminately strip bracketed spoken content or useful sound descriptions. Record which file/generation was actually transcribed. A transcription of the continuous source is not an independent transcription of the final edited WAV. If a local-file path only opens a user-operated upload picker, do not pretend the file was uploaded or that the final mix was transcribed.

### Audit cuts against signal, not only ASR endpoints

ASR word endpoints are not exact phoneme boundaries. In the capability film, most last-word endpoints extended into silence; one extended into the next phrase. Conversely, a matching transcript can coexist with a clipped final consonant. Clamping word ends to clip boundaries and counting all script words therefore does **not** prove an intact audio edit.

For a questionable cut, inspect the clean source waveform and detected silence around both edges. Retain logs and a source-word-end versus clip-out table. Use thresholds appropriate to the recording/noise floor; inspect stricter thresholds and the peaks of discarded gaps and fade windows. Preserve padding around the signal and keep fades inside quiet material. For deterministic edits, compare the aligned output with the decoded source outside the intended fades. Record the method, thresholds, margins and confidence; waveform energy establishes signal preservation, not the identity of a phoneme or pronunciation approval.

The dated case had all nine discarded gaps below −80.1 dBFS and all fades inside silence at −66 dBFS; retained samples matched the source outside those fades. Those measurements supported retaining its cuts. They are evidence from that file, **not universal silence thresholds** or a requirement to remove every quiet breath. If the signal is ambiguous or the edge sounds clipped, revise the cut or obtain an adequate listening review.

## Preserve stems, captions and a reproducible mix

Retrieve source media through the tool's legitimate asset outputs for local film assembly. Retain chosen and useful alternate takes with provenance and a filename-to-generation manifest. Separate original sources, aligned narration, prepared music/SFX stems and the final mix. Record actual duration, sample rate, channel layout, codec and revision; do not replace source takes with an edited master.

Use a deterministic mix recipe with explicit source offsets, cue times, fades, level automation/ducking and output format. Let score development and meaningful object actions guide the cues; avoid stamping the same sound on every cut. Protect voice consonants and room for proof. Keep speech intelligible through balance and automation before master normalization. A target such as −16 LUFS/−1 dBTP is a chosen web-film contract, not a universal destination requirement; use the current destination and production brief.

Build captions from verified wording and the **edited** timing map. Validate order, positive durations, coverage, line breaks, safe placement and the actual encoded delivery. Word equality proves caption coverage, not pronunciation, audio completeness or perceptual sync. Keep caption-safe visual strips/contact sheets alongside the cue sheet; a waveform sheet supplements them.

Measure the final PCM master for integrated loudness, true peak, clipping, finite samples, duration and channels. Recheck the encoded video audio after AAC or other codec conversion because peaks can change. Preserve the recipe and final measurements so a later visual revision can reuse or deliberately revise the sound.

## State the review actually performed

Keep source transcription, caption checks, waveform/silence analysis, signal measurements, visual cue-strip review, original-speed playback and listening as separate evidence. A tool rendering a player does not prove someone listened. If the agent/runtime cannot hear audio, say so, retain the files for an audio-capable reviewer, and leave pronunciation, musical taste, intelligibility and subjective mix approval pending. Neither a contact sheet nor a text-only second opinion closes that gap.

The capability film case is identifiable by the production's script revision, audio-generation receipts, paragraph-alignment record, mix recipe, QA receipt and cut audit. These belong to that film project; no external local path or expiring media URL is required by this reusable skill package.
