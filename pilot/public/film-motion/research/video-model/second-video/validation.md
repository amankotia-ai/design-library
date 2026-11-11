# V3.3 validation

Validated 10 November 2026.

- Official skill validator passed using `/private/tmp/film-skill-validation-env/bin/python`.
- All local Markdown links within the portable skill resolve. Both quality-model example files parse as JSON.
- Independent source review checked `speech-led-editing.md` against the downloaded archives and found no remaining actionable source-claim issue. The archive source was inspected as data, not installed or executed.
- Independent mathematical review verified the sidecar example: source `[3.4,3.8]` maps to program `[2.4,2.8]`; output frame 75 at 30fps is 2.5 seconds; visual-minus-speech offset is 0.1 seconds, bounded by `[0.07,0.13]`; stable opportunity is 0.9 seconds and estimated read margin is 0.2 seconds. Semantic status is still unknown, so confirmed coverage is zero.
- Corrected the Pareto description to test dominance in both directions and across all compared alternatives. No quality bonus is assigned for lower effort or cost.
- `video_quality.py` is byte-for-byte unchanged from V3.2, SHA-256 `298856f6a2b68a6a485a43dbcd278a4076de84b98cfa4f0b5f3da071cc1d5d52`. Its prior 19 passing behavioral tests and independent regression review remain applicable; they were not rerun for these documentation/example-only changes.
- The V3.3 ZIP passed integrity inspection. It contains 65 portable skill files, including the new guides and synthetic sidecar. It excludes original tutorial media, ASR transcript, downloaded third-party skill archives/source, dependency installs and caches. [Package manifest](package-manifest.json).
- Full-source local ASR completed with 318 segments; transcript, model settings and media hashes are retained in the [evidence manifest](evidence-manifest.json). The 31-frame overview sheet and selected larger frames were inspected. This does not complete normal-speed playback or audio listening review.

The semantic sidecar is research documentation, not a new input schema for the existing CLI. No audience study, validated semantic classifier, automatic lip-sync measurement, renderer integration, upstream renderer benchmark, or new completed film is claimed. See [source notes](source-notes.md) for transcript and sampled visual coverage.
