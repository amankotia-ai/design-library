# Content and navigation alignment

Art director: `/root/art_direction`. Inspected the actual previous delivered `docs/runs/collection-grids-2026-10-31/qa-sections-1440.png` and runtime library-token, system-browser and catalog CSS. Mode: original browser-system adjustment.

At1440px the navbar spans x32–1408, while the catalog heading, filters and gallery span x152–1288. The120px mismatch on each side makes the content feel detached from the navigation. The user's new requirement establishes a shared page shell.

Use one shared horizontal gutter token:32px desktop/tablet,24px mobile. Set the library browser's outer shell to full available width with that padding and no competing1184px maximum. Header, catalog heading, filter right edge, gallery first/last frame, detail shell and library footer must share these edge coordinates. Remove viewport-breakout header margins/width compensation so it participates in the same shell. Preserve vertical spacing, preview aspect ratios,3/2/1 grid columns,24px desktop gutters and existing square-frame/caption separation.

Apply the same shell edge alignment to detail-page introductions, collection control and preview frame. Paragraphs can have a readable inner maximum width where needed, but should start on the common left edge; the outer content region and media must reach the shared right edge. Do not center narrow text blocks independently of the shell.

Acceptance: inspect1440px,820px,390px. Navbar brand left edge equals content left edge within1px; rightmost navigation edge equals catalog/filter/gallery outer right edge. On mobile use24px on both sides, keep navigation wrapping and no horizontal document overflow. At wider desktop the larger frames should retain the exact existing crop/ratio rules rather than a new content zoom policy. Final independent QA must inspect the changed rendered revision.
