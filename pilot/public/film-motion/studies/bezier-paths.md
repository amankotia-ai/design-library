# Paths, tangents & speed

Shape a Bézier path, change its easing and duration, and inspect velocity and acceleration in seconds.

## Separate the route from its clock

Keep the control points fixed and compare linear, cubic and quintic timing. Then change the duration without changing the path. The moving point, tangent, equal-time dots and speed plot all use the same timed trajectory. Play once, pause or scrub; changing controls pauses playback.

## Read the mathematics

Let t be elapsed seconds, T the duration, s = t/T the normalized clock, and u = E(s) the path parameter. Position is X(t) = B(E(t/T)). The chain rule gives velocity X′ = B′(u)E′(s)/T and acceleration X″ = [B″(u)E′(s)² + B′(u)E″(s)]/T².

The geometric derivative B′ is not a velocity in seconds until the clock is included. Double duration at the same normalized clock position: the position stays fixed, speed halves, and acceleration drops to a quarter.

## Compare the easing functions

Linear timing uses E(s) = s. Cubic timing uses E(s) = 3s² − 2s³ and gives zero endpoint speed. Quintic timing uses E(s) = 6s⁵ − 15s⁴ + 10s³ and gives zero endpoint speed and acceleration. Zero endpoint derivatives do not imply constant speed along a curved path.

The reported derivatives are inside the active interval, including one-sided values at its ends. If a static hold is attached, linear timing can introduce a velocity jump; cubic timing can introduce an acceleration jump. Quintic timing matches a static hold through acceleration, though higher derivatives can still jump.

## Reuse the functions

Download `film-motion-math.js` from References. `easingState(progress, mode)` returns the easing value and derivatives; modes are `linear`, `smoothstep`, and `smootherstep`. `timedBezier(points, {time, duration, easing})` returns the path parameter, position, velocity, acceleration and speed in seconds. `cubicBezier(points, u)` remains available for derivatives with respect to the geometric parameter.

The controls use graphic pixels; they are not final output pixels. The tests cover finite-difference derivatives, the chain rule, endpoints and duration scaling. These geometric and timing measurements do not establish artistic quality.
