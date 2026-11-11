// Original, dependency-free teaching models. No audience-quality predictions.
function finite(value, name) { if (typeof value !== 'number' || !Number.isFinite(value)) throw new RangeError(`${name} must be finite`); return value; }
function positive(value, name) { finite(value, name); if (value <= 0) throw new RangeError(`${name} must be positive`); return value; }
function unit(value, name) { finite(value, name); if (value < 0 || value > 1) throw new RangeError(`${name} must be in [0,1]`); return value; }

/** Unit-mass oscillator, x(0)=amplitude and v(0)=0, for every damping regime.
 * dampedOmega is the oscillation frequency (zero for critical/overdamped motion).
 * envelope is a conservative bound on |position|, not a settling-time estimate.
 */
export function springState({ time = 0, damping = .25, frequency = 1, amplitude = 1 } = {}) {
  finite(time, 'time'); finite(damping, 'damping'); positive(frequency, 'frequency'); finite(amplitude, 'amplitude');
  if (time < 0 || damping < 0) throw new RangeError('Requires time ≥ 0 and damping ≥ 0');
  const omega = finite(2 * Math.PI * frequency, 'Natural angular frequency');
  const omegaSquared = finite(omega * omega, 'Squared angular frequency');
  const alpha = finite(damping * omega, 'Damping coefficient');
  let position, velocity, envelope, dampedOmega = 0;
  const regime = damping < 1 ? 'underdamped' : damping === 1 ? 'critical' : 'overdamped';
  if (damping < 1) {
    const beta = omega * Math.sqrt((1 - damping) * (1 + damping));
    const angle = finite(beta * time, 'Oscillation phase'), decay = Math.exp(-alpha * time);
    // sin(beta*t)/beta = t*sinc(beta*t) remains well-conditioned as damping → 1.
    const sinc = Math.abs(angle) < 1e-4 ? 1 - angle * angle / 6 + angle ** 4 / 120 : Math.sin(angle) / angle;
    const weightedTime = decay === 0 ? 0 : decay * time;
    position = amplitude * (decay * Math.cos(angle) + alpha * weightedTime * sinc);
    velocity = -amplitude * omegaSquared * weightedTime * sinc;
    envelope = Math.abs(amplitude) * (decay + alpha * weightedTime);
    dampedOmega = beta;
  } else if (damping === 1) {
    const decay = Math.exp(-omega * time), weightedTime = decay === 0 ? 0 : decay * time;
    position = amplitude * (decay + omega * weightedTime);
    velocity = -amplitude * omegaSquared * weightedTime;
    envelope = Math.abs(position);
  } else {
    const root = Math.sqrt(damping - 1) * Math.sqrt(damping + 1);
    // Rationalizing the slow root avoids subtracting nearly equal large numbers.
    const slow = -omega / (damping + root), fast = finite(-omega * (damping + root), 'Fast decay rate');
    const separation = slow - fast, decay = Math.exp(slow * time);
    // expm1 preserves the difference of the two exponentials near critical damping.
    const differenceRatio = decay === 0 ? 0 : decay * (-Math.expm1(-separation * time)) / separation;
    position = amplitude * (decay - slow * differenceRatio);
    velocity = -amplitude * omegaSquared * differenceRatio;
    envelope = Math.abs(position);
  }
  const acceleration = -2 * alpha * velocity - omega * omega * position;
  for (const [name, value] of Object.entries({ position, velocity, acceleration, envelope })) finite(value, name);
  return { position, velocity, acceleration, omega, dampedOmega, envelope, regime };
}

/** Derivatives of normalized progress. At 0 and 1, use the active interval's
 * one-sided derivatives; these do not include any stationary hold outside it.
 */
export function easingState(progress, mode = 'linear') {
  unit(progress, 'progress');
  const u = progress;
  if (mode === 'linear') return { value: u, first: 1, second: 0, third: 0 };
  if (mode === 'smoothstep') return { value: u * u * (3 - 2 * u), first: 6 * u * (1 - u), second: 6 - 12 * u, third: -12 };
  if (mode === 'smootherstep') return {
    // Symmetry avoids cancellation to a value slightly above 1 near the endpoint.
    value: u <= .5 ? u ** 3 * (10 + u * (-15 + 6 * u)) : 1 - (1 - u) ** 3 * (10 + (1 - u) * (-15 + 6 * (1 - u))),
    first: 30 * u * u * (1 - u) ** 2,
    second: 60 * u * (1 - u) * (1 - 2 * u),
    third: 60 * (1 - 6 * u + 6 * u * u),
  };
  throw new RangeError('Easing must be linear, smoothstep or smootherstep');
}

/** Derivatives are with respect to Bézier parameter t, not wall-clock seconds. */
export function cubicBezier(points, t) {
  unit(t, 't');
  if (!Array.isArray(points) || points.length !== 4 || points.some(p => !Array.isArray(p) || p.length !== 2)) throw new RangeError('Four [x,y] control points are required');
  points.flat().forEach(v => finite(v, 'coordinate'));
  const u = 1 - t;
  const position = [0, 1].map(k => u ** 3 * points[0][k] + 3 * u * u * t * points[1][k] + 3 * u * t * t * points[2][k] + t ** 3 * points[3][k]);
  const velocity = [0, 1].map(k => 3 * u * u * (points[1][k] - points[0][k]) + 6 * u * t * (points[2][k] - points[1][k]) + 3 * t * t * (points[3][k] - points[2][k]));
  const acceleration = [0, 1].map(k => 6 * u * (points[2][k] - 2 * points[1][k] + points[0][k]) + 6 * t * (points[3][k] - 2 * points[2][k] + points[1][k]));
  return { position, velocity, acceleration, speed: Math.hypot(...velocity) };
}

