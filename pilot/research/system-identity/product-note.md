# System identity: product scope review

Reviewer: `/root/testimonial_product` · 2026-10-30 · Status: proposed scope accepted; implementation review pending.

Inspected current `src/data.js`, relevant Study/System UI in `src/main.jsx`, and project `README.md`. The data already has a named `system` object with a description, but the user-facing headings display generic section counts instead. Section records have no explicit system relationship. The proposed bounded change makes that existing identity visible and maintainable without inventing another design family.

## Accepted contract

- Export `systems` as a registry array with one actual system, `editorial-01` / `Quiet Direction`; retain `system` as an alias to that registry object for current consumers.
- Every system must have a stable unique ID, nonblank display name, and a concrete description of its visual language. The existing description is suitable: “A measured split, narrow serif, and an image that carries the color.”
- Every section and assembled-page record declares a valid `systemId`. All present records resolve to `editorial-01`. Do not make the library's reading-oriented shell into a second content system: it is the browser around the collection.
- Show the selected section's resolved system name and description near the Study preview; show the same identity in the System panel heading/introduction. Keep the section chooser and source/extension captions visible and semantically separate. A system name is not a section title or source attribution.
- Update README's ongoing product requirements: each system added to the library needs a name and description, and section entries identify their system. A brief static registry is sufficient at the present one-system scale; do not add an empty system picker.
- Extend the existing media/data check to reject whitespace-only names/descriptions, duplicate system IDs, and missing/unresolved section `systemId` values. This is a small integrity check rather than a new test framework.

## Review criteria

Study and System should both show `Quiet Direction` with the matching registry description. Existing section selection, Quote/Hero comparisons, source attributions, faithful/adapted labels, and standalone component output should remain intact. At 390px, the longer description should wrap naturally without widening the reading column. Future system selection must resolve from the selected record rather than a disconnected hard-coded label; no multi-system UI is required now.

No implementation files edited by this agent. Existing quote review remains valid only for its listed unchanged source/capture hashes; changes to `data.js`, `main.jsx`, and affected library captures need refreshed scoped review.
