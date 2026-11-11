# Film & Motion — 10 November 2026

Request: add the MovieMaker directing skill and findings to Design Library of Manks, retain the Design Systems collection/detail layout, and develop executable video mathematics inspired by Shu Ding's Calculus of Interfaces.

Implementation budget began 13:45:34 UTC; deadline 14:05:34 UTC. Scope: one collection, reusable detail reader, mathematical scene lab, complete authored content import, portable skill, and independent review. The existing dirty working tree was copied into an isolated staging area; delivery copies only the task's files after checking original-file hashes for concurrent changes. Existing Unifize work is preserved.

## Delivered structure

- `?panel=films`: Film & Motion collection, 73 entries, full-text search, topic filtering, portable skill download and source manifest.
- `?panel=film&entry=film-calculus`: same 12-column detail shell as Design Systems, with a live authored scene function.
- Every other entry has a complete reading pane, contents navigation, source links and Markdown download. All 14 role prompts are included.
- `public/film-motion/skill/`: complete maintained skill and runtime; `software-film-director-v3.4.zip` contains 68 files. No renderer dependency was added to the app.
- Maintained documentation and authored findings were imported. Raw source videos, full ASR transcripts, third-party repository copies and duplicate validation workspaces remain in the MovieMaker research archive. Unavailable local evidence links are displayed as text; they do not pretend to open a hosted capture.

## Mathematics

One hand-authored operation graph maps time, viewport dimensions, excursion and proof-shot duration to scene geometry and shot weights. It supports exact/sigmoid step evaluation, forward-mode differentiation, interval enclosure with width subdivision, and bounded integration of a settled geometric proof-exposure indicator. The actual SVG and chart use this model. Hard cuts retain undefined derivatives at their discontinuities. A moving proof can visibly fail at a narrow width.

Interval statements assume real arithmetic and do not enclose floating-point rounding. The safety domain is a protected result rectangle across 360–1280px width, at the current time and 540px height. Exposure integrates the exact edit at the selected viewport. These are geometric statements, not evidence of readable typography, comprehension, artistic greatness or audience response. The previous subjective quality model remains a clearly labeled uncalibrated research aid.

Primary references: [Shu Ding's post](https://x.com/shuding/status/2115082810738479363), [The Calculus of Interfaces](https://calculus-of-interfaces.vercel.app/), [Matt Penny's repository video](https://www.youtube.com/watch?v=aD9X6Lc3dVk), [Kaye's editing tutorial](https://www.youtube.com/watch?v=FJZkfjM8WhI). Exact source coverage and limits are preserved in the imported research entries and source manifest.

## Actual specialist ownership

- `/root/repo_runtime_review`: product design and art direction; inspected existing templates, implemented collection/detail reader, inspected actual desktop/mobile captures.
- `/root/quality_model_design`: mathematical engine and lab; implemented shared graph and 14 checks, inspected responsive renders.
- `/root/video_research`: reference visual analysis; inspected the source prototype and sampled reference frames.
- `/root/independent_final_qa`: independent final QA of saved app screenshots, current source hashes and browser-test evidence; did not implement app code.
- `/root`: content import, routing, skill packaging, browser interaction tests, integration and concurrent-change guard.

Mode: original film content within the established library design. Reference math supplies a method, not a recovered React/video compiler. Desktop layout reuses the existing collection grid and detail shell; mobile is a responsive adaptation. Geist assets and library tokens are retained.

## Validation evidence

`browser-check.json` records tested revisions and desktop 1440, tablet 900 and mobile 390 captures; it checks search/reset, cut and smoothing behavior, a framing violation, settled safety, guide contents/references, all 73 document downloads and the skill ZIP. `QA.md` records independent review. `delivery-manifest.json` identifies the synced source/assets. Build and existing library checks are run alongside `npm run check:film` (content inventory plus 14 mathematical checks).

The initial review found a footer entering the detail grid, a crowded mobile collection heading, missing list markers after the CSS reset and rounded exposure bounds that hid their uncertainty. These were corrected before final capture. Displayed interval endpoints now round outward.

No commit, push or GitHub Pages deployment was performed by this run. Local project delivery preserves the user's existing uncommitted changes.
