import { chromium } from '/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless:true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page = await browser.newPage({viewport:{width:1512,height:982},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:5176/?panel=system&section=conversion-page', {waitUntil:'domcontentloaded'});
await page.waitForSelector('.system-detail-copy');
await page.evaluate(async () => {
 await document.fonts.ready;
 const grid=document.querySelector('.library-system-detail');
 const baselineRows=getComputedStyle(grid).gridTemplateRows.split(' ').slice(0,3).join(' ');
 const copy=document.querySelector('.system-detail-copy');
 const rows=[...copy.querySelectorAll(':scope > .detail-row')];
 const index=document.createElement('div'); index.className='mock-topic-index';
 rows.slice(1).forEach((row)=>{
  const heading=row.querySelector(':scope > .detail-label');
  const contents=row.querySelector(':scope > .detail-content');
  const detail=document.createElement('details');
  const summary=document.createElement('summary');
  const label=document.createElement('span'); label.textContent=heading.textContent.trim();
  const icon=document.createElement('span'); icon.className='mock-plus'; icon.setAttribute('aria-hidden','true'); icon.textContent='+';
  summary.append(label,icon); detail.append(summary,contents); index.append(detail);
  row.remove();
 });
 copy.append(index);
 const style=document.createElement('style'); style.textContent=`
 @media (min-width:701px) { .library-system-detail {grid-template-rows:${baselineRows} auto;} }
 .library-system-detail .system-detail-copy {display:block;}
 .library-system-detail .system-detail-copy > .detail-row {display:block; border:0; padding:0;}
 .library-system-detail .system-detail-copy > .detail-row .detail-label {margin:0 0 14px;}
 .library-system-detail .system-detail-copy > .detail-row .detail-thesis {max-width:26ch;}
 .mock-topic-index {display:grid; gap:5px; margin-top:32px;}
 .mock-topic-index details {background:var(--library-surface, #f4f3f0); border:0;}
 .mock-topic-index summary {list-style:none; cursor:pointer; min-height:48px; padding:0 16px; display:flex; justify-content:space-between; align-items:center; gap:16px; font:500 14px/1.4 var(--library-font-body); color:var(--library-ink);}
 .mock-topic-index summary::-webkit-details-marker {display:none;}
 .mock-topic-index summary:focus-visible {outline:2px solid currentColor; outline-offset:-2px;}
 .mock-topic-index .mock-plus {font-size:21px; font-weight:300; line-height:1;}
 .mock-topic-index details[open] .mock-plus {transform:rotate(45deg)}
 .mock-topic-index .detail-content {padding:0 16px 16px;}
 `; document.head.append(style);
});
await page.screenshot({path:'output/layout-exploration/b-index.png'});
await browser.close();
