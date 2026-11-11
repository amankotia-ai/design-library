const {chromium}=require('/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const result=[];
 try{
  for(const width of [1440,768,390]){
   const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:5175/design-library/?panel=films');
   await page.locator('.film-lesson-card').first().waitFor();
   await page.locator('.film-collection-tabs label[data-label="Lessons"]').click();
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('.film-lesson-card').count(),16);
   const metrics=await page.locator('.film-lesson-card').evaluateAll(cards=>cards.map(card=>{
    const a=card.querySelector('.film-lesson-preview'),title=card.querySelector('h2 a'),svg=a.querySelector('svg'),r=a.getBoundingClientRect(),b=svg.getBoundingClientRect();
    return{href:a.href,titleHref:title.href,tabIndex:a.tabIndex,hidden:a.getAttribute('aria-hidden'),svgHidden:svg.getAttribute('aria-hidden'),focusable:svg.getAttribute('focusable'),shapes:svg.querySelectorAll('path,rect,circle').length,width:r.width,height:r.height,svgWidth:b.width,svgHeight:b.height};
   }));
   assert.ok(metrics.every(m=>m.href===m.titleHref&&m.tabIndex===-1&&m.hidden==='true'&&m.svgHidden==='true'&&m.focusable==='false'&&m.shapes>0));
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
   const columns=await page.locator('.film-catalog-cards').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);assert.equal(columns,width>900?3:width>700?2:1);
   await page.screenshot({path:path.join(__dirname,`qa-page-${width}.png`)});
   await page.locator('.film-lesson-card').first().screenshot({path:path.join(__dirname,`qa-first-card-${width}.png`)});
   if(width===390)await page.locator('.film-lesson-card').last().screenshot({path:path.join(__dirname,'qa-last-card-390.png')});
   await page.locator('.film-filters input').fill('cadence');assert.equal(await page.locator('.film-lesson-card').count(),1);
   await page.locator('.film-filters input').fill('');
   await page.locator('.film-filters select').selectOption('Motion');assert.equal(await page.locator('.film-lesson-card').count(),3);
   await page.locator('.film-filters select').selectOption('all');
   await page.locator('.film-filters select').focus();await page.keyboard.press('Tab');
   const active=await page.evaluate(()=>({title:document.activeElement.textContent,tag:document.activeElement.tagName,focusVisible:document.activeElement.matches(':focus-visible')}));
   assert.equal(active.tag,'A');assert.equal(active.title,'Let one real task carry the story');assert.equal(active.focusVisible,true);
   await page.keyboard.press('Enter');await page.locator('.film-lesson-detail h1').waitFor();assert.equal(await page.locator('.film-lesson-detail h1').textContent(),active.title);
   assert.deepEqual(errors,[]);result.push({width,columns,overflow,metrics,filterAndKeyboardRoute:'passed',errors});await page.close();
  }
  fs.writeFileSync(path.join(__dirname,'qa-browser-validation.json'),JSON.stringify(result,null,2)+'\n');
  console.log('Independent QA passed at 1440, 768, 390px: 16 previews, layout, filters, keyboard focus and route.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
