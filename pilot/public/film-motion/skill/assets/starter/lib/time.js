/** Pure timeline helpers. All times use frames, including fractional frames. */
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const progress = (frame, start, end) => end === start ? Number(frame >= end) : clamp((frame - start) / (end - start));
export const ease = {
  linear: t => t,
  inCubic: t => t * t * t,
  outCubic: t => 1 - (1 - t) ** 3,
  inOutCubic: t => t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2,
  smooth: t => t * t * (3 - 2 * t),
};
export const tween = (frame, start, end, a = 0, b = 1, curve = ease.outCubic) => lerp(a, b, curve(progress(frame, start, end)));
/** Underdamped unit step; absolute seconds, no stateful integration. */
export function spring(seconds, { frequency = 2.5, damping = .72 } = {}) {
  if (seconds <= 0) return 0;
  if (!(frequency > 0 && damping > 0 && damping < 1)) throw new Error('spring needs frequency > 0 and 0 < damping < 1');
  const w = frequency * 2 * Math.PI, wd = w * Math.sqrt(1 - damping * damping);
  return 1 - Math.exp(-damping * w * seconds) * (Math.cos(wd * seconds) + damping * w / wd * Math.sin(wd * seconds));
}
/** Stateless deterministic pseudo-random value for a stable object ID. */
export function randomAt(index, seed = 1) {
  let n = (Math.imul(index | 0, 374761393) + Math.imul(seed | 0, 668265263)) | 0;
  n = Math.imul(n ^ n >>> 13, 1274126177); return ((n ^ n >>> 16) >>> 0) / 4294967296;
}
