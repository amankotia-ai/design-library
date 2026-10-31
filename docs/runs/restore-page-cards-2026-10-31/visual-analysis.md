# Visual guidance — restore page cards and dropdown

Analyst: `/root/visual_analysis`. Inspected the actual user dropdown attachment (578 × 162), prior `before-desktop.png` (1440 × 1000), `pilot/src/style.css`, and `pilot/src/system-browser.jsx` / `.css`. No UI source changed by this agent.

- The attachment shows one quiet native-select treatment: pale neutral fill, thin grey outline, modest rounded corners, dark regular text, and a small muted chevron aligned at the trailing inset. Its pictured bounds are approximately x85–524, y70–142. This is a magnified crop, not evidence that app controls should be 72px tall.
- The corresponding existing `.system-switch select` declares 36px height, 1px `#dedee0` border, 8px radius, `#fafaf8` fill, padding `7px 36px 7px 12px`, and a 12px inline-SVG chevron positioned right 12px. Reuse this exact shared treatment for filters; do not substitute a pill, underline-only field, browser-default arrow, or a new colour.
- Keep filter widths contextual. Existing `.system-switch select` is 220px wide after the system-browser override, and full width on narrow layouts. The control's visual language, not the screenshot's enlarged crop dimensions, is the requirement.
- Prior cards have tall live page previews: `.style-preview` uses 9:10 aspect ratio and 16px inset on top/sides; `.page-viewport` clips an actual 1440px-wide iframe scaled to the available card width. At desktop in the prior capture, each outer card is about 363px wide and its preview is about 400px tall. The card therefore shows the hero and following page sections, rather than a shallow hero-only image.
- Export/reuse `CollectionPagePreview` for Pages. Preserve its live iframe, scaling and clipped tall viewport, and the existing outer card border/radius. Page-preview restoration should not change the new navigation or source section rendering.

Review success: Pages shows both tall live assembled-page previews; filter control border, radius, fill, arrow and padding agree with the existing system select at desktop and mobile widths.
