# Production agents and handoffs

Use actual delegated agents for the important production roles. The prompts in `agents/roles/` are inputs to the host’s agent tool or the CLI bridge; describing a role does not mean it ran. One host director owns integration. Run independent roles in parallel when their inputs are ready, then reconcile outputs through one brief, design system and timeline.

These are personal working agents for Claude/Codex collaboration. The [CLI collaboration workflow](cli-collaboration.md) and [`film_team.py`](../scripts/film_team.py) define provider/model verification, job manifests, permissions, concurrency and retained responses. These files are portable prompts, not undocumented native-agent configuration schemas. `agents/openai.yaml` is UI metadata rather than a production worker.

## Agent roster

| Role ID / prompt | Distinct responsibility | Expected handoff |
|---|---|---|
| [director](../agents/roles/director.md) | Premise, ending, duration, treatment and integration | Brief, production DAG, reconciled decisions, stage/review index |
| [reference-analyst](../agents/roles/reference-analyst.md) | Source provenance, complete frame/PTS study and categorized transfers | Source manifest, granular source notes, inspected-sheet coverage |
| [story-strategist](../agents/roles/story-strategist.md) | Argument, exact copy, claims/proof, objections | Script, claim map, timed beat board |
| [art-director](../agents/roles/art-director.md) | Graphic world, palette, type, motif, material/light | Style frames, proposed tokens, visual/asset briefs |
| [ui-designer](../agents/roles/ui-designer.md) | Authentic states, action/result and readable evidence | State map, faithful layers/crops, proof layouts |
| [motion-designer](../agents/roles/motion-designer.md) | Property tracks, staging, transitions and deterministic shots | Shot modules, boundary states, previews and seek evidence |
| [cinematographer](../agents/roles/cinematographer.md) | Motivated framing, camera/depth/focus/light | Camera plan, pose layouts, rig proposals |
| [asset-designer](../agents/roles/asset-designer.md) | Coherent illustrations, footage, generated plates and cutouts | Selected assets, provenance, family/crop sheets |
| [editor](../agents/roles/editor.md) | Whole-film sequence, pacing, continuity and picture/audio | Edit/cue-offset proposal, cut/join review |
| [narrator](../agents/roles/narrator.md) | Spoken clarity, performance, pronunciation, timed read, captions | Performance script, cues, actual takes/captions |
| [sound-designer](../agents/roles/sound-designer.md) | Music arc, SFX, ambience, silence, mix and listening | Cue sheet, actual stems/mix, listening/measurement notes |
| [compositor-colorist](../agents/roles/compositor-colorist.md) | Layer integration, color/alpha, optical treatment and finish | Composite/look plan, matched comparisons, color notes |
| [render-engineer](../agents/roles/render-engineer.md) | Runtime, negotiated backend/export, encoding/performance | Executable route, renders/logs/manifests, technical checks |
| [independent-reviewer](../agents/roles/independent-reviewer.md) | Fresh-viewer comprehension and evidence-based review | Prioritized frame-specific findings and retest list |

The director may execute a role when the host cannot spawn a worker, but records that as a sequential role pass, not a separate agent or independent review. Small films can combine bounded jobs while retaining ownership of every responsibility. Do not launch fourteen workers with unresolved inputs merely to satisfy a roster.

## Actual execution and parallel work

Include the selected role prompt and the same revision of its relevant brief, evidence, exact copy, tokens, assets, clock and sheets. A CLI job specifies its role/provider, review or work mode, explicit context/images, dependencies and owned workspace. When a sheet will be produced by an earlier job, declare its `dependency_contact_sheets` entry with that producer job ID and declared output path so the bridge forwards the real image after completion. Work jobs declare expected outputs; a completed response alone is not evidence those files were created or changed. Read-only review returns a response and proposals. Authorized work jobs create bounded artifacts only in their isolated workspace. The host director integrates shared changes.

Use this dependency shape, scaled to the film:

1. **Discover in parallel.** Reference analyst inventories/classifies and studies source media; story strategist develops audience/argument; art director develops brand/treatment; UI designer maps product proof; render engineer probes the hardest technical requirement. Asset/reference research joins when useful. Each returns evidence gaps and contact-sheet needs.
2. **Reconcile direction.** Director chooses premise, ending, working duration, treatment, proof and visual vocabulary. Resolve story/art/UI conflicts before downstream animation. Create a storyboard/frame layout and obtain an independent second-provider critique.
3. **Prepare in parallel.** Asset designer builds the selected family; cinematographer plans framing; narrator times a scratch read; sound designer plans cues; editor tests the complete beat structure. Use one script/timing revision and return conflicts instead of silently shifting it.
4. **Build bounded shots in parallel.** Motion workers own disjoint shot modules with declared boundary states. UI, camera, asset and sound decisions are shared inputs. Prove reusable effects once. Compositor/colorist and render engineer establish the actual color/export route against a demanding shot.
5. **Integrate and critique.** Editor/host director assembles a full rough cut. An independent agent on the other provider reviews the candidate against the raw brief, product evidence and actual frame layouts. Compositor/colorist, sound designer and render engineer finish parallel tracks where interfaces are stable.
6. **Retest and deliver.** Resolve consequential findings, re-render affected frames/joins, regenerate sheets and inspect encoded output/aspect variants. Perform original-speed playback and actual listening through available routes. Missing checks remain explicit.

