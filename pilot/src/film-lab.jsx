import React, { useMemo, useState } from 'react';
import { DEFAULT_INPUTS, FILM_DURATION, FILM_GRAPH, evaluateFilm, certifySafeFrame, integrateProofExposure, sampleFilm } from './film-math.js';
import { cn } from './utils.js';
import './film-lab.css';

const fmt = (n, places = 1) => n === null ? 'undefined' : Number(n).toFixed(places);
const boundText = (value, side, places = 3) => {
  const scale = 10 ** places;
  return fmt((side === 'lower' ? Math.floor(value * scale) : Math.ceil(value * scale)) / scale, places);
};
const ink = '#25241f', muted = '#85837b', paper = '#faf9f5', red = '#f60f30';

function FilmScene({ result, compact = false }) {
  const s = result.state, p = result.inputs;
  const titleSize = Math.min(28, (s.cardWidth - 48) / 12);
  return <svg className="film-lab-scene" viewBox={`0 0 ${p.width} ${p.height}`} role="img" aria-label={`Authored film at ${p.time.toFixed(2)} seconds. Protected proof margin ${s.margin.toFixed(1)} pixels.`}>
    <rect width={p.width} height={p.height} fill="#eeede7" />
    {!compact && <rect x="28" y="28" width={p.width - 56} height={p.height - 56} fill="none" stroke={red} strokeOpacity=".28" strokeDasharray="5 5" />}
    <g opacity={s.opacity}>
      <rect x={s.x + 4} y={s.y + 7} width={s.cardWidth} height={s.cardHeight} rx="8" fill={ink} opacity=".06" />
      <rect x={s.x} y={s.y} width={s.cardWidth} height={s.cardHeight} rx="8" fill={paper} stroke="#d5d3ca" />
      <line x1={s.x} x2={s.x + s.cardWidth} y1={s.y + 44} y2={s.y + 44} stroke="#e3e1d8" />
      <circle cx={s.x + 24} cy={s.y + 22} r="4" fill={red} />
      <text x={s.x + 38} y={s.y + 27} fontSize="12" fill={ink}>ATLAS / WORKSPACE</text>
      <g opacity={s.introWeight}>
        <text x={s.x + 24} y={s.y + 88} fontSize={titleSize} fill={ink} fontFamily="Georgia, serif">Work needs an owner.</text>
        <text x={s.x + 24} y={s.y + 113} fontSize="12" fill={muted}>A small decision, waiting to happen.</text>
      </g>
      <g opacity={s.proofWeight}>
        <text x={s.x + 24} y={s.y + 88} fontSize={titleSize} fill={ink} fontFamily="Georgia, serif">Make the change visible.</text>
        <text x={s.x + 24} y={s.y + 113} fontSize="12" fill={muted}>One assignment updates the shared queue.</text>
      </g>
      <g opacity={s.resultWeight}>
        <text x={s.x + 24} y={s.y + 88} fontSize={titleSize} fill={ink} fontFamily="Georgia, serif">The next step is clear.</text>
        <text x={s.x + 24} y={s.y + 113} fontSize="12" fill={muted}>Action. Consequence. A moment to read.</text>
      </g>
      {[0, 1].map(i => <g key={i}>
        <rect x={s.x + 24} y={s.y + 140 + i * 36} width="12" height="12" rx="3" fill="none" stroke="#aaa79d" />
        <text x={s.x + 46} y={s.y + 150 + i * 36} fontSize="12" fill={muted}>{i === 0 ? 'Review the launch edit' : 'Prepare the release'}</text>
      </g>)}
      <rect x={s.proofX} y={s.proofY} width={s.proofWidth} height={s.proofHeight} rx="4" fill="#f5f1ed" stroke={red} strokeWidth="1.2" />
      <g opacity={s.introWeight}><text x={s.proofX + 13} y={s.proofY + 27} fontSize="13" fill={ink}>Owner —  ·  Queue 8</text></g>
      <g opacity={s.proofWeight}><text x={s.proofX + 13} y={s.proofY + 27} fontSize="13" fill={ink}>Owner Ava  ·  Queue 7</text></g>
      <g opacity={s.resultWeight}><text x={s.proofX + 13} y={s.proofY + 27} fontSize="13" fill={ink}>Assigned. Shared. Moving.</text></g>
    </g>
    {!compact && <><text x="28" y={p.height - 11} fontSize="10" fill={muted}>SYNTHETIC PRODUCT · PROTECTED BOX IN RED</text><text x={p.width - 28} y={p.height - 11} textAnchor="end" fontSize="10" fill={muted}>{p.width} × {p.height}</text></>}
  </svg>;
}

