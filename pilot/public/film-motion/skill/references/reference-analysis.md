# Dense reference analysis

## Evidence levels

Keep these independent: metadata retrieved; source decoded; overview inspected; native-frame windows inspected; every-frame visual pass; original-speed playback watched; audio listened to; declared implementation verified; reconstruction tested. A dense extraction is not automatically a dense visual inspection. A creator's stack statement is provenance, not proof of exact source code or spring parameters.

## Inventory and preserve

Assign stable source IDs. Record original post/page, creator, retrieval date, user annotation verbatim, media count/type, chosen stream resolution, local path/hash, duration, frame count, nominal/average rate, source timebase and PTS, audio tracks, caption availability, and access limits. Follow quote/link media with explicit parent/source identity. A post may contain images, multiple videos, a multi-panel reel, a replay, or a screen recording with scrolling/player UI. Analyze the actual media type.

Do not infer missing frames, offscreen events, audio, or later product behavior. Keep sources intact. Avoid treating social recompression, recorder cursor, scrubbing, pauses, or browser navigation as deliberate film direction.

## Granular pass

1. Decode/index the whole stored video. Generate chronological overview sheets to locate shots and density changes. Use the helper's `frames.csv` for actual decoded indices and PTS; nominal fps is not a reliable clock for VFR footage.
2. Map the complete timeline, including static holds and endings. Give every shot/independent panel a range, focal subject, message, composition, palette, type, camera/object action, transition, and sound status.
3. Inspect all relevant change intervals at consecutive native frames. Bracket onset, peak speed/deformation, crossover/occlusion, replacement/cut, arrival, overshoot, and settle. Include frames on both sides and the destination hold. Expand the window if an event begins outside it.
4. For each object/property identify what persists, what changes, order/overlap, path, pivot, scale, opacity, mask, blur, hierarchy, and background. Separate camera from object movement; do not call a 2D scale a verified dolly.
5. Measure only what the images support: normalized coordinates, bounding boxes, screen-space displacement, approximate event duration, palette samples away from antialiased/graded edges. Use uncertainty brackets. More than one mechanism can produce the same image.
6. Watch at original speed for pacing and comprehension; listen for voice/music/SFX/silence and sync. Slow playback and sheets complement this review. If the tool cannot play/listen, state that limit and do not invent impressions.
7. Produce a transfer note: mechanism → effect on attention/meaning → conditions → possible implementation → failure modes → small validation experiment.

If claiming every frame visually inspected, list the covering sheets/windows with no gaps and at adequate image size. All-frame thumbnail review still does not imply all-frame native-resolution detail inspection. Sampling every 0.5s can miss a complete transition and must never be labeled frame-by-frame.

## Event record

| Field | Record |
|---|---|
| Source | Source ID, source URL, local file/hash |
| Range | PTS start/end and decoded frame range; zero/one-based convention |
| Evidence | Specific sheets/native frames/playback route actually inspected |
| Before / after | Visible states and their narrative relationship |
| Tracks | Background, type, UI, cursor, object, camera, overlays, sound |
| Anchor | Persistent geometry/identity/location/color or explicit discontinuity |
| Timing | Event brackets, overlapping phases, rest/read interval, uncertainty |
| Quality | Composition, legibility, continuity, palette, material, sound relationship |
| Mechanism | Observed class, creator-declared construction, inferred route kept separate |
| Transfer | When useful, when harmful, proposed test |

## Reusable taxonomy

Categorize learnings under story/argument; composition; typography; palette/background; object motion; camera/depth; transformations/transitions; UI proof; asset/material; sound/narration; finishing; rendering/performance; and review/process. Give each learning source ranges and limits. A taste note such as “love the background colors” becomes a testable direction question, not permission to invent the source palette.

## Helper commands

```bash
python3 scripts/analyze_video.py /path/reference.mp4 /path/study-all
python3 scripts/analyze_video.py /path/reference.mp4 /path/study-overview --step 15
python3 scripts/analyze_video.py /path/reference.mp4 /path/study-transition --start-frame 120 --end-frame 168 --width 960 --columns 3 --rows 4
```

The helper refuses an existing destination, indexes every decoded video frame, preserves actual PTS in CSV, and records extraction/review scope. Output sheet cells run left-to-right then top-to-bottom; sheet/cell mappings are in the CSV and HTML has labels. It extracts the first video stream and records all stream metadata. It does not detect semantic shots, transcribe sound, recover source curves, judge craft, or mark any review complete. Use native-source crops or full-resolution extraction when a detail exceeds thumbnail resolution.
