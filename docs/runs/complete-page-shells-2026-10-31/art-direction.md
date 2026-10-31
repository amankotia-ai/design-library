# Art direction — complete page shells

Reviewer: `/root/art_direction`. Inspected the supplied actual screenshot (3024 × 1964 original), `pilot/src/catalog.jsx`, `system-browser.jsx`, and `system-browser.css`. No UI edits by this reviewer.

## Observed

Pages currently uses the same system-card construction as Design Systems: a 9:10 clipped viewport, family, system name, palette and typography. Both previews stop near the page opening. Their visible content does not communicate the complete section sequence or closing footer.

## Direction

Use a dedicated Pages-only two-column grid at desktop with `align-items:start`; one column on mobile. Each preview uses the full card's available width and its natural full-page aspect ratio, extending from navigation through footer. Do not impose a fixed preview height, crop, or top-only viewport. Long cards are deliberate: an8500px source at1440px width becomes approximately3200px tall at a550px preview width. This supports inspection of the whole shell in the main document's normal scroll.

Do not fit an8500px page inside the current400px-high frame: it produces a roughly68px-wide strip, too narrow to recognize the composition and visually dominated by empty side space. A fixed internal scrolling preview would retain the current top-only impression, so it does not satisfy the visible completeness requirement by itself.

Move page identity, page type, design-system association, section count and the Open page action above the preview. This preserves immediate access without asking the user to scroll several screens to identify or open a shell. Use existing neutral surface, fine border, restrained radius and typography. Palette and font metadata belong to the existing system view rather than being repeated as the page's primary identity.

Keep the existing Design Systems cards, live viewport behavior and three-column grid unchanged. This is an original product refinement, not source-sized screenshot reproduction. Actual assembled page implementations remain the evidence for the previews; no new page content or source-fidelity claims are implied.

## Review success

The delivered desktop and mobile preview visibly contains the assembled navigation, middle sections and closing footer without internal clipping. Page identity and action appear before the long image. Cards may have unequal natural heights. The full-page action opens the actual working shell, while Design Systems retains its own existing entry behavior.
