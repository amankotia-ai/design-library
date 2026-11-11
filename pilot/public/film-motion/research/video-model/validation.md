# V3.2 / quality model v0.1 validation

Date: 10 November 2026.

## Scope

This revision changes the portable skill's instructions/references and adds a standard-library Python evidence calculator, a synthetic example, and behavioral tests. It does not modify the browser film renderer or claim a newly rendered film. Repository integrations are researched options, not executed adapters.

## Completed checks

- Official `skill-creator/scripts/quick_validate.py` passed using the existing `/private/tmp/film-skill-validation-env/bin/python` environment. The default system Python lacked PyYAML; the existing isolated environment resolved that dependency. No new global package was installed.
- `python3 -m unittest discover -s skills/software-film-director/scripts/tests -p 'test_video_quality.py' -v`: **19 tests passed**. They cover known geometric values, zero/zero-weight semantics, missing inputs, sensitivity bounds, gates versus artistic acceptance, real-evidence requirements, claim coverage, contiguous reading exposure, malformed fields, contradictory proof/truth/readiness, timeline gaps, overflow rejection and safe CLI output.
- Ran the CLI on the packaged synthetic example and saved [example-report.json](example-report.json). It returns `incomplete`, a craft diagnostic about 67.68, reviewer sensitivity bounds about 62.41–72.56, and zero currently verified proof coverage. These are deliberately fictional annotations, not an evaluation of a user's film. The unknown reviews and estimated reading deficit remain visible despite a positive craft score.
- Independent source reviewer checked the distilled production guide against the five assigned repositories. The guide was refined to include physics-wrapper accumulators and interpolation history, not just world snapshots.
- Independent behavioral review produced adversarial packets in `/private/tmp/movie-quality-independent-review`. Its findings drove regression tests for null required reading evidence, negative reading margins, zero active craft dimensions, unannotated timeline spans, and overflowing claim weights. The revisions distinguish `hold`, `incomplete` and `revise_or_test` rather than letting a declaration of readiness override contradictory annotations.
- The independent reviewer reran all four outstanding cases on the final script and confirmed the expected outcomes with no remaining material issue in that scope. [Final retest receipt](independent-retest.json).
- All Markdown links to local skill files resolved. The [V3.2 archive](../../dist/software-film-director-v3.2.zip) passed ZIP integrity inspection and includes the new guide, calculator, example and tests, while excluding bytecode caches and raw repository research. [Package manifest and hashes](package-manifest.json).

## Inline illustration

The conversation includes a separate synthetic, equal-weight illustration of the same geometric formula. It is not a full evidence-packet evaluator and is not included in the skill archive. JavaScript syntax and DOM-wired interaction logic passed checks for initial score, zero propagation, gate changes, saved-state restoration and element references. A browser visual/styling inspection was not completed: bundled Playwright Chromium was missing and a headless system Chrome launch terminated in the sandbox. No screenshot review is claimed.

## Material limits

The calculator trusts authored annotation/evidence references; it does not verify their contents or establish that reviewers really watched/listened. No human audience study, learned weights, retention prediction, conversion estimate, renderer benchmark, audio detector experiment, or new physics/postprocessing export adapter was performed. All eleven linked repositories received selected-file source inspection; the tutorial's description was retrieved, but its transcript/playback could not be verified. See [source coverage](INDEX.md).
