import React, { useId, useMemo, useState } from 'react';
import { StudyLayout, Range, Plot, Playback } from './film-study-ui.jsx';
import { springState, cubicBezier, timedBezier, cameraMotion, projectMovingPoint, coverCrop } from './film-motion-math.js';

const RED = 'var(--library-brand-red,#f60f30)', INK = 'var(--library-ink,#25241f)', MUTED = '#8a887e', RULE = '#d9d7cf', PAPER = '#f1f0e9';
const format = (value, places = 2) => Number(value).toFixed(places);
const svgStyle = { width: '100%', height: 'auto', display: 'block', background: PAPER, fontFamily: 'var(--library-font-body,Arial,sans-serif)' };
const chart = (n, fn, min = 0, max = 1) => Array.from({ length: n }, (_, i) => { const x = min + (max - min) * i / (n - 1); return [x, fn(x)]; });

function SpringStudy() {
  const [time, setTime] = useState(.65), [damping, setDamping] = useState(.25), [frequency, setFrequency] = useState(1.15);
  const state = springState({ time, damping, frequency });
  const massX = 370 + state.position * 130;
  const springEnd = massX - 34;
  const coil = Array.from({ length: 19 }, (_, i) => `${92 + (springEnd - 92) * i / 18},${i === 0 || i === 18 ? 175 : 175 + (i % 2 ? -13 : 13)}`).join(' ');
  const points = useMemo(() => chart(181, t => springState({ time: t, damping, frequency }).position, 0, 4), [damping, frequency]);
  const reset = () => { setTime(.65); setDamping(.25); setFrequency(1.15); };
  const springPreset = value => { setDamping(value); setFrequency(1.15); setTime(0); };
  const side = state.position >= 0 ? 'right' : 'left';
  const direction = state.position * state.velocity < 0 ? 'toward' : 'away from';
  const regime = damping < 1 ? 'Underdamped' : damping === 1 ? 'Critically damped' : 'Overdamped';
  const regimeMeaning = damping < 1 ? 'The mass can cross its target and swing back.' : damping === 1 ? 'The mass returns without oscillation at the boundary between the two damping regimes.' : 'The mass returns without oscillation, with a slower tail than critical damping at the same natural frequency.';
  const positionEquation = damping < 1
    ? { label: 'Underdamped position', tex: String.raw`\begin{aligned}x(t)&=e^{-\zeta\omega_0t}\left[\cos(\omega_dt)+\frac{\zeta\omega_0}{\omega_d}\sin(\omega_dt)\right]\\\omega_d&=\omega_0\sqrt{1-\zeta^2}\end{aligned}`, explanation: 'For 0 ≤ ζ < 1, a decaying oscillation crosses the target. At ζ = 0, no energy is dissipated.' }
    : damping === 1
      ? { label: 'Critical position', tex: String.raw`x(t)=(1+\omega_0t)e^{-\omega_0t}`, explanation: 'At ζ = 1, the two characteristic roots coincide. With the stated initial conditions, the mass returns without crossing its target.' }
      : { label: 'Overdamped position', tex: String.raw`\begin{aligned}x(t)&=\frac{-r_2e^{r_1t}+r_1e^{r_2t}}{r_1-r_2}\\r_{1,2}&=-\omega_0\left(\zeta\mp\sqrt{\zeta^2-1}\right)\end{aligned}`, explanation: 'For ζ > 1, two real exponential modes replace the oscillation. Both rates are negative; the slower mode determines the tail.' };
  return <StudyLayout title="A spring earns its settle" description="Compare a bouncing arrival with critical and overdamped returns. Keep the natural frequency fixed to see how damping changes the crossing and the tail."
    presets={[
      { label: 'Underdamped', description: 'A return swing at ζ = 0.12', active: damping === .12 && frequency === 1.15, onSelect: () => springPreset(.12) },
      { label: 'Critical', description: 'No oscillation at ζ = 1', active: damping === 1 && frequency === 1.15, onSelect: () => springPreset(1) },
      { label: 'Overdamped', description: 'A slower non-oscillating tail at ζ = 1.6', active: damping === 1.6 && frequency === 1.15, onSelect: () => springPreset(1.6) },
    ]} onReset={reset}
    insight={{ label: `${regime} return`, text: `${regimeMeaning} ${time === 0 ? 'The mass starts one unit from its target with zero velocity. Play the arrival to inspect its full return.' : `At ${format(time)} s it is ${format(Math.abs(state.position), 3)} units ${side} of target, moving ${direction} it at ${format(Math.abs(state.velocity), 2)} units/s.`}`, tone: 'neutral' }}
    variables={[{ symbol: 't', meaning: 'Time', value: `${format(time)} s` }, { symbol: 'ζ', meaning: 'Damping ratio', value: format(damping) }, { symbol: 'f₀', meaning: 'Natural frequency', value: `${format(frequency)} Hz` }, { symbol: 'x₀, v₀', meaning: 'Initial position and velocity', value: '1 unit, 0 units/s' }]}
    visual={<>
    <svg viewBox="0 0 680 310" style={svgStyle} role="img" aria-label={`${regime} spring mass displacement ${format(state.position)} units at ${format(time)} seconds`}>
      <text x="26" y="32" fill={MUTED} fontSize="16">DISPLACEMENT → SETTLE</text>
      <line x1="370" x2="370" y1="65" y2="260" stroke={MUTED} strokeDasharray="4 5" />
      <text x="370" y="282" textAnchor="middle" fill={MUTED} fontSize="18">target · x = 0</text>
      <line x1="60" x2="620" y1="212" y2="212" stroke={RULE} />
      <rect x="72" y="122" width="20" height="91" fill={INK} />
      {[0, 1, 2, 3, 4].map(i => <line key={i} x1="59" x2="72" y1={135 + 16 * i} y2={123 + 16 * i} stroke={INK} />)}
      <polyline points={coil} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <g transform={`translate(${massX},0)`}><rect x="-34" y="140" width="68" height="68" rx="7" fill={RED} /><text x="0" y="180" textAnchor="middle" fill="white" fontSize="20">m = 1</text></g>
      <line x1="370" x2={massX} y1="94" y2="94" stroke={RED} strokeWidth="1.5" />
      <circle cx={massX} cy="94" r="3" fill={RED} />
      <text x={(370 + massX) / 2} y="80" textAnchor="middle" fill={RED} fontSize="20">x = {format(state.position)}</text>
      <text x="26" y="303" fill={MUTED} fontSize="13">1 displacement unit = 130 graphic px</text>
    </svg>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginTop: 14 }}><Playback value={time} onChange={setTime} min={0} max={4} duration={4} label="Spring" /><div style={{ flex: '1 1 180px', minWidth: 0 }}><Range label="Time" value={time} min={0} max={4} step={.01} onChange={setTime} unit="s" /></div></div>
    <Plot series={[{ name: 'Displacement', points, color: '#f60f30' }]} xLabel="time / s" yLabel="displacement / units" xRange={[0, 4]} yRange={[-1.1, 1.1]} cursorX={time} />
  </>} controls={<>
    <Range label="Damping ratio ζ" value={damping} min={0} max={2} step={.01} onChange={setDamping} />
    <Range label="Natural frequency f₀" value={frequency} min={.5} max={2.5} step={.05} onChange={setFrequency} unit="Hz" />
  </>} equations={[
    { label: 'One equation, three damping regimes', tex: String.raw`x''+2\zeta\omega_0x'+\omega_0^2x=0`, explanation: 'The unit mass starts at x(0) = 1 with v(0) = 0. Natural angular frequency is ω₀ = 2πf₀. The target is x = 0.' },
    positionEquation,
    { label: 'Velocity and acceleration', tex: String.raw`v(t)=\frac{dx}{dt},\qquad a(t)=-2\zeta\omega_0v(t)-\omega_0^2x(t)`, explanation: 'Velocity is the analytic derivative of the selected position function. Acceleration follows the same spring equation, including at critical damping.' },
  ]} metrics={[
    { label: 'Position', value: `${format(state.position, 3)} units` },
    { label: 'Velocity', value: `${format(state.velocity, 3)} units/s` },
    { label: 'Acceleration', value: `${format(state.acceleration, 3)} units/s²` },
  ]} note="A linear spring with fixed initial conditions. Seeking any time evaluates the same closed-form state. A target crossing alone does not mean the element has settled." />;
}

