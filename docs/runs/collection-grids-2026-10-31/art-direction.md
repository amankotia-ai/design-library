# Collection grid art direction

Art director: `/root/art_direction`. Mode: original library-system adaptation. Inspected the actual attached 1250 × 814 screenshot with `view_image`, visual-analysis.md, product-design.md, and existing system-browser.css/catalog.css. Also inspected before-sections.png after capture. The rendered view confirms rounded outer cards enclosing both preview and text, with caption edges inset from preview edges. This direction is not final rendered-output approval.

The reference's useful character is a quiet rectangular stage with disciplined alignment. Apply that to the preview frame; the text below should read as a caption on the page. Keep the existing Geist typography, neutral colors, preview imagery and rectangular ratios. The red measuring overlay and unavailable source image are not styling to reproduce.

## Bounded implementation contract

- `.system-card` becomes a transparent, borderless, square-cornered layout wrapper with visible overflow. It must not enclose the caption in an outer surface.
- Only `.style-preview` and `.asset-preview` receive the square frame: explicit 0 radius, 1px existing rule color, existing wash and preview padding. Retain 9:10 Page/System framing and 16:10 Section framing; square corners do not establish a new aspect ratio.
- `.system-card-body` starts 16px below the preview, with zero horizontal padding. The metadata, title, description, palette and actions share the preview's outer left and right alignment. Existing internal title spacing can remain.
- Keep the light action separator inside the caption, but no enclosing border/background/shadow. This divider preserves action hierarchy without rebuilding a boxed card.
- Use one shared grid for every catalog: three columns above 900px, two columns from 701–900px, one column at 700px and below. Preserve 24px desktop column gaps and 16px intermediate column gaps; use 40px row gaps on desktop/tablet and 32px on mobile so adjacent unboxed captions remain distinct. Store these inputs as shared library tokens.
- Apply equal grid alignment rules across Sections, Pages and Systems. Do not force equal caption height or truncate long names/descriptions merely to align actions. All text must remain legible at 390px.

## Review criteria

Confirm the frame alone has a border, all preview corners are square, caption left edges match the frame left edges at every breakpoint, and there is no residual 16/20px horizontal body inset from earlier media rules. Check 1440px, 820px and 390px. Keep focus outlines visible after removing article clipping; retain live iframe viewport focus and native links/filters. Final independent QA must inspect rendered output, since this document is direction rather than final approval.

Before-render review: at1440px, previews start at x152/539/925, while caption text is inset about21px. Removing the outer box and caption side padding directly resolves the requested distinction. The existing thumbnail wash/inset can remain within the new square preview boundary. The proposed24px horizontal by40px vertical grid gap is coherent with this render;16px intermediate column gaps are optional existing responsive behavior, not a new reference requirement.
