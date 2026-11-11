const {chromium}=require('/Users/abhishekmankotia/Downloads/MovieMaker/films/skill-capabilities-v3/project/node_modules/playwright');
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('node:assert/strict');
const out=path.join(__dirname,'evidence');fs.mkdirSync(out,{recursive:true});
const base=process.env.STUDY_PREVIEW_URL||'http://127.0.0.1:5182/design-library/';
const ids=['spring-motion','bezier-paths','camera-parallax','framing-crop','speech-timing','reading-window','sound-mixing','sampling-aliasing'];
const timeLabels={'spring-motion':'Time','bezier-paths':'Path parameter t','sampling-aliasing':'Continuous playhead'};
const report={base,checks:[],playback:[],errors:[],screenshots:[],revision:{}};
let browser;
(async()=>{
 browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',error=>report.errors.push(error.message));
 async function visit(id){await page.goto(base+'?panel=film&entry='+id,{waitUntil:'networkidle',timeout:25000});await page.locator('.film-study').waitFor();await page.evaluate(()=>document.fonts.ready);}
 async function capture(name){await page.screenshot({path:path.join(out,name+'.png')});report.screenshots.push(name+'.png');const result=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth}));assert.ok(result.scrollWidth<=result.viewport+1,`${name} horizontal overflow`);return result;}
 async function state(){return page.locator('.film-study').evaluate(el=>({metrics:el.querySelector('.study-metrics').innerText,visual:el.querySelector('.study-visual').innerHTML,values:[...el.querySelectorAll('input,select,textarea')].map(node=>[node.getAttribute('aria-label')||node.tagName,node.value])}));}
 async function setRange(label,value){const input=page.getByRole('slider',{name:label,exact:true});await input.evaluate((el,value)=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,String(value));el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));},value);await page.waitForTimeout(40);assert.ok(Math.abs(Number(await input.inputValue())-value)<1e-8,`Could not set${label}`);}
 // Capture the representative views first, so visual QA can run during behavioral tests.
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===390?844:1000});
  for(const id of ['spring-motion','sound-mixing']){
   await visit(id);if(width===390)await page.locator('.film-lab-container').scrollIntoViewIfNeeded();
   await capture(`${id}-${width===390?'mobile':'desktop'}`);
   await page.locator('.study-controls').scrollIntoViewIfNeeded();await capture(`${id}-controls-${width===390?'mobile':'desktop'}`);
   await page.locator('.study-equations').scrollIntoViewIfNeeded();await capture(`${id}-equations-${width===390?'mobile':'desktop'}`);
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(base+'?panel=films',{waitUntil:'networkidle'});await page.getByRole('combobox',{name:'Topic',exact:true}).selectOption('Mathematics');
 report.mathematicsCards=await page.locator('.film-card').count();assert.equal(report.mathematicsCards,9);await capture('mathematics-collection');
 console.log('CAPTURES_READY '+out);
 let equations=0;
 for(const id of ids){
  await page.setViewportSize({width:1440,height:1000});await visit(id);const initial=await state();
  const buttons=page.locator('.study-experiments>div>button');const presetCount=await buttons.count();assert.ok(presetCount>=2&&presetCount<=3,id+' requires2–3 comparisons');
  const cases=[];
  for(let index=0;index<presetCount;index++){
   const button=buttons.nth(index),label=await button.innerText();await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true',id+' active preset');
   if(timeLabels[id])await setRange(timeLabels[id],.37);
   const current=await state();cases.push({label,metrics:current.metrics,visualHash:crypto.createHash('sha256').update(current.visual).digest('hex'),values:current.values});
   assert.ok((await page.locator('.study-insight').innerText()).trim().length>35,id+' meaningful insight');
  }
  assert.ok(new Set(cases.map(item=>item.metrics)).size>1,id+' presets did not change metrics');
  assert.ok(new Set(cases.map(item=>item.visualHash)).size>1,id+' presets did not change scene');
  await page.getByRole('button',{name:'Reset',exact:true}).click();const reset=await state();assert.deepEqual(reset.values,initial.values,id+' reset did not restore inputs');assert.equal(reset.metrics,initial.metrics,id+' reset metrics differ');
  const equationCount=await page.locator('.study-equations article').count();assert.equal(equationCount,3,id+' must retain3 equations');equations+=equationCount;
  assert.equal(await page.locator('.katex-error').count(),0,id+' invalid KaTeX');assert.equal(await page.locator('.study-equations .katex').count(),3,id+' equations not typeset');
  assert.ok(await page.locator('.study-variables>div').count()>=3,id+' variable definitions absent');
  const desktop=await capture(id+'-final-desktop');
  await page.setViewportSize({width:390,height:844});await visit(id);await page.locator('.film-lab-container').scrollIntoViewIfNeeded();const mobile=await capture(id+'-final-mobile');
  await page.locator('.study-controls').scrollIntoViewIfNeeded();const mobileControls=await capture(id+'-final-mobile-controls');
  await page.locator('.study-equations').scrollIntoViewIfNeeded();const mobileEquations=await capture(id+'-final-mobile-equations');
  report.checks.push({id,presetCount,cases,reset:true,equationCount,katexErrors:0,desktop,mobile,mobileControls,mobileEquations});
 }
 assert.equal(equations,24);report.equations=equations;
 await page.setViewportSize({width:1440,height:1000});
 for(const id of Object.keys(timeLabels)){
  await visit(id);const input=page.getByRole('slider',{name:timeLabels[id],exact:true});const resetValue=Number(await input.inputValue());
  const rewind=()=>page.getByRole('button',{name:/^Rewind /});const play=()=>page.getByRole('button',{name:/^Play /});
  await rewind().click();assert.equal(Number(await input.inputValue()),0);
  await play().click();await page.waitForTimeout(450);const advanced=Number(await input.inputValue());assert.ok(advanced>0,id+' playback did not advance');
  await page.getByRole('button',{name:/^Pause /}).click();const paused=Number(await input.inputValue());await page.waitForTimeout(160);assert.equal(Number(await input.inputValue()),paused,id+' pause still advances');
  await rewind().click();assert.equal(Number(await input.inputValue()),0);await play().click();await page.waitForTimeout(120);await setRange(timeLabels[id],.37);await page.waitForTimeout(160);assert.equal(Number(await input.inputValue()),.37,id+' manual scrub did not pause');assert.equal(await play().getAttribute('aria-pressed'),'false');
  await play().click();await page.waitForTimeout(120);await page.getByRole('button',{name:'Reset',exact:true}).click();await page.waitForTimeout(160);assert.equal(Number(await input.inputValue()),resetValue,id+' reset while playing did not restore');assert.equal(await play().getAttribute('aria-pressed'),'false');
  report.playback.push({id,advanced,play:true,pause:true,rewind:true,scrubPauses:true,resetPauses:true});
 }
 assert.equal(report.errors.length,0,report.errors.join('; '));
 const root=path.join(__dirname,'pilot');const files=['package.json','package-lock.json','src/main.jsx',...fs.readdirSync(path.join(root,'src')).filter(name=>/^film-/.test(name)).map(name=>'src/'+name),...fs.readdirSync(path.join(root,'scripts')).filter(name=>/^check-film-(motion|timing)/.test(name)).map(name=>'scripts/'+name)];
 for(const file of files)report.revision[file]=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
 report.status='passed';fs.writeFileSync(path.join(out,'browser-polish-check.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({status:'passed',studies:report.checks.length,equations,playback:report.playback,screenshots:report.screenshots.length,errors:report.errors},null,2));await browser.close();
})().catch(async error=>{report.status='failed';report.failure=error.stack;fs.writeFileSync(path.join(out,'browser-polish-check.json'),JSON.stringify(report,null,2));console.error(error);if(browser)await browser.close();process.exit(1);});
