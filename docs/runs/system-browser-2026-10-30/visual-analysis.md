# Visual analysis: system browser

Reviewer: real specialist agent `/root/visual_analysis`. Pass: source analysis, not implementation QA. Inspected 2026-10-30. This pass does not mark the delivered revision as reviewed.

## Evidence inspected

- `pilot/public/evidence/hero-faithful.png` (2030 × 1128): editorial reconstruction.
- `pilot/public/evidence/blueprint-hero.png` (1440 × 594): bounded Blueprint hero study used within Signal Workshop.
- `pilot/public/evidence/blueprint-full/hero.png` (1440 × 595): full source reconstruction hero.
- `pilot/public/evidence/blueprint-full/editor.png` (1440 × 754): recovered editor composition.
- `pilot/src/data.js`, `pilot/src/tokens.css`, `pilot/src/blueprint-tokens.css`, `pilot/src/sections.css`, and `pilot/src/blueprint.jsx`.

## Observed character and actionable insights

### Quiet Direction / `editorial-01`

Observed: approximately equal split between a pale typographic plane and an edge-to-edge campaign photograph; thin, narrow serif headline; small sans supporting text; large empty areas; faint vertical rules. All saturated color comes from photographs. Source CSS declares 12 columns, 24px gaps, 28px outer margin, an 8px spacing unit, and Noto Serif Display at weight 200.

Useful system insights:

- Lead with a deliberate image crop; the photo supplies color and subject while the interface stays neutral.
- Pair a narrow, light display serif with small plain sans text. Do not carry the delicate serif into controls or long body copy.
- Preserve empty space as part of hierarchy. New sections should change composition without filling every grid cell.
- Good fit: photography portfolios, creative studios, editorial campaigns. Less suitable unchanged for dense application screens or text-heavy comparison tables.
- Expansion boundary: shared type, neutral surfaces, hairline rules, and image treatment stay fixed; section composition and content can vary.
- Limitations: source font identities are not recovered; Noto Serif Display and General Sans are disclosed substitutes. Mobile rules and expansion sections are original work.

### Signal Workshop / `signal-01`

Observed in the bounded source hero: electric blue field, regular square grid, centered large sans headline, compact pill, paired white/outline calls to action. The source code for original expansion keeps that framing but adds a neutral editor shell, black/yellow artwork, native controls and SVG export. CSS tokens declare blue `#104bff`, shell `#edeef0`, a 32px grid and 28px radius.

Useful system insights:

- Let the blue surface announce the idea, then reduce interface color around the working canvas.
- Keep artwork as the focal point inside the pale shell; controls are functional and visually quieter.
- Reuse the bold opening + quiet workspace relationship rather than applying blue to every section.
- Good fit: creative tools, generators and product launches with a tangible demo. Less suitable unchanged for a neutral documentation site.
- Expansion boundary: original content and browser-local behavior belong here; attributed source copy stays in reconstruction mode.
- Limitations: Inter substitutes for Geist. The generator is original and does not recover Blueprint's service or AI behavior.

### Blueprint source study / `blueprint-source`

Observed: its hero and the Signal source hero use almost the same visual language. The full reconstruction retains a denser editor layout with left conversation rail, central artwork and right parameter rail. It is a source collection, not evidence of a third independent style family. Source font files and media are retained according to the registry.

Useful system insights:

- Study the contrast between the prominent blue introduction and restrained tool interface.
- The three-rail editor shows how a dominant canvas can coexist with explanatory and parameter controls.
- Preserve provenance and service boundaries. A source reconstruction should not be presented as a wholly original reusable brand system.
- Keep reconstruction status separate from visual family: mode describes how the work was produced; family describes how it looks.

## Naming recommendation

Keep internal IDs stable. Use a human name plus a descriptive family, with production mode shown as its own badge. Current names Quiet Direction and Signal Workshop are distinctive; clarify them with the visible descriptors “Editorial” and “Creative tools.” The third display name can be “Blueprint,” with “Source study” as a separate mode rather than folded into a supposed new style identity. If renaming to descriptive names, maintain the same grammar across all cards and keep the former names discoverable.

For section labels use function first and structure second, e.g. “Hero · Split image,” “Hero · Centered grid,” “Features · Numbered columns.” Keep mode separate. Avoid making category, layout and style compete in one long name.

## Homepage tile direction

Use real screenshots with enough room to read composition, not generic gradient swatches. A preview needs the editorial image/type split, the Signal original blue opening or its actual original workshop, and Blueprint's editor/features crop. Using both blue source heroes alone obscures the important difference between original system expansion and faithful source reconstruction. Each card needs name, descriptive family, mode, a short fit sentence, and a clear entry into its system. A screenshot alone cannot convey interaction; label browser-local functionality in the system detail.
