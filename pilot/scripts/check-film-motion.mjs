import assert from 'node:assert/strict';
import { springState, easingState, cubicBezier, timedBezier, cameraMotion, projectPoint, projectMovingPoint, coverCrop, rectangleIntersection } from '../src/film-motion-math.js';
let passed = 0;
const check = (name, fn) => { fn(); passed++; console.log(`✓ ${name}`); };
const near = (actual, expected, tolerance = 1e-6) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);

check('spring initial conditions and undamped limit', () => {
  const initial = springState({ time: 0, damping: .3, frequency: 1.2, amplitude: 2 });
  near(initial.position, 2); near(initial.velocity, 0); near(initial.acceleration, -2 * (2 * Math.PI * 1.2) ** 2);
  for (const time of [.2, .7, 1.3]) {
    const actual = springState({ time, damping: 0, frequency: 1 });
    near(actual.position, Math.cos(2 * Math.PI * time));
    near(actual.velocity, -2 * Math.PI * Math.sin(2 * Math.PI * time));
  }
});

check('spring analytic velocity and acceleration match finite differences', () => {
  const h = 1e-5;
  for (const damping of [.08, .3, .9, 1 - 1e-9, 1, 1 + 1e-9, 1.5, 3]) for (const frequency of [.5, 1.4, 2.5]) for (const time of [.1, .5, 1.1, 3]) {
    const current = springState({ time, damping, frequency });
    const before = springState({ time: time - h, damping, frequency }), after = springState({ time: time + h, damping, frequency });
    near(current.velocity, (after.position - before.position) / (2 * h), 2e-5);
    near(current.acceleration, (after.velocity - before.velocity) / (2 * h), 2e-4);
    near(current.acceleration + 2 * damping * current.omega * current.velocity + current.omega ** 2 * current.position, 0, 1e-9);
  }
});

check('spring seeks repeatably and rejects invalid parameters', () => {
  const expected = springState({ time: .7 });
  springState({ time: 4 }); springState({ time: 0 });
  assert.deepEqual(springState({ time: .7 }), expected);
  for (const damping of [-.1, NaN, Infinity]) assert.throws(() => springState({ damping }), RangeError);
  assert.throws(() => springState({ time: -1 }), RangeError);
  assert.throws(() => springState({ frequency: 1e308 }), RangeError);
});

check('critical damping agrees with the closed-form repeated-root solution', () => {
  const frequency = 1.2, omega = 2 * Math.PI * frequency, amplitude = 2;
  for (const time of [0, .1, .4, 1, 4]) {
    const value = springState({ time, damping: 1, frequency, amplitude });
    near(value.position, amplitude * (1 + omega * time) * Math.exp(-omega * time));
    near(value.velocity, -amplitude * omega ** 2 * time * Math.exp(-omega * time));
    assert.equal(value.regime, 'critical'); assert.equal(value.dampedOmega, 0);
  }
});

check('all damping regimes preserve initial conditions and the ODE', () => {
  for (const damping of [0, .3, .99, 1, 1.01, 2, 100]) for (const amplitude of [-2, 0, 1, 3]) {
    const value = springState({ time: 0, damping, amplitude });
    near(value.position, amplitude); near(value.velocity, 0);
    near(value.acceleration, -(value.omega ** 2) * amplitude);
    assert.equal(value.regime, damping < 1 ? 'underdamped' : damping === 1 ? 'critical' : 'overdamped');
  }
});

check('spring solution is continuous across critical damping without subtractive cancellation', () => {
  for (const time of [0, .0001, .1, .5, 2, 10]) {
    const critical = springState({ time, damping: 1 });
    for (const damping of [1 - 1e-12, 1 + 1e-12, 1 - Number.EPSILON, 1 + Number.EPSILON]) {
      const value = springState({ time, damping });
      for (const key of ['position', 'velocity', 'acceleration']) near(value[key], critical[key], 2e-10);
    }
  }
});

