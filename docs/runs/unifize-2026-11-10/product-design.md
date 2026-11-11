# Unifize product-design handoff

Run: unifize-2026-11-10. Specialist: `/root/unifize_product`. Scope: integration contracts, component semantics and behavior criteria. The parent owns implementation. This report is a product-design pass, not independent QA.

## Evidence inspected

Read `README.md`, `docs/team-workflow.md`, and the current library source: `data.js`, `main.jsx`, `page-shells.js`, `catalog.jsx`, `system-preview.jsx`, `system-browser.jsx`, `type-systems.js`, `library-routing.js`, `page-browser.jsx`, `brand-wordmark.jsx`, `preview-palette.js`, `system-analysis.js`, and `scripts/check.mjs`. The retained `pilot/research/unifize/source.html` was then inspected for heading hierarchy, landmarks, section IDs and control semantics. It differs from the earlier public web-text extract, so retained source HTML and its captured render are authoritative for this run. Source media and a working delivered preview were not yet available when this initial handoff was written; visual judgments are deferred to the visual specialist.

## Integration contract

1. Add a stable `unifize` system ID and a distinct human-readable visual system name. Registry fields required by the existing browser are `name`, `languageId`, `family`, `mode`, `description`, `signature`, `typeLabel`, `swatches`, `specimen`, `typography`, `rules`, `preview`, and `insight`. The insight record needs thesis, logic, bestFor, tradeoff, principles (title/body pairs), extension, evidence, and relationship. Preview image must resolve to a real retained render, with alt and caption.
2. Register every section with `id`, `systemId`, `name`, `category`, `layout`, and internal mode. Register the assembled `unifize-page`; `isPage` identifies pages by an ID ending in `page`. Section IDs and page `sectionIds` must match actual standalone renderers.
3. Add the assembled page to `page-shells.js` with its own useful page name (for example, “Quality operations landing page”), description and complete ordered section IDs. The page gallery previews the live `?view=` route; static screenshots alone do not provide a working page.
4. Add the `?view=unifize-…` renderer to `main.jsx`. Update SourcePanel filtering and notes, the library source-system condition, and the design-note branch. Otherwise the new system inherits unrelated editorial notes or Blueprint notes.
5. Add catalog type mapping for every Unifize section and a Unifize thumbnail resolver. The default resolver otherwise targets nonexistent editorial thumbnails.
6. Add a Unifize system-specimen class in `system-preview.jsx` and its CSS. Current unknown systems fall through to Blueprint styling. Colors are derived from named swatches: Paper/White, Ink/Black, Rule, Teal/Blue/Blueprint/Red, Lime. Supply appropriate names or explicitly support the chosen accent name.
7. Add measured type roles to `type-systems.js`, with the retained font in `type-systems.css`. If only a prose typography record is available, the library falls back correctly, but should not imply measured sizes.
8. Add `systemAnalysis.unifize` with palette roles, foundations, image-backed patterns, and direct reference/capture links. The existing UI gracefully falls back to registry rules and principles, but actual images make the system explainable.
9. Use `withBase` for all registry/public image paths and app URLs; the deployed library uses `/design-library/`. Files within a public static package need paths relative to that package.
10. Retain source capture, source URL, extraction timestamp, available fonts/assets, substitutions and unseen behavior. Add aligned comparisons only for source/output pairs captured at the same dimensions.

## Recommended section boundaries

The homepage’s public content supports the following independently useful sections. These are functional labels, without production-mode badges.

| ID suffix | Section name | Catalog type | Layout responsibility |
| --- | --- | --- | --- |
| header | Navigation | Navigation | Brand, product/solution/industry resources and primary action |
| hero | Hero | Heroes | Promise, explanation, actions and product scene |
| customers | Customer logos | Social proof | Repeating or wrapped brand rail |
| decision | Decision record | Features | Before/after story with four outcome tabs |
| how | How it works | Features | Rules, recorded decisions and organizational learning |
| fit | Where it starts | Applications | Three paths: solution, product, industry |
| products | Product platform | Features | Shared product frame and four governed record types |
| industries | Industries | Applications | Category selector and industry cards |
| stories | Customer stories | Testimonials | Video/customer evidence grid |
| resources | Resources | Editorial | Stories, case studies and field notes |
| closing | Walkthrough invitation | Calls to action | One clear invitation and service destination |
| footer | Footer | Footers | Link groups, company/contact and legal information |

The fit, decision, industry and testimonial cards should use data arrays and reusable card contracts. Their content and layout stay separate from typography, colors, borders, spacing scale and button tokens. Product scenes should be represented honestly as a captured or locally simulated product state; no backend completion should be implied.

## Retained source findings

