# Square viewport corners

Reviewer: /root/cleanup_analysis; combined visual/product/art direction pass for an explicit one-property request. Inspected actual `home-flow-previews-2026-10-31/after-1440.png` and `.page-viewport` CSS, currently `border-radius:6px 6px 0 0`.

Set `.page-viewport` border-radius to0. The request names the viewport specifically: retain the outer card/stage shape,16px inset, tall flowing preview geometry, bottom crop, native scrolling, and page content. Rounded elements inside the embedded websites belong to those websites and are outside this request.

Acceptance: all four computed viewport corner radii are0 at desktop/mobile; visible top viewport corners are square; outer card geometry and flow height remain unchanged; no content/scroll behavior changes.
