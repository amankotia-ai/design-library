let cellW = 500;
let cellH = 500;
const MARGIN = 40;
const CUT_NEAR_LEN = 8; // px at shape vertex drawn on top of fill
let BG = [172, 172, 172];
let INK = [0, 0, 0];
let FILL = [0, 0, 0];
let BG_HEX = "#ACACAC";
let INK_HEX = "#000000";
let FILL_HEX = "#000000";
// The plate can be unfilled. Kept as a flag rather than a colour because FILL
// is an rgb triple that gets mixed and compared elsewhere, and "transparent"
// is not something you can average.
let FILL_NONE = false;

const PALETTE = [
  "#FFFFFF",
  "#F5F5F5",
  "#BFBFBF",
  "#ACACAC",
  "#CDC9C0",
  "#636363",
  "#000000",
  "#0095FF",
  "#05A5FF",
  "#00C6C5",
  "#64AEAE",
  "#01A300",
  "#80AA40",
  "#793387",
  "#DF8120",
  "#D40000",
  "#FE89B2",
];

let activePaletteTarget = 0;

let panels = [];
let cutEdges = false;
let linkLayerVerts = false;
let linkInnerPeers = false;
let motion = true;
let panelCount = 1;
let rowCount = 1;

// slider-driven parameters
let strokeW = 1; // ink stroke weight (px)
let strokeStyle = "solid"; // solid | dash | long | dot | dashdot
const STROKE_STYLES = ["solid", "dash", "long", "dot", "dashdot"];
let perturbAmp = 0; // px of noise displacement on vertices
let facets = 1; // ruled lines per cut edge
let vanish = 0; // receding frames toward the shape (one-point perspective)
let gridLines = 0; // op-art grid lines per cell
let gridWarp = 40; // grid compression toward cell center (0-100)
let tone = 0; // plate gray level, ramped across the grid of cells
let converge = 0; // pull all cut targets toward one global vanishing point
let radiate = 0; // spokes from VP through shape vertices (chains converge)
let attract = 0; // pull plate vertices toward the VP (chains converge)
let extend = 0; // lengthen cut lines past converged corners (chains converge)
let trailCount = 0; // ghost outlines of past animation frames
let motionSpeed = 0.3; // global animation speed multiplier
let orbitDeg = 0; // max rotation about plate centroid (degrees)
let serial = 0; // LeWitt serial blend across the cell grid (0-100)
let diagonal = 0; // plate diagonals + cross-column corner transversals
let normalLen = 0; // outward edge normal segments (px)
let project = 0; // projective row quad sliced per column (0-100)
let depth = 0; // VP-distance-scaled receding frames (additive)
let axis = 0; // construction lines through VP + centers (additive)
let bisect = 0; // center-to-frame-corner spokes (additive)
let chord = 0; // opposite-edge mid connectors (additive)
let fracture = 0; // skewed ruled splits along edges (additive)
let weave = 0; // shear-parallel bands across cell (additive)
let inflate = 0; // outward ghost contour (additive)
let twist = 0; // twisted ghost outline (additive)
let lineBleed = 0; // 0–200: construction lines extend past export frame (% of max side / side)
let vanishBleedOut = false; // bleed: continue vanish frames past the export frame
let vanishFromOut = false; // vanish frames fill from the outer frame inward
let primitiveMode = 1; // 1 = parallelogram plate, 2 = small circle
const CIRCLE_PRIMITIVE_SIZE = 20; // circle diameter (px) for mode 2

// edit modes — freeze motion, drag vertices, export partial svg
let drawMode = false;
let shapeMode = false;
let motionBeforeEdit = true;
const drawSelection = new Set();
const shapeSelection = new Set();
let shapePieces = []; // { id, rings: [[x,y][]] }
let shapePen = null; // open vertex list while drawing
let shapePieceSeq = 1;
let editDrag = null; // { panelIndex, corner } | { type, ... }
let editMarquee = null; // { x0, y0, x1, y1 }
const EDIT_HANDLE_R = 9;
const DRAW_EDGE_HIT = 7;
const SHAPE_SNAP = 0.6;

// accumulated animation clock (advances only while motion is on,
// so speed changes never cause the shapes to jump)
let animTime = 0;
let pieceSeed = 0;

// media export / embed helpers (window-scoped so media-export.js can reach them)
window.exportActive = false;
window.exportForceAnim = false;
window.exportTrailTick = 0;
// Set by the embedding page over postMessage (see the listener at the end).
// timeScale multiplies the frame delta every clock reads, so the camera, the
// spin and the panels' own drift all change pace together and stay in step.
// shiftX/shiftY move the finished picture, in percent of the view.
let embedTimeScale = 1;
let embedShiftX = 0;
let embedShiftY = 0;
// scale draws the piece larger (or smaller), its view drawn in round its
// middle by as much.
let embedScale = 1;
// pad: px of the frame, top, right, bottom and left, past the page's band:
// the view is fitted to the band alone, then carried on over the rest at
// the same scale, so the piece draws on past the band's edges (as /experiment-2's
// hero asks, October 6, 2026) rather than being cut at them.
let embedPad = [0, 0, 0, 0];
// Set by a seek (seekEmbed): the next frame adds no time of its own, the
// seek having put every clock where it should be. Without it the first
// frame after a hold (run: false) would add the whole hold again.
let embedSeeked = false;
// The lines' colour as last set by the page, drawn in currentColor once it
// is (the message handler at the end).
let embedInk = null;
// Whether the page holds the frame (run: false), so a change of the box
// generator's properties does not start it again while it is held.
let embedHeld = false;
const embedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
let embedSetupReady = false;
let embedRunning = false;
let viewScaleX = 1;
let viewScaleY = 1;

// Origin — constructive reveal once, then float forever (no timed loop)
let originMode = false;
let originProgress = 0; // 0..1 during build; then held at 1
let originComplete = false; // true after build → forever float
let originBuild = 3; // construction duration (seconds) — preview + code embed
let originEase = 75; // ease softness 0–100
let originDraw = 65; // how long each line takes to grow 0–100
let originStagger = 30; // edge cascade 0–100 (facets within an edge stay close)
let originPhase = 40; // lag between cut / vanish / radiate / extras 0–100
// Bloom (the home's hero, October 7, 2026): the build grown out of the
// vanishing point rather than drawn in toward it. The plates are where
// they are, at their full size, from the first frame, as asked; only the
// scaffolding that joins them to the point, a single pixel where every
// line meets, fills in from it out to them: the cut lines grow from the
// point to the plates' corners, and the receding frames come in from the
// point's end of the run to the plates' end.
let originBloom = false;
const ORIGIN_EXPORT_BUILD = 0.55; // gif/mp4: fraction of sec spent constructing

function steelEmbed() {
  return typeof window !== "undefined" ? window.STEEL_EMBED || null : null;
}

function setup() {
  const embed = steelEmbed();
  if (embed) {
    document.documentElement.classList.add("steel-embed");
    document.body.classList.add("steel-embed");
    for (const id of ["controls", "shortcuts", "colorHud", "app-tabs", "pairs-screen", "hero-screen"]) {
      document.getElementById(id)?.remove();
    }
  }

  applyEmbedBoot();

  // Embeds paint SVG; p5 needs only a lifecycle canvas, including its
  // backing store. CSS sizing alone still allocated a 1466x1030 buffer.
  if (embed) pixelDensity(1);
  const c = createCanvas(embed ? 1 : canvasPixelWidth(), embed ? 1 : canvasPixelHeight());
  c.parent(embed ? document.body : "canvas-host");
  c.elt.setAttribute("tabindex", "0");
  c.elt.style.outline = "none";
  if (embed) {
    // Keep a tiny offscreen canvas for p5 lifecycle; paint SVG into the stage.
    c.elt.style.cssText =
      "position:absolute;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none";
    let stage = document.getElementById("steel-stage");
    if (!stage) {
      stage = document.createElement("div");
      stage.id = "steel-stage";
      stage.setAttribute("aria-label", "(steel) box");
      document.body.appendChild(stage);
    }
    stage.style.cssText = `width:${embed.width}px;height:${embed.height}px;line-height:0`;
  } else {
    pixelDensity(displayDensity());
  }

  if (embed?.panels?.length) {
    panels = embed.panels.map(clonePanel);
  } else {
    regenerate();
  }

  if (embed) {
    motion = embed.settings?.motion !== false;
    if (embed.hero) {
      const stage = document.getElementById("steel-stage");
      if (stage) {
        stage.style.cssText =
          "position:fixed;inset:0;width:100vw;height:100vh;overflow:hidden;line-height:0";
        stage.setAttribute("aria-label", "(steel) hero");
      }
      steelReady = true;
      beginHero();
      embedSetupReady = true;
      syncEmbedMotion(true);
      return;
    }
    embedSetupReady = true;
    syncEmbedMotion(true);
    return;
  }

  noLoop();
  if (motion) loop();
  else redraw();
}

function clonePanel(p) {
  return {
    x: p.x,
    y: p.y,
    w: p.w,
    h: p.h,
    shear: p.shear,
    phase: p.phase ?? 0,
    speed: p.speed ?? 0.5,
    inners: Array.isArray(p.inners)
      ? p.inners.map((inner) => ({ ...inner }))
      : [],
    drawVerts: Array.isArray(p.drawVerts)
      ? p.drawVerts.map(([x, y]) => [x, y])
      : null,
    trail: [],
  };
}

function applyEmbedBoot() {
  const embed = steelEmbed();
  if (!embed) {
    viewScaleX = 1;
    viewScaleY = 1;
    return;
  }
  const settings = embed.settings;
  if (settings) applySettingsData(settings);
  if (embed.origin != null) originMode = !!embed.origin;
  else if (settings?.origin != null) originMode = !!settings.origin;
  const logicalW = Math.max(1, canvasWidth());
  const logicalH = Math.max(1, canvasHeight());
  const ew = Math.max(2, Math.round(Number(embed.width) || logicalW));
  const eh = Math.max(2, Math.round(Number(embed.height) || logicalH));
  embed.width = ew - (ew % 2);
  embed.height = eh - (eh % 2);
  viewScaleX = embed.width / logicalW;
  viewScaleY = embed.height / logicalH;
  if (typeof embed.animTime === "number") animTime = embed.animTime;
  if (embed.hero) {
    viewScaleX = 1;
    viewScaleY = 1;
  }
  if (originMode) {
    originProgress = 0;
    originComplete = false;
  }
}

function normalizeHex(c) {
  if (!c || typeof c !== "string") return "#000000";
  let h = c.trim();
  if (h[0] !== "#") h = "#" + h;
  const m = h.match(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/);
  if (!m) return h.toUpperCase();
  if (m[1].length === 3) {
    const [a, b, c2] = m[1].split("");
    return `#${a}${a}${b}${b}${c2}${c2}`.toUpperCase();
  }
  return h.toUpperCase();
}

