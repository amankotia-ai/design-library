# Independent QA — eight interactive film studies

Status: **Passed within the reviewed scope.** No blocking visual, mathematical-labeling or formula-to-visual discrepancy found.

Reviewer: `/root/independent_final_qa`. The reviewer did not implement these studies or modify app files. Review used the actual saved screenshots, the current pure mathematical modules and React visual mappings, the study registry, and the root agent’s browser-check report. The reviewer did not personally interact with the live browser.

## Reference and product review

The reviewer read `research/math-reference-shuding/REFERENCE-STUDY.md` and viewed the eight-frame source sheet. Its relevant principle is a mathematical operation tied to a concrete visual consequence; it does not imply a universal artistic-quality formula. The existing Design Systems collection/detail captures from the prior run were also inspected. The new pages preserve the library’s serif headings, body typography, neutral surfaces, red accent, three-column collection and split detail shell. Each new study supplies its own scene or signal, a defining equation, native controls and changing numerical consequences.

The collection exposes nine mathematics entries (the existing scene calculus plus eight new studies), and the study selector provides direct navigation. The registry connects relevant production guides to examples rather than leaving the experiments isolated.

## Mathematical and semantic review

- Spring: the closed-form position, analytic velocity and ODE acceleration agree; the underdamped domain is explicit. The visible mass and timeline sample use the same state.
- Bézier: the path, moving point and tangent use the same control points. Parameter derivatives are distinguished from elapsed-time speed; the normalized tangent arrow is labeled.
- Camera: lateral perspective and its depth-dependent sensitivity agree with `f(X−c)/Z`; the chart explicitly follows the center object.
- Framing: source crop, scaled delivery and retained protected area use the same cover scale and offsets. Deliberate clipping of source artwork is the demonstrated consequence, not a layout defect.
- Speech: source-to-program mapping divides by playback rate; removing the onset produces no valid anchor. The changed screenshot shows the removed word and corresponding diagnostic.
- Reading: visible/stable intersection and assumed reading requirement are separated. A margin is presented as a planning diagnostic, not measured comprehension.
- Mixing: amplitude uses `10^(dB/20)`; the finite-window RMS includes the cross term. The changed screenshot clearly distinguishes raw overshoot from the hard-clipped signal. The amplitude bound, sampled peak and perceptual limits are distinguished.
- Sampling: the signed alias preserves the sampled sine/cosine positions; between-frame disagreement and Nyquist ambiguity are explicit. No shutter/exposure integration is claimed.

## Render and browser evidence

All eight desktop and mobile views were inspected, plus a tablet mix view, three changed states and the mathematics collection: 21 actual images listed below. Equations wrap within the mobile pane; controls stack below visuals; the right pane adapts to its own width on tablet. No unintended clipping, overlapping controls or page-width overflow is visible in the inspected output. Some small annotations are part of scaled diagrams; the equations, units and principal explanation remain ordinary readable text outside them.

The root browser report records a control changing both the visual and its numerical output in each of the eight studies, three equations per study, nine mathematics cards, related guide links, ten successful source downloads and zero page errors. Its geometry records show no document overflow at 1440px or 390px. The report also covers study switching and the captured 900px adaptation. These are reported automation results, not a separate interactive run by this reviewer.

The implementation owners separately report 11 motion, 19 timing and 14 existing scene-calculus checks. This review inspected the mathematical definitions but does not claim a new formal proof, complete browser/accessibility audit or audience study.

## Images inspected

- `spring-motion-desktop.png`
- `spring-motion-mobile.png`
- `bezier-paths-desktop.png`
- `bezier-paths-mobile.png`
- `camera-parallax-desktop.png`
- `camera-parallax-mobile.png`
- `framing-crop-desktop.png`
- `framing-crop-mobile.png`
- `speech-timing-desktop.png`
- `speech-timing-mobile.png`
- `reading-window-desktop.png`
- `reading-window-mobile.png`
- `sound-mixing-desktop.png`
- `sound-mixing-mobile.png`
- `sampling-aliasing-desktop.png`
- `sampling-aliasing-mobile.png`
- `sound-mixing-tablet.png`
- `framing-crop-changed.png`
- `speech-timing-changed.png`
- `sound-mixing-changed.png`
- `mathematics-collection.png`

## Exact frozen revision

All ten current source hashes were independently checked against the browser report and matched.

- `src/film-library.jsx`: `0a1156bbc98fe307e837dc3c2b541b93eb93a8afb8092fd6a9eac16b8cced698`
- `src/film-data.json`: `3fd0651adad38ba7600b96ff40da2fd19d4e2627c50ddb1dfe0bc6d9850398b1`
- `src/film-study-ui.jsx`: `7910548804887c601747dadf2a9060f5670191b88790e038c2226df536cb2955`
- `src/film-studies.jsx`: `624d355c92487fa412b7afd15acf216616f697769b1e7c8db5737bba28b56af9`
- `src/film-studies.css`: `5d0270970c390cff8fba3af2f70957a072ecd3c46f462de603de2dc0839faad8`
- `src/film-study-registry.js`: `fdbbe13d14cae26ae70e3317da20d808081083afa298f0165b6f74e8a2a673d6`
- `src/film-motion-math.js`: `bf5121ebf3b5fc2c7a14dbe5086bd2a0ef0e2337d2a868ade30f376b3490e783`
- `src/film-motion-studies.jsx`: `b0a185d2f624715fa35e1cc1d288d1e03662dffea8049127bfc665f41851a941`
- `src/film-timing-math.js`: `1d2ccf9df240c0e33522e7f1da294ba87b9eef0af642f755a6e0d0cea87963d3`
- `src/film-timing-studies.jsx`: `b244b834e3674b66bf6f7e6f7e9b8af98416aac21a8b97f40c96a5cd5656c315`

This review applies only to the listed revision and evidence. A change to an affected source file invalidates that portion of the review. No published deployment, listening review, all-parameter exhaustive test or actual audience outcome is claimed.
