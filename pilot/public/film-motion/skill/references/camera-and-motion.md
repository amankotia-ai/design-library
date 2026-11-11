# Camera and motion

## Give the camera a job

Choose the subject, the information being revealed, and the destination before choosing the move. Camera and object motion are separate tracks. A screenshot growing larger is a graphic scale change; it does not prove a physical dolly move or reveal hidden geometry.

StudioBinder's camera series distinguishes stationary rotation (pan/tilt), translation (dolly/truck/pedestal), lens zoom, and arcs. Our software-film applications below are a transfer of those concepts. [Camera movement series](https://www.studiobinder.com/camera-shots/camera-movements/).

| Move | Geometric change | Useful software-film purpose | Watch for |
|---|---|---|---|
| Locked | Camera constant | Let an action, result, or line read | Objects can still overwhelm the frame |
| Pan / tilt | Rotation around camera position | Reveal a region of a larger world | Moving flat layouts may be clearer as translation |
| Truck / pedestal | Translate sideways / vertically | Follow a workflow or pass across a system | Parallax requires actual depth, not a uniformly moved screenshot |
| Dolly / push | Translate toward subject | Move from context to consequential detail | Arrive before the viewer needs to read |
| Pull out | Translate away | Reveal scope or show parts forming a whole | Final scale must preserve the relevant result |
| Lens zoom | Change field of view | Graphic emphasis without changing viewpoint | Perspective is unchanged; do not call it a dolly |
| Arc / orbit | Move around subject | Reveal genuine volume/material or relationships | Skewed UI becomes hard to read; avoid decorative orbit loops |
| Crane / boom | Translate in height with planned framing | Reveal hierarchy or scale in a real spatial world | Gratuitous cinematic movement can bury the proof |
| Rack focus | Shift focal distance | Transfer attention between depth planes | Blur text only when it is not needed for understanding |
| Whip | Rapid sweep with controlled departure/arrival | Energetic handoff between related subjects | Requires a clear anchor and settled arrival; not a default cut |
| Dolly zoom | Translate and compensate field of view | A rare perceptual/reframing moment | Needs meaningful depth; usually distracting for UI proof |

For every move specify start/end framing, focal point, target size, path, duration, acceleration, projection/lens, depth/occlusion, and rest interval. Use composition thumbnails at start, midpoint, arrival, and proof. Protect intentional graphic alignment; physically correct camera work can still produce a poor composition.

## Screen-space constraints

For a planar subject in perspective, apparent size is proportional to `1 / (distance × tan(verticalFov/2))` when geometry and viewport remain fixed. For a constant-size dolly zoom, keep `distance × tan(verticalFov/2)` constant. Validate the resulting image rather than tuning numbers blindly. Orthographic scale changes framing without perspective convergence; use it for precise graphic/UI worlds when depth is not the subject.

Use screen-space velocity to compare motion across output sizes. Define subject position in normalized frame coordinates, then inspect displacement per frame. A smooth mathematical path can still accelerate perceptually when moving toward the camera. Judge both screen-space motion and world-space construction.

Let attention lead the move: a highlight or action establishes a target, the camera travels, then settles. Avoid asking the viewer to decode new copy, follow a cursor, track a moving camera, and understand a UI state change simultaneously. For a high-motion exception, prove it at real playback size and explain why it works.

## Choreograph properties, not one undifferentiated object

Use the [creator-craft comparisons](creator-craft.md) when developing coverage. State what each move reveals, compare it with a locked view when uncertain, and plan the outgoing/incoming attention anchor before building the seam. Variation can come from subject action, scale, composition or light. A stable product result needs its own readable destination even after an energetic passage.

An effective transformation often separates container dimensions, leading/trailing edges, artwork, copy, controls, opacity, blur, and camera. Stage them according to what remains recognizable. Record the persistent anchor and transition class: cut, continuous transform, mask, matched replacement, object handoff, or scene takeover.

Use anticipation to make a large change legible; follow-through can resolve weight after the main action. Use overshoot where the material and brand support it; stiff product UI need not bounce. Stagger expresses hierarchy or flow, not a mandatory delay per element. Leave secondary motion subordinate to the key action.

Apple's spring session shows that compound motion can use different starts, ends, and spring properties. Transfer the separation of tracks; do not copy app interaction duration rules into film timing. [Animate with springs](https://developer.apple.com/videos/play/wwdc2023/10158/).

## Deterministic authoring

Evaluate the scene from absolute time. For a tween, clamp `u=(t-start)/(end-start)` and evaluate the chosen curve. For an analytic spring, evaluate displacement from elapsed time and explicit initial conditions; do not integrate from the previously rendered frame. Long simulations need a deterministic bake or known checkpoint strategy. Seeds and asset IDs must be stable.

GSAP can author transforms, masks, type, and independent tracks. A proposed adapter is:

```js
const timeline = gsap.timeline({paused: true});
// Set every relevant initial state explicitly; build tracks once.
// Define visual state in tweens, not side-effect callbacks.
window.film.renderAt = async frame => {
  timeline.totalTime(frame / window.film.meta.fps, true);
  // Seek media and render any manual canvases from this same absolute frame.
};
```

This fragment is an integration pattern, not a bundled/tested GSAP adapter. Install a known local version only when selected. GSAP's seek suppresses intervening callbacks by default; callbacks cannot be the authoritative mechanism for scene state. Explicit `.fromTo()` states or pure derived values help avoid initialization-dependent results. Test end→start, random order, fractional frames, repeat regions, and every shot boundary. [GSAP seek](https://www.gsap.com/docs/v3/GSAP/Timeline/seek%28%29/), [timeline](https://www.gsap.com/docs/v3/GSAP/gsap.timeline%28%29/).

## Stop motion and generated assets

Use intentional pose changes held for chosen output-frame counts. Keep framing, silhouette, lighting, scale, and visual identity stable across generated assets unless their change is the idea. Do not confuse asset inconsistency with appealing handmade motion. Define pose cadence independently from delivery fps, and avoid motion blur that erases the stepped character. Generated raster assets can serve the material world; keep exact UI, logos, and typography in faithful separate layers.

Research checked 6 November 2026. Camera applications and mathematical integration guidance are production synthesis. Source appearance alone does not reveal the creator's software or exact easing curve.
