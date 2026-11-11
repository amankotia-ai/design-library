import assert from 'node:assert/strict';
import { DEFAULT_INPUTS, FILM_GRAPH, evaluateFilm, boundFilm, certifySafeFrame, integrateProofExposure, sampleFilm } from '../src/film-math.js';

let passed = 0;
function check(name, fn) { fn(); passed++; console.log(`✓ ${name}`); }
function near(a, b, tolerance = 1e-6) { assert.ok(Math.abs(a - b) <= tolerance, `${a} ≉ ${b}`); }
function central(inputs, variable, field, mode = 'exact') {
  const h = 1e-5;
  const p = { ...DEFAULT_INPUTS, ...inputs };
  return (evaluateFilm({ ...p, [variable]: p[variable] + h }, { mode }).state[field] - evaluateFilm({ ...p, [variable]: p[variable] - h }, { mode }).state[field]) / (2 * h);
}

check('authored graph produces a concrete centered, settled proof', () => {
  const { state } = evaluateFilm();
  assert.ok(FILM_GRAPH.nodes.length > 30);
  near(state.x, 170); near(state.y, 110); near(state.cardWidth, 620);
  near(state.proofX, 194); near(state.proofWeight, 1); near(state.exposure, 1);
});

check('random seeking is pure and repeatable', () => {
  const before = evaluateFilm({ time: 3.23, width: 540 });
  for (const time of [7, 0, 5.8, 1.1, 3, 4.6]) evaluateFilm({ time });
  assert.deepEqual(evaluateFilm({ time: 3.23, width: 540 }), before);
});

check('forward derivatives match centered finite differences away from kinks', () => {
  for (const mode of ['exact', 'smooth']) {
    for (const inputs of [{ time: .6, width: 500 }, { time: 3.2, width: 960 }, { time: 3.6, width: 500 }, { time: 4.5, width: 1000 }]) {
      for (const wrt of ['time', 'width', 'overshoot', 'hold']) {
        const result = evaluateFilm(inputs, { mode, wrt });
        for (const field of ['x', 'y', 'cardWidth', 'proofWeight']) {
          assert.notEqual(result.derivative[field], null);
          near(result.derivative[field], central(inputs, wrt, field, mode), 2e-4);
        }
      }
    }
  }
});

check('exact cuts are right-continuous with undefined time derivative at the cut', () => {
  near(evaluateFilm({ time: 3 - 1e-6 }).state.proofWeight, 0);
  const cut = evaluateFilm({ time: 3 });
  near(cut.state.proofWeight, 1);
  assert.equal(cut.derivative.proofWeight, null);
  assert.equal(evaluateFilm({ time: 3 }, { wrt: 'width' }).derivative.proofWeight, 0);
  assert.equal(evaluateFilm({ time: 5.8 }).derivative.proofWeight, null);
});

check('smooth cut changes the state and yields finite derivatives', () => {
  const soft = evaluateFilm({ time: 3 }, { mode: 'smooth' });
  near(soft.state.proofWeight, .5, 1e-10);
  assert.ok(soft.derivative.proofWeight > 2.7 && soft.derivative.proofWeight < 2.8);
  near(soft.derivative.proofWeight, central({ time: 3 }, 'time', 'proofWeight', 'smooth'), 1e-5);
});

check('responsive minimum reports its derivative kink instead of inventing a slope', () => {
  assert.equal(evaluateFilm({ width: 676 }, { wrt: 'width' }).derivative.x, null);
  near(evaluateFilm({ width: 500 }, { wrt: 'width' }).derivative.x, 0);
  near(evaluateFilm({ width: 960 }, { wrt: 'width' }).derivative.x, .5);
});

check('point intervals collapse to evaluated field values', () => {
  for (const mode of ['exact', 'smooth']) {
    const inputs = { time: 3.24, width: 660, overshoot: 85, hold: 1.7 };
    const bounds = boundFilm(inputs, { mode }), { state } = evaluateFilm(inputs, { mode });
    for (const key of Object.keys(state)) { near(bounds[key][0], state[key]); near(bounds[key][1], state[key]); }
  }
});

