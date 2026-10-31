(() => {
  const M = 4294967296;
  let fps = 60;
  let looping = true;
  let ready = false;
  let drawing = false;
  let pending = 0;
  let lastTarget = 0;
  let lastReal = 0;
  let seed = null;
  let noiseKey = Math.floor(Math.random() * M) | 0;

  function step() {
    pending = 0;
    const now = performance.now();
    if (!looping || now - lastTarget >= 1000 / fps - 5) {
      window.deltaTime = now - lastReal;
      redraw();
      lastTarget = Math.max(lastTarget + 1000 / fps, now);
      lastReal = now;
    }
    if (looping && !pending) pending = requestAnimationFrame(step);
  }

  function redraw() {
    if (drawing || !ready || typeof window.draw !== "function") return;
    window.frameCount += 1;
    drawing = true;
    try {
      window.draw();
    } finally {
      drawing = false;
    }
  }

  function loop() {
    if (looping) return;
    looping = true;
    if (ready) step();
  }

  function noLoop() {
    looping = false;
    cancelAnimationFrame(pending);
    pending = 0;
  }

  function frameRate(value) {
    if (typeof value === "number" && value >= 0) fps = value;
    return fps;
  }

  function random(min, max) {
    let r;
    if (seed === null) r = Math.random();
    else {
      seed = (1664525 * seed + 1013904223) % M;
      r = seed / M;
    }
    if (min === undefined) return r;
    if (max === undefined) return Array.isArray(min) ? min[Math.floor(r * min.length)] : r * min;
    if (min > max) [min, max] = [max, min];
    return r * (max - min) + min;
  }

  function randomSeed(value) {
    seed = (value == null ? Math.random() * M : value) >>> 0;
  }

  function noiseSeed(value) {
    noiseKey = Math.imul(value >>> 0, 2654435761);
  }

  function lattice(x, y, z) {
    let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 1440662683) + noiseKey) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / M;
  }

  function smooth(x, y, z) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);
    const ease = (t) => t * t * (3 - 2 * t);
    const u = ease(x - xi);
    const v = ease(y - yi);
    const w = ease(z - zi);
    const mix = (a, b, t) => a + (b - a) * t;
    const plane = (k) =>
      mix(mix(lattice(xi, yi, k), lattice(xi + 1, yi, k), u), mix(lattice(xi, yi + 1, k), lattice(xi + 1, yi + 1, k), u), v);
    return mix(plane(zi), plane(zi + 1), w);
  }

  function noise(x, y = 0, z = 0) {
    let sum = 0;
    let amp = 0.5;
    let scale = 1;
    for (let octave = 0; octave < 4; octave++) {
      sum += amp * smooth(x * scale, y * scale, z * scale);
      amp *= 0.5;
      scale *= 2;
    }
    return sum;
  }

  function createCanvas(width, height) {
    const elt = document.createElement("canvas");
    elt.width = width;
    elt.height = height;
    return {
      elt,
      parent(node) {
        (typeof node === "string" ? document.getElementById(node) : node)?.appendChild(elt);
        return this;
      },
    };
  }

  const pick = (args) => (Array.isArray(args[0]) ? args[0] : args);

  const api = {
    TWO_PI: Math.PI * 2,
    frameCount: 0,
    deltaTime: 0,
    lerp: (start, stop, amt) => amt * (stop - start) + start,
    constrain: (n, low, high) => Math.max(Math.min(n, high), low),
    dist: (...a) => (a.length >= 6 ? Math.hypot(a[3] - a[0], a[4] - a[1], a[5] - a[2]) : Math.hypot(a[2] - a[0], a[3] - a[1])),
    round: (n, decimals) => {
      if (!decimals) return Math.round(n);
      const k = Math.pow(10, decimals);
      return Math.round(n * k) / k;
    },
    min: (...a) => Math.min(...pick(a)),
    max: (...a) => Math.max(...pick(a)),
    abs: Math.abs,
    floor: Math.floor,
    ceil: Math.ceil,
    sin: Math.sin,
    random,
    randomSeed,
    noise,
    noiseSeed,
    createCanvas,
    pixelDensity: (value) => (typeof value === "number" ? undefined : 1),
    displayDensity: () => window.devicePixelRatio,
    frameRate,
    loop,
    noLoop,
    redraw,
  };

  function start() {
    Object.assign(window, api);
    if (typeof window.setup === "function") window.setup();
    lastTarget = lastReal = performance.now();
    ready = true;
    step();
  }

  if (document.readyState === "complete") queueMicrotask(start);
  else window.addEventListener("load", start, { once: true });
})();
