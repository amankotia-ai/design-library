# Visual and product analysis

Reviewer: /root/cleanup_analysis. Inspected the actual supplied screenshot with view_image the full-page `before-desktop.png`, and the current `pilot/src/system-browser.jsx` and `pilot/src/main.jsx` source. This is homepage maintenance, not a source reproduction.

## Observed screenshot

The screenshot contains two standalone explanatory blocks beneath the catalog: the bordered “Read the relationship” note and the “A name for the language. A label for its origin.” section, including its naming example. Both are explicit removal targets. Their explanation is already represented in system detail guidance and project documentation, so removing them from Home does not prevent studying the systems.

## Recommended removals

- Remove both entire `.catalog-note` and `.naming-note` elements, including the example row.
- Remove the `.home-intro` eyebrow, slogan, and explanatory paragraph. Replace the heading hierarchy by making the straightforward catalog label “Design systems” the single page H1.
- Remove the numbered `.preview-index` overlays. They imply an ordering without providing a selection function.
- Remove `.card-signature` text: the actual desktop capture shows short, slogan-like fragments. The retained previews, family/mode, palette/type, and detail page provide enough selection context for this cleanup.
- Hide/remove the dismissible pilot notice on Home: its counts duplicate the catalog and card metadata. Keep useful collection counts beside the catalog title if desired.
- Omit the homepage footer’s repeated brand label and reading-layout inspiration sentence/link. This is page-shell decoration rather than necessary navigation. Preserve attribution in the existing study/source areas.

## Preserve

Brand and navigation; system preview images and accessible image/link descriptions; actual collection names; family and source/expansion mode; palette/type metadata; section counts; and “Explore system” links. Decorative copy inside screenshot preview images is part of the sample design and outside the homepage-shell cleanup. Do not edit source reconstructions or detail/study content as part of this request.

## Acceptance criteria

- The two photographed blocks and ornamental homepage intro are absent from the DOM, with no empty layout wrappers or reserved gaps.
- There is one descriptive H1 (“Design systems”) and three cards with their real names, useful metadata, and working destination links.
- Brand/navigation remains keyboard reachable with visible focus.
- At desktop, tablet, and mobile widths there is no horizontal overflow, missing preview image, or large orphaned space from removed sections.
- Study, Sources, and System routes retain their content and source/provenance information.

Ambiguity: “decorative text” is interpreted as homepage framing and ornaments, not functional card metadata or the text embedded in design-preview screenshots. This is consistent with the request’s page-level target and protects the library’s utility.
