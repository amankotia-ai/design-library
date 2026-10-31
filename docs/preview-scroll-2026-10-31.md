# Preview scrolling adjustment

- Start: 2026-10-31 04:15:42 IST; deadline: 04:35:42 IST.
- Scope: make the page-card preview frames non-scrolling while preserving their appearance and normal outer-page scrolling. Other preview contexts and standalone pages remain usable.
- Completion: verify wheel scrolling over a page card moves the library page without moving its embedded preview, check keyboard navigation, and run the applicable project checks. Independent QA reviews the delivered revision.
- Mode: existing interface behavior adjustment; the supplied Pages screenshot is the visual reference. No reference reconstruction or system expansion is requested.
- Visual analysis and product constraints: `/root/visual_analysis` inspected the screenshot and shared `PagePreview`; `/root/art_direction` reviewed the frame styling and recommended preserving the existing crop and dimensions.
- Implementation: the page-card iframe is inert, excluded from the accessibility tree and tab order, and does not receive pointer events. The separate system-detail preview retains its existing interactive behavior.
- Independent QA: `/root/qa` inspected the built preview at 1512 × 861 and confirmed a wheel gesture over the Revenue platform card scrolled the outer page from 0 to 861 pixels; Tab reached the Portfolio homepage link without entering the frame. Review status: passed for requested behavior. Screenshot: `/tmp/design-library-scroll-qa.png`.
- Reviewed SHA-256: `system-browser.jsx` `0b91b5233b3ee428645789fdf3e72385ec9025ba0406c628f94957eb5bb97b5c`; `system-browser.css` `1b05032c66fec242806947ad3673a385a98b59f8fcd24484103edaf21ef74ba9`.
- Evidence limit: the temporary build preview did not load some image, font, and Blueprint assets, so visual fidelity was not established. The interaction change does not alter the frame dimensions or crop. The project check passed; an isolated Vite build succeeded with public asset copying disabled.
