# Required contact sheets throughout production

Contact sheets are required working artifacts for this personal workflow. Use actual labeled image layouts at every visual stage, inspect them, and include them with each agent handoff and external Claude/Codex review. A written shot list or a claim that screenshots exist does not satisfy this requirement. Do not invent a user-approval gate: create the sheets, review them, fix material problems, and continue within the authorized brief.

The director owns the sheet register and the canonical film revision. Each specialist produces or updates the sheets that demonstrate its work; the independent reviewer uses those same revisioned images. When a stage is revised, refresh affected sheets and their joins before calling that stage reviewed. Independent directions and aspect variants each need their own sheets rather than a single attractive frame standing for all of them.

## Required visual evidence by stage

| Stage ID | Required sheet layout | What the team checks |
|---|---|---|
| `brief` | Optional reference/taste board if visual inputs already exist. A purely textual intake may proceed without one. | Separate supplied facts, taste cues, defaults and unresolved questions. Do not invent product screens to fill a board. |
| `reference` | Chronological coverage plus dense consecutive-frame windows for every relevant source; label source IDs, actual PTS and decoded frame indices. Multi-panel sources preserve panel identities. | Complete source inventory, transition classes, anchors, changed states, palette/type, actual coverage and limits. Use `analyze_video.py` for a complete frame index and extraction. |
| `storyboard` | Entire film in story order, one or more labeled poses per shot. Include premise/hook, mechanism/proof, result and ending. Show separate candidate directions before choosing one if alternatives are being explored. | Causal argument, shot purpose, continuity, information density, composition, exact copy and estimated holds. Schematics are clearly labeled in review material. |
| `styleframes` | Representative beginning/proof/ending frames plus start/midpoint/arrival of the defining transformation or camera move. Include selected assets/materials in context. | One art direction across type, palette, space, material, UI and imagery; match the product's own identity. A moodboard alone is insufficient. |
| `animatic` | All shots across the rough timeline, plus denser cells at every transition and consequential action/result. Include the current output frame clock. | Complete argument, time budget, narration/readability, motif development, attention handoffs and quiet destinations. Also play the animatic; sheets do not establish timing feel. |
| `workprint` | Current rendered shots in sequence; explicit before/action/response/result cells for proof. Include interfaces with neighboring shots and new/changed risk frames. | Implementation matches the chosen direction and actual product, readable evidence, coherent materials and camera, no missing assets or accidental state resets. |
| `transitions` | Consecutive native-cadence frames bracketing departure, peak/crossover/replacement, arrival and settle. Include both neighboring shots and the first stable result. | Persistent anchor, phase order, occlusion, masks, type edges, blur, camera continuity, overshoot and settle. Expand the window if an event starts outside it. |
| `proof` | Context/before, performed action, visible feedback, changed result and stable proof hold. Use native-size detail crops as separate cells when needed, with clear crop labels. | Same case/data across steps, faithful controls/labels, truthful claim, readable state and sufficient stable time. A beautiful UI beauty frame is not the complete proof. |
| `final` | Frames decoded from the actual encoded delivery file: every shot, all joins, critical text/proof, beginning and ending, and known risky gradients/lines/materials. | Encode preserved the image, expected frame order/duration, correct crop/color/readability and no unintended black or missing frames. Play and listen to the actual file separately. |
| `variants` | Separate encoded-frame sheet for each requested aspect/placement/version, with matching semantic shot IDs. Include smallest intended display-size checks. | Recomposition, safe areas, captions, CTA, proof and copy survive each variant; an automatic center crop is not assumed valid. |

These layouts are minimum coverage patterns, not a fixed artistic beat count. A complex shot can need more cells. Entire-film sheets show structure; dense windows show motion relationships; source-size frames reveal detail. Use all three when the work requires them.

For product framing, apply [Stageshow-informed composition](stageshow-framing.md) within these existing stages: show context versus final crop; the trigger and largest open overlay/busiest state; the settled result/poster; camera poses affecting the crop; and recomposed small/aspect variants. Art/UI/camera inspect these before polished animation. Keep protected controls, words and proof visible in their intended reading intervals. A whole dashboard shrunk into a tile is not automatically a valid compact composition. Record the accepted framing revision and regenerate affected sheets after changes.

## Build labeled sheets from explicit selections

Use the portable helper when frames or styleframe PNG/JPEG/WebP/TIFF/BMP/PPM images already exist:

```bash
python3 scripts/contact_sheet.py /absolute/path/selected-frames.json /absolute/path/review/r03-storyboard --stage storyboard
```