Either service may lead: Claude-led work dispatches Codex roles/review; Codex-led work dispatches Claude roles/review. Use genuinely independent second-provider critiques at direction/storyboard and rendered-cut stages when both services are available and the task authorizes them. Additional opinions answer a defined uncertainty; do not cycle models for cosmetic agreement or record unavailable calls as reviews. The user’s personal workflow authorizes normal cross-service collaboration; reuse that authorization without introducing repeated approval gates.

## Shared contract and ownership

Every job receives:

- Job/role ID, requested and actually verified provider/model, mode, task, context revision, dependency responses and owned output directory.
- Audience/action, claim/evidence, treatment, duration/format/fps, stable beat/shot IDs and half-open frame ranges.
- Exact copy, real product state/data, selected assets/fonts, palette/type rules and camera/motion/finish decisions.
- Entry/exit states, neighboring boundary images, audio cues/offsets, acceptance criteria and stage sheet paths.
- The question to resolve, actual permitted tools, and missing evidence to preserve as unknown.

Authorized work belongs under `outputs/<role-id>/` within the isolated job workspace or a supplied narrower path. The bridge may retain the model response as `response.md`; workers do not assume hidden render/compositor APIs. The host director owns global order/timing, shared tokens, audio offsets and final integration. Proposals identify impacted shot/interface IDs and reasons. Two workers must not edit the same shared file concurrently.

Each handoff states status; decisions/reasons; created/proposed artifacts; exact sheets/images actually inspected; frame/time coverage and display limits; tests/playback/listening actually performed; unresolved dependencies; and the next bounded action. Retain raw provider responses and a concise integrated decision record. A model suggestion is not execution evidence.

For CLI jobs, the first response line is `FILM_TEAM_STATUS: complete`, `FILM_TEAM_STATUS: partial`, or `FILM_TEAM_STATUS: blocked`, describing completion of that assignment. A critique can complete while rejecting the film. A required test that did not execute cannot be marked complete. The runner separately checks process/output contracts and retains incomplete handoffs for diagnosis.

## Contact sheets are required throughout

Frame layouts are production artifacts at every visual stage, not final QA extras. Required sheets cover reference study; chosen direction/style frames; complete storyboard; asset family/look development; animated shots/transitions; whole rough/fine cut; finishing comparisons; and every delivery aspect variant. Use the [contact-sheet workflow](contact-sheets.md) to generate and track them. Narrator and sound-designer agents map phrases/cues onto relevant actual image strips too.

Every sheet identifies stage, project/shot IDs, revision, frame/timebase and source type: schematic planning, source pixels, actual render or decoded export. Include meaningful departure, action, arrival and proof states, with dense consecutive frames at fast joins or suspected defects. Keep complete source timeline coverage available. Small thumbnails establish sequence relationships; native-size detail, original-speed playback and listening are separate evidence.

The responsible role and director inspect required stage sheets, recording findings and exact paths. Creating a sheet is not inspecting it. If generation/image access is unavailable, return a concrete missing-sheet requirement and continue independent work while leaving that visual stage pending. Do not fabricate a pass from a prompt, filename, waveform or peer description. A failed or missing required sheet cannot be silently skipped by switching providers.

## Bounded shot delegation

“Build `proof.route-ticket` at [420,612), 30fps, in the assigned isolated `outputs/motion-designer/`. Use token revision 3 and supplied verified ticket states. Camera arrives by f448. At f468 assign the supplied owner; dependent UI states agree. Hold the result while its phrase finishes. Begin at boundary A and end at B. Return an actual preview if rendered, labeled transition/proof sheet, repeat-seek evidence and known issues. Propose shared timing/token changes rather than editing them.”

The numbers illustrate a contract, not a timing preset or actual product facts.

## Integration and revision

Use specific notes with a consequence: “The exit mask obscures the owner at f578–591; delay the mask or extend the hold.” Separate factual/technical/readability defects from taste alternatives. Fix consequential failures before optical polish. Recheck boundaries, audio offsets, regenerated sheets, full-film pacing and formats after integration. If agents disagree, inspect the evidence and return to the audience takeaway; adding every effect is not resolution.
