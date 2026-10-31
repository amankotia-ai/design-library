# Product design review — full-width navbar

Role: product designer (`/root/product_design`).

Scope: make the shared library navbar span the page width. This is an original responsive layout adjustment, not faithful source recovery. No new features or changes to library content.

Inspected source: `pilot/src/main.jsx`, `pilot/src/style.css`, `pilot/src/catalog.css`, `pilot/src/library-tokens.css`; inspected original user screenshot at its provided local path with `view_image`.

The current navbar is inside `.reading-column`, coupling its width to the centered content. Move only the shared header outside that container, after the optional pilot notice. Make it fill its parent and apply comfortable independent horizontal gutters (32px desktop; existing 24px at mobile is sufficient). Preserve its existing vertical position and bottom spacing. Keep the content column, cards, filters and all route behavior unchanged.

Protected behavior: the logo remains the home link; Sections, Pages and Design Systems remain native navigation links with their existing destinations, accessible nav label, active `aria-current` value and red handwritten underline. Preserve branding assets, font treatment and mobile size adjustments. The existing mobile two-row layout remains appropriate.

Acceptance criteria:

- At 320px: logo and signature fit within the guttered viewport; navigation forms the existing second row; all links and focus rings are visible; no horizontal overflow.
- At 390px: same two-row behavior, unchanged logo and link sizing; content retains existing margins.
- At 768px: header uses the available viewport rather than the content max width; logo and links do not collide; content remains centered.
- At 1440px: logo sits near the left gutter and navigation near the right gutter; content width and card positions remain unchanged.
- At screenshot reference width (3024 physical pixels; logical viewport not supplied): header is no longer capped by the centered content maximum. Do not claim a precise CSS viewport from the screenshot. Verify a wide logical viewport independently.
- Across Sections, Pages, Design Systems and detail views: width treatment is shared; native navigation, active state and keyboard focus remain functional.

Review status: design constraints supplied before implementation; final output inspection belongs to independent QA.
