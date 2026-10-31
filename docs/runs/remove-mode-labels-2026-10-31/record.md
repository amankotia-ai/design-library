# Remove production labels from the interface
Start:2026-10-30 21:55:07 UTC (2026-10-31 03:25:07 IST). Deadline:22:15:07 UTC (03:45:07 IST).
Scope: remove both rejected production tags throughout UI; no replacement badges; keep useful names/types/layouts and working comparison controls; persist the language preference. Mode: original library UI refinement. Completion: no rejected wording in rendered UI; desktop/mobile visual checks and independent QA.
Baseline UI skill continues to apply. Freebyrd index, thread and references returned no folder context.
Specialists: visual_review (visual analysis/art direction), product_review (product design), border_qa (independent QA passed).

Visual analysis/art direction: visual_review inspected actual attachment, identified right-hand production badges, and approved removal without replacement or reserved space.
Product design: product_review inspected attachment/source/docs and identified cards, headings, captions, dropdown, visible prose and conflicting naming instructions.
Implementation: removed mode renders from PageCard, SystemCard, Catalog, SystemPanel and detail headings/captions. Removed unused page mode fields. Reference dropdown keeps its source value and Compare behavior. Reworded remaining visible occurrences, including footer reference link. Internal system/section production metadata retained without UI rendering; reference evidence and historical run records preserved.
Persistence: AGENTS.md Interface language section and docs/system-naming.md prohibit reintroducing rejected tags or equivalent badges.
Validation: final Vite production build passed; existing npm check passed. Browser checks.json records55 route/viewport/behavior cases including all20 section/detail and standalone views, five primary route types at desktop1482×1000/mobile390×844, both system/reference pages, and Reference/Compare controls. Forbidden wording absent in rendered body text including hidden notes. Source scan finds no rejected phrases in pilot/src. Ten screenshot previews retained. Independent QA passed; see qa.md.

page-browser.jsx SHA256: 2bba96204b1620dc5e366620591c1b7b4d9c44e6d76a65c86ccb692113299c98

page-shells.js SHA256: 374af7d87949d057c48ebc73afb83edcd6b69aa1654cb242481a4bbd1f426391

catalog.jsx SHA256: b84beb68d06e92034b80e0ee1f00fcfe2555dc1a6ba76bb5222b6709896daf44

system-browser.jsx SHA256: 2d4b89789021fd91232ebc10244b2697f1f753832afed4e6c5484460010090f8

main.jsx SHA256: 7c85a62d97fc5efbaba0fec1d8ecc82b53aff11a15cc159223416b0f6dfb146e

data.js SHA256: ec2f9a47a33bbbdd3176595bb6d72a07ff9ed4387bd41c36252c08f3a302ef67

blueprint.jsx SHA256: 4e370efe4573c11d6a6c0140017615325b10675e79a92b47dafd8e938cda6a5d

blueprint-faithful-static.jsx SHA256: a006d3df4ce2307d89802189716cf8913fff5d8837ae483f636782d9e9c0ae18

sections.jsx SHA256: 0f6d24f8228bcb1cd2f4cb7aa7c5cf471d6115d6643219dfa6773d7e80eef5e8

Final review: border_qa passed label-removal scope on delivered revision and ten actual desktop/mobile renders. Mobile Sections screenshot has unloaded offscreen thumbnails; text labels were present and checked, and desktop media loaded. This is a capture limitation outside the requested label scope.
