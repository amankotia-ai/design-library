# Camera, depth & parallax

Ease a camera through layered depth and inspect projected position, velocity and acceleration.

## One journey, three clocks

Keep the scene, focal length and depth fixed while comparing Linear, Cubic ease and Quintic ease. Play the journey once, pause, rewind, or scrub to an exact time. Change the camera start and end to reverse direction or set them equal for a stationary camera. Parameter changes pause playback.

The scene, graph and measurements all come from the same pure functions. Camera quantities use world units; projected quantities use graphic pixels relative to the optical center. The graph shows signed velocity, not unsigned speed.

## Read the camera clock

Let t be elapsed seconds, T the duration and E the selected easing function. Camera position is c(t) = c₀ + (c₁ − c₀)E(t/T). Its velocity is c′(t) = (c₁ − c₀)E′(t/T)/T; its acceleration is c″(t) = (c₁ − c₀)E″(t/T)/T².

Linear easing is E(s) = s. Cubic easing is E(s) = 3s² − 2s³. Quintic easing is E(s) = 6s⁵ − 15s⁴ + 10s³. Cubic easing has zero endpoint velocity; quintic easing also has zero endpoint acceleration. Endpoint derivatives are one-sided values inside the active journey. A stationary hold outside the interval is not simulated.

## Project motion through depth

For a stationary world point X, constant positive depth Z and fixed focal length f, screen position is x(t) = f[X − c(t)]/Z. Differentiate to obtain screen velocity v(t) = −fc′(t)/Z and screen acceleration a(t) = −fc″(t)/Z.

A rightward camera move produces leftward screen motion. At the same time, a near layer has greater velocity magnitude than a far one in inverse proportion to depth. Acceleration has the same depth scaling; both are zero when the camera is stationary. Increasing focal length increases displacement, velocity and acceleration proportionally.

These derivatives assume f and Z remain fixed during the journey. Changing a slider selects a new journey; the model does not treat a depth or focal-length slider change as an animated dolly or zoom. Rotation, lens distortion and depth of field are outside this lateral model.

## Compare duration and direction

Changing duration preserves normalized progress t/T. Double the duration to keep the same position while halving velocity and quartering acceleration. Swap camera endpoints to reverse signed velocity and acceleration at the same clock progress. Set both endpoints equal to check the stationary case.

The layer metrics show each layer's center object at X = 0. Every point in a given fixed-depth layer shares its projected velocity and acceleration.

## Reuse the functions

Download `film-motion-math.js` from References. `cameraMotion({time, duration, start, end, easing})` returns camera position, velocity, acceleration, normalized progress and easing derivatives. `projectMovingPoint({worldX, cameraX, cameraVelocity, cameraAcceleration, depth, focalLength})` returns projected position, velocity and acceleration. The existing `projectPoint` and `easingState` functions remain available.

The library checks finite-difference derivatives, endpoints, duration scaling, reversal, stationary motion and inverse-depth projection. These are geometric measurements, not predictions of audience response or artistic quality.