function hexToRgb(hex) {
  const h = normalizeHex(hex).slice(1);
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbHex(rgb) {
  const h = (n) => constrain(round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${h(rgb[0])}${h(rgb[1])}${h(rgb[2])}`;
}

function rgbEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

function shapeNeedsInkStroke(rgb) {
  return !rgbEquals(rgb, INK);
}

function normalizeStrokeStyle(value) {
  const v = String(value || "solid").toLowerCase();
  return STROKE_STYLES.includes(v) ? v : "solid";
}

function applySettingsData(data) {
  if (!data) return false;

  if (data.w != null) {
    cellW = constrain(Math.round(Number(data.w) || 500), 100, 2000);
  }
  if (data.h != null) {
    cellH = constrain(Math.round(Number(data.h) || 500), 100, 2000);
  }
  if (data.bg) {
    BG = hexToRgb(data.bg);
    BG_HEX = normalizeHex(data.bg);
  }
  if (data.ink) {
    INK = hexToRgb(data.ink);
    INK_HEX = normalizeHex(data.ink);
  }
  if (data.fill) {
    const raw = String(data.fill).trim().toLowerCase();
    FILL_NONE = raw === "none" || raw === "transparent";
    // Keep a real triple behind the flag so anything that reads FILL still
    // gets a colour; nothing paints it while FILL_NONE is set.
    FILL = FILL_NONE ? hexToRgb("#ffffff") : hexToRgb(data.fill);
    FILL_HEX = FILL_NONE ? "none" : normalizeHex(data.fill);
  } else if (data.ink) {
    FILL = [...INK];
    FILL_HEX = INK_HEX;
  }

  const assign = {
    stroke: (v) => (strokeW = v),
    perturb: (v) => (perturbAmp = v),
    facets: (v) => (facets = v),
    vanish: (v) => (vanish = v),
    grid: (v) => (gridLines = v),
    warp: (v) => (gridWarp = v),
    tone: (v) => (tone = v),
    orbit: (v) => (orbitDeg = v),
    serial: (v) => (serial = v),
    diagonal: (v) => (diagonal = v),
    normal: (v) => (normalLen = v),
    project: (v) => (project = v),
    converge: (v) => (converge = v),
    radiate: (v) => (radiate = v),
    attract: (v) => (attract = v),
    extend: (v) => (extend = v),
    trails: (v) => (trailCount = v),
    speed: (v) => (motionSpeed = v),
    depth: (v) => (depth = v),
    axis: (v) => (axis = v),
    bisect: (v) => (bisect = v),
    chord: (v) => (chord = v),
    fracture: (v) => (fracture = v),
    weave: (v) => (weave = v),
    inflate: (v) => (inflate = v),
    twist: (v) => (twist = v),
    bleed: (v) => (lineBleed = v),
    obuild: (v) => (originBuild = v),
    oease: (v) => (originEase = v),
    odraw: (v) => (originDraw = v),
    ostagger: (v) => (originStagger = v),
    ophase: (v) => (originPhase = v),
    hspeed: (v) => (heroSpeed = v),
    hzoom: (v) => (heroZoom = v),
    hhold: (v) => (heroHold = v),
    hspin: (v) => (heroSpin = v),
    hturn: (v) => (heroTurn = v),
    hturnspd: (v) => (heroTurnSpeed = v),
    hlines: (v) => (heroLines = v),
    hconv: (v) => (heroConverge = v),
  };
  for (const [key, setter] of Object.entries(assign)) {
    if (data[key] != null) setter(Number(data[key]));
  }

  if (data.cuts != null) cutEdges = !!data.cuts;
  if (data.linkParent != null) linkLayerVerts = !!data.linkParent;
  if (data.linkCells != null) linkInnerPeers = !!data.linkCells;
  if (data.motion != null) motion = !!data.motion;
  if (data.origin != null) originMode = !!data.origin;
  if (data.vanishOut != null) vanishBleedOut = !!data.vanishOut;
  if (data.vanishFromOut != null) vanishFromOut = !!data.vanishFromOut;
  if (data.bloom != null) originBloom = !!data.bloom;
  if (data.style != null) strokeStyle = normalizeStrokeStyle(data.style);
  if (data.seed != null) pieceSeed = Math.max(1, Math.floor(Number(data.seed) || 1));
  if (data.cols != null) panelCount = constrain(Math.round(Number(data.cols)), 1, GRID_COLS_MAX);
  if (data.rows != null) rowCount = constrain(Math.round(Number(data.rows)), 1, GRID_ROWS_MAX);
  return true;
}

const GRID_COLS_MAX = 4;
const GRID_ROWS_MAX = 32;

function canvasWidth() {
  return cellW * panelCount;
}

function canvasHeight() {
  return cellH * rowCount;
}

// Margin beyond the frame where construction lines may render.
function bleedEnabled() {
  return lineBleed > 0 && panelCount === 1 && rowCount === 1;
}

function bleedContainerWidth() {
  if (typeof window === "undefined") return canvasWidth();
  const vw = document.documentElement.clientWidth || window.innerWidth;
  if (steelEmbed()) return vw;
  return vw;
}

function bleedContainerHeight() {
  if (typeof window === "undefined") return canvasHeight();
  const vh = document.documentElement.clientHeight || window.innerHeight;
  if (steelEmbed()) return vh;
  return vh;
}

function bleedReachX() {
  if (!bleedEnabled()) return 0;
  const fw = canvasWidth();
  const bleedFactor = lineBleed / 100;
  const edgeX = max(0, bleedContainerWidth() * 0.5 - fw * 0.5);
  const base = max(edgeX, fw * 0.35);
  return bleedFactor * base;
}

function bleedReachY() {
  if (!bleedEnabled()) return 0;
  const fh = canvasHeight();
  const bleedFactor = lineBleed / 100;
  const edgeY = max(0, bleedContainerHeight() * 0.5 - fh * 0.5);
  const base = max(edgeY, fh * 0.35);
  return bleedFactor * base;
}

function bleedCanvasPadX() {
  return bleedReachX();
}

function bleedCanvasPadY() {
  return bleedReachY();
}

function bleedExtraAt(growT = 1) {
  const u = constrain(growT, 0, 1);
  const mul = lineReachMul() * u;
  return { x: bleedReachX() * mul, y: bleedReachY() * mul };
}

function bleedSpillEnd(tipX, tipY, dirX, dirY, growT = 1) {
  const { x: ex, y: ey } = bleedExtraAt(growT);
  if (!bleedEnabled() || (ex <= 0 && ey <= 0)) return [tipX, tipY];
  const len = Math.hypot(dirX, dirY);
  if (len < 1e-6) return [tipX, tipY];
  return [tipX + (dirX / len) * ex, tipY + (dirY / len) * ey];
}

// Per-line timeline: grow to target → brief hold → bleed spill.
const BLEED_MAIN_SHARE = 0.62;
const BLEED_HOLD_SHARE = 0.14;

function bleedPhaseT(local) {
  const u = constrain(local, 0, 1);
  const mainEnd = BLEED_MAIN_SHARE;
  const holdEnd = mainEnd + BLEED_HOLD_SHARE;
  if (u <= mainEnd) return { mainT: originLineEase(u / mainEnd), bleedT: 0 };
  if (u <= holdEnd) return { mainT: 1, bleedT: 0 };
  return { mainT: 1, bleedT: originLineEase((u - holdEnd) / (1 - holdEnd)) };
}

function bleedAnimT(reveal, channel) {
  if (!reveal || !channel) return 1;
  return constrain(channel, 0, 1);
}

function lineReachMul() {
  if (!bleedEnabled()) return 1;
  return 1 + (lineBleed / 100) * 0.75;
}

function bleedExtendSeg(p, q, growT = 1) {
  if (!bleedEnabled()) return [p, q];
  const { x: ex, y: ey } = bleedExtraAt(growT);
  if (ex <= 0 && ey <= 0) return [p, q];
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) return [p, q];
  return [p, [q[0] + (dx / len) * ex, q[1] + (dy / len) * ey]];
}

function bleedExtendSegBoth(p, q, growT = 1) {
  if (!bleedEnabled()) return [p, q];
  const { x: ex, y: ey } = bleedExtraAt(growT);
  if (ex <= 0 && ey <= 0) return [p, q];
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) return [p, q];
  const ux = dx / len;
  const uy = dy / len;
  return [
    [p[0] - ux * ex, p[1] - uy * ey],
    [q[0] + ux * ex, q[1] + uy * ey],
  ];
}

function bleedExtendSegs(segs, growT = 1) {
  if (!bleedEnabled()) return segs;
  return segs.map(([p, q]) => bleedExtendSeg(p, q, growT));
}

function canvasPixelWidth() {
  return canvasWidth() + bleedCanvasPadX() * 2;
}

function canvasPixelHeight() {
  return canvasHeight() + bleedCanvasPadY() * 2;
}

function svgFrameMetrics(displaySize) {
  const fw = canvasWidth();
  const fh = canvasHeight();
  const vb = displaySize?.viewBox || { x: 0, y: 0, w: fw, h: fh };
  const embed = steelEmbed();
  const frameW = displaySize?.width || embed?.width || fw;
  const frameH = displaySize?.height || embed?.height || fh;
  return {
    fw,
    fh,
    b: max(bleedReachX(), bleedReachY()),
    vb,
    frameW,
    frameH,
    svgW: frameW,
    svgH: frameH,
    clip: !!displaySize?.clip,
  };
}

function totalPanels() {
  return panelCount * rowCount;
}

function panelOffset(index) {
  const col = index % panelCount;
  const row = floor(index / panelCount);
  return [col * cellW, row * cellH];
}

function panelCenter(index) {
  const [ox, oy] = panelOffset(index);
  return [ox + cellW / 2, oy + cellH / 2];
}

function linkVertsGlobal(panelIndex, layer) {
  const panel = panels[panelIndex];
  const [ox, oy] = panelOffset(panelIndex);
  const local =
    layer === 0
      ? currentVertices(panel, panel, panelIndex)
      : currentVertices(panel.inners[layer - 1], panel, panelIndex);
  return local.map(([px, py]) => [px + ox, py + oy]);
}

function crossLinkLayerCount(panelA, panelB) {
  return min(1 + panelA.inners.length, 1 + panelB.inners.length);
}

// ---- shared geometry helpers ----

function ruledEdgeSegs(a1, a2, b1, b2, n) {
  const segs = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    segs.push([
      [lerp(a1[0], a2[0], t), lerp(a1[1], a2[1], t)],
      [lerp(b1[0], b2[0], t), lerp(b1[1], b2[1], t)],
    ]);
  }
  return segs;
}

function ruledCutSegs(fromVerts, toVerts, n) {
  const segs = [];
  for (let e = 0; e < 4; e++) {
    const f = (e + 1) % 4;
    segs.push(
      ...ruledEdgeSegs(fromVerts[e], fromVerts[f], toVerts[e], toVerts[f], n)
    );
  }
  return segs;
}

function crossLinkEdges(indexA, indexB, layer) {
  const va = linkVertsGlobal(indexA, layer);
  const vb = linkVertsGlobal(indexB, layer);
  const [cax, cay] = panelCenter(indexA);
  const [cbx, cby] = panelCenter(indexB);
  const dx = cbx - cax;
  const dy = cby - cay;

  if (abs(dx) >= abs(dy)) {
    return dx > 0 ? [va[1], va[2], vb[0], vb[3]] : [va[0], va[3], vb[1], vb[2]];
  }
  return dy > 0 ? [va[3], va[2], vb[0], vb[1]] : [va[0], va[1], vb[3], vb[2]];
}

function rotateVerts(verts, angleRad) {
  if (angleRad === 0) return verts;
  const cx = verts.reduce((s, p) => s + p[0], 0) / verts.length;
  const cy = verts.reduce((s, p) => s + p[1], 0) / verts.length;
  const c = Math.cos(angleRad);
  const s = Math.sin(angleRad);
  return verts.map(([px, py]) => {
    const dx = px - cx;
    const dy = py - cy;
    return [cx + dx * c - dy * s, cy + dx * s + dy * c];
  });
}

function effectiveDef(def, panelIndex) {
  if (serial === 0 || panelIndex === undefined) return def;

  const col = panelIndex % panelCount;
  const row = floor(panelIndex / panelCount);
  const tx = panelCount > 1 ? col / (panelCount - 1) : 0.5;
  const ty = rowCount > 1 ? row / (rowCount - 1) : 0.5;
  const blend = serial / 100;

  const minSize = 48;
  const maxShear = cellW - 2 * MARGIN - minSize;
  const targetShear = lerp(-maxShear * 0.7, maxShear * 0.7, tx);
  const targetW = lerp(minSize + 24, cellW - 2 * MARGIN - abs(targetShear) - 24, tx);
  const targetH = lerp(minSize + 24, cellH - 2 * MARGIN - 24, ty);
  const targetX =
    MARGIN -
    min(0, targetShear) +
    tx * (cellW - 2 * MARGIN - targetW - max(0, targetShear));
  const targetY = MARGIN + ty * (cellH - 2 * MARGIN - targetH);

  return {
    ...def,
    shear: lerp(def.shear, targetShear, blend),
    w: lerp(def.w, targetW, blend),
    h: lerp(def.h, targetH, blend),
    x: lerp(def.x, targetX, blend),
    y: lerp(def.y, targetY, blend),
  };
}

function lerpPt(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}

function bilinearQuad([tl, tr, br, bl], u, v) {
  const top = lerpPt(tl, tr, u);
  const bot = lerpPt(bl, br, u);
  return lerpPt(top, bot, v);
}

function rowProjectCorners(row) {
  const y0 = row * cellH;
  const y1 = y0 + cellH;
  const w = cellW * panelCount;
  const h = project / 100;
  const [vx, vy] = vanishingPoint();
  const taper = 0.75 * h;
  const topPull = 0.35 * h;
  return [
    [lerp(0, vx, taper), lerp(y0, vy, topPull)],
    [lerp(w, vx, taper), lerp(y0, vy, topPull)],
    [w, y1],
    [0, y1],
  ];
}

function projectSlice(panelIndex) {
  const row = floor(panelIndex / panelCount);
  const col = panelIndex % panelCount;
  const [ox, oy] = panelOffset(panelIndex);
  const corners = rowProjectCorners(row);
  const u0 = col / panelCount;
  const u1 = (col + 1) / panelCount;
  return [
    bilinearQuad(corners, u0, 0),
    bilinearQuad(corners, u1, 0),
    bilinearQuad(corners, u1, 1),
    bilinearQuad(corners, u0, 1),
  ].map(([px, py]) => [px - ox, py - oy]);
}

function edgeNormalSegs(verts, length) {
  if (length === 0) return [];
  const segs = [];
  for (let i = 0; i < verts.length; i++) {
    const j = (i + 1) % verts.length;
    const dx = verts[j][0] - verts[i][0];
    const dy = verts[j][1] - verts[i][1];
    const len = Math.hypot(dx, dy);
    if (len < 1e-6) continue;
    const nx = dy / len;
    const ny = -dx / len;
    const mx = (verts[i][0] + verts[j][0]) / 2;
    const my = (verts[i][1] + verts[j][1]) / 2;
    segs.push([[mx, my], [mx + nx * length, my + ny * length]]);
  }
  return segs;
}

function plateDiagonalSegs(verts) {
  return [
    [verts[0], verts[2]],
    [verts[1], verts[3]],
  ];
}

function quadCentroid(verts) {
  return [
    verts.reduce((s, p) => s + p[0], 0) / verts.length,
    verts.reduce((s, p) => s + p[1], 0) / verts.length,
  ];
}

function contourRing(verts, f) {
  const [cx, cy] = quadCentroid(verts);
  return verts.map(([px, py]) => [px + (cx - px) * f, py + (cy - py) * f]);
}

function depthExtraFrames(outer, corners, panelIndex) {
  if (depth === 0) return [];
  const [cx, cy] = panelCenter(panelIndex);
  const [vx, vy] = vanishingPoint();
  const dist =
    Math.hypot(cx - vx, cy - vy) /
    max(1, max(canvasWidth(), canvasHeight()) * 0.65);
  const n = max(1, round((depth / 12) * (1 + dist * 2)));
  return vanishFrames(outer, corners, n, { bleedOutsets: false });
}

function axisSegs(outer, panelIndex) {
  if (axis === 0) return [];
  const [vx, vy] = vanishingPoint();
  const ext = (axis / 100) * max(canvasWidth(), canvasHeight()) * 1.5 * lineReachMul();
  const segs = [];
  const targets = [quadCentroid(outer), panelCenter(panelIndex)];

  for (const [cx, cy] of targets) {
    const dx = cx - vx;
    const dy = cy - vy;
    const len = Math.hypot(dx, dy);
    if (len < 1e-6) continue;
    const ux = dx / len;
    const uy = dy / len;
    segs.push(
      [[vx, vy], [cx + ux * ext, cy + uy * ext]],
      [[vx, vy], [cx - ux * ext, cy - uy * ext]]
    );
  }
  return segs;
}

function bisectSegs(outer, corners) {
  if (bisect === 0) return [];
  const [cx, cy] = quadCentroid(outer);
  const t = bisect / 100;
  return corners.map((c) => [[cx, cy], [lerp(cx, c[0], t), lerp(cy, c[1], t)]]);
}

function chordSegs(verts) {
  if (chord === 0) return [];
  const mid = (i, j) => lerpPt(verts[i], verts[j], 0.5);
  const m03 = mid(0, 3);
  const m12 = mid(1, 2);
  const m01 = mid(0, 1);
  const m23 = mid(2, 3);
  const t = chord / 100;
  return [
    [m03, lerpPt(m03, m12, t)],
    [m01, lerpPt(m01, m23, t)],
  ];
}

function fractureSegs(verts) {
  if (fracture === 0) return [];
  const splits = max(2, min(12, round(fracture / 8)));
  const span = max(cellW, cellH) * (fracture / 100) * 0.55;
  const segs = [];

  for (let e = 0; e < 4; e++) {
    const a = verts[e];
    const b = verts[(e + 1) % 4];
    for (let k = 1; k < splits; k++) {
      const p = lerpPt(a, b, k / splits);
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const len = Math.hypot(dx, dy);
      if (len < 1e-6) continue;
      const nx = -dy / len;
      const ny = dx / len;
      segs.push(
        [p, [p[0] + nx * span, p[1] + ny * span]],
        [p, [p[0] - nx * span, p[1] - ny * span]]
      );
    }
  }
  return segs;
}

function weaveSegs(outer, panelIndex) {
  if (weave === 0) return [];
  const [ox, oy] = panelOffset(panelIndex);
  const bands = max(2, round(weave / 10));
  const bl = outer[3];
  const br = outer[2];
  const bx = br[0] - bl[0];
  const by = br[1] - bl[1];
  const len = Math.hypot(bx, by) || 1;
  const ux = bx / len;
  const uy = by / len;
  const half = cellW * 0.72;
  const segs = [];

  for (let k = 1; k <= bands; k++) {
    const cy = oy + (k / (bands + 1)) * cellH;
    const cx = ox + cellW / 2;
    segs.push([
      [cx - ux * half, cy - uy * half],
      [cx + ux * half, cy + uy * half],
    ]);
  }
  return segs;
}

function inflateOutline(verts) {
  if (inflate === 0) return null;
  return contourRing(verts, -(inflate / 100) * 0.38);
}

function twistOutline(verts) {
  if (twist === 0) return null;
  const [cx, cy] = quadCentroid(verts);
  const maxR = max(...verts.map(([px, py]) => Math.hypot(px - cx, py - cy)));
  if (maxR < 1e-6) return verts;
  const twistAmt = (twist / 100) * 0.22;

  return verts.map(([px, py]) => {
    const dx = px - cx;
    const dy = py - cy;
    const r = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx) + twistAmt * (r / maxR);
    return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
  });
}

function hasAdditiveLines() {
  return (
    depth > 0 ||
    axis > 0 ||
    bisect > 0 ||
    chord > 0 ||
    fracture > 0 ||
    weave > 0 ||
    inflate > 0 ||
    twist > 0
  );
}

function gridPositions(n, span) {
  const pos = [];
  const w = gridWarp / 100;
  for (let k = 1; k <= n; k++) {
    const u = k / (n + 1);
    const v = 2 * u - 1;
    const vv = Math.sign(v) * Math.pow(Math.abs(v), 1 + 1.5 * w);
    pos.push((0.5 + 0.5 * vv) * span);
  }
  return pos;
}

function bulgePoint(px, py) {
  const b = (gridWarp / 100) * 0.55;
  if (b === 0) return [px, py];
  const nx = px / cellW - 0.5;
  const ny = py / cellH - 0.5;
  const r2 = nx * nx + ny * ny;
  const f = 1 + b * Math.max(0, 1 - r2 * 2);
  return [(0.5 + nx * f) * cellW, (0.5 + ny * f) * cellH];
}

function gridPolyline(vertical, p) {
  const pts = [];
  const STEPS = 24;
  const span = vertical ? cellH : cellW;
  for (let k = 0; k <= STEPS; k++) {
    const t = (k / STEPS) * span;
    pts.push(vertical ? bulgePoint(p, t) : bulgePoint(t, p));
  }
  return pts;
}

const VANISH_FRAME_MAX = 24;

function vanishRevealOrder() {
  const order = [];
  if (vanishFromOut) {
    for (let d = 0; d < VANISH_FRAME_MAX; d++) order.push(d);
  } else {
    for (let d = 0; d < VANISH_FRAME_MAX; d++) order.push(VANISH_FRAME_MAX - d);
  }
  return order;
}

function vanishBleedOutEnabled() {
  return vanishBleedOut && bleedEnabled();
}

function vanishBleedExtraStepCount(outerVerts, corners, vanishCount) {
  if (!vanishBleedOutEnabled() || vanishCount <= 0) return 0;
  const bleedPad = max(bleedCanvasPadX(), bleedCanvasPadY());
  if (bleedPad <= 0) return 0;
  let avgDepth = 0;
  for (let i = 0; i < outerVerts.length; i++) {
    avgDepth += dist(outerVerts[i][0], outerVerts[i][1], corners[i][0], corners[i][1]);
  }
  avgDepth /= max(1, outerVerts.length);
  const depthPerStep = avgDepth / (VANISH_FRAME_MAX + 1);
  const stepsToFillBleed = max(1, ceil(bleedPad / max(depthPerStep, 1)));
  return max(1, round((stepsToFillBleed * vanishCount) / VANISH_FRAME_MAX));
}

function trueOuterCorners(corners) {
  const c = constrain(converge / 100, 0, 0.999);
  if (c < 1e-6) return corners;
  const [vx, vy] = vanishingPoint();
  return corners.map(([px, py]) => [
    vx + (px - vx) / (1 - c),
    vy + (py - vy) / (1 - c),
  ]);
}

function vanishFrameAtStep(outerVerts, corners, step) {
  const f = step / (VANISH_FRAME_MAX + 1);
  const from = vanishFromOut ? trueOuterCorners(corners) : corners;
  return from.map((p, i) => [
    lerp(p[0], outerVerts[i][0], f),
    lerp(p[1], outerVerts[i][1], f),
  ]);
}

function vanishFrames(outerVerts, corners, n, { bleedOutsets = true } = {}) {
  const count = max(0, floor(n));
  if (count <= 0) return [];

  const steps = vanishRevealOrder().slice(0, min(count, VANISH_FRAME_MAX));
  const frames = steps.map((s) => vanishFrameAtStep(outerVerts, corners, s));

  if (!vanishFromOut && count >= VANISH_FRAME_MAX && !steps.includes(0)) {
    frames.push(vanishFrameAtStep(outerVerts, corners, 0));
  }

  if (bleedOutsets && vanishBleedOutEnabled()) {
    const extra = vanishBleedExtraStepCount(outerVerts, corners, count);
    const extras = [];
    for (let k = 1; k <= extra; k++) {
      extras.push(vanishFrameAtStep(outerVerts, corners, -k));
    }
    if (vanishFromOut) frames.unshift(...extras.reverse());
    else frames.push(...extras);
  }
  return frames;
}

function panelFillRgb(index) {
  if (tone === 0) return [...FILL];
  const [cx, cy] = panelCenter(index);
  const fx = abs(cx - canvasWidth() / 2) / max(1, canvasWidth() / 2);
  const fy = abs(cy - canvasHeight() / 2) / max(1, canvasHeight() / 2);
  const f = max(fx, fy);
  const lift = round(tone * (0.35 + 0.65 * f));
  return FILL.map((c) => min(255, c + lift));
}

function vanishingPoint() {
  const t = animTime;
  return [
    canvasWidth() / 2 + Math.sin(t * 0.21) * canvasWidth() * 0.12,
    canvasHeight() / 2 + Math.cos(t * 0.17) * canvasHeight() * 0.12,
  ];
}

function convergeChain() {
  return 0.35 + 0.65 * (converge / 100);
}

function panelCorners() {
  return [
    [0, 0],
    [cellW, 0],
    [cellW, cellH],
    [0, cellH],
  ];
}

function effectiveCorners(panelIndex) {
  const [ox, oy] = panelOffset(panelIndex);
  const corners = panelCorners().map(([px, py]) => [px + ox, py + oy]);
  if (converge === 0) return corners;
  const c = converge / 100;
  const [vx, vy] = vanishingPoint();
  return corners.map(([px, py]) => [lerp(px, vx, c), lerp(py, vy, c)]);
}

function effectiveCornersLocal(panelIndex) {
  const [ox, oy] = panelOffset(panelIndex);
  return effectiveCorners(panelIndex).map(([px, py]) => [px - ox, py - oy]);
}

function attractVerts(verts, panelIndex, amount) {
  if (amount === 0) return verts;
  const [ox, oy] = panelOffset(panelIndex);
  const [vx, vy] = vanishingPoint();
  const blend = (amount / 100) * convergeChain();
  return verts.map(([px, py]) => [
    lerp(px + ox, vx, blend) - ox,
    lerp(py + oy, vy, blend) - oy,
  ]);
}

function cutSegs(fromVerts, toVerts) {
  let segs = ruledCutSegs(fromVerts, toVerts, facets);
  if (extend > 0) {
    const extra =
      (extend / 100) *
      convergeChain() *
      max(canvasWidth(), canvasHeight()) *
      0.45 *
      lineReachMul();
    segs = segs.map(([p, q]) => {
      const dx = q[0] - p[0];
      const dy = q[1] - p[1];
      const len = Math.hypot(dx, dy);
      if (len < 1e-6) return [p, q];
      return [p, [q[0] + (dx / len) * extra, q[1] + (dy / len) * extra]];
    });
  }
  return segs;
}

function radiateSegs(verts, amount) {
  if (amount === 0) return [];
  const [vx, vy] = vanishingPoint();
  const ext =
    (amount / 100) * convergeChain() * max(canvasWidth(), canvasHeight()) * 0.9 * lineReachMul();
  const segs = [];
  for (const [px, py] of verts) {
    const dx = px - vx;
    const dy = py - vy;
    const len = Math.hypot(dx, dy);
    if (len < 1e-6) continue;
    segs.push([[vx, vy], [px + (dx / len) * ext, py + (dy / len) * ext]]);
  }
  return segs;
}

function recordTrails() {
  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    if (trailCount === 0) {
      if (panel.trail.length) panel.trail.length = 0;
      continue;
    }
    const tick = window.exportForceAnim
      ? window.exportTrailTick % 6 === 0
      : motion && frameCount % 6 === 0;
    if (tick) {
      panel.trail.push(currentVertices(panel, panel, i));
      while (panel.trail.length > trailCount) panel.trail.shift();
    }
  }
}

function trailRgb(index, len) {
  const t = (index + 1) / (len + 1);
  return INK.map((c, i) => round(lerp(c, BG[i], t)));
}

// ---- Origin constructive reveal ----

function isOriginActive() {
  return !!(originMode || steelEmbed()?.origin);
}

function originInBuildPhase() {
  return isOriginActive() && !originComplete;
}

function originSmooth(t) {
  const x = constrain(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function originLineEase(t) {
  const x = constrain(t, 0, 1);
  const soft = constrain(originEase / 100, 0, 1);
  const e = x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  return lerp(x, e, soft);
}

function originBuildT() {
  return originSmooth(constrain(originProgress, 0, 1));
}

function originBuildDuration() {
  const embed = steelEmbed();
  if (embed?.duration != null) return constrain(Number(embed.duration), 0.5, 30);
  return constrain(Number(originBuild) || 3, 0.5, 12);
}

function getOriginReveal() {
  if (!originInBuildPhase()) return null;
  const t = originBuildT();
  const lag = constrain(originPhase / 100, 0, 1);
  const cutSpan = lerp(0.92, 0.48, lag);
  const vanishStart = lerp(0.02, 0.2, lag);
  const radiateStart = lerp(0.06, 0.38, lag);
  const extrasStart = lerp(0.22, 0.58, lag);
  const vanishSpan = lerp(0.85, 0.42, lag);
  const radiateSpan = lerp(0.8, 0.4, lag);
  const extrasSpan = lerp(0.75, 0.4, lag);
  return {
    cuts: constrain(t / Math.max(0.08, cutSpan), 0, 1),
    vanish: constrain((t - vanishStart) / Math.max(0.08, vanishSpan), 0, 1),
    radiate: constrain((t - radiateStart) / Math.max(0.08, radiateSpan), 0, 1),
    extras: constrain((t - extrasStart) / Math.max(0.08, extrasSpan), 0, 1),
  };
}

function tickOrigin(dtSec) {
  if (!isOriginActive() || window.exportActive || originComplete) return;
  const dur = originBuildDuration();
  originProgress = min(1, originProgress + dtSec / dur);
  if (originProgress >= 1) {
    originProgress = 1;
    originComplete = true;
  }
}

function growSeg(p, q, t) {
  const u = constrain(t, 0, 1);
  if (u <= 0) return null;
  return [p, [lerp(p[0], q[0], u), lerp(p[1], q[1], u)]];
}

function growSegWithBleed(p, qFull, local) {
  const { mainT, bleedT } = bleedPhaseT(local);
  if (mainT <= 0 && bleedT <= 0) return null;
  const tip = [lerp(p[0], qFull[0], mainT), lerp(p[1], qFull[1], mainT)];
  if (!bleedEnabled() || bleedT <= 0) return [p, tip];
  const [endX, endY] = bleedSpillEnd(
    tip[0],
    tip[1],
    qFull[0] - p[0],
    qFull[1] - p[1],
    bleedT
  );
  return [p, [endX, endY]];
}

function originFacetCount() {
  return Math.max(1, facets);
}

function originGrownCutSegs(fromVerts, toVerts, cutT) {
  const n = originFacetCount();
  const base = ruledCutSegs(fromVerts, toVerts, n);
  const out = [];
  const perEdge = n + 1;
  const s = constrain(originStagger / 100, 0, 1);
  const edgeSpan = s * 0.4;
  const facetSpan = s * 0.06;
  const drawWin = lerp(0.4, 0.95, constrain(originDraw / 100, 0, 1));
  for (let i = 0; i < base.length; i++) {
    const edge = Math.floor(i / perEdge);
    const along = (i % perEdge) / Math.max(1, n);
    const start = (edge / 3) * edgeSpan + along * facetSpan;
    const local = originLineEase(constrain((cutT - start) / drawWin, 0, 1));
    const shapePt = base[i][0];
    const platePt = base[i][1];
    let grown;
    if (originBloom) {
      // From the point out to the plate, kept the right way round (the
      // plate's end first), so its near end still lies over the fill.
      const out = growSeg(platePt, shapePt, local);
      grown = out ? [out[1], out[0]] : null;
    } else if (vanishFromOut) {
      const outerPt = trueOuterCorners([platePt])[0];
      const inward = growSeg(outerPt, shapePt, local);
      grown = inward ? [inward[1], inward[0]] : null;
    } else {
      grown = growSegWithBleed(shapePt, platePt, local);
    }
    if (grown) out.push(grown);
  }
  if (extend > 0 && cutT > 0.45) {
    const extT = originLineEase(constrain((cutT - 0.45) / 0.55, 0, 1));
    const extra =
      (extend / 100) * convergeChain() * max(canvasWidth(), canvasHeight()) * 0.45 * extT;
    return out.map(([p, q]) => {
      const dx = q[0] - p[0];
      const dy = q[1] - p[1];
      const len = Math.hypot(dx, dy);
      if (len < 1e-6) return [p, q];
      return [p, [q[0] + (dx / len) * extra, q[1] + (dy / len) * extra]];
    });
  }
  return out;
}

function lerpQuad(a, b, t) {
  const n = Math.min(a.length, b.length);
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push([lerp(a[i][0], b[i][0], t), lerp(a[i][1], b[i][1], t)]);
  }
  return out;
}

function originVisibleVanishFrames(outer, corners, vanishT) {
  if (vanish <= 0 || vanishT <= 0) return [];
  const frames = vanishFrames(outer, corners, vanish);
  if (!frames.length) return [];
  if (originBloom) {
    // Nearest the point first, the first grown out of the point itself.
    const ordered = frames
      .map((frame) => [frame, Math.hypot(...quadCentroid(frame).map((c, k) => c - quadCentroid(corners)[k]))])
      .sort((a, b) => a[1] - b[1])
      .map(([frame]) => frame);
    const u = originLineEase(vanishT);
    const exact = ordered.length * u;
    const idx = Math.min(ordered.length - 1, Math.max(0, Math.floor(exact)));
    const frac = constrain(exact - idx, 0, 1);
    const out = ordered.slice(0, idx);
    out.push(lerpQuad(idx === 0 ? corners : ordered[idx - 1], ordered[idx], idx === 0 ? Math.max(frac, 0.04) : frac));
    return out;
  }
  const u = originLineEase(vanishT);
  const exact = frames.length * u;
  const idx = Math.min(frames.length - 1, Math.max(0, Math.floor(exact)));
  const frac = constrain(exact - idx, 0, 1);
  const out = frames.slice(0, idx);
  const from =
    idx === 0 ? (vanishFromOut ? trueOuterCorners(corners) : outer) : frames[idx - 1];
  const grown = lerpQuad(from, frames[idx], idx === 0 ? Math.max(frac, 0.04) : frac);
  out.push(grown);
  return out;
}

function originGrownRadiateSegs(verts, radiateT) {
  if (radiate <= 0 || radiateT <= 0) return [];
  const [vx, vy] = vanishingPoint();
  const s = constrain(originStagger / 100, 0, 1);
  const cornerSpan = s * 0.35;
  const drawWin = lerp(0.4, 0.95, constrain(originDraw / 100, 0, 1));
  const extFull =
    (radiate / 100) * convergeChain() * max(canvasWidth(), canvasHeight()) * 0.9;
  const segs = [];
  const last = Math.max(1, verts.length - 1);
  for (let i = 0; i < verts.length; i++) {
    const [px, py] = verts[i];
    const dx = px - vx;
    const dy = py - vy;
    const len = Math.hypot(dx, dy);
    if (len < 1e-6) continue;
    const ux = dx / len;
    const uy = dy / len;
    const tipFull = [px + ux * extFull, py + uy * extFull];
    const start = (i / last) * cornerSpan;
    const local = originLineEase(constrain((radiateT - start) / drawWin, 0, 1));
    const grown = vanishFromOut
      ? growSeg(tipFull, [px, py], local)
      : growSegWithBleed([px, py], tipFull, local);
    if (grown) segs.push(grown);
  }
  return segs;
}

// ---- hero camera ----

let heroSpeed = 22;
let heroZoom = 70;
let heroHold = 32;
let heroSpin = 18;
let heroTurn = 24;
let heroTurnSpeed = 12;
let heroLines = 40;
let heroConverge = 45;

let steelReady = false;
let heroClock = 0;
let heroCamT = 0;
let heroOriginSnap = null;

function isHeroScreen() {
  return document.body?.dataset?.screen === "hero" || !!steelEmbed()?.hero;
}

function heroStageEl() {
  return document.getElementById("hero-screen") || document.getElementById("steel-stage");
}

function heroSmooth(t) {
  const x = constrain(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function beginHero() {
  heroClock = 0;
  heroCamT = 0;
  heroOriginSnap = {
    originMode,
    originProgress,
    originComplete,
    converge,
  };
}

function heroDurationSec() {
  return lerp(64, 9, constrain(heroSpeed / 100, 0, 1));
}

function heroCycleAt(clock) {
  const dur = Math.max(4, heroDurationSec());
  const p = (clock % dur) / dur;
  const holdAmt = lerp(0.1, 0.52, constrain(heroHold / 100, 0, 1));
  const travel = (1 - holdAmt) / 2;
  if (p < travel) return heroSmooth(p / Math.max(0.001, travel));
  if (p < travel + holdAmt) {
    const holdU = (p - travel) / Math.max(0.001, holdAmt);
    return 0.985 + 0.015 * Math.sin(holdU * Math.PI * 2);
  }
  const u = (p - travel - holdAmt) / Math.max(0.001, travel);
  return 1 - heroSmooth(u);
}

function applyHeroLive(dtSec) {
  if (!heroOriginSnap) beginHero();
  heroClock += Math.max(0, dtSec);
  heroCamT = heroCycleAt(heroClock);
  const convAmt = constrain(heroConverge / 100, 0, 1);
  if (convAmt < 0.01) {
    if (heroOriginSnap.converge != null) converge = heroOriginSnap.converge;
  } else {
    const dur = Math.max(4, heroDurationSec());
    const u = 0.5 - 0.5 * Math.cos((heroClock / dur) * Math.PI * 2);
    converge = heroConverge * u;
  }
  if (heroOriginSnap.originMode) return;
  const amt = constrain(heroLines / 100, 0, 1);
  if (amt < 0.01) return;
  originMode = true;
  originComplete = false;
  originProgress = lerp(1 - amt, 1, heroCamT);
}

function heroSpinDeg() {
  const base = lerp(0, 90, constrain(heroTurn / 100, 0, 1));
  const vel = lerp(0, 36, constrain(heroTurnSpeed / 100, 0, 1));
  const amp = lerp(0, 28, constrain(heroSpin / 100, 0, 1));
  const dur = Math.max(4, heroDurationSec());
  const osc = amp < 0.05 ? 0 : Math.sin((heroClock / dur) * Math.PI * 2) * amp;
  return base + heroClock * vel + osc;
}

function heroPlateBounds() {
  const fw = canvasWidth();
  const fh = canvasHeight();
  if (!panels.length) {
    return { cx: fw / 2, cy: fh / 2, w: fw * 0.45, h: fh * 0.28 };
  }
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < panels.length; i++) {
    const [ox, oy] = panelOffset(i);
    const verts = currentVertices(panels[i], panels[i], i);
    for (const [px, py] of verts) {
      const x = px + ox;
      const y = py + oy;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (!Number.isFinite(minX)) {
    return { cx: fw / 2, cy: fh / 2, w: fw * 0.45, h: fh * 0.28 };
  }
  return {
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    w: Math.max(24, maxX - minX),
    h: Math.max(24, maxY - minY),
  };
}

function heroViewForFill(cx, cy, srcW, srcH, aspect, fill) {
  const f = constrain(fill, 0.12, 0.95);
  let h = srcH / f;
  let w = h * aspect;
  if (srcW / w > f) {
    w = srcW / f;
    h = w / aspect;
  }
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

function heroViewBox() {
  const fw = canvasWidth();
  const fh = canvasHeight();
  const [padT, padR, padB, padL] = embedPad;
  const vw = Math.max(2, (window.innerWidth || fw) - padL - padR);
  const vh = Math.max(2, (window.innerHeight || fh) - padT - padB);
  const aspect = vw / vh;
  const plate = heroPlateBounds();
  const z = constrain(heroZoom / 100, 0, 1);
  const wideFill = lerp(0.62, 0.36, z);
  const tightFill = lerp(0.62, 0.9, z);
  const wide = heroViewForFill(fw / 2, fh / 2, fw, fh, aspect, wideFill);
  const tight = heroViewForFill(plate.cx, plate.cy, plate.w, plate.h, aspect, tightFill);
  const t = constrain(heroCamT, 0, 1);
  const w = lerp(wide.w, tight.w, t) / embedScale;
  const h = lerp(wide.h, tight.h, t) / embedScale;
  const cx = lerp(wide.x + wide.w / 2, tight.x + tight.w / 2, t);
  const cy = lerp(wide.y + wide.h / 2, tight.y + tight.h / 2, t);
  // The band's view carried on over the pad, a px being w / vw of it; the
  // turn kept about the band's middle and the shift in the band's terms
  // (pivot, inner: buildSvg).
  const u = w / vw;
  return {
    x: cx - w / 2 - padL * u,
    y: cy - h / 2 - padT * u,
    w: w + (padL + padR) * u,
    h: h + (padT + padB) * u,
    pivot: [cx, cy],
    inner: { w, h },
  };
}

// Consume only buildSvg's own generated tags. Reuse SVG elements and
// their attributes rather than parsing/replacing the whole tree each
// frame. A parent cursor handles the reveal adding/removing paths, grid
// clips, and settings changing groups. Removed nodes are not cached.
function createSvgStage(stage) {
  const attributes = new WeakMap();
  const tags = /<(\/?)([\w:-]+)([^<>]*?)(\/?)>/g;
  const attr = /([\w:-]+)="([^"]*)"/g;
  const parents = [];
  let depth = 0;
  let frame = 0;
  const trim = (parent) => {
    while (parent.next) {
      const unused = parent.next;
      parent.next = unused.nextElementSibling;
      unused.remove();
    }
  };
  return {
    begin() {
      frame++;
      depth = 0;
      parents[0] = { node: stage, next: stage.firstElementChild };
    },
    push(...chunks) {
      for (const chunk of chunks) {
        tags.lastIndex = 0;
        let tag;
        while ((tag = tags.exec(chunk))) {
          if (tag[1]) {
            trim(parents[depth--]);
            continue;
          }
          const parent = parents[depth];
          let node = parent.next;
          if (!node || node.localName !== tag[2]) {
            const fresh = document.createElementNS("http://www.w3.org/2000/svg", tag[2]);
            if (node) parent.node.replaceChild(fresh, node);
            else parent.node.appendChild(fresh);
            node = fresh;
          }
          parent.next = node.nextElementSibling;
          let kept = attributes.get(node);
          if (!kept) attributes.set(node, (kept = Object.create(null)));
          attr.lastIndex = 0;
          let pair;
          while ((pair = attr.exec(tag[3]))) {
            const name = pair[1];
            const value = pair[2];
            if (!kept[name]) kept[name] = { value: null, frame: 0 };
            if (kept[name].value !== value) node.setAttribute(name, value);
            kept[name].value = value;
            kept[name].frame = frame;
          }
          for (const name in kept) {
            if (kept[name].frame !== frame) {
              node.removeAttribute(name);
              delete kept[name];
            }
          }
          if (!tag[4]) parents[++depth] = { node, next: node.firstElementChild };
        }
      }
    },
    finish() {
      trim(parents[0]);
      parents.length = 0;
    },
  };
}

const svgStages = new WeakMap();
function svgStageFor(stage) {
  let renderer = svgStages.get(stage);
  if (!renderer) svgStages.set(stage, (renderer = createSvgStage(stage)));
  return renderer;
}

function createCanvasStage(stage) {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "display:block;width:100%;height:100%";
  stage.replaceChildren(canvas);
  const ctx = canvas.getContext("2d");
  const tags = /<(\/?)([\w:-]+)([^<>]*?)(\/?)>/g;
  const attr = /([\w:-]+)="([^"]*)"/g;
  const groups = [];
  const clips = new Map();
  let clipId = null;
  let dpr = 1;
  let ink = "#000000";
  let screen = false;
  let fades = 0;

  const root = document.documentElement;
  const repaint = () => {
    if (!embedRunning && typeof redraw === "function") redraw();
  };
  const settle = () => {
    if (!fades) return;
    repaint();
    requestAnimationFrame(settle);
  };
  root.addEventListener("transitionrun", (event) => {
    if (event.target !== root || event.propertyName !== "color") return;
    if (!fades++) requestAnimationFrame(settle);
  });
  for (const type of ["transitionend", "transitioncancel"]) {
    root.addEventListener(type, (event) => {
      if (event.target !== root || event.propertyName !== "color") return;
      fades = Math.max(0, fades - 1);
      repaint();
    });
  }

  const colour = (value) => (value === "currentColor" ? ink : value);

  const trace = (points, closed, fill) => {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
    if (!closed) return;
    ctx.lineTo(points[0][0], points[0][1]);
    if (fill) ctx.closePath();
    else if (points.length > 2) ctx.lineTo(points[1][0], points[1][1]);
  };

  const strokeTraced = (stroke) => {
    ctx.strokeStyle = colour(stroke);
    if (!screen) {
      ctx.stroke();
      return;
    }
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.stroke();
    ctx.restore();
  };

  const fillTraced = (fill, alpha) => {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = colour(fill);
    ctx.fill("evenodd");
    ctx.globalAlpha = 1;
  };

  const frame = (a) => {
    const [vx, vy, vw, vh] = (a.viewBox || "0 0 1 1").split(/[\s,]+/).map(Number);
    const width = Number(a.width) || vw;
    const height = Number(a.height) || vh;
    dpr = Math.min(3, window.devicePixelRatio || 1);
    const pw = Math.max(1, Math.round(width * dpr));
    const ph = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pw, ph);
    const fit = /slice/.test(a.preserveAspectRatio || "") ? Math.max : Math.min;
    const s = fit(width / vw, height / vh);
    const tx = (width - vw * s) / 2 - vx * s;
    const ty = (height - vh * s) / 2 - vy * s;
    ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * tx, dpr * ty);
    const w = Math.max(0.25, Number(strokeW) || 1);
    ctx.lineWidth = w;
    ctx.lineCap = normalizeStrokeStyle(strokeStyle) === "dot" ? "round" : "butt";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 16;
    ctx.setLineDash(inkDashPattern());
  };

  const group = (a) => {
    const transform = a.transform;
    const clip = a["clip-path"]?.match(/url\(#([^)]+)\)/)?.[1];
    if (!transform && !clip) {
      groups.push(false);
      return;
    }
    ctx.save();
    const translate = transform?.match(/translate\(([^)]+)\)/);
    if (translate) {
      const [x, y = 0] = translate[1].split(/[\s,]+/).map(Number);
      ctx.translate(x, y);
    }
    const rotate = transform?.match(/rotate\(([^)]+)\)/);
    if (rotate) {
      const [deg, cx = 0, cy = 0] = rotate[1].split(/[\s,]+/).map(Number);
      ctx.translate(cx, cy);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.translate(-cx, -cy);
    }
    const box = clip && clips.get(clip);
    if (box) {
      ctx.beginPath();
      ctx.rect(box.x, box.y, box.w, box.h);
      ctx.clip();
    }
    groups.push(true);
  };

  return {
    begin() {
      groups.length = 0;
      clips.clear();
      clipId = null;
      screen = svgUseScreenStroke;
      ink = getComputedStyle(document.documentElement).color || INK_HEX;
    },
    push(...chunks) {
      for (const chunk of chunks) {
        tags.lastIndex = 0;
        let tag;
        while ((tag = tags.exec(chunk))) {
          const name = tag[2];
          if (tag[1]) {
            if (name === "g" && groups.pop()) ctx.restore();
            if (name === "clipPath") clipId = null;
            continue;
          }
          const a = {};
          attr.lastIndex = 0;
          let pair;
          while ((pair = attr.exec(tag[3]))) a[pair[1]] = pair[2];
          if (name === "svg") frame(a);
          else if (name === "g") group(a);
          else if (name === "clipPath") clipId = a.id;
          else if (name === "rect" && clipId) {
            clips.set(clipId, { x: Number(a.x) || 0, y: Number(a.y) || 0, w: Number(a.width) || 0, h: Number(a.height) || 0 });
          }
        }
      }
    },
    drawStroke(points, closed, stroke) {
      if (!points || points.length < 2) return;
      trace(points, closed, false);
      strokeTraced(stroke);
    },
    drawFill(points, fill, alpha = 1) {
      if (!points || points.length < 2 || !fill || fill === "none") return;
      trace(points, true, true);
      fillTraced(fill, alpha);
    },
    drawCircle(cx, cy, r, fill, alpha, stroke) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      if (fill && fill !== "none") fillTraced(fill, alpha);
      if (stroke) strokeTraced(stroke);
    },
    finish() {
      while (groups.length) if (groups.pop()) ctx.restore();
    },
  };
}

const canvasStages = new WeakMap();
function canvasStageFor(stage) {
  let renderer = canvasStages.get(stage);
  if (!renderer) canvasStages.set(stage, (renderer = createCanvasStage(stage)));
  return renderer;
}

// The frame's parent controls viewport visibility; motion preferences and
// tab visibility also gate p5's loop. A still embed shows the completed
// construction and can repaint for theme, size, and dial changes.
function syncEmbedMotion(repaint = false) {
  if (!steelEmbed() || !embedSetupReady) return;
  const reduced = embedMotionQuery?.matches;
  if (reduced) {
    originProgress = 1;
    originComplete = true;
  }
  const run = !reduced && !embedHeld && !document.hidden && (motion || (originMode && !originComplete));
  if (run) {
    if (!embedRunning) {
      embedSeeked = true;
      loop();
    }
  } else {
    noLoop();
    if (repaint && !document.hidden) {
      embedSeeked = true;
      redraw();
    }
  }
  embedRunning = run;
}

embedMotionQuery?.addEventListener("change", () => syncEmbedMotion(true));
document.addEventListener("visibilitychange", () => syncEmbedMotion(true));

function heroFrameRate() {
  const still = !heroZoom && !heroSpin && !heroTurnSpeed && !heroConverge && motionSpeed <= 0.5;
  return still && (!originMode || originComplete) ? 30 : 60;
}

function renderHeroFrame() {
  const stage = heroStageEl();
  if (!stage) return;
  if (steelEmbed() && typeof frameRate === "function") frameRate(heroFrameRate());
  if (motion) recordTrails();
  const vw = Math.max(2, window.innerWidth);
  const vh = Math.max(2, window.innerHeight);
  // No ground: the embedding page paints it, and a gradient there only
  // survives if this frame is transparent over it.
  stage.style.background = "transparent";
  svgUseScreenStroke = true;
  buildSvg({
    width: vw,
    height: vh,
    viewBox: heroViewBox(),
    clip: true,
    slice: true,
    rotate: heroSpinDeg(),
    shift: [embedShiftX, embedShiftY],
  }, {}, canvasStageFor(stage));
  svgUseScreenStroke = false;
}

function animatingNow() {
  return motion || !!window.exportForceAnim;
}

function draw() {
  const held = steelEmbed() && (embedMotionQuery?.matches || embedHeld || document.hidden);
  const dtSec = embedSeeked || held ? 0 : (deltaTime / 1000) * embedTimeScale;
  embedSeeked = false;
  if (!window.exportActive && motion) animTime += dtSec * motionSpeed;
  if (isHeroScreen()) applyHeroLive(dtSec);
  if (!isHeroScreen() || heroOriginSnap?.originMode) tickOrigin(dtSec);
  if (steelEmbed() && embedMotionQuery?.matches) {
    originProgress = 1;
    originComplete = true;
  }
  if (steelEmbed() && !motion && originComplete) syncEmbedMotion();

  if (isHeroScreen()) {
    renderHeroFrame();
    return;
  }

  if (steelEmbed()) {
    if (motion) recordTrails();
    const stage = document.getElementById("steel-stage");
    if (stage) {
      const m = svgFrameMetrics();
      stage.style.cssText = `width:${m.frameW}px;height:${m.frameH}px;line-height:0;overflow:visible`;
      buildSvg(undefined, {}, svgStageFor(stage));
    }
  }
}

// ---- shape generation ----

function shearBounds(def) {
  return [MARGIN - def.x, cellW - MARGIN - def.x - def.w];
}

function animatedShear(def, panel, t) {
  const [lo, hi] = shearBounds(def);
  const amp = min(def.shear - lo, hi - def.shear) * 0.85;
  if (amp <= 0) return def.shear;
  return constrain(def.shear + sin(t * panel.speed + panel.phase) * amp, lo, hi);
}

function animatedY(def, panel, t) {
  const lo = MARGIN;
  const hi = cellH - MARGIN - def.h;
  const amp = min(def.y - lo, hi - def.y) * 0.85;
  if (amp <= 0) return def.y;
  return constrain(
    def.y + sin(t * panel.speed * 0.65 + panel.phase + 1.4) * amp,
    lo,
    hi
  );
}

function perturbVerts(verts) {
  if (perturbAmp === 0) return verts;
  const t = animTime * 0.4;
  return verts.map(([px, py]) => [
    px + (noise(px * 0.012, py * 0.012, t) - 0.5) * 2 * perturbAmp,
    py + (noise(px * 0.012 + 77, py * 0.012 + 77, t) - 0.5) * 2 * perturbAmp,
  ]);
}

function primitiveIsCircle() {
  return primitiveMode === 2;
}

function vertsCentroid(verts) {
  let cx = 0;
  let cy = 0;
  for (const [px, py] of verts) {
    cx += px;
    cy += py;
  }
  const n = Math.max(1, verts.length);
  return [cx / n, cy / n];
}

function circleBoxVerts(verts) {
  const [cx, cy] = vertsCentroid(verts);
  const r = CIRCLE_PRIMITIVE_SIZE / 2;
  return [
    [cx - r, cy - r],
    [cx + r, cy - r],
    [cx + r, cy + r],
    [cx - r, cy + r],
  ];
}

function circleFromVerts(verts) {
  const [cx, cy] = vertsCentroid(verts);
  let r = 0;
  for (const [px, py] of verts) r += Math.hypot(px - cx, py - cy);
  r /= Math.max(1, verts.length);
  return { cx, cy, r: r / Math.SQRT2 };
}

function currentVertices(def, panel, panelIndex, deform = true) {
  if (def === panel && panel.drawVerts) {
    return panel.drawVerts.map(([px, py]) => [px, py]);
  }

  const base = def === panel ? effectiveDef(def, panelIndex) : def;
  const t = animTime;
  const live = animatingNow();
  const shear = live ? animatedShear(base, panel, t) : base.shear;
  const y = live ? animatedY(base, panel, t) : base.y;
  const x = base.x;

  let verts = perturbVerts([
    [x, y],
    [x + base.w, y],
    [x + base.w + shear, y + base.h],
    [x + base.shear, y + base.h],
  ]);

  if (orbitDeg > 0 && live) {
    const angle = Math.sin(t * panel.speed + panel.phase) * ((orbitDeg * Math.PI) / 180);
    verts = rotateVerts(verts, angle);
  }

  if (deform && project > 0 && def === panel && panelIndex !== undefined) {
    const slice = projectSlice(panelIndex);
    const blend = project / 100;
    verts = verts.map((p, i) => [
      lerp(p[0], slice[i][0], blend),
      lerp(p[1], slice[i][1], blend),
    ]);
  }

  if (deform && attract > 0 && def === panel && panelIndex !== undefined) {
    verts = attractVerts(verts, panelIndex, attract);
  }

  if (primitiveIsCircle()) return circleBoxVerts(verts);

  return verts;
}

function randomShape() {
  const minSize = 48;
  const maxShear = cellW - 2 * MARGIN - minSize;
  const shear = random(-maxShear, maxShear);

  const maxW = cellW - 2 * MARGIN - abs(shear);
  const w = random(minSize, maxW);

  const maxH = cellH - 2 * MARGIN;
  const h = random(minSize, maxH);

  const xMin = MARGIN - min(0, shear);
  const xMax = cellW - MARGIN - w - max(0, shear);
  const x = random(xMin, xMax);

  const y = random(MARGIN, cellH - MARGIN - h);

  return { x, y, w, h, shear };
}

function randomPanel() {
  return {
    ...randomShape(),
    inners: [],
    drawVerts: null,
    phase: random(TWO_PI),
    speed: random(0.35, 0.9),
    trail: [],
  };
}

function applyPieceSeed(seed) {
  pieceSeed = Math.max(1, Math.floor(Number(seed) || 1));
  randomSeed(pieceSeed);
  noiseSeed(pieceSeed);
}

function nextRandomSeed() {
  return Math.floor(Math.random() * 2147483646) + 1;
}

function regenerate({ newSeed = false } = {}) {
  if (newSeed || pieceSeed <= 0) applyPieceSeed(nextRandomSeed());
  else applyPieceSeed(pieceSeed);

  panels = [];
  for (let i = 0; i < totalPanels(); i++) panels.push(randomPanel());

  if (originMode && !window.exportActive) {
    originProgress = 0;
    originComplete = false;
  }
  if (steelEmbed()) syncEmbedMotion(true);
  else if (motion) loop();
  else redraw();
}

// ---- svg ----

function svgNum(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return "0";
  return String(Math.round(v * 1000) / 1000);
}

function svgPoint([px, py]) {
  return `${svgNum(px)},${svgNum(py)}`;
}

let svgUseScreenStroke = false;

function inkDashPattern() {
  const w = Math.max(0.25, Number(strokeW) || 1);
  switch (normalizeStrokeStyle(strokeStyle)) {
    case "dash":
      return [w * 4.5, w * 2.8];
    case "long":
      return [w * 11, w * 3.2];
    case "dot":
      return [0.01, w * 2.4];
    case "dashdot":
      return [w * 5.5, w * 2.2, 0.01, w * 2.2];
    default:
      return [];
  }
}

function svgStrokeAttrs() {
  const w = Math.max(0.25, Number(strokeW) || 1);
  const style = normalizeStrokeStyle(strokeStyle);
  const cap = style === "dot" ? "round" : "butt";
  const dash = inkDashPattern();
  const dashAttr =
    dash.length > 0 ? ` stroke-dasharray="${dash.map(svgNum).join(" ")}"` : "";
  const nss = svgUseScreenStroke ? ' vector-effect="non-scaling-stroke"' : "";
  return `stroke-width="${svgNum(w)}" stroke-linecap="${cap}" stroke-linejoin="miter" stroke-miterlimit="16"${dashAttr}${nss}`;
}

function strokePtKey([x, y]) {
  return `${Math.round(Number(x) * 1000)},${Math.round(Number(y) * 1000)}`;
}

function chainStrokeSegs(segs) {
  const items = [];
  for (const seg of segs) {
    if (!seg || seg.length < 2) continue;
    const a = seg[0];
    const b = seg[1];
    if (!a || !b) continue;
    if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 1e-6) continue;
    items.push([a, b]);
  }
  const n = items.length;
  const open = [];
  const closed = [];
  if (!n) return { open, closed };

  const adj = new Map();
  const add = (key, si, end) => {
    let arr = adj.get(key);
    if (!arr) {
      arr = [];
      adj.set(key, arr);
    }
    arr.push({ si, end });
  };
  for (let i = 0; i < n; i++) {
    add(strokePtKey(items[i][0]), i, 0);
    add(strokePtKey(items[i][1]), i, 1);
  }

  const used = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (used[i]) continue;
    used[i] = true;
    const pts = [items[i][0], items[i][1]];
    const extend = (dir) => {
      while (true) {
        const pt = dir === 0 ? pts[0] : pts[pts.length - 1];
        const all = adj.get(strokePtKey(pt)) || [];
        if (all.length !== 2) return;
        const nbrs = all.filter((x) => !used[x.si]);
        if (nbrs.length !== 1) return;
        const { si, end } = nbrs[0];
        used[si] = true;
        const next = items[si][1 - end];
        if (dir === 0) pts.unshift(next);
        else pts.push(next);
      }
    };
    extend(0);
    extend(1);
    if (pts.length < 2) continue;
    const loop =
      pts.length > 3 && strokePtKey(pts[0]) === strokePtKey(pts[pts.length - 1]);
    if (loop) {
      pts.pop();
      closed.push(pts);
    } else {
      open.push(pts);
    }
  }
  return { open, closed };
}

function svgPathD(points, closed, { fill = false } = {}) {
  if (!points || points.length < 2) return "";
  let d = `M${svgNum(points[0][0])} ${svgNum(points[0][1])}`;
  for (let i = 1; i < points.length; i++) {
    d += `L${svgNum(points[i][0])} ${svgNum(points[i][1])}`;
  }
  if (!closed) return d;
  d += `L${svgNum(points[0][0])} ${svgNum(points[0][1])}`;
  if (fill) d += "Z";
  else if (points.length > 2) {
    d += `L${svgNum(points[1][0])} ${svgNum(points[1][1])}`;
  }
  return d;
}

function svgStrokePath(lines, points, closed, stroke = INK_HEX) {
  if (lines.drawStroke) {
    lines.drawStroke(points, closed, stroke);
    return;
  }
  const d = svgPathD(points, closed);
  if (!d) return;
  lines.push(`<path d="${d}" fill="none" stroke="${stroke}" ${svgStrokeAttrs()}/>`);
}

function svgEmitSegs(lines, segs, stroke = INK_HEX) {
  const { open, closed } = chainStrokeSegs(segs);
  for (const pts of closed) svgStrokePath(lines, pts, true, stroke);
  for (const pts of open) svgStrokePath(lines, pts, false, stroke);
}

function svgLineSegs(lines, segs, stroke = INK_HEX) {
  svgEmitSegs(lines, bleedExtendSegs(segs), stroke);
}

function svgLineSegsRaw(lines, segs, stroke = INK_HEX) {
  svgEmitSegs(lines, segs, stroke);
}

function svgLineSegsAnimated(lines, segs, animT = 1, stroke = INK_HEX) {
  const { mainT, bleedT } = bleedPhaseT(animT);
  if (mainT <= 0 && bleedT <= 0) return;
  const grown = [];
  for (const [p, q] of segs) {
    const tip = [lerp(p[0], q[0], mainT), lerp(p[1], q[1], mainT)];
    if (!bleedEnabled() || bleedT <= 0) {
      grown.push([p, tip]);
      continue;
    }
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    if (Math.hypot(dx, dy) < 1e-6) {
      grown.push([p, tip]);
      continue;
    }
    const [endX, endY] = bleedSpillEnd(tip[0], tip[1], dx, dy, bleedT);
    grown.push([p, [endX, endY]]);
  }
  svgEmitSegs(lines, grown, stroke);
}

function svgBleedOutline(lines, verts, animT = 1, stroke = INK_HEX) {
  if (!verts || verts.length < 2) return;
  const { bleedT } = bleedPhaseT(animT);
  if (bleedT <= 0) {
    svgStrokePath(lines, verts, true, stroke);
    return;
  }
  const segs = [];
  for (let i = 0; i < verts.length; i++) {
    segs.push(bleedExtendSegBoth(verts[i], verts[(i + 1) % verts.length], bleedT));
  }
  svgEmitSegs(lines, segs, stroke);
}

function svgPolygon(lines, points, fill, stroke) {
  if (stroke && (!fill || fill === "none")) {
    svgStrokePath(lines, points, true, stroke);
    return;
  }
  if (fill && fill !== "none") {
    if (lines.drawFill) lines.drawFill(points, fill);
    else {
      const d = svgPathD(points, true, { fill: true });
      if (d) lines.push(`<path d="${d}" fill="${fill}" stroke="none"/>`);
    }
  }
  if (stroke) svgStrokePath(lines, points, true, stroke);
}

function svgPrimitive(lines, points, fill, stroke) {
  if (!primitiveIsCircle()) {
    svgPolygon(lines, points, fill, stroke);
    return;
  }
  const { cx, cy, r } = circleFromVerts(points);
  if (lines.drawCircle) {
    lines.drawCircle(cx, cy, r, fill, 1, stroke);
    return;
  }
  const strokeAttr = stroke ? ` stroke="${stroke}" ${svgStrokeAttrs()}` : ' stroke="none"';
  lines.push(
    `<circle cx="${svgNum(cx)}" cy="${svgNum(cy)}" r="${svgNum(r)}" fill="${fill}"${strokeAttr}/>`
  );
}

function svgPolyline(lines, points, stroke = INK_HEX) {
  if (lines.drawStroke) {
    lines.drawStroke(points, false, stroke);
    return;
  }
  const pts = points.map(svgPoint).join(" ");
  lines.push(
    `<polyline points="${pts}" fill="none" stroke="${stroke}" ${svgStrokeAttrs()}/>`
  );
}

function appendInkShapeSvg(lines, verts, rgb, alpha = 1) {
  const hex = FILL_NONE ? "none" : rgbHex(rgb);
  const a = constrain(alpha, 0, 1);
  if (a <= 0) return;
  // An unfilled plate still needs its outline, or it stops existing.
  const stroke = FILL_NONE || shapeNeedsInkStroke(rgb) ? INK_HEX : undefined;
  if (FILL_NONE || a >= 0.999) {
    svgPrimitive(lines, verts, hex, stroke);
    return;
  }
  if (lines.drawFill) {
    if (primitiveIsCircle()) {
      const { cx, cy, r } = circleFromVerts(verts);
      lines.drawCircle(cx, cy, r, hex, a, stroke);
      return;
    }
    lines.drawFill(verts, hex, a);
    if (stroke) svgStrokePath(lines, verts, true, stroke);
    return;
  }
  const strokeAttr = stroke ? ` stroke="${stroke}" ${svgStrokeAttrs()}` : ' stroke="none"';
  if (primitiveIsCircle()) {
    const { cx, cy, r } = circleFromVerts(verts);
    lines.push(
      `<circle cx="${svgNum(cx)}" cy="${svgNum(cy)}" r="${svgNum(r)}" fill="${hex}" fill-opacity="${svgNum(a)}"${strokeAttr}/>`
    );
    return;
  }
  const d = svgPathD(verts, true, { fill: true });
  if (d) {
    lines.push(
      `<path d="${d}" fill="${hex}" fill-opacity="${svgNum(a)}" stroke="none"/>`
    );
  }
  if (stroke) svgStrokePath(lines, verts, true, stroke);
}

function splitCutSeg(p, q, nearLen) {
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) return { near: [p, q], far: null };
  if (len <= nearLen) return { near: [p, q], far: null };
  const mid = [p[0] + (dx / len) * nearLen, p[1] + (dy / len) * nearLen];
  return { near: [p, mid], far: [mid, q] };
}

function appendAdditiveLinesSvg(lines, panelIndex, animT = 1) {
  const panel = panels[panelIndex];
  const [ox, oy] = panelOffset(panelIndex);
  const toGlobal = ([px, py]) => [px + ox, py + oy];
  const outer = currentVertices(panel, panel, panelIndex).map(toGlobal);
  const corners = effectiveCorners(panelIndex);

  let depthFrames = depthExtraFrames(outer, corners, panelIndex);
  if (originBloom && animT < 1) {
    // Bloom: the depth frames too come in from the point outward.
    const [vx, vy] = quadCentroid(corners);
    depthFrames = depthFrames
      .map((frame) => [frame, Math.hypot(quadCentroid(frame)[0] - vx, quadCentroid(frame)[1] - vy)])
      .sort((a, b) => a[1] - b[1])
      .slice(0, Math.ceil(depthFrames.length * constrain(animT, 0, 1)))
      .map(([frame]) => frame);
  }
  for (const frame of depthFrames) {
    if (bleedEnabled()) svgBleedOutline(lines, frame, animT);
    else svgStrokePath(lines, frame, true, INK_HEX);
  }

  svgLineSegsAnimated(lines, axisSegs(outer, panelIndex), animT);
  svgLineSegsAnimated(lines, bisectSegs(outer, corners), animT);
  svgLineSegsAnimated(lines, chordSegs(outer), animT);
  svgLineSegsAnimated(lines, fractureSegs(outer), animT);
  svgLineSegsAnimated(lines, weaveSegs(outer, panelIndex), animT);

  const inflated = inflateOutline(outer);
  if (inflated) {
    if (bleedEnabled()) svgBleedOutline(lines, inflated, animT);
    else svgStrokePath(lines, inflated, true, INK_HEX);
  }

  const twisted = twistOutline(outer);
  if (twisted) {
    if (bleedEnabled()) svgBleedOutline(lines, twisted, animT);
    else svgStrokePath(lines, twisted, true, INK_HEX);
  }
}

function buildSvg(displaySize, opts = {}, renderer) {
  const m = svgFrameMetrics(displaySize);
  const { vb, fw, fh, svgW, svgH, b } = m;
  const reveal = opts.finalState ? null : getOriginReveal();
  const overflowAttr = m.clip
    ? ' overflow="hidden"'
    : b > 0
      ? ' overflow="visible"'
      : "";
  const meet = displaySize?.slice ? "xMidYMid slice" : "xMidYMid meet";
  const lines = renderer ?? [];
  renderer?.begin();
  lines.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgNum(vb.x)} ${svgNum(vb.y)} ${svgNum(vb.w)} ${svgNum(vb.h)}" width="${svgNum(svgW)}" height="${svgNum(svgH)}"${overflowAttr} fill-rule="evenodd" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" preserveAspectRatio="${meet}">`);
  // Outside the rotation, so the picture moves as a whole and keeps turning
  // about its own middle rather than orbiting a pivot left behind.
  const shift = displaySize?.shift;
  const sx = shift ? ((vb.inner?.w ?? vb.w) * shift[0]) / 100 : 0;
  const sy = shift ? ((vb.inner?.h ?? vb.h) * shift[1]) / 100 : 0;
  if (sx || sy) lines.push(`<g transform="translate(${svgNum(sx)} ${svgNum(sy)})">`);
  const rot = Number(displaySize?.rotate ?? opts.rotate) || 0;
  if (rot) {
    lines.push(
      `<g transform="rotate(${svgNum(rot)} ${svgNum(vb.pivot?.[0] ?? vb.x + vb.w / 2)} ${svgNum(vb.pivot?.[1] ?? vb.y + vb.h / 2)})">`
    );
  }
  lines.push(`<g stroke="${INK_HEX}" fill="none" ${svgStrokeAttrs()}>`);

  if (gridLines > 0 && (!reveal || reveal.extras > 0.2)) {
    const gridAnim = reveal ? bleedAnimT(reveal, reveal.extras) : 1;
    for (let i = 0; i < panels.length; i++) {
      const [ox, oy] = panelOffset(i);
      const toGlobal = ([px, py]) => [px + ox, py + oy];
      if (bleedEnabled()) {
        for (const p of gridPositions(gridLines, cellW)) {
          const pts = gridPolyline(true, p).map(toGlobal);
          const segs = [];
          for (let k = 0; k < pts.length - 1; k++) segs.push([pts[k], pts[k + 1]]);
          svgLineSegsAnimated(lines, segs, gridAnim);
        }
        for (const p of gridPositions(gridLines, cellH)) {
          const pts = gridPolyline(false, p).map(toGlobal);
          const segs = [];
          for (let k = 0; k < pts.length - 1; k++) segs.push([pts[k], pts[k + 1]]);
          svgLineSegsAnimated(lines, segs, gridAnim);
        }
        continue;
      }
      lines.push(
        `<clipPath id="grid-cell-${i}"><rect x="${svgNum(ox)}" y="${svgNum(oy)}" width="${svgNum(cellW)}" height="${svgNum(cellH)}"/></clipPath>`,
        `<g clip-path="url(#grid-cell-${i})">`
      );
      for (const p of gridPositions(gridLines, cellW)) {
        svgPolyline(lines, gridPolyline(true, p).map(toGlobal), INK_HEX);
      }
      for (const p of gridPositions(gridLines, cellH)) {
        svgPolyline(lines, gridPolyline(false, p).map(toGlobal), INK_HEX);
      }
      lines.push("</g>");
    }
  }

  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    const [ox, oy] = panelOffset(i);
    const toGlobal = ([px, py]) => [px + ox, py + oy];
    const outer = currentVertices(panel, panel, i).map(toGlobal);
    const corners = effectiveCorners(i);

    if (!reveal) {
      for (let k = 0; k < panel.trail.length; k++) {
        svgPrimitive(
          lines,
          panel.trail[k].map(toGlobal),
          "none",
          rgbHex(trailRgb(k, panel.trail.length))
        );
      }
    }

    if (cutEdges && (converge > 0 || extend > 0)) {
      const farSegs = [];
      if (reveal) {
        if (reveal.cuts > 0) {
          for (const [p, q] of originGrownCutSegs(outer, corners, reveal.cuts)) {
            const { far } = splitCutSeg(p, q, CUT_NEAR_LEN);
            if (far) farSegs.push(far);
          }
          svgLineSegsRaw(lines, farSegs);
        }
      } else {
        for (const [p, q] of cutSegs(outer, corners)) {
          const { far } = splitCutSeg(p, q, CUT_NEAR_LEN);
          if (far) farSegs.push(far);
        }
        svgLineSegs(lines, farSegs);
      }
    }

    if (radiate > 0) {
      if (reveal) {
        if (reveal.radiate > 0) {
          svgLineSegsRaw(lines, originGrownRadiateSegs(outer, reveal.radiate));
        }
      } else {
        svgLineSegs(lines, radiateSegs(outer, radiate));
      }
    }

    if (vanish > 0) {
      const vFrames = reveal
        ? originVisibleVanishFrames(outer, corners, reveal.vanish)
        : vanishFrames(outer, corners, vanish);
      for (const frame of vFrames) svgStrokePath(lines, frame, true, INK_HEX);
    }

    if (diagonal > 0 && (!reveal || reveal.extras > 0.2)) {
      const extrasT = bleedAnimT(reveal, reveal?.extras);
      if (reveal) svgLineSegsAnimated(lines, plateDiagonalSegs(outer), extrasT);
      else svgLineSegs(lines, plateDiagonalSegs(outer));
    }

    if (normalLen > 0 && (!reveal || reveal.extras > 0.25)) {
      const extrasT = bleedAnimT(reveal, reveal?.extras);
      if (reveal) {
        svgLineSegsAnimated(lines, edgeNormalSegs(outer, normalLen), extrasT);
        for (const innerDef of panel.inners) {
          const inner = currentVertices(innerDef, panel, i).map(toGlobal);
          svgLineSegsAnimated(lines, edgeNormalSegs(inner, normalLen), extrasT);
        }
      } else {
        svgLineSegs(lines, edgeNormalSegs(outer, normalLen));
        for (const innerDef of panel.inners) {
          const inner = currentVertices(innerDef, panel, i).map(toGlobal);
          svgLineSegs(lines, edgeNormalSegs(inner, normalLen));
        }
      }
    }

    if (hasAdditiveLines() && (!reveal || reveal.extras > 0.35)) {
      appendAdditiveLinesSvg(lines, i, reveal ? bleedAnimT(reveal, reveal.extras) : 1);
    }
  }

  if (diagonal > 0 && panelCount >= 2 && (!reveal || reveal.extras > 0.35)) {
    for (let row = 0; row < rowCount; row++) {
      for (let corner = 0; corner < 4; corner++) {
        const pts = [];
        for (let col = 0; col < panelCount; col++) {
          const idx = row * panelCount + col;
          const [ox, oy] = panelOffset(idx);
          const verts = currentVertices(panels[idx], panels[idx], idx);
          pts.push([verts[corner][0] + ox, verts[corner][1] + oy]);
        }
        for (let k = 0; k < pts.length - 1; k++) {
          svgLineSegs(
            lines,
            ruledEdgeSegs(pts[k], pts[k], pts[k + 1], pts[k + 1], facets)
          );
        }
      }
    }
  }

  lines.push("</g>");

  lines.push(`<g fill-rule="evenodd">`);
  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    const [ox, oy] = panelOffset(i);
    const toGlobal = ([px, py]) => [px + ox, py + oy];
    const outer = currentVertices(panel, panel, i).map(toGlobal);
    const fillRgb = panelFillRgb(i);
    const corners = effectiveCorners(i);

    appendInkShapeSvg(lines, outer, fillRgb);

    for (const innerDef of panel.inners) {
      const inner = currentVertices(innerDef, panel, i).map(toGlobal);
      svgPrimitive(lines, inner, BG_HEX);
      appendInkShapeSvg(lines, inner, fillRgb);
    }

    if (cutEdges) {
      const splitFar = converge > 0 || extend > 0;
      const segs =
        reveal && reveal.cuts > 0
          ? originGrownCutSegs(outer, corners, reveal.cuts)
          : reveal
            ? []
            : cutSegs(outer, corners);
      const outSegs = [];
      for (const [p, q] of segs) {
        if (!splitFar) {
          outSegs.push([p, q]);
          continue;
        }
        const { near } = splitCutSeg(p, q, CUT_NEAR_LEN);
        outSegs.push(near);
      }
      if (reveal && reveal.cuts > 0) svgLineSegsRaw(lines, outSegs);
      else svgLineSegs(lines, outSegs);
    }

    if (linkLayerVerts && panel.inners.length > 0 && (!reveal || reveal.extras > 0.4)) {
      const extrasT = bleedAnimT(reveal, reveal?.extras);
      let container = currentVertices(panel, panel, i, false).map(toGlobal);
      for (const innerDef of panel.inners) {
        const inner = currentVertices(innerDef, panel, i).map(toGlobal);
        const linkSegs = cutSegs(inner, container);
        if (reveal) svgLineSegsAnimated(lines, linkSegs, extrasT);
        else svgLineSegs(lines, linkSegs);
        container = inner;
      }
    }
  }
  lines.push("</g>");

  if (linkInnerPeers && panels.length > 1 && (!reveal || reveal.extras > 0.5)) {
    lines.push(`<g stroke="${INK_HEX}" fill="none" ${svgStrokeAttrs()}>`);
    for (let a = 0; a < panels.length; a++) {
      for (let b2 = a + 1; b2 < panels.length; b2++) {
        const layers = crossLinkLayerCount(panels[a], panels[b2]);
        for (let L = 0; L < layers; L++) {
          const [a1, a2, b1, bb2] = crossLinkEdges(a, b2, L);
          svgLineSegs(lines, ruledEdgeSegs(a1, a2, b1, bb2, facets));
        }
      }
    }
    lines.push("</g>");
  }

  if (rot) lines.push("</g>");
  if (sx || sy) lines.push("</g>");
  lines.push("</svg>");
  if (renderer) {
    renderer.finish();
    return;
  }
  return lines.join("\n");
}

