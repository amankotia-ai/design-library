import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright');
const root='/Users/abhishekmankotia/Documents/ChatGPT/Design Library/pilot';
const runtime='/tmp/design-library-pilot-runtime';
const base='http://127.0.0.1:5175';
const results=[];const errors=[];
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const check=(name,passed,details)=>{results.push({name,passed:!!passed,details});if(!passed)console.log('FAIL',name,details)};
const sources=fs.readdirSync(path.join(root,'src')).map(n=>'src/'+n);
for(const name of sources)check('Runtime source identical '+name,hash(path.join(root,name))===hash(path.join(runtime,name)),hash(path.join(root,name)));
const browser=await chromium.launch();
const p=await browser.newPage({viewport:{width:1943,height:724}});p.on('pageerror',e=>errors.push(e.message));
const ready=async(url)=>{await p.goto(base+url);await p.evaluate(()=>document.fonts.ready);await p.locator('img').evaluateAll(ims=>Promise.all(ims.map(im=>im.decode().catch(()=>{}))));};
await ready('/?view=quote&mode=faithful');
let geometry=await p.locator('.quote-faithful').evaluate(el=>{const r=el.getBoundingClientRect(),im=el.querySelector('img').getBoundingClientRect();return{width:r.width,height:r.height,portraitWidth:im.width,portraitHeight:im.height,lines:el.querySelectorAll('blockquote span').length,overflow:document.documentElement.scrollWidth}});
check('Source-sized quote card 1943 by724',Math.abs(geometry.width-1943)<1&&Math.abs(geometry.height-724)<1,geometry);
check('Source portrait579 by724 and four lines',Math.abs(geometry.portraitWidth-579)<1&&Math.abs(geometry.portraitHeight-724)<1&&geometry.lines===4,geometry);
check('Source route visible study disclosure',await p.getByText(/Source quotation and names are reproduced as design-study content, not a verified endorsement/).count()===1,null);
check('Source route font substitute disclosed',await p.getByText(/Fonts are substitutes/).count()===1,null);
for(const width of [320,390,768,1440]){
 await p.setViewportSize({width,height:1000});
 for(const view of ['quote','page','hero','feature','footer']){
  await ready('/?view='+view);
  const data=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].every(im=>im.naturalWidth>0),h1:document.querySelectorAll('h1').length}));
  check(`${view} ${width} no horizontal overflow`,data.scroll<=width,data);
  check(`${view} ${width} image inputs decode`,data.images,data);
  if(view==='page'){
   check(`Page ${width} one h1 and illustrative statement`,data.h1===1&&(await p.locator('.quote-statement').innerText()).includes('illustrative copy'),data);
   check(`Page ${width} no source endorsement`,!(await p.locator('body').innerText()).match(/DANIEL MOREAU|AETHER APPAREL|final film and image/),null);
  }
  if(view==='quote'){
   const before=await p.locator('.quote-adapted').evaluate(el=>el.getBoundingClientRect().height);
   const data=await p.locator('.quote-adapted').evaluate(el=>{
    el.querySelector('blockquote p').textContent='A good frame gives every gesture room to be seen. We observe the light, the movement, and the material before choosing what belongs inside the frame. '.repeat(3);
    el.querySelector('figcaption span').textContent='A long studio attribution for the editorial production and image direction practice';
    const q=el.querySelector('blockquote').getBoundingClientRect(),c=el.querySelector('figcaption').getBoundingClientRect(),d=el.querySelector('.quote-disclosure').getBoundingClientRect();
    return{height:el.getBoundingClientRect().height,qBottom:q.bottom,cTop:c.top,cBottom:c.bottom,dTop:d.top,width:innerWidth,scroll:document.documentElement.scrollWidth};
   });
   check(`Long quote and attribution grow at ${width}`,data.height>before&&data.cTop>=data.qBottom&&data.dTop>=data.cBottom&&data.scroll<=width,{before,...data});
  }
 }
 await ready('/?section=quote');
 for(const panel of ['Study','Sources','System']){
  await p.getByRole('button',{name:panel,exact:true}).click();
  const d=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length}));
  check(`Library ${panel} ${width} no overflow/one h1`,d.scroll<=width&&d.h1===1,d);
 }
}
await p.setViewportSize({width:1440,height:1000});await ready('/?section=quote');
await p.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.readyState==='complete');
check('Quote desktop iframe source width1943',await p.locator('iframe').evaluate(el=>el.style.width==='1943px'&&el.src.includes('mode=faithful')),await p.locator('iframe').getAttribute('src'));
check('Quote desktop open source study',await p.getByRole('link',{name:'Open section',exact:false}).getAttribute('href')==='/?view=quote&mode=faithful',null);
await p.getByRole('button',{name:'Mobile',exact:true}).click();await p.waitForFunction(()=>document.querySelector('iframe')?.title==='quote, mobile preview');
check('Quote mobile iframe390 adaptation',await p.locator('iframe').evaluate(el=>el.style.width==='390px'&&!el.src.includes('mode=faithful')),await p.locator('iframe').getAttribute('src'));
check('Quote mobile open adaptation',await p.getByRole('link',{name:'Open section',exact:false}).getAttribute('href')==='/?view=quote',null);
await p.getByRole('button',{name:'Compare',exact:true}).click();
await p.locator('.comparison-images img').evaluateAll(ims=>Promise.all(ims.map(im=>im.decode())));
const dims=await p.locator('.comparison-images img').evaluateAll(ims=>ims.map(im=>({src:im.getAttribute('src'),w:im.naturalWidth,h:im.naturalHeight})));
check('Quote side comparison contains current1943 by724 images',dims.length===2&&dims.every(x=>x.w===1943&&x.h===724)&&dims[1].src==='/evidence/quote-faithful.png',dims);
await p.getByRole('combobox',{name:'View',exact:true}).selectOption('overlay');await p.getByRole('slider').fill('75');
check('Quote opacity75 updates overlay',await p.locator('.comparison-images figure').nth(1).evaluate(el=>el.style.opacity==='0.25'),null);
await p.getByRole('combobox',{name:'Section',exact:true}).selectOption('hero');
check('Section selection closes comparison',await p.locator('.comparison').count()===0,null);
await p.getByRole('button',{name:'Desktop',exact:true}).click();await p.waitForFunction(()=>document.querySelector('iframe')?.src.includes('mode=faithful'));
check('Hero original comparison route preserved',await p.locator('iframe').evaluate(el=>el.style.width==='2030px'&&el.src.includes('view=hero')),null);
await p.getByRole('button',{name:'Compare',exact:true}).click();await p.locator('.comparison-images img').evaluateAll(ims=>Promise.all(ims.map(im=>im.decode())));
check('Hero comparison2030 by1128',await p.locator('.comparison-images img').evaluateAll(ims=>ims.length===2&&ims.every(im=>im.naturalWidth===2030&&im.naturalHeight===1128)),null);
await p.getByRole('button',{name:'Sources',exact:true}).click();
check('Source17 attributed quote study',await p.getByText('Study 17 / Quote reproduction + system evidence').count()===1&&await p.getByText(/Source-sized quote study: 1943 × 724/).count()===1,null);
await ready('/?section=quote');
await p.getByRole('button',{name:'Dismiss pilot notice',exact:true}).click();check('Notice dismiss',await p.locator('.pilot-notice').count()===0,null);
await p.evaluate(()=>scrollTo(0,0));
const focused=[];
for(let i=0;i<10;i++){await p.keyboard.press('Tab');focused.push(await p.evaluate(()=>{const el=document.activeElement;return{tag:el.tagName,name:el.getAttribute('aria-label')||el.textContent?.trim().slice(0,40),outline:getComputedStyle(el).outlineStyle}}));}
check('Keyboard visible focus on native controls/links',focused.every(x=>x.outline==='solid'||x.tag==='IFRAME'),focused);
check('No browser page errors',errors.length===0,errors);
for(const [name,width,height,mobile] of [['quote-library',1440,1000,false],['quote-library-mobile',390,844,true]]){
 await p.setViewportSize({width,height});await ready('/?section=quote');
 if(mobile)await p.getByRole('button',{name:'Mobile',exact:true}).click();
 await p.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.readyState==='complete');
 await p.locator('iframe').evaluate(async el=>{await el.contentDocument.fonts.ready;await Promise.all([...el.contentDocument.images].map(im=>im.decode().catch(()=>{})))});
 await p.screenshot({path:path.join(root,`evidence/${name}.png`),fullPage:true});
 fs.copyFileSync(path.join(root,`evidence/${name}.png`),path.join(runtime,`evidence/${name}.png`));
}
await browser.close();
const artifacts=['evidence/quote-faithful.png','evidence/quote-mobile.png','evidence/quote-page-desktop.png','evidence/quote-library.png','evidence/quote-library-mobile.png','public/references/quote-source.png','public/assets/quote-portrait.png','public/assets/design-library-mark.svg'];
const hashes=Object.fromEntries([...sources,...artifacts].map(n=>[n,hash(path.join(root,n))]));
const record={reviewer:'/root/quote_qa',role:'independent QA',date:'2026-10-30',status:results.every(r=>r.passed)?'passed':'changes requested',scope:'Quote reproduction, original portrait/statement variants, library integration and existing component regressions',hashes,visual_inspection:artifacts.filter(n=>n.endsWith('.png')),checks:results,limitations:['Noto Serif Display and Courier New are disclosed substitute typefaces; no pixel identity claimed.','Source quotation is reference content, not a verified endorsement.','Mobile layout is an original adaptation.','Visual review includes provided final captures; browser checks inspect current runtime source identical to recorded source hashes.']};
fs.writeFileSync(path.join(root,'research/testimonial/qa.json'),JSON.stringify(record,null,2));
console.log(JSON.stringify({status:record.status,checks:results.length,failed:results.filter(x=>!x.passed)}));
