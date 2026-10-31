# Visual analysis: catalog typography and detail spacing

- Role: visual analyst, actual agent `/root/visual_analysis`.
- Mode: original library UI refinement. Attachment is evidence of the before state, not a reproduction target.
- Inspected attachment: `/var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_Ssaxme/Screenshot 2026-10-31 at 3.10.15 AM.png` using `view_image`.
- Native image: 2964 × 1644; displayed review image: 2048 × 1136. Display-image distances below are approximate and are not CSS pixels.

## Observed

The top “Sections” heading reads at roughly 35 display pixels high in its line box; item titles read at roughly 31. Both have the same serif face, regular weight and dark color, so the modest size difference communicates little hierarchy. Card metadata, item title, description and footer occupy separate bands: the first card's image ends around y=516, system label sits near y=551, title near y=598, description near y=647, divider at y=694 and footer near y=736. This yields about 220 display pixels of caption area. Repeated large inter-band gaps contribute more to the looseness than text line height.

Source confirmation from `pilot/src/catalog.css` and `pilot/src/system-browser.css`: catalog heading is 24px; asset item title is 21px; item title has 12px margins above/below; description has 24px bottom margin; footer has 15px top padding. Shared caption padding is 16px. The heading/item ratio is only 1.14.

## Recommended contract

Keep the serif face and regular weight. Use a clear size hierarchy: 28px/34px catalog heading and 18px/24px item title (ratio 1.56). Keeping a 24px heading is also viable if paired with the 18px title; the essential correction is lowering item-title prominence.

Group the card label/title/description with compact spacing: image-to-caption 12px, label-to-title 6px, title-to-description 4px. Retain 11–12px metadata and description sizing. Reduce description-to-divider space to 12px and divider-to-footer padding to 10px. Avoid reducing footer link hit area merely to achieve density. Preserve card image aspect ratios, existing grid width, and section-heading-to-grid spacing.

For wrapped descriptions, retain equal row alignment through layout rather than imposing a fixed caption height that clips content. Mobile should preserve the same hierarchy and compact within-card spacing.

## Limits

Font choice is established by existing source; no font recovery is claimed. Attachment cannot establish hover, focus or mobile behavior. This is analysis of the before state and a proposed contract, not independent QA of the delivered change.
