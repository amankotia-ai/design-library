# Character-level spacing

The old wordmark used uniform −0.025em tracking and +0.025em word spacing inherited from its previous sans-serif font. Those blanket settings are removed for this wordmark. Geist Serif's native pair kerning is retained, with four optical corrections to address the actual rendered letters:

| Pair | Additional adjustment relative to native kerning |
| --- | --- |
| ig | +0.004em |
| gn | +0.012em |
| br | +0.004em |
| ry | −0.006em |
| De, es, si, Li, ib, ra, ar | Native |
| Word space | Native |

`brand-wordmark.jsx` uses one live SVG text node, rather than outlines or segmented inline-block characters. At 1000px type size, a measured unadjusted text node and the same text with fourteen zero dx values had exactly identical glyph start positions and 6582-unit advance. Explicit relative dx adjustments add 14 units for a final advance of 6596. This preserves the foundry's native kerning while making the chosen pair adjustments inspectable and repeatable. The text remains selectable and uses the actual local Geist Serif font.

Independent QA also measured the transformed, displayed SVG. Browser per-character rounding adds approximately 0.11 CSS px to the final cumulative offset at 28px size compared with the mathematical corrections. The exact equality above describes the untransformed 1000-unit measurement, not pixel-identical glyph placement at every screen size. Actual rendered balance was reviewed independently at display size.

The SVG bottom aligns to the surrounding inline text baseline. The original 0.22px optical weight adjustment uses a non-scaling SVG stroke. Signature dimensions, baseline offsets and 4px box gap are preserved. Only the ≤380px wordmark changes from 22px to 21.5px to retain fit with the more open spacing; at 320px the full brand is 269.81px within 272px available. It remains a single accessible home link named “Design Library of Manks”.

Actual captures cover 1440/768/390/320px, including enlarged type specimens and a padded final wordmark crop. A bare element screenshot can cut a last glyph's optical overhang; the padded final crop and complete brand captures include it. Implementation overflow remains visible and does not clip letters.

Production build passed in the established runtime mirror. Affected source matches the workspace; hashes are in revision-sha256.txt. Other ongoing catalog/navigation changes were retained. Independent final review is recorded in qa.md.

Production roles: `/root` implementation and browser evidence; `/root/typography_visual` actual character-pair inspection and measured optical deltas; `/root/typography_product` shaping/accessibility/narrow-fit constraints; `/root/typography_art` actual final visual review; `/root/typography_qa` independent delivered-revision review. Their reports remain separate.
