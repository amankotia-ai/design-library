# Flowing page preview art direction

Reviewer: /root/cleanup_art_direction. Visually inspected the actual `home-page-viewports-2026-10-31/after-1440.png` and `after-390.png`, read current `system-browser.jsx` / `system-browser.css` and this run's brief. The analyst file was not yet available at the time of this direction. This pass defines the revision, not final-output approval.

The current bounded landscape frames show the first screen and a little of the following section. Their bottom neutral surround and rounded corners make each page look like an enclosed thumbnail. The requested downward continuation needs a taller view and an open lower frame edge.

Use a 4:5 stage aspect ratio consistently across desktop, tablet, and mobile. Keep the existing neutral stage fill and 16px inset on top and both sides, with zero bottom inset. Stretch the page viewport from that top inset to the stage's clipped bottom edge. Retain a 1px top/side rule and 6px top corners; set bottom border and bottom radii to zero. Remove the enclosing bottom cast shadow: the top/side rule is enough to separate page and surround. Keep the stage/card-body divider so the page never overlaps the collection metadata.

The taller visible region should immediately reveal substantially more of each actual assembled page, roughly twice the present content. Preserve the 1440px logical page width and calculate iframe height from visible viewport height divided by its scale. A fixed 900px iframe would leave unused lower area or preserve the old crop; the content window must fill the taller opening. Retain native inner scrolling and surrounding page scrolling.

Do not add gradients, masks, browser chrome, labels, or arrows to indicate continuation. The hard lower crop and partial following section provide that cue. Preserve current card body, grid, collection names, title/actions, and homepage header spacing. Do not vary page scale between collections.

Final visual acceptance: all three pages start at their tops; at least the next substantial section is visible beyond each hero; top/side surround remains visible; the page runs flush through the lower crop without rounded closure or bottom wash; metadata remains unobscured; desktop/mobile captures show the same treatment and no overflow.
