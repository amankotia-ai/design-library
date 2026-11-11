import assert from 'node:assert/strict';
import fs from 'node:fs';
import {filmStudies,studiesForEntry} from '../src/film-study-registry.js';

const entries=JSON.parse(fs.readFileSync('src/film-data.json','utf8'));
assert.equal(filmStudies.length,9,'Original scene plus eight new studies');
assert.equal(new Set(filmStudies.map(study=>study.id)).size,9);
for(const study of filmStudies.filter(item=>item.family)){
 const entry=entries.find(item=>item.id===study.id);
 assert.equal(entry?.kind,'study',`${study.id} has a working detail entry`);
 assert.ok(fs.existsSync('public'+entry.download),`${study.id} guide download exists`);
 assert.ok(fs.existsSync('public'+entry.mathSource),`${study.id} math download exists`);
}
for(const name of ['film-motion-math.js','film-timing-math.js'])assert.equal(fs.readFileSync('src/'+name,'utf8'),fs.readFileSync('public/film-motion/studies/'+name,'utf8'),`${name} download must match the executed functions`);
const camera=entries.find(item=>item.sourcePath.endsWith('/references/camera-and-motion.md'));
assert.ok(studiesForEntry(camera).some(study=>study.id==='camera-parallax'),'Camera guide links to real parallax model');
const speech=entries.find(item=>item.sourcePath.endsWith('/references/speech-led-editing.md'));
assert.ok(studiesForEntry(speech).some(study=>study.id==='speech-timing'),'Speech guide links to real timing model');
console.log('All nine study routes, eight guides, downloadable math sources and relevant-guide links verified.');
