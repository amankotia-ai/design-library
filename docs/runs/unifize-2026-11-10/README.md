# Unifize / Decision Rails

Added the live Unifize homepage to the existing Design Library: one named system, twelve reusable section documents, a complete landing page, Foundations and Patterns content, source attribution, and twelve aligned reference comparisons.

## Open

- System: `/design-library/?panel=system&section=unifize-page`
- Sections: `/design-library/?panel=sections&system=unifize`
- Page: `/design-library/?view=unifize-page`
- References: `/design-library/?panel=sources&section=unifize-page`
- Run locally from `pilot/` with `npm run dev`.

## Source and production

Captured https://www.unifize.com/ on 10 November 2026. The live page differs from indexed web text; live browser captures are authoritative. Freebyrd index, thread and references returned no matching folder context. The sibling Render Assets typography evidence was consulted; no sibling files or installed skills changed.

The retained public assets include exact IBM Plex Sans, Inter, Geist and JetBrains Mono font files, SVG marks, photographs, posters and source MP4s. `pilot/public/unifize-source/manifest.json` records111 fetched asset URLs and sizes. No source JavaScript bundles, tracking or forms execute in the local version. Shared tokens live separately in `tokens.css`, layout in retained `source.css` plus documented adaptations, content in twelve HTML section documents, and interactions in `interactions.js`.

Faithful reproduction is the production mode. No new complementary sections were requested. The hero uses a still extracted at4seconds from the exact source film; other film scenes use their original posters. Reveal transitions are settled. Native disclosures replace script-driven menus; eleven recorded outcome/product/industry views use accessible button groups. Customer navigation scrolls locally. Service and booking actions open the source. Canonical embedded desktop previews retain the reference1000px viewport height so auto-sizing the page does not distort vh-based hero geometry.

## Validation and limits

`npm run check` and `npm run build` pass. The build retains existing Radix module-directive and large-bundle warnings. At1440px, all12 measured section heights and top positions match the captured source. Desktop page height11221px; mobile390px page height12703px. Local render audit reports no horizontal overflow, broken images, remote media or page exceptions. Twelve comparison pairs have matching image dimensions.

Geometry equality does not imply pixel identity. Film frames, native control semantics, solid sticky header and omitted cookie/tracking UI are documented adaptations. No source application backend, booking submission or live customer system is reproduced. Copy, identity and media remain attributed to Unifize.

Visual analysis, product design, art direction and independent QA used actual images and working previews. See their reports here, `run.json` for exact implementation hashes, and `pilot/evidence/unifize/geometry-comparison.json` for measurements. Final independent QA passed on the delivered revision; `qa.md` and `pilot/evidence/unifize/qa-final-revision.json` record the reviewed hashes and scope.
