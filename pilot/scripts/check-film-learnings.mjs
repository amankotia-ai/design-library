import assert from 'node:assert/strict';
import fs from 'node:fs';
import {filmLearnings,learningSourceGuideIds} from '../src/film-learnings-data.js';
const sources=JSON.parse(fs.readFileSync(new URL('../src/film-data.json',import.meta.url),'utf8'));
const ids=new Set(sources.map(entry=>entry.id));
assert.ok(filmLearnings.length>0,'The collection needs real lessons');
for(const lesson of filmLearnings){
 assert.ok(!ids.has(lesson.id),'Lesson IDs must not collide with existing routes: '+lesson.id);ids.add(lesson.id);
 assert.equal(lesson.kind,'lesson');
 for(const field of ['title','summary','when','watchFor','category'])assert.ok(typeof lesson[field]==='string'&&lesson[field].trim(),lesson.id+' missing '+field);
 assert.equal(lesson.steps.length,3,lesson.id+' needs three useful application steps');
 assert.ok(lesson.steps.every(step=>typeof step==='string'&&step.trim()));
 assert.ok(lesson.example.before&&lesson.example.after&&lesson.example.before!==lesson.example.after,lesson.id+' needs a concrete worked contrast');
 assert.ok(lesson.sources.length>0,lesson.id+' needs grounding in existing material');
 for(const source of lesson.sources){
  const entry=sources.find(e=>e.id===source.entryId);assert.ok(entry,lesson.id+' source route does not exist');
  const headings=[...entry.body.matchAll(/^#{1,6}\s+(.+?)\s*$/gm)].map(match=>match[1]);
  assert.ok(headings.includes(source.section),lesson.id+' source section not found: '+source.section);
 }
}
for(const id of learningSourceGuideIds)assert.ok(sources.find(e=>e.id===id&&e.kind==='guide'),'Archive guide ID must resolve: '+id);
assert.equal(new Set(learningSourceGuideIds).size,learningSourceGuideIds.length);
console.log(`${filmLearnings.length} lesson schemas, unique routes, concrete examples and source-section mappings verified; ${learningSourceGuideIds.length} archival guides identified.`);
