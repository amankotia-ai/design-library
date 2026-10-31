# Visual analysis — compact dropdown widths

Reviewer: `/root/visual_analysis`. Inspected actual screenshot `/Users/abhishekmankotia/Desktop/Screenshot 2026-10-31 at 3.19.24 AM.png` and current `catalog.css`, `style.css`, `system-browser.css`, `catalog.jsx`. No UI source changed by this reviewer.

Observed: attached crop shows two 440px-wide dropdown pills in a likely 2× capture, consistent with `.catalog-filters .library-select{width:220px}`. Both labels occupy a small part of the control and leave a broad empty interval before the chevron. Current base select styles also declare 176px width; mobile catalog overrides force controls to 100% width and labels to a full row.

Minimal correction constraints:

- Make catalog selects use intrinsic width from their label/options (`width:auto` overriding the base 176px), while preserving existing type size, 36px control height, 12px leading and 36px trailing padding, rounded outline, transparent fill, chevron and focus appearance.
- Preserve sufficient room for longest native options, currently Calls to action in Section type, Landing page in Page type, and Design system/Quiet Serif in system filter. Do not size to the short currently selected label if it would clip another choice.
- Remove the mobile forced 100% select width and full-row label flex basis; let compact controls wrap as needed. Constrain to available width and preserve the existing gap. Do not create page overflow at 320px.
- Preserve filter functions, selection persistence, clear action, page cards, navigation and all unrelated concurrent edits. No new dropdown component or typography change is needed.

Acceptance: all catalog dropdowns are visibly narrower than the former 220px controls; each default and longest selected value remains readable; desktop alignment and narrow-screen wrapping remain sound; source/detail collection switches remain unchanged unless separately requested. Independent QA must inspect delivered source and rendered output.
