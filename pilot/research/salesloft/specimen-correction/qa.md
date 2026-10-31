# Independent QA: Signal Serif system card

Reviewer: `/root/specimen_qa`, 31 October 2026. Status: **passed within the scope below** for the exact revision identified here.

I inspected the supplied screenshot, the delivered wide systems-grid screenshot, and the isolated desktop and 390px specimen captures. Signal Serif now uses the same 9:10 specimen frame and Typography 01 / Palette 02 / Elements 03 hierarchy shown by Quiet Serif and Blueprint. Its large serif `Aa`, alphabet, two-line phrase, four single-row swatches, teal actions and lime badge fit the frame. The two adjacent specimen panels retain their existing layout and equal aspect ratio. The fonts are the documented local substitutes, and the sample controls are decorative spans.

In the running preview I checked 320, 390, 1440 and 1971px viewport widths. There was no document horizontal overflow or page error; the main specimen regions fit inside the panel at all four sizes. The four swatches remained in one row. The specimen has a descriptive `role="img"` label and hides its decorative contents from accessibility APIs. The Signal Serif card link accepted keyboard focus and Enter, and navigated to its system detail. This bounded browser review does not establish screen-reader certification or cross-browser compatibility.

The reviewed workspace and runtime source hashes matched:

- `src/system-preview.jsx`: `4b2e913fab2628c744935ba9c8ebbf531d64ec4f89f324d326f9ad1f4aebaffc`
- `src/system-preview.css`: `2266434d6e495a1608ea54e2b9acc590eee1acbe4b81a1d1922880c8b2d07496`
- `src/system-preview-tokens.css`: `898c6fad96fe8a5ee9ac72e16a113f28212bf8dd7a4554bbf075b09847dc358b`
- `systems-wide.png`: `f395cfdf823c3a8bba0557951cb865a3de3110cbdcbd06f8c1467e5b47e9a592`
- `desktop.png`: `bb3b0a011d24d39b5562f0d37b3f040817807404063594c7a48c6767adbbcf9f`
- `mobile.png`: `11e7a76fe142f9a4f7268793bc7013e288d442f07d616068d8b97940eb7a2e97`

Changing the reviewed source or captures invalidates the affected portions of this review.