check('intervals enclose deterministic samples, including cuts and layout regime changes', () => {
  const box = { time: [2.9, 3.6], width: [600, 750], overshoot: [40, 180], hold: [1, 3.1] };
  for (const mode of ['exact', 'smooth']) {
    const bounds = boundFilm(box, { mode });
    for (let i = 0; i <= 30; i++) {
      const f = i / 30;
      const inputs = { time: 2.9 + .7 * f, width: 750 - 150 * f, overshoot: 40 + 140 * ((i * 7 % 31) / 30), hold: 1 + 2.1 * ((i * 11 % 31) / 30) };
      const { state } = evaluateFilm(inputs, { mode });
      for (const key of Object.keys(state)) assert.ok(state[key] >= bounds[key][0] - 1e-9 && state[key] <= bounds[key][1] + 1e-9, `${key} escaped ${mode} enclosure`);
    }
  }
});

check('safe settled proof and actual narrow-width violation are distinguished', () => {
  const settled = certifySafeFrame();
  assert.equal(settled.status, 'bounded-safe'); assert.ok(settled.lower >= 0);
  const moving = certifySafeFrame({ time: 3.4, overshoot: 110 });
  assert.equal(moving.status, 'violated'); assert.ok(moving.witness.margin < 0);
  near(evaluateFilm({ time: 3.4, overshoot: 110, width: moving.witness.width }).state.margin, moving.witness.margin);
});

check('coarse interval dependency ambiguity remains unresolved, not falsely proved', () => {
  const result = certifySafeFrame({ time: 4.2 }, [360, 1280], { subdivisions: 1 });
  assert.equal(result.status, 'unresolved'); assert.equal(result.witness, null);
});

check('exposure bounds enclose the known settled duration and tighten to tolerance', () => {
  for (const hold of [1, 1.7, 2.8, 4]) {
    const exposure = integrateProofExposure({ hold }, { tolerance: .005 });
    const exactSeconds = hold - .8;
    assert.ok(exposure.lower <= exactSeconds + 1e-12 && exposure.upper >= exactSeconds - 1e-12);
    assert.ok(exposure.converged); assert.ok(exposure.uncertainty <= .005);
  }
});

check('integration budget exhaustion is reported honestly', () => {
  const exposure = integrateProofExposure({}, { maxCells: 1 });
  assert.equal(exposure.converged, false); assert.equal(exposure.cells, 1);
  assert.ok(exposure.lower <= 2 && exposure.upper >= 2);
});

check('invalid parameters and interval requests fail clearly', () => {
  for (const invalid of [{ time: NaN }, { hold: Infinity }, { width: 0 }, { overshoot: true }]) assert.throws(() => evaluateFilm(invalid), RangeError);
  assert.throws(() => boundFilm({ width: [900, 400] }), RangeError);
  assert.throws(() => evaluateFilm({}, { mode: 'imaginary' }), RangeError);
  assert.throws(() => evaluateFilm({}, { wrt: 'quality' }), RangeError);
  assert.throws(() => integrateProofExposure({}, { tolerance: 0 }), RangeError);
  assert.throws(() => certifySafeFrame({}, [360, 1280], { subdivisions: 0 }), RangeError);
});

check('chart data is a sampled view of the same graph', () => {
  const curve = sampleFilm({ overshoot: 90 }, 'proofWeight', { mode: 'smooth', count: 17 });
  assert.equal(curve.length, 17);
  for (const point of curve) near(point.value, evaluateFilm({ time: point.time, overshoot: 90 }, { mode: 'smooth' }).state.proofWeight);
});

console.log(`\n${passed} film-math checks passed. Interval claims remain conditional on real arithmetic; tests do not establish typography or audience comprehension.`);
