# First-image mobile template: figured dark wood

Source: **only the first photo** in [abduzeedo's post](https://x.com/abduzeedo/status/2094456376550649944). The other two post images are outside this template's scope.

The portrait photograph places a dark notched smartphone diagonally across highly figured reddish timber. The phone occupies most of the middle/lower frame. Its metallic rim, broad integrated top notch, earpiece, thick black lower side and hard cast shadow are important physical landmarks. Keep the original generous upper/right wood area, dark corner and irregular grain. This is a single mobile display, not a phone-and-desktop board.

In the standalone template ZIP, the plate, mask, Blender file and manifests sit beside this document; `assets/…` paths below identify their installed-skill locations.

The ready plate is `assets/uds-mobile-template/blank-mobile.png`, native **1200×1600, 3:4 portrait**. The original webpage header, menu, portrait, article and cropped bottom text are removed. Built-in imagegen generated the empty screen material at 1086×1448, which is projectively remapped **only inside the original display mask**. Original photograph pixels beyond the mask's antialias footprint remain unchanged. The original source itself is preserved at `assets/original-references/2094456376550649944/first-image-original.jpg`.

## Required artwork and placement

Prepare a real mobile screenshot, a mobile webpage capture, or a clearly identified product concept. For repo work, understand the actual product and capture its relevant mobile state when possible. Create missing logo/icon/content dependencies from the brand brief rather than inheriting the reference's studio/person name or essay. The asset recipe is `screen`.

Use a **1170×2532 portrait artwork canvas** as a working starting ratio; this is not a measured hardware display resolution. Keep important header text below the physical notch safe area. Avoid baking a second notch or duplicate hardware framing into the art. Preserve local UI proportions, exact marks/text and the photographed phone's scale.

`template.json` records measured native screen-corner coordinates, edge-fit diagnostics and provenance. `screen-mask.png` clips the precise native visible screen with rounded corners and the original notch excluded. The lower mask's convex outline fills cropped article glyphs that otherwise connect to the bezel; do not regenerate a mask from original-page white pixels without accounting for these cuts. `screen-illumination.png` retains the empty display illumination for compositing.

## Blender

Copy the self-contained `uds-mobile-template.blend` into the task workspace and save a working copy. Its one scene, `uds-mobile-dark-wood`, has a locked-composition camera, packed photographic plate, one subdivided projective artwork surface and a screen mask sampled in camera coordinates. Select `ASSET — portrait product screen` and replace the material image node named **`REPLACE_IMAGE`**. The saved master starts with fully transparent artwork.

Keep the camera, mask, plate and baked illumination fixed. The artwork image uses clamped edge sampling. The mesh extrapolates the same projective UVs slightly beyond the visible display, with the physical mask providing the final clipping; this prevents the last edge pixels from exposing the underlying blank. The material combines its alpha with the physical screen mask and applies baked screen illumination; it does not create new photographic lighting. `checks/uv-placement-check-v2.png` is a procedural placement test, not a second template or a branded deliverable. Inspect every finished screenshot for bezel gaps, notch overlap, accidental extra status bars, distortion and text legibility.

This is an image-based fixed-view scene. It does not recover a full phone/table model, hidden geometry or a new camera angle. A larger render size does not add native photographic detail. For another outer ratio, reframe/extend/recompose with an explicit output contract; do not stretch the phone. Run the independent finishing review on the actual populated final, even when the blank and test-chart placement have passed.
