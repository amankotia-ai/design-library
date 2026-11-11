# Video quality model, v0.1

Use this when comparing a cut, identifying its weakest consequential shot, or planning a test of a specific editorial change. This is an **uncalibrated, authored diagnostic**, not a scientific measure of artistic greatness, a retention predictor, or a substitute for the [creative quality gate](creative-quality.md). A mathematical expression makes assumptions inspectable; it does not validate them.

Three different questions remain separate: is the evidence sufficient to advance, how does the craft compare with the chosen brief and references, and what did real viewers understand or do? The bundled tool implements the first two using supplied review records. It performs no media analysis and invents no audience outcomes.

## Define the question before rating

Declare audience, objective, placement/display conditions, sound conditions, and the named next stage. A film for first-time buyers and a silent feature announcement need different evidence and weights. Select dimensions and weights before comparing versions; changing them after seeing results makes the comparison uninterpretable. Preserve the packet with the export revision.

Use these six dimensions as a starting vocabulary, with a short evidence-backed reason for each rating:

| ID | Inspect in the actual film |
| --- | --- |
| `story` | Does a causal sequence change the viewer's understanding, with an earned ending? |
| `clarity` | Can an unfamiliar viewer locate the subject, understand the action and register its consequence at the target size? |
| `proof` | Does the authentic product visibly perform the consequential claim? |
| `visual_identity` | Do subject, composition, type, material/light and adjacent images form a specific, coherent world? |
| `motion_pacing` | Do camera, transformation, contrast and settled holds guide attention at original speed? |
| `sound` | Do voice, music, effects and silence support the same argument and readable arrivals? |

These dimensions overlap and are not statistically independent. The tool accepts other IDs, but corresponding shot ratings must use the same ordered IDs and weights as the film. For intentionally silent work, give sound weight zero and explain the decision in its evidence field. Reallocate the other weights explicitly. A missing review is not an inapplicable dimension.

Rate on `[0,1]`. Useful anchors are `0` absent/contradictory, `0.25` substantially weak, `0.5` understandable with a material weakness, `0.75` clear/specific/coherent, and `1` exceptionally effective against this brief and actual comparison references. Intermediates are allowed, but additional decimals do not create precision. Preserve disagreement as intervals or separate packets rather than manufacturing reviewer consensus. Image-only critique cannot establish original-speed motion, sound, or audience response.

## Craft diagnostic and bottleneck

For values `x_d` and declared nonnegative weights summing to one:

```text
Q = 100 × product(x_d ** w_d)       for dimensions with w_d > 0
```

This geometric mean makes weakness consequential without requiring an arbitrary additive penalty. The number is a comparison aid under the same rubric and context, not a probability or a universal passing mark. Always show the dimension vector and review evidence with it. Positive-weight zero gives exactly zero; there is no epsilon. A positive-weight missing value gives `null`, even when another dimension is zero. Zero-weight dimensions are explicitly reported as ignored.

An optional `interval: [low, high]` must enclose the central value. Compute `Q_low` from lower endpoints and `Q_high` from upper endpoints. For a dimension without an interval, use its central value at both endpoints. These are **sensitivity bounds conditional on the supplied judgments**, not confidence intervals. A missing central value keeps both score and bounds null.

Rate every consequential shot with the same dimensions/weights. Report the minimum shot diagnostic and all tied shot IDs. If any consequential shot is unrated, report the overall weakest-shot diagnostic as unknown rather than pretending the rated subset covers the cut. Do not average by duration or reward shot count. Duplicating a shot or padding a hold does not increase the film diagnostic. Ratings still need reassessment after an edit; the calculator cannot detect stale evidence.

No automatic numerical cutoff grants artistic acceptance. An active rating of zero means a documented absence/contradiction under these anchors, so it produces a revision warning. Other low values remain visible for the director's decision rather than introducing an unvalidated threshold.

## Evidence and timing diagnostics

For a claim `k`, reviewed proof requires verified truth and at least one linked shot with a passing proof review, positive stable exposure, and no negative declared read margin. The claim's and shot's IDs must agree. A pass should reference the actual product source and action/result review, not a filename that was merely generated.

```text
verified claim coverage = sum(importance of claims with reviewed proof)
                          / sum(importance of all declared claims)
```

