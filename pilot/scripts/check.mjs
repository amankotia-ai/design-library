import fs from 'node:fs';
for(const f of ['src/quote.jsx','src/utils.js','public/references/quote-source.png','public/assets/quote-portrait.png','public/evidence/quote-faithful.png','src/main.jsx','src/sections.jsx','src/tokens.css','public/assets/campaign.webp','public/assets/portrait.webp','public/assets/practice.webp','public/references/hero-source.png'])if(!fs.existsSync(f))throw new Error(`Missing ${f}`);
const p=JSON.parse(fs.readFileSync('research/provenance.json'));if(p.references.length!==2)throw new Error('Expected two attributed references');console.log('Required component, media, and provenance inputs are present.');

const {systems,sections}=await import('../src/data.js');
const systemIds=new Set();
for(const system of systems){
 if(!system.id||systemIds.has(system.id))throw new Error('Design systems require unique IDs');
 systemIds.add(system.id);
 for(const key of ['name','description'])if(typeof system[key]!=='string'||!system[key].trim())throw new Error(`System ${system.id} requires ${key}`);
}
for(const section of sections)if(!systemIds.has(section.systemId))throw new Error(`Section ${section.id} requires a registered design system`);
console.log(`${systems.length} named design system(s); all sections linked.`);

for(const f of ['src/blueprint.jsx','src/blueprint.css','src/blueprint-tokens.css','research/blueprint/provenance.json','public/references/blueprint/hero.png','public/evidence/blueprint-hero.png'])if(!fs.existsSync(f))throw new Error(`Missing ${f}`);
const blueprint=JSON.parse(fs.readFileSync('research/blueprint/provenance.json'));
if(!blueprint.rea.evidence_ids['rea-inspection']||!blueprint.rea.evidence_ids['rea-screenshot'])throw new Error('Blueprint requires retained REA evidence');
console.log('Blueprint source study, separate tokens, and REA provenance are present.');

// Complete source reconstruction inputs and aligned comparison media.
for(const f of ['src/blueprint-faithful.jsx','src/blueprint-faithful-static.jsx','src/blueprint-faithful-commerce.jsx','src/blueprint-faithful-editor.jsx','src/blueprint-faithful-texture.jsx','src/blueprint-faithful-gallery.jsx','src/blueprint-faithful-motion.jsx','public/blueprint-source/op-art.html','public/blueprint-source/op-art-program.json','public/blueprint-source/gallery-programs.json'])if(!fs.existsSync(f))throw new Error('Missing faithful source input '+f);
const {comparisons}=await import('../src/data.js');
for(const section of sections.filter(s=>s.systemId==='blueprint-source')){const pair=comparisons[section.id];if(!pair)throw new Error('Missing source comparison '+section.id);for(const key of ['source','implementation'])if(!fs.existsSync('public'+pair[key]))throw new Error('Missing source comparison media '+pair[key]);}
const programs=JSON.parse(fs.readFileSync('public/blueprint-source/gallery-programs.json'));if(programs.length!==11||programs.some(p=>!p.spec?.code||p.spec.code.startsWith('$')))throw new Error('Incomplete recovered gallery programs');
console.log('All10source sections, page,11comparisonpairs and11recovered gallery programs are present.');

// Browser content must remain useful and previews must resolve as systems grow.
const displayNames=new Set();
for(const system of systems){
 if(displayNames.has(system.name))throw new Error('System display names must be unique');
 displayNames.add(system.name);
 for(const key of ['family','mode','signature','typeLabel'])if(!system[key]?.trim())throw new Error(`Missing system browser metadata: ${system.id}.${key}`);
 if(!system.preview?.image?.startsWith('/')||!fs.existsSync('public'+system.preview.image))throw new Error(`Missing rendered system preview: ${system.id}`);
 for(const key of ['alt','caption'])if(!system.preview[key]?.trim())throw new Error(`Missing preview ${key}: ${system.id}`);
 for(const key of ['thesis','logic','bestFor','tradeoff','extension','evidence','relationship'])if(!system.insight?.[key]?.trim())throw new Error(`Missing system insight: ${system.id}.${key}`);
 if(!system.insight.principles?.length||system.insight.principles.some(p=>p.length!==2||p.some(v=>!v.trim())))throw new Error(`Invalid composition principles: ${system.id}`);
 if(!sections.some(s=>s.systemId===system.id&&s.id.endsWith('page')))throw new Error(`No assembled entry point: ${system.id}`);
}
console.log('System guidance, preview assets, unique names, and assembled entry points are valid.');

const editorial=JSON.parse(fs.readFileSync('research/editorial-sections/provenance.json'));
for(const asset of editorial.assets)if(!fs.existsSync('public'+asset.path))throw new Error('Missing original editorial demo asset '+asset.path);
for(const reference of editorial.references)if(!fs.existsSync('public'+reference.localImage)||!reference.url.startsWith('https://x.com/berlickfold/'))throw new Error('Invalid editorial reference '+reference.study);
for(const id of ['project-detail','image-index','split-material','image-rail']){
 if(sections.filter(section=>section.id===id&&section.systemId==='editorial-01').length!==1)throw new Error('Missing or duplicate editorial section '+id);
 if(!fs.existsSync('public/previews/editorial/'+id+'.png'))throw new Error('Missing editorial section preview '+id);
}
console.log('Four original editorial layouts, rendered previews, generated assets, and reference provenance are present.');
