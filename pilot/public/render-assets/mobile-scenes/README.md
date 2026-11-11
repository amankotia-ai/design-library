# Seven mobile composition templates

Open `blank-preview.jpg` to choose a composition, then open `mobile-templates.blend` and select the matching scene. Each scene retains the original photograph and native canvas. These are fixed-camera image compositions with local projective artwork surfaces; people, phones and photographic lighting are baked into the image.

Select an `ASSET — …` object. In its material, load your artwork into `REPLACE_IMAGE`. Keep the camera, `PHYSICAL_MASK` and baked lighting in place. Save a copy. All22 slots start with transparent artwork, so the saved master renders blank.

|Scene|Replaceable surfaces|Suggested artwork|
|---|---|---|
|01 metallic icon macro|silver tile, cropped blue and white tiles, clock, app label|1024² icons; transparent mark on silver; separate transparent text|
|02 dark ticket phone|display|1170×2532 portrait ticket/UI|
|03 calendar handheld|display|1170×2532 portrait UI|
|04 music campaign|display,8 artwork cards,brand signature,headline,footer|portrait UI,8 square1024² cards,transparent text graphics|
|05 person forward phone|display|1170×2532 portrait UI|
|06 POV handheld phone|display|1170×2532 portrait UI|
|07 low-angle person phone|display|1170×2532 portrait UI|

Exact quads, masks, input dimensions and notes are in each `templates/<id>/template.json`. The source dimensions vary:1200×1433,1200×1600,680×680,1054×1405 and1199×898. Larger exports do not create additional photographic detail. Keep art proportions independent of the output canvas. A new outer aspect ratio requires deliberate crop, extension or recomposition; changing the camera arbitrarily exposes the flat construction.

Do not include another phone frame or camera island in a screenshot. The original physical island is protected by the screen mask. Leave safe space around it. Full-bleed artwork is clipped to the display and any finger overlap. Icon partials intentionally extend off canvas; their unseen bounds are extrapolated. Use the full virtual artwork canvas and retain the crop.

The campaign has8 independent square faces, including4 partially cropped outer cards. Create8 consistent, distinct assets plus the central screen. Replace the brand/headline/footer independently; original promotional copy and terms are cleared. Empty typography areas blend into the light background.

`replace_artwork.py` supports batch substitution through a JSON map. Example:

```json
{"06-pov-handheld-phone":{"screen":"/absolute/path/to/product-ui.png"}}
```

```sh
blender --background mobile-templates.blend --python replace_artwork.py -- artwork.json rendered
```

For a new product, inspect the repo/brief, reuse its real mark and actual UI, create missing assets, show reference/blank/art previews, and render. Independently inspect every branded result at full frame and native critical crops for fit, alignment,legibility,edge coverage,texture and lighting. The bundled checkers prove placement only; they do not certify future brand artwork.

`reference/` preserves all seven user attachments. `candidates/` and `generation.json` record built-in imagegen cleanup donors. `build_native.py` fits donor materials only into replaceable regions; the original physical photographs are retained elsewhere. `prepare_assets.py` and `build_blender.py` rebuild the library; `reopen_verify.py` checks saved-source portability. The rebuild uses Python with Pillow and NumPy, then Blender (verified with5.1.1). `checks/` contains actual Blender renders; `qa/` contains independent review evidence. Generated checker images are diagnostic, not extra templates.
