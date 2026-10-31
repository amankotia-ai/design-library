# Equal navbar inset: art-direction review

Reviewer: `/root/art_direction`, actual specialist. Reviewed current `pilot/src/style.css`, `system-browser.css`, `catalog.css`, `library-tokens.css`, and shared header markup in `main.jsx`. This is bounded original layout refinement requested after the full-width change.

Approve one shared `--library-header-inset` value for top and inline padding: 32px on desktop and 24px at the existing mobile breakpoint. This makes the header's top and side spacing a consistent authored rule across catalog and detail routes, without changing brand styling or navbar behavior.

Essential implementation detail: eliminate the base `min-height:103px` or neutralize it to zero. With centered flex alignment, minimum height can introduce unused vertical space beyond declared top padding, so the logo may appear lower than the equal inset. Home-specific padding-top overrides should be removed or consume the same shared variable; retain existing bottom margins so this request does not also redesign the following content spacing.

For detail views with the pilot notice, compare top padding from the header box immediately below the notice. The notice itself is not header padding. Use the header and black brand-mark boxes for measurement; the signature asset contains transparent pixels and an intentional baseline translation, so its visible ink does not establish the layout inset.

No new border, background, shadow, sticky behavior, typography, or signature change is warranted. This document records source/design review; final rendered validation remains the independent QA owner's responsibility.
