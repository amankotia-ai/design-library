# Narrower item descriptions
Start:2026-10-30 21:57:30 UTC (2026-10-31 03:27:30 IST). Deadline:22:17:30 UTC (03:47:30 IST).
Scope: narrower readable text under catalog items, preserving preview/card geometry and existing content/type. Mode: original library UI refinement. Completion: descriptions cap at a shared40ch measure, shrink to available width, no overflow; rendered desktop/mobile check and independent QA.
Baseline UI continues to apply. Freebyrd index/thread/references returned no folder context.
Specialists: visual_review (visual analysis/art direction), product_review (product design), border_qa (independent QA passed).

Visual analysis/art direction: visual_review inspected actual attachment and source, approved40ch cap with unchanged card geometry and left alignment.
Product design: product_review inspected attachment/source; approved page descriptions only, leaving short asset layout labels unchanged.
Implementation: shared --library-card-description-measure:40ch in library-tokens.css; max-inline-size token used by .page-shell-description in catalog.css. No fixed height, truncation or wording change.
Validation: production build passed. Rendered desktop1482×1000, tablet800×1100, mobile390×844. Descriptions344.75px wide versus desktop462px cards; tablet368px cards; mobile358px cards. Text fits with no clipping or horizontal page overflow. Short mobile widths naturally use available space. Font remains13px Geist Sans/21.45px leading. Actual PNGs and metrics retained. Independent QA passed on delivered CSS hashes and actual desktop/tablet/mobile renders. See qa.md.

library-tokens.css SHA256: c8650c028be79ea66c09a8117ae16bc94574134d1a46d7e59aab9990eb428e48

catalog.css SHA256: 2c5d04acc5daa2913bd3fe3c9d6611b3dc34e6bc05e1337e78147ac18950bd2d
