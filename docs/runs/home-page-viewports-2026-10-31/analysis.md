# Homepage page viewport analysis

Reviewer: /root/cleanup_analysis; visual and product passes. Inspected actual supplied `Screenshot 2026-10-31 at 1.53.40 AM.png`, current `pilot/src/system-browser.jsx`, `pilot/src/system-browser.css`, and `main.jsx` PreviewFrame/routes. No source changes made.

## Observation and interpretation

The supplied crop shows edge-to-edge static images at the top of cards. They read as cropped artwork, especially the Blueprint workshop image. The user asks for a page viewport contained inside a bigger container, with no browser elements. Interpret as a quiet inset stage around a bounded, live assembled-page iframe. Do not add tabs, traffic lights, an address bar, controls, or explanatory copy. Preserve card information below and existing overall header spacing.

## Product and visual contract

- Each stage visibly surrounds its inset viewport on all sides. Use the existing neutral surface/rule tokens and modest radius. A single border provides enough viewport definition.
- Load each collection's actual assembled page (`page`, `signal-page`, `blueprint-page`) rather than the existing isolated preview image. Start at page top. Do not include the library shell inside itself.
- Use a fixed desktop layout width (approximately1440 CSS px) scaled to the available viewport width so the three cards remain comparable. The viewport height is bounded; document content scrolls within it rather than expanding the card to the complete page length.
- Preserve the three-column desktop layout and stacked mobile layout, stable frame geometry during loading, names, family/mode rules, palette/type, section counts, and the independent title/Explore links.
- The iframe is a viewport rather than a link wrapper; never nest an interactive frame inside an anchor. Give each iframe a unique title such as “Quiet Serif page preview.” Keep conventional visible focus on surrounding links and frame focus if keyboard reachable. Tab must be able to leave the frame.
- On touch, the outer page must remain easy to scroll through the stage surround/card body. Allow native inner scrolling without custom wheel/touch handlers or a scroll trap. Scale the desktop composition consistently on mobile; this is a catalog preview, with full study/mobile modes available through existing links.
- Reuse existing resize patterns, but do not copy PreviewFrame's whole-document height expansion into these bounded viewports. Disconnect ResizeObserver on unmount and avoid horizontal overflow from unscaled iframe width.

## Risks and acceptance

Scaled live controls can be too small for comfortable operation; they are previews, and the retained Explore/title links remain primary navigation. Several live pages increase initial resource use and animation work; lazy-load frames and preserve existing reduced-motion/offscreen behavior where available. Inner links may navigate a frame, so confirm they cannot replace the catalog itself or create confusing route recursion. No new external services are required.

Acceptance: actual assembled pages load in all three clearly inset, chrome-free viewports; scrolling a frame reveals lower page content while the card stays bounded; desktop/mobile page fits without horizontal overflow; title/Explore routes work; keyboard can enter and leave available preview content; outer touch/page scrolling remains available; no browser console errors or newly broken source/detail routes. Visually inspect current desktop and mobile screenshots after implementation rather than approving the old raster card output.
