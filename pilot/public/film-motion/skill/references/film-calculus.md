# A calculus of film

Use this when the user asks for executable mathematics of composition, motion, timing or format adaptation. The starting point is a scene program, not a weighted rating:

`scene = F(time, viewportWidth, viewportHeight, authoredParameters)`

The same function must drive the visible frame and every mathematical measurement. This method adapts the idea demonstrated in Shu Ding's [The Calculus of Interfaces](https://calculus-of-interfaces.vercel.app/) and [reference post](https://x.com/shuding/status/2115082810738479363). Our scene program is authored by hand; it does not infer arbitrary React layouts or reconstruct arbitrary videos.

## One scene, several evaluations

1. **Evaluate.** Sample the complete state directly at an absolute time. Include positions, dimensions, opacity and selected shot. Seeking must not depend on playback history.
2. **Differentiate.** Propagate derivatives through the same arithmetic graph. Position differentiated with respect to time gives velocity; differentiation with respect to a chosen parameter gives local sensitivity. A hard cut has no ordinary derivative at its discontinuity. Distinguish genuine cuts, continuous kinks and smooth motion.
3. **Soften.** A sigmoid can replace a hard step for an exploratory transition. Label it as a different edit. Give the transition width in seconds or other native units; do not pretend the smooth preview is the exact cut.
4. **Bound.** Propagate intervals through the same graph to enclose a protected rectangle across a declared time and viewport domain. Subdivide where dependency overestimation prevents a conclusion. Return proved, violated or unresolved with the tested domain and tolerance. A sampled sweep alone is not a continuous-domain proof.
5. **Integrate.** Integrate an explicit indicator for the time when the intended result is settled, opaque and inside the safe rectangle. Report lower and upper exposure bounds. It measures geometric opportunity to see the result, not comprehension.

## Make the mathematics visible

Show the actual scene beside its time curve. A timeline cursor must refer to the same time as the frame. Give values units, label the differentiated quantity, and mark discontinuities. Changing the viewport must change the rendered geometry and its constraints together. Let someone deliberately choose a failing setting and see why it fails.

The first library example uses a short product-result scene. It is a bounded teaching model, not a universal renderer. The portable pure-JavaScript model lives in `assets/film-calculus/film-math.mjs`; the interactive example is part of Design Library's Film & Motion collection.

## State exactly what a bound establishes

A box test can establish geometric containment under an authored model. It cannot establish font rasterization, actual text fit, contrast, lack of occlusion, truth of a product claim, lip-sync, artistic impact or audience understanding. Check decoded frames and actual playback for those claims. If interval arithmetic does not use outward rounding, describe its exact-real arithmetic assumption and floating-point limitation; do not call it machine-certified.

Integrals need a declared domain, predicate, subdivision budget and uncertainty interval. At hard boundaries, preserve right-continuous shot selection without inventing a finite velocity. Tests should compare derivatives to finite differences away from boundaries and check interval enclosure against sampled points as a regression check, while recognizing that sampling is not the proof.

## Connect craft to evidence

Keep mathematical invariants, editorial preferences and measured audience outcomes separate. Once a real scene is modeled, test one edit at a time against a declared audience task. Preserve story, emotional effect and artistic judgment as human questions until there is evidence for a measurable relationship. The earlier [quality diagnostic](video-quality-model.md) remains an uncalibrated review aid; it is not the mathematical foundation of a great video.
