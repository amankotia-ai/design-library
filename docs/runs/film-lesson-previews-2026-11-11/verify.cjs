const {chromium} = require('/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const out = __dirname;

(async () => {
 const browser = await chromium.launch({headless:true, channel:'chrome'});
 const report = {viewports:[], errors:[]};
 for(const [width,height] of [[1440,1100],[768,1024],[390,844]]) {
  const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
  page.on('pageerror', error=>report.errors.push(error.message));
  await page.goto('http://127.0.0.1:5175/design-library/?panel=films');
  await page.locator('.film-lesson-card').first().waitFor();
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('.film-collection-tabs').getByText('Lessons',{exact:true}).click();
  assert.equal(await page.locator('.film-lesson-card').count(),16);
  const cards = await page.locator('.film-lesson-card').evaluateAll(cards=>cards.map(card=>{
   const preview = card.querySelector('.film-lesson-preview');
   const title = card.querySelector('h2 a');
   const svg = preview?.querySelector('svg');
   const rect = preview?.getBoundingClientRect();
   return {title:title.textContent,href:title.getAttribute('href'),matchingLinks:preview?.href===title.href,tabIndex:preview?.tabIndex,hidden:preview?.getAttribute('aria-hidden'),decorative:svg?.getAttribute('aria-hidden'),nonempty:!!svg?.querySelector('path,rect,circle'),ratio:rect.width/rect.height};
  }));
  assert.ok(cards.every(card=>card.matchingLinks&&card.tabIndex===-1&&card.hidden==='true'&&card.decorative==='true'&&card.nonempty));
  assert.ok(cards.every(card=>Math.abs(card.ratio-16/9)<.02));
  const overflow = await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  assert.equal(overflow,false);
  const columns = await page.locator('.film-catalog-cards').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
  assert.equal(columns,width>900?3:width>700?2:1);
  await page.screenshot({path:path.join(out,`lessons-${width}.png`),fullPage:true});
  if(width===1440) {
   await page.screenshot({path:path.join(out,'desktop-preview.png')});
   // A compact inspection board uses the exact rendered preview SVGs and titles.
   const markup = await page.locator('.film-lesson-card').evaluateAll(cards=>cards.map(card=>`<article>${card.querySelector('.film-lesson-preview').innerHTML}<p>${card.querySelector('h2').textContent}</p></article>`).join(''));
   const board = await browser.newPage({viewport:{width:1440,height:1150},deviceScaleFactor:1});
   await board.setContent(`<style>:root{--library-brand-red:#f60f30;--library-bg:#fdfdfc;--library-wash:#f3f3ef}*{box-sizing:border-box}body{margin:0;padding:24px;color:#21201c;background:#fdfdfc;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}article{min-width:0}svg{display:block;width:100%;height:auto;background:var(--library-wash);border:1px solid #edede9}p{font:16px/1.3 Georgia,serif;margin:10px 0 0}</style>${markup}`);
   await board.screenshot({path:path.join(out,'illustration-board.png'),fullPage:true});
   await board.close();
  }
  // Verify filters continue to address lesson content.
  await page.getByRole('searchbox').fill('cadence');
  assert.equal(await page.locator('.film-lesson-card').count(),1);
  await page.getByRole('searchbox').fill('');
  await page.locator('.film-filters select').selectOption('Motion');
  assert.equal(await page.locator('.film-lesson-card').count(),3);
  await page.locator('.film-filters select').selectOption('all');
  // The title is the accessible keyboard destination; the duplicate preview is skipped.
  const firstTitle=page.locator('.film-lesson-card h2 a').first();
  await firstTitle.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  assert.equal(await firstTitle.evaluate(el=>el.matches(':focus-visible')),true);
  await page.screenshot({path:path.join(out,`focus-${width}.png`)});
  await firstTitle.press('Enter');
  await page.locator('.film-lesson-detail h1').waitFor();
  assert.equal(await page.locator('.film-lesson-detail h1').textContent(),cards[0].title);
  report.viewports.push({width,height,columns,lessonCount:cards.length,overflow,cards,filters:'passed',keyboardAndRoute:'passed'});
  await page.close();
 }
 await browser.close();
 fs.writeFileSync(path.join(out,'browser-validation.json'),JSON.stringify(report,null,2)+'\n');
 assert.deepEqual(report.errors,[]);
 console.log('16 previews; 3/2/1-column layouts; no overflow; matching links; decorative SVGs; filters, keyboard focus and routes passed at 1440, 768 and 390px.');
})().catch(error=>{console.error(error);process.exit(1)});
