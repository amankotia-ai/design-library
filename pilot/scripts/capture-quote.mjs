import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright');
const browser=await chromium.launch();
fs.mkdirSync('evidence',{recursive:true});
for(const [name,url,width,height,fullPage] of [
 ['quote-faithful','/?view=quote&mode=faithful',1943,724,false],
 ['quote-desktop','/?view=quote',1440,1000,true],
 ['quote-mobile','/?view=quote',390,844,true],
 ['quote-page-desktop','/?view=page',1440,1000,true],
 ['quote-page-mobile','/?view=page',390,844,true],
 ['quote-library','/?section=quote',1440,1000,true],
 ['quote-library-mobile','/?section=quote',390,844,true]]){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 await page.goto('http://127.0.0.1:5175'+url);await page.evaluate(()=>document.fonts.ready);
 await page.locator('img').evaluateAll(ims=>Promise.all(ims.map(im=>im.decode().catch(()=>{}))));
 if(url.includes('section=')){await page.locator('iframe').evaluate(el=>el.contentDocument.fonts.ready);}
 await page.screenshot({path:`evidence/${name}.png`,fullPage});await page.close();
}
fs.mkdirSync('public/evidence',{recursive:true});fs.copyFileSync('evidence/quote-faithful.png','public/evidence/quote-faithful.png');
await browser.close();
