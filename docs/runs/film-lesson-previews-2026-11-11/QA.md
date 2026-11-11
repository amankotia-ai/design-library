# Independent QA — film lesson previews

Reviewer: `/root/independent_qa`, an actual independent agent who did not author the implementation. Reviewed 2026-11-11.

Status: **Passed for the requested lesson-preview change.** No blocking defect found in the inspected revision. The repository-wide production build remains separately blocked by an unrelated missing Renders & Mockups data file, as reported by the implementation owner. This review does not mark that build passed.

## Actual inspection

- Viewed the user's full-resolution source screenshot and inspected `film-learnings.jsx`, `film-lesson-thumbnails.jsx`, `film-library.css` and the lesson data module.
- Viewed the complete 16-illustration board, desktop preview and full collection captures at 1440, 768 and 390px. Full-page images establish overall order and rhythm; because their viewer representations are downscaled, also inspected native-size independently captured first-card views at 768 and 390px, the last card at 390px, a 768px page view and the visible-focus 390px capture.
- Independently ran `qa-browser.cjs` against the working local site in installed Chrome. This is separate from the implementation owner's `verify.cjs` run. Detailed metrics are in `qa-browser-validation.json`.
- Ran `node pilot/scripts/check-film-learnings.mjs`: 16 lesson schemas, unique routes, examples and source-section mappings passed.

## Findings

- All 16 lessons have nonempty, distinct concept previews. Documents, connected frames, timing curves, cutouts, layered planes, filmstrips, audio cues, lighting and device crops create useful differentiation without introducing a second visual system.
- Neutral fields, square light boundaries, dark outlines and sparse red accents fit the supplied editorial grid. The existing serif titles, summaries and use cases remain visible; no title clipping or preview cropping was observed.
- Browser measurements confirmed 3/2/1 columns at 1440/768/390px, respectively, and no document horizontal overflow. Each proportional SVG remains inside its landscape preview.
- Every preview has the same destination as its corresponding title. The duplicate preview anchor has `tabIndex=-1` and `aria-hidden=true`; the SVG has `aria-hidden=true` and `focusable=false`.
- At each of the three widths, search for “cadence” returned one lesson and the Motion topic returned three lessons. Tabbing from the topic select moved directly to the first lesson's title, displayed its focus indicator, and Enter opened that lesson's correct detail page. No page errors were recorded.
- No animation or extra product controls were introduced. Pale guide lines are decorative; the meaningful silhouettes and red targets remain recognizable at the inspected card sizes.

## Limits

This is an original illustration extension, not recovered source imagery. The review covers previews and directly related layout/navigation behavior, not all pre-existing film-detail interactions, every browser, or whole-site accessibility certification. Source attachment comparisons establish preservation of the visible title/summary/use-case structure; the lesson schema check validates content integrity. The parent-reported repository build failure is outside the lesson-preview files and remains an explicit limitation.

## Reviewed revision — SHA-256

| File | SHA-256 |
| --- | --- |
| `pilot/src/film-lesson-thumbnails.jsx` | `e2711c32c6e07a84b8b62dacfede8ea78ce3fa247d815e25af19d727d95afe1e` |
| `pilot/src/film-learnings.jsx` | `788d016afc6110d1b4f20701dead07fa166826c5cef952df15cf2669861388c6` |
| `pilot/src/film-library.css` | `a5786e3ac56f1d583ad50990edff7126361050433b7c54e2ef79d7aa4469c518` |
| `pilot/src/film-learnings-data.js` | `9f6ee4c93faa0ec0c28d85770f097bf951daf15a89538bc6c79d1f9c6b5d6392` |
| `illustration-board.png` | `89511bf45b2c3f21989fad394106f98a755537fd9ded148f04524372506f5b3e` |
| `desktop-preview.png` | `401b5367b5e574ddd450e25c36d3c9449fbe4140df352127fc8e2559c9844703` |
| `lessons-1440.png` | `1709362951efba3336893cadd503b854c469f53ebcbbb2f2fb54bcaeaf6f74c8` |
| `lessons-768.png` | `d2f4182f2dc54d5bc82605d87900506ea53401544e2e250617e56398770438f5` |
| `lessons-390.png` | `4e45e507afa7f8821933cc0bd1183daa2b47ae77fa262a76dbfc8ca2e0533055` |
| `qa-first-card-390.png` | `117825c98a60005410bad834ea450a2b4566140796f831e89182ebeb5dbd1af8` |
| `qa-last-card-390.png` | `ae17a8e7a391d1bfd3b08da7a80d103a42f5af6c4225c5d222946c248bdb5495` |
| `qa-page-768.png` | `b6daff0b33e83398d2cacc5c1a06e43d82724cc36d7f93dea9b41354f0c083e7` |
| `qa-browser-validation.json` | `330b8d0bf636e82d19019961416f2b4d968d2eebd3b55024250bda172e9b344a` |

Any implementation changes invalidate the affected portions of this review until re-inspected.
