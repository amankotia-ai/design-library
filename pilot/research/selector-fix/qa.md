# Collection selector — independent scoped QA

Reviewer: `/root/selector_qa`. Status: **passed within this control-only scope**, 30 October 2026. The reviewer did not edit implementation.

Inspected the running preview through CUA and actual desktop focus/rest and mobile screenshots. At1440px the control measures176×36 CSS px. At390px it measures342×36px, filling the342px reading column without horizontal overflow. Computed typography is12px/20px, native appearance is disabled, the decorative arrow is12px from the right edge, and text remains legible without clipping.

Exercised native keyboard selection to Signal Workshop and back to Quiet Direction. Keyboard focus visibly has a2px outline. Study, System, and Sources retain the native labeled select. Selecting Signal Workshop in Sources and opening System displays Signal Workshop, confirming retained selection across panels.

Saved and visually inspected:

- `evidence/selector-fix/selector-desktop.jpg`: keyboard focus close-up.
- `evidence/selector-fix/selector-desktop-rest.jpg`: at-rest close-up.
- `evidence/selector-fix/selector-mobile.jpg`: actual390px viewport control/label close-up.

Temporary viewport override was reset after responsive checks. No implementation blocker found. This is a scoped Chromium/CUA control review, not a cross-browser or screen-reader audit. It supersedes affected selector/shell claims only; it does not repeat the earlier workshop or source-reconstruction review. Parent's `run.json` records the delivered revision hashes; no additional cold Documents reads were needed to complete this report.
