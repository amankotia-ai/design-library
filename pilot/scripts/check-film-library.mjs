import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const entries=JSON.parse(fs.readFileSync('src/film-data.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('public/film-motion/manifest.json','utf8'));
assert.equal(entries.length,manifest.entries,'Content inventory and registry must agree');
assert.equal(new Set(entries.map(e=>e.id)).size,entries.length,'Entry IDs must be unique');
assert.equal(entries.filter(e=>e.kind==='calculus').length,1);
assert.equal(entries.filter(e=>e.kind==='role').length,14,'All production roles must be available');
for(const entry of entries){
  for(const key of ['id','title','summary','category','body','sourcePath','download']) assert.ok(entry[key]?.trim(),`${entry.id}: missing ${key}`);
  assert.ok(entry.download.startsWith('/film-motion/'),'Downloads stay in the library asset tree');
  assert.ok(fs.existsSync(path.join('public',entry.download)),`Missing download: ${entry.download}`);
  assert.ok(!/^[a-z]+:\/\//i.test(entry.sourcePath),'Source IDs remain relative to the maintained archive');
}
assert.ok(fs.existsSync('public/film-motion/software-film-director-v3.4.zip'),'Portable skill download must exist');
assert.ok(fs.statSync('public/film-motion/software-film-director-v3.4.zip').size>100000,'Skill bundle must contain its runtime');
console.log(`${entries.length} entries, all14 roles, source inventory, and portable download verified.`);
