/** One authored operation graph drives the film and its mathematical inspection.
 * Bounds assume real arithmetic; IEEE-754 rounding and raster/text layout are not proved.
 */
export const DEFAULT_INPUTS = Object.freeze({ time: 4.2, width: 960, height: 540, overshoot: 110, hold: 2.8 });
export const FILM_DURATION = 8;
export const INPUT_LIMITS = Object.freeze({ time: [0, 8], width: [320, 1600], height: [240, 1000], overshoot: [0, 240], hold: [1, 4] });

class Graph {
  constructor() { this.nodes = []; }
  node(op, args = [], extra = {}) { const id = this.nodes.length; this.nodes.push({ id, op, args, ...extra }); return id; }
  constant(value) { return this.node('constant', [], { value }); }
  input(name) { return this.node('input', [], { name }); }
  add(...args) { return this.node('sum', args); }
  mul(a, b) { return this.node('product', [a, b]); }
  scale(a, n) { return this.mul(a, this.constant(n)); }
  sub(a, b) { return this.add(a, this.scale(b, -1)); }
  min(a, b) { return this.node('min', [a, b]); }
  ease(a) { return this.node('ease', [a]); }
  step(a, softness) { return this.node('step', [a], { softness }); }
}

function buildFilmGraph() {
  const g = new Graph();
  const time = g.input('time'), width = g.input('width'), height = g.input('height');
  const overshoot = g.input('overshoot'), hold = g.input('hold');
  const c = n => g.constant(n);
  const one = c(1), safe = c(28);
  const cardWidth = g.min(g.sub(width, c(56)), c(620));
  const cardHeight = g.min(g.sub(height, c(96)), c(320));
  const entry = g.ease(g.scale(time, 1 / 1.2));
  const progress = g.ease(g.scale(g.sub(time, c(3)), 1 / .8));
  const pulse = g.scale(g.mul(progress, g.sub(one, progress)), 4);
  const x = g.add(g.scale(g.sub(width, cardWidth), .5), g.mul(overshoot, pulse));
  const y = g.add(g.scale(g.sub(height, cardHeight), .5), g.scale(g.sub(one, entry), 80));
  const cut = g.step(g.sub(time, c(3)), .09);
  const end = g.add(c(3), hold);
  const next = g.step(g.sub(time, end), .09);
  const introWeight = g.sub(one, cut), proofWeight = g.sub(cut, next), resultWeight = next;
  const proofX = g.add(x, c(24)), proofY = g.add(y, g.sub(cardHeight, c(76)));
  const proofWidth = g.sub(cardWidth, c(48)), proofHeight = c(44);
  const left = g.sub(proofX, safe);
  const right = g.sub(g.sub(width, safe), g.add(proofX, proofWidth));
  const top = g.sub(proofY, safe);
  const bottom = g.sub(g.sub(height, safe), g.add(proofY, proofHeight));
  const margin = g.min(g.min(left, right), g.min(top, bottom));
  // Geometric opportunity to see the authored settled proof, not comprehension.
  const settled = g.step(g.sub(time, c(3.8)), .06);
  const withinProof = g.sub(one, g.step(g.sub(time, end), .06));
  const exposure = g.mul(g.mul(settled, withinProof), g.mul(g.step(margin, 2), g.step(g.sub(entry, c(.98)), .01)));
  const outputs = { x, y, cardWidth, cardHeight, opacity: entry, pulse, introWeight, proofWeight, resultWeight, proofX, proofY, proofWidth, proofHeight, margin, exposure, end };
  return Object.freeze({ nodes: g.nodes, outputs });
}

export const FILM_GRAPH = buildFilmGraph();
const sigmoid = x => x >= 0 ? 1 / (1 + Math.exp(-x)) : Math.exp(x) / (1 + Math.exp(x));
const ease = x => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);
const easeD = x => x <= 0 || x >= 1 ? 0 : 6 * x * (1 - x);

