# Editorial sections: visual evidence and expansion rules

Analyst: real agent `/root/visual_analysis`. Date:2026-10-31. Ownership: this report only. This is source analysis, not final implementation QA.

## Inspected actual images and data

From `../Render Assets/grid-study/dist/assets/`: `ref-16-1.webp`, `ref-16-2.webp`, `ref-22-1.webp`, `ref-22-2.webp`, `ref-27-1.webp`, `ref-27-3.webp`, `ref-29-1.webp`. Also inspected the current `pilot/public/previews/quiet-serif.png`, related records in `dist/data.js`, and the imagery-origin note in the sibling README. Coordinates and ratios below are approximate raster readings, not recovered CSS.

The current Quiet Serif hero establishes a slender native condensed serif, compact light sans paragraph, near equal image/text split, generous blank space, and neutral interface surfaces. New sections should carry those shared materials while varying composition. The source images show multiple type choices; transferring their layouts into Quiet Serif is original system expansion, never exact reconstruction.

## 1. Project · Information rail + paired images

Evidence: [source16](https://x.com/berlickfold/status/2033943094652019066). Desktop `ref-16-1` shows a narrow left information region beside two tall photographs. Its overlay makes a roughly3/5/4 twelve-column division visible. The paragraph and metadata occupy about2columns, with a true blank column separating them from the first photo. Both photos have the same displayed height; different widths result in different crops. The paragraph sits low in the frame, followed by small label/value rows.

`ref-16-2` is actual mobile evidence. It recomposes the pair above the copy and metadata. The broad first photo occupies approximatelythree quarters of the inner photo width, with a narrow second crop beside it. Below, the paragraph and metadata use aboutthree quarters of the page width, leaving the last column empty. This behavior is observed, not invented.

Expansion contract: twelve-column desktop3/5/4, copy capped to2columns, aligned photo heights, no stretching. Mobile pair3/1 above three-column copy. Original linen/portrait or landscape assets can replace the campaign imagery; that substitution and new copy must be explicit. Metadata values should be sample project information, not fictitious commissioned-client claims.

## 2. Feature · Offset heading + media

Evidence: [source22](https://x.com/berlickfold/status/2019820455486693593). `ref-22-1` is a software page grid: small statement on the left, headline and supporting paragraph in the right half, an action/number band below, and a broad lower media region. It is not a finished photography section. `ref-22-2` is a project page: top navigation occupies a large upper band, then narrow left text and metadata next to a broad photo region. Text spans roughlyone quarter, media roughlythree quarters.

Expansion contract: preserve an explicit horizontal band for heading/copy and a distinct media band. A Quiet Serif feature with a left display title, compact offset right copy, and unequal image pair is a proposed original adaptation; the exact composition is not directly shown by `ref-22-1`. Keep body text compact rather than filling an entire half-width region. Native serif width62.5% and weight200 belong to the current system; do not imitate source22's sans headline or invent recovered font evidence.

Mobile behavior: no source22 mobile image was inspected. Stack or recompose into four columns as an original adaptation, with readable14/20 body text, source-like measured empty space, and ratio-preserving photos.

## 3. Index · Photo catalogue

Evidence: [source27](https://x.com/berlickfold/status/1984954455230382282). Important distinction: `ref-27-1` is a product catalogue with an open narrow right detail panel over a subdued two-column grid. It is not a photo index. Transfer only the separation between scanning the catalogue and reading focused details. `ref-27-3` contains structural overlays: a broad media region above a small thumbnail strip, with the lower-right half assigned to a compact statement; its project companion has a separate information rail.

Expansion contract: a photography catalogue with a clear image region, small caption/index, and working links is an original editorial interpretation. Do not claim its exact grid or photography layout is source27 recovery. If no detail panel is requested, omit the modal behavior entirely rather than implementing a decorative facsimile. Give each tile a stable aspect ratio and a specific caption. Two-by-two desktop and two-column mobile are proposed rules, not observed source27 mobile behavior.

## 4. Index · Image and text rail

Evidence: [source29](https://x.com/berlickfold/status/1921501628307222909). `ref-29-1` is actual mobile evidence. Inside the narrow white page, a large empty band follows header navigation. Below it, portraits stack in a left rail, with a numbered project list on the right. The image rail is approximately40% of the inner content width, the text/index rail approximately55%, with a small gap. The first listed project is dark; remaining entries are pale. Portraits retain an approximately4/5 aspect ratio.

Expansion contract: preserve side-by-side rails on390px mobile when title lengths allow. Use shorter original project names and General Sans rather than shrink text until illegible. A three-to-two relationship across a five-part visual split is a useful approximation, not an exact source grid. At320px, a proposed adaptation may wrap project labels or increase rail width; test rather than force nowrap. Desktop can widen the same relation or use images as a compact strip, but no actual desktop29 was inspected, so label this adaptation.

If entries are interactive, active state must identify a real selected/anchored project; otherwise a numbered navigation list of ordinary links is sufficient. Pale decorative inactive text should not be copied at unreadable contrast.

## Assets and provenance

Sibling README states `dist/assets/portrait.webp`, `linen.webp`, and `landscape.webp` were created with Imagegen for the grid study, with prompts in `research/image-prompts.txt`. They are demo assets, not Bernardo Lickfold source photography. Reusing copies with that origin retained is appropriate. Do not rewrite or move the sibling originals. Source captures remain attributed design-study evidence.

## Shared visual guardrails

- Grid positions describe roles: text measure stays independent of the available container width, and reserved empty columns stay empty.
- General Sans Light300 paragraph text; Noto Serif Display native62.5%/200 display; no horizontal glyph transforms, synthetic light weights or monospace in original editorial sections.
- Keep photographic color in imagery; neutral paper, ink and fine rules connect the family.
- Image boxes may crop intentionally with `object-fit:cover`; their pixels may not stretch. Explicitly distinguish whole-image containment from crop variants.
- Preserve the previous faithful study captures and source-sized behavior. New sections are original system expansion with source links and disclosed responsive inference.
- QA must inspect actual new desktop and mobile renders, especially narrow information rails, long captions, wrapping labels and image ratio preservation. This report does not establish that pass.
