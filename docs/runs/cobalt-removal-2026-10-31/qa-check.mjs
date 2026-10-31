import {createRequire} from 'node:module';
import fs from 'node:fs';
import crypto from 'node:crypto';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright');
const root=process.cwd();
const dir='docs/runs/cobalt-removal-2026-10-31';
const {systems,sections,comparisons}=await import(root+'/pilot/src/data.js');
const checks=[];const errors=[];
const check=(name,passed,details)=>checks.push({name,passed,details});
check('Two remaining registry collections',JSON.stringify(systems.map(s=>s.name))===JSON.stringify(['Quiet Serif','Blueprint']),systems.map(s=>s.name));
check('No signal section/comparison registered',!sections.some(s=>s.id.startsWith('signal-')||s.systemId==='signal-01')&&!Object.keys(comparisons).some(k=>k.startsWith('signal-')),null);
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
page.on('pageerror',error=>errors.push({url:page.url(),message:error.message}));
async function go(path){await page.goto('http://127.0.0.1:5175/'+path,{waitUntil:'domcontentloaded'});await page.locator('#root > :not(link)').first().waitFor();}
for(const width of [1440,768,390]){
 await page.setViewportSize({width,height:1000});await go('');await page.evaluate(()=>document.fonts.ready);
 const names=await page.locator('.system-card h2').allTextContents();
 check('Home cards at '+width,JSON.stringify(names)===JSON.stringify(['Quiet Serif','Blueprint']),names);
 check('Home no overflow at '+width,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),null);
}
await page.setViewportSize({width:1440,height:1000});
for(const panel of ['library','system','sources']){
 await go('?panel='+panel+'&section=blueprint-page');
 const options=await page.locator('[aria-label="Design system"] option').allTextContents();
 check(panel+' collection options',JSON.stringify(options)===JSON.stringify(['Quiet Serif','Blueprint']),options);
 const text=await page.locator('body').innerText();
 check(panel+' no visible retired recommendation',!/Cobalt Grid|Signal Workshop|three collections/i.test(text),null);
 check(panel+' Blueprint retained',text.includes('Blueprint'),null);
}
await go('?panel=library&section=page');
await page.getByRole('combobox',{name:'Design system',exact:true}).selectOption('blueprint-source');
check('Select Blueprint changes section',await page.getByRole('combobox',{name:'Section',exact:true}).inputValue()==='blueprint-page',page.url());
check('Blueprint selector has eleven source records',await page.locator('[aria-label="Section"] option').count()===11,await page.locator('[aria-label="Section"] option').allTextContents());
await page.getByRole('combobox',{name:'Design system',exact:true}).selectOption('editorial-01');
check('Select Quiet Serif changes section',await page.getByRole('combobox',{name:'Section',exact:true}).inputValue()==='page',page.url());
for(const id of ['signal-page','signal-hero','signal-workshop','signal-features','signal-faq','signal-footer']){
 await go('?view='+id);check(id+' view falls back to catalog',await page.locator('.system-card').count()===2,await page.locator('h1').allTextContents());
 await go('?panel=library&section='+id);check(id+' stale section falls back safely',await page.getByRole('combobox',{name:'Section',exact:true}).inputValue()==='page',await page.locator('h1').allTextContents());
}
for(const section of sections.filter(s=>s.systemId==='blueprint-source')){
 await go('?view='+section.id);
 const count=await page.locator('.bp-source-view-'+section.id.replace('blueprint-','')).count();
 const size=await page.locator('#root').evaluate(el=>el.getBoundingClientRect().height);
 check(section.id+' direct view renders',count===1&&size>0,{count,height:size});
}
await browser.close();
check('No browser exceptions',errors.length===0,errors);
const manifest=JSON.parse(fs.readFileSync(dir+'/revision.json'));
const hashes={};for(const path of Object.keys(manifest.sha256)){hashes[path]=crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');check('Revision unchanged: '+path,hashes[path]===manifest.sha256[path],hashes[path]);}
for(const path of Object.keys(hashes).filter(x=>x.startsWith('pilot/src/'))){const runtime='/tmp/design-library-pilot-runtime/'+path.replace('pilot/','');check('Runtime equals reviewed source: '+path,crypto.createHash('sha256').update(fs.readFileSync(runtime)).digest('hex')===hashes[path],null);}
const report={reviewer:'/root/independent_qa',status:checks.every(c=>c.passed)?'passed':'changes requested',scope:'Duplicate Cobalt Grid collection removal, remaining catalog/navigation and direct Blueprint route smoke checks. Not a full source fidelity or feature interaction review.',visualInspection:['after-1440.png','after-390.png'],checks,sha256:hashes};
fs.writeFileSync(dir+'/qa.json',JSON.stringify(report,null,2));console.log(JSON.stringify({status:report.status,count:checks.length,failed:checks.filter(c=>!c.passed)},null,2));
