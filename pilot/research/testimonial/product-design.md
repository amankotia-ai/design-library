# Quote section: product design

Run: testimonial-002 · Role: product designer `/root/testimonial_product` · 2026-10-30.

## Evidence inspected

Inspected the actual `public/references/17-testimonial.jpg` at 3044 × 1760 through the image viewer (viewer scaled to 2048 × 1184), plus current `src/main.jsx`, `src/data.js`, and `src/sections.jsx`. The source shows one black-and-white portrait at left, a large serif testimonial at right, and small attribution below. No carousel, rating, interaction, mobile layout, or verified endorsement context is visible. The current library selects page/hero/feature/footer and only the hero has an aligned comparison. Its assembled page clearly discloses illustrative content.

## Product scope

Add one reusable `Quote` section and one section record. Support two explicit uses: a source reproduction study with the text visible in reference 17, and an original responsive editorial note. Preserve the existing hero/feature/footer behavior. Do not infer multiple testimonials, navigation arrows, client logos, ratings, or motion.

The source's named speaker and company are visual reference content, not a verified customer endorsement. Keep that reproduction confined to the reference-study route and label it nearby in library chrome and in a visible standalone disclosure. The original assembled-page section should use an explicitly illustrative studio note (for example, “The strongest image often begins with noticing what is already there.” / “Studio note” / “Illustrative content”). Do not carry the source name/company onto the illustrative portfolio. A photograph is a reference crop, not a verified portrait of the quoted speaker.

## Component contract

`Quote({ content, faithful = false, layout = "portrait", id })` accepts data rather than embedded names or wording. An original `layout="statement"` omits the image and preserves the same type/rule/spacing system for the assembled page, avoiding an immediate repeat of the Feature portrait:

- `quote`: required plain string; allow natural wrapping in the original adaptation.
- `attribution`: plain string, such as `Studio note` for illustrative content.
- `context`: optional secondary label; `Illustrative content` in original use.
- `image`, `imageAlt`: optional paired image data. Reference crop alt should describe visible braided hair/back of figure, without claiming identity.
- `sourceId`: optional provenance key `17`.
- `disclosure`: short visible context outside the quotation. Required for copied source text and illustrative endorsements.

Keep faithful source content in a separate `quoteReferenceContent` export and original content in `quoteContent`. Shared typography/color tokens stay in `tokens.css`; quote geometry stays in `sections.css`; source URLs/dimensions/comparison image paths stay in metadata. Add function `Quote / perspective`, layout `Portrait + text`, style `editorial-01`. This separation allows later quote layouts without a new visual style.

## Semantics and accessibility

Use a labelled `<section>` containing `<figure>`, `<blockquote><p>…</p></blockquote>`, and `<figcaption>` for attribution/context. An attribution person's name is not a work title: do not wrap it in `<cite>`. Keep reading order quote → attribution and context; decorative image can precede them visually but should use honest alt. No controls belong inside the section. Source navigation remains an ordinary anchor with a descriptive label and visible focus. Use existing native library select/buttons for integration. The original adaptation must remain readable at 200% zoom and 320px width without clipping long quotes or names. A fixed source-sized canvas is acceptable only in the explicitly measured reproduction route.

## Responsive contract

Faithful mode is measured at the analyst's declared source crop dimensions. Preserve source geometry there; scale the whole canvas in library preview rather than reflowing its contents. Mobile mode is explicitly an original adaptation: stack image, quote, attribution; use 20px page gutters, existing serif/sans tokens and editorial hairlines, a readable serif quote of roughly 34–44px, and normal text wrapping. Desktop original mode follows the existing 12-column grid with a portrait/text split and restrained whitespace. Omit the image cleanly if content provides none. Height grows with content. No CSS line clamps or hard-coded `<br>` in the original quote. The content contract must tolerate a two-sentence quote and a long attribution without overlap.

## Library integration

Add Quote to the existing section selector. Desktop source preview, comparison, and open-section route must all agree on faithful mode and source dimensions. Mobile open-section should open the mobile adaptation, not accidentally append `mode=faithful` as the current hero link does for either device. Prefer comparison metadata on section records rather than a new set of hero-only ternaries. Selecting another section closes comparison as today. The comparison label must disclose substitute fonts and source text. Display source 17 in Sources as an actual quote study, retaining original attribution and link. Update counts and statements that say three sections. An assembled original quote can sit between Feature and Footer as the text-only `statement` variant and needs its own honest sample-content label; adjust section numbering consistently. Parent-proposed copy “A good frame gives every gesture room to be seen.” / “On composition” / “Studio note · illustrative copy” satisfies that requirement.

## Acceptance checks

1. Quote select, source comparison, standalone desktop study, mobile adaptation, Sources, and assembled page are reachable and render without errors.
2. Source capture uses the analyst's exact declared canvas, and the implementation comparison does not silently show a previous hero capture.
3. 320px, 390px, 768px, and desktop original routes have no horizontal page overflow or text clipping.
4. Replace the original quote temporarily with a substantially longer string and attribution; both grow naturally without overlap.
5. Keyboard tabbing reaches native library controls and source links in logical order; section adds no unnecessary tab stops.
6. Copied source text and names appear only with the visible reproduction disclosure. Assembled page clearly says illustrative content and never implies a real endorsement.
7. Existing hero, feature, footer, desktop/mobile preview, hero comparison, and source attribution remain functional.

Review status: design constraints delivered; implementation and independent QA pending. No implementation edits performed by this agent.
