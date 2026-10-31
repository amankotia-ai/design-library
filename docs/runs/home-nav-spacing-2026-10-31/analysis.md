# Homepage navigation top spacing

Reviewer: /root/cleanup_analysis; combined visual/product/art direction pass. Inspected actual `home-square-viewports-2026-10-31/after-1440.png`, `after-390.png`, and current article-header rules in `style.css`/`system-browser.css`.

The user asks to reduce padding above navigation. Apply a homepage-only header override: padding-top32px on desktop/tablet,24px at the existing mobile breakpoint, and min-height0 so the inherited103px minimum does not preserve excess empty space. Keep header bottom margins96px/64px, brand/nav typography, links, wrapping, and collection content unchanged.

Acceptance: header starts visibly closer to page top at desktop/mobile; computed homepage padding32px/24px and min-height0; brand and navigation remain aligned and keyboard reachable, mobile nav wraps as before; bottom separation stays96px/64px; collection/frame/card structure and other routes remain unchanged. Latest supplied captures show two cards, Quiet Serif and Blueprint; preserve current source inventory rather than reintroducing removed content.
