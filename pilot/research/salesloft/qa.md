# Independent QA: Salesloft / Signal Serif

Reviewer: `/root/independent_qa`, 31 October 2026. Status: **passed with the scoped limitation below**, for the local runtime revision identified by hashes below. Review is bounded to the supplied desktop screenshots and the implemented local sample; it does not establish pixel identity, original mobile behavior, actual Salesloft service behavior, screen-reader support, or cross-browser compatibility.

I directly inspected all four supplied original PNGs under `public/references/salesloft/`, the desktop full-page screenshot `evidence/salesloft/page.png` after the typography and line correction, the earlier individual section captures and earlier 390px mobile capture in `evidence/salesloft/`, and the refreshed 320px full-page capture at `/tmp/sales-final-320.png`. The 320px capture is independently produced from `http://127.0.0.1:5199/?view=salesloft-page`. The screenshot regeneration was in progress; the earlier individual captures are historical and are not evidence for the corrected revision.

Initial findings were routed to `/root`: sans-serif feature and integration headings, fine converging integration lines, and a global outline utility collision. The revised desktop full-page capture shows the typography and line corrections. The live runtime returns a 1px border and no inherited outline for the feature action. The recreated green background, logos, portrait and fonts remain approximations, as disclosed in the system evidence.

At 1440, 768, 390 and 320px, live Chromium checks found no document horizontal overflow, one page h1, no page exceptions and no broken image elements on the assembled sample. At 320px, all four primary navigation labels are visible within the viewport, and Platform navigates to the feature anchor. The product demo's visual action labels and the footer link groups are static spans, avoiding false service actions. The catalog, system, section detail and source routes rendered without page errors; this is not a full interaction audit. At 320px, the queue mockup uses 9–10px text, a readability limitation of the responsive adaptation.

The inspected `5199` runtime source SHA-256 revision:

- `src/salesloft.jsx`: `d4800e8a92ebd722c25e8c6cb9c898499f71a17eeb62a0093c6f16bd57af7b0d`
- `src/salesloft.css`: `a17c9c048345c7afde63f7c9d8dc39d7861cf7cea4273cec28168071a88e2a3c`
- `src/salesloft-tokens.css`: `ff4ecc08f89fd0a428c5fcc5fc0f5b2b870d6859c7edda545aa91e37f67f4bbc`
- `src/main.jsx`: `4cb5b064db1d4b0db2e5058e0cfcbe0910ec1d20d008ad62492a7ad86c6b0c62`
- `src/data.js`: `80d74198585365e32f88ffb56e40e1016df0cfedf0754c35cebfb1e63fce3421`
- `src/catalog.jsx`: `df50b55492d59d94872b3d52db86d9dd5e1edd939ab77182942085305400bb50`
- `src/page-shells.js`: `c83a515e98e9bbb986e330d6b40622f66753450a1c3d0e3a62ab4b89d6a76c6e`
- `src/system-preview.jsx`: `3e3a3b3361e8c63c8e41188174c0f94e9a5594312a41919b552a0569d079bbc2`

The runtime was a separate `/private/tmp/salesloft-runtime` copy; delivery should verify its relevant hashes match the workspace before applying this status to the workspace. Any later changes invalidate affected review.

## Workspace reconciliation

After the review, `src/data.js` changed in the workspace. A direct diff against the reviewed runtime found one change only: the evidence paragraph for the separate Interfere system was updated to describe its server-rendered media, avatar fallbacks and adapted mobile menu/disclosures. No Salesloft registry, sections, references, system count or shared logic changed in that diff. The workspace `data.js` SHA-256 is `57be965ec8d06e314ba1e826c9b7de83684d00bca9227bf9949bdaac0bb489c6`. The workspace `main.jsx` hash matches the reviewed runtime (`4cb5b064db1d4b0db2e5058e0cfcbe0910ec1d20d008ad62492a7ad86c6b0c62`).

Attempts to re-hash the remaining workspace files stalled on filesystem reads during this reconciliation. The runtime hashes above remain the verified review target; no unverified workspace match is claimed for those files.

## Hero comparison follow-up

The 5199 preview's Compare control was retested after a crop correction. Both source and implementation images load at 1440 × 1136, with corresponding standalone hero origins. Side-by-side and Overlay modes work, and the opacity control responded at 70%. The images inspected match the workspace copies: source SHA-256 `54d76bd1f3e574ec33d91ff70fcbca3c80aaf2ab690811661bec4cc0da4b5f42`; implementation `76c657f157eb3cf25a950207f579e1e843a4207198a0f738f62943f1487d1aec`. This comparison makes font, artwork and proportional differences visible; it does not establish pixel identity. At the time of this test the runtime registry contained the comparison entry, but a concurrent workspace edit had removed it; the owner was notified to restore the entry before delivery.

The owner subsequently restored the same comparison entry to workspace `src/data.js`; the reviewed image paths and dimensions match. Workspace `data.js` SHA-256 at that point: `94af02e18098c33a61b21dc6a92bf1c19643ade7b63a2b0cc6b31702f4c8e6cc`. Other concurrent system changes remain outside this Salesloft review.

## Registry metadata follow-up

The owner added `mode: 'Reference reconstruction'` to the Salesloft system record to satisfy the library's internal registry contract. This metadata does not alter the reviewed Salesloft layout or comparison; the current system, filtered catalog, and hero detail screens do not display that value. The Compare control still loads both aligned 1440 × 1136 images without a page error. The workspace and 5199 runtime `src/data.js` match at SHA-256 `108c5be8cafa2d2bd16068750fbad4a1b282e1fb5661f75d689a6512540faebb` at this follow-up. This check is limited to the metadata addition and Salesloft routes, not concurrent changes to other systems.
