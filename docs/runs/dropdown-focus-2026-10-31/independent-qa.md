# Independent QA — attached dropdown focus

Reviewer: `/root/independent_qa`. Status: **Passed**. No blocking findings.

Reviewed canonical/runtime `style.css` SHA-256: `347d958acaf0891e899ccc7219fb465fcbf3af0324f748c4fe0da01be0949108`; source copies match.

Own Chromium session reached Section type using repeated keyboard Tab, without programmatic focus. Computed focus: outline none, border rgb(86,86,79), same-color box shadow 0px0px0px1px; background remains transparent. Native Heroes filtering returns2 cards and Clear restores18. Hover background also remains transparent. Results in `qa-checks.json`.

Inspected actual `focused-dropdown.png` and own `qa-keyboard-focus.png` using image viewer: focus is a continuous darker edge attached to the pill, without a detached outer outline. Text,arrow and layout remain intact. QA did not edit application source.