check('critical and overdamped responses return monotonically without crossing the target', () => {
  for (const damping of [1, 1.000001, 1.5, 3, 100]) {
    let previous = 1;
    for (let i = 0; i <= 200; i++) {
      const value = springState({ time: i / 10, damping });
      assert.ok(value.position >= 0 && value.position <= previous + 1e-12);
      assert.ok(value.velocity <= 0); previous = value.position;
    }
  }
  const settled = springState({ time: 10000, damping: 2 });
  near(settled.position, 0); near(settled.velocity, 0); near(settled.acceleration, 0);
});

check('spring bounds enclose displacement and damping never increases mechanical energy', () => {
  for (const damping of [0, .12, .7, .999999, 1, 1.000001, 2]) {
    let previousEnergy = Infinity;
    for (let i = 0; i <= 200; i++) {
      const value = springState({ time: i / 40, damping, amplitude: -2 });
      assert.ok(Math.abs(value.position) <= value.envelope + 1e-12);
      const energy = .5 * (value.velocity ** 2 + value.omega ** 2 * value.position ** 2);
      assert.ok(energy <= previousEnergy + 1e-10); previousEnergy = energy;
    }
  }
});

check('easing families have the promised endpoint continuity', () => {
  for (const mode of ['linear', 'smoothstep', 'smootherstep']) {
    near(easingState(0, mode).value, 0); near(easingState(1, mode).value, 1);
    for (let i = 0; i <= 1000; i++) {
      const value = easingState(i / 1000, mode);
      assert.ok(value.value >= 0 && value.value <= 1 && value.first >= 0);
    }
  }
  near(easingState(0, 'linear').first, 1); near(easingState(1, 'linear').first, 1);
  for (const t of [0, 1]) {
    near(easingState(t, 'smoothstep').first, 0);
    near(easingState(t, 'smootherstep').first, 0); near(easingState(t, 'smootherstep').second, 0);
  }
  near(easingState(0, 'smoothstep').second, 6); near(easingState(1, 'smoothstep').second, -6);
  assert.throws(() => easingState(-.1), RangeError); assert.throws(() => easingState(1.1), RangeError);
  assert.throws(() => easingState(.5, 'unknown'), RangeError);
});

check('easing derivatives through jerk match independent finite differences', () => {
  const h = 1e-5;
  for (const mode of ['linear', 'smoothstep', 'smootherstep']) for (const t of [.01, .2, .5, .8, .99]) {
    const value = easingState(t, mode), before = easingState(t - h, mode), after = easingState(t + h, mode);
    near(value.first, (after.value - before.value) / (2 * h), 1e-7);
    near(value.second, (after.first - before.first) / (2 * h), 1e-7);
    near(value.third, (after.second - before.second) / (2 * h), 1e-7);
  }
});

const points = [[70, 245], [170, 65], [480, 280], [610, 80]];
check('Bézier endpoints and endpoint tangents are exact', () => {
  assert.deepEqual(cubicBezier(points, 0).position, points[0]);
  assert.deepEqual(cubicBezier(points, 1).position, points[3]);
  assert.deepEqual(cubicBezier(points, 0).velocity, [300, -540]);
  assert.deepEqual(cubicBezier(points, 1).velocity, [390, -600]);
});

check('Bézier first and second derivatives match finite differences', () => {
  const h = 1e-5;
  for (const t of [.1, .3, .6, .9]) {
    const current = cubicBezier(points, t), before = cubicBezier(points, t - h), after = cubicBezier(points, t + h);
    for (const k of [0, 1]) {
      near(current.velocity[k], (after.position[k] - before.position[k]) / (2 * h), 1e-4);
      near(current.acceleration[k], (after.velocity[k] - before.velocity[k]) / (2 * h), 1e-4);
    }
    near(current.speed, Math.hypot(...current.velocity));
  }
});

check('straight equally spaced control points give constant parametric speed', () => {
  const line = [[0, 0], [10, 20], [20, 40], [30, 60]];
  for (const t of [0, .2, .5, 1]) {
    const value = cubicBezier(line, t);
    near(value.position[0], 30 * t); near(value.position[1], 60 * t);
    near(value.speed, Math.hypot(30, 60));
    near(Math.hypot(...value.acceleration), 0);
  }
  assert.throws(() => cubicBezier(points, 1.1), RangeError);
});

