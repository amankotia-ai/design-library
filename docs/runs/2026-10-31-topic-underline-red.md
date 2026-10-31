# Active topic underline color

- Start: 2026-10-31 06:42:32 IST; deadline: 07:02:32 IST (20-minute active-work budget).
- Scope: match the active topic underline to the red in the existing “of Manks” signature. Completion: update the shared color token and active underline, verify desktop/narrow states and keyboard focus, and independently review the delivered revision.
- Mode: existing library interface adjustment. Source: `pilot/public/assets/of-manks-signature.png`; the most common opaque signature red is `#f60f30`, sampled from the raster, which contains neighboring colors from antialiasing and raster variation.
- Freebyrd index, thread, and references returned no folder context. `/root/visual_analysis`, `/root/product_design`, and `/root/art_direction` inspected the asset and interaction; `/root` implemented the change and `/root/independent_qa` reviewed it.
- Implementation: `pilot/src/system-browser.css` SHA-256 `59e0ed21a955f9d1744e3bede5df2f74e14f7f4445894b6e5b655b8f5f3e6990`; `pilot/src/library-tokens.css` SHA-256 `7765589ae094b8650979fbeebc56dd0945257f3ae29d6b242f234ceac79d8049`. The sampled red is stored as a shared library token and applied only to the selected underline.
- Validation: `npm run build` passed. Independent QA inspected 1512px, 701px, and 390px with mouse and keyboard, verified the sampled red, focus and selection, and found no document overflow. Captures: `output/topic-red-qa/{1512,701,390}-{mouse,keyboard}.png` and `output/topic-red-preview.png`.
- Review: passed by `/root/independent_qa` on the hashes above; no blocking findings.