function BezierStudy() {
  const [time, setTime] = useState(1.68), [duration, setDuration] = useState(4), [easing, setEasing] = useState('linear');
  const [p1x, setP1x] = useState(170), [p1y, setP1y] = useState(65), [p2x, setP2x] = useState(480), [p2y, setP2y] = useState(280);
  const points = [[70, 245], [p1x, p1y], [p2x, p2y], [610, 80]];
  const value = timedBezier(points, { time, duration, easing }), [x, y] = value.position;
  const tangent = cubicBezier(points, value.parameter), tangentLength = tangent.speed > 0 ? 64 / tangent.speed : 0;
  const marker = `bezier-${useId().replace(/:/g, '')}`;
  const path = `M70,245 C${p1x},${p1y} ${p2x},${p2y} 610,80`;
  const defaultShape = p1x === 170 && p1y === 65 && p2x === 480 && p2y === 280;
  const chooseTiming = mode => { setP1x(170); setP1y(65); setP2x(480); setP2y(280); setDuration(4); setEasing(mode); setTime(0); };
  const reset = () => { chooseTiming('linear'); setTime(1.68); };
  const clockEquation = {
    linear: { tex: String.raw`E(s)=s`, explanation: 'Linear progress enters and leaves with nonzero velocity for this path. Holding still outside the interval creates a velocity jump.' },
    smoothstep: { tex: String.raw`E(s)=3s^2-2s^3`, explanation: 'Cubic easing reaches zero endpoint velocity. Its endpoint acceleration is nonzero, so a stationary hold still creates an acceleration jump.' },
    smootherstep: { tex: String.raw`E(s)=6s^5-15s^4+10s^3`, explanation: 'Quintic easing has zero velocity and acceleration at both endpoints, so it can join a stationary hold without either jump.' },
  }[easing];
  const speedPoints = useMemo(() => chart(121, t => timedBezier([[70, 245], [p1x, p1y], [p2x, p2y], [610, 80]], { time: t, duration, easing }).speed, 0, duration), [p1x, p1y, p2x, p2y, duration, easing]);
  const accelerationMagnitude = Math.hypot(...value.acceleration);
  return <StudyLayout title="A path gets its timing from a clock" description="Keep the curve fixed and compare three timing functions. Easing changes where the point is, how fast it travels, and how it joins a still frame."
    presets={[
      { label: 'Linear', description: 'Uniform parameter progress; nonzero endpoint speed', active: defaultShape && duration === 4 && easing === 'linear', onSelect: () => chooseTiming('linear') },
      { label: 'Cubic ease', description: 'Zero endpoint velocity; nonzero endpoint acceleration', active: defaultShape && duration === 4 && easing === 'smoothstep', onSelect: () => chooseTiming('smoothstep') },
      { label: 'Quintic ease', description: 'Zero endpoint velocity and acceleration', active: defaultShape && duration === 4 && easing === 'smootherstep', onSelect: () => chooseTiming('smootherstep') },
    ]} onReset={reset}
    insight={{ label: 'Same path, different clock', text: `At ${format(time)} s, clock progress is ${format(time / duration, 3)} and curve parameter u is ${format(value.parameter, 3)}. Speed is ${format(value.speed, 1)} graphic px/s; acceleration magnitude is ${format(accelerationMagnitude, 1)} px/s². ${clockEquation.explanation}`, tone: 'neutral' }}
    variables={[{ symbol: 't', meaning: 'Elapsed time', value: `${format(time)} s` }, { symbol: 'T', meaning: 'Journey duration', value: `${format(duration)} s` }, { symbol: 's', meaning: 'Normalized clock t/T', value: format(time / duration, 3) }, { symbol: 'u', meaning: 'Curve parameter E(s)', value: format(value.parameter, 3) }]}
    visual={<>
    <svg viewBox="0 0 680 340" style={svgStyle} role="img" aria-label="Cubic Bézier curve with equal time samples, moving point and geometric path tangent">
      <defs><marker id={marker} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill={INK} /></marker></defs>
      <text x="25" y="27" fontSize="16" fill={MUTED}>PATH / CLOCK / TANGENT</text>
      <polyline points={points.map(p => p.join(',')).join(' ')} fill="none" stroke={MUTED} strokeDasharray="4 5" />
      <path d={path} fill="none" stroke={RED} strokeWidth="3" />
      {Array.from({ length: 21 }, (_, i) => timedBezier(points, { time: i / 20 * duration, duration, easing }).position).map(([px, py], i) => <circle key={i} cx={px} cy={py} r="2.5" fill={RED} />)}
      {points.map(([px, py], i) => <g key={i}><circle cx={px} cy={py} r="6" fill={i === 0 || i === 3 ? INK : PAPER} stroke={INK} /><text x={px + 10} y={py - 10} fill={INK} fontSize="18">P{i}</text></g>)}
      <g transform={`translate(${x},${y})`}><line x1={-tangent.velocity[0] * tangentLength * .6} y1={-tangent.velocity[1] * tangentLength * .6} x2={tangent.velocity[0] * tangentLength} y2={tangent.velocity[1] * tangentLength} stroke={INK} strokeWidth="1.5" markerEnd={`url(#${marker})`} /><circle r="9" fill={RED} stroke={PAPER} strokeWidth="3" /></g>
      <text x="25" y="324" fill={MUTED} fontSize="14">Equal {format(duration / 20, 2)} s steps · Arrow shows path tangent</text>
    </svg>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginTop: 14 }}><Playback key={`${duration}-${easing}`} value={time} onChange={setTime} min={0} max={duration} duration={duration} label="Path" /><div style={{ flex: '1 1 180px', minWidth: 0 }}><Range label="Elapsed time" value={time} min={0} max={duration} step={.01} onChange={setTime} unit="s" /></div></div>
    <Plot series={[{ name: 'Speed', points: speedPoints, color: '#f60f30' }]} xLabel="elapsed time / s" yLabel="speed / graphic px/s" xRange={[0, duration]} cursorX={time} />
  </>} controls={<>
    <label>Easing function<select aria-label="Easing function" value={easing} onChange={event => setEasing(event.target.value)}><option value="linear">Linear</option><option value="smoothstep">Cubic ease</option><option value="smootherstep">Quintic ease</option></select></label>
    <Range label="Journey duration" value={duration} min={1} max={8} step={.5} onChange={next => { setTime(time / duration * next); setDuration(next); }} unit="s" />
    <Range label="P₁ horizontal" value={p1x} min={90} max={580} step={1} onChange={setP1x} unit="px" />
    <Range label="P₁ vertical" value={p1y} min={55} max={290} step={1} onChange={setP1y} unit="px" />
    <Range label="P₂ horizontal" value={p2x} min={90} max={580} step={1} onChange={setP2x} unit="px" />
    <Range label="P₂ vertical" value={p2y} min={55} max={290} step={1} onChange={setP2y} unit="px" />
  </>} equations={[
    { label: 'Compose the path with its clock', tex: String.raw`X(t)=B\!\left(E\!\left(\frac{t}{T}\right)\right)`, explanation: 'B(u) = (1−u)³P₀ + 3(1−u)²uP₁ + 3(1−u)u²P₂ + u³P₃. The four visible control points define the path; E sets its timing.' },
    { label: 'Selected easing, s = t/T', ...clockEquation },
    { label: 'Velocity and acceleration in seconds', tex: String.raw`\begin{aligned}v(t)&=\frac{B'(u)E'(s)}{T}\\a(t)&=\frac{B''(u)[E'(s)]^2+B'(u)E''(s)}{T^2}\end{aligned}`, explanation: 'The chain rule includes acceleration from both the curve and the clock. At equal clock progress, doubling duration halves velocity and quarters acceleration.' },
  ]} metrics={[
    { label: 'Position', value: `(${format(x, 1)}, ${format(y, 1)}) px` },
    { label: 'Speed', value: `${format(value.speed, 1)} px/s`, note: `Velocity (${format(value.velocity[0], 1)}, ${format(value.velocity[1], 1)}) px/s` },
    { label: 'Acceleration', value: `${format(accelerationMagnitude, 1)} px/s²`, note: `Vector (${format(value.acceleration[0], 1)}, ${format(value.acceleration[1], 1)}) px/s²` },
  ]} note="Equal clock steps need not travel equal distances. These easing functions are not arc-length parameterization. Endpoint derivatives are evaluated from inside the journey; no motion outside it is simulated." />;
}

