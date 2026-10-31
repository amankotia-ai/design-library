# Independent QA — transparent dropdowns

Reviewer: `/root/independent_qa`. Status: **Passed**. No blocking findings.

Reviewed canonical/runtime `style.css` SHA-256: `92c493ac5dee1cfcc4fe18093ee3915e947193ed9f82e59fd3e417199e167924`; byte-identical copies.

Own Playwright session (`/tmp/qa-transparent-dropdowns.cjs`) checked Sections, Pages and hero-detail Design system selects. Normal and hover computed background is rgba(0,0,0,0); SVG arrow retained; pill radius remains9999px and height36px. Filtering gives8 Quiet Serif sections and Clear restores18. Actual results retained in `qa-checks.json`.

Inspected rendered `dropdown.png` using image viewer. Control has the requested unfilled surface, with original outline,text and chevron intact. QA made no application edits.
