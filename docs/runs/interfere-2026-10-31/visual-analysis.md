# Interfere visual analysis — 31 October 2026

Analyst: actual specialist `/root/visual_analysis`. Scope: observed homepage language and representative source geometry, with REA evidence. No implementation ownership or QA approval.

## REA evidence

The user's requested REA was used through the existing cached `rea-agents/scripts/rea.mjs`, Node24 runtime. CLI reports REA6.8.0. No REA configuration or source was changed. Selected an isolated new Interfere target `F23897D0F55F16BB7DB01CB43AAEC851` in the existing CDP9341 Chromium; the older Steel target was preserved.

Actual commands: `inspect-web-page http://127.0.0.1:9341 F23897D0F55F16BB7DB01CB43AAEC851 --observation-ms 1000 --include-accessibility-text --format json` and `capture-web-screenshot` against the same endpoint/target. Files `rea-inspection.json` and `rea-screenshot.json` retain complete wrappers. Inspection evidence ID: `ev_1c686d3371d8eeba5b48aff79e8b00734b2f0c4d6090ba7051eb30e743e44466`.

REA's initial screenshot is 800×600 light theme, decoded losslessly to `rea-reference.png`. The site follows the browser's preferred color scheme. For the dark reference, supplementary CDP emulation set 1280×720 and `prefers-color-scheme: dark` while the REA capture ran. Wrapper `rea-screenshot-desktop-dark.json`, decoded file `rea-reference-desktop-dark.png`, evidence `ev_a9808c9e09ded00897b351032eeaf2f7d0281b4526f40a174710cd83158d93b3`. Both actual images were visually inspected. Supplementary IAB computed-style measurements below are not attributed to REA.

## Observed desktop, 1280×720 dark

- Background almost black, computed `oklch(0.15 0 0)`. Primary type is white at .929 opacity; supporting type .685. Borders are low contrast gray. Product panel has slightly lighter black surfaces and fine separators.
- Header is64px high. Content edges40px. Left lockup combines a tiny pixel diamond mark and serif Interfere wordmark. Center nav is compact13px sans. Login and Get started sit right, with tiny keyboard shortcut keycaps.
- Hero headline bounds x40,y208,w444.27,h112. Actual font InterVariable,56px/56px,500 weight,−.56px tracking. It wraps after “that” into two lines. Supporting copy x728,y208,w512,h48;15px/24px,400, right aligned. CTA is right aligned beneath, about97×40 at y280.
- Product demo begins x40,y368; rounded outer shell with roughly14px radius. Demo exceeds visible width and continues below the fold. It is a dense real application interface, with a slim icon rail, breadcrumb header, issue properties column and activity/code pane. Preserve these unequal columns and text density; a generic card or terminal will change the character.
- The product graphic is surrounded by an intentionally subtle broad red-to-magenta-to-blue ambient wash. This effect is part of the reference, not an invented brand gradient.
- Main section headings measured28px/36px,500,−.28px tracking. Supporting paragraph scale remains15px/24px. Brand character comes from space, realistic product detail, restrained color and consistent fine rules.

## Observed narrow source

The preexisting `reference-desktop.png` at task handoff actually contains a360×852 mobile capture. It was inspected as mobile evidence rather than relabeled desktop evidence. Header62px; edges24px; logo upper left and hamburger upper right. Hero begins around y112 with approximately36/36 type, then body16/24, CTA at y320. Product panel begins around y423. The wide app is intentionally cropped, retaining its readable scale rather than shrinking the whole interface to fit. This observed behavior is distinct from inferred new mobile layouts.

## System and reusable section implications

Keep shared color, type, surface, border, radii and spacing tokens separate from sections. Useful section boundaries are navigation; split promise hero with cropped product proof; partner strip; three-step overview; testimonial; three alternating feature/product-detail bands; compliance/security; latest releases; closing CTA; footer. Maintain unequal visual weight and alternate broad promise with detailed proof. Reuse realistic issue, event, code and status primitives across the product scenes. New sections should retain this rhythm and technical detail while using their own documented content.

## Limits

Supplementary CDP screenshots were subsequently captured at1440×900 (`source-desktop-top.png`, `source-desktop-full.png`, total7286px) and390×844 (`source-mobile-top.png`, `source-mobile-full.png`, total9089px), with dark media enabled. Full desktop and top mobile images were visually inspected; full-page captures can contain incomplete intersection-driven reveal text (notably the testimonial). Exact DOM heading bounds are retained in `source-desktop-geometry.json` and `source-mobile-geometry.json`. These supplementary files are separate from REA wrappers. Mobile390 capture confirms the24px edges and native cropped product demo.

Only representative rendered source views and computed values were measured; this is not a claim of full-page pixel identity or recovered backend behavior. Source typography is InterVariable; any fallback must be explicitly documented. Logo/partner/avatar/font asset availability and rights require separate inventory. Source account creation, authentication and backend investigation behavior were not exercised. Hover menus and all mobile navigation states remain unseen in this pass. README.md was successfully read and states no reusable library skill has yet been installed; REA is an existing CLI, not a project skill inferred from its name.
