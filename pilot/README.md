# Design Library pilot

A local React/Vite library with two named collections: Quiet Serif and Blueprint. Quiet Serif supplies eight editorial layouts; Blueprint supplies ten source sections. Each has an assembled page. Cobalt Grid (formerly Signal Workshop) was removed on 31 October 2026 because it duplicated Blueprint. Its old routes now fall back to the library. Sections below record historical production work. The library browser follows the measured reading layout of Emil Kowalski's article; the contained editorial components retain the Bernardo Lickfold reference study.

## Run

```sh
npm ci
npm run dev
```

`npm run build` produces `dist/`. `npm run check` verifies required media and provenance inputs. Serve the generated `dist/` with any static server. Query routes are `/?view=page`, `/?view=hero&mode=faithful`, `/?view=feature`, `/?view=footer`, `/?view=quote`, `/?view=quote&mode=faithful`, `/?section=quote`, `/?panel=sources`, and `/?panel=system`.

The retained preview for this session is http://127.0.0.1:5175/. Documents-folder cloud eviction stalled dependency reads during production, so the running preview uses an identical temporary copy at `/tmp/design-library-pilot-runtime`. Source and evidence are copied back to this project. Dependencies can be regenerated from the lockfile.

## Source structure

- `src/tokens.css`: shared editorial design tokens and fonts.
- `src/sections.jsx`, `src/quote.jsx` / `sections.css`: reusable editorial components and their responsive layout.
- `src/data.js`: content and separately addressable function/layout/style records.
- `src/page-shells.js`, `src/page-browser.jsx`: page-specific compositions drive Pages titles, types, descriptions, section counts and destinations. Compact live previews use the same cropped 9:10 frame as the original library cards, with three columns on desktop and one on mobile. Full-size details retain desktop/mobile controls; Open page opens the complete live shell. `scripts/capture-page-shells.mjs` can export full-page evidence images independently of the gallery.
- `src/main.jsx` / `style.css`: library reading experience, previews, sources, system, and comparisons.
- `public/references`: preserved reference media plus aligned source crop.
- `research/provenance.json`: attribution, source media, crop coordinates, and hashes.
- `research/visual-analysis.md`, `product-design.md`, `art-direction.md`: original pilot specialist handoffs.
- `research/emil`: browser reference, real REA extraction, measured CSS, and historical shell review evidence.
- `research/testimonial`: current quote production measurements, specialist direction, and revision-specific reviews.
- `evidence`: source-sized hero and responsive page/library captures.

## Review scope and limits

Hero fidelity is measured separately at2030×1128. Noto Serif Display/General Sans are disclosed source-font substitutes, and the faint grid is approximated. Photography is cropped from the reference screenshots; original photograph files are unavailable. Feature, studio note, footer, and mobile behavior are original extensions. The quote study is measured separately at1943×724; its Noto Serif Display and Courier New type are explicit substitutes. Source quotation and names appear only in the attributed reference-study mode. Original portrait and text-only variants use illustrative studio copy. Reference photography remains private study material with attribution; publication rights are not established.

The library redesign uses a644px reading column,16px prose, restrained headings and rounded inset demos. Inter is a substitute for Emil's unidentified custom Sans. The REA evidence and complementary computed-style extraction are distinguished in `research/emil/extraction.md`.

## Architecture decision from this pilot

React components with data inputs and CSS tokens are sufficient for the current bounded library. Vite serves the component/iframe routes and builds static output. Function, layout, and visual style remain separate metadata fields; adding another visual style should supply tokens and assets before adding section categories. A backend is not yet justified by this two-reference pilot.

A future reusable skill should own source intake, measured reproduction, original expansion, real specialist handoffs, screenshot comparisons, and hashes tied to final QA. This pilot does not install a new skill or claim that its taxonomy is validated across a broad library. Render Assets and its installed skills remain unchanged.

## Quote expansion — 2026-10-30

Freebyrd index, thread, and references returned no folder-specific context during this run. The expansion uses preserved source17 rather than claiming newly fetched ideas. The `Quote` component accepts content plus `faithful` and `layout` inputs (`portrait` or `statement`); the assembled page uses the text-only statement variant. Comparisons are data-driven for both Hero and Quote. Mobile Open section links follow the displayed adaptation. `npm run check` includes the new assets; `scripts/capture-quote.mjs` captures this revision. Current QA is recorded under `research/testimonial`; older reviews do not validate this expansion.

## Design system identities

Every record in `src/data.js` → `systems` requires a stable ID, human-readable name, and description of its visual character and intended use. Sections reference the system by `systemId`. Study and System views resolve their displayed identity from that record. The initial system is **Quiet Direction**. `npm run check` validates required fields, unique IDs, and section relationships. Scoped review evidence is under `research/system-identity/`.


