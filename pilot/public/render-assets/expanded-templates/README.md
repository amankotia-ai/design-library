# Thirty additional blank showcase plates

These PNGs extend the original fourteen-plate pack with the six additional reference posts. They were generated with built-in imagegen using each original still, extracted frame, or individual board-panel crop as the edit target.

The set contains four portrait Wellspin applications, paired Wesoft cards, a Solyt post triptych, eleven Variety packaging/graphic layouts, four StriveNet studies, the complete eight-panel Cispy board, and its eight individual applications: **30 new PNGs**.

`plates/` contains the final images. `manifest.json` records each exact prompt, source reference, generated dimensions and file hash. `preview.jpg` shows the whole set. Output dimensions vary with the original aspect ratio; generated images are close recreations, not pixel-exact originals or uniform 4K exports.

## Use in Blender

Open `expanded-plates.blend` and choose a scene from the Scene selector. Each scene contains its packed blank plate, a fixed orthographic camera, native output dimensions, and an optional transparent **full-canvas** artwork overlay. In the overlay material, replace the `REPLACE_IMAGE` node with a transparent artwork canvas positioned at the scene's dimensions.

For a local logo or separate packaging faces, add and align decal meshes using the original reference and composition notes, or position the artwork in a same-size transparent canvas. The included overlay is not automatically fitted to every package or fabric surface. Keep the camera fixed: the objects, hands, light and shadows in these scenes are baked into the plates. They are not rebuilt 3D objects.

For new camera angles or physically relit materials, build appropriate geometry. The earlier template pack still includes its five separate 3D approximation stages.

The blanking removes applied logos, text, graphics and photographs from the artwork surfaces. Physical items, lighting, architecture and hands remain. Generic social-interface controls remain on the Solyt triptych and Variety social grid; solid background colors remain where they define a layout. The color-matrix plate retains the fifteen colored cells with the circle artwork removed.

The original references are retained separately in the installed `product-renders` skill. The skill's catalog links each original to its corresponding generated blank plate.
