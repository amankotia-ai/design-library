# All systems link underline

- Start: 2026-10-31 06:49:05 IST; deadline: 07:09:05 IST (20-minute active-work budget).
- Scope: remove the line under the system detail view's All systems link, retaining its navigation and keyboard focus. Completion: verify the rendered link and build, then independent QA of the delivered revision.
- Mode: existing library interface adjustment. Reference: user screenshot of the link. No asset or font reconstruction.
- Freebyrd index, thread, and references returned no folder context. `/root/visual_analysis`, `/root/product_design`, and `/root/art_direction` identified the visible shadow and interaction requirements; `/root/independent_qa` reviewed the delivered revision.
- Implementation: removed the link's box shadow in `pilot/src/system-browser.css`, SHA-256 `c05c5861c2c82329a14646c671578dd75429d4bb397ebeafa85f4c102600f487`.
- Validation: `npm run build` passed. Independent QA checked normal and keyboard-focused states at 1512px and 390px, confirmed navigation and the red active topic underline, and found no blocking issues. Captures: `output/back-link-qa/{1512,390}-{normal,focus}.png` and `output/back-link-1512.png`.
- Review: passed by `/root/independent_qa` on the CSS hash above.
