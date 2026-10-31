# Art direction: catalog typography and density

Role: art director, actual agent `/root/art_direction`.
Mode: original library UI refinement. This is direction for implementation, not independent QA.

Inspected the supplied screenshot with `view_image`, both visual-analysis and product-design reports, and actual `pilot/src/catalog.css`, `system-browser.css`, and `library-tokens.css`.

The repeated serif item titles currently compete with “Sections.” Large vertical gaps make each caption feel like several detached rows. Preserve the existing editorial serif/sans pairing and the large preview images; establish hierarchy through scale and proximity.

## Final contract

Use 28px/36px collection headings and 18px/24px card titles across Sections, Pages and Design Systems. This gives an unambiguous 1.56 scale ratio while retaining the present character. Keep existing metadata and description sizes (11–13px depending on role), rather than shrinking the supporting information.

Use 12px preview-to-caption padding, 6px label-to-title, 4px title-to-next-detail, 12px last-detail-to-divider, and 10px divider-to-footer padding. Keep existing footer link padding. The 4px title gap is appropriate because serif line boxes already provide optical breathing room; 12px before the divider keeps actions distinct without making the caption sparse.

Apply the same shared title and spacing tokens to page/system captions. Page descriptions may retain their current readable line height and natural wrapping; system palettes should sit close to the title, with 12px before their divider. Keep preview dimensions, grid gutters, catalog heading-to-grid separation, typography inside previews, and filter dimensions unchanged.

On mobile preserve 28px/18px hierarchy and this compact rhythm. Let text wrap; do not impose clipped caption heights. This is an authored refinement, not a claim of exact source recovery. No unavailable assets or font substitutions are needed.

## Required delivered-output review

Independent QA must inspect actual desktop/mobile captures at the delivered CSS revision. Confirm that the heading clearly outranks every card title, title and description read as one group, wrapped details remain readable, divider/action alignment is sound, and the preview styling is unaffected.
