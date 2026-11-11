# Blank render showcases

Recreated from the 14 shots in [byamine's reference montage](https://x.com/byamine__/status/2115903370506723494).

## Included

- **14 clean PNG plates** in `plates/`, generated with the built-in imagegen tool. All branding, copy, and replaceable artwork have been removed. The opening/closing gradients and mint edge stripes are retained as background treatments.
- **blank-showcases.blend** with 14 camera-matched image-based scenes and 5 additional editable 3D stages.
- **47 transparent artwork PNGs** in `assets/`, already connected to the correct surfaces.
- **asset-index.json** maps every scene and artwork slot to its filename and recommended dimensions.
- **manifest.json** contains the exact imagegen prompt for every plate, its reference frame, and generation provenance.
- **build_blender.py** rebuilds the Blender project. It requires Blender 5.1 and no add-ons.

The PNGs are close reference matches, not pixel-exact copies. Their native generated resolution is 1672 × 941. Blender scenes render at 1920 × 1080; that output size does not add image detail to the plates. The source is a rapid video montage, so the deliverables recreate one representative frame per shot, not its animation.

## Add your artwork in Blender

1. Open **blank-showcases.blend**. Keep the `assets` folder beside it.
2. Choose a scene from Blender's Scene selector at the top right.
3. Expand **ASSETS — replace artwork here** in the Outliner and select the surface you want.
4. In the Shader Editor, open your artwork using the image node named **REPLACE_IMAGE**. Use a transparent PNG for a logo and a full-bleed image for a screen or card. Preserve the slot's aspect ratio.
5. Press **F12** to render.

Alternatively, replace the matching transparent PNG in `assets/`, open Blender's Text Editor, select the included **reload_assets.py**, and click **Run Script**. All connected artwork will reload. File names and dimensions are listed in `asset-index.json`.

Artwork is intentionally invisible until you supply a nonempty image. To see placement outlines, enable viewport overlays, then select the ASSET object. The background plates are packed into the Blender file. Artwork uses relative external file paths.

## Which Blender scene to use

The numbered scenes **01–14** preserve the generated plate's appearance. They are **2.5D compositing templates**: the scene uses a flat image background with camera-aligned UV artwork surfaces. Keep the camera fixed. The person, hands, fabric, hardware, and existing lighting are baked into the plate. Replacement artwork on these scenes is a flat compositing layer; it does not automatically inherit embroidery, fabric displacement, reflections, shadows, or physical occlusion. Logo and screen quadrilaterals are prealigned, with UV masks on rounded surfaces. Fine alignment may need adjustment to your particular artwork.

The five scenes prefixed **3D-** contain editable geometry, cameras, and lights:

- `3D-01-metal-badge`: frame, insert, screws, woven strap, and artwork surface.
- `3D-02-app-dock`: tray, three rounded tiles, and three artwork surfaces.
- `3D-03-stacked-cards`: two layered cards and a front artwork surface.
- `3D-04-tablet`: device body, bezel, screen, and artwork surface; no hands.
- `3D-05-metal-display-macro`: display frame, gasket, insert, brackets, cable, and artwork surface.

These are additional geometric approximations, not recovered source models. You can change their cameras and lighting. Their artwork layers are emission decals for easy replacement; use a Principled material with your artwork as Base Color if you need physically lit printed surfaces.

## Shot order

| Scene | Showcase | Replaceable content |
|---|---|---|
| 01 | Orange gradient title | Center logo |
| 02 | Logo sizes and app dock | Four logo sizes and two visible icon tiles |
| 03 | Metal display closeup | Display logo |
| 04 | Black fleece jacket | Back embroidery artwork |
| 05 | Browser closeup | Favicon, tab title, address |
| 06 | Stacked landscape cards | Front card and rear strip |
| 07 | Mint edge title | Wordmark |
| 08 | Profile and logo sizes | Cover, avatar, bio, four logo sizes |
| 09 | Metal lanyard badge | Full insert or separate logo/name |
| 10 | Handheld tablet | Full screen |
| 11 | Three social posts | Three post bodies and three account headers |
| 12 | Three app tiles | Three icons |
| 13 | Logo and profile panels | Hero logo, cover, avatar, bio |
| 14 | Gradient partnership card | Partner lockup |

For the badge, use either the full insert or separate logo/name slots to avoid unintended overlap. In Scene 02, the far-right icon is cropped by the source frame and is retained in the plate; the two fully visible tiles have artwork slots.

## Rebuild and verification

Run from a terminal with Blender available:

```sh
blender -b --factory-startup --python build_blender.py
blender -b blank-showcases.blend --python verify_blender.py
```

The verification script renders every scene at preview resolution, checks that each artwork image exists and starts transparent, and renders a temporary magenta test logo into the badge slot. It leaves the saved Blender project unchanged.
