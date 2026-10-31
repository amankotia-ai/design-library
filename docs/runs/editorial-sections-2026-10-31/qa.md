# Independent QA — four Quiet Serif sections

Reviewer: `/root/independent_qa`, independent of this task's design and implementation.
Status: **passed within the scope below**. Reviewed 31 October 2026 IST (30 October UTC). Exact final affected source/runtime and delivered image hashes are recorded in `qa.json`.

## Evidence inspected

I inspected all four actual retained reference images: the narrow project rail with paired images, shared horizontal hinge, image catalogue, and mobile image/list rail. I inspected all eight new desktop/mobile section captures, the four-card rendered example browser, assembled desktop/mobile page captures, mobile Study capture and system detail capture. I also independently captured tablet views, inspecting the project and image rail tablet PNGs, and read the new JSX/CSS and assembly/navigation code.

The sections transfer distinct layout decisions rather than presenting themselves as faithful reconstructions: the project rail sits beside unequal image spans, the material title and two images share a horizontal starting edge, the catalogue has independent linked entries, and the numbered rail is a working selection interface. Retained source images remain separate from generated sample imagery.

## Validation

The independent `qa-check.mjs` completed **130 scoped checks with zero failures and zero browser errors**. Results and measurements are preserved in `qa.json`.

- All four standalone sections were checked at 1440, 768 and 390px for document fit, loaded cover-cropped images, heading bounds and untruncated paragraph bounds. No horizontal overflow or clipped text was found. A project paragraph expanded to four times its original length grows the mobile section without horizontal overflow.
- The assembled page fits all three viewports, loads every image, has unique IDs, and follows Hero → PhotoIndex → ProjectPair → Feature → SplitMaterial → Quote → ImageRail → Footer. The existing Quote ID remains `perspective`.
- At desktop and mobile, all four native rail buttons were activated with keyboard Enter. The active state, current heading, copy, and all three image URLs change correctly. Each image slot cycles through all four source images. Focus remains on the activated button; image-frame and section dimensions remain stable across selections.
- The four catalogue entries link to four distinct, existing project/material/portrait/practice targets. Hero navigation resolves Work to `#work`, Articles to `#notes`, About to `#about`, Contact to `#contact`.
- The Study contains four real rendered preview cards with loaded media and all four new dropdown entries. Each new section opens the correct live preview, has Compare disabled, uses a 390px mobile iframe, and provides the correct mobile Open URL.
- Sources contains seven references, including all four new Bernardo Lickfold attributions marked as original expansion evidence. The assembled disclosure explicitly identifies the generated assets from the earlier grid study; image alt text and new Study captions likewise distinguish generated imagery from the retained portrait reference.
- A fresh faithful hero screenshot at 2030×1128 is raster-identical to the retained `hero-faithful.png`, confirming preservation of that source-study branch. This is preservation of the existing substitute-font reconstruction, not a claim of exact typography recovery.
- Eight affected source/CSS files match their runtime counterparts byte for byte. Source hashes, all delivered section/assembly/Study captures, reference images, generated assets and browser preview images are recorded.

## Findings and limits

No blocking product finding remains. An initial harness assumption expected the Quote ID to be `statement`; inspection confirmed the existing ID is `perspective`, and the harness was corrected. No implementation change was needed for that test correction.

This is a Chromium review of these original sections and their library/assembly integration. It is not a cross-browser, screen-reader, or unrelated Blueprint/Signal demo regression audit. The four new layouts are authored expansions with generated sample assets; source-sized reproduction fidelity is not claimed. Text growth was stress-checked on the project paragraph, not arbitrary-length content in every field. Changed affected source or captures invalidate the relevant review scope.
