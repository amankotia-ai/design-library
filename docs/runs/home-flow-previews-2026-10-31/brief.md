# Taller flowing page previews

Start: 2026-10-31 01:57:47 IST. Deadline: 02:17:47 IST (20 minutes maximum).
Mode: original library interface refinement.
Scope: extend live preview viewports downward so more page content is immediately visible; remove the bottom inset so the page appears to continue through a clipped lower edge. Preserve top/side inset, no browser chrome, card content and prior page cleanup, live independent scroll.
Proposed geometry: stage aspect4/5 rather than1.4; top/side16px padding and bottom0; viewport stretches to bottom with no bottom frame border/radius. Compute iframe logical height from visible viewport height and scale rather than retaining900px.
Completion: actual desktop/tablet/mobile renders show substantially more page content, edge-to-edge bottom continuation, no overlap into card metadata, working inner/outer scroll and keyboard navigation; existing build/input checks and independent QA tied to final revision.
Existing screenshots in ../home-page-viewports-2026-10-31/ are the before evidence. No new assets/fonts. Prior baseline-ui and source-study limits apply.
