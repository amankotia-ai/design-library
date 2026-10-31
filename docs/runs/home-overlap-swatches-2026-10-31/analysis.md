# Overlapping palette swatches

Reviewer: /root/cleanup_analysis; combined visual/product/art direction pass for a small explicit styling request. Inspected the actual attached `Screenshot 2026-10-31 at 2.04.09 AM.png` and current `.card-palette` CSS.

The screenshot isolates three separated circular palette swatches beside the font label. User asks for the colors to overlap. Retain16px circles, remove row gap, apply a5px negative left margin only to each swatch immediately following another swatch, and retain12px positive separation before the font label. Give swatches flex:none to preserve circles in narrow layouts. Let later swatches naturally cover the preceding swatch edge; no animation or extra outline is needed.

Acceptance: adjacent swatch circles overlap by5px on desktop/mobile, colors and title labels stay unchanged, first swatch remains aligned to its existing left edge, font label stays visibly separate, and palette/card layout has no overflow. Do not overlap the typography text or alter system-detail palette tokens.
