# Interactive film studies — polish

Eight existing studies now pair inspectable equations with guided comparison presets, explicit reset, variable definitions and computed interpretations. Spring, Bézier and aliasing studies have opt-in single-pass playback, manual scrub, rewind and pause. Parameter changes, presets and reset pause the clock; playback stops when its workbench is offscreen or the page is hidden. State is still evaluated from the same pure math functions.

The Film & Motion collection uses eight subject-specific previews computed by the actual model functions. Existing Design Systems collection and detail layout remains. Each study has specific guidance and two relevant next studies.

Equations use KaTeX with MathML output and trusted authored TeX only. Motion provides the animation-frame and in-view hooks. KaTeX0.16 supports the existing Node20 environment. No automatic animation, audio, deployment or commit was introduced.

Validation: see evidence/browser-polish-check.json for exact reviewed source hashes, eight preset/reset sets,24 equation render checks, responsive screenshots and playback checks. playback-lifecycle.json separately verifies no autoplay, end stops, preset interruption and offscreen pause. delivery-check.json confirms all8 routes and21 reviewed source hashes on the actual target preview. The unchanged math suite comprises44 checks. QA.md records independent review and any limits. Production build warnings about client directives and existing large chunks are non-fatal.

Primary implementation references: https://katex.org/docs/api and https://motion.dev/docs/react-use-animation-frame. The existing reference research and assumptions remain in the project guides and previous run evidence.