The captured homepage headline is “Every decision made right and made fast. You hear only about the exceptions.” Its source section IDs are `decision`, `how`, `doors`, `products`, `industries`, `proof`, and `demo`. The decision area contains four outcome tabs (“faster”, “right”, “proven”, “ai” in IDs). The product selector has four tabs controlling a shared stage. The industries selector has three tabs. Customer stories form a horizontal reel with named previous/next controls and direct links to story pages. The mobile navigation uses expandable groups; footer solution and industry groups also expand. Demo CTAs are source buttons, so a script-free import must explicitly restore a usable public destination rather than leave them inert. These are inspected source semantics, not proof of recovered runtime behavior.

## Behavior and accessibility criteria

- Use landmarks for navigation, main content and footer. The assembled page has one primary heading, then a logical heading hierarchy. A standalone section may promote its section heading when needed.
- All product and service actions must resolve to a real public Unifize destination. Do not leave `href="#"`, inert demo buttons, or a fake successful booking. If a booking modal cannot be reproduced, use the original booking link with clear action text.
- A category selector that changes panels needs keyboard access, a selected state, and an associated panel. Native buttons with `aria-pressed` suit a simple filter; if it behaves as tabs, use the project’s existing accessible primitive rather than hand-built arrow-key behavior.
- Menu disclosure controls need accessible names and expanded state. Keep link destinations usable without hover. Mobile navigation must remain reachable when desktop groups collapse.
- Every icon-only control needs a name. Decorative logos/icons have empty alt text when their adjacent text names the item; informative customer marks and content images need meaningful alt text.
- No automatic video sound. Provide a clear play link or button and keep reduced-motion users on a readable static state. Repeating brand rails may wrap statically in the bounded reproduction rather than requiring motion.
- At 390px, preserve the content order, readable line lengths and touch targets. Product diagrams may use a bounded horizontally scrollable region if complete reflow destroys their meaning; the page itself must not overflow sideways.
- Desktop comparison can be offered only for measured source dimensions. If mobile was not observed, use “Responsive adaptation” rather than the existing generic “Observed source layout” string; disable desktop-image comparisons in mobile mode.
- Keep internal provenance in evidence. User-facing labels must be useful page types, section names and system descriptions; never introduce the prohibited production-mode labels or equivalent badges.

## Review checklist for the delivered revision

Verify system card → system detail → sections → individual section → assembled page, and references/compare where supplied. Verify thumbnail paths, the system specimen font, narrow preview, public asset paths under `/design-library/`, actual CTA destinations, visible focus and keyboard access to each reproduced interactive control. Run the existing project checks and production build. Independent QA must inspect the final source/captures and record exact hashes or revision; this product handoff does not count as that pass.

## Implemented interaction adaptation and inspected output

At the parent's request, this specialist also owns `pilot/public/unifize-source/interactions.js` and `local-layout.css`. These add native desktop navigation disclosures, native mobile navigation and nested groups, mobile footer disclosures, working customer-reel controls, local captured-state selectors, and booking links to the verified source `https://www.unifize.com/#demo`. Cookie settings are removed because the local reference package does not use source analytics. Missing standalone fragment destinations fall back to the source site. Source tab widgets are adapted to ordinary button groups with `aria-pressed`; every button remains reachable with native keyboard navigation. Source `.is-active` visual classes are retained.

Actual source images inspected: `pilot/public/references/unifize/viewport.png` and `mobile.png`. Rendered output inspected: `pilot/evidence/unifize/product-menu.png`, `product-mobile-menu.png`, `product-industries-selected.png`, `product-mobile-footer.png`, and earlier `product-mobile.png`. The initial stylesheet assembly failed and was corrected by the parent; the later inspected navigation and selector images use the repaired stylesheet.

The headless local browser run at 1440×1000 and 390×844 exercised all eleven state selectors, opened the desktop product menu and mobile menu/product group, opened a mobile footer group, and checked the isolated hero's link destinations. Results are retained in `pilot/evidence/unifize/product-behavior.json`. There were no page JavaScript exceptions. Mobile document width was exactly 390px; the open menu covered x=0 to 390 and y=71 to 843. The desktop product dropdown was 740px wide and began at y=72. The selected industry has the visible blue underline and matching content cards.

Two findings were routed to the parent: hero video/poster assets were missing from the first retained render; product-suite captures appeared delayed by one source transition (MES showed DMS content, PLM showed MES content). These are source-package issues and must be corrected and reviewed in the final delivered revision. This product pass does not mark them resolved.

Owned-file syntax check passed with `node --check`. Final owned hashes at 13:46 UTC:

- `interactions.js`: `17c6615e257c00653fcc2f0095fdb853c763d235f295795bfcd426cbdfbe786f`
- `local-layout.css`: `789f51ed3e3dd972cd09276a0b9c5b1b09b913462aad9b331e3fe23733960a66`

A final one-line accessibility correction associates the initially selected button with its region name. The interaction captures preceded that naming-only correction; the independent QA agent should inspect the delivered revision. This remains a creator's product/implementation pass, not independent QA.