function inputsWithDefaults(inputs = {}) {
  const result = { ...DEFAULT_INPUTS, ...inputs };
  for (const [name, [lo, hi]] of Object.entries(INPUT_LIMITS)) {
    if (typeof result[name] !== 'number' || !Number.isFinite(result[name]) || result[name] < lo || result[name] > hi) throw new RangeError(`${name} must be a finite number in [${lo}, ${hi}]`);
  }
  return result;
}

/** Forward differentiation with respect to one selected input. null means undefined. */
export function evaluateFilm(inputs = {}, { mode = 'exact', wrt = 'time' } = {}) {
  if (!['exact', 'smooth'].includes(mode)) throw new RangeError('mode must be exact or smooth');
  if (!(wrt in INPUT_LIMITS)) throw new RangeError('Unknown differentiation variable');
  const p = inputsWithDefaults(inputs), values = [], gradients = [], depends = [], kinks = [];
  for (const n of FILM_GRAPH.nodes) {
    const a = n.args.map(i => values[i]), d = n.args.map(i => gradients[i]);
    const dependency = n.op === 'input' ? n.name === wrt : n.args.some(i => depends[i]);
    let v, derivative;
    if (n.op === 'constant') { v = n.value; derivative = 0; }
    if (n.op === 'input') { v = p[n.name]; derivative = dependency ? 1 : 0; }
    if (n.op === 'sum') { v = a.reduce((s, x) => s + x, 0); derivative = d.includes(null) ? null : d.reduce((s, x) => s + x, 0); }
    if (n.op === 'product') { v = a[0] * a[1]; derivative = d.includes(null) ? null : d[0] * a[1] + a[0] * d[1]; }
    if (n.op === 'min') {
      v = Math.min(...a);
      derivative = a[0] === a[1] && d[0] !== d[1] ? null : d[a[0] <= a[1] ? 0 : 1];
    }
    if (n.op === 'ease') { v = ease(a[0]); derivative = d[0] === null ? null : easeD(a[0]) * d[0]; }
    if (n.op === 'step') {
      if (mode === 'smooth') { v = sigmoid(a[0] / n.softness); derivative = d[0] === null ? null : v * (1 - v) * d[0] / n.softness; }
      else { v = a[0] >= 0 ? 1 : 0; derivative = a[0] === 0 && dependency ? null : 0; }
    }
    if (derivative === null) kinks.push(n.id);
    values[n.id] = v; gradients[n.id] = derivative; depends[n.id] = dependency;
  }
  return {
    inputs: p, mode, wrt,
    state: Object.fromEntries(Object.entries(FILM_GRAPH.outputs).map(([key, id]) => [key, values[id]])),
    derivative: Object.fromEntries(Object.entries(FILM_GRAPH.outputs).map(([key, id]) => [key, gradients[id]])),
    undefinedOutputs: Object.entries(FILM_GRAPH.outputs).filter(([, id]) => gradients[id] === null).map(([key]) => key),
    operationCount: FILM_GRAPH.nodes.length,
  };
}

export function boundFilm(box = {}, { mode = 'exact' } = {}) {
  if (!['exact', 'smooth'].includes(mode)) throw new RangeError('mode must be exact or smooth');
  const p = {};
  for (const [name, limits] of Object.entries(INPUT_LIMITS)) {
    const value = box[name] ?? DEFAULT_INPUTS[name];
    const interval = Array.isArray(value) ? value : [value, value];
    if (interval.length !== 2 || interval.some(x => typeof x !== 'number' || !Number.isFinite(x)) || interval[0] > interval[1] || interval[0] < limits[0] || interval[1] > limits[1]) throw new RangeError(`Invalid interval for ${name}`);
    p[name] = interval;
  }
  const values = [];
  for (const n of FILM_GRAPH.nodes) {
    const a = n.args.map(i => values[i]);
    let v;
    if (n.op === 'constant') v = [n.value, n.value];
    if (n.op === 'input') v = p[n.name];
    if (n.op === 'sum') v = [a.reduce((s, x) => s + x[0], 0), a.reduce((s, x) => s + x[1], 0)];
    if (n.op === 'product') { const products = [a[0][0] * a[1][0], a[0][0] * a[1][1], a[0][1] * a[1][0], a[0][1] * a[1][1]]; v = [Math.min(...products), Math.max(...products)]; }
    if (n.op === 'min') v = [Math.min(a[0][0], a[1][0]), Math.min(a[0][1], a[1][1])];
    if (n.op === 'ease') v = [ease(a[0][0]), ease(a[0][1])];
    if (n.op === 'step') v = mode === 'smooth' ? a[0].map(x => sigmoid(x / n.softness)) : [a[0][0] >= 0 ? 1 : 0, a[0][1] >= 0 ? 1 : 0];
    values[n.id] = v;
  }
  return Object.fromEntries(Object.entries(FILM_GRAPH.outputs).map(([key, id]) => [key, values[id]]));
}

