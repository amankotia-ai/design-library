# Steel visual analysis — 31 October 2026

Analyst: real specialist `/root/steel_visual`. Scope: source intake and observed geometry; no implementation ownership. Source https://steel.dev/ inspected live through dedicated Chromium CDP9341 at 1440×1000 and390×844. Source screenshots were opened with `view_image`; desktop and mobile first view were visually inspected. Full-page image capture alone does not establish review of all interactions.

## REA used

REA6.4.0 installed cached package `/Users/abhishekmankotia/.npm/_npx/9b0b36c49b2cae87/node_modules/rea-agents`, unchanged. Node24 runtime `/Users/abhishekmankotia/.nvm/versions/node/v24.18.0/bin/node`. Existing checkout evidence identifies `/Users/abhishekmankotia/Documents/ChatGPT/Panorama/rea-reference`, origin morluto/rea, revision fb28ec1537e2d02aaca96325483c849c5c8ade6f. No REA source/configuration edited.

Actual CLI calls (prefix commands with the Node24 runtime and package `scripts/rea.mjs`):

- `list-browser-targets http://127.0.0.1:9341 --format json`
- `inspect-web-page http://127.0.0.1:9341 2460C6097A4E5A19C5AE5F296CEEB0A8 --observation-ms 1000 --include-accessibility-text --format json`
- `capture-web-screenshot http://127.0.0.1:9341 2460C6097A4E5A19C5AE5F296CEEB0A8 --format json`

Retained wrappers: rea-targets.json, rea-inspection.json, rea-screenshot.json. Inspection evidence ev_52341b3b3f5591a8ae1e45d031716b21f8464b4ccd67781a208725d088f2c278. Screenshot evidence ev_7cff13337bbdf6969bfe3d9858d46f8f08060f79f9892517e05ffa85f20ea746. Screenshot PNG decoded exactly from REA artifact to rea-reference.png. Independent supplementary Playwright captures are named source-*.png; computed-style/DOM extraction is supplementary evidence, not attributed to REA.

## Observed source

Desktop at1440×1000: announcement strip y0–36 in #05a5ff with12px white mono caption. Hero y0–500 in #d7f0ff, black wordmark/navigation at y58–91, content left edge80px. Hero h1 nominal x68 due to negative margin but visible glyphs begin80px, top278.22,height181.78,60px/60.6px,weight360,tracking−1.2px. Three line text. Blue wireframe emblem is actual iframe `/hero/steel-home.html`, not a static photograph. Hero height50vh means500px is viewport-dependent; reproduction comparisons must match1000px viewport height.

Main layout has x56,width1328 outer grid with24px internal margins and24px gaps, giving x80–1360 content bounds (1280px). Intro starts y600; its24px/31.2px copy is left aligned, with mono CTAs aligned to its lower edge. Large browser demo panel starts y682.38, baby blue,4px corners. Terminal panel has white face and pale neutral title bar.

Mobile390×844: announcement remains36px. Hero ends y301. Header wordmark x20,y59, hamburger at right. Title visible x20,y150;40px type,three lines. Intro x20,y326 with24px copy wraps into4 lines. CTAs stack at y470 and517,350px wide,36px high. Browser demo begins y574; terminal inset16px. These are observed source arrangements, not inferred adaptations.

Loaded font families: schengenA variable200–1000 and schengenAMono variable200–1000. Source exact font resource names are ABCSchengenA_Variable-s.p.3nb4eiitxra8w.woff2 and ABCSchengenAMono_Variable.p.1vh0uvnfona6i.woff2. schengenLine and Inter were declared but unloaded. Availability of public font bytes is evidence of source use, not a license conclusion.

## Reusable language

4px terminal/browser/card/button corners; nearwhite #fdfdfc background; black ink; muted #63635e; flat section colors #d7f0ff,#c799d4,#f2d815,#141414;#05a5ff linework. Typography pairs soft variable sans with compact uppercase mono controls. Wide visual panels alternate with split explanatory sections, big flat colored use-case and security bands, thin FAQ separators, and a very large final wordmark.

`root-tokens.json` preserves all computed root vars and settled section markup. `sections.json` gives component boundaries with source dimensions and full HTML. `hydrated-after-scroll.html` and source-desktop-settled.png were captured after scrolling through the page in800px increments to trigger intersection-driven content. Earlier source-desktop.png is pre-scroll. Animation frames can differ across captures; exact paused-frame identity is not claimed.

## Limits

Source behavior observed only for page load, responsive layout and scrolling. Copy, dropdown, FAQ, mobile navigation and demo controls need independent implementation testing. SSR/hydrated markup does not contain React event handlers. Embedded source hero dependencies must be preserved or replaced explicitly; keeping an iframe alone does not prove offline completeness. Full-page source animations/lazy diagrams can be at different frames or partially complete. No source service backend, sign-in or browser sessions are recreated by the study. Source claims and partner logos are attributable reference content, not new product endorsements.
