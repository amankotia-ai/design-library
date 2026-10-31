# Product design — pilot 01

Reviewer: `/root/product_design`. Role: product designer. Date: 2026-10-30. Status: constraints complete; implementation review pending.

## Evidence inspected

Read README.md and docs/team-workflow.md. Visually inspected the actual local images `public/references/21-final.jpg` and `21-grid.jpg` (2350 × 2700), and `17-testimonial.jpg` (3044 × 1760). The source hero pairs a compact utility header, two-line serif headline, portrait plus short copy, year and next-project utility, and a half-width campaign image. The testimonial reference provides a useful portrait/text proportion and generous surrounding space. Its testimonial is source content, not evidence of an actual customer of this pilot.

## Bounded experience

The pilot is a local design study and reusable component demonstration. Its primary task is to inspect the source, see a working interpretation at desktop and mobile sizes, understand where it is measured or inferred, and inspect complementary sections in the same system. A full multi-style application, commercial agency site, or universal taste model is outside this first pilot.

Keep two views independently addressable:

1. **Faithful study**: the source hero's composition and copy reconstructed with live text and available exact raster crops, at the measured section size. Explicitly disclose the substitute serif and screenshot-derived imagery. Compare the original section with the implementation at aligned dimensions. A raster of the whole source used as the implementation does not satisfy this view.
2. **Original page**: hero adaptation plus a feature section and footer, coherent through shared tokens. Mobile layout, navigation behavior, feature copy, footer composition, focus styling and hover states are authored adaptations because the source does not show them.

## Pilot taxonomy

| Record | Section function | Layout variant | Style system | Mode |
| --- | --- | --- | --- | --- |
| quiet-editorial-hero | Introduction / project hero | Half split with inset portrait and offset body | quiet-editorial-01 | Faithful source reconstruction at source size; responsive adaptation elsewhere |
| quiet-editorial-feature | Process / capabilities | Portrait with offset editorial text and short indexed rows | quiet-editorial-01 | Original system expansion |
| quiet-editorial-footer | Contact / wayfinding | Oversized editorial invitation with utility row | quiet-editorial-01 | Original system expansion |

Store source IDs and mode on each component record. Function, layout and style must remain separate fields; do not collapse all into a single tag. The first shell is a portfolio/editorial page, rather than a generic SaaS landing page. The testimonial reference influences rhythm only; it does not turn the original feature into a testimonial.

## Component contracts

Shared inputs: `systemId`, `mode`, `sourceIds`, `provenanceNote`, `className` or equivalent wrapper hook. Tokens belong in the system layer, never inside content data.

**Hero** inputs: `id`, `name`, `navigation[]` of `{label, href}`, `titleLines[]`, `description`, `portrait` and `campaignImage` of `{src, alt, sourceId, crop}`, `year`, `nextLink`. Render a header landmark, labeled navigation, one h1 and meaningful links. In faithful mode preserve observed source text and line breaks. At different widths let body wrap naturally; keep source-sized layout isolated from responsive rules.

**Feature** inputs: `id`, `eyebrow`, `heading`, `body`, `image`, `items[]` of `{number,title,description}` and optional `link`. Render a section with h2 and a real list. Keep items plain typographic rows, not decorative cards unrelated to the source. Source portrait may appear only as attributed study imagery; an image of a source subject is not an invented team member.

Suggested original content: eyebrow “The approach”; heading “Make room for the essential.”; body “A study in deliberate composition: strong imagery, quiet typography, and enough space for each to work.”; rows “01 / Frame the subject”, “02 / Give type a role”, “03 / Carry the rhythm”. These explain the study and avoid unsupported commercial promises.

**Footer** inputs: `id`, `heading`, `description`, `links[]`, `credits`, `backToTop`. Suggested heading “A considered next chapter.” Description “Explore the source, compare the reconstruction, and carry the system into your next composition.” Link to actual pilot comparison/source views. Do not invent a mailto address, social identity, client pipeline, newsletter submission, or success state.

