# Local film runtime

The starter lives at `assets/starter/` relative to this skill. Use `scripts/init_project.mjs` to copy it into a new project directory; the initializer refuses an existing destination and excludes dependencies and prior renders. Work on the project copy. It includes `index.html`, `film.css`, `film.js`, a silent scrub/play preview, pure timeline helpers, a local server/export CLI, and a dependency lockfile. The initial scene is a calibration example to replace, not a prescribed visual treatment.

## Set up and run

Use Node.js 20 or newer, system `ffmpeg` and `ffprobe`, and the starter's pinned packages. Resolve the actual skill directory and a new project destination before running the initializer. For example, from the skill directory:

```bash
node scripts/init_project.mjs /absolute/path/to/new-film
```

Then run the following from the created project:

```bash
npm ci
npx playwright install chromium
npm run serve
```

Open the printed local preview URL. `serve` hosts project assets locally; external resource URLs are rejected during export. The preview can scrub fractional frames, step whole frames and play at different speeds. It is silent: the final soundtrack is muxed separately during export.

The project installs Playwright for capture and Three.js for optional spatial scenes. DOM/CSS/SVG needs no component or animation framework. Import Three.js from `/vendor/three.module.js` when used, and pure helpers from `/lib/time.js`.

```bash
# A selected still; fractional frames are supported.
npm run still -- --frame 45.5 --out renders/frame-045.png

# Same-environment repeat-seek check.
npm run check -- --out renders/check.json

# Short preview range: end is exclusive.
npm run render -- --start 0 --end 90 --scale .5 --out renders/shot-preview.mp4

# Full film at composition resolution.
npm run render -- --out renders/film.mp4

# Optional: mux an existing soundtrack aligned to film frame zero.
npm run render -- --audio assets/soundtrack.wav --out renders/film-with-audio.mp4

# Full CLI options.
node scripts/film.mjs help
```

Use distinct output paths for review versions. Existing outputs require explicit `--overwrite`. `--project DIR` changes the project root from its default, the current directory. `--scale .5` reduces capture resolution through device scale factor; the logical composition viewport stays at its declared dimensions. This allows a fast preview without reflowing the design. Set an appropriate render timeout with `--timeout` when a tested asset load requires longer than the default 30,000 ms.

## Composition contract

Expose this object on `window` from `film.js`:

```js
window.film = {
  meta: {
    title: 'Film title',
    width: 1920,
    height: 1080,
    fps: 30,
    durationFrames: 600,
  },
  ready,           // Promise: resolve when fonts, images and scene are ready.
  renderAt,        // sync or async function accepting an absolute frame number.
};
```

`renderAt(frame)` must fully establish the visible state for that frame and accept fractional frames and out-of-order calls. The renderer awaits its result before capture. Treat ranges as `[start, end)`; a 600-frame film contains integer frames 0 through 599 and lasts `600 / fps` seconds.

Metadata dimensions, fps and duration are positive integers. This implementation accepts up to 120 fps and 7680 pixels per dimension. Scaled output dimensions must be even integers; `--scale` accepts 0.1–2. The exporter pins Chromium to software WebGL for its local capture path and records the reported environment in the manifest.

Derive transforms, masks, text, cursor, camera and shader values directly from the input. Reset properties that change across shots so reverse seeking cannot leave stale state. Do not integrate a simulation by adding deltas from the previous call. Use a stable seed/object ID for variation. The supplied `tween`, `progress`, `ease`, `spring` and `randomAt` helpers are pure; `spring` takes absolute elapsed seconds, so convert frame offsets using the declared fps.

For Three.js, size the canvas to the metadata, use `window.devicePixelRatio` for its render pixel ratio, render explicitly inside `renderAt`, and resolve shader compilation and selected textures in `ready`. There is no independent Three.js animation loop. The preview's playback clock merely requests absolute frames; it does not own scene state.

Store fonts, images, generated plates and selected media locally. Resolve font loading and image decoding before their first use. Frame export rejects running CSS/Web Animations and playing media; animations driven only by elapsed browser time are not exportable through this contract. A paused video element is not automatically frame-synchronized. If a shot uses video, implement and test awaited exact seeking in `renderAt`, or use deterministic predecoded image frames. The starter does not supply a general video-timeline or tracking system.

## What export and check establish

MP4 export uses FFmpeg/libx264, the `slow` preset, CRF 16 by default, `yuv420p`, limited-range BT.709 conversion/tags and fast-start metadata. This is the implemented SDR MP4 route, not an alpha/HDR/ProRes pipeline. Inspect demanding gradients, saturated colors, text and WebGL material against the encoded result.

Optional audio begins at film frame zero. A partial export seeks into it at `start / fps`; short audio is padded with silence and output is trimmed to the selected duration. It is encoded as AAC at 320 kb/s. This does not mix stems, normalize loudness, create captions or assess the soundtrack; prepare the intended mix before muxing.

The renderer fails on page or console errors, HTTP failures, failed requests, external resources, readiness/font/image failures, and autonomous browser animation/media. It also compares project source hashes before and after capture; finish source edits before rendering, or the output will be rejected. Fix the reported cause rather than suppressing it. A render command and its sidecar manifest record technical evidence; inspect their actual results before reporting success.

`check` samples the beginning, a fractional frame, interior frames and the last frame, then repeats/reverses them and compares PNG hashes in the same browser. Its JSON and manifest establish repeat-seek equivalence for those samples in that environment. They do not prove every frame, cross-platform/GPU identity, correct product behavior, smooth perceived motion or final audio quality. Add targeted boundary/frame checks when a shot introduces a new risk, and apply [finishing and review](finishing-and-review.md) to the encoded film.
