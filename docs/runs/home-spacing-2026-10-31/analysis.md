# Homepage spacing: visual and product analysis

Reviewer: /root/cleanup_analysis. Inspected the actual user screenshot `Screenshot 2026-10-31 at 1.47.29 AM.png` and current `pilot/src/system-browser.css`.

The user asks for “more space above the collection.” The screenshot shows the cleaned catalog beginning soon below the brand/navigation header. Interpret this as additional separation between the header and the whole collection area, including its “Design systems” heading and count. Preserve the heading-to-card gap and card internals.

Recommend increasing only the homepage header bottom margin from 48px to 96px on desktop/tablet and from 32px to 64px at the existing <=700px breakpoint. This doubles the relevant gap without adding content or altering the grid.

Acceptance: collection heading and cards move down together by 48 CSS px on desktop/tablet and 32 CSS px on mobile; brand/navigation stays in place; heading-to-card spacing, cards, content, and routes remain unchanged; no horizontal overflow. Compare rendered desktop and mobile captures to confirm the intended air above the collection rather than inside it.