The destination must be new and `revision` must be nonempty. The helper resolves each source path relative to the selection JSON, preserves input order, fits the entire stored image into a cell without cropping, and retains its display aspect ratio. It refuses animated/multiframe inputs: extract the exact frame first. Choose images that already have the intended upright stored orientation; automatic orientation metadata is not applied. The helper creates opaque 8-bit RGB review PNGs, not a color-managed/alpha-preserving delivery master. Source/selection hashes are checked again before writing a completed manifest. Each FFmpeg/ffprobe operation has a 60-second timeout; failed output directories are retained for diagnosis and must not be treated as completed sheets.

Example selection JSON:

```json
{
  "title": "QueuePilot - ownership becomes visible",
  "revision": "r03",
  "columns": 3,
  "rows": 2,
  "cell_width": 480,
  "image_height": 270,
  "frames": [
    {"path": "frames/f00420.png", "shot_id": "proof.assign-owner", "label": "Context before assignment", "frame": 420, "frame_space": "output", "pts_seconds": "14.000000"},
    {"path": "frames/f00468.png", "shot_id": "proof.assign-owner", "label": "Assignment action", "frame": 468, "frame_space": "output", "pts_seconds": "15.600000"},
    {"path": "frames/f00492.png", "shot_id": "proof.assign-owner", "label": "Result - stable hold begins", "frame": 492, "frame_space": "output", "pts_seconds": "16.400000"}
  ]
}
```

The examples are illustrative timing, not product facts or a pacing preset. For a source study use `frame_space: "source"`, its zero-based decoded index, and the actual source PTS. For an un-timed storyboard use `frame_space: "layout"`, omit `frame`/`pts_seconds`, and identify the pose in `label`. Fractional render frames are accepted. Do not infer source PTS by dividing a nominal frame rate when the media is variable-rate.

Outputs:

- `sheet-000.png`, etc.: actual image grids with title, stage, revision, sheet number, global selection index, shot ID, frame clock/PTS, and label. Unused final-page cells remain empty and are counted as padding.
- `manifest.json`: source selection hash, source file hashes/dimensions/SAR, exact sheet/cell mapping and image bounds, original labels, visual label lines, output image hashes, and review scope initially marked unperformed.
- `index.html`: readable sheet previews plus full original labels and exact mapping. The CLI review receives the actual PNGs as images, not just this HTML.

All sheet, cell and selection indices in the manifest are zero-based; cells read left to right then top to bottom. The header's human sheet count is one-based. No frame reordering or automatic sample selection occurs. Preserve this manifest with the images so a reviewer can find the exact source after a note.

The helper uses a bundled bitmap font because some FFmpeg builds lack `drawtext`. PNG metadata labels render uppercase; exact original casing remains in JSON/HTML. Visible labels support printable ASCII. If an original title or label uses other characters, provide an ASCII `display_title` or per-frame `display_label`, retaining the full original text in `title`/`label`. It fails rather than silently dropping unsupported glyphs. Use sufficient cell width/font size for the external vision reviewer and open each actual sheet at useful size.

This helper does not render a storyboard from prose, capture the browser runtime, seek video, select semantic frames, transcribe audio, or decide if a film is good. Render the desired frames from the actual project first, then build the sheet. The existing runtime's still command accepts fractional frame numbers; the reference analyzer indexes actual decoded PTS.

## Handoff and review record

For each non-intake job, attach the relevant actual sheet PNGs and the selection/manifest/shot plan as context files. The collaborating service needs the same versioned evidence as the local agent. Keep image paths relative to the job workspace when using the CLI bridge; the bridge can copy those files and provide native image access. A text-only second opinion cannot be recorded as a visual inspection.

Record the following after actual viewing, separately from generation:

```json
{
  "stage": "proof",
  "revision": "r03",
  "contact_manifest": "review/r03-proof/manifest.json",
  "sheet_reviews": [
    {"path": "review/r03-proof/sheet-000.png", "cells_reviewed": [0, 1, 2], "findings": ["Owner state and queue agree; result needs a larger crop on mobile."]}
  ],
  "native_frame_checks": ["frames/f00492.png"],
  "playback_review": "not_performed",
  "audio_review": "not_performed",
  "unreviewed": ["Remaining final export and alternate aspect ratios"]
}
```

Use actual observations tied to shot/frame ranges; do not copy that example's findings into a real review. Listing or generating sheets does not prove they were opened, and viewing one sheet does not cover omitted sheets/cells. Keep unreadable thumbnail detail unresolved until inspected at adequate resolution. Neither a contact sheet nor a waveform establishes original-speed timing, sound quality, or comprehension. Final delivery requires those separate review passes where available, with any remaining limits stated explicitly.
