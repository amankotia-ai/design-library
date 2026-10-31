# Follow-up content alignment correction

Art director: `/root/art_direction`. Inspected current runtime library-tokens.css and catalog.css. Parent's live1440px measurements establish the rendered discrepancy: navbar inset24px, content inset32px. This is a correction to the previously delivered width change, not a new layout direction.

The navigation is now the authoritative alignment reference. Alias `--library-page-gutter` to `var(--library-header-inset)` instead of maintaining independent numeric values. Remove the mobile page-gutter override so no breakpoint can silently diverge from the header. Preserve the header itself.

Catalog headings, filter right edge, first/last preview edges, captions, detail media and detail shell should align to the header's inner content boundaries. Keep all collection column rules, preview aspect ratios, square frames, typography, caption spacing and vertical spacing. This correction changes only the common outer horizontal content alignment.

Final acceptance requires the changed live revision at1440px and390px: content and navbar left/right edges agree within1px, with no horizontal document overflow. Include820px if already part of parent validation. Numeric token equality alone is insufficient if nested padding or legacy margins still affect actual bounds; inspect rendered element rectangles.
