const $ = s => document.querySelector(s), iframe = $('#film');
let film, current = 0, playing = false, last = 0, busy = false;
function stop() { playing = false; $('#play').textContent = 'Play'; }
function showError(error) { stop(); $('#error').textContent = error.message; }
async function draw(frame) {
  if (!film || busy) return;
  busy = true;
  try { current = Math.max(0, Math.min(film.meta.durationFrames - 1, frame)); await film.renderAt(current); $('#scrub').value = $('#frame').value = current.toFixed(2); $('#time').textContent = `${(current / film.meta.fps).toFixed(2)} s`; }
  catch (e) { showError(e); } finally { busy = false; }
}
function fit() { if (!film) return; const scale = $('#screen').clientWidth / film.meta.width; iframe.style.width = `${film.meta.width}px`; iframe.style.height = `${film.meta.height}px`; iframe.style.transform = `scale(${scale})`; $('#screen').style.height = `${film.meta.height * scale}px`; }
iframe.addEventListener('load', async () => { try { film = iframe.contentWindow.film; if (!film) throw new Error('No window.film contract found'); await film.ready; $('#title').textContent = film.meta.title; $('#scrub').max = $('#frame').max = film.meta.durationFrames - 1; fit(); await draw(0); } catch(e) { showError(e); } });
$('#play').onclick = () => { if (!film) return; if (playing) stop(); else { if (current >= film.meta.durationFrames - 1) current = 0; playing = true; last = performance.now(); $('#play').textContent = 'Pause'; } };
for (const id of ['scrub', 'frame']) $(`#${id}`).oninput = e => { stop(); draw(Number(e.target.value)); };
$('#back').onclick = () => { stop(); draw(Math.floor(current) - 1); };
$('#next').onclick = () => { stop(); draw(Math.floor(current) + 1); };
window.addEventListener('resize', fit);
document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
async function tick(now) { if (playing && film) { const next = current + (now - last) / 1000 * film.meta.fps * Number($('#speed').value); last = now; await draw(next); if (current >= film.meta.durationFrames - 1) stop(); } requestAnimationFrame(tick); }
requestAnimationFrame(tick);
