# Coffee cup branding examples, corrected fit v2

FIELD and DAYBREAK are fictional demo identities. These are Blender-rendered curved UV print surfaces over the unchanged 1672 × 941 photograph. They are fixed-camera artwork replacements, not complete cup reconstructions.

## Corrections

- Each cup has its own measured side-boundary fit in `cup-fits.json`; the three cups no longer share one approximate frustum. The UV meshes retain depth, curved horizontal bands, and angular compression toward the sides.
- Each ink material multiplies artwork alpha by its own antialiased paper-body silhouette (`masks/`). The mesh has slight bleed so the mask controls edge contact without an inset strip. These masks are source scene assets, not painted corrections to an exported render.
- DAYBREAK's original repeated ellipses extended below its intended navy wrap baseline. `make_artwork.py` now trims that artwork at texture row 1790, retaining the upper scallops, colors, sunrise and exact copy while removing dangling lobes and pointed edge fragments.
- FIELD's secondary lower rule has nine source-pixel coverage to remain continuous at native output size.
- Blender composites the transparent curved ink directly over the source photograph. Coffee tops and photograph pixels more than two pixels outside the paper masks are bit-identical to the plate. Mask-edge antialiasing has a small sampling footprint; see `qa/pixel-verification.json`.

Independent finishing review: **PASS** for both final image hashes. The reviewer inspected both full images and all six per-cup edge crops; FIELD's lower hairline was confirmed continuous at native size. See `qa/independent-final-report.json`. Saved-blend reopening also produced pixel-identical re-renders of both scenes (`qa/saved-scene-verification.json`).

The earlier examples and installed skill were left untouched.

## Files

- `daybreak-example.png`, `field-example.png`: full native-size renders.
- `coffee-cup-branding.blend`: both scenes, per-cup curved print meshes, packed artwork, paper masks, fixed camera and photograph compositor.
- `artwork/`: six transparent 2048 × 2048 source print textures.
- `blank-shot.png`: unmodified original photograph.
- `make_artwork.py`: deterministic print-art construction using Pillow and installed macOS Baskerville, Avenir Next and Arial Black fonts.
- `make_fit_masks.py`, `cup-fits.json`, `masks/`: independent silhouette measurements and rebuildable mask assets.
- `build_examples.py`: Blender 5.1.1 scene construction and rendering.
- `verify_and_crop.py`, `qa/`: read-only pixel verification, enlarged render crops and independent visual review evidence.

## Replace print art

1. Open the blend and choose the FIELD or DAYBREAK scene.
2. Select a `CUP … curved brand wrap` object under `EDITABLE CURVED CUP PRINTS`.
3. In the Shader Editor replace the image in `REPLACE_BRAND_ARTWORK` with transparent print artwork. The `PAPER_BODY_OCCLUSION` node must stay connected.
4. Horizontal UV position maps around the visible cup front; vertical UV position maps from bottom to top. Keep unprinted regions transparent. Keep the fixed camera and mask coordinates.
5. Render with F12 and save a copy. All current images are packed, so explicitly reopen/reload an external texture after replacing its file.

## Rebuild

Run the two source preparation scripts with a Python environment containing Pillow, then run `build_examples.py` with Blender's Python runtime, not ordinary Python:

```sh
python make_fit_masks.py
python make_artwork.py
/Applications/Blender.app/Contents/MacOS/Blender -b --python build_examples.py
python verify_and_crop.py
```

The photograph includes the cup paper, rims, coffee, lighting, table and shadows. Ink color is multiplied by the photographed paper illumination. The mask and silhouette fit are specific to this view; new camera angles or relighting require complete cup geometry and a new lighting setup.
