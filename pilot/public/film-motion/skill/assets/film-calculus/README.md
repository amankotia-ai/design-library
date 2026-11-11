# Executable film model

This dependency-free ES module is the same authored model used by the Film & Motion lab in Design Library. It evaluates a synthetic product scene, its forward derivatives, interval bounds and geometric proof exposure. Node20+ can run this example:

```javascript
import {evaluateFilm, certifySafeFrame, integrateProofExposure} from './film-math.mjs';
console.log(evaluateFilm({time: 3.2}).derivative.x); // px per second
console.log(certifySafeFrame({time: 3.4})); // includes a narrow-width violation witness
console.log(integrateProofExposure({hold: 2.8})); // lower/upper seconds
```

Inputs are time0–8seconds, width320–1600pixels, height240–1000pixels, motion excursion0–240pixels and proof-shot duration1–4seconds. Defaults and validation live in the module. `evaluateFilm(inputs, {mode: 'smooth', wrt: 'width'})` gives the softened preview and width sensitivity; exact is the default. `boundFilm` accepts point inputs or `[lower, upper]` intervals.

Cuts have undefined derivatives at their discontinuities. Interval results assume real arithmetic and do not enclose floating-point rounding. The bound concerns a protected result rectangle, not typography, actual readability or artistic quality. See `references/film-calculus.md` for the workflow and evidence limits.
