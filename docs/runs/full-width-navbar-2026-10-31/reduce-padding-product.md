# Reduced navbar padding — product constraints

Reviewer: `/root/product_design`.

Followup scope: reduce the navbar top and side inset while retaining equality. Inspected `pilot/src/library-tokens.css` and header rules in `style.css`, `system-browser.css`, and `catalog.css`. At review start the token was still 32px desktop / 24px mobile; implementation owner will change only those token values to 24px desktop / 16px through 700px.

Product constraints approved: the existing shared header consumes one token for `padding-top` and `padding-inline`, has `min-height:0`, spans the page width, and retains native link behavior and mobile wrapping. Reducing inset increases available horizontal room; no breakpoint adjustment is justified. The mobile 16px inset leaves adequate space for the existing 2px outline with 4px offset. Keep logo geometry, nav gaps, active underline, content widths and bottom margins unchanged.

Final QA acceptance: computed header top/left/right padding equals 24px above 700px and 16px at or below 700px; verify 320px mobile and a desktop/detail route. There must be no horizontal overflow, clipped focus outline or overlap. On detail routes measure top inset relative to the header below its optional notice. Final visual/behavioral validation remains pending independent QA.
