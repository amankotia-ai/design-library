const {chromium}=require('/Users/abhishekmankotia/Downloads/MovieMaker/films/skill-capabilities-v3/project/node_modules/playwright');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),crypto=require('crypto');
const root=path.resolve(__dirname,'../studies-polish/pilot'),out=path.join(__dirname,'evidence');
const base=process.env.STUDY_PREVIEW_URL||'http://127.0.0.1:5183/design-library/';
const ids=['spring-motion','bezier-paths'];
const report={base,checks:[],screenshots:[],errors:[],revision:{}};
let browser;
(async()=>{
 browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(e.message));
 async function visit(id){await page.goto(base+'?panel=film&entry='+id,{waitUntil:'networkidle'});await page.locator('.film-study').waitFor();await page.evaluate(()=>document.fonts.ready);}
 async function snapshot(){return page.locator('.film-study').evaluate(el=>({values:[...el.querySelectorAll('input,select')].map(n=>[n.getAttribute('aria-label'),n.value]),metrics:el.querySelector('.study-metrics').innerText,visual:el.querySelector('.study-visual').innerHTML}));}
 async function setRange(label,value){const el=page.getByRole('slider',{name:label,exact:true});await el.fill(String(value));await el.dispatchEvent('input');await el.dispatchEvent('change');assert.ok(Math.abs(Number(await el.inputValue())-value)<1e-8);}
 async function capture(name){await page.screenshot({path:path.join(out,name+'.png')});report.screenshots.push(name+'.png');const layout=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth}));assert.ok(layout.width<=layout.viewport+1,name+' overflows');}
 for(const id of ids){
  await visit(id);const initial=await snapshot();const states=[];
  const presets=page.locator('.study-experiments>div>button');assert.equal(await presets.count(),3);
  for(let i=0;i<3;i++){const btn=presets.nth(i);const label=await btn.innerText();await btn.click();assert.equal(await btn.getAttribute('aria-pressed'),'true');const time=page.getByRole('slider',{name:id==='spring-motion'?'Time':'Elapsed time',exact:true});await time.fill(id==='spring-motion'?'0.65':'1.4');await time.dispatchEvent('input');await time.dispatchEvent('change');const state=await snapshot();states.push({label,values:state.values,metrics:state.metrics,visualHash:crypto.createHash('sha256').update(state.visual).digest('hex')});assert.equal(await page.locator('.katex-error').count(),0);}
  assert.equal(new Set(states.map(s=>s.metrics)).size,3,id+' presets need distinct measurements');
  await page.getByRole('button',{name:'Reset',exact:true}).click();const reset=await snapshot();assert.deepEqual(reset.values,initial.values);assert.equal(reset.metrics,initial.metrics);
  assert.equal(await page.locator('.study-equations .katex').count(),3);assert.equal(await page.locator('.katex-error').count(),0);
  await capture(id+'-desktop');await page.locator('.study-equations').scrollIntoViewIfNeeded();await capture(id+'-equations-desktop');
  for(const width of [768,390]){await page.setViewportSize({width,height:width===390?844:1000});await visit(id);await page.locator('.study-workbench').scrollIntoViewIfNeeded();await capture(id+'-'+width);await page.locator('.study-controls').scrollIntoViewIfNeeded();await capture(id+'-controls-'+width);await page.locator('.study-equations').scrollIntoViewIfNeeded();await capture(id+'-equations-'+width);}
  await page.setViewportSize({width:1440,height:1000});await visit(id);
  const timeLabel=id==='spring-motion'?'Time':'Elapsed time',time=page.getByRole('slider',{name:timeLabel,exact:true});
  await page.getByRole('button',{name:/^Rewind /}).click();assert.equal(Number(await time.inputValue()),0);
  await page.getByRole('button',{name:/^Play /}).click();await page.waitForTimeout(240);assert.ok(Number(await time.inputValue())>0);
  await page.getByRole('button',{name:/^Pause /}).click();const paused=await time.inputValue();await page.waitForTimeout(100);assert.equal(await time.inputValue(),paused);
  await page.getByRole('button',{name:/^Play /}).click();await setRange(timeLabel,.37);await page.waitForTimeout(100);assert.equal(Number(await time.inputValue()),.37);
  await page.getByRole('button',{name:/^Play /}).click();await page.getByRole('button',{name:'Reset',exact:true}).click();await page.waitForTimeout(100);assert.deepEqual((await snapshot()).values,initial.values);
  report.checks.push({id,presets:states,reset:true,play:true,pause:true,scrubPauses:true,resetPauses:true});
 }
 await visit('bezier-paths');
 const timing=page.getByRole('combobox',{name:'Easing function',exact:true});
 await page.getByRole('button',{name:/^Play /}).click();await timing.selectOption('smootherstep');await page.waitForTimeout(100);assert.equal(await page.getByRole('button',{name:/^Play /}).getAttribute('aria-pressed'),'false');
 await setRange('Journey duration',2);await setRange('Elapsed time',.7);
 const readMetrics=()=>page.locator('.study-metrics>div').evaluateAll(nodes=>Object.fromEntries(nodes.map(n=>[n.querySelector('dt').innerText,n.querySelector('dd').innerText])));
 const short=await readMetrics();await setRange('Journey duration',4);const long=await readMetrics();
 assert.equal(short.Position,long.Position);assert.ok(Math.abs(parseFloat(short.Speed)/2-parseFloat(long.Speed))<.11);assert.ok(Math.abs(parseFloat(short.Acceleration)/4-parseFloat(long.Acceleration))<.11);report.durationScaling={short,long,positionUnchanged:true,speedHalved:true,accelerationQuartered:true};
 await page.getByRole('button',{name:/^Rewind /}).click();await setRange('Journey duration',1);await page.getByRole('button',{name:/^Play /}).click();await page.waitForTimeout(1200);assert.equal(Number(await page.getByRole('slider',{name:'Elapsed time',exact:true}).inputValue()),1);assert.equal(await page.getByRole('button',{name:/^Play /}).getAttribute('aria-pressed'),'false');report.singlePass=true;
 await page.goto(base+'?panel=films',{waitUntil:'networkidle'});await page.getByRole('combobox',{name:'Topic',exact:true}).selectOption('Mathematics');assert.equal(await page.locator('.film-card').count(),9);await capture('mathematics-collection');
 assert.equal(report.errors.length,0,report.errors.join('; '));
 const files=Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname,'baseline.json'),'utf8')));
 for(const f of files)if(fs.existsSync(path.join(root,f)))report.revision[f]=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex');
 report.status='passed';fs.writeFileSync(path.join(out,'browser-check.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,checks:report.checks,scaling:report.durationScaling,singlePass:report.singlePass,screenshots:report.screenshots.length,errors:report.errors},null,2));await browser.close();
})().catch(async error=>{report.status='failed';report.failure=error.stack;fs.writeFileSync(path.join(out,'browser-check.json'),JSON.stringify(report,null,2)+'\n');console.error(error);if(browser)await browser.close();process.exit(1)});
