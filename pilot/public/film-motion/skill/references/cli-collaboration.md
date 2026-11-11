# Claude ↔ Codex production collaboration

This is the default personal workflow when both authenticated CLIs are available. Run real role jobs, not an imaginary discussion between personas. Either service can lead; the active host director coordinates the film and integrates changes. The companion runner is [film_team.py](../scripts/film_team.py), with [role prompts](team-and-handoffs.md) and [mandatory contact sheets](contact-sheets.md).

## Exact models and actual access

Use Claude Opus 5.5 as `claude-opus-5-5` and Codex GPT-6.1 Sol as `gpt-6.1-sol`. These exact IDs were checked in official documentation and successful authenticated CLI probes on 6 November 2026. Preserve the requested models rather than silently substituting aliases, newer releases, or fallbacks. [Claude model](https://platform.claude.com/docs/en/models/opus-5-5/overview), [Sol model](https://developers.openai.com/api/docs/models/gpt-6.1-sol).

The local checks used Claude Code 2.1.307 and Codex CLI 0.165.0-alpha.1.2. Claude's structured `modelUsage` reported its exact model. Codex's JSON events did not independently identify the served model; its receipt records the explicit model argument and that limitation. A model saying its own name is not verification.

The runner uses existing CLI login/subscription/API configuration; it does not read credential files, install an API adapter, or require a new key. Its `doctor` checks local versions and required flags without inference. Authentication/model access is established by an actual bounded job, not by the presence of an executable. If access fails, preserve the error and leave that provider's review pending. Do not quietly change the model or claim a review happened.

## Prepare a concrete stage wave

From the skill directory, with project-relative paths for the brief, context and sheets:

```bash
python3 scripts/film_team.py doctor

python3 scripts/film_team.py prepare \
  --project /absolute/path/to/film \
  --brief brief.md \
  --stage styleframes \
  --host codex \
  --contact-sheet review/styleframes-r03/sheet-000.png \
  --context review/styleframes-r03/manifest.json \
  --context shot-plan.json \
  --revision r03 \
  --out /absolute/path/to/film/team/styleframes-r03 \
  --work

python3 scripts/film_team.py validate /absolute/path/to/film/team/styleframes-r03/plan.json

python3 scripts/film_team.py run /absolute/path/to/film/team/styleframes-r03/plan.json \
  --out /absolute/path/to/film/team-runs/styleframes-r03 \
  --max-parallel 3
```

Change `--host` to `claude` when Claude leads. `prepare` creates actual task files and a DAG plan; it does not call a model. `run` invokes the CLIs. Outputs must be new directories so prior review evidence is preserved.

The prepared wave chooses relevant specialists for its stage, alternating services. Add `--roles art-director,cinematographer,...` to choose a narrower set of existing specialist IDs. It adds two fresh second-opinion jobs: Claude reviews the Codex specialists; Codex reviews the Claude specialists. A director job reads all handoffs and proposes one integration. The active host director applies it to the shared project. If a wave has no specialist from one provider, that provider's counterpart reviews the source packet directly.

For a high-risk specialist decision, add another job with a unique ID, the same role and the other provider, then have it inspect the first worker's actual outputs. For example, a second cinematographer can test camera motivation and proof readability rather than receiving a generic approval request. Each important role can receive a focused opposite-service challenge; do not duplicate every task without a useful question.

Omit `--work` for a proposal/review wave. Work mode lets specialists create isolated artifacts and requires a new or changed `outputs/<role>/handoff.md`. Prepared jobs declare `output_roots:["outputs/<role>"]`, so all new/changed owned artifacts are hashed and copied into dependent handoffs, not only the written summary. Reviewers and director synthesis remain read-only. Hand-edit a prepared plan to require additional exact files, assign disjoint shots, refine dependencies, or pose a precise uncertainty. Use explicit files, not the entire source repository or raw media library.

Suggested waves:

| Stage | Parallel specialists | Required image evidence |
|---|---|---|
| Brief | Story strategist, selected discovery roles | No sheet required before a visual layout exists; create the beat/frame layout next |
| Reference | Reference analyst, art, motion, camera | Chronological source sheets and consecutive event windows |
| Storyboard | Story, art, UI, camera, editor | Every planned shot/beat and the complete frame layout |
| Style frames | Art, UI, assets, compositor/colorist | Opening/proof/ending, asset family, key join and look comparisons |
| Animatic | Editor, motion, camera, narrator, sound | Full timed layout plus important actions/transitions |
| Workprint | Bounded shot workers and UI/assets/audio/finish/render specialists | Actual current renders, joins and proof states |
| Transitions / proof | Relevant motion/camera/editor/UI/story specialists | Dense consecutive windows and stable readable destinations |
| Final / variants | Render, edit, audio, color and independent review | Decoded final export and every aspect variant, not stale preview frames |

Do not launch every role simultaneously with unresolved interfaces. Scale parallelism to dependencies and local rendering resources. Assign responsibility for every important role even when one worker combines bounded duties. Keep a single frame clock, accepted copy and token/asset revision.

## Job contract and future contact sheets

A job's minimal shape is:

```json
{
  "id": "review-transition",
  "role": "independent-reviewer",
  "provider": "claude",
  "mode": "review",
  "stage": "transitions",
  "task_file": "team/r03/tasks/review-transition.md",
  "context_files": ["brief.md", "shot-plan.json"],
  "contact_sheets": ["review/r03/transition-sheet.png"],
  "depends_on": [],
  "timeout_seconds": 600
}
```

The full plan also has `schema_version:1`, absolute `project_root`, revision/packet IDs, model IDs, and its `jobs` list. All ordinary inputs are explicit project-relative files. `skill/` and `handoffs/` are reserved inside job workspaces. Raster images must be PNG/JPEG/WebP; rasterize SVG planning frames before attaching them.

For a sheet produced by an earlier work job in the same DAG, declare the PNG and its manifest in that producer's `expected_outputs`. The review job directly depends on it and can use:

```json
{
  "depends_on": ["motion-shot"],
  "contact_sheets": [],
  "dependency_contact_sheets": [
    {"job": "motion-shot", "path": "outputs/motion-designer/transition-sheet.png"}
  ]
}
```

The runner waits for successful creation/change, copies declared artifacts under `handoffs/motion-shot/`, checks that every required staged image actually exists, and forwards the new raster sheet through the CLI's actual image route. A reference may also name a file under a declared output root, but an exact `expected_outputs` entry makes its production a prerequisite for producer success. A later stage can instead begin a new plan from a director-integrated sheet revision. Do not pretend a future filename already contains rendered evidence.

Codex gets `--image` attachments. Claude Code has no equivalent image flag in the tested CLI, so its role uses Read on the staged raster files. Require filenames/cells/frame labels in the response and examine the result; attaching or copying a file is not evidence that its contents were reviewed. Include sheet manifests and a focused shot plan for timing/provenance.

## Execution, testing and integration

Each job starts with a focused packet and fresh context. It receives the role, skill snapshot, task, revision, source context, image paths and dependency handoffs. It cannot recursively launch another agent/CLI; the coordinator owns the DAG. Job workspaces prevent concurrent edits to the same production file. The renderer, source assets and project dependencies must be supplied where actual execution is required; copying a guide does not initialize a renderer.

Review jobs inspect/propose. Codex work jobs use its workspace-write sandbox. Claude work jobs expose file tools and Bash with a session-only sandbox configuration: enabled, automatic allowance for sandboxed commands, no unsandboxed retry, and failure if sandboxing is unavailable. Its file tools are confined with restricted mode. Bash is not blanket preapproved. Only a job that requires a local server should set `allow_loopback:true`. These settings do not replace either CLI's own runtime policies. [Claude sandbox documentation](https://code.claude.com/docs/en/sandboxing).

For a known Claude test command, add a narrow per-job allowance such as `"allowed_shell_commands":["node source/shot-state.mjs"]`. This becomes a `Bash(node source/shot-state.mjs)` tool rule while retaining sandboxing. The worker must run that exact single command. The runner rejects shell expansion, wildcards and chaining operators in these entries. Do not broaden it to blanket Bash or disable permission checks after a denial. More complex checks belong in an inspected project script with an explicit invocation. An initial local probe was denied at Claude's command-permission layer; the exact-command allowance let the same bounded check execute.

Ask external test workers to execute specific checks against the supplied artifacts: frame seeking, source/encoded frame counts, crop/contrast, missing media, label/caption timing, shader/material/color path, or a bounded renderer benchmark. They return actual commands, results, artifact hashes and limitations. A requested command, generated test file, contact sheet, or peer assertion is not a passed test. If a CLI cannot run a required tool, the render-engineer/host executes it and returns the receipt for critique.

Each CLI response starts with exactly `FILM_TEAM_STATUS: complete`, `FILM_TEAM_STATUS: partial`, or `FILM_TEAM_STATUS: blocked`. This describes the assigned job, not film readiness: a completed critique can identify serious film defects. An unexecuted requested test or inaccessible required sheet makes that job partial or blocked. A successful CLI exit and a written handoff alone cannot establish completion.

Retain `prompt.md`, raw stdout/stderr, `response.md`, workspace artifacts and `receipt.json` per job. The run's `summary.json` records dependencies, model arguments/metadata, elapsed time, exit/error/timeout, missing or unchanged outputs, and hashes. Receipts distinguish `execution_contract_passed` from `handoff_status`; only a complete handoff with a passing execution contract succeeds. Missing status markers fail. An honest partial/blocked handoff remains available for diagnosis even when its artifacts could not be produced. Failures or incomplete work block ordinary dependent jobs; independent branches can still finish. A diagnostic critic/director can set `allow_incomplete_dependencies:true` to inspect partial/blocked handoffs, but invocation/model/output-safety failures still block it. Prepared critics/director use this option. The overall run remains incomplete if any job is incomplete. The runner performs no automatic model fallback or indefinite retry, and never merges into the parent project.

The director records which critiques were accepted, rejected with a reason, or need a concrete experiment, citing shot/frame/cell evidence. Resolve the audience's understanding and the observed defect; agreement between services is not an aesthetic score. Re-render changed joins, regenerate sheets, and return the actual revision to the opposite service where the issue was material.

Both requested models take images/text in this workflow. Contact sheets do not provide temporal playback or audio listening. Narrator/sound agents can author and run suitable measurements, but actual performance/mix/listening review requires a capable playback/audio route. Preserve that distinction at delivery.

## Verification scope

Source model IDs and CLI behavior were checked against [official OpenAI non-interactive guidance](https://learn.chatgpt.com/docs/non-interactive-mode) and [Claude CLI reference](https://code.claude.com/docs/en/cli-reference), plus installed CLI help and actual inference. The project retains exact execution evidence under `research/validation/cli-v2/` and subsequent cross-provider visual/work tests. The portable skill does not depend on that machine-specific evidence directory. Rerun `doctor` and a bounded job when moving to another machine or CLI version.
