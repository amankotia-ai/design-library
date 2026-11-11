# ARCO — technology brand concept

ARCO is a fictional shared workspace for product teams: projects, docs and decisions in one calm place. The identity uses an architectural arch/pillar mark, lowercase Avenir Next wordmark, cobalt, warm ivory, ink and lime. Its campaign line is **Good work, together.** This is a brand and product-design concept, not an existing application or launch announcement.

The requested set contains four compositions: phone on an oak desk, auditorium wall display, five coordinated campaign cards, and laptop sticker. The supplied empty plates are copied into `inputs/`; those are the authoritative scene references. The work preserves their original photographic setting and applies new exact artwork to the selected surfaces.

`assets/` contains the standalone logo mark as SVG and transparent PNG, a transparent signature, the identity board, concept phone UI, auditorium campaign, five individually composed social posters, sticker art and brand/copy specification. `create_assets.py` rebuilds these assets with Pillow and the locally installed macOS Avenir Next family. Fonts are not redistributed. Edit the script/specification to change copy or layouts; retain the SVG for vector editing of the mark.

The final four compositions use exact source artwork, measured projective transforms, explicit surface masks and the original photographs' illumination. The phone mask retains its real hardware island and rounded display; the five campaign cards have individual rounded masks; the sticker retains its original paper border. The auditorium artwork uses clamped edge sampling so no original white panel sliver remains beside the frame. `compose_exact.py` rebuilds the four renders and `verify_rebuild.py` checks that a fresh subprocess reproduces the saved pixels. Install the packages in `requirements.txt` first.

Built-in imagegen received each actual blank and corresponding artwork for first photographic insertion passes. Independent review found device/sticker geometry drift and embossed artwork treatment, so those drafts were replaced with exact deterministic compositions. Prompts, generated-file provenance and regression evidence are preserved. Rejected drafts are excluded from the delivery folder. No CLI image-generation API was used.

The scenes are fixed photographic compositions. They do not contain recovered full-3D room, phone or laptop geometry, nor new camera viewpoints. The phone plate is native 1536×1024; the other plates are native 1672×941. Export dimensions are recorded separately from that photographic detail limit.

Independent finishing reports and native detail crops are in `qa/`. An accepted report applies only to the exact file hash it records. It checks each full frame, screen/island/bezel, framed display, all five campaign cards and the sticker's corners/border/shading against actual blank references and exact source artwork.
