# Production contract

Use only fields relevant to the film, but make shared interfaces explicit. Planning artifacts serve execution and review; they are not automatically visible campaign copy.

Faithful reconstruction from real product evidence can be valid proof. Record capture/build provenance in the production manifest; do not automatically add implementation labels or disclaimer overlays to a finished film. Visible disclosure is needed when a representation would materially mislead the viewer about capability, evidence, or a timing/performance claim. Ask for missing source states rather than inventing them. Early schematic frames should be clearly identified in review material so they are not mistaken for finished UI.

## Brief

Record confirmed facts, chosen defaults, and unresolved questions separately. Include audience, product/version, distribution, intended action, duration/range and who selected it, aspect variants, one central promise, proof sources, brand/asset availability, voice/music, schedule and constraints. Unsupported facts remain unresolved until evidence arrives.

## Per-shot record

```json
{
  "id": "proof.assign-owner",
  "range": [420, 612],
  "purpose": "Make ownership visible without a second handoff",
  "claim_source": "evidence/product-walkthrough.md#ownership",
  "takeaway": "An assignment updates both the record and shared queue",
  "copy": {"native": ["Owner", "Ava"], "campaign": []},
  "product": {
    "before": "ticket open, unassigned, queue 8",
    "action_frame": 468,
    "action": "choose Ava in owner menu",
    "after": "owner Ava, unassigned queue 7",
    "truth_status": "verified"
  },
  "composition": {
    "subject": "owner control and resulting queue",
    "source_layers": ["ticket", "queue"],
    "layout": "context with readable control and result detail",
    "recognizable_context": ["ticket identity", "owner field", "queue heading"],
    "protected_content": ["owner trigger and label", "open owner menu", "changed owner", "queue result"],
    "crop_allowed": ["unrelated rows outside the proof"],
    "overlay_envelope": "largest owner-menu state, target and cursor path",
    "poster_frame": 552,
    "variant_plan": "recompose required aspects and inspect smallest intended display"
  },
  "phases": {"entry": [420, 448], "action": [448, 492], "proof_hold": [492, 588], "exit": [588, 612]},
  "camera": {"projection": "orthographic", "move": "guided translation, then rest", "readable_during": [492, 588]},
  "transition": {"class": "matched-replacement", "anchor": "ticket identity", "next_shot": "outcome.shared-queue"},
  "audio": {"voice_cue": "vo.07", "sfx_cue": "assign.confirm", "music_change": null},
  "assets": ["product.ticket.v3", "font.brand-medium"],
  "owner": "motion",
  "acceptance": ["owner and count change agree", "result reads at target viewing size"],
  "review": "pending"
}
```

Numbers and product details above illustrate a contract, not actual product evidence or universal timing. Never copy them into a real film as facts.

For demanding explanations, add ordered `viewer_reads` (subject → relationship/action → consequence), with the exact target, stable unobscured frame interval, target display and measured or explicitly estimated reading requirement. For procedural layers, record `state_route` (direct sampling / baked / reset-replay), seed/identity scheme and any checkpoint/interpolation state. For sound-critical beats, record named picture/audio events, their clock mapping, intended offset and tolerance. See [repository-techniques.md](repository-techniques.md). These fields support actual shot decisions; do not populate unobserved timings as measurements.

For product/UI shots, complete the [Stageshow-informed framing pass](stageshow-framing.md) before detailed motion. State the delivery dimensions/display targets and identify protected content's bounds in a declared coordinate space when geometry is required. Inspect opening, largest overlay/busiest state and settled poster in the actual final crop. Camera travel and compact variants inherit the protected action/result, rather than just scaling the wide layout. Keep changes to authentic UI separate from editorial annotations and proposed conceptual illustrations.

## Timeline rules

Use integer output frames with a declared rational frame rate where the chosen renderer supports it; this starter supports integer fps only. Intervals are half-open `[start,end)`. Keep source PTS and source timebase separate from output frame numbers, especially with variable-rate or captured media. Record retiming, source in/out, and handles. Narration, sound cues, cuts, masks, camera, and object tracks share the same absolute clock.

Every layer has a start state, end state, active interval, and dependency. Transformations name what persists and what is replaced. A matched cut can create convincing continuity without a physically continuous morph. Do not invent intermediate geometry when a cut is the stronger explanation.

For edited speech, preserve the original source spans and their piecewise mapping into program time, including declared speed. Word-triggered events carry the transcript revision and stable word-occurrence ID; reconcile them after cutting or correcting speech. A clip's original time, selected excerpt and timeline position are separate values. Specify the behavior when footage is too short instead of silently changing its speed. See [speech-led-editing.md](speech-led-editing.md).

## Asset record

Store ID, local path, hash/version, source/rights, role, approved crop, native resolution, maximum enlargement/camera travel, color space/transfer, alpha convention, and any masks/depth/tracking. Generated assets also store prompt, seed/model when available, selected version, and intended camera envelope. Do not require unavailable provider metadata. Preserve originals.

## Review record

Record export revision, shot ID, frame/time range, observation, consequence, priority, recommended correction, owner, and resolution. Keep `observed`, `inferred`, and `not_reviewed` explicit. Record actual playback/audio route; a waveform is not a listening review. A source frame index is not automatically the same as a compressed player's displayed time.

Contact sheets are mandatory evidence at the stages in [contact-sheets.md](contact-sheets.md). Keep a sheet register: stage/revision, actual source type (schematic/source/render/decoded export), selected shot/frame/PTS ranges, sheet/cell manifest, responsible role, and actual inspected cells/findings. Attach the same revision to both providers. Retain CLI job receipts, requested/reported model information, dependency artifacts and the director's accepted/rejected/needs-test decisions. Creating, attaching, or naming a sheet does not mark it reviewed. Refresh affected sheets after integrated changes.

## Completion

Check the intended audience takeaway and action, factual support, visual consistency, product state continuity, timing/readability, audio, export integrity, and requested variants. Deliver source and manifest with export. Any unperformed material review is named in the handoff; do not describe a partial artifact as finished.