function ParallaxStudy() {
  const [time, setTime] = useState(1.6), [duration, setDuration] = useState(4), [easing, setEasing] = useState('smoothstep');
  const [cameraStart, setCameraStart] = useState(-1), [cameraEnd, setCameraEnd] = useState(1), [focalLength, setFocal] = useState(210), [nearDepth, setDepth] = useState(1.6);
  const clip = `parallax-${useId().replace(/:/g, '')}`;
  const camera = cameraMotion({ time, duration, start: cameraStart, end: cameraEnd, easing });
  const signed = value => `${value >= .005 ? '+' : ''}${format(Math.abs(value) < .005 ? 0 : value, 2)}`;
  const layers = [{ name: 'Near', depth: nearDepth, color: '#f60f30' }, { name: 'Middle', depth: nearDepth + 2, color: '#77756b' }, { name: 'Far', depth: nearDepth + 5, color: '#bbb9ae' }].map(layer => ({ ...layer, state: projectMovingPoint({ worldX: 0, cameraX: camera.position, cameraVelocity: camera.velocity, cameraAcceleration: camera.acceleration, depth: layer.depth, focalLength }) }));
  const defaultJourney = cameraStart === -1 && cameraEnd === 1 && focalLength === 210 && nearDepth === 1.6 && duration === 4;
  const timingPreset = mode => { setCameraStart(-1); setCameraEnd(1); setFocal(210); setDepth(1.6); setDuration(4); setEasing(mode); setTime(0); };
  const reset = () => { timingPreset('smoothstep'); setTime(1.6); };
  const easingEquation = { linear: String.raw`E(s)=s`, smoothstep: String.raw`E(s)=3s^2-2s^3`, smootherstep: String.raw`E(s)=6s^5-15s^4+10s^3` }[easing];
  const velocitySeries = useMemo(() => [nearDepth, nearDepth + 2, nearDepth + 5].map(depth => chart(121, t => {
    const movement = cameraMotion({ time: t, duration, start: cameraStart, end: cameraEnd, easing });
    return projectMovingPoint({ worldX: 0, cameraX: movement.position, cameraVelocity: movement.velocity, cameraAcceleration: movement.acceleration, depth, focalLength }).velocity;
  }, 0, duration)), [nearDepth, focalLength, cameraStart, cameraEnd, duration, easing]);
  const velocityValues = velocitySeries.flatMap(points => points.map(point => point[1]));
  const velocityRange = [Math.min(0, ...velocityValues), Math.max(0, ...velocityValues)];
  const direction = Math.abs(camera.velocity) < 1e-10
    ? cameraStart === cameraEnd ? 'The camera is stationary for the entire journey because its endpoints coincide.' : `The camera is momentarily at rest. Its acceleration is ${signed(camera.acceleration)} world units/s².`
    : `The camera moves ${camera.velocity > 0 ? 'right' : 'left'} at ${format(Math.abs(camera.velocity))} world units/s, so every layer moves ${camera.velocity > 0 ? 'left' : 'right'} on screen.`;
  return <StudyLayout title="Depth turns a camera move into parallax" description="Give one lateral camera journey three different clocks. Compare how easing and duration change the velocity and acceleration of each depth layer."
    presets={[
      { label: 'Linear', description: 'Fixed camera velocity between the same endpoints', active: defaultJourney && easing === 'linear', onSelect: () => timingPreset('linear') },
      { label: 'Cubic ease', description: 'Start and end at rest, with endpoint acceleration', active: defaultJourney && easing === 'smoothstep', onSelect: () => timingPreset('smoothstep') },
      { label: 'Quintic ease', description: 'Zero camera velocity and acceleration at each endpoint', active: defaultJourney && easing === 'smootherstep', onSelect: () => timingPreset('smootherstep') },
    ]} onReset={reset}
    insight={{ label: cameraStart === cameraEnd ? 'A stationary camera' : 'One clock, three screen velocities', text: `${direction} The near layer has ${format((nearDepth + 5) / nearDepth, 2)}× the displacement, velocity and acceleration response of the far layer. Positive screen values point right; negative values point left.`, tone: 'neutral' }}
    variables={[{ symbol: 'c(t)', meaning: 'Camera position', value: `${signed(camera.position)} world units` }, { symbol: 'ċ(t)', meaning: 'Camera velocity', value: `${signed(camera.velocity)} world units/s` }, { symbol: 'c̈(t)', meaning: 'Camera acceleration', value: `${signed(camera.acceleration)} world units/s²` }, { symbol: 's = t/T', meaning: 'Normalized clock', value: `${format(camera.progress, 3)} · ${format(time)} / ${format(duration)} s` }, { symbol: 'f', meaning: 'Fixed focal length', value: `${focalLength} px` }, { symbol: 'Z', meaning: 'Fixed layer depths', value: `${layers.map(layer => format(layer.depth, 1)).join(' / ')} world units` }]}
    visual={<>
    <svg viewBox="0 0 680 340" style={svgStyle} role="img" aria-label={`Three depth layers at camera position ${format(camera.position)} world units, with screen motion opposite the lateral camera motion`}>
      <defs><clipPath id={clip}><rect x="20" y="45" width="640" height="240" /></clipPath></defs>
      <text x="25" y="27" fontSize="16" fill={MUTED}>ONE CAMERA / THREE DEPTHS</text>
      <line x1="340" x2="340" y1="45" y2="285" stroke={RULE} strokeDasharray="4 5" />
      <g clipPath={`url(#${clip})`}>
        {[...layers].reverse().map(layer => <g key={layer.name}>
          {[-4, -2, 0, 2, 4].map((worldX, i) => {
            const px = 340 + projectMovingPoint({ worldX, cameraX: camera.position, cameraVelocity: camera.velocity, cameraAcceleration: camera.acceleration, depth: layer.depth, focalLength }).x;
            const width = focalLength * .6 / layer.depth, height = focalLength * (1.2 + .3 * (i % 2)) / layer.depth;
            return <g key={worldX} transform={`translate(${px},0)`}><path d={`M${-width / 2},280 V${280 - height} L0,${265 - height} L${width / 2},${280 - height} V280 Z`} fill={layer.color} /><line x1="0" x2="0" y1={285 - height} y2="270" stroke={PAPER} strokeOpacity=".4" /></g>;
          })}
        </g>)}
      </g>
      <line x1="20" x2="660" y1="280" y2="280" stroke={INK} />
      {layers.map((layer, i) => <g key={layer.name}><circle cx={38 + i * 218} cy="310" r="5" fill={layer.color} /><text x={51 + i * 218} y="315" fontSize="16" fill={INK}>{layer.name} · {format(layer.depth, 1)}</text></g>)}
    </svg>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginTop: 14 }}><Playback key={`${duration}-${easing}`} value={time} onChange={setTime} min={0} max={duration} duration={duration} label="Camera" /><div style={{ flex: '1 1 180px', minWidth: 0 }}><Range label="Elapsed time" value={time} min={0} max={duration} step={.01} onChange={setTime} unit="s" /></div></div>
    <Plot series={layers.map((layer, index) => ({ name: layer.name, color: layer.color, points: velocitySeries[index] }))} xLabel="elapsed time / s" yLabel="screen velocity / px/s" xRange={[0, duration]} yRange={velocityRange} cursorX={time} />
  </>} controls={<>
    <label>Easing function<select aria-label="Easing function" value={easing} onChange={event => setEasing(event.target.value)}><option value="linear">Linear</option><option value="smoothstep">Cubic ease</option><option value="smootherstep">Quintic ease</option></select></label>
    <Range label="Journey duration" value={duration} min={1} max={8} step={.5} onChange={next => { setTime(time / duration * next); setDuration(next); }} unit="s" />
    <Range label="Camera start" value={cameraStart} min={-1.5} max={1.5} step={.05} onChange={setCameraStart} unit="units" />
    <Range label="Camera end" value={cameraEnd} min={-1.5} max={1.5} step={.05} onChange={setCameraEnd} unit="units" />
    <Range label="Focal length f" value={focalLength} min={120} max={300} step={1} onChange={setFocal} unit="px" />
    <Range label="Near-plane depth" value={nearDepth} min={1.2} max={3} step={.05} onChange={setDepth} unit="units" />
  </>} equations={[
    { label: 'An eased camera clock', tex: String.raw`\begin{aligned}c(t)&=c_0+(c_1-c_0)E(s),\quad s=\frac{t}{T}\\${easingEquation}\end{aligned}`, explanation: 'Start c₀ and end c₁ are lateral positions in world units. Time t and duration T are seconds. Reversing the endpoints reverses motion; equal endpoints keep the camera still.' },
    { label: 'Fixed-depth projection', tex: String.raw`x(t)=\frac{f\,[X-c(t)]}{Z}`, explanation: 'The scene point X, depth Z and focal length f stay fixed during each journey. Screen x is measured in graphic pixels from the optical center; X, c and Z use world units.' },
    { label: 'Camera and screen derivatives', tex: String.raw`\begin{aligned}\dot c&=\frac{(c_1-c_0)E'(s)}{T},\quad\ddot c=\frac{(c_1-c_0)E''(s)}{T^2}\\\dot x&=-\frac{f}{Z}\dot c,\qquad\ddot x=-\frac{f}{Z}\ddot c\end{aligned}`, explanation: 'Screen velocity is px/s; screen acceleration is px/s². The negative sign makes screen motion oppose camera motion. At the same clock progress, doubling duration halves velocity and quarters acceleration.' },
  ]} metrics={layers.map(layer => ({ label: `${layer.name} screen velocity`, value: `${signed(layer.state.velocity)} px/s`, note: `Acceleration ${signed(layer.state.acceleration)} px/s² · Center x ${signed(layer.state.x)} px` }))} note="Lateral camera translation only, with no camera rotation, depth changes or lens effects. Layer positions, plotted velocities and displayed derivatives come from the same functions. Endpoint derivatives are evaluated from inside the journey." />;
}

