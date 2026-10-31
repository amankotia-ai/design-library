# Taller flowing page previews

Reviewer: /root/cleanup_analysis, visual and product passes. Inspected actual `home-page-viewports-2026-10-31/after-1440.png`, `after-390.png`, and current `pilot/src/system-browser.jsx`/`.css`.

## Evidence and interpretation

Current previews are shallow, centered boxes with a clear gutter and rounded/bordered closure below the viewport. They show approximately the hero plus only the beginning of a following section. The user explicitly asks for the viewport to flow down, overflow at the bottom, and show more page. Interpret as a taller page window whose lower edge is cropped flush by the containing preview stage, with page content visibly continuing rather than a fully closed floating box.

## Recommended contract

- Change the stage from aspect1.4 to4/5; retain16px top/side inset and remove its bottom padding. Make the stage a stretching flex column.
- Remove the viewport's independent aspect-ratio/fixed-height; let it fill the taller stage. Retain its top/side definition, but remove the bottom border, lower corner rounding, and any shadow that closes the lower edge. Keep the preview-stage separator above card metadata.
- Keep clipping at the stage bottom. This is a bounded continuation crop, not uncontrolled content painting over metadata or neighboring cards.
- Derive actual iframe logical height as viewport.clientHeight divided by scale, with scale still derived from width/1440. Observe both dimensions so no blank strip or visually hidden keyboard target results from the formerly fixed900px iframe.
- Preserve native independent frame scrolling, assembled-page routes, unique titles, cards, outer page navigation, and all prior typography/spacing choices. Do not add browser chrome, descriptive copy, or fades.

## Acceptance and risks

At desktop and mobile, each preview starts at the same top inset and continues to the stage bottom with no neutral bottom gutter. It shows materially more initial page content (roughly twice the prior visible source height, depending on card width), with equal stage heights across desktop cards. No empty strip, horizontal overflow, overlap with card metadata, or changed collection actions. Scrolling remains native and reveals further content; frame focus scrolls content into view and keyboard navigation can leave the frame. Outer margins/card bodies still provide an easy way to scroll the mobile catalog.

Mobile cards become substantially taller; this is consistent with the explicit request to show more page. The screenshot request does not establish a specific pixel height, so4/5 is an authored responsive choice to validate with rendered output, not recovered geometry.