All claim importance values are positive and chosen in advance. A second fraction reports what could pass after pending truth/proof reviews or testing an estimated read requirement, without requiring a known failed proof/read to be repaired. Neither fraction estimates audience comprehension. No claims gives null coverage; an empty list is appropriate only when the declared cut makes no product claim. Coverage depends on an honest inventory of consequential claims.

All timeline ranges are integer half-open output frames `[start,end)`, at declared rational `fps.num/fps.den`. Shot ranges must not overlap; annotate transitions within the editorial shot intervals. Gaps and their fraction of the timeline are reported and leave the whole-cut decision incomplete. This permits partial annotation without calling it a complete review.

For each consequential or proof shot, annotate sustained intervals during which essential material is stable, visible and unobscured. Adjacent intervals are merged; separated intervals are not added together to manufacture a continuous read. The tool reports both total exposure and the longest sustained exposure, using the latter for:

```text
read margin = longest sustained exposure in seconds − required read seconds
```

Supply a measured requirement from an unfamiliar-viewer test, or a clearly marked estimate with its reasoning. Budget finding the subject, understanding the change and registering the consequence; word count alone is insufficient. A null requirement stays unknown and blocks a readiness assertion for essential shots. A zero requirement is permitted for a deliberately instantaneous recognition task only with an evidence-backed reason. Empty stable intervals on a claimed proof mean no annotated usable hold and are a blocker.

A measured negative essential margin is a hold. An estimated negative margin asks for revision or a read test; it is not reported as an established perceptual failure. A positive estimated margin does not certify readability: the separate actual readability gate remains necessary.

Do not maximize cuts, motion, sound density or geometric novelty. Record picture activity, information load and sound density in the existing shot/cue plan when useful, then inspect their sequence. The CLI does not calculate an optimum rhythm or a universal beat tolerance. Beat detections are candidate events, and authored sound leads/lags may be intentional. Keep source timestamps, output frame quantization and measured encoded sync separate.

## Gates and decision precedence

Declare the required gates for this stage, ordinarily truth, performed proof, essential readability, finished core imagery, relevant audio intelligibility, and output integrity. Each is `pass`, `fail`, or `unknown`, with actual evidence for reviewed states. The director separately declares `hold`, `revise`, `ready`, or `unknown`. Passing gates alone produces `gates_passed`, not artistic acceptance.

The report derives additional contradictions from the packet so a high score or stale pass cannot hide them. Decision precedence is:

1. **hold:** a required gate fails, the director holds, a claim is contradicted, a declared claim has no proof shot, an essential proof review fails, proof has no stable exposure, or a measured essential read margin is negative.
2. **incomplete:** required gates, active dimensions, consequential-shot ratings, essential read requirements, claim truth, or essential proof review remain unknown; or the timeline has annotation gaps.
3. **revise_or_test:** an estimated essential read margin is negative.
4. **revise:** the director requests it or an active film/consequential-shot dimension is zero.
5. **ready_for_declared_next_stage:** all preceding checks are clear and the director explicitly recorded `ready`.
6. **director_review_pending:** no preceding blocker, but no director acceptance.

These are evidence statuses, not new user-permission gates. Continue independent production work while unresolved evidence is gathered. `ready_for_declared_next_stage` repeats a supported director decision; it is not automatic film acceptance, a claim of audience success, or a replacement for the skill's finished-cut review.

## JSON contract and commands

The executable example is [example.json](../assets/quality-model/example.json). It is entirely synthetic: no video was scored, no viewers were tested, and its ratings are not empirical findings. It deliberately includes unknown reviews, an unknown read requirement, and a proof marked pass despite a negative estimated read margin. The report exposes these discrepancies rather than accepting the pass blindly.

Required top-level fields:

| Field | Contract |
| --- | --- |
| `schema_version` | Exactly `"0.1"`. |
| `synthetic` | Boolean; false requires nonempty references for actual reviewed/rated evidence. |
| `context` | Nonempty `audience`, `objective`, `placement`, `next_stage`; `sound` is `on`, `off`, or `optional`. Put actual target display conditions in placement. |
| `timeline` | Positive integer `total_frames`; positive integer rational `fps.num` and `fps.den`. |
| `director_decision` | `hold`, `revise`, `ready`, or `unknown`. Retain the actual decision rationale in the linked review packet. |
| `gates` | Nonempty array of `{id, required, status, evidence}` with at least one required gate. |
| `dimensions` | Nonempty array of `{id, weight, value, evidence, interval?}`; values nullable, weights in `[0,1]` summing to one. |
| `claims` | Array of `{id, weight, truth, proof_shots, evidence}`; truth is `verified`, `unknown`, or `contradicted`. |
| `shots` | Array of the shot records described below; an empty or partial array reports timeline gaps. |

