# Character-level visual spacing analysis

Reviewer: `/root/typography_visual`. Inspected the actual user's `Screenshot 2026-10-31 at 2.32.56 AM.png`, `native-comparison.png`, and `before-name-2x.png` with the image viewer. These observations concern the rendered Geist Serif wordmark and its existing 0.22px optical stroke.

## Observed change needed

The current −0.025em tracking removes 0.7px per advance at 28px. It produces a tight black run through “sign” and “brar”, while the explicit word-space addition makes the break between words comparatively open. The native comparison gives the lowercase shapes room to separate. Use native OpenType pair kerning and zero blanket tracking/word-spacing as the base, then make only small local optical corrections. Avoid disabling native kerning when applying corrections.

## Pair-by-pair starting adjustments

Values below are optical deltas **relative to native Geist Serif**, not to the previous tracked version. Positive means open the pair. Pixel examples assume 28px type and scale proportionally at smaller sizes. These are visual judgments, not recovered foundry metrics.

| Pair | What the actual render shows | Delta from native |
| --- | --- | --- |
| De | Rounded D/e side profiles make a reasonably even native gap; blanket compression makes it slightly pinched. | 0em / 0px |
| es | Native e/s spacing is already close; preserve the narrow curved-side relationship. | 0em / 0px |
| si | Thin i is compressed against the s in the current crop; native spacing restores its separate vertical stroke. | 0em / 0px |
| ig | i serif and g's upper bowl become dense under the extra stroke; a slight opening helps at small sizes. | +0.004em / +0.11px |
| gn | Most visibly crowded pair: g's high rightward ear meets the n's entering serif and appears almost joined. Native is better, but still merits a small opening. | +0.012em / +0.34px |
| n–space–L | Current extra word-space contrasts strongly with the tight words. Native space is a sound starting point; do not add a new blanket word-space expansion. | 0em beyond native space |
| Li | L foot and the narrow i have different top/bottom negative space, but native pair is balanced. | 0em / 0px |
| ib | Native has clear separation between the i stem and b ascender; no additional intervention is needed. | 0em / 0px |
| br | b shoulder and r entry look cramped in the current crop; native resolves most of it, with a tiny extra clearance useful under the optical stroke. | +0.004em / +0.11px |
| ra | Native r overhang sits over the a's open upper-left space naturally. Do not open this pair as if it were two vertical stems. | 0em / 0px |
| ar | a exit and r entering serif are close but legible at native spacing. | 0em / 0px |
| ry | Diagonal y leaves more apparent white than adjacent bowl pairs; a slight tightening can keep the word ending cohesive. | −0.006em / −0.17px |

## Implementation/review constraints

- Preserve live text and the actual family. Avoid individual absolutely positioned glyphs, outline conversion, or CSS transforms that blur glyph edges.
- If pair spans are used, preserve the accessible name “Design Library of Manks” and the real inter-word break. Check whether DOM segmentation changes native kerning; an em delta must not silently substitute for the font's own pair correction.
- Keep red signature size/baseline/gap unchanged in this pass. The wider native wordmark consumes approximately 8–10px more width than old blanket tracking, so the narrow navbar fit needs fresh measurement rather than assuming earlier checks still apply.
- Assess the rendered result at normal 28px/24px scale as well as the enlarged crop. A 2× crop can reveal joins but should not lead to airy display lettering that feels disconnected at actual size.
- This is pre-implementation visual direction. Final independent QA must inspect the delivered revision.
