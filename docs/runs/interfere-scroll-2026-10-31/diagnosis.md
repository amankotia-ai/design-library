# Interfere preview scroll diagnostic

Reviewer: /root/product_design. Inspected the user's 04:26:15 screenshot (3024 × 1964), runtime `system-browser.jsx`, `interfere.jsx`, `public/interfere/source.css`, `page.html`, and `interactions.js`. No source edits made. This is a diagnostic review, not browser verification of the proposed patch.

## Cause

`PagePreview` creates a fixed viewport iframe at the 1440px design width, scaled to its pane. Its `/?view=interfere-page&embed=1` document creates a second iframe through `InterfereStudy`. That inner iframe is expanded to its complete content height by a ResizeObserver. The expanded source document consequently has no useful vertical scroll range. Source CSS applies `html{overscroll-behavior-y:none}` for fine pointers, preventing wheel scroll from chaining out to the wrapper document that does have a scroll range. The screenshot shows the correctly rendered page, but cannot by itself prove scroll behavior.

## Minimal fix assessment

Use `/interfere/page.html` directly as `PagePreview`'s iframe source for the exact `interfere-page` case. This retains the same authoritative source content, removes the redundant browsing context, and gives the native source document a real scroll range inside the fixed preview viewport. Keep the existing 1440px width, calculated unscaled height, transform, iframe title, lazy loading, and `interactive` handling unchanged.

No route or asset regression is apparent from source inspection: page.html declares its own viewport/title and uses absolute `/interfere/` stylesheet/script paths. No relative asset or navigation URLs were found. Its interactions script does not depend on `embed=1`, React state, or the wrapper route. Existing standalone `/?view=interfere-page` and individual section routes can remain untouched. Restrict the bypass to the full-page preview; do not apply it to arbitrary sections without checking their document paths.

The direct document also makes the source's fixed header fixed to the actual preview viewport while scrolling, which is appropriate for native page behavior. The previous full-height inner iframe could not reproduce that behavior correctly.

## Compared with an overscroll override

A scoped `html{overscroll-behavior-y:auto}` override on the expanded inner document could allow wheel chaining to the wrapper, but retains two scroll contexts, the content-height observer, and a fixed header tied to the wrong document viewport. It is a smaller CSS change but a weaker structural fix for this specific fixed-window preview. Do not edit shared source.css globally merely to address this host composition issue.

## Accessibility and boundaries

Preserve the existing interactive iframe's descriptive title and focusability. Preserve `inert`, `aria-hidden`, and tabIndex=-1 for noninteractive page-card previews. No additional controls are needed. A single iframe simplifies keyboard entry compared with nested frames; test keyboard scrolling after focusing inside the document.

Source `overscroll-behavior-y:none` will still prevent wheel chaining to the outer library at the source page's top and bottom. The proposal fixes scrolling through the preview itself; it does not promise outer-document chaining at its boundaries. Verify wheel/trackpad scrolling over the hero and product scene, keyboard PageDown/End inside the focused preview, source navigation disclosure, and unchanged outer-library scrolling outside the preview. Check desktop and mobile pane sizing for clipping and blank space.
