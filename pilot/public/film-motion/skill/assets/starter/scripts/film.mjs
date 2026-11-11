#!/usr/bin/env node
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
const runtimeRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hash = value => createHash('sha256').update(value).digest('hex');
function parse(argv) {
  const command = argv.shift() ?? 'help', flags = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) throw new Error(`Unexpected argument: ${argv[i]}`);
    const key = argv[i].slice(2);
    if (key === 'overwrite') flags[key] = true;
    else { if (!argv[i + 1] || argv[i + 1].startsWith('--')) throw new Error(`Missing value: --${key}`); flags[key] = argv[++i]; }
  }
  const allowed = ['project', 'scale', 'out', 'overwrite', 'frame', 'start', 'end', 'audio', 'port', 'timeout', 'crf'];
  for (const key of Object.keys(flags)) if (!allowed.includes(key)) throw new Error(`Unknown option: --${key}`);
  return { command, flags };
}
function num(value, fallback, name) { const n = value === undefined ? fallback : Number(value); if (!Number.isFinite(n)) throw new Error(`Invalid ${name}: ${value}`); return n; }
function within(root, candidate) { const rel = path.relative(root, candidate); return rel === '' || (!rel.startsWith(`..${path.sep}`) && rel !== '..' && !path.isAbsolute(rel)); }
async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }
async function commandOutput(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] }); let stdout = '', stderr = '';
    child.stdout.on('data', d => stdout += d); child.stderr.on('data', d => stderr += d);
    child.on('error', reject); child.on('close', code => code === 0 ? resolve(stdout.trim()) : reject(new Error(`${command} failed (${code}): ${stderr}`)));
  });
}
async function sources(root) {
  const files = [];
  async function walk(dir) {
    for (const entry of (await fs.readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      if (['node_modules', 'renders', '.git', '.DS_Store'].includes(entry.name) || entry.name.includes('.partial.')) continue;
      const p = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Source symlinks are unsupported: ${p}`);
      if (entry.isDirectory()) await walk(p);
      else if (entry.isFile()) files.push({ path: path.relative(root, p).split(path.sep).join('/'), bytes: (await fs.stat(p)).size, sha256: hash(await fs.readFile(p)) });
    }
  }
  await walk(root); return files;
}
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt; charset=utf-8', '.srt': 'application/x-subrip', '.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json' };
async function serve(root, requestedPort = 0) {
  const vendorRoot = await fs.realpath(path.join(runtimeRoot, 'node_modules/three/build'));
  const server = http.createServer(async (req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (pathname === '/favicon.ico') { res.writeHead(204).end(); return; }
      let base = root, relative = pathname === '/' ? 'preview.html' : pathname.slice(1);
      if (pathname.startsWith('/vendor/')) {
        base = vendorRoot; relative = pathname.slice('/vendor/'.length);
        if (!['three.module.js', 'three.core.js', 'three.module.min.js', 'three.core.min.js'].includes(relative)) { res.writeHead(404).end(); return; }
      }
      const candidate = path.resolve(base, relative);
      if (!within(base, candidate)) { res.writeHead(403).end(); return; }
      const actual = await fs.realpath(candidate);
      if (!within(base, actual) || !(await fs.stat(actual)).isFile()) { res.writeHead(403).end(); return; }
      const size = (await fs.stat(actual)).size;
      const headers = { 'Content-Type': mime[path.extname(actual)] ?? 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
      const match = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range ?? '');
      if (match) {
        const start = Number(match[1]), end = match[2] ? Math.min(size - 1, Number(match[2])) : size - 1;
        if (start > end || start >= size) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end(); return; }
        res.writeHead(206, { ...headers, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
        if (req.method === 'HEAD') res.end(); else createReadStream(actual, { start, end }).pipe(res);
      } else {
        res.writeHead(200, { ...headers, 'Accept-Ranges': 'bytes', 'Content-Length': size });
        if (req.method === 'HEAD') res.end(); else createReadStream(actual).pipe(res);
      }
    } catch (error) { res.writeHead(error.code === 'ENOENT' ? 404 : 400).end(); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(requestedPort, '127.0.0.1', resolve); });
  return { server, origin: `http://127.0.0.1:${server.address().port}` };
}
async function session(root, scale, timeout) {
  const hosted = await serve(root); let browser;
  try {
    browser = await chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--force-color-profile=srgb'] });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: scale, colorScheme: 'light', reducedMotion: 'reduce' });
    page.setDefaultTimeout(timeout);
    const errors = [];
    page.on('pageerror', e => errors.push(`Page: ${e.message}`));
    page.on('console', msg => { if (msg.type() === 'error') errors.push(`Console: ${msg.text()}`); });
    page.on('requestfailed', req => errors.push(`Request: ${req.url()} ${req.failure()?.errorText}`));
    page.on('response', res => { if (res.status() >= 400) errors.push(`HTTP ${res.status()}: ${res.url()}`); });
    await page.route('**/*', route => {
      const url = route.request().url();
      if (url.startsWith(`${hosted.origin}/`) || url.startsWith('data:') || url.startsWith('blob:')) return route.continue();
      errors.push(`External request blocked: ${url}`); return route.abort();
    });
    await page.goto(`${hosted.origin}/index.html?capture=1`, { waitUntil: 'load', timeout });
    await page.waitForFunction(() => !!window.film, null, { timeout });
    await page.evaluate(async timeout => {
      const f = window.film;
      if (!f.ready || typeof f.ready.then !== 'function' || typeof f.renderAt !== 'function') throw new Error('window.film requires ready: Promise and renderAt(frame)');
      await Promise.race([Promise.all([f.ready, document.fonts.ready]), new Promise((_, reject) => setTimeout(() => reject(new Error('Film readiness timeout')), timeout))]);
      await Promise.all([...document.images].map(async img => { await img.decode(); if (!img.naturalWidth) throw new Error(`Image failed: ${img.src}`); }));
      for (const face of document.fonts) if (face.status === 'error') throw new Error(`Font failed: ${face.family}`);
    }, timeout);
    const meta = await page.evaluate(() => window.film.meta);
    if (!meta || typeof meta.title !== 'string') throw new Error('film.meta.title is required');
    for (const key of ['width', 'height', 'fps', 'durationFrames']) if (!Number.isInteger(meta[key]) || meta[key] <= 0) throw new Error(`film.meta.${key} must be a positive integer`);
    if (meta.fps > 120 || meta.width > 7680 || meta.height > 7680) throw new Error('Metadata exceeds this renderer’s supported bounds');
    await page.setViewportSize({ width: meta.width, height: meta.height });
    const width = Math.round(meta.width * scale), height = Math.round(meta.height * scale);
    if (Math.abs(width - meta.width * scale) > 1e-6 || Math.abs(height - meta.height * scale) > 1e-6 || width % 2 || height % 2) throw new Error('Scaled dimensions must be even integers (H.264 4:2:0)');
    const assertClean = () => { if (errors.length) throw new Error([...new Set(errors)].join('\n')); };
    const capture = async frame => {
      if (!Number.isFinite(frame) || frame < 0 || frame >= meta.durationFrames) throw new Error(`Frame ${frame} outside [0, ${meta.durationFrames})`);
      await page.evaluate(async ({frame, timeout}) => {
        await Promise.race([Promise.resolve(window.film.renderAt(frame)), new Promise((_, reject) => setTimeout(() => reject(new Error('renderAt timeout')), timeout))]);
        if (document.getAnimations().some(a => a.playState === 'running')) throw new Error('Running CSS/Web Animations found: drive every animation from renderAt');
        if ([...document.querySelectorAll('video,audio')].some(m => !m.paused)) throw new Error('Playing media found: pause and seek local video explicitly in renderAt');
        await Promise.all([...document.images].filter(img => !img.complete).map(img => img.decode()));
      }, {frame, timeout});
      const png = await page.screenshot({ type: 'png', scale: 'device', caret: 'hide', timeout });
      assertClean(); return png;
    };
    await capture(0);
    const webgl = await page.evaluate(() => [...document.querySelectorAll('canvas')].flatMap(c => {
      const gl = c.getContext('webgl2') || c.getContext('webgl'); if (!gl) return [];
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      return [{ width: c.width, height: c.height, version: gl.getParameter(gl.VERSION), renderer: gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER), vendor: gl.getParameter(ext ? ext.UNMASKED_VENDOR_WEBGL : gl.VENDOR) }];
    }));
    assertClean();
    return { page, browser, meta, width, height, webgl, capture, close: async () => { await browser.close(); await new Promise(resolve => hosted.server.close(resolve)); } };
  } catch (error) { if (browser) await browser.close(); await new Promise(resolve => hosted.server.close(resolve)); throw error; }
}
async function probe(file) { return JSON.parse(await commandOutput('ffprobe', ['-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', file])); }
async function main() {
  const { command, flags } = parse(process.argv.slice(2));
  if (command === 'help' || command === '--help') { console.log(`Film runtime\n  npm run serve -- [--port 4173]\n  npm run still -- --frame 45.5 --out renders/styleframe.png [--scale .5]\n  npm run render -- --out renders/film.mp4 [--start 0 --end 90] [--scale .5] [--audio assets/music.wav] [--crf 16]\n  npm run check -- --out renders/check.json [--scale .5]\nCommon: --project DIR (defaults cwd), --overwrite (required to replace outputs), --timeout 30000\nFrames are absolute; end is exclusive. All external requests are blocked in export.\nRequires npm ci; npx playwright install chromium; system ffmpeg + ffprobe.`); return; }
  if (!['serve', 'still', 'render', 'check'].includes(command)) throw new Error(`Unknown command: ${command}`);
  const root = await fs.realpath(path.resolve(flags.project ?? process.cwd()));
  if (command === 'serve') {
    const port = num(flags.port, 4173, 'port'); if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid port');
    const hosted = await serve(root, port); console.log(`Preview: ${hosted.origin}/preview.html\nComposition: ${hosted.origin}/index.html\nStop with Ctrl+C`);
    process.once('SIGINT', () => hosted.server.close(() => process.exit(0))); return;
  }
  const scale = num(flags.scale, 1, 'scale'), timeout = num(flags.timeout, 30000, 'timeout');
  if (scale < .1 || scale > 2 || timeout < 1000) throw new Error('scale must be .1–2 and timeout at least 1000 ms');
  const ext = command === 'still' ? '.png' : command === 'render' ? '.mp4' : '.json';
  const out = path.resolve(root, flags.out ?? `renders/${command}${ext}`), manifestPath = `${out}.manifest.json`;
  if (path.extname(out) !== ext) throw new Error(`Output must end in ${ext}`);
  if (!flags.overwrite && (await exists(out) || await exists(manifestPath))) throw new Error(`Output exists; choose another path or pass --overwrite: ${out}`);
  await fs.mkdir(path.dirname(out), { recursive: true });
  const partial = path.join(path.dirname(out), `.${path.basename(out, ext)}-${process.pid}.partial${ext}`);
  const initialSources = await sources(root);
  const sess = await session(root, scale, timeout); let encoder;
  try {
    const packageJSON = JSON.parse(await fs.readFile(path.join(runtimeRoot, 'package.json'), 'utf8'));
    const manifest = { schemaVersion: 1, createdAt: new Date().toISOString(), mode: command, film: sess.meta, output: { path: path.relative(root, out), width: sess.width, height: sess.height, scale }, environment: { node: process.version, platform: process.platform, arch: process.arch, browser: sess.browser.version(), dependencies: { ...packageJSON.dependencies, ...packageJSON.devDependencies }, webgl: sess.webgl }, sourceFiles: initialSources, limitations: ['Pixel equality is verified in one pinned local browser/software WebGL environment, not guaranteed across operating systems or hardware.', 'Preview has no audio playback. Optional export audio starts at source time zero and is trimmed to the rendered frame range; short audio is padded with silence.', 'Fonts and all referenced imagery must be local; texture/model/font loader promises belong in film.ready.'] };
    if (command === 'still') {
      const frame = num(flags.frame, 0, 'frame'); await fs.writeFile(partial, await sess.capture(frame)); manifest.output.frame = frame;
    } else if (command === 'check') {
      const frames = [...new Set([0, Math.min(.5, sess.meta.durationFrames - .5), Math.floor(sess.meta.durationFrames * .25), Math.min(sess.meta.durationFrames - .5, sess.meta.durationFrames * .6 + .25), sess.meta.durationFrames - 1])];
      const baseline = new Map(); for (const frame of frames) baseline.set(frame, hash(await sess.capture(frame)));
      const checks = []; for (const frame of [...frames].reverse().concat(frames[1])) { const actual = hash(await sess.capture(frame)); checks.push({ frame, sha256: actual, same: actual === baseline.get(frame) }); }
      if (checks.some(c => !c.same)) throw new Error('Out-of-order determinism check failed');
      const report = { passed: true, frames: checks, webgl: sess.webgl, width: sess.width, height: sess.height, scope: 'Exact PNG hashes for repeated fractional/out-of-order frames in this local browser session; not a proof for every frame or cross-platform identity.' };
      await fs.writeFile(partial, JSON.stringify(report, null, 2) + '\n'); manifest.validation = report;
    } else {
      const start = num(flags.start, 0, 'start'), end = num(flags.end, sess.meta.durationFrames, 'end'), crf = num(flags.crf, 16, 'crf');
      if (![start, end, crf].every(Number.isInteger) || start < 0 || end > sess.meta.durationFrames || end <= start || crf < 0 || crf > 51) throw new Error('Require integer 0 <= start < end <= durationFrames; integer CRF 0–51');
      const count = end - start, duration = count / sess.meta.fps;
      const args = ['-hide_banner', '-loglevel', 'error', '-n', '-f', 'image2pipe', '-framerate', String(sess.meta.fps), '-vcodec', 'png', '-i', 'pipe:0'];
      if (flags.audio) {
        const audio = await fs.realpath(path.resolve(root, flags.audio));
        const ap = await probe(audio); if (!ap.streams.some(s => s.codec_type === 'audio')) throw new Error('Audio input has no audio stream');
        args.push('-ss', String(start / sess.meta.fps), '-i', audio);
        manifest.audio = { path: path.relative(root, audio), sha256: hash(await fs.readFile(audio)), seekSeconds: start / sess.meta.fps };
      }
      args.push('-map', '0:v:0');
      if (flags.audio) args.push('-map', '1:a:0', '-af', 'apad', '-c:a', 'aac', '-b:a', '320k');
      args.push('-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-vf', 'scale=in_range=full:out_range=tv:out_color_matrix=bt709,setparams=range=limited:color_primaries=bt709:color_trc=bt709:colorspace=bt709', '-r', String(sess.meta.fps), '-frames:v', String(count), '-t', String(duration), '-movflags', '+faststart', partial);
      manifest.environment.ffmpeg = (await commandOutput('ffmpeg', ['-version'])).split('\n')[0];
      manifest.environment.ffprobe = (await commandOutput('ffprobe', ['-version'])).split('\n')[0];
      manifest.encoderArguments = args.map(a => a === partial ? '<output>' : a);
      encoder = spawn('ffmpeg', args, { stdio: ['pipe', 'ignore', 'pipe'] }); let err = '', encoderError;
      encoder.stderr.on('data', d => err += d); encoder.on('error', e => encoderError = e); encoder.stdin.on('error', e => encoderError = e);
      const done = new Promise(resolve => encoder.on('close', code => resolve(code)));
      for (let frame = start; frame < end; frame++) {
        if (encoderError) throw encoderError;
        const png = await sess.capture(frame);
        if (!encoder.stdin.write(png)) await Promise.race([once(encoder.stdin, 'drain'), done.then(code => { throw new Error(`Encoder stopped (${code}): ${err}`); })]);
        if ((frame - start + 1) % Math.max(1, sess.meta.fps) === 0) console.log(`Rendered ${frame - start + 1}/${count} frames`);
      }
      encoder.stdin.end(); const code = await done; if (code !== 0) throw new Error(`ffmpeg failed (${code}): ${err}`);
      const result = await probe(partial), video = result.streams.find(s => s.codec_type === 'video');
      if (!video || video.width !== sess.width || video.height !== sess.height || Number(video.nb_read_frames) !== count || Math.abs(Number(video.duration) - duration) > 1 / sess.meta.fps) throw new Error('Export failed ffprobe dimensions, count, or duration validation');
      if (video.color_range !== 'tv' || video.color_space !== 'bt709' || video.color_transfer !== 'bt709' || video.color_primaries !== 'bt709') throw new Error('Export failed Rec.709 limited-range metadata validation');
      manifest.output = { ...manifest.output, startFrame: start, endFrameExclusive: end, frameCount: count, fps: sess.meta.fps, durationSeconds: duration, crf };
      manifest.validation = { passed: true, ffprobe: result };
    }
    const finalSources = await sources(root);
    const generated = new Set([path.relative(root, out), path.relative(root, manifestPath), path.relative(root, partial)].map(p => p.split(path.sep).join('/')));
    const normalize = list => list.filter(f => !generated.has(f.path));
    if (JSON.stringify(normalize(initialSources)) !== JSON.stringify(normalize(finalSources))) throw new Error('Source files changed during render; output not published');
    manifest.sourceFiles = normalize(initialSources); manifest.output.sha256 = hash(await fs.readFile(partial)); manifest.output.bytes = (await fs.stat(partial)).size;
    if (!flags.overwrite && (await exists(out) || await exists(manifestPath))) throw new Error('Output appeared during render; preserving it');
    await fs.rename(partial, out); await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`Saved ${out}\nManifest ${manifestPath}`);
  } finally { if (encoder && encoder.exitCode === null) encoder.kill(); await fs.rm(partial, { force: true }); await sess.close(); }
}
main().catch(error => { console.error(`Film runtime: ${error.message}`); process.exitCode = 1; });