/** Compose geometry with a clock: r(t)=B(E(t/duration)). All returned motion
 * derivatives are per second, unlike cubicBezier's parameter derivatives.
 */
export function timedBezier(points, { time = 0, duration = 4, easing = 'linear' } = {}) {
  finite(time, 'time'); positive(duration, 'duration');
  if (time < 0 || time > duration) throw new RangeError('Time must lie within [0,duration]');
  const clock = easingState(time / duration, easing), curve = cubicBezier(points, clock.value);
  const velocity = curve.velocity.map(component => component * clock.first / duration);
  const acceleration = curve.acceleration.map((component, i) => (component * clock.first ** 2 + curve.velocity[i] * clock.second) / duration / duration);
  const speed = Math.hypot(...velocity);
  [...curve.position, ...velocity, ...acceleration, speed].forEach(value => finite(value, 'Timed curve result'));
  return { parameter: clock.value, position: curve.position, velocity, acceleration, speed, easing: clock };
}

/** A lateral camera move in world units, evaluated directly from time in seconds.
 * progress is the normalized clock t/T; easing.value is the eased travel fraction.
 * Endpoint derivatives belong to the active move, not to a hold outside it.
 */
export function cameraMotion({ time = 0, duration = 4, start = -1, end = 1, easing = 'smoothstep' } = {}) {
  finite(time, 'time'); positive(duration, 'duration'); finite(start, 'start'); finite(end, 'end');
  if (time < 0 || time > duration) throw new RangeError('Time must lie within [0,duration]');
  const progress = time / duration, clock = easingState(progress, easing);
  const distance = finite(end - start, 'Camera travel distance');
  const position = progress === 0 ? start : progress === 1 ? end : start + distance * clock.value;
  const velocity = distance * clock.first / duration;
  const acceleration = distance * clock.second / duration / duration;
  for (const [name, value] of Object.entries({ position, velocity, acceleration })) finite(value, `Camera ${name}`);
  return { position, velocity, acceleration, progress, easing: clock };
}

/** Pinhole x coordinate relative to the optical center. Camera translation is lateral. */
export function projectPoint({ worldX = 0, cameraX = 0, depth = 3, focalLength = 200 } = {}) {
  finite(worldX, 'worldX'); finite(cameraX, 'cameraX'); positive(depth, 'depth'); positive(focalLength, 'focalLength');
  return { x: focalLength * (worldX - cameraX) / depth, dCamera: -focalLength / depth, dDepth: -focalLength * (worldX - cameraX) / (depth * depth), dFocal: (worldX - cameraX) / depth };
}

/** Project a fixed world point through a laterally moving camera. World position,
 * depth and focal length stay fixed: screen velocity/acceleration are in px/s, px/s².
 */
export function projectMovingPoint({ worldX = 0, cameraX = 0, cameraVelocity = 0, cameraAcceleration = 0, depth = 3, focalLength = 200 } = {}) {
  finite(cameraVelocity, 'cameraVelocity'); finite(cameraAcceleration, 'cameraAcceleration');
  const projection = projectPoint({ worldX, cameraX, depth, focalLength });
  const velocity = projection.dCamera * cameraVelocity, acceleration = projection.dCamera * cameraAcceleration;
  const result = { ...projection, velocity, acceleration };
  for (const [name, value] of Object.entries(result)) finite(value, `Projected ${name}`);
  return result;
}

export function rectangleIntersection(a, b) {
  const x = Math.max(a.x, b.x), y = Math.max(a.y, b.y);
  const width = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - x);
  const height = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - y);
  return { x, y, width, height, area: width * height };
}

/** CSS-like cover fit followed by zoom; anchors range from leading edge 0 to trailing 1. */
export function coverCrop({ sourceWidth, sourceHeight, viewportWidth, viewportHeight, anchorX = .5, anchorY = .5, zoom = 1, protectedRect } = {}) {
  for (const [name, value] of Object.entries({ sourceWidth, sourceHeight, viewportWidth, viewportHeight })) positive(value, name);
  unit(anchorX, 'anchorX'); unit(anchorY, 'anchorY'); finite(zoom, 'zoom');
  if (zoom < 1) throw new RangeError('Cover zoom must be at least 1');
  const scale = Math.max(viewportWidth / sourceWidth, viewportHeight / sourceHeight) * zoom;
  const offsetX = anchorX * (viewportWidth - sourceWidth * scale), offsetY = anchorY * (viewportHeight - sourceHeight * scale);
  const visibleSource = { x: -offsetX / scale, y: -offsetY / scale, width: viewportWidth / scale, height: viewportHeight / scale };
  let projectedProtected = null, retainedFraction = null;
  if (protectedRect !== undefined) {
    const { x, y, width, height } = protectedRect;
    finite(x, 'protected x'); finite(y, 'protected y'); positive(width, 'protected width'); positive(height, 'protected height');
    if (x < 0 || y < 0 || x + width > sourceWidth || y + height > sourceHeight) throw new RangeError('Protected rectangle must lie inside the source');
    projectedProtected = { x: offsetX + scale * x, y: offsetY + scale * y, width: scale * width, height: scale * height };
    retainedFraction = Math.max(0, Math.min(1, rectangleIntersection(protectedRect, visibleSource).area / (width * height)));
  }
  return { scale, offsetX, offsetY, visibleSource, projectedProtected, retainedFraction, retainedSourceFraction: visibleSource.width * visibleSource.height / (sourceWidth * sourceHeight) };
}