function Curve({ samples, time, field, mode }) {
  const W = 680, H = 154, pad = 24;
  const min = Math.min(0, ...samples.map(s => s.value)), max = Math.max(1, ...samples.map(s => s.value));
  const x = t => pad + t / FILM_DURATION * (W - 2 * pad);
  const y = v => H - pad - (v - min) / (max - min || 1) * (H - 2 * pad);
  // Separate at exact editorial cuts: no diagonal interpolation across a jump.
  const lines = [];
  let path = '';
  samples.forEach((s, i) => {
    const jumped = mode === 'exact' && field === 'proofWeight' && i > 0 && Math.abs(s.value - samples[i - 1].value) > .5;
    if (jumped && path) { lines.push(path); path = ''; }
    path += `${path ? ' L' : 'M'}${x(s.time).toFixed(2)},${y(s.value).toFixed(2)}`;
  });
  if (path) lines.push(path);
  return <svg className="film-lab-curve" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${field === 'x' ? 'Panel horizontal position' : 'Proof-shot visibility'} over eight seconds in ${mode} mode`}>
    {[0, 2, 4, 6, 8].map(t => <g key={t}><line x1={x(t)} x2={x(t)} y1="10" y2={H - pad} stroke="#e5e3da" /><text x={x(t)} y={H - 7} textAnchor="middle" fontSize="10" fill={muted}>{t}s</text></g>)}
    {lines.map((d, i) => <path key={i} d={d} fill="none" stroke={ink} strokeWidth="2" />)}
    <line x1={x(time)} x2={x(time)} y1="8" y2={H - pad} stroke={red} strokeWidth="1" />
    <text x={pad + 5} y="18" fontSize="10" fill={muted}>{field === 'x' ? 'x(t) / px' : 'proof(t) / opacity'}</text>
  </svg>;
}

function RangeControl({ label, value, onChange, min, max, step, suffix = '' }) {
  return <label className="film-lab-control"><span>{label}<output>{fmt(value, step < 1 ? 2 : 0)}{suffix}</output></span><input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} /></label>;
}

export function FilmLab({ className = '' }) {
  const [time, setTime] = useState(DEFAULT_INPUTS.time);
  const [width, setWidth] = useState(DEFAULT_INPUTS.width);
  const [overshoot, setOvershoot] = useState(DEFAULT_INPUTS.overshoot);
  const [hold, setHold] = useState(DEFAULT_INPUTS.hold);
  const [mode, setMode] = useState('exact');
  const [field, setField] = useState('x');
  const inputs = useMemo(() => ({ ...DEFAULT_INPUTS, time, width, overshoot, hold }), [time, width, overshoot, hold]);
  const result = useMemo(() => evaluateFilm(inputs, { mode }), [inputs, mode]);
  const widthDerivative = useMemo(() => evaluateFilm(inputs, { mode, wrt: 'width' }).derivative.x, [inputs, mode]);
  const bounds = useMemo(() => certifySafeFrame(inputs), [inputs]);
  const exposure = useMemo(() => integrateProofExposure({ ...DEFAULT_INPUTS, width, overshoot, hold }), [width, overshoot, hold]);
  const samples = useMemo(() => sampleFilm({ ...DEFAULT_INPUTS, width, overshoot, hold }, field, { mode }), [width, overshoot, hold, field, mode]);
  const cutDerivative = result.derivative.proofWeight;
  const boundLabel = bounds.status === 'bounded-safe' ? 'The protected result box stays inside across the full width range' : bounds.status === 'violated' ? 'A viewport width puts the protected result box outside its margin' : 'The result-box bounds need a finer subdivision';
  return <section className={cn('film-lab', className)} aria-label="Interactive calculus of a film">
    <div className="film-lab-heading"><div><span className="film-lab-eyebrow">A FILM AS A FUNCTION</span><h3>Every frame, the same equation.</h3></div><code>F(t, w, o, τ)</code></div>
    <p className="film-lab-intro">Move through the edit. Change its viewport, motion or hold. The picture, derivative and bounds are evaluations of one authored graph.</p>
    <div className="film-lab-workbench">
      <div className="film-lab-picture">
        <div className="film-lab-picture-meta"><span>{mode === 'exact' ? 'Exact edit' : 'Smoothed cuts'}</span><span>{fmt(time, 2)} / 8.00 s</span></div>
        <FilmScene result={result} />
        <RangeControl label="Playhead" value={time} onChange={setTime} min={0} max={8} step={.01} suffix=" s" />
        <div className="film-lab-beats"><button type="button" onClick={() => setTime(1.8)}>01 · Friction</button><button type="button" onClick={() => setTime(3)}>02 · Exact cut</button><button type="button" onClick={() => setTime(3.2)}>03 · Moving proof</button><button type="button" onClick={() => setTime(4.2)}>04 · Settled result</button></div>
      </div>
      <div className="film-lab-settings">
        <fieldset className="film-lab-modes"><legend>Evaluate the same graph</legend>{['exact', 'smooth'].map(v => <label key={v}><input type="radio" name="film-lab-evaluation" value={v} checked={mode === v} onChange={() => setMode(v)} />{v === 'exact' ? 'Exact cuts' : 'Smooth steps'}</label>)}</fieldset>
        <RangeControl label="Viewport width" value={width} onChange={setWidth} min={360} max={1280} step={1} suffix=" px" />
        <RangeControl label="Motion excursion" value={overshoot} onChange={setOvershoot} min={0} max={220} step={1} suffix=" px" />
        <RangeControl label="Proof-shot duration" value={hold} onChange={setHold} min={1} max={4} step={.1} suffix=" s" />
        <p className="film-lab-note">Smooth mode replaces cut steps with sigmoids over 0.09 s. It changes the edit; it does not make the exact cut differentiable.</p>
      </div>
    </div>
    <div className="film-lab-calculations">
      <article><span className="film-lab-eyebrow">01 / DIFFERENTIATE</span><h4>What is its horizontal velocity?</h4><div className="film-lab-number">{fmt(result.derivative.x)} <small>px / s</small></div><dl><div><dt>∂x / ∂viewport</dt><dd>{fmt(widthDerivative, 3)} px / px</dd></div><div><dt>∂proof / ∂t</dt><dd>{cutDerivative === null ? 'undefined at the cut' : `${fmt(cutDerivative, 3)} / s`}</dd></div></dl><p>Forward-mode differentiation through the actual operations, with discontinuities left visible.</p></article>
      <article><span className="film-lab-eyebrow">02 / BOUND</span><h4>Does the proof survive resizing?</h4><div className={cn('film-lab-bound', bounds.status === 'violated' && 'is-violated')}>{bounds.status === 'bounded-safe' ? 'Bounded safe' : bounds.status === 'violated' ? 'Violation found' : 'Unresolved'}</div><p>{boundLabel}. Width 360–1280 px, height 540 px, at {fmt(time, 2)} s.</p><div className="film-lab-detail">Minimum-margin enclosure: [{boundText(bounds.lower, 'lower', 1)}, {boundText(bounds.upper, 'upper', 1)}] px{bounds.witness && <><br />Witness: {fmt(bounds.witness.width, 0)} px width → {fmt(bounds.witness.margin)} px margin</>}</div></article>
      <article><span className="film-lab-eyebrow">03 / INTEGRATE</span><h4>How long can the proof be seen?</h4><div className="film-lab-number">{boundText(exposure.lower, 'lower')}–{boundText(exposure.upper, 'upper')} <small>s</small></div><p>Settled proof, opaque and inside the protected margin at the selected viewport. Exposure bounds over the exact eight-second edit.</p><div className="film-lab-detail">{exposure.cells} time intervals · uncertainty ≤ {boundText(exposure.uncertainty, 'upper')} s</div></article>
    </div>
    <div className="film-lab-chart-head"><h4>The function over time</h4><label>Plot <select value={field} onChange={e => setField(e.target.value)}><option value="x">Panel position</option><option value="proofWeight">Proof-shot visibility</option></select></label></div>
    <Curve samples={samples} time={time} field={field} mode={mode} />
    <details className="film-lab-method"><summary>The equation and its limits</summary><div><code>p = clamp((t − 3) / 0.8, 0, 1)<br />q = 3p² − 2p³<br />x = (w − min(w − 56, 620)) / 2 + o · 4q(1 − q)<br />proof(t) = H(t − 3) − H(t − 3 − τ)<br />E = ∫₀⁸ 1[settled ∧ proof active ∧ margin ≥ 0 ∧ opaque] dt</code><p>The inputs are time t, viewport width w, excursion o and proof-shot duration τ. H is a right-continuous step. {FILM_GRAPH.nodes.length} hand-authored operations drive the picture and calculations. Steps choose shots; sums, products, minimums and cubic easing place the card. This is not a compiler for arbitrary films.</p><p>Safety uses interval arithmetic across 64 width intervals at the current time, under real-arithmetic assumptions. Floating-point rounding, text shaping, occlusion and actual viewing comprehension are outside this geometric bound. Exposure is an opportunity to see the authored proof, not measured attention. This product and its states are illustrative.</p></div></details>
  </section>;
}

export function FilmSpecimen({ className = '' }) {
  return <div className={cn('film-lab-specimen', className)}><FilmScene compact result={evaluateFilm({ ...DEFAULT_INPUTS, width: 960, time: 3.45, overshoot: 70 })} /><div className="film-lab-specimen-equation">F(t, viewport, motion) → frame</div></div>;
}

export default FilmLab;