## Navigation and destination rules

In the faithful hero, observed source labels can remain Work / Articles / About / Contact. On the complete page, all four must lead to real IDs or views. A practical mapping is Work→`#work` (hero/project), Articles→`#notes` (a short process note within feature), About→`#about` (feature), Contact→`#contact` (footer's study links). If the complete page uses a different original identity, labels may instead be “Work / Approach / Study / Sources”, clearly documented as adaptation. No dead `href="#"`, inert Next Project action, or decorative control that looks functional. Rename the authored next action to “Explore the approach” or target the feature while recording the source-label change as an adaptation.

## Responsive rules — authored, not recovered

| Width | Criteria |
| --- | --- |
| 1440 | Retain source-like half split; keep title and small portrait in the left half, campaign image in right half; maintain breathing room and usable body size. Page should remain readable without viewer zoom. |
| 768 | Preserve split only if all left-column text is at least 14px and links have comfortable hit areas. Otherwise stack. Let original feature image and body share two columns with no squeezed text rail. |
| 390 | Use one readable sequence: header/navigation, title, campaign image, portrait/description, then feature and footer. Source-oriented two-column title/image composition may be visually different; label it mobile adaptation. At least 16px body and 14px utility labels. No horizontal document overflow; comparison stage may have an explicitly named local scroll region. |

Keep content order coherent in the DOM. Avoid CSS visual reordering that produces a confusing keyboard or screen-reader sequence. Do not shrink the entire desktop page to fit mobile and call that responsive. In the library viewer, an intentionally scaled desktop screenshot is acceptable only when labeled “Desktop preview” and accompanied by a real mobile view.

## Accessibility and interaction constraints

Use native anchors, buttons, range inputs, selects and details where possible. Native radio groups or buttons with `aria-pressed` can select preview mode; do not implement ARIA tabs without required keyboard behavior. Visible focus must survive both pale and dark surrounding surfaces. Icon-only controls require an accessible name. Every select and range needs a visible label. Keep keyboard focus in document order; avoid an unnecessary modal for source images, preferring direct full-size links.

Use heading hierarchy h1→h2→h3, one main landmark, and descriptive alt text. The campaign image's useful description is the photographed composition, not a claim that the pilot created the campaign. Caption source attribution separately. Provide a skip link for the library's navigation controls if the workspace frame is substantial. Respect browser text zoom and long content; maintain minimum 4.5:1 body text contrast. No animations are required.

Comparison overlays need a labeled native range input, visible percentage, and an explanation that opacity/split is a visual aid. Reading and controls must remain outside the overlaid images. Overlay images themselves can be decorative when adjacent captions fully identify them. Provide side-by-side access or direct links so comparison does not depend on dragging.

## Library browser acceptance criteria

- Show a small reference set with original caption, author, direct post URL, original dimensions, source file and import/provenance note.
- Display the one system name and separately show section function/layout/mode.
- Offer whole-page and individual hero/feature/footer previews without requiring source edits.
- Offer 390 / 768 / 1440 viewport choices and a source-sized reproduction comparison. Label browser scaling accurately.
- Keep “source reconstruction”, “responsive adaptation”, and “original extension” visible at the appropriate outputs.
- State missing assets: original font and isolated photography unavailable; exact crops derived from the supplied raster are study assets, not independently acquired licensed campaign originals.
- Preserve known font caveats: Noto Serif Display is a free selected alternative from prior research, not recovered PP Editorial New. General Sans identification remains visual inference.

## Review plan

Inspect delivered desktop/mobile captures and current source. Check navigation targets, all viewer controls, one narrow width, a medium width, source-size comparison, heading structure, accessible labels, natural content wrapping, and keyboard focus. Product review does not substitute for independent QA or prove pixel fidelity. Record exact reviewed revision and files when available.