A shot contains `id`, `range`, boolean `consequential`, `claim_ids`, `proof_review`, `evidence`, `stable_intervals`, and nullable `read_requirement`. Its optional `dimensions` use the film dimension contract. Proof review is `pass`, `fail`, `unknown`, or `not_applicable`; a linked proof cannot use the last state. A read requirement is `{seconds, basis, evidence}`, where basis is `measured` or `estimated`.

Evidence is an array of nonempty reference strings: include artifact revision, shot/frame or timestamp, actual review method, target display and reviewer where relevant. It can point to a fuller review record. Validation checks presence, not that a file exists or a person actually inspected it. No arbitrary audience result fields are accepted. Unknown keys, unknown IDs, duplicate IDs/references, boolean numbers, nonfinite values, reversed/out-of-range/overlapping intervals, mismatched shot dimensions and overflowed claim totals are rejected. Rescale very large claim weights rather than relying on overflow arithmetic.

From the skill directory:

```bash
python3 scripts/video_quality.py assets/quality-model/example.json
python3 scripts/video_quality.py /absolute/path/evidence.json --output /absolute/path/quality-report.json
python3 -m unittest discover -s scripts/tests -p 'test_video_quality.py' -v
```

The CLI uses only Python's standard library. It emits JSON to stdout unless `--output` is supplied; it refuses to overwrite its input. Valid packets return exit 0 even when the report says hold/incomplete; consumers must inspect `decision`. Invalid input or file errors return exit 2. `audience_prediction` is always null.

## Empirical model to learn next — not implemented

For speech-led cuts, [speech-edit-model.md](speech-edit-model.md) adds an optional research sidecar for semantic picture/speech relationships, authored timing windows and revision effort. It does not change the six-dimension craft formula, the `0.1` CLI schema or the meaning of a passing gate.

Define the audience objective before collecting data. A possible multi-outcome utility is:

```text
J(context, video) = a × P(correct mechanism comprehension)
                 + b × P(delayed recall)
                 + c × P(qualified next action)
                 − d × P(material misconception)
```

The coefficients express the campaign objective, not universal human preferences. Probabilities must be measured or estimated with uncertainty from appropriate data; none are computed by this CLI. Start with one primary outcome rather than fitting many weights to a handful of examples.

For actual first-pass session data, a future departure model could use:

```text
R(t + dt) = R(t) × exp(−hazard(t, context, edit_features) × dt)
```

Hazard has units of inverse seconds; it must be fitted, not guessed from the craft score. Model exit and skipping explicitly and account for observation/censoring. YouTube segment counts are not automatically a survival function: rewatches can increase segment views, and a spike can indicate confusion as well as interest. Inspect the platform's definitions before translating its chart into viewer probabilities. [YouTube retention documentation](https://support.google.com/youtube/answer/9314415).

First useful experiment: randomly assign unfamiliar viewers from one relevant audience to two cuts that differ in one meaningful editorial mechanism, such as action/result alignment or proof-hold duration. Keep the product, message, placement and viewing conditions comparable. Ask a prewritten mechanism-comprehension question after one viewing; record the assigned denominator, response, exposure, and uncertainty. Assess delayed recall or qualified action separately if those are real objectives. Do not select the winning metric after seeing the results. Random assignment of a factor's levels is the basis of the simple comparative design; other factors and experimental objectives may call for blocking or a different design. [NIST randomized designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri331.htm), [NIST design selection](https://www.itl.nist.gov/div898/handbook/pri/section3/pri33.htm).

Choose sample size from the outcome, baseline variation, minimum useful effect and desired uncertainty, not an invented universal viewer count. Log exclusions and missing responses. When learning a predictive relationship, hold out whole films/products, not adjacent shots from a film already in training; report context limits, calibration and comparison with simple baselines. Separate reviewer agreement from audience validation. Retain losing variants and null results so the skill learns corrections rather than only success stories.

Evidence date: 10 November 2026. Formulas, rubric, decision precedence and the experiment translation are our proposed production model. The cited primary sources support their specific analytics/design definitions, not the claim that this formula predicts a great video.
