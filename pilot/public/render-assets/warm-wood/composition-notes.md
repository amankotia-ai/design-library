# Quiet identity across four applications

Source: [Vadim Carazan's four-image post](https://x.com/VadimCarazan/status/2114623816072568925). The reference is a law-brand identity shown through still compositions. Its green palette, portraits and wording belong to that reference; adapt them from the new product's evidence. Originals are preserved alongside four generated blank plates. These are photographic approximations, not recovered original scenes.

## Phone on a sunlit desk — `vadim-phone-desk`

The phone runs diagonally through the center of a warm wood tabletop, with its top pointing upper left. A keyboard enters the lower left corner; a cable arcs through the foreground. Directional daylight and a long soft phone shadow establish depth. The device and surrounding objects are intentionally cropped and should retain their relative scale.

Asset requirements: an actual product screenshot, or a composed social-post screen with separate avatar, display name, post artwork and supported copy. Create those dependencies from the repo; do not inherit the reference's social account details. The blank clears the whole active display, allowing either use. Keep the hardware island above any inserted screen.

Blender: fixed camera and baked desk lighting. Fit a perspective UV quad to the screen, then use a rounded display mask with an island cutout and keep the bezel on top. Supplied quad coordinates are starting guides, not a finished pixel mask. Keep UI proportions in its local portrait canvas before projection. A physically bright display may use controlled emission; retain plausible reflections and avoid a white halo around its edge.

## Auditorium wall display — `vadim-auditorium-display`

A near-frontal architectural view places one wide framed display above a small centered lectern. Repeated timber stools create foreground depth. Concrete wall divisions, timber side panels and side daylight provide structure; avoid adding decorative props. The display is the focal point, with generous surrounding architecture.

Asset requirements: one complete landscape campaign/display layout, which may depend on a wordmark, short supported headline, pattern and approved portrait or actual product imagery. Create the layout first, then insert it as one exact image. A campaign portrait is optional; a repo screen or brand graphic may serve the product better.

Blender: match the four inside-frame corners and retain the frame and its contact shadow. For a printed board multiply the design by the baked panel illumination; for an emissive display use restrained luminance consistent with the room. Rebuilding room geometry is necessary for new camera/light positions. For a new outer ratio extend/recompose the room rather than squeezing the display.

## Five coordinated social cards — `vadim-five-social-cards`

Five equal portrait cards form a centered horizontal row on a warm neutral background, sharing top/bottom alignments and narrow equal gutters. The reference alternates portrait, announcement, portrait, typography and pattern. That rhythm makes it a coordinated campaign rather than five repetitions of one logo.

Asset requirements: five distinct post layouts plus shared brand signature, palette and type. If reconstructing social chrome, create a reusable header/footer with avatar and verified or deliberately fictional demo account copy; the blank cards themselves contain no chrome. A repo-informed sequence could introduce the product, demonstrate a feature, show a real screen, explain a benefit, and close with a brand statement. Keep claims supported and demo identities labeled as such.

Blender: five independent local UV planes, one image per card. Their widths and heights are consistent; preserve equal gutters and corner masks. Typography should be composed deterministically before insertion. For square/portrait exports use a deliberate grid or vertical sequence while preserving the local cards' proportions; show the reflow as a variant, not a faithful recreation of the original row.

## Laptop sticker close-up — `vadim-laptop-sticker`

The metal laptop occupies the right/lower frame and its keyboard is cropped at the top/right. A small rectangular sticker sits on the left palm rest, parallel to the laptop surface. Warm tabletop grain, low angled daylight, brushed metal and the tiny paper border make this convincing. The sticker's scale and perspective matter more than a large logo.

Asset requirements: a compact mark or graphic lockup, transparent or prepared full-bleed inside the retained white border. Reuse or derive the real brand mark; create a proposed mark only when missing. Keep fine features legible at the small rendered size.

Blender: four-corner UV projection on the existing sticker face. Keep the paper border/contact shadow and inherit the surface illumination. The supplied blank is baked photography; it does not permit moving the laptop or relighting its metal. Inspect all four paper edges at 100% pixels for double borders, floating ink and bright cutout halos.

## Reference handoff and acceptance

Supply the selected native original, its blank, exact per-surface artwork and output contract to Blender/imagegen/the production agent. Use the actual files from the catalog, not a tweet URL alone. The fixed-camera library has eight local artwork quads across four scenes; they are placement guides with transparent placeholder textures, not recovered subject geometry or automatic occlusion masks. Keep artwork within the safe interior or create a precise per-surface mask for full bleed.

Run the independent [finishing review](visual-qa.md) on actual final exports. Match composition separately from exact asset fidelity. Report source/output resolution and any approximation; do not claim pixel identity from generated plates.
