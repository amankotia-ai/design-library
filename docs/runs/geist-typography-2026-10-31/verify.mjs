import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright');
const out=path.dirname(fileURLToPath(import.meta.url));
const base=process.env.PREVIEW_URL || 'http://127.0.0.1:5176';
const browser=await chromium.launch({headless:true});
const results=[];
for(const [panel,url] of [['home','/'],['study','/?panel=library&section=page'],['sources','/?panel=sources&section=page'],['system','/?panel=system&section=page']]) {
  for(const width of [1440,768,390,320]) {
    const page=await browser.newPage({viewport:{width,height:1000}});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+url);
    await page.evaluate(()=>document.fonts.ready);
    const metrics=await page.evaluate(()=>{
      const describe=e=>({text:e.textContent.slice(0,60),family:getComputedStyle(e).fontFamily,weight:getComputedStyle(e).fontWeight});
      const headings=[...document.querySelectorAll('.library h1,.library h2,.library h3,.brand-name')].map(describe);
      const controls=[...document.querySelectorAll('.library select,.library nav a')].map(describe);
      const sample=document.createElement('strong');sample.id='bold-font-probe';sample.textContent='Bold emphasis';document.querySelector('.library').append(sample);
      return {headings,controls,body:describe(document.querySelector('.library')),bold:describe(sample),overflow:document.documentElement.scrollWidth>innerWidth,fontRequests:performance.getEntriesByType('resource').filter(r=>r.name.includes('/fonts/geist-')).map(r=>({url:r.name,bytes:r.decodedBodySize})),specimen:document.querySelector('.type-specimen')?describe(document.querySelector('.type-specimen')):null};
    });
    const cdp=await page.context().newCDPSession(page);
    await cdp.send('DOM.enable');await cdp.send('CSS.enable');
    const {root}=await cdp.send('DOM.getDocument');
    const actual={};
    for(const selector of ['.brand-name','h1','.article-header nav a','#bold-font-probe']) {
      const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector});
      actual[selector]=(await cdp.send('CSS.getPlatformFontsForNode',{nodeId})).fonts;
    }
    await page.locator('#bold-font-probe').evaluate(e=>e.remove());
    if(width===1440||width===390||panel==='home'&&width===320) await page.screenshot({path:path.join(out,`after-${panel}-${width}.png`),fullPage:panel==='home'});
    if(metrics.overflow||errors.length||metrics.headings.some(h=>!h.family.startsWith('"Geist Serif"')||h.weight!=='400')||metrics.controls.some(h=>!h.family.startsWith('"Geist Sans"'))||metrics.bold.weight!=='700'||Object.entries(actual).some(([sel,fonts])=>!fonts.length||fonts.some(f=>!f.isCustomFont||!f.familyName.includes(sel==='.brand-name'||sel==='h1'?'Geist Serif':'Geist')))) throw new Error(JSON.stringify({panel,width,metrics,actual,errors}));
    results.push({panel,width,metrics,actual,errors});
    await page.close();
  }
}
// A representative study and specimen must keep their own design-system fonts.
for(const [url,selector] of [['/?view=page','.editorial-hero'],['/?view=blueprint-page','.bp-source']]) {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto(base+url);await page.evaluate(()=>document.fonts.ready);
  const fonts=await page.locator('h1').first().evaluate(e=>getComputedStyle(e).fontFamily);
  if(fonts.includes('Geist Serif'))throw new Error('Library Serif leaked into study '+url);
  results.push({study:url,headingFont:fonts});await page.close();
}
await browser.close();
fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({base,results},null,2));
const files=['pilot/src/library-tokens.css','pilot/public/assets/fonts/geist-serif-regular.woff2','pilot/public/assets/fonts/geist-sans-variable.woff2','pilot/public/assets/fonts/geist-LICENSE.txt'];
const root=path.resolve(out,'../../..');
fs.writeFileSync(path.join(out,'revision-sha256.txt'),files.map(f=>createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')+'  '+f).join('\n')+'\n');
console.log('Passed: four library panels at 1440/768/390/320px; actual custom fonts, heading weights, Sans bold, controls, no overflow/errors, preserved study fonts.');
