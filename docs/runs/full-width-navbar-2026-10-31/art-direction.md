# Art-direction pass

Reviewer: actual specialist agent `/root/art_direction`.
Scope: navbar width only, original layout adjustment. Source inspected: supplied screenshot `Screenshot 2026-10-31 at 3.01.46 AM.png` at its actual attached path; `pilot/src/main.jsx`, `style.css`, `catalog.css`, and `library-tokens.css`.

The screenshot shows the brand and right navigation aligned with the same centered region as the Pages content. The brand combines a black linear mark, serif lettering, and red handwriting. The selected Pages link carries a small red irregular underline. These existing details establish the identity and should stay unchanged.

Approved direction: move the shared library header outside `.reading-column`; make its box span the available page width. Use 32px inline desktop padding and the existing 24px mobile gutter. Preserve existing vertical spacing. Keep the catalog and detail content constraints untouched. Desktop navigation sits at the far right gutter, the brand at the far left gutter; mobile retains its existing wrapping behavior.

No additional background, divider, shadow, sticky positioning, animation, font change, or asset substitution is needed. Preserve logo/signature geometry, nav destinations, active indication, and keyboard focus treatment.

Responsive direction is authored adaptation, not recovered unseen behavior. Verify the narrow desktop boundary at 701px, plus 768px and 320px, to ensure the unbroken brand and nav fit or wrap as intended without horizontal overflow. This is design guidance against the original image and source, not final output QA.
