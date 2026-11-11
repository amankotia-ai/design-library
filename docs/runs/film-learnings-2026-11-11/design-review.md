# Practical film lessons — design review

Reviewer: `/root/design_qa`. Mode: original system expansion in the existing Film & Motion collection. No application source edited.

## Evidence inspected

Opened the actual user screenshot at `/var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_NxB4K0/Screenshot 2026-11-11 at 12.58.45 AM.png` using `view_image`, and read `film-library.jsx` and `film-library.css`.

The screenshot shows three repeated tall paper specimens with “01 / 02,” Source/Evidence captions and an identical network diagram. They occupy most of the viewport. Titles such as verification records, reference-study batches and research coverage are followed by clipped process-log excerpts. These are browseable archive documents, but the default collection gives little immediate instruction about making a film.

## Product and art direction

- Change the default content layer to practical lessons, rather than merely replacing decorative card imagery.
- Use compact text-first lesson cards: a meaningful topic, an action-oriented title, a specific takeaway, and a short use-when prompt. Avoid fixed tall specimen heights, generic diagrams, decorative sequence numbers and truncated process prose.
- Lead detail pages with the principle, when to apply it, concrete steps, an example and a useful way to check the result. Do not open on source-video excerpts or production logs.
- Keep references opt-in. Within the existing detail pattern, a modest References control can reveal source links and scope notes after the practical lesson is available. Avoid requiring source reading to understand the lesson.
- Keep the existing nine functioning mathematical studies in an explicit labs view with their actual model-driven previews. Preserve old deep links to source documents without promoting the whole archive to the default lessons list.
- Use 12–16 synthesized lessons grounded in existing research. Do not relabel every research document as a lesson or infer universal laws from source-specific observations.
- In Lessons view, search and topic filters should work on lesson content. Reset or reconcile incompatible filters when switching views so the collection does not unexpectedly appear empty.
- Keep the library's serif headings, body type, thin neutral rules, restrained red accent and responsive layout. Preserve complete short takeaways rather than clipping them. Mobile detail should have a readable content order and no large empty source panel.
- Related examples should be relevant to the lesson; the full nine-study selector belongs to the labs rather than every practical lesson.

These observations and constraints were sent to the parent and UI implementer before final implementation. Final rendered, behavioral, grounding and revision review is recorded separately in `QA.md`.
