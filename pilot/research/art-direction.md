# Pilot art direction

Run: `editorial-01`, 2026-10-30. Author: real specialist agent `/root/art_direction`. Scope: direction and comparison review, no application implementation.

## Inspected evidence

I visually inspected the actual originals `public/references/21-final.jpg`, `21-grid.jpg` (2350 × 2700 each), and `17-testimonial.jpg` (3044 × 1760) with `view_image`. The original files contain staging outside their website sections. The hero's measured section target from the analyst handoff is 2030 × 1128, with a 1028/1002 split. These dimensions are the reproduction target, not a universal responsive page ratio.

The source 21 hero is a photographic editorial composition. Its character comes from the uninterrupted right-hand photograph, restrained left field, tall fine serif, very small utility text, and a lower portrait/copy pair separated from the main title by generous space. The navigation remains plain and aligned to the split. Source 17 supports the same language: one strong portrait against a larger quiet type plane, with no rounded container, shadow, or decorative surface treatment. Its quotation is source study material, not evidence of a real endorsement for this pilot.

## Two modes

1. **Faithful reproduction:** preserve source 21's copy, measured placement, section ratio, available photographic pixels, and restrained surfaces. Record differences separately. The exact font files and original photographs are unavailable. Crops extracted from the posted screenshot preserve the visible image region but retain the screenshot's existing grain and limited resolution. Do not describe them as recovered originals.
2. **Original system expansion:** compose a responsive portfolio demonstration with a feature and footer. Label their origin in library metadata. They should demonstrate the shared system without implying that these sections were in the original post, that the mobile behavior was observed, or that Luca Rossi commissioned the work.

## Shared system

- Surface: analyst-measured hero near-white `#f8f8fa`; dark text close to `#171717`; quiet neutral rules. Photography supplies the only strong color.
- Type: Noto Serif Display, width 62.5 and weight 200, is an explicit free alternative for display headings. General Sans is the available sans alternative for body and utilities. These are implementation choices, not confirmed source identification. Keep font choices in shared tokens.
- Geometry: a 12-column desktop grid; typography, photo edges, labels, and rules share column boundaries. The source hero's title and small portrait share their left edge; copy starts on the next major column boundary. Extension geometry uses this discipline rather than reproducing every hero position.
- Hierarchy: large thin display text, ordinary reading text, small but legible metadata. Original responsive sections must prioritize readable text over preserving source-like microtype.
- Surfaces: squared photographs, no cards, no pills inside the portfolio, no gradients, no glow, no shadows. Library browsing controls may use their own restrained accessible UI.
- Motion: none is needed for this still-reference pilot. Keep hover and focus cues immediate and clear.
- Content: use brief, concrete language about observation, material, light, and image-making. Avoid testimonials, client counts, award claims, or invented experience.

## Original feature contract

A quiet editorial band after the dense hero gives the page a different rhythm while retaining the same alignments. At desktop, use a 12-column grid with a small section label in columns 1–2, portrait or clearly attributed photographic study in columns 3–6, and a large serif statement in columns 7–12. A short sans paragraph sits below the statement, with a text link to the notes or about anchor. Keep this a feature about a process or point of view; do not repurpose source 17's testimonial as a new endorsement.

Suggested illustrative copy: heading “A closer way of seeing.” Body “Start with the light. Notice the surface, the gesture, the space around it. Let the frame hold only what matters.” Label “01 / Practice”. Treat all such copy as new demonstration content.

The image should be related to the hero's available photographic evidence. Reuse a purposeful portrait/detail crop or retain the source17 portrait only as an attributed study asset. Do not fabricate a fresh client project to fill the section. Avoid a large empty band with no reading or visual purpose: negative space should separate the label, image, and statement.

## Original footer contract

Use the same near-white surface and a fine horizontal rule. Place a small “Contact / Demo” label at the left and a large two-line serif invitation across the middle and right columns. A good restrained invitation is “Make room\nfor the next idea.” Beneath it, provide one functional internal link back to work and one to the reference/provenance view. If no actual contact address is supplied, do not invent a working personal email or imply a real booking channel. A source/reference link is an honest next step.

Keep footer utility information plain and small, with a visible demo disclosure. Its low density should end the page without introducing another promotional claim.

## Responsive adaptation criteria

At 390px, preserve meaningful photo crops, a clear title, readable paragraphs, and a simple document order. Collapse the feature to a label, image, title, paragraph, and link sequence. The footer invitation should fit without clipped words or forced horizontal scaling. Keep source-sized reproduction separate from this adaptation.

At 768px, use a split only while body text can remain comfortably readable. A stacked feature is acceptable; an unreadably small desktop arrangement is not. At 1440px, retain the source-like hero split and original grid alignment. All viewports need visible keyboard focus, no overlap, and no page-wide horizontal overflow outside the explicitly source-sized comparison viewport.

## Review criteria

Compare the reproduction at 2030 × 1128 against an aligned crop of the actual source. Check split position, image bounds, title position/line break, portrait size, lower copy origin, and navigation. Record the unavoidable serif shape difference instead of compensating with arbitrary distortion. Compare original sections against the rules above, not against a nonexistent source screenshot.

Status: direction drafted from direct image inspection. Delivered-revision comparison review pending rendered output and the visual/product written handoffs. This record is not independent QA.
