# Unifize art direction

Run: unifize-2026-11-10. Specialist: `/root/unifize_art`. Owned artifact: `pilot/src/unifize-data.js`. This is art direction and metadata production, not independent QA.

## Inspected evidence

Inspected `pilot/public/references/unifize/viewport.png`, the full desktop and mobile captures, enlarged desktop crops of the how-it-works and proof sections, `pilot/research/unifize/capture.json`, retained source styles, and the product-design handoff. The live source differs from the web index: its actual hero begins “Every decision made right and made fast.” The live capture governs this collection.

## System identity and preservation

Name: **Decision Rails**. It describes the continuous structural rules and concrete decision records that distinguish the page. Keep the Unifize attribution in references and source notes; the design-system name describes its visual character.

The hero occupies 980px at 1440px wide, including the fixed 72px navigation area. Its composition splits at x720. Outer rails sit at x48 and x1392; the left headline begins near x91. White text and a pale blue second statement sit on charcoal. The right panel is a source blue-to-paper field carrying a quieter status card above a larger exception card. Preserve this hierarchy and the original wordmark.

The source uses IBM Plex Sans for major headings, Inter for body and interface, and JetBrains Mono for utility labels. These are identified through captured font families/source CSS rather than visual guessing. Keep source font assets when available. Palette declarations include charcoal `#1f2126`, ink `#17191f`, paper `#ffffff`, light rule `#e4e7eb`, action blue `#005bb7`, and highlight `#70aeff`. The rails become translucent white on dark surfaces.

The how-it-works sequence has three numbered rows with explanation on the left and framed records on the right. Soft blue and warm fields are source artwork context, not a reason to add gradient decoration elsewhere. The product panel is dense by design; keep recognizable owners, record titles and state labels. Do not substitute generic empty dashboard tiles.

The page switches from dark opening/problem sections to light explanatory sections, then back to dark customer proof and closing. Keep the sequence. Mobile stacks the content and compacts the record demonstrations; source captures establish its basic arrangement, while any repaired control/reflow behavior must be documented as adaptation.

## Capture limits and implementation direction

The captured desktop proof reel loads its first thumbnail while later thumbnails remain placeholders. The captured resources and closing sections have content in the DOM but remain visually unrevealed. The mobile capture includes similar large blank late areas. These are reveal/lazy states, not intentional section designs. Expose the available content for a usable static reconstruction, and preserve the unchanged source capture as evidence. Do not claim a pixel-identical full-page match or all source animation states.

Record scenes are illustrative interface states. Local interactions can navigate a category or open a public destination, but should not imply a live quality management backend. Unifize owns the copy, marks and media. No original system expansion is required in this intake.

## Extension criteria

A future authored section should preserve rail alignment, type hierarchy, restrained controls and realistic record content. Choose the arrangement for the section's purpose: split explanation, structured list, evidence cards or software frame. Introduce color through status or meaningful emphasis. Keep production distinctions internal; the interface uses useful names such as Hero, Product platform, Industries and Resources.

Comparison metadata is intentionally empty until the implementation owner has aligned source/output captures at identical dimensions. This avoids presenting an unverified viewport/full-section pair as a valid comparison.

## Visual analyst reconciliation

Consumed `/root/unifize_visual`'s `visual-analysis.md` after the initial direction. Its measured geometry and source family findings agree with this direction. Desktop H1 uses 56.16px at 1440px with 1.07 line height and captured −3.6504px tracking; mobile source rule yields45.24px at390px. These are source-specific measurements, not a uniform size for all headings. The analyst also confirms the source's reveal-hidden lower content and unloaded reel thumbnails. The visible cookie notice is a capture overlay and must be excluded or explicitly disclosed in a comparison; it is not a reusable design-system component.

## Delivered art review — 13:48 UTC

Inspected the actual implementation viewport and full mobile capture in `pilot/evidence/unifize/`, the library system preview, and section thumbnails for decision, how, fit, products, industries, stories, resources, closing and footer. Reviewed file hashes are recorded in `art-reviewed-hashes.json`. This is the creator-side art pass; independent QA remains separate.

The desktop hero preserves the split geometry, type hierarchy, rail positions, charcoal surface and blue decision field. Its static source-video frame shows a different step from the original capture, which is consistent with the documented motion limit. Product scene, story reel, resources and closing now show complete media/content. The prior hidden-content holes in the lower source capture are no longer reproduced. The functional labels and Decision Rails identity fit the library.

**Changes requested:** fixed page navigation is captured over content in the standalone thumbnail evidence: decision and how show a header across the middle of their text; industries and footer show it at their top edge. These files are used as section previews, so the overlap is a delivery defect. Capture non-header/non-hero sections with `.dms-header` hidden, or capture each isolated section route, then replace these thumbnails. Do not change source section layout to compensate for a capture artifact.

A related concern requires QA: the assembled fixed header is light text on a transparent background while crossing light sections, as seen in the industry capture. Verify actual scrolled behavior; preserve contrast using the source scrolled state or a solid charcoal header. The mobile footer evidence also includes a fixed header overlapping its brand area. These observations are limited to the captured states and do not establish every live scroll state.

Apart from these header/capture issues, the inspected content is visually complete and remains coherent with the source character. Approval of affected previews is pending their replacement; this report does not mark independent QA passed.

## Correction review — resolved

Reopened and visually inspected the replacement decision, how-it-works, industries and footer thumbnails plus the final viewport. The page navigation is absent from each isolated section capture, leaving its original content and rail geometry unobstructed. The hero retains its intended navigation and composition. Also inspected the delivered `layout.css`: `.dms-header` now has a solid charcoal background, addressing the identified light-text/white-surface contrast mechanism. The independent QA pass owns live scroll and interaction verification.

The affected creator-side art findings are **resolved** on the files listed in `art-final-hashes.json`. No further visual blocker was found in the replacement captures. This resolution supersedes the earlier pending preview status, but does not claim independent QA or pixel-identical animated behavior.
