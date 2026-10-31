# Slightly shorter homepage viewports

Reviewer: /root/cleanup_analysis; combined visual/product/art direction pass. Inspected actual `home-nav-spacing-2026-10-31/after-1440.png`, `after-390.png`, and current preview CSS.

The current4/5 stage shows substantial page content and dominates card height. User asks for “a little shorter,” so change only stage aspect-ratio from4/5 to9/10: approximately11% height reduction at the same width (desktop451→401px; mobile425→378px). This retains the page-continuation treatment while making the cards more compact.

Acceptance: preview width/inset, square viewport corners, flush lower crop, native independent scroll, dynamic iframe height, card information, header spacing, and routes remain intact. Both collection stages retain equal desktop height; desktop/mobile stage heights reduce approximately11%; no empty strip, overlap, or horizontal overflow. Lower page content should remain reachable by native frame scrolling even though less is initially visible.
