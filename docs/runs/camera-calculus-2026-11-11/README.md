# Camera and parallax calculus

The Camera, depth & parallax study now has the same timing controls as the Bézier example: linear, cubic and quintic easing; adjustable duration; opt-in single-pass playback; pause, rewind and exact time seeking. Camera endpoints can be reversed or made equal to study stationary motion.

The rendered scene, signed velocity graph and live per-layer measurements share pure functions. `cameraMotion` computes camera position, velocity and acceleration in world units. `projectMovingPoint` projects that motion through fixed depth and focal length, yielding screen position, velocity and acceleration. Changing duration preserves clock progress; doubling duration halves velocity and quarters acceleration.

The existing library design, other studies and their content are preserved. The camera guide, registry, collection thumbnail, downloadable functions and source manifest have been updated.

## Preview and source

[Open the camera study](http://127.0.0.1:5184/design-library/?panel=film&entry=camera-parallax).

The preview runs from `../studies-polish/pilot`. The guarded delivery copies reviewed files to `/Users/abhishekmankotia/Documents/ChatGPT/Design Library/pilot`. No commit or deployment is part of this run.

## Verification

The mathematics implementer ran 61 checks:28 motion/geometry,14 scene calculus and19 timing/signal checks. Seven new test groups cover finite-difference camera/projected derivatives, endpoints, duration scaling, reversed/stationary travel, inverse-depth/focal scaling and input validation. Existing 54 mathematical checks remain. Route and downloadable source parity passed.

The root browser report `evidence/browser-check.json` covers known analytic values, three presets, reset, playback/pause/rewind, manual seeking, parameter-change pause, duration scaling, reversal, stationary travel, quintic endpoints and once-only completion. It includes 13 screenshots at 1440, 768 and 390 pixel viewport widths, nine mathematics cards and smoke checks for the other motion study routes. No page errors or page-width overflow were recorded.

The production build passes (`evidence/build.log`). Existing client-directive and chunk-size warnings remain nonfatal. Browser verification used a locally available Playwright runtime and scoped Chrome execution outside the sandbox; no dependencies were added to the project.

`evidence/QA.md` records independent visual and behavioral review of the delivered revision. `evidence/qa-lifecycle.json` separately records native keyboard control, actual offscreen pause and a simulated visibility-change handler check. A real hidden-tab transition was not available in the headless run and is not claimed as verified.

## Model boundaries

The scene is static and the camera translates laterally. Depth and focal length remain fixed throughout a journey. Slider changes define a new journey rather than a continuous dolly or zoom. Endpoint derivatives are evaluated from inside the active interval. Graphic pixels are model coordinates, not necessarily export pixels. These calculations describe geometry and timing rather than artistic quality.