check('timed Bézier chain-rule velocity and acceleration match finite differences', () => {
  const h = 1e-5;
  for (const easing of ['linear', 'smoothstep', 'smootherstep']) for (const duration of [1, 2, 4]) for (const progress of [.1, .35, .6, .9]) {
    const time = duration * progress;
    const value = timedBezier(points, { time, duration, easing });
    const before = timedBezier(points, { time: time - h, duration, easing });
    const after = timedBezier(points, { time: time + h, duration, easing });
    for (const k of [0, 1]) {
      near(value.velocity[k], (after.position[k] - before.position[k]) / (2 * h), 1e-5);
      near(value.acceleration[k], (after.velocity[k] - before.velocity[k]) / (2 * h), 1e-4);
    }
    near(value.speed, Math.hypot(...value.velocity));
  }
});

check('doubling duration preserves path position, halves speed and quarters acceleration', () => {
  for (const easing of ['linear', 'smoothstep', 'smootherstep']) for (const progress of [0, .2, .7, 1]) {
    const a = timedBezier(points, { time: progress * 2, duration: 2, easing });
    const b = timedBezier(points, { time: progress * 4, duration: 4, easing });
    assert.deepEqual(a.position, b.position); near(a.parameter, b.parameter); near(a.speed, b.speed * 2);
    for (const k of [0, 1]) { near(a.velocity[k], b.velocity[k] * 2); near(a.acceleration[k], b.acceleration[k] * 4); }
  }
});

check('timed Bézier preserves endpoints and smootherstep has resting endpoint velocity and acceleration', () => {
  for (const easing of ['linear', 'smoothstep', 'smootherstep']) {
    assert.deepEqual(timedBezier(points, { time: 0, easing }).position, points[0]);
    assert.deepEqual(timedBezier(points, { time: 4, easing }).position, points[3]);
  }
  for (const time of [0, 4]) {
    const value = timedBezier(points, { time, easing: 'smootherstep' });
    near(value.speed, 0); near(Math.hypot(...value.acceleration), 0);
  }
  const stationary = [[9, 13], [9, 13], [9, 13], [9, 13]];
  const value = timedBezier(stationary, { time: 1, easing: 'smoothstep' });
  near(value.speed, 0); near(Math.hypot(...value.acceleration), 0);
  assert.throws(() => timedBezier(points, { time: -1 }), RangeError);
  assert.throws(() => timedBezier(points, { time: 5 }), RangeError);
  assert.throws(() => timedBezier(points, { duration: 0 }), RangeError);
  assert.throws(() => timedBezier(points, { duration: NaN }), RangeError);
  assert.throws(() => timedBezier(points, { duration: 1e-308 }), RangeError);
});

check('perspective derivative and translation invariants', () => {
  const params = { worldX: 2, cameraX: .4, depth: 3, focalLength: 210 };
  const current = projectPoint(params), h = 1e-5;
  for (const [input, derivative] of [['cameraX', 'dCamera'], ['depth', 'dDepth'], ['focalLength', 'dFocal']]) {
    const before = projectPoint({ ...params, [input]: params[input] - h }), after = projectPoint({ ...params, [input]: params[input] + h });
    near(current[derivative], (after.x - before.x) / (2 * h), 1e-5);
  }
  near(projectPoint({ ...params, worldX: 5, cameraX: 3.4 }).x, current.x);
  near(projectPoint({ ...params, depth: 6 }).x, current.x / 2);
  assert.throws(() => projectPoint({ depth: 0 }), RangeError);
});

check('eased camera velocity and acceleration match time derivatives in every easing mode', () => {
  const h = 1e-5;
  for (const easing of ['linear', 'smoothstep', 'smootherstep']) for (const duration of [.5, 2, 4, 8]) for (const progress of [.1, .3, .65, .9]) {
    const options = { duration, start: -.8, end: 1.3, easing }, time = progress * duration;
    const value = cameraMotion({ ...options, time }), before = cameraMotion({ ...options, time: time - h }), after = cameraMotion({ ...options, time: time + h });
    near(value.velocity, (after.position - before.position) / (2 * h), 1e-7);
    near(value.acceleration, (after.velocity - before.velocity) / (2 * h), 1e-6);
    near(value.progress, progress, 1e-12);
  }
});

