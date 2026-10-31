# Hand-drawn active navigation underline

Replaced the selected navbar link's black text underline with a single red pen stroke. The code-native SVG has shallow asymmetric curvature, a small thickness variation and tapered ends. Its decorative mask stretches to each label's width without changing the link's dimensions. The shared ink token is `#f60f30`, sampled from the dominant opaque color of the actual installed “of Manks” image. No new bitmap or generated image was needed.

The original native anchors and `aria-current="page"` remain. The selected link's straight underline is suppressed on both default and hover; keyboard focus outlines remain. No animation is added. Forced-colors mode uses a standard current-page underline because decorative masks may be suppressed.

Actual 3× captures cover all three selected labels at desktop, mobile and narrow widths. Browser verification passed nine label/viewport combinations, hover state, keyboard outline, mask/ink style, zero page errors and no horizontal overflow. Selected label geometry remains 36px desktop / 40px mobile. Production build passed in the runtime mirror, with the app's non-blocking >500kB bundle warning; no unrelated bundle changes were attempted. All affected source/assets match workspace files and are hashed in this run.

Roles: `/root` implementation, ink sampling and browser captures; `/root/typography_visual` actual user screenshot/signature inspection and pen-stroke contract; `/root/typography_product` native-link/current-page/focus contract; `/root/typography_art` actual delivered style review; `/root/typography_qa` independent final revision review. Their reports are in this run, with the final independent verdict in qa.md.

During independent QA, another task changed unrelated page-preview rules in catalog.css. The underline block was unchanged, workspace/runtime still matched, and QA reread the current file and tied its scoped review to that revision. The manifest records the current whole-file hash; no unrelated page-preview review is claimed by this run.