const PROTECTED = { x: 580, y: 290, width: 240, height: 280 };
function SourceArt() {
  return <g><rect width="1200" height="800" fill="#e5e2d8" /><rect x="0" y="570" width="1200" height="230" fill="#d1cdbf" /><path d="M0,570 L250,170 L475,570Z" fill="#b4b0a3" /><path d="M850,570 L1050,260 L1200,570Z" fill="#a29e91" /><circle cx="700" cy="425" r="115" fill={RED} /><circle cx="700" cy="425" r="72" fill="none" stroke="#f7f4ec" strokeWidth="2" /><text x="75" y="110" fontSize="45" fill={INK} fontFamily="Georgia,serif">A place for the subject.</text><text x="75" y="730" fontSize="25" fill="#625f55">ILLUSTRATIVE SOURCE / 1200 × 800</text><rect {...PROTECTED} fill="none" stroke={INK} strokeWidth="3" strokeDasharray="10 8" /></g>;
}

function CropStudy() {
  const [aspect, setAspect] = useState(.75), [anchorX, setAnchorX] = useState(.5), [anchorY, setAnchorY] = useState(.5), [zoom, setZoom] = useState(1);
  const viewportHeight = 600, viewportWidth = viewportHeight * aspect;
  const crop = coverCrop({ sourceWidth: 1200, sourceHeight: 800, viewportWidth, viewportHeight, anchorX, anchorY, zoom, protectedRect: PROTECTED });
  const scale = Math.min(235 / viewportWidth, 260 / viewportHeight);
  const displayWidth = viewportWidth * scale, displayHeight = viewportHeight * scale, destX = 420 + (235 - displayWidth) / 2, destY = 62 + (260 - displayHeight) / 2;
  const clip = `crop-${useId().replace(/:/g, '')}`;
  const reset = () => { setAspect(.75); setAnchorX(.5); setAnchorY(.5); setZoom(1); };
  const cropPreset = anchor => { setAspect(.56); setAnchorX(anchor); setAnchorY(.5); setZoom(1.3); };
  const cropInsight = crop.retainedFraction >= 1 - 1e-10
    ? `The entire protected box survives while only ${format(crop.retainedSourceFraction * 100, 1)}% of the source remains. This keeps the subject geometrically intact; inspect its scale and readable details before accepting the crop.`
    : crop.retainedFraction <= 1e-10
      ? 'The protected subject is entirely outside the delivery frame. The two presets use the same aspect and zoom: changing the anchor alone can restore it.'
      : `${format((1 - crop.retainedFraction) * 100, 1)}% of the protected box is cropped away. Reposition the anchor or reduce zoom to recover the subject; the missing area is visible in the source window.`;
  return <StudyLayout title="Reframing is a geometry problem" description="Keep the aspect and zoom fixed, then compare a lost subject with a protected one. The crop window shows exactly what the delivery frame keeps."
    presets={[
      { label: 'Subject protected', description: 'Same portrait aspect and zoom; anchor follows the subject', active: aspect === .56 && anchorX === .64 && anchorY === .5 && zoom === 1.3, onSelect: () => cropPreset(.64) },
      { label: 'Subject lost', description: 'Same frame, anchored to the opposite edge', active: aspect === .56 && anchorX === 0 && anchorY === .5 && zoom === 1.3, onSelect: () => cropPreset(0) },
    ]} onReset={reset}
    insight={{ label: 'What the delivery frame keeps', text: cropInsight, tone: crop.retainedFraction < 1 - 1e-10 ? 'warning' : 'positive' }}
    variables={[{ symbol: 'W/H', meaning: 'Delivery aspect', value: format(aspect) }, { symbol: 'aₓ, aᵧ', meaning: 'Anchor from leading to trailing edge', value: `${format(anchorX)}, ${format(anchorY)}` }, { symbol: 'zoom', meaning: 'Magnification beyond cover', value: `${format(zoom)}×` }]}
    visual={<svg viewBox="0 0 680 380" style={svgStyle} role="img" aria-label={`Cover crop retains ${format(crop.retainedFraction * 100, 1)} percent of the protected subject area`}>
    <defs><clipPath id={clip}><rect x={destX} y={destY} width={displayWidth} height={displayHeight} /></clipPath></defs>
    <text x="25" y="30" fontSize="17" fill={MUTED}>SOURCE / CROP</text><text x="420" y="30" fontSize="17" fill={MUTED}>DELIVERY</text>
    <g transform="translate(20,85) scale(.3)"><SourceArt /><rect x={crop.visibleSource.x} y={crop.visibleSource.y} width={crop.visibleSource.width} height={crop.visibleSource.height} fill="none" stroke={RED} strokeWidth="9" /></g>
    <g clipPath={`url(#${clip})`}><g transform={`translate(${destX + crop.offsetX * scale},${destY + crop.offsetY * scale}) scale(${crop.scale * scale})`}><SourceArt /></g></g>
    <rect x={destX} y={destY} width={displayWidth} height={displayHeight} fill="none" stroke={INK} />
    <text x="25" y="350" fontSize="14" fill={MUTED}>Red: crop · Dashed: protected subject</text>
    <text x="538" y="354" textAnchor="middle" fontSize="24" fill={crop.retainedFraction < 1 - 1e-10 ? RED : INK}>{format(crop.retainedFraction * 100, 0)}% retained</text>
  </svg>} controls={<>
    <Range label="Delivery aspect W/H" value={aspect} min={.56} max={2} step={.01} onChange={setAspect} />
    <Range label="Horizontal anchor" value={anchorX} min={0} max={1} step={.01} onChange={setAnchorX} />
    <Range label="Vertical anchor" value={anchorY} min={0} max={1} step={.01} onChange={setAnchorY} />
    <Range label="Zoom beyond cover" value={zoom} min={1} max={2.5} step={.05} onChange={setZoom} unit="×" />
  </>} equations={[
    { label: 'Cover and zoom', formula: 's = max(W/SW, H/SH) · zoom', tex: String.raw`s=\max\!\left(\frac{W}{S_W},\frac{H}{S_H}\right)\cdot\mathrm{zoom}`, explanation: 'Source dimensions SW × SH are scaled enough to cover the delivery frame W × H. Zoom is at least one.' },
    { label: 'Anchored offset', formula: 'ox = ax(W − sSW);  oy = ay(H − sSH)', tex: String.raw`o_x=a_x(W-sS_W),\qquad o_y=a_y(H-sS_H)`, explanation: 'Anchors 0, 0.5 and 1 align the leading edge, center and trailing edge. Offsets remain nonpositive.' },
    { label: 'Visible source and retained proof', formula: 'C = [−ox/s, −oy/s, W/s, H/s];  retained = area(P ∩ C) / area(P)', tex: String.raw`C=\left[-\frac{o_x}{s},-\frac{o_y}{s},\frac{W}{s},\frac{H}{s}\right],\qquad r=\frac{\operatorname{area}(P\cap C)}{\operatorname{area}(P)}`, explanation: 'C is the source crop rectangle. P is the dashed protected rectangle, not the entire image.' },
  ]} metrics={[
    { label: 'Protected area retained', value: `${format(crop.retainedFraction * 100, 1)}%`, note: 'Rectangle intersection; geometric only' },
    { label: 'Full source retained', value: `${format(crop.retainedSourceFraction * 100, 1)}%`, note: 'Visible source area / original area' },
    { label: 'Source crop size', value: `${format(crop.visibleSource.width, 0)} × ${format(crop.visibleSource.height, 0)}`, note: `Scale ${format(crop.scale, 3)} delivery px/source px` },
  ]} note="A fully retained rectangle does not prove readable type, an unobscured subject or a good composition. This example makes the crop consequence inspectable before those reviews." />;
}

export function MotionStudies({ studyId }) {
  if (studyId === 'spring-motion') return <SpringStudy />;
  if (studyId === 'bezier-paths') return <BezierStudy />;
  if (studyId === 'camera-parallax') return <ParallaxStudy />;
  if (studyId === 'framing-crop') return <CropStudy />;
  return null;
}
export default MotionStudies;