check('camera duration changes speed and acceleration without changing the route', () => {
  for (const easing of ['linear', 'smoothstep', 'smootherstep']) for (const progress of [0, .23, .5, .81, 1]) {
    const a = cameraMotion({ time: 2 * progress, duration: 2, easing });
    const b = cameraMotion({ time: 4 * progress, duration: 4, easing });
    near(a.position, b.position); near(a.velocity, 2 * b.velocity); near(a.acceleration, 4 * b.acceleration);
    assert.deepEqual(a.easing, b.easing);
  }
});

check('camera endpoints retain the selected easing continuity', () => {
  for (const easing of ['linear', 'smoothstep', 'smootherstep']) {
    const start = cameraMotion({ time: 0, duration: 3, start: -2, end: 4, easing });
    const end = cameraMotion({ time: 3, duration: 3, start: -2, end: 4, easing });
    assert.equal(start.position, -2); assert.equal(end.position, 4);
    assert.equal(start.progress, 0); assert.equal(end.progress, 1);
    if (easing === 'linear') { near(start.velocity, 2); near(end.velocity, 2); }
    else { near(start.velocity, 0); near(end.velocity, 0); }
    if (easing === 'smoothstep') { near(start.acceleration, 4); near(end.acceleration, -4); }
    else { near(start.acceleration, 0); near(end.acceleration, 0); }
  }
});

check('camera reversal flips derivatives and a zero-distance camera stays still', () => {
  for (const easing of ['linear', 'smoothstep', 'smootherstep']) for (const time of [0, .4, 1.3, 3, 4]) {
    const forward = cameraMotion({ time, start: -1, end: 2, easing });
    const reversed = cameraMotion({ time, start: 2, end: -1, easing });
    near(forward.position + reversed.position, 1);
    near(forward.velocity, -reversed.velocity); near(forward.acceleration, -reversed.acceleration);
    const still = cameraMotion({ time, start: .7, end: .7, easing });
    assert.equal(still.position, .7); near(still.velocity, 0); near(still.acceleration, 0);
    const repeated = cameraMotion({ time, start: -1, end: 2, easing });
    assert.deepEqual(repeated, forward);
  }
});

check('projected velocity and acceleration match derivatives of the moving-camera image', () => {
  const h = 1e-5;
  for (const easing of ['linear', 'smoothstep', 'smootherstep']) for (const depth of [1.2, 3.6, 6.6]) for (const time of [.2, .9, 2.7, 3.8]) {
    const at = t => {
      const camera = cameraMotion({ time: t, start: -.6, end: 1.4, easing });
      return projectMovingPoint({ worldX: 1.7, cameraX: camera.position, cameraVelocity: camera.velocity, cameraAcceleration: camera.acceleration, depth, focalLength: 210 });
    };
    const value = at(time), before = at(time - h), after = at(time + h);
    near(value.velocity, (after.x - before.x) / (2 * h), 1e-5);
    near(value.acceleration, (after.velocity - before.velocity) / (2 * h), 1e-5);
    assert.ok(value.velocity <= 0, 'A rightward camera move sends fixed scenery left');
  }
});

check('projected motion scales inversely with depth and directly with focal length', () => {
  const options = { worldX: 2, cameraX: .4, cameraVelocity: 1.2, cameraAcceleration: -.3, depth: 3, focalLength: 210 };
  const base = projectMovingPoint(options), distant = projectMovingPoint({ ...options, depth: 6 }), longerLens = projectMovingPoint({ ...options, focalLength: 420 });
  for (const key of ['x', 'velocity', 'acceleration', 'dCamera']) {
    near(distant[key], base[key] / 2); near(longerLens[key], base[key] * 2);
  }
  near(distant.dDepth, base.dDepth / 4); near(distant.dFocal, base.dFocal / 2);
  const staticProjection = projectMovingPoint({ ...options, cameraVelocity: 0, cameraAcceleration: 0 });
  near(staticProjection.velocity, 0); near(staticProjection.acceleration, 0);
  const shifted = projectMovingPoint({ ...options, worldX: 5, cameraX: 3.4 });
  for (const key of ['x', 'velocity', 'acceleration']) near(shifted[key], base[key]);
});

