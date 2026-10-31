# Independent live page viewport QA

Reviewer: `/root/cleanup_qa`. Verdict: **passed** for the requested homepage viewport component. No blocking findings.

Inspected the actual user crop, final `after-1440.png`, `after-768.png`, and `after-390.png` with the image viewer; read the brief, visual/product analysis, art direction, and final JSX/CSS. Independently exercised the live page in Chromium; results and exact hashes are in `qa.json`.

## Visual result

All three actual assembled pages appear inside bounded inset viewports, with a neutral surround visible on all sides. No browser tabs, address bar, traffic lights, new caption, or preview toolbar was added. Desktop/tablet retain three columns; mobile stacks cards. Prior spacing and text removals remain intact. Frames, card titles, metadata, and primary links fit their containers without horizontal overflow or clipping.

The mobile screenshot captures the Blueprint Op Art canvas in a black initial dynamic frame, while its surrounding assembled-page content loads. This is a capture timing limit for the existing dynamic demo, not missing page chrome or an empty iframe. The desktop/tablet captures show the rendered pattern. This review does not assert a deterministic frame for live source animations.

## Independent behavior checks

- Each titled iframe loads the expected route: `page`, `signal-page`, or `blueprint-page`, with a 1440×900 layout viewport.
- Native wheel scrolling moves each document from 0 to 700px while the outer homepage remains at 0; the frame stays bounded.
- Tab from the last Quiet Serif preview link exits into its card title link. Focusing the iframe produces the visible surrounding focus outline.
- All three card-title links reach the correct system detail page. Existing Explore links remain separate anchors in final source.
- At 390px, wheel scrolling on the neutral stage surround moves the outer document 400px; there is no horizontal overflow. No wheel/touch interception handlers are introduced.
- No browser page errors occurred during these checks. ResizeObserver cleanup, lazy loading, unique frame titles, and the absence of an anchor around interactive iframes are present in source.

Limitations: physical-device touch gestures and exhaustive interactions inside the existing source pages were not tested. The scaled previews contain small controls; the retained title/Explore links are the comfortable navigation paths. Existing build/input checks were reported passed by the implementation owner rather than rerun by QA.

## Inspected final source SHA256

- `pilot/src/system-browser.jsx`: `9f04d25efc24b8e8f154d7f6638eb532505b19c1eb8e0a8bc4035b37d65ba598`
- `pilot/src/system-browser.css`: `9f778eac0636c9a18c187ae192d705ca43a9f5635f442e50bd254751841c0994`

No implementation files were changed by this reviewer. This verdict applies to these revisions and the bounded homepage preview request.
