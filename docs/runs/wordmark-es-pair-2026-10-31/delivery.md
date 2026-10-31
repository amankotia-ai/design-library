# e–s correction

Added `es: -15` to the existing live wordmark pair map (−0.015em, nominally 0.42px tighter at 28px). Previous `De: -25`, `ig: 4`, `gn: 12`, `br: 4`, and `ry: -6` are unchanged. Advance/viewBox and CSS width now agree at 6556 font units / 6.556em.

Actual 3× wordmark and complete brand captures were inspected. Browser checks at 1440/390/320px passed for correct offsets, unchanged 4px signature gap, exact accessible home-link name and no overflow. Production build passed in the existing runtime mirror. Component/CSS hashes are retained. Sizes, baseline offsets, glyph shapes and assets are unchanged.

User feedback overrides the earlier native-es recommendation. Prior visual/product constraints remain applicable. Current art review by `/root/typography_art` and independent QA by `/root/typography_qa` are in this run; qa.md records the final verdict. `/root` implemented the correction and captured the actual output.
