import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright');
const browser=await chromium.launch({headless:true});
const base=process.env.PREVIEW_URL||'http://127.0.0.1:5175/design-library';
for(const [name,url,width,height,fullPage] of [['hero-faithful','/?view=hero&mode=faithful',2030,1128,false],['page-desktop','/?view=page',1440,1000,true],['page-mobile','/?view=page',390,844,true],['library-desktop','/',1440,1000,true],['page-tablet','/?view=page',768,1024,true]]){const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});await page.goto(base+url);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`evidence/${name}.png`,fullPage});await page.close();}
await browser.close();
