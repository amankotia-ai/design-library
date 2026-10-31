# Visual analysis: duplicate collection removal

Reviewer: `/root/visual_analysis`. Scope: pre-implementation removal criteria only, not final QA.

Inspected the user attachment at `/var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_TUgUfS/Screenshot 2026-10-31 at 1.57.04 AM.png`, plus `pilot/src/system-browser.jsx` and `pilot/src/system-browser.css`.

Observed: the screenshot shows Quiet Serif, Cobalt Grid, and Blueprint in a three-column catalog. Both blue cards use a vivid blue centered hero and pale framed editor, consistent with the user's explicit assessment that Cobalt Grid duplicates Blueprint. Blueprint carries the source-study label and Geist typography; it is the retained blue collection.

Removal criteria:

- Keep Quiet Serif first and Blueprint second. Remove the Cobalt Grid card rather than renaming or restyling it.
- Preserve the existing header, catalog heading, card shell, typography, palette rows, and Explore system links. No new art direction is needed.
- Preserve the remaining cards' existing preview implementation. Current source uses tall page viewports, which differs from the short screenshot preview; this pre-existing difference is outside this removal.
- The existing desktop grid has three fixed columns. Leaving two cards in its first two slots preserves card scale and avoids an unnecessary layout redesign. A two-column expansion would enlarge the remaining cards and should be treated as an optional change, not required removal.
- Preserve the current single-column mobile rule. Verify both remaining cards render without overflow and their links retain the proper collection.

No exact font recovery or pixel-identity claim is made. This report inspected the before image and source only; delivered-revision visual QA remains pending.