// The sketch never resizes its own canvas in hero mode — the stage is
// viewport-sized and the viewBox does the work — but the camera reads
// innerWidth/innerHeight, so a resize has to repaint.
window.addEventListener("resize", () => {
  if (steelEmbed()) syncEmbedMotion(true);
  else if (typeof redraw === "function" && !motion) redraw();
});

function seekEmbed(elapsedSec) {
  embedSeeked = true;
  const s = elapsedSec * embedTimeScale;
  const start = steelEmbed()?.animTime ?? 0;
  if (motion) animTime = start + s * motionSpeed;
  if (!heroOriginSnap) beginHero();
  heroClock = s;
  heroCamT = heroCycleAt(heroClock);
  if (heroOriginSnap.originMode || !isHeroScreen()) {
    originProgress = Math.min(1, s / originBuildDuration());
    originComplete = originProgress >= 1;
  }
}

// The embedding page's dials. Same origin only: this frame takes no
// instructions from anywhere else, and a stray message from another window
// should not be able to freeze or move it.
window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;
  applyHeroMessage(event.data);
});

// The page's settings, from its message or from the frame's own start
// (bootFromFrame, below).
function applyHeroMessage(data) {
  if (!data || data.type !== "steel-hero") return;
  if (Number.isFinite(data.speed)) embedTimeScale = Math.max(0, data.speed);
  if (Number.isFinite(data.x)) embedShiftX = data.x;
  if (Number.isFinite(data.y)) embedShiftY = data.y;
  if (Number.isFinite(data.scale) && data.scale > 0) embedScale = data.scale;
  if (Array.isArray(data.pad) && data.pad.length === 4 && data.pad.every(Number.isFinite)) {
    embedPad = data.pad.map((v) => Math.max(0, v));
  }
  // Seconds since the piece first started, on the page's shared clock: every
  // clock here is put where it would be had it run all that time, so a new
  // frame on another page picks up where the last one was.
  // (Not before p5 has set itself up, whose helpers the clocks use.)
  if (Number.isFinite(data.elapsed) && data.elapsed >= 0 && typeof lerp === "function") seekEmbed(data.elapsed);
  // The lines' colour, so a page draws it in its own text's colour: drawn
  // in currentColor and set on the document, so a new one can fade in as
  // the page's own colours do, on the time and curve it sends (fade, as
  // CSS has them), and at once without them or the first time.
  if (typeof data.ink === "string" && /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(data.ink)) {
    const ink = normalizeHex(data.ink);
    if (ink !== embedInk) {
      const fade = typeof data.fade === "string" && /^[\w\s.,()-]{1,80}$/.test(data.fade) ? data.fade : "0s";
      const root = document.documentElement.style;
      root.transition = embedInk ? `color ${fade}` : "none";
      root.color = ink;
      INK = hexToRgb(ink);
      INK_HEX = "currentColor";
      embedInk = ink;
    }
  }
  // Built already (hero-piece.tsx's built: the home's call to act, which
  // shows the hero's piece without its build, October 7, 2026): the build
  // done, the piece floating as it does after it.
  if (data.built === true && typeof lerp === "function" && !originComplete) {
    originProgress = 1;
    originComplete = true;
  }
  // The boxes' fill, as the page sends it (hero-piece.tsx's fill: the
  // home's surface, October 7, 2026): a hex, or transparent for none.
  if (typeof data.fill === "string" && /^(#[0-9a-f]{6}|transparent)$/i.test(data.fill) && typeof lerp === "function") {
    applySettingsData({ fill: data.fill });
  }
  // The box generator's properties, sent live by the home's panel
  // (box-generator-panel.tsx, October 7, 2026): the generator's own
  // settings, its colours left out (the page's, its dials'). A new seed,
  // grid or cell size lays the panels out again; origin's switch or a
  // replay builds the piece again from its start.
  if (data.settings && typeof data.settings === "object" && typeof lerp === "function") {
    const { bg, ink, fill, ...rest } = data.settings;
    const layout = () => [pieceSeed, panelCount, rowCount, cellW, cellH].join();
    const before = layout();
    const wasOrigin = originMode;
    applySettingsData(rest);
    // Reset: the embed's own panels back, as it was first drawn.
    if (data.restore && steelEmbed()?.panels?.length) panels = steelEmbed().panels.map(clonePanel);
    else if (data.regenerate || layout() !== before) regenerate();
    if (data.replay || originMode !== wasOrigin) {
      originProgress = 0;
      originComplete = false;
      beginHero();
    }
  }
  // Held while the page has no use for it (no band, or its band out of
  // sight) and run again, from where the seek above put it.
  if (data.run === false) embedHeld = true;
  if (data.run === true) embedHeld = false;
  syncEmbedMotion(true);
}

// The frame started by its own element, before the page's script is there
// to send it anything (hero-piece.tsx's data-steel-boot, October 9, 2026):
// its settings read off the element (same origin only), and its ink and
// fill worked out from the page's colours as the page works them out
// (css-hex.ts, hero-piece.tsx's solidHex): each drawn on a pixel and read
// back in sRGB, a fill that lets the ground through laid over the first
// ground behind the frame at least half opaque. So the piece builds as soon
// as it has loaded rather than once the page has hydrated, and what the page
// sends after agrees with it. Applied at once, after p5's setup (its load
// listener came first) and before its first frame.
function bootFromFrame() {
  let frame = null;
  try {
    frame = window.frameElement;
  } catch (error) {
    return;
  }
  const raw = frame && frame.getAttribute("data-steel-boot");
  if (!raw) return;
  let boot;
  try {
    boot = JSON.parse(raw);
  } catch (error) {
    return;
  }
  const host = frame.ownerDocument.defaultView;
  const pixel = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!host || !pixel) return;
  const paint = (colour) => {
    pixel.fillStyle = "#000000";
    pixel.fillStyle = colour;
    pixel.fillRect(0, 0, 1, 1);
  };
  const hex = (...colours) => {
    pixel.clearRect(0, 0, 1, 1);
    colours.forEach(paint);
    const [r, g, b] = pixel.getImageData(0, 0, 1, 1).data;
    return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
  };
  const alpha = (colour) => {
    pixel.clearRect(0, 0, 1, 1);
    paint(colour);
    return pixel.getImageData(0, 0, 1, 1).data[3];
  };
  const spill = Number.isFinite(boot.spill) ? boot.spill : 0;
  const message = {
    type: "steel-hero",
    ink: hex(host.getComputedStyle(frame).color),
    fade: "0s",
    speed: 1,
    x: boot.x,
    y: boot.y,
    scale: boot.scale,
    pad: [0, 0, (frame.clientHeight * spill) / (1 + spill), 0],
  };
  if (boot.built === true) message.built = true;
  if (typeof boot.fill === "string" && frame.parentElement) {
    if (/^(transparent|none)$/i.test(boot.fill.trim())) message.fill = "transparent";
    else {
      const probe = frame.ownerDocument.createElement("span");
      probe.style.color = boot.fill;
      frame.parentElement.append(probe);
      const colour = host.getComputedStyle(probe).color;
      probe.remove();
      let ground = "#ffffff";
      for (let at = frame.parentElement; at; at = at.parentElement) {
        const behind = host.getComputedStyle(at).backgroundColor;
        if (alpha(behind) > 127) {
          ground = behind;
          break;
        }
      }
      message.fill = hex(ground, colour);
    }
  }
  applyHeroMessage(message);
}
window.addEventListener("load", bootFromFrame);
