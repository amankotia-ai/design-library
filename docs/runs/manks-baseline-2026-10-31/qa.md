# Independent baseline and spacing QA

Status: passed. Reviewer: `/root/typography_qa`. No blocking findings.

Inspected the current CSS, actual new logo crops at 1440, 390, and 320px, and an independently captured 320px viewport (`qa-top-320.png`). The handwriting body now sits optically with the black wordmark baseline, while its natural ascenders/descenders remain visible. The wider space clearly separates the two phrases without breaking the grouping.

Independently checked the live current homepage at 1440, 768, 390, and 320px; results are retained in `qa-checks.json`. The signature loads at each size; its measured gap is 12px desktop/tablet and 10px mobile/narrow. The transform is 2px down desktop/tablet and 1px down mobile/narrow. No horizontal overflow or text/image collision. The 320px signature ends at x=295.65625, within the 296px content edge (0.34375px spare) and 320px viewport. Navigation remains on its own row there.

The brand remains one home link with accessible name “Design Library of Manks”; Geist Serif wordmark and signature asset remain intact. The parent's ink-percentile baseline measurement is consistent with the visual inspection, but this review does not treat an approximate handwriting baseline as a universal mathematical baseline.

Inspected SHA-256: `pilot/src/library-tokens.css` = `d2ff0486f7a7152f47f28a160628e09bd5dc062c1417d97af625e91848b03b2e`; `pilot/src/main.jsx` = `5f7ddd424df3c64a21ac76497a9cf6373799f6252408d8874f1f0ec5bef3f1d2`. Scope is this baseline/spacing correction and header fit; prior font/asset QA remains separately recorded. No implementation edits made.
