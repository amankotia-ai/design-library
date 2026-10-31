import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/abhishekmankotia/.codex/skills/product-screen-compositions/node_modules/playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1512, height: 982 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:5176/?panel=system&section=conversion-page', { waitUntil: 'domcontentloaded' });
await page.addStyleTag({content: `
.system-detail-intro { padding-bottom: 30px !important; }
.system-detail-copy { padding-right: clamp(24px,4vw,72px); }
.mock-tabs { display:flex; gap:30px; border-bottom:1px solid var(--library-rule); margin-bottom:32px; }
.mock-tabs span { display:block; padding:0 0 13px; color:var(--library-muted); font-size:13px; white-space:nowrap; }
.mock-tabs span:first-child { color:var(--library-ink); border-bottom:2px solid var(--library-ink); margin-bottom:-1px; font-weight:600; }
.system-detail .detail-row { display:block !important; border:0 !important; padding:0 0 34px !important; }
.system-detail .detail-row:nth-of-type(n+4) { display:none !important; }
.library .system-detail .detail-label { margin:0 0 12px; font-size:12px; font-weight:600; color:var(--library-muted); }
.system-detail .detail-content .detail-thesis { font-size:25px; margin-bottom:12px; max-width:28ch; }
.system-detail .detail-content > p { max-width:55ch; }
.detail-fit { display:grid; grid-template-columns:1fr 1fr; gap:22px; }
.detail-fit>div { padding:0; }
.detail-principles li { padding-bottom:18px; }
`});
await page.evaluate(() => {
 const copy = document.querySelector('.system-detail-copy');
 const nav = document.createElement('nav');
 nav.className = 'mock-tabs';
 nav.setAttribute('aria-label','System details');
 nav.innerHTML = '<span>Overview</span><span>Design</span><span>Collection</span><span>Sources</span>';
 copy.prepend(nav);
});
await page.waitForTimeout(5000);
await page.screenshot({ path: 'output/layout-exploration/a-tabs.png' });
await browser.close();
