# How To Make Insane Video Editing With Opus 5.5 (Claude Motion)

# Second video: Kaye's editing comparison

Source: [How To Make Insane Video Editing With Opus 5.5 (Claude Motion)](https://www.youtube.com/watch?v=FJZkfjM8WhI), **kaye.creatives**, published **2026-11-07**, duration **15:21**. Metadata retrieved 2026-11-10.

## Access and inspection

- Original watch HTML, player response and metadata saved locally.
- The description links [prompts, breakdown and free skill](https://higgsfield.ai/s/claude-motion-2-kaye-creatives-zJgoqE); it contains no direct GitHub links. The linked article and its two skill files were inspected separately by the companion source-review task.
- YouTube automatic-caption retrieval returned HTTP 429. No repeated caption-endpoint workaround was attempted.
- Public English audio downloaded with yt-dlp, format 251-20; metadata identifies language en-US. `reference-audio.webm` is 921.001 seconds, stereo Opus at 48 kHz.
- A separate 854×480 AV1 video stream was downloaded as `reference-video.mp4`, format 397, 24000/1001 fps, duration 920.961708 s. This is a low-resolution research copy, not a delivery asset or evidence of native-resolution visual quality.
- `overview-sampled-exact.jpg` contains 31 inspected source frames, every 720th decoded frame (~30.03 s). `overview-sampled-manifest.json` records decoded index, source PTS, time base 1/24000, source resolution and cell. FFmpeg showinfo output is preserved in `frame-extraction.log`.
- The unlabeled `frames/sample-*.jpg` files came from an initial fps-filter extraction; they are not the evidence sheet. Only `frames/exact-*.jpg` and the exact manifest are used for observations below.
- The exact overview sheet and individual frames at 360.360 s, 630.630 s and 840.840 s were visually inspected. This is **sampled visual coverage**, not every-frame inspection or original-speed playback/audio listening.
- A complete local ASR pass produced 318 timestamped segments in 250.94 seconds using cached faster-whisper small.en, CPU int8, English, beam 5 and VAD. The model processed the full 921.001-second audio; VAD omitted nonspeech. `transcript-asr.json` and `transcript-asr.txt` preserve the output. This is **ASR, not human-verified transcription**: proper nouns are visibly mistranscribed, and no word-for-word quotation should be taken as verified. The first direct PyAV path failed because the installed PyAV 19 API did not accept `metadata_errors`; FFmpeg decoding to a 16 kHz mono float array avoided that incompatibility. No audio was sent to an external transcription service. The raw ASR final segment ends at 921.12 s, about 0.119 s beyond the measured 921.001 s audio duration; this small ASR timestamp overshoot is preserved in the evidence and must be clamped to actual media duration before edit/caption use. `evidence-manifest.json` records versions, settings, coverage and SHA-256 file hashes.

## Source setup

The description defines two tasks: a vertical talking-head edit with captions, B-roll and motion graphics; and a motion-graphics film made from the voiceover alone. Chapter starts are 2:00 test 1, 8:05 test 2, 12:10 results/pros and cons, 14:20 verdict.

The ASR introduction at 111.44–122.08 s says the creator supplied the same raw vertical clip to a motion-designer friend and to Claude. That is the author's described setup, not an independently audited controlled comparison. The introduction invites viewers to guess which result is human versus AI.

## Directly observed source frames

| Timestamp | Observation | What it establishes |
|---|---|---|
| 240.240 s | A motion-skill slide displays several visual reference thumbnails | References are visibly part of the presented workflow; cannot infer their completeness or how the model used them |
| 270.270 s | The chatbot input includes attached files and a lengthy prompt | A structured input bundle is shown; the low-resolution sample is insufficient to transcribe the full prompt |
| 360.360 s | A close-look slide calls attention to the first five seconds, headline and four seconds on the speaker's face | The creator explicitly evaluates the opening's timing and screen allocation, rather than only whether export succeeded |
| 390.390 s | Two vertical edits labeled A and B appear side by side | A comparison is shown; this frame alone does not establish which edit is preferred or its maker |
| 630.630 s | A very small two-line text block sits inside a large dark frame, with a partially appearing critique title above | An example of weak screen occupancy is visible; a still cannot establish exact pace or the full critique wording |
| 660.660 s | A/B comparison of voiceover-driven motion treatments | The two film modes are compared separately |
| 840.840 s | A creator-authored pros/cons table contrasts the two workflows | Author's case claims, not independently measured benchmarks |

At 840.840 s the table gives Claude 45 minutes, 5 reels,free iteration and fresh AI B-roll; it assigns the designer days, 1 reel,stock hunting, direct manipulation and taste/humor/timing. It lists a $200–500 designer cost. The AI cost cell is still blank at this sample. Do not treat these values as current pricing, general productivity gains, objective artistic rankings, or fair like-for-like cost accounting.

## Provisional implications

1. Evaluate editing operations separately: raw footage→edited speech/B-roll and voiceover→authored motion. A strong result in one does not establish the other.
2. Preserve the speaker's meaning when removing pauses or takes. Speech alignment and text presence do not establish that the edit preserved emphasis, intent or a convincing performance.
3. Evaluate opening composition, focal hierarchy, timing and the usefulness of each B-roll insert. More images or animated words do not by themselves establish comprehension, retention or emotional effect.
4. Compare finished candidates with maker labels hidden where practical, but describe informal pairwise preferences honestly. A creator's two demonstrations are not a statistically reliable causal model.
5. Keep iteration time/cost and artistic quality on separate axes. Record the full cost of selection, prompting, retries, cleanup, rendering and review rather than attributing everything to the final generation call.

These are proposed adaptations for our workflow, not measurements extracted from a validated retention study.

## Timestamped substance from the ASR

The following are paraphrases of the automatic transcript, checked for consistency with the sampled frames and metadata where possible. They describe what this creator says and demonstrates; aesthetic judgments and performance claims remain hers.

| Interval | Source substance | Useful adaptation and limit |
|---|---|---|
| 199–278 s | Inputs are raw footage, intended script, visual references and a motion-skill file, followed by an ordinary-language brief | Keep a compact, explicit input packet. Preserve what is known from footage versus asserted by script; more references are not automatically better than a coherent small selection |
| 290–305 s | References communicate preferred layout, style and energy, rather than requiring frame-for-frame duplication | Translate references into motion/composition relationships and taste constraints; make the actual product story original |
| 315–329 s | The first result is a rough draft and iteration is expected | Plan a complete first pass, then diagnose the weakest consequential beat |
| 335–381 s | The creator likes color/caption handling but critiques a slow opening, small headline and an inert middle section; she adds references for the weak section and regenerates | Revision notes should identify the time range, focal element and intended change. Four seconds of a face is not intrinsically wrong; the critique is contextual |
| 407–413 s | Talking-head result A is the human edit; B is the AI edit | Preserve maker labels as hidden metadata during a preference comparison; do not mix the labels with test 2 |
| 428–455 s | Human advantages described are voice-motivated camera movement and sound rhythm; AI advantages include timed type, transitions and mood-matched generated B-roll | Compare expression and meaning as well as mechanical alignment. Neither effect count nor perfect word synchronization establishes quality |
| 469–481 s | The creator reports about 50 minutes for references/chat/iterations versus about 5.5 hours of the human editor's focused work | Record end-to-end effort explicitly. These are self-reported approximate case values, not controlled costs or a universal speed ratio |
| 541–603 s | The second task uses the same recording but keeps only its audio, adds motion-only references and a different skill | Treat footage editing and voiceover-led visual authorship as separate production modes |
| 620–642 s | The first motion pass aligns text with voice, but central type is too small and visual entrances lag the speech's energy; a targeted reply requests correction | Inspect focal scale at delivery size, visual arrival against phrase meaning, and settled readability. A motion clock can be synchronized yet feel late |
| 644–674 s | The creator says the human receives the same voiceover and brief. In this test A is AI and B is human | The maker mapping is reversed from test 1; preserve distinct experiment IDs |
| 696–740 s | She praises AI camera pushes and text changes, and human bespoke topic transitions and icon detail, then expresses uncertainty about which wins for everyday social content | Use pairwise preference with uncertainty; do not invent an objective winner from this tutorial |
| 795–813 s | She criticizes generic outputs from weak direction and correction friction in the chatbot-only workflow: changing a small placement requires another prompt/file | Preserve editable scene/text parameters and local revision scope. Her UI limitation does not apply to every AI or code-based renderer |
| 816–880 s | She values human taste, humor, emotional timing and details, and concludes that AI can support rather than simply replace editing skill | Keep human evaluation in the model. The concluding 80/20 split is rhetorical, not measured decomposition of quality or labor |

The later summary describes 45 minutes versus days and 5 reels versus 1; this differs from the specific earlier 50-minute/5.5-hour case wording. At 834–857 s she gives indicative freelance prices and loosely describes subscriptions/credits as a few dollars per reel. No invoices, token counts, full revision ledger, matched expertise controls, viewer study, retention curve or conversion measurement was inspected. Do not use these claims to fit cost, retention or quality coefficients.

## What changes in the model

This reference motivates additional **hypotheses**, not fitted weights:

- Condition comparisons on production mode and source packet. A footage editor's preservation of meaning and performance is a separate concern from a voiceover film's visual argument.
- Add a diagnostic for visual arrivals versus declared semantic landmarks, including the intended lead/lag. Evaluate the settled hold separately; hitting a word boundary is not enough.
- Track focal scale and composition at the actual target viewing size, and interpret them against the shot's task rather than maximizing object size.
- Keep direction/reference coherence, expression, clarity and finishing in human review; do not reduce them to raw reference count, cut count or action frequency.
- Keep marginal revision effort, reproducibility and editable control separate from artistic quality. More inexpensive variants help only if selection and revision improve the intended outcome.

Neither this tutorial nor its two examples supplies a scientifically validated mathematical model of high retention. The evidence is useful for defining failure modes, candidate variables and a fairer evaluation protocol.

