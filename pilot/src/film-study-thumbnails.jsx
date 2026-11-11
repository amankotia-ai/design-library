import React from 'react';
import { springState, cubicBezier, timedBezier, cameraMotion, projectMovingPoint, coverCrop } from './film-motion-math.js';
import { resolveSpeechTiming, evaluateReadingOpportunity, evaluateMix, evaluateSampling } from './film-timing-math.js';

const RED = 'var(--library-brand-red,#f60f30)', INK = 'currentColor', RULE = 'var(--library-rule,#ddd)';
const line = points => points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
const sample = (n, fn) => Array.from({ length: n }, (_, i) => fn(i / (n - 1)));
const f = (n, digits = 2) => Number(n).toFixed(digits);
const axis = <path d="M20 100H380" stroke={INK} strokeOpacity=".16" fill="none" />;

function Frame({ labels, symbol, caption, children }) {
  return <div className="film-specimen" aria-hidden="true"><div className="film-specimen-top"><span>{labels[0]}</span><span>{labels[1]}</span></div><div className="film-specimen-symbol">{symbol}</div><svg viewBox="0 0 400 200" fill="none">{children}</svg><div className="film-specimen-caption"><span>{caption}</span><span>↗</span></div></div>;
}

export function StudyThumbnail({ studyId }) {
  if (studyId === 'spring-motion') {
    return <Frame labels={['Damping', 'Three regimes']} symbol="x(t)" caption="Bounce · critical · overdamped">
      {axis}{[.12, 1, 1.6].map((damping, i) => <path key={damping} d={line(sample(181, u => [20 + u * 360, 100 - 72 * springState({ time: u * 3.5, damping, frequency: 1.15 }).position]))} stroke={i ? INK : RED} strokeWidth={i ? '1.3' : '2'} strokeDasharray={i===2?'5 4':undefined} />)}
      <text x="270" y="25" fill={RED} fontSize="12">ζ = 0.12</text><text x="270" y="44" fill={INK} fontSize="12">ζ = 1 / 1.6</text>
    </Frame>;
  }
  if (studyId === 'bezier-paths') {
    const points = [[25, 155], [85, 20], [285, 185], [375, 45]], value = timedBezier(points, {time:1.4,duration:4,easing:'smoothstep'}), [x, y] = value.position, norm = 45 / value.speed;
    return <Frame labels={['Trajectory', 'Easing × duration']} symbol="B(E(t/T))" caption={`Cubic easing at 1.4 s: ${f(value.speed, 1)} px/s`}>
      <polyline points={points.map(p => p.join(',')).join(' ')} stroke={INK} strokeOpacity=".2" strokeDasharray="4 5" />
      <path d={line(sample(81, t => cubicBezier(points, t).position))} stroke={RED} strokeWidth="2" />
      {points.map(([px, py], i) => <circle key={i} cx={px} cy={py} r="4" fill={INK} />)}
      <line x1={x - value.velocity[0] * norm} y1={y - value.velocity[1] * norm} x2={x + value.velocity[0] * norm} y2={y + value.velocity[1] * norm} stroke={INK} strokeWidth="1.5" /><circle cx={x} cy={y} r="6" fill={RED} />
    </Frame>;
  }
  if (studyId === 'camera-parallax') {
    const depths = [1.6, 3.6, 6.6], camera = cameraMotion({time:1.6,duration:4,start:-1,end:1,easing:'smoothstep'});
    const projected = (depth, worldX=0) => projectMovingPoint({worldX,cameraX:camera.position,cameraVelocity:camera.velocity,cameraAcceleration:camera.acceleration,depth,focalLength:100});
    const ratio = Math.abs(projected(depths[0]).velocity / projected(depths[2]).velocity);
    return <Frame labels={['Eased camera', 'Projected velocity']} symbol="−f c′ / Z" caption={`At 1.6 s: near layer moves ${f(ratio)}× faster`}>
      <line x1="200" x2="200" y1="15" y2="185" stroke={INK} strokeOpacity=".2" strokeDasharray="4 5" />
      {[...depths].reverse().map((depth, i) => <g key={depth}>{[-3, -1, 1, 3].map(worldX => { const x = 200 + projected(depth,worldX).x, h = 140 / depth, w = 50 / depth; return <rect key={worldX} x={x - w / 2} y={170 - h} width={w} height={h} fill={i === 2 ? RED : INK} opacity={i === 2 ? 1 : .14 + i * .2} />; })}</g>)}
      <line x1="20" x2="380" y1="170" y2="170" stroke={INK} strokeOpacity=".3" />
    </Frame>;
  }
  if (studyId === 'framing-crop') {
    const protectedRect = { x: 580, y: 290, width: 240, height: 280 };
    const result = coverCrop({ sourceWidth: 1200, sourceHeight: 800, viewportWidth: 450, viewportHeight: 600, anchorX: .3, anchorY: .5, zoom: 1.3, protectedRect });
    const c = result.visibleSource, s = .22;
    return <Frame labels={['Aspect ratio', 'Protected area']} symbol="P ∩ C" caption={`${f(result.retainedFraction * 100, 1)}% of subject retained`}>
      <rect x="44" y="12" width={1200 * s} height={800 * s} fill={INK} fillOpacity=".035" stroke={INK} strokeOpacity=".2" />
      <path d="M44 150L105 55L165 150Z" fill={INK} fillOpacity=".13" />
      <circle cx={44 + 700 * s} cy={12 + 425 * s} r={115 * s} fill={RED} fillOpacity=".75" />
      <rect x={44 + protectedRect.x * s} y={12 + protectedRect.y * s} width={protectedRect.width * s} height={protectedRect.height * s} stroke={INK} strokeDasharray="4 4" />
      <rect x={44 + c.x * s} y={12 + c.y * s} width={c.width * s} height={c.height * s} stroke={RED} strokeWidth="2" />
      <text x="327" y="92" fontSize="11" fill={RED}>crop</text><path d={`M320 99L${44 + (c.x + c.width) * s} 99`} stroke={RED} />
    </Frame>;
  }
  if (studyId === 'speech-timing') {
    const result = resolveSpeechTiming(), sx = t => 20 + t * 45, px = t => 20 + t * 55;
    return <Frame labels={['Source speech', 'Edited program']} symbol="tₛ → tₚ" caption={`Picture follows the word by ${f(result.offset * 1000, 0)} ms`}>
      <path d="M20 55H380M20 145H380" stroke={INK} strokeOpacity=".2" />
      <rect x={sx(2.2)} y="38" width={(8 - 2.2) * 45} height="34" fill={INK} fillOpacity=".06" />
      <rect x={sx(4.2)} y="38" width={.45 * 45} height="34" fill={INK} fillOpacity=".55" />
      <path d={`M${sx(4.2)} 72L${px(result.word.programStart)} 128M${sx(4.65)} 72L${px(result.word.programEnd)} 128`} stroke={INK} strokeOpacity=".3" />
      <rect x={px(result.word.programStart)} y="128" width={(result.word.programEnd - result.word.programStart) * 55} height="34" fill={INK} fillOpacity=".55" />
      <line x1={px(result.picture)} x2={px(result.picture)} y1="112" y2="179" stroke={RED} strokeWidth="2" />
      <text x="20" y="25" fill={INK} fontSize="11">source</text><text x="20" y="116" fill={INK} fontSize="11">program</text><text x={px(result.picture) + 8} y="180" fill={RED} fontSize="11">picture</text>
    </Frame>;
  }
  if (studyId === 'reading-window') {
    const result = evaluateReadingOpportunity({ text: 'One action assigns the owner and updates the shared queue.', stableEnd: 4.5 });
    const x = t => 30 + 52 * t;
    return <Frame labels={['Stable exposure', 'Reading assumption']} symbol="Δt − r" caption={`Illustrative read margin: ${f(result.margin)} s`}>
      <text x="30" y="30" fill={INK} fontSize="12">visible</text><rect x={x(0)} y="40" width={52 * 6} height="22" fill={INK} fillOpacity=".09" />
      <text x="30" y="88" fill={INK} fontSize="12">stable</text><rect x={x(result.start)} y="98" width={52 * result.opportunity} height="22" fill={RED} />
      <text x="30" y="146" fill={INK} fontSize="12">assumed requirement</text><rect x={x(result.start)} y="156" width={52 * result.requirement} height="22" fill={INK} fillOpacity=".6" />
      <path d={`M${x(result.end)} 125V190M${x(result.start + result.requirement)} 148V190`} stroke={RED} strokeDasharray="3 4" />
    </Frame>;
  }
  if (studyId === 'sound-mixing') {
    const result = evaluateMix({ gainDbA: -3, gainDbB: -3, samples: 241 });
    return <Frame labels={['Summed signal', 'Clipping']} symbol="a + b" caption={`${result.clippedSamples}/${result.samples} sampled values clip`}>
      <path d="M20 55H380M20 145H380" stroke={INK} strokeOpacity=".2" strokeDasharray="4 5" />{axis}
      <path d={line(result.points.map(p => [20 + p.time / result.duration * 360, 100 - p.raw * 45]))} stroke={INK} strokeOpacity=".35" />
      <path d={line(result.points.map(p => [20 + p.time / result.duration * 360, 100 - p.clipped * 45]))} stroke={RED} strokeWidth="1.8" />
      <text x="23" y="46" fill={INK} fontSize="11">+1</text><text x="23" y="161" fill={INK} fontSize="11">−1</text>
    </Frame>;
  }
  if (studyId === 'sampling-aliasing') {
    const result = evaluateSampling({ frequency: 29, sampleRate: 24, duration: .5, time: .2 });
    const x = t => 20 + t / .5 * 360, y = v => 100 - v * 65;
    return <Frame labels={['29 Hz motion', '24 fps samples']} symbol="f − kfₛ" caption={`The same samples also fit ${Math.abs(result.alias)} Hz`}>
      {axis}<path d={line(sample(301, u => [x(u * .5), y(Math.sin(2 * Math.PI * 29 * u * .5))]))} stroke={INK} strokeOpacity=".2" />
      <path d={line(sample(181, u => [x(u * .5), y(Math.sin(2 * Math.PI * result.alias * u * .5))]))} stroke={RED} strokeWidth="1.5" />
      {result.samples.map((p, i) => <g key={i}><line x1={x(p.time)} x2={x(p.time)} y1="100" y2={y(p.value)} stroke={INK} strokeOpacity=".15" /><circle cx={x(p.time)} cy={y(p.value)} r="3.5" fill={RED} /></g>)}
    </Frame>;
  }
  return null;
}
export default StudyThumbnail;
