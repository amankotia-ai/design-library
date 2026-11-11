# Sidequest app mockups

A fictional app for small neighborhood adventures. Two complete UI states share a cream, ink and orange identity, with a curious mascot and simple illustrated route map. All routes, recommendations and distances are demo content.

- `renders/sidequest-explore-forward.png`: Explore screen on the forward-reaching phone shot.
- `renders/sidequest-route-pov.png`: route detail screen on the first-person handheld shot.
- `artwork/`: editable SVG screen designs, matching 1170×2532 PNGs, app icon and exact UI copy.
- `sidequest-mockups.blend`: two actual populated scenes, with photographs, artwork, masks and baked illumination packed inside.
- `reference/`: the exact two blank photos supplied for this request.
- `surfaces/` and `scenes.json`: physical masks, protected camera islands, illumination and fitted screen quads.
- `checks/` and `qa/`: saved-source replay and independent finishing evidence.

The final photos are 1449×1085, matching the supplied images. These are fixed-camera screen compositions on photographs. People, hands, hardware and photographic light are baked into the source image; this file does not recover full 3D subject geometry. Keep the camera and physical masks fixed.

To change a screen, open the Blender file, choose a scene and select its `ASSET — … UI` object. In the screen material, replace the `REPLACE_IMAGE` image with another portrait screenshot. The camera island already exists physically; omit another device frame or cutout from artwork. Save a copy, render, and check the actual result at native phone-edge and text crops.

The SVGs and `create_artwork.py` preserve editable text/vector structure. The PNGs are the canonical supplied artwork. The generator uses system Arial fonts and Pillow. `prepare_scenes.py` uses Pillow and NumPy with the bundled `fit_surface.py`; it reuses the included references. `compose_blender.py` builds the populated scenes (verified in Blender 5.1.1). `reopen_source.py` verifies the packed saved file by rendering both scenes again.

Example rebuild from this directory:

```sh
python create_artwork.py
python prepare_scenes.py
blender --background --python compose_blender.py
blender --background sidequest-mockups.blend --python reopen_source.py
```

Any artwork/layout change needs a new visual finishing review. Bundled acceptance applies only to the exact delivered file hashes.
