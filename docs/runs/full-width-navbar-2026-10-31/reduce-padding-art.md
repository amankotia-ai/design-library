# Reduced navbar padding: art-direction pass

Reviewer: actual specialist `/root/art_direction`.
Inspected actual prior captures `equal-padding-1440.png` and `equal-padding-390.png`, plus current `style.css`, `library-tokens.css`, and `system-browser.css`.

Approve reducing the shared navbar inset from 32px to 24px on desktop and from 24px to 16px at the existing mobile breakpoint. This fulfills the bounded follow-up while retaining equal top and side padding. Keep logo scale, signature alignment, active underline, links, wrapping, and bottom gap unchanged.

The content gutter is a separate token and should remain unchanged. On mobile the navbar will consequently begin 8px left of the catalog content; that is consistent with the request applying to navbar padding only. The 16px outer inset remains sufficient for the existing focus outline.

No essential art-direction issue identified. This is a source/prior-render design review; the independent QA pass must inspect the delivered reduced-padding revision.
