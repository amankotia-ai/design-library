# Independent QA — motion calculus extension

**PASS for the inspected staging revision. No blocking defect found.**

Reviewer: `/root/design_qa`, independent of mathematical and UI implementation. No application source was edited by this reviewer. Scope: existing Spring and Bézier studies, their collection previews, guides, downloadable math and manifest in Film & Motion. This is an original system expansion, not a reproduction of an external reference.

## Direct verification

I ran `qa-independent.cjs` against `http://127.0.0.1:5183/design-library/` in headless Chrome, with reduced motion enabled. All nine supplemental checks passed, with zero page errors:

- No automatic playback on load.
- Quintic easing has zero endpoint speed and acceleration at both ends; cubic easing has zero endpoint speed with nonzero endpoint acceleration.
- Changing duration preserves normalized progress and position, halves speed when duration doubles, and quarters acceleration.
- Changing the easing selector during active playback pauses it.
- Once-only playback finishes exactly at the chosen duration.
- The elapsed-time range responds to keyboard ArrowRight.
- All three spring presets set the intended damping, show the matching live regime, and render valid equations.
- Bézier equations remain rendered at the mobile width.

The script also checks for document horizontal overflow at its six screenshot captures. Exact tested implementation hashes are recorded in `qa-independent.json` and match the final source.

I independently reran `scripts/check-film-motion.mjs`: all 21 numerical checks passed. I reviewed the analytic spring branches and timed Bézier chain rule in source. The underdamped solution uses a stable sinc expression near critical damping, the overdamped branch avoids subtractive root cancellation, and physical-time acceleration includes both curve and easing derivatives. Endpoint derivatives are correctly described as belonging to the active interval.

I independently verified all 11 current file hashes in the parent browser report, all ten hashes in the public interactive-source manifest, byte parity between executed and downloadable motion math, and parity between the two displayed guide bodies and their downloadable documents.

## Visual inspection

I opened these actual generated images with `view_image`:

- `qa-bezier-desktop.png`
- `qa-bezier-mobile-controls.png`
- `qa-bezier-mobile-equations.png`
- `qa-spring-overdamped-desktop.png`
- `qa-spring-mobile-equations.png`
- `mathematics-collection.png`
- `bezier-paths-controls-768.png`
- `bezier-paths-390.png`
- `spring-motion-controls-390.png`

The existing serif headings, two-pane desktop arrangement, single red accent, thin rules and paper workbench are preserved. The tablet experiment stacks its controls under the visual inside its pane. Mobile controls fit two columns without horizontal page overflow. The easing selector, duration and path controls remain readable. Both selected-regime and chain-rule equations fit the inspected mobile views. Collection previews now show three actual spring responses and a timed Bézier state, with the same model functions used by the interactive studies.

The geometric tangent is explicitly named as a path tangent, so a visible arrow at a stationary eased endpoint does not falsely claim nonzero velocity. Clock progress and curve parameter are separately defined. Spring claims retain fixed natural frequency and initial-condition context. No empirical artistic-quality claim is made.

## Parent evidence reviewed

`browser-check.json` reports both revised routes passing all three comparison presets, reset, playback, pause, scrub-to-pause and reset-during-play checks, plus duration scaling and once-only completion. It records 17 desktop/tablet/mobile/collection captures and zero page errors. I inspected that report and verified its hashes; these checks are attributed to the parent, separate from my independent browser script.

`build.log` records a successful production build. The parent also reports 54 mathematical checks overall and route/download inventory checks passing. I directly reran the 21 motion checks only; the scene/timing totals are attributed to the parent run.

## Limits

The SVG axis ticks remain small on mobile, as in the preceding version; key input labels and measured values are supplied outside the plots. The current detail pane uses its existing independent scrolling behavior, so captures show different scroll positions. This is not a full screen-reader or physical touch-device audit. No claim is made about unmodified library entries or a deployed website. Final canonical sync is performed after this staging review; identical hashes establish source parity, not deployment verification.

## Exact reviewed revision

Root: `/Users/abhishekmankotia/Downloads/MovieMaker/studies-polish/pilot`

| File | SHA-256 |
| --- | --- |
| `src/film-motion-math.js` | `1579e718e31f948a72c6fe809d5ccbc60351c0f735d3f0258584d42604f69379` |
| `src/film-motion-studies.jsx` | `74220035ec48a7909ef68b933a8b2825e15507c4dde9702a79089d1a0f4d4522` |
| `src/film-study-thumbnails.jsx` | `344ca314392b5ed7f213f2d0e2499bc10a71f8d3bf33953047ccce5f4b343d9d` |
| `src/film-study-ui.jsx` | `801a6645102db5d139b523a9e1118aa88d4dcf99c00192457bbf97db0c3f0561` |
| `src/film-study-registry.js` | `e4cb4287debacf81cd736430cfceb3a005963d099a8de2ed22a5bb6cc3d44d2c` |
| `src/film-data.json` | `fe1ef55cd4c5d1b0228ecad624db06f0b23502a71e472b6d176ae4e2d9768759` |
| `scripts/check-film-motion.mjs` | `e74fa087c2931cdf63e988da0f93434f5c7a3346e2af952cc7855c071bbefef7` |
| `public/film-motion/studies/film-motion-math.js` | `1579e718e31f948a72c6fe809d5ccbc60351c0f735d3f0258584d42604f69379` |
| `public/film-motion/studies/spring-motion.md` | `a8bc65829b07c00b4856f9b2e1af7c2a92033f3bbfe92d47b4355bcbf7fbed2b` |
| `public/film-motion/studies/bezier-paths.md` | `f5e64dfd3b75ef15306eabcdadc8f896a84c9b9d7b33eacc52da13b04ee82adc` |
| `public/film-motion/manifest.json` | `c13e8b92fcb75ca36bc62c293f43a56c0dad7d5718f935dc6526f58681a02ccc` |
