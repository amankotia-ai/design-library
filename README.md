# Design Library

An independent project for a composable website design library, developed from the owner's design references and extended into original, coherent design systems. Design Library is a working name.

## Start here

Read `AGENTS.md` and `docs/team-workflow.md`. The first task is to establish a small end-to-end pilot using actual references, then use that evidence to choose the application architecture and reusable skill structure.

A working local React/Vite pilot now lives in `pilot/`, with two named collections: Quiet Serif (editorial) and Blueprint (the complete faithful source study). The homepage shows actual style previews; each system includes fit, trade-offs, composition rules, extension guidance, and evidence limits. See `docs/system-naming.md` for the naming and insight contract. It includes eight Quiet Serif section layouts, assembled pages, source comparisons and a reading-oriented library browser. The editorial Study view also shows four new layout previews: paired project, selected image index, split material feature, and an interactive image rail. See `docs/pilot-status.md` for current evidence and limitations. No reusable skill has been installed.

The MNH collection adds a reconstructed venture-capital homepage, its shared visual system, and six browsable sections. Source captures, implementation evidence, asset provenance, limitations, and independent QA are recorded in `docs/runs/2026-10-31-mnh.md`.

## Product structure

- Website shells: landing pages, agencies, portfolios, commerce, and publications.
- Section categories: navigation, heroes, features, pricing, testimonials, FAQs, and footers.
- Layout variants within a category: centered, split, grid, full-bleed, and other structures justified by the references.
- Visual styles within those variants, backed by shared design systems that work across categories.

Every design system must have a distinctive human-readable name and a concise description of its visual character and intended use. Store these in the system registry, display them in Study and System views, and associate each section with its system ID.

Keep section function, layout structure, and visual style separately addressable. A shared system supplies typography, colors, spacing, grids, components, states, responsive behavior, imagery, and motion. A branch should express a meaningful design difference. Initial categories are starting hypotheses, not a fixed taxonomy.

## Required capabilities

1. Preserve original references, attribution, captions, media, and provenance. Inspect actual media when deriving decisions.
2. Reconstruct selected references faithfully, documenting measured properties and inferred details separately.
3. Extend the resulting design language into complementary sections and original variants the reference does not show.
4. Make working, reusable sections and complete website shells with realistic content, responsive behavior, and interaction states.
5. Provide a visual browser for references, sections, styles, and assembled pages, with desktop/mobile previews and comparisons.
6. Run real specialist agents for visual analysis, product design, art direction, and independent QA, coordinated with implementation.
7. Develop a reusable skill from the validated workflow and library. Share relevant knowledge with existing render/showcase skills while keeping this project independent.
8. Record the owner's feedback with its project, style, and output context. A bookmark means interest; it does not establish a universal taste preference.

## First milestone

Proposed pilot: select a small related set of actual references, develop one style system across a hero, a feature section, and a footer, and assemble a responsive page. Establish source-sized fidelity for selected source sections, then review responsive adaptations and original extensions separately. Choose the final pilot scope after inspecting the references.

Deliver source media and attribution, visual measurements, system tokens, working components, a page preview, screenshot comparisons, specialist findings, and independent QA tied to the delivered revision. Use that result to refine taxonomy and expand the library.

## Available local context

The sibling `../Render Assets` project contains useful prior research. Consult it as evidence; preserve its files and existing skills.

- `../Render Assets/reference/product-screens/catalog.json`: existing post/media records.
- `../Render Assets/grid-study/README.md`: visual grid research and configurable layout work.
- `../Render Assets/grid-study/research/typography-notes.md`: examples of separating font identification, approximation, and confirmed feedback.
- `/Users/abhishekmankotia/.codex/skills/product-renders/SKILL.md`: physical and photographic presentation workflow.
- `/Users/abhishekmankotia/.codex/skills/product-screen-compositions/SKILL.md`: product-screen presentation and specialist review workflow.

Freebyrd returned no folder-specific thread or reference context during setup or the quote expansion on 2026-10-30. No full bookmark audit or import has been performed. Seek relevant connected references before requesting information already available through tools.

## Opening task

Start a chat in this folder with:

> Read AGENTS.md, README.md, and docs/team-workflow.md. Begin the Design Library pilot. Inspect the existing local research and connected bookmarks, select a small coherent reference set, and show the actual references. Establish the section taxonomy and a measured visual brief, then use the specialist team to implement one shared style across a hero, feature section, and footer in a responsive page. Preserve source fidelity and label original extensions. Deliver working reusable components, visual comparisons, and independent QA. Choose the technical stack from the pilot's needs and use the applicable skills. Continue autonomously on reversible work and show meaningful visual progress.

The Signal Grid collection reconstructs the Conare retrieval-platform homepage, with a shared visual system and eleven browsable section layouts. Source captures, REA evidence, implementation limits, and review status are recorded in `docs/runs/2026-10-31-conare.md`.

Signal Grid also includes the Conare evaluations overview, with benchmark cards, price comparison, losses and methodology. Its source and review evidence are in `docs/runs/2026-10-31-conare-evals.md`.

The detailed Conare evaluations fidelity correction, including the shared Product menu and recovered footer, is recorded in `docs/runs/2026-10-31-conare-evals-deep.md`.

## GitHub Pages deployment

The site is built from `pilot/` by `.github/workflows/pages.yml`. Pushes to `main` run `npm ci`, build the Vite app, and deploy `pilot/dist` through GitHub Pages. It is served from the `/design-library/` subpath (https://amankotia-ai.github.io/design-library/ once the repository is named `design-library`). `pilot/vite.config.js` sets that `base`; app code resolves public paths and in-app links with `withBase` and `rebase` from `pilot/src/base.js`, and files inside `pilot/public/` reference each other with relative paths. See `docs/runs/2026-11-02-subpath-base.md`.
