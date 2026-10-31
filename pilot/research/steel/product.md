# Steel product contract

Role: actual product-design specialist `/root/steel_product`.
Run: Steel library expansion, 2026-10-31 IST (2026-10-30 UTC). Deadline: 22:28 UTC. Parent owns implementation; this specialist owns this report only.

## Evidence inspected

- Live https://steel.dev HTML, fetched at run time to `/tmp/steel-product-source.html` (528120 bytes). Inspected visible text and section sequence. This is content/semantics evidence, not a screenshot-based visual review.
- Existing `data.js`, `main.jsx`, `catalog.jsx`, `system-browser.jsx`, `system-preview.jsx`, `page-shells.js`, `page-browser.jsx`, and `scripts/check.mjs` from the fully hydrated runtime `/private/tmp/design-library-pilot-runtime/`. Workspace source files were initially dataless and reads blocked; parent was notified. Parent must preserve current source authority when syncing.

## Integration contract

- New stable system ID such as `steel-source`, distinct display name and `languageId`; required metadata: `family`, `mode`, `signature`, `typeLabel`, `swatches`, `specimen`, `typography`, `rules`, `preview` (`image`, `alt`, `caption`) and `insight` (`thesis`, `logic`, `bestFor`, `tradeoff`, `extension`, `evidence`, `relationship`, `principles` title/body pairs).
- Register the system before computing exported `visualLanguageCount`.
- Register `steel-page` in both `sections` and `pageShells`; IDs ending `page` drive the page/section distinction. `pageShells` needs `id`, `systemId`, `name`, `type`, `description`, ordered `sectionIds`.
- Register each standalone `steel-*` section with `id`, `systemId`, `name`, `category`, `layout`, internal `mode`.
- Main renderer must route Steel views before generic library fallback. Every section and the page must open directly via `/?view=steel-*`.
- Catalog needs Steel entries in the function-type mapping and a thumbnail path that exists for every Steel section. Comparison entries can supply thumbnails only when actual aligned source and implementation captures exist.
- `SystemPreview` currently renders every non-editorial system as Blueprint. Add an explicit Steel specimen: correct accent token, type description, and representative developer interface element.
- SourcePanel currently chooses Blueprint references versus every other reference. Filter explicit system associations; Steel must not inherit editorial references.
- Library descriptive copy, captions, source notes, and `<EditorialExamples/>` currently branch only on Blueprint. Steel needs its own source/limit text and must not inherit unrelated editorial examples.
- Generic SystemHome/SystemPanel/PageCard already support a valid new registry entry.

## Page and section semantics

Observed content sequence: navigation; hero and terminal; customer logos; usage metrics; use cases; Sessions API and product capabilities; SDK stack; enterprise/self-hosting; stealth and proxies; skills; FAQ; blog; open-source closing CTA and footer.

A practical reusable partition can group adjacent source bands into 10–12 sections while preserving the full observed reading sequence. Source reproduction and any new sections have separate evidence status internally. No production-mode badges should enter the interface.

## Behavior requirements

- Navigation remains link-driven. Product service calls to action lead to the source destination rather than implying that the library has a working account, billing, or cloud browser backend.
- Copy controls copy the exact displayed code/prompt and expose success/failure accessibly.
- Use-case selectors, demo modes, and FAQ disclosures must work with native buttons/details, clear selected state, visible focus, and no hand-built arrow-key behavior.
- A mobile navigation control must reveal reachable links and identify expanded state; don't merely hide desktop actions.
- SDK/code panels may scroll locally; the document must not overflow at 390px. Long headings and source copy must wrap without clipping.
- Source metrics, endorsements, prices, and blog dates are attributed snapshot content, not independent library claims.
- Avoid importing source script analytics, account sessions, or service requests into the library.

## Acceptance evidence requested

- Three system cards, three page cards, Steel section filtering and direct links.
- Source-sized hero comparison; full page desktop capture and 390px mobile capture; measured unknowns explicitly recorded.
- Source and shared token files separate from section layout/content.
- Independent QA on delivered revision, including source/implementation image inspection, section thumbnails, mobile overflow, source navigation destinations, copy state, FAQs, and existing system regression smoke checks.

Status: product contract complete. Implementation and final behavior review pending; this report does not claim a visual or QA pass.
