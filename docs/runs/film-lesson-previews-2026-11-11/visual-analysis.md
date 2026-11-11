# Visual analysis — lesson previews

Reviewer: `/root/visual_analysis` (actual specialist agent). Inspected the attached full-resolution screenshot with `view_image` and the current `film-learnings.jsx`, `film-library.css`, and `film-study-thumbnails.jsx` source on 2026-11-11.

## Observed

- The attached screen is a three-column lesson grid. Thin horizontal rules, generous gutters, serif titles, muted sans-serif summaries, and an unrounded white surface establish an editorial character.
- Every visible lesson is currently text-only; the hierarchy is category / Lesson, title, summary, then a separated “Use when” block. Cards do not use container shadows or rounded corners.
- Existing motion-study thumbnails already establish neutral backgrounds, dark fine-line diagrams, and one red accent using library tokens. Their portrait 9:10 frame and oversized equations are specialized to the studies, rather than evidence of a requirement for lesson thumbnails.
- The screenshot is a scrolled catalog view. Its unseen header and responsive behavior cannot be recovered from this image alone.

## Proposed constraints for this change

- Add one compact landscape preview above the existing metadata, keeping all lesson text and links intact. A shared 16:9 to 2:1 frame is appropriate for these small illustrations; do not reuse the much taller study frame without adjustment.
- Use `--library-wash`, `--library-preview-rule`, `--library-ink`, and `--library-brand-red`; one accent should identify the meaningful action or attention target.
- Use a shared visual grammar of small panels, documents, objects, arrows, frames and timelines. Give each lesson a distinct arrangement tied to its title, rather than repeating a generic category icon.
- Keep drawings large enough to recognize at mobile card width. Avoid embedded paragraphs, equations or labels that become tiny when scaled; the title already supplies the explanation.
- Keep borders straight and light, with no shadows, gradients, decorative badges, texture, or animation. Preserve a quiet empty margin around each illustration.
- Treat the SVG as decorative when its meaning is already supplied by the lesson title. Preview and title must lead to the same lesson, without redundant keyboard stops.

This is an original extension of the existing card style, not a faithful recovery of unseen assets. No illustration assets or exact font recovery are needed for the requested scope. Rendered output remains to be checked by art direction and independent QA.
