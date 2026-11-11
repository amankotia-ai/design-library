# Speech, picture and revision effort: research extension

Use this optional study when a consequential spoken idea depends on a particular visual action, or when comparing revision workflows. Keep the [canonical quality model](video-quality-model.md), its six dimensions and CLI unchanged. These annotations provide evidence for existing clarity, proof, pacing and sound judgments; they introduce no new quality weight.

The inspected `talking-head-reels` EDL uses edited-program seconds and `program_words.json`; `voiceover-glass-reel` addresses shots using word indices. Those are source observations from the downloadable packages accompanying [Kaye's tutorial](https://higgsfield.ai/@kaye_creatives/blogs/claude-motion). The stable IDs, equations and experiment below are our proposed extension, not the creator's formula or a validated retention claim. The packages were inspected, not production-benchmarked.

## Preserve source and edited-program time

For retained source segment `j`, with source interval `[s_j,e_j)`, program start `p_j` and constant speed `r_j` in source seconds per program second:

```text
program_time(s) = p_j + (s − s_j) / r_j
program_end_j  = p_j + (e_j − s_j) / r_j
```

The map is piecewise; deleted source spans have no program time. A repeated source span has a separate program occurrence. Crossfades or variable-speed retiming need their actual mapping, not this constant-speed simplification. Words crossing a removed boundary require an explicit fragment decision and listening; do not silently clamp them and assume speech survived.

Give each spoken occurrence a stable ID tied to the media/transcript revision, retaining its source-word ID separately. Array indices are convenient addresses within one revision, not durable identities: inserting or correcting transcript tokens can invalidate every later index. Regenerate dependent timing and recheck links after edits. Verify suspect boundaries against the edited audio. Audio matching cannot establish visual lip-sync.

## Annotate eligible propositions

Record only propositions whose intended meaning depends on a specified picture/speech relationship. One proposition can span several words or shots. Declare `illustrates`, `complements`, `contrasts`, `anticipates`, or `carries_across_cut`, with the intended meaning. A talking head or a deliberate visual pause may be sufficient; an utterance need not receive B-roll. Decorative material is not proof.

For each eligible proposition, retain its ID, linked claim/shot/word-occurrence IDs, export revision, intended relationship, speech anchor, visual event, authored timing window, stable evidence intervals and actual review. Semantic review is `confirmed`, `mismatch`, or `unknown`. A plausible filename, matching keyword, caption, or embedding similarity does not confirm the image's meaning. Unknown stays unknown. A confirmed mismatch affecting essential meaning becomes evidence for the existing proof/clarity review.

For speech anchor `a`, visual event `v`, and authored acceptable lead/lag interval `[L,U]`:

```text
delta = v − a
window_error_seconds = max(L − delta, 0, delta − U)
```

Negative delta means picture leads speech. The window records this edit's intent; zero offset is not a universal ideal. With anchor uncertainty `a∈[a_lo,a_hi]` and event uncertainty `v∈[v_lo,v_hi]`, propagate `delta∈[v_lo−a_hi,v_hi−a_lo]`. Report within, outside or overlapping the authored window. These are supplied bounds, not statistical confidence intervals. Separate ASR uncertainty, output-frame quantization and encoded audio offset.

Where sustained proof matters, declare an opportunity window `W` that can include an intentional lead or tail. Reuse the existing read-margin concept:

```text
semantic read margin = longest contiguous duration of (stable proof ∩ W)
                       − measured or explicitly estimated read requirement
```

For an optional coverage summary, count unique eligible proposition IDs once: confirmed relation, usable timing and sufficient exposure where required. Divide by all eligible IDs; separately report unknowns. Additional shots, repeated words and duplicate B-roll cannot inflate coverage. Freeze eligibility before comparing variants; never divide by every spoken word or interpret the fraction as comprehension. No eligible propositions gives not-applicable, not perfect alignment.

## Keep revision effort separate

For one scoped revision request, record active labor, elapsed time to the accepted reviewable export, machine runtime, monetary cost/currency and collateral defects. Concurrent machine tasks do not add directly to elapsed time. Declare the required dependency closure before editing; downstream timing shifts caused by changed speech are not automatically defects. Check supposedly unaffected beats against the correct revised time map and record inspection coverage.

Use a cost vector `C=(labor, elapsed, machine_time, money)` beside accepted quality. At matched scope, delivery and acceptance, workflow A dominates B only if it costs no more in each compared resource and less in at least one. Test dominance in both directions; retain a workflow on the Pareto frontier only if no compared alternative dominates it. Unknown costs or uncertain acceptance prevent a dominance claim. Cheap output never receives extra artistic-quality points; renderer architecture or seeded randomness is not a quality dimension.

## Small tests and confounds

First test alignment: randomly assign unfamiliar viewers to two otherwise identical cuts, changing only the timing of one consequential visual reveal. Predefine the comprehension question and primary outcome. Keep visuals, speech, exposure duration, captions and audio mix fixed. Inspect any induced changes to order or attention before interpreting the result. Measure comprehension separately from preference; report assignment counts and uncertainty. A useful lead/lag depends on language, familiarity, display, sound conditions and the proposition.

Separately benchmark revision effort using the same bounded correction and acceptance criteria. Counterbalance execution order; record editor familiarity, hardware, cache state, asset availability and manual cleanup. Include full export/review and collateral repair, not only render speed. Repeat before generalizing. These two experiments answer different questions and must not be blended into one score.

The [synthetic sidecar](../assets/quality-model/speech-edit-example.json) demonstrates the arithmetic only. It is not accepted by `video_quality.py`; no new CLI behavior or audience results are implemented.
