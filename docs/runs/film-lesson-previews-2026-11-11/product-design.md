# Product design — film lesson previews

Reviewer: `/root/product_design`. Source inspected: attached screenshot at `/Users/abhishekmankotia/Desktop/Screenshot 2026-11-11 at 1.20.24 AM.png`; `pilot/src/film-learnings.jsx`, `film-learnings-data.js`, `film-library.jsx`, `film-library.css`, `system-browser.css`, `library-tokens.css`.

## Observed

The screenshot shows three text-only lesson columns, with category, title, summary and a “Use when” footer. All 16 lessons use one `FilmLessonCard`; collection filters search existing text. The library already has 16:10 asset previews, 16:9 film posters and 9:10 motion-lab diagrams. Cards use quiet neutral surfaces, serif titles, one red accent, fine rules and square preview corners. The responsive grid has three columns above 900px, two at 701–900px, and one below 701px.

## Proposed product contract

- Add an equal-sized preview above the text on every existing lesson. Use a compact landscape ratio such as 16:10; this establishes a thumbnail without making each instructional card as tall as the 9:10 labs. Keep existing text and filtering unchanged.
- Use simple vector diagrams, all sharing one drawing system. The illustration should communicate a lesson-specific idea through recognizable documents, frames, paths, timelines or physical layers. Avoid tiny text that must be read or large visual labels that duplicate the category/title.
- Keep one red attention target, ink outlines and neutral supporting forms. A preview is a conceptual illustration, not a recovered film still or evidence of product behavior.
- A full-width proportional SVG remains inside its card at all grid sizes, with comfortable internal margins. Preserve the current grid breakpoints and fully visible titles and summaries. Do not crop the meaningful subject on mobile.
- Keep the existing title link as the keyboard destination. If the preview is also clickable, use the same URL and the existing motion-lab precedent: duplicate pointer link with `tabIndex={-1}` and `aria-hidden="true"`; decorative SVG with `aria-hidden="true"`, `focusable="false"`. The title provides the meaningful accessible name. No nested links or click handler on the article.
- Preserve an obvious title-link focus indicator and pointer affordance for linked previews. No animation, new controls or image downloads are needed.

## Meaning map

| Lesson ID suffix | Illustration job |
| --- | --- |
| one-case | One red-marked document persists across three task states. |
| mechanism-before-metric | Input passes through a visible operation into a result. |
| return-with-change | The same recognizable object returns in a resolved state. |
| transition-anchor | One red object spans adjacent scene frames. |
| motion-from-velocity | A path/easing curve decelerates into a clear resting point. |
| stepped-cadence | Three held poses show distinct positions or rotations. |
| proof-framing | Busy peripheral framing yields to a clear central evidence panel. |
| depth-before-camera | Separated foreground, subject and background planes. |
| whole-cut-first | A complete strip of rough scene frames with one selected shot. |
| speech-anchors | A visual cue aligns with a marked portion of a waveform. |
| readable-hold | Entrance, complete stable panel and end separated by a visible hold interval. |
| purposeful-broll | One highlighted sentence connects to its corresponding insert frame. |
| selective-sound-cues | Sparse accents with visible quiet intervals. |
| build-the-look | Light direction reveals a simple material object silhouette. |
| repeatable-frames | Several seek paths land on identical red-marked frame states. |
| check-delivery | One composition stays legible within desktop and phone frames. |

## Review criteria

All 16 lesson cards have distinct, nonempty previews; three/two/one column layouts have no horizontal overflow; titles still open the matching lesson; preview links have identical destinations; search/topic/collection tabs remain functional; decorative diagrams add no screen-reader noise; no unrequested motion.
