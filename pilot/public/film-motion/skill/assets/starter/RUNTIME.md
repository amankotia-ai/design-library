# Deterministic film starter

This is a neutral calibration composition. Replace `index.html`, `film.css`, and `film.js` with the film. Keep authored assets and licensed fonts local under `assets/`. No network assets are allowed during capture.

## Install and run

Requires Node 20+, npm, FFmpeg and ffprobe on PATH. The package lock pins Three.js 0.186.1 and Playwright 1.64.1 (verified against npm on 2026-10-29).

```sh
npm ci
npx playwright install chromium
npm run serve
npm run still -- --frame 45.5 --scale .5 --out renders/styleframe.png
npm run check -- --scale .5 --out renders/check.json
npm run render -- --scale .5 --out renders/preview.mp4
npm run render -- --out renders/master.mp4
npm run render -- --start 30 --end 60 --audio assets/mix.wav --out renders/shot.mp4
```

`npm run serve` prints a loopback URL for `preview.html` with accessible play, pause, scrub and frame controls. Preview is silent. `node scripts/film.mjs --help` lists flags. Use `--overwrite` only when intentionally replacing a render; the default preserves output and its manifest. Range `--end` is exclusive; range outputs begin at video time zero but render absolute source frames. Audio is sought to the same source time.

## Author contract

```js
window.film = {
  meta: {title: 'Example', width: 1920, height: 1080, fps: 30, durationFrames: 600},
  ready: Promise.all([document.fonts.ready, /* model / image / texture loaders */]),
  renderAt(frame) { /* may return a Promise; set the complete state for this absolute frame */ }
};
```

`renderAt` accepts fractional and out-of-order frames. No `Date.now`, elapsed clock, stateful physics, accumulating transforms, random sampling, uncontrolled media, CSS transitions, Web Animations, or animation loop belongs inside the composition. Use pure functions in `lib/time.js`; its closed-form spring takes seconds. Render every property that may change, including visibility and any content reset. For video, pause it, seek to the requested time and await `seeked` before returning. Await custom texture/font/video preparation in `film.ready`.

Import Three.js from `/vendor/three.module.js`; imports are served from the pinned local dependency. `setPixelRatio(window.devicePixelRatio)` permits scaled exports. The capture CSS viewport always matches the film's dimensions. `--scale .5` changes physical pixels to 960×540 for a 1920×1080 composition; it does not reflow the film. Preview scales a same-size iframe. Scaled dimensions must be even integers.

## Capture and evidence

PNG stills are lossless. MP4 output uses H.264, slow preset, CRF16 by default, 8-bit 4:2:0, SDR BT.709 metadata, and fast-start. This is a delivery format, not a 10-bit/alpha mezzanine master. Optional `--audio` uses AAC320k, pads short tracks with silence and trims to the rendered duration. No automatic normalization, fades, music generation, licensing or audio quality judgment is implied.

Each command writes a `.manifest.json` beside its result with source SHA256 hashes, dependency/browser/Node versions, dimensions, timeline parameters, WebGL renderer identity, output hash and validation. Render additionally verifies decoded frame count, dimensions and duration with ffprobe. WebGL capture currently uses Chromium's software SwiftShader backend for consistency; it is genuine WebGL but may be slower than GPU export. Out-of-order check compares exact PNG hashes at five sampled (including fractional) frames and reverse/repeat order in one session. It does not prove every frame or cross-platform identity.

Rendering fails on page errors, console errors, failed/HTTP-error requests, external network requests, missing fonts/images, readiness timeouts, still-running browser animations, or playing media. The composition must explicitly await loaders the renderer cannot infer. Source mutation during a render prevents publication. Output directory `renders/` and dependencies are excluded from source hashing.

## Dependency policy

Only Three.js and Playwright are direct npm dependencies; FFmpeg/ffprobe are system tools. No React, bundler, timeline library, or second composition clock is required. If a production film needs alpha, HDR, temporal supersampling or compositor-level grading, extend the exporter deliberately and validate that path before promising delivery.
