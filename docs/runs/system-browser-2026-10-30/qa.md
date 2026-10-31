# Independent QA — system browser

Reviewer: `/root/independent_qa`, separate from implementation, visual analysis, product design, and art direction.
Status: **passed within the scoped checks below**. Inspected final revision on 2026-10-30. Exact six affected source hashes, four delivered screenshot hashes, and check results are in `qa.json`.

## What I inspected

I inspected the actual delivered homepage desktop (1440px), homepage mobile (390px), Cobalt Grid detail desktop, and Quiet Serif detail mobile PNGs, as well as the independently captured 768px homepage (`qa-home-tablet.png`). I read `system-browser.jsx`, its stylesheet, relevant registry metadata, and the browser entry point. I used the working Chromium preview at `http://127.0.0.1:5175/` and checked that all six affected source files match the retained runtime byte for byte.

The homepage visibly distinguishes the editorial photographic split, original Cobalt hero, and Blueprint editor; all three tiles provide names, separate production-mode labels, palette/type hints, section counts, and working entry links. The two blue collections are explicitly described as related. The detail hierarchy contains practical fit, tradeoffs, composition principles, extension rules, tokens, inventory, and evidence limits. The source collection does not present the backend as recovered.

## Checks

`qa-check.mjs` completed **68 scoped checks with zero failures and zero browser errors**. Coverage includes:

- Three image-backed cards at 1440, 768, and 390px; images decode and no document horizontal overflow.
- Each card opens the correct system detail. Section counts are 4, 5, and 10; all details contain guidance and evidence. Each system's first inventory link opens its Study, and its assembled-page link preserves the correct page selection.
- All three detail pages fit 390px. Home and detail navigation use actual anchors. The system select updates the displayed system and URL, and reload preserves it.
- Legacy query links for `page`, `signal-page`, `blueprint-page`, `hero`, `quote`, `signal-workshop`, and `blueprint-editor` still open their selected Study.
- Keyboard Tab reaches the dismiss control and brand link; focus has a visible outline. Enter activates Home; native select type-to-select changes to Cobalt Grid. Side-by-side and overlay comparison still work.
- Cobalt Grid's final typography specimen computes to `LibrarySans` (local Inter), matching its label.
- Project/runtime equality and final affected source/capture hashes are recorded.

## Finding and correction

The initial Cobalt Grid detail showed an editorial serif specimen despite its Inter label. I reported the stylesheet cascade defect to the implementation owner. The owner added a scoped sans-serif rule, synchronized runtime, and recaptured the delivered previews. I inspected the corrected desktop image and checked the computed family in the final revision. This finding is resolved.

The first harness run attempted native arrow-key selection in headless macOS and did not change the selection. Native type-to-select (`c`, Enter) was exercised successfully instead. An early navigation timing race was corrected in the harness; neither harness issue is claimed as a product defect.

## Limits

This review covers the requested browser/navigation/content revision in Chromium. It is not a full screen-reader or cross-browser certification, and does not revalidate all unchanged section interactions or source reproduction geometry. I followed a representative inventory entry per system, not every one of nineteen inventory links. No blocking finding remains in the inspected scope. Changes to affected files or captures invalidate the corresponding review scope.
