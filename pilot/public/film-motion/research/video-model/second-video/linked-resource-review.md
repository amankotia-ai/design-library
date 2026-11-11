# Kaye's linked Claude Motion resource

Source inspection on 10 November 2026. This supplements the separate study of [the supplied tutorial](https://www.youtube.com/watch?v=FJZkfjM8WhI); it does not claim this worker watched the tutorial or reviewed its finished exports.

## What the link actually exposes

The video's supplied [Higgsfield short link](https://higgsfield.ai/s/claude-motion-2-kaye-creatives-zJgoqE) resolves to **[Claude motion, by @kaye_creatives](https://higgsfield.ai/@kaye_creatives/blogs/claude-motion)**. Public page metadata records publication on 6 November and an update on 10 November 2026. Its public article payload links two downloadable skill archives:

- [talking-head-reels.zip](https://d2ol7oe51mr4n9.cloudfront.net/user_3BzYKBq0yI9i3riEeuAc4tUq2Rp/86152bcc-1873-4237-89f4-1e690c5c8d7b.zip): Python, NumPy, FFmpeg and libass; a vertical talking-head edit with B-roll, typographic overlays, mattes and an edit decision list.
- [voiceover-glass-reel.zip](https://d2ol7oe51mr4n9.cloudfront.net/user_3BzYKBq0yI9i3riEeuAc4tUq2Rp/1f58c58a-fd92-49cf-b1b5-e2625a3dcedb.zip): Python/Swift preprocessing, Higgsfield-generated material and native After Effects layers; a landscape voiceover film with optional synthetic host, glass-framed clips and word-indexed story data.

These are downloadable archives, not verified GitHub repositories. Both SKILL.md files and selected implementation files were inspected as data. Nothing was installed, compiled, launched, generated or executed. No direct repository for either archive was established. The archive inventory, exact hashes, retrieved URLs and selected-file coverage are in [linked-resource-provenance.json](linked-resource-provenance.json).

The web reader could not access the short URL. Public HTML and its linked CDN files were retrievable by curl without login. The article body is a binary collaborative-document payload; embedded text and attachment references were inspected, but its full current rich-text state was not decoded. A browser attempt failed because the native computer-use pipe was unavailable. Do not describe this as an authenticated or complete visual review of the article.

## Useful additions to our workflow

### Build a semantic time map after editing speech

The talking-head archive's `scripts/cut_pauses.py` writes explicit source-to-program segments and retimed word records. The voiceover archive's `scripts/reel.py` writes source/program frame spans and an indexed word timeline. Its `story.json` starts shots at word indices, resolves them into output timing, and derives captions and effects from those anchors.

Transfer: preserve source speech, retained intervals, revised program words and the resolved output clock together. Let a consequential spoken phrase anchor a related visible action or settled result. When an audio edit changes timing, regenerate dependent cue mappings instead of manually moving disconnected captions and shots. A semantic anchor should be configurable; the archive's one-frame lead is its own editorial choice.

Our skill already has a common frame clock and narration-first planning. The concrete extension is a documented **source speech → edit mapping → verified program words → authored visual cue** chain, including which changes invalidate downstream timings.

### Give B-roll a specific job

The talking-head planning guide selects presenter, illustrative footage, split composition, number/list visualization or typographic emphasis according to the spoken thought. It prefers keeping the presenter when a fitting clip is unavailable. Its sourcing guide asks for the subject, action, framing, temporal development and concrete failure conditions, then checks candidate clips and in-points.

Transfer: write the meaning a candidate must communicate, the exact useful source interval and the intended crop before choosing it. Record whether it is documentary evidence, product proof, reenactment, metaphor or decoration. Generated archival-looking imagery can illustrate a narration; it does not verify the narrated event or product claim. The example experiment claims in these archives were not fact-checked and should not enter our production facts.

### Separate the authored edit from the renderer

The talking-head EDL and the voiceover story/plan split preserve editorial choices as data. The latter resolves word anchors into shot intervals, asset in-points, caption phrases, hit times and sound cues before building native AE compositions. The former validates missing assets, interval overlaps and selected style warnings before rendering.

Transfer: retain an authored semantic plan and a resolved frame plan, version both with assets and renderer settings, and localize revisions through dependencies. A replacement asset must be checked for timing, crop, color and joins even when its slot remains fixed. Validation should distinguish broken structure from a stylistic preference; its success does not prove a good edit.

## Source-level limits that change our decisions

### Declared determinism is weaker than arbitrary seeking

In the talking-head `scripts/render_reel.py`, `Renderer.__init__` creates `np.random.default_rng(7)` once (line 251). Each frame consumes that generator for grain (line 763). Each worker creates a fresh renderer, and the worker frame ranges depend on the worker count (lines 826 onward).

Source-based inference: grain depends on call count within a worker, so an isolated still, a shuffled frame request and a different chunk layout need not match the same absolute frame. This was not executed here, and it does not establish that the edit looks bad. It does show why a repeated seed alone is insufficient for our stronger random-seek contract. Preserve absolute-frame/per-element randomness and verify repeated, reverse and chunked output before borrowing this renderer.

### Automatic retiming can alter the intended evidence

The same renderer's `src_time` (lines 83–91) automatically slows a short source to fill its slot, capped at four times slower. That may be acceptable for some illustrative footage, but a timing-sensitive product demonstration needs an explicit retime decision and truthful representation. Do not silently substitute this behavior for the film's authored timing contract. Measure the returned asset's actual duration; generation prompts are not timing guarantees.

### A word count is not proof that speech survived a cut

The talking-head cutter uses 10 ms energy windows, source-frame snapping, adjustable pauses and short join fades. Its implementation keeps a configurable natural pause, rather than literally removing all silence. The voiceover preprocessor uses a different, more aggressive energy/word heuristic; it maps words around removed regions and enforces minimum mapped word duration.

Those mappings are useful bookkeeping. They cannot prove that a quiet consonant, breath used for emphasis, or intended pause survived. Compare the edited signal and listen; preserve meaningful delivery. A shorter duration or more cuts per minute is a descriptor, not an improvement score. This reinforces our existing prohibition on treating ASR endpoints or retained caption counts as an audio review.

### Audio alignment is not visual lip-sync measurement

The voiceover archive's `cmd_align` matches recognized words between a reference chunk and generated-clip audio, then refines an offset using audio onset correlation. It does not measure lip landmarks against phonemes. The result can support an audio timing estimate, but visual mouth synchronization still needs playback inspection. A high transcript match cannot stand in for that review.

### A reusable style is not a universal recipe

The two archives have different output shapes, renderers, dependencies and visual defaults. Fast changes, red/black/white typography, glass frames, fixed host proportions, uniform cut leads, strobe counts and loudness targets are local style settings. Preserve them only when the actual brief wants that treatment. Our editorial and high-motion routes should remain available, with the audience's reading and proof needs setting timing.

The article's embedded prompt text includes a request to change layout every two to three seconds; the voiceover story guide also says to cut according to meaning. Treat this as evidence that specific example prompts need interpretation, not as a general timer for attention.

## How this informs the mathematical model

Add observable cue records when relevant: semantic phrase, corrected program onset, visible action onset, stable-result onset, intended lead/lag, measured deviation and review evidence. Distinguish caption timing from the moment the viewer can understand the picture.

Track whether each consequential spoken claim has an appropriate visual treatment and credible proof where proof is required. Do not reward decorative footage simply because it overlaps a sentence. Use the existing claim-coverage and reading-margin diagnostics, with explicit source-role metadata rather than a new arbitrary quality weight.

For an experiment, compare one semantic change at a time—for example a generic insert versus an accurately framed mechanism reveal—while holding the audience, narration and placement consistent. Measure first-view comprehension or the intended audience outcome. Neither the archived prompts nor their software supplies those outcome measurements.

## Scope

Read-only analysis of both skill entrypoints, selected guides and source ranges; exact coverage is recorded. No installed-tool compatibility, renderer speed, model pricing, generated-asset quality, speech preservation, lip synchronization, native app integration or final playback quality was tested. The archives' requirements and timing/performance claims remain author statements until verified locally. Downloading them does not install their instructions or authorize any external generation/upload workflow.
