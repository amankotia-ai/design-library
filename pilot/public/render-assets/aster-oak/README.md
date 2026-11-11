# ASTER & OAK — five 4K brand shots

Five faithful reconstructions of the previously accepted fictional ASTER & OAK coffee + everyday goods studies. Each PNG is **3840 × 2160**, 16:9, RGB lossless PNG. Prior compositions and source files are untouched.

## What is newly rendered at high resolution

- Every wordmark, letter, eight-spoke emblem, fine rule, label and profile face is rebuilt from the original design formulas and native fonts at high resolution. No branded final PNG is resized to make these outputs.
- The stacked landscape cards and logo/profile diptych are entirely rebuilt as native graphic geometry and text. The canvas is composed at twice 4K sampling and reduced once for clean edges.
- Packaging and held-profile artwork is rebuilt at 3000px-wide label size / 2400 × 4800 profile-face size, then projected onto each actual surface with a twice-native-4K sampled homography. Existing SKU colors, complete copy and local surface perspective are preserved.
- The rear-pouch and rounded thumb masks carry forward the independently corrected contours from the previous set. They are scaled uniformly and supersampled.

## Photographic resolution limitation

The pouch, sachet and hand/slab photographic blanks are **1672 × 941**. Their material, geometry, hand, lighting and background are resampled to the 4K canvas. This does **not** recover new photographic detail. Lettering and logos are genuinely reconstructed at higher resolution; the photographs are not native new 4K captures or recovered 3D geometry.

The source plates are scaled uniformly by `3840/1672`. A central vertical trim of about 1.15 scaled pixels reconciles their slightly different native ratio to exact 16:9. No independent width/height stretching is used.

## Brand and copy

ASTER & OAK is fictional and used only for this design study. Pine `#173C31`, cream `#F0E9D9`, terracotta `#C97951`, near-black `#16251E`. Serif lettering uses Baskerville; supporting text uses Arial. `.example` is fictional. No audience counts, certifications, origin, performance or other measurable business claims are added.

## Rebuild and provenance

`render_4k.py` contains all brand-art formulas, vector-like primitives, type, surface quadrilaterals, masks and rendering code. It uses Pillow and numpy, plus locally installed macOS Baskerville/Arial fonts, which are not bundled.

```sh
python render_4k.py
python render_4k.py --only variety-pouches --suffix replay
```

`assets/` contains high-resolution reusable print, cover, profile and avatar art. `inputs/` contains the copied photographic blanks, original references and earlier accepted outputs for comparison. `render-manifest-v1.json` records construction and candidate hashes. The final manifest and independent QA reports identify accepted final image hashes.

No image-generation API or imagegen CLI was used for the 4K reconstruction. Prior first-pass imagegen provenance remains in the previous test package; the new render is deterministic code-native artwork plus the explicitly disclosed photographic plates.
