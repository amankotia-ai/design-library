import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {referenceBeatAtTime as at} from '/Users/abhishekmankotia/Documents/ChatGPT/Design Library/pilot/src/film-reference-timing.js';
const root='/Users/abhishekmankotia/Documents/ChatGPT/Design Library/pilot/src/';
const imports=JSON.parse(fs.readFileSync(root+'film-reference-imports.json'));
const craft=JSON.parse(fs.readFileSync(root+'film-reference-craft.json'));
assert.equal(craft.length,43);assert.equal(new Set(craft.map(x=>x.id)).size,43);
assert.deepEqual(new Set(craft.map(x=>x.id)),new Set(imports.map(x=>x.id)));
for(const film of craft){for(const field of ['editing','motion','artDirection'])assert.ok(film[field].length>130,`${film.id} ${field}`);assert.ok(film.apply.length>=2);}
let tested=0;for(const film of imports)for(const [i,beat] of film.beats.entries()){assert.equal(at(film.beats,i,beat.start,film.duration),i);tested++;}
const run=imports.find(x=>x.id==='ref-2112624102016249952-1');assert.equal(at(run.beats,0,6,run.duration),3);
const panels=[{start:0,end:4},{start:0,end:2},{start:4,end:6}];
assert.equal(at(panels,1,1,6),1);assert.equal(at(panels,1,3,6),0);assert.equal(at(panels,2,6,6),2);
const kaye=imports.find(x=>x.id==='ref-kaye-claude-motion');assert.equal(at(kaye.beats,0,300,kaye.duration),-1);
const baseline=JSON.parse(fs.readFileSync('video-library-depth/baseline.json'));
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
assert.equal(hash(root+'film-reference-imports.json'),baseline['src/film-reference-imports.json']);
const report={films:43,visibleCraftParagraphs:craft.length*3,applicationSteps:craft.reduce((n,x)=>n+x.apply.length,0),beatStartsTested:tested,concurrentPanelSelection:'pass',sampledGaps:'pass',runinfraNativeSeekMapping:'pass',originalAnalyses:'unchanged'};
fs.writeFileSync('video-library-depth/verification.json',JSON.stringify(report,null,2));console.log(report);
