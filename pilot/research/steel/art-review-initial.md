# Steel rendered art review

Reviewer: `/root/steel_art`. Date: 2026-10-31 IST. Status: **changes requested** for the revision below. This is an art review; independent QA remains a separate role.

Inspected live `http://127.0.0.1:5175/?view=steel-page` at 1440×1000 and 390×844, plus full-page and capability/stealth crops. Compared actual source captures at the same widths, including source scenes initialized by scrolling.

Revision captured:

- steel.jsx `14e9faebdda0aaacbce48e15663d772c9815af4298e18858e6ea0e77eeded733`
- steel-source-parts.json `1674a59ae57907399844f7e848b6caa290ad74428bd3003637502ac5db442be4`
- layout.css `98d1a695ab7f1c21ad5a462d226bc419443c7075d43eff8748c3c116f91fc48c`

## What works

Desktop opening now preserves the source announcement, logo, navigation, exact wireframe and cyan plane. H1 scale, three-line composition and y500 hero edge match closely. Mobile opening preserves observed source geometry and readable stacked CTAs. Pastel feature bands, alternating desktop media, enterprise black band, blog grid and footer sequence remain recognizably source-driven. No broken image elements or horizontal document overflow were detected during this visual capture.

## Required corrections

1. **Mobile introduction demo missing.** `art-review-mobile.png` shows logos immediately after CTA controls. `art-source-mobile.png` shows cyan terminal panel beginning y574. Restore visible source mobile demo; success means actual terminal illustration appears between controls and customer logos at390px.
2. **Use-case heading overlaps stats on desktop.** `art-review-steel-stats.png` shows title/description over the metric row; `art-review-steel-use-cases.png` has no heading in its lavender plane. Restore a containing block and heading placement inside lavender section. The adapted index itself can remain documented as an authored static adaptation.
3. **Mobile frozen scene geometry clips artwork.** CAPTCHA checkbox and cursor group runs beyond the right boundary; source fits it centrally. Residential proxies cyan plane lacks globe entirely and labels fall beyond the right boundary. Compare `art-review-steel-stealth-mobile.png` with `art-source-stealth-mobile.png`. Some retained fixed desktop transforms remain in DOM, e.g. CAPTCHA `translate:257px 199.5px; width:224px` puts the card x277 at390. Scale scene coordinates or supply source-sized mobile static scenes. Restore globe from actual source evidence/assets; do not call an empty plane faithful.
4. **Encoded SVG mask URLs corrupted.** Utility icons render as solid colored squares, avatar as square. Current mask data URL includes encoded SVG `mask="url(#m")"` rather than `mask="url(#m)"`. Likely nested `url(...)` rewriting catches the data URL's own content. Preserve data URLs byte-for-byte before resource rewriting. Success means source pictograms and avatar render, not squares.

## Boundaries

Static demo frames, source animation timing, adapted use-case layout and unseen backend behavior remain disclosed limitations. Current red oversized footer logo differs from earlier purple frame but is plausibly source animation state; do not claim frame identity. Changed output invalidates affected findings until rechecked.
