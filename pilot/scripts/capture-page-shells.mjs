import {createRequire} from 'node:module';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {pageShells} from '../src/page-shells.js';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:5175';
const output=new URL('../public/previews/pages/',import.meta.url);
fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true});
try{
 for(const shell of pageShells){
  const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
  await page.goto(`${base}/?view=${shell.id}`,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(image=>image.decode().catch(()=>{}))));
  const height=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<height;y+=800){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(70);}
  await page.evaluate(()=>scrollTo(0,0));
  await page.waitForTimeout(200);
  await page.screenshot({path:fileURLToPath(new URL(`${shell.id}.jpg`,output)),fullPage:true,type:'jpeg',quality:85,animations:'disabled'});
  console.log(`${shell.id}: 1440 × ${await page.evaluate(()=>document.documentElement.scrollHeight)} (update preview dimensions if the composition changed)`);
  await page.close();
 }
}finally{await browser.close();}
