# Product design review

Reviewer: /root/product_design. Inspected current main.jsx, data.js, page-shells.js, catalog.jsx, system-browser.jsx, system-preview.jsx, README.md, and the actual reference-desktop.png supplied at handoff. That PNG was 360px mobile, despite its filename; do not use its filename as dimension evidence.

## Bounded delivery

Add one clearly named design system, Interfere, one observability landing page, and independently addressable navigation, hero + product demonstration, trust strip, process overview, testimonial, feature narrative, security, release list, and closing/footer sections where implemented. Keep section function and layout independent of origin. No product-visible production-mode badges.

The desktop source uses a split hero: promise left, explanation and CTA right, then an intentionally wide issue-detail product window. The inspected mobile raster stacks promise, paragraph, CTA, and a cropped wide product window. Cropping of the demo is visible source behavior, not necessarily an overflow defect. Ensure the page itself never scrolls horizontally; only the contained demo can crop.

## Registry contract

System object must include id, name, languageId, family, description, signature, typeLabel, swatches, specimen, typography, rules, preview:{image,alt,caption}, and insight:{thesis,logic,bestFor,tradeoff,principles,extension,evidence,relationship}. Supply every insight field: SystemPanel dereferences them directly. Use id `interfere` and languageId `interfere` or another stable unique value. Add system before visualLanguageCount is computed, or move that computation after all additions.

Each reusable section needs {id,name,category,layout,systemId,mode}; category and layout should identify its real job. Page ID must end in `page`, e.g. `interfere-page`, because isPage and pageFor infer pages by suffix. Add a matching pageShells object with id, systemId, name, type, description, sectionIds. Add every section to Catalog's types map and give its thumbnail an actual generated local path; current fallback otherwise points to /previews/editorial/<id>.png.

## Required integration cautions

- main.jsx only routes `blueprint-*` to the Blueprint renderer. Add Interfere prefix routing before Library fallback.
- main.jsx's `source` boolean recognizes only blueprint-source. Generalize to a registry mode/provenance check for Interfere, or create an explicit Interfere branch. Otherwise its detail page displays Quiet Serif explanations, editorial reference images, examples, and notes.
- SourcePanel currently shows all non-Blueprint references for every other system. Filter by explicit system reference IDs; add Interfere attribution and do not show unrelated Berlickfold evidence.
- SystemPreview treats every non-editorial system as Blueprint. Add an Interfere specimen with appropriate dark surfaces, light text, restrained actions, issue status and fine rules. Do not reuse the blue creative-tool controls under a new name.
- PreviewFrame defaults new sections to a tall 2350px canvas before onLoad measurement. Actual iframe body-height measurement is supported; verify standalone sections do not retain minimum full-page height.
- Comparisons only work with matched source and implementation raster pairs. Register only actual aligned captures. Do not activate Compare on an unmatched or missing image.

## Behavior and accessibility

Use real destination links for Login/Get started/Contact and source resources. A local demonstration can use native tabs/buttons to switch documented visible content, with aria-pressed or selected state and accessible names. Do not imply real bug investigations, sign-in, or backend processing. A collapsed mobile navigation must have a visible, keyboard-operable disclosure and working links. Use native details/summary or an existing accessible primitive. Preserve readable body copy and a visible keyboard focus state. Brand icon can be decorative when adjacent to the Interfere text name.

## Responsive acceptance

Inspect a matched desktop viewport and at least 390px mobile. Desktop keeps split headline/copy alignment and the broad product window. Mobile gives headline and paragraph independent readable widths, stacks sections in semantic order, contains product-window clipping, and avoids page-wide horizontal overflow. Feature narrative sections should stack text before evidence without shrinking text. Footer links must wrap into clear columns.

## Evidence boundaries

The README says no reusable workflow skill has been installed. Existing data.js mentions REA only as capture provenance for Blueprint. I found no REA definition in the inspected files. This review does not establish the tool identity. Unknown fonts, unseen menu states, animation timing, or unavailable logos must remain explicitly recorded as inferred or unavailable. Independent QA must inspect the delivered source and actual output revision; this is a product design pass, not that QA pass.