check('camera and moving projection reject invalid domains and unrepresentable outputs', () => {
  for (const options of [{ time: -1 }, { time: 5 }, { time: NaN }, { duration: 0 }, { duration: Infinity }, { start: true }, { end: Infinity }, { easing: 'unknown' }, { start: -1e308, end: 1e308 }, { duration: 1e-308, easing: 'linear' }]) {
    assert.throws(() => cameraMotion(options), RangeError);
  }
  for (const options of [{ depth: 0 }, { focalLength: -1 }, { worldX: NaN }, { cameraX: Infinity }, { cameraVelocity: true }, { cameraAcceleration: NaN }, { worldX: 1e308 }, { cameraVelocity: 1e308 }, { cameraAcceleration: 1e308 }]) {
    assert.throws(() => projectMovingPoint(options), RangeError);
  }
});

const source = { sourceWidth: 1200, sourceHeight: 800, viewportWidth: 900, viewportHeight: 600, protectedRect: { x: 580, y: 290, width: 240, height: 280 } };
check('matching aspect with no zoom retains the complete source', () => {
  const crop = coverCrop(source);
  near(crop.scale, .75); near(crop.offsetX, 0); near(crop.offsetY, 0);
  near(crop.retainedFraction, 1); near(crop.retainedSourceFraction, 1);
});

check('cover fits without letterboxing across aspect, anchor and zoom extremes', () => {
  for (const aspect of [.56, .75, 1.5, 2]) for (const anchorX of [0, .5, 1]) for (const anchorY of [0, .5, 1]) for (const zoom of [1, 1.5, 2.5]) {
    const width = 600 * aspect, crop = coverCrop({ ...source, viewportWidth: width, anchorX, anchorY, zoom });
    assert.ok(crop.offsetX <= 1e-9 && crop.offsetY <= 1e-9);
    assert.ok(crop.offsetX + 1200 * crop.scale >= width - 1e-9);
    assert.ok(crop.offsetY + 800 * crop.scale >= 600 - 1e-9);
    const r = crop.visibleSource;
    assert.ok(r.x >= -1e-9 && r.y >= -1e-9 && r.x + r.width <= 1200 + 1e-9 && r.y + r.height <= 800 + 1e-9);
    assert.ok(crop.retainedFraction >= 0 && crop.retainedFraction <= 1);
    assert.ok(crop.retainedSourceFraction > 0 && crop.retainedSourceFraction <= 1 + 1e-9);
    const projectedArea = rectangleIntersection(crop.projectedProtected, { x: 0, y: 0, width, height: 600 }).area;
    near(projectedArea / (crop.projectedProtected.width * crop.projectedProtected.height), crop.retainedFraction, 1e-9);
  }
});

check('a narrow edge anchor can crop the protected region out completely', () => {
  const crop = coverCrop({ ...source, viewportWidth: 336, anchorX: 0, zoom: 2.5 });
  near(crop.retainedFraction, 0);
  assert.throws(() => coverCrop({ ...source, zoom: .9 }), RangeError);
  assert.throws(() => coverCrop({ ...source, anchorX: 1.1 }), RangeError);
  assert.throws(() => coverCrop({ ...source, protectedRect: { x: 1190, y: 0, width: 30, height: 20 } }), RangeError);
});

check('nonfinite and boolean inputs are not accepted as geometric parameters', () => {
  assert.throws(() => springState({ frequency: true }), RangeError);
  assert.throws(() => projectPoint({ worldX: NaN }), RangeError);
  assert.throws(() => coverCrop({ ...source, viewportHeight: Infinity }), RangeError);
  assert.throws(() => cubicBezier([[0, 0], [1, 1], [2, NaN], [3, 3]], .5), RangeError);
});

console.log(`\n${passed} motion/camera/crop checks passed. These verify the authored models, not artistic quality.`);
