# Product design: system browser

Reviewer: `/root/product_design`. Read-only source review on 30 October 2026. Inputs: `README.md`, `docs/team-workflow.md`, `pilot/src/main.jsx`, `pilot/src/data.js`, `pilot/src/style.css`, and actual inspection of `pilot/evidence/library-emil-preview.png`. The screenshot is an older one-system revision; current three-system state is established from source, not claimed as visually reviewed.

## Job and current breaks

A designer arrives to compare available visual languages, picks the one that fits their project, then inspects its shared rules and working sections. Root currently opens an explanatory article for the selected editorial system; the only way to discover others is the collection select. The older screenshot shows extensive prose before the first small page preview. Current source has no cross-system preview tiles. The registry stores visual description, colors and layout rules but gives no selection criteria or explanation of how the related blue collections differ.

## Homepage contract

Root should open a dedicated overview, with a short heading and three real rendered image tiles. Use current captured output rather than decorative invented mockups. Each tile contains: human-readable name; family/use; explicit mode; visual signature in one sentence; section count; dominant type/color clues; one primary link into the system. Make the full tile a single anchor or use one explicit link; no nested controls. Provide a separate, plainly named Study or Sections route for working previews. Keep Sources accessible in global navigation.

Compare all three tiles at equal image-container dimensions and consistent text hierarchy. Mobile uses one column; desktop should expose at least two tiles side by side. Let names and descriptions wrap. Do not rely on color swatches alone. Image alternative text should describe the visible composition; decorative token dots are hidden from assistive technology. Keyboard focus must remain visible around a tile/link. No motion is needed.

## Naming convention

Use a visual characteristic plus a compositional metaphor for original system display names, such as **Serif Editorial** and **Cobalt Workshop**. Keep category/family (Editorial / Creative software) separate from the name, and keep production mode (Source study / Original expansion / Mixed source and expansion) separate from both. For the source reconstruction, retain the proper source name plus Study: **Blueprint Study**. Avoid implying the original and the reconstruction are independent visual families: explicitly label Cobalt Workshop as derived from the Blueprint study.

Names are display metadata, not identifiers. Preserve `editorial-01`, `signal-01`, `blueprint-source` and every existing section ID/query URL. Preserve old display names as aliases in registry documentation if renamed. Do not rename sample portfolio headline content solely because the library system changes name.

## System insight content contract

Keep these fields in shared system data, rendered consistently:

- **Choose it for:** specific content/product situations, grounded in existing components.
- **Trade-off:** what this system requires from content or assets, or where it performs poorly as a fit judgment.
- **Visual logic:** 3–4 rules explaining the relationship between tokens and composition, not only isolated values.
- **Extend it by:** instructions for a new section while preserving that visual logic.
- **Evidence:** source IDs/links, source-study versus original decisions, font substitutions and unavailable assets.
- **Coverage:** actual page/section inventory, derived from registry data rather than hard-coded totals.

These insights are authored design guidance, not automated audience research or proven business outcomes. Use a brief “Design guidance” label where needed. Avoid a generic identical paragraph on every system.

## Concrete guidance per system

Editorial: suitable for photography-led portfolios/studios; requires strong imagery and concise copy. Thin display serif establishes hierarchy, neutral surface lets photographs carry color, generous negative space separates text and crops. Extend through offset image/text rails and restrained typography; dense application forms or colorful dashboards are not established by these references. Preserve substitute-font disclosure and distinguish reconstructed hero/quote from original feature/footer/mobile behavior.

Cobalt Workshop: suitable for creative-software introductions with a tangible demo. Strong blue grid sets the opening; neutral editor/canvas lowers visual density around controls. Extend with practical tool demonstrations and numbered supporting sections rather than carrying blue behind every reading area. Hero has bounded source evidence; remaining sections/controls are original. Inter is an explicit substitution.

Blueprint Study: suitable for studying the source's complete landing-page sequence, exact source fonts/media and observed responsive composition. The source reconstruction is not evidence that its service back end exists locally. Keep it recognizable as attributed source material; original sections belong to the separate expansion. This and Cobalt share a lineage, so surface their relationship.

## Review criteria for implementation

1. Root visibly offers all three system previews before an individual long study.
2. Each tile reliably opens the corresponding system/sections and carries the right mode.
3. System detail contains selection guidance and extension logic with honest evidence limits.
4. Changing system updates name, content, section list and preview together.
5. Existing deep links, mobile preview, source comparison and attribution still work.
6. At narrow viewport, no clipped name, overflowing select, or horizontal page scroll.

Status: product proposal complete; no delivered revision reviewed by this agent. Independent QA remains required.
