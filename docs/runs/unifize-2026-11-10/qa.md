# Independent QA — Unifize / Decision Rails

Reviewer: real subagent `/root/unifize_qa`. This reviewer did not implement the collection. Status: **passed for the bounded local reconstruction**, with the limits below. Final affected-output inspection completed 2026-11-10 13:52:06 UTC.

## Exact delivered revision

The full browser/visual pass began at 13:50:56 UTC. It inspected the complete source page, 12 isolated sections, collection card, system panels, comparison UI, and desktop/mobile behavior. After that pass only `pilot/src/system-preview.css` changed; its affected card was independently re-rendered and visually rechecked.

The exact final 83-file hash set is `pilot/evidence/unifize/qa-final-revision.json`. Its digest is `410b863867b2a3dd1a75056be2e3371dc514e6163cf928ff305ae26a799d0a8e`. The final specimen CSS SHA-256 is `9328da280fc517e5070a5b4109a5273555ed25ec7c7106603d51bd7d7a90123d`. This pass does not validate subsequent implementation changes.

## Evidence actually inspected

Inspected the live-source captures and source measurements; final 1440×1000 viewport, complete desktop and 390×844 mobile render, customer reel detail, expanded mobile navigation, system overview, Foundations/Patterns/References, collection card, and the aligned source/implementation hero comparison. Actual screenshot evidence is retained under `pilot/evidence/unifize/qa-final-*.png`.

The browser results and full-pass hashes are in `qa-final.json`; the specimen correction recheck is in `qa-card.json`. The earlier `qa-browser.json` and `qa-focused.json` describe earlier revisions and are retained only as correction evidence.

## Passed checks

- No JavaScript errors or failed network requests in the final scoped browser run.
- Complete desktop page: 1440px wide, 11221px high. Mobile: 390px wide, 12703px high. No page-level horizontal overflow or broken images at either viewport.
- All 12 standalone section documents load with valid content, no broken images, no empty `#` links and no horizontal overflow. Header is72px; hero is980px at the canonical desktop viewport.
- The React page wrapper measures11221px with a980px hero, matching the static canonical viewport and avoiding the earlier viewport-height drift.
- Four outcome controls, four product controls and three industry controls update the associated region, selected `aria-pressed` state and region label. Outcome posters resolve locally; all four product records are distinct and appropriate.
- Native desktop and mobile navigation open by keyboard. Mobile product disclosure exposes its links. Footer groups open. Customer reel advances0→1169px and its visible thumbnail images render after decode.
- Booking and account actions stay on the original public service; no fake booking completion or backend functionality is implied.
- New system/section/page/source routes resolve. System Foundations, Patterns and References controls work; all pattern images decode on activation. The corrected system card visibly uses charcoal, white/blue typography and the retained source font.
- The hero Compare action is enabled on desktop and displays source/output rasters both1440×980. Source/output rails, type positions, split and section geometry align. The retained geometry comparison records zero top/height deltas for all12 desktop sections.
- Forbidden production-mode phrase removed from the new collection's displayed References text.

## Findings resolved during review

The source asset rewrite initially corrupted CSS data URIs; the corrected source cascade restores layout. Unlocalized video posters and hidden reveal states initially left major panels blank; retained local artwork and settled reveal states restore them. Product selection capture timing initially reused one state; the corrected capture has QMS, DMS, MES and PLM records. Customer thumbnail paint timing was corrected by waiting for image decode. The wrapper's viewport-height dependency was corrected to its canonical preview height. The card's surface/font role variables were added and its actual render was rechecked.

## Limits

This is a measured static reconstruction, not a claim of pixel identity with a running animated site. The source hero's rolling status list is at a slightly different animation position in the comparison; the implementation intentionally holds a chosen source frame. Native disclosures and button groups replace source client behavior, and mobile footer/navigation behavior is an adaptation. Product diagrams are captured evidence, not a functioning quality-management application. External booking, account and customer-story destinations were checked as links, not submitted or exercised. Existing unrelated systems were not comprehensively regression-tested; two pre-existing Steel demo image404s observed in the initial all-Pages pass are outside this change. The final scoped Unifize pass has zero failed requests.
