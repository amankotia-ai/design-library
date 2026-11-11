# Independent QA — practical film lessons

**PASS for the inspected final staging revision. No blocking issue found.**

Reviewer: `/root/design_qa`, independent of the content and UI implementers. No application source was edited by this reviewer. Scope: the lesson-first Film & Motion collection, 16 authored lessons, source references and preserved access to interactive math. This is a system expansion responding to the user's screenshot, not an external visual reproduction.

## User feedback and resulting design

I inspected the user's actual screenshot before implementation. Its repeated tall “01 / 02” Source/Evidence specimens and identical network drawings dominated the collection, while clipped research-log excerpts provided little immediate practical guidance.

The revised default collection places 16 text-first lessons before nine functioning motion labs. Lessons have specific titles, complete takeaways and use-when prompts. Their detail pages lead with practical steps and an illustrative before/after example. References remain opt-in, with links to original research documents. Production guides remain available separately; generic diagrams are absent from noninteractive collection cards. The retained mathematical previews depict their actual subjects.

## Content grounding sampled independently

I read all 16 lesson records, then compared four lessons with the referenced source sections:

| Lesson | Source inspected | Assessment |
| --- | --- | --- |
| Let one real task carry the story | `research-reference-study-b`, B16 — Linear product performs the plot | Grounded in the coherent destination/list/change/comment/review sequence and the explicit instruction to reuse one case and data. The lesson does not claim to verify Linear's product behavior. |
| Give cutouts their own cadence | `research-reference-study-a-tail`, A15 — TasteGraph collage and stepped motion | Grounded in observed discrete cutout placements and the proposed per-layer cadence/held-state transfer. It does not assert physical stop-motion capture or AI-generated source assets. |
| Attach visual cues to meaning in the edited speech | `research-video-model-second-video-linked-resource-review`, Build a semantic time map after editing speech | Grounded in retained source/program segments, retimed words, phrase anchors and regenerated downstream cues. The example is an application, not a transcript quotation. |
| Accent meaningful events, then leave room for the result | `research-video-model-runtime-repo-review`, Librosa; `research-creator-studies-adjacent-creators`, Aidin Robbins sound-research section | Correctly distinguishes analysis frames from video frames and detected events from editorial choices. The restrained/full sound-pass comparison is explicitly a proposed listening experiment in the source, and the lesson makes no new listening claim. |

The lesson file marks its examples as authored illustrations. The sampled lessons synthesize transferable decisions instead of copying video breakdowns. Their limitations prevent source observations or tool outputs from being presented as universal quality guarantees.

I independently ran `scripts/check-film-learnings.mjs`: all 16 lesson schemas, unique routes, concrete examples and source-section mappings passed; eight archival guides were identified. This structural check is separate from the four direct grounding comparisons above.

## Independent browser checks

I ran `qa-keyboard.cjs` in local headless Chrome with reduced motion enabled, and reran it after the mobile source-order correction. The final run passed seven checks with zero page errors:

- ArrowRight switches the native collection radio group to Lessons.
- A lesson opens with references hidden and practical content present.
- ArrowRight opens optional References.
- An actual reference link opens its original document route and correct heading.
- Mobile lesson content uses normal document flow, with no nested scroll pane or horizontal overflow (390px document and viewport widths).
- Practical steps precede context and related navigation on mobile.
- ArrowLeft restores Lesson content.

The independent run records the same five final source hashes as the parent's browser report.

## Visual inspection

Actual screenshots opened using `view_image` include:

- `qa-lessons-desktop.png`
- `collection-390.png`
- `lesson-card-mobile.png`
- `lesson-1440.png`
- `lesson-768.png`
- Final `qa-lesson-mobile-intro.png`
- Final `qa-lesson-mobile-steps.png`

The library's typography, neutral rules and red active indication are preserved. The desktop collection exposes several complete useful lessons in the space previously occupied by generic illustrations. Desktop and tablet details place practical application beside the lesson context. The mobile correction puts the actionable steps immediately after the title and summary, before related links. Text and controls remain inside the viewport. References are not needed to understand the main lesson.

The first visual pass identified related navigation appearing before the core application on mobile. The final source order fixes that issue. I inspected the refreshed mobile captures and independently checked the final ordering.

## Parent evidence reviewed

The final `browser-check.json` reports all 16 lesson routes, three steps and before/after examples, optional references, collection modes (16 lessons, nine labs, 36 production guides), search/topic/empty states, a camera-lab handoff and preserved original source routing passing. It records 14 desktop/tablet/mobile screenshots and zero page errors. These broad checks were run by the parent; the independent keyboard/link checks above were run by this reviewer.

The parent reports a successful production build, recorded in `build.log`. I did not rerun the build. I independently recomputed every hash in both final browser reports and verified all five against the current source.

## Limits

This review samples source grounding rather than reopening every source video or verifying external product claims. The examples are authored applications, not source reconstructions. No full screen-reader, physical touch-device or deployed-site audit was performed. Final sync to the canonical project occurs after this staging review; matching source hashes do not establish deployment.

## Exact reviewed revision

Root: `/Users/abhishekmankotia/Downloads/MovieMaker/studies-polish/pilot`

| File | SHA-256 |
| --- | --- |
| `src/film-library.jsx` | `a54cded4b5be1e5727bf2007a4b641a410d12786fb53c343d5a39f45eee3b856` |
| `src/film-library.css` | `09c8e6b7938720b5806c477703fdfbf6d96b6d076ae4cfc1e306492b52cdd292` |
| `src/film-learnings.jsx` | `f1718eb642de6c6fdd67a73d09099c3eb06934e5d7307f013e23407ef6586926` |
| `src/film-learnings-data.js` | `9f6ee4c93faa0ec0c28d85770f097bf951daf15a89538bc6c79d1f9c6b5d6392` |
| `scripts/check-film-learnings.mjs` | `4e6986f1f94e539289458245f55fdf4b1726918587953e8f5c5494e8f593d8bf` |