## Signal Workshop — 30 October 2026

Second collection derived from the user-supplied https://blueprint.page/ reference, using the existing `morluto/rea` checkout for real page inspection and screenshot Evidence. Read `research/blueprint/extraction.md` and `provenance.json` for exact source, crop, measurements, modes, substitutions, and capture limits.

Open `http://127.0.0.1:5175/?section=signal-page` for the library or `/?view=signal-page` for the full page. Additional routes are `signal-hero`, `signal-workshop`, `signal-features`, `signal-faq`, and `signal-footer`. Desktop `signal-hero&mode=faithful` is the bounded1440 ×594 source study. Mobile hero preview uses original copy and is explicitly an adaptation. Compare supports side-by-side and opacity overlay.

`src/blueprint.jsx` contains reusable React components and original SVG generator; `blueprint-tokens.css` holds scoped shared inputs; `blueprint.css` holds layout. Shape, spacing, width, paper/ink colors, variation, reset, and SVG download work locally. Registry tokens, typography and rules update when switching systems in Study or System views. Original editorial routes remain supported. Source Geist is represented by local Inter; the source wordmark/grid are approximate. No Blueprint application code, sign-in, AI generation or backend is claimed.

The working preview remains local. This expansion does not publish the existing private reference collection or modify Render Assets/REA. Current review evidence is in `research/blueprint/`; its manifest identifies actual specialists and current source/capture hashes.


## Complete Blueprint source reconstruction — 30 October 2026

The user requested every source section be rebuilt1:1. **Blueprint Study** now contains Navigation, Hero, Editor, Examples, Comparison, seven-card Features, Pricing, sixteen-question FAQ, Closing Prompt, and Footer, plus the assembled page. The library has three named collections, nineteen reusable sections, three assembled pages, and eleven source-sized Blueprint comparisons. Quiet Direction and original Signal Workshop remain separately addressable.

Open `http://127.0.0.1:5175/?section=blueprint-page` for the collection or `/?view=blueprint-page` for the complete page. Section IDs are `blueprint-header`, `blueprint-hero`, `blueprint-editor`, `blueprint-examples`, `blueprint-compare`, `blueprint-features`, `blueprint-pricing`, `blueprint-faq`, `blueprint-prompt`, and `blueprint-footer`.

The reconstruction preserves exact public Geist fonts, wordmark, illustrations, eleven gallery thumbnails/programs, comparison videos, source CSS/responsive rules, actual Op Art WebGL program, feature illustration behavior, FAQ transitions, and five closing texture algorithms. Controls, presets, PNG export, gallery previews, billing periods/table and native question disclosures work locally. Source account, checkout, generation and remix actions use Blueprint service links.

Desktop1440×900 has the same8534px assembled geometry. At390×844, static section positions/heights match; the source’s native content-sized typewriter field changes the closing panel and total page height by a line as it types. Shader/video/CSS clocks are compared as dynamic states rather than promising one universal pixel-identical frame. Read `research/blueprint-faithful/extraction.md`, `run.json`, specialist reports and independent `qa.json` for exact evidence/revision scope.


## Quiet Serif learning transfer (31 October 2026)

The root now shows the two-collection overview. Open `/?section=hero` for the new Original adaptation / Source study selector and calculated Grid control. The original hero uses `src/editorial-layout.js` for shared block and guide coordinates, `editorial-adaptation.jsx` for rendering, and `editorial-adaptation.css` for styling. The faithful source branch is preserved. The original assembled page `/?view=page` includes the new hero. Mobile is an authored four-column recomposition. See `../docs/runs/berlickfold-transfer-2026-10-31/` for the source-chat transfer, actual specialist reports, final independent QA and revision hashes.

## Steel

The Steel collection (`steel-source`) has a complete browser-infrastructure landing page and fourteen sections. Open `/?panel=system&section=steel-page`, `/?panel=sections&system=steel-source`, or `/?view=steel-page`. The isolated reviewed local runtime uses port5177 to avoid concurrent production edits in the shared5175 runtime.

`src/steel.jsx` supplies reusable section rendering and local interactions; `steel-data.js` owns registry metadata; desktop/mobile source fragments are sanitized JSON; `steel-tokens.css` supplies measured shared inputs. Source CSS, fonts, SVGs and public hero artwork are retained locally in `public/steel-source/`; local layout rules are separate. Use cases use native disclosures and proxy illustrations use captured source frames. Source capture, REA evidence and actual specialist reviews are in `research/steel/`. Run `node scripts/check-steel.mjs` for scoped inputs. No backend or accounts are reproduced and no reusable skill is installed by this pass.
