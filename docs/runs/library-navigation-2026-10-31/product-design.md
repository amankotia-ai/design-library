# Product design pass

Role: /root/product_design. Reviewed the actual before-desktop.png at 1440 × 1000 and main.jsx, system-browser.jsx, data.js from the running local runtime. No UI source edits.

## Job and scope

An internal designer arrives to find a section, assembled page, or visual system, previews it, and opens the working item. Implement the user's approved three destinations. Preserve branding (including the existing `of Manks` signature), tokens, system names, source attribution, comparison tools, and underlying reference rendering.

## Required behavior

- `/` opens Sections. The brand returns there. The only top-level links are Sections, Pages, and Design Systems. Use real anchors and `aria-current="page"`; detail views keep their parent destination active.
- Sections lists the 18 non-page items across both systems. Pages lists exactly the two assembled pages. Do not show assembled pages in Sections or individual sections in Pages.
- Sections can narrow by section type and design system. Pages can narrow by system. A section card shows its name, system name, actual preview, and a real preview/open destination. Existing raw `category` strings are inconsistent; normalize a small user-facing type set rather than exposing one category per item.
- Design Systems opens the current two-system visual catalog. Clicking a system opens its existing explanation, palette, typography, and section inventory. The inventory must open the corresponding item, and the assembled-page link belongs to Pages.
- The item detail should lead with the selected item's title and working preview. Keep Desktop/Mobile, available Compare, and existing original/source mode behavior. Place reference information after the preview or behind a clearly named detail disclosure, rather than introducing Sources as a top-level destination.
- Keep reference and original-expansion labels truthful. Blueprint is a source reconstruction, with original service actions leading to Blueprint. Do not imply it is already an original rebrandable kit.
- Reuse native selects and buttons. Keep filter labels persistent and accessible; filters must actually update results. An empty result says no matches and provides one clear reset action.
- Do not add fake Copy/Use controls that have no real export or copy implementation. Existing Open section/page is an honest working action for this scope.

## Minimal routing contract

- `?panel=sections` → section catalog; `?panel=sections&section=hero` → hero detail.
- `?panel=pages` → page catalog; `?panel=pages&section=page` → Quiet Serif page detail.
- `?panel=systems` → system catalog; `?panel=systems&system=editorial-01` → system detail.
- Preserve `?view=...` standalone renders unchanged: previews and comparison controls already depend on these URLs.
- Legacy `panel=home` can alias the system catalog, while root becomes Sections. Legacy `panel=library&section=...` maps to the appropriate section/page detail. Legacy `panel=system&section=...` resolves the item's system detail. Keep `panel=sources` reachable as a secondary reference destination so existing saved links continue to work.
- Unknown panel, section, or system values must fall back to a working catalog; never dereference an undefined selected item.

## Validation criteria

Open all three nav destinations; test one section and one page from each system; test system inventory links and legacy URLs. Check filtering/reset, mobile header wrapping at 390px and 320px, keyboard focus, and absence of horizontal overflow. Confirm source preview URLs are unchanged and inspect the delivered screenshot, not just source code.

Status: constraints delivered; implementation review pending.
