# Independent QA: page type filter

Reviewer: `/root/independent_qa`. **Passed for the requested change.** No blocking findings; no UI edits.

Reviewed canonical `pilot/src/catalog.jsx` SHA-256 `7e5c8acf31efcd17de3d7ffa248f96b7d4def5903dff51d3486d41d0659daec8`, independently recomputed and equal to running runtime mirror. App: http://127.0.0.1:5173.

Inspected actual current parent `pages-1440.png` and `pages-320.png`. The single Pages filter now reads Page type; existing compact preview-first cards, typography and card layout remain visually unchanged. Mobile control fills its row without overflow. Prior source screenshot and compact-card QA remain evidence for unchanged card geometry.

Own Chromium/Playwright checks `/tmp/qa-page-type-filter.mjs`, results `qa-checks.json`:

- Exactly one Pages select, accessible name Page type. Options are Page type, Landing page, Portfolio, matching registered page types.
- Both types select the correct page, persist `type` in URL/reload, omit system param on changes, and Clear filters returns both pages.
- Stale `system` params do not filter Pages; valid page type still applies. Invalid page types and section-only Heroes type fall back to all pages.
- At1440/390/320px, compact9:10preview geometry remains; no document horizontal overflow.
- Native select receives keyboard focus with visible1pxfocus box-shadow, preserving existing control style.
- Sections retains both Section type and Design system filters. Combined Heroes/Blueprint selection returns one correct card; reload persists both values; Clear filters returns18cards.
- No JavaScript page errors.

Build/project checks were reported passing by parent, separate from this independent browser review. Native OS select popup arrow-selection behavior was not re-tested; selection/filtering and focus were verified through native select API and keyboard focus.
