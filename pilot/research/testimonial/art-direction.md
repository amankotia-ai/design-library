# Quote expansion: art direction

Art director: `/root/testimonial_art` · 2026-10-30. Read the visual analyst and product designer handoffs, inspected actual `public/references/17-testimonial.jpg` and delivered pilot `evidence/page-desktop.png` with the image viewer, and reviewed shared tokens. This file defines direction; rendered review remains pending.

## Protected character

The source is a continuous rectangular composition: grayscale portrait, very light quote plane, large thin serif, small restrained attribution. Its hierarchy comes from scale and negative space. Retain square corners, no shadow, no extra accent, and no decorative quotation icon. The quote itself can carry the opening quotation mark. The surrounding source grid is presentation framing and stays outside the bounded card study.

## Two explicit modes

**Faithful reproduction study:** card canvas 1943 × 724. Portrait left 579px, quote plane remaining 1364px. Source quote ink begins around card x813/y126. Attribution begins around x814/y559, preceded by a small vertical rule at x780. Preserve the four observed source line breaks in this measured mode. Start with shared Noto Serif Display weight200 at about82px/80px, but use a less condensed width than the hero if native captures show it is needed. Use the actual source crop for alignment and keep font substitution visible. Exact source typography is unavailable; geometry and matching the four line cadence take precedence over claiming exactness. The quote plane has observed #f6f6f6 fill; make this an explicit shared quote-surface token instead of hiding a layout-specific color among geometry rules. Attribution may use an inferred system monospace in this mode. Label that substitution.

**Original system expansion:** use the existing paper/ink/rule, serif and sans tokens. Portrait variant follows approximately30/70 desktop split, with generous interior whitespace and natural wrapping. This is an adaptation, not a recovered unseen page. On mobile, image above text,20–24px side padding,36–44px serif, legible metadata and auto height. Use original sample copy with “Studio note · illustrative copy” or equivalent visible context. Avoid ratings, carousel controls, client logo and motion because no evidence supports them.

## Page assembly

Use the original text-only statement variant between Feature and Footer. The existing Feature already uses this portrait; repeating it would weaken the assembly. Place a small section label on the established left rail and the serif statement on the existing content anchor around column3. Give the statement enough width for a deliberate two- or three-line composition without imposing source line breaks on the original copy. Thin rule, generous vertical spacing, and subordinate illustrative attribution are sufficient. Update Footer numbering to03 if the new statement is02. The statement should be quieter and shorter than the footer invitation; avoid a second full-height hero.

The library shell keeps its measured reading layout. Add Quote to native controls and align comparison metadata with the selected section, rather than creating another hero-only exception. Desktop Quote preview defaults to faithful study; mobile preview defaults to original adaptation. The standalone original can be opened separately with explicit mode and accessible source context.

## Review criteria

- Native1943×724 source/implementation comparison: portrait boundary579px, panel fill, quote origin, four line cadence, metadata origin and rule. Evaluate typography as an approximation separately.
- Original portrait desktop and390px/320px mobile: no clipping, natural reading order, no cramped quote, clear illustrative label.
- Assembled desktop/mobile: statement aligns with the existing rail, spacing gives a clear pause without duplicating the portrait, Footer numbers and hierarchy coherent.
- Library: Quote preview and comparison are reachable, context labels disclose source reproduction and substitute fonts, and selecting Mobile opens the adaptation.
- Current rendered captures must be inspected before any art pass is declared. Independent QA is a separate role.

Status: direction delivered; no rendered implementation reviewed yet.
