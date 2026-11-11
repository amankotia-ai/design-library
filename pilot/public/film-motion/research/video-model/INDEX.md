# Repository research and video-quality model v0.1

Created 10 November 2026 from the user's [YouTube reference](https://www.youtube.com/watch?v=aD9X6Lc3dVk) and the MovieMaker software-film-director workflow.

## Deliverables

- [Second reference: Kaye's speech-led editing workflow and model extension](second-video/INDEX.md)
- [Updated portable skill](../../skills/software-film-director/SKILL.md)
- [Production mechanisms distilled from the repositories](../../skills/software-film-director/references/repository-techniques.md)
- [Mathematical model, rating anchors, input contract and calibration plan](../../skills/software-film-director/references/video-quality-model.md)
- [Executable calculator](../../skills/software-film-director/scripts/video_quality.py) and [synthetic example](../../skills/software-film-director/assets/quality-model/example.json)
- [Validation record](validation.md)

Run from the MovieMaker root:

```bash
python3 skills/software-film-director/scripts/video_quality.py skills/software-film-director/assets/quality-model/example.json
python3 -m unittest discover -s skills/software-film-director/scripts/tests -p 'test_video_quality.py' -v
```

The example is synthetic. The calculator audits supplied annotations; it does not analyze pixels, listen to audio, verify linked evidence, or predict audience performance. Unknown inputs remain unknown. Failed production evidence cannot be offset by a stronger average.

## Source coverage

The watch page describes Matt Penny's **10 GitHub Repos to 10x Your AI Motion Graphics**. It lists eleven repositories, including two prompt collections grouped together. All eleven received selected-file source inspection with pinned commits; this is not an audit of every file or a test of their demonstrations.

| Evidence record | Repositories |
|---|---|
| [Video and five-repository investigation](source-investigation.md) | Lemo Opuscar, pixelfx, Blender MCP, Awesome Opus 5.5 Videos, Opus Video Prompts |
| [Five runtime/craft repositories](runtime-repo-review.md) | ClaudeAnimationBase, React Three Rapier, React Postprocessing, librosa, Video ShotCraft |
| [Three.js source trace](three-source-review.md) | AnimationMixer, Timer, EffectComposer |

Provenance: [first five repositories](sources/repository-manifest-research.json), [runtime five](runtime-repo-provenance.json), Three.js commit in its trace, and [video metadata](sources/video-metadata.json). Raw source snapshots remain here and are excluded from the portable skill.

YouTube title, description, links and chapter starts were retrieved. Caption/transcript endpoints did not produce a usable transcript. Original-speed video playback, sound listening and source-frame analysis were not completed. Detailed findings come from repository source, not attributed spoken narration. No upstream packages, Blender connector or physics/postprocessing integrations were installed or run. Freebyrd's index, thread and references tools returned no project data.

## Research direction

The v0.1 model deliberately separates required production gates, an optional craft diagnostic, and empirical audience outcomes. Its weighted geometric mean is a declared hypothesis. Its weights are editorial choices; sensitivity intervals are reviewer bounds, not statistical confidence intervals. A scientific claim would require real target-audience evidence, held-out evaluation and comparison with simpler baselines.

Start with a causal edit experiment on one truthful product mechanism. Compare two proof-hold durations with the same narration, content and placement; measure whether unfamiliar viewers can identify both the action and the changed result. Choose duration values from the actual scene's read budget. Randomize viewers to variants, record prior product familiarity, specify the primary endpoint and sample-size rationale before collecting responses, and retain failures as well as successes. This tests a mechanism; it does not establish universal optimum pacing.

Next test action/result order or cue alignment separately. Track craft judgments, immediate comprehension, delayed recall and qualified action as different outcomes. Retention is contextual evidence: rewatches can reflect confusion, and YouTube activity is not automatically first-pass survival. See [YouTube's retention definitions](https://support.google.com/youtube/answer/9314415) and [NIST's randomized experimental designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri331.htm). No participant data or validated coefficients have been collected in this revision.
