# Blueprint distillation: product design

Reviewer: `/root/blueprint_product` · 2026-10-30
Mode: bounded source reproduction plus original system expansion.
Inspected: actual `public/references/blueprint/desktop.png` at 1440 × 857 with the image tool; `src/main.jsx`, `src/data.js`, and project README. This is a product constraint pass before implementation, not a review of delivered behavior.

## Scope and meaning

Add **Signal Workshop**, a second design system for creative software and browser tools. Its description should identify saturated blue, a fine construction grid, centered sans-serif hierarchy, and a neutral working canvas. Preserve Quiet Direction and every existing section ID. A new system has a stable registry ID; each new section references it. Function, layout, and visual style remain separate fields.

The source visibly combines a centered promise and two actions with a large editor preview. That relationship is the useful pattern: explain the outcome, then let someone try it. Carry it into a coherent original family rather than presenting copied product claims as functionality of the Design Library.

Proposed entries:

| Entry | Function | Layout | Mode |
| --- | --- | --- | --- |
| Assembled page | Creative software shell | Centered hero, interactive workbench, feature group, FAQ, footer | Original expansion informed by source |
| Hero study | Introduction | Centered on construction grid | Faithful reproduction study |
| Workshop | Product demonstration | Canvas beside parameter rail | Original expansion |
| Feature | Capabilities | Repeated feature grid | Original expansion |
| FAQ | Support / objections | Stacked disclosure rows | Original expansion |
| Footer | Navigation / attribution | Brand with small link groups | Original expansion |

No account, AI generation, hosting, billing, or client sharing should be implied as working library features. Any original workshop should say what it actually does: manipulate a local generated graphic and export it if implemented. Do not add decorative fake chat, credit counts, share controls, or upload buttons that cannot work.

## Browser integration

Add a native labeled **Design system** select above the existing section preview. Keep it distinct from the **Section** select. The section options should be filtered to the chosen system, with function and layout visible nearby. Switching systems selects its assembled page, clears Compare, and preserves device choice. Initial `?section=` must select the matching system, including old editorial links. Optional `?system=` should resolve to that system’s assembled page; invalid IDs fall back safely. A source study is separately selectable from the original assembled page.

Study and System views must show the selected system's human-readable name and description. The System view needs registry-driven palette, type, spacing, and branch rules, replacing the existing hard-coded editorial tokens when Signal Workshop is selected. System choice remains available from System view so the reader can compare the families without navigating back.

Sources should include Blueprint, URL, capture date and dimensions, a local capture, REA evidence attribution, and font/substitution disclosures. Update the notice and collection counts truthfully. Existing source descriptions must remain accurate; avoid a panel-wide claim that every reference came from the local bookmark archive once a direct website source is added.

Compare is enabled only for the source hero study. The observed 1440×857 screenshot includes the beginning of the editor at y594. Crop to a reproducible hero-only boundary, or preserve the complete viewport with the editor's static/approximate status explicit. Comparison captions use the current source's author/title, rather than Bernardo Lickfold hard-coded for the second system. Comparison captures must align in dimensions. The mobile hero is an authored adaptation, and the comparison is a desktop source study even if the user previously chose Mobile.

## Workshop interaction contract

Use a deterministic SVG or canvas pattern with labeled native controls. Provide two or three real parameters such as density, scale, and variation; a format or palette choice is optional only if it changes the artwork. Every current value is visible, and pointer and keyboard changes update the artwork immediately. A Variation action changes its seed. Reset restores defaults. If export is included it downloads the actual current output as SVG or PNG with the selected colors and parameters. Use an accessible status message for completion or export failure, avoiding repeated announcements while dragging.

The preview itself needs a short textual description that changes with its settings, or a stable descriptive title if the controls supply the state. Treat the construction grid as decorative. Reserve color as a strong system surface; the generated art may use a separate visibly identified palette. Do not introduce unsolicited animation; the source's animated stripe tool does not require motion in the library adaptation.

## Responsive and accessibility criteria

Desktop: hero text stays readable within a bounded center column; workshop uses a generous canvas with a clear parameter rail. At narrow widths the workshop stacks canvas then controls without horizontal scrolling. Keep all controls within reach at 320px; shrink/stack actions and omit nonessential chrome rather than shrinking text into illegibility. A 390px screenshot is authored behavior unless independently observed from Blueprint.

Use semantic main, header, nav, section, heading, and footer landmarks. A standalone component may own an h1; the assembled page has one h1, with section headings h2. Labeled native selects, ranges, buttons and native details/summary suit the bounded interactions without manual keyboard behavior. Focus indicators must be visible against both blue and neutral surfaces. Ensure the iframe preview's height reflects the full current section, including expanded FAQ rows, so controls are not clipped. The preview host must not trap scroll or keyboard focus. Links must reach real destinations: local workshop/FAQ anchors in full pages, and supported standalone section URLs or explicit source links elsewhere.

FAQ disclosures expose questions in summary and actual answers beneath. Keyboard Enter/Space should toggle them via native behavior. At least one answer should explain that the demonstration is local and no generative AI service runs. Footer attribution should link to the preserved source details and the source website, and original example branding must remain distinct from Blueprint's source study.

## Acceptance before delivery

1. Quiet Direction section links, Sources, System, faithful comparison and assembled page still render.
2. Both systems have stable IDs, names, descriptions and independent token records; sections remain separately addressable by function and layout.
3. Selecting Signal Workshop exposes only its section family; all direct section links load the intended component.
4. Desktop hero comparison aligns to the recorded dimensions and identifies Blueprint; mobile and extensions carry the correct mode labels.
5. Workshop controls change visible output by pointer and keyboard, Variation changes seed, Reset restores it, and export matches current settings if present.
6. All actions are functional; no sign-in, billing, AI, or share behavior is fabricated.
7. At 1440px, 768px, 390px and a narrow 320px stress width, text and controls remain readable with no page overflow.
8. Expanded FAQ content remains accessible in standalone, assembled and embedded previews.
9. Source and implementation captures, source hashes, actual specialist identities, limitations, and independent final QA revision are recorded together.

## Known limits

This screenshot establishes only the visible desktop composition. It does not establish actual account flows, export behavior, original source code, mobile breakpoint behavior, or the entire landing page. The headline's lettering suggests a contemporary sans, but no font identification is claimed by this product pass. The separate visual analysis and CSS evidence should distinguish confirmed declarations from substitutions.
