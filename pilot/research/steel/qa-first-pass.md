# Independent Steel QA

Reviewer: `/root/steel_qa`, independent of implementation and source specialists. Status: changes requested; final revision review pending.

Inspected real source `source-hero.png`, source mobile/full evidence, actual output screenshots under `qa/`, source and implementation files. Browser checks used Chromium at 1440 × 1000 and 390 × 844 on `http://127.0.0.1:5175`.

## First pass findings

1. Desktop Resources and mobile Menu toggle `aria-expanded` and expose an outer panel, but the panels contain no visible text. Retained source descendant visibility/inert states need correction. Evidence: `qa-first.json`, `qa/mobile-menu.png`.
2. Page detail preview is clipped: iframe remains 2350px while its document is 14218px. Source50vh hero grows to1175px at this iframe height. Embed measurement must stabilize the source viewport-dependent hero and then resize to content. Evidence: `qa/page-detail-full.png`, observed browser geometry.
3. Mobile source contains browser/terminal demo scenes after the CTAs. Current recreation skips those scenes and reaches customer logos immediately. Desktop-only hydrated DOM has omitted mobile-specific runtime markup.
4. Use-case section retained label field but dropped its heading and introduction in rendered output. Inspect retained scroll animation state.
5. Proxy diagram's canvas is blank, leaving city markers over an empty cyan plane. Recover bitmap or explicitly record unavailable diagram state.
6. System specimen uses LibrarySans despite labelling source Schengen; five palette swatches push the Elements block below the fixed preview crop. Correct the specimen typography/layout.
7. Assembled scrolled section thumbnails can include sticky navigation midway through the section. Generate the final thumbnails from standalone sections or hide the unrelated navigation during capture.

The first desktop announcement capture was clipped to4px. A later current browser measurement verifies y0,h36 and transform:none, so that issue is resolved in the current revision.

## Passing scoped checks so far

- Seven native FAQ disclosures exist and open with visible answer content.
- Clipboard control writes a real prompt to the browser clipboard.
- System, page and section catalog routes include Steel;14 section cards and thumbnails load.
- No observed page errors or failed400+ asset responses across the seven checked routes.
- Main desktop and390px mobile document scroll widths equal their viewport widths.

These checks do not establish final review; parent is correcting the demonstrated findings. Exact final hashes and rechecks will be recorded after the correction pass.

## Concurrent revision invalidation

At approximately22:17UTC, shared runtime registry and main route were overwritten by another active production pass adding Salesloft/Interfere. Steel registration/routes disappeared. A28-route standalone audit therefore reached the library fallback for every Steel section and is retained as failure evidence in `qa-sections.json`, not counted as passing section checks. Earlier screenshots/checks validate only the earlier revision. Final QA must inspect the combined delivered revision after Steel integration is restored without dropping concurrent work.