/** Width subdivision reduces dependency overestimation; a negative sample is a witness. */
export function certifySafeFrame(inputs = {}, widthRange = [360, 1280], { subdivisions = 64 } = {}) {
  const p = inputsWithDefaults(inputs);
  if (!Number.isInteger(subdivisions) || subdivisions < 1 || subdivisions > 512) throw new RangeError('subdivisions must be 1–512');
  boundFilm({ ...p, width: widthRange });
  let lower = Infinity, upper = Infinity, witness = null;
  for (let i = 0; i < subdivisions; i++) {
    const a = widthRange[0] + (widthRange[1] - widthRange[0]) * i / subdivisions;
    const b = widthRange[0] + (widthRange[1] - widthRange[0]) * (i + 1) / subdivisions;
    const margin = boundFilm({ ...p, width: [a, b] }).margin;
    lower = Math.min(lower, margin[0]); upper = Math.min(upper, margin[1]);
    for (const width of [a, (a + b) / 2, b]) {
      const value = evaluateFilm({ ...p, width }).state.margin;
      if (value < 0 && (!witness || value < witness.margin)) witness = { width, margin: value };
    }
  }
  return { status: witness ? 'violated' : lower >= 0 ? 'bounded-safe' : 'unresolved', lower, upper, witness, widthRange, subdivisions };
}

/** Lower/upper integral of the exact geometric exposure indicator, in seconds. */
export function integrateProofExposure(inputs = {}, { tolerance = .01, maxCells = 1024 } = {}) {
  const p = inputsWithDefaults(inputs);
  if (!Number.isFinite(tolerance) || tolerance <= 0 || !Number.isInteger(maxCells) || maxCells < 1 || maxCells > 8192) throw new RangeError('Invalid integration budget');
  const cell = (a, b) => {
    const interval = boundFilm({ ...p, time: [a, b] }).exposure;
    // Exact indicator products are mathematically in [0,1].
    return { a, b, lo: Math.max(0, interval[0]) * (b - a), hi: Math.min(1, interval[1]) * (b - a) };
  };
  let cells = [cell(0, FILM_DURATION)];
  let lower = cells[0].lo, upper = cells[0].hi;
  while (upper - lower > tolerance && cells.length < maxCells) {
    let index = 0;
    for (let i = 1; i < cells.length; i++) if (cells[i].hi - cells[i].lo > cells[index].hi - cells[index].lo) index = i;
    const old = cells[index], mid = (old.a + old.b) / 2;
    const left = cell(old.a, mid), right = cell(mid, old.b);
    lower += left.lo + right.lo - old.lo; upper += left.hi + right.hi - old.hi;
    cells[index] = left; cells.push(right);
  }
  return { lower, upper, uncertainty: upper - lower, cells: cells.length, converged: upper - lower <= tolerance, mode: 'exact', quantity: 'geometric proof exposure seconds' };
}

export function sampleFilm(inputs = {}, field = 'x', { mode = 'exact', count = 161 } = {}) {
  if (!(field in FILM_GRAPH.outputs) || !Number.isInteger(count) || count < 2 || count > 1001) throw new RangeError('Invalid field or sample count');
  return Array.from({ length: count }, (_, i) => { const time = FILM_DURATION * i / (count - 1); const result = evaluateFilm({ ...inputs, time }, { mode }); return { time, value: result.state[field], derivative: result.derivative[field] }; });
}
